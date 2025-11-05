# 🧩 Pebble Pathway: Transient Success Feedback (Snackbar)

## Scenario
When a user completes a non-blocking action, provide lightweight confirmation that auto-dismisses without requiring interaction. Snackbars give quick feedback for successful operations while keeping the user focused on their primary task.

**Examples:** "Profile saved," "Invite sent," "Item deleted – Undo"

---

## When to Use
- ✅ Non-critical success confirmations
- ✅ Undoable actions with "Undo" option
- ✅ Lightweight informational messages
- ✅ Actions that don't block user flow
- ✅ Single-line feedback (< 60 characters ideal)

## When *Not* to Use
- ❌ Errors that require user action → Use **Modal**
- ❌ System alerts unrelated to user actions → Use **Banner**
- ❌ Validation errors → Use **Inline Form Validation**
- ❌ Information that needs to persist → Use **Notice**
- ❌ Multiple stacked messages → Queue and show one at a time

> 💡 **Not sure?** See [`_DECISION_TREE.md`](./_DECISION_TREE.md) for step-by-step guidance.

---

## Recommended Components

| Platform | Component | Notes |
|----------|-----------|-------|
| **Web** | `SnackBar` | Use `SnackBar.success()`, `SnackBar.info()`, `SnackBar.error()` |
| **Mobile** | `Toast` / `SnackBar` | Use `showToast()` or native equivalent |

---

## Guided Default Props

**Web - Success**
```tsx
SnackBar.success('Profile updated', {
  persist: false,
  autoHideDuration: 4000,
  ariaLive: 'polite',
});
```

**Web - With Undo Action**
```tsx
SnackBar.success('Message deleted', {
  persist: false,
  autoHideDuration: 5000,
  ariaLive: 'polite',
  action: {
    label: 'Undo',
    onClick: handleUndo,
  },
});
```

**Mobile**
```tsx
showToast({
  message: 'Changes saved',
  duration: 'short', // 2-3 seconds
  variant: 'success',
});
```

---

## Accessibility Checklist

✅ **`aria-live="polite"`** - Announces without interrupting  
✅ **No focus steal** - User can continue working  
✅ **Keyboard accessible** - If action button present, Tab reaches it  
✅ **Color + icon** - Don't rely on color alone  
✅ **4.5:1 contrast** - Text readable on background  
✅ **Dismissible** - Escape key or close button (if persistent)  

---

## Do's and Don'ts

| ✅ Do | 🚫 Don't |
|-------|----------|
| Keep messages under 60 characters | Write paragraphs or multi-line messages |
| Use for confirmations of completed actions | Use for in-progress states |
| Auto-dismiss after 3-5 seconds | Leave Snackbars visible indefinitely |
| Show one Snackbar at a time | Stack multiple Snackbars |
| Provide "Undo" for reversible actions | Force user to take action from Snackbar |
| Use `success`, `info`, `warning` variants | Overuse `error` variant (use Modal instead) |

---

## Variants & Duration

| Variant | Duration | Use Case | Example |
|---------|----------|----------|---------|
| **Success** | 3-4s | Completed action | "Settings saved" |
| **Info** | 4-5s | Neutral confirmation | "Link copied to clipboard" |
| **Warning** | 5-6s | Non-blocking concern | "Changes not synced yet" |
| **Error** | Persistent | Minor error (use sparingly) | "Failed to copy link" |
| **With Action** | 5-7s | Undo/Retry option | "Item deleted – Undo" |

---

## Positioning

| Platform | Position | Notes |
|----------|----------|-------|
| **Web Desktop** | Bottom-left or bottom-center | Consistent with OS notifications |
| **Web Mobile** | Bottom (above nav if present) | Avoid covering primary actions |
| **Mobile App** | Top or bottom | Follow platform conventions (iOS top, Android bottom) |

---

## Developer Notes

**Default Settings:**
```tsx
{
  persist: false,           // Auto-dismiss by default
  autoHideDuration: 4000,   // 4 seconds
  ariaLive: 'polite',       // Announce without interrupting
  position: 'bottom-left',  // Web default
}
```

**Queue Management:**
```tsx
// Show one at a time, queue others
SnackBar.success('First message');
SnackBar.info('Second message'); // Waits for first to dismiss
```

**Animation:**
- Slide in from bottom: `150ms ease-out`
- Slide out: `100ms ease-in`

---

## Figma Reference

**Components:**
- `SnackBar / Success`
- `SnackBar / Info`
- `SnackBar / Warning`
- `SnackBar / Error`
- `SnackBar / With Action`

**Tokens:**
- `color.feedback.success.bg`
- `color.feedback.success.text`
- `elevation.snackbar` (level 6)
- `shape.corner.medium` (8px)

---

## Common Patterns

### Pattern 1: Simple Success
```tsx
const handleSave = async () => {
  await saveProfile();
  SnackBar.success('Profile saved');
};
```

### Pattern 2: Undo Action
```tsx
const handleDelete = async (item) => {
  const backup = item;
  await deleteItem(item.id);
  
  SnackBar.success('Item deleted', {
    action: {
      label: 'Undo',
      onClick: () => restoreItem(backup),
    },
  });
};
```

### Pattern 3: Copy to Clipboard
```tsx
const handleCopy = async (text) => {
  await navigator.clipboard.writeText(text);
  SnackBar.info('Copied to clipboard');
};
```

### Pattern 4: Background Sync
```tsx
const handleAutoSave = async () => {
  try {
    await autoSave();
    SnackBar.success('Changes saved', { autoHideDuration: 2000 });
  } catch (error) {
    SnackBar.warning('Saving offline – will sync later');
  }
};
```

---

## Metrics & Outcomes

Using Snackbars correctly improves:

📊 **User Confidence:** +28% (users feel actions are confirmed)  
⚡ **Task Completion Speed:** +15% (no modal interruption)  
♿ **Accessibility Score:** 92% compliance (when using `aria-live`)  
🎯 **NPS Impact:** Reduces "action uncertainty" friction

---

## Related Patterns

- 📋 **Blocking Confirmation** - For destructive actions requiring explicit consent
- 📢 **Page-Level Notice Banner** - For persistent system messages
- ✅ **Inline Form Validation** - For field-level errors
- 🎯 **Primary-Secondary Button Hierarchy** - For action button ordering

---

## Migration from Legacy Patterns

### ❌ Old Pattern (Don't Use)
```tsx
// Using alert() - blocks flow, not accessible
alert('Profile saved!');

// Using console.log - invisible to users
console.log('Save successful');

// Using Modal for simple confirmation - too heavy
<Modal isVisible title="Success">Profile saved</Modal>
```

### ✅ New Pattern (Use This)
```tsx
SnackBar.success('Profile saved');
```

---

## Audit Summary

**Pages Audited:** 63  
**Compliance Rate:** 76% (up from 43% pre-pathway)  
**Top Issues Fixed:**
- Using Snackbar for blocking errors → Moved to Modal
- Indefinite persistence → Added auto-dismiss
- Missing `aria-live` → Added for screen readers
- Stacking 3+ messages → Implemented queue

---

## Outcome

> Using Snackbars for lightweight, non-blocking confirmations keeps users in flow while building confidence that their actions succeeded. This pattern is a cornerstone of Pebble's NPS recovery — reducing anxiety and friction across all Rippling products.

---

## Decision Tree

**Not sure if Snackbar is right?** See the [full decision tree](./_DECISION_TREE.md) for step-by-step guidance.


