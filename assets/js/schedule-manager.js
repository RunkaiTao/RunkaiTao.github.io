/**
 * Schedule Manager - Interactive daily schedule system
 * Loads schedule data from YAML and provides date navigation
 */

class ScheduleManager {
    constructor() {
        this.scheduleData = null;
        this.currentDate = new Date();
        this.currentView = 'day'; // 'day' or 'week'
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadScheduleData();
        this.initializeDatePicker();
        this.displaySchedule();
        this.createLegend();
        this.hideLoading();
    }

    setupEventListeners() {
        // Date navigation
        document.getElementById('prev-day').addEventListener('click', () => this.changeDate(-1));
        document.getElementById('next-day').addEventListener('click', () => this.changeDate(1));
        document.getElementById('today-btn').addEventListener('click', () => this.goToToday());
        document.getElementById('tomorrow-btn').addEventListener('click', () => this.goToTomorrow());
        document.getElementById('week-view-btn').addEventListener('click', () => this.toggleView());
        
        // Date picker
        document.getElementById('date-picker').addEventListener('change', (e) => {
            this.currentDate = new Date(e.target.value);
            this.displaySchedule();
        });

        // Week navigation
        document.getElementById('prev-week').addEventListener('click', () => this.changeWeek(-1));
        document.getElementById('next-week').addEventListener('click', () => this.changeWeek(1));
    }

    async loadScheduleData() {
        try {
            // In Jekyll, we need to load the data differently
            // For now, we'll embed the data or load it via AJAX
            await this.loadDataFromYAML();
        } catch (error) {
            console.error('Failed to load schedule data:', error);
            this.scheduleData = { schedules: {}, recurring: {}, categories: {} };
        }
    }

    async loadDataFromYAML() {
        // Since we can't directly load YAML in the browser, we'll create a JSON endpoint
        // or embed the data. For now, let's create a fallback structure
        this.scheduleData = {
            schedules: {
                "2025-08-18": [
                    {
                        time: "09:00",
                        duration: 90,
                        activity: "Deep Work - Research",
                        category: "research",
                        location: "Office",
                        notes: "K-theoretic Donaldson invariants calculation"
                    },
                    {
                        time: "11:00",
                        duration: 30,
                        activity: "Coffee Break",
                        category: "break",
                        location: "Café"
                    },
                    {
                        time: "11:30",
                        duration: 120,
                        activity: "String Theory Seminar Prep",
                        category: "teaching",
                        location: "Office",
                        notes: "Prepare slides on AdS/CFT correspondence"
                    }
                ]
            },
            recurring: {
                monday: [
                    { time: "09:00", duration: 180, activity: "Deep Work Block", category: "research", location: "Office" }
                ],
                tuesday: [
                    { time: "10:00", duration: 120, activity: "Teaching Preparation", category: "teaching", location: "Office" }
                ],
                wednesday: [
                    { time: "09:00", duration: 240, activity: "Research Deep Dive", category: "research", location: "Office" }
                ],
                thursday: [
                    { time: "10:00", duration: 150, activity: "Coding & Development", category: "coding", location: "Lab" }
                ],
                friday: [
                    { time: "09:00", duration: 120, activity: "Week Review & Planning", category: "admin", location: "Office" }
                ],
                saturday: [
                    { time: "10:00", duration: 120, activity: "Personal Projects", category: "personal", location: "Home" }
                ],
                sunday: [
                    { time: "11:00", duration: 90, activity: "Weekly Planning", category: "admin", location: "Home" }
                ]
            },
            categories: {
                research: { color: "#2E86AB", icon: "flask", description: "Research work and calculations" },
                teaching: { color: "#A23B72", icon: "chalkboard-teacher", description: "Teaching preparation and student interaction" },
                meeting: { color: "#F18F01", icon: "users", description: "Meetings and collaborative sessions" },
                coding: { color: "#C73E1D", icon: "code", description: "Software development and programming" },
                learning: { color: "#6A994E", icon: "book", description: "Reading, seminars, skill development" },
                personal: { color: "#7209B7", icon: "user", description: "Personal time and self-care" },
                break: { color: "#90A959", icon: "coffee", description: "Breaks and transitions" },
                admin: { color: "#6C757D", icon: "clipboard-list", description: "Administrative tasks and planning" }
            }
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
        document.getElementById('display-date').textContent = 
            this.currentDate.toLocaleDateString('en-US', options);
        document.getElementById('schedule-date-title').textContent = 
            this.isToday() ? 'Today' : this.currentDate.toLocaleDateString('en-US', options);
    }

    isToday() {
        const today = new Date();
        return this.currentDate.toDateString() === today.toDateString();
    }

    changeDate(days) {
        const newDate = new Date(this.currentDate);
        newDate.setDate(newDate.getDate() + days);
        this.currentDate = newDate;
        this.initializeDatePicker();
        this.displaySchedule();
    }

    goToToday() {
        this.currentDate = new Date();
        this.initializeDatePicker();
        this.displaySchedule();
    }

    goToTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.currentDate = tomorrow;
        this.initializeDatePicker();
        this.displaySchedule();
    }

    toggleView() {
        if (this.currentView === 'day') {
            this.currentView = 'week';
            this.showWeekView();
            document.getElementById('week-view-btn').textContent = 'Day View';
        } else {
            this.currentView = 'day';
            this.showDayView();
            document.getElementById('week-view-btn').textContent = 'Week View';
        }
    }

    showDayView() {
        document.getElementById('schedule-timeline').style.display = 'block';
        document.getElementById('week-view').style.display = 'none';
    }

    showWeekView() {
        document.getElementById('schedule-timeline').style.display = 'none';
        document.getElementById('week-view').style.display = 'block';
        this.displayWeekView();
    }

    displaySchedule() {
        this.updateDateDisplay();
        const schedule = this.getScheduleForDate(this.currentDate);
        this.renderSchedule(schedule);
        this.updateSummaryStats(schedule);
        this.updateScheduleType(schedule);
    }

    getScheduleForDate(date) {
        const dateKey = this.formatDateKey(date);
        
        // Check for specific date schedule
        if (this.scheduleData.schedules[dateKey]) {
            return {
                type: 'specific',
                items: this.scheduleData.schedules[dateKey]
            };
        }
        
        // Fall back to recurring schedule
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        if (this.scheduleData.recurring[dayName]) {
            return {
                type: 'recurring',
                items: this.scheduleData.recurring[dayName]
            };
        }
        
        return {
            type: 'none',
            items: []
        };
    }

    renderSchedule(schedule) {
        const container = document.getElementById('timeline-container');
        const noScheduleDiv = document.getElementById('no-schedule');
        
        if (schedule.items.length === 0) {
            container.innerHTML = '';
            noScheduleDiv.style.display = 'block';
            return;
        }
        
        noScheduleDiv.style.display = 'none';
        
        // Sort activities by time
        const sortedItems = [...schedule.items].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });
        
        container.innerHTML = sortedItems.map(item => this.createScheduleItemHTML(item)).join('');
    }

    createScheduleItemHTML(item) {
        const category = this.scheduleData.categories[item.category] || 
            { color: '#6C757D', icon: 'circle', description: 'Unknown category' };
        
        const endTime = this.calculateEndTime(item.time, item.duration);
        
        return `
            <div class="schedule-item" style="border-left-color: ${category.color}">
                <div class="time-block">
                    <div class="start-time">${this.formatTime(item.time)}</div>
                    <div class="end-time">${endTime}</div>
                </div>
                <div class="category-icon" style="background-color: ${category.color}">
                    <i class="fas fa-${category.icon}"></i>
                </div>
                <div class="activity-details">
                    <div class="activity-title">${item.activity}</div>
                    <div class="activity-meta">
                        ${item.location ? `<span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>` : ''}
                        <span><i class="fas fa-clock"></i> ${item.duration} min</span>
                        <span style="color: ${category.color}"><i class="fas fa-tag"></i> ${item.category}</span>
                    </div>
                    ${item.notes ? `<div class="activity-notes"><i class="fas fa-sticky-note"></i> ${item.notes}</div>` : ''}
                </div>
            </div>
        `;
    }

    calculateEndTime(startTime, duration) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0, 0);
        
        const endDate = new Date(startDate.getTime() + duration * 60000);
        return this.formatTime(`${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`);
    }

    formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    updateSummaryStats(schedule) {
        const totalActivities = schedule.items.length;
        const totalMinutes = schedule.items.reduce((sum, item) => sum + (item.duration || 60), 0);
        const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
        const researchMinutes = schedule.items
            .filter(item => item.category === 'research')
            .reduce((sum, item) => sum + (item.duration || 60), 0);
        const researchHours = Math.round(researchMinutes / 60 * 10) / 10;
        
        document.getElementById('total-activities').textContent = totalActivities;
        document.getElementById('total-hours').textContent = totalHours + 'h';
        document.getElementById('research-hours').textContent = researchHours + 'h';
    }

    updateScheduleType(schedule) {
        const badge = document.getElementById('schedule-type');
        let text, color;
        
        switch (schedule.type) {
            case 'specific':
                text = 'Custom Schedule';
                color = '#28a745';
                break;
            case 'recurring':
                text = 'Weekly Pattern';
                color = '#ffc107';
                break;
            default:
                text = 'No Schedule';
                color = '#6c757d';
        }
        
        badge.innerHTML = `<span class="schedule-badge" style="background-color: ${color}">${text}</span>`;
    }

    displayWeekView() {
        const weekGrid = document.getElementById('week-grid');
        const startOfWeek = this.getStartOfWeek(this.currentDate);
        
        let weekHTML = '';
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const schedule = this.getScheduleForDate(date);
            
            weekHTML += `
                <div class="day-column">
                    <div class="day-header">
                        <div>${dayName}</div>
                        <div style="font-size: 0.8rem; font-weight: normal;">
                            ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                    </div>
                    <div class="day-activities">
                        ${schedule.items.slice(0, 4).map(item => `
                            <div class="mini-activity" style="border-left-color: ${this.scheduleData.categories[item.category]?.color || '#6C757D'}">
                                <div style="font-weight: bold; font-size: 0.7rem;">${this.formatTime(item.time)}</div>
                                <div>${item.activity}</div>
                            </div>
                        `).join('')}
                        ${schedule.items.length > 4 ? `<div class="mini-activity" style="text-align: center; font-style: italic;">+${schedule.items.length - 4} more</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        weekGrid.innerHTML = weekHTML;
        this.updateWeekRange(startOfWeek);
    }

    getStartOfWeek(date) {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
        start.setDate(diff);
        return start;
    }

    updateWeekRange(startOfWeek) {
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        const options = { month: 'short', day: 'numeric' };
        const startStr = startOfWeek.toLocaleDateString('en-US', options);
        const endStr = endOfWeek.toLocaleDateString('en-US', options);
        
        document.getElementById('week-range').textContent = `${startStr} - ${endStr}`;
    }

    changeWeek(weeks) {
        this.currentDate.setDate(this.currentDate.getDate() + (weeks * 7));
        this.displayWeekView();
    }

    createLegend() {
        const legendContainer = document.getElementById('legend-items');
        const categories = this.scheduleData.categories;
        
        const legendHTML = Object.entries(categories).map(([key, category]) => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${category.color}"></div>
                <i class="fas fa-${category.icon}"></i>
                <div>
                    <strong>${key}</strong><br>
                    <small>${category.description}</small>
                </div>
            </div>
        `).join('');
        
        legendContainer.innerHTML = legendHTML;
    }

    hideLoading() {
        document.getElementById('loading-state').style.display = 'none';
    }
}

// Global functions for button actions
function exportSchedule() {
    const schedule = window.scheduleManager.getScheduleForDate(window.scheduleManager.currentDate);
    const dateStr = window.scheduleManager.formatDateKey(window.scheduleManager.currentDate);
    
    const exportData = {
        date: dateStr,
        schedule: schedule
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `schedule-${dateStr}.json`;
    link.click();
}

function showScheduleHelp() {
    document.getElementById('help-modal').style.display = 'block';
}

function closeHelpModal() {
    document.getElementById('help-modal').style.display = 'none';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.scheduleManager = new ScheduleManager();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('help-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}