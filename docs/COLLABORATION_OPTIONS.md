# Collaboration Options for Pebble Playground
**Team Size:** 30-40 Designers  
**Last Updated:** November 2, 2024

---

## TL;DR Recommendation

**Use Option 1: Namespaced Demos + Selective Loading**

This gives you the best balance of collaboration, isolation, and discoverability for a design team of 30-40 people. You get one source of truth, personal workspaces, and no merge conflicts.

---

## Option 1: Namespaced Demos + Selective Loading ⭐

### How It Works

```
src/demos/
├── shared/              # Curated, team-wide demos
│   ├── design-tokens-demo.tsx
│   └── animations-demo.tsx
├── @alice/             # Alice's personal workspace
│   ├── button-exploration.tsx
│   └── form-patterns.tsx
├── @bob/               # Bob's personal workspace
│   └── navigation-prototype.tsx
└── @charlie/           # Charlie's personal workspace
    └── dashboard-concept.tsx
```

**Environment Variables:**
```bash
# .env.local (gitignored, personal config)
VITE_AUTHOR_FILTER=alice
VITE_SHOW_PERSONAL_DEMOS=true

# Daily commands
yarn dev:me        # Shows only your demos + shared
yarn dev:all       # Shows everything (for leads)
yarn dev:shared    # Shows only shared demos
```

**Demo Registry** (`src/demos/registry.ts`):
```typescript
export const DEMO_REGISTRY = [
  {
    id: 'design-tokens',
    label: 'Design Tokens',
    path: './shared/design-tokens-demo.tsx',
    author: 'team',
    visibility: 'shared',
  },
  {
    id: 'alice-buttons',
    label: 'Button Exploration',
    path: './@alice/button-exploration.tsx',
    author: 'alice',
    visibility: 'personal',
  },
];
```

### Workflow

1. **Daily Work:**
   - Work in your `@username/` folder
   - Run `yarn dev:me` to see only your demos + shared
   - Commit and push freely

2. **Sharing a Demo:**
   - Move demo from `@username/` → `shared/`
   - Update registry visibility to `'shared'`
   - Create PR for team review

3. **Discovering Others' Work:**
   - Run `yarn dev:all` to see everything
   - Browse demo gallery UI (filtered by tags/author)

### Pros
- ✅ One source of truth (single repo)
- ✅ Easy to discover what others are doing
- ✅ No merge conflicts (each person owns their namespace)
- ✅ Choose what to load (no performance bloat)
- ✅ Git history for all work
- ✅ Familiar Git workflow

### Cons
- ❌ Requires initial setup (registry, env vars, CLI tool)
- ❌ Git repo grows over time (mitigate with quarterly archives)
- ❌ Everyone can see everyone's WIP (if they run `dev:all`)

### Best For
- Most teams (10-50 people)
- Collaborative environments
- Design systems teams
- Teams that value discoverability

### Implementation Effort
🟢 **Low-Medium** - 1-2 days for full setup

---

## Option 2: Individual Forks + Upstream Sync

### How It Works

**Main Repository:**
- `rippling/pebble-playground` - Infrastructure + shared demos
- Updated via team PRs
- Deployed to `pebble-playground.vercel.app`

**Individual Forks:**
- `alice/pebble-playground` - Alice's fork with her demos
- `bob/pebble-playground` - Bob's fork with his demos
- Each deployed to personal Vercel: `alice-pebble.vercel.app`

### Workflow

```bash
# Initial setup
git clone git@github.com:alice/pebble-playground.git
git remote add upstream git@github.com:rippling/pebble-playground.git

# Daily work
# ... make changes to your fork ...
git push origin main

# Sync with team updates
git fetch upstream
git rebase upstream/main

# Share a demo
# Create PR from your fork → main repo
```

### Pros
- ✅ Complete autonomy (no one sees your WIP unless you share)
- ✅ Experiment freely without affecting others
- ✅ Personal deployment with custom domain
- ✅ No repo bloat (your fork is just your work)
- ✅ Can customize infrastructure for your needs

### Cons
- ❌ Hard to discover what others are working on
- ❌ Syncing upstream is tedious and error-prone
- ❌ Duplicate infrastructure across 40 forks
- ❌ Friction to contribute back to main repo

### Best For
- Fully autonomous designers
- Agency/contractor model
- Teams that rarely collaborate
- External contributors

### Implementation Effort
🟡 **Medium** - 1 day to set up fork workflow + docs

---

## Option 3: Feature Branch Workflow

### How It Works

**Single Repository with Branches:**
```
main (shared demos only)
├── feature/alice-buttons
├── feature/bob-navigation
├── feature/charlie-dashboard
└── ... (40+ branches)
```

**Vercel Auto-Deploys:**
- `main` → `pebble-playground.vercel.app`
- `feature/alice-buttons` → `feature-alice-buttons.vercel.app`
- Every PR gets a preview deployment

### Workflow

```bash
# Create your feature branch
git checkout -b feature/alice-buttons

# Work on your demo
# ... make changes ...
git commit -am "Add button exploration demo"
git push origin feature/alice-buttons

# Merge to main when ready
# Create PR → team reviews → merge
```

### Pros
- ✅ Standard Git workflow (familiar to engineers)
- ✅ Automatic preview deployments for every PR
- ✅ Built-in code review via pull requests
- ✅ Easy to see all active work (branch list)

### Cons
- ❌ Merge conflicts on `main.tsx` when adding new demos
- ❌ Need to keep branches up to date with `main`
- ❌ Branch management overhead (40+ active branches)
- ❌ Stale branches accumulate (need cleanup policy)

### Best For
- Small teams (5-10 people)
- Teams with strong Git skills
- Short-lived experiments (1-2 weeks)

### Implementation Effort
🟢 **Low** - < 1 hour (just set up Vercel)

---

## Option 4: Monorepo with Micro-Frontends

### How It Works

```
pebble-playground/
├── apps/
│   ├── shared/              # Main playground app
│   ├── alice/               # Alice's playground instance
│   ├── bob/                 # Bob's playground instance
│   └── charlie/             # Charlie's playground instance
├── packages/
│   ├── playground-core/     # Shared infrastructure
│   ├── demo-components/     # Reusable demo components
│   └── demo-registry/       # Shared demo registry
├── package.json             # Root package.json
└── turbo.json               # Turborepo config (or nx.json)
```

**Tools:** Nx, Turborepo, or PNPM workspaces

### Workflow

```bash
# Work in your app
cd apps/alice
yarn dev

# Build only what changed
turbo run build --filter=alice

# Deploy independently
vercel --cwd apps/alice
```

### Pros
- ✅ Complete isolation (separate apps)
- ✅ Shared infrastructure via packages (DRY)
- ✅ Selective builds (fast CI/CD)
- ✅ Independent deployments
- ✅ Scales to 100+ people

### Cons
- ❌ Complex setup (monorepo tooling expertise required)
- ❌ Higher maintenance overhead
- ❌ Overkill for most teams
- ❌ Steeper learning curve for designers

### Best For
- Enterprise scale (100+ people)
- Complex organizations with multiple sub-teams
- Teams already using monorepo tools

### Implementation Effort
🔴 **High** - 1-2 weeks for proper setup

---

## Option 5: Git Submodules (Bonus)

### How It Works

```
pebble-playground/
├── core/                    # Main playground
├── demos/
│   ├── alice/  (submodule → alice/demos repo)
│   ├── bob/    (submodule → bob/demos repo)
│   └── charlie/ (submodule → charlie/demos repo)
```

### Workflow

```bash
# Add a new designer's demos
git submodule add git@github.com:alice/demos.git demos/alice

# Update all submodules
git submodule update --remote

# Commit submodule changes
cd demos/alice
git commit -am "Update"
cd ../..
git add demos/alice
git commit -m "Update Alice's demos"
```

### Pros
- ✅ Separate repos, but appears as one
- ✅ Each designer controls their own repo
- ✅ Version demos independently

### Cons
- ❌ Submodules are notoriously painful to work with
- ❌ Not beginner-friendly
- ❌ Easy to get out of sync
- ❌ Nested Git repos are confusing

### Best For
- **No one** (seriously, avoid submodules unless you have a very specific need)

### Implementation Effort
🟡 **Medium** - But high ongoing pain

---

## Comparison Matrix

| Criteria | Namespaced | Forks | Feature Branches | Monorepo |
|----------|-----------|-------|-----------------|----------|
| **Setup Time** | 🟢 1 day | 🟡 1 day | 🟢 < 1 hour | 🔴 1-2 weeks |
| **Autonomy** | 🟡 Medium | 🟢 High | 🔴 Low | 🟢 High |
| **Discoverability** | 🟢 High | 🔴 Low | 🟢 High | 🟡 Medium |
| **Merge Conflicts** | 🟢 Rare | 🟢 None | 🔴 Frequent | 🟢 Rare |
| **Learning Curve** | 🟢 Easy | 🟡 Medium | 🟢 Easy | 🔴 Hard |
| **Repo Size** | 🟡 Grows | 🟢 Small | 🟡 Grows | 🟡 Large |
| **Performance** | 🟢 Fast | 🟢 Fast | 🟡 Medium | 🟢 Fast |
| **Collaboration** | 🟢 High | 🔴 Low | 🟢 High | 🟡 Medium |
| **Deployment** | 🟢 Flexible | 🟢 Personal | 🟢 Auto | 🟢 Independent |
| **Maintenance** | 🟡 Medium | 🟡 Medium | 🟢 Low | 🔴 High |

---

## Decision Tree

```
┌─ Do designers need to work completely independently?
│  ├─ YES → Option 2: Individual Forks
│  └─ NO  → Continue
│
├─ Is your team experienced with Git/engineering workflows?
│  ├─ NO  → Option 1: Namespaced Demos
│  └─ YES → Continue
│
├─ Do you have more than 100 designers?
│  ├─ YES → Option 4: Monorepo
│  └─ NO  → Continue
│
├─ Is your team small and tightly coordinated (< 10 people)?
│  ├─ YES → Option 3: Feature Branches
│  └─ NO  → Option 1: Namespaced Demos
```

---

## Detailed Recommendation: Namespaced Demos with Hybrid Workflow

For a team of **30-40 designers**, I recommend **Option 1** with these enhancements:

### Core Setup

1. **Namespace Structure:**
   ```
   src/demos/
   ├── shared/          # Curated demos (promoted from personal)
   ├── @alice/          # Alice's workspace
   ├── @bob/            # Bob's workspace
   └── @charlie/        # Charlie's workspace
   ```

2. **Environment-Based Filtering:**
   - Each designer has `.env.local` (gitignored) with `VITE_AUTHOR_FILTER=alice`
   - Only loads their demos + shared demos
   - Optional: `yarn dev:all` for managers/leads

3. **Demo Registry:**
   - Central registry at `src/demos/registry.ts`
   - Metadata: author, visibility, tags, description
   - Powers demo gallery UI and filtering

4. **CLI Tool:**
   ```bash
   yarn new-demo @alice/button-exploration
   # Creates template, updates registry, updates .env
   ```

### Workflow

**Daily Work:**
```bash
# Alice's daily workflow
yarn dev:me                    # Shows only Alice's demos + shared
yarn new-demo @alice/my-demo   # Generate new demo
# ... work on demo ...
git add src/demos/@alice/
git commit -m "Add button exploration"
git push origin main
```

**Sharing a Demo:**
```bash
# Move to shared
mv src/demos/@alice/button-exploration.tsx src/demos/shared/

# Update registry visibility
# Edit registry.ts: visibility: 'personal' → 'shared'

# Create PR
git checkout -b share-button-exploration
git add .
git commit -m "Share: Button Exploration demo"
git push origin share-button-exploration
# Open PR for team review
```

**Discovering Others' Work:**
```bash
yarn dev:all          # See everything
# Or use demo gallery UI with filters
```

### Git Configuration

**`.gitignore`:**
```
# Personal environment config
.env.local

# Optionally: Node modules, build artifacts, etc.
node_modules/
dist/
.DS_Store
```

**Do NOT gitignore personal demos** - Keep them in version control for:
- History tracking
- Team visibility (when they want it)
- Backup
- Future reference

### Deployment Strategy

1. **Main Deployment** (`pebble-playground.vercel.app`):
   - Deploy from `main` branch
   - Shows only `shared/` demos
   - For stakeholders and public access

2. **PR Previews**:
   - Vercel automatically deploys every PR
   - Shows all demos (for review)

3. **Optional: Personal Branches**:
   - If a designer needs to share externally
   - Create branch: `feature/alice-showcase`
   - Vercel auto-deploys: `feature-alice-showcase.vercel.app`

### Demo Lifecycle

```
1. Create     → @alice/new-idea.tsx (WIP)
2. Iterate    → git commits in @alice/
3. Polish     → Ready to share
4. Promote    → Move to shared/
5. Archive    → After 6 months, move to archive/
```

**Archive Strategy:**
```
src/demos/
├── shared/
├── @alice/
├── @bob/
└── archive/
    └── 2024-q3/
        ├── @alice/
        └── @bob/
```

### Quarterly Cleanup

Every quarter:
1. Review old personal demos
2. Move inactive demos to `archive/`
3. Update registry
4. Keep Git history (don't delete)

---

## Implementation Checklist

### Phase 1: Foundation (Day 1)
- [ ] Create namespace structure (`@username/` folders)
- [ ] Set up `.env` support in Vite
- [ ] Create basic demo registry
- [ ] Update `main.tsx` to load from registry
- [ ] Add `.env.local` to `.gitignore`
- [ ] Document workflow in README

### Phase 2: Tooling (Week 1)
- [ ] Create CLI tool (`scripts/new-demo.mjs`)
- [ ] Add `yarn dev:me`, `yarn dev:all`, `yarn dev:shared` scripts
- [ ] Set up Vercel deployment
- [ ] Configure PR preview deployments
- [ ] Create demo template

### Phase 3: UX (Week 2)
- [ ] Build demo gallery UI
- [ ] Add search/filter functionality
- [ ] Add tag-based filtering
- [ ] Add author filtering
- [ ] Create demo cards with screenshots

### Phase 4: Documentation (Week 2-3)
- [ ] Write onboarding guide for new designers
- [ ] Document Git workflow
- [ ] Create troubleshooting guide
- [ ] Record video walkthrough
- [ ] Set up Slack/Discord channel for support

### Phase 5: Governance (Month 2)
- [ ] Define promotion criteria (personal → shared)
- [ ] Set up PR review process
- [ ] Establish demo quality standards
- [ ] Create curation team
- [ ] Set up quarterly cleanup schedule

---

## Estimated Costs

### Time Investment

| Phase | Engineering Time | Design Time |
|-------|-----------------|-------------|
| Setup | 2-3 days | 0.5 days |
| Training | 0.5 days | 2 hours per designer |
| Maintenance | 1 day/month | 0 days |

### Infrastructure Costs

| Service | Cost | Notes |
|---------|------|-------|
| GitHub | Free | Assuming existing org |
| Vercel | Free - $20/mo | Free tier likely sufficient |
| Total | **~$0-20/month** | Scales with team |

---

## Alternative: Hybrid Approach

If you want more autonomy but still need collaboration:

**Combination of Options 1 + 2:**

1. **Main Repo** - Infrastructure + curated shared demos
2. **Namespaced Folders** - For active collaboration
3. **Optional Forks** - For designers who want complete independence

**Workflow:**
- Most designers work in namespaces (`@username/`)
- Designers needing autonomy can fork
- Forked designers can still contribute to `shared/` via PRs

---

## Questions to Decide Before Implementation

### Organization
1. **Should personal demos be committed or gitignored?**
   - ✅ Recommended: Commit (for history and discoverability)
   - Alternative: Gitignore (for complete privacy)

2. **Who decides what goes into `shared/`?**
   - Options: Self-serve, curator team, design lead approval
   - ✅ Recommended: PR approval from 1-2 reviewers

3. **How often should old demos be archived?**
   - ✅ Recommended: Quarterly review
   - Alternative: 6-month automatic archive

### Technical
4. **One deployment or multiple?**
   - ✅ Recommended: One main + PR previews
   - Alternative: Personal deployments for each designer

5. **How do designers discover others' work?**
   - ✅ Recommended: Demo gallery UI + Slack announcements
   - Alternative: Manual wiki/Notion page

### Workflow
6. **Git workflow: Main branch or feature branches?**
   - ✅ Recommended: Main branch for personal namespaces
   - Alternative: Feature branches for shared demos only

7. **How to handle breaking changes?**
   - ✅ Recommended: Version the playground-core as a package
   - Alternative: Communication + manual updates

---

## Success Metrics

Track these to measure if your collaboration model is working:

### Engagement
- [ ] Number of active demos per designer
- [ ] Number of demos promoted to `shared/`
- [ ] Time from idea → shared demo

### Quality
- [ ] Demo documentation completeness
- [ ] Number of demos referenced in design reviews
- [ ] Stakeholder satisfaction with demos

### Efficiency
- [ ] Time to onboard new designer
- [ ] Merge conflict frequency
- [ ] Time spent on Git issues

---

## Getting Started

### Option A: Quick Start (1 hour)

Just implement basic namespacing:

```bash
# 1. Create namespace folders
mkdir -p src/demos/@alice src/demos/@bob src/demos/shared

# 2. Move existing demos
mv src/demos/design-tokens-demo.tsx src/demos/shared/

# 3. Add .env.local
echo "VITE_AUTHOR_FILTER=alice" > .env.local
echo ".env.local" >> .gitignore

# 4. Start working
# Developers create demos in their namespace
```

### Option B: Full Implementation (1-2 days)

Implement complete system with registry, CLI, and gallery UI.

**Want me to implement this for you?** I can:
- Set up the directory structure
- Create the demo registry
- Build the CLI tool
- Add environment variable filtering
- Create demo gallery UI

---

## Final Recommendation Summary

**For a team of 30-40 designers, use Option 1: Namespaced Demos + Selective Loading**

**Why:**
- ✅ Balances collaboration and autonomy
- ✅ Scales to your team size
- ✅ Low maintenance overhead
- ✅ Familiar Git workflow
- ✅ Easy discoverability
- ✅ No merge conflicts

**Avoid:**
- ❌ Feature branches (too many conflicts at your scale)
- ❌ Monorepo (overkill for your needs)
- ❌ Submodules (pain)

**Consider:**
- 🤔 Individual forks - Only if designers need complete independence

---

## Next Steps

1. **Decision:** Choose Option 1 (Namespaced) or Option 2 (Forks)
2. **Pilot:** Test with 3-5 designers for 2 weeks
3. **Iterate:** Gather feedback and adjust
4. **Rollout:** Train full team
5. **Maintain:** Monthly check-ins, quarterly cleanup

**Ready to implement? Let me know and I can build this out!**



