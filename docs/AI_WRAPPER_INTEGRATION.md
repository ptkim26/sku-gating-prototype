# AI Wrapper Integration Guide

This document outlines how the Pebble Playground integrates with AI wrapper packages for the Pebble Design System.

## Overview

The Pebble Playground serves as a **prototyping and validation environment** for AI-generated Pebble code. It provides:

1. **A testing ground** for AI-generated component implementations
2. **Visual feedback** on component behavior and styling
3. **Pattern examples** that AI can learn from
4. **Validation** that generated code actually works

## Integration Architecture

```
┌─────────────────┐
│   AI Wrapper    │  Generates code based on prompts
│   Package       │  Uses Pebble component schemas
└────────┬────────┘
         │
         │ Generates
         ▼
┌─────────────────┐
│  Component      │  TypeScript/React code
│  Code           │  Using Pebble components
└────────┬────────┘
         │
         │ Tests in
         ▼
┌─────────────────┐
│  Pebble         │  Validates & renders
│  Playground     │  Provides visual feedback
└─────────────────┘
```

## Shared Type Definitions

The AI wrapper and playground should share component schemas for consistency.

### Component Schema Format

```typescript
// shared-types.ts
export interface PebbleComponentSpec {
  name: string;
  package: string;
  importPath: string;
  props: Record<string, PropDefinition>;
  examples: ComponentExample[];
  aiContext?: string;
  enums?: Record<string, string[]>;
}

export interface PropDefinition {
  type: string;
  required: boolean;
  description: string;
  default?: any;
  options?: any[];
}

export interface ComponentExample {
  name: string;
  description: string;
  code: string;
  category: 'basic' | 'advanced' | 'pattern';
}
```

### Example Component Schema

```json
{
  "name": "Button",
  "package": "@rippling/pebble",
  "importPath": "@rippling/pebble/Button",
  "enums": {
    "SIZES": ["XS", "S", "M", "L"],
    "APPEARANCES": ["PRIMARY", "ACCENT", "DESTRUCTIVE", "SUCCESS", "OUTLINE", "GHOST"]
  },
  "props": {
    "size": {
      "type": "Button.SIZES",
      "required": false,
      "description": "Size of the button",
      "default": "M",
      "options": ["XS", "S", "M", "L"]
    },
    "appearance": {
      "type": "Button.APPEARANCES",
      "required": false,
      "description": "Visual style of the button",
      "default": "PRIMARY"
    },
    "onClick": {
      "type": "() => void",
      "required": false,
      "description": "Click handler function"
    },
    "children": {
      "type": "React.ReactNode",
      "required": true,
      "description": "Button label/content"
    }
  },
  "examples": [
    {
      "name": "Primary Button",
      "description": "Standard call-to-action button",
      "category": "basic",
      "code": "<Button size={Button.SIZES.M} appearance={Button.APPEARANCES.PRIMARY} onClick={() => {}}>Save</Button>"
    },
    {
      "name": "Icon Button",
      "description": "Icon-only button for compact UIs",
      "category": "advanced",
      "code": "<Button.Icon icon={Icon.TYPES.SETTINGS_OUTLINE} aria-label=\"Settings\" onClick={() => {}} />"
    }
  ],
  "aiContext": "Always include aria-label for Button.Icon. Use ENUMS not strings. onClick is optional but common."
}
```

## AI Wrapper → Playground Workflow

### 1. Code Generation Phase

The AI wrapper generates component code:

```typescript
// AI Wrapper generates this
const generatedCode = `
import Button from '@rippling/pebble/Button';
import { useTheme } from '@rippling/pebble/theme';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.colorSurface, padding: theme.space400 }}>
      <Button 
        size={Button.SIZES.M}
        appearance={Button.APPEARANCES.PRIMARY}
        onClick={() => console.log('clicked')}
      >
        Click Me
      </Button>
    </div>
  );
};

export default MyComponent;
`;
```

### 2. Validation Phase

Before rendering, validate the code:

```typescript
// Validation checks
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

function validatePebbleCode(code: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  
  // Check 1: No hardcoded colors
  if (/backgroundColor:\s*['"](?!theme\.)/g.test(code)) {
    errors.push({
      type: 'HARDCODED_COLOR',
      message: 'Use theme tokens instead of hardcoded colors',
      line: getLineNumber(code, match),
    });
  }
  
  // Check 2: Proper enum usage
  if (/size=["']M["']/g.test(code)) {
    errors.push({
      type: 'INVALID_ENUM',
      message: 'Use Button.SIZES.M instead of string "M"',
      line: getLineNumber(code, match),
    });
  }
  
  // Check 3: Missing aria-label on icon buttons
  if (/Button\.Icon/.test(code) && !/aria-label/.test(code)) {
    warnings.push({
      type: 'MISSING_ARIA_LABEL',
      message: 'Icon buttons should have aria-label for accessibility',
    });
  }
  
  return { isValid: errors.length === 0, errors, warnings };
}
```

### 3. Rendering in Playground

The playground can dynamically render generated code:

```typescript
// In playground/src/demos/ai-generated-demo.tsx
import React, { useState } from 'react';
import { useTheme } from '@rippling/pebble/theme';
import * as Babel from '@babel/standalone';
import * as PebbleComponents from '@rippling/pebble';

interface AIGeneratedDemoProps {
  code: string;
  onError?: (error: Error) => void;
}

const AIGeneratedDemo: React.FC<AIGeneratedDemoProps> = ({ code, onError }) => {
  const { theme } = useTheme();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  
  React.useEffect(() => {
    try {
      // Transform the code
      const transformed = Babel.transform(code, {
        presets: ['react', 'typescript'],
      }).code;
      
      // Create a component from the transformed code
      const componentFactory = new Function(
        'React',
        'PebbleComponents',
        'useTheme',
        `${transformed}; return MyComponent;`
      );
      
      const GeneratedComponent = componentFactory(React, PebbleComponents, useTheme);
      setComponent(() => GeneratedComponent);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [code, onError]);
  
  if (!Component) return null;
  
  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: theme.colorSurface,
      minHeight: '100vh'
    }}>
      <Component />
    </div>
  );
};

export default AIGeneratedDemo;
```

### 4. Feedback Loop

Capture errors and feedback:

```typescript
interface PlaygroundFeedback {
  codeHash: string;
  isSuccessful: boolean;
  renderError?: string;
  validationErrors: ValidationError[];
  userFeedback?: 'helpful' | 'not_helpful';
  timestamp: number;
}

function sendFeedbackToAI(feedback: PlaygroundFeedback) {
  // Send back to AI wrapper for learning
  fetch('/ai-wrapper/feedback', {
    method: 'POST',
    body: JSON.stringify(feedback),
  });
}
```

## API Endpoints

The AI wrapper and playground can communicate via these endpoints:

### POST `/playground/validate`

Validate generated code without rendering.

**Request:**
```json
{
  "code": "import Button from '@rippling/pebble/Button'...",
  "components": ["Button", "Modal"]
}
```

**Response:**
```json
{
  "isValid": true,
  "errors": [],
  "warnings": [
    {
      "type": "MISSING_ARIA_LABEL",
      "message": "Icon button missing aria-label",
      "line": 12
    }
  ]
}
```

### POST `/playground/render`

Render code in a sandboxed iframe.

**Request:**
```json
{
  "code": "...",
  "theme": "berry-light"
}
```

**Response:**
```json
{
  "iframeUrl": "https://playground.pebble.dev/render/abc123",
  "previewImage": "data:image/png;base64,..."
}
```

### GET `/playground/examples`

Get examples for a specific component.

**Request:**
```
GET /playground/examples?component=Button&category=advanced
```

**Response:**
```json
{
  "component": "Button",
  "examples": [
    {
      "name": "Icon Button with Tooltip",
      "code": "...",
      "description": "..."
    }
  ]
}
```

## Pattern Library

The playground maintains a library of validated patterns that the AI wrapper can reference.

### Pattern Structure

```typescript
interface Pattern {
  id: string;
  name: string;
  description: string;
  components: string[];
  code: string;
  thumbnail?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  aiPromptHint?: string;
}
```

### Example Patterns

```json
{
  "id": "modal-with-form",
  "name": "Modal with Form",
  "description": "A modal containing a form with validation",
  "components": ["Modal", "Input.Text", "Button"],
  "tags": ["form", "validation", "overlay"],
  "difficulty": "intermediate",
  "aiPromptHint": "Use Modal with ModalFooter, Input.Text for fields, validate before submit",
  "code": "..."
}
```

## Best Practices for AI Wrapper

### 1. Always Include Imports

```typescript
// ✅ Good
import Button from '@rippling/pebble/Button';
import { useTheme } from '@rippling/pebble/theme';

// ❌ Bad - assuming imports
const MyComponent = () => <Button>Click</Button>
```

### 2. Use Theme Tokens

```typescript
// ✅ Good
const { theme } = useTheme();
<div style={{ backgroundColor: theme.colorSurface }}>

// ❌ Bad
<div style={{ backgroundColor: 'white' }}>
```

### 3. Use Enum Values

```typescript
// ✅ Good
<Button size={Button.SIZES.M} appearance={Button.APPEARANCES.PRIMARY}>

// ❌ Bad
<Button size="M" appearance="PRIMARY">
```

### 4. Include TypeScript Types

```typescript
// ✅ Good
const [value, setValue] = useState<string | undefined>(undefined);

// ❌ Bad
const [value, setValue] = useState(undefined);
```

### 5. Provide Complete Examples

```typescript
// ✅ Good - Self-contained, runnable
const MyDemo = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  return <div>...</div>;
};

// ❌ Bad - Missing context
return <Button onClick={handleClick}>
```

## Testing Integration

Create integration tests to validate AI-generated code:

```typescript
// tests/ai-integration.test.ts
describe('AI Wrapper Integration', () => {
  it('should validate correct Button usage', () => {
    const code = `
      import Button from '@rippling/pebble/Button';
      <Button size={Button.SIZES.M}>Click</Button>
    `;
    
    const result = validatePebbleCode(code);
    expect(result.isValid).toBe(true);
  });
  
  it('should catch hardcoded colors', () => {
    const code = `
      <div style={{ backgroundColor: 'white' }}>
    `;
    
    const result = validatePebbleCode(code);
    expect(result.errors).toContainEqual(
      expect.objectContaining({ type: 'HARDCODED_COLOR' })
    );
  });
  
  it('should render AI-generated component', async () => {
    const code = generateComponentCode('Create a modal with a button');
    const { container } = render(<AIGeneratedDemo code={code} />);
    
    expect(container).toMatchSnapshot();
  });
});
```

## Monitoring & Analytics

Track AI wrapper performance:

```typescript
interface AIMetrics {
  promptToCodeTime: number;
  validationPassRate: number;
  renderSuccessRate: number;
  commonErrors: Record<string, number>;
  popularComponents: Record<string, number>;
}

function trackMetrics(metrics: AIMetrics) {
  // Send to analytics
}
```

## Future Enhancements

1. **Real-time collaboration** - Multiple users editing same playground instance
2. **Version history** - Track iterations of AI-generated code
3. **A/B testing** - Compare different AI-generated implementations
4. **Component diffing** - Visual diff between generated and expected output
5. **Auto-fixing** - Automatically fix common validation errors

## Resources

- [Component Catalog](./COMPONENT_CATALOG.md) - Complete component reference
- [AI Prompting Guide](./AI_PROMPTING_GUIDE.md) - Best practices for prompting
- [Playground README](../README.md) - Setup and usage
- [Pebble Storybook](https://pebble.rippling.dev) - Official documentation

## Contact

For questions about AI wrapper integration:
- Internal Slack: `#pebble-dev`
- Email: design-systems@rippling.com


