/**
 * Connection Status Demo
 *
 * Interactive prototype demonstrating the connection status framework
 * across all three surfaces: Overview, feature tabs (Access, Workflows),
 * and Administration/Connections.
 *
 * Uses a floating state toggle panel to let reviewers flip connections
 * between states and watch the entire UI respond.
 *
 * Components used:
 * - AppShellLayout (@/components/app-shell)
 * - Button, Icon, Label, ActionCard, Modal, Tabs (Pebble)
 * - All theme tokens for colors, spacing, typography
 */

import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { AppShellLayout, NavSectionData } from '@/components/app-shell';
import { Connection, ConnectionState, getTabWarningState } from './types';
import { DEFAULT_CONNECTIONS, FEATURES, TABS } from './mock-data';
import OverviewTab from './OverviewTab';
import FeatureTab from './FeatureTab';
import ConnectionsTab from './ConnectionsTab';
import StateTogglePanel from './StateTogglePanel';

/* ─── Tab label with optional warning dot ─── */

const TabLabelWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const WarningDot = styled.span<{ dotColor: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ dotColor }) => dotColor};
  flex-shrink: 0;
`;

const ConnectionStatusDemo: React.FC = () => {
  const { theme } = usePebbleTheme();

  // Mutable connection state -- the core of the interactive prototype
  const [connections, setConnections] = useState<Connection[]>(
    DEFAULT_CONNECTIONS.map(c => ({ ...c }))
  );

  const [activeTab, setActiveTab] = useState(0);

  // Handle state changes from the toggle panel
  const handleStateChange = useCallback((connectionId: string, newState: ConnectionState) => {
    setConnections(prev =>
      prev.map(c =>
        c.id === connectionId
          ? {
              ...c,
              state: newState,
              degradedReason:
                newState === 'degraded' ? 'Token expires in 5 days' : undefined,
            }
          : c
      )
    );
  }, []);

  // Handle reconnect (simulates fixing a disconnected connection)
  const handleReconnect = useCallback((connectionId: string) => {
    setConnections(prev =>
      prev.map(c =>
        c.id === connectionId ? { ...c, state: 'connected', degradedReason: undefined } : c
      )
    );
  }, []);

  // Navigate to Administration tab
  const handleViewConnections = useCallback(() => {
    setActiveTab(3); // Administration tab index
  }, []);

  // Build tab labels with warning dots
  const getTabLabels = (): string[] => {
    return TABS.map(tab => {
      if (tab.id === 'overview' || tab.id === 'administration') {
        return tab.label;
      }
      const warningState = getTabWarningState(connections, FEATURES, tab.id);
      if (warningState) {
        // We use a special marker that we'll parse in the render
        return `${tab.label}●${warningState}`;
      }
      return tab.label;
    });
  };

  // Navigation config matching Rippling app shell
  const mainNavSection: NavSectionData = {
    items: [
      { id: 'favorites', label: 'Favorites', icon: Icon.TYPES.STAR_OUTLINE, hasSubmenu: true },
      { id: 'it', label: 'IT', icon: Icon.TYPES.LAPTOP_OUTLINE, hasSubmenu: true },
    ],
  };

  const platformSection: NavSectionData = {
    label: 'Platform',
    items: [
      { id: 'tools', label: 'Tools', icon: Icon.TYPES.WRENCH_OUTLINE, hasSubmenu: true },
      {
        id: 'company-settings',
        label: 'Company settings',
        icon: Icon.TYPES.SETTINGS_OUTLINE,
        hasSubmenu: true,
      },
      { id: 'app-shop', label: 'App Shop', icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE },
    ],
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <OverviewTab
            connections={connections}
            features={FEATURES}
            onReconnect={handleReconnect}
            onViewConnections={handleViewConnections}
          />
        );
      case 1:
        return (
          <FeatureTab
            tabId="access"
            tabLabel="Access"
            connections={connections}
            features={FEATURES}
            onReconnect={handleReconnect}
          />
        );
      case 2:
        return (
          <FeatureTab
            tabId="workflows"
            tabLabel="Workflows"
            connections={connections}
            features={FEATURES}
            onReconnect={handleReconnect}
          />
        );
      case 3:
        return (
          <ConnectionsTab
            connections={connections}
            features={FEATURES}
            onReconnect={handleReconnect}
          />
        );
      default:
        return null;
    }
  };

  // Parse tab labels to extract warning dots
  const tabLabels = getTabLabels();

  return (
    <>
      <AppShellLayout
        pageTitle="Slack"
        pageTabs={tabLabels}
        defaultActiveTab={activeTab}
        onTabChange={(index: number) => setActiveTab(index)}
        mainNavSections={[mainNavSection]}
        platformNavSection={platformSection}
        companyName="Acme, Inc."
        userInitial="A"
        pageActions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
              @pixar.com
            </Button>
            <Button.Icon
              icon={Icon.TYPES.MORE_HORIZONTAL}
              size={Button.SIZES.S}
              appearance={Button.APPEARANCES.OUTLINE}
              aria-label="More actions"
            />
          </div>
        }
      >
        {renderTabContent()}
      </AppShellLayout>

      {/* Floating state toggle panel */}
      <StateTogglePanel connections={connections} onStateChange={handleStateChange} />
    </>
  );
};

export default ConnectionStatusDemo;
