---
chunk: 28
category: Migration
subcategory: Kadence Memberships
query-triggers: [Kadence Memberships migration, Kadence migration, KadenceMigrationController, KadenceAnalyzerService, KadenceMigrationService, import from Kadence, Restrict Content Pro migration, RCP migration, rcp, kadence, run-step, access_groups step, levels step, drip step, memberships step, payments step, subscriptions step, corporate step, cleanup step, delete_kadence_migration_data]
related-chunks: [25, 39]
source-files: [app/Http/Controllers/Migration/KadenceMemberships/KadenceMigrationController.php, app/Services/Migration/KadenceMemberships/KadenceAnalyzerService.php, app/Services/Migration/KadenceMemberships/KadenceMigrationService.php, app/Services/Migration/KadenceMemberships/Steps/]
doc-files: [guide/settings/migration/from-kadence-memberships.md]
renamed-from: Restrict Content Pro (RCP) — v1.0.0 name; renamed to Kadence Memberships in v1.1.0
---

# Migration — From Kadence Memberships

> **v1.1.0 rename**: this integration was called "Restrict Content Pro" in v1.0.0. The source plugin itself was renamed to Kadence Memberships; Fluent Members updated accordingly in v1.1.0. The internal DB `provider` value remains `'rcp'`.

## Prerequisites

- Kadence Memberships (formerly Restrict Content Pro) active and has members
- Fluent Members active
- Fluent Members Pro active for payment/subscription steps

---

## Step-based architecture

Kadence uses a **named-step** model — not sequential phases. The frontend calls `run-step` with a `step` key for each step independently.

### Step map

| Step key | Migrator class | What it does |
|---|---|---|
| `access_groups` | `AccessGroupMigrator` | Import Kadence access groups → Fluent Members Access Groups |
| `levels` | `LevelMigrator` | Import Kadence membership levels → Fluent Members Levels |
| `drip` | `DripMigrator` | Import drip schedule rules |
| `memberships` | `MembershipMigrator` | Import member assignments |
| `payments` | `PaymentMigrator` | Import payment records (Pro only) |
| `subscriptions` | `SubscriptionMigrator` | Import subscription records (Pro only) |
| `corporate` | `CorporateMigrator` | Import corporate seat data |
| `cleanup` | `CleanupMigrator` | Finalize migration, set completion flag |

### Step dependencies

| Step | Requires first |
|---|---|
| `payments` | `memberships` |
| `subscriptions` | `memberships` |
| `corporate` | `levels`, `memberships` |
| `cleanup` | `levels`, `memberships`, `corporate` |

### Conditional steps (`isStepApplicable`)

| Step | Condition |
|---|---|
| `payments` | `defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')` |
| `subscriptions` | `defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')` |
| `corporate` | `KadenceAnalyzerService::hasCorporate()` |
| `drip` | `KadenceAnalyzerService::hasDrip()` |

Non-applicable steps count as satisfied dependencies — UI should skip/grey them.

---

## API routes

All under `/wp-json/fluent-members/v2/migration/kadence` — admin auth required:

| Method | Path | Controller method |
|---|---|---|
| POST | `/migration/kadence/analyze` | `KadenceMigrationController::analyze` |
| POST | `/migration/kadence/run-step` | `KadenceMigrationController::runStep` |
| GET | `/migration/kadence/get-status` | `KadenceMigrationController::getStatus` |
| POST | `/migration/kadence/reset` | `KadenceMigrationController::reset` |

### `run-step` request

```json
{ "step": "levels" }
```

### `get-status` response

```json
{
  "stripe_configured": bool,
  "paypal_configured": bool,
  "debug_mode": bool
}
```

`stripe_configured` from filter `fluent_members/migration/kadence/check_stripe_configured`.
`paypal_configured` from filter `fluent_members/migration/kadence/check_paypal_configured`.

### `reset` endpoint

Only available with `WP_DEBUG = true` AND in WP-CLI context.
Requires body: `{ "confirm": "delete_kadence_migration_data" }`.

Reset sequence:
1. Fires `do_action('fluent_members/migration/kadence/reset_state')`
2. Deletes `fmem_membership_users` rows where `provider = 'rcp'`
3. Deletes FM levels and pricing rows created by the migration
4. Deletes FM access groups created by the migration (keys prefixed `group_`)
5. Calls `KadenceMigrationService::resetState()`

---

## Analysis (`KadenceAnalyzerService::analyze`)

Called before stepping begins. Returns counts and availability flags:
- Level count, member count
- `hasDrip()` — whether drip rules exist
- `hasCorporate()` — whether corporate seat data exists

---

## Database provider value

Kadence-imported membership users are stored with **`provider = 'rcp'`** in `fmem_membership_users`. This is inherited from v1.0.0 and was not changed during the rename. When querying directly: `WHERE provider = 'rcp'` matches both old RCP-imported and new Kadence-imported records.

---

## PayPal subscription import (Pro, v1.1.0)

When Pro is active, `MigrationHooksHandler` registers:
- `fluent_members/migration/kadence/import_subscription` → `handleImportKadenceSubscription`
- `fluent_members/migration/kadence/check_paypal_configured` → `checkPaypalConfigured`
- `fluent_members/paypal_ipn_continuation_sources` → `registerKadenceIpnSource`

PayPal REST PPCP subscriptions are identified by `paypal_era = 'rest_ppcp'`. See chunk 39 for full PayPal import details.

---

## Status mapping (Kadence → Fluent Members)

| Kadence/RCP status | Fluent Members status |
|---|---|
| active | `active` |
| expired | `expired` |
| cancelled | `cancelled` |
| disabled | `suspended` |
| pending | `pending` |

---

## What does NOT transfer

- Content restriction rules (which posts belong to which level)
- Must be manually assigned to Access Groups in Fluent Members after migration

---

## Doc file

`guide/settings/migration/from-kadence-memberships.md`
