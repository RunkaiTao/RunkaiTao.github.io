# Daily Tasks Management Guide

Simple guide for managing your daily tasks using the hidden tasks system.

## 📍 Access Your Tasks

Your daily tasks page is hidden from public view:
**URL: `yoursite.com/tasks/`**

## 📝 How to Add Tasks

### 1. Edit the Tasks File
Open `_data/tasks.yml` in your text editor.

### 2. Add Tasks for Any Date
Use this simple format:

```yaml
"2025-08-20":
  - task: "Complete research paper"
    finished: false
  - task: "Attend team meeting"
    finished: true
  - task: "Review code submissions"
    finished: false
```

### 3. Key Points
- **Date Format**: Always use `"YYYY-MM-DD"` in quotes
- **Task Text**: Describe what you need to do
- **Finished Status**: 
  - `finished: false` = Unfinished task
  - `finished: true` = Completed task

## ✅ Marking Tasks as Complete

To mark a task as finished, simply change:
```yaml
finished: false
```
to:
```yaml
finished: true
```

## 📅 Using the Interface

### Navigation
- **Previous/Next Day**: Navigate through different dates
- **Date Picker**: Jump to any specific date
- **Two Columns**: Unfinished tasks on left, finished tasks on right

### What You'll See
- **Unfinished Tasks**: Yellow icons, normal text
- **Finished Tasks**: Green icons, crossed-out text
- **Task Counts**: Number of tasks in each category

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