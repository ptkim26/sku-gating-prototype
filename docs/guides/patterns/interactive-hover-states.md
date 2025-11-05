# Interactive Hover States

**Pattern for implementing consistent hover, active, and focus states across interactive UI elements**

---

## Overview

Pebble uses a sophisticated color blending system for interactive states that automatically adapts to light/dark themes and ensures proper contrast. This pattern is based on how Pebble's Button component handles state changes.

---

## The Pattern

### Core Principle

**Use `getStateColor()` helper** instead of hardcoded colors or opacity changes. This function intelligently blends overlay colors based on luminance to create consistent, accessible hover states.

### Implementation

```typescript
import styled from '@emotion/styled';
import { useTheme, getStateColor } from '@rippling/pebble/theme';

const InteractiveElement = styled.button`
  background-color: ${({ theme }) => theme.colorSurfaceBright};
  color: ${({ theme }) => theme.colorOnSurface};
  cursor: pointer;
  transition: all 0.1s ease-in-out 0s;
  
  &:hover {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurfaceBright, 'hover')
    };
  }
  
  &:active {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurfaceBright, 'active')
    };
  }
  
  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurfaceBright, 'disabled')
    };
  }
`;
```

---

## How `getStateColor()` Works

The `getStateColor(color, state)` function:

1. **Parses the base color** - Determines luminance
2. **Selects overlay color** - Uses `colorHover`, `colorPressed`, `colorDisabledSurface` tokens
3. **Blends intelligently** - Applies light or dark overlay based on luminance
4. **Adapts to theme** - Automatically handles light/dark mode switches

### Available States

| State | Token Used | Use Case |
|-------|-----------|----------|
| `'hover'` | `colorHover` | Mouse hover state |
| `'active'` | `colorPressed` | Click/press state |
| `'disabled'` | `colorDisabledSurface` | Disabled state background |
| `'onDisabled'` | `colorOnDisabledSurface` | Text on disabled background |

---

## Transition Timing

**Standard:** `all 0.1s ease-in-out 0s`

This is the consistent timing used across Pebble components for state transitions.

```typescript
transition: all 0.1s ease-in-out 0s;
```

---

## Common Patterns

### 1. Icon Buttons (Ghost Appearance)

```typescript
// Button.Icon automatically handles this
<Button.Icon
  icon={Icon.TYPES.HELP_OUTLINE}
  aria-label="Help"
  tip="Get help and support"
  appearance={Button.APPEARANCES.GHOST}
  size={Button.SIZES.M}
/>
```

**Behavior:**
- Default: Transparent background
- Hover: Subtle background appears
- Active: Slightly darker background

### 2. Navigation Items

```typescript
const NavItem = styled.button`
  background: none;
  padding: ${({ theme }) => theme.space200};
  border-radius: ${({ theme }) => theme.shapeCornerL};
  cursor: pointer;
  transition: all 0.1s ease-in-out 0s;
  
  &:hover {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurface, 'hover')
    };
  }
  
  &:active {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurface, 'active')
    };
  }
`;
```

### 3. Profile/Avatar Sections

```typescript
const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space200};
  border-radius: ${({ theme }) => theme.shapeCornerL};
  cursor: pointer;
  transition: all 0.1s ease-in-out 0s;
  
  &:hover {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurfaceBright, 'hover')
    };
  }
  
  &:active {
    background-color: ${({ theme }) => 
      getStateColor(theme.colorSurfaceBright, 'active')
    };
  }
`;
```

---

## Best Practices

### ✅ Do

- **Always use `getStateColor()`** for interactive state changes
- **Use consistent transition timing** (0.1s ease-in-out)
- **Add `cursor: pointer`** to indicate interactivity
- **Apply border-radius** with theme tokens for visual polish
- **Include all three states** when appropriate: hover, active, disabled

### ❌ Don't

- **Don't use opacity** for hover states (e.g., `opacity: 0.9`)
- **Don't hardcode colors** for hover/active states
- **Don't use different transition timings** without good reason
- **Don't forget disabled states** for form elements
- **Don't apply hover to non-interactive elements**

---

## Accessibility Requirements

### Icon Buttons Specifically

From `docs/guides/components/buttons/icon-button.md`:

1. **Tips (Tooltips) are required** - Must clearly explain the function
2. **aria-label is required** - Describe the action, not the icon
3. **Keyboard navigation** - Tab to focus, Space/Enter to activate

```typescript
<Button.Icon
  icon={Icon.TYPES.HELP_OUTLINE}
  aria-label="Help"              // ✅ Required
  tip="Get help and support"      // ✅ Required
  appearance={Button.APPEARANCES.GHOST}
  size={Button.SIZES.M}
/>
```

---

## Examples from the Codebase

### App Shell Top Nav Icons

See `src/demos/app-shell-demo.tsx` for complete implementation of:
- Icon buttons with tips
- Profile section with hover states
- Logo with interactive states
- All using `getStateColor()` pattern

---

## Related Documentation

- [Icon Button Component](../components/buttons/icon-button.md)
- [Button Component](../components/buttons/button.md)
- [Color Tokens](../tokens/colors.md)
- [Spacing Tokens](../tokens/spacing.md)


