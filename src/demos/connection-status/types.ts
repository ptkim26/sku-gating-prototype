/**
 * Connection Status Types
 *
 * Defines the four-state taxonomy for integration connections
 * and the dependency model mapping connections to features.
 */

/** The four states a connection can be in */
export type ConnectionState = 'connected' | 'degraded' | 'disconnected' | 'not-connected';

/** A single connection (e.g., OAuth 2.0, API Key, SCIM) */
export interface Connection {
  id: string;
  name: string;
  description: string;
  state: ConnectionState;
  /** Features powered by this connection */
  featureIds: string[];
  /** Metadata */
  usedFor: string;
  setupBy: string;
  connectedTo: string;
  lastConnectedOn: string;
  /** Optional degradation reason */
  degradedReason?: string;
}

/** A feature block (e.g., Assign users access, Build workflows) */
export interface Feature {
  id: string;
  name: string;
  description: string;
  learnMoreUrl?: string;
  /** Which tab this feature appears on */
  tab: 'access' | 'workflows';
  /** Whether this feature has been set up */
  isEnabled: boolean;
}

/** Tab definition with connection dependency tracking */
export interface TabDefinition {
  id: string;
  label: string;
  /** Connection IDs that power features on this tab */
  connectionIds: string[];
}

/** Aggregate connection health summary */
export interface ConnectionHealth {
  total: number;
  connected: number;
  degraded: number;
  disconnected: number;
  notConnected: number;
  worstState: ConnectionState;
}

/** Helper to compute aggregate health from a list of connections */
export function getConnectionHealth(connections: Connection[]): ConnectionHealth {
  const health: ConnectionHealth = {
    total: connections.length,
    connected: 0,
    degraded: 0,
    disconnected: 0,
    notConnected: 0,
    worstState: 'connected',
  };

  for (const conn of connections) {
    switch (conn.state) {
      case 'connected':
        health.connected++;
        break;
      case 'degraded':
        health.degraded++;
        break;
      case 'disconnected':
        health.disconnected++;
        break;
      case 'not-connected':
        health.notConnected++;
        break;
    }
  }

  // Determine worst state (priority: disconnected > degraded > not-connected > connected)
  if (health.disconnected > 0) health.worstState = 'disconnected';
  else if (health.degraded > 0) health.worstState = 'degraded';
  else if (health.notConnected > 0) health.worstState = 'not-connected';
  else health.worstState = 'connected';

  return health;
}

/** Get the active connection count (connected + degraded) */
export function getActiveCount(health: ConnectionHealth): number {
  return health.connected + health.degraded;
}

/** Get connections that affect a specific tab */
export function getConnectionsForTab(
  connections: Connection[],
  features: Feature[],
  tabId: string
): Connection[] {
  const tabFeatureIds = features.filter(f => f.tab === tabId).map(f => f.id);
  return connections.filter(c => c.featureIds.some(fid => tabFeatureIds.includes(fid)));
}

/** Get the worst connection state for a tab */
export function getTabWarningState(
  connections: Connection[],
  features: Feature[],
  tabId: string
): ConnectionState | null {
  const tabConnections = getConnectionsForTab(connections, features, tabId);
  const states = tabConnections.map(c => c.state);

  if (states.includes('disconnected')) return 'disconnected';
  if (states.includes('degraded')) return 'degraded';
  return null;
}
