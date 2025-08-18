---
title: "Daily Schedule"
permalink: /schedule/
layout: single
classes: wide
author_profile: true
categories:
  - Hide
tags:
  - schedule
  - productivity
  - personal
toc: true
toc_label: "Schedule Navigation"
toc_icon: "calendar-alt"
excerpt: "Personal daily schedule management system with interactive date navigation."
---

<div class="schedule-dashboard">
  <div class="schedule-header">
    <h1><i class="fas fa-calendar-alt"></i> Daily Schedule</h1>
    <p class="schedule-description">Interactive schedule viewer with date navigation and activity tracking</p>
  </div>

  <!-- Date Navigation -->
  <div class="date-navigation">
    <div class="date-controls">
      <button id="prev-day" class="nav-btn"><i class="fas fa-chevron-left"></i> Previous</button>
      <div class="current-date">
        <input type="date" id="date-picker" class="date-input">
        <span id="display-date" class="date-display"></span>
      </div>
      <button id="next-day" class="nav-btn">Next <i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="quick-nav">
      <button id="today-btn" class="quick-btn">Today</button>
      <button id="tomorrow-btn" class="quick-btn">Tomorrow</button>
      <button id="week-view-btn" class="quick-btn">Week View</button>
    </div>
  </div>

  <!-- Schedule Display -->
  <div class="schedule-content">
    <!-- Today's Summary -->
    <div class="schedule-summary">
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-number" id="total-activities">--</span>
          <span class="stat-label">Activities</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" id="total-hours">--</span>
          <span class="stat-label">Hours Planned</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" id="research-hours">--</span>
          <span class="stat-label">Research Hours</span>
        </div>
      </div>
    </div>

    <!-- Schedule Timeline -->
    <div class="schedule-timeline" id="schedule-timeline">
      <div class="timeline-header">
        <h3>Schedule for <span id="schedule-date-title">Today</span></h3>
        <div class="schedule-type-indicator" id="schedule-type">
          <span class="schedule-badge">Loading...</span>
        </div>
      </div>
      
      <div class="timeline-container" id="timeline-container">
        <!-- Schedule items will be populated by JavaScript -->
        <div class="no-schedule" id="no-schedule" style="display: none;">
          <i class="fas fa-calendar-times"></i>
          <p>No schedule found for this date.</p>
          <p class="help-text">Either add a specific schedule in <code>_data/schedule.yml</code> or this date will use the recurring weekly pattern.</p>
        </div>
      </div>
    </div>

    <!-- Week View -->
    <div class="week-view" id="week-view" style="display: none;">
      <div class="week-header">
        <h3>Week Overview</h3>
        <div class="week-navigation">
          <button id="prev-week" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
          <span id="week-range">Week Range</span>
          <button id="next-week" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="week-grid" id="week-grid">
        <!-- Week view will be populated by JavaScript -->
      </div>
    </div>
  </div>

  <!-- Schedule Categories Legend -->
  <div class="schedule-legend">
    <h4>Activity Categories</h4>
    <div class="legend-items" id="legend-items">
      <!-- Legend will be populated by JavaScript from schedule data -->
    </div>
  </div>

  <!-- Quick Actions -->
  <div class="quick-actions">
    <h4>Quick Actions</h4>
    <div class="action-buttons">
      <button class="action-btn" onclick="window.open('/_data/schedule.yml', '_blank')">
        <i class="fas fa-edit"></i> Edit Schedule Data
      </button>
      <button class="action-btn" onclick="exportSchedule()">
        <i class="fas fa-download"></i> Export Schedule
      </button>
      <button class="action-btn" onclick="showScheduleHelp()">
        <i class="fas fa-question-circle"></i> Help & Guide
      </button>
    </div>
  </div>

  <!-- Help Modal -->
  <div class="modal" id="help-modal" style="display: none;">
    <div class="modal-content">
      <span class="close" onclick="closeHelpModal()">&times;</span>
      <h3>Schedule Management Guide</h3>
      
      <div class="help-section">
        <h4>Adding Daily Schedules</h4>
        <p>Edit <code>_data/schedule.yml</code> to add specific dates:</p>
        <pre><code>schedules:
  "2025-08-21":
    - time: "09:00"
      duration: 90
      activity: "Research Session"
      category: "research"
      location: "Office"
      notes: "Focus on string theory calculations"</code></pre>
      </div>

      <div class="help-section">
        <h4>Recurring Weekly Patterns</h4>
        <p>Set default patterns for each day of the week:</p>
        <pre><code>recurring:
  monday:
    - time: "09:00"
      activity: "Deep Work"
      category: "research"</code></pre>
      </div>

      <div class="help-section">
        <h4>Activity Categories</h4>
        <p>Customize categories with colors and icons:</p>
        <ul>
          <li><strong>research</strong> - Research work and calculations</li>
          <li><strong>teaching</strong> - Teaching and student interaction</li>
          <li><strong>meeting</strong> - Meetings and collaboration</li>
          <li><strong>personal</strong> - Personal time and self-care</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div class="loading-state" id="loading-state">
    <div class="loader">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading schedule data...</p>
    </div>
  </div>

</div>

<!-- Include Schedule JavaScript -->
<script src="{{ '/assets/js/schedule-manager.js' | relative_url }}"></script>

<style>
/* Schedule Dashboard Styles */
.schedule-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.schedule-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.schedule-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.schedule-description {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Date Navigation */
.date-navigation {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.date-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.current-date {
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
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.nav-btn, .quick-btn, .action-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-btn:hover, .quick-btn:hover, .action-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.quick-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Schedule Content */
.schedule-content {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.schedule-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 6px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Timeline */
.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.schedule-badge {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-container {
  padding: 1.5rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid #667eea;
  background: #f8f9fa;
  border-radius: 0 6px 6px 0;
  transition: all 0.3s ease;
}

.schedule-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.time-block {
  min-width: 100px;
  font-weight: bold;
  color: #333;
}

.activity-details {
  flex: 1;
  margin-left: 1rem;
}

.activity-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.activity-meta {
  font-size: 0.9rem;
  color: #666;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

/* Week View */
.week-view {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.week-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
}

.day-column {
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.day-header {
  background: #667eea;
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
}

.day-activities {
  padding: 0.5rem;
}

.mini-activity {
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0;
  border-radius: 3px;
  font-size: 0.8rem;
  border-left: 3px solid #667eea;
}

/* Legend */
.schedule-legend {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.legend-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

/* Quick Actions */
.quick-actions {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Modal */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

.modal-content {
  background: white;
  margin: 5% auto;
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: black;
}

.help-section {
  margin-bottom: 2rem;
}

.help-section h4 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.help-section pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

/* Loading State */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.loader {
  text-align: center;
}

.loader i {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 1rem;
}

/* No Schedule State */
.no-schedule {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.no-schedule i {
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
  .date-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quick-nav {
    flex-wrap: wrap;
  }
  
  .summary-stats {
    grid-template-columns: 1fr;
  }
  
  .week-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .schedule-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .activity-details {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>