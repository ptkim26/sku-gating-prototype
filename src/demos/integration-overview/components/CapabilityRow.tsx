/**
 * Capability Row
 *
 * Compact single-line capability with inline expansion.
 * Used by Inline Toggles concept and Adaptive overview.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Label from '@rippling/pebble/Label';
import { Capability, Connection, getConnectionsForCapability } from '../types';
import { StatusDot } from '../../connection-status/shared-styles';
import SocialProof from './SocialProof';

interface CapabilityRowProps {
  capability: Capability;
  connections: Connection[];
  isExpanded?: boolean;
  onToggle?: () => void;
  forceCollapsed?: boolean;
  onDismiss?: (capId: string) => void;
  onRestore?: (capId: string) => void;
}

const STATE_DOT_MAP: Record<string, string> = {
  active: 'colorSuccess',
  partial: 'colorWarning',
  disconnected: 'colorError',
  not_started: 'colorOutlineVariant',
  dismissed: 'colorOutlineVariant',
};

const RowContainer = styled.div<{ isExpanded?: boolean }>`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  overflow: hidden;
  transition: box-shadow 200ms ease;

  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  }
`;

const RowHeader = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  width: 100%;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const StateDot = styled.span<{ capState: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme, capState }) =>
    (theme as StyledTheme)[STATE_DOT_MAP[capState] || 'colorOutlineVariant']};
  flex-shrink: 0;
`;

const RowName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const RowValueProp = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusPill = styled.div`
  flex-shrink: 0;
`;

const ChevronIcon = styled.span<{ isExpanded?: boolean }>`
  flex-shrink: 0;
  transition: transform 200ms ease;
  transform: rotate(${({ isExpanded }) => (isExpanded ? '180deg' : '0deg')});
  display: flex;
  align-items: center;
`;

const ExpandedContent = styled.div`
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `0 ${t.space400} ${t.space400} ${t.space400}`;
  }};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ExpandedDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: ${({ theme }) => (theme as StyledTheme).space300} 0 0 0;
  line-height: 1.5;
`;

const DepsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  flex-wrap: wrap;
`;

const DepChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const DepLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  justify-content: space-between;
`;

const StatsText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const DisconnectedText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorError};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const PartialSteps = styled.div`
  display: flex;
  gap: 2px;
  height: 4px;
  max-width: 100px;
`;

const PartialStep = styled.div<{ filled: boolean }>`
  flex: 1;
  border-radius: 2px;
  background-color: ${({ theme, filled }) =>
    filled ? (theme as StyledTheme).colorWarning : (theme as StyledTheme).colorOutlineVariant};
`;

function getStateLabelAppearance(state: string) {
  switch (state) {
    case 'active': return (Label.APPEARANCES as any).SUCCESS || Label.APPEARANCES.NEUTRAL;
    case 'partial': return (Label.APPEARANCES as any).WARNING || Label.APPEARANCES.NEUTRAL;
    case 'disconnected': return (Label.APPEARANCES as any).ERROR || Label.APPEARANCES.NEUTRAL;
    default: return Label.APPEARANCES.NEUTRAL;
  }
}

function getStateLabel(state: string): string {
  switch (state) {
    case 'active': return 'Active';
    case 'partial': return 'Partial';
    case 'disconnected': return 'Disconnected';
    case 'dismissed': return 'Skipped';
    default: return 'Set up';
  }
}

function getCTA(state: string): string {
  switch (state) {
    case 'active': return 'Manage';
    case 'partial': return 'Resume';
    case 'disconnected': return 'Reconnect';
    default: return 'Set up';
  }
}

const DismissLink = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; color: ${({ theme }) => (theme as StyledTheme).colorOnSurface}; }
`;

const CapabilityRow: React.FC<CapabilityRowProps> = ({
  capability,
  connections,
  isExpanded: controlledExpanded,
  onToggle,
  forceCollapsed,
  onDismiss,
  onRestore,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = forceCollapsed ? false : (controlledExpanded ?? internalExpanded);
  const handleToggle = onToggle || (() => setInternalExpanded(!internalExpanded));

  const deps = getConnectionsForCapability(capability, connections);
  const disconnectedDeps = deps.filter(d => d.state === 'disconnected');

  return (
    <RowContainer isExpanded={isExpanded}>
      <RowHeader onClick={handleToggle}>
        <StateDot capState={capability.state} />
        <RowName>{capability.name}</RowName>
        <RowValueProp>{capability.valueDescription}</RowValueProp>
        <StatusPill>
          <Label
            size={Label.SIZES.S}
            appearance={getStateLabelAppearance(capability.state)}
          >
            {getStateLabel(capability.state)}
          </Label>
        </StatusPill>
        <ChevronIcon isExpanded={isExpanded}>
          <Icon type={Icon.TYPES.CHEVRON_DOWN} size={16} />
        </ChevronIcon>
      </RowHeader>

      {isExpanded && (
        <ExpandedContent>
          <ExpandedDescription>{capability.description}</ExpandedDescription>

          {deps.length > 0 && (
            <DepsRow>
              <DepLabel>Requires:</DepLabel>
              {deps.map(dep => (
                <DepChip key={dep.id}>
                  <StatusDot state={dep.state} />
                  {dep.name}
                </DepChip>
              ))}
            </DepsRow>
          )}

          <SocialProof adoptionPercent={capability.adoptionPercent} />

          {capability.state === 'disconnected' && disconnectedDeps.length > 0 && (
            <DisconnectedText>
              <Icon type={(Icon.TYPES as any).ALERT_TRIANGLE_OUTLINE} size={14} />
              {disconnectedDeps.map(d => d.name).join(', ')} connection lost
            </DisconnectedText>
          )}

          {capability.state === 'partial' && capability.partialProgress && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <StatsText>
                {capability.partialProgress.completed} of {capability.partialProgress.total} steps complete
              </StatsText>
              <PartialSteps>
                {Array.from({ length: capability.partialProgress.total }).map((_, i) => (
                  <PartialStep key={i} filled={i < capability.partialProgress!.completed} />
                ))}
              </PartialSteps>
            </div>
          )}

          <ActionsRow>
            {capability.state === 'not_started' && (
              <StatsText>~{capability.estimatedSetupMinutes} min to set up</StatsText>
            )}
            {capability.state === 'not_started' && onDismiss && (
              <DismissLink onClick={() => onDismiss(capability.id)}>Not for us</DismissLink>
            )}
            {capability.state === 'dismissed' && onRestore && (
              <DismissLink onClick={() => onRestore(capability.id)}>Restore</DismissLink>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              {capability.state === 'active' && (
                <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.GHOST}>
                  Disable
                </Button>
              )}
              {capability.state !== 'dismissed' && (
                <Button size={Button.SIZES.S} appearance={
                  capability.state === 'not_started'
                    ? Button.APPEARANCES.PRIMARY
                    : Button.APPEARANCES.OUTLINE
                }>
                  {getCTA(capability.state)}
                </Button>
              )}
            </div>
          </ActionsRow>
        </ExpandedContent>
      )}
    </RowContainer>
  );
};

export default CapabilityRow;
