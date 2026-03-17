/**
 * PurchaseFlow — Aspirational Tier
 *
 * Full self-serve purchase flow with:
 *   1. Smart pricing recommendation (based on current app count)
 *   2. Plan selection with feature comparison
 *   3. Review & confirm
 *   4. Success state with next steps
 *
 * This is the "ideal state" — no Talk to Sales dead ends, no redirects.
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { IntegrationListing, PurchaseStep } from './types';
import { THIRD_PARTY_OPTION, FULL_IAM_OPTION } from './mock-data';

/* ─── Tokens ─── */

const ACCENT = '#1a1a1a';
const ACCENT_HOVER = '#333';
const ACCENT_SUBTLE = '#f7f7f5';
const BORDER = '#e8e8e6';
const BORDER_HOVER = '#d0d0ce';
const TEXT_PRIMARY = '#1a1a1a';
const TEXT_SECONDARY = '#6b6b6b';
const TEXT_TERTIARY = '#999';
const SURFACE = '#ffffff';
const SURFACE_INSET = '#f5f5f3';
const SUCCESS_BG = '#f0f7f0';
const SUCCESS_BORDER = '#c4dfc4';
const SUCCESS_DOT = '#4a8c4a';

const FOCUS_RING = `0 0 0 2px ${SURFACE}, 0 0 0 4px ${ACCENT}`;

const focusVisible = css`
  &:focus-visible {
    outline: none;
    box-shadow: ${FOCUS_RING};
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ─── Layout ─── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${overlayFadeIn} 200ms ease;
`;

const FlowContainer = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${SURFACE};
  border-radius: 16px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 48px);
  animation: ${fadeIn} 300ms ease;
`;

const FlowHeader = styled.div`
  padding: 24px 28px 20px;
  border-bottom: 1px solid ${BORDER};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlowTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${TEXT_PRIMARY};
  margin: 0;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${TEXT_TERTIARY};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease;
  ${focusVisible}
  &:hover { background: ${SURFACE_INSET}; color: ${TEXT_PRIMARY}; }
`;

const FlowBody = styled.div`
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FlowFooter = styled.div`
  padding: 20px 28px;
  border-top: 1px solid ${BORDER};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FlowButton = styled.button<{ variant?: 'primary' | 'secondary' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
  ${focusVisible}

  ${({ variant }) => variant === 'primary' ? css`
    background: ${ACCENT};
    color: #fff;
    border: 1px solid ${ACCENT};
    &:hover { background: ${ACCENT_HOVER}; }
  ` : variant === 'ghost' ? css`
    background: transparent;
    color: ${TEXT_SECONDARY};
    border: 1px solid transparent;
    &:hover { color: ${TEXT_PRIMARY}; }
  ` : css`
    background: ${SURFACE};
    color: ${TEXT_PRIMARY};
    border: 1px solid ${BORDER};
    &:hover { border-color: ${BORDER_HOVER}; }
  `}
`;

/* ─── Progress ─── */

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 28px;
  margin-top: -1px;
  background: ${SURFACE};
  border-bottom: 1px solid ${BORDER};
  overflow-x: auto;
`;

const ProgressStep = styled.div<{ isActive: boolean; isComplete: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: ${({ isActive, isComplete }) =>
    isActive ? TEXT_PRIMARY : isComplete ? SUCCESS_DOT : TEXT_TERTIARY};
  border-bottom: 2px solid ${({ isActive, isComplete }) =>
    isActive ? ACCENT : isComplete ? SUCCESS_DOT : 'transparent'};
  transition: all 200ms ease;
  white-space: nowrap;
`;

const StepNumber = styled.span<{ isActive: boolean; isComplete: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  transition: all 200ms ease;

  ${({ isActive, isComplete }) => isComplete ? css`
    background: ${SUCCESS_DOT};
    color: #fff;
  ` : isActive ? css`
    background: ${ACCENT};
    color: #fff;
  ` : css`
    background: ${SURFACE_INSET};
    color: ${TEXT_TERTIARY};
  `}
`;

/* ─── Smart Recommendation (Aspirational) ─── */

const RecommendationCard = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, ${ACCENT_SUBTLE} 0%, ${SURFACE} 100%);
  border: 1px solid ${BORDER};
  border-radius: 12px;
`;

const RecHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const RecIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${ACCENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const RecLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${TEXT_TERTIARY};
`;

const RecTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  line-height: 1.5;
  margin-bottom: 8px;
`;

const RecSavings = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${SUCCESS_BG};
  border: 1px solid ${SUCCESS_BORDER};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${SUCCESS_DOT};
`;

/* ─── Plan cards ─── */

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const PlanCard = styled.div<{ isSelected: boolean }>`
  border: 1.5px solid ${({ isSelected }) => isSelected ? ACCENT : BORDER};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 150ms ease;
  background: ${({ isSelected }) => isSelected ? ACCENT_SUBTLE : SURFACE};
  position: relative;
  ${focusVisible}

  &:hover {
    border-color: ${({ isSelected }) => isSelected ? ACCENT : BORDER_HOVER};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const PlanRecommended = styled.div`
  position: absolute;
  top: -8px;
  left: 14px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${ACCENT};
  color: #fff;
  padding: 2px 8px;
  border-radius: 3px;
`;

const PlanRadio = styled.div<{ isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid ${({ isSelected }) => isSelected ? ACCENT : BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 12px;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ isSelected }) => isSelected ? ACCENT : 'transparent'};
    transition: all 150ms ease;
  }
`;

const PlanName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  margin-bottom: 4px;
`;

const PlanPrice = styled.div`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2px;
`;

const PlanPriceDetail = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${TEXT_TERTIARY};
  margin-left: 4px;
`;

const PlanDesc = styled.div`
  font-size: 12px;
  color: ${TEXT_SECONDARY};
  line-height: 1.5;
  margin-bottom: 12px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlanFeature = styled.li`
  font-size: 12px;
  color: ${TEXT_SECONDARY};
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.4;
`;

/* ─── Review step ─── */

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${BORDER};

  &:last-child {
    border-bottom: none;
  }
`;

const ReviewLabel = styled.div`
  font-size: 14px;
  color: ${TEXT_SECONDARY};
`;

const ReviewValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
`;

const ReviewTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${SURFACE_INSET};
  border-radius: 10px;
`;

const ReviewTotalLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
`;

const ReviewTotalValue = styled.div`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${TEXT_PRIMARY};
`;

const ReviewTotalDetail = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${TEXT_TERTIARY};
  margin-left: 4px;
`;

const ReviewNote = styled.div`
  font-size: 12px;
  color: ${TEXT_TERTIARY};
  line-height: 1.5;
`;

/* ─── Success step ─── */

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  gap: 20px;
`;

const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${SUCCESS_BG};
  border: 1px solid ${SUCCESS_BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${SUCCESS_DOT};
`;

const SuccessTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${TEXT_PRIMARY};
`;

const SuccessMessage = styled.div`
  font-size: 14px;
  color: ${TEXT_SECONDARY};
  line-height: 1.6;
  max-width: 380px;
`;

const NextStepCard = styled.div`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid ${BORDER};
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 150ms ease;
  ${focusVisible}

  &:hover {
    border-color: ${BORDER_HOVER};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const NextStepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${SURFACE_INSET};
  border: 1px solid ${BORDER};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const NextStepContent = styled.div`
  flex: 1;
`;

const NextStepTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${TEXT_PRIMARY};
  margin-bottom: 2px;
`;

const NextStepDesc = styled.div`
  font-size: 12px;
  color: ${TEXT_TERTIARY};
`;

/* ─── Icons ─── */

const CheckIcon16 = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CheckIconLarge = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

/* ─── Steps config ─── */

const STEPS: { key: PurchaseStep; label: string }[] = [
  { key: 'select-plan', label: 'Choose plan' },
  { key: 'review', label: 'Review' },
  { key: 'confirm', label: 'Confirm' },
  { key: 'success', label: 'Done' },
];

/* ─── Component ─── */

interface PurchaseFlowProps {
  isVisible: boolean;
  onClose: () => void;
  listing: IntegrationListing;
}

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ isVisible, onClose, listing }) => {
  const [step, setStep] = useState<PurchaseStep>('select-plan');
  const [selectedPlan, setSelectedPlan] = useState<'third-party' | 'full-iam'>(
    listing.recommendedTier || 'third-party'
  );

  // Reset state when listing changes
  const [prevListingId, setPrevListingId] = useState(listing.id);
  if (listing.id !== prevListingId) {
    setPrevListingId(listing.id);
    setStep('select-plan');
    setSelectedPlan(listing.recommendedTier || 'third-party');
  }

  if (!isVisible) return null;

  const currentStepIndex = STEPS.findIndex(s => s.key === step);
  const selectedOption = selectedPlan === 'third-party' ? THIRD_PARTY_OPTION : FULL_IAM_OPTION;
  const isDualPricing = listing.supportsDualPricing;
  const appsInstalled = listing.currentAppsInstalled || 0;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setStep(STEPS[nextIndex].key);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex].key);
    }
  };

  const handleClose = () => {
    setStep('select-plan');
    onClose();
  };

  return (
    <Overlay onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <FlowContainer>
        <FlowHeader>
          <FlowTitle>
            {step === 'success' ? 'You\u2019re all set' : `Add ${listing.name}`}
          </FlowTitle>
          <CloseButton onClick={handleClose} aria-label="Close">
            <XIcon />
          </CloseButton>
        </FlowHeader>

        {step !== 'success' && (
          <ProgressBar>
            {STEPS.filter(s => s.key !== 'success').map((s, i) => (
              <ProgressStep
                key={s.key}
                isActive={s.key === step}
                isComplete={i < currentStepIndex}
              >
                <StepNumber isActive={s.key === step} isComplete={i < currentStepIndex}>
                  {i < currentStepIndex ? <CheckIcon16 /> : i + 1}
                </StepNumber>
                {s.label}
              </ProgressStep>
            ))}
          </ProgressBar>
        )}

        <FlowBody>
          {/* ─── Step 1: Select plan ─── */}
          {step === 'select-plan' && (
            <>
              {/* Smart recommendation */}
              {isDualPricing && appsInstalled > 0 && (
                <RecommendationCard>
                  <RecHeader>
                    <RecIcon><SparkleIcon /></RecIcon>
                    <RecLabel>Smart recommendation</RecLabel>
                  </RecHeader>
                  <RecTitle>
                    {listing.recommendedTier === 'full-iam'
                      ? `You have ${appsInstalled} apps that use identity management. At that volume, Full IAM is the better deal.`
                      : `You\u2019re connecting ${appsInstalled < 4 ? 'just a few' : appsInstalled} apps. Third Party IdP keeps costs low while you grow.`
                    }
                  </RecTitle>
                  {listing.estimatedSavings && (
                    <RecSavings>
                      <CheckIcon16 />
                      Save {listing.estimatedSavings} vs. {listing.recommendedTier === 'full-iam' ? 'per-app pricing' : 'Full IAM'}
                    </RecSavings>
                  )}
                </RecommendationCard>
              )}

              {/* Plan selection */}
              {isDualPricing ? (
                <PlanGrid>
                  <PlanCard
                    isSelected={selectedPlan === 'third-party'}
                    onClick={() => setSelectedPlan('third-party')}
                  >
                    {listing.recommendedTier === 'third-party' && (
                      <PlanRecommended>For you</PlanRecommended>
                    )}
                    <PlanRadio isSelected={selectedPlan === 'third-party'} />
                    <PlanName>{THIRD_PARTY_OPTION.label}</PlanName>
                    <PlanPrice>
                      {THIRD_PARTY_OPTION.price}
                      <PlanPriceDetail>{THIRD_PARTY_OPTION.priceDetail}</PlanPriceDetail>
                    </PlanPrice>
                    <PlanDesc>{THIRD_PARTY_OPTION.description}</PlanDesc>
                    <PlanFeatures>
                      {THIRD_PARTY_OPTION.features?.map((f, i) => (
                        <PlanFeature key={i}>
                          <span style={{ color: SUCCESS_DOT, flexShrink: 0 }}><CheckIcon16 /></span>
                          {f}
                        </PlanFeature>
                      ))}
                    </PlanFeatures>
                  </PlanCard>

                  <PlanCard
                    isSelected={selectedPlan === 'full-iam'}
                    onClick={() => setSelectedPlan('full-iam')}
                  >
                    {listing.recommendedTier === 'full-iam' && (
                      <PlanRecommended>For you</PlanRecommended>
                    )}
                    <PlanRadio isSelected={selectedPlan === 'full-iam'} />
                    <PlanName>{FULL_IAM_OPTION.label}</PlanName>
                    <PlanPrice>
                      {FULL_IAM_OPTION.price}
                      <PlanPriceDetail>{FULL_IAM_OPTION.priceDetail}</PlanPriceDetail>
                    </PlanPrice>
                    <PlanDesc>{FULL_IAM_OPTION.description}</PlanDesc>
                    <PlanFeatures>
                      {FULL_IAM_OPTION.features?.map((f, i) => (
                        <PlanFeature key={i}>
                          <span style={{ color: SUCCESS_DOT, flexShrink: 0 }}><CheckIcon16 /></span>
                          {f}
                        </PlanFeature>
                      ))}
                    </PlanFeatures>
                  </PlanCard>
                </PlanGrid>
              ) : (
                /* Single-path — 401k, vendor plan, etc. */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: TEXT_SECONDARY }}>
                    {listing.gateType === '401k' && (
                      <><strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>{listing.name}</strong> requires the Rippling 401(k) package to connect.</>
                    )}
                    {listing.gateType === 'vendor-plan' && (
                      <><strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>{listing.name}</strong> requires the {listing.vendorPlanLabel?.replace('Requires ', '')} from the vendor.</>
                    )}
                    {listing.gateType === 'conflict' && (
                      <>You can{'\u2019'}t add <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>{listing.name}</strong> while <strong style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>{listing.conflictApp}</strong> is installed. Disconnect it first to proceed.</>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─── Step 2: Review ─── */}
          {step === 'review' && (
            <ReviewSection>
              <div style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.5 }}>
                Confirm these details before we add this to your plan.
              </div>

              <div>
                <ReviewRow>
                  <ReviewLabel>Integration</ReviewLabel>
                  <ReviewValue>{listing.name}</ReviewValue>
                </ReviewRow>
                <ReviewRow>
                  <ReviewLabel>Package</ReviewLabel>
                  <ReviewValue>
                    {isDualPricing
                      ? selectedOption.label
                      : listing.gateType === '401k'
                        ? 'Rippling 401(k)'
                        : listing.gateType === 'vendor-plan'
                          ? listing.vendorPlanLabel?.replace('Requires ', '') || 'Vendor plan'
                          : selectedOption.label
                    }
                  </ReviewValue>
                </ReviewRow>
                {isDualPricing && (
                  <ReviewRow>
                    <ReviewLabel>Includes</ReviewLabel>
                    <ReviewValue>{selectedOption.description}</ReviewValue>
                  </ReviewRow>
                )}
              </div>

              {isDualPricing && (
                <ReviewTotal>
                  <ReviewTotalLabel>Estimated cost</ReviewTotalLabel>
                  <ReviewTotalValue>
                    {selectedOption.price}
                    <ReviewTotalDetail>{selectedOption.priceDetail}</ReviewTotalDetail>
                  </ReviewTotalValue>
                </ReviewTotal>
              )}

              <ReviewNote>
                {isDualPricing
                  ? 'Final pricing depends on your employee count and billing cycle. Cancel anytime from Settings.'
                  : listing.gateType === 'vendor-plan'
                    ? 'This is a vendor-side requirement. Confirm your subscription tier directly with the vendor.'
                    : 'Your account manager will confirm pricing and timeline. Cancel anytime from Settings.'
                }
              </ReviewNote>
            </ReviewSection>
          )}

          {/* ─── Step 3: Confirm ─── */}
          {step === 'confirm' && (
            <ReviewSection>
              <div style={{
                padding: '20px',
                background: SURFACE_INSET,
                borderRadius: '12px',
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 8 }}>
                  Confirm your purchase
                </div>
                <div style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6 }}>
                  {isDualPricing ? (
                    <>You{'\u2019'}re adding <strong style={{ fontWeight: 500, color: TEXT_PRIMARY }}>{selectedOption.label}</strong> to your Rippling plan. The {selectedOption.price} {selectedOption.priceDetail} charge will appear on your next invoice.</>
                  ) : listing.gateType === '401k' ? (
                    <>You{'\u2019'}re adding the <strong style={{ fontWeight: 500, color: TEXT_PRIMARY }}>Rippling 401(k)</strong> package to your plan. Your account manager will confirm pricing.</>
                  ) : listing.gateType === 'vendor-plan' ? (
                    <>You{'\u2019'}ve confirmed your <strong style={{ fontWeight: 500, color: TEXT_PRIMARY }}>{listing.vendorPlanLabel?.replace('Requires ', '')}</strong> subscription. Proceeding to connect {listing.name}.</>
                  ) : (
                    <>Confirming your selection.</>
                  )}
                </div>
              </div>

              {isDualPricing && (
                <ReviewTotal>
                  <ReviewTotalLabel>Total</ReviewTotalLabel>
                  <ReviewTotalValue>
                    {selectedOption.price}
                    <ReviewTotalDetail>{selectedOption.priceDetail}</ReviewTotalDetail>
                  </ReviewTotalValue>
                </ReviewTotal>
              )}
            </ReviewSection>
          )}

          {/* ─── Step 4: Success ─── */}
          {step === 'success' && (
            <SuccessContainer>
              <SuccessIcon>
                <CheckIconLarge />
              </SuccessIcon>
              <SuccessTitle>
                {isDualPricing
                  ? `${selectedOption.label} is now active`
                  : listing.gateType === '401k'
                    ? 'Rippling 401(k) is now active'
                    : listing.gateType === 'vendor-plan'
                      ? `${listing.name} is ready`
                      : 'You\u2019re all set'
                }
              </SuccessTitle>
              <SuccessMessage>
                {isDualPricing ? (
                  selectedPlan === 'third-party'
                    ? `You can now connect ${listing.name}. Your subscription covers this integration at ${selectedOption.price} ${selectedOption.priceDetail}.`
                    : `You now have full Identity & Access Management. Connect any of the 600+ supported integrations at no additional cost.`
                ) : listing.gateType === '401k' ? (
                  `The 401(k) package has been added to your plan. You can now connect ${listing.name}.`
                ) : listing.gateType === 'vendor-plan' ? (
                  `Your vendor subscription has been confirmed. You can now connect ${listing.name}.`
                ) : (
                  `You can now connect ${listing.name}.`
                )}
              </SuccessMessage>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                <NextStepCard>
                  <NextStepIcon>{listing.icon}</NextStepIcon>
                  <NextStepContent>
                    <NextStepTitle>Install {listing.name}</NextStepTitle>
                    <NextStepDesc>Continue to configure your integration</NextStepDesc>
                  </NextStepContent>
                  <ArrowRight />
                </NextStepCard>
                {isDualPricing && selectedPlan === 'full-iam' && (
                  <NextStepCard>
                    <NextStepIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEXT_TERTIARY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M3 9h18" />
                        <path d="M9 21V9" />
                      </svg>
                    </NextStepIcon>
                    <NextStepContent>
                      <NextStepTitle>Browse App Shop</NextStepTitle>
                      <NextStepDesc>600+ integrations now available</NextStepDesc>
                    </NextStepContent>
                    <ArrowRight />
                  </NextStepCard>
                )}
              </div>
            </SuccessContainer>
          )}
        </FlowBody>

        {step !== 'success' ? (
          <FlowFooter>
            {currentStepIndex > 0 ? (
              <FlowButton variant="ghost" onClick={handleBack}>
                <ArrowLeft />
                Back
              </FlowButton>
            ) : (
              <FlowButton variant="ghost" onClick={handleClose}>
                Cancel
              </FlowButton>
            )}
            <FlowButton
              variant={listing.gateType === 'conflict' ? 'secondary' : 'primary'}
              onClick={listing.gateType === 'conflict' ? undefined : handleNext}
              style={listing.gateType === 'conflict' ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              {step === 'confirm'
                ? 'Confirm & activate'
                : step === 'review'
                  ? 'Confirm'
                  : listing.gateType === 'conflict'
                    ? 'Blocked'
                    : 'Continue'
              }
            </FlowButton>
          </FlowFooter>
        ) : (
          <FlowFooter>
            <div />
            <FlowButton variant="primary" onClick={handleClose}>
              Done
            </FlowButton>
          </FlowFooter>
        )}
      </FlowContainer>
    </Overlay>
  );
};

export default PurchaseFlow;
