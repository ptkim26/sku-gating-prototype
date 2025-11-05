# User Roles & Permissions

**Who can do what in Rippling**

---

## Overview

Rippling has a complex role-based access control (RBAC) system. Understanding these roles is critical for prototyping features that respect permissions and show appropriate UI for each user type.

---

## Role Hierarchy

```
Super Admin
  ├── Company Admin
  │     ├── Department Admin
  │     └── IT Admin
  ├── Manager
  │     └── Team Lead
  └── Employee (Base)
```

---

## Core Roles

### 1. Super Admin

**Description:** Full platform access, typically company founders or C-level executives

**Permissions:**
- ✅ Access to all modules and features
- ✅ Manage all users and permissions
- ✅ Configure company-wide settings
- ✅ View all data across organization
- ✅ Override any approval workflow
- ✅ Access billing and subscription settings

**Common Use Cases:**
- Initial company setup
- Adding/removing admins
- Configuring integrations
- Troubleshooting access issues

**Prototype Considerations:**
- Super Admin sees "everything" - don't hide features
- Show clear indicators when acting as Super Admin (potential data access warning)
- Provide "View as..." functionality to test other roles

---

### 2. Company Admin

**Description:** [TO BE DOCUMENTED]

**Permissions:**
- ✅ [Permission 1]
- ✅ [Permission 2]
- ❌ Cannot access [restricted action]

**Common Use Cases:**
- [Use case 1]
- [Use case 2]

**Prototype Considerations:**
- [Design consideration]

---

### 3. Manager

**Description:** Supervises a team, manages direct reports

**Permissions:**
- ✅ View direct reports' profiles and data
- ✅ Approve time off requests (typically up to X days)
- ✅ View team performance metrics
- ✅ Submit performance reviews for direct reports
- ❌ Cannot access other teams' data (unless explicitly granted)
- ❌ Cannot modify company-wide settings
- ❌ Cannot access payroll details (unless also Payroll Admin)

**Common Use Cases:**
- Reviewing and approving time off
- Viewing team dashboard
- Managing team members' information
- Performance review cycles

**Prototype Considerations:**
- Default views should be scoped to direct reports only
- Show approval limits (e.g., "Can approve up to 10 days")
- Clearly indicate when action requires escalation to higher admin

**Example UI Patterns:**
```
Time Off Request Card:
  - If ≤10 days → Show [Approve] [Deny] buttons
  - If >10 days → Show "Requires Senior Manager Approval" badge
                  → [Forward to Senior Manager] button
```

---

### 4. Employee (Base Role)

**Description:** Standard employee with self-service capabilities

**Permissions:**
- ✅ View and edit own profile
- ✅ Submit time off requests
- ✅ View own pay stubs
- ✅ Update personal information (address, phone, etc.)
- ✅ Access company directory
- ❌ Cannot view others' sensitive data
- ❌ Cannot approve requests
- ❌ Cannot access admin settings

**Common Use Cases:**
- Requesting time off
- Updating personal details
- Viewing paystubs
- Accessing benefits info

**Prototype Considerations:**
- Self-service focused UI
- Clear CTAs for common actions (Request Time Off, Update Profile)
- Show approval status for pending requests
- Limited navigation - only employee-facing modules

---

### 5. IT Admin

**Description:** [TO BE DOCUMENTED]

**Permissions:**
- [TO BE DOCUMENTED]

---

### 6. Payroll Admin

**Description:** [TO BE DOCUMENTED]

**Permissions:**
- [TO BE DOCUMENTED]

---

## Permission Patterns

### Viewing Data

| Role | Own Data | Direct Reports | Department | Company-Wide |
|------|----------|----------------|------------|--------------|
| Employee | ✅ Full | ❌ | ❌ | 🔍 Directory only |
| Manager | ✅ Full | ✅ Full | 🟡 Limited | 🔍 Directory only |
| Dept Admin | ✅ Full | ✅ Full | ✅ Full | 🟡 Limited |
| Company Admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Super Admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full + Settings |

**Legend:**
- ✅ Full access
- 🟡 Limited/read-only
- 🔍 Basic info only (name, title, contact)
- ❌ No access

---

## Approval Workflows

### Time Off Approval Chain

```
Employee requests time off
  ↓
Manager reviews (if ≤ N days)
  ↓ (if > N days OR manager denies)
Senior Manager / Department Admin
  ↓ (if exceptional case)
Company Admin / Super Admin
```

**Role-Specific Limits:**
- Manager: Up to [X] days
- Senior Manager: Up to [Y] days
- Department Admin: Unlimited within department
- Company Admin: Unlimited

---

## Module-Specific Roles

### Payroll

| Role | View Payroll | Run Payroll | Edit Tax Settings |
|------|--------------|-------------|-------------------|
| Employee | Own only | ❌ | ❌ |
| Manager | Direct reports summary | ❌ | ❌ |
| Payroll Admin | All | ✅ | ✅ |
| Super Admin | All | ✅ | ✅ |

### Benefits

[TO BE DOCUMENTED]

### Time & Attendance

[TO BE DOCUMENTED]

---

## Custom Roles

Rippling supports custom roles with granular permissions:

**Examples:**
- "Benefits Administrator" - Can manage benefits enrollment but not payroll
- "Recruiting Coordinator" - Can post jobs and review candidates but not extend offers
- "IT Support" - Can reset passwords and manage devices but not access employee data

**Custom Permission Groups:**
- [TO BE DOCUMENTED]

---

## Role Assignment UI Patterns

### How Users Are Assigned Roles

1. **Automatic:** Based on organizational structure (e.g., anyone with direct reports becomes a Manager)
2. **Manual:** Admins explicitly assign roles
3. **Hybrid:** Automatic base role + manual additional permissions

### Showing Role Context in UI

**Examples:**

**Profile Badge:**
```
John Smith
Manager • IT Department
```

**Permission Indicator:**
```
⚠️ Admin Action - This change affects all employees
```

**Insufficient Permissions:**
```
🔒 You don't have permission to approve this request.
   Contact your manager or admin for help.
   
   [Request Access]
```

---

## Prototype Testing Checklist

When prototyping a feature, test with these personas:

- [ ] **Employee** - Can they complete self-service tasks?
- [ ] **Manager** - Can they manage their team effectively?
- [ ] **Department Admin** - Does department scope work correctly?
- [ ] **Company Admin** - Can they configure company-wide settings?
- [ ] **Super Admin** - Full access confirmed?
- [ ] **Restricted role** - Are permissions properly enforced?

---

## Edge Cases to Consider

### Multi-Role Users
- User can be both Manager AND IT Admin
- Show combined permissions, not just one role
- Allow "Switch context" if roles conflict

### Acting On Behalf Of
- Admins can sometimes act as another user
- Must be clearly indicated in UI
- Log all "acting as" actions for audit

### Temporary Permission Delegation
- Manager on vacation → delegate approval to peer
- Time-limited, clearly expires
- Show delegated permission source

---

## Related Documentation

- **[Common Use Cases](./common-use-cases.md)** - Role-based workflows
- **[Data Models](./data-models.md)** - Permission relationships in data
- **[Building Blocks](../building-blocks/)** - Role-aware component patterns

---

## Next Steps

1. **Document remaining roles** (IT Admin, Payroll Admin, etc.)
2. **Add module-specific permissions** (Benefits, Time & Attendance)
3. **Document custom roles** and permission groups
4. **Add real examples** from existing Rippling features
5. **Get product/eng validation** for accuracy

---

**Status:** 🟡 Partial - Core roles documented, needs expansion  
**Last Updated:** November 3, 2025  
**Owner:** [Your team name]


