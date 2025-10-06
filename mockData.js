// Mock Data for Dashboard
// This file provides sample data for testing and development

const STORAGE_KEY_DASHBOARD = 'examDashboardData';
const STORAGE_KEY_EXAMS = 'examHistory';

// Generate mock data
const generateMockData = () => {
    const now = new Date();

    return {
        userStats: {
            totalExams: 24,
            averageScore: 78.5,
            studyStreak: 7,
            totalQuestions: 480,
            totalStudyTime: 720, // minutes
            lastExamDate: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
            trend: {
                score: 5.2, // percentage increase
                exams: 2,
                streak: 3
            }
        },

        recentExams: [
            {
                id: 1,
                name: 'JavaScript Fundamentals',
                date: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
                score: 85,
                maxScore: 100,
                timeSpent: 45, // minutes
                status: 'completed',
                questionCount: 20
            },
            {
                id: 2,
                name: 'React Advanced Concepts',
                date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
                score: 72,
                maxScore: 100,
                timeSpent: 60,
                status: 'completed',
                questionCount: 30
            },
            {
                id: 3,
                name: 'Database Design',
                date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
                score: 90,
                maxScore: 100,
                timeSpent: 50,
                status: 'completed',
                questionCount: 25
            },
            {
                id: 4,
                name: 'System Architecture',
                date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
                score: 68,
                maxScore: 100,
                timeSpent: 55,
                status: 'completed',
                questionCount: 20
            },
            {
                id: 5,
                name: 'API Development',
                date: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(),
                score: 82,
                maxScore: 100,
                timeSpent: 40,
                status: 'completed',
                questionCount: 15
            }
        ],

        domainPerformance: [
            {
                domain: 'JavaScript Basics',
                accuracy: 92,
                questionsAnswered: 85,
                totalQuestions: 92,
                averageTime: 45
            },
            {
                domain: 'React Components',
                accuracy: 78,
                questionsAnswered: 62,
                totalQuestions: 79,
                averageTime: 60
            },
            {
                domain: 'State Management',
                accuracy: 85,
                questionsAnswered: 45,
                totalQuestions: 53,
                averageTime: 50
            },
            {
                domain: 'Database Design',
                accuracy: 88,
                questionsAnswered: 67,
                totalQuestions: 76,
                averageTime: 55
            },
            {
                domain: 'API Development',
                accuracy: 75,
                questionsAnswered: 48,
                totalQuestions: 64,
                averageTime: 42
            },
            {
                domain: 'System Architecture',
                accuracy: 65,
                questionsAnswered: 39,
                totalQuestions: 60,
                averageTime: 70
            },
            {
                domain: 'Security',
                accuracy: 58,
                questionsAnswered: 29,
                totalQuestions: 50,
                averageTime: 65
            }
        ],

        studyAnalytics: {
            dailyProgress: [
                { date: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString(), score: 72, questionsAttempted: 15 },
                { date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(), score: 75, questionsAttempted: 20 },
                { date: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(), score: 78, questionsAttempted: 18 },
                { date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(), score: 82, questionsAttempted: 22 },
                { date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), score: 80, questionsAttempted: 25 },
                { date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), score: 85, questionsAttempted: 20 },
                { date: now.toISOString(), score: 88, questionsAttempted: 16 }
            ],

            weeklyStudyTime: [
                { day: 'Mon', hours: 1.5 },
                { day: 'Tue', hours: 2.0 },
                { day: 'Wed', hours: 1.2 },
                { day: 'Thu', hours: 2.5 },
                { day: 'Fri', hours: 1.8 },
                { day: 'Sat', hours: 3.0 },
                { day: 'Sun', hours: 2.2 }
            ],

            peakHours: [
                { hour: '6 AM', activity: 5 },
                { hour: '9 AM', activity: 15 },
                { hour: '12 PM', activity: 8 },
                { hour: '3 PM', activity: 12 },
                { hour: '6 PM', activity: 25 },
                { hour: '9 PM', activity: 30 },
                { hour: '12 AM', activity: 10 }
            ]
        },

        weakAreas: [
            {
                domain: 'Security',
                accuracy: 58,
                questionsAttempted: 29,
                recommendation: 'Focus on authentication and encryption concepts',
                priority: 'high'
            },
            {
                domain: 'System Architecture',
                accuracy: 65,
                questionsAttempted: 39,
                recommendation: 'Review microservices and scaling patterns',
                priority: 'medium'
            },
            {
                domain: 'API Development',
                accuracy: 75,
                questionsAttempted: 48,
                recommendation: 'Practice RESTful design principles',
                priority: 'low'
            }
        ],

        achievements: [
            {
                id: 1,
                name: 'First Steps',
                description: 'Complete your first exam',
                icon: '🎯',
                unlocked: true,
                unlockedDate: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                name: 'Week Warrior',
                description: 'Maintain a 7-day study streak',
                icon: '🔥',
                unlocked: true,
                unlockedDate: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                name: 'Perfect Score',
                description: 'Score 100% on any exam',
                icon: '💯',
                unlocked: false,
                progress: 90
            },
            {
                id: 4,
                name: 'Speed Demon',
                description: 'Complete an exam in under 30 minutes',
                icon: '⚡',
                unlocked: true,
                unlockedDate: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 5,
                name: 'Marathon Runner',
                description: 'Complete 50 exams',
                icon: '🏃',
                unlocked: false,
                progress: 48
            },
            {
                id: 6,
                name: 'Master Mind',
                description: 'Achieve 90%+ average across all domains',
                icon: '🧠',
                unlocked: false,
                progress: 65
            }
        ],

        recommendations: [
            {
                type: 'practice',
                title: 'Security Fundamentals Quiz',
                reason: 'Based on your weak areas',
                estimatedTime: 30
            },
            {
                type: 'review',
                title: 'Review System Architecture Notes',
                reason: 'Low accuracy in recent exam',
                estimatedTime: 20
            }
        ],

        goals: {
            current: {
                target: 'Reach 85% average score',
                current: 78.5,
                target_value: 85,
                deadline: new Date(now + 14 * 24 * 60 * 60 * 1000).toISOString()
            },
            milestones: [
                { name: '10 Exams', completed: true },
                { name: '20 Exams', completed: true },
                { name: '50 Exams', completed: false, progress: 48 },
                { name: '100 Exams', completed: false, progress: 24 }
            ]
        }
    };
};

// API-like functions for data management
const MockAPI = {
    // Get all dashboard data
    getDashboardData: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const cached = localStorage.getItem(STORAGE_KEY_DASHBOARD);
                if (cached) {
                    resolve(JSON.parse(cached));
                } else {
                    const data = generateMockData();
                    localStorage.setItem(STORAGE_KEY_DASHBOARD, JSON.stringify(data));
                    resolve(data);
                }
            }, 500); // Simulate network delay
        });
    },

    // Get exam history from actual exams
    getExamHistory: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const history = localStorage.getItem(STORAGE_KEY_EXAMS);
                if (history) {
                    resolve(JSON.parse(history));
                } else {
                    resolve([]);
                }
            }, 300);
        });
    },

    // Save exam result
    saveExamResult: (examResult) => {
        return new Promise((resolve) => {
            const history = JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS) || '[]');
            history.unshift(examResult); // Add to beginning

            // Keep only last 50 exams
            if (history.length > 50) {
                history.splice(50);
            }

            localStorage.setItem(STORAGE_KEY_EXAMS, JSON.stringify(history));

            // Update dashboard data
            updateDashboardStats(examResult);
            resolve(true);
        });
    },

    // Export data
    exportData: (format = 'json') => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY_DASHBOARD) || '{}');
        const history = JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS) || '[]');

        const exportData = {
            dashboard: data,
            examHistory: history,
            exportDate: new Date().toISOString()
        };

        if (format === 'json') {
            return JSON.stringify(exportData, null, 2);
        }

        // CSV format
        let csv = 'Exam Name,Date,Score,Time Spent,Status\n';
        history.forEach(exam => {
            csv += `"${exam.name}","${exam.date}",${exam.score},${exam.timeSpent},"${exam.status}"\n`;
        });
        return csv;
    },

    // Clear all data
    clearData: () => {
        localStorage.removeItem(STORAGE_KEY_DASHBOARD);
        localStorage.removeItem(STORAGE_KEY_EXAMS);
    }
};

// Update dashboard statistics
function updateDashboardStats(newExamResult) {
    const dashboardData = JSON.parse(localStorage.getItem(STORAGE_KEY_DASHBOARD) || JSON.stringify(generateMockData()));

    // Update user stats
    dashboardData.userStats.totalExams += 1;
    dashboardData.userStats.totalQuestions += newExamResult.questionCount || 0;
    dashboardData.userStats.totalStudyTime += newExamResult.timeSpent || 0;
    dashboardData.userStats.lastExamDate = newExamResult.date;

    // Recalculate average score
    const history = JSON.parse(localStorage.getItem(STORAGE_KEY_EXAMS) || '[]');
    const totalScore = history.reduce((sum, exam) => sum + (exam.score || 0), 0);
    dashboardData.userStats.averageScore = history.length > 0 ? totalScore / history.length : 0;

    // Update recent exams
    dashboardData.recentExams.unshift(newExamResult);
    if (dashboardData.recentExams.length > 5) {
        dashboardData.recentExams.pop();
    }

    localStorage.setItem(STORAGE_KEY_DASHBOARD, JSON.stringify(dashboardData));
}

// Make MockAPI available globally
window.MockAPI = MockAPI;
