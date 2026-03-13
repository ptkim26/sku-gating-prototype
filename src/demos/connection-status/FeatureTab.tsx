/**
 * Feature Tab
 *
 * Generic content for Access and Workflows tabs.
 * Shows scoped inline alerts for degraded/disconnected connections
 * and ActionCard empty states for not-connected connections.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import ActionCard from '@rippling/pebble/ActionCard';
import Icon from '@rippling/pebble/Icon';
import { Connection, Feature, getConnectionsForTab } from './types';
import InlineAlert from './InlineAlert';
import { SectionContainer, FeatureCardRow, SpotIllustration, FeatureCardContent, FeatureCardTitle, FeatureCardTitleText, FeatureCardDescription } from './shared-styles';
import Label from '@rippling/pebble/Label';
import Button from '@rippling/pebble/Button';

interface FeatureTabProps {
  tabId: string;
  tabLabel: string;
  connections: Connection[];
  features: Feature[];
  onReconnect: (connectionId: string) => void;
}

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const PlaceholderContent = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border: 1px dashed ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space1000};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const PlaceholderText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const FEATURE_ICONS: Record<string, string> = {
  'assign-users': Icon.TYPES.PEOPLE_TEAM_OUTLINE,
  'manage-groups': Icon.TYPES.PEOPLE_TEAM_OUTLINE,
  sso: Icon.TYPES.LOCK_OUTLINE,
  'build-workflows': Icon.TYPES.LIGHTNING_BOLT_OUTLINE,
};

const FeatureTab: React.FC<FeatureTabProps> = ({
  tabId,
  tabLabel,
  connections,
  features,
  onReconnect,
}) => {
  const { theme } = usePebbleTheme();
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const tabConnections = getConnectionsForTab(connections, features, tabId);
  const tabFeatures = features.filter(f => f.tab === tabId);

  // Connections with issues affecting this tab
  const problemConnections = tabConnections.filter(
    c => c.state === 'disconnected' || c.state === 'degraded'
  );

  // Connections that were never set up
  const notConnectedConnections = tabConnections.filter(c => c.state === 'not-connected');

  const impactMessages: Record<string, string> = {
    access: 'User access sync and provisioning are paused for this feature.',
    workflows: 'Workflow triggers and Slack actions are disabled until the connection is restored.',
  };

  return (
    <TabContent theme={theme}>
      {/* Inline alerts for degraded/disconnected connections */}
      {problemConnections
        .filter(c => !dismissedAlerts.has(c.id))
        .map(conn => (
          <InlineAlert
            key={conn.id}
            connection={conn}
            featureImpact={impactMessages[tabId] || 'Some features on this tab may not work.'}
            onReconnect={() => onReconnect(conn.id)}
            onDismiss={() => setDismissedAlerts(prev => new Set([...prev, conn.id]))}
          />
        ))}

      {/* Empty state for not-connected connections */}
      {notConnectedConnections.length > 0 && (
        <ActionCard
          icon={Icon.TYPES.LINK_OUTLINE}
          title={`Set up ${notConnectedConnections.map(c => c.name).join(' and ')} to enable ${tabLabel.toLowerCase()} features`}
          caption={`Connect ${notConnectedConnections[0].name} to start using the features on this tab.`}
          primaryAction={{
            title: 'Set up connection',
            onClick: () => {},
          }}
        />
      )}

      {/* Feature cards for this tab */}
      {tabFeatures.map(feature => (
        <FeatureCardRow key={feature.id} theme={theme}>
          <SpotIllustration theme={theme}>
            <Icon
              type={FEATURE_ICONS[feature.id] || Icon.TYPES.SETTINGS_OUTLINE}
              size={32}
            />
          </SpotIllustration>
          <FeatureCardContent>
            <div>
              <FeatureCardTitle theme={theme}>
                <FeatureCardTitleText theme={theme}>{feature.name}</FeatureCardTitleText>
                <Label appearance={Label.APPEARANCES.NEUTRAL} size={Label.SIZES.S}>
                  {feature.isEnabled ? 'On' : 'Off'}
                </Label>
              </FeatureCardTitle>
              <FeatureCardDescription theme={theme}>
                {feature.description}
              </FeatureCardDescription>
            </div>
            <div>
              <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
                {feature.isEnabled ? 'Manage' : 'Set up'}
              </Button>
            </div>
          </FeatureCardContent>
        </FeatureCardRow>
      ))}

      {/* Placeholder for additional tab content */}
      {tabFeatures.length === 0 && notConnectedConnections.length === 0 && (
        <PlaceholderContent theme={theme}>
          <PlaceholderText theme={theme}>{tabLabel} content goes here</PlaceholderText>
        </PlaceholderContent>
      )}
    </TabContent>
  );
};

export default FeatureTab;
