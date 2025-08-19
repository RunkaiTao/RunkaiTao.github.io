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

  <!-- Quick Help -->
  <div class="quick-help">
    <h4>How to Add Tasks</h4>
    <p>Edit <code>_data/tasks.yml</code> and add tasks with pomodoro counts:</p>
    <pre><code>"2025-08-20":
  - task: "Your task description"
    used_pomodoros: 0      # Pomodoros already used
    expected_pomodoros: 3  # Pomodoros expected to complete</code></pre>
    <p>Tasks are automatically marked finished when used ≥ expected pomodoros.</p>
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

/* Quick Help */
.quick-help {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #4CAF50;
}

.quick-help h4 {
  margin-top: 0;
  color: #4CAF50;
}

.quick-help pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.quick-help code {
  background: #e9ecef;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9rem;
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
</style>