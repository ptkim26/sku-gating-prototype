/**
 * Mock Data for Connection Status Prototype
 *
 * Models the Slack integration with three connection types
 * and four feature blocks, matching the Figma designs.
 */

import { Connection, Feature, TabDefinition } from './types';

/** Default connections matching the Figma Administration page */
export const DEFAULT_CONNECTIONS: Connection[] = [
  {
    id: 'oauth',
    name: 'OAuth 2.0',
    description:
      'OAuth 2.0 uses a pre-built Slack app to connect Rippling to your Slack account. Approve the permissions the app requests in Slack to allow Rippling to sync data on your behalf.',
    state: 'connected',
    featureIds: ['assign-users', 'sso'],
    usedFor: 'Import data, build workflows',
    setupBy: 'Callen Raveret',
    connectedTo: 'pixar.com',
    lastConnectedOn: 'September 26, 2025 at 3:04 PM',
  },
  {
    id: 'api-key',
    name: 'API Key',
    description:
      'API keys are generated in Slack and added to Rippling to connect the two systems. Create the key in Slack with the required permissions, then add it to Rippling to allow data to sync automatically.',
    state: 'connected',
    featureIds: ['build-workflows'],
    usedFor: 'Build workflows',
    setupBy: 'Callen Raveret',
    connectedTo: 'Token ending in 1234',
    lastConnectedOn: 'September 26, 2025 at 3:04 PM',
  },
  {
    id: 'scim',
    name: 'SCIM (System for Cross-domain Identity Management)',
    description:
      'SCIM is the standard protocol identity providers (IdPs) use to sync data. When connected, Rippling uses SCIM to automatically create, update, and deactivate users and groups in your Slack account.',
    state: 'connected',
    featureIds: ['assign-users', 'manage-groups'],
    usedFor: 'Assign users access, manage groups',
    setupBy: 'Callen Raveret',
    connectedTo: 'pixar.com',
    lastConnectedOn: 'September 26, 2025 at 3:04 PM',
  },
];

/** Features matching the Figma "Your configuration" section */
export const FEATURES: Feature[] = [
  {
    id: 'assign-users',
    name: 'Assign users access',
    description:
      'Automatically assign and remove Slack access based on changes in Rippling. Define access rules once, and Rippling keeps Slack users up to date as people join, change roles, or leave.',
    tab: 'access',
    isEnabled: false,
  },
  {
    id: 'manage-groups',
    name: 'Manage groups',
    description:
      'Automatically manage Slack group membership using employee attributes in Rippling. Define group rules once, and Rippling adds and removes people from the right groups as roles, teams, or locations change.',
    tab: 'access',
    isEnabled: false,
  },
  {
    id: 'sso',
    name: 'Sign in with SSO',
    description:
      'Let people sign in to Slack using their Rippling credentials. Configure single sign-on once, and Rippling will handle authentication and keep sign-in access aligned as people join, change roles, or leave.',
    tab: 'access',
    isEnabled: false,
  },
  {
    id: 'build-workflows',
    name: 'Build workflows',
    description:
      'Enable Slack as an action in Workflow Studio so workflows can send messages automatically when changes occur in Rippling. Once enabled, Slack actions are available in any workflow you build.',
    tab: 'workflows',
    isEnabled: false,
  },
];

/** Tab definitions matching the Figma navbar */
export const TABS: TabDefinition[] = [
  { id: 'overview', label: 'Overview', connectionIds: [] },
  { id: 'access', label: 'Access', connectionIds: ['oauth', 'scim'] },
  { id: 'workflows', label: 'Workflows', connectionIds: ['api-key'] },
  { id: 'administration', label: 'Administration', connectionIds: [] },
];

/** Admin sidebar nav items matching the Figma */
export const ADMIN_NAV_ITEMS = [
  { id: 'connections', label: 'Connections', isActive: true },
  { id: 'mapping', label: 'Mapping', isActive: false },
  { id: 'configuration', label: 'Configuration', isActive: false },
  { id: 'notifications', label: 'Notifications', isActive: false },
  { id: 'app-shop-requests', label: 'App Shop requests', isActive: false },
  { id: 'submit-feedback', label: 'Submit feedback', isActive: false },
  { id: 'admin-access', label: 'Admin access', isActive: false },
];

/** Quick action links for the overview */
export const ACTION_LINKS = [
  { label: 'Open Slack Workspace', subtitle: 'Go to admin.slack.com', icon: 'OPEN_IN_NEW_OUTLINE' },
  { label: 'Build a workflow', subtitle: 'Trigger app actions', icon: 'LIGHTNING_BOLT_OUTLINE' },
  { label: 'Review Slack users', subtitle: 'Map users data to people', icon: 'PEOPLE_TEAM_OUTLINE' },
];
