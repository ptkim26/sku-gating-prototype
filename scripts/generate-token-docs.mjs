#!/usr/bin/env node

/**
 * Token Documentation Generator
 * 
 * Generates markdown documentation from @rippling/pebble-tokens package.
 * This ensures token docs are always in sync with the actual tokens.
 * 
 * Usage: yarn generate-token-docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.blue}╔═══════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bright}${colors.blue}║   Token Documentation Generator                   ║${colors.reset}`);
console.log(`${colors.bright}${colors.blue}╚═══════════════════════════════════════════════════╝${colors.reset}\n`);

const OUTPUT_DIR = path.join(__dirname, '../docs/guides/tokens');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Import tokens from @rippling/pebble-tokens
 * Using berry-light theme as the reference
 */
async function importTokens() {
  try {
    console.log(`${colors.cyan}→${colors.reset} Importing tokens from @rippling/pebble-tokens...`);
    
    // Import both large and small token sets
    const berryLightLarge = await import('@rippling/pebble-tokens/large/esm/berry-light/index.js');
    
    console.log(`${colors.green}✓${colors.reset} Tokens imported successfully`);
    console.log(`  Found ${Object.keys(berryLightLarge).length} tokens\n`);
    
    return {
      large: berryLightLarge,
    };
  } catch (error) {
    console.error(`${colors.red}✗ Failed to import tokens:${colors.reset}`, error.message);
    console.error(`${colors.yellow}  Make sure @rippling/pebble-tokens is installed: yarn add @rippling/pebble-tokens${colors.reset}`);
    process.exit(1);
  }
}

/**
 * Categorize tokens by type
 */
function categorizeTokens(tokens) {
  console.log(`${colors.cyan}→${colors.reset} Categorizing tokens...`);
  
  const categories = {
    color: [],
    typography: [],
    space: [],
    size: [],
    shape: [],
    shadow: [],
    motion: [],
    opacity: [],
    gradient: [],
    border: [],
    component: [],
    chart: [],
  };
  
  for (const [key, value] of Object.entries(tokens)) {
    if (key.startsWith('color')) {
      categories.color.push({ key, value });
    } else if (key.startsWith('typestyle')) {
      categories.typography.push({ key, value });
    } else if (key.startsWith('space')) {
      categories.space.push({ key, value });
    } else if (key.startsWith('size')) {
      categories.size.push({ key, value });
    } else if (key.startsWith('shape')) {
      categories.shape.push({ key, value });
    } else if (key.startsWith('shadow')) {
      categories.shadow.push({ key, value });
    } else if (key.startsWith('motion')) {
      categories.motion.push({ key, value });
    } else if (key.startsWith('opacity')) {
      categories.opacity.push({ key, value });
    } else if (key.startsWith('gradient')) {
      categories.gradient.push({ key, value });
    } else if (key.startsWith('border')) {
      categories.border.push({ key, value });
    } else if (key.startsWith('component')) {
      categories.component.push({ key, value });
    } else if (key.startsWith('chart')) {
      categories.chart.push({ key, value });
    }
  }
  
  console.log(`${colors.green}✓${colors.reset} Tokens categorized:`);
  console.log(`  Colors: ${categories.color.length}`);
  console.log(`  Typography: ${categories.typography.length}`);
  console.log(`  Spacing: ${categories.space.length}`);
  console.log(`  Sizing: ${categories.size.length}`);
  console.log(`  Shape: ${categories.shape.length}`);
  console.log(`  Other: ${categories.shadow.length + categories.motion.length + categories.opacity.length}\n`);
  
  return categories;
}

/**
 * Generate colors.md
 */
function generateColorsDoc(colorTokens) {
  console.log(`${colors.cyan}→${colors.reset} Generating colors.md...`);
  
  // Group colors by semantic categories
  const groups = {
    brand: [],
    surface: [],
    semantic: [],
    'semantic-on': [],
    'semantic-container': [],
    borders: [],
    states: [],
    palette: [],
  };
  
  colorTokens.forEach(({ key, value }) => {
    if (key.match(/^color(Primary|Secondary|Tertiary)/)) {
      groups.brand.push({ key, value });
    } else if (key.match(/^colorSurface/)) {
      groups.surface.push({ key, value });
    } else if (key.match(/^color(Success|Error|Warning|Info)Container/)) {
      groups['semantic-container'].push({ key, value });
    } else if (key.match(/^colorOn(Success|Error|Warning|Info)/)) {
      groups['semantic-on'].push({ key, value });
    } else if (key.match(/^color(Success|Error|Warning|Info)(?!Container)/)) {
      groups.semantic.push({ key, value });
    } else if (key.match(/^colorOutline/)) {
      groups.borders.push({ key, value });
    } else if (key.match(/(Hover|Pressed|Focus|Disabled)/)) {
      groups.states.push({ key, value });
    } else if (key.match(/^color(Red|Blue|Green|Orange|Yellow|Purple|Plum|Gray|Black|White)/)) {
      groups.palette.push({ key, value });
    }
  });
  
  const content = `# Color Tokens

**Complete color system reference**

> ⚡ **Auto-generated from \`@rippling/pebble-tokens\`**  
> Last generated: ${new Date().toLocaleString()}

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

### Brand Colors (${groups.brand.length} tokens)

Primary brand colors used for main actions and brand identity.

| Token | Value | Description |
|-------|-------|-------------|
${groups.brand.map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px;">${value}</code> | ${desc} |`;
}).join('\n')}

**Usage Examples:**
\`\`\`tsx
// Primary button
<Button style={{ backgroundColor: theme.colorPrimary }}>
  Save
</Button>

// Primary text
<Text style={{ color: theme.colorPrimary }}>
  Learn more
</Text>
\`\`\`

---

### Surface Colors (${groups.surface.length} tokens)

Background colors for different UI surfaces and elevations.

| Token | Value | Description |
|-------|-------|-------------|
${groups.surface.map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">${value}</code> | ${desc} |`;
}).join('\n')}

**Usage Examples:**
\`\`\`tsx
// Page background
<div style={{ backgroundColor: theme.colorSurface }}>

// Elevated card
<Card style={{ backgroundColor: theme.colorSurfaceBright }}>

// Subtle container
<Container style={{ backgroundColor: theme.colorSurfaceDim }}>
\`\`\`

---

### Semantic Colors (${groups.semantic.length + groups['semantic-container'].length} tokens)

Status colors for success, error, warning, and info states.

#### Base Semantic Colors

| Token | Value | Description |
|-------|-------|-------------|
${groups.semantic.map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: white; padding: 2px 8px; border-radius: 4px;">${value}</code> | ${desc} |`;
}).join('\n')}

#### Container Semantic Colors (Backgrounds)

| Token | Value | Description |
|-------|-------|-------------|
${groups['semantic-container'].map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px; border: 1px solid #ddd;">${value}</code> | ${desc} |`;
}).join('\n')}

#### "On" Semantic Colors (Text)

| Token | Value | Description |
|-------|-------|-------------|
${groups['semantic-on'].map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px;">${value}</code> | ${desc} |`;
}).join('\n')}

**Usage Pattern:**
\`\`\`tsx
// Success message
<Notice style={{
  backgroundColor: theme.colorSuccessContainer,
  color: theme.colorOnSuccessContainer,
  borderLeft: \`4px solid \${theme.colorSuccess}\`
}}>
  <Icon color={theme.colorSuccess} />
  Success! Your changes were saved.
</Notice>
\`\`\`

**See also:** [Semantic Colors Deep Dive](./semantic-colors.md)

---

### Border & Outline Colors (${groups.borders.length} tokens)

Colors for borders, dividers, and focus outlines.

| Token | Value | Description |
|-------|-------|-------------|
${groups.borders.map(({ key, value }) => {
  const desc = getColorDescription(key);
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px;">${value}</code> | ${desc} |`;
}).join('\n')}

---

### State Colors (Hover, Pressed, etc.)

**Note:** ${groups.states.length} state variant tokens available.

State colors follow the pattern: \`{base}Hover\`, \`{base}Pressed\`, \`{base}Focus\`

**Examples:**
- \`colorPrimaryHover\` - Primary color on hover
- \`colorSurfacePressed\` - Surface color when pressed
- \`colorOutlineFocus\` - Outline color for focus rings

---

### Color Palette (${groups.palette.length} tokens)

Raw color values from Pebble's palette. **Prefer semantic colors over palette colors** for most use cases.

<details>
<summary>View full palette (${groups.palette.length} colors)</summary>

| Token | Value |
|-------|-------|
${groups.palette.slice(0, 50).map(({ key, value }) => {
  return `| \`${key}\` | <code style="background: ${value}; color: ${getContrastColor(value)}; padding: 2px 8px; border-radius: 4px;">${value}</code> |`;
}).join('\n')}

${groups.palette.length > 50 ? `\n*...and ${groups.palette.length - 50} more palette colors*\n` : ''}

</details>

---

## Quick Reference

### Common Color Patterns

| Use Case | Token |
|----------|-------|
| Page background | \`colorSurface\` |
| Card background | \`colorSurfaceBright\` |
| Body text | \`colorOnSurface\` |
| Secondary text | \`colorOnSurfaceVariant\` |
| Primary button | \`colorPrimary\` |
| Primary button text | \`colorOnPrimary\` |
| Success message bg | \`colorSuccessContainer\` |
| Success message text | \`colorOnSuccessContainer\` |
| Success icon | \`colorSuccess\` |
| Input border | \`colorOutline\` |
| Error border | \`colorOutlineInvalid\` or \`colorError\` |
| Focus ring | \`colorOutlineFocus\` |

---

## Accessibility

All color tokens are designed to meet **WCAG 2.1 AA** contrast requirements when used with their corresponding "on" colors.

**Always use:**
- \`colorOnPrimary\` for text on \`colorPrimary\`
- \`colorOnSurface\` for text on \`colorSurface\`
- \`colorOnSuccessContainer\` for text on \`colorSuccessContainer\`

**Never:**
- ❌ Use \`colorOnSurface\` on \`colorPrimary\` (poor contrast)
- ❌ Mix mismatched "on" colors

---

## Related Documentation

- **[Semantic Colors Deep Dive](./semantic-colors.md)** - Container vs base colors
- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive token browser

---

**Total Color Tokens:** ${colorTokens.length}  
**Source:** \`@rippling/pebble-tokens/large/esm/berry-light\`
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'colors.md'), content);
  console.log(`${colors.green}✓${colors.reset} Generated colors.md (${colorTokens.length} tokens)`);
}

/**
 * Helper: Get description for a color token
 */
function getColorDescription(tokenKey) {
  const descriptions = {
    colorPrimary: 'Main brand color for primary actions',
    colorPrimaryVariant: 'Variant of primary color',
    colorSecondary: 'Secondary accent color',
    colorSecondaryVariant: 'Variant of secondary color',
    colorTertiary: 'Tertiary accent color',
    colorSurface: 'Default surface background',
    colorSurfaceBright: 'Elevated surface (cards, modals)',
    colorSurfaceDim: 'Subtle background',
    colorOnSurface: 'Primary text on surfaces',
    colorOnSurfaceVariant: 'Secondary text on surfaces',
    colorOnPrimary: 'Text/icons on primary',
    colorOnSecondary: 'Text/icons on secondary',
    colorSuccess: 'Success state (icons, borders)',
    colorSuccessContainer: 'Success message background',
    colorOnSuccessContainer: 'Text on success background',
    colorError: 'Error state (icons, borders)',
    colorErrorContainer: 'Error message background',
    colorOnErrorContainer: 'Text on error background',
    colorWarning: 'Warning state (icons, borders)',
    colorWarningContainer: 'Warning message background',
    colorOnWarningContainer: 'Text on warning background',
    colorInfo: 'Info state (icons, borders)',
    colorInfoContainer: 'Info message background',
    colorOnInfoContainer: 'Text on info background',
    colorOutline: 'Standard borders',
    colorOutlineVariant: 'Subtle borders',
    colorOutlineFocus: 'Focus rings',
    colorOutlineInvalid: 'Error/invalid borders',
  };
  
  return descriptions[tokenKey] || 'Color token';
}

/**
 * Helper: Get contrast color for text on background
 */
function getContrastColor(hexColor) {
  if (!hexColor || typeof hexColor !== 'string') return '#000000';
  
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Generate typography.md
 */
function generateTypographyDoc(typographyTokens) {
  console.log(`${colors.cyan}→${colors.reset} Generating typography.md...`);
  
  // Group by category
  const groups = {
    display: [],
    title: [],
    heading: [],
    body: [],
    label: [],
  };
  
  typographyTokens.forEach(({ key, value }) => {
    if (key.includes('Display')) {
      groups.display.push({ key, value });
    } else if (key.includes('Title')) {
      groups.title.push({ key, value });
    } else if (key.includes('Heading')) {
      groups.heading.push({ key, value });
    } else if (key.includes('Body')) {
      groups.body.push({ key, value });
    } else if (key.includes('Label')) {
      groups.label.push({ key, value });
    }
  });
  
  const content = `# Typography Tokens

**Complete typography system reference**

> ⚡ **Auto-generated from \`@rippling/pebble-tokens\`**  
> Last generated: ${new Date().toLocaleString()}

---

## Overview

Pebble's typography system provides a consistent type scale across all Rippling products.

**Token Structure:** \`typestyle{Category}{Size}{Weight}\`

**Categories:**
- **Display** - Largest headings (hero text)
- **Title** - Section headings
- **Heading** - Subsection headings  
- **Body** - Paragraph text
- **Label** - UI labels, buttons, form labels

---

${Object.entries(groups).map(([category, tokens]) => {
  if (tokens.length === 0) return '';
  
  return `## ${category.charAt(0).toUpperCase() + category.slice(1)} (${tokens.length} tokens)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
${tokens.map(({ key, value }) => {
  const fontSize = value.fontSize || 'N/A';
  const lineHeight = value.lineHeight || 'N/A';
  const fontWeight = value.fontWeight || 'N/A';
  const usage = getTypographyUsage(key);
  return `| \`${key}\` | ${fontSize} | ${lineHeight} | ${fontWeight} | ${usage} |`;
}).join('\n')}

`;
}).join('\n---\n\n')}

## Usage Examples

\`\`\`tsx
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';

// As styled component
const Heading = styled.h1\`
  \${({ theme }) => theme.typestyleDisplayLarge600};
  color: \${({ theme }) => theme.colorOnSurface};
\`;

// Inline with useTheme
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={theme.typestyleBodyMedium400}>
      Body text content
    </div>
  );
};
\`\`\`

---

## Font Family

Pebble uses **Basel Grotesk** as the primary typeface.

**Fallback stack:**
\`\`\`css
font-family: 'Basel Grotesk', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Helvetica Neue', sans-serif;
\`\`\`

---

## Quick Reference

| Use Case | Token |
|----------|-------|
| Hero heading | \`typestyleDisplayLarge600\` |
| Page title | \`typestyleDisplayMedium600\` |
| Section header | \`typestyleTitleLarge600\` |
| Card title | \`typestyleTitleMedium600\` |
| Body text | \`typestyleBodyMedium400\` |
| Small text | \`typestyleBodySmall400\` |
| Button label | \`typestyleLabelLarge600\` |
| Form label | \`typestyleLabelMedium600\` |

---

## Related Documentation

- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive typography browser

---

**Total Typography Tokens:** ${typographyTokens.length}  
**Source:** \`@rippling/pebble-tokens/large/esm/berry-light\`
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'typography.md'), content);
  console.log(`${colors.green}✓${colors.reset} Generated typography.md (${typographyTokens.length} tokens)`);
}

/**
 * Helper: Get usage for typography token
 */
function getTypographyUsage(tokenKey) {
  const usages = {
    typestyleDisplayLarge600: 'Hero headlines, landing pages',
    typestyleDisplayMedium600: 'Large page titles',
    typestyleDisplaySmall600: 'Prominent page headers',
    typestyleTitleLarge600: 'Section headings',
    typestyleTitleMedium600: 'Card titles, dialog headers',
    typestyleTitleSmall600: 'List headers',
    typestyleBodyLarge400: 'Large body text, intros',
    typestyleBodyMedium400: 'Default body text',
    typestyleBodySmall400: 'Small text, captions',
    typestyleLabelLarge600: 'Button labels',
    typestyleLabelMedium600: 'Form labels',
    typestyleLabelSmall600: 'Tiny labels, badges',
  };
  
  return usages[tokenKey] || 'Typography token';
}

/**
 * Generate spacing.md
 */
function generateSpacingDoc(spaceTokens, sizeTokens) {
  console.log(`${colors.cyan}→${colors.reset} Generating spacing.md...`);
  
  const content = `# Spacing & Sizing Tokens

**Complete spacing and sizing reference**

> ⚡ **Auto-generated from \`@rippling/pebble-tokens\`**  
> Last generated: ${new Date().toLocaleString()}

---

## Spacing Tokens (${spaceTokens.length} tokens)

Consistent spacing scale for padding, margins, and gaps.

### Spacing Scale

| Token | Value | Common Use |
|-------|-------|------------|
${spaceTokens.slice(0, 20).map(({ key, value }) => {
  const usage = getSpacingUsage(key);
  return `| \`${key}\` | ${value} | ${usage} |`;
}).join('\n')}

${spaceTokens.length > 20 ? `\n*...and ${spaceTokens.length - 20} more spacing tokens*\n` : ''}

### Spacing Guidelines

**Small (100-200):** Tight spacing within components  
**Medium (400-600):** Default spacing between elements  
**Large (800-1200):** Section spacing, page padding

**Usage Examples:**
\`\`\`tsx
// Padding
<div style={{ padding: theme.space400 }}>

// Margin
<div style={{ marginBottom: theme.space600 }}>

// Gap in flexbox
<div style={{ display: 'flex', gap: theme.space400 }}>
\`\`\`

---

## Sizing Tokens (${sizeTokens.length} tokens)

Component dimensions and icon sizes.

### Common Sizes

| Token | Value | Common Use |
|-------|-------|------------|
${sizeTokens.slice(0, 20).map(({ key, value }) => {
  return `| \`${key}\` | ${value} | ${getSizingUsage(key)} |`;
}).join('\n')}

${sizeTokens.length > 20 ? `\n*...and ${sizeTokens.length - 20} more sizing tokens*\n` : ''}

---

## Icon Sizes

Specific tokens for icon dimensions:

| Token | Size | Use Case |
|-------|------|----------|
| \`sizeIcon3xs\` | 12px | Smallest icons |
| \`sizeIconXs\` | 16px | Small icons |
| \`sizeIconSm\` | 20px | Default icons |
| \`sizeIconMd\` | 24px | Medium icons |
| \`sizeIconLg\` | 32px | Large icons |
| \`sizeIconXl\` | 40px | Extra large icons |

---

## Quick Reference

| Use Case | Spacing Token |
|----------|---------------|
| Minimal gap | \`space100\` (4px) |
| Tight spacing | \`space200\` (8px) |
| Default spacing | \`space400\` (16px) |
| Comfortable spacing | \`space600\` (24px) |
| Section spacing | \`space800\` (32px) |
| Large section gap | \`space1200\` (48px) |

---

## Related Documentation

- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive token browser

---

**Total Tokens:** ${spaceTokens.length + sizeTokens.length}  
**Source:** \`@rippling/pebble-tokens/large/esm/berry-light\`
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'spacing.md'), content);
  console.log(`${colors.green}✓${colors.reset} Generated spacing.md`);
}

/**
 * Helpers for spacing/sizing usage
 */
function getSpacingUsage(tokenKey) {
  const usages = {
    space100: 'Minimal gap, icon padding',
    space200: 'Tight spacing, list items',
    space400: 'Default spacing, card padding',
    space600: 'Comfortable spacing, section gap',
    space800: 'Section spacing, page margins',
    space1200: 'Large section gap',
  };
  return usages[tokenKey] || 'Spacing token';
}

function getSizingUsage(tokenKey) {
  if (tokenKey.includes('Icon')) {
    return 'Icon dimensions';
  }
  return 'Component sizing';
}

/**
 * Main function
 */
async function main() {
  try {
    // Import tokens
    const { large } = await importTokens();
    
    // Categorize
    const categories = categorizeTokens(large);
    
    // Generate markdown files
    generateColorsDoc(categories.color);
    generateTypographyDoc(categories.typography);
    generateSpacingDoc(categories.space, categories.size);
    
    // Summary
    console.log(`\n${colors.bright}${colors.green}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}✓ Token documentation generated successfully!${colors.reset}\n`);
    
    console.log(`${colors.cyan}Generated files:${colors.reset}`);
    console.log(`  - colors.md (${categories.color.length} tokens)`);
    console.log(`  - typography.md (${categories.typography.length} tokens)`);
    console.log(`  - spacing.md (${categories.space.length + categories.size.length} tokens)`);
    
    console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
    console.log(`  1. Review generated docs in docs/guides/tokens/`);
    console.log(`  2. Commit changes to Git`);
    console.log(`  3. Re-run after updating @rippling/pebble-tokens\n`);
    
    console.log(`${colors.bright}${colors.green}═══════════════════════════════════════════════════${colors.reset}\n`);
    
  } catch (error) {
    console.error(`\n${colors.red}✗ Error generating documentation:${colors.reset}`, error);
    process.exit(1);
  }
}

main();


