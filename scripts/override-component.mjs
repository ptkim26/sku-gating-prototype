#!/usr/bin/env node
/**
 * Override Component Script
 * 
 * Creates a local override for a Pebble component by copying it to src/overrides/
 * The component will automatically be used via Vite aliases.
 * 
 * Usage: yarn override Popper --reason="Add animation"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PEBBLE_SOURCE = path.resolve(__dirname, '../../pebble/packages/rippling-ui/source');
const OVERRIDE_DIR = path.resolve(__dirname, '../src/overrides');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest, excludePatterns = []) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    // Skip excluded patterns
    if (excludePatterns.some(pattern => entry.name.includes(pattern))) {
      continue;
    }
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, excludePatterns);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function createReadme(targetPath, componentName, reason) {
  const readmeContent = `# ${componentName} (Override)

**Source:** \`@rippling/pebble/${componentName}\`  
**Overridden:** ${new Date().toISOString().split('T')[0]}  
**Reason:** ${reason || 'Local customization for prototyping'}

## What This Is

This is a local override of the Pebble ${componentName} component. When you import:

\`\`\`typescript
import ${componentName} from '@rippling/pebble/${componentName}';
\`\`\`

Vite will automatically use THIS version instead of the package version.

## Changes Made

Document your changes here:

- [ ] Change 1
- [ ] Change 2

## How It Works

The playground's Vite config is set up to:
1. Check \`src/overrides/${componentName}\` first
2. If found, use this version
3. Otherwise, fall back to Pebble source

## Reverting to Original

To stop using this override:

\`\`\`bash
rm -rf src/overrides/${componentName}
\`\`\`

The next time Vite loads, it will use the original Pebble version.

## Syncing Updates

To pull the latest version from Pebble source:

\`\`\`bash
yarn sync-override ${componentName}
\`\`\`

This will show you a diff of changes. Review and merge manually if needed.
`;
  
  fs.writeFileSync(path.join(targetPath, 'README.md'), readmeContent, 'utf-8');
}

async function overrideComponent(componentName, options = {}) {
  console.log(`\n🎨 Creating override for ${componentName}...\n`);
  
  // Check if Pebble source exists
  if (!fs.existsSync(PEBBLE_SOURCE)) {
    console.error(`❌ Error: Pebble source not found at ${PEBBLE_SOURCE}`);
    console.error('   Make sure the pebble repo is cloned at ../pebble/');
    process.exit(1);
  }
  
  // Try to find the component - it might be top-level or nested under Inputs/
  let sourcePath = path.join(PEBBLE_SOURCE, componentName);
  let relativeComponentPath = componentName;
  
  // If not found at top level, try Inputs subdirectory
  if (!fs.existsSync(sourcePath)) {
    sourcePath = path.join(PEBBLE_SOURCE, 'Inputs', componentName);
    relativeComponentPath = `Inputs/${componentName}`;
  }
  
  // Check if component exists in Pebble
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Error: Component '${componentName}' not found in Pebble source`);
    console.error(`   Tried:`);
    console.error(`     - ${path.join(PEBBLE_SOURCE, componentName)}`);
    console.error(`     - ${path.join(PEBBLE_SOURCE, 'Inputs', componentName)}`);
    process.exit(1);
  }
  
  const targetPath = path.join(OVERRIDE_DIR, relativeComponentPath);
  
  // Check if already overridden
  if (fs.existsSync(targetPath) && !options.force) {
    console.error(`❌ Error: ${componentName} is already overridden`);
    console.error(`   Location: ${targetPath}`);
    console.error(`   Use --force to overwrite or run: yarn sync-override ${componentName}`);
    process.exit(1);
  }
  
  // Step 1: Copy source files
  console.log('📁 Copying source files...');
  copyDir(sourcePath, targetPath, ['__tests__', '.test.', '.spec.']);
  console.log(`   ✓ Copied to src/overrides/${relativeComponentPath}`);
  
  // Step 2: Create README
  console.log('\n📄 Creating documentation...');
  createReadme(targetPath, componentName, options.reason);
  console.log('   ✓ Created README.md');
  
  // Success!
  console.log(`\n✅ Successfully created override for ${componentName}!\n`);
  console.log('Next steps:');
  console.log(`  1. Edit files in src/overrides/${relativeComponentPath}/`);
  console.log(`  2. Document changes in src/overrides/${relativeComponentPath}/README.md`);
  console.log(`  3. Use in demos - imports automatically use your version!`);
  console.log(`  4. To revert: rm -rf src/overrides/${relativeComponentPath}\n`);
  console.log('💡 Vite will automatically use your override via aliases - no import changes needed!\n');
}

// CLI argument parsing
const args = process.argv.slice(2);
const componentName = args.find(arg => !arg.startsWith('--'));
const options = {
  reason: args.find(arg => arg.startsWith('--reason='))?.split('=')[1],
  force: args.includes('--force'),
};

if (!componentName) {
  console.error('Usage: yarn override <ComponentName> [--reason="explanation"] [--force]');
  console.error('\nExample:');
  console.error('  yarn override Popper --reason="Add rotation animation"');
  process.exit(1);
}

overrideComponent(componentName, options).catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});


