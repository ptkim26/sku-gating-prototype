
# Pebble Pathway — Inline Form Validation (Cross-Platform)

## Scenario
Inline form validation provides immediate, contextual feedback when users enter or modify information. 
It helps users fix issues without breaking flow — supporting quick correction, higher completion rates, 
and lower error friction. This pathway codifies shared guidance for both Web and Mobile experiences under Pebble.

## When to Use
Use when fields have clear, local validation logic such as required fields, format rules (e.g. email, phone), 
or minimum/maximum length. Inline validation should clarify how to fix errors while maintaining momentum.

## When Not to Use
Avoid when validation requires cross-field logic (e.g., "End date after start date"), depends on server responses 
that may flicker, or would interrupt user flow. Use a page-level Notice or submit-time summary instead.

## Recommended Components
- **Web:** `Form.Input.Text` / `TextField`
- **Mobile:** `FormField` + `HelperText`
- **Shared:** Label, FieldMessage, CharacterCounter (optional), Icon (optional)

## Guided Default Props

| Aspect | Web Default | Mobile Default |
|--------|--------------|----------------|
| **Primary Component** | `<Form.Input.Text>` / `<TextField>` | `<FormField>` + `<HelperText>` |
| **Validation Trigger** | `onBlur` + `onSubmit` | `onBlur` or explicit `validate()` on submit |
| **Key Props** | `isRequired`, `validationError`, `isInvalid` | `error`, `errorMessage`, `helperText` |
| **Feedback Timing** | On blur; revalidate on input if errored | On submit or after first blur |
| **Message Placement** | Below field (1–2 lines) | HelperText below field |

## Accessibility
- Use `aria-invalid="true"` when field is in error state.  
- Tie helper or error text to field via `aria-describedby`.  
- Maintain **4.5:1** contrast for text and **3:1** for borders.  
- Avoid announcing errors on every keystroke; re-announce on blur or submit.  
- On submit, focus moves to first errored field.  
- **Mobile:** Ensure helper text is announced once by screen readers.

## Checklist
- [ ] Messages are concise (<90 chars) and instructive.  
- [ ] Validation triggers on blur or submit by default.  
- [ ] Inline messages don’t block typing.  
- [ ] Revalidation occurs only after user edits.  
- [ ] Screen readers announce linked message text.  
- [ ] Focus lands on first invalid field after submit.  
- [ ] Async checks show clear "checking…" states.

## Do’s and Don’ts

**Do**
- ✅ Validate on blur or submit, not every keystroke.  
- ✅ Keep copy actionable (“Enter a valid email”).  
- ✅ Provide helpful examples (“Use 8+ characters with a number or symbol”).  
- ✅ Pair color with icon or text cue.  

**Don’t**
- 🚫 Show multiple conflicting messages.  
- 🚫 Overvalidate mid-typing.  
- 🚫 Use vague terms like “Invalid input.”  

## Visuals
Each validated field shows a message row directly below the input, with optional icon and counter.  

**Spacing**
- Field → Message: `spacing.150`  
- Icon → Text: `spacing.100`  

**Semantic Colors**
- Error: `color.field.border-error` + `icon.error`  
- Warning: `color.field.border-warning`  
- Success: `color.field.border-success` (use sparingly)  
- Info: `color.text.muted`  

## Developer Notes

**Web Example**
```tsx
<Form.Input.Text
  name="email"
  title="Email"
  isRequired
  validations={{ matchRegexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
  validationError="Enter a valid email like name@company.com."
  helperText="We’ll send confirmation here"
/>
```

**Mobile Example**
```tsx
<FormField error={hasError}>
  <Input value={value} />
  <HelperText error>{errorMessage}</HelperText>
</FormField>
```

## Figma Reference
Include in Pebble kit:
- Field + Message variants: `Error | Warning | Info | Success`  
- Auto layout preset: Field → Message (`spacing.150`)  
- Character counter (auto when `maxLength` present)  
- Semantic color + icon tokens  
- Cross-platform examples with same spacing rhythm  

## Outcome
Adopting guided defaults for inline validation improves clarity and confidence across platforms:
- **20–40% faster form completion**
- **30–50% fewer submit errors**
- **Consistent tone and spacing across product surfaces**

Inline validation ensures Pebble forms feel **responsive, trustworthy, and human.**
