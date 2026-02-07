/**
 * Direction D: Empty-state Education
 *
 * Before the user starts typing names, the empty builder shows
 * pre-populated rule suggestions based on org data:
 *   "Start with a rule: Everyone in Engineering / SF Office / All Full-time"
 *
 * Clicking a suggestion adds a rule chip directly. Once the user starts
 * typing names, the suggestions fade away.
 *
 * Tradeoffs: Prevents the problem instead of correcting it. Very low
 * Clippy risk (it's just what the empty state looks like). But weak for
 * users who arrive with an intent already formed — they'll skip past it
 * (banner blindness).
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import {
  PageContainer,
  ContentWrapper,
  DemoHeader,
  DemoTitle,
  DemoSubtitle,
  DirectionLabel,
  BackLink,
  SuggestionPillsContainer,
  SuggestionPillsLabel,
  SuggestionPills,
  SuggestionPill,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { EMPLOYEES } from './mock-data';

// ── Pre-computed suggestions based on org data ─────────────────────────────

interface OrgSuggestion {
  label: string;
  attribute: string;
  value: string;
  icon: string;
  /** IDs of employees that match this rule */
  matchingIds: string[];
}

function computeOrgSuggestions(): OrgSuggestion[] {
  // Top departments by headcount
  const deptCounts = new Map<string, string[]>();
  const locCounts = new Map<string, string[]>();
  const typeCounts = new Map<string, string[]>();

  for (const emp of EMPLOYEES) {
    if (!deptCounts.has(emp.department)) deptCounts.set(emp.department, []);
    deptCounts.get(emp.department)!.push(emp.id);

    if (!locCounts.has(emp.location)) locCounts.set(emp.location, []);
    locCounts.get(emp.location)!.push(emp.id);

    if (!typeCounts.has(emp.employmentType)) typeCounts.set(emp.employmentType, []);
    typeCounts.get(emp.employmentType)!.push(emp.id);
  }

  // Pick the top suggestions
  const suggestions: OrgSuggestion[] = [];

  // Largest department
  const topDept = [...deptCounts.entries()].sort((a, b) => b[1].length - a[1].length)[0];
  if (topDept) {
    suggestions.push({
      label: `Everyone in ${topDept[0]}`,
      attribute: 'department',
      value: topDept[0],
      icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE,
      matchingIds: topDept[1],
    });
  }

  // Largest location
  const topLoc = [...locCounts.entries()].sort((a, b) => b[1].length - a[1].length)[0];
  if (topLoc) {
    // Shorten "San Francisco, CA" → "SF Office"
    const shortLoc = topLoc[0].includes('San Francisco') ? 'SF Office' : topLoc[0];
    suggestions.push({
      label: shortLoc,
      attribute: 'location',
      value: topLoc[0],
      icon: Icon.TYPES.LOCATION_PIN_OUTLINE,
      matchingIds: topLoc[1],
    });
  }

  // Full-time employees
  const fullTime = typeCounts.get('Full-time');
  if (fullTime && fullTime.length > 0) {
    suggestions.push({
      label: 'All Full-time employees',
      attribute: 'employmentType',
      value: 'Full-time',
      icon: Icon.TYPES.PEOPLE_OUTLINE,
      matchingIds: fullTime,
    });
  }

  // Hourly employees (smaller, more targeted)
  const hourly = typeCounts.get('Hourly');
  if (hourly && hourly.length > 0) {
    suggestions.push({
      label: 'All Hourly employees',
      attribute: 'employmentType',
      value: 'Hourly',
      icon: Icon.TYPES.TIME_OUTLINE,
      matchingIds: hourly,
    });
  }

  // Second-largest department
  const secondDept = [...deptCounts.entries()].sort((a, b) => b[1].length - a[1].length)[1];
  if (secondDept && secondDept[1].length >= 2) {
    suggestions.push({
      label: `Everyone in ${secondDept[0]}`,
      attribute: 'department',
      value: secondDept[0],
      icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE,
      matchingIds: secondDept[1],
    });
  }

  return suggestions;
}

const ORG_SUGGESTIONS = computeOrgSuggestions();

// ── Component ────────────────────────────────────────────────────────────────

const DirectionDEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction D</DirectionLabel>
          <DemoTitle>Empty-state Education</DemoTitle>
          <DemoSubtitle>
            Before you start typing names, the builder suggests groups based on
            your org data. Click a suggestion to include an entire team or
            group — it stays up to date automatically. Or start typing to
            search for people manually.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          renderEmptyState={({ onAcceptRule }) => (
            <SuggestionPillsContainer>
              <SuggestionPillsLabel>
                Quick start — include a whole team or group
              </SuggestionPillsLabel>
              <SuggestionPills>
                {ORG_SUGGESTIONS.map((s) => {
                  const rule: RuleItem = {
                    id: `${s.attribute}:${s.value}`,
                    label: s.label,
                    attribute: s.attribute,
                    value: s.value,
                    replacedIds: s.matchingIds,
                  };

                  return (
                    <SuggestionPill
                      key={`${s.attribute}:${s.value}`}
                      onClick={() => onAcceptRule(rule)}
                    >
                      <Icon type={s.icon} size={14} />
                      {s.label}
                    </SuggestionPill>
                  );
                })}
              </SuggestionPills>
            </SuggestionPillsContainer>
          )}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DirectionDEmptyState;
