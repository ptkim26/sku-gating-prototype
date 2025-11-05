# Pebble Component Playground 🎨

**AI-powered prototyping with our design system. Build working demos using Pebble components in minutes—no code required.**

> **🤖 For AI Coding Assistants:** Read [`AI_CONTEXT.md`](./AI_CONTEXT.md) and [`.cursorrules`](./.cursorrules) first. The `docs/` folder is your source of truth.

---

## What is This For?

**Prototype with our actual design system**, not generic components from shadcn or Material UI.

This playground bridges the gap between design exploration and engineering reality. Instead of spending hours in Figma or using generic React components that don't match Pebble, you can:

✨ **Describe your idea** → AI builds it with real Pebble components  
🎨 **See it live instantly** → Working prototype in your browser  
🔧 **Iterate quickly** → "Make it slide in from the right"  
📤 **Share the link** → Stakeholders see the real thing, not a mockup

**Why this matters:** Prototypes built with Pebble are production-ready. What you build here can deploy, not get rebuilt.

---

## Key Features

### 🤖 **AI-Powered Prototyping with Pebble** (The Main Benefit)

**The problem:** You're already prototyping with AI, but reaching for shadcn/v0 because we didn't have infrastructure to make prototyping with Pebble easy. Result: prototypes that don't match our design system and code that needs to be rebuilt.

**This playground solves that:** Ready-to-go infrastructure for AI prototyping with Pebble—no setup, just start building. Same instant-start experience as shadcn/v0, but with **our design system**. Stop rebuilding prototypes—build once with Pebble.

---

### 🎯 **Component Customization (Override System)**
- Test changes to Pebble components without touching production
- Add animations, modify behavior, adjust styling—all locally
- **Use case:** "What if our Select had a fade-in animation?" → Override it, show stakeholders, gather feedback, then propose to the design system team

---

### 📖 **Built-in Documentation & Patterns** (AI Source of Truth)

**All documentation lives in the `docs/` folder and is kept up-to-date automatically:**

#### Quick References (Start Here)
- [`COMPONENT_CATALOG.md`](./docs/COMPONENT_CATALOG.md) - Component APIs with common gotchas highlighted
- [`TOKEN_CATALOG.md`](./docs/TOKEN_CATALOG.md) - Design tokens with usage examples
- [`AI_PROMPTING_GUIDE.md`](./docs/AI_PROMPTING_GUIDE.md) - Patterns and best practices

#### Comprehensive Documentation
- **Component docs** (`docs/guides/components/`) - Synced from Confluence
  - Usage guidelines, do's/don'ts, accessibility requirements
  - Images and examples from our design team
  - Run `yarn sync-confluence` to update
- **Pebble Pathways** (`docs/guides/patterns/`) - Guided solutions for common scenarios
  - "How do I show a confirmation modal?"
  - "What's the right way to handle form validation?"
- **Design tokens** (`docs/guides/tokens/`) - Auto-generated from npm
  - Colors, typography, spacing with exact values
  - Run `yarn generate-token-docs` to update
- **Building blocks** (`docs/guides/building-blocks/`) - Rippling-specific patterns
  - Dashboards, responsive strategy, platform features

**Why this matters for AI:** When you ask an AI to build something, it checks these docs first—ensuring it uses the correct APIs, follows our patterns, and uses proper tokens. No more guessing.

---

### 🎨 **Design Token Playground**
- Visual reference for all our Pebble tokens
- See how our colors, typography, spacing work together
- Test both Berry Light/Dark themes
- Understand semantic color roles (surface, onSurface, containers)

---

### 🔧 **Live Preview & Iteration**
- Changes appear instantly—no build steps
- Iterate on animations, spacing, copy in real-time
- Test responsive behavior

---

### 📤 **Instant Sharing**
- Share a URL to your prototype
- No login required for viewers
- Present to stakeholders or get team feedback

---

## What Can You Prototype?

### Design Exploration
✅ **Test new patterns** - "How would a multi-step wizard work with our components?"  
✅ **Validate interactions** - "Does this modal → drawer flow feel right?"  
✅ **Compare alternatives** - Build 3 different approaches, share with team for feedback  
✅ **Customize components** - "What if Select had a fade-in animation?"  
✅ **Test responsive behavior** - See how your design adapts to mobile

### User Flows
✅ **Onboarding sequences** - Multi-step forms with validation and progress indicators  
✅ **Confirmation dialogs** - Test different destructive action patterns  
✅ **Form validation** - Inline errors, submit-time validation, accessibility  
✅ **Empty states** - "No data yet" with clear CTAs  
✅ **Loading states** - Skeletons, spinners, progress bars

### Component Combinations
✅ **Modal + Form** - Delete confirmation with input validation  
✅ **Drawer + DataGrid** - Edit-in-place without losing context  
✅ **SnackBar + Undo** - Success feedback with undo action  
✅ **Stepper + Validation** - Multi-step flow with field-level errors  
✅ **Notice + Buttons** - Page-level alerts with primary/secondary actions

### Animation & Micro-interactions
✅ **Entrance/exit animations** - Fade, slide, scale effects  
✅ **Loading transitions** - Skeleton → content, spinner states  
✅ **Hover states** - Interactive feedback on buttons, cards, list items  
✅ **Focus states** - Keyboard navigation visual cues  
✅ **Micro-feedback** - Button press, toggle switch, checkbox check

### Documentation & Examples
✅ **Component showcases** - Demonstrate when to use Badge vs Chip  
✅ **Pattern libraries** - Build a gallery of Pebble Pathways  
✅ **Do's and Don'ts** - Show correct vs incorrect implementations  
✅ **Accessibility examples** - Keyboard navigation, screen reader demos

---

## How It Works

### For Designers/Non-Coders
1. **Describe what you want** - _"Show me a modal with a form"_
2. **AI generates Pebble code** - Uses our components, props, and patterns
3. **See it live instantly** - No build step, just works
4. **Iterate** - _"Add loading state"_ → _"Berry Dark theme"_ → done
5. **Share** - Send the link or deploy

### For AI Coding Assistants

When a user asks to build something:

1. **Check `docs/COMPONENT_CATALOG.md` first**
   - Find the component(s) needed
   - Read "Common Gotchas" section
   - Copy example code patterns

2. **Check `docs/TOKEN_CATALOG.md` for styling**
   - Never hardcode colors, spacing, or typography
   - Use theme tokens for all visual properties
   - Follow the provided patterns

3. **Look at `src/demos/` for similar examples**
   - Copy patterns from working demos
   - Understand established conventions
   - Reuse component combinations

4. **Implement in `src/demos/your-demo.tsx`**
   - Import components from `@rippling/pebble`
   - Use `useTheme()` hook for theme tokens
   - Follow the template structure

5. **Add to `main.tsx`**
   - Add enum value to `EditorType`
   - Import the demo component
   - Add to `DEMO_OPTIONS` array
   - Add render case in JSX

**The result:** Correct Pebble usage on the first try, not after 3-4 error cycles.

---

## Collaboration Options

Choose the workflow that fits our team:

### Option 1: Solo/Personal Use 👤
**Best for:** Individual designers, one-off prototypes, learning Pebble

**How it works:**
1. Download/clone this playground to your machine
2. Work locally with full AI assistance
3. Share by deploying your demo or recording a video
4. No team coordination needed

**Pros:**
- ✅ Complete control and privacy
- ✅ No merge conflicts
- ✅ Experiment freely
- ✅ Fast iteration

**Cons:**
- ❌ Manual sharing process
- ❌ No central demo library

**Setup:**
```bash
git clone [repo-url]
cd pebble-playground
yarn install
yarn dev
```

---

### Option 2: Team Collaboration (Namespaced Demos) 👥
**Best for:** Design teams of 5-40 people working simultaneously

**How it works:**
1. Everyone works in their own namespace (`@yourname/demo-name`)
2. Demos stay private until you're ready to share
3. Promote demos to `shared/` for team visibility
4. Full Git history tracks all prototypes

**Pros:**
- ✅ No merge conflicts (everyone has their own space)
- ✅ Central demo library in `shared/`
- ✅ Version control for all prototypes
- ✅ Easy to review team's work

**Cons:**
- ❌ Requires basic Git knowledge
- ❌ Repo size grows with team

**Structure:**
```
src/demos/
├── @alice/
│   ├── modal-experiment.tsx
│   └── form-validation.tsx
├── @bob/
│   └── drawer-animations.tsx
└── shared/
    └── approved-patterns.tsx
```

**See:** [`docs/COLLABORATION_OPTIONS.md`](./docs/COLLABORATION_OPTIONS.md) for detailed guide

---

### Option 3: Individual Forks 🍴
**Best for:** Teams that want complete isolation, contractors, external partners

**How it works:**
1. Each person forks the playground repo
2. Work in your fork independently
3. Share by sending your fork's deployment URL
4. Optionally sync updates from main repo

**Pros:**
- ✅ Complete isolation
- ✅ Full control over your environment
- ✅ Easy to share with external stakeholders

**Cons:**
- ❌ Harder to discover team's prototypes
- ❌ Manual effort to sync updates

---

### Option 4: Shared Playground + Selective Loading 🔀
**Best for:** Large teams (40+) with high prototype volume

**How it works:**
1. All demos in one repo, organized by namespace
2. Playground loads only your demos by default
3. Browse team demos via UI selector
4. Keeps app fast even with 100+ demos

**Pros:**
- ✅ Scales to large teams
- ✅ Fast load times
- ✅ Central discoverability
- ✅ No repo sprawl

**Cons:**
- ❌ Requires configuration
- ❌ More complex setup

**See:** [`docs/COLLABORATION_OPTIONS.md`](./docs/COLLABORATION_OPTIONS.md) for implementation details

---

### Recommended Approach

**1-5 people?** → **Solo Use** or **Team Collaboration**  
**5-40 people?** → **Team Collaboration (Namespaced)**  
**40+ people?** → **Shared Playground + Selective Loading**  
**External partners?** → **Individual Forks**

---

## Quick Start

```bash
# Clone the repo
git clone [repo-url]
cd pebble-playground

# Install dependencies
yarn install

# Start the playground (auto-configures your personalized workspace)
yarn dev

# Visit http://localhost:4201
```

**First time here?**
- Open the playground at `http://localhost:4201`
- The homepage will greet you by name with your avatar (from git config) 🎉
- Try the "Design Tokens" demo to see what's possible
- Check out "Animations" for component motion examples
- Ask AI: "Create a modal with a delete confirmation"

**Personalization:** The setup automatically reads your `git config` to personalize your workspace:
- Your display name from `git config user.name`
- Your avatar from GitHub (if remote is configured) or Gravatar (from your email)
- Settings are stored in `.env.local` (gitignored, personal to you)
- Run `yarn setup:user` to refresh if you update your git config
- **Progressive enhancement:** Falls back to "Hi Rippler" if git config is missing - never breaks the build!

---

> **⚠️ Note**: For editor functionality (RichTextEditor, DocumentEditor, InlineEditor), use the monorepo playground at `~/htdocs/pebble/playground` (port 4200). See `EDITOR_ISSUE_ANALYSIS.md` for details.

---

## Technical Details

<details>
<summary><strong>For Engineers & Advanced Users</strong></summary>

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

### Recommended: Use Cursor AI (No Terminal Required)

The easiest way to create a new demo is through Cursor chat:

1. **Press `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)** to open Cursor chat

2. **Copy and paste this prompt** (replace "My Feature" with your demo name):
   ```
   Create a new demo called "My Feature" by copying app-shell-demo.tsx
   ```

3. **Cursor will automatically:**
   - Create a new demo file with navigation, sidebar, and content areas
   - Wire it up in `main.tsx` with routing
   - Add a card to the index page
   - Tell you the URL where your demo is live

4. **Customize the content** with follow-up prompts:
   ```
   Replace the main content with a data table showing employee records with search
   ```
   ```
   Update the sidebar navigation items
   ```

**Why this works:** The app shell template gives you a fully-functional demo structure. Focus on building your feature in the main content area—Cursor handles the boilerplate.

### Alternative: Terminal Scripts

If you prefer command-line tools:

**With app shell template:**
```bash
yarn new:shell
# Prompts for demo name, creates file with full navigation structure
```

**Simple demo (no shell):**
```bash
yarn new:demo
# Prompts for demo name and components, creates minimal template
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

## Syncing Confluence Documentation

Pull Pebble component documentation from Confluence into the playground as Markdown files:

### Quick Setup
```bash
# 1. Copy environment template
cp .env.local.example .env.local

# 2. Create API token at: https://id.atlassian.com/manage/api-tokens
# 3. Add credentials to .env.local

# 4. Find page IDs from Confluence URLs and update:
# confluence-sync.config.json

# 5. Run sync
yarn sync-confluence
```

**What gets synced:**
- Component usage guidelines
- Design patterns and best practices
- Color and typography documentation
- Accessibility requirements

**Why sync docs?**
- 🤖 AI assistants reference them automatically
- 📚 Single source of truth (Confluence)
- 🔍 Searchable, version-controlled
- 🚀 Always up-to-date

**Learn more:**
- **Quick Start:** [CONFLUENCE_SYNC_QUICKSTART.md](./CONFLUENCE_SYNC_QUICKSTART.md)
- **Full Guide:** [docs/CONFLUENCE_SYNC_GUIDE.md](./docs/CONFLUENCE_SYNC_GUIDE.md)
- **Synced Docs:** [docs/guides/](./docs/guides/)

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


