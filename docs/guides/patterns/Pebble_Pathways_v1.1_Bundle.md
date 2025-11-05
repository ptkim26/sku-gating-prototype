# Pebble Pathways v1.1 — Combined Master File

## Phase 1 Overview: Guided Defaults Framework

The **Pebble Pathways initiative** represents Phase 1 of Rippling’s Pebble NPS Recovery Plan.  
It focuses on transforming Pebble from a complex, over-configurable system into a **frictionless, opinionated foundation** for product development across web and mobile.

Between October 2025 and Q1 2026, a cross-functional audit identified the most frequent, high-friction UI scenarios and codified them into **guided defaults** known as Pebble Pathways.  
These pathways represent the “gold-standard” usage patterns that reduce system ambiguity and align design and code around clarity, guidance, and ease of use.

---

## 📘 Contents

1. Blocking Confirmation (Destructive Actions)  
2. Inline Form Validation  
3. Transient Success Feedback  
4. Empty State with Primary CTA  
5. Collection Selection + Bulk Actions  
6. Side Drawer (Edit in Place)  
7. Contextual Info Tooltip  
8. Multi-Step Flow (Stepper)  
9. Page-Level Notice Banner  
10. Primary–Secondary Button Hierarchy  

---

# Pebble Pathway: Blocking Confirmation (Destructive Actions)
**Platform:** Web + Mobile  
**Category:** Confirmation & Safety  

### 🧠 Context  
Use for irreversible destructive actions (delete, remove, cancel). Ensures clarity, confirmation, and safe defaults.

### 🧱 Recommended Component  
`Modal` / `modalService.confirm`

### ✨ Guided Default (Gold Standard)
```tsx
<Modal
  isVisible={isVisible}
  onCancel={handleCancel}
  title={t('thisCantBeUndone')}
>
  <Text>{t('confirmDeleteDescription')}</Text>
  <Modal.Footer>
    <Modal.CloseButton />
    <Button appearance={Button.APPEARANCES.DESTRUCTIVE} onClick={handleDelete}>
      {t('delete')}
    </Button>
  </Modal.Footer>
</Modal>
```
**Accessibility:** `aria-modal="true"`, focus trap, return focus on close.

### 🧑‍💻 Developer Notes  
- Always include Cancel button.  
- Never use one-button confirmations.  

### 🎨 Figma Reference  
`Figma › Pebble / Modals / Confirmation (Destructive)`

### 📈 Outcomes  
- Prevents destructive misclicks.  
- Reduces accessibility and UX errors.

### 🧾 YAML Summary
```yaml
id: blocking-confirmation-destructive
name: Destructive confirmation (blocking)
recommended_component: Modal
guided_default:
  props:
    isVisible: true
    onCancel: handleCancel
    title: "Action cannot be undone"
    footer:
      confirmButton:
        appearance: DESTRUCTIVE
when_to_use: Irreversible destructive actions
when_not_to_use: Undoable or low-impact changes
confidence: 0.89
```

---

# Pebble Pathway: Inline Form Validation
**Platform:** Web + Mobile  
**Category:** Forms & Inputs  

### 🧠 Context  
Provide immediate, field-level feedback when user input is invalid. Supports accessibility and faster correction.

### 🧱 Recommended Component  
`Form.Input.Text` / `TextField` (web)  
`FormField` + `HelperText` (mobile)

### ✨ Guided Default (Gold Standard)
```tsx
<Form.Input.Text
  name="email"
  title="Email"
  isRequired
  validations={{ matchRegexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
  validationError="Please enter a valid email"
  helperText="We'll send confirmation here"
/>
```
**Accessibility:** `aria-invalid="true"`, `aria-describedby` links to error text.

### 🧑‍💻 Developer Notes  
- Use `onBlur` trigger for real-time validation.  
- Group error text with field via `aria-describedby`.

### 🎨 Figma Reference  
`Figma › Pebble / Forms / Validation Patterns`

### 📈 Outcomes  
- Increases form completion rates.  
- Reduces submission errors.

### 🧾 YAML Summary
```yaml
id: inline-form-validation
name: Inline form field validation
recommended_component: Form.Input.Text / TextField
guided_default:
  props:
    isRequired: true
    errorText: "Field-specific error"
    validationTrigger: onBlur
when_to_use: Real-time validation feedback
when_not_to_use: Multi-field errors → use Notice.Error
confidence: 0.87
```

---

# Pebble Pathway: Transient Success Feedback ≤5s
**Platform:** Web + Mobile  
**Category:** Feedback & Status  

### 🧱 Recommended Component  
`SnackBar`

### ✨ Guided Default (Gold Standard)
```tsx
SnackBar.success(t('savedChanges'), {
  persist: false,
  autoHideDuration: 4000,
  ariaLive: 'polite'
});
```
**Accessibility:** `aria-live="polite"`, no focus steal.

### 🧑‍💻 Developer Notes  
- Limit to one Snackbar visible.  
- Use for non-blocking confirmations only.

### 🎨 Figma Reference  
`Figma › Pebble / Feedback / SnackBar`

### 🧾 YAML Summary
```yaml
id: transient-feedback-success
name: Transient success feedback ≤5s
recommended_component: SnackBar
guided_default:
  variant: success
  props:
    persist: false
    autoHideDuration: 3000-5000
    aria-live: polite
when_to_use: Non-blocking success confirmations
confidence: 0.92
```

---

# Pebble Pathway: Empty State with Primary CTA
**Platform:** Web + Mobile  
**Category:** Data Absence & Onboarding  

### 🧱 Recommended Component  
`EmptyState` + `Button`

### ✨ Guided Default (Gold Standard)
```tsx
<EmptyState
  illustration={<NoDataIllustration />}
  title="No reports yet"
  description="Create your first report"
  primaryAction={{ label: "Create Report", onClick: openNewReport }}
/>
```

### 🧑‍💻 Developer Notes  
- Always include a single primary CTA.  

### 🎨 Figma Reference  
`Figma › Pebble / Patterns / Empty States`

### 🧾 YAML Summary
```yaml
id: empty-state-with-cta
name: Empty state with primary CTA
recommended_component: EmptyState + Button
guided_default:
  variant: illustrative
  props:
    illustration: contextual_svg
    title: "No items yet"
    primaryAction:
      label: "Create item"
      appearance: PRIMARY
confidence: 0.84
```

---

# Pebble Pathway: Collection Selection + Bulk Actions
**Platform:** Web  
**Category:** Collections & Selection  

### 🧱 Recommended Component  
`DataGrid` / `SelectionToolbar`

### ✨ Guided Default (Gold Standard)
```tsx
<DataGrid
  checkboxSelection
  rowSelection={{ mode: 'multiple', onSelectionChange }}
  components={{
    Toolbar: () =>
      selectedRows.length > 0 && (
        <SelectionToolbar
          selectedCount={selectedRows.length}
          onBulkDelete={handleBulkDelete}
        />
      )
  }}
/>
```

### 🎨 Figma Reference  
`Figma › Pebble / Collections / DataGrid Bulk Actions`

### 🧾 YAML Summary
```yaml
id: data-table-selection-bulk-actions
name: Data table row selection + bulk actions
recommended_component: DataGrid + SelectionToolbar
confidence: 0.81
```

---

# Pebble Pathway: Non-Blocking Side Drawer (Edit in Place)
**Platform:** Web  
**Category:** Secondary Workflows  

### 🧱 Recommended Component  
`Drawer`

### ✨ Guided Default (Gold Standard)
```tsx
<Drawer isVisible width={700} onClose={handleClose}>
  <Drawer.Header title={t('editItem')} />
  <Drawer.Body><EditForm /></Drawer.Body>
  <Drawer.Footer>
    <Button appearance="outline">Cancel</Button>
    <Button>Save</Button>
  </Drawer.Footer>
</Drawer>
```

### 🎨 Figma Reference  
`Figma › Pebble / Patterns / Drawers`

### 🧾 YAML Summary
```yaml
id: side-drawer-edit-in-place
name: Non-blocking side panel for edit/detail
recommended_component: Drawer
confidence: 0.85
```

---

# Pebble Pathway: Contextual Info Tooltip
**Platform:** Web  
**Category:** Guidance & Context  

### 🧱 Recommended Component  
`Tooltip` / `Icon.tip`

### ✨ Guided Default (Gold Standard)
```tsx
<Icon
  type={Icon.TYPES.QUESTION_CIRCLE_FILLED}
  tip={{ content: t('fieldHelp'), maxWidth: 250 }}
  size={16}
/>
```

### 🎨 Figma Reference  
`Figma › Pebble / Patterns / Tooltips`

### 🧾 YAML Summary
```yaml
id: contextual-info-tooltip
name: Supplemental info tooltip (no action)
recommended_component: Tooltip / Icon.tip
confidence: 0.78
```

---

# Pebble Pathway: Multi-Step Flow (Stepper)
**Platform:** Web  
**Category:** Progress & Flow  

### 🧱 Recommended Component  
`Stepper`

### ✨ Guided Default (Gold Standard)
```tsx
<Stepper activeStep={currentStep}>
  <Stepper.Step label="Select Data" />
  <Stepper.Step label="Review Changes" />
  <Stepper.Step label="Confirm" />
</Stepper>
```

### 🎨 Figma Reference  
`Figma › Pebble / Flows / Stepper`

### 🧾 YAML Summary
```yaml
id: multi-step-wizard-stepper
name: Multi-step flow with progress stepper
recommended_component: Stepper
confidence: 0.82
```

---

# Pebble Pathway: Page-Level Notice Banner
**Platform:** Web + Mobile  
**Category:** Feedback & Alerts  

### 🧱 Recommended Component  
`Notice` / `Banner`

### ✨ Guided Default (Gold Standard)
```tsx
<Notice.Warning
  description={t('trialEndsSoon')}
  actions={[{ label: t('upgrade'), onClick: handleUpgrade }]}
/>
```

### 🎨 Figma Reference  
`Figma › Pebble / Feedback / Notices`

### 🧾 YAML Summary
```yaml
id: page-level-notice-banner
name: Page-level informational banner
recommended_component: Notice / Banner
confidence: 0.86
```

---

# Pebble Pathway: Primary–Secondary Button Hierarchy
**Platform:** Web + Mobile  
**Category:** Actions & Hierarchy  

### 🧱 Recommended Component  
`Button`

### ✨ Guided Default (Gold Standard)
```tsx
<Modal.Footer>
  <Button appearance="outline">{t('cancel')}</Button>
  <Button appearance="destructive">{t('delete')}</Button>
</Modal.Footer>
```

### 🎨 Figma Reference  
`Figma › Pebble / Components / Buttons`

### 🧾 YAML Summary
```yaml
id: primary-secondary-button-hierarchy
name: Button hierarchy (primary/secondary/destructive)
recommended_component: Button
confidence: 0.90
```
