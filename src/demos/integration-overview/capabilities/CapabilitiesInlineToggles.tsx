/**
 * Capabilities Concept 2: "Inline Toggles" (Compact List)
 *
 * Inspired by Okta/Entra per-feature model.
 * All capabilities in a single flat list with inline expansion (accordion).
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import { Capability, Connection } from '../types';
import CompletionProgress from '../components/CompletionProgress';
import CapabilityRow from '../components/CapabilityRow';

interface CapabilitiesInlineTogglesProps {
  capabilities: Capability[];
  connections: Connection[];
  onDismiss?: (capId: string) => void;
  onRestore?: (capId: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const RowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const CapabilitiesInlineToggles: React.FC<CapabilitiesInlineTogglesProps> = ({
  capabilities,
  connections,
  onDismiss,
  onRestore,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort: active capabilities first, then actionable, dismissed last
  const sorted = [...capabilities].sort((a, b) => {
    const order = { active: 0, partial: 1, disconnected: 2, not_started: 3, dismissed: 4 };
    return (order[a.state] ?? 3) - (order[b.state] ?? 3);
  });

  return (
    <Container>
      <CompletionProgress capabilities={capabilities} />
      <RowList>
        {sorted.map(cap => (
          <CapabilityRow
            key={cap.id}
            capability={cap}
            connections={connections}
            isExpanded={expandedId === cap.id}
            onToggle={() => setExpandedId(expandedId === cap.id ? null : cap.id)}
            onDismiss={onDismiss}
            onRestore={onRestore}
          />
        ))}
      </RowList>
    </Container>
  );
};

export default CapabilitiesInlineToggles;
