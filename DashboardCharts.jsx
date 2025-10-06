/**
 * Dashboard Chart Components
 * Chart visualizations using Chart.js
 */

const { useEffect, useRef, memo } = React;

/**
 * Domain Performance Bar Chart
 * Horizontal bar chart showing accuracy by domain
 */
const DomainPerformanceChart = memo(({ domainData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !domainData) return;

        const ctx = chartRef.current.getContext('2d');

        // Destroy previous chart instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Sort domains by accuracy
        const sortedData = [...domainData].sort((a, b) => b.accuracy - a.accuracy);

        // Color-code based on accuracy
        const backgroundColors = sortedData.map(domain => {
            if (domain.accuracy >= 80) return '#10b981'; // Green
            if (domain.accuracy >= 60) return '#f59e0b'; // Yellow
            return '#ef4444'; // Red
        });

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedData.map(d => d.domain),
                datasets: [{
                    label: 'Accuracy %',
                    data: sortedData.map(d => d.accuracy),
                    backgroundColor: backgroundColors,
                    borderRadius: 6,
                    barThickness: 30
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const domain = sortedData[context.dataIndex];
                                return [
                                    `Accuracy: ${domain.accuracy}%`,
                                    `Questions: ${domain.questionsAnswered}/${domain.totalQuestions}`,
                                    `Avg Time: ${domain.averageTime}s`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [domainData]);

    return (
        <div className="dashboard-card chart-card">
            <h3>Domain Performance</h3>
            <div className="chart-container" style={{ height: '400px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
            <div className="chart-legend">
                <span className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#10b981' }}></span>
                    Excellent (80%+)
                </span>
                <span className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
                    Good (60-80%)
                </span>
                <span className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
                    Needs Work (&lt;60%)
                </span>
            </div>
        </div>
    );
});

/**
 * Study Progress Line Chart
 * Shows daily/weekly progress over time
 */
const StudyProgressChart = memo(({ progressData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !progressData) return;

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = progressData.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Score',
                        data: progressData.map(d => d.score),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Questions Attempted',
                        data: progressData.map(d => d.questionsAttempted),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14
                        },
                        bodyFont: {
                            size: 13
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Score %'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Questions'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [progressData]);

    return (
        <div className="dashboard-card chart-card">
            <h3>Study Progress</h3>
            <div className="chart-container" style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
});

/**
 * Weekly Study Time Chart
 * Bar chart showing study time distribution across the week
 */
const WeeklyStudyTimeChart = memo(({ weeklyData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !weeklyData) return;

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const maxHours = Math.max(...weeklyData.map(d => d.hours));

        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeklyData.map(d => d.day),
                datasets: [{
                    label: 'Study Hours',
                    data: weeklyData.map(d => d.hours),
                    backgroundColor: weeklyData.map(d => {
                        if (d.hours === maxHours) return '#8b5cf6';
                        return '#a78bfa';
                    }),
                    borderRadius: 8,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const hours = context.parsed.y;
                                const minutes = Math.round((hours % 1) * 60);
                                return `${Math.floor(hours)}h ${minutes}m`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [weeklyData]);

    const totalHours = weeklyData ? weeklyData.reduce((sum, d) => sum + d.hours, 0) : 0;

    return (
        <div className="dashboard-card chart-card">
            <div className="card-header">
                <h3>Weekly Study Time</h3>
                <div className="total-hours">
                    {totalHours.toFixed(1)} hours this week
                </div>
            </div>
            <div className="chart-container" style={{ height: '250px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
});

/**
 * Study Calendar Heat Map
 * Visual representation of study consistency
 */
const StudyCalendarHeatMap = memo(({ dailyData }) => {
    // Generate last 30 days of data
    const generateCalendarData = () => {
        const days = [];
        const now = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);

            // Find matching data
            const dataPoint = dailyData.find(d => {
                const dDate = new Date(d.date);
                return dDate.toDateString() === date.toDateString();
            });

            days.push({
                date: date.toISOString(),
                score: dataPoint ? dataPoint.score : 0,
                questions: dataPoint ? dataPoint.questionsAttempted : 0
            });
        }

        return days;
    };

    const calendarData = generateCalendarData();

    const getIntensity = (score) => {
        if (score === 0) return 'intensity-0';
        if (score < 50) return 'intensity-1';
        if (score < 70) return 'intensity-2';
        if (score < 85) return 'intensity-3';
        return 'intensity-4';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="dashboard-card calendar-card">
            <h3>Study Consistency</h3>
            <div className="calendar-heatmap">
                {calendarData.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${getIntensity(day.score)}`}
                        title={`${formatDate(day.date)}: ${day.score}% (${day.questions} questions)`}
                    >
                        <span className="day-label">
                            {new Date(day.date).getDate()}
                        </span>
                    </div>
                ))}
            </div>
            <div className="calendar-legend">
                <span>Less</span>
                <div className="legend-boxes">
                    <div className="legend-box intensity-0"></div>
                    <div className="legend-box intensity-1"></div>
                    <div className="legend-box intensity-2"></div>
                    <div className="legend-box intensity-3"></div>
                    <div className="legend-box intensity-4"></div>
                </div>
                <span>More</span>
            </div>
        </div>
    );
});

/**
 * Peak Hours Activity Chart
 * Shows when user is most active
 */
const PeakHoursChart = memo(({ peakHoursData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current || !peakHoursData) return;

        const ctx = chartRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: peakHoursData.map(d => d.hour),
                datasets: [{
                    label: 'Activity Level',
                    data: peakHoursData.map(d => d.activity),
                    backgroundColor: 'rgba(249, 115, 22, 0.2)',
                    borderColor: '#f97316',
                    pointBackgroundColor: '#f97316',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#f97316'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [peakHoursData]);

    return (
        <div className="dashboard-card chart-card">
            <h3>Peak Study Hours</h3>
            <div className="chart-container" style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
});

// Make chart components available globally
window.DashboardCharts = {
    DomainPerformanceChart,
    StudyProgressChart,
    WeeklyStudyTimeChart,
    StudyCalendarHeatMap,
    PeakHoursChart
};
