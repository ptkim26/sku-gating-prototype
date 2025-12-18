#!/usr/bin/env node

/**
 * Setup script for Pebble MCP Server
 * 
 * This script helps configure the Pebble MCP server for Cursor IDE.
 * It can either use the workspace config (.cursor/mcp.json) or merge
 * with the user's global config (~/.cursor/mcp.json).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const WORKSPACE_MCP_CONFIG = path.join(projectRoot, '.cursor', 'mcp.json');
const USER_MCP_CONFIG = path.join(os.homedir(), '.cursor', 'mcp.json');

const PEBBLE_MCP_CONFIG = {
  "Pebble": {
    "command": "npx",
    "args": ["@rippling/pebble-mcp"]
  }
};

function readJsonFile(filepath) {
  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }
  } catch (e) {
    console.error(`Error reading ${filepath}:`, e.message);
  }
  return null;
}

function writeJsonFile(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n');
}

function checkMcpStatus() {
  console.log('\n🔍 Checking MCP Configuration...\n');
  
  // Check workspace config
  const workspaceConfig = readJsonFile(WORKSPACE_MCP_CONFIG);
  if (workspaceConfig?.mcpServers?.Pebble) {
    console.log('✅ Workspace MCP config found (.cursor/mcp.json)');
    console.log('   Pebble MCP is configured for this project\n');
  } else {
    console.log('❌ Workspace MCP config missing or incomplete\n');
  }
  
  // Check user config
  const userConfig = readJsonFile(USER_MCP_CONFIG);
  if (userConfig?.mcpServers?.Pebble) {
    console.log('✅ User MCP config has Pebble (~/.cursor/mcp.json)');
  } else {
    console.log('ℹ️  User MCP config does not have Pebble configured');
    console.log('   (This is fine - workspace config takes precedence)\n');
  }
  
  // Check if package is installed
  const nodeModulesPath = path.join(projectRoot, 'node_modules', '@rippling', 'pebble-mcp');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('✅ @rippling/pebble-mcp is installed\n');
  } else {
    console.log('❌ @rippling/pebble-mcp is NOT installed');
    console.log('   Run: yarn install\n');
  }
}

function setupGlobal() {
  console.log('\n🔧 Adding Pebble MCP to user config...\n');
  
  let userConfig = readJsonFile(USER_MCP_CONFIG) || { mcpServers: {} };
  
  if (!userConfig.mcpServers) {
    userConfig.mcpServers = {};
  }
  
  userConfig.mcpServers.Pebble = PEBBLE_MCP_CONFIG.Pebble;
  
  writeJsonFile(USER_MCP_CONFIG, userConfig);
  
  console.log('✅ Added Pebble MCP to ~/.cursor/mcp.json');
  console.log('   Restart Cursor to activate\n');
}

function printUsage() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    🪨 Pebble MCP Setup                         ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  The Pebble MCP server gives AI assistants access to:          ║
║  • Component documentation and props                           ║
║  • Usage examples from Storybook                               ║
║  • List of all available components                            ║
║                                                                ║
║  Available commands:                                           ║
║                                                                ║
║    yarn mcp:status   - Check MCP configuration status          ║
║    yarn mcp:global   - Add Pebble to global Cursor config      ║
║                                                                ║
║  The workspace config (.cursor/mcp.json) is already set up.    ║
║  Just restart Cursor and the MCP should be available!          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
}

// Main
const command = process.argv[2];

switch (command) {
  case 'status':
    checkMcpStatus();
    break;
  case 'global':
    setupGlobal();
    break;
  default:
    printUsage();
    checkMcpStatus();
}


