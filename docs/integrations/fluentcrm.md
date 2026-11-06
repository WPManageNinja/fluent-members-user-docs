---
title: "FluentCRM"
description: "Start FluentCRM automations when a membership is assigned, renewed, about to expire, cancelled, removed, expired or suspended."
---

# FluentCRM

The **FluentCRM** integration adds membership triggers to FluentCRM automations, so a welcome series, renewal reminder or win-back email can start when a membership changes. Use it for messages and follow-ups that go beyond the [email notifications](/docs/settings/email-configuration/email-notifications) Fluent Members sends. It works on the free plan.

You need FluentCRM active on your site. The triggers appear on their own.

## Create an automation

Follow these steps to start an automation from a membership change:

1. In FluentCRM, go to **Automations** and click **New Automation**.
2. Click **FluentMembers** in the list of trigger groups, then choose a trigger.

    <!-- TODO(screenshot): fluentcrm-1
      screen: FluentCRM → Automations → New Automation → FluentMembers
      state: trigger list cropped to the seven FluentMembers triggers
      data: -
      highlight: -
      view: admin
      alt: Screenshot of the FluentMembers triggers in the Create an Automation window
      reason: needs the develop build on the local site, which still shows four triggers
    -->

3. Give the automation a name and continue.
4. Set the trigger options described below, then add your actions.

## Triggers

The **FluentMembers** group has these triggers:

| Trigger | Starts when |
|---------|-------------|
| **Membership Level Assigned** | A membership level is assigned to a user. |
| **Membership Level Removed** | A membership level is removed (cancelled) from a user. |
| **Membership Expiring** | A membership is about to expire. |
| **Membership Expired** | A membership expires. |
| **Membership Renewed** | A payment renews a membership. |
| **Membership Cancelled** | A member or an admin cancels a membership. |
| **Membership Suspended** | A membership is suspended. |

Three of these need a closer look:

- **Membership Expiring** runs from a daily check and fires once for each expiry date. It uses the number of days before expiry set on the **Membership Expiring** email, 7 by default. It fires even if that email is turned off.
- **Membership Cancelled** fires when the cancellation is made, including one set to take effect at the end of the paid period. The member can still have access at that point.
- **Membership Level Removed** fires when the membership actually becomes cancelled, which is when access ends.

## Trigger options

Each trigger has the same options:

<!-- TODO(screenshot): fluentcrm-2
  screen: FluentCRM → Automations → an automation with a FluentMembers trigger → trigger settings
  state: Subscription Status, Target Membership Levels and the restart checkbox visible, cropped to the settings panel
  data: a draft automation, restored afterwards
  highlight: -
  view: admin
  alt: Screenshot of the trigger settings with Target Membership Levels
  reason: showing this panel requires saving a new automation, which the brief does not allow without restoring it
-->

| Option | Notes |
|--------|-------|
| **Subscription Status** | The status given to the contact when the automation adds them. **Subscribed** by default. Choosing pending sends a double opt-in email. |
| **Target Membership Levels** | The levels that start the automation. Leave it empty to run for all levels. |
| **Restart the Automation Multiple times for a contact for this event** | Runs the automation again for a contact who is already in it. Otherwise they are skipped. On by default for **Membership Expiring** and **Membership Renewed**, off for the others. |

The automation uses the member's WordPress account for the contact's email and name, and creates the contact if there is none.

## After a migration

If you migrated from another membership plugin, the optional **Convert FluentCRM Automations** step copies automations that use that plugin's triggers to these triggers. See the [migration overview](/docs/settings/migration/).
