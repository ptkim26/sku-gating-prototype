/**
 * Capabilities Concept 1: "Grouped Cards" (Dashboard)
 *
 * Full card treatment for each capability, grouped by status.
 * Groups: Needs attention, Ready to set up, Active.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import { Capability, Connection } from '../types';
import CompletionProgress from '../components/CompletionProgress';
import CapabilityCard from '../components/CapabilityCard';

interface CapabilitiesGroupedCardsProps {
  capabilities: Capability[];
  connections: Connection[];
  onDismiss?: (capId: string) => void;
  onRestore?: (capId: string) => void;
}

/* ─── Layout ─── */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
`;

const GroupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const GroupTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const GroupCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

/* ─── Active group collapsed toggle ─── */

const ToggleRow = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};

  &:hover {
    text-decoration: underline;
  }
`;

const ChevronIcon = styled.span<{ isExpanded?: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 200ms ease;
  transform: rotate(${({ isExpanded }) => (isExpanded ? '180deg' : '0deg')});
`;

/* ─── Active compact row ─── */

const ActiveRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const ActiveRowName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ActiveDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSuccess};
`;

const ManageLink = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

/* ─── Component ─── */

const SkippedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border: 1px dashed ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  opacity: 0.7;
`;

const SkippedRowName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const RestoreLink = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

const CapabilitiesGroupedCards: React.FC<CapabilitiesGroupedCardsProps> = ({
  capabilities,
  connections,
  onDismiss,
  onRestore,
}) => {
  const [showActive, setShowActive] = useState(false);
  const [showSkipped, setShowSkipped] = useState(false);

  const disconnected = capabilities.filter(c => c.state === 'disconnected');
  const needsSetup = capabilities.filter(c => c.state === 'not_started' || c.state === 'partial');
  const active = capabilities.filter(c => c.state === 'active');
  const dismissed = capabilities.filter(c => c.state === 'dismissed');

  // Find the recommended capability (highest adoption among not_started)
  const recommendedId = needsSetup
    .filter(c => c.state === 'not_started')
    .sort((a, b) => b.adoptionPercent - a.adoptionPercent)[0]?.id;

  return (
    <Container>
      {/* Progress Header */}
      <CompletionProgress capabilities={capabilities} />

      {/* Needs Attention (disconnected) */}
      {disconnected.length > 0 && (
        <GroupSection>
          <GroupHeader>
            <GroupTitle>Needs attention</GroupTitle>
            <GroupCount>({disconnected.length})</GroupCount>
          </GroupHeader>
          <CardGrid>
            {disconnected.map(cap => (
              <CapabilityCard
                key={cap.id}
                capability={cap}
                connections={connections}
              />
            ))}
          </CardGrid>
        </GroupSection>
      )}

      {/* Ready to Set Up */}
      {needsSetup.length > 0 && (
        <GroupSection>
          <GroupHeader>
            <GroupTitle>Ready to set up</GroupTitle>
            <GroupCount>({needsSetup.length})</GroupCount>
          </GroupHeader>
          <CardGrid>
            {needsSetup.map(cap => (
              <CapabilityCard
                key={cap.id}
                capability={cap}
                connections={connections}
                recommended={cap.id === recommendedId}
                onDismiss={onDismiss}
              />
            ))}
          </CardGrid>
        </GroupSection>
      )}

      {/* Active */}
      {active.length > 0 && (
        <GroupSection>
          <ToggleRow onClick={() => setShowActive(!showActive)}>
            <ChevronIcon isExpanded={showActive}>
              <Icon type={Icon.TYPES.CHEVRON_DOWN} size={16} />
            </ChevronIcon>
            {showActive ? 'Hide' : 'Show'} {active.length} active capability{active.length !== 1 ? 'ies' : ''}
          </ToggleRow>
          {showActive && (
            <CardGrid>
              {active.map(cap => (
                <ActiveRow key={cap.id}>
                  <ActiveRowName>
                    <ActiveDot />
                    {cap.name}
                  </ActiveRowName>
                  <ManageLink>Manage</ManageLink>
                </ActiveRow>
              ))}
            </CardGrid>
          )}
        </GroupSection>
      )}

      {/* Skipped */}
      {dismissed.length > 0 && (
        <GroupSection>
          <ToggleRow onClick={() => setShowSkipped(!showSkipped)}>
            <ChevronIcon isExpanded={showSkipped}>
              <Icon type={Icon.TYPES.CHEVRON_DOWN} size={16} />
            </ChevronIcon>
            {showSkipped ? 'Hide' : 'Show'} {dismissed.length} skipped capability{dismissed.length !== 1 ? 'ies' : ''}
          </ToggleRow>
          {showSkipped && (
            <CardGrid>
              {dismissed.map(cap => (
                <SkippedRow key={cap.id}>
                  <SkippedRowName>{cap.name}</SkippedRowName>
                  {onRestore && <RestoreLink onClick={() => onRestore(cap.id)}>Restore</RestoreLink>}
                </SkippedRow>
              ))}
            </CardGrid>
          )}
        </GroupSection>
      )}
    </Container>
  );
};

export default CapabilitiesGroupedCards;
