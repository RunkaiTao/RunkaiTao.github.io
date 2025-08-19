/**
 * Simple Task Manager - Minimal daily task tracking
 * Loads tasks from YAML and displays finished/unfinished tasks
 */

class TaskManager {
    constructor() {
        this.currentDate = new Date();
        this.tasksData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTasksData();
        this.initializeDatePicker();
        this.displayTasks();
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
    }

    loadTasksData() {
        // Load task data matching current YAML content
        this.tasksData = {
            "2025-08-18": [
                { task: "build personal Website", used_pomodoros: 2, expected_pomodoros: 4 },
                { task: "Groebner basis computation for A1A5 macdonald index", used_pomodoros: 0, expected_pomodoros: 4 }
            ],
            "2025-08-17": [
                { task: "Team meeting with Prof. Moore", used_pomodoros: 2, expected_pomodoros: 2 },
                { task: "Code review for distributed GNN project", used_pomodoros: 4, expected_pomodoros: 3 }
            ],
            "2025-08-16": [
                { task: "Write progress report", used_pomodoros: 3, expected_pomodoros: 3 },
                { task: "Implement SGLang optimizations", used_pomodoros: 2, expected_pomodoros: 5 },
                { task: "Attend physics department seminar", used_pomodoros: 3, expected_pomodoros: 3 },
                { task: "Exercise at gym", used_pomodoros: 2, expected_pomodoros: 2 },
                { task: "Plan next week's research activities", used_pomodoros: 1, expected_pomodoros: 2 }
            ],
            "2025-08-15": [
                { task: "Debug MixGCN performance issues", used_pomodoros: 4, expected_pomodoros: 4 },
                { task: "Prepare presentation for Amazon internship", used_pomodoros: 5, expected_pomodoros: 4 },
                { task: "Call family", used_pomodoros: 1, expected_pomodoros: 1 }
            ]
        };
    }

    initializeDatePicker() {
        const datePicker = document.getElementById('date-picker');
        datePicker.value = this.formatDateForInput(this.currentDate);
        this.updateDateDisplay();
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    formatDateKey(date) {
        return date.toISOString().split('T')[0];
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});

// Function to sync pomodoro data with activity dashboard
function syncWithActivityDashboard() {
    if (!window.taskManager) return;
    
    // Calculate pomodoro totals for each date
    const pomodoroData = {};
    
    Object.entries(window.taskManager.tasksData).forEach(([date, tasks]) => {
        const totalUsed = tasks.reduce((sum, task) => sum + task.used_pomodoros, 0);
        if (totalUsed > 0) {
            pomodoroData[date] = totalUsed;
        }
    });
    
    // Make data available globally for activity dashboard
    window.tasksPomodoroData = pomodoroData;
    
    // If activity dashboard exists, trigger update
    if (window.activityDashboard && typeof window.activityDashboard.updatePomodoroData === 'function') {
        window.activityDashboard.updatePomodoroData(pomodoroData);
    }
    
    console.log('Synced pomodoro data from tasks:', pomodoroData);
}

// Auto-sync when task manager loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(syncWithActivityDashboard, 1000); // Wait for task manager to initialize
});