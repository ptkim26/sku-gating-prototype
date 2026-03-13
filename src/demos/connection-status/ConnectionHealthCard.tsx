/**
 * Connection Health Card
 *
 * The always-visible aggregate health indicator for the Overview tab.
 * Shows per-connection status with colored dots and an aggregate summary.
 * Replaces the old Quick Links / disconnect banner pattern.
 */

import React from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import { Connection, getConnectionHealth, getActiveCount } from './types';
import { StatusDot, CardContainer } from './shared-styles';

interface ConnectionHealthCardProps {
  connections: Connection[];
  onReconnect?: (connectionId: string) => void;
  onViewConnections?: () => void;
}

const CardWrapper = styled(CardContainer)`
  flex: 1;
`;

const CardInner = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space800};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AggregateLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const AggregateText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const HeaderDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin: 0 -${({ theme }) => (theme as StyledTheme).space800};
  opacity: 0.5;
`;

const FooterSection = styled.div`
  padding-top: ${({ theme }) => (theme as StyledTheme).space200};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
  opacity: 0.5;
  border-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ConnectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ConnectionRow = styled.div<{ index?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  margin: 0 -${({ theme }) => (theme as StyledTheme).space400};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  transition: all 200ms ease-out;
  cursor: pointer;
  position: relative;

  /* Staggered entry animation */
  animation: slideIn 350ms ease-out forwards;
  animation-delay: ${({ index }) => (index || 0) * 50}ms;
  opacity: 0;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Hover state with left border accent */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    border-radius: 0 2px 2px 0;
    transition: height 200ms ease-out;
  }

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
    transform: translateX(2px);

    &::before {
      height: 60%;
      background-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    }
  }

  &:active {
    transform: translateX(2px) scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => (theme as StyledTheme).colorPrimary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transition: background-color 0ms;
    transform: none !important;

    &::before {
      transition: none;
    }
  }
`;

const ConnectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ConnectionName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ConnectionStatus = styled.span<{ isHealthy: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme, isHealthy }) =>
    isHealthy
      ? (theme as StyledTheme).colorOnSurfaceVariant
      : (theme as StyledTheme).colorError};
`;

const DegradedReason = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorWarning};
`;

const stateLabels: Record<string, string> = {
  connected: 'Connected',
  degraded: 'Attention needed',
  disconnected: 'Disconnected',
  'not-connected': 'Not connected',
};

const ConnectionHealthCard: React.FC<ConnectionHealthCardProps> = ({
  connections,
  onReconnect,
  onViewConnections,
}) => {
  const { theme } = usePebbleTheme();
  const health = getConnectionHealth(connections);
  const activeCount = getActiveCount(health);
  const hasIssues = health.disconnected > 0 || health.degraded > 0;

  return (
    <CardWrapper theme={theme}>
      <CardInner theme={theme}>
        {/* Aggregate header */}
        <HeaderRow>
          <AggregateLabel theme={theme}>
            <StatusDot theme={theme} state={health.worstState} aria-label={`Connection health: ${health.worstState}`} />
            <AggregateText theme={theme} role="status">
              {activeCount} of {health.total} connections active
            </AggregateText>
          </AggregateLabel>
        </HeaderRow>

        <HeaderDivider theme={theme} />

        {/* Per-connection rows */}
        <ConnectionList theme={theme}>
          {connections.map((conn, index) => (
            <ConnectionRow
              key={conn.id}
              theme={theme}
              index={index}
              tabIndex={0}
              role="button"
              aria-label={`${conn.name} connection details`}
            >
              <ConnectionInfo theme={theme}>
                <StatusDot
                  theme={theme}
                  state={conn.state}
                  aria-label={`Status: ${stateLabels[conn.state]}`}
                />
                <ConnectionName theme={theme}>{conn.name}</ConnectionName>
              </ConnectionInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {conn.state === 'connected' && (
                  <ConnectionStatus theme={theme} isHealthy>
                    {stateLabels[conn.state]}
                  </ConnectionStatus>
                )}
                {conn.state === 'degraded' && (
                  <DegradedReason theme={theme}>
                    {conn.degradedReason || stateLabels[conn.state]}
                  </DegradedReason>
                )}
                {conn.state === 'disconnected' && (
                  <Button
                    size={Button.SIZES.XS}
                    appearance={Button.APPEARANCES.PRIMARY}
                    onClick={() => onReconnect?.(conn.id)}
                  >
                    Reconnect
                  </Button>
                )}
                {conn.state === 'not-connected' && (
                  <ConnectionStatus theme={theme} isHealthy={false}>
                    {stateLabels[conn.state]}
                  </ConnectionStatus>
                )}
              </div>
            </ConnectionRow>
          ))}
        </ConnectionList>

        {/* Footer action */}
        <FooterSection theme={theme}>
          {hasIssues ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                size={Button.SIZES.S}
                appearance={Button.APPEARANCES.OUTLINE}
                onClick={onViewConnections}
              >
                <Icon type={Icon.TYPES.SETTINGS_OUTLINE} size={16} />
                View connections
              </Button>
            </div>
          ) : (
            <Button
              size={Button.SIZES.XS}
              appearance={Button.APPEARANCES.GHOST}
              onClick={onViewConnections}
            >
              View connections
            </Button>
          )}
        </FooterSection>
      </CardInner>
    </CardWrapper>
  );
};

export default ConnectionHealthCard;
