/**
 * Direction H: Unified Smart Input
 *
 * A single intelligent input field that handles both natural language
 * queries and specific name searches. As you type, the system shows
 * both AI-generated rules and matching individuals in a unified dropdown.
 *
 * Tradeoffs: Most streamlined UX - no mode switching. But requires
 * smart intent detection and unified result presentation.
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Icon from '@rippling/pebble/Icon';
import Avatar from '@rippling/pebble/Avatar';
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
  BuilderCard,
  BuilderLabel,
  ChipArea,
  NameChip,
  ChipRemoveButton,
  BuilderFooter,
  MemberCount,
  fadeSlideIn,
} from './shared-styles';
import { RuleItem } from './GroupBuilderBase';
import { EMPLOYEES, Employee, EMPLOYEE_MAP } from './mock-data';

// ── Styled components ───────────────────────────────────────────────────────

const UnifiedInputWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const UnifiedInput = styled.input`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space500} ${({ theme }) => (theme as StyledTheme).space500};
  border: 2px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-family: inherit;
  outline: none;
  transition: all ${DURATION.standard} ${EASING.easeOut};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &::placeholder {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
                0 0 0 3px ${({ theme }) => (theme as StyledTheme).colorPrimary}15;
  }
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => (theme as StyledTheme).space200});
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  max-height: 400px;
  overflow-y: auto;
  animation: ${fadeSlideIn} ${DURATION.fast} ${EASING.easeOut};
`;

const ResultsSection = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space300} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  }
`;

const ResultsSectionLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
`;

const ResultItem = styled.button<{ isDisabled?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: none;
  border: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  text-align: left;
  transition: background-color ${DURATION.fast} ${EASING.easeOut};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const ResultMeta = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-left: auto;
`;

const EmptyResults = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space600} ${({ theme }) => (theme as StyledTheme).space400};
  text-align: center;
`;

const QuickStartsContainer = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space400};
`;

const QuickStartItem = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  text-align: left;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  transition: background-color ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

// ── Keyword matching (simulated AI) ─────────────────────────────────────────

interface ParsedIntent {
  rules: RuleItem[];
}

function parseNaturalLanguage(text: string): ParsedIntent {
  const q = text.toLowerCase();
  const rules: RuleItem[] = [];

  // Build attribute maps
  const deptMap = new Map<string, string[]>();
  const locMap = new Map<string, string[]>();
  const typeMap = new Map<string, string[]>();

  for (const emp of EMPLOYEES) {
    if (!deptMap.has(emp.department)) deptMap.set(emp.department, []);
    deptMap.get(emp.department)!.push(emp.id);
    if (!locMap.has(emp.location)) locMap.set(emp.location, []);
    locMap.get(emp.location)!.push(emp.id);
    if (!typeMap.has(emp.employmentType)) typeMap.set(emp.employmentType, []);
    typeMap.get(emp.employmentType)!.push(emp.id);
  }

  // Match departments
  for (const [dept, ids] of deptMap) {
    if (dept.toLowerCase().includes(q)) {
      rules.push({
        id: `department:${dept}`,
        label: `Everyone in ${dept}`,
        attribute: 'department',
        value: dept,
        replacedIds: ids,
      });
    }
  }

  // Match locations (with common abbreviations)
  const locAliases: Record<string, string[]> = {
    'San Francisco, CA': ['san francisco', 'sf', 'bay area'],
    'New York, NY': ['new york', 'nyc', 'ny'],
    'Austin, TX': ['austin', 'texas', 'tx'],
    'Denver, CO': ['denver', 'colorado'],
    'Boston, MA': ['boston', 'massachusetts'],
    'Portland, OR': ['portland', 'oregon'],
    'Seattle, WA': ['seattle', 'washington'],
    'Chicago, IL': ['chicago', 'illinois'],
  };
  for (const [loc, ids] of locMap) {
    const aliases = locAliases[loc] || [loc.toLowerCase()];
    if (aliases.some((a) => a.includes(q) || q.includes(a))) {
      rules.push({
        id: `location:${loc}`,
        label: loc,
        attribute: 'location',
        value: loc,
        replacedIds: ids,
      });
    }
  }

  // Match employment types
  const typeAliases: Record<string, string[]> = {
    'Full-time': ['full-time', 'full time', 'fte', 'salaried'],
    'Part-time': ['part-time', 'part time'],
    'Hourly': ['hourly', 'hourly workers'],
    'Contractor': ['contractor', 'contractors', 'contract'],
  };
  for (const [type, ids] of typeMap) {
    const aliases = typeAliases[type] || [type.toLowerCase()];
    if (aliases.some((a) => a.includes(q) || q.includes(a))) {
      rules.push({
        id: `employmentType:${type}`,
        label: `All ${type} employees`,
        attribute: 'employmentType',
        value: type,
        replacedIds: ids,
      });
    }
  }

  return { rules };
}

// ── Quick-start suggestions ─────────────────────────────────────────────────

const QUICK_SUGGESTIONS = [
  { text: 'Everyone in Engineering', query: 'engineering' },
  { text: 'SF Office', query: 'san francisco' },
  { text: 'All Full-time employees', query: 'full-time' },
  { text: 'All Hourly employees', query: 'hourly' },
];

// ── Component ────────────────────────────────────────────────────────────────

const DirectionHUnifiedInput: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rules, setRules] = useState<RuleItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter employees by name
  const matchingEmployees =
    query.trim().length > 0
      ? EMPLOYEES.filter(
          (e) =>
            e.name.toLowerCase().includes(query.toLowerCase()) ||
            e.department.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 5)
      : [];

  // Get AI rule suggestions
  const matchingRules = query.trim().length > 2 ? parseNaturalLanguage(query).rules : [];

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleAddRule = useCallback((rule: RuleItem) => {
    setRules((prev) => {
      if (prev.some((r) => r.id === rule.id)) return prev;
      return [...prev, rule];
    });
    setSelectedIds((prev) => prev.filter((id) => !rule.replacedIds.includes(id)));
    setQuery('');
    setIsDropdownOpen(false);
  }, []);

  const handleAddEmployee = useCallback((employee: Employee) => {
    setSelectedIds((prev) => {
      if (prev.includes(employee.id)) return prev;
      return [...prev, employee.id];
    });
    setQuery('');
    setIsDropdownOpen(false);
  }, []);

  const handleRemoveEmployee = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((eid) => eid !== id));
  }, []);

  const handleRemoveRule = useCallback((ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
  }, []);

  const handleQuickStart = useCallback((quickQuery: string) => {
    const result = parseNaturalLanguage(quickQuery);
    if (result.rules.length > 0) {
      for (const rule of result.rules) {
        handleAddRule(rule);
      }
    }
    setIsDropdownOpen(false);
  }, [handleAddRule]);

  // ── Derived state ────────────────────────────────────────────────────────

  const totalMembers =
    selectedIds.length +
    rules.reduce((sum, r) => sum + r.replacedIds.length, 0);

  const hasResults = matchingRules.length > 0 || matchingEmployees.length > 0;
  const showQuickStarts = isDropdownOpen && query.trim().length === 0;
  const showResults = isDropdownOpen && query.trim().length > 0;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction H</DirectionLabel>
          <DemoTitle>Unified Smart Input</DemoTitle>
          <DemoSubtitle>
            One input for everything. Type naturally to find groups (try "engineering"
            or "full-time in SF") or search for specific people by name. The system
            figures out what you mean and shows both options.
          </DemoSubtitle>
        </DemoHeader>

        <BuilderCard>
          <BuilderLabel>Group members</BuilderLabel>

          <UnifiedInputWrapper ref={wrapperRef}>
            <UnifiedInput
              placeholder="Type a description or search for people..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
            />

            {showQuickStarts && (
              <ResultsDropdown>
                <ResultsSectionLabel>Quick starts</ResultsSectionLabel>
                <QuickStartsContainer>
                  {QUICK_SUGGESTIONS.map((s) => (
                    <QuickStartItem
                      key={s.query}
                      onClick={() => handleQuickStart(s.query)}
                    >
                      <Icon type={Icon.TYPES.STAR_OUTLINE} size={16} />
                      {s.text}
                    </QuickStartItem>
                  ))}
                </QuickStartsContainer>
              </ResultsDropdown>
            )}

            {showResults && (
              <ResultsDropdown>
                {hasResults ? (
                  <>
                    {matchingRules.length > 0 && (
                      <ResultsSection>
                        <ResultsSectionLabel>Suggested groups</ResultsSectionLabel>
                        {matchingRules.map((rule) => {
                          const isAlreadyAdded = rules.some((r) => r.id === rule.id);
                          return (
                            <ResultItem
                              key={rule.id}
                              isDisabled={isAlreadyAdded}
                              onClick={() => !isAlreadyAdded && handleAddRule(rule)}
                            >
                              <Icon type={Icon.TYPES.FILTER_OUTLINE} size={16} />
                              {rule.label}
                              <ResultMeta>{rule.replacedIds.length} people</ResultMeta>
                            </ResultItem>
                          );
                        })}
                      </ResultsSection>
                    )}

                    {matchingEmployees.length > 0 && (
                      <ResultsSection>
                        <ResultsSectionLabel>Individuals</ResultsSectionLabel>
                        {matchingEmployees.map((emp) => {
                          const isAlreadySelected = selectedIds.includes(emp.id);
                          const isReplacedByRule = rules.some((r) =>
                            r.replacedIds.includes(emp.id),
                          );
                          const disabled = isAlreadySelected || isReplacedByRule;

                          return (
                            <ResultItem
                              key={emp.id}
                              isDisabled={disabled}
                              onClick={() => !disabled && handleAddEmployee(emp)}
                            >
                              <Avatar name={emp.name} size={Avatar.SIZES.XS} />
                              {emp.name}
                              <ResultMeta>{emp.department}</ResultMeta>
                            </ResultItem>
                          );
                        })}
                      </ResultsSection>
                    )}
                  </>
                ) : (
                  <EmptyResults>
                    No matches found. Try "engineering" or a person's name.
                  </EmptyResults>
                )}
              </ResultsDropdown>
            )}
          </UnifiedInputWrapper>

          <ChipArea>
            {/* Rule chips */}
            {rules.map((rule) => (
              <NameChip key={rule.id}>
                <Icon type={Icon.TYPES.FILTER_OUTLINE} size={14} />
                {rule.label}
                <ChipRemoveButton onClick={() => handleRemoveRule(rule.id)}>
                  <Icon type={Icon.TYPES.CLOSE} size={12} />
                </ChipRemoveButton>
              </NameChip>
            ))}

            {/* People chips */}
            {selectedIds.map((id) => {
              const emp = EMPLOYEE_MAP.get(id);
              if (!emp) return null;

              return (
                <NameChip key={id}>
                  <Avatar name={emp.name} size={Avatar.SIZES.XS} />
                  {emp.name}
                  <ChipRemoveButton onClick={() => handleRemoveEmployee(id)}>
                    <Icon type={Icon.TYPES.CLOSE} size={12} />
                  </ChipRemoveButton>
                </NameChip>
              );
            })}
          </ChipArea>

          <BuilderFooter>
            <MemberCount>
              {totalMembers === 0
                ? 'No members added'
                : `${totalMembers} member${totalMembers === 1 ? '' : 's'}`}
            </MemberCount>
          </BuilderFooter>
        </BuilderCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DirectionHUnifiedInput;
