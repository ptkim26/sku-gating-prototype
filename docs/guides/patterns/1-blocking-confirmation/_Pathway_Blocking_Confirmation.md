# 🧩 Pebble Pathway: Blocking Confirmation (Destructive Actions)

## Scenario
When an action is **irreversible or potentially destructive**, users must explicitly confirm their intent before the system proceeds.  
Examples include deleting records, revoking access, or canceling an active payroll.

---

## When to Use
- Irreversible or destructive actions that permanently remove data or access.
- Workflows that require explicit user consent to proceed.
- System-critical confirmations (e.g., “Delete user,” “Cancel payroll,” “Remove app”).

## When *Not* to Use
- Reversible actions with an “Undo” option → use **Snackbar** instead.  
- Informational notices → use **Notice/Banner**.  
- Minor inline edits or dismissible alerts → use **Drawer** or inline confirmation.

---

## Recommended Components
| Platform | Component | Notes |
|-----------|------------|-------|
| **Web** | `Modal` + `Button` (Primary / Destructive) | Use `isVisible`, `onCancel`, `onConfirm`, and `aria-modal='true'`. |
| **Mobile** | `modalService.confirm()` | Use `title`, `description`, `primaryAction`, and `secondaryAction`. |

---

## Guided Default Props
**Web**
```tsx
<Modal
  isVisible={isVisible}
  onCancel={handleCancel}
  title="This action cannot be undone"
  aria-modal="true"
>
  <Text>
    Are you sure you want to delete this employee record? This cannot be undone.
  </Text>
  <Modal.Footer>
    <Button appearance={Button.APPEARANCES.OUTLINE} onClick={handleCancel}>
      Cancel
    </Button>
    <Button appearance={Button.APPEARANCES.DESTRUCTIVE} onClick={handleDelete}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>
```

**Mobile**
```tsx
modalService.confirm({
  title: 'Delete employee?',
  description: 'This action cannot be undone.',
  primaryAction: {
    title: 'Delete',
    onPress: handleDelete,
    appearance: 'destructive',
  },
  secondaryAction: {
    title: 'Cancel',
    onPress: handleCancel,
  },
});
```

---

## Accessibility Checklist
✅ Focus trapped while modal is open  
✅ `aria-modal="true"` on dialog container  
✅ Return focus to trigger on close  
✅ Provide descriptive `title` and body text (no “Are you sure?” alone)  
✅ Keyboard shortcuts: **Esc** closes, **Enter** confirms  
✅ Screen readers announce dialog context (“Dialog: Delete employee record”)  

---

## Do’s and Don’ts
| ✅ Do | 🚫 Don’t |
|-------|----------|
| Use clear, specific titles (“Delete employee record?”). | Use generic language (“Are you sure?”). |
| Include both confirm *and* cancel options. | Force destructive action without cancel option. |
| Default focus on **Cancel**. | Auto-focus the destructive action. |
| Limit one destructive modal visible at a time. | Stack multiple confirmations. |
| Use red accents sparingly for destructive intent only. | Apply red styling to non-destructive dialogs. |

---

## Visuals
| Example | Description |
|----------|--------------|
| 💻 **Web (Desktop)** | Centered modal with descriptive text and two-button footer. |
| 📱 **Mobile (App)** | Bottom sheet or centered dialog with stacked primary/secondary buttons. |

---

## Developer Notes
- **Default variant:** `appearance="destructive"`  
- **Default size:** `sm` (web)  
- **Focus behavior:** Return to trigger on close  
- **Telemetry:** Log `onConfirm` / `onCancel` actions  

---

## Figma Reference
- **Component:** `Modal / Destructive`  
- **Tokens:** `color.intent.danger.bg`, `color.intent.danger.text`, `elevation.overlay`

---

## Outcome
> Using this pattern ensures clarity, prevents accidental data loss, and builds user trust — a key driver for Pebble’s NPS recovery.
