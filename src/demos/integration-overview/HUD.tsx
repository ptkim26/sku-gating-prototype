/**
 * HUD (Heads-Up Display)
 *
 * Floating control bar at bottom of viewport for navigating
 * surfaces, concepts, scenarios, and individual states.
 *
 * Keyboard shortcuts: O/C (surface), 1/2 (concept),
 * Arrow keys (scenarios), D (detail panel).
 */

import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import {
  Surface,
  ConceptId,
  Capability,
  Connection,
  CapabilityState,
} from './types';
import { ConnectionState } from '../connection-status/types';
import { StatusDot } from '../connection-status/shared-styles';
import { SCENARIO_PRESETS } from './mock-data';

interface HUDProps {
  activeSurface: Surface;
  activeConcept: ConceptId;
  activeScenario: string;
  capabilities: Capability[];
  connections: Connection[];
  onSurfaceChange: (surface: Surface) => void;
  onConceptChange: (concept: ConceptId) => void;
  onScenarioChange: (scenarioId: string) => void;
  onCapabilityStateChange: (capId: string, state: CapabilityState) => void;
  onConnectionStateChange: (connId: string, state: ConnectionState) => void;
}

/* ─── Styled Components ─── */

const HUDBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 266px;
  right: 0;
  height: 56px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  z-index: 900;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => (theme as StyledTheme).space400};
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  transition: left 200ms ease;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin: 0 ${({ theme }) => (theme as StyledTheme).space100};
`;

const Spacer = styled.div`
  flex: 1;
`;

const SegmentGroup = styled.div`
  display: flex;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  padding: 2px;
  gap: 2px;
`;

const SegmentButton = styled.button<{ isActive: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  padding: 4px 12px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  border: none;
  cursor: pointer;
  transition: all 100ms ease;
  white-space: nowrap;
  background-color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorSurfaceContainerHigh : 'transparent'};
  color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorOnSurface : (theme as StyledTheme).colorOnSurfaceVariant};
  font-weight: ${({ isActive }) => (isActive ? 535 : 430)};

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive
        ? (theme as StyledTheme).colorSurfaceContainerHigh
        : (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const ScenarioButton = styled.button<{ isActive: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  padding: 4px 10px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  border: 1px solid ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorPrimary : (theme as StyledTheme).colorOutlineVariant};
  cursor: pointer;
  transition: all 100ms ease;
  white-space: nowrap;
  background-color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorPrimaryContainer : 'transparent'};
  color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorOnPrimaryContainer : (theme as StyledTheme).colorOnSurfaceVariant};

  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

/* ─── Detail Panel ─── */

const DetailPanel = styled.div`
  position: fixed;
  bottom: 56px;
  left: 266px;
  right: 0;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
  z-index: 899;
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  max-height: 320px;
  overflow-y: auto;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const DetailSectionTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const DetailLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  min-width: 140px;
  font-weight: 535;
`;

const StateButtons = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const StateButton = styled.button<{ isActive: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  padding: 2px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  border: 1px solid ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorPrimary : (theme as StyledTheme).colorOutlineVariant};
  background-color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorPrimaryContainer : 'transparent'};
  color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorOnPrimaryContainer : (theme as StyledTheme).colorOnSurfaceVariant};
  cursor: pointer;
  transition: all 100ms ease;

  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ResetButton = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  &:hover { text-decoration: underline; }
`;

/* ─── Constants ─── */

const CAPABILITY_STATES: { value: CapabilityState; label: string }[] = [
  { value: 'not_started', label: 'Not started' },
  { value: 'partial', label: 'Partial' },
  { value: 'active', label: 'Active' },
  { value: 'disconnected', label: 'Disconnected' },
  { value: 'dismissed', label: 'Skipped' },
];

const CONNECTION_STATES: { value: ConnectionState; label: string }[] = [
  { value: 'connected', label: 'Connected' },
  { value: 'degraded', label: 'Degraded' },
  { value: 'disconnected', label: 'Disconnected' },
  { value: 'not-connected', label: 'Not set up' },
];

const OVERVIEW_CONCEPTS = ['1: Health Hub', '2: Adaptive'];
const CAPABILITIES_CONCEPTS = ['1: Grouped Cards', '2: Inline Toggles'];

/* ─── Component ─── */

const HUD: React.FC<HUDProps> = ({
  activeSurface,
  activeConcept,
  activeScenario,
  capabilities,
  connections,
  onSurfaceChange,
  onConceptChange,
  onScenarioChange,
  onCapabilityStateChange,
  onConnectionStateChange,
}) => {
  const { theme } = usePebbleTheme();
  const [detailOpen, setDetailOpen] = useState(false);

  const conceptLabels = activeSurface === 'overview' ? OVERVIEW_CONCEPTS : CAPABILITIES_CONCEPTS;

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't intercept if user is in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'o':
          onSurfaceChange('overview');
          break;
        case 'c':
          onSurfaceChange('capabilities');
          break;
        case '1':
          onConceptChange('1');
          break;
        case '2':
          onConceptChange('2');
          break;
        case 'd':
          setDetailOpen(prev => !prev);
          break;
        case 'arrowleft': {
          const idx = SCENARIO_PRESETS.findIndex(s => s.id === activeScenario);
          if (idx > 0) onScenarioChange(SCENARIO_PRESETS[idx - 1].id);
          break;
        }
        case 'arrowright': {
          const idx = SCENARIO_PRESETS.findIndex(s => s.id === activeScenario);
          if (idx < SCENARIO_PRESETS.length - 1) onScenarioChange(SCENARIO_PRESETS[idx + 1].id);
          break;
        }
      }
    },
    [activeSurface, activeScenario, onSurfaceChange, onConceptChange, onScenarioChange]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Detail Panel */}
      {detailOpen && (
        <DetailPanel theme={theme}>
          <DetailHeader>
            <DetailTitle theme={theme}>Individual State Controls</DetailTitle>
            <ResetButton theme={theme} onClick={() => onScenarioChange(activeScenario)}>
              Reset to preset
            </ResetButton>
          </DetailHeader>

          <DetailSection theme={theme}>
            <DetailSectionTitle theme={theme}>Capabilities</DetailSectionTitle>
            {capabilities.map(cap => (
              <DetailRow key={cap.id} theme={theme}>
                <DetailLabel theme={theme}>{cap.name}</DetailLabel>
                <StateButtons>
                  {CAPABILITY_STATES.map(s => (
                    <StateButton
                      key={s.value}
                      theme={theme}
                      isActive={cap.state === s.value}
                      onClick={() => onCapabilityStateChange(cap.id, s.value)}
                    >
                      {s.label}
                    </StateButton>
                  ))}
                </StateButtons>
              </DetailRow>
            ))}
          </DetailSection>

          <DetailSection theme={theme}>
            <DetailSectionTitle theme={theme}>Connections</DetailSectionTitle>
            {connections.map(conn => (
              <DetailRow key={conn.id} theme={theme}>
                <DetailLabel theme={theme}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <StatusDot state={conn.state} theme={theme} />
                    {conn.name}
                  </span>
                </DetailLabel>
                <StateButtons>
                  {CONNECTION_STATES.map(s => (
                    <StateButton
                      key={s.value}
                      theme={theme}
                      isActive={conn.state === s.value}
                      onClick={() => onConnectionStateChange(conn.id, s.value)}
                    >
                      {s.label}
                    </StateButton>
                  ))}
                </StateButtons>
              </DetailRow>
            ))}
          </DetailSection>
        </DetailPanel>
      )}

      {/* HUD Bar */}
      <HUDBar theme={theme}>
        {/* Left: Surface + Concept selectors */}
        <Section theme={theme}>
          <SegmentGroup theme={theme}>
            <SegmentButton
              theme={theme}
              isActive={activeSurface === 'overview'}
              onClick={() => onSurfaceChange('overview')}
            >
              Overview
            </SegmentButton>
            <SegmentButton
              theme={theme}
              isActive={activeSurface === 'capabilities'}
              onClick={() => onSurfaceChange('capabilities')}
            >
              Capabilities
            </SegmentButton>
          </SegmentGroup>

          <Divider theme={theme} />

          <SegmentGroup theme={theme}>
            {conceptLabels.map((label, i) => (
              <SegmentButton
                key={label}
                theme={theme}
                isActive={activeConcept === String(i + 1)}
                onClick={() => onConceptChange(String(i + 1) as ConceptId)}
              >
                {label}
              </SegmentButton>
            ))}
          </SegmentGroup>
        </Section>

        <Spacer />

        {/* Center: Scenario presets */}
        <Section theme={theme}>
          {SCENARIO_PRESETS.map(preset => (
            <ScenarioButton
              key={preset.id}
              theme={theme}
              isActive={activeScenario === preset.id}
              onClick={() => onScenarioChange(preset.id)}
            >
              {preset.label}
            </ScenarioButton>
          ))}
        </Section>

        <Spacer />

        {/* Right: Detail toggle */}
        <Button.Icon
          icon={detailOpen ? Icon.TYPES.CHEVRON_DOWN : Icon.TYPES.CHEVRON_UP}
          size={Button.SIZES.S}
          appearance={Button.APPEARANCES.OUTLINE}
          onClick={() => setDetailOpen(!detailOpen)}
          aria-label="Toggle detail panel"
        />
      </HUDBar>
    </>
  );
};

export default HUD;
