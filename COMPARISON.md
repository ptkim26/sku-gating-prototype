# Playground Comparison: Original vs Standalone

## Side-by-Side Comparison

| Feature | Original (`/pebble/playground/`) | Standalone (`/pebble-playground/`) |
|---------|----------------------------------|-------------------------------------|
| **Location** | Inside main Pebble monorepo | Separate repository |
| **Setup** | Requires full Pebble repo | `yarn install` and go |
| **Dependencies** | Local workspace packages | Published npm packages |
| **Target Users** | Pebble engineers | Designers, PMs, AI users |
| **Purpose** | Test unreleased features | Prototype with stable Pebble |
| **AI Documentation** | None | Extensive (`.cursorrules`, guides) |
| **Demo Scaffolding** | Manual | Interactive (`yarn new:demo`) |
| **Git Tracking** | Part of Pebble repo | Independent repo |
| **Collaboration** | Limited to engineering team | Open to all teams |
| **CI/CD** | Shares Pebble's CI | Can have independent CI |
| **Deployment** | N/A (dev only) | Can deploy to Vercel/Netlify |

## When to Use Which

### Use Original Playground (`/pebble/playground/`)

✅ **When you are:**
- A Pebble engineer working on new components
- Testing unreleased Pebble features
- Need direct access to source code
- Debugging Pebble internals

✅ **For:**
- Component development
- Internal testing before release
- Integration testing with local changes

### Use Standalone Playground (`/pebble-playground/`)

✅ **When you are:**
- A designer prototyping UIs
- A PM exploring component combinations
- An AI assistant learning Pebble patterns
- Anyone wanting quick component demos

✅ **For:**
- Rapid prototyping
- Design explorations
- AI-generated code validation
- Sharing demos with stakeholders
- Learning Pebble components

## Architecture Differences

### Original Playground

```
/pebble/
├── packages/
│   ├── rippling-ui/          ← Direct source access
│   ├── rippling-editor/      ← Direct source access
│   └── ...
└── playground/
    └── src/
        └── main.tsx          → import from '../../packages/...'
```

**Pros:**
- Instant access to unreleased features
- No dependency on published packages
- Hot reload of Pebble source changes

**Cons:**
- Requires full monorepo setup (~2GB)
- Coupled with engineering workflow
- Slow setup for non-engineers

### Standalone Playground

```
/pebble-playground/
├── node_modules/
│   ├── @rippling/pebble/     ← Published package
│   └── @rippling/pebble-editor/
└── src/
    └── main.tsx              → import from '@rippling/pebble'
```

**Pros:**
- Fast setup (~100MB)
- Works with stable releases
- Independent of main repo
- AI-optimized

**Cons:**
- Can't test unreleased features
- Requires published packages

## Migration Guide

### Moving a Demo from Original to Standalone

**Example: Moving `my-demo.tsx`**

#### Step 1: Copy the file

```bash
cp /pebble/playground/src/my-demo.tsx /pebble-playground/src/demos/my-demo.tsx
```

#### Step 2: Update imports

**Before (Original):**
```typescript
import Button from '../../packages/rippling-ui/source/Button';
import { useTheme } from '../../packages/rippling-ui/source/theme';
```

**After (Standalone):**
```typescript
import Button from '@rippling/pebble/Button';
import { useTheme } from '@rippling/pebble/theme';
```

#### Step 3: Update `main.tsx`

```typescript
// Add import
import MyDemo from './demos/my-demo';

// Add to EditorType
enum EditorType {
  MY_DEMO = 'my-demo',
  // ...
}

// Add to DEMO_OPTIONS
const DEMO_OPTIONS = [
  { type: EditorType.MY_DEMO, label: 'My Demo' },
  // ...
];

// Add render case
{editorType === EditorType.MY_DEMO && (
  <>
    {isTopBarVisible && buttons}
    <MyDemo />
  </>
)}
```

#### Step 4: Test

```bash
cd /pebble-playground
yarn dev
# Navigate to "My Demo" in the switcher
```

### Moving a Forked Component

If you forked a Pebble component (like `ForkedSelect`):

1. **Copy the entire folder:**
```bash
cp -r /pebble/playground/src/ForkedSelect /pebble-playground/src/demos/ForkedSelect
```

2. **Fix all imports:**
```bash
# Use the provided fix-imports script or manually update
find /pebble-playground/src/demos/ForkedSelect -name "*.ts*" -exec sed -i '' 's|../../packages/rippling-ui/source|@rippling/pebble|g' {} +
```

3. **Update component imports:**
```typescript
// Before
import Icon from '../../../packages/rippling-ui/source/Icon';

// After
import Icon from '@rippling/pebble/Icon';
```

## Syncing Between Playgrounds

### Recommended Workflow

1. **Develop in Original** (if testing unreleased features)
```bash
cd /pebble/playground
# Create demo, test with local Pebble
```

2. **Port to Standalone** (once Pebble version is released)
```bash
# Wait for Pebble release
cd /pebble-playground
yarn upgrade @rippling/pebble@latest
# Copy demo, update imports, test
```

3. **Share from Standalone**
```bash
# Push to GitHub, deploy, or share link
git push origin main
```

## Package Linking (Advanced)

You can link the standalone playground to use local Pebble packages:

```bash
# In /pebble
cd packages/rippling-ui
yarn link

cd ../rippling-editor
yarn link

# In /pebble-playground
yarn link @rippling/pebble
yarn link @rippling/pebble-editor

# Now standalone playground uses local Pebble!
```

**To unlink:**
```bash
cd /pebble-playground
yarn unlink @rippling/pebble
yarn unlink @rippling/pebble-editor
yarn install --force
```

## Common Questions

### Q: Why two playgrounds?

**A:** Different audiences and purposes:
- **Original** = Engineering tool for Pebble development
- **Standalone** = Prototyping tool for everyone

### Q: Which one should I contribute to?

**A:**
- Add demos to **Standalone** for sharing/prototyping
- Add demos to **Original** when testing unreleased Pebble features
- Share patterns between both

### Q: Can they coexist?

**A:** Yes! They serve different needs:
- Engineers use **Original** for component development
- Designers/PMs use **Standalone** for prototyping
- Both reference each other for patterns

### Q: What about the AI wrapper?

**A:** The AI wrapper should primarily integrate with **Standalone** because:
- Stable API (published packages)
- AI-optimized documentation
- Independent deployment
- Designed for code generation validation

---

## TL;DR

- **`/pebble/playground/`** = For Pebble engineers testing unreleased features
- **`/pebble-playground/`** = For everyone else prototyping with stable Pebble
- Both have value, serve different needs
- Demos can be shared between them with import updates
- Standalone is AI-optimized and collaboration-ready


