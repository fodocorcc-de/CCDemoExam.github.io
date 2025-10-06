/**
 * Dashboard Card Components
 * Reusable card components for the dashboard
 */

const { useState, useEffect, memo } = React;

/**
 * Performance Summary Card
 * Displays total exams, average score, and streak with circular progress
 */
const PerformanceSummaryCard = memo(({ stats, comparisonData }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Animate score on mount
        let current = 0;
        const target = stats.averageScore;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setAnimatedScore(target);
                clearInterval(timer);
            } else {
                setAnimatedScore(current);
            }
        }, 20);

        return () => clearInterval(timer);
    }, [stats.averageScore]);

    const getTrendIcon = (value) => {
        if (value > 0) return '📈';
        if (value < 0) return '📉';
        return '➡️';
    };

    return (
        <div className="dashboard-card performance-card">
            <h3>Performance Summary</h3>

            <div className="stats-grid">
                <div className="stat-item">
                    <div className="circular-progress">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" className="progress-bg"/>
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                className="progress-fill"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - animatedScore / 100)}`}
                            />
                            <text x="50" y="50" className="progress-text">
                                {Math.round(animatedScore)}%
                            </text>
                        </svg>
                    </div>
                    <div className="stat-label">Average Score</div>
                    {comparisonData && (
                        <div className="stat-trend">
                            {getTrendIcon(comparisonData.change.score)}
                            {Math.abs(comparisonData.change.score).toFixed(1)}% from last week
                        </div>
                    )}
                </div>

                <div className="stat-item">
                    <div className="stat-value">{stats.totalExams}</div>
                    <div className="stat-label">Total Exams</div>
                    {comparisonData && (
                        <div className="stat-trend">
                            {getTrendIcon(comparisonData.change.exams)}
                            {Math.abs(comparisonData.change.exams)} from last week
                        </div>
                    )}
                </div>

                <div className="stat-item">
                    <div className="stat-value">{stats.studyStreak} 🔥</div>
                    <div className="stat-label">Day Streak</div>
                    <div className="stat-trend">Keep it up!</div>
                </div>

                <div className="stat-item">
                    <div className="stat-value">{stats.totalQuestions}</div>
                    <div className="stat-label">Questions Answered</div>
                </div>
            </div>
        </div>
    );
});

/**
 * Recent Exams Table Card
 * Shows the most recent exams with details
 */
const RecentExamsCard = memo(({ exams, onExamClick }) => {
    const getStatusBadge = (status) => {
        const badges = {
            completed: <span className="badge badge-success">Completed</span>,
            'in-progress': <span className="badge badge-warning">In Progress</span>,
            failed: <span className="badge badge-danger">Failed</span>
        };
        return badges[status] || badges.completed;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'score-high';
        if (score >= 60) return 'score-medium';
        return 'score-low';
    };

    return (
        <div className="dashboard-card recent-exams-card">
            <div className="card-header">
                <h3>Recent Exams</h3>
                <button className="btn-link">View All</button>
            </div>

            <div className="table-responsive">
                <table className="exams-table">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exams.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No exams yet. Start your first exam!
                                </td>
                            </tr>
                        ) : (
                            exams.map((exam) => (
                                <tr
                                    key={exam.id}
                                    onClick={() => onExamClick && onExamClick(exam)}
                                    className="exam-row"
                                >
                                    <td>
                                        <div className="exam-name">{exam.name}</div>
                                        <div className="exam-questions">
                                            {exam.questionCount} questions
                                        </div>
                                    </td>
                                    <td>{formatDate(exam.date)}</td>
                                    <td>
                                        <span className={`score ${getScoreColor(exam.score)}`}>
                                            {exam.score}%
                                        </span>
                                    </td>
                                    <td>{exam.timeSpent} min</td>
                                    <td>{getStatusBadge(exam.status)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

/**
 * Weak Areas Alert Card
 * Highlights domains that need improvement
 */
const WeakAreasCard = memo(({ weakAreas, onPractice }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            high: 'priority-high',
            medium: 'priority-medium',
            low: 'priority-low'
        };
        return colors[priority] || 'priority-low';
    };

    return (
        <div className="dashboard-card weak-areas-card">
            <div className="card-header">
                <h3>⚠️ Areas to Improve</h3>
            </div>

            <div className="weak-areas-list">
                {weakAreas.length === 0 ? (
                    <div className="no-weak-areas">
                        <span className="emoji">🎉</span>
                        <p>Great job! No weak areas detected.</p>
                    </div>
                ) : (
                    weakAreas.map((area, index) => (
                        <div key={index} className={`weak-area-item ${getPriorityColor(area.priority)}`}>
                            <div className="weak-area-header">
                                <div className="domain-name">{area.domain}</div>
                                <div className="accuracy">{area.accuracy}%</div>
                            </div>

                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${area.accuracy}%` }}
                                />
                            </div>

                            <div className="recommendation">
                                💡 {area.recommendation}
                            </div>

                            <div className="weak-area-footer">
                                <span className="questions-count">
                                    {area.questionsAttempted} questions attempted
                                </span>
                                <button
                                    className="btn-practice"
                                    onClick={() => onPractice && onPractice(area.domain)}
                                >
                                    Practice Now
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});

/**
 * Achievements Card
 * Displays unlocked and locked achievements
 */
const AchievementsCard = memo(({ achievements }) => {
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalCount = achievements.length;

    return (
        <div className="dashboard-card achievements-card">
            <div className="card-header">
                <h3>🏆 Achievements</h3>
                <div className="achievement-progress">
                    {unlockedCount} / {totalCount}
                </div>
            </div>

            <div className="achievements-grid">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        onClick={() => setSelectedAchievement(achievement)}
                        onMouseEnter={() => setSelectedAchievement(achievement)}
                        onMouseLeave={() => setSelectedAchievement(null)}
                    >
                        <div className="achievement-icon">{achievement.icon}</div>
                        <div className="achievement-name">{achievement.name}</div>

                        {!achievement.unlocked && achievement.progress && (
                            <div className="achievement-progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${achievement.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedAchievement && (
                <div className="achievement-tooltip">
                    <strong>{selectedAchievement.name}</strong>
                    <p>{selectedAchievement.description}</p>
                    {selectedAchievement.unlocked && selectedAchievement.unlockedDate && (
                        <small>
                            Unlocked on {new Date(selectedAchievement.unlockedDate).toLocaleDateString()}
                        </small>
                    )}
                    {!selectedAchievement.unlocked && selectedAchievement.progress && (
                        <small>{selectedAchievement.progress}% complete</small>
                    )}
                </div>
            )}
        </div>
    );
});

/**
 * Quick Actions Panel
 * Provides quick access to common actions
 */
const QuickActionsCard = memo(({ lastExam, onStartExam, onReviewBookmarks, onResume }) => {
    const hasLastExam = lastExam && lastExam.status === 'in-progress';

    return (
        <div className="dashboard-card quick-actions-card">
            <h3>Quick Actions</h3>

            <div className="actions-grid">
                {hasLastExam && (
                    <button className="action-btn action-resume" onClick={onResume}>
                        <span className="action-icon">▶️</span>
                        <div className="action-content">
                            <div className="action-title">Resume Exam</div>
                            <div className="action-subtitle">{lastExam.name}</div>
                        </div>
                    </button>
                )}

                <button className="action-btn action-start" onClick={onStartExam}>
                    <span className="action-icon">🎯</span>
                    <div className="action-content">
                        <div className="action-title">Start New Exam</div>
                        <div className="action-subtitle">Choose from library</div>
                    </div>
                </button>

                <button className="action-btn action-bookmarks" onClick={onReviewBookmarks}>
                    <span className="action-icon">🔖</span>
                    <div className="action-content">
                        <div className="action-title">Review Bookmarks</div>
                        <div className="action-subtitle">Saved questions</div>
                    </div>
                </button>

                <button className="action-btn action-practice" onClick={() => onStartExam('practice')}>
                    <span className="action-icon">📝</span>
                    <div className="action-content">
                        <div className="action-title">Practice Mode</div>
                        <div className="action-subtitle">Random questions</div>
                    </div>
                </button>
            </div>
        </div>
    );
});

/**
 * Goal Progress Card
 * Shows current goal and progress
 */
const GoalProgressCard = memo(({ goals }) => {
    if (!goals || !goals.current) return null;

    const progressPercent = (goals.current.current / goals.current.target_value) * 100;
    const daysLeft = Math.ceil(
        (new Date(goals.current.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="dashboard-card goal-card">
            <h3>Current Goal</h3>

            <div className="goal-content">
                <div className="goal-title">{goals.current.target}</div>

                <div className="goal-progress">
                    <div className="goal-stats">
                        <span>{goals.current.current}%</span>
                        <span>{goals.current.target_value}%</span>
                    </div>
                    <div className="goal-progress-bar">
                        <div
                            className="progress"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                    </div>
                </div>

                <div className="goal-footer">
                    <span>{daysLeft} days remaining</span>
                    <span>{progressPercent.toFixed(0)}% complete</span>
                </div>
            </div>

            <div className="milestones">
                <h4>Milestones</h4>
                <div className="milestone-list">
                    {goals.milestones.map((milestone, index) => (
                        <div key={index} className={`milestone ${milestone.completed ? 'completed' : ''}`}>
                            <span className="milestone-icon">
                                {milestone.completed ? '✅' : '⭕'}
                            </span>
                            <span className="milestone-name">{milestone.name}</span>
                            {!milestone.completed && milestone.progress && (
                                <span className="milestone-progress">
                                    {milestone.progress}%
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

// Make components available globally
window.DashboardCards = {
    PerformanceSummaryCard,
    RecentExamsCard,
    WeakAreasCard,
    AchievementsCard,
    QuickActionsCard,
    GoalProgressCard
};
