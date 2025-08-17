/**
 * Activity Dashboard - Multi-tracker system for research productivity
 * Tracks Pomodoro sessions and blog updates
 */

class ActivityDashboard {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.data = {
            pomodoro: new Map()
        };
        this.tooltip = document.getElementById('activity-tooltip');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAllData();
    }

    setupEventListeners() {
        // Add tooltip event listeners to be set up after graphs are rendered
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('contrib-day')) {
                this.showTooltip(e);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('contrib-day')) {
                this.hideTooltip();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (e.target.classList.contains('contrib-day')) {
                this.moveTooltip(e);
            }
        });
    }

    async loadAllData() {
        try {
            // Load pomodoro data
            await this.loadPomodoroData();

            // Render pomodoro graph
            this.renderPomodoroGraph();
            
            // Update statistics
            this.updateStatistics();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load activity data');
        }
    }


    async loadPomodoroData() {
        try {
            console.log('🍅 Loading Pomodoro data...');
            
            // Use embedded data from the page
            const pomodoroData = window.pomodoroData || {};
            console.log('📊 Loaded data:', pomodoroData);
            
            // Set the parsed data
            Object.entries(pomodoroData).forEach(([date, count]) => {
                this.data.pomodoro.set(date, count);
            });
            
            console.log(`🎯 Loaded ${Object.keys(pomodoroData).length} days of data`);
            
        } catch (error) {
            console.error('❌ Error loading Pomodoro data:', error);
        }
    }

    parsePomodoroYAML(yamlText) {
        const pomodoroData = {};
        const lines = yamlText.split('\n');
        let inPomodoroSection = false;
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // Check if we're in the pomodoro section
            if (trimmed === 'pomodoro:') {
                inPomodoroSection = true;
                continue;
            }
            
            // Stop if we hit another top-level section
            if (trimmed.endsWith(':') && !trimmed.startsWith(' ') && trimmed !== 'pomodoro:') {
                inPomodoroSection = false;
                continue;
            }
            
            // Parse pomodoro entries (handle indented YAML)
            if (inPomodoroSection && trimmed.includes(':') && !trimmed.startsWith('#')) {
                const match = trimmed.match(/^(\d{4}-\d{2}-\d{2}):\s*(\d+)/);
                if (match) {
                    const date = match[1];
                    const count = parseInt(match[2]);
                    pomodoroData[date] = count;
                    console.log(`Parsed: ${date} = ${count} sessions`); // Debug log
                }
            }
        }
        
        return pomodoroData;
    }


    renderPomodoroGraph() {
        console.log('🎨 Rendering Pomodoro graph...');
        console.log('🎨 Data for graph:', this.data.pomodoro.size, 'entries');
        
        const container = document.getElementById('pomodoro-graph');
        if (!container) {
            console.error('❌ Container pomodoro-graph not found!');
            return;
        }
        
        const graph = this.createContributionGraph(this.data.pomodoro, 'pomodoro');
        container.innerHTML = '';
        container.appendChild(graph);
        
        console.log('✅ Graph rendered successfully');
    }

    createContributionGraph(data, type) {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), 0, 1);
        
        // Find the first Sunday of the year or before
        const firstSunday = new Date(startDate);
        firstSunday.setDate(startDate.getDate() - startDate.getDay());

        const graphContainer = document.createElement('div');
        graphContainer.className = 'contribution-calendar';

        // Create month labels
        const monthLabels = document.createElement('div');
        monthLabels.className = 'month-labels';
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        months.forEach((month) => {
            const label = document.createElement('span');
            label.textContent = month;
            label.className = 'month-label';
            monthLabels.appendChild(label);
        });
        
        graphContainer.appendChild(monthLabels);

        // Create the grid
        const grid = document.createElement('div');
        grid.className = 'contribution-grid';

        // Create day labels
        const dayLabels = document.createElement('div');
        dayLabels.className = 'day-labels';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach((day, index) => {
            if (index % 2 === 1) { // Show only Mon, Wed, Fri
                const label = document.createElement('span');
                label.textContent = day;
                label.className = 'day-label';
                dayLabels.appendChild(label);
            } else {
                const label = document.createElement('span');
                label.className = 'day-label';
                dayLabels.appendChild(label);
            }
        });

        const gridWithDays = document.createElement('div');
        gridWithDays.className = 'grid-with-days';
        gridWithDays.appendChild(dayLabels);

        // Create weeks
        const weeksContainer = document.createElement('div');
        weeksContainer.className = 'weeks-container';

        for (let week = 0; week < 53; week++) {
            const weekCol = document.createElement('div');
            weekCol.className = 'week-column';

            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(firstSunday);
                currentDate.setDate(firstSunday.getDate() + week * 7 + day);

                const dayElement = document.createElement('div');
                dayElement.className = 'contrib-day';
                dayElement.dataset.date = currentDate.toISOString().split('T')[0];
                dayElement.dataset.type = type;

                // Only show days within the current year
                if (currentDate.getFullYear() === today.getFullYear() && currentDate <= today) {
                    const dateStr = currentDate.toISOString().split('T')[0];
                    const value = data.get(dateStr) || 0;
                    
                    dayElement.dataset.value = value;
                    dayElement.dataset.date = dateStr;
                    
                    const level = this.getContributionLevel(value, type);
                    dayElement.className += ` ${type}-level-${level}`;
                } else {
                    dayElement.className += ` future-day`;
                }

                weekCol.appendChild(dayElement);
            }
            weeksContainer.appendChild(weekCol);
        }

        gridWithDays.appendChild(weeksContainer);
        grid.appendChild(gridWithDays);
        graphContainer.appendChild(grid);

        return graphContainer;
    }

    getContributionLevel(value, type) {
        switch (type) {
            case 'pomodoro':
                if (value === 0) return 0;
                if (value <= 2) return 1;
                if (value <= 4) return 2;
                if (value <= 6) return 3;
                return 4;
            
            case 'blog':
                if (value === 0) return 0;
                if (value <= 1) return 1;
                if (value <= 2) return 2;
                if (value <= 3) return 3;
                return 4;
                
            default:
                return 0;
        }
    }

    showTooltip(event) {
        const element = event.target;
        const date = element.dataset.date;
        const value = parseInt(element.dataset.value) || 0;
        const type = element.dataset.type;

        if (!date || element.classList.contains('future-day')) return;

        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const tooltipContent = this.getTooltipContent(value, type);
        
        this.tooltip.querySelector('.tooltip-date').textContent = formattedDate;
        this.tooltip.querySelector('.tooltip-content').textContent = tooltipContent;
        this.tooltip.style.display = 'block';

        this.moveTooltip(event);
    }

    getTooltipContent(value, type) {
        switch (type) {
            case 'pomodoro':
                return value === 0 ? 'No pomodoro sessions' :
                       value === 1 ? '1 pomodoro session' :
                       `${value} pomodoro sessions`;
            
            case 'blog':
                return value === 0 ? 'No blog activity' :
                       value === 1 ? '1 blog update' :
                       `${value} blog updates`;
                       
            default:
                return `${value} activities`;
        }
    }

    moveTooltip(event) {
        const x = event.pageX;
        const y = event.pageY;
        
        this.tooltip.style.left = `${x + 10}px`;
        this.tooltip.style.top = `${y - 10}px`;
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }

    updateStatistics() {
        // Calculate weekly totals and averages
        console.log('📊 Current data size:', this.data.pomodoro.size);
        console.log('📊 Data entries:', Array.from(this.data.pomodoro.entries()));
        
        const weeklyPomodoros = this.calculateWeeklyPomodoros();
        const averageWeekly = this.calculateAverageWeeklyPomodoros();

        console.log('📈 Weekly total:', weeklyPomodoros);
        console.log('📈 Average weekly:', averageWeekly);

        // Update UI
        document.getElementById('total-pomodoros').textContent = weeklyPomodoros;
        document.getElementById('average-weekly').textContent = averageWeekly;

    }

    calculateWeeklyPomodoros() {
        const today = new Date();
        const startOfWeek = new Date(today);
        
        // Set to start of week (Sunday)
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        let weeklyTotal = 0;
        
        // Count pomodoros for each day of the current week
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            weeklyTotal += this.data.pomodoro.get(dateStr) || 0;
        }
        
        return weeklyTotal;
    }

    calculateAverageWeeklyPomodoros() {
        const allDates = Array.from(this.data.pomodoro.keys()).sort();
        if (allDates.length === 0) return 0;

        // Get first and last dates
        const firstDate = new Date(allDates[0]);
        const lastDate = new Date(allDates[allDates.length - 1]);
        
        // Calculate total weeks between first and last date
        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
        const totalWeeks = Math.max(1, Math.ceil((lastDate - firstDate) / millisecondsInWeek));
        
        // Calculate total pomodoros
        const totalPomodoros = Array.from(this.data.pomodoro.values()).reduce((sum, val) => sum + val, 0);
        
        // Return average rounded to 1 decimal place
        return Math.round((totalPomodoros / totalWeeks) * 10) / 10;
    }

    calculateCurrentStreak() {
        const today = new Date();
        let streak = 0;
        
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const hasActivity = this.data.pomodoro.get(dateStr) > 0 || 
                              this.data.blog.get(dateStr) > 0;
            
            if (hasActivity) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }


    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                <strong>Error:</strong> ${message}
            </div>
        `;
        
        document.querySelector('.activity-dashboard').insertBefore(
            errorDiv, 
            document.querySelector('.tracker-section')
        );
    }
}

// Additional CSS for the contribution calendar
const additionalStyles = `
<style>
.contribution-calendar {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 12px;
}

.month-labels {
    display: flex;
    justify-content: space-around;
    margin-bottom: 8px;
    padding-left: 60px;
}

.month-label {
    color: #7f8c8d;
    font-size: 11px;
}

.grid-with-days {
    display: flex;
    gap: 3px;
}

.day-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50px;
    height: 91px; /* 7 days * 13px */
}

.day-label {
    color: #7f8c8d;
    font-size: 10px;
    text-align: right;
    line-height: 13px;
    height: 13px;
}

.weeks-container {
    display: flex;
    gap: 2px;
}

.week-column {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.contrib-day {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.1s ease;
}

.contrib-day:hover {
    stroke: #2c3e50;
    stroke-width: 1px;
    transform: scale(1.1);
}

.future-day {
    background-color: #fafbfc !important;
    cursor: default;
}

.future-day:hover {
    transform: none;
    stroke: none;
}


/* Pomodoro levels - warmer colors */
.pomodoro-level-0 { background-color: #ebedf0; }
.pomodoro-level-1 { background-color: #fed7aa; }
.pomodoro-level-2 { background-color: #fdba74; }
.pomodoro-level-3 { background-color: #fb923c; }
.pomodoro-level-4 { background-color: #ea580c; }

/* Blog levels - purple theme */
.blog-level-0 { background-color: #ebedf0; }
.blog-level-1 { background-color: #ddd6fe; }
.blog-level-2 { background-color: #c4b5fd; }
.blog-level-3 { background-color: #a78bfa; }
.blog-level-4 { background-color: #8b5cf6; }

@media (max-width: 768px) {
    .month-labels {
        padding-left: 30px;
        font-size: 10px;
    }
    
    .day-labels {
        width: 30px;
    }
    
    .day-label {
        font-size: 9px;
    }
    
    .contrib-day {
        width: 10px;
        height: 10px;
    }
    
    .contribution-graph {
        overflow-x: auto;
        padding-bottom: 1rem;
    }
}
</style>
`;

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
    
    // Initialize dashboard
    window.activityDashboard = new ActivityDashboard();
});

// Console helper for manual data updates
console.log('Activity Dashboard loaded. Use window.activityDashboard to access the dashboard instance.');
console.log('To manually update Pomodoro data, modify the loadPomodoroData() method or create a data file.');