/**
 * Overview Tab
 *
 * The landing surface for the Slack integration.
 * Matches the Figma layout: connection health card + action links,
 * Get Started accordion, Last 30 days data block, Features section.
 */

import React from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import Label from '@rippling/pebble/Label';
import { Connection, Feature } from './types';
import {
  SectionContainer,
  SectionHeader,
  TwoColumnRow,
  FeatureCardRow,
  SpotIllustration,
  FeatureCardContent,
  FeatureCardTitle,
  FeatureCardTitleText,
  FeatureCardDescription,
  CardContainer,
  Divider,
  ActionLinksColumn,
  ActionLinkItem,
  ActionLinkText,
  ActionLinkLabel,
  ActionLinkSubtitle,
} from './shared-styles';
import ConnectionHealthCard from './ConnectionHealthCard';
import { ACTION_LINKS } from './mock-data';

interface OverviewTabProps {
  connections: Connection[];
  features: Feature[];
  onReconnect: (connectionId: string) => void;
  onViewConnections: () => void;
}

/* ─── Get Started Section ─── */

const GetStartedCard = styled(CardContainer)`
  padding: ${({ theme }) => (theme as StyledTheme).space600};
`;

const GetStartedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const GetStartedTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const AccordionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space400} ${t.space400}`;
  }};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

/* ─── Data Block (Last 30 days) ─── */

const DataBlockSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const DataBlockTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const DataBlockCard = styled(CardContainer)`
  padding: ${({ theme }) => (theme as StyledTheme).space800};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  min-height: 80px;
`;

const DataBlockText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Feature List ─── */

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

/* ─── Spot illustration icon mapping ─── */
const FEATURE_ICONS: Record<string, string> = {
  'assign-users': Icon.TYPES.PEOPLE_TEAM_OUTLINE,
  'manage-groups': Icon.TYPES.PEOPLE_TEAM_OUTLINE,
  sso: Icon.TYPES.LOCK_OUTLINE,
  'build-workflows': Icon.TYPES.LIGHTNING_BOLT_OUTLINE,
};

const OverviewTab: React.FC<OverviewTabProps> = ({
  connections,
  features,
  onReconnect,
  onViewConnections,
}) => {
  const { theme } = usePebbleTheme();

  return (
    <SectionContainer theme={theme}>
      {/* Connection Health + Action Links */}
      <TwoColumnRow theme={theme}>
        <ConnectionHealthCard
          connections={connections}
          onReconnect={onReconnect}
          onViewConnections={onViewConnections}
        />
        <ActionLinksColumn theme={theme}>
          {ACTION_LINKS.map((link, i) => (
            <ActionLinkItem key={i} theme={theme} onClick={() => {}}>
              <Icon type={(Icon.TYPES as any)[link.icon] || Icon.TYPES.OPEN_IN_NEW_OUTLINE} size={20} />
              <ActionLinkText>
                <ActionLinkLabel theme={theme}>{link.label}</ActionLinkLabel>
                <ActionLinkSubtitle theme={theme}>{link.subtitle}</ActionLinkSubtitle>
              </ActionLinkText>
            </ActionLinkItem>
          ))}
        </ActionLinksColumn>
      </TwoColumnRow>

      {/* Get Started with Slack */}
      <GetStartedCard theme={theme}>
        <GetStartedHeader theme={theme}>
          <GetStartedTitle theme={theme}>Get started with Slack</GetStartedTitle>
          <Icon type={Icon.TYPES.CHECK_CIRCLE} size={24} />
        </GetStartedHeader>
        <CardContainer theme={theme}>
          {['Add admins', 'Use Slack in Workflow Studio', 'Match Slack users to people'].map(
            (item, i) => (
              <AccordionItem key={i} theme={theme}>
                <AccordionLabel theme={theme}>{item}</AccordionLabel>
                <Icon type={Icon.TYPES.CHEVRON_DOWN} size={20} />
              </AccordionItem>
            )
          )}
        </CardContainer>
      </GetStartedCard>

      <Divider theme={theme} />

      {/* Last 30 days */}
      <DataBlockSection>
        <DataBlockTitle theme={theme}>Last 30 days</DataBlockTitle>
        <DataBlockCard theme={theme}>
          <Icon type={Icon.TYPES.QUESTION_CIRCLE_OUTLINE} size={24} />
          <DataBlockText theme={theme}>
            Set up more features to see summary data about your organization's Slack
          </DataBlockText>
        </DataBlockCard>
      </DataBlockSection>

      {/* Features (formerly "Your configuration") */}
      <SectionContainer theme={theme}>
        <SectionHeader theme={theme}>Features</SectionHeader>
        <FeatureList theme={theme}>
          {features.map(feature => (
            <FeatureCardRow key={feature.id} theme={theme}>
              <SpotIllustration theme={theme}>
                <Icon
                  type={FEATURE_ICONS[feature.id] || Icon.TYPES.SETTINGS_OUTLINE}
                  size={32}
                />
              </SpotIllustration>
              <FeatureCardContent>
                <div>
                  <FeatureCardTitle theme={theme}>
                    <FeatureCardTitleText theme={theme}>{feature.name}</FeatureCardTitleText>
                    <Label appearance={Label.APPEARANCES.NEUTRAL} size={Label.SIZES.S}>
                      {feature.isEnabled ? 'On' : 'Off'}
                    </Label>
                  </FeatureCardTitle>
                  <FeatureCardDescription theme={theme}>
                    {feature.description}{' '}
                    <span style={{ color: theme.colorOnSurfaceVariant, cursor: 'pointer' }}>
                      Learn more
                    </span>
                  </FeatureCardDescription>
                </div>
                <div>
                  <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE}>
                    {feature.isEnabled ? 'Manage' : 'Set up'}
                  </Button>
                </div>
              </FeatureCardContent>
            </FeatureCardRow>
          ))}
        </FeatureList>
      </SectionContainer>
    </SectionContainer>
  );
};

export default OverviewTab;
