---
title: "Daily Dashboard"
permalink: /daily/
layout: single
classes: wide
author_profile: true
categories:
  - Hide
tags:
  - dashboard
  - daily
  - productivity
  - personal
excerpt: "Central hub for daily tracking and productivity tools."
---

<div class="daily-container">
  <div class="daily-header">
    <h1><i class="fas fa-calendar-day"></i> Daily Dashboard</h1>
    <p>Your central hub for daily tracking, productivity, and wellness</p>
  </div>

  <!-- Navigation Cards Grid -->
  <div class="nav-cards-grid">
    
    <!-- Tasks Card -->
    <a href="/tasks/" class="nav-card tasks-card">
      <div class="card-icon">
        <i class="fas fa-tasks"></i>
      </div>
      <div class="card-content">
        <h3 class="card-title">Daily Tasks</h3>
        <p class="card-description">Track your daily tasks and boost productivity</p>
      </div>
      <div class="card-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
    </a>

    <!-- Running/Exercise Card -->
    <a href="/exercise/" class="nav-card exercise-card">
      <div class="card-icon">
        <i class="fas fa-running"></i>
      </div>
      <div class="card-content">
        <h3 class="card-title">Running Tracker</h3>
        <p class="card-description">Track running progress and performance metrics</p>
      </div>
      <div class="card-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
    </a>

    <!-- Workout Card -->
    <a href="/workout/" class="nav-card workout-card">
      <div class="card-icon">
        <i class="fas fa-dumbbell"></i>
      </div>
      <div class="card-content">
        <h3 class="card-title">Workout Tracker</h3>
        <p class="card-description">Track strength training and muscle development</p>
      </div>
      <div class="card-arrow">
        <i class="fas fa-arrow-right"></i>
      </div>
    </a>

  </div>

  <!-- Time Tracking Charts Section -->
  <div class="time-charts-section">
    <div class="charts-header">
      <h2><i class="fas fa-chart-bar"></i> Time Distribution Charts</h2>
      <p>Visual breakdown of your time across different activity categories</p>
    </div>

    <div class="charts-container">
      <!-- Daily Bar Chart -->
      <div class="chart-panel">
        <div class="chart-controls">
          <button id="prev-week-chart" class="chart-nav-btn">← Previous Week</button>
          <span id="current-week-display" class="chart-period-display">Loading...</span>
          <button id="next-week-chart" class="chart-nav-btn">Next Week →</button>
        </div>
        <div class="chart-wrapper">
          <canvas id="dailyChart" width="400" height="300"></canvas>
        </div>
      </div>

      <!-- Monthly Donut Chart -->
      <div class="chart-panel">
        <div class="chart-controls">
          <button id="prev-month-chart" class="chart-nav-btn">← Previous Month</button>
          <span id="current-month-display" class="chart-period-display">Loading...</span>
          <button id="next-month-chart" class="chart-nav-btn">Next Month →</button>
        </div>
        <div class="chart-wrapper">
          <canvas id="monthlyChart" width="400" height="300"></canvas>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
  // Inject Jekyll data into JavaScript for charts
  window.tasksData = {{ site.data.tasks | jsonify }};
  window.runningData = {{ site.data.running | jsonify }};
  window.workoutsData = {{ site.data.workouts | jsonify }};
</script>

<!-- Chart.js CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/time-charts.js' | relative_url }}"></script>

<style>
/* Daily Dashboard Styles */
.daily-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.daily-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #FF6B6B 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.daily-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.2rem;
  font-weight: 700;
}

.daily-header p {
  margin: 0;
  opacity: 0.95;
  font-size: 1.1rem;
}

/* Navigation Cards Grid */
.nav-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.nav-card {
  display: flex;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  transition: all 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  text-decoration: none;
  color: inherit;
}

.nav-card:hover .card-arrow {
  transform: translateX(8px);
}

/* Card Themes */
.tasks-card::before {
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
}

.exercise-card::before {
  background: linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%);
}

.workout-card::before {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.card-icon {
  font-size: 2.5rem;
  margin-right: 1.5rem;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tasks-card .card-icon {
  color: #4CAF50;
}

.exercise-card .card-icon {
  color: #FF6B6B;
}

.workout-card .card-icon {
  color: #667eea;
}

.card-content {
  flex: 1;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
}

.card-arrow {
  font-size: 1.2rem;
  color: #ccc;
  margin-left: 1rem;
  transition: all 0.3s ease;
}


/* Responsive Design */
@media (max-width: 768px) {
  .daily-header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .daily-header h1 {
    font-size: 1.8rem;
  }
  
  .nav-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .nav-card {
    padding: 1.5rem;
  }
  
  .card-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
}

@media (max-width: 480px) {
  .daily-container {
    padding: 0.5rem;
  }
  
  .daily-header {
    padding: 1rem;
  }
  
  .daily-header h1 {
    font-size: 1.5rem;
  }
  
  .nav-card {
    padding: 1rem;
  }
  
  .card-icon {
    font-size: 1.8rem;
    margin-right: 0.75rem;
  }
}

/* Time Charts Section Styles */
.time-charts-section {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.charts-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.charts-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.charts-header p {
  margin: 0;
  opacity: 0.95;
  font-size: 1rem;
}

.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid #e0e0e0;
}

.chart-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.chart-nav-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  min-width: 120px;
}

.chart-nav-btn:hover {
  background: #45a049;
  transform: translateY(-2px);
}

.chart-period-display {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.chart-wrapper {
  position: relative;
  height: 350px;
  margin-top: 1rem;
}

.chart-wrapper canvas {
  max-width: 100%;
  height: 100% !important;
}

/* Responsive Design for Charts */
@media (max-width: 1024px) {
  .charts-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .chart-wrapper {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .charts-header {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .charts-header h2 {
    font-size: 1.5rem;
  }
  
  .chart-panel {
    padding: 1rem;
  }
  
  .chart-controls {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .chart-nav-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .chart-wrapper {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .time-charts-section {
    margin-top: 2rem;
  }
  
  .charts-header {
    padding: 1rem;
  }
  
  .charts-header h2 {
    font-size: 1.3rem;
  }
  
  .chart-panel {
    padding: 0.75rem;
  }
  
  .chart-wrapper {
    height: 200px;
  }
  
  .chart-nav-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>