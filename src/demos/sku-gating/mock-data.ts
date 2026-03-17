/**
 * SKU Gating Demo — Mock data
 *
 * Five integrations covering the real gate types from the strategy brief.
 * Examples use actual integrations from the research data.
 */

import { IntegrationListing, DemoScenario, PricingOption } from './types';

/* ─── Pricing options (shared) ─── */

export const THIRD_PARTY_OPTION: PricingOption = {
  id: 'third-party',
  label: 'Third Party IdP',
  description: 'Connect this integration only. Pay per app, cancel anytime.',
  price: '~$2',
  priceDetail: 'PEPM / integration',
  ctaLabel: 'Add this integration',
  recommended: true,
  features: [
    'Single app provisioning',
    'Basic SSO (SAML)',
    'Pay only for what you use',
    'Cancel anytime',
  ],
};

export const FULL_IAM_OPTION: PricingOption = {
  id: 'full-iam',
  label: 'Full Identity & Access',
  description: 'Provisioning, SSO, and password management across 600+ integrations.',
  price: '~$8\u201310',
  priceDetail: 'PEPM, all apps',
  ctaLabel: 'Add full IAM package',
  features: [
    'Provisioning & de-provisioning',
    'Single Sign-On (SAML & OIDC)',
    'Password management',
    '600+ integrations included',
    'Activity Stream & audit trail',
    'Custom security policies',
  ],
};

export const BREAKEVEN_MESSAGE = 'Connecting 4+ apps? Full IAM is better value at that point.';

/* ─── Integration listings ─── */

export const LISTINGS: IntegrationListing[] = [
  // IAM gate — dual pricing (from brief: 4.6k reviews, Rippling's Choice)
  {
    id: 'netsuite',
    name: 'NetSuite',
    icon: '\uD83D\uDFE6',
    category: 'Finance & Legal',
    subcategory: 'ERP',
    rating: 4,
    reviewCount: '4.6k',
    url: 'https://www.netsuite.com/',
    description: 'NetSuite is the leading integrated cloud business software suite, including business accounting, ERP, CRM, and ecommerce software.',
    gateType: 'iam',
    gateLabel: 'Rippling Identity & Access Management required',
    supportsDualPricing: true,
    capabilities: [
      'Account provisioning & de-provisioning',
      'Subsidiary, department & location sync',
      'Payroll journal entry integration',
      'Custom schema mapping',
      'Role-based access control',
      'Audit trail & compliance logging',
    ],
    isRipplingChoice: true,
    requirements: [
      {
        type: 'rippling-sku',
        label: 'Identity & Access Management',
        status: 'required',
        detail: 'Required for account provisioning and SSO',
        pricing: {
          options: [THIRD_PARTY_OPTION, FULL_IAM_OPTION],
          breakeven: '4 integrations',
        },
      },
    ],
    currentAppsInstalled: 6,
    recommendedTier: 'full-iam',
    estimatedSavings: '$4/mo per employee',
  },
  // IAM gate — dual pricing (from brief: 569 customers with Carta installed, no IAM)
  {
    id: 'carta',
    name: 'Carta',
    icon: '\uD83D\uDCCA',
    category: 'Finance & Legal',
    subcategory: 'Equity Management',
    rating: 4,
    reviewCount: '1.8k',
    url: 'https://carta.com/',
    description: 'Carta helps companies and investors manage equity, fund administration, and valuations in one platform.',
    gateType: 'iam',
    gateLabel: 'Rippling Identity & Access Management required',
    supportsDualPricing: true,
    capabilities: [
      'User provisioning & de-provisioning',
      'Single Sign-On (SAML)',
      'Equity plan sync',
      'Employee onboarding automation',
    ],
    requirements: [
      {
        type: 'rippling-sku',
        label: 'Identity & Access Management',
        status: 'required',
        detail: 'Required for user provisioning and SSO',
        pricing: {
          options: [THIRD_PARTY_OPTION, FULL_IAM_OPTION],
          breakeven: '4 integrations',
        },
      },
    ],
    currentAppsInstalled: 2,
    recommendedTier: 'third-party',
    estimatedSavings: '$6/mo per employee',
  },
  // IAM gate — dual pricing (from brief: 362 customers with Greenhouse installed, no IAM)
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    icon: '\uD83C\uDF31',
    category: 'Human Resources',
    subcategory: 'Recruiting',
    rating: 4,
    reviewCount: '3.2k',
    url: 'https://www.greenhouse.com/',
    description: 'Greenhouse is the hiring operating system for people-first companies. Structured hiring, from sourcing to onboarding.',
    gateType: 'iam',
    gateLabel: 'Rippling Identity & Access Management required',
    supportsDualPricing: true,
    capabilities: [
      'User provisioning & de-provisioning',
      'Single Sign-On (SAML)',
      'New hire sync to Rippling',
      'Offer letter automation',
    ],
    requirements: [
      {
        type: 'rippling-sku',
        label: 'Identity & Access Management',
        status: 'required',
        detail: 'Required for user provisioning and SSO',
        pricing: {
          options: [THIRD_PARTY_OPTION, FULL_IAM_OPTION],
          breakeven: '4 integrations',
        },
      },
    ],
    currentAppsInstalled: 1,
    recommendedTier: 'third-party',
    estimatedSavings: '$7/mo per employee',
  },
  // 401k gate — single path
  {
    id: 'money-intelligence',
    name: 'Money Intelligence',
    icon: '\uD83D\uDCC8',
    category: 'Human Resources',
    subcategory: '401k & Pensions',
    rating: 5,
    reviewCount: '890',
    url: '#',
    description: 'Money Intelligence offers 401(k) made easy through simple, affordable plans with automatic compliance and investment management.',
    gateType: '401k',
    gateLabel: 'Rippling 401(k) required',
    supportsDualPricing: false,
    capabilities: [
      '401(k) plan management',
      'Employee enrollment & onboarding',
      'Contribution tracking & reporting',
    ],
    requirements: [
      {
        type: 'rippling-sku',
        label: 'Rippling 401(k)',
        status: 'required',
        detail: 'Required for plan management and enrollment sync',
      },
    ],
  },
  // Vendor plan gate — third-party tier requirement
  {
    id: 'bitwarden',
    name: 'Bitwarden',
    icon: '\uD83D\uDD10',
    category: 'Security',
    subcategory: 'Password Management',
    rating: 4,
    reviewCount: '2.1k',
    url: 'https://bitwarden.com/',
    description: 'Bitwarden is an open-source password manager that stores sensitive information in an encrypted vault across all devices.',
    gateType: 'vendor-plan',
    gateLabel: 'Requires Bitwarden Enterprise plan',
    vendorPlanLabel: 'Requires Enterprise plan',
    supportsDualPricing: false,
    capabilities: [
      'SSO integration',
      'Directory sync',
      'Vault management & policies',
    ],
    requirements: [
      {
        type: 'vendor-plan',
        label: 'Bitwarden Enterprise',
        status: 'required',
        detail: 'Your Bitwarden subscription must be Enterprise tier or above',
      },
    ],
  },
  // No gate — free to install
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    icon: '\uD83D\uDD35',
    category: 'Productivity',
    subcategory: 'Collaboration',
    rating: 5,
    reviewCount: '18.7k',
    url: 'https://workspace.google.com/',
    description: 'Google Workspace provides email, shared calendars, docs, and video meetings for teams of all sizes.',
    gateType: 'none',
    supportsDualPricing: false,
    capabilities: [
      'User provisioning & de-provisioning',
      'Single Sign-On (SAML)',
      'Calendar & Drive sync',
      'Group membership management',
    ],
    requirements: [],
  },
];

/* ─── Scenario presets ─── */

export const SCENARIOS: DemoScenario[] = [
  {
    id: 'iam-netsuite',
    label: 'IAM \u2014 dual pricing',
    description: 'Both $2 and $8 paths (NetSuite)',
    listingId: 'netsuite',
  },
  {
    id: 'iam-carta',
    label: 'IAM \u2014 dual pricing',
    description: 'Equity management (Carta)',
    listingId: 'carta',
  },
  {
    id: 'iam-greenhouse',
    label: 'IAM \u2014 dual pricing',
    description: 'Recruiting (Greenhouse)',
    listingId: 'greenhouse',
  },
  {
    id: '401k-single',
    label: '401(k) \u2014 single path',
    description: 'One SKU, no alternatives (Money Intelligence)',
    listingId: 'money-intelligence',
  },
  {
    id: 'vendor-plan',
    label: 'Vendor plan gate',
    description: 'Third-party tier requirement (Bitwarden)',
    listingId: 'bitwarden',
  },
  {
    id: 'no-gate',
    label: 'No gate',
    description: 'Free install, no requirements (Google Workspace)',
    listingId: 'google-workspace',
  },
];

export const DEFAULT_LISTING_ID = 'netsuite';
