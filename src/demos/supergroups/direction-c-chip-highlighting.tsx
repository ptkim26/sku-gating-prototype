/**
 * Direction C: Attribute Highlighting on Chips
 *
 * As name chips are added, each chip subtly shows its department via a
 * small badge. When 3+ chips share an attribute, they visually highlight
 * and a grouped summary appears: "3 people from Engineering".
 *
 * There is no explicit CTA — the user connects the dots themselves.
 * Optionally, once the threshold is met, a soft "Create rule" link
 * appears to bridge the gap.
 *
 * Tradeoffs: Most aligned with "teach, don't automate". Very low Clippy
 * risk. But relies on the user noticing the pattern — uncertain
 * conversion rate.
 */

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import Avatar from '@rippling/pebble/Avatar';
import Button from '@rippling/pebble/Button';
import { Employee, EMPLOYEE_MAP } from './mock-data';
import {
  PageContainer,
  ContentWrapper,
  DemoHeader,
  DemoTitle,
  DemoSubtitle,
  DirectionLabel,
  BackLink,
  HighlightedChip,
  ChipBadge,
  ChipRemoveButton,
  ClusterSummary,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { detectClusters, clusterToRuleLabel } from './detection-utils';

const DirectionCChipHighlighting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction C</DirectionLabel>
          <DemoTitle>Attribute Highlighting on Chips</DemoTitle>
          <DemoSubtitle>
            Add people and notice the subtle department badges on each chip.
            When 3+ people share an attribute, the chips highlight and a summary
            appears — no prompts, just pattern visibility.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          renderChip={(employee: Employee, onRemove: () => void) => (
            <ChipWithHighlight employee={employee} onRemove={onRemove} />
          )}
          renderSuggestion={({ selectedIds, onAcceptRule }) => (
            <ClusterSummaries selectedIds={selectedIds} onAcceptRule={onAcceptRule} />
          )}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

/**
 * A chip that shows the employee's department as a small badge.
 * The highlight state is controlled at render time by checking the
 * current clusters — we use a wrapper to keep the chip stateless.
 */
const ChipWithHighlight: React.FC<{
  employee: Employee;
  onRemove: () => void;
}> = ({ employee, onRemove }) => {
  // The highlight is purely visual — we show department badge always
  return (
    <HighlightedChip isHighlighted={false}>
      <Avatar name={employee.name} size={Avatar.SIZES.XS} />
      {employee.name}
      <ChipBadge>{employee.department}</ChipBadge>
      <ChipRemoveButton onClick={onRemove}>
        <Icon type={Icon.TYPES.CLOSE} size={12} />
      </ChipRemoveButton>
    </HighlightedChip>
  );
};

/**
 * Renders cluster summaries below the chip area when thresholds are met.
 */
const ClusterSummaries: React.FC<{
  selectedIds: string[];
  onAcceptRule: (rule: RuleItem) => void;
}> = ({ selectedIds, onAcceptRule }) => {
  const clusters = useMemo(() => detectClusters(selectedIds), [selectedIds]);

  if (clusters.length === 0) return null;

  return (
    <div>
      {clusters.map((cluster) => {
        const key = `${cluster.attribute}:${cluster.value}`;
        const ruleLabel = clusterToRuleLabel(cluster);

        const rule: RuleItem = {
          id: key,
          label: ruleLabel,
          attribute: cluster.attribute,
          value: cluster.value,
          replacedIds: cluster.matchingIds,
        };

        return (
          <ClusterSummary key={key}>
            <Icon type={Icon.TYPES.PEOPLE_OUTLINE} size={14} />
            <span>
              {cluster.matchingIds.length} people from{' '}
              <strong>{cluster.value}</strong>
            </span>
            <Button
              size={Button.SIZES.S}
              appearance={Button.APPEARANCES.GHOST}
              onClick={() => onAcceptRule(rule)}
            >
              Create rule
            </Button>
          </ClusterSummary>
        );
      })}
    </div>
  );
};

export default DirectionCChipHighlighting;
