/**
 * Direction A: Inline Replacement Suggestion
 *
 * As the user adds name chips, the system detects when 3+ people share
 * an attribute (department, location, etc.) and shows an inline suggestion
 * bar below the chips offering to replace them with a dynamic rule.
 *
 * - Accept → name chips animate into a single rule chip
 * - Dismiss → suggestion fades, won't reappear for that attribute this session
 *
 * Tradeoffs: Most direct aha moment. Moderate Clippy risk — mitigated by
 * appearing only once per attribute and providing easy dismissal.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import {
  PageContainer,
  ContentWrapper,
  DemoHeader,
  DemoTitle,
  DemoSubtitle,
  DirectionLabel,
  SuggestionBar,
  SuggestionLabel,
  RulePreviewChip,
  RulePreviewSegment,
  RulePreviewClose,
  BackLink,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { detectClusters, clusterToRuleLabel } from './detection-utils';

const DirectionAInlineSuggestion: React.FC = () => {
  const navigate = useNavigate();
  // Track which attribute+value combos the user has dismissed
  const [dismissedKeys, setDismissedKeys] = useState<Set<string>>(new Set());
  // Track which rules have already been accepted (to avoid re-suggesting)
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
          <DirectionLabel>Direction A</DirectionLabel>
          <DemoTitle>Inline Replacement Suggestion</DemoTitle>
          <DemoSubtitle>
            Add 3 or more people who share an attribute (try adding people from
            Engineering) and an inline suggestion will appear offering to convert
            them into a dynamic rule.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          renderSuggestion={({ selectedIds, rules, onAcceptRule }) => {
            // Detect clusters in the current selection
            const clusters = detectClusters(selectedIds);

            // Filter out dismissed and already-accepted clusters
            const activeClusters = clusters.filter((c) => {
              const key = `${c.attribute}:${c.value}`;
              return !dismissedKeys.has(key) && !acceptedKeys.has(key);
            });

            if (activeClusters.length === 0) return null;

            // Show the top cluster
            const top = activeClusters[0];
            const key = `${top.attribute}:${top.value}`;
            const ruleLabel = clusterToRuleLabel(top);

            const rule: RuleItem = {
              id: key,
              label: ruleLabel,
              attribute: top.attribute,
              value: top.value,
              replacedIds: top.matchingIds,
            };

            return (
              <SuggestionBar
                onClick={() => handleAcceptWrapper(key, rule, onAcceptRule)}
              >
                <Icon type={Icon.TYPES.STAR_OUTLINE} size={20} />
                <SuggestionLabel>Replace with</SuggestionLabel>
                <RulePreviewChip>
                  <RulePreviewSegment>{top.value}</RulePreviewSegment>
                  <RulePreviewClose
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismiss(key);
                    }}
                    aria-label="Dismiss suggestion"
                  >
                    <Icon type={Icon.TYPES.CLOSE} size={14} />
                  </RulePreviewClose>
                </RulePreviewChip>
              </SuggestionBar>
            );
          }}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DirectionAInlineSuggestion;
