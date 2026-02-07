/**
 * Detection Utilities for Supergroups Aha Moments
 *
 * Pure functions that analyse a set of selected employees and identify
 * shared attribute clusters that meet a configurable threshold.
 */

import {
  Employee,
  EMPLOYEE_MAP,
  DetectableAttribute,
  ATTRIBUTE_LABELS,
} from './mock-data';

export interface AttributeCluster {
  /** Which attribute was detected (e.g. "department") */
  attribute: DetectableAttribute;
  /** Human-readable label (e.g. "Department") */
  attributeLabel: string;
  /** The shared value (e.g. "Engineering") */
  value: string;
  /** IDs of the selected employees that share this value */
  matchingIds: string[];
}

/**
 * Given a list of selected employee IDs, detect attribute clusters
 * where `threshold` or more people share the same attribute value.
 *
 * Returns clusters sorted by size (largest first).
 */
export function detectClusters(
  selectedIds: string[],
  threshold = 3,
): AttributeCluster[] {
  if (selectedIds.length < threshold) return [];

  const employees = selectedIds
    .map((id) => EMPLOYEE_MAP.get(id))
    .filter(Boolean) as Employee[];

  const attributes: DetectableAttribute[] = [
    'department',
    'location',
    'employmentType',
    'manager',
  ];

  const clusters: AttributeCluster[] = [];

  for (const attr of attributes) {
    // Group employees by attribute value
    const groups = new Map<string, string[]>();
    for (const emp of employees) {
      const val = emp[attr];
      if (!groups.has(val)) groups.set(val, []);
      groups.get(val)!.push(emp.id);
    }

    // Keep groups that meet the threshold
    for (const [value, ids] of groups) {
      if (ids.length >= threshold) {
        clusters.push({
          attribute: attr,
          attributeLabel: ATTRIBUTE_LABELS[attr],
          value,
          matchingIds: ids,
        });
      }
    }
  }

  // Sort by cluster size descending
  clusters.sort((a, b) => b.matchingIds.length - a.matchingIds.length);

  return clusters;
}

/**
 * Build a human-readable suggestion string for a cluster.
 * e.g. "3 people are in Engineering"
 */
export function clusterToSuggestionText(cluster: AttributeCluster): string {
  const count = cluster.matchingIds.length;
  const noun = count === 1 ? 'person is' : 'people are';

  switch (cluster.attribute) {
    case 'department':
      return `${count} ${noun} in ${cluster.value}`;
    case 'location':
      return `${count} ${noun} in ${cluster.value}`;
    case 'employmentType':
      return `${count} ${noun} ${cluster.value}`;
    case 'manager':
      return `${count} ${noun} reporting to ${cluster.value}`;
    default:
      return `${count} ${noun} sharing ${cluster.attributeLabel}: ${cluster.value}`;
  }
}

/**
 * Build a short rule label for a chip, e.g. "Department: Engineering"
 */
export function clusterToRuleLabel(cluster: AttributeCluster): string {
  return `${cluster.attributeLabel}: ${cluster.value}`;
}
