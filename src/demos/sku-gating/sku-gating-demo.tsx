/**
 * SKU Gating Demo
 *
 * Interactive prototype for the app shop listing page gating experience.
 * The requirement banner expands to reveal pricing options inline.
 * The install button opens the gate modal.
 *
 * HUD panel lets reviewers switch between all 6 gate scenarios.
 */

import React, { useState, useMemo } from 'react';
import { LISTINGS, SCENARIOS, DEFAULT_LISTING_ID } from './mock-data';
import GateModal from './GateModal';
import RequirementPanel from './RequirementPanel';
import {
  PageContainer,
  ContentArea,
  Breadcrumb,
  ListingHeader,
  AppIconContainer,
  RipplingChoiceBadge,
  ListingInfo,
  AppNameRow,
  AppName,
  StarRow,
  AppUrl,
  AppDescription,
  InstallArea,
  InstallButton,
  SectionTitle,
  CapabilityList,
  CapabilityItem,
  Divider,
  HudPanel,
  HudHeader,
  HudTitle,
  HudCloseButton,
  HudSection,
  ScenarioButton,
  ScenarioName,
  ScenarioDesc,
  HudToggle,
  PrototypeBanner,
  HudDescription,
} from './shared-styles';

/* ─── Helpers ─── */

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="stars">
    {'\u2605'.repeat(rating)}
    <span style={{ opacity: 0.2 }}>{'\u2605'.repeat(5 - rating)}</span>
  </span>
);

/* ─── SVG icons ─── */

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SlidersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

/* ─── Main component ─── */

const SkuGatingDemo: React.FC = () => {
  const [activeListingId, setActiveListingId] = useState(DEFAULT_LISTING_ID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  const listing = useMemo(
    () => LISTINGS.find(l => l.id === activeListingId) || LISTINGS[0],
    [activeListingId],
  );

  const isGated = listing.gateType !== 'none';

  return (
    <PageContainer>
      <PrototypeBanner>
        SKU Gating Prototype
        <span style={{ opacity: 0.3 }}>|</span>
        Use the panel to switch between gate scenarios
      </PrototypeBanner>

      <ContentArea key={activeListingId}>
        {/* Breadcrumb */}
        <Breadcrumb aria-label="Breadcrumb">
          <a href="#">App Shop</a>
          <span>/</span>
          <a href="#">{listing.category}</a>
          <span>/</span>
          <strong>{listing.name}</strong>
        </Breadcrumb>

        {/* Listing header */}
        <ListingHeader>
          <AppIconContainer>
            {listing.isRipplingChoice && <RipplingChoiceBadge />}
            <span>{listing.icon}</span>
          </AppIconContainer>

          <ListingInfo>
            <AppNameRow>
              <AppName>{listing.name}</AppName>
            </AppNameRow>
            <StarRow>
              <Stars rating={listing.rating} />
              <span>{listing.reviewCount} reviews</span>
            </StarRow>
            <AppUrl href={listing.url}>{listing.url.replace('https://', '')}</AppUrl>
            <AppDescription>{listing.description}</AppDescription>
          </ListingInfo>

          {/* Install button — always visible, disabled when gated */}
          <InstallArea>
            <InstallButton
              isDisabled={isGated}
              disabled={isGated}
              aria-disabled={isGated}
            >
              {isGated ? `Connect ${listing.name}` : 'Install'}
            </InstallButton>
          </InstallArea>
        </ListingHeader>

        {/* Expandable requirement panel */}
        {isGated && (
          <RequirementPanel listing={listing} />
        )}

        <Divider />

        {/* Capabilities */}
        <SectionTitle>Capabilities</SectionTitle>
        <CapabilityList>
          {listing.capabilities.map((cap) => (
            <CapabilityItem key={cap}>
              <CheckIcon />
              {cap}
            </CapabilityItem>
          ))}
        </CapabilityList>
      </ContentArea>

      {/* Gate modal */}
      <GateModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={listing}
      />

      {/* HUD — scenario switcher */}
      {!isHudCollapsed ? (
        <HudPanel>
          <HudHeader>
            <HudTitle>Scenarios</HudTitle>
            <HudCloseButton
              onClick={() => setIsHudCollapsed(true)}
              aria-label="Collapse panel"
            >
              <XIcon />
            </HudCloseButton>
          </HudHeader>

          <HudDescription>
            Switch gate types to see how the requirement panel, button, and modal adapt.
          </HudDescription>

          <HudSection>
            {SCENARIOS.map((scenario) => (
              <ScenarioButton
                key={scenario.id}
                isActive={scenario.listingId === activeListingId}
                onClick={() => {
                  setActiveListingId(scenario.listingId);
                  setIsModalOpen(false);
                }}
              >
                <ScenarioName>{scenario.label}</ScenarioName>
                <ScenarioDesc>{scenario.description}</ScenarioDesc>
              </ScenarioButton>
            ))}
          </HudSection>
        </HudPanel>
      ) : (
        <HudToggle onClick={() => setIsHudCollapsed(false)}>
          <SlidersIcon />
          Scenarios
        </HudToggle>
      )}
    </PageContainer>
  );
};

export default SkuGatingDemo;
