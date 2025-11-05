import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';
import { useNavigate } from 'react-router-dom';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';

/**
 * Getting Started Page
 * 
 * Instructions for designers on how to use Pebble Playground.
 */

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => (theme as any).colorSurface};
  padding: ${({ theme }) => (theme as any).space1000} ${({ theme }) => (theme as any).space800};
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  margin-bottom: ${({ theme }) => (theme as any).space600};
`;

const Article = styled.article`
  background-color: ${({ theme }) => (theme as any).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as any).shapeCornerXl};
  padding: ${({ theme }) => (theme as any).space1000};
  border: 1px solid ${({ theme }) => (theme as any).colorOutlineVariant};
`;

const Title = styled.h1`
  ${({ theme }) => (theme as any).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as any).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as any).space600} 0;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => (theme as any).space800};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  ${({ theme }) => (theme as any).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as any).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as any).space400} 0;
`;

const Paragraph = styled.p`
  ${({ theme }) => (theme as any).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as any).colorOnSurfaceVariant};
  margin: 0 0 ${({ theme }) => (theme as any).space400} 0;
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OrderedList = styled.ol`
  ${({ theme }) => (theme as any).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as any).colorOnSurfaceVariant};
  margin: 0 0 ${({ theme }) => (theme as any).space400} 0;
  padding-left: ${({ theme }) => (theme as any).space600};
  line-height: 1.8;
  
  li {
    margin-bottom: ${({ theme }) => (theme as any).space300};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    color: ${({ theme }) => (theme as any).colorOnSurface};
    font-weight: 600;
  }
`;

const UnorderedList = styled.ul`
  ${({ theme }) => (theme as any).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as any).colorOnSurfaceVariant};
  margin: 0 0 ${({ theme }) => (theme as any).space400} 0;
  padding-left: ${({ theme }) => (theme as any).space600};
  line-height: 1.8;
  
  li {
    margin-bottom: ${({ theme }) => (theme as any).space300};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  code {
    ${({ theme }) => (theme as any).typestyleV2CodeSmall};
    background-color: ${({ theme }) => (theme as any).colorSurfaceContainerHighest};
    padding: ${({ theme }) => (theme as any).space50} ${({ theme }) => (theme as any).space200};
    border-radius: ${({ theme }) => (theme as any).shapeCornerS};
    color: ${({ theme }) => (theme as any).colorOnSurface};
  }
`;

const CodeBlock = styled.pre`
  ${({ theme }) => (theme as any).typestyleV2CodeMedium};
  background-color: ${({ theme }) => (theme as any).colorSurfaceContainerHighest};
  padding: ${({ theme }) => (theme as any).space500};
  border-radius: ${({ theme }) => (theme as any).shapeCornerM};
  overflow-x: auto;
  margin: ${({ theme }) => (theme as any).space400} 0;
  color: ${({ theme }) => (theme as any).colorOnSurface};
  border: 1px solid ${({ theme }) => (theme as any).colorOutlineVariant};
`;

const Callout = styled.div`
  background-color: ${({ theme }) => (theme as any).colorPrimaryContainer};
  padding: ${({ theme }) => (theme as any).space500};
  border-radius: ${({ theme }) => (theme as any).shapeCornerM};
  margin: ${({ theme }) => (theme as any).space400} 0;
  border-left: 4px solid ${({ theme }) => (theme as any).colorPrimary};
  
  p {
    ${({ theme }) => (theme as any).typestyleV2BodyMedium};
    color: ${({ theme }) => (theme as any).colorOnPrimaryContainer};
    margin: 0;
  }
`;

const GettingStartedPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <PageContainer theme={theme}>
      <ContentWrapper>
        <BackButton theme={theme}>
          <Button
            appearance={Button.APPEARANCES.GHOST}
            size={Button.SIZES.M}
            icon={Icon.TYPES.ARROW_LEFT}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </BackButton>

        <Article theme={theme}>
          <Title theme={theme}>Getting Started with Pebble Playground</Title>

          <Section theme={theme}>
            <SectionTitle theme={theme}>What is Pebble Playground?</SectionTitle>
            <Paragraph theme={theme}>
              Pebble Playground is an interactive environment for designers and developers to prototype
              and experiment with Rippling's Pebble Design System. It provides a fast way to build demos,
              test component combinations, and explore design patterns without the overhead of a full
              production environment.
            </Paragraph>
          </Section>

          <Section theme={theme}>
            <SectionTitle theme={theme}>Quick Start for Designers</SectionTitle>
            <Paragraph theme={theme}>
              Follow these steps to start creating your own demos:
            </Paragraph>
            <OrderedList theme={theme}>
              <li>
                <strong>Explore existing demos</strong> - Click through the demo cards on the home page
                to see examples of what's possible with Pebble components.
              </li>
              <li>
                <strong>Check the documentation</strong> - The <code>docs/</code> folder contains
                comprehensive guides on components, tokens, and patterns. Always start there!
              </li>
              <li>
                <strong>Create a new demo file</strong> - Use the command: <code>yarn create-demo</code> 
                to scaffold a new demo with the correct structure.
              </li>
              <li>
                <strong>Reference component docs</strong> - Before coding, check 
                <code>docs/COMPONENT_CATALOG.md</code> for quick API references and common gotchas.
              </li>
              <li>
                <strong>Use design tokens</strong> - Never hardcode colors, spacing, or typography.
                Always use theme tokens from <code>useTheme()</code> hook.
              </li>
            </OrderedList>
          </Section>

          <Section theme={theme}>
            <SectionTitle theme={theme}>Key Resources</SectionTitle>
            <UnorderedList theme={theme}>
              <li><code>docs/COMPONENT_CATALOG.md</code> - Quick reference for all Pebble components</li>
              <li><code>docs/TOKEN_CATALOG.md</code> - Design tokens for colors, spacing, typography</li>
              <li><code>docs/guides/components/</code> - Detailed component documentation</li>
              <li><code>docs/guides/patterns/</code> - Common UX patterns and best practices</li>
              <li><code>src/demos/</code> - Example demos you can learn from</li>
            </UnorderedList>
          </Section>

          <Section theme={theme}>
            <SectionTitle theme={theme}>Creating Your First Demo</SectionTitle>
            <Paragraph theme={theme}>
              Here's a simple example to get you started:
            </Paragraph>
            <CodeBlock theme={theme}>{`import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';
import Button from '@rippling/pebble/Button';

const MyDemo: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <Container theme={theme}>
      <Button appearance={Button.APPEARANCES.PRIMARY}>
        Hello Pebble!
      </Button>
    </Container>
  );
};

const Container = styled.div\`
  padding: \${({ theme }) => (theme as any).space600};
  background-color: \${({ theme }) => (theme as any).colorSurface};
\`;

export default MyDemo;`}</CodeBlock>
          </Section>

          <Section theme={theme}>
            <SectionTitle theme={theme}>Best Practices</SectionTitle>
            <UnorderedList theme={theme}>
              <li>Always import and use the <code>useTheme()</code> hook for accessing theme tokens</li>
              <li>Use Pebble components instead of building from scratch</li>
              <li>Check component APIs in the docs before using - they might differ from expectations</li>
              <li>Test your demo in both light and dark modes</li>
              <li>Keep demos focused on a single concept or pattern</li>
            </UnorderedList>
          </Section>

          <Callout theme={theme}>
            <p>
              <strong>💡 Pro Tip:</strong> Use <code>Cmd+K</code> (Mac) or <code>Ctrl+K</code> (Windows)
              to toggle the top bar visibility in demos for a cleaner preview.
            </p>
          </Callout>

          <Section theme={theme}>
            <SectionTitle theme={theme}>Need Help?</SectionTitle>
            <Paragraph theme={theme}>
              If you run into issues or have questions:
            </Paragraph>
            <UnorderedList theme={theme}>
              <li>Check the <code>docs/COMPONENT_CATALOG.md</code> "Common Gotchas" section</li>
              <li>Look at similar demos in <code>src/demos/</code> for examples</li>
              <li>Review the component's Confluence documentation in <code>docs/guides/components/</code></li>
              <li>Ask your team members who have experience with Pebble</li>
            </UnorderedList>
          </Section>
        </Article>
      </ContentWrapper>
    </PageContainer>
  );
};

export default GettingStartedPage;

