/**
 * Capability Card
 *
 * Full card treatment for a single capability.
 * Used by Grouped Cards concept and Health Hub overview.
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Label from '@rippling/pebble/Label';
import { Capability, Connection, getConnectionsForCapability } from '../types';
import { StatusDot } from '../../connection-status/shared-styles';
import { CAPABILITY_ICONS } from '../mock-data';
import SocialProof from './SocialProof';

interface CapabilityCardProps {
  capability: Capability;
  connections: Connection[];
  showSocialProof?: boolean;
  showConnectionDeps?: boolean;
  recommended?: boolean;
  onDismiss?: (capId: string) => void;
  onRestore?: (capId: string) => void;
}

const Card = styled.div<{ isDisconnected?: boolean }>`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme, isDisconnected }) =>
    isDisconnected
      ? (theme as StyledTheme).colorError
      : (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  transition: box-shadow 200ms ease, border-color 200ms ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const TitleText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ValueProp = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const ConnectionDeps = styled.div`
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

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const PartialBar = styled.div`
  display: flex;
  gap: 2px;
  height: 4px;
  flex: 1;
  max-width: 120px;
`;

const PartialSegment = styled.div<{ filled: boolean }>`
  flex: 1;
  border-radius: 2px;
  background-color: ${({ theme, filled }) =>
    filled ? (theme as StyledTheme).colorWarning : (theme as StyledTheme).colorOutlineVariant};
`;

const RecommendedBadge = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  padding: 2px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
`;

const DisconnectedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorError};
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
    default: return 'Not started';
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

const CapabilityCard: React.FC<CapabilityCardProps> = ({
  capability,
  connections,
  showSocialProof = true,
  showConnectionDeps = true,
  recommended = false,
  onDismiss,
  onRestore,
}) => {
  const deps = getConnectionsForCapability(capability, connections);
  const iconType = (Icon.TYPES as any)[CAPABILITY_ICONS[capability.id]] || Icon.TYPES.SETTINGS_OUTLINE;
  const disconnectedDeps = deps.filter(d => d.state === 'disconnected');

  return (
    <Card isDisconnected={capability.state === 'disconnected'}>
      <Header>
        <IconCircle>
          <Icon type={iconType} size={20} />
        </IconCircle>
        <TitleArea>
          <TitleRow>
            <TitleText>{capability.name}</TitleText>
            <Label
              size={Label.SIZES.S}
              appearance={getStateLabelAppearance(capability.state)}
            >
              {getStateLabel(capability.state)}
            </Label>
            {recommended && <RecommendedBadge>Recommended</RecommendedBadge>}
          </TitleRow>
        </TitleArea>
      </Header>

      <ValueProp>
        {capability.state === 'not_started'
          ? capability.valueDescription
          : capability.description}
      </ValueProp>

      {capability.state === 'disconnected' && disconnectedDeps.length > 0 && (
        <DisconnectedInfo>
          <Icon type={(Icon.TYPES as any).ALERT_TRIANGLE_OUTLINE} size={16} />
          {disconnectedDeps.map(d => d.name).join(', ')} connection lost
        </DisconnectedInfo>
      )}

      {capability.state === 'partial' && capability.partialProgress && (
        <PartialBar>
          {Array.from({ length: capability.partialProgress.total }).map((_, i) => (
            <PartialSegment key={i} filled={i < capability.partialProgress!.completed} />
          ))}
        </PartialBar>
      )}

      {showSocialProof && capability.state === 'not_started' && (
        <SocialProof adoptionPercent={capability.adoptionPercent} />
      )}

      {showConnectionDeps && deps.length > 0 && (
        <ConnectionDeps>
          <DepLabel>Requires:</DepLabel>
          {deps.map(dep => (
            <DepChip key={dep.id}>
              <StatusDot state={dep.state} />
              {dep.name}
            </DepChip>
          ))}
        </ConnectionDeps>
      )}

      <Footer>
        {capability.state === 'not_started' && (
          <span style={{ fontSize: '12px', opacity: 0.6 }}>~{capability.estimatedSetupMinutes} min</span>
        )}
        {capability.state === 'dismissed' && onRestore && (
          <DismissLink onClick={() => onRestore(capability.id)}>Restore</DismissLink>
        )}
        {capability.state === 'not_started' && onDismiss && (
          <DismissLink onClick={() => onDismiss(capability.id)}>Not for us</DismissLink>
        )}
        {capability.state !== 'dismissed' && (
          <div style={{ marginLeft: 'auto' }}>
            <Button size={Button.SIZES.S} appearance={
              capability.state === 'not_started'
                ? Button.APPEARANCES.PRIMARY
                : Button.APPEARANCES.OUTLINE
            }>
              {getCTA(capability.state)}
            </Button>
          </div>
        )}
      </Footer>
    </Card>
  );
};

export default CapabilityCard;
