---
title: "Workout Tracker"
permalink: /workout/
layout: single
classes: wide
author_profile: true
categories:
  - Hide
tags:
  - workout
  - fitness
  - strength
  - personal
excerpt: "Track workout progress with detailed exercise analytics."
---

<div class="workout-container">
  <div class="workout-header">
    <h1><i class="fas fa-dumbbell"></i> Workout Tracker</h1>
    <p>Track your strength training progress across different muscle groups</p>
  </div>

  <!-- Summary Statistics -->
  <div class="stats-summary">
    <div class="stat-card">
      <div class="stat-value" id="total-workouts">0</div>
      <div class="stat-label">Total Workouts</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="total-volume">0</div>
      <div class="stat-label">Total Volume (lbs)</div>
    </div>
  </div>

  <!-- Category Tabs -->
  <div class="category-tabs">
    <button class="tab-btn active" data-category="all">
      <i class="fas fa-chart-line"></i> All
    </button>
    <button class="tab-btn" data-category="chest">
      <i class="fas fa-heart"></i> Chest
    </button>
    <button class="tab-btn" data-category="leg">
      <i class="fas fa-running"></i> Legs
    </button>
    <button class="tab-btn" data-category="shoulder">
      <i class="fas fa-hand-rock"></i> Shoulders
    </button>
    <button class="tab-btn" data-category="back">
      <i class="fas fa-shield-alt"></i> Back
    </button>
    <button class="tab-btn" data-category="other">
      <i class="fas fa-plus-circle"></i> Other
    </button>
  </div>

  <!-- Exercise Charts Section -->
  <div class="charts-section">
    <div class="charts-grid" id="charts-grid">
      <!-- Charts will be dynamically generated here -->
    </div>
  </div>

  <!-- Recent Workouts -->
  <div class="recent-workouts">
    <h3><i class="fas fa-clock"></i> Recent Workouts</h3>
    <div class="workout-timeline" id="workout-timeline">
      <!-- Recent workout entries will be populated here -->
    </div>
  </div>

  <!-- Detailed Data Table -->
  <div class="data-table-section">
    <div class="table-header">
      <h3><i class="fas fa-table"></i> Workout Log</h3>
      <div class="table-controls">
        <div class="quick-filters">
          <button class="quick-filter-btn active" data-filter="recent">Recent</button>
          <button class="quick-filter-btn" data-filter="week">This Week</button>
          <button class="quick-filter-btn" data-filter="month">This Month</button>
          <button class="quick-filter-btn" data-filter="all">All Time</button>
        </div>
        <div class="search-sort-controls">
          <input type="text" id="search-input" placeholder="Search exercises..." class="search-input">
          <select id="category-filter" class="category-filter">
            <option value="">All Categories</option>
            <option value="chest">Chest</option>
            <option value="leg">Legs</option>
            <option value="shoulder">Shoulders</option>
            <option value="back">Back</option>
            <option value="other">Other</option>
          </select>
          <select id="sort-select" class="sort-select">
            <option value="date-desc">Date (Newest)</option>
            <option value="date-asc">Date (Oldest)</option>
            <option value="weight-desc">Weight (High to Low)</option>
            <option value="volume-desc">Volume (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="table-wrapper">
      <table id="workout-table" class="workout-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Exercise</th>
            <th>Weight (lbs)</th>
            <th>Reps</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody id="workout-tbody">
          <!-- Table rows will be populated by JavaScript -->
        </tbody>
      </table>
    </div>
    
    <div class="table-pagination">
      <div class="pagination-info">
        <span id="entries-info">Showing <strong id="entries-shown">0</strong> of <strong id="entries-total">0</strong> entries</span>
      </div>
      <button id="load-more-btn" class="load-more-btn" style="display: none;">
        <i class="fas fa-chevron-down"></i> Load More Entries
      </button>
    </div>
  </div>

  <!-- No Data State -->
  <div id="no-data" class="no-data" style="display: none;">
    <i class="fas fa-dumbbell"></i>
    <p>No workout data found.</p>
    <p class="help-text">Add data in <code>_data/workouts.yml</code> to get started.</p>
  </div>
</div>

<script>
  // Inject Jekyll workout data into JavaScript
  window.workoutData = {{ site.data.workouts | jsonify }};
</script>

<!-- Load Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/workout-tracker.js' | relative_url }}"></script>

<style>
/* Workout Tracker Styles */
.workout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

.workout-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.workout-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.workout-header p {
  margin: 0;
  opacity: 0.9;
}

/* Summary Statistics */
.stats-summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #667eea;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.stat-card:nth-child(2) {
  border-left-color: #f093fb;
}

.stat-value {
  font-size: 1.8rem;
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

/* Category Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.tab-btn:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.tab-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.tab-btn[data-category="chest"].active {
  background: #e74c3c;
  border-color: #e74c3c;
}

.tab-btn[data-category="leg"].active {
  background: #3498db;
  border-color: #3498db;
}

.tab-btn[data-category="shoulder"].active {
  background: #f39c12;
  border-color: #f39c12;
}

.tab-btn[data-category="back"].active {
  background: #27ae60;
  border-color: #27ae60;
}

.tab-btn[data-category="other"].active {
  background: #8e44ad;
  border-color: #8e44ad;
}

/* Charts Section */
.charts-section {
  margin-bottom: 2rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.exercise-chart-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #667eea;
}

.exercise-chart-card.chest {
  border-left-color: #e74c3c;
}

.exercise-chart-card.leg {
  border-left-color: #3498db;
}

.exercise-chart-card.shoulder {
  border-left-color: #f39c12;
}

.exercise-chart-card.back {
  border-left-color: #27ae60;
}

.exercise-chart-card.other {
  border-left-color: #8e44ad;
}

.chart-title {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.exercise-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

/* Recent Workouts */
.recent-workouts {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.recent-workouts h3 {
  margin: 0 0 1rem 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.workout-timeline {
  max-height: 400px;
  overflow-y: auto;
}

.workout-entry {
  border-left: 4px solid #667eea;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 0 8px 8px 0;
}

.workout-entry.chest {
  border-left-color: #e74c3c;
}

.workout-entry.leg {
  border-left-color: #3498db;
}

.workout-entry.shoulder {
  border-left-color: #f39c12;
}

.workout-entry.back {
  border-left-color: #27ae60;
}

.workout-entry.other {
  border-left-color: #8e44ad;
}

.workout-date {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.workout-exercises {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.exercise-tag {
  background: rgba(102, 126, 234, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #667eea;
}

.exercise-tag.chest {
  background: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.exercise-tag.leg {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.exercise-tag.shoulder {
  background: rgba(243, 156, 18, 0.1);
  color: #f39c12;
}

.exercise-tag.back {
  background: rgba(39, 174, 96, 0.1);
  color: #27ae60;
}

.exercise-tag.other {
  background: rgba(142, 68, 173, 0.1);
  color: #8e44ad;
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
  flex-direction: column;
  gap: 1rem;
}

.quick-filters {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.quick-filter-btn {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #555;
  font-weight: 500;
}

.quick-filter-btn:hover {
  background: #e9ecef;
  border-color: #ced4da;
}

.quick-filter-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.search-sort-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-input, .category-filter, .sort-select {
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
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  background: white;
}

.workout-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.workout-table th,
.workout-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.workout-table th {
  background: #f8f9fa;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 2px solid #e1e5e9;
}

.workout-table tbody tr:hover {
  background: #f8f9fa;
}

.category-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.category-badge.chest {
  background: #e74c3c;
  color: white;
}

.category-badge.leg {
  background: #3498db;
  color: white;
}

.category-badge.shoulder {
  background: #f39c12;
  color: white;
}

.category-badge.back {
  background: #27ae60;
  color: white;
}

.category-badge.other {
  background: #8e44ad;
  color: white;
}

/* Table Pagination */
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem 0;
}

.pagination-info {
  color: #666;
  font-size: 0.9rem;
}

.load-more-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.load-more-btn:hover {
  background: #5a67d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.load-more-btn:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
  transform: none;
}

.load-more-btn i {
  font-size: 0.8rem;
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
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-summary {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }
  
  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .table-controls {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .search-input, .category-filter, .sort-select {
    width: 100%;
  }
  
  .category-tabs {
    justify-content: center;
  }
  
  .tab-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .stats-summary {
    grid-template-columns: 1fr;
  }
  
  .workout-header h1 {
    font-size: 1.5rem;
  }
  
  .category-tabs {
    gap: 0.25rem;
  }
  
  .tab-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.7rem;
  }
  
  .workout-table {
    font-size: 0.8rem;
  }
  
  .workout-table th,
  .workout-table td {
    padding: 0.5rem;
  }
}

/* Chart responsive settings */
.exercise-chart {
  max-height: 300px;
}

/* Custom scrollbar for timeline */
.workout-timeline::-webkit-scrollbar {
  width: 6px;
}

.workout-timeline::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.workout-timeline::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.workout-timeline::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>