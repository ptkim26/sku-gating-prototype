# Checkbox

**Source:** [View in Confluence](https://rippling.atlassian.net/wiki/spaces/RDS/pages/4046651447)  
**Last Synced:** 11/3/2025, 7:16:26 PM  
**Confluence Version:** 12

---

Introduction

A Checkbox lets users select and unselect options from a list.

---

# Overview

![image-20240417-205826.png](../../assets/components-inputs-checkbox/image-20240417-205826.png)

-   Select one or more options from a list
    

## Resources

**Type**

**Resource**

**Status**

Design

![image-20240201-203905.png](../../assets/components-inputs-checkbox/image-20240201-203905.png)

[Web Component (Figma)](https://www.figma.com/file/ysWbTtfWqhVDHQd1Mg2LQ1/v2-Component-Library?type=design&node-id=1701-9720&mode=design)

AVAILABLEGreen

Implementation

![image-20240201-204132.png](../../assets/components-inputs-checkbox/image-20240201-204132.png)

[Web Component (Storybook)](https://uikit.ripplinginternal.com/?path=/docs/components-inputs-checkbox-single--props)

AVAILABLEGreen

---

# Specs

## Anatomy

![image-20240417-210353.png](../../assets/components-inputs-checkbox/image-20240417-210353.png)

1.  Not selected
    
2.  Selected
    
3.  Indeterminate
    
4.  Label
    

## Configuration

### Appearance

![image-20240418-184903.png](../../assets/components-inputs-checkbox/image-20240418-184903.png)

1.  List
    
2.  Basic
    
3.  Box
    
4.  Card
    

### Position

![image-20240417-211051.png](../../assets/components-inputs-checkbox/image-20240417-211051.png)

1.  Default
    
2.  Reverse
    

Changing position is not available for the card checkbox type.

### Help

![image-20240417-212553.png](../../assets/components-inputs-checkbox/image-20240417-212553.png)

Supplementary context can be added to checkbox through the help text. For even more context, a help icon with a tooltip can be added to the end of the label.

### Error

![image-20240430-223048.png](../../assets/components-inputs-checkbox/image-20240430-223048.png)

Checkboxes can be marked as having an error to show that a selection that was made is invalid. For example, in a form that requires a user to acknowledge legal terms before proceeding, the checkbox would show an unchecked error to communicate that it needs to be selected.

### Tags

![image-20240418-184950.png](../../assets/components-inputs-checkbox/image-20240418-184950.png)

Certain options can be highlighted with relevant metadata.

### Orientation

![image-20240418-211538.png](../../assets/components-inputs-checkbox/image-20240418-211538.png)

Checkbox groups can be arranged horizontally or vertically, with the default orientation being vertical. When vertical space is constrained, opt for a horizontal layout.

Orientation is only available in the basic type of checkboxes.

---

# Usage

![image-20240418-210915.png](../../assets/components-inputs-checkbox/image-20240418-210915.png)

### When to use

-   To let users compare options from a list and select all, any, or none of those items
    
-   To turn a single option on or off
    

### When to use something else

-   To give the user a mutually exclusive choice, use the Radio component instead
    
-   To let users activate an option that takes effect immediately, use a Toggle instead
    

## Guidelines

### Checkbox or Toggle

![image-20240418-175935.png](../../assets/components-inputs-checkbox/image-20240418-175935.png)

Checkboxes are best used for communicating selection (like multiple table rows at once) while switches are best used for communicating activation (e.g., on/off states). A good mnemonic is toggles are often used when the change takes effect immediately whereas checkboxes are saved as a group.

### Checkbox or Radio

![image-20240418-182556.png](../../assets/components-inputs-checkbox/image-20240418-182556.png)

Checkboxes and radio buttons serve different purposes. Use checkboxes when multiple options can be selected, including the possibility of none. Radio buttons, on the other hand, are suitable when only one option from a set of mutually exclusive choices should be selected.

## Content standards

### Using the word “Select” in labels

Use the verb “Select” to describe the action we want people to take when interacting with checkboxes. If multiple selections can be made, be sure to say something like “Select all that apply” in either the heading or the body copy. For example, you could write something like “Select all the days you’re available.”

# Accessibility

Users should be able to:

-   Navigate to a checkbox with assistive technology
    
-   Toggle the checkbox on and off
    

## Keyboard Navigation

**Key**

**Action**

Tab

Moves focus to next checkbox

Space

Toggles a focused checkbox between selected and unselected
