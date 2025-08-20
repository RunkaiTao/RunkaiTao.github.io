// Workout Tracker JavaScript
// Handles data visualization and exercise progress tracking

class WorkoutTracker {
    constructor() {
        this.workoutData = window.workoutData || {};
        this.processedData = [];
        this.filteredData = [];
        this.displayedData = [];
        this.currentCategory = 'chest';
        this.exerciseCharts = {};
        this.entriesPerLoad = 20;
        this.currentOffset = 0;
        this.currentTimeFilter = 'recent';
        
        // Debug data loading
        console.log('Workout data loaded:', this.workoutData);
        console.log('Number of workout dates:', Object.keys(this.workoutData).length);
        
        this.init();
    }

    init() {
        this.processData();
        this.updateSummaryStats();
        this.setupEventListeners();
        this.setupPagination();
        this.displayCharts();
        this.populateRecentWorkouts();
        this.setTimeFilter('recent'); // Default to recent filter
        
        // Show no data message if no data exists
        if (Object.keys(this.workoutData).length === 0) {
            this.showNoDataState();
        }
    }

    processData() {
        // Convert workout data to flat array with calculated metrics
        this.processedData = [];
        
        Object.entries(this.workoutData).forEach(([date, exercises]) => {
            exercises.forEach(exercise => {
                const volume = exercise.weight * exercise.repetitions;
                this.processedData.push({
                    date: date,
                    dateObj: new Date(date),
                    category: exercise.category,
                    exercise: exercise.exercise,
                    weight: exercise.weight,
                    repetitions: exercise.repetitions,
                    volume: volume
                });
            });
        });
        
        // Sort by date (newest first)
        this.processedData.sort((a, b) => b.dateObj - a.dateObj);
        this.filteredData = [...this.processedData];
        
        console.log('Processed workout data:', this.processedData);
    }

    updateSummaryStats() {
        if (this.processedData.length === 0) return;

        // Calculate total statistics
        const totalWorkouts = Object.keys(this.workoutData).length;
        const totalVolume = this.processedData.reduce((sum, exercise) => sum + exercise.volume, 0);

        // Update DOM elements
        document.getElementById('total-workouts').textContent = totalWorkouts;
        document.getElementById('total-volume').textContent = totalVolume.toLocaleString();
    }

    setupEventListeners() {
        // Category tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setActiveCategory(category);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.filterData(e.target.value, document.getElementById('category-filter').value);
        });

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.addEventListener('change', (e) => {
            this.filterData(document.getElementById('search-input').value, e.target.value);
        });

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        sortSelect.addEventListener('change', (e) => {
            this.sortData(e.target.value);
        });

        // Quick filter functionality
        document.querySelectorAll('.quick-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setTimeFilter(filter);
            });
        });
    }

    setupPagination() {
        // Load More button event listener
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreEntries();
            });
        }
    }

    resetPagination() {
        this.currentOffset = 0;
        this.displayedData = [];
        this.updatePaginationInfo();
    }

    loadMoreEntries() {
        const endIndex = Math.min(this.currentOffset + this.entriesPerLoad, this.filteredData.length);
        const newEntries = this.filteredData.slice(this.currentOffset, endIndex);
        
        this.displayedData = [...this.displayedData, ...newEntries];
        this.currentOffset = endIndex;
        
        this.populateTable();
        this.updatePaginationInfo();
    }

    updatePaginationInfo() {
        const entriesShown = document.getElementById('entries-shown');
        const entriesTotal = document.getElementById('entries-total');
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (entriesShown) entriesShown.textContent = this.displayedData.length;
        if (entriesTotal) entriesTotal.textContent = this.filteredData.length;
        
        // Show/hide load more button
        if (loadMoreBtn) {
            const hasMore = this.currentOffset < this.filteredData.length;
            loadMoreBtn.style.display = hasMore ? 'flex' : 'none';
            
            if (hasMore) {
                const remaining = this.filteredData.length - this.currentOffset;
                const nextLoad = Math.min(this.entriesPerLoad, remaining);
                loadMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> Load ${nextLoad} More Entries`;
            }
        }
    }

    setActiveCategory(category) {
        this.currentCategory = category;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Update charts display
        this.displayCharts();
    }

    displayCharts() {
        const chartsGrid = document.getElementById('charts-grid');
        chartsGrid.innerHTML = '';
        
        // Clear existing charts
        Object.values(this.exerciseCharts).forEach(chart => chart.destroy());
        this.exerciseCharts = {};

        // Get exercises for current category
        let exercisesToShow = this.processedData;
        if (this.currentCategory !== 'all') {
            exercisesToShow = this.processedData.filter(ex => ex.category === this.currentCategory);
        }

        // Group by exercise name
        const exerciseGroups = this.groupByExercise(exercisesToShow);
        
        // Create chart for each exercise
        Object.entries(exerciseGroups).forEach(([exerciseName, exerciseData]) => {
            this.createExerciseChart(exerciseName, exerciseData, chartsGrid);
        });
    }

    groupByExercise(data) {
        const groups = {};
        
        data.forEach(exercise => {
            if (!groups[exercise.exercise]) {
                groups[exercise.exercise] = [];
            }
            groups[exercise.exercise].push(exercise);
        });
        
        // Sort each group by date
        Object.keys(groups).forEach(exercise => {
            groups[exercise].sort((a, b) => a.dateObj - b.dateObj);
        });
        
        return groups;
    }

    createExerciseChart(exerciseName, exerciseData, container) {
        if (exerciseData.length === 0) return;

        // Create chart container
        const chartCard = document.createElement('div');
        chartCard.className = `exercise-chart-card ${exerciseData[0].category}`;
        
        // Calculate stats
        const maxWeight = Math.max(...exerciseData.map(ex => ex.weight));
        const totalVolume = exerciseData.reduce((sum, ex) => sum + ex.volume, 0);
        const avgReps = Math.round(exerciseData.reduce((sum, ex) => sum + ex.repetitions, 0) / exerciseData.length);
        
        chartCard.innerHTML = `
            <h4 class="chart-title">
                <i class="fas fa-chart-line"></i>
                ${exerciseName}
            </h4>
            <div class="exercise-stats">
                <span>Max Weight: <strong>${maxWeight} lbs</strong></span>
                <span>Total Volume: <strong>${totalVolume.toLocaleString()}</strong></span>
                <span>Avg Reps: <strong>${avgReps}</strong></span>
            </div>
            <canvas class="exercise-chart" id="chart-${exerciseName.replace(/\s+/g, '-').toLowerCase()}"></canvas>
        `;
        
        container.appendChild(chartCard);
        
        // Create chart
        const canvas = chartCard.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        
        const dates = exerciseData.map(ex => this.formatDate(ex.date));
        const weights = exerciseData.map(ex => ex.weight);
        const volumes = exerciseData.map(ex => ex.volume);
        
        try {
            this.exerciseCharts[exerciseName] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Weight (lbs)',
                            data: weights,
                            borderColor: this.getCategoryColor(exerciseData[0].category),
                            backgroundColor: this.getCategoryColor(exerciseData[0].category, 0.1),
                            borderWidth: 3,
                            fill: false,
                            tension: 0.4,
                            pointBackgroundColor: this.getCategoryColor(exerciseData[0].category),
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            yAxisID: 'y'
                        },
                        {
                            label: 'Volume',
                            data: volumes,
                            borderColor: this.getCategoryColor(exerciseData[0].category, 0.6),
                            backgroundColor: this.getCategoryColor(exerciseData[0].category, 0.05),
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: this.getCategoryColor(exerciseData[0].category, 0.6),
                            pointBorderColor: '#fff',
                            pointBorderWidth: 1,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Weight (lbs)'
                            },
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Volume'
                            },
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                afterLabel: function(context) {
                                    const dataIndex = context.dataIndex;
                                    const reps = exerciseData[dataIndex].repetitions;
                                    return `Reps: ${reps}`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Error creating chart for ${exerciseName}:`, error);
        }
    }

    getCategoryColor(category, alpha = 1) {
        const colors = {
            chest: `rgba(231, 76, 60, ${alpha})`,
            leg: `rgba(52, 152, 219, ${alpha})`,
            shoulder: `rgba(243, 156, 18, ${alpha})`,
            back: `rgba(39, 174, 96, ${alpha})`,
            other: `rgba(142, 68, 173, ${alpha})`
        };
        return colors[category] || `rgba(102, 126, 234, ${alpha})`;
    }

    populateRecentWorkouts() {
        const timeline = document.getElementById('workout-timeline');
        timeline.innerHTML = '';

        // Get recent workouts (last 10 workout dates)
        const recentDates = Object.keys(this.workoutData)
            .sort((a, b) => new Date(b) - new Date(a))
            .slice(0, 10);

        recentDates.forEach(date => {
            const exercises = this.workoutData[date];
            const workoutEntry = document.createElement('div');
            workoutEntry.className = 'workout-entry';
            
            // Group exercises by category for display
            const categoryGroups = {};
            exercises.forEach(ex => {
                if (!categoryGroups[ex.category]) {
                    categoryGroups[ex.category] = [];
                }
                categoryGroups[ex.category].push(ex);
            });

            const exerciseTags = exercises.map(ex => 
                `<span class="exercise-tag ${ex.category}">${ex.exercise}: ${ex.weight}x${ex.repetitions}</span>`
            ).join('');

            workoutEntry.innerHTML = `
                <div class="workout-date">${this.formatDate(date)}</div>
                <div class="workout-exercises">${exerciseTags}</div>
            `;

            timeline.appendChild(workoutEntry);
        });
    }

    populateTable() {
        const tbody = document.getElementById('workout-tbody');
        
        // Only clear table if we're starting fresh (offset = 0)
        if (this.currentOffset === this.displayedData.length) {
            tbody.innerHTML = '';
        }

        if (this.displayedData.length === 0) {
            tbody.innerHTML = '';
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 6;
            cell.textContent = 'No data found.';
            cell.style.textAlign = 'center';
            cell.style.padding = '2rem';
            cell.style.color = '#666';
            this.updatePaginationInfo();
            return;
        }

        // Load initial entries if displayedData is empty
        if (this.displayedData.length === 0 && this.filteredData.length > 0) {
            this.loadMoreEntries();
            return;
        }

        // Clear and repopulate table with displayed data
        tbody.innerHTML = '';
        this.displayedData.forEach(exercise => {
            const row = tbody.insertRow();
            
            // Date
            row.insertCell(0).textContent = this.formatDate(exercise.date);
            
            // Category
            const categoryCell = row.insertCell(1);
            categoryCell.innerHTML = `<span class="category-badge ${exercise.category}">${exercise.category}</span>`;
            
            // Exercise
            row.insertCell(2).textContent = exercise.exercise;
            
            // Weight
            row.insertCell(3).textContent = `${exercise.weight} lbs`;
            
            // Reps
            row.insertCell(4).textContent = exercise.repetitions;
            
            // Volume
            row.insertCell(5).textContent = exercise.volume.toLocaleString();
            
            // Add hover effect
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = '#f0f8ff';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
        
        this.updatePaginationInfo();
    }

    filterData(searchTerm, categoryFilter) {
        const term = searchTerm.toLowerCase().trim();
        
        this.filteredData = this.processedData.filter(exercise => {
            const matchesSearch = term === '' || 
                exercise.exercise.toLowerCase().includes(term) ||
                exercise.category.toLowerCase().includes(term);
            
            const matchesCategory = categoryFilter === '' || 
                exercise.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.resetPagination();
        this.populateTable();
    }

    setTimeFilter(timeFilter) {
        this.currentTimeFilter = timeFilter;
        
        // Update active button
        document.querySelectorAll('.quick-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === timeFilter);
        });
        
        // Apply time filter
        const now = new Date();
        let filteredByTime = this.processedData;
        
        switch (timeFilter) {
            case 'recent':
                // Last 10 workouts
                const recentDates = Object.keys(this.workoutData)
                    .sort((a, b) => new Date(b) - new Date(a))
                    .slice(0, 10);
                filteredByTime = this.processedData.filter(ex => recentDates.includes(ex.date));
                break;
            case 'week':
                // Last 7 days
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredByTime = this.processedData.filter(ex => ex.dateObj >= weekAgo);
                break;
            case 'month':
                // Last 30 days
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                filteredByTime = this.processedData.filter(ex => ex.dateObj >= monthAgo);
                break;
            case 'all':
                // All data
                filteredByTime = this.processedData;
                break;
        }
        
        this.filteredData = filteredByTime;
        this.resetPagination();
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
            case 'weight-desc':
                this.filteredData.sort((a, b) => b.weight - a.weight);
                break;
            case 'volume-desc':
                this.filteredData.sort((a, b) => b.volume - a.volume);
                break;
        }
        
        this.resetPagination();
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
        document.querySelector('.category-tabs').style.display = 'none';
        document.querySelector('.charts-section').style.display = 'none';
        document.querySelector('.recent-workouts').style.display = 'none';
        document.querySelector('.data-table-section').style.display = 'none';
        document.getElementById('no-data').style.display = 'block';
    }
}

// Initialize the tracker when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.workoutTracker = new WorkoutTracker();
});

// Handle window resize for chart responsiveness
window.addEventListener('resize', function() {
    if (window.workoutTracker && window.workoutTracker.exerciseCharts) {
        Object.values(window.workoutTracker.exerciseCharts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }
});

// Export for global access if needed
window.WorkoutTracker = WorkoutTracker;