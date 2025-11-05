# Confluence Sync Quick Start

**Goal:** Pull Pebble component documentation from Confluence into this playground as Markdown files.

## ⚡ Quick Setup (5 minutes)

### 1. Create API Token

Visit: https://id.atlassian.com/manage/api-tokens

- Click **"Create API token"**
- Name it: `Pebble Playground Sync`
- **Copy the token** (you won't see it again!)

### 2. Configure Credentials

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your info:
CONFLUENCE_BASE_URL=https://rippling.atlassian.net
CONFLUENCE_USER_EMAIL=your-email@rippling.com
CONFLUENCE_API_TOKEN=paste-your-token-here
```

### 3. Find Page IDs

1. Open a Confluence page you want to sync
2. Look at the URL:
   ```
   https://rippling.atlassian.net/wiki/spaces/PEBBLE/pages/123456789/Button+Guidelines
                                                              ^^^^^^^^^
                                                              This is the page ID
   ```
3. Copy the page ID number

### 4. Update Config

Edit `confluence-sync.config.json`:

```json
{
  "pages": [
    {
      "pageId": "123456789",  // ← Replace with your page ID
      "title": "Button Component Guidelines",
      "outputPath": "components/button-usage.md"
    }
  ]
}
```

Add more pages to the array as needed!

### 5. Run Sync

```bash
yarn sync-confluence
```

✅ **Done!** Your docs are now in `docs/guides/`

## 📝 Example Output

After running the sync, you'll get files like:

```
docs/guides/
├── components/
│   └── button-usage.md       # ← Synced from Confluence!
```

Each file includes:
- ✅ Converted Markdown content
- ✅ Link back to source in Confluence
- ✅ Sync timestamp
- ✅ Version number

## 🎯 What to Sync

**Recommended pages to pull:**

| Type | Confluence Page | Output Path |
|------|----------------|-------------|
| Component Guide | "Button Usage & Patterns" | `components/button-usage.md` |
| Color System | "Pebble Color Tokens" | `tokens/colors.md` |
| Typography | "Typography Scale" | `tokens/typography.md` |
| Form Patterns | "Form Construction Guide" | `patterns/forms.md` |
| Notifications | "When to use SnackBar vs Notice" | `patterns/notifications.md` |

## 🤖 How This Helps AI

When you ask AI to build something:

1. **AI reads** these markdown files
2. **Understands** design intent and patterns
3. **Follows** best practices automatically
4. **Builds** components correctly the first time

**Result:** Less back-and-forth, more consistency! 🎉

## 🔄 Keeping Docs Updated

Run the sync anytime:
```bash
yarn sync-confluence
```

Or set up automated syncs - see `docs/CONFLUENCE_SYNC_GUIDE.md` for GitHub Actions workflow.

## 🆘 Troubleshooting

**"Missing required environment variables"**
→ Create `.env.local` from `.env.local.example`

**"401 Unauthorized"**
→ Check your API token is valid

**"404 Not Found"**
→ Verify page IDs in config are correct

**"Skipping example page"**
→ Replace `EXAMPLE_PAGE_ID_X` with real page IDs

## 📚 More Info

- **Full Guide:** `docs/CONFLUENCE_SYNC_GUIDE.md`
- **Design Guidelines:** `docs/guides/README.md`
- **Config File:** `confluence-sync.config.json`

---

**Questions?** Check the full documentation in `docs/CONFLUENCE_SYNC_GUIDE.md`


