# Daily Schedule Management Guide

This guide explains how to create and manage your personal daily schedule using the hidden schedule system.

## 📍 Accessing Your Schedule

Your daily schedule is hidden from public view but accessible at:
**URL: `yoursite.com/schedule/`**

This page won't appear in navigation or blog listings - only accessible via direct URL.

## 📅 How the Schedule System Works

### 1. Data Structure
Your schedule data is stored in `_data/schedule.yml` with two types of schedules:

- **Specific Dates**: Exact schedules for particular days
- **Recurring Patterns**: Default weekly patterns that apply when no specific date is set

### 2. Schedule Priority
The system follows this priority:
1. **Specific date schedule** (if exists) → Shows custom schedule for that day
2. **Recurring weekly pattern** → Shows default pattern for that day of week
3. **No schedule** → Shows empty day

## 🛠️ Creating Your Schedules

### Adding a Specific Day Schedule

Edit `_data/schedule.yml` and add under the `schedules:` section:

```yaml
schedules:
  "2025-08-21":  # Format: YYYY-MM-DD
    - time: "09:00"           # Start time (24-hour format)
      duration: 90            # Duration in minutes
      activity: "Research Session"
      category: "research"    # Category for color coding
      location: "Office"      # Optional: where the activity takes place
      notes: "Focus on string theory calculations"  # Optional: additional notes
    
    - time: "11:00"
      duration: 30
      activity: "Coffee Break"
      category: "break"
      location: "Café"
    
    - time: "14:00"
      duration: 120
      activity: "Team Meeting"
      category: "meeting"
      location: "Conference Room"
      notes: "Weekly progress review"
```

### Setting Up Weekly Recurring Patterns

For days that follow a regular pattern, add under `recurring:`:

```yaml
recurring:
  monday:
    - time: "09:00"
      duration: 180
      activity: "Deep Work Block"
      category: "research"
      location: "Office"
      notes: "Most productive time for complex problems"
    
    - time: "14:00"
      duration: 60
      activity: "Administrative Tasks"
      category: "admin"
      location: "Office"
  
  tuesday:
    - time: "10:00"
      duration: 120
      activity: "Teaching Preparation"
      category: "teaching"
      location: "Office"
```

## 📋 Schedule Template Examples

### Research Day Template
```yaml
"2025-08-22":
  - time: "09:00"
    duration: 180
    activity: "Deep Research Session"
    category: "research"
    location: "Office"
    notes: "Focus on [specific research topic]"
  
  - time: "13:00"
    duration: 60
    activity: "Lunch Break"
    category: "personal"
    location: "Campus Dining"
  
  - time: "15:00"
    duration: 120
    activity: "Paper Writing"
    category: "research"
    location: "Library"
    notes: "Work on [paper name]"
  
  - time: "18:00"
    duration: 90
    activity: "Reading & Review"
    category: "learning"
    location: "Office"
```

### Teaching Day Template
```yaml
"2025-08-23":
  - time: "10:00"
    duration: 120
    activity: "Lecture Preparation"
    category: "teaching"
    location: "Office"
    notes: "Prepare slides for Physics 101"
  
  - time: "14:00"
    duration: 90
    activity: "Lecture Delivery"
    category: "teaching"
    location: "Lecture Hall A"
    notes: "Physics 101 - Chapter 5"
  
  - time: "16:00"
    duration: 90
    activity: "Student Office Hours"
    category: "teaching"
    location: "Office"
    notes: "Help students with assignments"
```

### Meeting-Heavy Day Template
```yaml
"2025-08-24":
  - time: "09:00"
    duration: 60
    activity: "Project Standup"
    category: "meeting"
    location: "Conference Room"
    notes: "Weekly team sync"
  
  - time: "11:00"
    duration: 90
    activity: "Research Collaboration"
    category: "meeting"
    location: "Prof. Moore's Office"
    notes: "Discuss K-theoretic progress"
  
  - time: "15:00"
    duration: 120
    activity: "Department Seminar"
    category: "learning"
    location: "Physics Auditorium"
    notes: "Guest speaker on string theory"
```

## 🎨 Activity Categories

Use these predefined categories for consistent color coding:

| Category | Description | Use For |
|----------|-------------|---------|
| `research` | Research work and calculations | Deep work, analysis, calculations |
| `teaching` | Teaching and student interaction | Lectures, office hours, grading |
| `meeting` | Meetings and collaborative sessions | Team meetings, collaborations |
| `coding` | Software development | Programming, debugging, code review |
| `learning` | Reading, seminars, skill development | Papers, seminars, training |
| `personal` | Personal time and self-care | Meals, exercise, breaks |
| `break` | Short breaks and transitions | Coffee, quick walks |
| `admin` | Administrative tasks | Email, planning, paperwork |
| `internship` | Internship and industry work | Company projects, remote work |

## ⚙️ Schedule Settings

Customize your schedule preferences in the `settings:` section:

```yaml
settings:
  work_hours_start: "08:00"     # When your work day typically starts
  work_hours_end: "20:00"       # When your work day typically ends
  default_duration: 60          # Default activity duration (minutes)
  time_zone: "America/New_York" # Your time zone
  week_start: "monday"          # First day of your week
```

## 📱 Using the Schedule Interface

### Navigation Features
- **Date Picker**: Click the date input to jump to any specific date
- **Previous/Next**: Navigate day by day
- **Today/Tomorrow**: Quick navigation buttons
- **Week View**: See your entire week at a glance

### Schedule Information
- **Activity Timeline**: Shows your day hour by hour
- **Summary Stats**: Total activities, hours planned, research hours
- **Category Legend**: Color-coded activity types
- **Schedule Type**: Shows if using custom schedule or weekly pattern

### Interactive Features
- **Export Schedule**: Download your daily schedule as JSON
- **Help Guide**: Built-in documentation
- **Responsive Design**: Works on desktop and mobile

## 💡 Pro Tips

### 1. Time Management
```yaml
# Block time for deep work
- time: "09:00"
  duration: 180  # 3 hours uninterrupted
  activity: "Deep Work - No Interruptions"
  category: "research"
  notes: "Phone off, email closed"
```

### 2. Buffer Time
```yaml
# Add transition time between activities
- time: "10:45"
  duration: 15
  activity: "Transition & Notes"
  category: "break"
  notes: "Wrap up previous task, prepare for next"
```

### 3. Weekly Planning
```yaml
# Use Sunday for planning
sunday:
  - time: "10:00"
    duration: 90
    activity: "Weekly Review & Planning"
    category: "admin"
    notes: "Review goals, plan upcoming week"
```

### 4. Research Blocks
```yaml
# Dedicate specific time blocks for research
- time: "09:00"
  duration: 240  # 4 hours
  activity: "Research Deep Dive"
  category: "research"
  location: "Office"
  notes: "No meetings, focused work only"
```

## 🔧 Troubleshooting

### Schedule Not Showing?
1. Check date format: Use `"YYYY-MM-DD"` format
2. Verify YAML syntax: Proper indentation and structure
3. Check category exists: Use predefined categories or add new ones

### Times Not Displaying Correctly?
1. Use 24-hour format: `"09:00"` not `"9:00 AM"`
2. Include quotes: Always quote time strings
3. Check duration: Ensure it's a number (not quoted)

### Jekyll Build Errors?
1. Validate YAML: Use a YAML validator to check syntax
2. Check file encoding: Ensure UTF-8 encoding
3. Restart Jekyll: After major changes, restart the server

## 📂 File Structure

```
your-site/
├── _data/
│   └── schedule.yml          # Your schedule data
├── _pages/
│   └── daily-schedule.md     # Hidden schedule page
├── assets/
│   └── js/
│       └── schedule-manager.js  # Schedule functionality
└── SCHEDULE_GUIDE.md         # This guide
```

## 🚀 Advanced Features

### Custom Categories
Add new activity types:

```yaml
categories:
  writing:
    color: "#8B5CF6"
    icon: "pen"
    description: "Writing and documentation"
  
  health:
    color: "#EF4444"
    icon: "heartbeat"
    description: "Health and fitness activities"
```

### Recurring Events
Set up events that repeat weekly:

```yaml
recurring:
  wednesday:
    - time: "14:30"
      duration: 90
      activity: "Physics Department Seminar"
      category: "learning"
      location: "Physics Auditorium"
      notes: "Weekly department seminar - attendance required"
```

This system gives you complete control over your daily schedule while keeping it private and easily accessible!