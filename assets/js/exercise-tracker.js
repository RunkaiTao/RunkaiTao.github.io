// Exercise Tracker JavaScript
// Handles data visualization and table management for running data

class ExerciseTracker {
    constructor() {
        this.runningData = window.runningData || {};
        this.sortedData = [];
        this.filteredData = [];
        this.distanceChart = null;
        this.timeChart = null;
        
        this.init();
    }

    init() {
        this.processData();
        this.updateSummaryStats();
        this.initializeCharts();
        this.populateTable();
        this.setupEventListeners();
        
        // Show no data message if no data exists
        if (Object.keys(this.runningData).length === 0) {
            this.showNoDataState();
        }
    }

    processData() {
        // Convert object to array and sort by date
        this.sortedData = Object.entries(this.runningData)
            .map(([date, data]) => ({
                date: date,
                dateObj: new Date(date),
                distance: parseFloat(data.distance_miles),
                time: parseInt(data.time_minutes),
                pace: parseFloat(data.pace_per_mile),
                notes: data.notes || ''
            }))
            .sort((a, b) => b.dateObj - a.dateObj); // Newest first
        
        this.filteredData = [...this.sortedData];
    }

    updateSummaryStats() {
        if (this.sortedData.length === 0) return;

        const totalDistance = this.sortedData.reduce((sum, run) => sum + run.distance, 0);
        const totalRuns = this.sortedData.length;
        const avgDistance = totalDistance / totalRuns;
        const avgPace = this.sortedData.reduce((sum, run) => sum + run.pace, 0) / totalRuns;

        // Update DOM elements
        document.getElementById('total-distance').textContent = totalDistance.toFixed(1);
        document.getElementById('total-runs').textContent = totalRuns;
        document.getElementById('avg-distance').textContent = avgDistance.toFixed(1);
        document.getElementById('avg-pace').textContent = avgPace.toFixed(2);
    }

    initializeCharts() {
        if (this.sortedData.length === 0) return;

        // Prepare data for charts (chronological order)
        const chartData = [...this.sortedData].reverse();
        const dates = chartData.map(run => this.formatDate(run.date));
        const distances = chartData.map(run => run.distance);
        const times = chartData.map(run => run.time);

        // Distance Chart
        const distanceCtx = document.getElementById('distanceChart').getContext('2d');
        this.distanceChart = new Chart(distanceCtx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Distance (miles)',
                    data: distances,
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#FF6B6B',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Distance (miles)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Distance: ${context.parsed.y} miles`;
                            }
                        }
                    }
                }
            }
        });

        // Time Chart
        const timeCtx = document.getElementById('timeChart').getContext('2d');
        this.timeChart = new Chart(timeCtx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Time (minutes)',
                    data: times,
                    borderColor: '#4ECDC4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4ECDC4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Time (minutes)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Time: ${context.parsed.y} minutes`;
                            }
                        }
                    }
                }
            }
        });
    }

    populateTable() {
        const tbody = document.getElementById('running-tbody');
        tbody.innerHTML = '';

        if (this.filteredData.length === 0) {
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5;
            cell.textContent = 'No data found.';
            cell.style.textAlign = 'center';
            cell.style.padding = '2rem';
            cell.style.color = '#666';
            return;
        }

        this.filteredData.forEach((run, index) => {
            const row = tbody.insertRow();
            
            // Date
            const dateCell = row.insertCell(0);
            dateCell.textContent = this.formatDate(run.date);
            
            // Distance
            const distanceCell = row.insertCell(1);
            distanceCell.textContent = run.distance.toFixed(1);
            
            // Time
            const timeCell = row.insertCell(2);
            timeCell.textContent = run.time;
            
            // Pace
            const paceCell = row.insertCell(3);
            paceCell.textContent = run.pace.toFixed(2);
            
            // Notes
            const notesCell = row.insertCell(4);
            notesCell.textContent = run.notes;
            
            // Add hover effect
            row.addEventListener('mouseenter', () => {
                row.classList.add('highlight');
            });
            
            row.addEventListener('mouseleave', () => {
                row.classList.remove('highlight');
            });
        });
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.filterData(e.target.value);
        });

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortData(e.target.value);
        });
    }

    filterData(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            this.filteredData = [...this.sortedData];
        } else {
            this.filteredData = this.sortedData.filter(run => {
                return (
                    run.date.toLowerCase().includes(term) ||
                    run.distance.toString().includes(term) ||
                    run.time.toString().includes(term) ||
                    run.pace.toString().includes(term) ||
                    run.notes.toLowerCase().includes(term)
                );
            });
        }
        
        this.populateTable();
    }

    sortData(sortType) {
        switch (sortType) {
            case 'date-desc':
                this.filteredData.sort((a, b) => b.dateObj - a.dateObj);
                break;
            case 'date-asc':
                this.filteredData.sort((a, b) => a.dateObj - b.dateObj);
                break;
            case 'distance-desc':
                this.filteredData.sort((a, b) => b.distance - a.distance);
                break;
            case 'distance-asc':
                this.filteredData.sort((a, b) => a.distance - b.distance);
                break;
            case 'pace-desc':
                this.filteredData.sort((a, b) => b.pace - a.pace);
                break;
            case 'pace-asc':
                this.filteredData.sort((a, b) => a.pace - b.pace);
                break;
        }
        
        this.populateTable();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    showNoDataState() {
        document.querySelector('.stats-summary').style.display = 'none';
        document.querySelector('.charts-section').style.display = 'none';
        document.querySelector('.data-table-section').style.display = 'none';
        document.getElementById('no-data').style.display = 'block';
    }
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new ExerciseTracker();
});

// Handle window resize for chart responsiveness
window.addEventListener('resize', function() {
    if (window.exerciseTracker && window.exerciseTracker.distanceChart) {
        window.exerciseTracker.distanceChart.resize();
    }
    if (window.exerciseTracker && window.exerciseTracker.timeChart) {
        window.exerciseTracker.timeChart.resize();
    }
});

// Export for global access if needed
window.ExerciseTracker = ExerciseTracker;