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
        // Load task data from Jekyll's _data/tasks.yml
        if (window.tasksData) {
            // Use Jekyll data if available
            this.tasksData = window.tasksData;
        } else {
            // Fallback to empty data if Jekyll data is not available
            console.warn('No tasks data found from Jekyll. Make sure _data/tasks.yml exists.');
            this.tasksData = {};
        }
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
        this.displayContributionChart(9); // Default to 9 months
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
        
        // Set up the month container as a grid to match the chart
        monthsContainer.style.display = 'grid';
        monthsContainer.style.gridTemplateColumns = `repeat(${weeks}, 1fr)`;
        monthsContainer.style.gap = '3px';
        monthsContainer.style.paddingLeft = '40px';
        monthsContainer.style.paddingRight = '40px';
        
        let lastMonthDisplayed = null;
        
        for (let week = 0; week < weeks; week++) {
            const weekDate = new Date(startDate);
            weekDate.setDate(startDate.getDate() + (week * 7));
            
            const currentMonth = weekDate.getMonth();
            const currentYear = weekDate.getFullYear();
            const monthKey = `${currentYear}-${currentMonth}`;
            
            const monthLabel = document.createElement('div');
            monthLabel.className = 'month-label';
            monthLabel.style.gridColumn = week + 1;
            
            // Only show month name at the start of each month or first week
            if (week === 0 || lastMonthDisplayed !== monthKey) {
                monthLabel.textContent = weekDate.toLocaleDateString('en-US', { month: 'short' });
                lastMonthDisplayed = monthKey;
            }
            
            monthsContainer.appendChild(monthLabel);
        }
    }
    
    addContributionTooltip(square) {
        square.addEventListener('mouseenter', (e) => {
            // Remove any existing tooltip
            const existingTooltip = document.querySelector('.contribution-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            const dateString = e.target.dataset.date;
            const count = parseInt(e.target.dataset.count) || 0;
            
            if (!dateString) return;
            
            // Parse date from YYYY-MM-DD format
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            
            // Format date like "Friday, August 08, 2025"
            const dateStr = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: '2-digit', 
                year: 'numeric' 
            });
            
            const tooltip = document.createElement('div');
            tooltip.className = 'contribution-tooltip';
            
            if (count === 0) {
                tooltip.textContent = `No contributions on ${dateStr}`;
            } else {
                tooltip.innerHTML = `<strong>${count} Pomodoro${count !== 1 ? 's' : ''}</strong> on ${dateStr}`;
            }
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = e.target.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top + window.scrollY - tooltipRect.height - 8;
            
            // Ensure tooltip stays within viewport
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) {
                top = rect.bottom + window.scrollY + 8;
                tooltip.classList.add('tooltip-below');
            }
            
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });
        
        square.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.contribution-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
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


