# Icon Button

**Source:** [View in Confluence](https://rippling.atlassian.net/wiki/spaces/RDS/pages/3957097697)  
**Last Synced:** 11/3/2025, 6:08:27 PM  
**Confluence Version:** 11

---

A simple interactive element for repeated, common, or persistent actions when screen real estate is limited.

---

# Overview

![overview.png](../../assets/components-buttons-icon-button/overview.png)

-   Exclusively for button applications that leverage an icon only
    
-   Ideal for direct access to common actions like search, refresh, or navigation
    
-   Identical sizing and appearance configurations of a typical button component
    

## Resources

**Type**

**Resource**

**Status**

Design

![image-20240201-203905.png](../../assets/components-buttons-icon-button/image-20240201-203905.png)

[Web Resources (Figma)](https://www.figma.com/file/ysWbTtfWqhVDHQd1Mg2LQ1/Component-Library-v2?type=design&node-id=1046-1210&mode=design)

AvailableGreen

Implementation

![image-20240201-204132.png](../../assets/components-buttons-icon-button/image-20240201-204132.png)

Web Component (Storybook)

PlannedYellow

---

# Specs

## Anatomy

![specs-anatomy.png](../../assets/components-buttons-icon-button/specs-anatomy.png)

1.  Container
    
2.  Icon
    

## Configuration

### Appearance

![config-color.png](../../assets/components-buttons-icon-button/config-color.png)

Button Appearancestrue

### Size

![config-size.png](../../assets/components-buttons-icon-button/config-size.png)

1.  Extra small (24px height)
    
2.  Small (32px height)
    
3.  Medium (40px height)
    
4.  Large (default) (48px height)
    

---

# Usage

![usage.png](../../assets/components-buttons-icon-button/usage.png)

### When to use

-   Ideal for common and standardized actions with well-known icons
    
-   Ideal for multiple equally important actions when space is limited or placement across the product experience is consistent
    

### When to use something else

-   If this action is critical or requires more context, consider using a regular button or a button with both text and an icon
    
-   Displaying icons that don't have actions associated with them. Use a display icon instead.
    

## Guidelines

![guidelines-tooltip.png](../../assets/components-buttons-icon-button/guidelines-tooltip.png)

Ensure that icon buttons come with tooltips that clearly explain their function, rather than describing the icon itself. This practice enhances the button's accessibility and clarity without sacrificing screen space or usability. Tooltips are effective in minimizing confusion and enhancing user accessibility at no extra expense.

### Use filled icons

![Filled icons.png](../../assets/components-buttons-icon-button/Filled icons.png)

Filled icons usually work better inside buttons especially in small sizes. If a button is small it’s harder to distinguish outlined icon compared to it’s filled counterpart.

---

# Accessibility

Users should be able to: 

-   Understand meaning of the icon and the action the button invokes
    
-   Navigate to and activate an icon button with assistive technology
    

### Labeling

The accessibility labels for icon buttons should describe the action that the button is executing. Icon buttons must include an aria-label.

### Keyboard Navigation

**Keys**

**Action**

Tab

Focus lands on (non-disabled) icon button

Space / Enter

Activates the (non-disabled) icon button
