/**
 * Custom Hook: useDashboardData
 * Manages dashboard data fetching, caching, and auto-refresh
 */

const { useState, useEffect, useCallback, useMemo } = React;

function useDashboardData(refreshInterval = 30000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [dateRange, setDateRange] = useState('week'); // 'week', 'month', 'all'

    /**
     * Fetch dashboard data
     */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch from MockAPI
            const dashboardData = await window.MockAPI.getDashboardData();
            const examHistory = await window.MockAPI.getExamHistory();

            // Merge real exam history if available
            if (examHistory.length > 0) {
                dashboardData.recentExams = examHistory.slice(0, 5);

                // Recalculate stats from real data
                const totalExams = examHistory.length;
                const totalScore = examHistory.reduce((sum, exam) => sum + exam.score, 0);
                const avgScore = totalExams > 0 ? totalScore / totalExams : 0;

                dashboardData.userStats.totalExams = totalExams;
                dashboardData.userStats.averageScore = avgScore;
            }

            setData(dashboardData);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Initial data fetch
     */
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    /**
     * Auto-refresh data every refreshInterval
     */
    useEffect(() => {
        if (refreshInterval <= 0) return;

        const interval = setInterval(() => {
            fetchData();
        }, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval, fetchData]);

    /**
     * Filter data by date range
     */
    const filteredData = useMemo(() => {
        if (!data) return null;

        const now = new Date();
        let filterDate = new Date();

        switch (dateRange) {
            case 'week':
                filterDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                filterDate.setMonth(now.getMonth() - 1);
                break;
            case 'all':
                filterDate = new Date(0); // Beginning of time
                break;
            default:
                filterDate.setDate(now.getDate() - 7);
        }

        // Filter recent exams
        const filteredExams = data.recentExams.filter(exam => {
            const examDate = new Date(exam.date);
            return examDate >= filterDate;
        });

        return {
            ...data,
            recentExams: filteredExams
        };
    }, [data, dateRange]);

    /**
     * Get comparison data (current vs previous period)
     */
    const comparisonData = useMemo(() => {
        if (!data || !data.recentExams || data.recentExams.length === 0) return null;

        const now = new Date();
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);

        const thisWeek = data.recentExams.filter(exam => {
            const examDate = new Date(exam.date);
            return examDate >= weekAgo && examDate <= now;
        });

        const lastWeek = data.recentExams.filter(exam => {
            const examDate = new Date(exam.date);
            return examDate >= twoWeeksAgo && examDate < weekAgo;
        });

        const thisWeekAvg = thisWeek.length > 0
            ? thisWeek.reduce((sum, exam) => sum + exam.score, 0) / thisWeek.length
            : 0;

        const lastWeekAvg = lastWeek.length > 0
            ? lastWeek.reduce((sum, exam) => sum + exam.score, 0) / lastWeek.length
            : 0;

        return {
            thisWeek: {
                exams: thisWeek.length,
                avgScore: thisWeekAvg
            },
            lastWeek: {
                exams: lastWeek.length,
                avgScore: lastWeekAvg
            },
            change: {
                exams: thisWeek.length - lastWeek.length,
                score: thisWeekAvg - lastWeekAvg
            }
        };
    }, [data]);

    /**
     * Export data as JSON or CSV
     */
    const exportData = useCallback((format = 'json') => {
        try {
            const exportContent = window.MockAPI.exportData(format);
            const blob = new Blob([exportContent], {
                type: format === 'json' ? 'application/json' : 'text/csv'
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.${format}`;
            link.click();
            URL.revokeObjectURL(url);

            return true;
        } catch (err) {
            console.error('Export failed:', err);
            return false;
        }
    }, []);

    /**
     * Export as PDF
     */
    const exportPDF = useCallback(() => {
        if (!data) return false;

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Title
            doc.setFontSize(20);
            doc.text('Exam Dashboard Report', 20, 20);

            // Date
            doc.setFontSize(10);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

            // User Stats
            doc.setFontSize(14);
            doc.text('Performance Summary', 20, 45);
            doc.setFontSize(10);
            doc.text(`Total Exams: ${data.userStats.totalExams}`, 20, 55);
            doc.text(`Average Score: ${data.userStats.averageScore.toFixed(1)}%`, 20, 62);
            doc.text(`Study Streak: ${data.userStats.studyStreak} days`, 20, 69);

            // Recent Exams
            doc.setFontSize(14);
            doc.text('Recent Exams', 20, 85);
            doc.setFontSize(10);

            let y = 95;
            data.recentExams.slice(0, 5).forEach((exam, idx) => {
                const examDate = new Date(exam.date).toLocaleDateString();
                doc.text(`${idx + 1}. ${exam.name}`, 20, y);
                doc.text(`${examDate} - ${exam.score}%`, 30, y + 5);
                y += 15;
            });

            // Domain Performance
            doc.addPage();
            doc.setFontSize(14);
            doc.text('Domain Performance', 20, 20);
            doc.setFontSize(10);

            y = 30;
            data.domainPerformance.forEach((domain, idx) => {
                doc.text(`${domain.domain}: ${domain.accuracy.toFixed(1)}%`, 20, y);
                y += 7;
            });

            // Save
            doc.save(`dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);
            return true;
        } catch (err) {
            console.error('PDF export failed:', err);
            return false;
        }
    }, [data]);

    /**
     * Manually refresh data
     */
    const refresh = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return {
        data: filteredData,
        loading,
        error,
        lastUpdated,
        dateRange,
        setDateRange,
        comparisonData,
        exportData,
        exportPDF,
        refresh
    };
}

// Make hook available globally
window.useDashboardData = useDashboardData;
