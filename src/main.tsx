import { initI18nTranslations } from '@rippling/lib-i18n';
import oneUiService from '@rippling/pebble/services';
import { ThemeProvider, THEME_CONFIGS } from '@rippling/pebble/theme';
import resources from '@rippling/pebble/translations/locales/en-US/one-ui.json';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from '@rippling/pebble/GlobalStyle';
import AppShellTemplate from './demos/app-shell-template';
import EmployeeDirectoryDemo from './demos/employee-directory-demo';
import CompositionManagerDemo from './demos/composition-manager/composition-manager-demo';
import { CompositionDetail } from './demos/composition-manager/compositions/CompositionDetail';
import IndexPage from './demos/index-page';
import GettingStartedPage from './demos/getting-started-page';
import DocViewerPage from './demos/doc-viewer-page';
import DirectionAInlineSuggestion from './demos/supergroups/direction-a-inline-suggestion';
import DirectionBPostCommit from './demos/supergroups/direction-b-post-commit';
import DirectionCChipHighlighting from './demos/supergroups/direction-c-chip-highlighting';
import DirectionDEmptyState from './demos/supergroups/direction-d-empty-state';
import DirectionESmartResults from './demos/supergroups/direction-e-smart-results';
import DirectionFOutcomeForward from './demos/supergroups/direction-f-outcome-forward';
import DirectionGAiBridge from './demos/supergroups/direction-g-ai-bridge';
import DirectionHUnifiedInput from './demos/supergroups/direction-h-unified-input';

// Initialize @rippling/ui package
oneUiService.init({} as any);

const defaultNameSpace = 'one-ui';
const namespaces = [defaultNameSpace];
const language = 'en-US';
const supportedLanguages = [language];

// Initialize translation (dependency of @rippling/pebble)
function init() {
  return initI18nTranslations({
    resources: {
      [language]: {
        [defaultNameSpace]: resources,
      },
    },
    namespaces,
    supportedLanguages,
    defaultNameSpace,
    fallbackLanguage: language,
    language,
    debug: true,
  });
}

const container = document.getElementById('root') as HTMLElement;

let root = (window as any).__root__;

if (!root) {
  root = ReactDOM.createRoot(container);
  (window as any).__root__ = root;
}

init().then(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider themeConfigs={THEME_CONFIGS} defaultTheme="berry" defaultColorMode="light">
          <GlobalStyle />
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<IndexPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/docs" element={<DocViewerPage />} />
            
            {/* Demos */}
            <Route path="/app-shell-template" element={<AppShellTemplate />} />
            <Route path="/employee-directory" element={<EmployeeDirectoryDemo />} />
            <Route path="/composition-manager" element={<CompositionManagerDemo />} />
            <Route path="/composition-manager/compositions/:id" element={<CompositionDetail />} />

            {/* Supergroups Concept Prototypes */}
            <Route path="/direction-a-inline-suggestion" element={<DirectionAInlineSuggestion />} />
            <Route path="/direction-b-post-commit" element={<DirectionBPostCommit />} />
            <Route path="/direction-c-chip-highlighting" element={<DirectionCChipHighlighting />} />
            <Route path="/direction-d-empty-state" element={<DirectionDEmptyState />} />
            <Route path="/direction-e-smart-results" element={<DirectionESmartResults />} />
            <Route path="/direction-f-outcome-forward" element={<DirectionFOutcomeForward />} />
            <Route path="/direction-g-ai-bridge" element={<DirectionGAiBridge />} />
            <Route path="/direction-h-unified-input" element={<DirectionHUnifiedInput />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
