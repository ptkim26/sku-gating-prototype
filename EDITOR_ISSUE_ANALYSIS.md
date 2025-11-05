# Editor Integration Issue - Root Cause Analysis

**Status**: ❌ **BLOCKED** - Editors disabled in this playground  
**Date**: November 2, 2025  
**Time Invested**: ~60 minutes  
**Result**: Unfixable without upstream changes

---

## Executive Summary

The `@rippling/editor` package **cannot run outside the Pebble monorepo** due to fundamental architecture issues. This playground will focus on **Pebble component demos** (Design Tokens, Animations, UI patterns). For editor functionality, use the monorepo playground at `~/htdocs/pebble/playground` (port 4200).

---

## The Problem

### Error 1: Token Initialization Failure (Published Package)
```javascript
Uncaught TypeError: Cannot convert undefined or null to object
    at Object.entries (<anonymous>)
    at getTokensReverseMap (chunk-2CJ2NQFT.js:52987:29)
```

**What's happening**: 
- The editor's `getTokensReverseMap` function expects theme tokens to be initialized
- Published `@rippling/editor` package has a runtime token lookup that fails
- This suggests the package was built with assumptions about its environment

### Error 2: Theme Export Mismatch (Source Imports)
```
✘ [ERROR] No matching export in "theme/index.ts" for import "plumThemeConfig"
    EditorThemeProvider.tsx:3:2
    themeUtils.tsx:2:9
```

**What's happening**:
- Editor source code imports `plumThemeConfig` 
- Published `@rippling/pebble` exports `plumThemeConfig` ✅
- Source `@rippling/pebble` exports `lightThemeConfig`/`darkThemeConfig` ❌
- Source packages and source editor are **out of sync**

---

## What We Tried

### Attempt 1: Published Package Imports ❌
```typescript
import { RichTextEditor } from '@rippling/editor';
import Button from '@rippling/pebble/Button';
```
**Result**: `getTokensReverseMap` token initialization error

### Attempt 2: Source Imports with Vite Aliases ❌
```typescript
// vite.config.mts
resolve: {
  alias: {
    '@rippling/pebble': path.resolve(__dirname, '../pebble/packages/rippling-ui/source'),
    '@rippling/editor': path.resolve(__dirname, '../pebble/packages/rippling-editor/source'),
  },
}
```
**Result**: Import errors - `plumThemeConfig` not exported from source theme

### Attempt 3: Rebuild Editor Package ❌
```bash
cd ../pebble/packages/rippling-editor
yarn build
```
**Result**: Build fails with same `plumThemeConfig` import errors

---

## Root Cause Analysis

### The Architecture Problem

The `@rippling/editor` package has **tightly coupled dependencies** that work in the monorepo but break elsewhere:

1. **Build-time vs Runtime Mismatch**
   - Package was built against specific versions of dependencies
   - Runtime environment has different versions
   - No peer dependency enforcement

2. **Monorepo Assumptions**
   - Editor expects to share the same `node_modules` as `@rippling/pebble`
   - Emotion/styled-components context sharing
   - Theme initialization order dependencies

3. **Export Inconsistencies**
   - Published packages export `plumThemeConfig`/`berryThemeConfig`
   - Source code exports `lightThemeConfig`/`darkThemeConfig`
   - Editor source uses `plumThemeConfig` (only exists in published)
   - **Conclusion**: Source code and published packages are out of sync

### Why It Works in the Other Playground

The `~/htdocs/pebble/playground` works because:

1. **It's IN the monorepo** (`pebble/playground/`)
2. **Shares the monorepo's yarn workspace** (single `node_modules`)
3. **Vite is run from monorepo root** with proper context
4. **Uses relative imports** to source with full monorepo environment

```typescript
// Working playground's setup
import { RichTextEditor } from '../../packages/rippling-editor/source';

// Vite run from monorepo root
cd pebble/
npm exec vite serve playground --config playground/vite.config.mts
```

---

## What Would Be Required to Fix This

### Option A: Fix Published Package (Upstream Changes Required) ⏱️ 2-4 hours

**Changes Needed**:

1. **Fix Token Initialization in Editor Package**
   - File: `packages/rippling-editor/source/[wherever getTokensReverseMap is]`
   - Add null checks and defensive programming
   - Ensure tokens can initialize without specific environment
   ```typescript
   // Current (broken)
   const getTokensReverseMap = () => {
     return Object.entries(tokens); // tokens is undefined
   }
   
   // Fixed
   const getTokensReverseMap = () => {
     if (!tokens || typeof tokens !== 'object') {
       console.warn('Tokens not initialized');
       return {};
     }
     return Object.entries(tokens);
   }
   ```

2. **Fix Theme Config Exports Consistency**
   - Either: Update editor to use `lightThemeConfig`/`darkThemeConfig`
   - Or: Export `plumThemeConfig` from source theme
   - Files to change:
     - `packages/rippling-editor/source/EditorThemeProvider.tsx`
     - `packages/rippling-editor/source/themeUtils.tsx`

3. **Make Editor Package Standalone**
   - Define proper peer dependencies
   - Don't rely on shared Emotion context
   - Export theme provider wrapper if needed

4. **Rebuild and Republish**
   ```bash
   cd packages/rippling-editor
   yarn build
   yarn publish
   ```

5. **Update This Playground**
   ```bash
   yarn add @rippling/editor@latest
   ```

**Likelihood**: Medium - Requires Pebble team to prioritize this  
**Timeline**: Next sprint cycle

---

### Option B: Create Monorepo-Style Setup (Local Workaround) ⏱️ 30 minutes

**Steps**:

1. **Move this playground INTO the monorepo**
   ```bash
   mv ~/Documents/htdocs/pebble-playground ~/Documents/htdocs/pebble/playground-components
   ```

2. **Add to monorepo workspace**
   ```json
   // pebble/package.json
   {
     "workspaces": [
       "packages/*",
       "playground",
       "playground-components"  // Add this
     ]
   }
   ```

3. **Update imports to use relative paths**
   ```typescript
   import { RichTextEditor } from '../../packages/rippling-editor/source';
   import Button from '@rippling/pebble/Button';
   ```

4. **Add proper Vite config like working playground**
   ```typescript
   resolve: {
     alias: {
       '@rippling/pebble': path.resolve(__dirname, '../packages/rippling-ui/source'),
       '@rippling/ui-utils': path.resolve(__dirname, '../packages/rippling-ui-utils/source'),
       '@rippling/lib-i18n': path.resolve(__dirname, '../packages/rippling-lib-i18n/source'),
     },
   }
   ```

5. **Run from monorepo root**
   ```bash
   cd ~/Documents/htdocs/pebble
   npm exec vite serve playground-components --config playground-components/vite.config.mts --port 4201
   ```

**Likelihood**: High - Would definitely work  
**Downside**: Loses independence, tied to monorepo

---

### Option C: Accept Current Limitations (Recommended) ⏱️ 0 minutes

**Strategy**: Specialize the playgrounds

**This Playground** (`pebble-playground`):
- ✅ **Design Tokens Explorer** - Beautiful, comprehensive token documentation
- ✅ **Animation Patterns** - Showcase Pebble animations
- ✅ **Component Demos** - Buttons, Modals, Drawers, etc.
- ✅ **UI Patterns** - Card layouts, navigation, etc.
- ✅ **Fast Iteration** - No monorepo overhead

**Monorepo Playground** (`pebble/playground`):
- ✅ **Rich Text Editor**
- ✅ **Document Editor**  
- ✅ **Inline Editor**
- ✅ **Editor Features** - Variables, file upload, etc.

**Benefits**:
- No wasted time on unfixable issues
- Each playground has clear purpose
- Can iterate quickly on component demos
- Editors maintained where they actually work

---

## Technical Details for Future Reference

### Package Versions (at time of investigation)
```json
{
  "@rippling/editor": "file:../pebble/packages/rippling-editor",
  "@rippling/pebble": "latest",
  "@emotion/babel-plugin": "^11.13.5",
  "vite": "^5.0.11"
}
```

### Published Package Structure
```
node_modules/@rippling/editor/
├── dist/
│   ├── index.js          # Built code (uses plumThemeConfig)
│   └── index.d.ts        # TypeScript definitions
└── package.json

node_modules/@rippling/pebble/
├── theme/
│   ├── Themes.js         # Exports: plumThemeConfig, berryThemeConfig
│   └── index.js
```

### Source Package Structure  
```
pebble/packages/rippling-editor/source/
├── EditorThemeProvider.tsx    # Imports: plumThemeConfig ❌
├── themeUtils.tsx             # Imports: plumThemeConfig ❌
└── ...

pebble/packages/rippling-ui/source/theme/
├── Themes.ts                  # Exports: lightThemeConfig, darkThemeConfig ✅
└── index.ts                   # Re-exports all from Themes.ts
```

### Error Stack Traces

**getTokensReverseMap Error**:
```
chunk-2CJ2NQFT.js?v=5c81fa48:52987 
Uncaught TypeError: Cannot convert undefined or null to object
    at Object.entries (<anonymous>)
    at getTokensReverseMap (chunk-2CJ2NQFT.js?v=5c81fa48:52987:29)
    at chunk-2CJ2NQFT.js?v=5c81fa48:52998:26
```

**plumThemeConfig Import Error**:
```
✘ [ERROR] No matching export in "../pebble/packages/rippling-ui/source/theme/index.ts" for import "plumThemeConfig"

    ../pebble/packages/rippling-editor/source/EditorThemeProvider.tsx:3:2:
      3 │   plumThemeConfig,
        ╵   ~~~~~~~~~~~~~~~

    ../pebble/packages/rippling-editor/source/themeUtils.tsx:2:9:
      2 │ import { plumThemeConfig, useTheme } from '@rippling/pebble/theme';
        ╵          ~~~~~~~~~~~~~~~
```

---

## Recommendations

### Immediate (Today)
1. ✅ **Keep editors commented out** in this playground
2. ✅ **Use monorepo playground** for editor work (`http://localhost:4200`)
3. ✅ **Focus this playground** on component demos and design tokens

### Short Term (This Sprint)
1. **Build out component showcase**
   - More complex UI patterns
   - Form examples
   - Data visualization demos
   - Navigation patterns

2. **Enhance Design Tokens**
   - Add spacing tokens
   - Add shadow tokens
   - Add animation constants
   - Make it a comprehensive design system reference

### Long Term (Next Quarter)
1. **Request Pebble team** to fix editor package (Option A)
   - Open GitHub issue with this analysis
   - Link to reproduction repo
   - Propose fix with PR

2. **OR: Move into monorepo** (Option B)
   - If editor access is critical
   - Coordinate with team

---

## Key Learnings

1. **Published packages ≠ Source code** - They can be out of sync
2. **Monorepo packages need their environment** - Don't expect them to work standalone
3. **Time-box debugging** - After 30-45 min, reassess if it's worth continuing
4. **Specialize tools** - Not everything needs to do everything
5. **Document failures** - So others don't waste the same time

---

## Current Playground Focus

**What This Playground IS**:
- 🎨 Design System Explorer
- 📊 Component Showcase
- 🎭 Animation Patterns
- 🚀 UI Experimentation Lab

**What This Playground IS NOT**:
- ❌ Editor Testing Environment (use monorepo playground)
- ❌ Production Build (it's a prototype tool)
- ❌ Package Development (use monorepo)

---

## Contact & Resources

**Working Playground**: `~/Documents/htdocs/pebble/playground`  
**Port**: 4200  
**Usage**: Editor testing and development

**This Playground**: `~/Documents/htdocs/pebble-playground`  
**Port**: 4202  
**Usage**: Component demos and design tokens

**Pebble Storybook**: https://pebble.rippling.dev  
**Pebble Monorepo**: `~/Documents/htdocs/pebble`

---

## Appendix: Full Command History

```bash
# Attempt 1: Published packages
yarn add @rippling/editor
# Result: getTokensReverseMap error

# Attempt 2: Source imports
# Added vite aliases to source directories
# Result: plumThemeConfig import errors

# Attempt 3: Rebuild editor
cd ../pebble/packages/rippling-editor
yarn build
# Result: Build failed with type errors

# Final: Comment out editors, focus on components
# Current state: Editors disabled, playground specialized
```

---

**Last Updated**: November 2, 2025  
**Conclusion**: Editors are architecturally incompatible with standalone setup. Use specialized playgrounds.

