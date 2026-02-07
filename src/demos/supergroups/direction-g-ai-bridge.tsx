/**
 * Direction G: AI Bridge
 *
 * In the empty state, a natural-language prompt invites users to
 * describe who they want to include. On submit, the system simulates
 * AI processing (keyword matching against mock data) and adds
 * appropriate rule chips.
 *
 * Tradeoffs: Leverages existing AI investment. Reframes interaction
 * from "build rules" to "describe your intent." But introduces a
 * mode switch (direct manipulation → natural language) that may have
 * cognitive cost.
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Icon from '@rippling/pebble/Icon';
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
  SuggestionPills,
  SuggestionPill,
  fadeSlideIn,
} from './shared-styles';
import GroupBuilderBase, { RuleItem } from './GroupBuilderBase';
import { EMPLOYEES } from './mock-data';

// ── Styled components ───────────────────────────────────────────────────────

const AiBridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding: ${({ theme }) => (theme as StyledTheme).space600} 0;
`;

const AiInputWrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 2px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  transition: all ${DURATION.standard} ${EASING.easeOut};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:focus-within {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
                0 0 0 3px ${({ theme }) => (theme as StyledTheme).colorPrimary}15;
  }
`;

const AiTextArea = styled.textarea`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space500} ${({ theme }) => (theme as StyledTheme).space500};
  padding-right: 120px;
  border: none;
  background: transparent;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  resize: none;
  min-height: 56px;
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
    opacity: 0.7;
  }
`;

const AiSubmitButton = styled.button<{ disabled: boolean }>`
  position: absolute;
  right: ${({ theme }) => (theme as StyledTheme).space300};
  top: 50%;
  transform: translateY(-50%);
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space500};
  background-color: ${({ theme, disabled }) =>
    disabled ? (theme as StyledTheme).colorSurfaceContainerHigh : (theme as StyledTheme).colorPrimary};
  color: ${({ theme, disabled }) =>
    disabled ? (theme as StyledTheme).colorOnSurfaceVariant : (theme as StyledTheme).colorOnPrimary};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all ${DURATION.fast} ${EASING.easeOut};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    filter: brightness(1.1);
    transform: translateY(-50%) scale(1.02);
  }

  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.98);
  }
`;

const SuggestionsLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => (theme as StyledTheme).space200});
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  animation: ${fadeSlideIn} ${DURATION.fast} ${EASING.easeOut};
`;

const SuggestionsDropdownLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const AiInputContainer = styled.div`
  position: relative;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.95); }
`;

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space800} 0;
  justify-content: center;

  & > svg {
    animation: ${pulse} 2s ease-in-out infinite;
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const LoadingText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const LoadingSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
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
    if (q.includes(dept.toLowerCase())) {
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
    if (aliases.some((a) => q.includes(a))) {
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
    if (aliases.some((a) => q.includes(a))) {
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

// ── Quick-start suggestions (reused from Direction D style) ─────────────────

const QUICK_SUGGESTIONS = [
  { text: 'Everyone in Engineering', query: 'engineering' },
  { text: 'SF Office', query: 'san francisco' },
  { text: 'All Full-time employees', query: 'full-time' },
  { text: 'All Hourly employees', query: 'hourly' },
];

// ── Component ────────────────────────────────────────────────────────────────

const DirectionGAiBridge: React.FC = () => {
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasAddedItems, setHasAddedItems] = useState(false);

  const processInput = useCallback(
    (text: string, onAcceptRule: (rule: RuleItem) => void) => {
      if (!text.trim()) return;

      setIsProcessing(true);
      setShowSuggestions(false);

      // Simulate AI processing delay
      setTimeout(() => {
        const result = parseNaturalLanguage(text);
        if (result.rules.length > 0) {
          for (const rule of result.rules) {
            onAcceptRule(rule);
          }
          setHasAddedItems(true);
        }
        setIsProcessing(false);
        setAiInput('');
      }, 1200);
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
          <DirectionLabel>Direction G</DirectionLabel>
          <DemoTitle>AI Bridge (Progressive Disclosure)</DemoTitle>
          <DemoSubtitle>
            Start by describing who you want in plain language. Focus the input
            to see quick suggestions, or just start typing your own description.
            After adding your first group, you'll be able to search for
            individual people too.
          </DemoSubtitle>
        </DemoHeader>

        <GroupBuilderBase
          hideSearch={!hasAddedItems}
          onSelectionChange={(selectedIds, rules) => {
            if (selectedIds.length > 0 || rules.length > 0) {
              setHasAddedItems(true);
            }
          }}
          renderEmptyState={({ onAcceptRule }) => {
            if (isProcessing) {
              return (
                <LoadingIndicator>
                  <Icon type={Icon.TYPES.STAR_OUTLINE} size={24} />
                  <LoadingText>Finding the right people...</LoadingText>
                  <LoadingSubtext>Analyzing your request</LoadingSubtext>
                </LoadingIndicator>
              );
            }

            return (
              <AiBridgeContainer>
                <AiInputContainer>
                  <AiInputWrapper>
                    <AiTextArea
                      placeholder="Describe who to include – e.g., 'full-time employees in California' or 'engineering team'"
                      value={aiInput}
                      onChange={(e) => {
                        setAiInput(e.target.value);
                        setShowSuggestions(false);
                      }}
                      onFocus={() => {
                        if (!aiInput.trim()) {
                          setShowSuggestions(true);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          processInput(aiInput, onAcceptRule);
                        }
                      }}
                      rows={1}
                    />
                    <AiSubmitButton
                      disabled={!aiInput.trim()}
                      onClick={() => processInput(aiInput, onAcceptRule)}
                    >
                      <Icon type={Icon.TYPES.ARROW_RIGHT} size={14} />
                      Go
                    </AiSubmitButton>
                  </AiInputWrapper>

                  {showSuggestions && !aiInput.trim() && (
                    <SuggestionsDropdown>
                      <SuggestionsDropdownLabel>Try these</SuggestionsDropdownLabel>
                      <SuggestionPills>
                        {QUICK_SUGGESTIONS.map((s) => (
                          <SuggestionPill
                            key={s.query}
                            onClick={() => {
                              setAiInput(s.text);
                              processInput(s.query, onAcceptRule);
                            }}
                          >
                            <Icon type={Icon.TYPES.STAR_OUTLINE} size={12} />
                            {s.text}
                          </SuggestionPill>
                        ))}
                      </SuggestionPills>
                    </SuggestionsDropdown>
                  )}
                </AiInputContainer>
              </AiBridgeContainer>
            );
          }}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default DirectionGAiBridge;
