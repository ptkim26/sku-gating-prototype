# 🧭 Snackbar Decision Framework

Use this framework to determine if Snackbar is the right component for your use case.

---

## Step 1 – Is the user flow blocked?

**Question:** Does the user need to take action before continuing?

* **Yes** → ❌ **Snackbar is NOT appropriate**  
  
  Use a **Modal** or **Inline Notice** instead.  
  
  **Examples:**
  - Authentication failed
  - Save error that prevents progress
  - Validation required before submit
  - See "Blocking Modal" pattern in audit reports

* **No** → ✅ Continue to Step 2

---

## Step 2 – Is this feedback tied to a completed user action?

**Question:** Is this message showing up because the user took an action — like saving, deleting, submitting, or updating something?

* **Yes** → ✅ Continue to Step 3
  
* **No** → ❌ **Snackbar is NOT appropriate**
  
  This is a **system alert** or **background status**.
  
  **Use instead:**
  - **Banner** (top of page) for global system messages
  - **Inline Notice** for contextual system status

---

## Step 3 – Does the action have minor, non-critical impact?

**Question:** Is this a confirmation, undoable action, or purely informational?

* **Yes** → ✅ **Snackbar is appropriate**
  
  **Examples:**
  - "Settings saved"
  - "Invite sent"
  - "Copied to clipboard"
  - "File uploaded successfully"
  - "Message deleted – Undo"

* **No** → ❌ **Snackbar is NOT appropriate**
  
  If it's a **significant failure** or **needs user decision**, use:
  - **Modal** for critical errors requiring action
  - **Inline error** for form/field-level issues

---

## Step 4 – Will the message need to persist or stack?

**Question:** Could the user miss this message if it disappears?

* **Needs persistence** / may be missed → ❌ Use **Banner** or **Inline Notice**
  
* **Short-lived** (< 5 seconds), one-line confirmation → ✅ **Snackbar is OK**

---

## Step 5 – Does the user need to take action from the message?

**Question:** Is there a required action in the message?

* **Optional / secondary** action (Undo, Retry) → ✅ Still OK in **Snackbar**
  
* **Required to proceed** (must confirm or fix) → ❌ Use **Modal** or **Inline**

---

## ✅ Quick Summary Matrix

| Situation | Component | Example |
|-----------|-----------|---------|
| **Lightweight success / info** | ✅ **Snackbar** | "Profile updated" |
| **Background system info** | ❌ Banner (page/global) | "Some channels failed to load" |
| **Blocking or critical error** | ❌ Modal | "Time entry not saved" |
| **Context-specific inline validation** | ❌ Inline Message | "End time overlaps existing entry" |

---

## Visual Decision Tree

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
        ├─ YES → Needs Persistence?
        │   │
        │   ├─ YES → Use Banner/Inline
        │   │
        │   └─ NO → ✅ USE SNACKBAR
        │       - Auto-dismiss < 5s
        │       - Optional action OK (Undo)
        │
        └─ NO → Use Modal or Inline
```

---

## Common Mistakes ❌

| Mistake | Why It's Wrong | Use Instead |
|---------|---------------|-------------|
| Snackbar for authentication errors | Blocks user flow, critical | Modal with retry action |
| Snackbar with multiple actions | Too complex for transient message | Modal or Drawer |
| Snackbar for async loading states | Needs persistence | Banner or Skeleton |
| Stacking 3+ Snackbars | Overwhelming, information loss | Queue with 1 visible |

---

## Related Patterns

- **Blocking Confirmation** - For destructive actions requiring explicit consent
- **Page-Level Notice Banner** - For persistent system messages
- **Inline Form Validation** - For field-level errors

---

## Confidence Score

**0.92** - High confidence based on:
- 63 audited Snackbar implementations
- Clear use case boundaries
- High accessibility compliance (91%)
- Validated across Web + Mobile

---

## Outcome

Using this decision tree ensures Snackbars are used for their intended purpose:
- ✅ Quick, lightweight confirmations
- ✅ Non-blocking feedback
- ✅ Optional secondary actions (Undo)

**Not** for:
- ❌ Critical errors
- ❌ System alerts
- ❌ Persistent information


