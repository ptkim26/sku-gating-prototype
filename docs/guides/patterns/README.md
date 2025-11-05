# Pebble Pathways — Common UI Patterns

**"How do I solve X?"**

**Phase 1 of Pebble's NPS Recovery Plan**

Pebble Pathways are **guided defaults** — opinionated, battle-tested patterns for the most common UI scenarios across Rippling products. They eliminate ambiguity, reduce decision fatigue, and ensure consistency between design and code.

## Patterns vs. Building Blocks

**Patterns** focus on solving **generic UX problems** that could apply to any product:
- ✅ "How do I confirm a destructive action?"
- ✅ "How do I validate form input?"
- ✅ "How do I show success feedback?"

**[Building Blocks](../building-blocks/)** focus on building **Rippling-specific features**:
- 🏗️ "How do I build a dashboard in Rippling?"
- 🏗️ "What are Rippling's responsive breakpoints?"
- 🏗️ "How does workflow automator work?"

**Use patterns when:** Solving a specific interaction problem  
**Use building blocks when:** Building a complete Rippling feature

---

## 📚 What's Here

This directory contains **10 core UI patterns** with:

✅ **When to use / When NOT to use**  
✅ **Code examples** (Web + Mobile)  
✅ **Accessibility checklists**  
✅ **Decision trees** for choosing the right component  
✅ **Audit reports** showing before/after improvements  
✅ **Figma references** linking design to code

---

## 🧭 How to Use

### For AI Assistants

1. **Start with** [`Pebble_Pathways_v1.1_Bundle.md`](./Pebble_Pathways_v1.1_Bundle.md) for a quick overview of all 10 patterns
2. **Deep dive** into specific pattern folders (e.g., `1-blocking-confirmation/`)
3. **Check decision trees** (`_DECISION_TREE.md`) if unsure which pattern to use
4. **Reference audit reports** in `web/` and `mobile/` folders for real examples

### For Developers

1. **Browse the master file** to find the pattern that matches your scenario
2. **Open the specific pathway** (e.g., `_Pathway_Blocking_Confirmation.md`)
3. **Copy the "Guided Default"** code example
4. **Apply the accessibility checklist**
5. **Reference Figma** for visual specs

### For Designers

1. **Use pathways as design specs** when creating new flows
2. **Link to these docs** in Figma comments for engineers
3. **Review audit reports** to see common mistakes and improvements

---

## 📖 Pattern Index

| # | Pattern Name | Use Case | Component | Status |
|---|--------------|----------|-----------|--------|
| 1 | **Blocking Confirmation** | Destructive actions | `Modal` | ✅ Complete |
| 2 | **Inline Form Validation** | Field-level errors | `Form.Input.Text` | ✅ Complete |
| 3 | **Transient Success Feedback** | Non-blocking confirmations | `SnackBar` | ✅ Complete |
| 4 | **Interactive Hover States** | Button/navigation hovers | All interactive | ✅ Complete |
| 5 | **Empty State with CTA** | No data yet | `EmptyState` | 🟡 Planned |
| 6 | **Collection Selection + Bulk Actions** | Multi-select tables | `DataGrid` | 🟡 Planned |
| 7 | **Side Drawer (Edit in Place)** | Secondary workflows | `Drawer` | 🟡 Planned |
| 8 | **Contextual Info Tooltip** | Supplemental help | `Tip` | 🟡 Planned |
| 9 | **Multi-Step Flow** | Wizard / progressive disclosure | `Stepper` | 🟡 Planned |
| 10 | **Page-Level Notice Banner** | System alerts | `Notice` / `Banner` | 🟡 Planned |
| 11 | **Primary-Secondary Button Hierarchy** | Action ordering | `Button` | 🟡 Planned |

---

## 🎯 Pattern Structure

Each pattern follows this structure:

```
1-blocking-confirmation/
├── _Pathway_Blocking_Confirmation.md  ← Main docs
├── _DECISION_TREE.md                   ← When to use this pattern
├── web/
│   ├── pebble-pathway-audit-report.md       ← Before/after examples
│   └── pebble-pathway-audit-summary.yaml    ← Metrics
└── mobile/
    ├── pebble-pathway-mobile-audit-report.md
    └── pebble-pathway-mobile-audit-summary.yaml
```

---

## 🧭 Decision Trees

**Not sure which component to use?** Each pattern includes a decision tree to help you choose:

### Example: Snackbar Decision Tree

```
User Action Completed?
│
├─ NO → System Event
│   └─ Use Banner or Inline Notice
│
└─ YES → User Flow Blocked?
    │
    ├─ YES → Critical Error
    │   └─ Use Modal
    │
    └─ NO → Minor Confirmation?
        │
        └─ YES → ✅ USE SNACKBAR
```

**See:** [`3-snackbar-feedback/_DECISION_TREE.md`](./3-snackbar-feedback/_DECISION_TREE.md)

---

## ✅ Quick Pattern Selector

**Need to...**

| Task | Pattern | Component |
|------|---------|-----------|
| Confirm a destructive action | Blocking Confirmation | `Modal` |
| Validate form input | Inline Form Validation | `Form.Input.Text` |
| Show quick success message | Transient Success Feedback | `SnackBar` |
| Add hover/active states | Interactive Hover States | All interactive |
| Display empty state | Empty State with CTA | `EmptyState` |
| Edit item without losing context | Side Drawer | `Drawer` |
| Explain a field or feature | Contextual Info | `Tip` |
| Show system-wide alert | Page-Level Notice | `Notice` / `Banner` |
| Guide multi-step process | Multi-Step Flow | `Stepper` |
| Order action buttons | Button Hierarchy | `Button` |

---

## 📊 Pattern Confidence Scores

Each pattern includes a **confidence score** (0.0 - 1.0) based on:

- Number of audited implementations
- Accessibility compliance rate
- Design system team validation
- Cross-platform consistency

**Example:**
```yaml
confidence: 0.92
```
**0.92** = High confidence based on 63 audited implementations, 91% accessibility compliance.

---

## 🔗 Cross-References

Patterns often work together:

- **Blocking Confirmation** + **Button Hierarchy** = Properly ordered modal actions
- **Inline Form Validation** + **Transient Success** = Complete form submission flow
- **Side Drawer** + **Inline Form Validation** = Edit-in-place with validation
- **Empty State** + **Modal** = Create first item workflow

---

## 🤖 AI Integration

These patterns are optimized for AI assistants:

**Code examples** → AI can copy-paste working code  
**Decision trees** → AI can follow step-by-step logic  
**YAML summaries** → AI can parse machine-readable metadata  
**Accessibility checklists** → AI ensures compliance  

**Example AI workflow:**
```
User: "Add a delete button for this row"

AI Process:
1. Reads Pebble_Pathways_v1.1_Bundle.md
2. Identifies "Blocking Confirmation" pattern
3. Checks _DECISION_TREE.md (destructive action = use Modal)
4. Copies guided default code
5. Applies accessibility checklist

Result: Accessible, brand-compliant delete confirmation!
```

---

## 📈 Outcomes & Metrics

**Phase 1 Goals (Q1 2026):**
- ✅ 10 core pathways documented
- ✅ 200+ implementations audited
- 🎯 80%+ compliance rate (up from 43%)
- 🎯 20% reduction in NPS friction related to UI clarity

**Current Progress:**
- 3/10 patterns complete (Blocking Confirmation, Inline Validation, Snackbar)
- 174 implementations audited
- 76% average compliance (up from 43%)

---

## 🆘 Common Questions

### Q: When should I use a Modal vs Drawer?
**A:** See the [Blocking Confirmation decision tree](./1-blocking-confirmation/_DECISION_TREE.md).  
**Quick answer:** Modal = blocks flow, requires decision. Drawer = edit without losing context.

### Q: Should I use Snackbar or Banner for this message?
**A:** See the [Snackbar decision tree](./3-snackbar-feedback/_DECISION_TREE.md).  
**Quick answer:** Snackbar = user action confirmation. Banner = system alert.

### Q: How do I validate forms correctly?
**A:** See [Inline Form Validation](./2-validation/_Pebble_Pathway_Inline_Form_Validation.md).  
**Quick answer:** Validate on blur, show errors inline, use `aria-invalid`.

---

## 🔄 Keeping Patterns Updated

Patterns evolve based on:
- Product feedback
- Accessibility audits
- Design system updates
- New component releases

**Last updated:** November 3, 2025  
**Next review:** Q1 2026

---

## 📚 Related Documentation

- **Component docs:** [`../components/`](../components/) - Individual component usage
- **Tokens:** [`../tokens/`](../tokens/) - Design tokens reference
- **Accessibility:** [`../accessibility/`](../accessibility/) - WCAG compliance guide
- **Pebble Storybook:** [pebble.rippling.dev](https://pebble.rippling.dev) - Live components

---

## 🎓 Learning Resources

**New to Pebble Pathways?**
1. Start with the [Bundle file](./Pebble_Pathways_v1.1_Bundle.md) (10-minute read)
2. Pick a pattern you use often (e.g., Snackbar)
3. Read the decision tree
4. Try implementing the guided default
5. Review the audit report to see common mistakes

**For Teams:**
- Share pathways in Slack when reviewing PRs
- Link to specific patterns in design reviews
- Use decision trees to resolve "which component?" debates

---

## 💬 Feedback & Questions

Found an issue? Have a suggestion?
- **Slack:** #pebble-design-system
- **GitHub:** [Pebble Issues](https://github.com/rippling/pebble/issues)
- **Email:** design-systems@rippling.com

---

**Built with ❤️ by the Pebble Design System team**

