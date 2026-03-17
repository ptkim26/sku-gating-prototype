/**
 * RequirementPanel — Expandable requirement disclosure
 *
 * Collapsed: shows requirement label + subtitle (what the banner used to do)
 * Expanded: reveals inline pricing comparison with recommendation
 *
 * Single surface, progressive disclosure. No redundant CTAs.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { IntegrationListing } from './types';
import { BREAKEVEN_MESSAGE } from './mock-data';

/* ─── Tokens ─── */

const ACCENT = '#1a1a1a';
const BORDER = '#e8e8e6';
const BORDER_HOVER = '#d0d0ce';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SECONDARY = '#6b6b6b';
const TEXT_TERTIARY = '#999';
const SURFACE = '#ffffff';
const SURFACE_INSET = '#f5f5f3';
const FOCUS_RING = `0 0 0 2px ${SURFACE}, 0 0 0 4px ${ACCENT}`;

const SEVERITY_MAP = {
  info: { bg: '#f8f9fc', border: '#e2e6f0', icon: '#5a6fa0' },
  warning: { bg: '#fdfaf5', border: '#f0ddb8', icon: '#9c7a3c' },
  error: { bg: '#fdf6f6', border: '#f0c9c9', icon: '#b04040' },
};

/* ─── Animations ─── */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 600px; }
`;

const focusVisible = css`
  &:focus-visible {
    outline: none;
    box-shadow: ${FOCUS_RING};
  }
`;

/* ─── Styled components ─── */

const Panel = styled.div<{ severity: string }>`
  border: 1px solid ${({ severity }) => SEVERITY_MAP[severity as keyof typeof SEVERITY_MAP]?.border || BORDER};
  background: ${({ severity }) => SEVERITY_MAP[severity as keyof typeof SEVERITY_MAP]?.bg || SURFACE};
  border-radius: 12px;
  margin-bottom: 0;
  animation: ${fadeIn} 300ms ease both;
  overflow: hidden;
`;

const PanelHeader = styled.button<{ severity: string; isExpanded: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  width: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: all 150ms ease;
  ${focusVisible}
  border-radius: ${({ isExpanded }) => isExpanded ? '12px 12px 0 0' : '12px'};

  &:hover {
    background: rgba(0, 0, 0, 0.015);
  }
`;

const IconWrap = styled.div<{ severity: string }>`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${SURFACE};
  border: 1px solid ${({ severity }) => SEVERITY_MAP[severity as keyof typeof SEVERITY_MAP]?.border || BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ severity }) => SEVERITY_MAP[severity as keyof typeof SEVERITY_MAP]?.icon || TEXT_TERTIARY};
`;

const HeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2px;
`;

const HeaderSubtitle = styled.div`
  font-size: 13px;
  color: ${TEXT_SECONDARY};
  line-height: 1.4;
`;

const ChevronWrap = styled.div<{ isExpanded: boolean }>`
  flex-shrink: 0;
  color: ${TEXT_TERTIARY};
  transition: transform 200ms ease;
  transform: rotate(${({ isExpanded }) => isExpanded ? '180deg' : '0deg'});
`;

/* ─── Expanded content ─── */

const ExpandedBody = styled.div<{ isExpanded: boolean }>`
  overflow: hidden;
  animation: ${({ isExpanded }) => isExpanded ? slideDown : 'none'} 250ms ease forwards;
  max-height: ${({ isExpanded }) => isExpanded ? '600px' : '0'};
  opacity: ${({ isExpanded }) => isExpanded ? 1 : 0};
  transition: max-height 250ms ease, opacity 200ms ease;
`;

const ExpandedInner = styled.div`
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Separator = styled.div`
  height: 1px;
  background: ${BORDER};
  margin: 0 0 2px;
`;

/* ─── Pricing comparison ─── */

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const PricingTile = styled.div<{ isRecommended?: boolean }>`
  padding: 16px;
  border: 1.5px solid ${({ isRecommended }) => isRecommended ? ACCENT : BORDER};
  border-radius: 10px;
  background: ${SURFACE};
  position: relative;
`;

const TileBadge = styled.div`
  position: absolute;
  top: -8px;
  left: 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${ACCENT};
  color: #fff;
  padding: 2px 8px;
  border-radius: 3px;
`;

const TileLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  margin-bottom: 4px;
`;

const TilePrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2px;
`;

const TilePriceDetail = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${TEXT_TERTIARY};
  margin-left: 4px;
`;

const TileDesc = styled.div`
  font-size: 12px;
  color: ${TEXT_SECONDARY};
  line-height: 1.5;
  margin-bottom: 10px;
`;

const TileFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TileFeature = styled.li`
  font-size: 12px;
  color: ${TEXT_SECONDARY};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${BORDER_HOVER};
    flex-shrink: 0;
  }
`;

const BreakevenBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  border-radius: 8px;
  font-size: 12px;
  color: ${TEXT_SECONDARY};
`;

/* ─── Action buttons inside tiles ─── */

const TileAction = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms ease;
  margin-top: 12px;
  width: 100%;
  justify-content: center;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${SURFACE}, 0 0 0 4px ${ACCENT};
  }

  ${({ variant }) => variant === 'primary' ? `
    background: ${ACCENT};
    color: #fff;
    border: 1px solid ${ACCENT};
    &:hover { background: #333; }
  ` : `
    background: ${SURFACE};
    color: ${TEXT_PRIMARY};
    border: 1px solid ${BORDER};
    &:hover { border-color: ${BORDER_HOVER}; }
  `}
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

/* ─── Single-path content (401k, vendor plan) ─── */

const SinglePathContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SinglePathMessage = styled.div`
  font-size: 13px;
  color: ${TEXT_SECONDARY};
  line-height: 1.6;

  strong {
    color: ${TEXT_PRIMARY};
    font-weight: 500;
  }
`;

/* ─── Icons ─── */

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const InfoSmall = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

/* ─── Helpers ─── */

const getSeverity = (gateType: string): string => {
  if (gateType === 'vendor-plan') return 'warning';
  return 'info';
};

const getIcon = (gateType: string) => {
  if (gateType === 'vendor-plan') return <AlertIcon />;
  return <InfoIcon />;
};

const getSubtitle = (listing: IntegrationListing) => {
  if (listing.gateType === 'iam' && listing.supportsDualPricing) {
    return 'Two options available \u2014 from ~$2 PEPM per integration';
  }
  if (listing.gateType === 'iam') {
    return '~$8\u201310 PEPM \u00b7 Includes all integrations';
  }
  if (listing.gateType === '401k') {
    return 'Add this package to your Rippling plan to connect';
  }
  if (listing.gateType === 'vendor-plan') {
    return 'Verify your vendor subscription before connecting';
  }
  return '';
};

/* ─── Component ─── */

interface RequirementPanelProps {
  listing: IntegrationListing;
}

const RequirementPanel: React.FC<RequirementPanelProps> = ({ listing }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const severity = getSeverity(listing.gateType);
  const requirements = listing.requirements || [];
  const hasExpandedContent = requirements.length > 0;

  // Find the requirement with pricing options (if any)
  const pricingReq = requirements.find(r => r.pricing && r.pricing.options.length > 1);

  return (
    <Panel severity={severity}>
      <PanelHeader
        severity={severity}
        isExpanded={isExpanded}
        onClick={() => hasExpandedContent && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <IconWrap severity={severity}>
          {getIcon(listing.gateType)}
        </IconWrap>
        <HeaderContent>
          <HeaderTitle>{listing.gateLabel}</HeaderTitle>
          <HeaderSubtitle>{getSubtitle(listing)}</HeaderSubtitle>
        </HeaderContent>
        {hasExpandedContent && (
          <ChevronWrap isExpanded={isExpanded}>
            <ChevronDown />
          </ChevronWrap>
        )}
      </PanelHeader>

      {hasExpandedContent && (
        <ExpandedBody isExpanded={isExpanded}>
          <ExpandedInner>
            <Separator />

            {/* Dual pricing — IAM with both paths */}
            {pricingReq && (
              <>
                <PricingGrid>
                  {pricingReq.pricing!.options.map((option) => (
                    <PricingTile key={option.id} isRecommended={option.recommended}>
                      {option.recommended && <TileBadge>Recommended</TileBadge>}
                      <TileLabel>{option.label}</TileLabel>
                      <TilePrice>
                        {option.price}
                        <TilePriceDetail>{option.priceDetail}</TilePriceDetail>
                      </TilePrice>
                      <TileDesc>{option.description}</TileDesc>
                      {option.features && (
                        <TileFeatures>
                          {option.features.slice(0, 4).map((f, j) => (
                            <TileFeature key={j}>{f}</TileFeature>
                          ))}
                        </TileFeatures>
                      )}
                      <TileAction variant={option.recommended ? 'primary' : 'secondary'}>
                        {option.id === 'third-party'
                          ? `Add ${listing.name} only`
                          : 'Add full IAM package'
                        }
                      </TileAction>
                    </PricingTile>
                  ))}
                </PricingGrid>
                <BreakevenBar>
                  <InfoSmall />
                  {BREAKEVEN_MESSAGE}
                </BreakevenBar>
                <ActionRow>
                  <TileAction variant="secondary" style={{ width: 'auto', marginTop: 0 }}>
                    Talk to Sales
                  </TileAction>
                </ActionRow>
              </>
            )}

            {/* 401k — single Rippling SKU */}
            {listing.gateType === '401k' && !pricingReq && (
              <SinglePathContent>
                {requirements.map((req, i) => (
                  <SinglePathMessage key={i}>{req.detail}</SinglePathMessage>
                ))}
                <ActionRow>
                  <TileAction variant="primary" style={{ width: 'auto' }}>
                    Add to plan
                  </TileAction>
                  <TileAction variant="secondary" style={{ width: 'auto' }}>
                    Talk to Sales
                  </TileAction>
                </ActionRow>
              </SinglePathContent>
            )}

            {/* Vendor plan — external requirement */}
            {listing.gateType === 'vendor-plan' && (
              <SinglePathContent>
                {requirements.map((req, i) => (
                  <SinglePathMessage key={i}>{req.detail}</SinglePathMessage>
                ))}
                <ActionRow>
                  <TileAction variant="primary" style={{ width: 'auto' }}>
                    I have this plan
                  </TileAction>
                  <TileAction variant="secondary" style={{ width: 'auto' }}>
                    Visit {listing.name}
                  </TileAction>
                </ActionRow>
              </SinglePathContent>
            )}

          </ExpandedInner>
        </ExpandedBody>
      )}
    </Panel>
  );
};

export default RequirementPanel;
