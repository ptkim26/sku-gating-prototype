/**
 * Mock Data for Integration Overview Prototypes
 *
 * Generic "WorkspaceApp" integration with 6 capabilities and 3 connections.
 * Four scenario presets drive the HUD.
 */

import { Capability, Connection, ScenarioPreset, CapabilityState } from './types';
import { ConnectionState } from '../connection-status/types';

/** Default capabilities for WorkspaceApp */
export const DEFAULT_CAPABILITIES: Capability[] = [
  {
    id: 'sso',
    name: 'Single sign-on (SSO)',
    description: 'Let people sign in to WorkspaceApp using their Rippling credentials.',
    valueDescription: 'One-click access with no separate password to manage',
    state: 'not_started',
    connectionDeps: ['oauth'],
    adoptionPercent: 91,
    estimatedSetupMinutes: 5,
  },
  {
    id: 'user-provisioning',
    name: 'User provisioning',
    description: 'Automatically create, update, and deactivate WorkspaceApp accounts when people join, change roles, or leave.',
    valueDescription: 'Automatically remove access when someone leaves',
    state: 'not_started',
    connectionDeps: ['oauth', 'scim'],
    adoptionPercent: 87,
    estimatedSetupMinutes: 10,
  },
  {
    id: 'group-sync',
    name: 'Group sync',
    description: 'Keep WorkspaceApp groups in sync with Rippling teams, departments, and custom groups.',
    valueDescription: 'Groups stay up to date without manual maintenance',
    state: 'not_started',
    connectionDeps: ['scim'],
    adoptionPercent: 64,
    estimatedSetupMinutes: 8,
  },
  {
    id: 'data-import',
    name: 'Data import',
    description: 'Import WorkspaceApp data into Rippling for reporting and workflow triggers.',
    valueDescription: 'Unified reporting across all your tools',
    state: 'not_started',
    connectionDeps: ['api-key'],
    adoptionPercent: 72,
    estimatedSetupMinutes: 5,
  },
  {
    id: 'workflows',
    name: 'Workflows',
    description: 'Enable WorkspaceApp as an action in Workflow Studio to automate tasks triggered by Rippling events.',
    valueDescription: 'Automate onboarding, offboarding, and role changes',
    state: 'not_started',
    connectionDeps: ['api-key'],
    adoptionPercent: 58,
    estimatedSetupMinutes: 3,
  },
  {
    id: 'license-management',
    name: 'License management',
    description: 'Track and optimize WorkspaceApp license usage across your organization.',
    valueDescription: 'Stop paying for unused seats',
    state: 'not_started',
    connectionDeps: ['oauth', 'api-key'],
    adoptionPercent: 45,
    estimatedSetupMinutes: 7,
  },
];

/** Default connections */
export const DEFAULT_CONNECTIONS: Connection[] = [
  {
    id: 'oauth',
    name: 'OAuth 2.0',
    state: 'connected',
    lastSyncTime: 'March 12, 2026 at 2:15 PM',
  },
  {
    id: 'api-key',
    name: 'API Key',
    state: 'connected',
    lastSyncTime: 'March 12, 2026 at 2:10 PM',
  },
  {
    id: 'scim',
    name: 'SCIM',
    state: 'connected',
    lastSyncTime: 'March 12, 2026 at 2:12 PM',
  },
];

/** Scenario presets */
export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'freshInstall',
    label: 'Fresh install',
    capabilities: {
      sso: 'not_started',
      'user-provisioning': 'not_started',
      'group-sync': 'not_started',
      'data-import': 'not_started',
      workflows: 'not_started',
      'license-management': 'not_started',
    },
    connections: {
      oauth: 'not-connected',
      'api-key': 'not-connected',
      scim: 'not-connected',
    },
    usageStats: {
      provisionedUsers: 0,
      objectsSynced: 0,
      lastSyncTime: 'Never',
      errorsLast24h: 0,
      pendingAccessRequests: 0,
    },
  },
  {
    id: 'partial',
    label: 'Partial',
    capabilities: {
      sso: 'active',
      'user-provisioning': 'active',
      'group-sync': 'partial',
      'data-import': 'not_started',
      workflows: 'active',
      'license-management': 'dismissed',
    },
    connections: {
      oauth: 'connected',
      'api-key': 'degraded',
      scim: 'connected',
    },
    partialProgress: {
      'group-sync': { completed: 2, total: 4 },
    },
    usageStats: {
      provisionedUsers: 342,
      objectsSynced: 12847,
      lastSyncTime: '2 minutes ago',
      errorsLast24h: 3,
      pendingAccessRequests: 12,
    },
  },
  {
    id: 'configured',
    label: 'Configured',
    capabilities: {
      sso: 'active',
      'user-provisioning': 'active',
      'group-sync': 'active',
      'data-import': 'active',
      workflows: 'active',
      'license-management': 'active',
    },
    connections: {
      oauth: 'connected',
      'api-key': 'connected',
      scim: 'connected',
    },
    usageStats: {
      provisionedUsers: 1204,
      objectsSynced: 58392,
      lastSyncTime: '30 seconds ago',
      errorsLast24h: 0,
      pendingAccessRequests: 0,
    },
  },
  {
    id: 'degraded',
    label: 'Degraded',
    capabilities: {
      sso: 'active',
      'user-provisioning': 'disconnected',
      'group-sync': 'disconnected',
      'data-import': 'active',
      workflows: 'active',
      'license-management': 'active',
    },
    connections: {
      oauth: 'connected',
      'api-key': 'connected',
      scim: 'disconnected',
    },
    usageStats: {
      provisionedUsers: 1204,
      objectsSynced: 58392,
      lastSyncTime: '3 hours ago',
      errorsLast24h: 47,
      pendingAccessRequests: 8,
    },
  },
];

/** Apply a scenario preset to capabilities and connections */
export function applyScenario(
  preset: ScenarioPreset,
  baseCaps: Capability[],
  baseConns: Connection[]
): { capabilities: Capability[]; connections: Connection[] } {
  const capabilities = baseCaps.map(cap => ({
    ...cap,
    state: (preset.capabilities[cap.id] || cap.state) as CapabilityState,
    partialProgress: preset.partialProgress?.[cap.id] || undefined,
  }));
  const connections = baseConns.map(conn => ({
    ...conn,
    state: (preset.connections[conn.id] || conn.state) as ConnectionState,
  }));
  return { capabilities, connections };
}

/** Icon mapping for capabilities */
export const CAPABILITY_ICONS: Record<string, string> = {
  sso: 'LOCK_OUTLINE',
  'user-provisioning': 'PEOPLE_TEAM_OUTLINE',
  'group-sync': 'PEOPLE_TEAM_OUTLINE',
  'data-import': 'IMPORT_OUTLINE',
  workflows: 'LIGHTNING_BOLT_OUTLINE',
  'license-management': 'SETTINGS_OUTLINE',
};
