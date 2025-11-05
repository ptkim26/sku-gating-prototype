# Typography Tokens

**Complete typography system reference**

> ⚡ **Auto-generated from `@rippling/pebble-tokens`**  
> Last generated: 11/3/2025, 7:03:19 PM

---

## Overview

Pebble's typography system provides a consistent type scale across all Rippling products.

**Token Structure:** `typestyle{Category}{Size}{Weight}`

**Categories:**
- **Display** - Largest headings (hero text)
- **Title** - Section headings
- **Heading** - Subsection headings  
- **Body** - Paragraph text
- **Label** - UI labels, buttons, form labels

---

## Display (3 tokens)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `typestyleDisplayLarge600` | 48px | 58px | 600 | Hero headlines, landing pages |
| `typestyleDisplayMedium600` | 38px | 46px | 600 | Large page titles |
| `typestyleDisplaySmall600` | 28px | 34px | 600 | Prominent page headers |


---

## Title (9 tokens)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `typestyleTitleExtraLarge600` | 24px | 29px | 600 | Typography token |
| `typestyleTitleExtraSmall600Caps` | 11px | 13px | 600 | Typography token |
| `typestyleTitleLarge600` | 20px | 24px | 600 | Section headings |
| `typestyleTitleMedium600` | 18px | 22px | 600 | Card titles, dialog headers |
| `typestyleTitleSmall400` | 17px | 21px | 400 | Typography token |
| `typestyleTitleSmall600` | 17px | 21px | 600 | List headers |
| `typestyleV2TitleLarge` | 26px | 32px | 600 | Typography token |
| `typestyleV2TitleMedium` | 22px | 26px | 600 | Typography token |
| `typestyleV2TitleSmall` | 18px | 22px | 600 | Typography token |


---


---

## Body (14 tokens)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `typestyleBodyLarge500` | 16px | 19px | 500 | Typography token |
| `typestyleBodyLarge600` | 16px | 19px | 600 | Typography token |
| `typestyleBodyMedium400` | 15px | 19px | 400 | Default body text |
| `typestyleBodyMedium500` | 15px | 19px | 500 | Typography token |
| `typestyleBodyMedium600` | 15px | 19px | 600 | Typography token |
| `typestyleBodySmall400` | 14px | 17px | 400 | Small text, captions |
| `typestyleBodySmall500` | 14px | 17px | 500 | Typography token |
| `typestyleBodySmall600` | 14px | 17px | 600 | Typography token |
| `typestyleV2BodyLarge` | 16px | 24px | 400 | Typography token |
| `typestyleV2BodyLargeEmphasized` | 16px | 24px | 600 | Typography token |
| `typestyleV2BodyMedium` | 14px | 20px | 400 | Typography token |
| `typestyleV2BodyMediumEmphasized` | 14px | 20px | 600 | Typography token |
| `typestyleV2BodySmall` | 12px | 16px | 400 | Typography token |
| `typestyleV2BodySmallEmphasized` | 12px | 16px | 600 | Typography token |


---

## Label (18 tokens)

| Token | Font Size | Line Height | Weight | Usage |
|-------|-----------|-------------|--------|-------|
| `typestyleLabelExtraLarge400` | 13px | 16px | 400 | Typography token |
| `typestyleLabelExtraLarge500` | 13px | 16px | 500 | Typography token |
| `typestyleLabelExtraLarge600` | 13px | 16px | 600 | Typography token |
| `typestyleLabelExtraLarge700` | 13px | 16px | 700 | Typography token |
| `typestyleLabelLarge400` | 12px | 15px | 400 | Typography token |
| `typestyleLabelLarge500` | 12px | 15px | 500 | Typography token |
| `typestyleLabelLarge600` | 12px | 15px | 600 | Button labels |
| `typestyleLabelMedium500` | 11px | 13px | 500 | Typography token |
| `typestyleLabelMedium600` | 11px | 13px | 600 | Form labels |
| `typestyleLabelMedium700` | 11px | 13.2px | 700 | Typography token |
| `typestyleLabelSmall500` | 10px | 12px | 500 | Typography token |
| `typestyleLabelSmall600` | 10px | 12px | 600 | Tiny labels, badges |
| `typestyleV2LabelExtraSmall` | 11px | 14px | 600 | Typography token |
| `typestyleV2LabelExtraSmallWide` | 11px | 14px | 600 | Typography token |
| `typestyleV2LabelLarge` | 16px | 24px | 600 | Typography token |
| `typestyleV2LabelMedium` | 14px | 20px | 600 | Typography token |
| `typestyleV2LabelSmall` | 12px | 16px | 600 | Typography token |
| `typestyleV2LabelSmallEmphasized` | 12px | 16px | 700 | Typography token |



## Usage Examples

```tsx
import styled from '@emotion/styled';
import { useTheme } from '@rippling/pebble/theme';

// As styled component
const Heading = styled.h1`
  ${({ theme }) => theme.typestyleDisplayLarge600};
  color: ${({ theme }) => theme.colorOnSurface};
`;

// Inline with useTheme
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={theme.typestyleBodyMedium400}>
      Body text content
    </div>
  );
};
```

---

## Font Family

Pebble uses **Basel Grotesk** as the primary typeface.

**Fallback stack:**
```css
font-family: 'Basel Grotesk', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Helvetica Neue', sans-serif;
```

---

## Quick Reference

| Use Case | Token |
|----------|-------|
| Hero heading | `typestyleDisplayLarge600` |
| Page title | `typestyleDisplayMedium600` |
| Section header | `typestyleTitleLarge600` |
| Card title | `typestyleTitleMedium600` |
| Body text | `typestyleBodyMedium400` |
| Small text | `typestyleBodySmall400` |
| Button label | `typestyleLabelLarge600` |
| Form label | `typestyleLabelMedium600` |

---

## Related Documentation

- **[Tokens Overview](./README.md)** - Complete token system
- **[Design Tokens Demo](http://localhost:4201/)** - Interactive typography browser

---

**Total Typography Tokens:** 44  
**Source:** `@rippling/pebble-tokens/large/esm/berry-light`
