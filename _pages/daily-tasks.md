---
title: "Daily Tasks"
permalink: /tasks/
layout: single
classes: wide
author_profile: true
categories:
  - Hide
tags:
  - tasks
  - productivity
  - personal
excerpt: "Simple daily task tracking system."
---

<div class="tasks-container">
  <div class="tasks-header">
    <h1><i class="fas fa-tasks"></i> Daily Tasks</h1>
    <p>Track your daily tasks and view progress across different days</p>
  </div>

  <!-- Date Navigation -->
  <div class="date-nav">
    <button id="prev-day" class="nav-btn">← Previous Day</button>
    <div class="date-selector">
      <input type="date" id="date-picker" class="date-input">
      <div id="current-date" class="date-display"></div>
    </div>
    <button id="next-day" class="nav-btn">Next Day →</button>
  </div>

  <!-- Tasks Display -->
  <div class="tasks-content">
    <div class="tasks-columns">
      <!-- Unfinished Tasks -->
      <div class="task-column">
        <h3 class="column-header unfinished-header">
          <i class="fas fa-clock"></i> Unfinished Tasks
          <span id="unfinished-count" class="task-count">0</span>
        </h3>
        <div id="unfinished-tasks" class="task-list">
          <!-- Unfinished tasks will be populated here -->
        </div>
      </div>

      <!-- Finished Tasks -->
      <div class="task-column">
        <h3 class="column-header finished-header">
          <i class="fas fa-check-circle"></i> Finished Tasks
          <span id="finished-count" class="task-count">0</span>
        </h3>
        <div id="finished-tasks" class="task-list">
          <!-- Finished tasks will be populated here -->
        </div>
      </div>
    </div>

    <!-- No Tasks State -->
    <div id="no-tasks" class="no-tasks" style="display: none;">
      <i class="fas fa-calendar-check"></i>
      <p>No tasks found for this date.</p>
      <p class="help-text">Add tasks in <code>_data/tasks.yml</code> to get started.</p>
    </div>
  </div>

  <!-- Pomodoro Contribution Chart -->
  <div class="contribution-summary">
    <div class="contribution-header">
      <h4><i class="fas fa-calendar-alt"></i> Pomodoro Activity</h4>
      <div class="contribution-controls">
        <button id="period-3m" class="period-btn active" data-months="3">3 months</button>
        <button id="period-6m" class="period-btn" data-months="6">6 months</button>
        <button id="period-12m" class="period-btn" data-months="12">12 months</button>
      </div>
    </div>
    
    <div class="contribution-stats">
      <div class="stat-item">
        <span class="stat-number" id="total-pomodoros">0</span>
        <span class="stat-label">total pomodoros</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" id="current-streak">0</span>
        <span class="stat-label">day current streak</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" id="longest-streak">0</span>
        <span class="stat-label">day longest streak</span>
      </div>
    </div>
    
    <div class="contribution-chart-container">
      <div class="contribution-grid">
        <div class="contribution-weekdays">
          <div class="weekday-label">Sun</div>
          <div class="weekday-label">Mon</div>
          <div class="weekday-label">Tue</div>
          <div class="weekday-label">Wed</div>
          <div class="weekday-label">Thu</div>
          <div class="weekday-label">Fri</div>
          <div class="weekday-label">Sat</div>
        </div>
        <div class="contribution-chart" id="contribution-chart">
          <!-- Contribution chart will be populated by JavaScript -->
        </div>
      </div>
      
      <div class="contribution-legend">
        <span class="legend-text">Less</span>
        <div class="legend-squares">
          <div class="legend-square level-0" title="0 pomodoros"></div>
          <div class="legend-square level-1" title="1-2 pomodoros"></div>
          <div class="legend-square level-2" title="3-5 pomodoros"></div>
          <div class="legend-square level-3" title="6-8 pomodoros"></div>
          <div class="legend-square level-4" title="9+ pomodoros"></div>
        </div>
        <span class="legend-text">More</span>
      </div>
    </div>
  </div>

  <!-- Weekly Pomodoro Summary -->
  <div class="weekly-summary">
    <h4><i class="fas fa-chart-bar"></i> This Week's Pomodoros</h4>
    <div class="week-navigation">
      <button id="prev-week" class="week-nav-btn">← Previous Week</button>
      <span id="week-range" class="week-range-text">Loading...</span>
      <button id="next-week" class="week-nav-btn">Next Week →</button>
    </div>
    <div class="week-grid" id="week-pomodoro-grid">
      <!-- Weekly pomodoro grid will be populated by JavaScript -->
    </div>
    <div class="week-total">
      <span>Week Total: <strong id="week-total-count">0</strong> 🍅</span>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/task-manager.js' | relative_url }}"></script>

<style>
/* Simple Task Manager Styles */
.tasks-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.tasks-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border-radius: 8px;
}

.tasks-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.tasks-header p {
  margin: 0;
  opacity: 0.9;
}

/* Date Navigation */
.date-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-btn {
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.nav-btn:hover {
  background: #45a049;
}

.date-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.date-input {
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.date-display {
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

/* Tasks Content */
.tasks-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.tasks-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.task-column {
  min-height: 200px;
}

.column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1.1rem;
}

.unfinished-header {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.finished-header {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.task-count {
  background: rgba(0,0,0,0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: normal;
}

.task-list {
  min-height: 150px;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
}

.task-item:hover {
  background: #e9ecef;
  transform: translateX(2px);
}

.task-icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.unfinished-task {
  border-left-color: #ffc107;
}

.unfinished-task .task-icon {
  color: #ffc107;
}

.finished-task {
  border-left-color: #28a745;
}

.finished-task .task-icon {
  color: #28a745;
}

.task-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-text {
  font-size: 0.95rem;
  line-height: 1.4;
}

.finished-task .task-text {
  text-decoration: line-through;
  opacity: 0.7;
}

.pomodoro-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pomodoro-count {
  font-size: 0.85rem;
  font-weight: bold;
  color: #666;
  min-width: 80px;
}

.pomodoro-progress {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  max-width: 150px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
  transition: width 0.3s ease;
}

.unfinished-task .progress-bar {
  background: linear-gradient(90deg, #ffc107 0%, #fd7e14 100%);
}

/* Daily Pomodoro Summary */
.daily-pomodoro-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.daily-pomodoro-summary h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.daily-pomodoro-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.daily-count {
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 120px;
}

.daily-progress {
  width: 200px;
  height: 12px;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  overflow: hidden;
}

.daily-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
  transition: width 0.5s ease;
  border-radius: 6px;
}

/* No Tasks State */
.no-tasks {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.no-tasks i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.help-text {
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Weekly Summary */
.weekly-summary {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #4CAF50;
}

.weekly-summary h4 {
  margin-top: 0;
  color: #4CAF50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.week-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.week-nav-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.week-nav-btn:hover {
  background: #45a049;
}

.week-range-text {
  font-weight: bold;
  color: #333;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
}

.week-day {
  background: white;
  border-radius: 6px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.week-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.week-day.today {
  border-color: #4CAF50;
  background: #f1f8e9;
}

.day-name {
  font-size: 0.8rem;
  font-weight: bold;
  color: #666;
  margin-bottom: 0.25rem;
}

.day-date {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
}

.day-pomodoros {
  font-size: 1.2rem;
  font-weight: bold;
  color: #4CAF50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.day-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.day-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #81C784);
  transition: width 0.5s ease;
}

.week-total {
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  font-size: 1.1rem;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .date-nav {
    flex-direction: column;
    gap: 1rem;
  }
  
  .tasks-columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .nav-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .column-header {
    font-size: 1rem;
  }
  
  .task-item {
    padding: 0.5rem;
  }
  
  /* Weekly grid responsive */
  .week-grid {
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
  }
  
  .week-day {
    padding: 0.5rem 0.25rem;
  }
  
  .day-name {
    font-size: 0.7rem;
  }
  
  .day-date {
    font-size: 0.65rem;
  }
  
  .day-pomodoros {
    font-size: 1rem;
  }
  
  .week-navigation {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .week-nav-btn {
    width: 100%;
    max-width: 150px;
  }
}

@media (max-width: 480px) {
  .week-grid {
    grid-template-columns: repeat(7, minmax(40px, 1fr));
    gap: 0.125rem;
  }
  
  .week-day {
    padding: 0.375rem 0.125rem;
  }
  
  .day-name {
    font-size: 0.6rem;
  }
  
  .day-date {
    font-size: 0.55rem;
    margin-bottom: 0.25rem;
  }
  
  .day-pomodoros {
    font-size: 0.9rem;
  }
  
  .day-bar {
    height: 6px;
    margin-top: 0.25rem;
  }
  
  .weekly-summary {
    padding: 1rem;
  }
  
  .weekly-summary h4 {
    font-size: 1rem;
  }
}

/* Contribution Chart Styles */
.contribution-summary {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e1e4e8;
}

.contribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.contribution-header h4 {
  margin: 0;
  color: #24292e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contribution-controls {
  display: flex;
  gap: 0.5rem;
}

.period-btn {
  background: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #656d76;
}

.period-btn:hover {
  background: #f3f4f6;
  border-color: #c4c9d0;
}

.period-btn.active {
  background: #0969da;
  border-color: #0969da;
  color: white;
}

.contribution-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f6f8fa;
  border-radius: 6px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #24292e;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #656d76;
  margin-top: 0.25rem;
}

.contribution-chart-container {
  position: relative;
}

.contribution-chart {
  display: grid;
  gap: 3px;
  padding: 1rem;
  background: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 1rem;
  overflow-x: auto;
  min-height: 120px;
}

.contribution-day {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

/* Contribution levels with GitHub-style colors */
.contribution-day.level-0 {
  background-color: #ebedf0;
}

.contribution-day.level-1 {
  background-color: #9be9a8;
}

.contribution-day.level-2 {
  background-color: #40c463;
}

.contribution-day.level-3 {
  background-color: #30a14e;
}

.contribution-day.level-4 {
  background-color: #216e39;
}

.contribution-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #656d76;
}

.legend-text {
  font-size: 0.75rem;
}

.legend-squares {
  display: flex;
  gap: 2px;
}

.legend-square {
  width: 14px;
  height: 14px;
  border-radius: 2px;
}

.legend-square.level-0 {
  background-color: #ebedf0;
}

.legend-square.level-1 {
  background-color: #9be9a8;
}

.legend-square.level-2 {
  background-color: #40c463;
}

.legend-square.level-3 {
  background-color: #30a14e;
}

.legend-square.level-4 {
  background-color: #216e39;
}

/* Tooltip for contribution chart */
.contribution-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  z-index: 1000;
  pointer-events: none;
  white-space: nowrap;
  transform: translate(-50%, -100%);
  margin-top: -8px;
}

.contribution-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
}

/* Month labels */
.contribution-months {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3px;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
}

.month-label {
  font-size: 0.75rem;
  color: #656d76;
  text-align: center;
}

/* Weekday labels */
.contribution-weekdays {
  display: grid;
  grid-template-rows: repeat(7, 14px);
  gap: 3px;
  margin-right: 0.5rem;
  padding: 1rem 0;
  align-items: center;
}

.weekday-label {
  font-size: 0.75rem;
  color: #656d76;
  text-align: right;
  line-height: 14px;
  padding-right: 0.5rem;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.contribution-grid {
  display: flex;
  align-items: flex-start;
}

/* Loading State */
.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.loading i {
  font-size: 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments for contribution chart */
@media (max-width: 768px) {
  .contribution-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .contribution-controls {
    justify-content: center;
  }
  
  .period-btn {
    flex: 1;
  }
  
  .contribution-stats {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .stat-item {
    align-items: center;
  }
  
  .contribution-chart {
    grid-template-columns: repeat(auto-fit, minmax(8px, 1fr));
    gap: 2px;
    padding: 0.75rem;
  }
  
  .contribution-day {
    width: 10px;
    height: 10px;
  }
  
  .legend-square {
    width: 10px;
    height: 10px;
  }
}
</style>