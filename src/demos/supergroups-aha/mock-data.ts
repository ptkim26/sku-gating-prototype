/**
 * Mock Employee Data for Supergroups Aha Moment Prototypes
 *
 * Deliberately seeded with attribute clusters so detection logic
 * triggers naturally during demos:
 *  - 5 people in Engineering
 *  - 4 people in San Francisco
 *  - 3 hourly workers
 *  - 3 people reporting to same manager
 */

export interface Employee {
  id: string;
  name: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Hourly' | 'Contractor';
  manager: string;
  title: string;
}

export const EMPLOYEES: Employee[] = [
  // ── Engineering cluster (5) ────────────────────────────────────
  { id: 'e1', name: 'Alice Chen', department: 'Engineering', location: 'San Francisco, CA', employmentType: 'Full-time', manager: 'David Kim', title: 'Senior Software Engineer' },
  { id: 'e2', name: 'Hassan Ali', department: 'Engineering', location: 'San Francisco, CA', employmentType: 'Full-time', manager: 'David Kim', title: 'Backend Engineer' },
  { id: 'e3', name: 'James Park', department: 'Engineering', location: 'Portland, OR', employmentType: 'Full-time', manager: 'David Kim', title: 'Frontend Engineer' },
  { id: 'e4', name: 'Frank Weber', department: 'Engineering', location: 'Denver, CO', employmentType: 'Full-time', manager: 'David Kim', title: 'DevOps Engineer' },
  { id: 'e5', name: 'Nina Patel', department: 'Engineering', location: 'San Francisco, CA', employmentType: 'Full-time', manager: 'David Kim', title: 'QA Engineer' },

  // ── Product & Design ───────────────────────────────────────────
  { id: 'p1', name: 'Brian Johnson', department: 'Product', location: 'New York, NY', employmentType: 'Full-time', manager: 'Grace Liu', title: 'Product Manager' },
  { id: 'p2', name: 'Camila Rodriguez', department: 'Design', location: 'Austin, TX', employmentType: 'Full-time', manager: 'Grace Liu', title: 'UX Designer' },
  { id: 'p3', name: 'Priya Sharma', department: 'Design', location: 'New York, NY', employmentType: 'Contractor', manager: 'Grace Liu', title: 'Visual Designer' },

  // ── Sales ──────────────────────────────────────────────────────
  { id: 's1', name: 'Liam O\'Brien', department: 'Sales', location: 'Boston, MA', employmentType: 'Full-time', manager: 'Karen Nguyen', title: 'Sales Lead' },
  { id: 's2', name: 'Maria Santos', department: 'Sales', location: 'Chicago, IL', employmentType: 'Full-time', manager: 'Karen Nguyen', title: 'Account Executive' },
  { id: 's3', name: 'Derek Thompson', department: 'Sales', location: 'Boston, MA', employmentType: 'Full-time', manager: 'Karen Nguyen', title: 'Sales Development Rep' },

  // ── Hourly cluster (3) ─────────────────────────────────────────
  { id: 'h1', name: 'Tyler Brooks', department: 'Operations', location: 'San Francisco, CA', employmentType: 'Hourly', manager: 'Irene Santos', title: 'Operations Associate' },
  { id: 'h2', name: 'Sam Rivera', department: 'Operations', location: 'Austin, TX', employmentType: 'Hourly', manager: 'Irene Santos', title: 'Warehouse Coordinator' },
  { id: 'h3', name: 'Jordan Lee', department: 'Support', location: 'Denver, CO', employmentType: 'Hourly', manager: 'Irene Santos', title: 'Support Specialist' },

  // ── Finance & People ───────────────────────────────────────────
  { id: 'f1', name: 'Karen Nguyen', department: 'Finance', location: 'San Francisco, CA', employmentType: 'Full-time', manager: 'CEO', title: 'Finance Manager' },
  { id: 'f2', name: 'Irene Santos', department: 'People', location: 'San Francisco, CA', employmentType: 'Full-time', manager: 'CEO', title: 'HR Business Partner' },
  { id: 'f3', name: 'Elena Patel', department: 'Data', location: 'Seattle, WA', employmentType: 'Full-time', manager: 'CEO', title: 'Data Scientist' },

  // ── Marketing ──────────────────────────────────────────────────
  { id: 'm1', name: 'Grace Liu', department: 'Marketing', location: 'New York, NY', employmentType: 'Full-time', manager: 'CEO', title: 'Marketing Director' },
  { id: 'm2', name: 'Raj Mehta', department: 'Marketing', location: 'New York, NY', employmentType: 'Part-time', manager: 'Grace Liu', title: 'Content Strategist' },
];

/** Attribute keys we detect for aha-moment suggestions */
export type DetectableAttribute = 'department' | 'location' | 'employmentType' | 'manager';

export const ATTRIBUTE_LABELS: Record<DetectableAttribute, string> = {
  department: 'Department',
  location: 'Work Location',
  employmentType: 'Employment Type',
  manager: 'Manager',
};

/** Lookup map for fast employee retrieval by id */
export const EMPLOYEE_MAP = new Map(EMPLOYEES.map((e) => [e.id, e]));
