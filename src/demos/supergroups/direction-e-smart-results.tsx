/**
 * Direction E: Search-Time Smart Results
 *
 * As users type in the search field, group-level matches (departments,
 * locations, employment types) appear above individual name results in
 * the dropdown. Users discover groups as a natural part of searching
 * for people — no prompts, no banners, no jargon.
 *
 * Tradeoffs: Zero Clippy risk (it's just search results). Highest
 * probability of organic discovery. But the group result doesn't
 * explicitly explain "stays up to date" — it looks like a shortcut,
 * not a conceptual shift.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import Input from '@rippling/pebble/Inputs';
import Avatar from '@rippling/pebble/Avatar';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import { EMPLOYEES, Employee, EMPLOYEE_MAP } from './mock-data';
import { searchGroups, GroupSearchResult } from './detection-utils';
import { RuleItem } from './GroupBuilderBase';
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
  SearchInputWrapper,
  DropdownList,
  DropdownItem,
  DropdownMeta,
  ChipArea,
  NameChip,
  ChipRemoveButton,
  BuilderFooter,
  MemberCount,
  fadeSlideIn,
} from './shared-styles';

// ── Group-specific dropdown styles ──────────────────────────────────────────

const GroupDropdownSection = styled.div`
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space100};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space100};
`;

const GroupDropdownLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GroupDropdownItem = styled.li`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  cursor: pointer;
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  transition: background-color ${DURATION.fast} ${EASING.easeOut};
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  }
`;

const GroupCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-left: auto;
  font-weight: 400;
`;

const PeopleDropdownLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// ── Helpers ──────────────────────────────────────────────────────────────────

function groupIcon(type: GroupSearchResult['icon']): string {
  switch (type) {
    case 'department':
      return Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE;
    case 'location':
      return Icon.TYPES.LOCATION_PIN_OUTLINE;
    case 'employmentType':
      return Icon.TYPES.PEOPLE_OUTLINE;
  }
}

// ── Component ────────────────────────────────────────────────────────────────

const DirectionESmartResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rules, setRules] = useState<RuleItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search results
  const groupResults = searchQuery.trim().length > 0
    ? searchGroups(searchQuery).slice(0, 3)
    : [];

  const personResults = searchQuery.trim().length > 0
    ? EMPLOYEES.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.department.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const hasResults = groupResults.length > 0 || personResults.length > 0;

  // Handlers
  const handleSelect = useCallback((employee: Employee) => {
    setSelectedIds((prev) => {
      if (prev.includes(employee.id)) return prev;
      return [...prev, employee.id];
    });
    setSearchQuery('');
    setIsDropdownOpen(false);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((eid) => eid !== id));
  }, []);

  const handleRemoveRule = useCallback((ruleId: string) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
  }, []);

  const handleAcceptGroup = useCallback((group: GroupSearchResult) => {
    const rule: RuleItem = {
      id: `${group.attribute}:${group.value}`,
      label: group.label.replace(/ \(\d+ people?\)$/, '').replace(/ \(\d+\)$/, ''),
      attribute: group.attribute,
      value: group.value,
      replacedIds: group.matchingIds,
    };
    setRules((prev) => [...prev, rule]);
    // Remove individuals already selected that this rule covers
    setSelectedIds((prev) => prev.filter((id) => !group.matchingIds.includes(id)));
    setSearchQuery('');
    setIsDropdownOpen(false);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setIsDropdownOpen(value.trim().length > 0);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.trim().length > 0) {
      setIsDropdownOpen(true);
    }
  }, [searchQuery]);

  const totalMembers =
    selectedIds.length +
    rules.reduce((sum, r) => sum + r.replacedIds.length, 0);

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink onClick={() => navigate('/')}>
          <Icon type={Icon.TYPES.ARROW_LEFT} size={14} />
          Back to Playground
        </BackLink>

        <DemoHeader>
          <DirectionLabel>Direction E</DirectionLabel>
          <DemoTitle>Search-Time Smart Results</DemoTitle>
          <DemoSubtitle>
            Start typing in the search field. Group-level matches (like
            "Engineering department") appear above individual results. Click a
            group to include the whole team — it stays up to date automatically.
          </DemoSubtitle>
        </DemoHeader>

        <BuilderCard>
          <BuilderLabel>Group members</BuilderLabel>

          <SearchInputWrapper ref={wrapperRef}>
            <Input.Text
              placeholder="Search people by name or department..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              size={Input.Text.SIZES.M}
            />

            {isDropdownOpen && hasResults && (
              <DropdownList>
                {/* Group-level results */}
                {groupResults.length > 0 && (
                  <GroupDropdownSection>
                    <GroupDropdownLabel>Teams & groups</GroupDropdownLabel>
                    {groupResults.map((group) => {
                      const alreadyAdded = rules.some(
                        (r) => r.id === `${group.attribute}:${group.value}`,
                      );
                      if (alreadyAdded) return null;
                      return (
                        <GroupDropdownItem
                          key={`${group.attribute}:${group.value}`}
                          onClick={() => handleAcceptGroup(group)}
                        >
                          <Icon type={groupIcon(group.icon)} size={16} />
                          {group.label.replace(/ \(\d+ people?\)$/, '').replace(/ \(\d+\)$/, '')}
                          <GroupCount>{group.count} people</GroupCount>
                        </GroupDropdownItem>
                      );
                    })}
                  </GroupDropdownSection>
                )}

                {/* Individual results */}
                {personResults.length > 0 && (
                  <>
                    {groupResults.length > 0 && (
                      <PeopleDropdownLabel>People</PeopleDropdownLabel>
                    )}
                    {personResults.map((emp) => {
                      const isAlreadySelected = selectedIds.includes(emp.id);
                      const isReplacedByRule = rules.some((r) =>
                        r.replacedIds.includes(emp.id),
                      );
                      const disabled = isAlreadySelected || isReplacedByRule;

                      return (
                        <DropdownItem
                          key={emp.id}
                          isDisabled={disabled}
                          onClick={() => !disabled && handleSelect(emp)}
                        >
                          <Avatar name={emp.name} size={Avatar.SIZES.XS} />
                          {emp.name}
                          <DropdownMeta>
                            {emp.department}
                          </DropdownMeta>
                        </DropdownItem>
                      );
                    })}
                  </>
                )}
              </DropdownList>
            )}
          </SearchInputWrapper>

          {/* Chips area */}
          <ChipArea>
            {rules.map((rule) => (
              <NameChip key={rule.id}>
                <Icon type={Icon.TYPES.FILTER_OUTLINE} size={14} />
                {rule.label}
                <ChipRemoveButton onClick={() => handleRemoveRule(rule.id)}>
                  <Icon type={Icon.TYPES.CLOSE} size={12} />
                </ChipRemoveButton>
              </NameChip>
            ))}
            {selectedIds.map((id) => {
              const emp = EMPLOYEE_MAP.get(id);
              if (!emp) return null;
              return (
                <NameChip key={id}>
                  <Avatar name={emp.name} size={Avatar.SIZES.XS} />
                  {emp.name}
                  <ChipRemoveButton onClick={() => handleRemove(id)}>
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

export default DirectionESmartResults;
