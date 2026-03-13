/**
 * Integration Overview Types
 *
 * Data model for the capabilities page prototypes.
 * Reuses ConnectionState from the connection-status demo.
 */

import { ConnectionState } from '../connection-status/types';

export type { ConnectionState };

/** State a capability can be in */
export type CapabilityState = 'not_started' | 'partial' | 'active' | 'disconnected' | 'dismissed';

/** A single capability (e.g., SSO, User Provisioning) */
export interface Capability {
  id: string;
  name: string;
  description: string;
  valueDescription: string;
  state: CapabilityState;
  connectionDeps: string[];
  adoptionPercent: number;
  estimatedSetupMinutes: number;
  partialProgress?: { completed: number; total: number };
}

/** A connection reused from connection-status but simplified */
export interface Connection {
  id: string;
  name: string;
  state: ConnectionState;
  lastSyncTime?: string;
}

/** Usage stats shown on the overview */
export interface UsageStats {
  provisionedUsers: number;
  objectsSynced: number;
  lastSyncTime: string;
  errorsLast24h: number;
  pendingAccessRequests: number;
}

/** A scenario preset that sets all states at once */
export interface ScenarioPreset {
  id: string;
  label: string;
  capabilities: Record<string, CapabilityState>;
  connections: Record<string, ConnectionState>;
  partialProgress?: Record<string, { completed: number; total: number }>;
  usageStats: UsageStats;
}

/** Which surface is active */
export type Surface = 'overview' | 'capabilities';

/** Which concept variant is active */
export type ConceptId = '1' | '2';

/** Aggregate capability health */
export interface CapabilityHealth {
  /** Total capabilities including dismissed */
  total: number;
  /** Total capabilities the user has opted into (excludes dismissed) */
  selected: number;
  active: number;
  partial: number;
  notStarted: number;
  disconnected: number;
  dismissed: number;
}

export function getCapabilityHealth(capabilities: Capability[]): CapabilityHealth {
  const health: CapabilityHealth = {
    total: capabilities.length,
    selected: 0,
    active: 0,
    partial: 0,
    notStarted: 0,
    disconnected: 0,
    dismissed: 0,
  };
  for (const cap of capabilities) {
    switch (cap.state) {
      case 'active':
        health.active++;
        break;
      case 'partial':
        health.partial++;
        break;
      case 'not_started':
        health.notStarted++;
        break;
      case 'disconnected':
        health.disconnected++;
        break;
      case 'dismissed':
        health.dismissed++;
        break;
    }
  }
  health.selected = health.total - health.dismissed;
  return health;
}

/** Get the worst connection state from a list */
export function getWorstConnectionState(connections: Connection[]): ConnectionState {
  const states = connections.map(c => c.state);
  if (states.includes('disconnected')) return 'disconnected';
  if (states.includes('degraded')) return 'degraded';
  if (states.includes('not-connected')) return 'not-connected';
  return 'connected';
}

/** Get connections that a capability depends on */
export function getConnectionsForCapability(
  capability: Capability,
  connections: Connection[]
): Connection[] {
  return connections.filter(c => capability.connectionDeps.includes(c.id));
}
