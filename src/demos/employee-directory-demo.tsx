import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Avatar from '@rippling/pebble/Avatar';
import Input from '@rippling/pebble/Inputs';
import Card from '@rippling/pebble/Card';
import Label from '@rippling/pebble/Label';
import Tip from '@rippling/pebble/Tip';
import { HStack, VStack } from '@rippling/pebble/Layout/Stack';
import { AppShellLayout, NavSectionData } from '@/components/app-shell';

/**
 * Employee Directory Demo
 *
 * Shows a searchable directory of employees with avatars, names, and job titles.
 * Built using Pebble components: Avatar, Card, Input.Text, Label, HStack/VStack.
 *
 * Components used:
 * - AppShellLayout (src/components/app-shell)
 * - Avatar (@rippling/pebble/Avatar)
 * - Card (@rippling/pebble/Card)
 * - Input.Text (@rippling/pebble/Inputs)
 * - Label (@rippling/pebble/Label)
 * - Button (@rippling/pebble/Button)
 * - Icon (@rippling/pebble/Icon)
 * - Tip (@rippling/pebble/Tip)
 * - HStack, VStack (@rippling/pebble/Layout/Stack)
 */

// ── Mock data ──────────────────────────────────────────────────────────────────

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
  avatarUrl?: string;
  status: 'active' | 'away' | 'offline';
}

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Chen', title: 'Senior Software Engineer', department: 'Engineering', location: 'San Francisco, CA', email: 'alice.chen@acme.com', status: 'active' },
  { id: '2', name: 'Brian Johnson', title: 'Product Manager', department: 'Product', location: 'New York, NY', email: 'brian.j@acme.com', status: 'active' },
  { id: '3', name: 'Camila Rodriguez', title: 'UX Designer', department: 'Design', location: 'Austin, TX', email: 'camila.r@acme.com', status: 'away' },
  { id: '4', name: 'David Kim', title: 'Engineering Manager', department: 'Engineering', location: 'San Francisco, CA', email: 'david.kim@acme.com', status: 'active' },
  { id: '5', name: 'Elena Patel', title: 'Data Scientist', department: 'Data', location: 'Seattle, WA', email: 'elena.p@acme.com', status: 'offline' },
  { id: '6', name: 'Frank Weber', title: 'DevOps Engineer', department: 'Engineering', location: 'Denver, CO', email: 'frank.w@acme.com', status: 'active' },
  { id: '7', name: 'Grace Liu', title: 'Marketing Director', department: 'Marketing', location: 'New York, NY', email: 'grace.l@acme.com', status: 'active' },
  { id: '8', name: 'Hassan Ali', title: 'Backend Engineer', department: 'Engineering', location: 'Chicago, IL', email: 'hassan.a@acme.com', status: 'away' },
  { id: '9', name: 'Irene Santos', title: 'HR Business Partner', department: 'People', location: 'San Francisco, CA', email: 'irene.s@acme.com', status: 'active' },
  { id: '10', name: 'James Park', title: 'Frontend Engineer', department: 'Engineering', location: 'Portland, OR', email: 'james.p@acme.com', status: 'active' },
  { id: '11', name: 'Karen Nguyen', title: 'Finance Manager', department: 'Finance', location: 'San Francisco, CA', email: 'karen.n@acme.com', status: 'offline' },
  { id: '12', name: 'Liam O\'Brien', title: 'Sales Lead', department: 'Sales', location: 'Boston, MA', email: 'liam.o@acme.com', status: 'active' },
];

const DEPARTMENTS = ['All', ...Array.from(new Set(EMPLOYEES.map((e) => e.department)))];

// ── Styled components ──────────────────────────────────────────────────────────

const DirectoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
  flex-wrap: wrap;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const PageTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const EmployeeCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  min-width: 280px;
  flex: 1;
  max-width: 400px;
`;

const DepartmentChips = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  flex-wrap: wrap;
`;

const DepartmentChip = styled.button<{ isActive: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? (theme as StyledTheme).colorPrimary : (theme as StyledTheme).colorOutlineVariant};
  background-color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorPrimaryContainer : 'transparent'};
  color: ${({ theme, isActive }) =>
    isActive ? (theme as StyledTheme).colorOnPrimaryContainer : (theme as StyledTheme).colorOnSurfaceVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: ${({ theme }) => (theme as StyledTheme).space100} ${({ theme }) => (theme as StyledTheme).space300};
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const EmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const EmployeeCardWrapper = styled.div`
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  flex: 1;
  min-width: 0;
`;

const EmployeeName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const EmployeeTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const MetaText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const StatusDot = styled.span<{ status: Employee['status'] }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'active':
        return (theme as StyledTheme).colorSuccess;
      case 'away':
        return (theme as StyledTheme).colorWarning;
      default:
        return (theme as StyledTheme).colorOutline;
    }
  }};
  flex-shrink: 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => (theme as StyledTheme).space1600};
  text-align: center;
`;

const EmptyTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin-top: ${({ theme }) => (theme as StyledTheme).space400};
`;

const EmptySubtitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

// ── Component ──────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<Employee['status'], string> = {
  active: 'Active',
  away: 'Away',
  offline: 'Offline',
};

const EmployeeDirectoryDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDepartment, setActiveDepartment] = useState('All');

  // ── Navigation config (matches app-shell-template) ──
  const orgChartSection: NavSectionData = {
    items: [
      { id: 'org-chart', label: 'Org Chart', icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE },
    ],
  };

  const appsSection: NavSectionData = {
    items: [
      { id: 'favorites', label: 'Favorites', icon: Icon.TYPES.STAR_OUTLINE, hasSubmenu: true },
      { id: 'time', label: 'Time', icon: Icon.TYPES.TIME_OUTLINE, hasSubmenu: true },
      { id: 'benefits', label: 'Benefits', icon: Icon.TYPES.HEART_OUTLINE, hasSubmenu: true },
      { id: 'payroll', label: 'Payroll', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, hasSubmenu: true },
      { id: 'finance', label: 'Finance', icon: Icon.TYPES.CREDIT_CARD_OUTLINE, hasSubmenu: true },
      { id: 'talent', label: 'Talent', icon: Icon.TYPES.TALENT_OUTLINE, hasSubmenu: true },
      { id: 'it', label: 'IT', icon: Icon.TYPES.LAPTOP_OUTLINE, hasSubmenu: true },
      { id: 'data', label: 'Data', icon: Icon.TYPES.BAR_CHART_OUTLINE, hasSubmenu: true },
      { id: 'custom-apps', label: 'Custom Apps', icon: Icon.TYPES.CUSTOM_APPS_OUTLINE, hasSubmenu: true },
    ],
  };

  const platformSection: NavSectionData = {
    label: 'Platform',
    items: [
      { id: 'tools', label: 'Tools', icon: Icon.TYPES.WRENCH_OUTLINE, hasSubmenu: true },
      { id: 'company-settings', label: 'Company settings', icon: Icon.TYPES.SETTINGS_OUTLINE, hasSubmenu: true },
      { id: 'app-shop', label: 'App Shop', icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE },
      { id: 'help', label: 'Help', icon: Icon.TYPES.QUESTION_CIRCLE_OUTLINE },
    ],
  };

  // ── Filtering ──
  const filteredEmployees = EMPLOYEES.filter((employee) => {
    const matchesSearch =
      searchQuery === '' ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = activeDepartment === 'All' || employee.department === activeDepartment;
    return matchesSearch && matchesDepartment;
  });

  // ── Page actions ──
  const pageActions = (
    <Button appearance={Button.APPEARANCES.PRIMARY} size={Button.SIZES.M}>
      Add Employee
    </Button>
  );

  return (
    <AppShellLayout
      pageTitle="Employee Directory"
      pageActions={pageActions}
      mainNavSections={[orgChartSection, appsSection]}
      platformNavSection={platformSection}
      companyName="Acme, Inc."
      userInitial="A"
      showNotificationBadge
      notificationCount={2}
    >
      {/* Header */}
      <DirectoryHeader>
        <HeaderLeft>
          <PageTitle>Team Members</PageTitle>
          <EmployeeCount>
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'}
          </EmployeeCount>
        </HeaderLeft>
      </DirectoryHeader>

      {/* Filters */}
      <FiltersRow>
        <SearchWrapper>
          <Input.Text
            placeholder="Search by name, title, or email..."
            value={searchQuery}
            onChange={setSearchQuery}
            size={Input.Text.SIZES.M}
          />
        </SearchWrapper>
        <DepartmentChips>
          {DEPARTMENTS.map((dept) => (
            <DepartmentChip
              key={dept}
              isActive={activeDepartment === dept}
              onClick={() => setActiveDepartment(dept)}
            >
              {dept}
            </DepartmentChip>
          ))}
        </DepartmentChips>
      </FiltersRow>

      {/* Employee Grid */}
      <EmployeeGrid>
        {filteredEmployees.length === 0 ? (
          <EmptyState>
            <Icon type={Icon.TYPES.SEARCH} size={40} />
            <EmptyTitle>No employees found</EmptyTitle>
            <EmptySubtitle>Try adjusting your search or filter criteria.</EmptySubtitle>
          </EmptyState>
        ) : (
          filteredEmployees.map((employee) => (
            <EmployeeCardWrapper key={employee.id}>
              <Card.Layout padding={Card.Layout.PADDINGS.PX_24}>
                <CardInner>
                  <CardTopRow>
                    <Avatar name={employee.name} size={Avatar.SIZES.L} />
                    <EmployeeInfo>
                      <EmployeeName>{employee.name}</EmployeeName>
                      <EmployeeTitle>{employee.title}</EmployeeTitle>
                      <HStack gap="0.5rem" alignItems="center">
                        <StatusDot status={employee.status} />
                        <MetaText>{STATUS_LABEL[employee.status]}</MetaText>
                      </HStack>
                    </EmployeeInfo>
                    <Tip content="Send email" placement={Tip.PLACEMENTS.TOP}>
                      <Button.Icon
                        icon={Icon.TYPES.MAIL_OUTLINE}
                        aria-label={`Email ${employee.name}`}
                        appearance={Button.APPEARANCES.GHOST}
                        size={Button.SIZES.S}
                      />
                    </Tip>
                  </CardTopRow>
                  <Divider />
                  <VStack gap="0.25rem">
                    <MetaRow>
                      <Icon type={Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE} size={14} />
                      <MetaText>{employee.department}</MetaText>
                    </MetaRow>
                    <MetaRow>
                      <Icon type={Icon.TYPES.LOCATION_PIN_OUTLINE} size={14} />
                      <MetaText>{employee.location}</MetaText>
                    </MetaRow>
                    <MetaRow>
                      <Icon type={Icon.TYPES.MAIL_OUTLINE} size={14} />
                      <MetaText>{employee.email}</MetaText>
                    </MetaRow>
                  </VStack>
                </CardInner>
              </Card.Layout>
            </EmployeeCardWrapper>
          ))
        )}
      </EmployeeGrid>
    </AppShellLayout>
  );
};

export default EmployeeDirectoryDemo;
