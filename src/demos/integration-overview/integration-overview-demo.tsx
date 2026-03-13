/**
 * Integration Overview Demo
 *
 * Entry point for the integration overview + capabilities prototypes.
 * Manages all mutable state and routes HUD selections to the
 * appropriate concept components.
 *
 * Two surfaces (Overview, Capabilities) x Two concepts each = 4 views.
 * A floating HUD controls surface, concept, scenario, and individual states.
 */

import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { AppShellLayout } from '@/components/app-shell';
import { NavSectionData } from '@/components/app-shell/types';
import {
  Surface,
  ConceptId,
  Capability,
  Connection,
  UsageStats,
  CapabilityState,
} from './types';
import { ConnectionState } from '../connection-status/types';
import {
  DEFAULT_CAPABILITIES,
  DEFAULT_CONNECTIONS,
  SCENARIO_PRESETS,
  applyScenario,
} from './mock-data';
import HUD from './HUD';
import OverviewHealthHub from './overview/OverviewHealthHub';
import OverviewAdaptive from './overview/OverviewAdaptive';
import CapabilitiesGroupedCards from './capabilities/CapabilitiesGroupedCards';
import CapabilitiesInlineToggles from './capabilities/CapabilitiesInlineToggles';

/* ─── Bottom padding to account for HUD ─── */

const ContentWithHUDPadding = styled.div`
  padding-bottom: 72px;
`;

/* ─── Component ─── */

const IntegrationOverviewDemo: React.FC = () => {
  // HUD state
  const [activeSurface, setActiveSurface] = useState<Surface>('overview');
  const [activeConcept, setActiveConcept] = useState<ConceptId>('1');
  const [activeScenario, setActiveScenario] = useState('partial');

  // Data state (initialized from the "partial" scenario)
  const initialScenario = SCENARIO_PRESETS.find(s => s.id === 'partial')!;
  const initialData = applyScenario(initialScenario, DEFAULT_CAPABILITIES, DEFAULT_CONNECTIONS);

  const [capabilities, setCapabilities] = useState<Capability[]>(initialData.capabilities);
  const [connections, setConnections] = useState<Connection[]>(initialData.connections);
  const [usageStats, setUsageStats] = useState<UsageStats>(initialScenario.usageStats);

  // Apply a scenario preset
  const handleScenarioChange = useCallback((scenarioId: string) => {
    const preset = SCENARIO_PRESETS.find(s => s.id === scenarioId);
    if (!preset) return;
    const data = applyScenario(preset, DEFAULT_CAPABILITIES, DEFAULT_CONNECTIONS);
    setCapabilities(data.capabilities);
    setConnections(data.connections);
    setUsageStats(preset.usageStats);
    setActiveScenario(scenarioId);
  }, []);

  // Individual capability state change
  const handleCapabilityStateChange = useCallback((capId: string, state: CapabilityState) => {
    setCapabilities(prev =>
      prev.map(c =>
        c.id === capId
          ? {
              ...c,
              state,
              partialProgress:
                state === 'partial' ? { completed: 2, total: 4 } : undefined,
            }
          : c
      )
    );
  }, []);

  // Dismiss a capability ("Not for us")
  const handleDismiss = useCallback((capId: string) => {
    handleCapabilityStateChange(capId, 'dismissed');
  }, [handleCapabilityStateChange]);

  // Restore a dismissed capability
  const handleRestore = useCallback((capId: string) => {
    handleCapabilityStateChange(capId, 'not_started');
  }, [handleCapabilityStateChange]);

  // Individual connection state change
  const handleConnectionStateChange = useCallback((connId: string, state: ConnectionState) => {
    setConnections(prev =>
      prev.map(c => (c.id === connId ? { ...c, state } : c))
    );
  }, []);

  // Navigation config
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
      { id: 'company-settings', label: 'Company settings', icon: Icon.TYPES.SETTINGS_OUTLINE, hasSubmenu: true },
      { id: 'app-shop', label: 'App Shop', icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE },
    ],
  };

  // Tab config depends on active surface
  const overviewTabs = ['Overview', 'Access', 'Workflows', 'Administration'];
  const capabilitiesTabs = ['Capabilities'];

  const pageTabs = activeSurface === 'overview' ? overviewTabs : capabilitiesTabs;

  // Render the active concept
  const renderContent = () => {
    if (activeSurface === 'overview') {
      if (activeConcept === '1') {
        return (
          <OverviewHealthHub
            capabilities={capabilities}
            connections={connections}
            usageStats={usageStats}
          />
        );
      }
      return (
        <OverviewAdaptive
          capabilities={capabilities}
          connections={connections}
          usageStats={usageStats}
        />
      );
    }

    // Capabilities surface
    if (activeConcept === '1') {
      return (
        <CapabilitiesGroupedCards
          capabilities={capabilities}
          connections={connections}
          onDismiss={handleDismiss}
          onRestore={handleRestore}
        />
      );
    }
    return (
      <CapabilitiesInlineToggles
        capabilities={capabilities}
        connections={connections}
        onDismiss={handleDismiss}
        onRestore={handleRestore}
      />
    );
  };

  return (
    <>
      <AppShellLayout
        pageTitle="WorkspaceApp"
        pageTabs={pageTabs}
        defaultActiveTab={0}
        mainNavSections={[mainNavSection]}
        platformNavSection={platformSection}
        companyName="Acme, Inc."
        userInitial="A"
        pageActions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
              @acme.com
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
        <ContentWithHUDPadding>
          {renderContent()}
        </ContentWithHUDPadding>
      </AppShellLayout>

      <HUD
        activeSurface={activeSurface}
        activeConcept={activeConcept}
        activeScenario={activeScenario}
        capabilities={capabilities}
        connections={connections}
        onSurfaceChange={setActiveSurface}
        onConceptChange={setActiveConcept}
        onScenarioChange={handleScenarioChange}
        onCapabilityStateChange={handleCapabilityStateChange}
        onConnectionStateChange={handleConnectionStateChange}
      />
    </>
  );
};

export default IntegrationOverviewDemo;
