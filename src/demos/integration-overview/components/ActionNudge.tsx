/**
 * Action Nudge
 *
 * Contextual action card derived from current state.
 * E.g., "Review 12 pending access requests" or "Enable SSO - most companies set this up next"
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';

export interface ActionNudgeData {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  severity?: 'info' | 'warning' | 'error';
}

interface ActionNudgeProps {
  action: ActionNudgeData;
  onAction?: () => void;
}

const SEVERITY_BG: Record<string, string> = {
  info: 'colorSurfaceBright',
  warning: 'colorWarningContainer',
  error: 'colorErrorContainer',
};

const Container = styled.div<{ severity: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme, severity }) =>
    (theme as StyledTheme)[SEVERITY_BG[severity] || SEVERITY_BG.info]};
  border: 1px solid ${({ theme, severity }) =>
    severity === 'info'
      ? (theme as StyledTheme).colorOutlineVariant
      : 'transparent'};
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const Title = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const Description = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ActionNudge: React.FC<ActionNudgeProps> = ({ action, onAction }) => (
  <Container severity={action.severity || 'info'} onClick={onAction}>
    <Icon
      type={(Icon.TYPES as any)[action.icon] || Icon.TYPES.QUESTION_CIRCLE_OUTLINE}
      size={20}
    />
    <TextContent>
      <Title>{action.title}</Title>
      <Description>{action.description}</Description>
    </TextContent>
    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.OUTLINE}>
      {action.ctaLabel}
    </Button>
  </Container>
);

export default ActionNudge;
