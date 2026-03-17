/**
 * GateModal — Quick Win #2
 *
 * Redesigned gate modal showing both pricing paths when the integration
 * supports dual pricing (Third Party IdP vs Full IAM).
 *
 * For single-path gates (401k, vendor plan, conflict), shows a
 * streamlined single-option view.
 */

import React, { useState } from 'react';
import Modal from '@rippling/pebble/Modal';
import { IntegrationListing } from './types';
import { THIRD_PARTY_OPTION, FULL_IAM_OPTION, BREAKEVEN_MESSAGE } from './mock-data';
import {
  ModalBody,
  ModalIntro,
  ModalIconCircle,
  ModalIntroText,
  PricingCard,
  RecommendedBadge,
  PricingHeader,
  PricingLabel,
  PricingAmount,
  PriceValue,
  PriceUnit,
  PricingDescription,
  BreakevenHint,
  ModalActions,
  ModalButton,
  SinglePathContent,
  SinglePathMessage,
  SelectionDot,
} from './shared-styles';

interface GateModalProps {
  isVisible: boolean;
  onClose: () => void;
  listing: IntegrationListing;
}

/* ─── Inline SVG icons ─── */

const InfoSmall = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const GateModal: React.FC<GateModalProps> = ({ isVisible, onClose, listing }) => {
  const [selectedOption, setSelectedOption] = useState<'third-party' | 'full-iam'>('third-party');

  const getTitle = () => {
    switch (listing.gateType) {
      case 'iam':
        return `Connect ${listing.name}`;
      case '401k':
        return listing.gateLabel || 'Package required';
      case 'vendor-plan':
        return listing.vendorPlanLabel || listing.gateLabel || 'Plan required';
      case 'conflict':
        return `Can\u2019t install ${listing.name}`;
      default:
        return `Install ${listing.name}`;
    }
  };

  // Dual-pricing modal (IAM gate with both paths)
  if (listing.gateType === 'iam' && listing.supportsDualPricing) {
    const thirdParty = { ...THIRD_PARTY_OPTION, ctaLabel: `Add ${listing.name} only` };

    return (
      <Modal
        isVisible={isVisible}
        onCancel={onClose}
        title={getTitle()}
      >
        <ModalBody>
          <ModalIntro>
            <ModalIconCircle>
              <span role="img" aria-label="key">&#x1F511;</span>
            </ModalIconCircle>
            <ModalIntroText>
              <strong style={{ fontWeight: 500, color: '#1a1a1a' }}>{listing.name}</strong> requires Identity &amp; Access Management. Pick the option that fits how many integrations you need.
            </ModalIntroText>
          </ModalIntro>

          {/* Third Party IdP — recommended for single integration */}
          <PricingCard
            isSelected={selectedOption === 'third-party'}
            isRecommended
            onClick={() => setSelectedOption('third-party')}
          >
            <RecommendedBadge>Best for 1–3 apps</RecommendedBadge>
            <PricingHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SelectionDot isSelected={selectedOption === 'third-party'} />
                <PricingLabel>{thirdParty.label}</PricingLabel>
              </div>
              <PricingAmount>
                <PriceValue>{thirdParty.price}</PriceValue>
                <PriceUnit>{thirdParty.priceDetail}</PriceUnit>
              </PricingAmount>
            </PricingHeader>
            <PricingDescription style={{ paddingLeft: 28 }}>
              {thirdParty.description}
            </PricingDescription>
          </PricingCard>

          {/* Full IAM */}
          <PricingCard
            isSelected={selectedOption === 'full-iam'}
            onClick={() => setSelectedOption('full-iam')}
          >
            <PricingHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <SelectionDot isSelected={selectedOption === 'full-iam'} />
                <PricingLabel>{FULL_IAM_OPTION.label}</PricingLabel>
              </div>
              <PricingAmount>
                <PriceValue>{FULL_IAM_OPTION.price}</PriceValue>
                <PriceUnit>{FULL_IAM_OPTION.priceDetail}</PriceUnit>
              </PricingAmount>
            </PricingHeader>
            <PricingDescription style={{ paddingLeft: 28 }}>
              {FULL_IAM_OPTION.description}
            </PricingDescription>
          </PricingCard>

          {/* Breakeven guidance */}
          <BreakevenHint>
            <InfoSmall />
            {BREAKEVEN_MESSAGE}
          </BreakevenHint>

          {/* Actions */}
          <ModalActions>
            <ModalButton variant="secondary" onClick={onClose}>
              Talk to Sales
            </ModalButton>
            <ModalButton variant="primary" onClick={onClose}>
              {selectedOption === 'third-party' ? thirdParty.ctaLabel : FULL_IAM_OPTION.ctaLabel}
            </ModalButton>
          </ModalActions>
        </ModalBody>
      </Modal>
    );
  }

  // Single-path modals (401k, vendor plan, conflict, IAM without dual pricing)
  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      title={getTitle()}
    >
      <ModalBody>
        <SinglePathContent>
          {listing.gateType === 'iam' && (
            <ModalIntro>
              <ModalIconCircle>
                <span role="img" aria-label="key">&#x1F511;</span>
              </ModalIconCircle>
              <SinglePathMessage>
                <strong>{listing.name}</strong> requires the full Identity &amp; Access Management package at ~$8–10 PEPM. This includes provisioning, SSO, and password management for 600+ integrations.
              </SinglePathMessage>
            </ModalIntro>
          )}

          {listing.gateType === '401k' && (
            <ModalIntro>
              <ModalIconCircle>
                <span role="img" aria-label="chart">&#x1F4C8;</span>
              </ModalIconCircle>
              <SinglePathMessage>
                <strong>{listing.name}</strong> requires the Rippling 401(k) package. Add it to your plan to connect this integration.
              </SinglePathMessage>
            </ModalIntro>
          )}

          {listing.gateType === 'vendor-plan' && (
            <ModalIntro>
              <ModalIconCircle>
                <span role="img" aria-label="lock">&#x1F510;</span>
              </ModalIconCircle>
              <SinglePathMessage>
                <strong>{listing.name}</strong> requires a specific plan from the vendor. Ensure you have the {listing.vendorPlanLabel?.replace('Requires ', '')} before connecting.
              </SinglePathMessage>
            </ModalIntro>
          )}

          {listing.gateType === 'conflict' && (
            <ModalIntro>
              <ModalIconCircle>
                <span role="img" aria-label="warning">&#x26A0;&#xFE0F;</span>
              </ModalIconCircle>
              <SinglePathMessage>
                You can{'\u2019'}t install <strong>{listing.name}</strong> because you already have <strong>{listing.conflictApp}</strong> installed. These integrations are mutually exclusive — disconnect {listing.conflictApp} first to use {listing.name}.
              </SinglePathMessage>
            </ModalIntro>
          )}
        </SinglePathContent>

        <ModalActions>
          <ModalButton variant="secondary" onClick={onClose}>
            {listing.gateType === 'conflict' ? 'Close' : 'Talk to Sales'}
          </ModalButton>
          {listing.gateType === 'conflict' ? (
            <ModalButton variant="secondary" onClick={onClose}>
              View {listing.conflictApp}
            </ModalButton>
          ) : (
            <ModalButton variant="primary" onClick={onClose}>
              {listing.gateType === 'vendor-plan' ? 'Got it' : 'Add to plan'}
            </ModalButton>
          )}
        </ModalActions>
      </ModalBody>
    </Modal>
  );
};

export default GateModal;
