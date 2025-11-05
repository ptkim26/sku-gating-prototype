# Object

**Source:** [View in Confluence](https://rippling.atlassian.net/wiki/spaces/RDS/pages/4832559618)  
**Last Synced:** 11/3/2025, 6:10:01 PM  
**Confluence Version:** 10

---

obj

'Object' provides a simplified overview by structuring entity information (people, organisations, devices).

[Figma](https://www.figma.com/design/nhtRzieeGFf1tGVWnRxSK3/Web-Component-Library-\(v3\)?node-id=66677-182456&t=LIhVFq02mSjs4gJ7-11) | [Storybook](https://pebble.ripplinginternal.com/?path=/docs/components-objectui-header--docs)

---

# Overview

![overview.png](../assets/components-object/overview.png)

Object is a modular component that presents high-level information about an entity: such as a person, organization, device, or other concept.

It is typically placed at the top of a page, below navigation elements.

---

# Specs

## Anatomy

### Object

![anatomy - Objects.png](../assets/components-object/anatomy - Objects.png)

1.  Object header
    
2.  Object Stats
    
3.  Object stats (additional)
    

### Object - Header

![anatomy - Object - header.png](../assets/components-object/anatomy - Object - header.png)

1.  Avatar
    
2.  Title
    
3.  Label
    
4.  Subtext
    
5.  Actions
    
6.  More actions - Overflow
    

### Object - Stats

![anatomy - Object - Stats.png](../assets/components-object/anatomy - Object - Stats.png)

1.  Stat Item
    
2.  Key
    
3.  Value
    
4.  Tooltip
    
5.  UI Actions
    

## Configuration

### Object - Variants

![config - object - varinats.png](../assets/components-object/config - object - varinats.png)

1.  Header (default)
    
2.  With Stats (optional)
    
3.  With multiple Stats (optional)
    

‌

### Object / Header

#### Modifiers:

![config - object - header -varinats.png](../assets/components-object/config - object - header -varinats.png)

1.  Title (default)
    
2.  With Label (optional)
    
3.  with Subtext (optional)
    
4.  With Avatar (optional)
    

‌

### Object / Stats

#### Stats Modifiers:

![config - object - stats -varinats.png](../assets/components-object/config - object - stats -varinats.png)

1.  Key & Value (default)
    
2.  With UI actions (optional)
    
3.  Key & value (multi-row)
    

‌

#### Object / Stats / Key:

![config - stat item -varinats.png](../assets/components-object/config - stat item -varinats.png)

1.  Key
    
2.  With tooltip (optional)
    

‌

#### Object / Stats / Value:

![config - stat item - value -varinats.png](../assets/components-object/config - stat item - value -varinats.png)

1.  Text (Default / positive / negative)
    
2.  Status
    
3.  Country
    
4.  Chip
    
5.  Custom JSX
    

‌

### Object / Actions

![config - UI actions.png](../assets/components-object/config - UI actions.png)

1.  With Primary Button And Action Config
    
2.  With Button Dropdown And Action Config
    
3.  With Icon Type And Action Config
    
4.  With Input Select Actions
    

‌

---

# Usage

![usage.png](../assets/components-object/usage.png)

### When to use

‌Use Object when you want to:

-   Provide a quick overview of an entity.
    
-   Highlight key information and provide global-level actions related to the entity.
    

### When to use something else

-   **Cards vs Object:**
    
    -   Use Cards when you need to present more detailed information about an entity
        
    -   Use Object when you need to display a collection of varied information which offers a high-level overview at a glance.
        
-   **Lists vs Object**
    
    -   List is a better choice when the user's primary goal is to compare and interact with multiple similar items (homogenous content).
        
    -   Object is better for providing an overview (showing heterogenous content) and facilitating actions related to a single entity.
        
-   **Table vs Object:**
    
    -   Use Table to show big datasets that are all the same, and need to be sorted, filtered, and paginated.
        
    -   Use Object to give a quick summary of something with mixed types of data and overall actions.
        

## Guidelines

### Stacking Modularity

![guidelines - modularity.png](../assets/components-object/guidelines - modularity.png)

-   Organize & segregate additional information using: Secondary and tertiary stats-sections.
    
-   Stacking follows pre-determined component guidelines.
    
-   Border radius: The user controls border radius by setting the border-radius theme values (based on the Object stat's tier status).
    

### Content organisation

![guidelines - organisation.png](../assets/components-object/guidelines - organisation.png)

-   Separate content with a grid and space it evenly.
    
-   Ensure that the content wraps based on the available space.
    
-   **Customisation**: Consumers have flexibility to customize the stats section - using custom JSX.
    

## Content Guidelines

-   Use a clear and concise header to identify the entity.
    
-   Use short, descriptive key-value pairs to present information about the entity.
    

## Internationalization

-   When translating the Object into RTL languages, flip the layout based on the language-localisation guidelines.
    

---

# Accessibility

-   Ensure that the Object is accessible to users with disabilities.
    
-   Provide keyboard navigation for all interactive elements.
    
-   Use descriptive alt text for all images.
    

## Keyboard Navigation

**Key**

**Action**

Tab

Navigate through interactive elements

Enter

Activate interactive elements

‌

‌
