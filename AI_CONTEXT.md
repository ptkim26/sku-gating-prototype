# AI Context for Pebble Playground

> **For AI Coding Assistants:** This file provides essential context for working with this codebase. Read this FIRST before implementing any features.

## 🎯 What is This Project?

**Pebble Playground** is a prototyping environment for Rippling's Pebble Design System. It enables designers and engineers to rapidly prototype UI flows using real Pebble components, with full support for AI-assisted development.

### Key Goals
1. **Fast prototyping** - Build functional UIs quickly without full Rippling infrastructure
2. **AI-native** - Designed for AI coding assistants to work effectively
3. **Design system compliance** - Use real Pebble components with correct tokens
4. **Shareable demos** - Create interactive demos that can be shared with stakeholders

## 📚 Documentation Structure (Your Source of Truth)

```
docs/
├── COMPONENT_CATALOG.md          # Quick component API reference
├── TOKEN_CATALOG.md              # Quick design token reference
├── AI_PROMPTING_GUIDE.md         # Usage patterns and examples
└── guides/
    ├── components/               # Full component docs (from Confluence)
    ├── tokens/                   # Full token specs (auto-generated)
    ├── patterns/                 # UX patterns (how to solve X?)
    └── building-blocks/          # Rippling-specific features
```

### Documentation Hierarchy

1. **COMPONENT_CATALOG.md** - Start here for component APIs
   - Quick reference with code examples
   - Common gotchas highlighted at the top
   - Links to comprehensive docs

2. **TOKEN_CATALOG.md** - Start here for colors, spacing, typography
   - All design tokens with usage examples
   - Theme switching patterns
   - Links to detailed token specs

3. **guides/** - Go here for comprehensive documentation
   - Synced from Confluence (components)
   - Auto-generated from npm packages (tokens)
   - Manually curated (patterns, building blocks)

## 🚨 Critical Rules (Read This to Avoid Errors)

### 1. Icon API
```typescript
// ❌ WRONG - Icon.SIZES does NOT exist
<Icon type={Icon.TYPES.CHECK} size={Icon.SIZES.M} />

// ✅ CORRECT - Use numeric pixel values
<Icon type={Icon.TYPES.CHECK} size={20} />
```

### 2. Input.Text API
```typescript
// ❌ WRONG - SIZES is on Input.Text, not Input
<Input.Text size={Input.SIZES.M} />

// ✅ CORRECT
<Input.Text size={Input.Text.SIZES.M} />
```

### 3. It's Tip, not Tooltip
```typescript
// ❌ WRONG - Component is called Tip in Pebble
import Tooltip from '@rippling/pebble/Tooltip';

// ✅ CORRECT
import Tip from '@rippling/pebble/Tip';
```

### 4. Always Use Theme Tokens
```typescript
// ❌ WRONG - Never hardcode colors or spacing
const styles = {
  backgroundColor: 'white',
  color: '#000000',
  padding: '16px',
};

// ✅ CORRECT - Always use theme tokens
import { useTheme } from '@rippling/pebble/theme';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colorSurface,
      color: theme.colorOnSurface,
      padding: theme.space400,
    }}>
      Content
    </div>
  );
};
```

## 🔄 Workflow for Implementing New Features

### Step 1: Check Documentation
```
1. Open docs/COMPONENT_CATALOG.md
2. Find the component(s) you need
3. Read the "Common Gotchas" section
4. Copy the example code
5. Check docs/TOKEN_CATALOG.md for colors/spacing
```

### Step 2: Look at Existing Demos
```
1. Browse src/demos/ for similar examples
2. Copy patterns from working code
3. Understand the established conventions
```

### Step 3: Implement
```
1. Create src/demos/your-demo-name.tsx
2. Import components from @rippling/pebble
3. Use theme tokens for all styling
4. Add to main.tsx to make it accessible
```

### Step 4: Verify
```
1. Run yarn dev
2. Test in both light and dark modes
3. Check for linter errors
4. Verify all hardcoded values are replaced with tokens
```

## 🎨 Styling Patterns

### Pattern 1: Inline Styles with Theme
```typescript
import { useTheme } from '@rippling/pebble/theme';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: theme.colorSurface,
      padding: theme.space600,
      borderRadius: theme.shapeCornerL,
    }}>
      Content
    </div>
  );
};
```

### Pattern 2: Styled Components with Theme
```typescript
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';

const Container = styled.div`
  background-color: ${({ theme }) => (theme as any).colorSurface};
  padding: ${({ theme }) => (theme as any).space600};
  border-radius: ${({ theme }) => (theme as any).shapeCornerL};
`;

const MyComponent = () => {
  const { theme } = useTheme();
  return <Container theme={theme}>Content</Container>;
};
```

### Pattern 3: Typography
```typescript
import styled from '@emotion/styled';

const Heading = styled.h1`
  ${({ theme }) => (theme as any).typestyleDisplayLarge600};
  color: ${({ theme }) => (theme as any).colorOnSurface};
`;

const Body = styled.p`
  ${({ theme }) => (theme as any).typestyleBodyMedium400};
  color: ${({ theme }) => (theme as any).colorOnSurfaceVariant};
`;
```

## 🧩 Common Component Patterns

### Modal Pattern
```typescript
import { useState } from 'react';
import Modal from '@rippling/pebble/Modal';
import Button from '@rippling/pebble/Button';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isVisible={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Modal Title"
>
  <div style={{ padding: '1rem' }}>
    Content
  </div>
</Modal>
```

### Form Pattern
```typescript
import Input from '@rippling/pebble/Inputs';
import Select from '@rippling/pebble/Inputs/Select';
import Button from '@rippling/pebble/Button';

const [name, setName] = useState('');
const [country, setCountry] = useState(undefined);

<form>
  <Input.Text
    id="name"
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    size={Input.Text.SIZES.M}
  />
  
  <Select
    id="country"
    isRequired={false}
    label="Country"
    list={countryOptions}
    value={country}
    onChange={(value) => setCountry(value)}
  />
  
  <Button
    appearance={Button.APPEARANCES.PRIMARY}
    type="submit"
  >
    Submit
  </Button>
</form>
```

## 🔧 Component Override System

When you need to customize a Pebble component beyond what props allow:

1. **Use the override system:**
   ```bash
   yarn override ComponentName
   ```

2. **Only modify specific files** in `src/overrides/`

3. **Vite aliases automatically use your overrides**

4. **Example:** The `Select` component has an animated dropdown:
   - Original: `@rippling/pebble/Inputs/Select`
   - Override: `src/overrides/Inputs/Select/SelectMenu/SelectMenu.tsx`
   - Vite resolves the override automatically

## 📁 File Structure

```
pebble-playground/
├── .cursorrules                 # Cursor AI instructions
├── AI_CONTEXT.md               # This file (for all AI tools)
├── docs/                       # SOURCE OF TRUTH
│   ├── COMPONENT_CATALOG.md
│   ├── TOKEN_CATALOG.md
│   └── guides/
├── src/
│   ├── demos/                  # Your demo files go here
│   │   ├── app-shell-demo.tsx
│   │   ├── design-tokens-demo.tsx
│   │   └── modal-demo.tsx
│   ├── overrides/              # Component customizations
│   ├── components/             # Reusable custom components
│   └── main.tsx                # App entry point
├── scripts/
│   ├── sync-confluence-docs.mjs      # Sync component docs
│   └── generate-token-docs.mjs       # Generate token docs
└── vite.config.mts             # Vite configuration with aliases
```

## 🎓 Learning from Examples

### Example 1: App Shell Demo
**File:** `src/demos/app-shell-demo.tsx`
**Shows:**
- Using Icon component correctly (numeric sizes)
- Using Input.Text with correct SIZES enum
- Theme token usage throughout
- Styled components with theme integration
- Complex layout patterns

### Example 2: Design Tokens Demo
**File:** `src/demos/design-tokens-demo.tsx`
**Shows:**
- Comprehensive theme token usage
- Typography token application
- Color token organization
- Spacing and border radius tokens
- Tip component usage

### Example 3: Animations Demo
**File:** `src/demos/animations-demo.tsx`
**Shows:**
- Animation constants usage
- Component state management
- Before/after comparisons
- Theme-aware animations

## 🐛 Troubleshooting Guide

### Issue: "Cannot read properties of undefined (reading 'M')"
**Cause:** Using `Icon.SIZES.M` or `Input.SIZES.M`  
**Solution:** Icon uses numbers (`size={20}`), Input.Text uses `Input.Text.SIZES.M`

### Issue: "Module not found: @rippling/pebble/Tooltip"
**Cause:** Component is called `Tip`, not `Tooltip`  
**Solution:** `import Tip from '@rippling/pebble/Tip';`

### Issue: Colors/spacing look wrong in dark mode
**Cause:** Hardcoded colors instead of theme tokens  
**Solution:** Replace all hardcoded values with theme tokens

### Issue: Component looks different from Rippling product
**Cause:** Missing theme tokens or incorrect component usage  
**Solution:** Check `docs/guides/components/` for official patterns

## 📊 Documentation Maintenance

### Auto-Updated Documentation
Run these commands to update auto-generated docs:

```bash
# Update component docs from Confluence
yarn sync-confluence

# Update token docs from npm package
yarn generate-token-docs
```

### Manually Updated Documentation
Update these files directly when you discover new patterns:

- `docs/COMPONENT_CATALOG.md` - Add common patterns, gotchas
- `docs/TOKEN_CATALOG.md` - Add usage examples
- `docs/guides/patterns/` - Add new UX patterns

## 🤝 Collaboration Model

This playground is designed for:

1. **Solo designers** - Quick prototyping with AI assistance
2. **Design teams** - Shared demos in separate folders/branches
3. **Design system engineers** - Testing new component patterns
4. **Product teams** - Prototyping flows before full implementation

See `docs/COLLABORATION_OPTIONS.md` for team workflows.

## 🚀 Quick Start Template

Copy this when creating a new demo:

```typescript
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';

/**
 * [DemoName]
 * 
 * Description of what this demo showcases.
 * 
 * Components used:
 * - Button (docs/guides/components/buttons/button.md)
 * - Icon (docs/guides/components/icons.md)
 */

const MyDemo: React.FC = () => {
  const { theme } = useTheme();
  const [count, setCount] = useState(0);

  return (
    <Container theme={theme}>
      <Title theme={theme}>Demo Title</Title>
      
      <Button
        size={Button.SIZES.M}
        appearance={Button.APPEARANCES.PRIMARY}
        onClick={() => setCount(count + 1)}
      >
        <Icon type={Icon.TYPES.PLUS_CIRCLE_OUTLINE} size={16} />
        Click me ({count})
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => (theme as any).space600};
  background-color: ${({ theme }) => (theme as any).colorSurface};
  min-height: 100vh;
`;

const Title = styled.h1`
  ${({ theme }) => (theme as any).typestyleDisplayLarge600};
  color: ${({ theme }) => (theme as any).colorOnSurface};
  margin-bottom: ${({ theme }) => (theme as any).space600};
`;

export default MyDemo;
```

---

## 📞 Need Help?

1. Check `docs/COMPONENT_CATALOG.md` - Most common issues are documented
2. Look at `src/demos/` - Working examples for most patterns
3. Read `docs/AI_PROMPTING_GUIDE.md` - Detailed usage guide
4. Check Pebble Storybook - https://pebble.rippling.dev

**Remember: The docs folder is your source of truth. Always check there first!**


