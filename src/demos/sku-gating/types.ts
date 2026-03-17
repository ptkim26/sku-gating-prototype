/**
 * SKU Gating Demo — Type definitions
 *
 * Models the gate types, pricing paths, listing states,
 * and the three solution tiers from the strategy brief.
 */

/* ─── Solution tiers ─── */

export type SolutionTier = 'quick-win' | 'medium-lift' | 'aspirational';

/* ─── Gate types (the 5 patterns from the audit) ─── */

export type GateType =
  | 'iam'               // Pattern 1 — Rippling IAM required (dual-path eligible)
  | '401k'              // Pattern 1 — Rippling 401k required (single-path)
  | 'vendor-plan'       // Pattern 3 — Third-party vendor plan required
  | 'unpurchased-sku'   // Pattern 2 — Redirect to unpurchased SKU page
  | 'direct-purchase'   // Pattern 4 — Redirect to purchase flow
  | 'conflict'          // Pattern 5 — Conflicting app installed
  | 'none';             // No gate — user can install freely

/* ─── Pricing option shown in the gate modal ─── */

export interface PricingOption {
  id: 'third-party' | 'full-iam';
  label: string;
  description: string;
  price: string;
  priceDetail: string;
  ctaLabel: string;
  recommended?: boolean;
  features?: string[];
}

/* ─── Integration listing ─── */

export interface IntegrationListing {
  id: string;
  name: string;
  icon: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: string;
  url: string;
  description: string;
  gateType: GateType;
  gateLabel?: string;
  vendorPlanLabel?: string;
  conflictApp?: string;
  supportsDualPricing: boolean;
  capabilities: string[];
  isRipplingChoice?: boolean;
  // Medium lift additions
  requirements?: RequirementItem[];
  // Aspirational additions
  currentAppsInstalled?: number;
  recommendedTier?: 'third-party' | 'full-iam';
  estimatedSavings?: string;
}

/* ─── Requirements section (Medium Lift) ─── */

export interface RequirementItem {
  type: 'rippling-sku' | 'vendor-plan' | 'conflict';
  label: string;
  status: 'required' | 'met' | 'conflict';
  detail?: string;
  pricing?: {
    options: PricingOption[];
    breakeven?: string;
  };
}

/* ─── Purchase flow (Aspirational) ─── */

export type PurchaseStep = 'select-plan' | 'review' | 'confirm' | 'success';

export interface PurchaseState {
  step: PurchaseStep;
  selectedPlan: 'third-party' | 'full-iam' | null;
  listing: IntegrationListing;
}

/* ─── Demo scenario presets ─── */

export interface DemoScenario {
  id: string;
  label: string;
  description: string;
  listingId: string;
}
