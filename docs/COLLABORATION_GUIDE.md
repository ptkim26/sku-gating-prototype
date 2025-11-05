# Collaboration Guide for Pebble Playground

## Overview
This guide explains how to collaborate on the Pebble Playground with a team of 30-40 designers.

## Recommended Approach: Namespaced Demos + Selective Loading

### Directory Structure

```
src/demos/
├── shared/              # Curated demos visible to everyone
│   ├── design-tokens-demo.tsx
│   └── animations-demo.tsx
├── @alice/             # Alice's personal demos
│   ├── button-exploration.tsx
│   └── form-patterns.tsx
├── @bob/               # Bob's personal demos
│   └── navigation-prototype.tsx
└── @charlie/           # Charlie's personal demos
    └── dashboard-concept.tsx
```

### Environment-Based Demo Loading

1. **Create a demo registry** (`src/demos/registry.ts`):

```typescript
import { EditorType } from '../main';

interface DemoConfig {
  id: string;
  label: string;
  path: string;
  author: string;
  visibility: 'shared' | 'personal';
  tags?: string[];
}

export const DEMO_REGISTRY: DemoConfig[] = [
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    path: './shared/design-tokens-demo.tsx',
    author: 'team',
    visibility: 'shared',
    tags: ['foundations', 'tokens'],
  },
  {
    id: 'animations',
    label: 'Animations',
    path: './shared/animations-demo.tsx',
    author: 'team',
    visibility: 'shared',
    tags: ['animations'],
  },
  {
    id: 'alice-buttons',
    label: 'Button Exploration',
    path: './@alice/button-exploration.tsx',
    author: 'alice',
    visibility: 'personal',
    tags: ['buttons', 'exploration'],
  },
  // ... more demos
];

// Filter demos based on environment variable
export function getVisibleDemos() {
  const showPersonal = import.meta.env.VITE_SHOW_PERSONAL_DEMOS === 'true';
  const authorFilter = import.meta.env.VITE_AUTHOR_FILTER;

  return DEMO_REGISTRY.filter(demo => {
    // Always show shared demos
    if (demo.visibility === 'shared') return true;
    
    // If personal demos are disabled, hide them
    if (!showPersonal) return false;
    
    // If author filter is set, only show that author's demos
    if (authorFilter && demo.author !== authorFilter) return false;
    
    return true;
  });
}
```

2. **Create `.env` files for different modes**:

`.env.local` (Each designer's personal config, gitignored):
```bash
# Show only my demos + shared demos
VITE_SHOW_PERSONAL_DEMOS=true
VITE_AUTHOR_FILTER=alice
```

`.env.production` (For shared deployments):
```bash
# Show only shared demos
VITE_SHOW_PERSONAL_DEMOS=false
```

3. **Update `main.tsx` to use registry**:
```typescript
import { getVisibleDemos } from './demos/registry';

const visibleDemos = getVisibleDemos();
// Use visibleDemos to populate the dropdown
```

### Git Configuration

**`.gitignore`:**
```
# Personal environment config
.env.local

# Optionally: ignore personal demo folders (if you want)
# src/demos/@*/
```

**`package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite --port 4201",
    "dev:all": "VITE_SHOW_PERSONAL_DEMOS=true vite --port 4201",
    "dev:shared": "VITE_SHOW_PERSONAL_DEMOS=false vite --port 4201",
    "dev:me": "vite --port 4201",
    "build:shared": "vite build --mode production"
  }
}
```

### Workflow

1. **Daily Work:**
   - Designers work in their `@username/` folder
   - Run `yarn dev:me` to see only their demos + shared demos
   - Commit and push their own demos freely

2. **Sharing a Demo:**
   - Move demo from `@username/` to `shared/`
   - Update registry to mark as `visibility: 'shared'`
   - Create PR for team review

3. **Avoiding Conflicts:**
   - Each designer owns their namespace
   - Shared demos require PR review
   - Registry is the only "shared" file that might conflict (easy to resolve)

---

## Option 2: Individual Forks + Upstream Sync

### Setup

1. **Main Repo** (`rippling/pebble-playground`):
   - Contains base playground infrastructure
   - Shared demos in `src/demos/`
   - Updated via team PRs

2. **Individual Forks** (`alice/pebble-playground`):
   - Each designer forks the main repo
   - Add their own demos
   - Deploy to personal Vercel/Netlify

### Workflow

```bash
# Initial setup
git clone git@github.com:alice/pebble-playground.git
cd pebble-playground
git remote add upstream git@github.com:rippling/pebble-playground.git

# Daily work
git checkout -b my-new-demo
# ... make changes ...
git commit -m "Add button exploration demo"
git push origin my-new-demo

# Sync with team updates
git fetch upstream
git rebase upstream/main

# Share a demo with team
# 1. Create PR from your fork to main repo
# 2. Team reviews and merges
```

### Deployment

Each designer gets their own deployment:

**`vercel.json`:**
```json
{
  "github": {
    "enabled": true,
    "autoAlias": true
  }
}
```

- Alice's fork → `alice-pebble.vercel.app`
- Bob's fork → `bob-pebble.vercel.app`
- Main repo → `pebble-playground.vercel.app`

**Pros:**
- Complete isolation between designers
- Easy personal deployment
- Can experiment freely without affecting others

**Cons:**
- Syncing upstream changes can be tedious
- Harder to discover what others are working on
- Duplicate infrastructure

---

## Option 3: Feature Branch Workflow

### Structure

```
main
├── feature/alice-buttons
├── feature/bob-navigation
├── feature/charlie-dashboard
```

### Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/alice-buttons
   ```

2. **Add your demos:**
   - Work in `src/demos/`
   - Commit to your branch
   - Push to remote

3. **Deploy preview:**
   - Vercel/Netlify auto-deploys each branch
   - `feature-alice-buttons.pebble-playground.vercel.app`

4. **Merge to main:**
   - When ready to share, create PR
   - Team reviews
   - Merge into main

**Pros:**
- Standard Git workflow
- Automatic preview deployments
- Easy code review

**Cons:**
- Branch management overhead
- Potential merge conflicts on `main.tsx`
- Need to keep branches up to date

---

## Option 4: Monorepo with Micro-Frontends

### Structure

```
pebble-playground/
├── apps/
│   ├── shared/          # Main playground app
│   ├── alice/           # Alice's playground instance
│   ├── bob/             # Bob's playground instance
│   └── charlie/         # Charlie's playground instance
├── packages/
│   ├── playground-core/ # Shared playground infrastructure
│   └── demo-registry/   # Shared demo registry
```

**Tools:** Nx, Turborepo, or Yarn/PNPM workspaces

**Benefits:**
- Complete isolation
- Shared infrastructure via packages
- Selective builds
- Independent deployments

**Drawbacks:**
- Complex setup
- Requires monorepo tooling knowledge
- Higher maintenance overhead

---

## Comparison Matrix

| Approach | Isolation | Discoverability | Sync Effort | Setup Complexity | Recommended For |
|----------|-----------|----------------|-------------|------------------|----------------|
| **Namespaced Demos** | Medium | High | Low | Low | **Most teams** |
| **Individual Forks** | High | Low | High | Medium | Fully autonomous designers |
| **Feature Branches** | Low | High | Medium | Low | Small, tightly coordinated teams |
| **Monorepo** | High | High | Low | High | Enterprise scale (100+ designers) |

---

## Recommended Implementation Plan

### Phase 1: Quick Start (Week 1)
1. Implement namespaced demo structure
2. Add `.env.local` support
3. Create demo registry
4. Update documentation

### Phase 2: Tooling (Week 2-3)
1. Create CLI tool to generate new demos: `yarn new-demo @alice/button-exploration`
2. Add demo search/filter UI in the playground
3. Set up Vercel deployment for main branch

### Phase 3: Scale (Month 2)
1. Add demo discovery page (gallery view)
2. Implement tags/categories for demos
3. Add demo metadata (description, screenshots, links)
4. Set up automated preview deployments for PRs

---

## CLI Tool Concept

```bash
# Generate a new demo in your namespace
yarn new-demo @alice/button-exploration

# This creates:
# - src/demos/@alice/button-exploration.tsx (from template)
# - Updates src/demos/registry.ts
# - Updates your .env.local if needed
```

**Implementation:** `scripts/new-demo.mjs`

---

## Discovery & Navigation

Add a **Demo Gallery** view to the playground:

```typescript
interface DemoGalleryProps {
  demos: DemoConfig[];
}

const DemoGallery: React.FC<DemoGalleryProps> = ({ demos }) => {
  const [filter, setFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const filteredDemos = demos.filter(demo => {
    if (selectedTag && !demo.tags?.includes(selectedTag)) return false;
    if (filter && !demo.label.toLowerCase().includes(filter.toLowerCase())) return false;
    return true;
  });
  
  return (
    <div>
      <SearchBar value={filter} onChange={setFilter} />
      <TagFilter tags={allTags} selected={selectedTag} onChange={setSelectedTag} />
      <Grid>
        {filteredDemos.map(demo => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </Grid>
    </div>
  );
};
```

---

## Best Practices

### 1. Demo Naming Convention
```
@{designer}/{feature}-{type}.tsx

Examples:
- @alice/button-states-exploration.tsx
- @bob/dashboard-layout-prototype.tsx
- @charlie/form-validation-pattern.tsx
```

### 2. Demo Metadata
Include metadata at top of each demo file:
```typescript
/**
 * @demo Button Exploration
 * @author Alice (@alice)
 * @created 2024-11-02
 * @tags buttons, states, accessibility
 * @description Exploring various button states and interactions
 */
```

### 3. Shared Components
Create reusable demo components:
```
src/demo-components/
├── DemoSection.tsx
├── ColorSwatch.tsx
├── CodeExample.tsx
└── StateToggle.tsx
```

### 4. Documentation
Each designer should document their demos:
```
src/demos/@alice/README.md

# Alice's Demos

## button-exploration
Exploring button states, sizes, and variants...

## form-patterns
Testing various form validation patterns...
```

---

## Rollout Checklist

- [ ] Choose collaboration model (recommend: Namespaced Demos)
- [ ] Set up directory structure
- [ ] Create demo registry
- [ ] Add environment variable support
- [ ] Update `.gitignore`
- [ ] Create CLI tool for new demos
- [ ] Document workflow
- [ ] Train team on Git workflow
- [ ] Set up Vercel deployment
- [ ] Create demo gallery UI
- [ ] Establish PR review process for shared demos

---

## Questions to Decide

1. **Demo Persistence:** Should personal demos be committed to main repo or gitignored?
2. **Curation:** Who decides what moves from personal → shared?
3. **Cleanup:** How often should old personal demos be archived?
4. **Deployment:** One shared deployment or individual deployments?
5. **Discoverability:** How do designers discover what others are working on?



