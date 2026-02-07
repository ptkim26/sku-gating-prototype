/**
 * Shared styled components for Supergroups Aha Moment prototypes.
 *
 * Provides the common page layout, builder chrome, chip styles,
 * rule-chip styles, and suggestion containers used across all four
 * direction demos.
 */

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { StyledTheme } from '@/utils/theme';
import { DURATION, EASING } from '@/utils/animation-constants';

// ── Animations ───────────────────────────────────────────────────────────────

export const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

export const chipPop = keyframes`
  0%   { transform: scale(0.85); opacity: 0; }
  60%  { transform: scale(1.04); }
  100% { transform: scale(1); opacity: 1; }
`;

// ── Page-level layout ────────────────────────────────────────────────────────

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => (theme as StyledTheme).space1600} ${({ theme }) => (theme as StyledTheme).space800};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 720px;
`;

export const DemoHeader = styled.div`
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space800};
`;

export const DemoTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

export const DemoSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

export const DirectionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  display: block;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

// ── Builder chrome ───────────────────────────────────────────────────────────

export const BuilderCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
`;

export const BuilderLabel = styled.label`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: block;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

export const SearchInputWrapper = styled.div`
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
  position: relative;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  margin: ${({ theme }) => (theme as StyledTheme).space100} 0 0 0;
  padding: ${({ theme }) => (theme as StyledTheme).space100} 0;
  list-style: none;
  max-height: 240px;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: ${fadeSlideIn} ${DURATION.fast} ${EASING.easeOut};
`;

export const DropdownItem = styled.li<{ isDisabled?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  transition: background-color ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    background-color: ${({ theme, isDisabled }) =>
      isDisabled ? 'transparent' : (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

export const DropdownMeta = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-left: auto;
`;

// ── Chip area ────────────────────────────────────────────────────────────────

export const ChipArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  min-height: 36px;
`;

export const NameChip = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: ${({ theme }) => (theme as StyledTheme).space100} ${({ theme }) => (theme as StyledTheme).space300};
  animation: ${chipPop} ${DURATION.standard} ${EASING.easeOut};
`;

export const ChipRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  width: 16px;
  height: 16px;
  transition: color ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  }
`;

export const RuleChip = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimaryContainer};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: ${({ theme }) => (theme as StyledTheme).space100} ${({ theme }) => (theme as StyledTheme).space300};
  animation: ${chipPop} ${DURATION.standard} ${EASING.easeOut};
`;

// ── Suggestion containers ────────────────────────────────────────────────────

export const SuggestionBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutline};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  margin-top: ${({ theme }) => (theme as StyledTheme).space400};
  animation: ${fadeSlideIn} ${DURATION.standard} ${EASING.easeOut};
  cursor: pointer;
  transition: background-color ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

export const SuggestionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  white-space: nowrap;
  letter-spacing: 0.5px;
`;

export const SuggestionText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  flex: 1;
`;

export const SuggestionActions = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  flex-shrink: 0;
`;

// ── Rule preview chip (compact inline chip in suggestion bar) ────────────

export const RulePreviewChip = styled.span`
  display: inline-flex;
  align-items: center;
  height: 20px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  overflow: hidden;
  flex-shrink: 0;
`;

export const RulePreviewSegment = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  padding: 0 ${({ theme }) => (theme as StyledTheme).space200};
  white-space: nowrap;
  line-height: 18px;
`;

export const RulePreviewSeparator = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  opacity: 0.8;
  padding: 0 ${({ theme }) => (theme as StyledTheme).space200};
  border-left: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  height: 100%;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

export const RulePreviewClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-left: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  cursor: pointer;
  padding: 0 ${({ theme }) => (theme as StyledTheme).space100};
  height: 100%;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  transition: color ${DURATION.fast} ${EASING.easeOut},
    background-color ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

// ── Empty state & instruction text ───────────────────────────────────────────

export const EmptyStateText = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-align: center;
  padding: ${({ theme }) => (theme as StyledTheme).space600} 0;
  margin: 0;
`;

export const BackLink = styled.a`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};

  &:hover {
    text-decoration: underline;
  }
`;

// ── Preview panel (for Direction B) ──────────────────────────────────────────

export const PreviewPanel = styled.div`
  margin-top: ${({ theme }) => (theme as StyledTheme).space600};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  animation: ${fadeSlideIn} ${DURATION.standard} ${EASING.easeOut};
`;

export const PreviewTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

export const PreviewMemberRow = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;

  & + & {
    border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  }
`;

export const PreviewMemberMeta = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-left: auto;
`;

// ── Highlighted chip variant (Direction C) ───────────────────────────────────

export const HighlightedChip = styled.span<{ isHighlighted: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background-color: ${({ theme, isHighlighted }) =>
    isHighlighted
      ? (theme as StyledTheme).colorPrimaryContainer
      : (theme as StyledTheme).colorSurfaceContainerHigh};
  color: ${({ theme, isHighlighted }) =>
    isHighlighted
      ? (theme as StyledTheme).colorOnPrimaryContainer
      : (theme as StyledTheme).colorOnSurface};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: ${({ theme }) => (theme as StyledTheme).space100} ${({ theme }) => (theme as StyledTheme).space300};
  animation: ${chipPop} ${DURATION.standard} ${EASING.easeOut};
  transition: background-color ${DURATION.standard} ${EASING.easeOut},
    color ${DURATION.standard} ${EASING.easeOut};
`;

export const ChipBadge = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHighest};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: 0 ${({ theme }) => (theme as StyledTheme).space200};
  line-height: 1.6;
`;

export const ClusterSummary = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-top: ${({ theme }) => (theme as StyledTheme).space300};
  animation: ${fadeSlideIn} ${DURATION.standard} ${EASING.easeOut};
`;

// ── Empty-state suggestion pills (Direction D) ──────────────────────────────

export const SuggestionPillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space600} 0;
`;

export const SuggestionPillsLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

export const SuggestionPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

export const SuggestionPill = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  background-color: transparent;
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  cursor: pointer;
  transition: all ${DURATION.fast} ${EASING.easeOut};

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

// ── Footer / summary bar ─────────────────────────────────────────────────────

export const BuilderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => (theme as StyledTheme).space400};
  padding-top: ${({ theme }) => (theme as StyledTheme).space400};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

export const MemberCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;
