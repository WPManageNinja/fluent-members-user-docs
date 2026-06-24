---
chunk: 23
category: Integrations
subcategory: Fluent Support
query-triggers: [Fluent Support, support integration, membership in support, ticket access, FLUENT_SUPPORT, member badge]
related-chunks: []
source-files: [app/Modules/Integrations/FluentSupport/FluentSupportIntegration.php]
doc-files: [guide/integrations/fluent-support.md]
---

# Integration — Fluent Support

## Detection

```php
defined('FLUENT_SUPPORT') || defined('FLUENT_SUPPORT_VERSION')
```

---

## What it does

Displays membership information within Fluent Support ticket views:
- Shows the customer's active membership level(s) in the support ticket sidebar
- Agents can see at a glance what plan the submitter is on
- Optionally restricts who can submit tickets based on membership status

---

## Module file

| File | Role |
|---|---|
| `FluentSupportIntegration.php` | Integration class — hooks into Fluent Support UI, injects membership data |

---

## Typical use case

Premium support access: only members on specific plans can submit tickets. The integration checks the submitter's active memberships and shows/hides the ticket form accordingly.

---

## Doc file

`guide/integrations/fluent-support.md`
