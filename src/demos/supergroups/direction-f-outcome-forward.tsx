/**
 * Direction F: Outcome-Forward Inline Suggestion
 *
 * An improved version of Direction A. When 3+ selected people share an
 * attribute, an inline suggestion appears — but reframed:
 *
 * 1. Outcome-first copy (not jargon)
 * 2. When/Then rule preview inspired by Linear's Triage Rules
 * 3. "No, just these people" validates intentional manual selection
 *
 * Tradeoffs: Strongest active intervention. Teaches the concept even
 * when dismissed. But takes more vertical space and introduces a new
 * visual pattern (When/Then).
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { StyledTheme } from '@/utils/theme';
import { DURATION, EASING } from '@/utils/animation-constants';
import {
  PageContainer,
  ContentWrapper,
  DemoHeader,
  DemoTitle,
  DemoSubtitle,
  DirectionLabel,
  BackLink,
  fadeSlideIn,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { detectClusters, clusterToSuggestionText } from './detection-utils';

// ── Suggestion styled components ────────────────────────────────────────────

const SuggestionContainer = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  margin-top: ${({ theme }) => (theme as StyledTheme).space400};
  animation: ${fadeSlideIn} ${DURATION.standard} ${EASING.easeOut};
`;

const SuggestionCopy = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimaryContainer};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space300} 0;
  line-height: 1.5;
`;

const WhenThenPreview = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const WhenThenRow = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const WhenThenLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 40px;
`;

const WhenThenValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-weight: 500;
`;

const SuggestionActions = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

// ── Component ────────────────────────────────────────────────────────────────

const DirectionFOutcomeForward: React.FC = () => {
  const navigate = useNavigate();
  const [dismissedKeys, setDismissedKeys] = useState<Set<string>>(new Set());
  const [acceptedKeys, setAcceptedKeys] = useState<Set<string>>(new Set());

  const handleDismiss = useCallback((key: string) => {
    setDismissedKeys((prev) => new Set(prev).add(key));
  }, []);

  const handleAcceptWrapper = useCallback(
    (key: string, rule: RuleItem, onAcceptRule: (r: RuleItem) => void) => {
      setAcceptedKeys((prev) => new Set(prev).add(key));
      onAcceptRule(rule);
    },
    [],
  );

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction F</DirectionLabel>
          <DemoTitle>Outcome-Forward Suggestion</DemoTitle>
          <DemoSubtitle>
            Add 3 or more people who share an attribute (try adding people from
            Engineering). A suggestion appears that leads with the outcome —
            automatic updates — and shows a When/Then rule preview.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          renderSuggestion={({ selectedIds, rules, onAcceptRule }) => {
            const clusters = detectClusters(selectedIds);

            const activeClusters = clusters.filter((c) => {
              const key = `${c.attribute}:${c.value}`;
              return !dismissedKeys.has(key) && !acceptedKeys.has(key);
            });

            if (activeClusters.length === 0) return null;

            const top = activeClusters[0];
            const key = `${top.attribute}:${top.value}`;
            const count = top.matchingIds.length;

            // Build outcome-first copy
            const attributeDescription = (() => {
              switch (top.attribute) {
                case 'department':
                  return `in ${top.value}`;
                case 'location':
                  return `in ${top.value}`;
                case 'employmentType':
                  return top.value.toLowerCase();
                case 'manager':
                  return `reporting to ${top.value}`;
                default:
                  return `sharing ${top.value}`;
              }
            })();

            const whenDescription = (() => {
              switch (top.attribute) {
                case 'department':
                  return `Someone joins or leaves ${top.value}`;
                case 'location':
                  return `Someone moves to or from ${top.value}`;
                case 'employmentType':
                  return `Someone's employment type changes`;
                case 'manager':
                  return `Someone starts or stops reporting to ${top.value}`;
                default:
                  return `${top.value} membership changes`;
              }
            })();

            const rule: RuleItem = {
              id: key,
              label: `${top.attributeLabel}: ${top.value}`,
              attribute: top.attribute,
              value: top.value,
              replacedIds: top.matchingIds,
            };

            return (
              <SuggestionContainer>
                <SuggestionCopy>
                  These {count} people are all {attributeDescription}. Want this
                  group to automatically update when people join or leave?
                </SuggestionCopy>

                <WhenThenPreview>
                  <WhenThenRow>
                    <WhenThenLabel>When</WhenThenLabel>
                    <WhenThenValue>{whenDescription}</WhenThenValue>
                  </WhenThenRow>
                  <WhenThenRow>
                    <WhenThenLabel>Then</WhenThenLabel>
                    <WhenThenValue>This group updates automatically</WhenThenValue>
                  </WhenThenRow>
                </WhenThenPreview>

                <SuggestionActions>
                  <Button
                    size={Button.SIZES.S}
                    appearance={Button.APPEARANCES.PRIMARY}
                    onClick={() => handleAcceptWrapper(key, rule, onAcceptRule)}
                  >
                    Keep it up to date
                  </Button>
                  <Button
                    size={Button.SIZES.S}
                    appearance={Button.APPEARANCES.GHOST}
                    onClick={() => handleDismiss(key)}
                  >
                    No, just these people
                  </Button>
                </SuggestionActions>
              </SuggestionContainer>
            );
          }}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DirectionFOutcomeForward;
