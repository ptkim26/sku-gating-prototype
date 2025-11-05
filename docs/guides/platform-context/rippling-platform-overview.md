# Rippling Platform Overview

**Understanding Rippling as a unified platform**

---

## What is Rippling?

Rippling is a **unified workforce platform** that combines HR, IT, and Finance into a single system. Unlike point solutions, Rippling manages employee data once and propagates it across all connected systems.

---

## Core Platform Concept

### The Rippling Difference

**Traditional Approach (Point Solutions):**
```
HR System (BambooHR)
  ↓ (manual export/import)
Payroll System (Gusto)
  ↓ (manual export/import)
IT System (Okta)
  ↓ (manual export/import)
Finance System (Expensify)
```
❌ Data entered multiple times  
❌ Manual syncing between systems  
❌ Data inconsistencies  
❌ Delayed updates

**Rippling Approach (Unified Platform):**
```
┌─────────────────────────────────┐
│   Employee Data (Single Source) │
└────────┬────────────────────────┘
         │
    ┌────┼────┬─────┬──────────┐
    │    │    │     │          │
   HR  Payroll IT  Finance  Benefits
```
✅ Single source of truth  
✅ Automatic propagation  
✅ Real-time updates  
✅ No data inconsistencies

### Example: New Employee Onboarding

```
HR creates employee in Rippling
         │
         ├─→ Auto-provisions email (@company.com)
         ├─→ Auto-creates Slack account
         ├─→ Auto-orders laptop
         ├─→ Auto-enrolls in payroll
         ├─→ Auto-adds to company directory
         ├─→ Auto-assigns manager
         └─→ Auto-invites to team channels
```

**Key Insight:** Data flows automatically. You don't "integrate" systems—they're all part of one platform.

---

## Platform Architecture

### Modules

Rippling is organized into product modules:

```
Rippling Platform
│
├── HR
│   ├── Core HRIS
│   ├── Time & Attendance
│   ├── Performance Management
│   └── Recruiting
│
├── Payroll
│   ├── US Payroll
│   ├── Global Payroll
│   ├── Tax Filing
│   └── Benefits Administration
│
├── IT
│   ├── Device Management (MDM)
│   ├── App Management (SSO)
│   ├── Access Control
│   └── IT Helpdesk
│
├── Finance
│   ├── Expense Management
│   ├── Corporate Cards
│   ├── Bill Pay
│   └── Spend Management
│
└── Learning
    ├── Training Courses
    ├── Compliance Training
    └── Certifications
```

### Apps vs Modules

**Module:** First-party Rippling product (e.g., "Rippling Payroll")
**App:** Third-party integration (e.g., "Slack", "GitHub", "Zoom")

**Apps are managed by Rippling:**
- Rippling creates/deletes accounts
- Rippling syncs user data
- Rippling manages permissions
- Rippling handles SSO

---

## Key Platform Concepts

### 1. Employee as the Core Entity

**Everything revolves around the Employee:**

```
Employee Record
  │
  ├─→ Has email address → Creates email account
  ├─→ Has job title → Grants app permissions
  ├─→ Has manager → Sets up approval chains
  ├─→ Has department → Scopes data access
  ├─→ Has start date → Triggers onboarding
  └─→ Has compensation → Enrolls in payroll
```

**Design Implication:** Most features involve displaying/editing employee data.

### 2. Unified Permissions

**Single permission system across all modules:**

- Manager in HR → Also manager in IT, Payroll, etc.
- Department Admin in Finance → Same scope in HR
- Role-based access control (RBAC) is platform-wide

**Design Implication:** Permission checks are consistent. If user can view employee in HR, they can view in IT.

### 3. Workflows Across Modules

**Workflows cross module boundaries:**

**Example: Manager Approves Time Off**
```
1. Employee requests time off (HR module)
   ↓
2. Manager approves (HR module)
   ↓
3. Time off added to calendar (IT module - Google Calendar sync)
   ↓
4. Out-of-office enabled (IT module - Email auto-reply)
   ↓
5. Hours deducted from PTO balance (Payroll module)
```

**Design Implication:** Actions in one module affect others. Show cross-module impacts.

### 4. Company as Tenant

**Multi-tenancy model:**

- Each company is a separate tenant
- Data is completely isolated between companies
- Some admins manage multiple companies (MSP model)

**Design Implication:** Always scope queries to current company. Support "Switch Company" for multi-company admins.

---

## Platform-Wide UX Patterns

### 1. Global Navigation

**Consistent top nav across all modules:**

```
┌──────────────────────────────────────────────────────┐
│ Rippling [🔍 Search]      [🔔] [👤 User Menu]        │
├──────────────────────────────────────────────────────┤
│ [HR] [Payroll] [IT] [Finance] [Learning]             │
└──────────────────────────────────────────────────────┘
```

**Implications:**
- Users expect to switch modules from top nav
- Current module should be clearly indicated
- Search works across all modules

### 2. Employee Profile

**Central profile page accessible from anywhere:**

```
[Any Page] → Click employee name → Profile overlay/page
```

**Profile shows unified view:**
- Personal info (HR)
- Devices & apps (IT)
- Pay & benefits (Payroll)
- Expenses (Finance)

### 3. Dashboard Pattern

**Each module has a dashboard:**
- Overview metrics
- Pending actions
- Quick links
- Recent activity

**See:** [Building Blocks - Dashboards](../building-blocks/dashboards.md)

### 4. Settings Organization

**Settings are organized by module:**

```
Settings
├── Company (platform-wide)
├── HR (module-specific)
├── Payroll (module-specific)
├── IT (module-specific)
└── Finance (module-specific)
```

---

## Data Flow Example

### Scenario: Employee Gets Promoted

```
Admin updates job title in HR
         │
         ├─→ New title appears in directory (immediate)
         ├─→ Email signature updates (IT module)
         ├─→ App permissions adjust (IT module)
         │   └─ If "Manager" title → Gains manager permissions
         ├─→ Compensation updated (Payroll module)
         │   └─ Next paycheck reflects new salary
         └─→ Performance goals updated (HR module)
             └─ New expectations for role
```

**Design Implication:** Show ripple effects. "Changing this will also update..."

---

## Integration Architecture

### How Rippling Manages Apps

**Example: Slack Integration**

```
1. Admin enables Slack app in Rippling
   ↓
2. Rippling connects to Slack API
   ↓
3. For each employee:
   │
   ├─ Create Slack account (if doesn't exist)
   ├─ Set display name from Rippling employee record
   ├─ Add to channels based on department
   ├─ Set profile fields (title, phone, manager)
   └─ Enable/disable based on employment status
   ↓
4. Employee data syncs automatically:
   - Name change in Rippling → Updates Slack
   - Employee terminated → Slack account deactivated
   - New employee → Slack account auto-created
```

**Design Implication:** Apps are not "integrations" to manually sync—they're extensions of Rippling.

---

## Platform Constraints

### What Designers Should Know

**1. Data Relationships Are Strict**
- Can't delete department if employees assigned to it
- Can't remove manager if they have direct reports
- Cascade effects must be handled

**2. Permissions Are Inherited**
- Manager sees all data of direct reports
- Department admin sees all data in department
- Can't grant selective access (e.g., "see name but not salary")

**3. Audit Trail Required**
- All changes are logged (who, what, when)
- Some data cannot be deleted (compliance)
- Terminations are soft deletes (status: TERMINATED)

**4. Multi-Company Complexity**
- Some features don't cross company boundaries
- Some admins manage multiple companies
- Data isolation is critical (no cross-company data leaks)

---

## Platform Glossary

| Term | Definition |
|------|------------|
| **Employee** | A person employed by the company (core entity) |
| **Module** | A first-party Rippling product (HR, Payroll, IT, Finance) |
| **App** | A third-party integration managed by Rippling (Slack, GitHub) |
| **Tenant** | A company using Rippling (multi-tenant SaaS) |
| **Admin** | User with elevated permissions to configure/manage Rippling |
| **Direct Report** | Employee who reports to a manager |
| **Department** | Organizational unit within a company |
| **Workflow** | Automated process triggered by events (e.g., onboarding) |
| **Permission** | Access control rule (who can see/do what) |

---

## Design Principles

### 1. Single Source of Truth
Don't ask for data that Rippling already has.

❌ "Enter employee name"
✅ "Select employee: [Dropdown populated from Rippling]"

### 2. Automatic Propagation
Changes should flow automatically, not require "sync" buttons.

❌ "Click to sync with Slack"
✅ "Syncs automatically when employee data changes"

### 3. Show Cross-Module Impact
Make it clear when actions affect other modules.

✅ "Terminating this employee will also:
    - Deactivate Slack account (IT)
    - Process final paycheck (Payroll)
    - Revoke app access (IT)"

### 4. Unified Experience
Modules should feel like one product, not separate tools.

✅ Consistent navigation, design patterns, terminology

---

## For AI Prototyping

When prototyping Rippling features, remember:

**✅ Do:**
- Reference existing employee data (don't make users re-enter)
- Consider cross-module effects
- Follow platform-wide patterns (navigation, dashboards, etc.)
- Respect permission model

**❌ Don't:**
- Create standalone features that ignore platform context
- Design manual sync flows (data syncs automatically)
- Invent new navigation patterns (use platform standards)
- Forget multi-tenancy (always scope to company)

---

## Related Documentation

- **[User Roles](./user-roles.md)** - Platform permission model
- **[Data Models](./data-models.md)** - Core platform entities
- **[Common Use Cases](./common-use-cases.md)** - Cross-module workflows
- **[Building Blocks](../building-blocks/)** - Platform-specific UI patterns

---

## Next Steps

1. **Expand module descriptions** with key features
2. **Document platform APIs** (if helpful for prototyping)
3. **Add architecture diagrams** showing data flow
4. **Include screenshots** of platform-wide patterns
5. **Get product/eng validation** for technical accuracy

---

**Status:** 🟡 Partial - Overview complete, needs expansion  
**Last Updated:** November 3, 2025  
**Owner:** [Your team name]


