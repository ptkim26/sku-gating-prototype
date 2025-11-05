# Design Tokens

**The building blocks of Pebble's visual language**

---

## What Are Design Tokens?

Design tokens are the **atomic design decisions** of Pebble—the named values for colors, typography, spacing, and more that ensure consistency across all Rippling products.

**Instead of:**
```tsx
<div style={{ color: '#6D163C', padding: '16px', fontSize: '14px' }}>
```

**Use tokens:**
```tsx
<div style={{ 
  color: theme.colorPrimary, 
  padding: theme.space400, 
  fontSize: theme.typestyleBodyMedium400.fontSize 
}}>
```

---

## Why Design Tokens?

### ✅ Benefits

| Benefit | Example |
|---------|---------|
| **Consistency** | All buttons use the same `colorPrimary` |
| **Themeable** | Switch light/dark theme instantly |
| **Maintainable** | Change `colorPrimary` once, updates everywhere |
| **Accessible** | Tokens ensure WCAG contrast ratios |
| **Scalable** | Add new themes without rewriting components |

### ❌ Without Tokens

- Hardcoded colors break in dark mode
- Typography sizes inconsistent across features
- Spacing values are arbitrary (#15px, #17px, #18px...)
- Theming requires find-and-replace
- Accessibility violations slip through

---

## Token Categories

```
Design Tokens
│
├── Colors                 ← Brand, semantic, surfaces
├── Typography             ← Font scales, weights, line-heights
├── Spacing                ← Padding, margins, gaps
├── Sizing                 ← Component dimensions, icons
├── Shape                  ← Border radius, border widths
├── Shadow                 ← Elevation levels
├── Motion                 ← Animation durations, easings
└── Opacity                ← Transparency levels
```

---

## Documentation in This Folder

### 🎨 [Colors](./colors.md)
**What:** Complete color system including semantic colors  
**When to use:** Choosing background, text, border, or accent colors  
**Example tokens:** `colorPrimary`, `colorOnSurface`, `colorSuccess`

**Topics Covered:**
- Brand colors (Primary, Secondary, Tertiary)
- Surface colors (Surface, SurfaceBright, SurfaceDim)
- Semantic colors (Success, Error, Warning, Info)
- "On" colors (OnPrimary, OnSurface) for text/icons
- Container colors (lighter backgrounds for semantic states)

### ✍️ [Typography](./typography.md)
**What:** Text styles for all use cases  
**When to use:** Setting any text appearance  
**Example tokens:** `typestyleDisplayLarge600`, `typestyleBodyMedium400`

**Topics Covered:**
- Display styles (largest headings)
- Title styles (section headers)
- Body styles (paragraphs, content)
- Label styles (UI labels, buttons, tabs)
- When to use each style

### 📐 [Spacing](./spacing.md)
**What:** Consistent spacing scale  
**When to use:** Setting padding, margins, gaps  
**Example tokens:** `space200`, `space400`, `space800`

**Topics Covered:**
- Spacing scale (100 to 9600)
- When to use each size
- Sizing tokens for components

### 🎭 [Semantic Colors](./semantic-colors.md)
**What:** Deep dive into semantic color system  
**When to use:** Showing success, errors, warnings, info  
**Example tokens:** `colorSuccessContainer`, `colorOnSuccessContainer`

**Topics Covered:**
- Container vs base colors
- "On" colors for text
- How they're used in components (SnackBar, Notice, Input validation)
- Contrast guidelines

---

## Token Naming Convention

### Structure

```
{category}{variant}{state}
```

**Examples:**
- `colorPrimary` - Base primary color
- `colorPrimaryHover` - Primary color on hover
- `colorOnPrimary` - Text color for primary backgrounds
- `typestyleBodyMedium400` - Body text, medium size, 400 weight
- `space400` - Spacing unit (16px)

### Color Naming

| Pattern | Meaning | Example |
|---------|---------|---------|
| `color{Name}` | Base color | `colorPrimary` |
| `colorOn{Name}` | Text/icon color for {Name} background | `colorOnPrimary` |
| `color{Name}Container` | Lighter container background | `colorSuccessContainer` |
| `colorOn{Name}Container` | Text color for container | `colorOnSuccessContainer` |
| `color{Name}Hover` | Hover state | `colorPrimaryHover` |
| `color{Name}Pressed` | Pressed/active state | `colorPrimaryPressed` |

### Typography Naming

| Pattern | Meaning | Example |
|---------|---------|---------|
| `typestyle{Category}{Size}{Weight}` | Text style | `typestyleBodyMedium400` |

**Categories:**
- `Display` - Largest headings (hero text)
- `Title` - Section headings
- `Heading` - Subsection headings  
- `Body` - Paragraph text
- `Label` - UI labels, buttons, form labels

**Sizes:**
- `ExtraLarge`, `Large`, `Medium`, `Small`, `ExtraSmall`

**Weights:**
- `400` - Regular
- `500` - Medium
- `600` - Semi-bold
- `700` - Bold

### Spacing Naming

| Pattern | Value | Common Use |
|---------|-------|------------|
| `space100` | 4px | Minimal gap |
| `space200` | 8px | Tight spacing |
| `space400` | 16px | Default spacing |
| `space600` | 24px | Comfortable spacing |
| `space800` | 32px | Section spacing |

---

## How to Access Tokens

### In React Components

```tsx
import { useTheme } from '@rippling/pebble/theme';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      color: theme.colorOnSurface,
      backgroundColor: theme.colorSurface,
      padding: theme.space400,
      borderRadius: theme.shapeCornerM,
    }}>
      Content
    </div>
  );
};
```

### In Styled Components

```tsx
import styled from '@emotion/styled';

const Container = styled.div`
  color: ${({ theme }) => theme.colorOnSurface};
  background-color: ${({ theme }) => theme.colorSurface};
  padding: ${({ theme }) => theme.space400};
  border-radius: ${({ theme }) => theme.shapeCornerM};
`;
```

### Typography Tokens

```tsx
import styled from '@emotion/styled';

const Heading = styled.h1`
  ${({ theme }) => theme.typestyleDisplayLarge600};
  color: ${({ theme }) => theme.colorOnSurface};
`;

// Typography tokens include fontSize, lineHeight, fontWeight, etc.
```

---

## Token Themes

Pebble supports multiple themes:

### Berry Theme (Current)

**Berry Light** - Default light theme
```tsx
defaultTheme="berry-light"
```

**Berry Dark** - Dark theme variant
```tsx
defaultTheme="berry-dark"
```

### Plum Theme (Legacy)

**Light** - Legacy light theme  
**Dark** - Legacy dark theme

**Note:** New projects should use Berry themes. Plum is maintained for backward compatibility.

---

## Token Sizes

Tokens come in two sizes:

### Large Tokens (Default)
- **Screen:** Desktop, tablet
- **Use case:** Most web applications
- **Import:** Automatically used by theme

### Small Tokens
- **Screen:** Mobile, compact UIs
- **Use case:** React Native, mobile-first web
- **Import:** Requires explicit configuration

---

## Interactive Token Reference

**See tokens in action:** Navigate to the Design Tokens demo in the playground:

```
http://localhost:4201/ → Switch to "Design Tokens" demo
```

**Features:**
- **Color Tab** - All color tokens with visual swatches
- **Typography Tab** - All typography tokens rendered live
- **Click to copy** - Copy token names to clipboard

---

## Best Practices

### ✅ DO

```tsx
// Use semantic tokens
<Button style={{ backgroundColor: theme.colorPrimary }} />

// Use spacing scale
<div style={{ padding: theme.space400, marginBottom: theme.space600 }} />

// Use typography tokens
<Text style={theme.typestyleBodyMedium400}>Content</Text>

// Use "on" colors for text
<div style={{ 
  backgroundColor: theme.colorPrimary,
  color: theme.colorOnPrimary  // ✅ Correct contrast
}}>
```

### ❌ DON'T

```tsx
// Don't hardcode colors
<Button style={{ backgroundColor: '#6D163C' }} />

// Don't use arbitrary spacing
<div style={{ padding: '15px', marginBottom: '23px' }} />

// Don't hardcode typography
<Text style={{ fontSize: '14px', lineHeight: '20px' }}>Content</Text>

// Don't use wrong "on" colors
<div style={{ 
  backgroundColor: theme.colorPrimary,
  color: theme.colorOnSurface  // ❌ Poor contrast
}}>
```

---

## Token Guidelines by Use Case

### Backgrounds

| Use Case | Token |
|----------|-------|
| Page background | `colorSurface` |
| Elevated card | `colorSurfaceBright` |
| Subtle container | `colorSurfaceContainer` |
| Inverted section | `colorInverseSurface` |
| Primary action | `colorPrimary` |

### Text

| Use Case | Token |
|----------|-------|
| Body text | `colorOnSurface` |
| Secondary text | `colorOnSurfaceVariant` |
| Text on primary | `colorOnPrimary` |
| Disabled text | `colorDisabled` |
| Error text | `colorError` |

### Borders

| Use Case | Token |
|----------|-------|
| Default border | `colorOutline` |
| Subtle border | `colorOutlineVariant` |
| Focus ring | `colorOutlineFocus` |
| Error border | `colorOutlineInvalid` |

---

## Token Reference Tools

### Design Tools
- **Figma:** Pebble Design System library includes all tokens
- **Token Studio Plugin:** Sync tokens between Figma and code

### Development
- **Storybook:** [pebble.rippling.dev](https://pebble.rippling.dev) - Browse all tokens
- **Playground:** Interactive token viewer (this playground!)
- **TypeScript:** All tokens are typed for autocomplete

---

## Token Updates

### How Tokens Are Generated

1. **Design team defines tokens** in Figma (Token Studio)
2. **Tokens export to JSON** (source of truth)
3. **Build process generates code** (`@rippling/pebble-tokens` package)
4. **Published to npm** for consumption

### Documentation is Auto-Generated ⚡

**This documentation is automatically generated from `@rippling/pebble-tokens`** to ensure it's always in sync with the actual tokens.

**To regenerate after token updates:**

```bash
# 1. Update pebble-tokens to latest
yarn upgrade @rippling/pebble-tokens

# 2. Regenerate documentation
yarn generate-token-docs

# 3. Review and commit
git add docs/guides/tokens/
git commit -m "docs: update token documentation"
```

**What gets generated:**
- ✅ `colors.md` - All 214 color tokens with swatches
- ✅ `typography.md` - All 44 typography tokens with specs
- ✅ `spacing.md` - All 100 spacing/sizing tokens

**Benefits:**
- Always accurate (derived from actual code)
- No manual maintenance required
- Includes ALL tokens (not just documented ones)
- Re-run anytime tokens update

**Token versions:** Tokens follow semantic versioning. Breaking changes (renamed tokens) = major version bump.

---

## Related Documentation

- **[Colors](./colors.md)** - Complete color system guide
- **[Typography](./typography.md)** - Typography scale and usage
- **[Spacing](./spacing.md)** - Spacing and sizing tokens
- **[Semantic Colors](./semantic-colors.md)** - Semantic color deep dive
- **[Building Blocks - Responsive Strategy](../building-blocks/responsive-strategy.md)** - How tokens adapt to screen sizes
- **[Components](../components/)** - How tokens are used in components

---

## Questions & Feedback

**Token questions?**
- **Slack:** #pebble-design-system
- **Storybook:** [pebble.rippling.dev](https://pebble.rippling.dev)
- **Figma:** Pebble Design System library

**Missing a token?**
- Check if existing token covers your use case
- If not, request new token in #pebble-design-system
- Design team will evaluate for addition

---

**Last Updated:** November 3, 2025  
**Package:** `@rippling/pebble-tokens`  
**Current Version:** Check `package.json` for installed version

