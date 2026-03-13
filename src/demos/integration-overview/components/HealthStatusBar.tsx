/**
 * Health Status Bar
 *
 * Full-width strip showing aggregate connection health.
 * Uses colorSuccess/Warning/Error backgrounds at low opacity.
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import { Connection, getWorstConnectionState } from '../types';
import { ConnectionState } from '../../connection-status/types';
import { StatusDot } from '../../connection-status/shared-styles';

interface HealthStatusBarProps {
  connections: Connection[];
  onViewConnections?: () => void;
  compact?: boolean;
}

const BAR_BG: Record<ConnectionState, string> = {
  connected: 'colorSuccessContainer',
  degraded: 'colorWarningContainer',
  disconnected: 'colorErrorContainer',
  'not-connected': 'colorSurfaceContainerLow',
};

const Container = styled.div<{ worstState: ConnectionState }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme, worstState }) => (theme as StyledTheme)[BAR_BG[worstState]]};
  transition: background-color 200ms ease;
`;

const StatusText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  flex: 1;
`;

const SyncText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ViewLink = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

function getStatusMessage(connections: Connection[]): string {
  const active = connections.filter(c => c.state === 'connected' || c.state === 'degraded').length;
  const disconnected = connections.filter(c => c.state === 'disconnected').length;
  const notConnected = connections.filter(c => c.state === 'not-connected').length;
  const total = connections.length;

  if (notConnected === total) return 'No connections set up';
  if (disconnected > 0) return `${disconnected} connection${disconnected > 1 ? 's' : ''} need${disconnected === 1 ? 's' : ''} attention`;
  if (active === total) return `All ${total} connections active`;
  return `${active} of ${total} connections active`;
}

function getLastSync(connections: Connection[]): string | null {
  const synced = connections.filter(c => c.lastSyncTime && c.state !== 'not-connected');
  if (synced.length === 0) return null;
  return synced[0].lastSyncTime || null;
}

const HealthStatusBar: React.FC<HealthStatusBarProps> = ({ connections, onViewConnections, compact }) => {
  const worstState = getWorstConnectionState(connections);
  const lastSync = getLastSync(connections);

  return (
    <Container worstState={worstState}>
      <StatusDot state={worstState} />
      <StatusText>{getStatusMessage(connections)}</StatusText>
      {lastSync && !compact && <SyncText>Last sync: {lastSync}</SyncText>}
      {onViewConnections && (
        <ViewLink onClick={onViewConnections}>View connections</ViewLink>
      )}
    </Container>
  );
};

export default HealthStatusBar;
