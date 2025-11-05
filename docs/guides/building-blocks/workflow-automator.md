# Workflow Automator v2

**Source:** [View in Confluence](https://rippling.atlassian.net/wiki/spaces/RDS/pages/3868524572)  
**Last Synced:** 11/3/2025, 6:37:51 PM  
**Confluence Version:** 2

---

##### Watch this 15-min video on what is “Objects” in rippling and how we utilize this concept in Workflow Automator:

##### [https://www.loom.com/share/8159b2b929c94bbab900aa20f7bc6981](https://www.loom.com/share/8159b2b929c94bbab900aa20f7bc6981)

# **Resources**

-   proxying account: `583fd88012fba0c57a866d1a`
    
-   [Figma file](https://www.figma.com/file/6NNObICfoPGZ1P7mFidu2E/Workflows-2.0?type=design&node-id=0%3A1&mode=design&t=bPqKKZaiV87djfUQ-1)
    
-   [Product requirement doc](https://rippling.atlassian.net/l/cp/MYynP4Bd)
    
-   [Get started with workflows help center articles](https://help.rippling.com/s/topic/0TO4o000000HtfMGAS/get-started-with-workflows)
    
-   PM: Ziad Abouchadi
    
-   Design: Ryland Webb
    
-   Eng lead: Dilanka Dharmasena
    

# **What is Workflow Automator**

Rippling Workflow Automator lets you create customized workflows that automatically take an action when a specific event happens in Rippling. For example, you can use workflows to create rules for automatically notifying someone via email, assigning a task, or calling a webhook to take an action in an external application.

**Note: The number of workflows you have access to create depends on your Rippling plan. Contact Rippling to learn about your access level and upgrade to get access to more workflows.**

## **Workflow Principles**

[https://whimsical.com/start-and-end-graph-84FMg6XGSuV4Hz74VEaeKL](https://whimsical.com/start-and-end-graph-84FMg6XGSuV4Hz74VEaeKL)

1- An Automation has a start and an end. An automation starts when it is triggered. An automation can be triggered by record updates, events, manual actions, etc.

 2- Between the start and the end, an automation has a series of steps. When an automation is started, it will go through the steps, one by one. We only move to a step once we have finished the previous step. An instance of the automation can only be in one step at a time (can’t be in step 1 and step 3 at the same time). An automation ends when all the steps of the automation have been executed

There are 3 types of steps:

-   A trigger: This is always the start of an automation. E.g. an employee is hired, Monday 9am, 7 days before start date, a user clicks on a button. A trigger only starts the first step of an automation, it doesn’t do anything other than that.
    
-   An action: An action steps “does” something. E.g. send an email, update a Rippling record, request approval.
    
-   A logic: A logical step is a way to organize action steps. E.g. of logical steps, evaluation (IF/ELSE), loop (FOR EACH), delays (WAIT)
    

 3- A step can read and write from any record in the customer’s account (while respecting permission). An automation has access to the entire customer’s account, and is not limited by the trigger. This is a major departure from the current version of a workflow, where the trigger object determines all the variables available in the workflow.

Example of automations that we want to support: The automation is triggered when an employee is hired, Step 1 could be to loop over all employee records that have the same name as the new hire, and step 2 could be to increase their salary by 50%

4- In addition to all customer records, a step can leverage results from all previous steps, including the trigger. For instance:

Step 1 - sends an email

Step 2 - Wait 3 days

Step 3 - Get the email record that matches the email sent in step1 from the email table

Step 4 - If email is not open, send a follow up reminder

## **How have workflows changed between v1 and v2?**

Breaking down the Automation Problem at Rippling

Workflows v2 now supports the following:

-   Workflows triggered by business events, scheduled events, change events, webhook requests, and manual invocations
    
-   Multi-step workflows
    
    -   As well as a new catalog of actions from 12 different applications
        
    -   You can now build conditions on the inputs and outputs of each workflow step
        
-   Easy creation, editing, and de-bugging
    
-   Draft states
    
-   Standard programming language primitives
    
    -   Forking, joining, loops
        
-   Workflow diagnostics and testing
    

## **What this will look like**

[https://www.loom.com/share/b1e9aceed077499fa156cf7365780257?sid=019710c2-4850-4522-9568-246239acc9a8](https://www.loom.com/share/b1e9aceed077499fa156cf7365780257?sid=019710c2-4850-4522-9568-246239acc9a8)

## **Roadmap**

### **The P0 release for this product should have the following:**

-   Trigger:
    
    -   Events: user can select from an explicit set of events to trigger the workflow. Event examples: EE is hired, PTO is requested, Payroll is approved, Expense is submitted, etc
        
    -   We will **not** support “RQL condition becomes true” as a trigger system for workflow v2 . I.e we will not support trigger a workflow when the condition “EE.compensation Greater than $500” becomes true (implications below)
        
-   Workflow canvas
    
    -   Move the canvas around (Scroll around)
        
    -   Add trigger
        
    -   Drag and drop actions
        
    -   Successive steps
        
    -   Concurrent steps
        
    -   Action branching
        
-   Workflow actions (95% of current workflow usage)
    
    -   Send email
        
    -   Generic REST API call (aka webhook)
        
    -   RQL data pull
        
    -   Assign value to workflow variable (details needed)
        
-   Workflow logic
    
    -   IF/THEN/ELSE
        
    -   FOR EACH: Loop over a list, and take actions on each element of the list
        
    -   WAIT FOR: step to pause for a defined number of seconds
        
    -   EXIT\_WORKFLOW: If we hit this step, we just exit the workflow. Use case: if certain conditions are true, no need to keep going
        
-   Workflow data:
    
    -   Each workflow action output (even API calls) should be available for ulterior actions as input
        
    -   Ability to define a variable (bool, string, int, double, array, enum, etc.) that is global variable in the context of a workflow instance
        
    -   Ability to inject a variable as an input in a workflow action (existing behavior)
        
-   Workflow trigger testing (IFF the event history is available - xteam dependency)
