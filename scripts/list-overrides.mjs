#!/usr/bin/env node
/**
 * List Overrides Script
 * 
 * Shows all currently overridden components
 * Usage: yarn list-overrides
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OVERRIDE_DIR = path.resolve(__dirname, '../src/overrides');

function walkOverrides(dir, basePath = '') {
  const components = [];
  
  if (!fs.existsSync(dir)) {
    return components;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) {
      continue;
    }
    
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    
    // Check if this is a component (has files) or a namespace (has subdirs)
    const hasFiles = fs.readdirSync(fullPath).some(name => !fs.statSync(path.join(fullPath, name)).isDirectory());
    
    if (hasFiles) {
      // This is a component
      components.push({ name: entry.name, path: relativePath, fullPath });
    } else {
      // This is a namespace, recurse
      components.push(...walkOverrides(fullPath, relativePath));
    }
  }
  
  return components;
}

function listOverrides() {
  console.log('\n🎨 Component Overrides\n');
  
  const components = walkOverrides(OVERRIDE_DIR);
  
  if (components.length === 0) {
    console.log('   No overrides yet.');
    console.log('   Run: yarn override <ComponentName> to create your first override\n');
    return;
  }
  
  for (const component of components) {
    const readmePath = path.join(component.fullPath, 'README.md');
    
    console.log(`📁 ${component.path}`);
    console.log(`   Location: src/overrides/${component.path}`);
    
    // Try to read reason from README
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, 'utf-8');
      const reasonMatch = readme.match(/\*\*Reason:\*\*\s*(.+)/);
      const dateMatch = readme.match(/\*\*Overridden:\*\*\s*(.+)/);
      
      if (reasonMatch) {
        console.log(`   Reason: ${reasonMatch[1]}`);
      }
      if (dateMatch) {
        console.log(`   Date: ${dateMatch[1]}`);
      }
    }
    
    // Count files
    const files = fs.readdirSync(component.fullPath).filter(f => !f.startsWith('.'));
    console.log(`   Files: ${files.length}`);
    console.log('');
  }
  
  console.log(`Total: ${components.length} override${components.length !== 1 ? 's' : ''}\n`);
  console.log('💡 Commands:');
  console.log('   yarn override <name>        - Create a new override');
  console.log('   rm -rf src/overrides/<name> - Remove an override\n');
}

listOverrides();


