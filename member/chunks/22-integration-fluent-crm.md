---
chunk: 22
category: Integrations
subcategory: FluentCRM
query-triggers: [FluentCRM, CRM integration, automation trigger, funnel trigger, membership level assigned trigger, membership level removed trigger, membership expired trigger, membership suspended trigger, fluent_members/membership_level_assigned, FLUENTCRM]
related-chunks: [05, 37]
source-files: [app/Modules/Integrations/FluentCRM/Bootstrap.php, app/Modules/Integrations/FluentCRM/MemberHelper.php, app/Modules/Integrations/FluentCRM/Triggers/BaseMembershipTrigger.php, app/Modules/Integrations/FluentCRM/Triggers/MembershipLevelAssignedTrigger.php, app/Modules/Integrations/FluentCRM/Triggers/MembershipLevelRemovedTrigger.php, app/Modules/Integrations/FluentCRM/Triggers/MembershipExpiredTrigger.php, app/Modules/Integrations/FluentCRM/Triggers/MembershipSuspendedTrigger.php]
doc-files: [guide/integrations/fluent-crm.md]
---

# Integration — FluentCRM

## Detection

```php
defined('FLUENTCRM')
```

---

## What it actually does

This is the OPPOSITE direction from "Fluent Members pushes tags into FluentCRM." Instead,
Fluent Members registers **4 Automation Funnel Triggers inside FluentCRM's own automation
builder**. A FluentCRM user creates an automation and picks one of these as the starting
trigger — Fluent Members never applies tags or lists on its own.

---

## Registered triggers (`Bootstrap::registerTriggers()`)

| Trigger class | `triggerName` (also the WP action fired) | Fires when |
|---|---|---|
| `MembershipLevelAssignedTrigger` | `fluent_members/membership_level_assigned` | A membership level is assigned to a user |
| `MembershipLevelRemovedTrigger` | `fluent_members/membership_level_removed` | A membership level is removed (cancelled) from a user |
| `MembershipExpiredTrigger` | `fluent_members/membership_expired` | A membership expires |
| `MembershipSuspendedTrigger` | `fluent_members/membership_suspended` | A membership is suspended |

All 4 extend `BaseMembershipTrigger` (a FluentCRM `BaseTrigger` subclass). A 5th core
membership event, `fluent_members/membership_renewed`, exists (see chunk 24's Level
Integration framework) but has **no** FluentCRM trigger class — automations cannot start
on renewal today.

---

## Trigger configuration (inside FluentCRM's funnel editor)

- **Target Membership Levels** (`target_level_ids`, `rest_selector` sourced from
  `fluent_members_levels`): restrict the trigger to specific Levels. Empty = runs for
  every Level.
- **Subscription Status** (`subscription_status`, default `subscribed`): the FluentCRM
  contact status the automation enrolls the subscriber as.
- **Restart the Automation Multiple times** (`run_multiple`, default `no`): if the
  contact is already in the funnel from a previous run of this same trigger, re-run
  instead of skipping.

---

## Handling logic (`BaseMembershipTrigger::handle`)

1. Reads `user_id` off the `MembershipUser` passed by the fired hook.
2. Builds subscriber data (`email`, `first_name`, `last_name`, `full_name`) via
   `MemberHelper::prepareSubscriberData()`. No email → aborts silently.
3. If `target_level_ids` is set and the membership's level isn't in it → aborts.
4. If the contact is already in this funnel: re-runs only when `run_multiple = yes`
   (and only for a different `membership.id` than the one that started it); otherwise skips.
5. Starts the FluentCRM funnel sequence, tagging the source as
   `source_trigger_name` = the hook name, `source_ref_id` = the `MembershipUser` id.

---

## Other registrations

- `fluentcrm_ajax_options_fluent_members_levels` filter → `MemberHelper::getMembershipLevels`
  (feeds the "Target Membership Levels" dropdown options).
- `fluent_crm/funnel_icons` filter → adds the Fluent Members brand icon to FluentCRM's
  funnel trigger category list.

---

## Doc file

`guide/integrations/fluent-crm.md`
