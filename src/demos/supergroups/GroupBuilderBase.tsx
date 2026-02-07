/**
 * GroupBuilderBase
 *
 * Reusable "Supergroups builder" component that simulates a people picker.
 * Each aha-moment direction wraps this and injects its own UI via render props.
 *
 * Features:
 *  - Text search to find people by name
 *  - Dropdown results
 *  - Chip area for selected people
 *  - Extensible via render props for suggestion UI, custom chips, and empty state
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@rippling/pebble/Icon';
import Input from '@rippling/pebble/Inputs';
import Avatar from '@rippling/pebble/Avatar';
import { EMPLOYEES, Employee, EMPLOYEE_MAP } from './mock-data';
import {
  SearchInputWrapper,
  DropdownList,
  DropdownItem,
  DropdownMeta,
  ChipArea,
  NameChip,
  ChipRemoveButton,
  BuilderCard,
  BuilderLabel,
  BuilderFooter,
  MemberCount,
} from './shared-styles';

// ── Types ────────────────────────────────────────────────────────────────────

export interface RuleItem {
  id: string;
  label: string;        // e.g. "Department: Engineering"
  attribute: string;
  value: string;
  /** IDs of people this rule replaced */
  replacedIds: string[];
}

export interface GroupBuilderBaseProps {
  /** Override how chips are rendered (for Direction C highlighting) */
  renderChip?: (employee: Employee, onRemove: () => void) => React.ReactNode;
  /** Render a suggestion area below the chips (Directions A, C) */
  renderSuggestion?: (props: {
    selectedIds: string[];
    rules: RuleItem[];
    onAcceptRule: (rule: RuleItem) => void;
    onDismissRule: (ruleId: string) => void;
  }) => React.ReactNode;
  /** Render something in place of the chip area when empty (Direction D) */
  renderEmptyState?: (props: {
    onAcceptRule: (rule: RuleItem) => void;
    onStartTyping: () => void;
  }) => React.ReactNode;
  /** Called whenever selection changes */
  onSelectionChange?: (selectedIds: string[], rules: RuleItem[]) => void;
  /** Render a footer area (for Direction B preview button) */
  renderFooter?: (props: {
    selectedIds: string[];
    rules: RuleItem[];
    onAcceptRule: (rule: RuleItem) => void;
  }) => React.ReactNode;
  /** Hide the search input (for Direction G progressive disclosure) */
  hideSearch?: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

const GroupBuilderBase: React.FC<GroupBuilderBaseProps> = ({
  renderChip,
  renderSuggestion,
  renderEmptyState,
  onSelectionChange,
  renderFooter,
  hideSearch = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Notify parent of selection changes
  useEffect(() => {
    onSelectionChange?.(selectedIds, rules);
  }, [selectedIds, rules, onSelectionChange]);

  // Filtered dropdown results
  const filteredResults =
    searchQuery.trim().length > 0
      ? EMPLOYEES.filter(
          (e) =>
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.department.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  // ── Handlers ─────────────────────────────────────────────────────────────

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

  const handleAcceptRule = useCallback((rule: RuleItem) => {
    setRules((prev) => [...prev, rule]);
    // Remove the individual people that the rule replaces
    setSelectedIds((prev) => prev.filter((id) => !rule.replacedIds.includes(id)));
  }, []);

  const handleDismissRule = useCallback((_ruleId: string) => {
    // no-op at base level — each direction handles dismissal via its own state
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

  // ── Derived state ────────────────────────────────────────────────────────

  const totalMembers =
    selectedIds.length +
    rules.reduce((sum, r) => sum + r.replacedIds.length, 0);

  const isEmpty = selectedIds.length === 0 && rules.length === 0;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <BuilderCard>
      <BuilderLabel>Group members</BuilderLabel>

      {/* Search (conditionally shown) */}
      {!hideSearch && (
        <SearchInputWrapper ref={wrapperRef}>
          <Input.Text
            placeholder="Search people by name or department..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            size={Input.Text.SIZES.M}
          />

          {isDropdownOpen && filteredResults.length > 0 && (
            <DropdownList>
              {filteredResults.map((emp) => {
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
            </DropdownList>
          )}
        </SearchInputWrapper>
      )}

      {/* Empty state (Direction D) */}
      {isEmpty && renderEmptyState ? (
        renderEmptyState({
          onAcceptRule: handleAcceptRule,
          onStartTyping: () => {},
        })
      ) : (
        <>
          {/* Chips area */}
          <ChipArea>
            {/* Rule chips */}
            {rules.map((rule) => (
              <NameChip
                key={rule.id}
                style={{
                  // use primary container styling for rule chips
                }}
              >
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

              if (renderChip) {
                return (
                  <React.Fragment key={id}>
                    {renderChip(emp, () => handleRemove(id))}
                  </React.Fragment>
                );
              }

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

          {/* Suggestion area (Directions A, C) */}
          {renderSuggestion?.({
            selectedIds,
            rules,
            onAcceptRule: handleAcceptRule,
            onDismissRule: handleDismissRule,
          })}
        </>
      )}

      {/* Footer */}
      {renderFooter ? (
        renderFooter({
          selectedIds,
          rules,
          onAcceptRule: handleAcceptRule,
        })
      ) : (
        <BuilderFooter>
          <MemberCount>
            {totalMembers === 0
              ? 'No members added'
              : `${totalMembers} member${totalMembers === 1 ? '' : 's'}`}
          </MemberCount>
        </BuilderFooter>
      )}
    </BuilderCard>
  );
};

export default GroupBuilderBase;
