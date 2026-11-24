---
title: "FluentCRM"
description: "Start FluentCRM automations from membership changes, give and remove levels from automations, and keep levels and FluentCRM tags in sync."
---

# FluentCRM

The **FluentCRM** integration connects memberships to your email marketing. Membership changes start FluentCRM automations, automations can give or remove a level, levels can follow FluentCRM tags, and each contact shows their memberships. Use it for welcome series, renewal reminders and win-back emails that go beyond the [email notifications](/docs/settings/email-configuration/email-notifications) Fluent Members sends. It works on the free plan.

You need FluentCRM active on your site. The triggers, steps, filters and smart codes appear on their own, and a **FluentCRM** item appears in the **Settings** menu.

## Start an automation from a membership change

Follow these steps to start an automation:

1. In FluentCRM, go to **Automations** and click **New Automation**.
2. Click **FluentMembers** in the list of trigger groups, then choose a trigger.
3. Give the automation a name and continue.
4. Set the trigger options described below, then add your actions.

![Screenshot of the FluentMembers triggers in the Create an Automation window](/images/integrations/fluentcrm/fluentcrm-triggers.webp)

### Triggers

The **FluentMembers** group has these triggers:

| Trigger | Starts when |
|---------|-------------|
| **Membership Level Assigned** | A membership level is assigned to a user. |
| **Membership Level Removed** | A membership level is removed (cancelled) from a user. |
| **Membership Expiring** | A membership is about to expire. |
| **Membership Expired** | A membership expires. |
| **Membership Renewed** | A payment renews a membership. |
| **Membership Cancelled** | A member or an admin cancels a membership. |
| **Membership Cancellation Scheduled** | A membership is set to end at the end of its paid period. |
| **Membership Cancellation Withdrawn** | A scheduled cancellation is undone and the membership continues. |
| **Membership Suspended** | A membership is suspended. |
| **Membership Payment Failed** | A renewal payment fails. It starts once, and again only after a later payment succeeds. |
| **Membership Plan Changed** | A member upgrades or downgrades to another level. The target levels are the levels moved to. |

A few of these need a closer look:

- **Membership Expiring** runs from a daily check and fires once for each expiry date. It uses the number of days before expiry set on the **Membership Expiring** email, 7 by default. It fires even if that email is turned off.
- **Membership Cancelled** fires when the cancellation is made, including one set to take effect at the end of the paid period. The member can still have access at that point.
- **Membership Level Removed** fires when the membership actually becomes cancelled, which is when access ends.

### Trigger options

Each trigger has the same options:

| Option | Notes |
|--------|-------|
| **Subscription Status** | The status given to the contact when the automation adds them. **Subscribed** by default. Choosing a pending status sends a double opt-in email to new contacts. |
| **Target Membership Levels** | The levels that start the automation. Leave it empty to run for all levels. |
| **Restart the Automation Multiple times for a contact for this event** | Runs the automation again for a contact who is already in it. Otherwise they are skipped. On by default for **Membership Expiring**, **Membership Renewed**, **Membership Cancelled**, **Membership Cancellation Scheduled** and **Membership Cancellation Withdrawn**, off for the others. |

The automation uses the member's WordPress account for the contact's email and name, and creates the contact if there is none.

<!-- TODO(screenshot): fluentcrm-2
  screen: FluentCRM → Automations → an automation with a FluentMembers trigger → trigger settings
  state: Subscription Status, Target Membership Levels and the restart checkbox visible
  data: a draft automation named DOCTEST Welcome
  highlight: Target Membership Levels
  view: admin
  alt: Screenshot of the trigger settings with Target Membership Levels
-->

## Give or remove a level from an automation

Two action steps in the **FluentMembers** group change a member's levels. Only administrators can save automations that use them.

**Assign Membership Level** gives the contact a level. A contact who already has an active membership of that level is skipped.

| Field | Notes |
|-------|-------|
| **Membership level to assign** | The level to give. |
| **Access ends** | **As set on a free level, otherwise never**, **Never (lifetime access)**, or **After a number of days** with a **Number of days** field. |
| **Do not assign the level if the contact is not an existing WordPress user** | Skips contacts who have no account. |
| **Send the default WordPress welcome email to new WordPress users** | Shown when the box above is off. A WordPress user is created when no user has the contact's email address. |

**Remove Membership Level** cancels the contact's active membership of one level. Memberships of other levels are not touched.

| Field | Notes |
|-------|-------|
| **Membership level to remove** | The level to cancel. |
| **When access ends** | **Immediately**, or **At the end of the paid period**. The second choice skips a membership that has no end date to keep access until. |

> [!Note]
> **Remove Membership Level** cancels the membership only. An active subscription is not cancelled at the payment gateway or in the store, so cancel it there if the member should stop paying.

A step that cannot run, such as an inactive level or a contact with no account, is skipped and the reason is saved in the automation's notes for that contact.

## Use memberships in conditions, segments and emails

Membership data is available across FluentCRM under **FluentMembers**:

- **Conditions:** In an automation condition, filter on **Active membership level**, **Membership status** and **Active membership: days until it expires**.
- **Segments and contact filters:** The advanced filter has the same three fields plus **Active membership expires**. The days filter has the choices **within the next (days)**, **exactly (days away)** and **more than (days away)**. It counts whole days in site time, and lifetime memberships never match.
- **Smart codes:** Use these in emails and pages:

| Smart code | Output |
|------------|--------|
| <code v-pre>{{fluent_members.active_levels}}</code> | The contact's active membership levels. |
| <code v-pre>{{fluent_members.expires_at}}</code> | The date the next active membership expires. |
| <code v-pre>{{fluent_members.days_left}}</code> | Days until the next active membership expires. |
| <code v-pre>{{fluent_members.portal_url}}</code> | The member portal URL. |

On a contact's profile, the **FluentMembers Memberships** widget lists up to 10 memberships with their level, source, start date and expiry, or **Lifetime access**. **View the member in FluentMembers** opens the member.

![Screenshot of the FluentMembers Memberships widget on a FluentCRM contact](/images/integrations/fluentcrm/fluentcrm-3.webp)

## Sync levels with FluentCRM tags

**Tag sync** ties a level to one FluentCRM tag in both directions. A member of the level gets the tag, and a contact who gets the tag becomes a member of the level.

1. Go to **Fluent Members → Settings → FluentCRM**.
2. Turn on **Sync membership levels with FluentCRM tags**.
3. In **Levels and their tags**, click **+ Set a tag** on a level and search for a tag. A tag already synced with another level cannot be picked, because a tag belongs to one level only. You can also create a new tag, which is suggested from the level name.
4. Review what will change, then click **Save and sync**.

<!-- TODO(screenshot): fluentcrm-4
  screen: Fluent Members → Settings → FluentCRM
  state: Levels and their tags table with one level in sync and one level showing Set a tag
  data: two levels and two FluentCRM tags
  highlight: + Set a tag
  view: admin
  alt: Screenshot of the FluentCRM settings tab with the levels and tags table
-->

The first sync runs in the dialog with a progress bar, 50 contacts at a time, and sends no membership emails. Keep the page open. If you close it, the sync pauses and **Resume** carries on from where it stopped. Automations that start on these tags may run for the contacts.

The **Sync** column shows **In sync**, **Needs sync**, **Tag deleted in FluentCRM** or **Not synced**. Click **Sync again** to run it once more. The pencil on a row changes the tag and shows what happens to current members first. **Stop syncing this level** makes the level stop following its tag without changing any tags or memberships.

### How the sync behaves

- **Membership starts:** The member gets the tag. A member who is not yet a contact is added as a contact.
- **Membership ends:** The tag is removed.
- **Tag added to a contact:** The contact becomes a member of the level at no charge, with no expiry date. Pricing stays as it is, and the tag is one more way in.
- **Tag removed from a contact:** Only memberships that the tag sync gave are cancelled. Memberships the member got by paying, or that you assigned, stay. If the contact still has one of those, the tag is put back.

Two settings decide the edge cases:

| Setting | Notes |
|---------|-------|
| **People not yet in FluentCRM** | The status a new contact gets: **Add as Transactional**, **Add as Subscribed** or **Add as Pending (double opt-in)**. |
| **Tagged contacts without a WordPress account** | **Wait until they sign up** gives the level when the person registers or logs in with the contact's email address, so use it only when people cannot sign up with an email address they do not own. **Create an account for them** creates the account and emails a link to set a password, then gives the level. |

## Automations on a level

A level's **Automations** tab lists the FluentCRM automations that use that level in a trigger, a step or a condition, and lets you publish or pause them. See [level automations](/docs/levels/automations).

## After a migration

If you migrated from another membership plugin, the optional **Convert FluentCRM Automations** step copies automations that use that plugin's triggers to these triggers. See the [migration overview](/docs/settings/migration/).
