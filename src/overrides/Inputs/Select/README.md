# Select Component Override

## Created: 2025-11-02

## Reason
Add animations to Select component - rotating caret and dropdown fade+scale animation

## Modified Files
- `SelectControl/SelectControl.tsx` - Added rotating caret using ToggleableArrow
- `SelectMenu/SelectMenu.tsx` - Added dropdown fade+scale entrance animation

## Changes Made

### Animated Caret Rotation
In `SelectControl/SelectControl.tsx`, replaced the static Icon with ToggleableArrow:
- Import: `import ToggleableArrow from '@rippling/pebble/Atoms/ToggleableArrow'`
- In `renderCollapseIcon()` function, replaced `Icon` with `ToggleableArrow`
- `isArrowDown={!isMenuOpen}` - rotates based on menu state
- `arrowDownColor={pebbleTheme.colorOnSurfaceVariant}` - default state
- `arrowUpColor={pebbleTheme.colorPrimary}` - active state
- All other imports updated to use `@rippling/pebble` package paths instead of relative imports

### Dropdown Fade + Scale Animation
In `SelectMenu/SelectMenu.tsx`, added entrance animation:
- Imported emotion: `import styled from '@emotion/styled'` and `import { keyframes } from '@emotion/react'`
- Defined animation constants (DURATION, EASING, SCALE)
- Created `fadeScaleIn` keyframe animation
- Created `AnimatedDropBox` styled component wrapping `MenuList.DropBox`
- Applied animation: `animation: ${fadeScaleIn} ${DURATION.fast} ${EASING.easeOut}`
- Set `transform-origin: top center` for proper scaling
- All other imports updated to use `@rippling/pebble` package paths instead of relative imports

## Important Notes
- Only the two modified files are kept in overrides/
- All helper files, types, and styles fall back to Pebble source via Vite aliases
- All imports within override files use `@rippling/pebble` package paths
- This approach minimizes maintenance burden while allowing targeted customizations

## Testing
Test in Override System Test demo (http://localhost:4202):
1. Click select to open dropdown - should see fade+scale animation
2. Caret should rotate when dropdown opens
3. Caret color should change to primary when active
