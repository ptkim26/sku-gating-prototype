# Pebble Playground 🎨

An AI-friendly prototyping environment for Rippling's Pebble Design System.

## What is this?

Pebble Playground is a standalone prototyping environment where designers, PMs, and AI assistants can rapidly build and experiment with Pebble components. It's optimized for both human and AI collaboration.

## Quick Start

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev

# Open http://localhost:4201
```

## For AI Assistants

This project is designed to be AI-friendly. Key resources:

- **[AI Prompting Guide](./docs/AI_PROMPTING_GUIDE.md)** - How to work with Pebble components
- **[Component Catalog](./docs/COMPONENT_CATALOG.md)** - Quick reference for all components
- **[.cursorrules](./.cursorrules)** - Coding patterns and best practices

## Project Structure

```
pebble-playground/
├── src/
│   ├── demos/              # Pre-built component demos
│   │   ├── animations-demo.tsx
│   │   ├── modal-demo.tsx
│   │   └── ...
│   ├── components/         # Reusable playground components
│   │   ├── DemoWrapper.tsx
│   │   └── ...
│   ├── utils/              # Helper utilities
│   │   └── animation-constants.ts
│   └── main.tsx            # Main entry point
├── docs/                   # AI-friendly documentation
└── scripts/                # Helper scripts
```

## Creating New Demos

### Quick Method
```bash
yarn new:demo
# Follow the interactive prompts
```

### Manual Method
```typescript
// src/demos/my-demo.tsx
import React from 'react';
import { useTheme } from '@rippling/pebble/theme';
import Button from '@rippling/pebble/Button';

const MyDemo = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: theme.colorSurface,
      minHeight: '100vh'
    }}>
      <Button 
        size={Button.SIZES.M} 
        appearance={Button.APPEARANCES.PRIMARY}
      >
        Hello Pebble!
      </Button>
    </div>
  );
};

export default MyDemo;
```

## Key Features

### 🎯 Pre-built Demos
- **Animations Demo** - Showcases entrance/exit animations with before/after comparisons
- **Modal/Drawer Demo** - Interactive overlay components
- **Rich Text Editor** - Document editing capabilities
- **And more...**

### 🤖 AI-Optimized
- Extensive inline documentation
- Consistent patterns across all demos
- Type-safe with TypeScript
- Self-documenting code structure

### 🎨 Theme Support
- Automatic light/dark mode
- Berry theme variants
- Real-time theme switching

## Forking Pebble Components

Sometimes you need custom behavior not provided by Pebble. See the `ForkedSelect` example:

```typescript
// src/demos/ForkedSelect/
// - Adds rotating caret animation
// - Adds custom entrance/exit animations
// - Documents why it was forked and what changed
```

**Pattern:**
1. Copy component files to `src/demos/[DemoName]/ForkedComponent/`
2. Fix import paths to reference `@rippling/pebble`
3. Add your custom behavior
4. Document the changes

## Integration with AI Wrapper

This playground serves as a testing ground for AI-generated Pebble code:

```
AI Wrapper → Generates Code → Playground Validates → Visual Feedback
```

See [docs/AI_WRAPPER_INTEGRATION.md](./docs/AI_WRAPPER_INTEGRATION.md) for details.

## Contributing

This is a prototyping environment - experiment freely! Some guidelines:

1. **Keep demos self-contained** - Each demo should work independently
2. **Use theme tokens** - Never hardcode colors/spacing
3. **Document AI patterns** - If you find a useful pattern, add it to the docs
4. **Add examples** - Show real use cases, not just API demos

## Resources

- [Pebble Storybook](https://pebble.rippling.dev) - Official component documentation
- [Pebble Repository](https://github.com/Rippling/pebble) - Main design system repo
- [Design Tokens](https://github.com/Rippling/pebble-tokens) - Token definitions

## License

Internal Rippling use only.

