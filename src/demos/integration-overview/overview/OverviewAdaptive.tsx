/**
 * Overview Concept 2: "Adaptive" (Lifecycle-Aware)
 *
 * The overview surface reshapes itself based on integration maturity.
 * Three modes: New Install (0-1 active), Partial Setup (2-4 active),
 * Fully Configured (5-6 active).
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
import CapabilityRow from '../components/CapabilityRow';
import ActionNudge, { ActionNudgeData } from '../components/ActionNudge';

interface OverviewAdaptiveProps {
  capabilities: Capability[];
  connections: Connection[];
  usageStats: UsageStats;
}

type LifecycleMode = 'new' | 'partial' | 'configured';

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

/* ─── Hero Section (New Install) ─── */

const HeroCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space800};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  flex: 1;
`;

const HeroTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const HeroDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const CompletionRing = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  border: 6px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
`;

const RingOverlay = styled.div<{ progress: number }>`
  position: absolute;
  inset: -6px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  border: 6px solid transparent;
  border-top-color: ${({ theme }) => (theme as StyledTheme).colorSuccess};
  border-right-color: ${({ theme, progress }) =>
    progress > 25 ? (theme as StyledTheme).colorSuccess : 'transparent'};
  border-bottom-color: ${({ theme, progress }) =>
    progress > 50 ? (theme as StyledTheme).colorSuccess : 'transparent'};
  border-left-color: ${({ theme, progress }) =>
    progress > 75 ? (theme as StyledTheme).colorSuccess : 'transparent'};
  transition: all 300ms ease;
`;

const RingValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

/* ─── Capability List for new install ─── */

const CapabilityListItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const CapItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const CapItemName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const CapItemWhy = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Continue Setup Hero (Partial) ─── */

const ModeLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ContinueCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 2px solid ${({ theme }) => (theme as StyledTheme).colorPrimary};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ContinueTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ContinueSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Active Summary (Partial + Configured) ─── */

const ActiveSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ActiveChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space100} ${t.space200}`;
  }};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSuccessContainer};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
`;

/* ─── Health Card (Configured) ─── */

const HealthCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StatLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Quick Actions Grid ─── */

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

/* ─── Helpers ─── */

function getLifecycleMode(capabilities: Capability[]): LifecycleMode {
  const active = capabilities.filter(c => c.state === 'active').length;
  if (active <= 1) return 'new';
  if (active >= 5) return 'configured';
  return 'partial';
}

function buildActions(mode: LifecycleMode, _capabilities: Capability[], usageStats: UsageStats): ActionNudgeData[] {
  const actions: ActionNudgeData[] = [];

  if (mode === 'configured') {
    // Maintenance-focused actions
    if (usageStats.errorsLast24h > 0) {
      actions.push({
        icon: 'ALERT_TRIANGLE_OUTLINE',
        title: `${usageStats.errorsLast24h} sync errors in last 24h`,
        description: 'Review and resolve sync issues',
        ctaLabel: 'View errors',
        severity: 'error',
      });
    }
    actions.push({
      icon: 'LOCK_OUTLINE',
      title: 'Review quarterly access audit',
      description: 'Last reviewed 45 days ago',
      ctaLabel: 'Start review',
      severity: 'info',
    });
    return actions.slice(0, 3);
  }

  // Partial mode
  if (usageStats.pendingAccessRequests > 0) {
    actions.push({
      icon: 'PEOPLE_TEAM_OUTLINE',
      title: `Review ${usageStats.pendingAccessRequests} pending access requests`,
      description: 'People are waiting for access',
      ctaLabel: 'Review',
      severity: 'info',
    });
  }

  if (usageStats.errorsLast24h > 0) {
    actions.push({
      icon: 'ALERT_TRIANGLE_OUTLINE',
      title: `${usageStats.errorsLast24h} sync errors`,
      description: 'Some data may be stale',
      ctaLabel: 'View',
      severity: 'warning',
    });
  }

  return actions.slice(0, 3);
}

/* ─── Component ─── */

const OverviewAdaptive: React.FC<OverviewAdaptiveProps> = ({
  capabilities,
  connections,
  usageStats,
}) => {
  const health = getCapabilityHealth(capabilities);
  const selected = capabilities.filter(c => c.state !== 'dismissed');
  const mode = getLifecycleMode(selected);
  const sortedCaps = [...selected].sort((a, b) => b.adoptionPercent - a.adoptionPercent);
  const remaining = selected.filter(c => c.state !== 'active');
  const activeCaps = selected.filter(c => c.state === 'active');
  const nextRecommended = [...remaining].sort((a, b) => b.adoptionPercent - a.adoptionPercent)[0];
  const progress = health.selected > 0 ? Math.round((health.active / health.selected) * 100) : 0;
  const quickActions = buildActions(mode, capabilities, usageStats);

  return (
    <Container>
      {/* ── New Install Mode ── */}
      {mode === 'new' && (
        <>
          <ModeLabel>New install — getting started</ModeLabel>
          <HeroCard>
            <HeroText>
              <HeroTitle>Get the most out of WorkspaceApp</HeroTitle>
              <HeroDescription>
                Set up capabilities to automate access, sync data, and streamline workflows.
                Start with the most popular ones.
              </HeroDescription>
              {nextRecommended && (
                <div>
                  <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.PRIMARY}>
                    Set up {nextRecommended.name}
                  </Button>
                </div>
              )}
            </HeroText>
            <CompletionRing>
              <RingOverlay progress={progress} />
              <RingValue>{health.active} of {health.total}</RingValue>
            </CompletionRing>
          </HeroCard>

          <HealthStatusBar connections={connections} compact />

          <Section>
            {sortedCaps.map(cap => (
              <CapabilityListItem key={cap.id}>
                <Icon
                  type={(Icon.TYPES as any)[{
                    sso: 'LOCK_OUTLINE',
                    'user-provisioning': 'PEOPLE_TEAM_OUTLINE',
                    'group-sync': 'PEOPLE_TEAM_OUTLINE',
                    'data-import': 'IMPORT_OUTLINE',
                    workflows: 'LIGHTNING_BOLT_OUTLINE',
                    'license-management': 'SETTINGS_OUTLINE',
                  }[cap.id] || 'SETTINGS_OUTLINE']}
                  size={20}
                />
                <CapItemText>
                  <CapItemName>{cap.name}</CapItemName>
                  <CapItemWhy>{cap.valueDescription}</CapItemWhy>
                </CapItemText>
                <Label size={Label.SIZES.S} appearance={Label.APPEARANCES.NEUTRAL}>
                  {`${cap.adoptionPercent}% adoption`}
                </Label>
                <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>
                  Set up
                </Button>
              </CapabilityListItem>
            ))}
          </Section>
        </>
      )}

      {/* ── Partial Setup Mode ── */}
      {mode === 'partial' && (
        <>
          <ModeLabel>Partial setup — {health.active} of {health.selected} active</ModeLabel>

          <ContinueCard>
            <HealthStatusBar connections={connections} compact />
            <ContinueTitle>Pick up where you left off</ContinueTitle>
            <CompletionProgress capabilities={capabilities} />
            <ContinueSubtext>
              You're {health.selected > 0 ? Math.round((health.active / health.selected) * 100) : 0}% there
              {nextRecommended && ` — most companies enable ${nextRecommended.name} next`}
            </ContinueSubtext>
            <Section>
              {remaining.map(cap => (
                <CapabilityRow
                  key={cap.id}
                  capability={cap}
                  connections={connections}
                />
              ))}
            </Section>
          </ContinueCard>

          <Section>
            <SectionTitle>Active capabilities</SectionTitle>
            <ActiveSummary>
              {activeCaps.map(cap => (
                <ActiveChip key={cap.id}>
                  <Icon type={(Icon.TYPES as any).CHECK_CIRCLE} size={14} />
                  {cap.name}
                </ActiveChip>
              ))}
            </ActiveSummary>
          </Section>

          {quickActions.length > 0 && (
            <Section>
              <SectionTitle>Actions</SectionTitle>
              <ActionsGrid>
                {quickActions.map((action, i) => (
                  <ActionNudge key={i} action={action} />
                ))}
              </ActionsGrid>
            </Section>
          )}
        </>
      )}

      {/* ── Fully Configured Mode ── */}
      {mode === 'configured' && (
        <>
          <ModeLabel>Fully configured — monitoring</ModeLabel>
          <HealthCard>
            <HealthStatusBar connections={connections} />
            <StatsGrid>
              <StatBlock>
                <StatValue>{usageStats.provisionedUsers.toLocaleString()}</StatValue>
                <StatLabel>Provisioned users</StatLabel>
              </StatBlock>
              <StatBlock>
                <StatValue>{usageStats.objectsSynced.toLocaleString()}</StatValue>
                <StatLabel>Objects synced</StatLabel>
              </StatBlock>
              <StatBlock>
                <StatValue>{usageStats.errorsLast24h}</StatValue>
                <StatLabel>Errors (24h)</StatLabel>
              </StatBlock>
              <StatBlock>
                <StatValue>{usageStats.lastSyncTime}</StatValue>
                <StatLabel>Last sync</StatLabel>
              </StatBlock>
            </StatsGrid>
          </HealthCard>

          <Section>
            <SectionTitle>Your configuration</SectionTitle>
            <ActiveSummary>
              {selected.map(cap => (
                <ActiveChip key={cap.id}>
                  {cap.state === 'active' && <Icon type={(Icon.TYPES as any).CHECK_CIRCLE} size={14} />}
                  {cap.state === 'disconnected' && <Icon type={(Icon.TYPES as any).ALERT_TRIANGLE_OUTLINE} size={14} />}
                  {cap.name}
                  {cap.state !== 'active' && (
                    <Label size={Label.SIZES.S} appearance={
                      cap.state === 'disconnected'
                        ? ((Label.APPEARANCES as any).ERROR || Label.APPEARANCES.NEUTRAL)
                        : ((Label.APPEARANCES as any).WARNING || Label.APPEARANCES.NEUTRAL)
                    }>
                      {cap.state === 'disconnected' ? 'Disconnected' : 'Partial'}
                    </Label>
                  )}
                </ActiveChip>
              ))}
            </ActiveSummary>
          </Section>

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
        </>
      )}
    </Container>
  );
};

export default OverviewAdaptive;
