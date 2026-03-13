/**
 * Completion Progress
 *
 * "X of Y active" text with a segmented progress bar.
 * Each segment represents one capability, colored by state.
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import { Capability, CapabilityState } from '../types';

interface CompletionProgressProps {
  capabilities: Capability[];
  compact?: boolean;
}

const Container = styled.div<{ compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, compact }) => compact ? (theme as StyledTheme).space200 : (theme as StyledTheme).space300};
`;

const TextRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const CountText = styled.span<{ compact?: boolean }>`
  ${({ theme, compact }) => compact
    ? (theme as StyledTheme).typestyleV2BodyMedium
    : (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const SegmentedBar = styled.div`
  display: flex;
  gap: 3px;
  height: 6px;
  width: 100%;
`;

const STATE_COLOR_MAP: Record<CapabilityState, string> = {
  active: 'colorSuccess',
  partial: 'colorWarning',
  disconnected: 'colorError',
  not_started: 'colorOutlineVariant',
  dismissed: 'colorOutlineVariant',
};

const Segment = styled.div<{ capState: CapabilityState }>`
  flex: 1;
  border-radius: 3px;
  background-color: ${({ theme, capState }) =>
    (theme as StyledTheme)[STATE_COLOR_MAP[capState]]};
  transition: background-color 200ms ease;
`;

const DismissedCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const CompletionProgress: React.FC<CompletionProgressProps> = ({ capabilities, compact }) => {
  const selected = capabilities.filter(c => c.state !== 'dismissed');
  const active = selected.filter(c => c.state === 'active').length;
  const total = selected.length;
  const dismissed = capabilities.length - total;

  return (
    <Container theme={undefined as any} compact={compact}>
      <TextRow>
        <CountText compact={compact}>{active} of {total} capabilities active</CountText>
        {dismissed > 0 && (
          <DismissedCount>{dismissed} skipped</DismissedCount>
        )}
      </TextRow>
      <SegmentedBar>
        {selected.map(cap => (
          <Segment key={cap.id} capState={cap.state} />
        ))}
      </SegmentedBar>
    </Container>
  );
};

export default CompletionProgress;
