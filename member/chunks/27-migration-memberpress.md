---
chunk: 27
category: Migration
subcategory: MemberPress
query-triggers: [MemberPress migration, memberpress, import from MemberPress, MemberPressMigrationController, MemberPressMigrationService, Stripe subscription transfer, AccessGroupMigrator, CorporateMigrator, LevelMigrator, MembershipMigrator, OrderMigrator, SubscriptionMigrator, TransactionMigrator]
related-chunks: [25, 29, 39]
source-files: [app/Http/Controllers/Migration/MemberPress/MemberPressMigrationController.php, app/Services/Migration/MemberPress/MemberPressMigrationService.php, app/Services/Migration/MemberPress/MemberPressAnalyzerService.php, app/Services/Migration/MemberPress/Steps/]
doc-files: [guide/settings/migration/from-memberpress.md]
---

# Migration — From MemberPress

## Prerequisites

- MemberPress active with its tables present
- Fluent Members active; for Stripe subscription continuation, Fluent Members Pro active
  with Stripe connected

---

## Routes (`/wp-json/fluent-members/v2/migration/memberpress`)

| Method | Path | Controller method | Step class |
|---|---|---|---|
| GET | `/stats` | `getStats` | `MemberPressAnalyzerService::getStats()` |
| GET | `/status` | `getStatus` | `MemberPressMigrationService::getStatus()` + `debug_mode` |
| POST | `/analyze` | `analyze` | `MemberPressAnalyzerService::analyze()` |
| POST | `/migrate/access-groups` | `migrateAccessGroups` | `AccessGroupMigrator` |
| POST | `/migrate/levels` | `migrateLevels` | `LevelMigrator` — MemberPress products → Levels + native pricing rows |
| POST | `/migrate/memberships` | `migrateMemberships` | `MembershipMigrator` — MemberPress transactions + subscriptions → `MembershipUser` rows |
| POST | `/migrate/orders` | `migrateOrders` | `OrderMigrator` — `mepr_transactions` → `MembershipOrder` (Pro) |
| POST | `/migrate/transactions` | `migrateTransactions` | `TransactionMigrator` — → `MembershipTransaction` (Pro) |
| POST | `/migrate/subscriptions` | `migrateSubscriptions` | `SubscriptionMigrator` — `mepr_subscriptions` → `MembershipSubscription` (Pro) |
| POST | `/migrate/corporate` | `migrateCorporate` | `CorporateMigrator` |
| POST | `/migrate/cleanup` | `migrateCleanup` | `CleanupMigrator`, requires body `{ substep }` |
| GET | `/logs` | `getLogs` | `MemberPressMigrationService::getFailedLogs()` |
| GET | `/summary` | `getSummary` | Stored summary option + status |
| POST | `/reset` | `resetState` | See below |

`CorporateMigrator` and `MembershipMigrator` both temporarily suppress the 4 core
membership hooks (`fluent_members/membership_level_assigned`,
`membership_level_removed`, `membership_suspended`, `membership_expired`) while bulk
writing, so migration doesn't fire every downstream integration/automation per row.

---

## Cleanup substeps (`CleanupMigrator::SUBSTEPS`)

`verify_memberships` → `fix_access_cache` → `fix_corporate_status` → `build_summary`.
(No `reconcile_member_providers` or `link_subscription_orders` substep — those are
PMPro-only; MemberPress's own Stripe transfer happens inside `SubscriptionMigrator` /
the Pro filter below, not as a separate cleanup pass.)

---

## Stripe subscription transfer + PayPal import (Pro)

`fluent-members-pro`'s `MigrationHooksHandler` implements MemberPress's `import_order`,
`import_transaction`, `import_subscription`, `check_stripe_configured`, and
`check_paypal_configured` filters. For a MemberPress subscription billed via Stripe with
Fluent Members Pro's Stripe connected, the handler links the live Stripe subscription to
the new Fluent Members subscription record so billing continues without the member
re-entering card details. A subscription with `paypal_era = 'rest_ppcp'` gets the PayPal
continuation path instead (see chunk 25). MemberPress itself posts legacy PayPal IPNs to
`index.php?plugin=mepr&pmt={gateway}&action=ipn`; the handler only takes over that routing
once MemberPress is inactive.

---

## Reset

`POST /reset` with `{ "confirm": "delete_memberpress_migration_data" }`, gated the same
OR (`WP_DEBUG` or `WP_CLI`) way as every other source (see chunk 25). Deletes
`fmem_membership_users` rows where `provider IN ('memberpress','stripe','paypal')` AND
`provider_source_id` starts with `txn:`, `sub:`, or `mp_ca_` (the last is the corporate
sub-member marker) — scoped this way so a colliding id from another provider is never
touched. Fires `fluent_members/migration/memberpress/reset_state` with the migrated order
and subscription ids first, so Pro can drop its own rows before the base ones go.

---

## Doc file

`guide/settings/migration/from-memberpress.md`
