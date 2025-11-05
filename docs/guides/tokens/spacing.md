# Spacing & Sizing Tokens

**Complete spacing and sizing reference**

> ⚡ **Auto-generated from `@rippling/pebble-tokens`**  
> Last generated: 11/3/2025, 7:03:19 PM

---

## Spacing Tokens (41 tokens)

Consistent spacing scale for padding, margins, and gaps.

### Spacing Scale

| Token | Value | Common Use |
|-------|-------|------------|
| `space0` | 0px | Spacing token |
| `space100` | 4px | Minimal gap, icon padding |
| `space1000` | 40px | Spacing token |
| `space1100` | 44px | Spacing token |
| `space1200` | 48px | Large section gap |
| `space125` | 5px | Spacing token |
| `space1400` | 56px | Spacing token |
| `space150` | 6px | Spacing token |
| `space1600` | 64px | Spacing token |
| `space175` | 7px | Spacing token |
| `space200` | 8px | Tight spacing, list items |
| `space2000` | 80px | Spacing token |
| `space225` | 9px | Spacing token |
| `space2400` | 96px | Spacing token |
| `space25` | 1px | Spacing token |
| `space250` | 10px | Spacing token |
| `space275` | 11px | Spacing token |
| `space2800` | 112px | Spacing token |
| `space300` | 12px | Spacing token |
| `space3200` | 128px | Spacing token |


*...and 21 more spacing tokens*


### Spacing Guidelines

**Small (100-200):** Tight spacing within components  
**Medium (400-600):** Default spacing between elements  
**Large (800-1200):** Section spacing, page padding

**Usage Examples:**
```tsx
// Padding
<div style={{ padding: theme.space400 }}>

// Margin
<div style={{ marginBottom: theme.space600 }}>

// Gap in flexbox
<div style={{ display: 'flex', gap: theme.space400 }}>
```

---

## Sizing Tokens (59 tokens)

Component dimensions and icon sizes.

### Common Sizes

| Token | Value | Common Use |
|-------|-------|------------|
| `size0` | 0px | Component sizing |
| `size100` | 4px | Component sizing |
| `size1000` | 40px | Component sizing |
| `size1100` | 44px | Component sizing |
| `size11200` | 448px | Component sizing |
| `size1200` | 48px | Component sizing |
| `size125` | 5px | Component sizing |
| `size12800` | 512px | Component sizing |
| `size1400` | 56px | Component sizing |
| `size14400` | 576px | Component sizing |
| `size150` | 6px | Component sizing |
| `size1600` | 64px | Component sizing |
| `size175` | 7px | Component sizing |
| `size19200` | 768px | Component sizing |
| `size200` | 8px | Component sizing |
| `size2000` | 80px | Component sizing |
| `size225` | 9px | Component sizing |
| `size2400` | 96px | Component sizing |
| `size25` | 1px | Component sizing |
| `size250` | 10px | Component sizing |


*...and 39 more sizing tokens*


---

## Icon Sizes

Specific tokens for icon dimensions:

| Token | Size | Use Case |
|-------|------|----------|
| `sizeIcon3xs` | 12px | Smallest icons |
| `sizeIconXs` | 16px | Small icons |
| `sizeIconSm` | 20px | Default icons |
| `sizeIconMd` | 24px | Medium icons |
| `sizeIconLg` | 32px | Large icons |
| `sizeIconXl` | 40px | Extra large icons |

---

## Quick Reference

| Use Case | Spacing Token |
|----------|---------------|
| Minimal gap | `space100` (4px) |
| Tight spacing | `space200` (8px) |
| Default spacing | `space400` (16px) |
| Comfortable spacing | `space600` (24px) |
| Section spacing | `space800` (32px) |
| Large section gap | `space1200` (48px) |

---

## Related Documentation

- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive token browser

---

**Total Tokens:** 100  
**Source:** `@rippling/pebble-tokens/large/esm/berry-light`
