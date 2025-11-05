#!/usr/bin/env node

/**
 * Interactive script to create a new demo based on the app shell template.
 * 
 * Usage: yarn new:shell
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
  cyan: '\x1b[36m',
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

function toEnumCase(str) {
  return str.toUpperCase().replace(/-/g, '_');
}

async function main() {
  console.log(colors.bright + colors.green + '\n🏗️  Create Demo from App Shell Template\n' + colors.reset);

  // Get demo name
  const demoName = await question('Demo name (e.g., "Employee Directory"): ');
  if (!demoName.trim()) {
    console.log(colors.red + 'Error: Demo name is required' + colors.reset);
    rl.close();
    return;
  }

  // Generate file names
  const kebabName = toKebabCase(demoName);
  const pascalName = toPascalCase(demoName) + 'Demo';
  const enumName = toEnumCase(kebabName);
  const fileName = `${kebabName}-demo.tsx`;
  const filePath = path.join(projectRoot, 'src', 'demos', fileName);
  const templatePath = path.join(projectRoot, 'src', 'demos', 'app-shell-demo.tsx');

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(colors.red + `\nError: File already exists: ${fileName}` + colors.reset);
    rl.close();
    return;
  }

  // Check if template exists
  if (!fs.existsSync(templatePath)) {
    console.log(colors.red + '\nError: app-shell-demo.tsx template not found' + colors.reset);
    rl.close();
    return;
  }

  // Read template
  let templateContent = fs.readFileSync(templatePath, 'utf8');

  // Replace component name and description
  templateContent = templateContent
    .replace(/AppShellDemo/g, pascalName)
    .replace(/export default AppShellDemo;/, `export default ${pascalName};`)
    .replace(
      '* Explore Rippling\'s main application shell with navigation, sidebar, and content areas.',
      `* ${demoName} - Built using the App Shell template.`
    );

  // Write new file
  fs.writeFileSync(filePath, templateContent, 'utf8');

  console.log(colors.green + '\n✅ Demo created successfully!\n' + colors.reset);
  console.log(colors.bright + 'File created:' + colors.reset);
  console.log(`  ${colors.cyan}${filePath}${colors.reset}\n`);
  
  console.log(colors.bright + 'Next steps:\n' + colors.reset);
  console.log(colors.yellow + '1. Add import to main.tsx:' + colors.reset);
  console.log(`   ${colors.cyan}import ${pascalName} from './demos/${kebabName}-demo';${colors.reset}\n`);
  
  console.log(colors.yellow + '2. Add to EditorType enum in main.tsx:' + colors.reset);
  console.log(`   ${colors.cyan}${enumName} = '${kebabName}',${colors.reset}\n`);
  
  console.log(colors.yellow + '3. Add to DEMO_OPTIONS array in main.tsx:' + colors.reset);
  console.log(`   ${colors.cyan}{${colors.reset}`);
  console.log(`   ${colors.cyan}  value: EditorType.${enumName},${colors.reset}`);
  console.log(`   ${colors.cyan}  label: '${demoName}',${colors.reset}`);
  console.log(`   ${colors.cyan}},${colors.reset}\n`);
  
  console.log(colors.yellow + '4. Add to DEMO_ROUTES object in main.tsx:' + colors.reset);
  console.log(`   ${colors.cyan}['/${kebabName}-demo']: EditorType.${enumName},${colors.reset}\n`);
  
  console.log(colors.yellow + '5. Add route in App component in main.tsx:' + colors.reset);
  console.log(`   ${colors.cyan}<Route path="/${kebabName}-demo" element={<${pascalName} />} />${colors.reset}\n`);
  
  console.log(colors.yellow + '6. Add card to index page (src/demos/index-page.tsx):' + colors.reset);
  console.log(`   ${colors.cyan}Add to DEMO_CARDS array with title, description, path, and icon${colors.reset}\n`);

  console.log(colors.bright + 'Customize your demo:' + colors.reset);
  console.log('  • Edit the main content area');
  console.log('  • Update navigation items in the sidebar');
  console.log('  • Modify the page title and description');
  console.log('  • Add your Pebble components\n');

  rl.close();
}

main().catch(error => {
  console.error(colors.red + 'Error:' + colors.reset, error);
  rl.close();
  process.exit(1);
});

