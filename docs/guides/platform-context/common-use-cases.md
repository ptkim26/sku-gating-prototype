# Common Use Cases

**Frequently implemented scenarios across Rippling**

---

## Overview

This document outlines common workflows and use cases that appear repeatedly across Rippling products. Use these as reference patterns when prototyping new features.

---

## Table of Contents

1. [Employee Onboarding](#employee-onboarding)
2. [Time Off Management](#time-off-management)
3. [Approval Workflows](#approval-workflows)
4. [Manager Dashboard](#manager-dashboard)
5. [Employee Self-Service](#employee-self-service)
6. [Data Import](#data-import)
7. [Settings Configuration](#settings-configuration)

---

## Employee Onboarding

### Scenario
New employee joins the company and needs accounts, equipment, and access set up.

### User Roles Involved
- **HR Admin** - Initiates onboarding
- **IT Admin** - Provisions accounts and equipment
- **Manager** - Approves and welcomes
- **New Employee** - Completes personal info

### Typical Flow

```
1. HR Admin creates employee record
   ↓
2. System generates onboarding checklist
   ↓
3. IT Admin provisions:
   - Email account
   - Laptop/equipment
   - App access (Slack, GitHub, etc.)
   ↓
4. Employee receives welcome email
   ↓
5. Employee completes onboarding tasks:
   - Upload ID documents
   - Complete tax forms (W-4)
   - Set up direct deposit
   - Sign company policies
   ↓
6. Manager receives notification
   ↓
7. Employee start date → status changes to ACTIVE
```

### Key UI Components

**Onboarding Checklist:**
```
📋 Onboarding Progress (7/10 completed)

✅ Personal Information
✅ Tax Forms (W-4)
✅ Direct Deposit
🔄 Emergency Contact (In Progress)
⏸️ Background Check (Pending)
⏳ I-9 Verification (Not Started)
```

**Admin View:**
```
Jane Smith • Starting Jan 15, 2024
Software Engineer • Engineering Dept

Progress: 70% complete

⚠️ 3 tasks need attention:
  - Emergency contact info missing
  - Background check pending
  - I-9 needs verification

[View Details] [Send Reminder]
```

### Data Required
- Employee: firstName, lastName, email, startDate, department, manager, jobTitle
- Documents: governmentId, taxForms
- Banking: routingNumber, accountNumber

### Prototype Considerations
- Show progress clearly (% complete, tasks remaining)
- Group tasks by category (Personal, Tax, Banking, Legal)
- Enable task assignment to different roles (HR vs IT vs Employee)
- Send reminders for incomplete tasks X days before start date
- Allow editing after submission (but track changes)

---

## Time Off Management

### Scenario
Employee requests time off, manager approves, and calendar updates.

### User Roles Involved
- **Employee** - Submits request
- **Manager** - Approves/denies
- **HR Admin** - Handles escalations

### Typical Flow

```
1. Employee navigates to Time Off
   ↓
2. Views remaining balance
   ↓
3. Selects dates (with calendar picker)
   ↓
4. System calculates days (excludes weekends/holidays)
   ↓
5. Employee adds optional reason
   ↓
6. Submits request → status: PENDING
   ↓
7. Manager receives notification
   ↓
8. Manager reviews:
   - Checks team coverage
   - Views employee's remaining balance
   - Sees if dates conflict with team events
   ↓
9. Manager approves OR denies (with reason)
   ↓
10. Employee receives notification
    ↓
11. If approved → adds to company calendar
```

### Key UI Components

**Employee View - Request Form:**
```
Request Time Off

Type: [Vacation ▼]

Dates:
  From: [Jan 15, 2024 ▼]
  To:   [Jan 19, 2024 ▼]
  
  📊 5.0 days

Balance after request: 10 days remaining

Reason (optional):
[Going on vacation with family]

[Cancel] [Submit Request]
```

**Manager View - Approval Card:**
```
Time Off Request • Jane Smith

🏖️ Vacation • Jan 15-19, 2024 (5 days)
"Going on vacation with family"

Team Coverage: ⚠️ 3 other engineers out
Balance: 15 → 10 days remaining

[Deny] [Approve]
```

**Denial Modal:**
```
Deny Time Off Request?

Please provide a reason for Jane Smith:

[Team is understaffed during this period.
 Can you take time off in February instead?]

[Cancel] [Deny Request]
```

### Business Rules
- Cannot request past dates
- Must have sufficient balance (unless unpaid)
- Manager can approve up to N days (escalates beyond)
- Denied requests require reason
- Cancelled requests restore balance

### Prototype Considerations
- Show balance prominently (before and after)
- Calculate days automatically (exclude weekends/holidays)
- Show team coverage conflicts
- Enable quick approve/deny from notification
- Allow bulk approval for managers with many requests

---

## Approval Workflows

### Scenario
Generic approval pattern used across Rippling (time off, expenses, purchases, etc.)

### Typical Flow

```
1. Requestor submits request → PENDING
   ↓
2. Primary approver notified
   ↓
3. Approver reviews request
   ↓
4. Approver approves/denies
   │
   ├─ If APPROVED → request completes
   │
   └─ If DENIED → requestor notified (with reason)
   │
   Optional: If request exceeds approver's limit
   └─ Escalates to next level approver
```

### Multi-Level Approval

```
Example: Large Expense ($5,000)

Employee submits expense
  ↓
Manager reviews ($2,000 limit exceeded)
  → Approves and forwards to Senior Manager
  ↓
Senior Manager reviews ($5,000 within limit)
  → Approves → Expense processed
```

### Key UI Components

**Pending Approval Badge:**
```
⏳ Pending Approval
   Submitted 2 hours ago
```

**Approval History:**
```
📋 Approval Chain

✅ John Manager (Manager)
   Approved on Jan 10, 2024 at 2:30 PM
   "Looks good"

⏳ Sarah Director (Director)
   Pending since Jan 10, 2024 at 2:31 PM
```

**Bulk Approval:**
```
Select All (12)

☑️ Time Off - Jane Smith (5 days)
☑️ Expense - Bob Jones ($45.00)
☑️ Time Off - Alice Lee (2 days)
...

[Approve Selected (12)]
```

### Prototype Considerations
- Show approval status clearly (pending vs approved vs denied)
- Display approval chain for multi-level workflows
- Enable bulk actions for approvers with many pending
- Show request details inline (no need to click through)
- Provide quick approve/deny with optional comment
- Require comment/reason for denials

---

## Manager Dashboard

### Scenario
Manager views team overview, pending actions, and team metrics.

### User: Manager

### Dashboard Sections

```
┌─────────────────────────────────────────┐
│  My Team Overview                       │
│  👥 12 Direct Reports                   │
│  📊 2 Open Positions                    │
└─────────────────────────────────────────┘

┌────────────────┬────────────────────────┐
│ Pending Actions│  Team Performance      │
│                │                        │
│ ⏳ 3 Time Off  │  📈 Avg Rating: 4.2/5  │
│    Requests    │  🎯 Goals on Track: 85%│
│                │  📅 Reviews Due: 2     │
│ 📝 2 Expense   │                        │
│    Reports     │  [View Details]        │
│                │                        │
│ [Review All]   │                        │
└────────────────┴────────────────────────┘

┌─────────────────────────────────────────┐
│  Team Directory                         │
│  ─────────────────────────────────────  │
│  👤 Jane Smith                          │
│     Senior Engineer • Out until Jan 15 │
│  👤 Bob Jones                           │
│     Engineer • Available               │
│  ...                                    │
└─────────────────────────────────────────┘
```

### Key Metrics

**Team Size & Structure:**
- Direct reports count
- Indirect reports (if senior manager)
- Open positions

**Pending Actions:**
- Time off requests awaiting approval
- Expense reports to review
- Performance reviews due
- Onboarding tasks incomplete

**Team Health:**
- Average performance rating
- Goal completion rate
- Attrition risk indicators

### Prototype Considerations
- Prioritize pending actions (needs manager attention)
- Show at-a-glance team status (who's out, who's available)
- Enable quick actions from dashboard (approve without navigating away)
- Responsive layout (mobile managers need quick access)
- Refresh data frequently (pending count updates in real-time)

---

## Employee Self-Service

### Scenario
Employee manages own profile, requests, and views pay/benefits info.

### User: Employee

### Common Self-Service Tasks

**Personal Information:**
- Update address
- Change phone number
- Add emergency contact
- Upload profile photo

**Time & Attendance:**
- Request time off
- View time off balance
- Check time off history
- Report sick day

**Pay & Benefits:**
- View paystubs
- Download W-2
- Update direct deposit
- Enroll in benefits (during open enrollment)

**Documents:**
- Download offer letter
- Sign policy documents
- Upload certifications

### Key UI Pattern: Profile Editing

```
Personal Information

Name: Jane Smith
       [Edit] button reveals inline form

Email: jane.smith@company.com
       [Cannot edit] (locked by admin)

Phone: (555) 123-4567
       [Edit]

Address:
  123 Main St
  San Francisco, CA 94103
  [Edit]
```

**Inline Edit Pattern:**
```
Phone: ✏️ Editing...

  [+1] [(555) 123-4567]

  [Cancel] [Save]
```

### Prototype Considerations
- Inline editing > separate edit page
- Show which fields are admin-locked (cannot edit)
- Validate in real-time (phone format, zip code, etc.)
- Confirm before saving sensitive changes (email, bank account)
- Show last updated timestamp

---

## Data Import

### Scenario
Admin imports bulk data (employees, departments, etc.) via CSV.

### User: Admin

### Typical Flow

```
1. Admin downloads CSV template
   ↓
2. Admin fills out data in Excel/Sheets
   ↓
3. Admin uploads CSV file
   ↓
4. System validates data:
   - Required fields present?
   - Valid formats?
   - Duplicate emails?
   - Foreign keys exist?
   ↓
5. System shows preview with errors highlighted
   ↓
6. Admin fixes errors, re-uploads
   ↓
7. Admin confirms import
   ↓
8. System processes import (with progress indicator)
   ↓
9. System shows summary:
   - X records created
   - Y records updated
   - Z errors
```

### Key UI Components

**Upload Screen:**
```
Import Employees

Step 1: Download Template
[📥 Download CSV Template]

Step 2: Upload File
[📤 Choose File] or drag and drop

Supported formats: CSV, XLSX
Max file size: 10 MB
```

**Validation Results:**
```
Import Preview

✅ 45 valid records
⚠️ 3 records with warnings
❌ 2 records with errors

❌ Row 5: Email already exists (john@company.com)
⚠️ Row 12: Department "Sales" not found (will create new)
❌ Row 23: Invalid start date format (use YYYY-MM-DD)

[Fix Errors] [Cancel] [Import Valid Records Only]
```

**Progress:**
```
Importing Employees...

████████████░░░░░░░░ 60% (27/45)

Currently processing: Jane Smith

[Cancel Import]
```

### Prototype Considerations
- Provide templates (users don't guess format)
- Validate before importing (don't fail halfway through)
- Show detailed error messages with row numbers
- Allow partial import (skip errors, import valid)
- Show progress for large imports
- Provide download of error report (CSV with issues highlighted)

---

## Settings Configuration

### Scenario
Admin configures company-wide or module-specific settings.

### User: Admin

### Common Setting Patterns

**Toggle Settings:**
```
Notifications

✅ Email notifications for approvals
☐ Slack notifications for approvals
✅ Weekly team digest
```

**Dropdown Settings:**
```
Time Off

Default Approval Chain:
[Manager → Department Admin ▼]

Options:
  - Manager only
  - Manager → Department Admin
  - Manager → Senior Manager → HR
  - Custom workflow
```

**Threshold Settings:**
```
Expense Approvals

Manager approval limit:
[$2,000.00]

Auto-approve expenses under:
[$50.00]
```

### Settings Organization

**Left Nav:**
```
Settings
├── Company
│   ├── General
│   ├── Locations
│   └── Departments
├── Time Off
│   ├── Policies
│   ├── Holidays
│   └── Approval Workflow
├── Payroll
│   ├── Pay Periods
│   ├── Tax Settings
│   └── Direct Deposit
└── Integrations
    ├── Slack
    ├── Google Workspace
    └── GitHub
```

### Prototype Considerations
- Group related settings logically
- Show what's required vs optional
- Indicate when changes take effect (immediate vs next pay period)
- Warn before destructive changes
- Provide defaults (don't make admins guess)
- Enable search across settings

---

## Related Documentation

- **[User Roles](./user-roles.md)** - Who can perform these actions
- **[Data Models](./data-models.md)** - What data is involved
- **[Building Blocks](../building-blocks/)** - How to implement these UIs
- **[Patterns](../patterns/)** - UX patterns for common interactions

---

## Next Steps

1. **Add more use cases** (Performance reviews, Benefits enrollment, etc.)
2. **Add user flows** with detailed step-by-step screens
3. **Include edge cases** (What if manager is on vacation?)
4. **Add screenshots** from existing features as examples
5. **Get user research validation** for common pain points

---

**Status:** 🟡 Partial - Core use cases documented, needs expansion  
**Last Updated:** November 3, 2025  
**Owner:** [Your team name]


