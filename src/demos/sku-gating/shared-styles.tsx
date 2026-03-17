/**
 * SKU Gating Demo — Shared styled components
 *
 * Visual language: Linear/Stripe — neutral, restrained, generous whitespace.
 * No blurple. Monochrome base with one warm accent for CTAs.
 */

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

/* ─── Design tokens ─── */

const ACCENT = '#1a1a1a';
const ACCENT_HOVER = '#333';
const ACCENT_SUBTLE = '#f7f7f5';
const BORDER = '#e8e8e6';
const BORDER_HOVER = '#d0d0ce';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SECONDARY = '#6b6b6b';
const TEXT_TERTIARY = '#999';
const SURFACE = '#ffffff';
const SURFACE_RAISED = '#fafaf9';
const SURFACE_INSET = '#f5f5f3';
const SHADOW_SM = '0 1px 2px rgba(0,0,0,0.04)';
const SHADOW_LG = '0 8px 30px rgba(0,0,0,0.08)';
const SHADOW_XL = '0 16px 48px rgba(0,0,0,0.10)';
const RADIUS_MD = '8px';
const RADIUS_LG = '12px';
const RADIUS_XL = '16px';
const FOCUS_RING = `0 0 0 2px ${SURFACE}, 0 0 0 4px ${ACCENT}`;

/* Severity palette — muted, not garish */
const SEVERITY = {
  info: { bg: '#f0f4ff', border: '#d4ddf7', icon: '#5a6fa0', text: '#3d4f7c' },
  warning: { bg: '#fef9f0', border: '#f0ddb8', icon: '#9c7a3c', text: '#7a5f2e' },
  error: { bg: '#fdf2f2', border: '#f0c9c9', icon: '#b04040', text: '#8c3030' },
};

/* ─── Animations ─── */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInSoft = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ─── Shared focus mixin ─── */
const focusVisible = css`
  &:focus-visible {
    outline: none;
    box-shadow: ${FOCUS_RING};
  }
`;

/* ─── Page layout ─── */

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${SURFACE};
`;

export const ContentArea = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 56px 40px 120px;
  animation: ${fadeInSoft} 300ms ease;

  @media (max-width: 768px) {
    padding: 32px 20px 80px;
  }
`;

/* ─── Breadcrumb ─── */

export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.01em;
  color: ${TEXT_TERTIARY};
  margin-bottom: 40px;

  a {
    color: ${TEXT_TERTIARY};
    text-decoration: none;
    transition: color 150ms ease;
    border-radius: 3px;
    padding: 1px 2px;
    ${focusVisible}
    &:hover { color: ${TEXT_SECONDARY}; }
  }

  span {
    color: ${BORDER};
    user-select: none;
  }

  strong {
    color: ${TEXT_SECONDARY};
    font-weight: 500;
  }
`;

/* ─── Listing header ─── */

export const ListingHeader = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
  margin-bottom: 48px;
  animation: ${fadeIn} 350ms ease both;
  animation-delay: 50ms;
`;

export const AppIconContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: ${RADIUS_LG};
  background-color: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  flex-shrink: 0;
  overflow: visible;
`;

export const RipplingChoiceBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${ACCENT};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px ${SURFACE};

  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const ListingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const AppNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const AppName = styled.h1`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${TEXT_PRIMARY};
  margin: 0;
  line-height: 1.2;
`;

export const GateTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
  background: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  padding: 3px 8px;
  border-radius: 4px;
`;

export const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${TEXT_TERTIARY};
  letter-spacing: 0.01em;

  .stars {
    color: ${TEXT_PRIMARY};
    letter-spacing: 1px;
  }
`;

export const AppUrl = styled.a`
  font-size: 13px;
  color: ${TEXT_TERTIARY};
  text-decoration: none;
  transition: color 150ms ease;
  border-radius: 3px;
  ${focusVisible}
  &:hover { color: ${TEXT_SECONDARY}; }
`;

export const AppDescription = styled.p`
  font-size: 15px;
  line-height: 1.65;
  color: ${TEXT_SECONDARY};
  margin: 8px 0 0;
  max-width: 560px;
`;

/* ─── Install button area ─── */

export const InstallArea = styled.div`
  flex-shrink: 0;
  align-self: flex-start;
  padding-top: 4px;
`;

export const InstallButton = styled.button<{ isDisabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  border-radius: ${RADIUS_MD};
  transition: all 150ms ease;
  white-space: nowrap;
  ${focusVisible}

  ${({ isDisabled }) => isDisabled ? css`
    background: ${SURFACE};
    color: ${TEXT_TERTIARY};
    border: 1px solid ${BORDER};
    cursor: default;
  ` : css`
    background: ${ACCENT};
    color: #fff;
    border: 1px solid ${ACCENT};
    cursor: pointer;
    &:hover {
      background: ${ACCENT_HOVER};
    }
  `}
`;

/* ─── Requirement banner ─── */

export const RequirementBanner = styled.div<{ severity: 'info' | 'warning' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: ${RADIUS_LG};
  margin-bottom: 40px;
  transition: all 180ms ease;
  border: 1px solid ${({ severity }) => SEVERITY[severity].border};
  background: ${({ severity }) => SEVERITY[severity].bg};
  animation: ${fadeIn} 300ms ease both;
`;

export const BannerIconWrap = styled.div<{ severity: 'info' | 'warning' | 'error' }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${SURFACE};
  border: 1px solid ${({ severity }) => SEVERITY[severity].border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ severity }) => SEVERITY[severity].icon};
`;

export const BannerContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const BannerTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2px;
`;

export const BannerSubtitle = styled.div`
  font-size: 13px;
  color: ${TEXT_SECONDARY};
  line-height: 1.4;
`;

export const BannerAction = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${TEXT_SECONDARY};
  white-space: nowrap;
  flex-shrink: 0;
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  transition: color 150ms ease;

  ${RequirementBanner}:hover & {
    color: ${TEXT_PRIMARY};
  }
`;

/* ─── Capabilities section ─── */

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
  margin: 0 0 20px 0;
`;

export const CapabilityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0;
`;

export const CapabilityItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${TEXT_PRIMARY};
  padding: 12px 0;
  border-bottom: 1px solid ${BORDER};

  &:last-child {
    border-bottom: none;
  }

  svg, .cap-icon {
    flex-shrink: 0;
    color: ${TEXT_TERTIARY};
  }
`;

/* ─── Divider ─── */

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${BORDER};
  margin: 48px 0;
`;

/* ─── Gate modal ─── */

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalIntro = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const ModalIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${RADIUS_MD};
  background: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 20px;
`;

export const ModalIntroText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: ${TEXT_SECONDARY};
`;

export const PricingCard = styled.div<{ isSelected?: boolean; isRecommended?: boolean }>`
  position: relative;
  border: 1.5px solid ${({ isSelected }) => isSelected ? ACCENT : BORDER};
  border-radius: ${RADIUS_LG};
  padding: 20px;
  cursor: pointer;
  transition: all 150ms ease;
  background: ${({ isSelected }) => isSelected ? ACCENT_SUBTLE : SURFACE};
  ${focusVisible}

  &:hover {
    border-color: ${({ isSelected }) => isSelected ? ACCENT : BORDER_HOVER};
    box-shadow: ${SHADOW_SM};
  }
`;

export const RecommendedBadge = styled.div`
  position: absolute;
  top: -9px;
  left: 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${ACCENT};
  color: #fff;
  padding: 2px 10px;
  border-radius: 4px;
`;

export const PricingHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const PricingLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
`;

export const PricingAmount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const PriceValue = styled.span`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${TEXT_PRIMARY};
`;

export const PriceUnit = styled.span`
  font-size: 12px;
  color: ${TEXT_TERTIARY};
`;

export const PricingDescription = styled.div`
  font-size: 13px;
  color: ${TEXT_SECONDARY};
  line-height: 1.5;
`;

export const BreakevenHint = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  border-radius: ${RADIUS_MD};
  font-size: 13px;
  color: ${TEXT_SECONDARY};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 4px;
`;

export const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${RADIUS_MD};
  cursor: pointer;
  transition: all 150ms ease;
  ${focusVisible}

  ${({ variant }) => variant === 'primary' ? css`
    background: ${ACCENT};
    color: #fff;
    border: 1px solid ${ACCENT};
    &:hover { background: ${ACCENT_HOVER}; }
  ` : css`
    background: ${SURFACE};
    color: ${TEXT_PRIMARY};
    border: 1px solid ${BORDER};
    &:hover { border-color: ${BORDER_HOVER}; }
  `}
`;

/* ─── Single-path modal ─── */

export const SinglePathContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SinglePathMessage = styled.div`
  font-size: 15px;
  line-height: 1.65;
  color: ${TEXT_SECONDARY};

  strong {
    color: ${TEXT_PRIMARY};
    font-weight: 500;
  }
`;

/* ─── HUD — Scenario switcher (floating panel) ─── */

export const HudPanel = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 320px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  background: ${SURFACE};
  border: 1px solid ${BORDER};
  border-radius: ${RADIUS_XL};
  box-shadow: ${SHADOW_XL};
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeIn} 250ms ease;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 2px; }
`;

export const HudHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HudTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
`;

export const HudCloseButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: ${TEXT_TERTIARY};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  ${focusVisible}

  &:hover {
    background: ${SURFACE_INSET};
    color: ${TEXT_PRIMARY};
  }
`;

export const HudSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const HudLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
  margin-bottom: 2px;
`;

export const HudDescription = styled.div`
  font-size: 13px;
  color: ${TEXT_TERTIARY};
  line-height: 1.5;
`;

export const ScenarioButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border: 1px solid ${({ isActive }) => isActive ? ACCENT : BORDER};
  border-radius: ${RADIUS_MD};
  background: ${({ isActive }) => isActive ? ACCENT_SUBTLE : SURFACE};
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 150ms ease;
  ${focusVisible}

  &:hover {
    border-color: ${({ isActive }) => isActive ? ACCENT : BORDER_HOVER};
    background: ${({ isActive }) => isActive ? ACCENT_SUBTLE : SURFACE_RAISED};
  }
`;

export const ScenarioName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
`;

export const ScenarioDesc = styled.div`
  font-size: 12px;
  color: ${TEXT_TERTIARY};
`;

/* ─── HUD collapsed state ─── */

export const HudToggle = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 13px;
  font-weight: 500;
  background: ${SURFACE};
  color: ${TEXT_PRIMARY};
  border: 1px solid ${BORDER};
  border-radius: ${RADIUS_LG};
  box-shadow: ${SHADOW_LG};
  cursor: pointer;
  z-index: 1000;
  transition: all 150ms ease;
  animation: ${fadeIn} 200ms ease;
  ${focusVisible}

  &:hover {
    box-shadow: ${SHADOW_XL};
    transform: translateY(-1px);
  }
`;

/* ─── Prototype context banner ─── */

export const PrototypeBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${SURFACE_INSET};
  border-bottom: 1px solid ${BORDER};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${TEXT_TERTIARY};
`;

/* ─── Selection indicator for pricing cards ─── */

export const SelectionDot = styled.div<{ isSelected?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid ${({ isSelected }) => isSelected ? ACCENT : BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 150ms ease;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ isSelected }) => isSelected ? ACCENT : 'transparent'};
    transition: all 150ms ease;
  }
`;
