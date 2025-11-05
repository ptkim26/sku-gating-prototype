# Pebble Playground - Project Summary

**Created:** November 1, 2025  
**Location:** `/Users/paulbest/Documents/htdocs/pebble-playground`

## What Was Built

A standalone, AI-friendly prototyping environment for Rippling's Pebble Design System. This repo provides a collaborative space for designers, PMs, and AI assistants to rapidly experiment with Pebble components.

## Key Features

### 🤖 AI-Optimized
- **`.cursorrules`** - Comprehensive coding patterns and best practices for AI assistants
- **AI Prompting Guide** - Detailed component usage with examples
- **Component Catalog** - Complete reference of all Pebble components
- **Self-documenting code** - Consistent patterns across all demos

### 🎨 Pre-built Demos
- **Animations Demo** - Showcase of entrance/exit animations with before/after comparisons
- **Modal/Drawer Demo** - Interactive overlay components with theme support
- **Rich Text Editor** - Full WYSIWYG editing capabilities
- **Document Editor** - Page-based document editing
- **Inline Editor** - Compact single-line editing

### 🛠️ Developer Experience
- **Interactive demo creation** - `yarn new:demo` to scaffold new demos
- **Theme switching** - Real-time light/dark theme toggle (berry variants)
- **Hot module replacement** - Instant feedback during development
- **Keyboard shortcuts** - `Cmd/Ctrl+K` to toggle UI
- **Type-safe** - Full TypeScript support throughout

### 📚 Documentation
- **README.md** - Project overview and quick start
- **SETUP_GUIDE.md** - Detailed installation and troubleshooting
- **AI_PROMPTING_GUIDE.md** - How to work with Pebble components
- **COMPONENT_CATALOG.md** - Complete component reference
- **AI_WRAPPER_INTEGRATION.md** - Integration with AI wrapper packages

## File Structure

```
pebble-playground/
├── .cursorrules                 # AI assistant rules
├── .eslintrc.cjs                # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .gitignore                   # Git ignore patterns
├── package.json                 # Dependencies & scripts
├── vite.config.mts              # Vite build config
├── tsconfig.json                # TypeScript config
├── index.html                   # HTML entry point
│
├── docs/                        # Documentation
│   ├── AI_PROMPTING_GUIDE.md
│   ├── COMPONENT_CATALOG.md
│   └── AI_WRAPPER_INTEGRATION.md
│
├── scripts/                     # Helper scripts
│   └── create-demo.mjs          # Interactive demo creator
│
├── public/                      # Static assets
│   └── favicon.ico
│
└── src/                         # Source code
    ├── main.tsx                 # Application entry point
    ├── __mock__/                # Mock data
    │   └── mockVariables.ts
    ├── demos/                   # Demo components
    │   ├── animations-demo.tsx
    │   ├── modal-demo.tsx
    │   ├── ForkedSelect/        # Example of component forking
    │   ├── AnimatedForkedSelect.tsx
    │   ├── AnimatedSelect.tsx
    │   └── AnimatedDropdown.tsx
    ├── components/              # Reusable playground components
    └── utils/                   # Utilities
        └── animation-constants.ts
```

## What's Different from Original Playground

### Original (in `/pebble/playground/`)
- Embedded in main Pebble repo
- Requires full Pebble repo setup
- Couples prototyping with engineering workflow
- Not easily shareable

### New (in `/pebble-playground/`)
- ✅ Standalone repository
- ✅ Independent of Pebble repo (uses published packages)
- ✅ AI-optimized with comprehensive documentation
- ✅ Easy to clone and share
- ✅ Focused on prototyping, not engineering
- ✅ Interactive demo scaffolding
- ✅ Git-tracked for collaboration

## Integration with AI Wrapper

The playground is designed to work seamlessly with AI wrapper packages:

```
AI Wrapper → Generates Code → Playground Validates → Visual Feedback
```

See `docs/AI_WRAPPER_INTEGRATION.md` for:
- Shared component schemas
- Validation patterns
- Code generation → rendering workflow
- Feedback loop implementation

## Next Steps

### 1. Install Dependencies

```bash
cd /Users/paulbest/Documents/htdocs/pebble-playground
yarn install
```

**Note:** You may need to configure access to Rippling's internal package registry or use local linking. See `SETUP_GUIDE.md` for details.

### 2. Start Development Server

```bash
yarn dev
```

Open http://localhost:4201

### 3. Create Your First Demo

```bash
yarn new:demo
```

### 4. Share with Team

#### Option A: GitHub (Recommended)

```bash
# Create repo on GitHub: https://github.com/Rippling/pebble-playground
git remote add origin git@github.com:Rippling/pebble-playground.git
git push -u origin main
```

#### Option B: Share as Archive

```bash
cd /Users/paulbest/Documents/htdocs
tar -czf pebble-playground.tar.gz pebble-playground/
# Share the .tar.gz file
```

## For AI Wrapper Team

Key files to review:
1. **`docs/AI_WRAPPER_INTEGRATION.md`** - Integration architecture and API
2. **`.cursorrules`** - Understand the coding patterns
3. **`docs/COMPONENT_CATALOG.md`** - Component schemas to consume
4. **`src/demos/`** - Reference implementations

The playground can serve as:
- **Validation environment** for AI-generated code
- **Pattern library** for training data
- **Visual testing** for component combinations

## Collaboration Model

### For Designers/PMs
- Clone repo
- Run `yarn dev`
- Use `yarn new:demo` to prototype ideas
- Share demos via GitHub PRs

### For Engineers
- Reference implementations in main Pebble repo (`/pebble/playground/`)
- Playground for quick validation before building in main repo
- Test new components with real-world scenarios

### For AI Assistants
- Read `.cursorrules` for context
- Reference `docs/AI_PROMPTING_GUIDE.md` for patterns
- Generate code that runs in the playground
- Learn from validated examples in `src/demos/`

## Success Metrics

Track these to measure playground effectiveness:
- Number of demos created
- AI-generated code success rate
- Time from idea to working prototype
- Component coverage (% of Pebble components with demos)
- Validation error types and frequency

## Known Limitations

1. **Package Access** - Requires access to `@rippling/pebble` npm packages
2. **Editor Components** - RichTextEditor/DocumentEditor may have heavy dependencies
3. **GlobalStyle Import** - May need adjustment based on Pebble version
4. **Theme Variants** - Currently only includes berry themes

See `SETUP_GUIDE.md` for troubleshooting.

## Maintenance

### Updating Pebble Version

```bash
yarn upgrade @rippling/pebble@latest
yarn upgrade @rippling/pebble-editor@latest
```

### Adding New Demos

```bash
yarn new:demo
# Follow prompts
# Add to main.tsx EditorType enum and DEMO_OPTIONS
```

### Syncing with Main Repo

Periodically check `/pebble/playground/` for new demos and patterns to port over.

## Recognition

This playground architecture was designed based on:
- Existing Pebble playground in main repo
- Best practices from shadcn/ui
- Emil Kowalski's animation principles
- AI-first development patterns

---

## Quick Reference

**Location:** `/Users/paulbest/Documents/htdocs/pebble-playground`  
**Port:** 4201  
**Git:** Initialized (ready to push to GitHub)  
**Scripts:**
- `yarn dev` - Start dev server
- `yarn new:demo` - Create new demo
- `yarn lint` - Lint code
- `yarn format` - Format code
- `yarn build` - Build for production

**Questions?**
- See `SETUP_GUIDE.md` for installation help
- See `docs/AI_PROMPTING_GUIDE.md` for component usage
- Internal Slack: `#pebble-dev`

---

**Status:** ✅ Ready to use! All demos, documentation, and tooling are in place.


