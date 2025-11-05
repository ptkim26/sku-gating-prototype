# Pebble Design Guidelines

**Complete reference for AI-powered prototyping with Rippling's design system**

This documentation is optimized for AI assistants to help designers and developers prototype Rippling features quickly and correctly using Pebble components.

---

## 📁 Documentation Structure

```
guides/
├── components/        ← "What props does X accept?"
├── patterns/          ← "How do I solve X?"
├── building-blocks/   ← "How do I build Y in Rippling?"
├── platform-context/  ← "How does Rippling work?"
├── tokens/            ← "What colors/spacing/typography should I use?"
└── assets/            ← Images from Confluence
```

### Four Levels of Documentation

```
PRIMITIVE ←────────────────────────────────────────────────→ CONTEXT

Components      Patterns         Building Blocks    Platform Context
(Primitives)    (Problems)       (Features)         (Business Logic)

"Button"        "Show feedback"  "Build dashboard"  "Manager role"
"Modal"         "Validate form"  "Responsive"       "Approval workflow"
"Input"         "Confirm action" "Automator"        "Employee data model"
```

---

## 🧩 Components

**Question:** "What props does X accept? How do I use this component?"

📍 **Location:** [`components/`](./components/)

### What's Here
- Individual Pebble component documentation
- Component API reference (props, variants, sizes)
- When to use / when not to use
- Accessibility requirements
- Code examples
- Visual examples and Figma links

### Examples
- [`button.md`](./components/buttons/button.md) - Button props, appearances, sizes
- [`modal.md`](./components/modal.md) - Modal variants and best practices
- [`drawer.md`](./components/drawer.md) - Drawer usage and configuration

### When to Use
✅ Learning a new component  
✅ Looking up component props/API  
✅ Understanding component variants  
✅ Finding component examples

---

## 🧭 Patterns

**Question:** "How do I solve X?"

📍 **Location:** [`patterns/`](./patterns/)

### What's Here
- Generic UX problem-solving approaches
- Guided defaults for common scenarios
- Decision trees for choosing components
- Accessibility checklists
- Could theoretically apply outside Rippling

### Examples
- **Snackbar Feedback** - "How do I show success/error messages?"
- **Form Validation** - "How do I validate form input?"
- **Blocking Confirmation** - "How do I confirm destructive actions?"

### When to Use
✅ Solving a specific interaction problem  
✅ Choosing between component options  
✅ Implementing a common UX pattern  
✅ Ensuring accessibility compliance

### Pattern Types
1. **Feedback patterns** - Snackbars, notices, modals
2. **Form patterns** - Validation, multi-step flows
3. **Navigation patterns** - Tabs, breadcrumbs, drawers
4. **Data patterns** - Empty states, loading states, errors

**[→ Full Patterns Guide](./patterns/README.md)**

---

## 🏗️ Building Blocks

**Question:** "How do I build Y in Rippling?"

📍 **Location:** [`building-blocks/`](./building-blocks/)

### What's Here
- Rippling-specific composite UX modules
- Platform conventions and constraints
- Feature-level guidance
- Combines multiple components + business logic
- Complete systems, not just individual interactions

### Examples
- **Responsive Strategy** - "What are our breakpoints? How do we handle mobile?"
- **Dashboards** - "How do I build a dashboard in Rippling?"
- **Workflow Automator** - "How does the workflow builder work?"

### When to Use
✅ Prototyping a new Rippling feature  
✅ Understanding platform constraints  
✅ Building composite experiences  
✅ Implementing known Rippling patterns  
✅ Need business logic context

### Building Block Types
1. **Layout systems** - Responsive strategy, grid patterns
2. **Complex features** - Dashboards, workflow automator
3. **Platform conventions** - Navigation shells, data display

**[→ Full Building Blocks Guide](./building-blocks/README.md)**

---

## 🧠 Platform Context

**Question:** "How does Rippling work?"

📍 **Location:** [`platform-context/`](./platform-context/)

### What's Here
- Business logic and product requirements
- Data models and relationships
- User roles and permissions
- Common workflows and use cases
- Platform architecture and concepts

### Examples
- **User Roles** - "What can a manager do vs an admin?"
- **Data Models** - "What fields does an Employee have?"
- **Common Use Cases** - "How does time-off approval work?"
- **Platform Overview** - "How is Rippling different from point solutions?"

### When to Use
✅ Understanding Rippling-specific business logic  
✅ Learning user roles and permissions  
✅ Designing features with realistic constraints  
✅ Prototyping with actual data structures  
✅ Understanding cross-module workflows

### Documentation Types
1. **Platform Overview** - High-level architecture, unified platform concept
2. **User Roles** - Manager, Admin, Employee permissions
3. **Data Models** - Employee, Department, TimeOffRequest entities
4. **Common Use Cases** - Onboarding, approvals, dashboards

**[→ Full Platform Context Guide](./platform-context/README.md)**

---

## 🎯 Quick Decision Guide

### "I need to..."

| Task | Use | Location |
|------|-----|----------|
| Learn Button props | **Components** | `components/buttons/button.md` |
| Show success message | **Patterns** | `patterns/3-snackbar-feedback/` |
| Build a dashboard | **Building Blocks** | `building-blocks/dashboards.md` |
| Understand manager permissions | **Platform Context** | `platform-context/user-roles.md` |
| Validate form input | **Patterns** | `patterns/2-validation/` |
| Learn Employee data model | **Platform Context** | `platform-context/data-models.md` |
| Understand responsive breakpoints | **Building Blocks** | `building-blocks/responsive-strategy.md` |
| Design time-off approval flow | **Platform Context** | `platform-context/common-use-cases.md` |
| Use Modal component | **Components** | `components/modal.md` |
| Understand Rippling platform | **Platform Context** | `platform-context/rippling-platform-overview.md` |
| Confirm destructive action | **Patterns** | `patterns/1-blocking-confirmation/` |

---

## 🤖 For AI Assistants

### Prototyping Workflow

When helping a user prototype a Rippling feature:

1. **Understand the request**
   - Is it a component question? → `components/`
   - Is it a UX problem? → `patterns/`
   - Is it a feature? → `building-blocks/`

2. **Layer the context**
   ```
   Platform Context (business logic & data)
   ↓
   Building Block (feature scope)
   ↓
   Pattern (interaction)
   ↓
   Component (implementation)
   ```

3. **Example layering**
   ```
   User: "Create a manager dashboard to approve time off"
   
   → Platform Context: user-roles.md, common-use-cases.md, data-models.md
     (Manager permissions, approval workflow, TimeOffRequest data)
   
   → Building Block: dashboards.md
     (Grid layout, card types, responsive)
   
   → Pattern: snackbar-feedback
     (Show approval confirmation)
   
   → Components: button.md, cards.md, modal.md
     (Approve button, time off card, approval modal)
   ```

### Best Practices

✅ **Start broad, get specific** - Platform context → building blocks → patterns → components  
✅ **Understand business logic first** - Check platform-context before designing UIs  
✅ **Cross-reference** - Patterns reference components, building blocks reference patterns  
✅ **Follow Rippling conventions** - Don't invent patterns, use documented ones  
✅ **Check accessibility** - Every pattern includes a11y checklists  
✅ **Use real data models** - Reference actual entities from platform-context

---

## 📊 Documentation Coverage

**Current Status:**

| Category | Count | Status |
|----------|-------|--------|
| Components | 37 | ✅ Synced from Confluence |
| Patterns | 3/10 | 🟡 Phase 1 in progress |
| Building Blocks | 3 | ✅ Initial set synced |
| Platform Context | 4 | 🟡 Templates created, needs filling |
| **Tokens** | **358+** | **✅ Auto-generated from `@rippling/pebble-tokens`** |

**Token Breakdown:**
- 214 Color tokens
- 44 Typography tokens
- 100 Spacing/Sizing tokens

**Next Steps:**
- **Fill platform-context** - User roles, data models, use cases (HIGH PRIORITY)
- Complete remaining 7 patterns (Q1 2026)
- Add more building blocks (Settings pages, Approval flows)
- Keep tokens synced after `@rippling/pebble-tokens` updates

---

## 🔄 Keeping Documentation Fresh

This documentation stays in sync with Pebble using two automated systems:

### 1. Confluence Sync (Components & Building Blocks)
```bash
yarn sync-confluence
```
- ✅ Only downloads changed pages (version tracking)
- ✅ Fast (~20 seconds for 40 pages)
- ✅ Safe to run multiple times per day
- **Source:** Confluence (RDS space)

### 2. Token Documentation Generator (Tokens)
```bash
# After updating @rippling/pebble-tokens
yarn upgrade @rippling/pebble-tokens
yarn generate-token-docs
```
- ✅ Auto-generates from actual token code
- ✅ Always accurate (derived from `@rippling/pebble-tokens`)
- ✅ Includes ALL 358+ tokens
- **Source:** `@rippling/pebble-tokens` npm package

### Documentation Sources
- 📝 **Confluence** = Components, Building Blocks (design team maintains)
- 🎨 **@rippling/pebble-tokens** = Token definitions (generated from Figma)
- 💾 **This repo** = AI-readable markdown copies
- 🔄 **Automation scripts** = Keep everything in sync

**[→ Confluence Sync Guide](../CONFLUENCE_SYNC_GUIDE.md)**

---

## 🎓 Learning Path

### For Designers (New to AI Prototyping)

1. **Start with patterns** - Learn common scenarios
2. **Browse building blocks** - Understand Rippling conventions
3. **Prototype with AI** - "Build a dashboard for X"
4. **Reference components** - Fine-tune specific parts

### For Developers (New to Pebble)

1. **Start with components** - Learn component APIs
2. **Review patterns** - See best practices
3. **Study building blocks** - Understand Rippling context
4. **Build features** - Combine everything

### For AI (Helping Users)

1. **Parse user intent** - Feature vs problem vs component?
2. **Load relevant context** - Building block + patterns + components
3. **Generate solution** - Follow Rippling conventions
4. **Validate accessibility** - Check pattern checklists

---

## 📚 Related Resources

- **[Pebble Storybook](https://pebble.rippling.dev)** - Live component examples
- **[Confluence (RDS)](https://rippling.atlassian.net/wiki/spaces/RDS/)** - Source documentation
- **[Playground README](../../README.md)** - Getting started with this playground
- **[Override System](../../docs/OVERRIDE_SYSTEM.md)** - Customizing components for prototypes

---

## 💬 Feedback

Found an issue? Documentation unclear?

- **Slack:** #pebble-design-system
- **Update Confluence** - This syncs automatically
- **GitHub Issues** - For playground-specific issues

---

**Last Updated:** November 3, 2025  
**Maintained by:** Pebble Design System Team  
**Synced from:** Rippling Design System Confluence (RDS) + Internal Knowledge (Platform Context)
