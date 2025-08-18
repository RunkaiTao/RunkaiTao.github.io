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
            this.currentDate = new Date(e.target.value);
            this.displayTasks();
        });
    }

    loadTasksData() {
        // Since we can't directly load YAML in browser, we'll use sample data
        // In a real Jekyll site, this would be loaded via a JSON endpoint
        this.tasksData = {
            "2025-08-18": [
                { task: "Complete research proposal for string theory project", finished: false },
                { task: "Review paper submissions for conference", finished: true },
                { task: "Prepare seminar slides on AdS/CFT correspondence", finished: false },
                { task: "Reply to collaboration emails", finished: true },
                { task: "Update personal website blog post", finished: false }
            ],
            "2025-08-17": [
                { task: "Team meeting with Prof. Moore", finished: true },
                { task: "Code review for distributed GNN project", finished: true },
                { task: "Read papers on K-theoretic Donaldson invariants", finished: false },
                { task: "Grocery shopping", finished: true }
            ],
            "2025-08-16": [
                { task: "Write progress report", finished: true },
                { task: "Implement SGLang optimizations", finished: false },
                { task: "Attend physics department seminar", finished: true },
                { task: "Exercise at gym", finished: true },
                { task: "Plan next week's research activities", finished: false }
            ],
            "2025-08-15": [
                { task: "Debug MixGCN performance issues", finished: true },
                { task: "Prepare presentation for Amazon internship", finished: true },
                { task: "Call family", finished: true }
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
        
        // Separate tasks by completion status
        const unfinishedTasks = tasks.filter(task => !task.finished);
        const finishedTasks = tasks.filter(task => task.finished);
        
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
        
        return `
            <div class="task-item ${className}">
                <i class="fas ${icon} task-icon"></i>
                <div class="task-text">${task.task}</div>
            </div>
        `;
    }

    updateTaskCounts(tasks) {
        const unfinishedCount = tasks.filter(task => !task.finished).length;
        const finishedCount = tasks.filter(task => task.finished).length;
        
        document.getElementById('unfinished-count').textContent = unfinishedCount;
        document.getElementById('finished-count').textContent = finishedCount;
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