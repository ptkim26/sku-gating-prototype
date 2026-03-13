/**
 * Inline Alert
 *
 * Contextual warning shown at the top of feature tabs when a
 * connection powering that tab is degraded or disconnected.
 * Dismissible per session.
 */

import React from 'react';
import { usePebbleTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import { Connection } from './types';
import { AlertContainer, AlertText, AlertTitle, AlertDescription } from './shared-styles';

interface InlineAlertProps {
  connection: Connection;
  featureImpact: string;
  onReconnect?: () => void;
  onDismiss?: () => void;
}

const InlineAlert: React.FC<InlineAlertProps> = ({
  connection,
  featureImpact,
  onReconnect,
  onDismiss,
}) => {
  const { theme } = usePebbleTheme();
  const severity = connection.state === 'disconnected' ? 'error' : 'warning';

  const title =
    connection.state === 'disconnected'
      ? `${connection.name} connection is disconnected`
      : `${connection.name} connection needs attention`;

  return (
    <AlertContainer theme={theme} severity={severity}>
      <Icon
        type={
          severity === 'error'
            ? Icon.TYPES.ALERT_CIRCLE_OUTLINE
            : Icon.TYPES.ALERT_TRIANGLE_OUTLINE
        }
        size={20}
      />
      <AlertText theme={theme}>
        <AlertTitle theme={theme}>{title}</AlertTitle>
        <AlertDescription theme={theme}>{featureImpact}</AlertDescription>
      </AlertText>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        <Button
          size={Button.SIZES.XS}
          appearance={Button.APPEARANCES.PRIMARY}
          onClick={onReconnect}
        >
          Reconnect
        </Button>
        {onDismiss && (
          <Button.Icon
            icon={Icon.TYPES.CLOSE}
            size={Button.SIZES.XS}
            appearance={Button.APPEARANCES.GHOST}
            onClick={onDismiss}
            aria-label="Dismiss alert"
          />
        )}
      </div>
    </AlertContainer>
  );
};

export default InlineAlert;
