---
chunk: 24
category: Integrations
subcategory: Fluent Community (Level Integration framework)
query-triggers: [Fluent Community, FluentCommunity, community integration, community access, FLUENT_COMMUNITY_PLUGIN_VERSION, space access, course access, gated community, Level Integration, LevelIntegrationModule, BaseIntegrationManager, membership_renewed, event_trigger, watch_on_access_revoke]
related-chunks: [05, 37]
source-files: [app/Modules/Integrations/LevelIntegration/LevelIntegrationModule.php, app/Modules/Integrations/LevelIntegration/LevelIntegrationEventListener.php, app/Modules/Integrations/LevelIntegration/BaseIntegrationManager.php, app/Modules/Integrations/LevelIntegration/FluentCommunity/Bootstrap.php, app/Modules/Integrations/LevelIntegration/FluentCommunity/Connector.php]
doc-files: [guide/integrations/fluent-community.md]
---

# Integration — Fluent Community

FluentCommunity is the first (and currently only) connector built on a reusable **Level
Integration framework** (`app/Modules/Integrations/LevelIntegration/`), designed for other
"sync a Level to units of content in another WPManageNinja plugin" integrations later.

## Detection

```php
defined('FLUENT_COMMUNITY_PLUGIN_VERSION')
```

`Bootstrap` (the FluentCommunity connector) extends `BaseIntegrationManager`, category
`lms`, `installable = 'fluent-community/fluent-community.php'`.

---

## The 5 core membership events

`LevelIntegrationEventListener::registerHooks()` listens on all 5 of these WP actions
(fired elsewhere in Fluent Members as `fluent_members/{hook}`):

| Hook | Treated as a "revoke" event? |
|---|---|
| `membership_level_assigned` | No |
| `membership_renewed` | No |
| `membership_level_removed` | Yes |
| `membership_expired` | Yes |
| `membership_suspended` | Yes |

`renewed` is a grant-side event with no dedicated FluentCRM trigger (see chunk 22) — it
exists specifically for level-integration feeds like this one.

---

## Per-Level "feed" configuration

Each Membership Level can have a FluentCommunity integration feed, stored in `fmem_meta`
(`object_type = 'membership_level_integration'`, `object_id = <level id>`,
`meta_key = 'fluent_community'`). Configurable fields (`Connector::getSettingsFields`):

| Field | Purpose |
|---|---|
| `space_ids` | Spaces to add the member to |
| `course_ids` | Courses to enroll the member in (only shown if FluentCommunity's `course_module` feature is enabled) |
| `remove_space_ids` | Spaces to remove the member from |
| `remove_course_ids` | Courses to un-enroll the member from |
| `event_trigger` | Which of the 5 events above actually run this feed |
| `watch_on_access_revoke` | yes/no — default yes. When yes, this feed also fires on any revoke-type event even if that event isn't explicitly listed in `event_trigger` |

---

## Dispatch flow

1. A core event fires → `LevelIntegrationEventListener::mapAllIntegrationActions()`.
2. It loads every enabled integration provider (`fluent_members/integration/level_integrations`
   filter) and every feed stored for that membership's Level.
3. For each feed whose provider is enabled and whose `event_trigger` (or
   `watch_on_access_revoke`) matches the firing hook, it dispatches
   `do_action('fluent_members/integration/run/<provider>', $integrationArray)`.
4. `BaseIntegrationManager` catches that action and calls the connector's
   `processAction($membership, $eventData)` — for FluentCommunity, this adds/removes the
   user from the configured spaces/courses via FluentCommunity's own `SpaceUserPivot` /
   course-enrollment APIs.
5. On any revoke-type hook, `fluent_members/integration/revoke_orphaned/<provider>` also
   fires for every enabled provider (not just ones with a matching feed) so a connector can
   clean up access that's no longer justified by any remaining active membership.

---

## Doc file

`guide/integrations/fluent-community.md`
