---
chunk: 23
category: Integrations
subcategory: Fluent Support
query-triggers: [Fluent Support, support integration, membership in support, ticket sidebar, fluent_support/customer_extra_widgets, member badge, FLUENT_SUPPORT]
related-chunks: [05]
source-files: [app/Modules/Integrations/FluentSupport/Bootstrap.php]
doc-files: [guide/integrations/fluent-support.md]
---

# Integration — Fluent Support

## Registration

`Bootstrap::register()` hooks `fluent_support/customer_extra_widgets` (no separate
plugin-detection gate inside the class itself — the module is only booted when Fluent
Support is active).

---

## What it does

Adds a **"Membership Levels" widget** to the customer sidebar on a Fluent Support ticket,
via `Bootstrap::getMembershipWidget()`:

- Looks up every `MembershipUser` row for the ticket's customer (`user_id`), newest first,
  with its `membershipLevel` relation eager-loaded.
- If the customer has no membership rows, the widget doesn't render at all.
- Otherwise renders one line per membership: the Level title + a colored status badge
  (`fmem_badge_<status>` classes for `active`, `trial`, `suspended`, `cancelled`,
  `upgraded`, `expired` — each with its own background/text color).

This is display-only. There is no ticket-submission gating based on membership status in
this module — do not describe a "restrict who can submit tickets" feature unless a future
version adds one.

---

## Doc file

`guide/integrations/fluent-support.md`
