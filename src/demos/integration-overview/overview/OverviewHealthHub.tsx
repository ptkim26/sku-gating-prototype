/**
 * Overview Concept 1: "Health Hub" (Structured Sections)
 *
 * Discrete content blocks, clear information hierarchy, predictable layout.
 * Sections: Health status bar, Feature completion card, Getting started
 * checklist, Quick actions, Usage summary.
 */

import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Label from '@rippling/pebble/Label';
import { Capability, Connection, UsageStats, getCapabilityHealth } from '../types';
import HealthStatusBar from '../components/HealthStatusBar';
import CompletionProgress from '../components/CompletionProgress';
import ActionNudge, { ActionNudgeData } from '../components/ActionNudge';

interface OverviewHealthHubProps {
  capabilities: Capability[];
  connections: Connection[];
  usageStats: UsageStats;
}

/* ─── Layout ─── */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
`;

const SectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

/* ─── Feature Completion Card ─── */

const CompletionCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const CapabilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} 0`;
  }};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};

  &:last-child {
    border-bottom: none;
  }
`;

const CapNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const CapName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StateDot = styled.span<{ capState: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme, capState }) => {
    const t = theme as StyledTheme;
    switch (capState) {
      case 'active': return t.colorSuccess;
      case 'partial': return t.colorWarning;
      case 'disconnected': return t.colorError;
      default: return t.colorOutlineVariant;
    }
  }};
`;

/* ─── Getting Started Checklist ─── */

const ChecklistCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
`;

const ChecklistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ChecklistTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space300} ${t.space400}`;
  }};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const ChecklistLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

/* ─── Quick Actions ─── */

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

/* ─── Usage Summary ─── */

const UsageRow = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  flex-wrap: wrap;
`;

const UsageStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UsageValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const UsageLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Helpers ─── */

function getStateLabel(state: string): string {
  switch (state) {
    case 'active': return 'Active';
    case 'partial': return 'Partial';
    case 'disconnected': return 'Disconnected';
    case 'dismissed': return 'Skipped';
    default: return 'Needs setup';
  }
}

function getStateLabelAppearance(state: string) {
  switch (state) {
    case 'active': return (Label.APPEARANCES as any).SUCCESS || Label.APPEARANCES.NEUTRAL;
    case 'partial': return (Label.APPEARANCES as any).WARNING || Label.APPEARANCES.NEUTRAL;
    case 'disconnected': return (Label.APPEARANCES as any).ERROR || Label.APPEARANCES.NEUTRAL;
    default: return Label.APPEARANCES.NEUTRAL;
  }
}

function getCTA(state: string): string {
  switch (state) {
    case 'active': return 'Manage';
    case 'partial': return 'Resume';
    case 'disconnected': return 'Reconnect';
    default: return 'Set up';
  }
}

function buildQuickActions(capabilities: Capability[], usageStats: UsageStats): ActionNudgeData[] {
  const actions: ActionNudgeData[] = [];
  const health = getCapabilityHealth(capabilities);

  if (usageStats.pendingAccessRequests > 0) {
    actions.push({
      icon: 'PEOPLE_TEAM_OUTLINE',
      title: `Review ${usageStats.pendingAccessRequests} pending access requests`,
      description: 'People are waiting for WorkspaceApp access',
      ctaLabel: 'Review',
      severity: 'info',
    });
  }

  if (usageStats.errorsLast24h > 0) {
    actions.push({
      icon: 'ALERT_TRIANGLE_OUTLINE',
      title: `${usageStats.errorsLast24h} sync errors in last 24h`,
      description: 'Some data may not be up to date',
      ctaLabel: 'View errors',
      severity: 'error',
    });
  }

  if (health.disconnected > 0) {
    actions.push({
      icon: 'LINK_OUTLINE',
      title: `${health.disconnected} capability${health.disconnected > 1 ? 'ies' : ''} disconnected`,
      description: 'A connection issue is affecting features',
      ctaLabel: 'Fix',
      severity: 'error',
    });
  }

  // Recommend next capability if there are unstarted ones
  const nextCap = capabilities
    .filter(c => c.state === 'not_started')
    .sort((a, b) => b.adoptionPercent - a.adoptionPercent)[0];
  if (nextCap) {
    actions.push({
      icon: 'LIGHTNING_BOLT_OUTLINE',
      title: `Enable ${nextCap.name}`,
      description: `Most companies set this up next (${nextCap.adoptionPercent}% adoption)`,
      ctaLabel: 'Set up',
      severity: 'info',
    });
  }

  return actions.slice(0, 3);
}

/* ─── Component ─── */

const OverviewHealthHub: React.FC<OverviewHealthHubProps> = ({
  capabilities,
  connections,
  usageStats,
}) => {
  const health = getCapabilityHealth(capabilities);
  const hasUnconfigured = health.notStarted > 0 || health.partial > 0;
  const hasActiveCapabilities = health.active > 0;
  const quickActions = buildQuickActions(capabilities, usageStats);
  const selectedCaps = capabilities.filter(c => c.state !== 'dismissed');
  const dismissedCaps = capabilities.filter(c => c.state === 'dismissed');

  return (
    <Container>
      {/* 1. Health Status Bar */}
      <HealthStatusBar connections={connections} />

      {/* 2. Feature Completion Card */}
      <Section>
        <SectionTitle>Capabilities</SectionTitle>
        <CompletionCard>
          <CompletionProgress capabilities={capabilities} />
          {selectedCaps.map(cap => (
            <CapabilityRow key={cap.id}>
              <CapNameRow>
                <StateDot capState={cap.state} />
                <CapName>{cap.name}</CapName>
                <Label size={Label.SIZES.S} appearance={getStateLabelAppearance(cap.state)}>
                  {getStateLabel(cap.state)}
                </Label>
              </CapNameRow>
              <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.OUTLINE}>
                {getCTA(cap.state)}
              </Button>
            </CapabilityRow>
          ))}
          {dismissedCaps.length > 0 && dismissedCaps.map(cap => (
            <CapabilityRow key={cap.id} style={{ opacity: 0.5 }}>
              <CapNameRow>
                <StateDot capState={cap.state} />
                <CapName>{cap.name}</CapName>
                <Label size={Label.SIZES.S} appearance={Label.APPEARANCES.NEUTRAL}>
                  Skipped
                </Label>
              </CapNameRow>
            </CapabilityRow>
          ))}
        </CompletionCard>
      </Section>

      {/* 3. Getting Started Checklist (only when unconfigured) */}
      {hasUnconfigured && (
        <Section>
          <ChecklistCard>
            <ChecklistHeader>
              <ChecklistTitle>Get started with WorkspaceApp</ChecklistTitle>
              <Icon type={Icon.TYPES.CHEVRON_DOWN} size={20} />
            </ChecklistHeader>
            {['Add an admin', 'Set up your first capability', 'Map user attributes'].map(item => (
              <ChecklistItem key={item}>
                <ChecklistLabel>{item}</ChecklistLabel>
                <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} />
              </ChecklistItem>
            ))}
          </ChecklistCard>
        </Section>
      )}

      {/* 4. Quick Actions */}
      {quickActions.length > 0 && (
        <Section>
          <SectionTitle>Recommended actions</SectionTitle>
          <ActionsGrid>
            {quickActions.map((action, i) => (
              <ActionNudge key={i} action={action} />
            ))}
          </ActionsGrid>
        </Section>
      )}

      {/* 5. Usage Summary (only when capabilities are active) */}
      {hasActiveCapabilities && usageStats.provisionedUsers > 0 && (
        <Section>
          <SectionTitle>Usage summary</SectionTitle>
          <UsageRow>
            <UsageStat>
              <UsageValue>{usageStats.provisionedUsers.toLocaleString()}</UsageValue>
              <UsageLabel>Provisioned users</UsageLabel>
            </UsageStat>
            <UsageStat>
              <UsageValue>{usageStats.objectsSynced.toLocaleString()}</UsageValue>
              <UsageLabel>Objects synced (30 days)</UsageLabel>
            </UsageStat>
            <UsageStat>
              <UsageValue>{usageStats.lastSyncTime}</UsageValue>
              <UsageLabel>Last sync</UsageLabel>
            </UsageStat>
          </UsageRow>
        </Section>
      )}
    </Container>
  );
};

export default OverviewHealthHub;
