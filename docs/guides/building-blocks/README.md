# Building Blocks

**"How do I build Y in Rippling?"**

## What Are Building Blocks?

Building blocks are **Rippling-specific composite UX modules** that combine multiple Pebble components with platform constraints, business logic, and product requirements. They represent complete features or systems, not just individual interaction patterns.

### Key Characteristics

✅ **Rippling-Specific** - Unique to our platform, not generic design patterns  
✅ **Composite** - Combines multiple components and patterns  
✅ **Platform-Aware** - Includes technical constraints (responsive breakpoints, data models, etc.)  
✅ **Feature-Focused** - Guides building complete experiences, not just solving single problems  
✅ **Business Logic** - Often includes product requirements and use cases

---

## Building Blocks vs. Patterns

| Aspect | Patterns | Building Blocks |
|--------|----------|-----------------|
| **Question** | "How do I solve X?" | "How do I build Y in Rippling?" |
| **Scope** | Single interaction or problem | Complete feature or system |
| **Portability** | Could apply to any product | Rippling-specific |
| **Complexity** | Simple, focused | Complex, composite |
| **Example** | "Show feedback on action completion" | "Build a manager dashboard" |

### Example: Snackbar Feedback

**As a Pattern** (`patterns/snackbar-feedback/`):
- When to show snackbar vs notice vs modal
- How long should it display?
- What icon/color for success/error?
- Decision tree for feedback types

**As a Building Block** (doesn't exist separately):
- Snackbar is too small/focused to be a building block
- It's a **component** used within building blocks
- Example: Dashboards building block uses snackbar for save confirmations

### Example: Dashboards

**As a Building Block** (`building-blocks/dashboards/`):
- Grid layout system (12 columns, breakpoints)
- Card types (metric cards, list cards, chart cards)
- Navigation patterns (tabs, filters, date ranges)
- Empty states for no data
- Loading states
- Responsive behavior
- Data refresh patterns
- User customization capabilities

This is too large/complex to be a "pattern" - it's a complete feature that **uses** many patterns.

---

## Available Building Blocks

### 🎨 Layout & Responsiveness

- **[Responsive Strategy](./responsive-strategy.md)** - Breakpoints, grid system, mobile-first approach
- **[Dashboards](./dashboards.md)** - Dashboard construction patterns, card types, layouts

### 🔄 Complex Features

- **[Workflow Automator v2](./workflow-automator.md)** - Workflow builder UX, node patterns, connection logic

---

## When to Use This Documentation

### Use Building Blocks When:

✅ **Prototyping a new feature** - "Build an admin dashboard for time-off management"  
✅ **Implementing a known Rippling pattern** - "This should work like our existing dashboards"  
✅ **Understanding platform constraints** - "What are our responsive breakpoints?"  
✅ **Combining multiple components** - "How do card grids work in dashboards?"

### Use Patterns Instead When:

🔄 **Solving a specific UX problem** - "How do I show validation errors?"  
🔄 **Choosing between component options** - "Snackbar vs Notice vs Modal?"  
🔄 **Implementing an interaction** - "What happens when user clicks Save?"

### Use Components Docs When:

📦 **Learning component API** - "What props does Button accept?"  
📦 **Seeing component examples** - "Show me all Button appearances"  
📦 **Understanding variants** - "What sizes does Modal come in?"

---

## For AI Prototyping

When working with AI to prototype Rippling features:

### Reference Building Blocks For:
- **Feature-level prompts**: "Create a dashboard for managers to view team performance"
- **Platform context**: "Use Rippling's responsive strategy for mobile layout"
- **Complex interactions**: "Implement workflow automator node connection"

### Building Blocks Provide:
- ✅ Rippling-specific conventions
- ✅ Business logic context
- ✅ Multi-component integration patterns
- ✅ Platform constraints and requirements
- ✅ Real product examples

---

## Contributing

Building blocks come from Confluence. To add a new building block:

1. Ensure it meets the criteria (Rippling-specific, composite, feature-focused)
2. Add page ID to `confluence-sync.config.json`:
   ```json
   {
     "pageId": "1234567890",
     "title": "Your Building Block",
     "outputPath": "building-blocks/your-building-block.md"
   }
   ```
3. Run `yarn sync-confluence`

---

## Related Documentation

- **[Patterns](../patterns/)** - Generic UX problem-solving approaches
- **[Components](../components/)** - Individual Pebble component guidelines
- **[Design Guidelines Overview](../README.md)** - Full documentation structure


