---
chunk: 22
category: Integrations
subcategory: FluentCRM
query-triggers: [FluentCRM, CRM integration, tag on membership, list on join, CRM trigger, fluent_members_member_enrolled, fluent_members_member_status_changed, FLUENTCRM]
related-chunks: [05]
source-files: [app/Modules/Integrations/FluentCRM/FluentCRMIntegration.php, app/Modules/Integrations/FluentCRM/FluentCRMHooks.php]
doc-files: [guide/integrations/fluent-crm.md]
---

# Integration — FluentCRM

## Detection

```php
defined('FLUENTCRM') || defined('FLUENTCRM_PLUGIN_VERSION')
```

---

## What it does

Connects Fluent Members membership events to FluentCRM:
- Adds contacts to FluentCRM lists/tags when a member joins or changes status
- Allows FluentCRM automations to trigger on membership events
- Maps FluentCRM tags to membership levels (bidirectional awareness)

---

## Module files

| File | Role |
|---|---|
| `FluentCRMIntegration.php` | Main integration class — hooks into Fluent Members events, calls FluentCRM API |
| `FluentCRMHooks.php` | WordPress action/filter registrations |

---

## Key hooks Fluent Members fires (for CRM to listen to)

| Hook | When | Passes |
|---|---|---|
| `fluent_members/member_enrolled` | New membership created | `$membership` (MembershipUser), `$user` (WP_User) |
| `fluent_members/member_status_changed` | Membership status changes | `$membership`, `$oldStatus`, `$newStatus`, `$user` |
| `fluent_members/member_cancelled` | Membership cancelled | `$membership`, `$user` |
| `fluent_members/member_expired` | Membership expired (cron) | `$membership`, `$user` |

---

## CRM actions triggered on membership events

| Event | CRM action |
|---|---|
| Member enrolled | Add contact to list, apply tags configured for that level |
| Member expired | Remove active tags, apply expired tags |
| Member cancelled | Remove active tags, apply cancelled tags |
| Member status changes | Apply/remove tags based on old → new status mapping |

Tag and list configuration is done per Membership Level in the CRM integration settings.

---

## Doc file

`guide/integrations/fluent-crm.md`
