/**
 * Shared Styled Components for Connection Status Prototype
 *
 * Reusable visual primitives: status dots, section containers, card layouts.
 * All values use Pebble theme tokens.
 */

import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import { ConnectionState } from './types';

/* ─── Status Dot with Pulse Animation ─── */

export const STATUS_COLORS: Record<ConnectionState, string> = {
  connected: 'colorSuccess',
  degraded: 'colorWarning',
  disconnected: 'colorError',
  'not-connected': 'colorOutlineVariant',
};

// Subtle pulse animation for connected state
const pulseAnimation = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.75;
    }
  }
`;

export const StatusDot = styled.span<{ state: ConnectionState }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme, state }) => (theme as StyledTheme)[STATUS_COLORS[state]]};
  flex-shrink: 0;
  position: relative;

  ${({ state }) => state === 'connected' && `
    ${pulseAnimation}
    animation: pulse 2000ms ease-in-out infinite;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** Smaller dot for tab indicators */
export const TabDot = styled.span<{ state: ConnectionState }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme, state }) => (theme as StyledTheme)[STATUS_COLORS[state]]};
  flex-shrink: 0;
  margin-left: 6px;
`;

/* ─── Section Containers ─── */

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

export const SectionHeader = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

export const SectionSubheader = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

/* ─── Card Styles with Subtle Elevation ─── */

export const CardContainer = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
  transition: box-shadow 250ms ease-out;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CardBody = styled.div`
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space800} ${t.space800}`;
  }};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

/* ─── Two-Column Layout for Overview ─── */

export const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  align-items: start;
`;

/* ─── Feature Card (matches Figma feature-card-list-spot-view) ─── */

export const FeatureCardRow = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: 28px;
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
  align-items: flex-start;
`;

export const SpotIllustration = styled.div`
  width: 160px;
  height: 117px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
`;

export const FeatureCardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

export const FeatureCardTitleText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

export const FeatureCardDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 19px;
`;

/* ─── Connection Card (Admin page, matches Figma) ─── */

export const ConnectionCardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

export const ConnectionCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space800};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

export const ConnectionCardFullWidth = styled(ConnectionCard)`
  grid-column: 1 / -1;
`;

export const MetadataRow = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
`;

export const MetadataLabel = styled.span`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  min-width: 120px;
  flex-shrink: 0;
`;

export const MetadataValue = styled.span`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

/* ─── Admin Sidebar ─── */

export const AdminLayout = styled.div`
  display: flex;
  gap: 0;
  min-height: 500px;
`;

export const AdminSidebar = styled.nav`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

export const AdminSidebarItem = styled.button<{ isActive?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme, isActive }) =>
    isActive
      ? (theme as StyledTheme).colorOnSurface
      : (theme as StyledTheme).colorOnSurfaceVariant};
  font-weight: ${({ isActive }) => (isActive ? 535 : 430)};
  background: none;
  border: none;
  text-align: left;
  padding: ${({ theme }) => {
    const t = theme as StyledTheme;
    return `${t.space200} ${t.space400}`;
  }};
  cursor: pointer;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

export const AdminContent = styled.div`
  flex: 1;
  padding-left: ${({ theme }) => (theme as StyledTheme).space800};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

/* ─── Inline Alert (for feature tabs) ─── */

export const AlertContainer = styled.div<{ severity: 'warning' | 'error' }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme, severity }) =>
    severity === 'error'
      ? (theme as StyledTheme).colorErrorContainer
      : (theme as StyledTheme).colorWarningContainer};
`;

export const AlertText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AlertTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

export const AlertDescription = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

/* ─── Divider ─── */

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin: 0;
`;

/* ─── Action Link Row with Enhanced Interactions ─── */

export const ActionLinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  min-width: 240px;
`;

export const ActionLinkItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  text-align: left;
  transition: all 200ms ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
    transform: translateX(2px);

    /* Icon scale on hover */
    svg {
      transform: scale(1.08);
    }
  }

  &:active {
    transform: translateX(2px) scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => (theme as StyledTheme).colorPrimary};
    outline-offset: 2px;
  }

  /* Smooth icon transitions */
  svg {
    transition: transform 200ms ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0ms;
    transform: none !important;

    svg {
      transform: none !important;
    }
  }
`;

export const ActionLinkText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ActionLinkLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  transition: color 150ms ease-out;
`;

export const ActionLinkSubtitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;
