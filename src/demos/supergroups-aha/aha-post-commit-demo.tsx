/**
 * Direction B: Post-commit Simplification
 *
 * The user adds people freely with no mid-flow interruption. When they
 * click "Preview Group", a review panel appears showing the members and
 * — if clusters are detected — a banner suggesting conversion to a
 * dynamic rule.
 *
 * - Accept → converts the matching people to a rule chip
 * - Dismiss → continues with the manual list
 *
 * Tradeoffs: Least interruptive (suggestion appears at a natural pause),
 * but the aha moment is weaker because the user has already "solved"
 * their task.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import Avatar from '@rippling/pebble/Avatar';
import Button from '@rippling/pebble/Button';
import { EMPLOYEE_MAP } from './mock-data';
import {
  PageContainer,
  ContentWrapper,
  DemoHeader,
  DemoTitle,
  DemoSubtitle,
  DirectionLabel,
  BackLink,
  BuilderFooter,
  MemberCount,
  PreviewPanel,
  PreviewTitle,
  PreviewMemberRow,
  PreviewMemberMeta,
  SuggestionBar,
  SuggestionText,
  SuggestionActions,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { detectClusters, clusterToSuggestionText, clusterToRuleLabel } from './detection-utils';

const AhaPostCommitDemo: React.FC = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [currentSelectedIds, setCurrentSelectedIds] = useState<string[]>([]);
  const [currentRules, setCurrentRules] = useState<RuleItem[]>([]);
  const [dismissedKeys, setDismissedKeys] = useState<Set<string>>(new Set());

  const handleSelectionChange = useCallback((ids: string[], rules: RuleItem[]) => {
    setCurrentSelectedIds(ids);
    setCurrentRules(rules);
    // Close preview if user changes selection
    if (showPreview) setShowPreview(false);
  }, [showPreview]);

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction B</DirectionLabel>
          <DemoTitle>Post-commit Simplification</DemoTitle>
          <DemoSubtitle>
            Add people to the group — no interruptions while you work. When
            you're ready, click "Preview Group" to review. If the system detects
            a pattern, it will suggest converting to a dynamic rule.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          onSelectionChange={handleSelectionChange}
          renderFooter={({ selectedIds, rules, onAcceptRule }) => {
            const totalMembers =
              selectedIds.length +
              rules.reduce((sum, r) => sum + r.replacedIds.length, 0);

            return (
              <>
                <BuilderFooter>
                  <MemberCount>
                    {totalMembers === 0
                      ? 'No members added'
                      : `${totalMembers} member${totalMembers === 1 ? '' : 's'}`}
                  </MemberCount>
                  <Button
                    size={Button.SIZES.S}
                    appearance={Button.APPEARANCES.PRIMARY}
                    onClick={() => setShowPreview(true)}
                    disabled={totalMembers === 0}
                  >
                    Preview Group
                  </Button>
                </BuilderFooter>

                {/* Preview panel */}
                {showPreview && totalMembers > 0 && (
                  <PreviewPanel>
                    <PreviewTitle>Group Preview</PreviewTitle>

                    {/* Suggestion banner — only show if clusters exist */}
                    {(() => {
                      const clusters = detectClusters(selectedIds);
                      const activeClusters = clusters.filter(
                        (c) => !dismissedKeys.has(`${c.attribute}:${c.value}`),
                      );

                      if (activeClusters.length === 0) return null;

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
                        <SuggestionBar style={{ marginTop: 0, marginBottom: 16 }}>
                          <Icon type={Icon.TYPES.STAR_OUTLINE} size={16} />
                          <SuggestionText>
                            {clusterToSuggestionText(top)}. You could replace them
                            with a dynamic rule that stays up to date.
                          </SuggestionText>
                          <SuggestionActions>
                            <Button
                              size={Button.SIZES.S}
                              appearance={Button.APPEARANCES.PRIMARY}
                              onClick={() => {
                                onAcceptRule(rule);
                                setShowPreview(false);
                              }}
                            >
                              Use rule
                            </Button>
                            <Button
                              size={Button.SIZES.S}
                              appearance={Button.APPEARANCES.GHOST}
                              onClick={() => {
                                setDismissedKeys((prev) => new Set(prev).add(key));
                              }}
                            >
                              Keep as-is
                            </Button>
                          </SuggestionActions>
                        </SuggestionBar>
                      );
                    })()}

                    {/* Rule members */}
                    {rules.map((rule) => (
                      <PreviewMemberRow key={rule.id}>
                        <Icon type={Icon.TYPES.FILTER_OUTLINE} size={16} />
                        <strong>{rule.label}</strong>
                        <PreviewMemberMeta>
                          {rule.replacedIds.length} member{rule.replacedIds.length === 1 ? '' : 's'} (dynamic)
                        </PreviewMemberMeta>
                      </PreviewMemberRow>
                    ))}

                    {/* Individual members */}
                    {selectedIds.map((id) => {
                      const emp = EMPLOYEE_MAP.get(id);
                      if (!emp) return null;
                      return (
                        <PreviewMemberRow key={id}>
                          <Avatar name={emp.name} size={Avatar.SIZES.XS} />
                          {emp.name}
                          <PreviewMemberMeta>
                            {emp.department} · {emp.location}
                          </PreviewMemberMeta>
                        </PreviewMemberRow>
                      );
                    })}
                  </PreviewPanel>
                )}
              </>
            );
          }}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default AhaPostCommitDemo;
