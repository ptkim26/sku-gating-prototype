/**
 * RequirementsSection — Medium Lift
 *
 * A dedicated "Requirements" section on the listing page that surfaces
 * all gate requirements upfront with inline pricing comparison.
 * Replaces the small tag + modal pattern with transparent, always-visible info.
 */

import React from 'react';
import styled from '@emotion/styled';
import { IntegrationListing } from './types';
import { BREAKEVEN_MESSAGE } from './mock-data';

/* ─── Local tokens ─── */

const ACCENT = '#1a1a1a';
const BORDER = '#e8e8e6';
const BORDER_HOVER = '#d0d0ce';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SECONDARY = '#6b6b6b';
const TEXT_TERTIARY = '#999';
const SURFACE = '#ffffff';
const SURFACE_INSET = '#f5f5f3';
const SEVERITY = {
  required: { bg: '#f0f4ff', border: '#d4ddf7', dot: '#5a6fa0' },
  met: { bg: '#f0f7f0', border: '#c4dfc4', dot: '#4a8c4a' },
  conflict: { bg: '#fdf2f2', border: '#f0c9c9', dot: '#b04040' },
};

/* ─── Styled components ─── */

const Section = styled.div`
  margin-bottom: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionLabel = styled.h2`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
  margin: 0;
`;

const StatusSummary = styled.span<{ allMet: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ allMet }) => allMet ? '#4a8c4a' : TEXT_TERTIARY};
`;

const RequirementCard = styled.div<{ status: string }>`
  border: 1px solid ${({ status }) => SEVERITY[status as keyof typeof SEVERITY]?.border || BORDER};
  background: ${({ status }) => SEVERITY[status as keyof typeof SEVERITY]?.bg || SURFACE};
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ReqHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;

const StatusDot = styled.div<{ status: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ status }) => SEVERITY[status as keyof typeof SEVERITY]?.dot || TEXT_TERTIARY};
  flex-shrink: 0;
`;

const ReqLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
`;

const ReqStatusBadge = styled.span<{ status: string }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ status }) => SEVERITY[status as keyof typeof SEVERITY]?.dot || TEXT_TERTIARY};
  margin-left: auto;
`;

const ReqDetail = styled.div`
  font-size: 13px;
  color: ${TEXT_SECONDARY};
  line-height: 1.5;
  padding-left: 20px;
`;

/* ─── Inline pricing comparison (Medium Lift) ─── */

const PricingComparison = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${BORDER};
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
  cursor: default;
`;

const TileRecommended = styled.div`
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

const TileDescription = styled.div`
  font-size: 12px;
  color: ${TEXT_SECONDARY};
  line-height: 1.5;
  margin-bottom: 12px;
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
  grid-column: 1 / -1;
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

const NoRequirements = styled.div`
  padding: 20px 24px;
  border: 1px dashed ${BORDER};
  border-radius: 12px;
  font-size: 14px;
  color: ${TEXT_TERTIARY};
  text-align: center;
`;

/* ─── Icons ─── */

const InfoSmall = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

/* ─── Component ─── */

interface RequirementsSectionProps {
  listing: IntegrationListing;
}

const RequirementsSection: React.FC<RequirementsSectionProps> = ({ listing }) => {
  const requirements = listing.requirements || [];
  const isGated = listing.gateType !== 'none';

  if (!isGated) {
    return (
      <Section>
        <SectionHeader>
          <SectionLabel>Requirements</SectionLabel>
          <StatusSummary allMet>No requirements</StatusSummary>
        </SectionHeader>
        <NoRequirements>
          No additional packages or subscriptions needed. Ready to install.
        </NoRequirements>
      </Section>
    );
  }

  const allMet = requirements.every(r => r.status === 'met');

  return (
    <Section>
      <SectionHeader>
        <SectionLabel>Requirements</SectionLabel>
        <StatusSummary allMet={allMet}>
          {allMet ? 'All met' : `${requirements.filter(r => r.status !== 'met').length} action needed`}
        </StatusSummary>
      </SectionHeader>

      {requirements.map((req, i) => (
        <RequirementCard key={i} status={req.status}>
          <ReqHeader>
            <StatusDot status={req.status} />
            <ReqLabel>{req.label}</ReqLabel>
            <ReqStatusBadge status={req.status}>
              {req.status === 'required' && 'Required'}
              {req.status === 'met' && 'Active'}
              {req.status === 'conflict' && 'Conflict'}
            </ReqStatusBadge>
          </ReqHeader>
          {req.detail && <ReqDetail>{req.detail}</ReqDetail>}

          {/* Inline pricing comparison — the key Medium Lift addition */}
          {req.pricing && req.pricing.options.length > 1 && (
            <PricingComparison>
              {req.pricing.options.map((option) => (
                <PricingTile key={option.id} isRecommended={option.recommended}>
                  {option.recommended && <TileRecommended>Recommended</TileRecommended>}
                  <TileLabel>{option.label}</TileLabel>
                  <TilePrice>
                    {option.price}
                    <TilePriceDetail>{option.priceDetail}</TilePriceDetail>
                  </TilePrice>
                  <TileDescription>{option.description}</TileDescription>
                  {option.features && (
                    <TileFeatures>
                      {option.features.slice(0, 4).map((f, j) => (
                        <TileFeature key={j}>{f}</TileFeature>
                      ))}
                    </TileFeatures>
                  )}
                </PricingTile>
              ))}
              <BreakevenBar>
                <InfoSmall />
                {BREAKEVEN_MESSAGE}
              </BreakevenBar>
            </PricingComparison>
          )}
        </RequirementCard>
      ))}
    </Section>
  );
};

export default RequirementsSection;
