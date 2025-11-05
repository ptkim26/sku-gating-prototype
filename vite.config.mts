import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PEBBLE_MONOREPO = path.resolve(__dirname, '../pebble');
const PEBBLE_SOURCE = path.resolve(PEBBLE_MONOREPO, 'packages/rippling-ui/source');
const OVERRIDE_DIR = path.resolve(__dirname, 'src/overrides');

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    port: 4201,
  },
  resolve: {
    alias: [
      // Local workspace alias
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      
      // Override system: Check src/overrides first, then Pebble source
      {
        find: /^@rippling\/pebble\/(.+)$/,
        replacement: (match, componentPath) => {
          // Check if override exists as a file (with various extensions)
          const overrideBase = path.resolve(OVERRIDE_DIR, componentPath);
          const extensions = ['', '.ts', '.tsx', '.js', '.jsx'];
          
          for (const ext of extensions) {
            const overridePath = overrideBase + ext;
            if (fs.existsSync(overridePath) && fs.statSync(overridePath).isFile()) {
              console.log(`  🎨 Using override: ${componentPath}${ext}`);
              return overridePath;
            }
          }
          
          // Check if override exists as a directory with index file
          if (fs.existsSync(overrideBase) && fs.statSync(overrideBase).isDirectory()) {
            for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
              const indexPath = path.resolve(overrideBase, `index${ext}`);
              if (fs.existsSync(indexPath)) {
                console.log(`  🎨 Using override: ${componentPath}/index${ext}`);
                return overrideBase;
              }
            }
          }
          
          // Fall back to Pebble source
          return path.resolve(PEBBLE_SOURCE, componentPath);
        },
      },
      
      // Catch-all for @rippling/pebble (no subpath)
      {
        find: '@rippling/pebble',
        replacement: PEBBLE_SOURCE,
      },
      
      // Other Rippling monorepo packages (required by Pebble source)
      // Note: More specific patterns must come FIRST (with subpaths)
      {
        find: /^@rippling\/ui-utils\/(.+)$/,
        replacement: (match, subpath) => {
          return path.resolve(PEBBLE_MONOREPO, `packages/rippling-ui-utils/source/${subpath}`);
        },
      },
      {
        find: /^@rippling\/lib-i18n\/(.+)$/,
        replacement: (match, subpath) => {
          return path.resolve(PEBBLE_MONOREPO, `packages/rippling-lib-i18n/source/${subpath}`);
        },
      },
      // Catch-all for base packages (no subpath)
      {
        find: '@rippling/ui-utils',
        replacement: path.resolve(PEBBLE_MONOREPO, 'packages/rippling-ui-utils/source'),
      },
      {
        find: '@rippling/lib-i18n',
        replacement: path.resolve(PEBBLE_MONOREPO, 'packages/rippling-lib-i18n/source'),
      },
      // Note: @rippling/pebble-tokens is NOT aliased - it uses the published npm package
    ],
  },
  define: {
    'process.env': {},
    'process.platform': JSON.stringify(''),
    'process.version': JSON.stringify(''),
  },
});


