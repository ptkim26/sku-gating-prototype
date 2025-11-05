# Pebble Playground Setup Guide

This guide will help you get the Pebble Playground up and running.

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22

## Installation Steps

### 1. Install Dependencies

Since this repo depends on Pebble packages from the main repo, you have two options:

#### Option A: Use Published Packages (Simpler)

```bash
cd pebble-playground
yarn install
```

This will install the latest published versions of `@rippling/pebble` and `@rippling/pebble-editor` from your internal registry.

#### Option B: Link to Local Pebble (For Development)

If you're actively developing Pebble components and want to test them here:

```bash
# In the pebble repo
cd /Users/paulbest/Documents/htdocs/pebble
yarn build

# Link the packages
cd packages/rippling-ui
yarn link

cd ../rippling-editor
yarn link

# In the playground repo
cd /Users/paulbest/Documents/htdocs/pebble-playground
yarn link @rippling/pebble
yarn link @rippling/pebble-editor
```

### 2. Personalize Your Workspace (Automatic)

When you run `yarn dev`, the setup automatically configures your personalized workspace from your git config:

```bash
yarn dev
```

The script will:
- ✅ Read your name from `git config user.name`
- ✅ Read your email from `git config user.email`
- ✅ Generate a Gravatar URL from your email
- ✅ Try to detect your GitHub username from your git remote
- ✅ Create a `.env.local` file with your preferences

**Your homepage will display:** "Hi [YourFirstName], welcome to your Pebble Playground" with your avatar! 🎉

#### Optional: Add GitHub Avatar

For a GitHub avatar instead of Gravatar, either:

**Option 1:** Set your GitHub username in git config
```bash
git config --global github.user "your-github-username"
```

**Option 2:** Add a GitHub remote to this repo
```bash
git remote add origin git@github.com:your-username/pebble-playground.git
```

Then re-run the setup:
```bash
yarn setup:user
```

The playground will be available at http://localhost:4201

### 3. Verify Setup

Open http://localhost:4201 in your browser. You should see:

- Your personalized greeting with your avatar
- A demo switcher with multiple options
- Theme toggle (light/dark berry themes)
- Working Rich Text Editor by default

## Package.json Notes

The current `package.json` uses `"@rippling/pebble": "latest"`. You may need to update this to:

1. **Specific version:** `"@rippling/pebble": "^X.Y.Z"` (recommended)
2. **Workspace protocol:** `"@rippling/pebble": "workspace:*"` (if using yarn workspaces)
3. **File protocol:** `"@rippling/pebble": "file:../pebble/packages/rippling-ui"` (local development)

### Current Dependencies

The playground depends on:

- `@rippling/pebble` - Main component library
- `@rippling/pebble-editor` - Rich text editor components
- `@rippling/lib-i18n` - Internationalization utilities
- `@rippling/ui-utils` - Shared utilities
- `@emotion/react` & `@emotion/styled` - CSS-in-JS
- React 18.x

## Troubleshooting

### "Cannot find module '@rippling/pebble'"

**Solution:** Ensure packages are published to your internal registry, or use local linking (Option B above).

### "Module not found: GlobalStyle"

**Solution:** Update the import in `src/main.tsx`:

```typescript
// If GlobalStyle is exported from @rippling/pebble
import GlobalStyle from '@rippling/pebble/GlobalStyle';

// Or if it's not exported, remove the import and the <GlobalStyle /> component
```

### TypeScript errors about missing types

**Solution:** Ensure all `@types/*` packages are installed:

```bash
yarn add -D @types/react @types/react-dom @types/lodash @types/node
```

### Vite errors about CSS-inline WASM

**Solution:** The playground uses `@css-inline/css-inline-wasm` for the document editor. If you don't need the document editor, you can remove this dependency and simplify `main.tsx`:

```typescript
// Remove getCSSInliner function
// Remove inlineCSS prop from DocumentEditor
```

## Next Steps

### Add Your First Demo

```bash
yarn new:demo
```

Follow the prompts to create a new demo file. Then add it to `src/main.tsx`:

```typescript
// 1. Import your demo
import MyDemo from './demos/my-demo';

// 2. Add to EditorType enum
enum EditorType {
  // ... existing types
  MY_DEMO = 'my-demo',
}

// 3. Add to DEMO_OPTIONS
const DEMO_OPTIONS = [
  // ... existing options
  { type: EditorType.MY_DEMO, label: 'My Demo' },
];

// 4. Add to render logic
{
  editorType === EditorType.MY_DEMO && (
    <>
      {isTopBarVisible && buttons}
      <MyDemo />
    </>
  );
}
```

### Customize Theme

The playground uses berry themes by default. To add more themes:

```typescript
// In main.tsx
import {
  darkThemeConfig,
  lightThemeConfig,
  darkThemeBerryConfig,
  lightThemeBerryConfig,
} from '@rippling/pebble/theme';

const THEME_PROVIDER_PROPS = {
  themeConfigs: [lightThemeConfig, darkThemeConfig, lightThemeBerryConfig, darkThemeBerryConfig],
};
```

## File Structure

```
pebble-playground/
├── src/
│   ├── demos/              # All demo components
│   │   ├── animations-demo.tsx
│   │   ├── modal-demo.tsx
│   │   ├── ForkedSelect/   # Example of forked component
│   │   └── ...
│   ├── components/         # Reusable playground components
│   ├── utils/              # Utilities (animation constants, etc.)
│   │   └── animation-constants.ts
│   ├── __mock__/           # Mock data
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── docs/                   # Documentation
│   ├── AI_PROMPTING_GUIDE.md
│   ├── COMPONENT_CATALOG.md
│   └── AI_WRAPPER_INTEGRATION.md
├── scripts/                # Helper scripts
│   └── create-demo.mjs
└── index.html
```

## Development Workflow

1. **Start dev server:** `yarn dev`
2. **Create new demo:** `yarn new:demo`
3. **Lint code:** `yarn lint`
4. **Format code:** `yarn format`
5. **Build for production:** `yarn build`

## Git Setup

Initialize the repo:

```bash
cd /Users/paulbest/Documents/htdocs/pebble-playground
git init
git add .
git commit -m "Initial commit: Pebble Playground setup"
```

Create a GitHub repo and push:

```bash
git remote add origin git@github.com:Rippling/pebble-playground.git
git branch -M main
git push -u origin main
```

## CI/CD (Optional)

You can set up GitHub Actions to:

1. Run linting on PRs
2. Build the playground
3. Deploy to a static host (Vercel, Netlify, etc.)

Example `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: yarn install
      - run: yarn lint
      - run: yarn build
```

## Questions?

- Check [README.md](./README.md) for general usage
- See [docs/](./docs/) for detailed guides
- Internal Slack: `#pebble-dev`

Happy prototyping! 🎨

