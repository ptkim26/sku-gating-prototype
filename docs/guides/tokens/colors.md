# Color Tokens

**Complete color system reference**

> ⚡ **Auto-generated from `@rippling/pebble-tokens`**  
> Last generated: 11/3/2025, 7:03:19 PM

---

## Overview

Pebble's color system uses **semantic naming** to ensure consistency and accessibility across all Rippling products.

**Key Concepts:**
- **Brand Colors** - Primary, Secondary, Tertiary
- **Surface Colors** - Backgrounds and containers
- **Semantic Colors** - Success, Error, Warning, Info
- **"On" Colors** - Text/icons for specific backgrounds
- **Container Colors** - Muted backgrounds for semantic states
- **State Colors** - Hover, pressed, focus, disabled variants

---

## Color Categories

### Brand Colors (9 tokens)

Primary brand colors used for main actions and brand identity.

| Token | Value | Description |
|-------|-------|-------------|
| `colorPrimary` | <code style="background: #7a005d; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#7a005d</code> | Main brand color for primary actions |
| `colorPrimaryContainer` | <code style="background: #7a005d; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#7a005d</code> | Color token |
| `colorPrimaryVariant` | <code style="background: #f0d0f5; color: #000000; padding: 2px 8px; border-radius: 4px;">#f0d0f5</code> | Variant of primary color |
| `colorSecondary` | <code style="background: #ffa81d; color: #000000; padding: 2px 8px; border-radius: 4px;">#ffa81d</code> | Secondary accent color |
| `colorSecondaryContainer` | <code style="background: #ffa81d; color: #000000; padding: 2px 8px; border-radius: 4px;">#ffa81d</code> | Color token |
| `colorSecondaryVariant` | <code style="background: #ffe0ad; color: #000000; padding: 2px 8px; border-radius: 4px;">#ffe0ad</code> | Variant of secondary color |
| `colorTertiary` | <code style="background: #1e4aa9; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#1e4aa9</code> | Tertiary accent color |
| `colorTertiaryContainer` | <code style="background: #1e4aa9; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#1e4aa9</code> | Color token |
| `colorTertiaryVariant` | <code style="background: #b9dbf3; color: #000000; padding: 2px 8px; border-radius: 4px;">#b9dbf3</code> | Color token |

**Usage Examples:**
```tsx
// Primary button
<Button style={{ backgroundColor: theme.colorPrimary }}>
  Save
</Button>

// Primary text
<Text style={{ color: theme.colorPrimary }}>
  Learn more
</Text>
```

---

### Surface Colors (17 tokens)

Background colors for different UI surfaces and elevations.

| Token | Value | Description |
|-------|-------|-------------|
| `colorSurface` | <code style="background: #f9f7f6; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#f9f7f6</code> | Default surface background |
| `colorSurfaceBright` | <code style="background: #ffffff; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#ffffff</code> | Elevated surface (cards, modals) |
| `colorSurfaceBrightHover` | <code style="background: #e3e3e3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e3e3e3</code> | Color token |
| `colorSurfaceBrightPressed` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#d3d3d3</code> | Color token |
| `colorSurfaceContainer` | <code style="background: #edebe7; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#edebe7</code> | Color token |
| `colorSurfaceContainerHigh` | <code style="background: #e6e4e1; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e6e4e1</code> | Color token |
| `colorSurfaceContainerHighest` | <code style="background: #e0dedb; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e0dedb</code> | Color token |
| `colorSurfaceContainerHover` | <code style="background: #e3e3e3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e3e3e3</code> | Color token |
| `colorSurfaceContainerLow` | <code style="background: #f3f1ee; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#f3f1ee</code> | Color token |
| `colorSurfaceContainerLowest` | <code style="background: #ffffff; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#ffffff</code> | Color token |
| `colorSurfaceContainerPressed` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#d3d3d3</code> | Color token |
| `colorSurfaceDim` | <code style="background: #e1d8d2; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e1d8d2</code> | Subtle background |
| `colorSurfaceDimHover` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#d3d3d3</code> | Color token |
| `colorSurfaceDimPressed` | <code style="background: #a3a3a5; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#a3a3a5</code> | Color token |
| `colorSurfaceHover` | <code style="background: #e3e3e3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#e3e3e3</code> | Color token |
| `colorSurfaceInverse` | <code style="background: #202022; color: #FFFFFF; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#202022</code> | Color token |
| `colorSurfacePressed` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#d3d3d3</code> | Color token |

**Usage Examples:**
```tsx
// Page background
<div style={{ backgroundColor: theme.colorSurface }}>

// Elevated card
<Card style={{ backgroundColor: theme.colorSurfaceBright }}>

// Subtle container
<Container style={{ backgroundColor: theme.colorSurfaceDim }}>
```

---

### Semantic Colors (24 tokens)

Status colors for success, error, warning, and info states.

#### Base Semantic Colors

| Token | Value | Description |
|-------|-------|-------------|
| `colorError` | <code style="background: #bc2c00; color: white; padding: 2px 8px; border-radius: 4px;">#bc2c00</code> | Error state (icons, borders) |
| `colorErrorHover` | <code style="background: #d55744; color: white; padding: 2px 8px; border-radius: 4px;">#d55744</code> | Color token |
| `colorErrorPressed` | <code style="background: #df7b6c; color: white; padding: 2px 8px; border-radius: 4px;">#df7b6c</code> | Color token |
| `colorInfo` | <code style="background: #1e4aa9; color: white; padding: 2px 8px; border-radius: 4px;">#1e4aa9</code> | Info state (icons, borders) |
| `colorInfoHover` | <code style="background: #6080b8; color: white; padding: 2px 8px; border-radius: 4px;">#6080b8</code> | Color token |
| `colorInfoPressed` | <code style="background: #839cc9; color: white; padding: 2px 8px; border-radius: 4px;">#839cc9</code> | Color token |
| `colorSuccess` | <code style="background: #0c674d; color: white; padding: 2px 8px; border-radius: 4px;">#0c674d</code> | Success state (icons, borders) |
| `colorSuccessHover` | <code style="background: #2ebdb4; color: white; padding: 2px 8px; border-radius: 4px;">#2ebdb4</code> | Color token |
| `colorSuccessPressed` | <code style="background: #47d7ce; color: white; padding: 2px 8px; border-radius: 4px;">#47d7ce</code> | Color token |
| `colorWarning` | <code style="background: #ffa44d; color: white; padding: 2px 8px; border-radius: 4px;">#ffa44d</code> | Warning state (icons, borders) |
| `colorWarningHover` | <code style="background: #fdb71c; color: white; padding: 2px 8px; border-radius: 4px;">#fdb71c</code> | Color token |
| `colorWarningPressed` | <code style="background: #fdc74c; color: white; padding: 2px 8px; border-radius: 4px;">#fdc74c</code> | Color token |

#### Container Semantic Colors (Backgrounds)

| Token | Value | Description |
|-------|-------|-------------|
| `colorErrorContainer` | <code style="background: #f9dad1; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#f9dad1</code> | Error message background |
| `colorErrorContainerHover` | <code style="background: #eaa196; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#eaa196</code> | Color token |
| `colorErrorContainerPressed` | <code style="background: #df7b6c; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#df7b6c</code> | Color token |
| `colorInfoContainer` | <code style="background: #b9dbf3; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#b9dbf3</code> | Info message background |
| `colorInfoContainerHover` | <code style="background: #a5b8db; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#a5b8db</code> | Color token |
| `colorInfoContainerPressed` | <code style="background: #839cc9; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#839cc9</code> | Color token |
| `colorSuccessContainer` | <code style="background: #bae5d9; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#bae5d9</code> | Success message background |
| `colorSuccessContainerHover` | <code style="background: #94e9e4; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#94e9e4</code> | Color token |
| `colorSuccessContainerPressed` | <code style="background: #6ce0d9; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#6ce0d9</code> | Color token |
| `colorWarningContainer` | <code style="background: #fbe0b5; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#fbe0b5</code> | Warning message background |
| `colorWarningContainerHover` | <code style="background: #ffd77e; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#ffd77e</code> | Color token |
| `colorWarningContainerPressed` | <code style="background: #fdc74c; color: #000000; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">#fdc74c</code> | Color token |

#### "On" Semantic Colors (Text)

| Token | Value | Description |
|-------|-------|-------------|
| `colorOnError` | <code style="background: #ffffff; color: #000000; padding: 2px 8px; border-radius: 4px;">#ffffff</code> | Color token |
| `colorOnErrorContainer` | <code style="background: #41120b; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#41120b</code> | Text on error background |
| `colorOnErrorContainerHover` | <code style="background: #692116; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#692116</code> | Color token |
| `colorOnInfo` | <code style="background: #ffffff; color: #000000; padding: 2px 8px; border-radius: 4px;">#ffffff</code> | Color token |
| `colorOnInfoContainer` | <code style="background: #05142e; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#05142e</code> | Text on info background |
| `colorOnInfoContainerHover` | <code style="background: #25395a; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#25395a</code> | Color token |
| `colorOnSuccess` | <code style="background: #e0fcfa; color: #000000; padding: 2px 8px; border-radius: 4px;">#e0fcfa</code> | Color token |
| `colorOnSuccessContainer` | <code style="background: #002010; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#002010</code> | Text on success background |
| `colorOnSuccessContainerHover` | <code style="background: #106964; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#106964</code> | Color token |
| `colorOnWarning` | <code style="background: #382600; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#382600</code> | Color token |
| `colorOnWarningContainer` | <code style="background: #431a00; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#431a00</code> | Text on warning background |
| `colorOnWarningContainerHover` | <code style="background: #92670a; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#92670a</code> | Color token |

**Usage Pattern:**
```tsx
// Success message
<Notice style={{
  backgroundColor: theme.colorSuccessContainer,
  color: theme.colorOnSuccessContainer,
  borderLeft: `4px solid ${theme.colorSuccess}`
}}>
  <Icon color={theme.colorSuccess} />
  Success! Your changes were saved.
</Notice>
```

**See also:** [Semantic Colors Deep Dive](./semantic-colors.md)

---

### Border & Outline Colors (10 tokens)

Colors for borders, dividers, and focus outlines.

| Token | Value | Description |
|-------|-------|-------------|
| `colorOutline` | <code style="background: rgba(0,0,0,0.2); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.2)</code> | Standard borders |
| `colorOutlineFocus` | <code style="background: #5aa5e7; color: #000000; padding: 2px 8px; border-radius: 4px;">#5aa5e7</code> | Focus rings |
| `colorOutlineHover` | <code style="background: #a3a3a5; color: #000000; padding: 2px 8px; border-radius: 4px;">#a3a3a5</code> | Color token |
| `colorOutlineInvalid` | <code style="background: #f3c7ba; color: #000000; padding: 2px 8px; border-radius: 4px;">#f3c7ba</code> | Error/invalid borders |
| `colorOutlineInverse` | <code style="background: rgba(255,255,255,0.3); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(255,255,255,0.3)</code> | Color token |
| `colorOutlinePressed` | <code style="background: #88888b; color: #000000; padding: 2px 8px; border-radius: 4px;">#88888b</code> | Color token |
| `colorOutlineVariant` | <code style="background: rgba(0,0,0,0.1); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.1)</code> | Subtle borders |
| `colorOutlineVariantHover` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px;">#d3d3d3</code> | Color token |
| `colorOutlineVariantInverse` | <code style="background: rgba(255,255,255,0.2); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(255,255,255,0.2)</code> | Color token |
| `colorOutlineVariantPressed` | <code style="background: #a3a3a5; color: #000000; padding: 2px 8px; border-radius: 4px;">#a3a3a5</code> | Color token |

---

### State Colors (Hover, Pressed, etc.)

**Note:** 17 state variant tokens available.

State colors follow the pattern: `{base}Hover`, `{base}Pressed`, `{base}Focus`

**Examples:**
- `colorPrimaryHover` - Primary color on hover
- `colorSurfacePressed` - Surface color when pressed
- `colorOutlineFocus` - Outline color for focus rings

---

### Color Palette (111 tokens)

Raw color values from Pebble's palette. **Prefer semantic colors over palette colors** for most use cases.

<details>
<summary>View full palette (111 colors)</summary>

| Token | Value |
|-------|-------|
| `colorBlack` | <code style="background: #000000; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#000000</code> |
| `colorBlackAlpha100` | <code style="background: rgba(0,0,0,0.1); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.1)</code> |
| `colorBlackAlpha150` | <code style="background: rgba(0,0,0,0.15); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.15)</code> |
| `colorBlackAlpha200` | <code style="background: rgba(0,0,0,0.2); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.2)</code> |
| `colorBlackAlpha250` | <code style="background: rgba(0,0,0,0.25); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.25)</code> |
| `colorBlackAlpha300` | <code style="background: rgba(0,0,0,0.3); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.3)</code> |
| `colorBlackAlpha350` | <code style="background: rgba(0,0,0,0.35); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.35)</code> |
| `colorBlackAlpha400` | <code style="background: rgba(0,0,0,0.4); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.4)</code> |
| `colorBlackAlpha450` | <code style="background: rgba(0,0,0,0.45); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.45)</code> |
| `colorBlackAlpha50` | <code style="background: rgba(0,0,0,0.05); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.05)</code> |
| `colorBlackAlpha500` | <code style="background: rgba(0,0,0,0.5); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.5)</code> |
| `colorBlackAlpha550` | <code style="background: rgba(0,0,0,0.55); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.55)</code> |
| `colorBlackAlpha600` | <code style="background: rgba(0,0,0,0.6); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.6)</code> |
| `colorBlackAlpha650` | <code style="background: rgba(0,0,0,0.65); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.65)</code> |
| `colorBlackAlpha700` | <code style="background: rgba(0,0,0,0.7); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.7)</code> |
| `colorBlackAlpha750` | <code style="background: rgba(0,0,0,0.75); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.75)</code> |
| `colorBlackAlpha800` | <code style="background: rgba(0,0,0,0.8); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.8)</code> |
| `colorBlackAlpha850` | <code style="background: rgba(0,0,0,0.85); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.85)</code> |
| `colorBlackAlpha900` | <code style="background: rgba(0,0,0,0.9); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.9)</code> |
| `colorBlackAlpha950` | <code style="background: rgba(0,0,0,0.95); color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">rgba(0,0,0,0.95)</code> |
| `colorBlue100` | <code style="background: #c7d5ec; color: #000000; padding: 2px 8px; border-radius: 4px;">#c7d5ec</code> |
| `colorBlue200` | <code style="background: #a5b8db; color: #000000; padding: 2px 8px; border-radius: 4px;">#a5b8db</code> |
| `colorBlue300` | <code style="background: #839cc9; color: #000000; padding: 2px 8px; border-radius: 4px;">#839cc9</code> |
| `colorBlue400` | <code style="background: #6080b8; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#6080b8</code> |
| `colorBlue50` | <code style="background: #e6f2ff; color: #000000; padding: 2px 8px; border-radius: 4px;">#e6f2ff</code> |
| `colorBlue500` | <code style="background: #47669f; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#47669f</code> |
| `colorBlue600` | <code style="background: #36507c; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#36507c</code> |
| `colorBlue700` | <code style="background: #25395a; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#25395a</code> |
| `colorBlue800` | <code style="background: #142239; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#142239</code> |
| `colorBlue900` | <code style="background: #05132e; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#05132e</code> |
| `colorGray100` | <code style="background: #f2f2f2; color: #000000; padding: 2px 8px; border-radius: 4px;">#f2f2f2</code> |
| `colorGray1000` | <code style="background: #141415; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#141415</code> |
| `colorGray200` | <code style="background: #e3e3e3; color: #000000; padding: 2px 8px; border-radius: 4px;">#e3e3e3</code> |
| `colorGray300` | <code style="background: #d3d3d3; color: #000000; padding: 2px 8px; border-radius: 4px;">#d3d3d3</code> |
| `colorGray400` | <code style="background: #a3a3a5; color: #000000; padding: 2px 8px; border-radius: 4px;">#a3a3a5</code> |
| `colorGray50` | <code style="background: #fafafa; color: #000000; padding: 2px 8px; border-radius: 4px;">#fafafa</code> |
| `colorGray500` | <code style="background: #88888b; color: #000000; padding: 2px 8px; border-radius: 4px;">#88888b</code> |
| `colorGray600` | <code style="background: #6f6f72; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#6f6f72</code> |
| `colorGray700` | <code style="background: #565659; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#565659</code> |
| `colorGray800` | <code style="background: #3e3e40; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#3e3e40</code> |
| `colorGray900` | <code style="background: #202022; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#202022</code> |
| `colorGreen100` | <code style="background: #baf3f0; color: #000000; padding: 2px 8px; border-radius: 4px;">#baf3f0</code> |
| `colorGreen200` | <code style="background: #94e9e4; color: #000000; padding: 2px 8px; border-radius: 4px;">#94e9e4</code> |
| `colorGreen300` | <code style="background: #6ce0d9; color: #000000; padding: 2px 8px; border-radius: 4px;">#6ce0d9</code> |
| `colorGreen400` | <code style="background: #47d7ce; color: #000000; padding: 2px 8px; border-radius: 4px;">#47d7ce</code> |
| `colorGreen50` | <code style="background: #e0fcfa; color: #000000; padding: 2px 8px; border-radius: 4px;">#e0fcfa</code> |
| `colorGreen500` | <code style="background: #2ebdb4; color: #000000; padding: 2px 8px; border-radius: 4px;">#2ebdb4</code> |
| `colorGreen600` | <code style="background: #20968f; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#20968f</code> |
| `colorGreen700` | <code style="background: #106964; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#106964</code> |
| `colorGreen800` | <code style="background: #00403d; color: #FFFFFF; padding: 2px 8px; border-radius: 4px;">#00403d</code> |


*...and 61 more palette colors*


</details>

---

## Quick Reference

### Common Color Patterns

| Use Case | Token |
|----------|-------|
| Page background | `colorSurface` |
| Card background | `colorSurfaceBright` |
| Body text | `colorOnSurface` |
| Secondary text | `colorOnSurfaceVariant` |
| Primary button | `colorPrimary` |
| Primary button text | `colorOnPrimary` |
| Success message bg | `colorSuccessContainer` |
| Success message text | `colorOnSuccessContainer` |
| Success icon | `colorSuccess` |
| Input border | `colorOutline` |
| Error border | `colorOutlineInvalid` or `colorError` |
| Focus ring | `colorOutlineFocus` |

---

## Accessibility

All color tokens are designed to meet **WCAG 2.1 AA** contrast requirements when used with their corresponding "on" colors.

**Always use:**
- `colorOnPrimary` for text on `colorPrimary`
- `colorOnSurface` for text on `colorSurface`
- `colorOnSuccessContainer` for text on `colorSuccessContainer`

**Never:**
- ❌ Use `colorOnSurface` on `colorPrimary` (poor contrast)
- ❌ Mix mismatched "on" colors

---

## Related Documentation

- **[Semantic Colors Deep Dive](./semantic-colors.md)** - Container vs base colors
- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive token browser

---

**Total Color Tokens:** 214  
**Source:** `@rippling/pebble-tokens/large/esm/berry-light`
