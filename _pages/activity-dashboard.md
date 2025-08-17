---
title: "Research Activity Dashboard"
permalink: /activity/
layout: single
classes: wide
author_profile: true
toc: true
toc_label: "Activity Metrics"
toc_icon: "chart-line"
---

<div class="activity-dashboard">
  <div class="dashboard-header">
    <h1><i class="fas fa-chart-line"></i> Research Activity Dashboard</h1>
    <p class="dashboard-description">Track daily research productivity through focused work sessions and content creation</p>
  </div>

  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-number" id="total-pomodoros">--</div>
      <div class="stat-label">Pomodoro Sessions</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="total-posts">--</div>
      <div class="stat-label">Blog Updates</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="current-streak">--</div>
      <div class="stat-label">Current Streak</div>
    </div>
    <div class="stat-card">
      <div class="stat-number" id="total-activities">--</div>
      <div class="stat-label">Total Activities</div>
    </div>
  </div>


  <section class="tracker-section">
    <div class="section-header">
      <h3><i class="fas fa-clock"></i> Pomodoro Sessions</h3>
      <div class="section-description">Daily focused work sessions completed</div>
    </div>
    <div class="graph-container">
      <div id="pomodoro-graph" class="contribution-graph">
        <div class="loading">Loading pomodoro data...</div>
      </div>
      <div class="graph-legend">
        <span class="legend-label">0</span>
        <div class="legend-scale">
          <div class="legend-day pomodoro-level-0"></div>
          <div class="legend-day pomodoro-level-1"></div>
          <div class="legend-day pomodoro-level-2"></div>
          <div class="legend-day pomodoro-level-3"></div>
          <div class="legend-day pomodoro-level-4"></div>
        </div>
        <span class="legend-label">8+</span>
      </div>
    </div>
  </section>

  <section class="tracker-section">
    <div class="section-header">
      <h3><i class="fas fa-blog"></i> Blog & Research Updates</h3>
      <div class="section-description">Daily blog posts, research notes, and content updates</div>
    </div>
    <div class="graph-container">
      <div id="blog-graph" class="contribution-graph">
        <div class="loading">Loading blog activity...</div>
      </div>
      <div class="graph-legend">
        <span class="legend-label">None</span>
        <div class="legend-scale">
          <div class="legend-day blog-level-0"></div>
          <div class="legend-day blog-level-1"></div>
          <div class="legend-day blog-level-2"></div>
          <div class="legend-day blog-level-3"></div>
          <div class="legend-day blog-level-4"></div>
        </div>
        <span class="legend-label">High</span>
      </div>
    </div>
  </section>

</div>

<!-- Tooltip for hover information -->
<div id="activity-tooltip" class="activity-tooltip" style="display: none;">
  <div class="tooltip-date"></div>
  <div class="tooltip-content"></div>
</div>

<style>
.activity-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.dashboard-description {
  color: #7f8c8d;
  font-size: 1.1rem;
  margin: 0;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #fff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tracker-section {
  margin-bottom: 4rem;
  background: #fff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.section-description {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.graph-container {
  position: relative;
}

.contribution-graph {
  background: #fafbfc;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 1rem;
  min-height: 150px;
  position: relative;
  overflow-x: auto;
}

.loading {
  text-align: center;
  color: #7f8c8d;
  padding: 2rem;
  font-style: italic;
}

.graph-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.5rem;
}

.legend-label {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.legend-scale {
  display: flex;
  gap: 2px;
}

.legend-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}


/* Pomodoro color scheme */
.pomodoro-level-0 { background-color: #ebedf0; }
.pomodoro-level-1 { background-color: #ffd700; }
.pomodoro-level-2 { background-color: #ffa500; }
.pomodoro-level-3 { background-color: #ff6347; }
.pomodoro-level-4 { background-color: #dc143c; }

/* Blog activity color scheme */
.blog-level-0 { background-color: #ebedf0; }
.blog-level-1 { background-color: #c6e48b; }
.blog-level-2 { background-color: #7bc96f; }
.blog-level-3 { background-color: #239a3b; }
.blog-level-4 { background-color: #196127; }


.activity-tooltip {
  position: absolute;
  background: #2c3e50;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.tooltip-date {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.tooltip-content {
  font-size: 0.75rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .activity-dashboard {
    padding: 1rem;
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .tracker-section {
    padding: 1rem;
  }
  
  .contribution-graph {
    overflow-x: scroll;
  }
}
</style>

<script src="{{ '/assets/js/activity-dashboard.js' | relative_url }}"></script>