---
title: "Level Automations"
description: "See the FluentCRM automations that use a Membership Level, check how many contacts went through each, and publish or pause them from the level."
---

# Level Automations

The **Automations** tab of a level lists the FluentCRM automations that use that level. Use it to check what runs when someone joins, leaves or renews, and to pause or publish an automation without leaving the level.

The tab appears only when FluentCRM is active on your site. To build the automations themselves, see [FluentCRM](/docs/integrations/fluentcrm).

## Open the tab

Go to **Fluent Members → Membership Levels**, open the level and click **Automations**.

![Screenshot of the Automations tab of a level](/images/levels/automations/levels-automations-1.webp)

## Which automations appear

An automation is listed when it names the level in any of these places:

- Its **trigger**, as one of the levels the trigger watches.
- An **Assign Membership Level** or **Remove Membership Level** step.
- A condition that checks the contact's active levels.

An automation whose trigger is a Fluent Members trigger and has no target level runs for every level, so it appears under **Every level** on all of them.

The tab splits the list in two:

- **Only this level:** Automations that name only this level.
- **Shared with other levels:** Automations that also use other levels, or have no target level. Publishing or pausing one here changes it for every level it uses.

Published automations are listed first, then by title.

## Read a row

| Column | What it shows |
|--------|---------------|
| **Automation** | The automation's title, its trigger, and what it does with this level: **Assigns this level**, **Removes this level** or **Checks this level in a condition**. Chips show the levels the trigger watches. |
| **Status** | **Published** or **Draft**. |
| **Stats** | The number of contacts who entered the automation. Hover over it to see **Entered** and **In progress** counts. |
| **Pause/Run** | A switch that publishes the automation or turns it back into a draft. |
| **Open in FluentCRM** | Opens the automation in FluentCRM in a new tab. |

> [!Note]
> **Stats** counts contacts for the whole automation, not only this level. A shared automation shows the same count on every level it uses.

## Publish or pause an automation

Turn the **Pause/Run** switch on to publish the automation, or off to make it a draft. The change saves straight away. The **Pause/Run** column and the **New Automation** button show only if your account can edit FluentCRM automations. Without that permission you can still read the list if you have permission to view them.

## Add an automation

Click **New Automation** to open FluentCRM's automation list in a new tab and start one. Give it a Fluent Members trigger, or add an **Assign Membership Level** or **Remove Membership Level** step for this level. Return to this tab to see the new row.

If no automation uses the level yet, the tab says "No FluentCRM automations use this level yet."

## Delete a level that an automation uses

You cannot delete a level while a FluentCRM automation uses it, whether the automation is published or a draft. The message names each automation, marks drafts with "(draft)", and tells you to remove the level from those automations first. Open each one from the tab, remove the level, then delete the level.

A level with member records or billing history can't be deleted either. Set it to **Inactive** instead. See [Membership Levels](/docs/levels/).
