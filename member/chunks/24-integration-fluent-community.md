---
chunk: 24
category: Integrations
subcategory: Fluent Community
query-triggers: [Fluent Community, community integration, community access, FLUENT_COMMUNITY, space access, gated community]
related-chunks: []
source-files: [app/Modules/Integrations/FluentCommunity/FluentCommunityIntegration.php]
doc-files: [guide/integrations/fluent-community.md]
---

# Integration — Fluent Community

## Detection

```php
defined('FLUENT_COMMUNITY') || defined('FLUENT_COMMUNITY_VERSION')
```

---

## What it does

Connects Fluent Members memberships to Fluent Community spaces:
- Grants or revokes access to community spaces based on membership level
- When a member joins a level → automatically admitted to linked community spaces
- When a membership expires or is cancelled → access to linked spaces is revoked

---

## Module file

| File | Role |
|---|---|
| `FluentCommunityIntegration.php` | Integration class — hooks into Fluent Members events, calls Fluent Community API |

---

## Configuration

Community space access is configured per Membership Level. In the level settings, select which Fluent Community spaces members of that level should access.

---

## Key events handled

| Fluent Members event | Community action |
|---|---|
| `fluent_members/member_enrolled` | Add user to configured spaces |
| `fluent_members/member_expired` | Remove user from configured spaces |
| `fluent_members/member_cancelled` | Remove user from configured spaces |
| `fluent_members/member_status_changed` → active | Add user back if previously removed |

---

## Doc file

`guide/integrations/fluent-community.md`
