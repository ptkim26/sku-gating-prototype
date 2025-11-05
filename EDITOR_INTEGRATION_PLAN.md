# Editor Integration Plan - Gap Analysis & Scope

## Current State Analysis

### Working Playground (`~/htdocs/pebble/playground`)
**Location**: `/Users/paulbest/Documents/htdocs/pebble/playground`
**Port**: 4200

**Key Characteristics**:
1. **Direct Source Imports**: Uses relative imports from the pebble monorepo
   ```typescript
   import { DocumentEditor, InlineEditor, RichTextEditor } 
     from '../../packages/rippling-editor/source';
   import GlobalStyle from '../../packages/rippling-ui/source/GlobalStyle';
   ```

2. **Vite Aliases**: Configured to alias packages to their source directories
   ```typescript
   resolve: {
     alias: {
       '@rippling/pebble': path.resolve(__dirname, '../packages/rippling-ui/source'),
       '@rippling/ui-utils': path.resolve(__dirname, '../packages/rippling-ui-utils/source'),
       '@rippling/lib-i18n': path.resolve(__dirname, '../packages/rippling-lib-i18n/source'),
     },
   }
   ```

3. **CSS Inliner Setup**: Has working CSS inliner for document export
   ```typescript
   async function getCSSInliner(): Promise<typeof Inline> { ... }
   ```

4. **Theme Config**: Uses older theme config names from source
   ```typescript
   import { darkThemeConfig, lightThemeConfig, darkThemeBerryConfig, lightThemeBerryConfig }
   ```

5. **Editor Types Defined**:
   - RICH_TEXT
   - DOCUMENT
   - INLINE
   - MODAL_DEMO
   - ANIMATIONS

---

### Current Playground (`~/Documents/htdocs/pebble-playground`)
**Location**: `/Users/paulbest/Documents/htdocs/pebble-playground`
**Port**: 4202 (4201 configured, 4201 taken so uses 4202)

**Key Characteristics**:
1. **Published Package Imports**: Uses npm packages
   ```typescript
   "@rippling/editor": "file:../pebble/packages/rippling-editor"
   ```
   - Package is installed in `node_modules/@rippling/editor/`
   - Contains built `dist/` directory with compiled code

2. **No Vite Aliases**: Simple config without monorepo aliases
   ```typescript
   resolve: {
     alias: {
       '@': '/src',  // Only local alias
     },
   }
   ```

3. **Commented Out Code**: All editor code is currently commented out
   - Editor imports commented
   - CSS inliner commented
   - Editor rendering logic commented

4. **Theme Config**: Updated to use published package exports
   ```typescript
   import { THEME_CONFIGS } from '@rippling/pebble/theme';
   ```

5. **Current Editor Types**:
   - DESIGN_TOKENS
   - MODAL_DEMO
   - ANIMATIONS

---

## Gap Analysis

### 1. **Package Resolution** ✅ ALREADY AVAILABLE
- ✅ `@rippling/editor` package is installed in `node_modules`
- ✅ Package exports `RichTextEditor`, `DocumentEditor`, `InlineEditor`
- ✅ Package has proper TypeScript definitions

### 2. **Import Paths** ⚠️ NEEDS UPDATE
**Gap**: Code currently imports from `@rippling/pebble-editor` (doesn't exist)
**Reality**: Package is `@rippling/editor`

**Current (Wrong)**:
```typescript
import { DocumentEditor, InlineEditor, RichTextEditor } 
  from '@rippling/pebble-editor';
```

**Should Be**:
```typescript
import { DocumentEditor, InlineEditor, RichTextEditor } 
  from '@rippling/editor';
```

### 3. **CSS Inliner** ⚠️ COMMENTED OUT
**Gap**: `getCSSInliner()` function is commented out
**Dependencies**:
- ✅ `@css-inline/css-inline-wasm` is in package.json (v0.17.0)
- ✅ WASM file loading logic exists but commented

**Status**: Can be uncommented and should work

### 4. **State Management** ⚠️ NEEDS RESTORATION
**Gap**: Editor state variables commented out
- `inlineCSS` state
- Editor type enum values (RICH_TEXT, DOCUMENT, INLINE)
- Editor-specific settings

### 5. **Theme Configuration** ⚠️ POTENTIAL ISSUE
**Gap**: Working playground uses source theme configs, current uses published

**Working Playground**:
```typescript
darkThemeConfig, lightThemeConfig // From source
```

**Current Playground**:
```typescript
THEME_CONFIGS // From published package
```

**Assessment**: Should be compatible, both work with ThemeProvider

### 6. **Emotion Babel Plugin** ✅ ALREADY CONFIGURED
- ✅ Plugin installed: `@emotion/babel-plugin@11.13.5`
- ✅ Vite configured with babel plugin
- ✅ Component selectors working (tested with ForkedSelect)

### 7. **Dependencies Comparison**

| Package | Working Playground | Current Playground | Status |
|---------|-------------------|-------------------|---------|
| `@rippling/editor` | `file:../pebble/packages/rippling-editor` | `file:../pebble/packages/rippling-editor` | ✅ Same |
| `@css-inline/css-inline-wasm` | `^0.17.0` | `^0.17.0` | ✅ Same |
| `@emotion/babel-plugin` | `^11.11.0` (likely) | `^11.13.5` | ✅ Compatible |
| Lexical packages | Present | Present | ✅ Same |

---

## Implementation Plan

### Phase 1: Restore Editor Imports (Low Risk)
**Estimated Time**: 10 minutes

1. **Update imports** in `src/main.tsx`:
   ```typescript
   // Change from (commented):
   // } from '@rippling/pebble-editor';
   
   // To:
   } from '@rippling/editor';
   ```

2. **Uncomment editor imports**:
   ```typescript
   import {
     DocumentEditor,
     InlineEditor,
     RichTextEditor,
   } from '@rippling/editor';
   ```

3. **Add editor types** to EditorType enum:
   ```typescript
   enum EditorType {
     RICH_TEXT = 'rich-text',
     DOCUMENT = 'document',
     INLINE = 'inline',
     MODAL_DEMO = 'modal-demo',
     ANIMATIONS = 'animations',
     DESIGN_TOKENS = 'design-tokens',
   }
   ```

### Phase 2: Restore CSS Inliner (Low Risk)
**Estimated Time**: 5 minutes

1. **Uncomment CSS inliner function**:
   ```typescript
   async function getCSSInliner(): Promise<typeof Inline> { ... }
   ```

2. **Restore state and effect**:
   ```typescript
   const [inlineCSS, setInlineCSS] = React.useState<typeof Inline>();
   
   React.useEffect(() => {
     getCSSInliner().then(setInlineCSS);
   }, []);
   ```

3. **Pass to DocumentEditor**:
   ```typescript
   <DocumentEditor
     inlineCSS={inlineCSS}
     // ... other props
   />
   ```

### Phase 3: Restore Editor UI Components (Medium Risk)
**Estimated Time**: 15 minutes

1. **Update DEMO_OPTIONS array**:
   ```typescript
   const DEMO_OPTIONS = [
     { type: EditorType.RICH_TEXT, label: 'Rich Text Editor' },
     { type: EditorType.DOCUMENT, label: 'Document Editor' },
     { type: EditorType.INLINE, label: 'Inline Editor' },
     { type: EditorType.DESIGN_TOKENS, label: 'Design Tokens' },
     { type: EditorType.MODAL_DEMO, label: 'Drawer Demo' },
     { type: EditorType.ANIMATIONS, label: 'Animations' },
   ];
   ```

2. **Uncomment editor rendering sections**:
   - RichTextEditor component
   - DocumentEditor component
   - InlineEditor component

3. **Restore editor state management**:
   - Default to RICH_TEXT or DESIGN_TOKENS
   - Restore all commented state storage

### Phase 4: Testing & Validation (Medium Risk)
**Estimated Time**: 20 minutes

1. **Test each editor type**:
   - [ ] Rich Text Editor loads
   - [ ] Document Editor loads
   - [ ] Inline Editor loads
   - [ ] Can switch between editors
   - [ ] Typing works in each editor

2. **Test CSS inliner**:
   - [ ] Document Editor export works
   - [ ] Styles are properly inlined

3. **Test interactions**:
   - [ ] Theme toggle works with editors
   - [ ] Can switch between editors and demos
   - [ ] Settings work (editable, disabled, etc.)

4. **Check console for errors**:
   - [ ] No import errors
   - [ ] No runtime errors
   - [ ] No WASM loading errors

### Phase 5: Optional Enhancements (Low Priority)
**Estimated Time**: 30 minutes

1. **Reorder demos** to match working playground
2. **Update default demo** (currently DESIGN_TOKENS, maybe RICH_TEXT?)
3. **Add editor preview modes** (HTML, JSON) if desired
4. **Performance logging** toggle

---

## Risk Assessment

### Low Risk ✅
- Changing import path from `@rippling/pebble-editor` to `@rippling/editor`
- Uncommenting CSS inliner (dependencies already installed)
- Adding editor types to enum
- Restoring editor rendering JSX (already commented, just needs uncommenting)

### Medium Risk ⚠️
- CSS inliner WASM file loading (edge case: might need specific Vite config)
- Editor state management interactions
- Theme compatibility with editors

### High Risk ❌
- None identified - package is already installed and working in the other playground

---

## Why It Works There But Not Here

### Root Cause
**The current playground has ALL the code and dependencies needed** - it's just commented out! The previous developer commented everything out to debug the `@rippling/pebble-editor` import error (which was actually `@rippling/editor`).

### Key Differences
1. **Import Path**: Working playground uses correct `@rippling/editor`, current one had wrong path
2. **Code State**: Working playground has active code, current one has commented code
3. **Project Structure**: Working playground is IN the monorepo, current is standalone
4. **Vite Aliases**: Working playground uses source aliases, current uses published packages

### But They're Compatible!
The current playground CAN use the published `@rippling/editor` package - it's already installed in `node_modules` and properly built. We just need to:
1. Fix the import path
2. Uncomment the code
3. Test it works

---

## Estimated Total Time
- **Minimum**: 30 minutes (just get it working)
- **Complete**: 50 minutes (with testing and polish)
- **With enhancements**: 80 minutes

---

## Recommended Approach

### Option A: Quick Fix (30 min)
1. Fix import path to `@rippling/editor`
2. Uncomment all editor code
3. Basic smoke test
4. ✅ **RECOMMENDED FOR SPEED**

### Option B: Careful Migration (50 min)
1. Phase 1: Imports
2. Phase 2: CSS Inliner
3. Phase 3: UI Components
4. Phase 4: Full Testing
5. ✅ **RECOMMENDED FOR QUALITY**

### Option C: Full Feature Parity (80 min)
1. All of Option B
2. Phase 5: Enhancements
3. Documentation updates
4. ✅ **RECOMMENDED IF YOU WANT PERFECT MATCH**

---

## Decision Points

Before implementing, confirm:
1. **Do you want all three editors?** (Rich Text, Document, Inline)
   - Or just specific ones?

2. **Default demo?**
   - Keep DESIGN_TOKENS as default?
   - Or switch to RICH_TEXT like the other playground?

3. **CSS Inliner priority?**
   - Needed immediately?
   - Or can be added later?

4. **Testing depth?**
   - Quick smoke test?
   - Or full validation?

---

## Next Steps

Once you give the go-ahead, I'll execute the plan in phases with clear checkpoints for validation.

