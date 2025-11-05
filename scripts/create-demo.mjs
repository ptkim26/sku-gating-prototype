#!/usr/bin/env node

/**
 * Interactive script to create a new demo in the playground.
 * 
 * Usage: yarn new:demo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(colors.blue + prompt + colors.reset, resolve);
  });
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function getDemoTemplate(pascalName, kebabName, description, components) {
  const imports = components.map(c => {
    if (c === 'Input') {
      return `import Input from '@rippling/pebble/Inputs';`;
    } else if (c === 'Select') {
      return `import Select from '@rippling/pebble/Inputs/Select';`;
    } else {
      return `import ${c} from '@rippling/pebble/${c}';`;
    }
  }).join('\n');

  return `import React, { useState } from 'react';
${imports}
import { useTheme } from '@rippling/pebble/theme';

/**
 * ${pascalName}
 * 
 * ${description}
 * 
 * Components used:
${components.map(c => ` * - ${c}`).join('\n')}
 */
const ${pascalName} = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: theme.colorSurface,
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          ...theme.typestyleHeadingLarge700,
          color: theme.colorOnSurface,
          marginBottom: '1.5rem',
        }}
      >
        ${pascalName.replace(/([A-Z])/g, ' $1').trim()}
      </h1>

      <div
        style={{
          backgroundColor: theme.colorSurfaceBright,
          borderRadius: '12px',
          padding: '2rem',
          border: \`1px solid \${theme.colorOutlineVariant}\`,
        }}
      >
        {/* TODO: Add your demo content here */}
        <p style={{ color: theme.colorOnSurfaceVariant }}>
          Start building your demo here!
        </p>
      </div>
    </div>
  );
};

export default ${pascalName};
`;
}

async function main() {
  console.log(colors.bright + colors.green + '\n🎨 Create a New Pebble Demo\n' + colors.reset);

  // Get demo name
  const demoName = await question('Demo name (e.g., "Button Variations"): ');
  if (!demoName.trim()) {
    console.log(colors.red + 'Error: Demo name is required' + colors.reset);
    rl.close();
    return;
  }

  // Get description
  const description = await question('Description: ');

  // Get components
  const componentsInput = await question(
    'Components used (comma-separated, e.g., "Button, Modal, Input"): '
  );
  const components = componentsInput
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);

  // Generate file names
  const kebabName = toKebabCase(demoName);
  const pascalName = toPascalCase(demoName) + 'Demo';
  const fileName = `${kebabName}-demo.tsx`;
  const filePath = path.join(projectRoot, 'src', 'demos', fileName);

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(colors.red + `\nError: File already exists: ${fileName}` + colors.reset);
    rl.close();
    return;
  }

  // Generate template
  const template = getDemoTemplate(pascalName, kebabName, description, components);

  // Write file
  fs.writeFileSync(filePath, template, 'utf8');

  console.log(colors.green + '\n✅ Demo created successfully!\n' + colors.reset);
  console.log(colors.bright + 'File created:' + colors.reset);
  console.log(`  ${filePath}\n`);
  console.log(colors.bright + 'Next steps:\n' + colors.reset);
  console.log('1. Add your demo to main.tsx:');
  console.log(colors.yellow + `   import ${pascalName} from './demos/${kebabName}-demo';` + colors.reset);
  console.log(colors.yellow + `   // Add to EditorType enum: ${kebabName.toUpperCase().replace(/-/g, '_')}` + colors.reset);
  console.log(colors.yellow + `   // Add to DEMO_OPTIONS array` + colors.reset);
  console.log('\n2. Start the dev server:');
  console.log(colors.yellow + '   yarn dev' + colors.reset);
  console.log('\n3. Open http://localhost:4201 and select your demo\n');

  rl.close();
}

main().catch(error => {
  console.error(colors.red + 'Error:' + colors.reset, error);
  rl.close();
  process.exit(1);
});


