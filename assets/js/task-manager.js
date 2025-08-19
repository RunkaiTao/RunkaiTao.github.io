/**
 * Simple Task Manager - Minimal daily task tracking
 * Loads tasks from YAML and displays finished/unfinished tasks
 */

class TaskManager {
    constructor() {
        this.currentDate = new Date();
        this.currentWeekStart = this.getStartOfWeek(new Date());
        this.tasksData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTasksData();
        this.initializeDatePicker();
        this.displayTasks();
        this.displayWeeklySummary();
        this.initializeContributionChart();
    }

    setupEventListeners() {
        // Date navigation
        document.getElementById('prev-day').addEventListener('click', () => this.changeDate(-1));
        document.getElementById('next-day').addEventListener('click', () => this.changeDate(1));
        
        // Date picker
        document.getElementById('date-picker').addEventListener('change', (e) => {
            // Fix date parsing to avoid timezone issues
            const dateValue = e.target.value; // YYYY-MM-DD format
            const [year, month, day] = dateValue.split('-').map(Number);
            this.currentDate = new Date(year, month - 1, day); // month is 0-indexed
            this.updateDateDisplay();
            this.displayTasks();
        });
        
        // Weekly navigation
        document.getElementById('prev-week').addEventListener('click', () => this.changeWeek(-1));
        document.getElementById('next-week').addEventListener('click', () => this.changeWeek(1));
        
        // Contribution chart period buttons
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const months = parseInt(e.target.dataset.months);
                this.displayContributionChart(months);
            });
        });
    }

    loadTasksData() {
        // Load task data with expanded historical data for contribution chart
        // Sample data spread across 2-3 weeks to demonstrate proper grid layout
        this.tasksData = {
            // Current week (Week 3)
            "2025-08-18": [
                { task: "build personal Website", used_pomodoros: 2, expected_pomodoros: 4 },
                { task: "Groebner basis computation for A1A5 macdonald index", used_pomodoros: 0, expected_pomodoros: 4 }
            ],
            "2025-08-17": [
                { task: "Team meeting with Prof. Moore", used_pomodoros: 2, expected_pomodoros: 2 },
                { task: "Code review for distributed GNN project", used_pomodoros: 4, expected_pomodoros: 3 },
                { task: "Read papers on K-theoretic Donaldson invariants", used_pomodoros: 1, expected_pomodoros: 4 }
            ],
            "2025-08-15": [
                { task: "Debug MixGCN performance issues", used_pomodoros: 4, expected_pomodoros: 4 },
                { task: "Prepare presentation for Amazon internship", used_pomodoros: 5, expected_pomodoros: 4 }
            ],
            "2025-08-14": [
                { task: "Research quantum computing applications", used_pomodoros: 6, expected_pomodoros: 6 }
            ],
            "2025-08-13": [
                { task: "Literature review", used_pomodoros: 3, expected_pomodoros: 4 }
            ],
            
            // Previous week (Week 2)
            "2025-08-11": [
                { task: "Algorithm implementation", used_pomodoros: 5, expected_pomodoros: 6 },
                { task: "Documentation", used_pomodoros: 2, expected_pomodoros: 2 }
            ],
            "2025-08-09": [
                { task: "Conference preparation", used_pomodoros: 7, expected_pomodoros: 7 }
            ],
            "2025-08-08": [
                { task: "Research reading", used_pomodoros: 4, expected_pomodoros: 4 },
                { task: "Experiment design", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-08-07": [
                { task: "Data collection", used_pomodoros: 5, expected_pomodoros: 5 },
                { task: "Analysis", used_pomodoros: 2, expected_pomodoros: 2 }
            ],
            "2025-08-06": [
                { task: "Paper writing", used_pomodoros: 6, expected_pomodoros: 6 }
            ],
            "2025-08-05": [
                { task: "Code debugging", used_pomodoros: 4, expected_pomodoros: 4 },
                { task: "Meeting preparation", used_pomodoros: 1, expected_pomodoros: 1 }
            ],
            
            // Week before (Week 1)
            "2025-08-04": [
                { task: "Literature review", used_pomodoros: 3, expected_pomodoros: 4 }
            ],
            "2025-08-02": [
                { task: "Weekend research", used_pomodoros: 2, expected_pomodoros: 2 }
            ],
            "2025-08-01": [
                { task: "Monthly planning", used_pomodoros: 4, expected_pomodoros: 4 },
                { task: "Code optimization", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-07-31": [
                { task: "End of month review", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-07-30": [
                { task: "Project presentation", used_pomodoros: 6, expected_pomodoros: 6 }
            ],
            "2025-07-29": [
                { task: "Code testing", used_pomodoros: 4, expected_pomodoros: 4 }
            ],
            
            // Additional historical data for better chart visualization
            "2025-07-25": [
                { task: "Research documentation", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-07-22": [
                { task: "Team collaboration", used_pomodoros: 2, expected_pomodoros: 2 }
            ],
            "2025-07-18": [
                { task: "System testing", used_pomodoros: 5, expected_pomodoros: 5 }
            ],
            "2025-07-15": [
                { task: "Data processing", used_pomodoros: 4, expected_pomodoros: 4 }
            ],
            "2025-07-10": [
                { task: "Feature development", used_pomodoros: 6, expected_pomodoros: 6 }
            ],
            "2025-07-05": [
                { task: "Bug fixes", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-07-01": [
                { task: "Monthly kickoff", used_pomodoros: 2, expected_pomodoros: 2 }
            ],
            "2025-06-28": [
                { task: "End of sprint", used_pomodoros: 4, expected_pomodoros: 4 }
            ],
            "2025-06-25": [
                { task: "Code review", used_pomodoros: 3, expected_pomodoros: 3 }
            ],
            "2025-06-20": [
                { task: "Architecture planning", used_pomodoros: 5, expected_pomodoros: 5 }
            ],
            "2025-06-15": [
                { task: "Performance optimization", used_pomodoros: 7, expected_pomodoros: 7 }
            ],
            "2025-06-10": [
                { task: "Database design", used_pomodoros: 4, expected_pomodoros: 4 }
            ],
            "2025-06-05": [
                { task: "API development", used_pomodoros: 6, expected_pomodoros: 6 }
            ]
        };
    }

    initializeDatePicker() {
        const datePicker = document.getElementById('date-picker');
        datePicker.value = this.formatDateForInput(this.currentDate);
        this.updateDateDisplay();
    }

    formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    updateDateDisplay() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        const dateString = this.currentDate.toLocaleDateString('en-US', options);
        document.getElementById('current-date').textContent = dateString;
    }

    changeDate(days) {
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + days);
        this.currentDate = newDate;
        this.initializeDatePicker();
        this.displayTasks();
    }

    displayTasks() {
        this.updateDateDisplay();
        const dateKey = this.formatDateKey(this.currentDate);
        const tasks = this.tasksData[dateKey] || [];
        
        if (tasks.length === 0) {
            this.showNoTasks();
            return;
        }
        
        this.hideNoTasks();
        this.renderTasks(tasks);
        this.updateTaskCounts(tasks);
    }

    renderTasks(tasks) {
        const unfinishedContainer = document.getElementById('unfinished-tasks');
        const finishedContainer = document.getElementById('finished-tasks');
        
        // Auto-calculate finished status based on pomodoros
        const unfinishedTasks = tasks.filter(task => task.used_pomodoros < task.expected_pomodoros);
        const finishedTasks = tasks.filter(task => task.used_pomodoros >= task.expected_pomodoros);
        
        // Render unfinished tasks
        unfinishedContainer.innerHTML = unfinishedTasks.length > 0 
            ? unfinishedTasks.map(task => this.createTaskHTML(task, false)).join('')
            : '<div class="empty-state">No unfinished tasks</div>';
        
        // Render finished tasks
        finishedContainer.innerHTML = finishedTasks.length > 0
            ? finishedTasks.map(task => this.createTaskHTML(task, true)).join('')
            : '<div class="empty-state">No finished tasks</div>';
    }

    createTaskHTML(task, isFinished) {
        const icon = isFinished ? 'fa-check-circle' : 'fa-clock';
        const className = isFinished ? 'finished-task' : 'unfinished-task';
        const progressPercent = Math.min((task.used_pomodoros / task.expected_pomodoros) * 100, 100);
        
        return `
            <div class="task-item ${className}">
                <i class="fas ${icon} task-icon"></i>
                <div class="task-content">
                    <div class="task-text">${task.task}</div>
                    <div class="pomodoro-info">
                        <span class="pomodoro-count">🍅 ${task.used_pomodoros}/${task.expected_pomodoros}</span>
                        <div class="pomodoro-progress">
                            <div class="progress-bar" style="width: ${progressPercent}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    updateTaskCounts(tasks) {
        const unfinishedCount = tasks.filter(task => task.used_pomodoros < task.expected_pomodoros).length;
        const finishedCount = tasks.filter(task => task.used_pomodoros >= task.expected_pomodoros).length;
        
        // Calculate daily pomodoro totals
        const totalUsedPomodoros = tasks.reduce((sum, task) => sum + task.used_pomodoros, 0);
        const totalExpectedPomodoros = tasks.reduce((sum, task) => sum + task.expected_pomodoros, 0);
        
        document.getElementById('unfinished-count').textContent = unfinishedCount;
        document.getElementById('finished-count').textContent = finishedCount;
        
        // Update daily pomodoro display
        this.updateDailyPomodoroDisplay(totalUsedPomodoros, totalExpectedPomodoros);
    }
    
    updateDailyPomodoroDisplay(used, expected) {
        // Add or update daily pomodoro summary
        let dailySummary = document.getElementById('daily-pomodoro-summary');
        if (!dailySummary) {
            // Create the summary element if it doesn't exist
            const tasksContent = document.querySelector('.tasks-content');
            dailySummary = document.createElement('div');
            dailySummary.id = 'daily-pomodoro-summary';
            dailySummary.className = 'daily-pomodoro-summary';
            tasksContent.insertBefore(dailySummary, tasksContent.firstChild);
        }
        
        const progressPercent = expected > 0 ? Math.min((used / expected) * 100, 100) : 0;
        
        dailySummary.innerHTML = `
            <h3>Daily Pomodoro Progress</h3>
            <div class="daily-pomodoro-info">
                <span class="daily-count">🍅 ${used}/${expected} pomodoros</span>
                <div class="daily-progress">
                    <div class="daily-progress-bar" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
    }

    showNoTasks() {
        document.querySelector('.tasks-columns').style.display = 'none';
        document.getElementById('no-tasks').style.display = 'block';
    }

    hideNoTasks() {
        document.querySelector('.tasks-columns').style.display = 'grid';
        document.getElementById('no-tasks').style.display = 'none';
    }
    
    // Weekly Summary Methods
    getStartOfWeek(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
        start.setDate(diff);
        return start;
    }
    
    changeWeek(weeks) {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + (weeks * 7));
        this.displayWeeklySummary();
    }
    
    displayWeeklySummary() {
        const weekGrid = document.getElementById('week-pomodoro-grid');
        const weekRange = document.getElementById('week-range');
        const weekTotal = document.getElementById('week-total-count');
        
        if (!weekGrid || !weekRange || !weekTotal) return;
        
        // Calculate week range
        const endOfWeek = new Date(this.currentWeekStart);
        endOfWeek.setDate(this.currentWeekStart.getDate() + 6);
        
        const weekRangeText = `${this.currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        weekRange.textContent = weekRangeText;
        
        // Generate week grid
        let weekHTML = '';
        let totalWeekPomodoros = 0;
        const today = new Date();
        const maxPomodoros = this.getMaxPomodorosInWeek();
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(this.currentWeekStart);
            date.setDate(this.currentWeekStart.getDate() + i);
            
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayDate = date.getDate();
            const dateKey = this.formatDateKey(date);
            const tasks = this.tasksData[dateKey] || [];
            const dayPomodoros = tasks.reduce((sum, task) => sum + task.used_pomodoros, 0);
            const isToday = date.toDateString() === today.toDateString();
            const barWidth = maxPomodoros > 0 ? (dayPomodoros / maxPomodoros) * 100 : 0;
            
            totalWeekPomodoros += dayPomodoros;
            
            weekHTML += `
                <div class="week-day ${isToday ? 'today' : ''}">
                    <div class="day-name">${dayName}</div>
                    <div class="day-date">${dayDate}</div>
                    <div class="day-pomodoros">
                        ${dayPomodoros} <span style="font-size: 0.8em;">🍅</span>
                    </div>
                    <div class="day-bar">
                        <div class="day-bar-fill" style="width: ${barWidth}%"></div>
                    </div>
                </div>
            `;
        }
        
        weekGrid.innerHTML = weekHTML;
        weekTotal.textContent = totalWeekPomodoros;
    }
    
    getMaxPomodorosInWeek() {
        let max = 0;
        for (let i = 0; i < 7; i++) {
            const date = new Date(this.currentWeekStart);
            date.setDate(this.currentWeekStart.getDate() + i);
            const dateKey = this.formatDateKey(date);
            const tasks = this.tasksData[dateKey] || [];
            const dayPomodoros = tasks.reduce((sum, task) => sum + task.used_pomodoros, 0);
            max = Math.max(max, dayPomodoros);
        }
        return Math.max(max, 1); // Ensure at least 1 to avoid division by zero
    }
    
    // Contribution Chart Methods
    initializeContributionChart() {
        this.displayContributionChart(3); // Default to 3 months
    }
    
    generateContributionData(months) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - months);
        
        const data = {};
        const currentDate = new Date(startDate);
        
        // Generate all dates in the range
        while (currentDate <= endDate) {
            const dateKey = this.formatDateKey(currentDate);
            const tasks = this.tasksData[dateKey] || [];
            const pomodoroCount = tasks.reduce((sum, task) => sum + task.used_pomodoros, 0);
            
            data[dateKey] = {
                date: new Date(currentDate),
                count: pomodoroCount,
                level: this.getContributionLevel(pomodoroCount)
            };
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return data;
    }
    
    getContributionLevel(count) {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 5) return 2;
        if (count <= 8) return 3;
        return 4;
    }
    
    displayContributionChart(months) {
        const contributionData = this.generateContributionData(months);
        this.renderContributionChart(contributionData);
        this.updateContributionStats(contributionData);
        this.updateContributionHeaderInfo(contributionData, months);
    }
    
    updateContributionHeaderInfo(data, months) {
        const totalElement = document.getElementById('contribution-total-count');
        if (!totalElement) return;
        
        const values = Object.values(data);
        const totalPomodoros = values.reduce((sum, day) => sum + day.count, 0);
        
        const periodText = months === 1 ? "Last Month" : 
                          months === 3 ? "Last 3 Months" :
                          months === 6 ? "Last 6 Months" :
                          months === 12 ? "Last 12 Months" :
                          `Last ${months} Months`;
        
        totalElement.textContent = `${totalPomodoros} Pomodoros in the ${periodText}`;
    }
    
    renderContributionChart(data) {
        const chartContainer = document.getElementById('contribution-chart');
        if (!chartContainer) return;
        
        // Clear existing content
        chartContainer.innerHTML = '';
        
        // Create the grid structure
        const dates = Object.keys(data).sort();
        if (dates.length === 0) return;
        
        // Start from Sunday of the first week
        const firstDate = new Date(dates[0]);
        const startDate = new Date(firstDate);
        startDate.setDate(firstDate.getDate() - firstDate.getDay());
        
        // Calculate number of weeks needed
        const lastDate = new Date(dates[dates.length - 1]);
        const endDate = new Date(lastDate);
        endDate.setDate(lastDate.getDate() + (6 - lastDate.getDay()));
        
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const weeks = Math.ceil(totalDays / 7);
        
        // Generate month labels
        this.renderMonthLabels(startDate, endDate, weeks);
        
        // Create GitHub-style grid: weeks as columns, days as rows
        chartContainer.style.gridTemplateColumns = `repeat(${weeks}, 1fr)`;
        chartContainer.style.gridTemplateRows = `repeat(7, 1fr)`;
        
        // Fill the grid week by week
        const currentDate = new Date(startDate);
        for (let week = 0; week < weeks; week++) {
            for (let day = 0; day < 7; day++) {
                const dateKey = this.formatDateKey(currentDate);
                const dayData = data[dateKey];
                
                const square = document.createElement('div');
                square.className = `contribution-day level-${dayData ? dayData.level : 0}`;
                square.dataset.date = dateKey;
                square.dataset.count = dayData ? dayData.count : 0;
                square.style.gridColumn = week + 1;
                square.style.gridRow = day + 1;
                
                // Add tooltip functionality
                this.addContributionTooltip(square);
                
                chartContainer.appendChild(square);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }
    
    renderMonthLabels(startDate, endDate, weeks) {
        const monthsContainer = document.getElementById('contribution-months');
        if (!monthsContainer) return;
        
        monthsContainer.innerHTML = '';
        
        const currentMonth = new Date(startDate);
        const monthsShown = new Set();
        
        // Calculate approximate width per week (assuming equal distribution)
        const weekWidth = 100 / weeks;
        
        for (let week = 0; week < weeks; week++) {
            const weekDate = new Date(startDate);
            weekDate.setDate(startDate.getDate() + (week * 7));
            
            const monthKey = `${weekDate.getFullYear()}-${weekDate.getMonth()}`;
            
            if (!monthsShown.has(monthKey)) {
                monthsShown.add(monthKey);
                
                const monthLabel = document.createElement('div');
                monthLabel.className = 'month-label';
                monthLabel.textContent = weekDate.toLocaleDateString('en-US', { month: 'short' });
                monthLabel.style.left = `${week * weekWidth}%`;
                monthLabel.style.position = 'relative';
                
                monthsContainer.appendChild(monthLabel);
            }
        }
    }
    
    addContributionTooltip(square) {
        let tooltip = null;
        
        square.addEventListener('mouseenter', (e) => {
            const date = new Date(e.target.dataset.date);
            const count = parseInt(e.target.dataset.count);
            
            // Format date like "Friday, August 08, 2025"
            const dateStr = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: '2-digit', 
                year: 'numeric' 
            });
            
            tooltip = document.createElement('div');
            tooltip.className = 'contribution-tooltip';
            
            if (count === 0) {
                tooltip.innerHTML = `No contributions on ${dateStr}`;
            } else {
                tooltip.innerHTML = `<strong>${count} Pomodoro${count !== 1 ? 's' : ''}</strong> on ${dateStr}`;
            }
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            
            tooltip.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
            tooltip.style.top = `${rect.top + scrollTop}px`;
        });
        
        square.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
        
        square.addEventListener('click', (e) => {
            const date = new Date(e.target.dataset.date);
            this.currentDate = date;
            this.initializeDatePicker();
            this.displayTasks();
        });
    }
    
    updateContributionStats(data) {
        const dates = Object.keys(data).sort();
        const values = dates.map(date => data[date]);
        
        // Calculate total pomodoros
        const totalPomodoros = values.reduce((sum, day) => sum + day.count, 0);
        
        // Calculate current streak
        let currentStreak = 0;
        const today = new Date();
        for (let i = dates.length - 1; i >= 0; i--) {
            const date = new Date(dates[i]);
            if (date > today) continue; // Skip future dates
            
            if (data[dates[i]].count > 0) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        // Calculate longest streak
        let longestStreak = 0;
        let tempStreak = 0;
        values.forEach(day => {
            if (day.count > 0) {
                tempStreak++;
                longestStreak = Math.max(longestStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        });
        
        // Update display
        document.getElementById('total-pomodoros').textContent = totalPomodoros;
        document.getElementById('current-streak').textContent = currentStreak;
        document.getElementById('longest-streak').textContent = longestStreak;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});


