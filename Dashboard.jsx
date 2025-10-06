/**
 * Main Dashboard Component
 * Orchestrates all dashboard elements and handles user interactions
 */

const { useState, useEffect, lazy, Suspense } = React;

function Dashboard() {
    const {
        data,
        loading,
        error,
        lastUpdated,
        dateRange,
        setDateRange,
        comparisonData,
        exportData,
        exportPDF,
        refresh
    } = window.useDashboardData(30000); // Refresh every 30 seconds

    const [darkMode, setDarkMode] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [notification, setNotification] = useState(null);

    // Destructure card components
    const {
        PerformanceSummaryCard,
        RecentExamsCard,
        WeakAreasCard,
        AchievementsCard,
        QuickActionsCard,
        GoalProgressCard
    } = window.DashboardCards;

    // Destructure chart components
    const {
        DomainPerformanceChart,
        StudyProgressChart,
        WeeklyStudyTimeChart,
        StudyCalendarHeatMap,
        PeakHoursChart
    } = window.DashboardCharts;

    /**
     * Load dark mode preference
     */
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('dashboardDarkMode');
        if (savedDarkMode === 'enabled') {
            setDarkMode(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    /**
     * Check for redirect from completed exam
     */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const fromExam = params.get('from');

        if (fromExam === 'exam') {
            showNotification('🎉 Exam completed successfully! Check your results below.', 'success');

            // Load exam result from sessionStorage if available
            const examResult = sessionStorage.getItem('latestExamResult');
            if (examResult) {
                const result = JSON.parse(examResult);
                window.MockAPI.saveExamResult(result).then(() => {
                    refresh();
                    sessionStorage.removeItem('latestExamResult');
                });
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [refresh]);

    /**
     * Toggle dark mode
     */
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dashboardDarkMode', !darkMode ? 'enabled' : 'disabled');
    };

    /**
     * Show notification
     */
    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    /**
     * Handle export actions
     */
    const handleExport = (format) => {
        let success = false;

        if (format === 'pdf') {
            success = exportPDF();
        } else {
            success = exportData(format);
        }

        if (success) {
            showNotification(`✅ Data exported successfully as ${format.toUpperCase()}`, 'success');
        } else {
            showNotification('❌ Export failed. Please try again.', 'error');
        }

        setShowExportMenu(false);
    };

    /**
     * Navigation handlers
     */
    const handleStartExam = (mode = 'normal') => {
        window.location.href = 'exam.html';
    };

    const handleResumeExam = () => {
        window.location.href = 'exam.html?resume=true';
    };

    const handleBackToExam = () => {
        window.location.href = 'exam.html';
    };

    const handleReviewBookmarks = () => {
        window.location.href = 'exam.html?mode=review&filter=bookmarked';
    };

    const handlePracticeWeakArea = (domain) => {
        window.location.href = `exam.html?mode=practice&domain=${encodeURIComponent(domain)}`;
    };

    const handleExamClick = (exam) => {
        setSelectedExam(exam);
        // Could show modal with detailed exam results
        showNotification(`Viewing details for: ${exam.name}`, 'info');
    };

    /**
     * Loading state
     */
    if (loading && !data) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    /**
     * Error state
     */
    if (error) {
        return (
            <div className="dashboard-error">
                <div className="error-icon">⚠️</div>
                <h2>Oops! Something went wrong</h2>
                <p>{error}</p>
                <button className="btn-primary" onClick={refresh}>
                    Try Again
                </button>
            </div>
        );
    }

    /**
     * No data state
     */
    if (!data) {
        return (
            <div className="dashboard-empty">
                <div className="empty-icon">📊</div>
                <h2>No Data Available</h2>
                <p>Start taking exams to see your performance dashboard!</p>
                <button className="btn-primary" onClick={handleStartExam}>
                    Start Your First Exam
                </button>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>📊 Exam Dashboard</h1>
                    <p className="header-subtitle">
                        Welcome back! Here's your performance overview
                    </p>
                </div>

                <div className="header-right">
                    {/* Date Range Filter */}
                    <select
                        className="date-range-select"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="week">Last 7 Days</option>
                        <option value="month">Last 30 Days</option>
                        <option value="all">All Time</option>
                    </select>

                    {/* Export Menu */}
                    <div className="export-menu">
                        <button
                            className="btn-export"
                            onClick={() => setShowExportMenu(!showExportMenu)}
                        >
                            📥 Export
                        </button>
                        {showExportMenu && (
                            <div className="export-dropdown">
                                <button onClick={() => handleExport('json')}>
                                    Export as JSON
                                </button>
                                <button onClick={() => handleExport('csv')}>
                                    Export as CSV
                                </button>
                                <button onClick={() => handleExport('pdf')}>
                                    Export as PDF
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Dark Mode Toggle */}
                    <button
                        className="btn-icon"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Refresh Button */}
                    <button
                        className="btn-icon"
                        onClick={refresh}
                        title="Refresh Data"
                    >
                        🔄
                    </button>

                    {/* Back to Exam */}
                    <button
                        className="btn-primary"
                        onClick={handleBackToExam}
                    >
                        Back to Exam
                    </button>
                </div>
            </header>

            {/* Notification */}
            {notification && (
                <div className={`notification notification-${notification.type}`}>
                    {notification.message}
                    <button
                        className="notification-close"
                        onClick={() => setNotification(null)}
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Last Updated */}
            {lastUpdated && (
                <div className="last-updated">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
            )}

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Top Row - Quick Actions & Performance Summary */}
                <div className="dashboard-row">
                    <div className="col-5">
                        <QuickActionsCard
                            lastExam={data.recentExams[0]}
                            onStartExam={handleStartExam}
                            onReviewBookmarks={handleReviewBookmarks}
                            onResume={handleResumeExam}
                        />
                    </div>
                    <div className="col-7">
                        <PerformanceSummaryCard
                            stats={data.userStats}
                            comparisonData={comparisonData}
                        />
                    </div>
                </div>

                {/* Second Row - Charts */}
                <div className="dashboard-row">
                    <div className="col-8">
                        <StudyProgressChart
                            progressData={data.studyAnalytics.dailyProgress}
                        />
                    </div>
                    <div className="col-4">
                        <WeeklyStudyTimeChart
                            weeklyData={data.studyAnalytics.weeklyStudyTime}
                        />
                    </div>
                </div>

                {/* Third Row - Domain Performance & Weak Areas */}
                <div className="dashboard-row">
                    <div className="col-7">
                        <DomainPerformanceChart
                            domainData={data.domainPerformance}
                        />
                    </div>
                    <div className="col-5">
                        <WeakAreasCard
                            weakAreas={data.weakAreas}
                            onPractice={handlePracticeWeakArea}
                        />
                    </div>
                </div>

                {/* Fourth Row - Recent Exams */}
                <div className="dashboard-row">
                    <div className="col-12">
                        <RecentExamsCard
                            exams={data.recentExams}
                            onExamClick={handleExamClick}
                        />
                    </div>
                </div>

                {/* Fifth Row - Calendar, Peak Hours & Goals */}
                <div className="dashboard-row">
                    <div className="col-5">
                        <StudyCalendarHeatMap
                            dailyData={data.studyAnalytics.dailyProgress}
                        />
                    </div>
                    <div className="col-4">
                        <PeakHoursChart
                            peakHoursData={data.studyAnalytics.peakHours}
                        />
                    </div>
                    <div className="col-3">
                        <GoalProgressCard goals={data.goals} />
                    </div>
                </div>

                {/* Sixth Row - Achievements */}
                <div className="dashboard-row">
                    <div className="col-12">
                        <AchievementsCard achievements={data.achievements} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>&copy; 2024 Exam Dashboard v2.0. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Help documentation coming soon!', 'info'); }}>
                        Help
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); showNotification('Privacy policy coming soon!', 'info'); }}>
                        Privacy
                    </a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.MockAPI.clearData(); refresh(); showNotification('Data cleared successfully!', 'success'); }}>
                        Clear Data
                    </a>
                </div>
            </footer>
        </div>
    );
}

// Make Dashboard available globally
window.Dashboard = Dashboard;
