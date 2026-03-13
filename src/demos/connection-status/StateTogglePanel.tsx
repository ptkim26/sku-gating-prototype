/**
 * State Toggle Panel
 *
 * Floating dev control panel for toggling connection states.
 * Allows reviewers to flip connections between states and
 * watch the entire UI update in real time.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import { Connection, ConnectionState } from './types';
import { StatusDot } from './shared-styles';

interface StateTogglePanelProps {
  connections: Connection[];
  onStateChange: (connectionId: string, newState: ConnectionState) => void;
}

const PanelToggle = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 150ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Panel = styled.div`
  position: fixed;
  bottom: 84px;
  right: 24px;
  width: 320px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space400} ${t.space400}`;
  }};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PanelTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const PanelBody = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ConnectionControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ConnectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-weight: 535;
`;

const StateButtons = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const StateButton = styled.button<{ isActive: boolean; stateType: ConnectionState }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  padding: 4px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive
        ? (theme as StyledTheme).colorPrimary
        : (theme as StyledTheme).colorOutlineVariant};
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

const STATES: { value: ConnectionState; label: string }[] = [
  { value: 'connected', label: 'Connected' },
  { value: 'degraded', label: 'Degraded' },
  { value: 'disconnected', label: 'Disconnected' },
  { value: 'not-connected', label: 'Not set up' },
];

const StateTogglePanel: React.FC<StateTogglePanelProps> = ({ connections, onStateChange }) => {
  const { theme } = usePebbleTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PanelToggle theme={theme} onClick={() => setIsOpen(!isOpen)}>
        <Icon type={Icon.TYPES.SETTINGS_OUTLINE} size={24} />
      </PanelToggle>

      {isOpen && (
        <Panel theme={theme}>
          <PanelHeader theme={theme}>
            <PanelTitle theme={theme}>Connection States</PanelTitle>
            <Button.Icon
              icon={Icon.TYPES.CLOSE}
              size={Button.SIZES.XS}
              appearance={Button.APPEARANCES.GHOST}
              onClick={() => setIsOpen(false)}
              aria-label="Close panel"
            />
          </PanelHeader>
          <PanelBody theme={theme}>
            {connections.map(conn => (
              <ConnectionControl key={conn.id} theme={theme}>
                <ConnectionLabel theme={theme}>
                  <StatusDot theme={theme} state={conn.state} />
                  {conn.name}
                </ConnectionLabel>
                <StateButtons theme={theme}>
                  {STATES.map(s => (
                    <StateButton
                      key={s.value}
                      theme={theme}
                      isActive={conn.state === s.value}
                      stateType={s.value}
                      onClick={() => onStateChange(conn.id, s.value)}
                    >
                      {s.label}
                    </StateButton>
                  ))}
                </StateButtons>
              </ConnectionControl>
            ))}
          </PanelBody>
        </Panel>
      )}
    </>
  );
};

export default StateTogglePanel;
