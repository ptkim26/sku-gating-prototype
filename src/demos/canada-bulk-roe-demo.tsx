import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Breadcrumb from '@rippling/pebble/Breadcrumb';
import Page from '@rippling/pebble/Page';
import TableBasic from '@rippling/pebble/TableBasic';
import Input from '@rippling/pebble/Inputs';
import Avatar from '@rippling/pebble/Avatar';
import Button from '@rippling/pebble/Button';
import Card from '@rippling/pebble/Card';
import Drawer, { DrawerTitleKinds } from '@rippling/pebble/Drawer';
import ObjectUI from '@rippling/pebble/ObjectUI';
import Status from '@rippling/pebble/Status';
import { HStack, VStack } from '@rippling/pebble/Layout/Stack';
import { TopNavBar, Sidebar, NavSectionData } from '@/components/app-shell';

/**
 * Canada Bulk ROE Demo
 *
 * A demo for Canada Record of Employment (ROE) bulk management.
 * 
 * Simplified layout with just top nav and left sidebar.
 */

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  overflow: hidden;
`;

const MainContent = styled.main<{ sidebarCollapsed: boolean }>`
  position: fixed;
  left: ${({ sidebarCollapsed }) => (sidebarCollapsed ? '60px' : '266px')};
  top: 56px;
  right: 0;
  bottom: 0;
  transition: left 200ms ease;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
`;

const BreadcrumbWrapper = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space600} ${({ theme }) => (theme as StyledTheme).space800};
  padding-bottom: 0;
`;

const PageHeaderWrapper = styled.div`
  padding: 0 ${({ theme }) => (theme as StyledTheme).space800};
`;

const TableContainer = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space600} ${({ theme }) => (theme as StyledTheme).space800};
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const TableTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const TableCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const TableActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SearchFilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
  flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
  width: 280px;
`;

const FilterWrapper = styled.div`
  width: 140px;
`;

const EmployeeCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmployeeName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  font-weight: 500;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: block;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmployeeRole = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  display: block;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CellText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const StatusDot = styled.span<{ statusType: 'draft' | 'scheduled' | 'submitted' | 'accepted' | 'rejected' | 'discarded' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ theme, statusType }) => {
    switch (statusType) {
      case 'draft':
        return (theme as StyledTheme).colorOutline;
      case 'scheduled':
        return '#2780CE';
      case 'submitted':
        return '#CE71BB';
      case 'accepted':
        return '#2D8A70';
      case 'rejected':
        return '#E4633C';
      case 'discarded':
        return (theme as StyledTheme).colorWarning;
      default:
        return (theme as StyledTheme).colorOutline;
    }
  }};
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  
  /* Sticky column styles */
  table {
    border-collapse: separate;
    border-spacing: 0;
    min-width: 100%;
  }
  
  /* Checkbox column - sticky left */
  thead th:first-of-type {
    position: sticky !important;
    left: 0 !important;
    z-index: 4;
    background: ${({ theme }) => (theme as StyledTheme).colorSurface} !important;
  }
  
  tbody td:first-of-type {
    position: sticky !important;
    left: 0 !important;
    z-index: 3;
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright} !important;
  }
  
  /* People column - sticky left after checkbox */
  thead th:nth-of-type(2) {
    position: sticky !important;
    left: 64px !important;
    z-index: 4;
    background: ${({ theme }) => (theme as StyledTheme).colorSurface} !important;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
  }
  
  tbody td:nth-of-type(2) {
    position: sticky !important;
    left: 64px !important;
    z-index: 3;
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright} !important;
    box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
  }
  
  /* Last column - sticky right */
  thead th:last-of-type {
    position: sticky !important;
    right: 0 !important;
    z-index: 4;
    background: ${({ theme }) => (theme as StyledTheme).colorSurface} !important;
    box-shadow: -2px 0px 4px -2px rgba(0, 0, 0, 0.1);
  }
  
  tbody td:last-of-type {
    position: sticky !important;
    right: 0 !important;
    z-index: 3;
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright} !important;
    box-shadow: -2px 0 4px -2px rgba(0, 0, 0, 0.1);
  }
`;


// Sample employee data for ROE
interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
  serialNumber: string;
  type: string;
  status: string;
  reason: string;
  submissionDate: string;
  createdBy: string;
  lastUpdatedOn: string;
  isDisabled?: boolean;
}

const SAMPLE_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Emp Hourly A', role: 'SDE', department: 'Finance', serialNumber: 'W12345678', type: 'Original', status: 'Submitted', reason: 'K03', submissionDate: '01-15-2026', createdBy: 'Rippling', lastUpdatedOn: '01-20-2026', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Catherine Batz', role: 'CEO', department: 'Finance', serialNumber: 'W23456789', type: 'Original', status: 'Draft', reason: 'E05', submissionDate: '01-10-2026', createdBy: 'Brad Smith', lastUpdatedOn: '01-18-2026', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', name: 'Effa Borer', role: 'Account Executive', department: 'Sales', serialNumber: 'W34567890', type: 'Amended', status: 'Draft', reason: 'A01', submissionDate: '—', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-22-2026', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
  { id: '4', name: 'Harman Brakus', role: 'Controller', department: 'Finance', serialNumber: 'W45678901', type: 'Original', status: 'Rejected', reason: 'K07', submissionDate: '01-05-2026', createdBy: 'Rippling', lastUpdatedOn: '01-12-2026', isDisabled: true, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
  { id: '5', name: 'Resd Dfgsfhdg', role: 'Engineer', department: 'Engineering', serialNumber: 'W56789012', type: 'Original', status: 'Scheduled', reason: 'E11', submissionDate: '01-18-2026', createdBy: 'Brad Smith', lastUpdatedOn: '01-25-2026', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
  { id: '6', name: 'Taniyah Douglas', role: 'Sales Development Rep', department: 'Sales', serialNumber: 'W67890123', type: 'Amended', status: 'Discarded', reason: 'A00', submissionDate: '01-02-2026', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-08-2026', isDisabled: true, avatarUrl: 'https://i.pravatar.cc/150?img=20' },
  { id: '7', name: 'Lorrie Effertz', role: 'Director of Engineering Ops', department: 'Engineering', serialNumber: 'W78901234', type: 'Original', status: 'Accepted', reason: 'K14', submissionDate: '01-12-2026', createdBy: 'Rippling', lastUpdatedOn: '01-19-2026', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
  { id: '8', name: 'Marcus Chen', role: 'Product Manager', department: 'Product', serialNumber: 'W89012345', type: 'Original', status: 'Draft', reason: 'E09', submissionDate: '—', createdBy: 'Brad Smith', lastUpdatedOn: '01-28-2026', avatarUrl: 'https://i.pravatar.cc/150?img=33' },
  { id: '9', name: 'Priya Sharma', role: 'Data Analyst', department: 'Analytics', serialNumber: 'W90123456', type: 'Original', status: 'Scheduled', reason: 'K02', submissionDate: '01-08-2026', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-14-2026', avatarUrl: 'https://i.pravatar.cc/150?img=41' },
  { id: '10', name: 'James Wilson', role: 'HR Manager', department: 'Human Resources', serialNumber: 'W01234567', type: 'Amended', status: 'Draft', reason: 'A03', submissionDate: '—', createdBy: 'Rippling', lastUpdatedOn: '01-30-2026', avatarUrl: 'https://i.pravatar.cc/150?img=52' },
  { id: '11', name: 'Sofia Rodriguez', role: 'Marketing Lead', department: 'Marketing', serialNumber: 'W11223344', type: 'Original', status: 'Submitted', reason: 'E02', submissionDate: '01-20-2026', createdBy: 'Brad Smith', lastUpdatedOn: '01-26-2026', avatarUrl: 'https://i.pravatar.cc/150?img=44' },
  { id: '12', name: 'David Kim', role: 'Security Engineer', department: 'Engineering', serialNumber: 'W22334455', type: 'Original', status: 'Rejected', reason: 'K11', submissionDate: '01-03-2026', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-09-2026', isDisabled: true, avatarUrl: 'https://i.pravatar.cc/150?img=57' },
  { id: '13', name: 'Emily Thompson', role: 'Legal Counsel', department: 'Legal', serialNumber: 'W33445566', type: 'Amended', status: 'Accepted', reason: 'A05', submissionDate: '01-17-2026', createdBy: 'Rippling', lastUpdatedOn: '01-23-2026', avatarUrl: 'https://i.pravatar.cc/150?img=47' },
  { id: '14', name: 'Michael O\'Brien', role: 'Support Specialist', department: 'Customer Success', serialNumber: 'W44556677', type: 'Original', status: 'Draft', reason: 'E08', submissionDate: '—', createdBy: 'Brad Smith', lastUpdatedOn: '01-29-2026', avatarUrl: 'https://i.pravatar.cc/150?img=60' },
  { id: '15', name: 'Aisha Patel', role: 'UX Designer', department: 'Design', serialNumber: 'W55667788', type: 'Original', status: 'Scheduled', reason: 'K09', submissionDate: '01-11-2026', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-17-2026', avatarUrl: 'https://i.pravatar.cc/150?img=45' },
  { id: '16', name: 'Robert Garcia', role: 'DevOps Engineer', department: 'Engineering', serialNumber: 'W66778899', type: 'Amended', status: 'Discarded', reason: 'A02', submissionDate: '01-06-2026', createdBy: 'Rippling', lastUpdatedOn: '01-11-2026', isDisabled: true, avatarUrl: 'https://i.pravatar.cc/150?img=61' },
  { id: '17', name: 'Lisa Chang', role: 'Finance Analyst', department: 'Finance', serialNumber: 'W77889900', type: 'Original', status: 'Draft', reason: 'E04', submissionDate: '—', createdBy: 'Brad Smith', lastUpdatedOn: '01-27-2026', avatarUrl: 'https://i.pravatar.cc/150?img=48' },
  { id: '18', name: 'Tom Anderson', role: 'Solutions Architect', department: 'Engineering', serialNumber: 'W88990011', type: 'Amended', status: 'Accepted', reason: 'K06', submissionDate: '01-14-2026', createdBy: 'Angela Gibbons', lastUpdatedOn: '01-21-2026', avatarUrl: 'https://i.pravatar.cc/150?img=53' },
];

// Filter options
const TYPE_OPTIONS = [
  { label: 'Original', value: 'Original' },
  { label: 'Amended', value: 'Amended' },
];

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Scheduled', value: 'Scheduled' },
  { label: 'Submitted', value: 'Submitted' },
  { label: 'Accepted', value: 'Accepted' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Discarded', value: 'Discarded' },
];

// Get unique reasons from data
const REASON_OPTIONS = Array.from(new Set(SAMPLE_EMPLOYEES.map(emp => emp.reason)))
  .sort()
  .map(reason => ({ label: reason, value: reason }));

const CanadaBulkRoeDemo: React.FC = () => {
  const { theme, mode: currentMode } = usePebbleTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [typeFilter, setTypeFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return SAMPLE_EMPLOYEES.filter(emp => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = emp.name.toLowerCase().includes(query) || 
               emp.role.toLowerCase().includes(query) ||
               emp.department.toLowerCase().includes(query) ||
               emp.serialNumber.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      // Type filter
      if (typeFilter && emp.type !== typeFilter) return false;
      
      // Reason filter
      if (reasonFilter && emp.reason !== reasonFilter) return false;
      
      // Status filter
      if (statusFilter && emp.status !== statusFilter) return false;
      
      return true;
    });
  }, [searchQuery, typeFilter, reasonFilter, statusFilter]);

  // Get selectable employees (only Draft status)
  const selectableEmployees = useMemo(() => 
    filteredEmployees.filter(emp => emp.status === 'Draft'),
    [filteredEmployees]
  );

  const allSelectableSelected = selectableEmployees.length > 0 && 
    selectableEmployees.every(emp => selectedRows.has(emp.id));

  const someSelected = selectableEmployees.some(emp => selectedRows.has(emp.id));

  const handleSelectAll = () => {
    if (allSelectableSelected) {
      // All are selected, so deselect all
      const newSelected = new Set(selectedRows);
      selectableEmployees.forEach(emp => newSelected.delete(emp.id));
      setSelectedRows(newSelected);
    } else {
      // Not all selected, so select all
      const newSelected = new Set(selectedRows);
      selectableEmployees.forEach(emp => newSelected.add(emp.id));
      setSelectedRows(newSelected);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const handleOpenRowDrawer = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedEmployee(null);
  };

  const getStatusAppearance = (status: string) => {
    switch (status) {
      case 'Approved':
        return Status.APPEARANCES.PRIMARY;
      case 'Draft':
        return Status.APPEARANCES.DISABLED;
      case 'Discarded':
        return Status.APPEARANCES.WARNING;
      default:
        return Status.APPEARANCES.DISABLED;
    }
  };


  // Main navigation items
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
      { id: 'payroll', label: 'Payroll', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, hasSubmenu: true, isActive: true },
      { id: 'finance', label: 'Finance', icon: Icon.TYPES.CREDIT_CARD_OUTLINE, hasSubmenu: true },
      { id: 'talent', label: 'Talent', icon: Icon.TYPES.TALENT_OUTLINE, hasSubmenu: true },
      { id: 'it', label: 'IT', icon: Icon.TYPES.LAPTOP_OUTLINE, hasSubmenu: true },
      { id: 'data', label: 'Data', icon: Icon.TYPES.BAR_CHART_OUTLINE, hasSubmenu: true },
      { id: 'custom-apps', label: 'Custom Apps', icon: Icon.TYPES.CUSTOM_APPS_OUTLINE, hasSubmenu: true },
    ],
  };

  // Platform navigation section
  const platformSection: NavSectionData = {
    label: 'Platform',
    items: [
      { id: 'tools', label: 'Tools', icon: Icon.TYPES.WRENCH_OUTLINE, hasSubmenu: true },
      { id: 'company-settings', label: 'Company settings', icon: Icon.TYPES.SETTINGS_OUTLINE, hasSubmenu: true },
      { id: 'app-shop', label: 'App Shop', icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE },
      { id: 'help', label: 'Help', icon: Icon.TYPES.QUESTION_CIRCLE_OUTLINE },
    ],
  };

  return (
    <AppContainer theme={theme}>
      {/* Top Navigation */}
      <TopNavBar
        companyName="Acme, Inc."
        userInitial="A"
        adminMode={adminMode}
        currentMode={currentMode as 'light' | 'dark'}
        searchPlaceholder="Search or jump to..."
        onAdminModeToggle={() => setAdminMode(!adminMode)}
        showNotificationBadge
        notificationCount={2}
        theme={theme}
      />

      {/* Left Sidebar */}
      <Sidebar
        mainSections={[orgChartSection, appsSection]}
        platformSection={platformSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        theme={theme}
      />

      {/* Main Content Area */}
      <MainContent theme={theme} sidebarCollapsed={sidebarCollapsed}>
        <BreadcrumbWrapper theme={theme}>
          <Breadcrumb
            items={[
              { title: 'Action required', value: 'action-required' },
              { title: 'Record of Employment (ROE)', value: 'roe' },
            ]}
            active="roe"
          />
        </BreadcrumbWrapper>
        <PageHeaderWrapper theme={theme}>
          <Page.Header
            title="Record of Employment (ROE)"
            size={Page.Header.SIZES.FLUID}
            shouldBeUnderlined
          />
        </PageHeaderWrapper>

        <TableContainer theme={theme}>
          <Card.Layout padding={Card.Layout.PADDINGS.PX_24}>
            <TableHeader theme={theme}>
              <TableTitle theme={theme}>
                <span>Tasks</span>
                <TableCount theme={theme}>· {filteredEmployees.length}</TableCount>
              </TableTitle>
              <TableActions theme={theme}>
                <Button.Icon
                  icon={Icon.TYPES.EXPAND}
                  appearance={Button.APPEARANCES.OUTLINE}
                  size={Button.SIZES.S}
                  aria-label="Full screen"
                />
              </TableActions>
            </TableHeader>

            <SearchFilterRow theme={theme}>
              <SearchWrapper>
                <Input.Text
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search people and serial numbers"
                  size={Input.Text.SIZES.S}
                  icon={Icon.TYPES.SEARCH_OUTLINE}
                />
              </SearchWrapper>
              <FilterWrapper>
                <Input.Select
                  list={TYPE_OPTIONS}
                  value={typeFilter || undefined}
                  onChange={(val: string) => setTypeFilter(val || '')}
                  size={Input.Select.SIZES.S}
                  placeholder="Type"
                  canClear
                />
              </FilterWrapper>
              <FilterWrapper>
                <Input.Select
                  list={REASON_OPTIONS}
                  value={reasonFilter || undefined}
                  onChange={(val: string) => setReasonFilter(val || '')}
                  size={Input.Select.SIZES.S}
                  placeholder="Reason"
                  canClear
                />
              </FilterWrapper>
              <FilterWrapper>
                <Input.Select
                  list={STATUS_OPTIONS}
                  value={statusFilter || undefined}
                  onChange={(val: string) => setStatusFilter(val || '')}
                  size={Input.Select.SIZES.S}
                  placeholder="Status"
                  canClear
                />
              </FilterWrapper>
            </SearchFilterRow>

            <TableWrapper theme={theme}>
              <TableBasic>
              <TableBasic.THead>
                <TableBasic.Tr>
                  <TableBasic.Th style={{ width: 64, minWidth: 64 }}>
                    <Input.Checkbox
                      value={allSelectableSelected}
                      isIndeterminate={someSelected && !allSelectableSelected}
                      onChange={handleSelectAll}
                      isDisabled={selectableEmployees.length === 0}
                      aria-label="Select all ready rows"
                    />
                  </TableBasic.Th>
                  <TableBasic.Th style={{ width: 200, minWidth: 200 }}>People</TableBasic.Th>
                  <TableBasic.Th>Serial number</TableBasic.Th>
                  <TableBasic.Th>Type</TableBasic.Th>
                  <TableBasic.Th>Status</TableBasic.Th>
                  <TableBasic.Th>Reason</TableBasic.Th>
                  <TableBasic.Th>Created by</TableBasic.Th>
                  <TableBasic.Th>Submission date</TableBasic.Th>
                  <TableBasic.Th>Last updated</TableBasic.Th>
                  <TableBasic.Th style={{ width: 60, minWidth: 60 }}></TableBasic.Th>
                </TableBasic.Tr>
              </TableBasic.THead>
              <TableBasic.TBody>
                {filteredEmployees.map((employee) => (
                  <TableBasic.Tr key={employee.id}>
                    <TableBasic.Td>
                      <Input.Checkbox
                        value={selectedRows.has(employee.id)}
                        onChange={() => handleRowSelect(employee.id, !selectedRows.has(employee.id))}
                        isDisabled={employee.status !== 'Draft'}
                        aria-label={`Select ${employee.name}`}
                      />
                    </TableBasic.Td>
                    <TableBasic.Td>
                      <EmployeeCell theme={theme}>
                        <Avatar
                          name={employee.name}
                          image={employee.avatarUrl}
                          size={Avatar.SIZES.XS}
                        />
                        <EmployeeInfo>
                          <EmployeeName theme={theme}>{employee.name}</EmployeeName>
                          <EmployeeRole theme={theme}>{employee.role}, {employee.department}</EmployeeRole>
                        </EmployeeInfo>
                      </EmployeeCell>
                    </TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.serialNumber}</CellText></TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.type}</CellText></TableBasic.Td>
                    <TableBasic.Td>
                      <StatusCell theme={theme}>
                        <StatusDot 
                          theme={theme} 
                          statusType={employee.status.toLowerCase() as 'draft' | 'scheduled' | 'submitted' | 'accepted' | 'rejected' | 'discarded'} 
                        />
                        <CellText theme={theme}>{employee.status}</CellText>
                      </StatusCell>
                    </TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.reason}</CellText></TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.createdBy}</CellText></TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.submissionDate}</CellText></TableBasic.Td>
                    <TableBasic.Td><CellText theme={theme}>{employee.lastUpdatedOn}</CellText></TableBasic.Td>
                    <TableBasic.Td>
                      <Button.Icon
                        icon={Icon.TYPES.CHEVRON_RIGHT}
                        appearance={Button.APPEARANCES.GHOST}
                        size={Button.SIZES.S}
                        aria-label={`View details for ${employee.name}`}
                        onClick={() => handleOpenRowDrawer(employee)}
                      />
                    </TableBasic.Td>
                  </TableBasic.Tr>
                ))}
              </TableBasic.TBody>
            </TableBasic>
            </TableWrapper>
          </Card.Layout>
        </TableContainer>
      </MainContent>

      <Drawer
        isVisible={isDrawerOpen}
        onCancel={handleCloseDrawer}
        title={
          selectedEmployee
            ? {
                kind: DrawerTitleKinds.BREADCRUMB,
                props: {
                  items: [
                    { title: 'Record of Employment (ROE)', value: 'roe' },
                    { title: selectedEmployee.name, value: selectedEmployee.id },
                  ],
                  active: selectedEmployee.id,
                  onClick: (item) => {
                    if (item.value === 'roe') handleCloseDrawer();
                  },
                },
              }
            : undefined
        }
        width={700}
      >
        {selectedEmployee && (
          <ObjectUI.Template>
              <ObjectUI.Header
                title={
                  <HStack gap={theme.space200} alignItems="center">
                    <span>{selectedEmployee.name}</span>
                    <StatusCell theme={theme}>
                      <StatusDot
                        theme={theme}
                        statusType={selectedEmployee.status.toLowerCase() as 'draft' | 'scheduled' | 'submitted' | 'accepted' | 'rejected' | 'discarded'}
                      />
                      <CellText theme={theme}>{selectedEmployee.status}</CellText>
                    </StatusCell>
                  </HStack>
                }
                avatarProps={{
                  image: selectedEmployee.avatarUrl,
                  isRound: true,
                }}
                primaryAction={
                  selectedEmployee.status === 'Draft'
                    ? {
                        label: 'Approve',
                        size: Button.SIZES.S,
                        icon: Icon.TYPES.APPROVAL_OUTLINE,
                        onClick: () => {},
                      }
                    : undefined
                }
                actions={{
                  limit: 4,
                  list: [
                    {
                      type: ObjectUI.Header.ACTION_TYPES.BUTTON,
                      props: {
                        label: 'Edit',
                        icon: Icon.TYPES.EDIT_OUTLINE,
                        appearance: Button.APPEARANCES.OUTLINE,
                        size: Button.SIZES.S,
                      },
                    },
                    {
                      type: ObjectUI.Header.ACTION_TYPES.BUTTON,
                      props: {
                        label: 'Refresh',
                        icon: Icon.TYPES.REFRESH,
                        appearance: Button.APPEARANCES.OUTLINE,
                        size: Button.SIZES.S,
                      },
                    },
                    {
                      type: ObjectUI.Header.ACTION_TYPES.ICON,
                      props: {
                        icon: Icon.TYPES.MORE_VERTICAL,
                        appearance: Button.APPEARANCES.OUTLINE,
                        size: Button.SIZES.S,
                        'aria-label': 'More options',
                      },
                    },
                  ],
                }}
              />
              <ObjectUI.Stats
                list={[
                  {
                    label: 'Type',
                    renderer: ObjectUI.Stats.Renderer.TextRenderer,
                    props: { value: selectedEmployee.type },
                  },
                  {
                    label: 'Submission date',
                    renderer: ObjectUI.Stats.Renderer.TextRenderer,
                    props: { value: selectedEmployee.submissionDate },
                  },
                  {
                    label: 'Last updated',
                    renderer: ObjectUI.Stats.Renderer.TextRenderer,
                    props: { value: selectedEmployee.lastUpdatedOn },
                  },
                ]}
              />
            </ObjectUI.Template>
        )}
      </Drawer>
    </AppContainer>
  );
};

export default CanadaBulkRoeDemo;
