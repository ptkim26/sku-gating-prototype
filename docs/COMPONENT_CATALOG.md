# Pebble Component Catalog

Complete reference for all Pebble components with AI-friendly examples.

## Table of Contents

1. [Action Components](#action-components)
2. [Input Components](#input-components)
3. [Overlay Components](#overlay-components)
4. [Layout Components](#layout-components)
5. [Display Components](#display-components)
6. [Feedback Components](#feedback-components)

---

## Action Components

### Button

**Purpose:** Primary action trigger  
**Import:** `import Button from '@rippling/pebble/Button';`

**Props:**
- `size`: `XS | S | M | L`
- `appearance`: `PRIMARY | ACCENT | DESTRUCTIVE | SUCCESS | OUTLINE | GHOST`
- `onClick`: `() => void`
- `disabled`: `boolean`
- `isLoading`: `boolean`

**Example:**
```typescript
<Button 
  size={Button.SIZES.M}
  appearance={Button.APPEARANCES.PRIMARY}
  onClick={() => console.log('clicked')}
>
  Save Changes
</Button>
```

**Variants:**
```typescript
// Icon Button
<Button.Icon
  icon={Icon.TYPES.SETTINGS_OUTLINE}
  aria-label="Settings"
  size={Button.SIZES.M}
  onClick={() => {}}
/>

// Button Group
<Button.Group>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</Button.Group>
```

---

### Dropdown

**Purpose:** Menu of actions/options  
**Import:** `import Dropdown from '@rippling/pebble/Dropdown';`

**Props:**
- `list`: `Array<{ label: string, value: any }>`
- `onChange`: `(value: any) => void`
- `shouldAutoClose`: `boolean`
- `placement`: `'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'`

**Example:**
```typescript
<Dropdown
  list={[
    { label: 'Edit', value: 'edit' },
    { label: 'Duplicate', value: 'duplicate' },
    { label: 'Delete', value: 'delete' },
  ]}
  onChange={(value) => handleAction(value)}
  shouldAutoClose
>
  <Button appearance={Button.APPEARANCES.GHOST}>
    Actions
  </Button>
</Dropdown>
```

---

## Input Components

### Input.Text

**Purpose:** Single-line text input  
**Import:** `import Input from '@rippling/pebble/Inputs';`

**Props:**
- `id`: `string` (required)
- `label`: `string`
- `value`: `string`
- `onChange`: `(e: ChangeEvent) => void`
- `placeholder`: `string`
- `isRequired`: `boolean`
- `isDisabled`: `boolean`
- `errorMessage`: `string`
- `size`: `XS | S | M | L`

**Example:**
```typescript
const [email, setEmail] = useState('');

<Input.Text
  id="email"
  label="Email Address"
  placeholder="you@company.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  isRequired
  errorMessage={emailError}
/>
```

---

### Select

**Purpose:** Dropdown selection from a list  
**Import:** `import Select from '@rippling/pebble/Inputs/Select';`

**Props:**
- `id`: `string` (required)
- `isRequired`: `boolean` (required)
- `list`: `Array<{ label: string, value: any }>` (required)
- `value`: `any`
- `onChange`: `(value: any) => void`
- `placeholder`: `string`
- `isMulti`: `boolean`
- `isSearchable`: `boolean`
- `size`: `XS | S | M | L`

**Example:**
```typescript
const [country, setCountry] = useState<string | undefined>(undefined);

<Select
  id="country-select"
  isRequired={false}
  placeholder="Select country"
  list={[
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
  ]}
  value={country}
  onChange={(value) => setCountry(value as string)}
/>
```

**Multi-Select:**
```typescript
<Select
  id="tags-select"
  isRequired={false}
  isMulti
  list={tagOptions}
  value={selectedTags}
  onChange={(values) => setSelectedTags(values)}
/>
```

---

### Input.Checkbox

**Purpose:** Boolean toggle option  
**Import:** `import Input from '@rippling/pebble/Inputs';`

**Example:**
```typescript
const [isChecked, setIsChecked] = useState(false);

<Input.Checkbox
  id="terms"
  label="I agree to the terms and conditions"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

---

### Input.Switch

**Purpose:** On/off toggle  
**Import:** `import Input from '@rippling/pebble/Inputs';`

**Example:**
```typescript
<Input.Switch
  id="notifications"
  label="Enable notifications"
  checked={isEnabled}
  onChange={(e) => setIsEnabled(e.target.checked)}
/>
```

---

### Input.Radio

**Purpose:** Single selection from multiple options  
**Import:** `import Input from '@rippling/pebble/Inputs';`

**Example:**
```typescript
<Input.RadioGroup
  name="plan"
  value={selectedPlan}
  onChange={(e) => setSelectedPlan(e.target.value)}
>
  <Input.Radio id="basic" value="basic" label="Basic Plan" />
  <Input.Radio id="pro" value="pro" label="Pro Plan" />
  <Input.Radio id="enterprise" value="enterprise" label="Enterprise" />
</Input.RadioGroup>
```

---

## Overlay Components

### Modal

**Purpose:** Focused dialog overlay  
**Import:** `import Modal from '@rippling/pebble/Modal';`

**Props:**
- `isVisible`: `boolean` (required)
- `onCancel`: `() => void` (required)
- `title`: `string` (required)
- `size`: `S | M | L | XL`
- `shouldNotAnimate`: `boolean`
- `overlayClassName`: `string`

**Example:**
```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal
  isVisible={isOpen}
  onCancel={() => setIsOpen(false)}
  title="Confirm Action"
  size="M"
>
  <div style={{ padding: '1rem' }}>
    <p>Are you sure you want to proceed?</p>
  </div>
  
  <ModalFooter>
    <ModalCloseButton>Cancel</ModalCloseButton>
    <Button 
      appearance={Button.APPEARANCES.PRIMARY}
      onClick={handleConfirm}
    >
      Confirm
    </Button>
  </ModalFooter>
</Modal>
```

---

### Drawer

**Purpose:** Side panel for forms/details  
**Import:** `import Drawer from '@rippling/pebble/Drawer';`

**Props:**
- `isVisible`: `boolean` (required)
- `onCancel`: `() => void` (required)
- `title`: `string` (required)
- `isCompact`: `boolean` (false = 600px, true = 400px)
- `width`: `number` (custom width in px)
- `placement`: `'left' | 'right'`

**Example:**
```typescript
<Drawer
  isVisible={isDrawerOpen}
  onCancel={() => setIsDrawerOpen(false)}
  title="User Details"
  isCompact={false}
>
  <div style={{ padding: '1rem' }}>
    <Input.Text
      id="name"
      label="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    {/* More form fields */}
  </div>
  
  <Drawer.Footer>
    <Drawer.CloseButton>Cancel</Drawer.CloseButton>
    <Button appearance={Button.APPEARANCES.PRIMARY}>
      Save
    </Button>
  </Drawer.Footer>
</Drawer>
```

---

### Tooltip

**Purpose:** Contextual information on hover  
**Import:** `import Tooltip from '@rippling/pebble/Tooltip';`

**Example:**
```typescript
<Tooltip content="This action cannot be undone" placement="top">
  <Button appearance={Button.APPEARANCES.DESTRUCTIVE}>
    Delete
  </Button>
</Tooltip>
```

---

## Layout Components

### Box

**Purpose:** Flexible container with spacing/layout props  
**Import:** `import Box from '@rippling/pebble/Layout/Box';`

**Props:**
- `padding`, `margin`: `string` (theme spacing tokens)
- `display`: `'flex' | 'grid' | 'block' | 'inline-flex'`
- `flexDirection`, `alignItems`, `justifyContent`: Flex props
- `gap`: `string`

**Example:**
```typescript
<Box
  padding="2rem"
  display="flex"
  gap="1rem"
  alignItems="center"
  justifyContent="space-between"
>
  <Typography variant="heading">Title</Typography>
  <Button>Action</Button>
</Box>
```

---

### Grid

**Purpose:** CSS Grid layout  
**Import:** `import Grid from '@rippling/pebble/Layout/Grid';`

**Example:**
```typescript
<Grid
  columns={3}
  gap="1rem"
  areas={`
    "header header header"
    "sidebar content content"
    "footer footer footer"
  `}
>
  <Grid.Item area="header">Header</Grid.Item>
  <Grid.Item area="sidebar">Sidebar</Grid.Item>
  <Grid.Item area="content">Content</Grid.Item>
  <Grid.Item area="footer">Footer</Grid.Item>
</Grid>
```

---

## Display Components

### Typography

**Purpose:** Text with semantic styles  
**Import:** `import Typography from '@rippling/pebble/Typography';`

**Variants:**
- `display`: 57px, Bold
- `heading`: 32px, Bold
- `body`: 16px, Regular
- `label`: 14px, Semibold

**Example:**
```typescript
<Typography variant="heading" size="large">
  Page Title
</Typography>

<Typography variant="body" size="medium">
  This is regular body text.
</Typography>

<Typography variant="label" size="small">
  Helper Text
</Typography>
```

---

### Icon

**Purpose:** Visual indicators  
**Import:** `import Icon from '@rippling/pebble/Icon';`

**Props:**
- `type`: Icon type (e.g., `Icon.TYPES.CHECK`)
- `size`: `number` (pixel size)
- `color`: `string` (theme color token)

**Example:**
```typescript
const { theme } = useTheme();

<Icon 
  type={Icon.TYPES.CHECK}
  size={20}
  color={theme.colorSuccess}
/>
```

**Common Icon Types:**
```typescript
Icon.TYPES.CHECK
Icon.TYPES.CLEAR
Icon.TYPES.SETTINGS_OUTLINE
Icon.TYPES.SUN_OUTLINE
Icon.TYPES.OVERNIGHT_OUTLINE
Icon.TYPES.CARET_DOWN
Icon.TYPES.CARET_UP
Icon.TYPES.CHEVRON_RIGHT
Icon.TYPES.SEARCH_OUTLINE
Icon.TYPES.INFO_OUTLINE
Icon.TYPES.WARNING_OUTLINE
Icon.TYPES.ERROR_OUTLINE
```

---

### Avatar

**Purpose:** User profile picture  
**Import:** `import Avatar from '@rippling/pebble/Avatar';`

**Example:**
```typescript
<Avatar
  src="https://example.com/avatar.jpg"
  alt="John Doe"
  size={Avatar.SIZES.M}
/>

// With initials fallback
<Avatar
  name="John Doe"
  size={Avatar.SIZES.M}
/>
```

---

### Badge

**Purpose:** Status indicator or count  
**Import:** `import Badge from '@rippling/pebble/Badge';`

**Example:**
```typescript
<Badge appearance={Badge.APPEARANCES.SUCCESS}>
  Active
</Badge>

<Badge appearance={Badge.APPEARANCES.INFO}>
  3 New
</Badge>
```

---

## Feedback Components

### SnackBar

**Purpose:** Temporary notification  
**Import:** `import SnackBar from '@rippling/pebble/SnackBar';`

**Example:**
```typescript
// Success message
SnackBar.success('Changes saved successfully');

// Error message
SnackBar.error('Failed to save changes');

// Info message
SnackBar.info('Data is syncing');

// Warning message
SnackBar.warning('Connection unstable');
```

---

### Spinner

**Purpose:** Loading indicator  
**Import:** `import Spinner from '@rippling/pebble/Spinner';`

**Example:**
```typescript
<Spinner size={Spinner.SIZES.M} />

// With button
<Button isLoading>
  Saving...
</Button>
```

---

### ProgressBar

**Purpose:** Visual progress indicator  
**Import:** `import ProgressBar from '@rippling/pebble/ProgressBar';`

**Example:**
```typescript
<ProgressBar 
  value={65} 
  max={100}
  appearance={ProgressBar.APPEARANCES.SUCCESS}
/>
```

---

## Advanced Components

### DataTable

**Purpose:** Tabular data display with sorting/filtering  
**Import:** `import DataTable from '@rippling/pebble/DataTable';`

**Example:**
```typescript
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]}
  data={users}
  onSort={handleSort}
/>
```

---

### Tabs

**Purpose:** Content organization  
**Import:** `import Tabs from '@rippling/pebble/Tabs';`

**Example:**
```typescript
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.Tab value="overview" label="Overview" />
  <Tabs.Tab value="details" label="Details" />
  <Tabs.Tab value="settings" label="Settings" />
</Tabs>

<Tabs.Panel value="overview" activeValue={activeTab}>
  Overview content
</Tabs.Panel>
<Tabs.Panel value="details" activeValue={activeTab}>
  Details content
</Tabs.Panel>
```

---

### Accordion

**Purpose:** Collapsible content sections  
**Import:** `import Accordion from '@rippling/pebble/Accordion';`

**Example:**
```typescript
<Accordion>
  <Accordion.Item title="Section 1">
    Content for section 1
  </Accordion.Item>
  <Accordion.Item title="Section 2">
    Content for section 2
  </Accordion.Item>
</Accordion>
```

---

## Editor Components

### RichTextEditor

**Purpose:** WYSIWYG text editing  
**Import:** `import { RichTextEditor } from '@rippling/pebble-editor';`

**Example:**
```typescript
<RichTextEditor
  editable={true}
  onError={(error) => console.error(error)}
  features={{ fileUpload: true, variables: true }}
  onChange={({ html, json }) => {
    setContent(html());
  }}
  placeholder="Start typing..."
/>
```

---

### DocumentEditor

**Purpose:** Full-page document editing  
**Import:** `import { DocumentEditor } from '@rippling/pebble-editor';`

**Example:**
```typescript
<DocumentEditor
  onError={(error) => console.error(error)}
  features={{ fileUpload: true, variables: true, page: true }}
  containerStyle={{ height: '100vh' }}
  header={<CustomHeader />}
/>
```

---

## Tips for AI Assistants

1. **Always use enums:** `Button.SIZES.M` not `"M"`
2. **Theme tokens:** `theme.colorPrimary` not `"#0000FF"`
3. **Required props:** Check each component's required props
4. **Accessibility:** Include `aria-label` for icon-only elements
5. **TypeScript:** Use proper types for values and handlers

## See Also

- [AI Prompting Guide](./AI_PROMPTING_GUIDE.md) - Detailed usage patterns
- [Pebble Storybook](https://pebble.rippling.dev) - Interactive examples
- [Theme Tokens](./THEME_TOKENS.md) - Complete token reference

