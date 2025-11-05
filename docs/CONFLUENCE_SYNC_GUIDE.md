# Confluence Documentation Sync Guide

**Last Updated:** November 3, 2025

## Overview

This guide explains how to automatically sync Pebble component documentation from Confluence into this playground as markdown files. This creates a local, AI-readable, version-controlled copy of design guidelines.

---

## Why Sync Confluence Docs?

### Benefits

✅ **Single Source of Truth** - Designers maintain docs in Confluence, devs/AI get latest automatically  
✅ **AI-Readable** - Markdown format is perfect for AI assistants to understand and reference  
✅ **Version Controlled** - Track changes to design guidelines over time in Git  
✅ **Offline Access** - Documentation works without Confluence connection  
✅ **Search/Grep** - Easy to find information using local tools  
✅ **Faster Development** - No context switching between Confluence and code  
✅ **Incremental Updates** - Only downloads changed pages, saving bandwidth and time

### What to Sync

Recommended documentation to pull from Confluence:

```
docs/guides/
├── tokens/
│   ├── colors.md              # Color system overview
│   ├── semantic-colors.md     # Container vs base colors (what we learned!)
│   ├── typography.md          # Font scales, when to use each
│   └── spacing.md             # Spacing system
├── patterns/
│   ├── forms.md               # Form construction patterns
│   ├── notifications.md       # SnackBar vs Notice vs Banner
│   ├── data-display.md        # Tables, lists, cards
│   ├── navigation.md          # Tabs, drawers, menus
│   └── page-layouts.md        # Common page structures
├── components/
│   ├── button-usage.md        # Beyond API docs - when/how to use
│   ├── modal-vs-drawer.md     # Decision guide
│   ├── input-validation.md    # Error states, messages
│   └── [component-name].md    # One file per major component
└── accessibility/
    ├── requirements.md        # ARIA labels, keyboard nav
    └── testing.md             # How to verify accessibility
```

---

## Implementation Approaches

### Option 1: Manual Script (Recommended Start)

Create a Node script for on-demand syncing:

```bash
yarn sync-confluence-docs
```

**Pros:**
- Simple to implement
- Full control over when sync happens
- Easy to debug and iterate
- No secrets management complexity

**Cons:**
- Must remember to run manually
- Could forget to sync before sharing

### Option 2: Automated Sync (Production)

Set up GitHub Actions for automatic syncing:

**Pros:**
- Always up-to-date
- No manual intervention
- Creates PRs for review
- Scheduled or on-demand

**Cons:**
- More complex setup
- Requires GitHub secrets management
- Could create noise with frequent updates

---

## Technical Requirements

### 1. Confluence Access

**What you need:**
- Confluence base URL (e.g., `https://rippling.atlassian.net`)
- Space key(s) where Pebble docs live (e.g., `PEBBLE`)
- Page IDs or page structure to pull
- API authentication:
  - User email address
  - API token (create at: `https://id.atlassian.com/manage/api-tokens`)

### 2. Node Packages

```bash
yarn add -D confluence-api turndown
```

**Why these packages:**
- `confluence-api`: REST API client for Confluence
- `turndown`: Converts HTML → Markdown

### 3. Environment Variables

```bash
# .env.local (add to .gitignore!)
CONFLUENCE_BASE_URL=https://rippling.atlassian.net
CONFLUENCE_USER_EMAIL=your-email@rippling.com
CONFLUENCE_API_TOKEN=your-api-token-here
CONFLUENCE_SPACE_KEY=PEBBLE
```

---

## Implementation Guide

### Step 1: Create Configuration File

```json
// confluence-sync.config.json
{
  "baseUrl": "https://rippling.atlassian.net",
  "spaceKey": "PEBBLE",
  "outputDir": "docs/guides",
  "pages": [
    {
      "pageId": "123456",
      "title": "Button Component Guidelines",
      "outputPath": "components/button-usage.md"
    },
    {
      "pageId": "789012",
      "title": "Color System",
      "outputPath": "tokens/colors.md"
    },
    {
      "pageId": "345678",
      "title": "Form Patterns",
      "outputPath": "patterns/forms.md"
    }
  ]
}
```

### Step 2: Create Sync Script

```javascript
// scripts/sync-confluence-docs.mjs
import Confluence from 'confluence-api';
import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load config
const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../confluence-sync.config.json'), 'utf-8')
);

// Initialize Confluence client
const confluence = new Confluence({
  baseUrl: process.env.CONFLUENCE_BASE_URL,
  username: process.env.CONFLUENCE_USER_EMAIL,
  password: process.env.CONFLUENCE_API_TOKEN,
  version: 4, // API version
});

// Initialize Turndown for HTML → Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

async function syncPage(pageConfig) {
  console.log(`Syncing: ${pageConfig.title}...`);
  
  try {
    // Fetch page content from Confluence
    const page = await confluence.getContentById(pageConfig.pageId, {
      expand: 'body.storage,version',
    });
    
    // Convert HTML to Markdown
    const markdown = turndownService.turndown(page.body.storage.value);
    
    // Add metadata header
    const output = `# ${page.title}

**Source:** ${config.baseUrl}/wiki/spaces/${config.spaceKey}/pages/${pageConfig.pageId}  
**Last Synced:** ${new Date().toISOString()}  
**Version:** ${page.version.number}

---

${markdown}
`;
    
    // Ensure output directory exists
    const outputPath = path.join(__dirname, '../', config.outputDir, pageConfig.outputPath);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(outputPath, output, 'utf-8');
    
    console.log(`✓ Synced to: ${pageConfig.outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to sync ${pageConfig.title}:`, error.message);
  }
}

async function syncAll() {
  console.log('Starting Confluence sync...\n');
  
  for (const pageConfig of config.pages) {
    await syncPage(pageConfig);
  }
  
  console.log('\n✓ Sync complete!');
}

syncAll();
```

### Step 3: Add NPM Script

```json
// package.json
{
  "scripts": {
    "sync-confluence": "node scripts/sync-confluence-docs.mjs"
  }
}
```

### Step 4: Run Sync

```bash
yarn sync-confluence
```

---

## Handling Confluence-Specific Content

### Images

**Problem:** Confluence images use internal URLs  
**Solutions:**
1. Download images locally to `docs/guides/assets/`
2. Update image references in markdown
3. Or: Keep Confluence URLs (requires network access)

```javascript
// Enhanced script to download images
async function downloadImage(confluenceUrl, localPath) {
  const response = await fetch(confluenceUrl, {
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${process.env.CONFLUENCE_USER_EMAIL}:${process.env.CONFLUENCE_API_TOKEN}`
      ).toString('base64')}`
    }
  });
  const buffer = await response.buffer();
  fs.writeFileSync(localPath, buffer);
}
```

### Tables

Turndown handles basic tables well, but complex Confluence tables may need manual cleanup.

### Macros

Confluence macros (info panels, code blocks, etc.) need custom handling:

```javascript
// Custom Turndown rules for Confluence macros
turndownService.addRule('confluenceInfo', {
  filter: (node) => {
    return node.classList.contains('confluence-information-macro');
  },
  replacement: (content) => {
    return `> ℹ️ **Note:** ${content}\n\n`;
  }
});
```

### Internal Links

Update Confluence page links to local markdown files:

```javascript
// Replace Confluence links with local paths
const markdown = turndownService.turndown(html)
  .replace(
    /\[([^\]]+)\]\(\/wiki\/spaces\/PEBBLE\/pages\/(\d+)\/([^\)]+)\)/g,
    '[$1](../path-to-local-file.md)'
  );
```

---

## Automated Sync with GitHub Actions

### Create Workflow File

```yaml
# .github/workflows/sync-confluence.yml
name: Sync Confluence Documentation

on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9am UTC
  workflow_dispatch:      # Manual trigger button in GitHub

jobs:
  sync:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'yarn'
          
      - name: Install dependencies
        run: yarn install --frozen-lockfile
        
      - name: Sync Confluence docs
        env:
          CONFLUENCE_BASE_URL: ${{ secrets.CONFLUENCE_BASE_URL }}
          CONFLUENCE_USER_EMAIL: ${{ secrets.CONFLUENCE_USER_EMAIL }}
          CONFLUENCE_API_TOKEN: ${{ secrets.CONFLUENCE_API_TOKEN }}
        run: yarn sync-confluence
        
      - name: Check for changes
        id: check_changes
        run: |
          if [[ -n $(git status --porcelain docs/guides/) ]]; then
            echo "changes=true" >> $GITHUB_OUTPUT
          else
            echo "changes=false" >> $GITHUB_OUTPUT
          fi
          
      - name: Create Pull Request
        if: steps.check_changes.outputs.changes == 'true'
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'docs: sync Confluence documentation'
          title: 'Update design guidelines from Confluence'
          body: |
            ## Confluence Documentation Sync
            
            This PR contains updated design guidelines synced from Confluence.
            
            **Synced at:** ${{ github.event.repository.updated_at }}
            
            Please review changes and merge if everything looks correct.
          branch: confluence-sync
          delete-branch: true
```

### Setup GitHub Secrets

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `CONFLUENCE_BASE_URL`
   - `CONFLUENCE_USER_EMAIL`
   - `CONFLUENCE_API_TOKEN`

---

## Usage Workflow

### For Designers (Confluence)

1. Update component guidelines in Confluence as normal
2. Publish changes
3. (If automated) Changes sync overnight and create PR
4. (If manual) Developer runs `yarn sync-confluence` before next session

### For Developers (Local)

1. Review PR from Confluence sync (automated) or run sync manually
2. Pull latest design guidelines
3. AI assistants automatically reference updated docs
4. Build components following latest patterns

---

## Incremental Sync (Bandwidth Optimization)

**Built-in feature:** The sync script automatically checks if pages need updating before downloading.

### How It Works

1. **Version Tracking**
   - Each synced markdown file includes: `**Confluence Version:** 4`
   - This version number comes from Confluence's internal versioning

2. **Smart Comparison**
   - Before downloading, script checks local file's version
   - Compares local version vs. remote version
   - Only downloads if remote is **newer** or file doesn't exist

3. **Bandwidth Savings**
   - Skips unchanged pages entirely
   - No re-downloading images that already exist
   - Sync completes in seconds instead of minutes

### Example Output

```bash
$ yarn sync-confluence

📄 Syncing: Button...
  → Checking for updates...
  ⊘ Already up-to-date (v25)

📄 Syncing: Modal...
  → Checking for updates...
  → Fetching from Confluence (v8)...
  → Downloading attachment: modal-example.png...
  ✓ Downloaded 1 image(s)
  → Converting HTML to Markdown...
  ✓ Synced to: docs/guides/components/modal.md

Summary:

✓ Successfully synced: 1
  - Modal

⊘ Already up-to-date: 36
  → These pages haven't changed since last sync
```

### Benefits

✅ **Fast** - Checking 37 pages takes ~20 seconds instead of 5+ minutes  
✅ **Bandwidth Efficient** - Only downloads what changed  
✅ **Safe** - Re-running sync won't cause issues  
✅ **Fresh** - Always get latest updates when they happen

### When Pages Update

The sync will automatically detect and download:
- Someone edits a Confluence page
- New version is published
- Content changes (text, images, formatting)

### Force Re-sync

To force re-download a page even if version matches:
1. Delete the local `.md` file
2. Run `yarn sync-confluence` again

Or delete all synced docs to start fresh:
```bash
rm -rf docs/guides/components/*.md
yarn sync-confluence
```

---

## Troubleshooting

### Authentication Errors

```
Error: Unauthorized (401)
```

**Fix:** Verify API token is valid and has correct permissions

### Rate Limiting

```
Error: Too Many Requests (429)
```

**Fix:** Add delays between API calls:

```javascript
await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
```

### Missing Pages

```
Error: Page not found (404)
```

**Fix:** Verify page IDs in config file are correct. Get IDs from Confluence page URL.

### Malformed Markdown

**Fix:** Check Turndown conversion rules, may need custom rules for Confluence-specific HTML.

---

## Best Practices

### 1. Start Small
- Sync 2-3 important pages first
- Verify conversion quality
- Iterate on configuration
- Expand to more pages once working well

### 2. Review Changes
- Don't auto-merge Confluence syncs
- Review PRs to catch conversion issues
- Manually fix any formatting problems

### 3. Document Sources
- Include Confluence URL in synced markdown
- Add last sync timestamp
- Link back to source of truth

### 4. Handle Conflicts
- Confluence is source of truth
- Don't make edits to synced markdown locally
- If needed, update in Confluence then re-sync

### 5. Sync Frequently
- Run sync as often as needed - incremental updates are fast and bandwidth-efficient
- Safe to run multiple times per day (only downloads what changed)
- Consider running before each prototyping session to get latest guidelines
- Monitor API rate limits if running on automation
- Keep dependencies updated

---

## Next Steps

1. **Identify Key Documentation**
   - Which Confluence pages contain component guidelines?
   - What's the page structure/hierarchy?
   - Get page IDs for priority docs

2. **Create API Token**
   - Go to: https://id.atlassian.com/manage/api-tokens
   - Create token for this integration
   - Store securely (never commit to Git!)

3. **Build Prototype**
   - Start with manual script (Option 1)
   - Test with 2-3 pages
   - Verify markdown quality
   - Iterate on configuration

4. **Expand & Automate**
   - Add more pages once working well
   - Consider automating if beneficial
   - Set up monitoring/alerts

---

## Alternative: Manual Documentation

If Confluence sync proves too complex or maintenance-heavy, consider:

1. **Manual Markdown Creation**
   - Write design guidelines directly in `docs/guides/`
   - Version control from day one
   - Full control over format
   - No dependency on Confluence

2. **Hybrid Approach**
   - Keep high-level guidelines in Confluence (for design team)
   - Create developer-focused markdown docs separately
   - Occasionally manually sync key updates

---

## Resources

- [Confluence REST API Documentation](https://developer.atlassian.com/cloud/confluence/rest/v1/intro/)
- [Turndown Documentation](https://github.com/mixmark-io/turndown)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## Questions or Issues?

Reference this document when implementing the sync. Update it as you learn what works best for your team's workflow.

