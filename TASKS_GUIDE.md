# Daily Tasks Management Guide

Simple guide for managing your daily tasks with pomodoro tracking.

## 📍 Access Your Tasks

Your daily tasks page is hidden from public view:
**URL: `yoursite.com/tasks/`**

## 🍅 Pomodoro-Based Task System

Tasks are now tracked using pomodoro counts instead of manual completion status:
- **used_pomodoros**: How many pomodoros you've already spent on this task
- **expected_pomodoros**: How many pomodoros you think the task will take
- **Auto-completion**: Task is automatically marked finished when used ≥ expected

## 📝 How to Add Tasks

### 1. Edit the Tasks File
Open `_data/tasks.yml` in your text editor.

### 2. Add Tasks with Pomodoro Counts
Use this format:

```yaml
"2025-08-20":
  - task: "Complete research paper"
    used_pomodoros: 2      # Already spent 2 pomodoros
    expected_pomodoros: 5  # Think it will take 5 total
  - task: "Team meeting"
    used_pomodoros: 2      # Spent 2 pomodoros
    expected_pomodoros: 2  # Expected 2 (finished: 2 ≥ 2)
  - task: "Review code"
    used_pomodoros: 0      # Haven't started
    expected_pomodoros: 3  # Expect it to take 3
```

### 3. Key Points
- **Date Format**: Always use `"YYYY-MM-DD"` in quotes
- **Task Text**: Describe what you need to do
- **Pomodoro Numbers**: Both must be non-negative integers
- **Auto-Status**: No need to manually set finished status

## ⏱️ Updating Pomodoro Progress

To update progress on a task, just change the `used_pomodoros` number:

```yaml
# Started task - used 1 pomodoro
- task: "Write blog post"
  used_pomodoros: 1      # Changed from 0 to 1
  expected_pomodoros: 3

# Made more progress - used 2 pomodoros  
- task: "Write blog post"
  used_pomodoros: 2      # Changed from 1 to 2
  expected_pomodoros: 3

# Finished task - used 3 pomodoros
- task: "Write blog post"  
  used_pomodoros: 3      # Now 3 ≥ 3, so task is finished
  expected_pomodoros: 3
```

## 📅 Using the Interface

### Navigation
- **Previous/Next Day**: Navigate through different dates
- **Date Picker**: Jump to any specific date
- **Two Columns**: Unfinished tasks on left, finished tasks on right

### What You'll See
- **Daily Summary**: Total pomodoros used/expected at the top
- **Pomodoro Progress**: Each task shows "🍅 2/4" with progress bar
- **Auto-Status**: Tasks automatically move to finished column when used ≥ expected
- **Unfinished Tasks**: Yellow progress bars, clock icons
- **Finished Tasks**: Green progress bars, check icons, crossed-out text

## 📋 Example Tasks File

```yaml
"2025-08-18":
  - task: "Complete research proposal"
    finished: false
  - task: "Reply to emails"
    finished: true
  - task: "Prepare presentation slides"
    finished: false

"2025-08-19":
  - task: "Team meeting at 2 PM"
    finished: true
  - task: "Code review"
    finished: false
  - task: "Grocery shopping"
    finished: true

"2025-08-20":
  - task: "Write blog post"
    finished: false
  - task: "Exercise"
    finished: false
```

## 💡 Tips

### Task Organization
- Keep task descriptions clear and specific
- Use action words: "Complete", "Review", "Prepare"
- Don't worry about times - just focus on what needs to be done

### Daily Workflow
1. At start of day: Check your tasks at `/tasks/`
2. As you complete tasks: Edit `_data/tasks.yml` and set `finished: true`
3. Add new tasks as they come up

### Planning Ahead
You can add tasks for future dates:
```yaml
"2025-08-25":
  - task: "Prepare for conference presentation"
    finished: false
  - task: "Book travel arrangements"
    finished: false
```

That's it! Keep it simple and focus on getting things done.