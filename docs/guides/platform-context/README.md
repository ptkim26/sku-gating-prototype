# Platform Context

**Understanding Rippling as a platform, not just a product**

## What is Platform Context?

Platform context documents the **business logic, data models, user roles, and product conventions** that are unique to Rippling. This information helps designers and AI assistants understand how Rippling works holistically, enabling better prototyping decisions.

---

## Why This Matters for Prototyping

When you prototype with **just components**, you get generic UIs that don't reflect Rippling's reality:

❌ Generic "Employee List" → No understanding of permissions  
❌ Generic "Form" → No knowledge of required fields  
❌ Generic "Dashboard" → Doesn't reflect actual user roles

When you prototype with **platform context**, you get realistic Rippling features:

✅ "Manager Dashboard" → Knows manager vs admin permissions  
✅ "Employee Onboarding" → Understands required fields and validation  
✅ "Time Off Request" → Reflects approval workflows and business rules

---

## Documentation in This Folder

### 🏗️ [Platform Overview](./rippling-platform-overview.md)
**What:** High-level architecture and key concepts  
**When to use:** Understanding how Rippling products fit together  
**Example questions:**
- "What are the main Rippling modules?"
- "How do products share data?"
- "What's the difference between an app and a module?"

### 👥 [User Roles](./user-roles.md)
**What:** Common user types and their permissions  
**When to use:** Prototyping role-based features  
**Example questions:**
- "What can a manager see vs an employee?"
- "What's the difference between Super Admin and IT Admin?"
- "Who can approve time off requests?"

### 📊 [Data Models](./data-models.md)
**What:** Core entities and their relationships  
**When to use:** Designing data-heavy features  
**Example questions:**
- "What fields does an Employee have?"
- "How are departments structured?"
- "What's the relationship between time off and pay periods?"

### 🎯 [Common Use Cases](./common-use-cases.md)
**What:** Frequently implemented scenarios across Rippling  
**When to use:** Starting a new feature prototype  
**Example questions:**
- "How does employee onboarding work?"
- "What's a typical approval workflow?"
- "How do managers view their team?"

---

## Platform Context vs. Building Blocks vs. Patterns

```
Platform Context           Building Blocks           Patterns
(Business Logic)          (Platform Features)       (UX Solutions)

"Manager role can         "Dashboards use          "Show success
approve time off"         responsive grid"         with snackbar"

↓                         ↓                        ↓

INFORMS                   USES                     IMPLEMENTS

User roles guide   →   Dashboard layout uses  →   Snackbar shows
what features               grid system               confirmation
to build
```

### Example: Manager Time-Off Dashboard

**Platform Context:**
- Managers can view direct reports
- Managers can approve/deny up to 10 days
- Senior managers can approve unlimited
- Requires reason for denial

**Building Blocks:**
- Dashboard grid layout
- Responsive breakpoints
- Card-based display

**Patterns:**
- Approval confirmation modal
- Success snackbar feedback
- Empty state when no pending requests

**Components:**
- Button, Card, Modal, Snackbar

---

## For AI Prototyping

When working with AI to prototype Rippling features:

### Without Platform Context
```
Prompt: "Create a dashboard for managers"

AI creates:
❌ Generic dashboard with random cards
❌ No understanding of what managers need
❌ Missing permission checks
❌ Doesn't reflect Rippling conventions
```

### With Platform Context
```
Prompt: "Create a dashboard for managers"

AI references:
✅ user-roles.md (Manager permissions)
✅ common-use-cases.md (Manager workflows)
✅ data-models.md (Direct reports structure)

AI creates:
✅ Dashboard with team performance cards
✅ Time off approval pending count
✅ Team directory with direct reports
✅ Permission-aware actions
```

---

## How to Fill These Out

### Priority Order

1. **User Roles** - Start here, most immediately useful
2. **Common Use Cases** - High impact for prototyping
3. **Data Models** - Technical foundation
4. **Platform Overview** - Big picture context

### Sources

- **Product docs** - Internal Rippling documentation
- **Engineering specs** - API documentation, data schemas
- **Design reviews** - Common patterns from existing features
- **User research** - How customers actually use Rippling

### Keep It AI-Friendly

✅ **Use tables and lists** - Easy to parse  
✅ **Be specific** - "Manager can approve up to 10 days" not "Managers have approval rights"  
✅ **Include examples** - Show actual scenarios  
✅ **Link to related docs** - Cross-reference building blocks and patterns  
❌ **Avoid jargon** - Or define it clearly  
❌ **Don't duplicate** - Link to existing docs instead

---

## Status

| Document | Status | Priority |
|----------|--------|----------|
| Platform Overview | 📝 Template created | Medium |
| User Roles | 📝 Template created | **High** |
| Data Models | 📝 Template created | Medium |
| Common Use Cases | 📝 Template created | **High** |

**Next Steps:**
1. Fill out User Roles (highest impact for prototyping)
2. Document 5-10 common use cases
3. Add core data models (Employee, Department, Time Off, etc.)
4. Expand platform overview

---

## Contributing

These docs are **internal knowledge** that needs to be documented manually:

1. **Start with templates** - Use the boilerplate structure provided
2. **Add incrementally** - Don't try to document everything at once
3. **Real examples** - Reference actual Rippling features
4. **Keep updated** - Platform changes over time
5. **Get review** - Have product/eng validate for accuracy

---

## Related Documentation

- **[Building Blocks](../building-blocks/)** - Platform-specific UX patterns
- **[Patterns](../patterns/)** - Generic UX solutions
- **[Components](../components/)** - Pebble primitives
- **[Design Guidelines](../README.md)** - Full documentation structure

---

**Last Updated:** November 3, 2025  
**Maintained by:** Design Systems + Product Teams  
**Source:** Internal Rippling knowledge (not synced from Confluence)


