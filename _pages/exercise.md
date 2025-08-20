---
title: "Exercise Tracker"
permalink: /exercise/
layout: single
classes: wide
author_profile: true
categories:
  - Hide
tags:
  - exercise
  - running
  - fitness
  - personal
excerpt: "Track running progress with data visualization."
---

<div class="exercise-container">
  <div class="exercise-header">
    <h1><i class="fas fa-running"></i> Exercise Tracker</h1>
    <p>Track your running progress and visualize performance over time</p>
  </div>

  <!-- Summary Statistics -->
  <div class="stats-summary">
    <div class="stat-card">
      <div class="stat-value" id="total-distance">0</div>
      <div class="stat-label">Total Distance (miles)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="total-runs">0</div>
      <div class="stat-label">Total Runs</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="avg-distance">0</div>
      <div class="stat-label">Avg Distance (miles)</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="avg-pace">0</div>
      <div class="stat-label">Avg Pace (min:sec/mile)</div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="charts-section">
    <div class="chart-container">
      <h3><i class="fas fa-chart-line"></i> Distance Over Time</h3>
      <canvas id="distanceChart" width="400" height="200"></canvas>
    </div>
    
    <div class="chart-container">
      <h3><i class="fas fa-tachometer-alt"></i> Pace Over Time</h3>
      <canvas id="paceChart" width="400" height="200"></canvas>
    </div>
  </div>

  <!-- Data Table -->
  <div class="data-table-section">
    <div class="table-header">
      <h3><i class="fas fa-table"></i> Running Log</h3>
      <div class="table-controls">
        <input type="text" id="search-input" placeholder="Search runs..." class="search-input">
        <select id="sort-select" class="sort-select">
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="distance-desc">Distance (High to Low)</option>
          <option value="distance-asc">Distance (Low to High)</option>
          <option value="pace-desc">Pace (Slowest)</option>
          <option value="pace-asc">Pace (Fastest)</option>
        </select>
      </div>
    </div>
    
    <div class="table-wrapper">
      <table id="running-table" class="running-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Distance (miles)</th>
            <th>Time (min:sec)</th>
            <th>Pace (min:sec/mile)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody id="running-tbody">
          <!-- Table rows will be populated by JavaScript -->
        </tbody>
      </table>
    </div>
  </div>

  <!-- No Data State -->
  <div id="no-data" class="no-data" style="display: none;">
    <i class="fas fa-running"></i>
    <p>No running data found.</p>
    <p class="help-text">Add data in <code>_data/running.yml</code> to get started.</p>
  </div>
</div>

<script>
  // Inject Jekyll running data into JavaScript
  window.runningData = {{ site.data.running | jsonify }};
</script>

<!-- Load Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/exercise-tracker.js' | relative_url }}"></script>

<style>
/* Exercise Tracker Styles */
.exercise-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.exercise-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  color: white;
  border-radius: 8px;
}

.exercise-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.exercise-header p {
  margin: 0;
  opacity: 0.9;
}

/* Summary Statistics */
.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #FF6B6B;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.stat-card:nth-child(2) {
  border-left-color: #4ECDC4;
}

.stat-card:nth-child(3) {
  border-left-color: #45B7D1;
}

.stat-card:nth-child(4) {
  border-left-color: #96CEB4;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container h3 {
  margin: 0 0 1rem 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Data Table */
.data-table-section {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.table-header h3 {
  margin: 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.table-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input, .sort-select {
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-input {
  min-width: 200px;
}

.table-wrapper {
  overflow-x: auto;
}

.running-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.running-table th,
.running-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.running-table th {
  background: #f8f9fa;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
}

.running-table tbody tr:hover {
  background: #f8f9fa;
}

.running-table tbody tr.highlight {
  background: #fff3cd;
}

/* No Data State */
.no-data {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.no-data i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.help-text {
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .charts-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stats-summary {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .table-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .search-input, .sort-select {
    width: 100%;
  }
  
  .chart-container {
    padding: 1rem;
  }
  
  .exercise-header h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-summary {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .running-table {
    font-size: 0.8rem;
  }
  
  .running-table th,
  .running-table td {
    padding: 0.5rem;
  }
}

/* Chart responsive settings */
.chart-container canvas {
  max-height: 300px;
}

/* Custom scrollbar for table */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>