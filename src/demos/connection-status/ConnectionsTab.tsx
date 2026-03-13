/**
 * Connections Tab (Administration)
 *
 * The source of truth for all connections.
 * Matches the Figma Administration page with vertical sidebar,
 * summary bar, and connection cards with metadata.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import Label from '@rippling/pebble/Label';
import Modal from '@rippling/pebble/Modal';
import {
  Connection,
  Feature,
  ConnectionState,
  getConnectionHealth,
  getActiveCount,
} from './types';
import {
  StatusDot,
  AdminLayout,
  AdminSidebar,
  AdminSidebarItem,
  AdminContent,
  ConnectionCardGrid,
  ConnectionCard,
  ConnectionCardFullWidth,
  MetadataRow,
  MetadataLabel,
  MetadataValue,
  SectionContainer,
  Divider,
} from './shared-styles';
import { ADMIN_NAV_ITEMS, FEATURES } from './mock-data';

interface ConnectionsTabProps {
  connections: Connection[];
  features: Feature[];
  onReconnect: (connectionId: string) => void;
}

/* ─── Summary Bar ─── */

const SummaryBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SummaryText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Page Header ─── */

const PageTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const PageDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  max-width: 720px;
`;

/* ─── Connection Card Internals ─── */

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const CardTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const CardDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding-top: ${({ theme }) => (theme as StyledTheme).space200};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const MetadataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

/* ─── Expanded Used For (when disconnected) ─── */

const ExpandedUsedFor = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const UsedForItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
`;

const UsedForLabel = styled.span`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const UsedForStatus = styled.span`
  color: ${({ theme }) => (theme as StyledTheme).colorError};
  margin-left: auto;
`;

/* ─── Status badge appearance mapping ─── */

const STATUS_BADGE_APPEARANCE: Record<ConnectionState, string> = {
  connected: 'Success',
  degraded: 'Warning',
  disconnected: 'Error',
  'not-connected': 'Neutral',
};

const STATUS_BADGE_LABEL: Record<ConnectionState, string> = {
  connected: 'Connected',
  degraded: 'Attention needed',
  disconnected: 'Disconnected',
  'not-connected': 'Not connected',
};

const ConnectionsTab: React.FC<ConnectionsTabProps> = ({
  connections,
  features,
  onReconnect,
}) => {
  const { theme } = usePebbleTheme();
  const [reconnectModal, setReconnectModal] = useState<string | null>(null);
  const health = getConnectionHealth(connections);
  const activeCount = getActiveCount(health);

  const reconnectingConnection = connections.find(c => c.id === reconnectModal);

  const getFeaturesForConnection = (conn: Connection) =>
    features.filter(f => conn.featureIds.includes(f.id));

  const renderConnectionCard = (conn: Connection, isFullWidth?: boolean) => {
    const Wrapper = isFullWidth ? ConnectionCardFullWidth : ConnectionCard;
    const connFeatures = getFeaturesForConnection(conn);

    return (
      <Wrapper key={conn.id} theme={theme}>
        <CardHeader theme={theme}>
          <Label
            appearance={(Label.APPEARANCES as any)[STATUS_BADGE_APPEARANCE[conn.state].toUpperCase()] || Label.APPEARANCES.NEUTRAL}
            size={Label.SIZES.S}
          >
            {STATUS_BADGE_LABEL[conn.state]}
          </Label>
          <CardTitle theme={theme}>{conn.name}</CardTitle>
          <CardDescription theme={theme}>{conn.description}</CardDescription>
        </CardHeader>

        <MetadataSection theme={theme}>
          {/* Used for - expanded when disconnected */}
          {conn.state === 'disconnected' ? (
            <div>
              <MetadataRow theme={theme}>
                <MetadataLabel theme={theme}>Used for</MetadataLabel>
              </MetadataRow>
              <ExpandedUsedFor theme={theme}>
                {connFeatures.map(f => (
                  <UsedForItem key={f.id} theme={theme}>
                    <StatusDot theme={theme} state="disconnected" />
                    <UsedForLabel theme={theme}>{f.name}</UsedForLabel>
                    <UsedForStatus theme={theme}>paused</UsedForStatus>
                  </UsedForItem>
                ))}
              </ExpandedUsedFor>
            </div>
          ) : (
            <MetadataRow theme={theme}>
              <MetadataLabel theme={theme}>Used for</MetadataLabel>
              <MetadataValue theme={theme}>{conn.usedFor}</MetadataValue>
            </MetadataRow>
          )}

          <MetadataRow theme={theme}>
            <MetadataLabel theme={theme}>Set up by</MetadataLabel>
            <MetadataValue theme={theme}>{conn.setupBy}</MetadataValue>
          </MetadataRow>
          <MetadataRow theme={theme}>
            <MetadataLabel theme={theme}>Connected to</MetadataLabel>
            <MetadataValue theme={theme}>{conn.connectedTo}</MetadataValue>
          </MetadataRow>
          <MetadataRow theme={theme}>
            <MetadataLabel theme={theme}>Last connected on</MetadataLabel>
            <MetadataValue theme={theme}>{conn.lastConnectedOn}</MetadataValue>
          </MetadataRow>
        </MetadataSection>

        <CardActions theme={theme}>
          {conn.state === 'disconnected' ? (
            <>
              <Button
                size={Button.SIZES.S}
                appearance={Button.APPEARANCES.PRIMARY}
                onClick={() => setReconnectModal(conn.id)}
              >
                Reconnect
              </Button>
              <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
                <Icon type={Icon.TYPES.EDIT_OUTLINE} size={16} />
                Update
              </Button>
            </>
          ) : conn.state === 'not-connected' ? (
            <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.PRIMARY}>
              Set up
            </Button>
          ) : (
            <>
              <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
                <Icon type={Icon.TYPES.EDIT_OUTLINE} size={16} />
                Update
              </Button>
              <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.DESTRUCTIVE}>
                <Icon type={Icon.TYPES.CLOSE_CIRCLE_OUTLINE} size={16} />
                Remove
              </Button>
            </>
          )}
        </CardActions>
      </Wrapper>
    );
  };

  return (
    <AdminLayout theme={theme}>
      {/* Sidebar nav */}
      <AdminSidebar theme={theme}>
        {ADMIN_NAV_ITEMS.map(item => (
          <AdminSidebarItem key={item.id} theme={theme} isActive={item.isActive}>
            {item.label}
          </AdminSidebarItem>
        ))}
      </AdminSidebar>

      {/* Content area */}
      <AdminContent theme={theme}>
        <SectionContainer theme={theme}>
          <div>
            <PageTitle theme={theme}>Connections</PageTitle>
            <SummaryBar theme={theme}>
              <StatusDot theme={theme} state={health.worstState} />
              <SummaryText theme={theme}>
                {activeCount} of {health.total} active
              </SummaryText>
            </SummaryBar>
          </div>
          <PageDescription theme={theme}>
            Connections let Rippling securely communicate with Slack. Without a connection, data
            cannot sync between Rippling and Slack. Each connection uses a secure method — such as
            OAuth 2.0 or SCIM — to authenticate with Slack. You can update or remove a connection
            at any time.
          </PageDescription>
        </SectionContainer>

        {/* Connection cards - first two in grid, third full width */}
        <ConnectionCardGrid theme={theme}>
          {connections.slice(0, 2).map(conn => renderConnectionCard(conn))}
          {connections.slice(2).map(conn => renderConnectionCard(conn, true))}
        </ConnectionCardGrid>
      </AdminContent>

      {/* Reconnect modal */}
      <Modal
        isVisible={!!reconnectModal}
        onCancel={() => setReconnectModal(null)}
        title={`Reconnect ${reconnectingConnection?.name || ''}`}
      >
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, color: theme.colorOnSurfaceVariant }}>
            You'll be redirected to Slack to re-authorize. This usually takes less than a minute.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button
              size={Button.SIZES.M}
              appearance={Button.APPEARANCES.OUTLINE}
              onClick={() => setReconnectModal(null)}
            >
              Cancel
            </Button>
            <Button
              size={Button.SIZES.M}
              appearance={Button.APPEARANCES.PRIMARY}
              onClick={() => {
                if (reconnectModal) {
                  onReconnect(reconnectModal);
                }
                setReconnectModal(null);
              }}
            >
              Continue to Slack
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default ConnectionsTab;
