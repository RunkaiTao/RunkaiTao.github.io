/**
 * Time Tracking Charts Library
 * Provides visualization for time distribution across different activity categories
 * Categories: Running, Workout, Work, Study, Personal, Chores, Other, Rest
 */

class TimeCharts {
    constructor() {
        this.categories = {
            'Running': '#FF6B6B',     // Orange-red
            'Workout': '#4ECDC4',     // Teal/Green
            'Physics': '#45B7D1',     // Blue
            'CS': '#96CEB4',          // Light green
            'Other': '#F39C12'        // Orange
        };
        
        this.currentDate = new Date();
        this.loadData();
    }

    loadData() {
        // Load data from Jekyll
        this.tasksData = window.tasksData || {};
        this.runningData = window.runningData || {};
        this.workoutsData = window.workoutsData || {};
    }

    // Parse time string to minutes (formats: "MM:SS", "HH:MM:SS", "MM")
    parseTimeToMinutes(timeString) {
        if (!timeString) return 0;
        
        const parts = timeString.toString().split(':');
        if (parts.length === 1) {
            // Just minutes
            return parseInt(parts[0]) || 0;
        } else if (parts.length === 2) {
            // MM:SS format
            const minutes = parseInt(parts[0]) || 0;
            const seconds = parseInt(parts[1]) || 0;
            return minutes + (seconds / 60);
        } else if (parts.length === 3) {
            // HH:MM:SS format
            const hours = parseInt(parts[0]) || 0;
            const minutes = parseInt(parts[1]) || 0;
            const seconds = parseInt(parts[2]) || 0;
            return (hours * 60) + minutes + (seconds / 60);
        }
        return 0;
    }

    // Format date to YYYY-MM-DD string
    formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Get data for a specific date
    getDataForDate(date) {
        const dateKey = this.formatDateKey(date);
        const data = {
            'Running': 0,
            'Workout': 0,
            'Physics': 0,
            'CS': 0,
            'Other': 0
        };

        // Add running data
        if (this.runningData[dateKey]) {
            data['Running'] = this.parseTimeToMinutes(this.runningData[dateKey].time_duration);
        }

        // Add workout data
        if (this.workoutsData[dateKey]) {
            data['Workout'] = this.parseTimeToMinutes(this.workoutsData[dateKey].time_duration);
        }

        // Add task data (convert pomodoros to minutes: 1 pomo = 30 min)
        if (this.tasksData[dateKey]) {
            this.tasksData[dateKey].forEach(task => {
                const category = task.category || 'Other';
                const minutes = (task.used_pomodoros || 0) * 30;
                if (data.hasOwnProperty(category)) {
                    data[category] += minutes;
                } else {
                    data['Other'] += minutes;
                }
            });
        }

        return data;
    }

    // Get week data starting from a given date
    getWeekData(startDate) {
        const weekData = [];
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayData = this.getDataForDate(currentDate);
            weekData.push({
                day: dayNames[i],
                date: currentDate.getDate(),
                ...dayData
            });
        }
        
        return weekData;
    }

    // Get start of week (Monday)
    getStartOfWeek(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(d.setDate(diff));
    }

    // Get month data
    getMonthData(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const monthData = {
            'Running': 0,
            'Workout': 0,
            'Physics': 0,
            'CS': 0,
            'Other': 0
        };

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(year, month, day);
            const dayData = this.getDataForDate(currentDate);
            
            Object.keys(monthData).forEach(category => {
                monthData[category] += dayData[category];
            });
        }

        return monthData;
    }

    // Create daily bar chart
    createDailyBarChart(canvasId, date = null) {
        const targetDate = date || this.currentDate;
        const startOfWeek = this.getStartOfWeek(targetDate);
        const weekData = this.getWeekData(startOfWeek);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Convert minutes to hours for display
        const datasets = Object.keys(this.categories).map(category => ({
            label: category,
            data: weekData.map(day => (day[category] / 60).toFixed(1)), // Convert to hours
            backgroundColor: this.categories[category],
            borderRadius: 4
        }));

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weekData.map(day => day.day),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "This Week's Task Breakdown",
                        font: { size: 16, weight: 'bold' },
                        color: '#333',
                        padding: 20
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}h`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { font: { size: 12 } }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours',
                            font: { size: 12 }
                        },
                        grid: { color: '#f0f0f0' },
                        ticks: { font: { size: 11 } }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Create monthly donut chart
    createMonthlyDonutChart(canvasId, date = null) {
        const targetDate = date || this.currentDate;
        const monthData = this.getMonthData(targetDate);
        
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        // Filter out categories with zero data
        const nonZeroData = Object.entries(monthData).filter(([_, value]) => value > 0);
        const labels = nonZeroData.map(([category, _]) => category);
        const data = nonZeroData.map(([_, value]) => (value / 60).toFixed(1)); // Convert to hours
        const colors = nonZeroData.map(([category, _]) => this.categories[category]);

        const total = data.reduce((sum, val) => sum + parseFloat(val), 0);

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "This Month's Task Breakdown",
                        font: { size: 16, weight: 'bold' },
                        color: '#333',
                        padding: 20
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: { size: 12 },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const value = data.datasets[0].data[i];
                                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                        return {
                                            text: `${label} (${percentage}%)`,
                                            fillStyle: data.datasets[0].backgroundColor[i],
                                            strokeStyle: data.datasets[0].backgroundColor[i],
                                            lineWidth: 0,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${context.label}: ${value}h (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '50%'
            }
        });
    }

    // Initialize charts with navigation controls
    initializeCharts(dailyCanvasId, monthlyCanvasId) {
        let currentWeekStart = this.getStartOfWeek(this.currentDate);
        let currentMonth = new Date(this.currentDate);
        
        let dailyChart = this.createDailyBarChart(dailyCanvasId, currentWeekStart);
        let monthlyChart = this.createMonthlyDonutChart(monthlyCanvasId, currentMonth);

        // Week navigation
        const prevWeekBtn = document.getElementById('prev-week-chart');
        const nextWeekBtn = document.getElementById('next-week-chart');
        const weekDisplay = document.getElementById('current-week-display');

        const updateWeekDisplay = () => {
            const endOfWeek = new Date(currentWeekStart);
            endOfWeek.setDate(currentWeekStart.getDate() + 6);
            weekDisplay.textContent = `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        };

        if (prevWeekBtn) {
            prevWeekBtn.addEventListener('click', () => {
                currentWeekStart.setDate(currentWeekStart.getDate() - 7);
                dailyChart.destroy();
                dailyChart = this.createDailyBarChart(dailyCanvasId, currentWeekStart);
                updateWeekDisplay();
            });
        }

        if (nextWeekBtn) {
            nextWeekBtn.addEventListener('click', () => {
                currentWeekStart.setDate(currentWeekStart.getDate() + 7);
                dailyChart.destroy();
                dailyChart = this.createDailyBarChart(dailyCanvasId, currentWeekStart);
                updateWeekDisplay();
            });
        }

        // Month navigation
        const prevMonthBtn = document.getElementById('prev-month-chart');
        const nextMonthBtn = document.getElementById('next-month-chart');
        const monthDisplay = document.getElementById('current-month-display');

        const updateMonthDisplay = () => {
            monthDisplay.textContent = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        };

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentMonth.setMonth(currentMonth.getMonth() - 1);
                monthlyChart.destroy();
                monthlyChart = this.createMonthlyDonutChart(monthlyCanvasId, currentMonth);
                updateMonthDisplay();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentMonth.setMonth(currentMonth.getMonth() + 1);
                monthlyChart.destroy();
                monthlyChart = this.createMonthlyDonutChart(monthlyCanvasId, currentMonth);
                updateMonthDisplay();
            });
        }

        // Initial display update
        updateWeekDisplay();
        updateMonthDisplay();

        return { dailyChart, monthlyChart };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if Chart.js is available and charts containers exist
    if (typeof Chart !== 'undefined' && 
        document.getElementById('dailyChart') && 
        document.getElementById('monthlyChart')) {
        
        window.timeCharts = new TimeCharts();
        window.timeCharts.initializeCharts('dailyChart', 'monthlyChart');
    }
});