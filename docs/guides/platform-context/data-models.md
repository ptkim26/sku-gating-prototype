# Data Models

**Core entities and their relationships in Rippling**

---

## Overview

Understanding Rippling's data models helps prototype features that accurately reflect the platform's structure. This document defines core entities, their fields, and relationships.

---

## Entity Relationship Diagram

```
Company
  │
  ├─── Department (many)
  │      │
  │      └─── Employee (many)
  │             │
  │             ├─── Time Off Request (many)
  │             ├─── Performance Review (many)
  │             └─── Direct Reports (many)
  │
  ├─── Location (many)
  ├─── Job Title (many)
  └─── Pay Period (many)
```

---

## Core Entities

### Employee

**Description:** The central entity in Rippling, representing a person employed by the company

**Key Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | ✅ | Unique identifier |
| `firstName` | String | ✅ | Legal first name |
| `lastName` | String | ✅ | Legal last name |
| `preferredName` | String | ❌ | Display name if different |
| `email` | Email | ✅ | Company email address |
| `personalEmail` | Email | ❌ | Personal email |
| `employeeId` | String | ❌ | Company employee number |
| `startDate` | Date | ✅ | Employment start date |
| `endDate` | Date | ❌ | Employment end date (if terminated) |
| `status` | Enum | ✅ | `ACTIVE` \| `INACTIVE` \| `TERMINATED` |
| `departmentId` | UUID | ❌ | Reference to Department |
| `managerId` | UUID | ❌ | Reference to Employee (manager) |
| `jobTitleId` | UUID | ❌ | Reference to Job Title |
| `locationId` | UUID | ❌ | Reference to Location |

**Relationships:**
- **Department:** Many-to-One (Employee → Department)
- **Manager:** Many-to-One (Employee → Employee)
- **Direct Reports:** One-to-Many (Manager → Employees)
- **Time Off Requests:** One-to-Many (Employee → Time Off Requests)

**Example JSON:**
```json
{
  "id": "emp_12345",
  "firstName": "Jane",
  "lastName": "Smith",
  "preferredName": "J",
  "email": "jane.smith@company.com",
  "employeeId": "EMP-001",
  "startDate": "2024-01-15",
  "status": "ACTIVE",
  "departmentId": "dept_engineering",
  "managerId": "emp_67890",
  "jobTitleId": "title_senior_eng",
  "locationId": "loc_sf"
}
```

**Prototype Considerations:**
- Always show `preferredName` if available, fall back to `firstName`
- Display `status` badge visually (green for ACTIVE, gray for INACTIVE)
- Manager relationship creates permission hierarchy
- Filter by `status: ACTIVE` in most lists by default

---

### Department

**Description:** Organizational units within a company

**Key Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | ✅ | Unique identifier |
| `name` | String | ✅ | Department name |
| `parentDepartmentId` | UUID | ❌ | Parent department (for nested structure) |
| `headOfDepartment` | UUID | ❌ | Reference to Employee (department leader) |
| `costCenter` | String | ❌ | Accounting cost center code |

**Relationships:**
- **Employees:** One-to-Many (Department → Employees)
- **Parent Department:** Many-to-One (supports nested departments)

**Example Hierarchy:**
```
Engineering (dept_engineering)
  ├── Frontend (dept_frontend)
  ├── Backend (dept_backend)
  └── Infrastructure (dept_infra)
```

**Prototype Considerations:**
- Departments can be nested (show breadcrumbs)
- Department admins have permissions scoped to department + children
- Some companies have shallow structure (3-5 depts), others have deep (20+ nested)

---

### Time Off Request

**Description:** Employee request for paid or unpaid time off

**Key Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | ✅ | Unique identifier |
| `employeeId` | UUID | ✅ | Reference to Employee |
| `type` | Enum | ✅ | `VACATION` \| `SICK` \| `PERSONAL` \| `UNPAID` |
| `startDate` | Date | ✅ | First day off |
| `endDate` | Date | ✅ | Last day off |
| `days` | Float | ✅ | Number of days (e.g., 5.0, 2.5 for half days) |
| `status` | Enum | ✅ | `PENDING` \| `APPROVED` \| `DENIED` \| `CANCELLED` |
| `reason` | Text | ❌ | Optional note from employee |
| `denialReason` | Text | ❌ | Required if status is DENIED |
| `approverId` | UUID | ❌ | Reference to Employee who approved/denied |
| `approvedAt` | DateTime | ❌ | Timestamp of approval/denial |
| `createdAt` | DateTime | ✅ | When request was submitted |

**Relationships:**
- **Employee:** Many-to-One (Time Off Request → Employee)
- **Approver:** Many-to-One (Time Off Request → Employee)

**Business Rules:**
- Cannot request past dates
- `startDate` must be ≤ `endDate`
- `days` auto-calculated excluding weekends/holidays
- Manager approval required for `status` change from `PENDING`
- Denial requires `denialReason`

**Prototype Considerations:**
- Show status badge prominently (color-coded)
- Display approval chain if multi-level
- Show balance remaining after request (if approved)
- Enable quick approve/deny from list view for managers

---

### Job Title

**Description:** [TO BE DOCUMENTED]

**Key Fields:**
- [TO BE DOCUMENTED]

---

### Location

**Description:** Physical office or work location

**Key Fields:**
- [TO BE DOCUMENTED]

---

### Performance Review

**Description:** [TO BE DOCUMENTED]

---

## Common Field Patterns

### Audit Fields

Most entities include these standard fields:

| Field | Type | Description |
|-------|------|-------------|
| `createdAt` | DateTime | When record was created |
| `updatedAt` | DateTime | Last modification timestamp |
| `createdBy` | UUID | User who created record |
| `updatedBy` | UUID | User who last modified |

### Status Enums

Many entities use status enums for workflow:

**Common Pattern:**
```
DRAFT → PENDING → APPROVED/DENIED → COMPLETED/CANCELLED
```

**Examples:**
- Time Off: `PENDING → APPROVED → (auto-transitions to COMPLETED after end date)`
- Performance Review: `DRAFT → IN_PROGRESS → COMPLETED`
- Onboarding: `NOT_STARTED → IN_PROGRESS → COMPLETED`

---

## Data Validation Rules

### Employee

- Email must be unique across company
- `startDate` cannot be in the future (more than X days)
- `managerId` cannot create circular reporting (A reports to B, B reports to A)
- `preferredName` max length: [X] characters

### Time Off Request

- `startDate` must be ≥ today
- `endDate` must be ≥ `startDate`
- `days` must be > 0
- Cannot overlap with existing approved time off for same employee

---

## Computed Fields

Some fields are calculated, not stored:

### Employee
- `fullName` = `${firstName} ${lastName}`
- `displayName` = `preferredName || firstName`
- `tenure` = `today - startDate` (in years/months)
- `directReportsCount` = count of employees where `managerId === this.id`

### Time Off Request
- `isPending` = `status === 'PENDING'`
- `isApproved` = `status === 'APPROVED'`
- `canCancel` = `isPending || (isApproved && startDate > today)`

---

## Relationships & Permissions

### Manager-Employee Relationship

```typescript
// Manager can view/edit direct reports
if (currentUser.id === employee.managerId) {
  // Grant read/write access to employee data
  // Enable time off approval
  // Show in "My Team" views
}
```

### Department Hierarchy

```typescript
// Department Admin can access department + children
const allowedDepartments = [
  currentDepartment.id,
  ...getChildDepartments(currentDepartment.id)
];

const accessibleEmployees = employees.filter(emp => 
  allowedDepartments.includes(emp.departmentId)
);
```

---

## Data Display Guidelines

### Employee Names

**Always:**
```typescript
// Use preferredName if available
const displayName = employee.preferredName || employee.firstName;
```

**Profile Header:**
```
Jane "J" Smith
Senior Software Engineer • Engineering
```

**List View:**
```
J Smith
```

### Dates

**Relative for recent:**
```
Created 2 hours ago
Updated yesterday
```

**Absolute for older:**
```
Start Date: Jan 15, 2024
```

### Status Badges

**Use semantic colors:**
- 🟢 `ACTIVE`, `APPROVED`, `COMPLETED` → Success green
- 🟡 `PENDING`, `IN_PROGRESS` → Warning yellow
- 🔴 `DENIED`, `TERMINATED`, `CANCELLED` → Error red
- ⚪ `INACTIVE`, `DRAFT` → Neutral gray

---

## Empty States

### No Direct Reports
```
👥 No Direct Reports

You don't manage any team members yet.
When employees are assigned to you, they'll appear here.
```

### No Time Off Requests
```
🏖️ No Time Off Requests

Your team hasn't requested any time off.
Approved requests will appear here.
```

---

## Error Messages

### Validation Errors

**Be specific:**
❌ "Invalid date"
✅ "Start date must be today or later"

**Suggest fixes:**
❌ "Email already exists"
✅ "Email jane@company.com is already in use. Try jane.smith@company.com"

---

## Related Documentation

- **[User Roles](./user-roles.md)** - Permission-based data access
- **[Common Use Cases](./common-use-cases.md)** - How data flows through workflows
- **[Components](../components/)** - How to display data entities

---

## Next Steps

1. **Document remaining entities** (Job Title, Location, Performance Review)
2. **Add complete field lists** for all entities
3. **Document API endpoints** (if helpful for prototyping)
4. **Add validation rules** for each field
5. **Include real examples** from production data (anonymized)

---

**Status:** 🟡 Partial - Core entities started, needs expansion  
**Last Updated:** November 3, 2025  
**Owner:** [Your team name]


