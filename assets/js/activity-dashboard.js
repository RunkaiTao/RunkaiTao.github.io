/**
 * Activity Dashboard - Multi-tracker system for research productivity
 * Tracks GitHub commits, Pomodoro sessions, and blog updates
 */

class ActivityDashboard {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.githubUsername = 'RunkaiTao'; // Your GitHub username
        this.data = {
            github: new Map(),
            pomodoro: new Map(),
            blog: new Map()
        };
        this.tooltip = document.getElementById('activity-tooltip');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAllData();
        this.updateNavigation();
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
            // Load data from different sources
            await Promise.all([
                this.loadGitHubData(),
                this.loadPomodoroData(),
                this.loadBlogData()
            ]);

            // Render all graphs
            this.renderGitHubGraph();
            this.renderPomodoroGraph();
            this.renderBlogGraph();
            
            // Update statistics
            this.updateStatistics();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showError('Failed to load activity data');
        }
    }

    async loadGitHubData() {
        try {
            // Try to fetch from GitHub API
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/events?per_page=100`);
            
            if (response.ok) {
                const events = await response.json();
                this.processGitHubEvents(events);
            } else {
                // Fallback to sample data if API fails
                this.loadSampleGitHubData();
            }
        } catch (error) {
            console.warn('GitHub API unavailable, using sample data');
            this.loadSampleGitHubData();
        }
    }

    loadSampleGitHubData() {
        // Generate sample GitHub contribution data
        const today = new Date();
        const startDate = new Date(today.getFullYear(), 0, 1);
        
        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            // Random commits with realistic patterns (more on weekdays, occasional high-activity days)
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const baseActivity = isWeekend ? 0.3 : 0.7;
            const commits = Math.random() < baseActivity ? Math.floor(Math.random() * 8) + 1 : 0;
            
            if (commits > 0) {
                this.data.github.set(dateStr, commits);
            }
        }
    }

    processGitHubEvents(events) {
        const commitCounts = new Map();
        
        events.forEach(event => {
            if (event.type === 'PushEvent') {
                const date = event.created_at.split('T')[0];
                const commits = event.payload.commits ? event.payload.commits.length : 1;
                commitCounts.set(date, (commitCounts.get(date) || 0) + commits);
            }
        });

        this.data.github = commitCounts;
    }

    async loadPomodoroData() {
        // For now, use sample data. In practice, this would load from a data file or API
        // You can manually update this or integrate with your Pomodoro extension
        const samplePomodoroData = {
            '2024-12-16': 8,
            '2024-12-15': 6,
            '2024-12-14': 4,
            '2024-12-13': 7,
            '2024-12-12': 5,
            '2024-12-11': 3,
            '2024-12-10': 9,
            '2024-12-09': 2,
            '2024-12-08': 6,
            '2024-12-07': 8,
            '2024-12-06': 4,
            '2024-12-05': 7,
            '2024-12-04': 5,
            '2024-12-03': 3,
            '2024-12-02': 8,
            '2024-12-01': 6
        };

        // Generate more sample data for the year
        this.generateSamplePomodoroData(samplePomodoroData);
    }

    generateSamplePomodoroData(recent) {
        // Start with recent data
        Object.entries(recent).forEach(([date, count]) => {
            this.data.pomodoro.set(date, count);
        });

        // Generate realistic pomodoro data for the rest of the year
        const today = new Date();
        const startDate = new Date(today.getFullYear(), 0, 1);
        
        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            
            if (!this.data.pomodoro.has(dateStr)) {
                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                const baseActivity = isWeekend ? 0.4 : 0.8;
                
                if (Math.random() < baseActivity) {
                    const sessions = Math.floor(Math.random() * 8) + 1;
                    this.data.pomodoro.set(dateStr, sessions);
                }
            }
        }
    }

    async loadBlogData() {
        // This would analyze git commits to _posts/ directory
        // For now, using sample data based on your actual posts
        const blogActivity = {
            '2024-12-15': 2, // Research update
            '2024-12-01': 3, // Private research notes
            '2024-11-20': 4, // Mathematical foundations
            '2024-11-10': 3, // KV cache optimization
            '2024-10-15': 4, // Vertex operator algebras
            '2024-09-25': 5, // Scaling GNNs
            '2024-08-20': 3, // Data parallelism
            '2024-08-15': 2, // Research methodology
            '2024-07-30': 4  // Distributed training
        };

        Object.entries(blogActivity).forEach(([date, activity]) => {
            this.data.blog.set(date, activity);
        });

        // Add some additional content update days
        this.generateSampleBlogActivity();
    }

    generateSampleBlogActivity() {
        const today = new Date();
        const startDate = new Date(today.getFullYear(), 0, 1);
        
        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            
            if (!this.data.blog.has(dateStr)) {
                // Simulate occasional content updates (drafts, revisions, etc.)
                if (Math.random() < 0.15) { // 15% chance of activity
                    const activity = Math.floor(Math.random() * 3) + 1;
                    this.data.blog.set(dateStr, activity);
                }
            }
        }
    }

    renderGitHubGraph() {
        const container = document.getElementById('github-graph');
        const graph = this.createContributionGraph(this.data.github, 'github');
        container.innerHTML = '';
        container.appendChild(graph);
    }

    renderPomodoroGraph() {
        const container = document.getElementById('pomodoro-graph');
        const graph = this.createContributionGraph(this.data.pomodoro, 'pomodoro');
        container.innerHTML = '';
        container.appendChild(graph);
    }

    renderBlogGraph() {
        const container = document.getElementById('blog-graph');
        const graph = this.createContributionGraph(this.data.blog, 'blog');
        container.innerHTML = '';
        container.appendChild(graph);
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
        
        months.forEach((month, index) => {
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
            case 'github':
                if (value === 0) return 0;
                if (value <= 2) return 1;
                if (value <= 4) return 2;
                if (value <= 7) return 3;
                return 4;
            
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

        const tooltipContent = this.getTooltipContent(value, type, formattedDate);
        
        this.tooltip.querySelector('.tooltip-date').textContent = formattedDate;
        this.tooltip.querySelector('.tooltip-content').textContent = tooltipContent;
        this.tooltip.style.display = 'block';

        this.moveTooltip(event);
    }

    getTooltipContent(value, type, date) {
        switch (type) {
            case 'github':
                return value === 0 ? 'No commits' : 
                       value === 1 ? '1 commit' : 
                       `${value} commits`;
            
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
        // Calculate totals for the year
        const totalCommits = Array.from(this.data.github.values()).reduce((sum, val) => sum + val, 0);
        const totalPomodoros = Array.from(this.data.pomodoro.values()).reduce((sum, val) => sum + val, 0);
        const totalPosts = Array.from(this.data.blog.values()).reduce((sum, val) => sum + val, 0);

        // Calculate current streak
        const currentStreak = this.calculateCurrentStreak();

        // Update UI
        document.getElementById('total-commits').textContent = totalCommits;
        document.getElementById('total-pomodoros').textContent = totalPomodoros;
        document.getElementById('total-posts').textContent = totalPosts;
        document.getElementById('current-streak').textContent = currentStreak;

        // Update week stats
        this.updateWeekStats();
        
        // Update best streak and most productive day
        this.updateBestStreak();
        this.updateMostProductiveDay();
    }

    calculateCurrentStreak() {
        const today = new Date();
        let streak = 0;
        
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const hasActivity = this.data.github.get(dateStr) > 0 || 
                              this.data.pomodoro.get(dateStr) > 0 || 
                              this.data.blog.get(dateStr) > 0;
            
            if (hasActivity) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    updateWeekStats() {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());

        let weekCommits = 0;
        let weekPomodoros = 0;
        let weekPosts = 0;

        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];

            weekCommits += this.data.github.get(dateStr) || 0;
            weekPomodoros += this.data.pomodoro.get(dateStr) || 0;
            weekPosts += this.data.blog.get(dateStr) || 0;
        }

        document.getElementById('week-commits').textContent = weekCommits;
        document.getElementById('week-pomodoros').textContent = weekPomodoros;
        document.getElementById('week-posts').textContent = weekPosts;
    }

    updateBestStreak() {
        // Calculate best streak
        let bestStreak = 0;
        let currentStreak = 0;
        let streakStart = null;
        let bestStreakStart = null;
        let bestStreakEnd = null;

        const today = new Date();
        const startDate = new Date(today.getFullYear(), 0, 1);

        for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const hasActivity = this.data.github.get(dateStr) > 0 || 
                              this.data.pomodoro.get(dateStr) > 0 || 
                              this.data.blog.get(dateStr) > 0;

            if (hasActivity) {
                if (currentStreak === 0) {
                    streakStart = new Date(d);
                }
                currentStreak++;
                
                if (currentStreak > bestStreak) {
                    bestStreak = currentStreak;
                    bestStreakStart = new Date(streakStart);
                    bestStreakEnd = new Date(d);
                }
            } else {
                currentStreak = 0;
                streakStart = null;
            }
        }

        const streakElement = document.getElementById('best-streak');
        streakElement.querySelector('.streak-number').textContent = bestStreak;
        
        if (bestStreak > 0 && bestStreakStart && bestStreakEnd) {
            const startStr = bestStreakStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const endStr = bestStreakEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            streakElement.querySelector('.streak-period').textContent = `${startStr} - ${endStr}`;
        } else {
            streakElement.querySelector('.streak-period').textContent = 'No streak yet';
        }
    }

    updateMostProductiveDay() {
        let maxActivity = 0;
        let mostProductiveDate = null;

        const allDates = new Set([
            ...this.data.github.keys(),
            ...this.data.pomodoro.keys(),
            ...this.data.blog.keys()
        ]);

        allDates.forEach(dateStr => {
            const totalActivity = (this.data.github.get(dateStr) || 0) +
                                (this.data.pomodoro.get(dateStr) || 0) +
                                (this.data.blog.get(dateStr) || 0);

            if (totalActivity > maxActivity) {
                maxActivity = totalActivity;
                mostProductiveDate = dateStr;
            }
        });

        const productiveElement = document.getElementById('most-productive');
        
        if (mostProductiveDate) {
            const date = new Date(mostProductiveDate);
            const dayName = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
            });
            
            productiveElement.querySelector('.day-name').textContent = dayName;
            productiveElement.querySelector('.day-stats').textContent = `${maxActivity} total activities`;
        } else {
            productiveElement.querySelector('.day-name').textContent = '--';
            productiveElement.querySelector('.day-stats').textContent = '-- activities';
        }
    }

    updateNavigation() {
        // Add to site navigation if needed
        const navItem = document.createElement('li');
        navItem.innerHTML = '<a href="/activity/"><i class="fas fa-chart-line"></i> Activity</a>';
        
        // Try to add to existing navigation
        const nav = document.querySelector('.masthead__menu-item') || document.querySelector('.nav');
        if (nav && nav.parentElement) {
            nav.parentElement.insertBefore(navItem, nav.nextSibling);
        }
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

/* GitHub-style levels */
.github-level-0 { background-color: #ebedf0; }
.github-level-1 { background-color: #9be9a8; }
.github-level-2 { background-color: #40c463; }
.github-level-3 { background-color: #30a14e; }
.github-level-4 { background-color: #216e39; }

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