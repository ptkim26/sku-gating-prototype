/**
 * Template for Creating New Demos
 * 
 * Copy this file to create a new demo. Replace placeholders with your content.
 * 
 * ⚠️ BEFORE YOU START:
 * 1. Read docs/COMPONENT_CATALOG.md for component APIs
 * 2. Read docs/TOKEN_CATALOG.md for design tokens
 * 3. Look at src/demos/ for similar examples
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';

// Import Pebble components you need
// Refer to docs/COMPONENT_CATALOG.md for correct import paths
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import Input from '@rippling/pebble/Inputs';
// import Select from '@rippling/pebble/Inputs/Select';
// import Modal from '@rippling/pebble/Modal';
// import Drawer from '@rippling/pebble/Drawer';
// import Tip from '@rippling/pebble/Tip';  // NOT Tooltip!

/**
 * [YourDemoName]
 * 
 * [Brief description of what this demo showcases]
 * 
 * Components used:
 * - Button (docs/guides/components/buttons/button.md)
 * - Icon (docs/guides/components/icons.md)
 * - Input.Text (docs/guides/components/inputs/text-input.md)
 * 
 * Demonstrates:
 * - [List key concepts shown in this demo]
 * - [e.g., Form validation, theme tokens, component composition]
 */

const YourDemoName: React.FC = () => {
  // ALWAYS get theme from useTheme hook
  const { theme } = useTheme();

  // State management
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  // Event handlers
  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
  };

  return (
    <Container theme={theme}>
      <Title theme={theme}>Your Demo Title</Title>

      <Description theme={theme}>
        Brief description of what this demo shows.
      </Description>

      {/* Example: Form with Input */}
      <FormSection theme={theme}>
        <Input.Text
          id="demo-input"
          label="Input Label"
          placeholder="Enter something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size={Input.Text.SIZES.M}  // NOTE: Input.Text.SIZES, not Input.SIZES!
        />
      </FormSection>

      {/* Example: Button with Icon */}
      <ButtonGroup theme={theme}>
        <Button
          size={Button.SIZES.M}
          appearance={Button.APPEARANCES.PRIMARY}
          onClick={handleSubmit}
        >
          <Icon 
            type={Icon.TYPES.CHECK} 
            size={16}  // NOTE: Use numbers, not Icon.SIZES.M!
          />
          Submit
        </Button>

        <Button
          size={Button.SIZES.M}
          appearance={Button.APPEARANCES.OUTLINE}
          onClick={() => setCount(count + 1)}
        >
          Count: {count}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

// Styled components using theme tokens
// CRITICAL: Use theme tokens, NEVER hardcode values!

const Container = styled.div`
  /* Use theme tokens for padding */
  padding: ${({ theme }) => (theme as any).space600};
  
  /* Use theme tokens for background */
  background-color: ${({ theme }) => (theme as any).colorSurface};
  
  /* Use theme tokens for spacing */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as any).space600};
  
  min-height: 100vh;
`;

const Title = styled.h1`
  /* Use typography tokens */
  ${({ theme }) => (theme as any).typestyleDisplayLarge600};
  
  /* Use color tokens */
  color: ${({ theme }) => (theme as any).colorOnSurface};
  
  /* Use spacing tokens */
  margin: 0 0 ${({ theme }) => (theme as any).space400} 0;
`;

const Description = styled.p`
  /* Use typography tokens for body text */
  ${({ theme }) => (theme as any).typestyleBodyLarge400};
  
  /* Use color variant for secondary text */
  color: ${({ theme }) => (theme as any).colorOnSurfaceVariant};
  
  margin: 0;
`;

const FormSection = styled.div`
  /* Use theme tokens for all spacing */
  padding: ${({ theme }) => (theme as any).space600};
  
  /* Use theme tokens for elevated surface */
  background-color: ${({ theme }) => (theme as any).colorSurfaceBright};
  
  /* Use theme tokens for border radius */
  border-radius: ${({ theme }) => (theme as any).shapeCornerL};
  
  /* Use theme tokens for borders */
  border: 1px solid ${({ theme }) => (theme as any).colorOutlineVariant};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as any).space300};
  align-items: center;
`;

export default YourDemoName;

/**
 * ✅ Checklist Before Committing:
 * 
 * - [ ] All colors use theme tokens (no hardcoded hex values)
 * - [ ] All spacing uses theme tokens (no hardcoded px values)
 * - [ ] All typography uses theme tokens
 * - [ ] Icon sizes are numbers (20, 24, etc.), not Icon.SIZES
 * - [ ] Input.Text uses Input.Text.SIZES, not Input.SIZES
 * - [ ] Using Tip component, not Tooltip
 * - [ ] All interactive icons have aria-label
 * - [ ] Component follows patterns from COMPONENT_CATALOG.md
 * - [ ] No linter errors
 * - [ ] Tested in both light and dark modes
 * 
 * 📝 After Creating:
 * 
 * 1. Add to main.tsx:
 *    - Add to EditorType enum: `YOUR_DEMO = 'your-demo'`
 *    - Import: `import YourDemoName from './demos/your-demo-name';`
 *    - Add to DEMO_OPTIONS: `{ type: EditorType.YOUR_DEMO, label: 'Your Demo Label' }`
 *    - Add render case:
 *      ```typescript
 *      {editorType === EditorType.YOUR_DEMO && (
 *        <>
 *          {isTopBarVisible && buttons}
 *          <YourDemoName />
 *        </>
 *      )}
 *      ```
 * 
 * 2. Test:
 *    - Run `yarn dev`
 *    - Select your demo from "Switch Demo"
 *    - Test light/dark mode toggle
 *    - Verify no console errors
 */


