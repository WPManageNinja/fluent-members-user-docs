---
chunk: 28
category: Migration
subcategory: Kadence Memberships
query-triggers: [Kadence Memberships migration, Kadence migration, KadenceMigrationController, KadenceAnalyzerService, KadenceMigrationService, import from Kadence, Restrict Content Pro migration, RCP migration, rcp, kadence, kadence_memberships, run-step, access_groups step, levels step, drip step, memberships step, payments step, subscriptions step, corporate step, cleanup step, delete_kadence_migration_data, GLOBAL_TYPE_MAP]
related-chunks: [25, 39]
source-files: [app/Http/Controllers/Migration/KadenceMemberships/KadenceMigrationController.php, app/Services/Migration/KadenceMemberships/KadenceAnalyzerService.php, app/Services/Migration/KadenceMemberships/KadenceMigrationService.php, app/Services/Migration/KadenceMemberships/Steps/]
doc-files: [guide/settings/migration/from-kadence-memberships.md]
renamed-from: Restrict Content Pro (RCP) — old plugin name; renamed to Kadence Memberships. The internal DB provider value and legacy table prefix (rcp_*) were kept as-is.
---

# Migration — From Kadence Memberships

> This source plugin was renamed from **Restrict Content Pro (RCP)** to **Kadence
> Memberships**. Fluent Members' code still uses `rcp` internally: the DB
> `provider` value on migrated members is `'rcp'`, and Kadence's own drip-schedule table
> is still named `wp_rcp_drip_schedules`. `MigrationRegistry`'s source key is
> `kadence_memberships`.

## Prerequisites

- Kadence Memberships (formerly Restrict Content Pro) active with its tables present
- Fluent Members active; Pro active for the `payments` and `subscriptions` steps

---

## Step-based architecture (named-step, not sequential phases)

The frontend calls `POST /migration/kadence/run-step` with `{ "step": "<name>" }` for each
step independently — this same shape is now shared by PMPro and MemberPress too (see
chunk 25), just under per-step routes instead of one shared `run-step` endpoint.

### Step map (`KadenceMigrationController::$stepMap`)

| Step key | Migrator class | What it does |
|---|---|---|
| `access_groups` | `AccessGroupMigrator` | Import Kadence access rules → Access Groups, mapping global restriction types (`GLOBAL_TYPE_MAP`: `post`→`all_posts`, `page`→`all_pages`, `product`→`wc_all_products`, `fluent-products`→`fct_all_products`) |
| `levels` | `LevelMigrator` | Import Kadence membership levels → Levels + native pricing rows |
| `drip` | `DripMigrator` | Import `rcp_drip_schedules` rows into Access Group content drips |
| `memberships` | `MembershipMigrator` | Import member assignments |
| `payments` | `PaymentMigrator` | Import payment records → Orders/Transactions (Pro) |
| `subscriptions` | `SubscriptionMigrator` | Import subscription records (Pro) |
| `corporate` | `CorporateMigrator` | Import corporate seat data |
| `cleanup` | `CleanupMigrator` | Finalize, verify, build summary |

### Step dependencies (`$stepDependencies` — corrected)

| Step | Requires first |
|---|---|
| `access_groups` | *(none)* |
| `levels` | `access_groups` |
| `drip` | `levels` |
| `memberships` | `levels` |
| `payments` | `memberships` |
| `subscriptions` | `memberships`, `payments` |
| `corporate` | `levels`, `memberships` |
| `cleanup` | `levels`, `memberships`, `corporate` |

`levels` depending on `access_groups`, and `subscriptions` depending on `payments` (not
just `memberships`), are easy to miss — get either order wrong and `run-step` returns 422
`Step "X" requires "Y" to complete first`.

### Conditional steps (`isStepApplicable`)

A non-applicable step is treated as a satisfied dependency, so the UI can skip it:

| Step | Condition |
|---|---|
| `payments`, `subscriptions` | `defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')` |
| `corporate` | `KadenceAnalyzerService::hasCorporate()` |
| `drip` | `KadenceAnalyzerService::hasDrip()` |

---

## API routes

All under `/wp-json/fluent-members/v2/migration/kadence`:

| Method | Path | Controller method |
|---|---|---|
| POST | `/analyze` | `analyze` |
| POST | `/run-step` | `runStep` |
| GET | `/status` | `getStatus` |
| GET | `/summary` | `getSummary` |
| GET | `/logs` | `getLogs` |
| POST | `/reset` | `reset` |

### `status` response adds

`stripe_configured` (filter `fluent_members/migration/kadence/check_stripe_configured`),
`paypal_configured` (filter `.../check_paypal_configured`), `debug_mode`.

### `reset` endpoint

Gate: `WP_DEBUG` **or** `WP_CLI` (OR, not AND — same rule as every other source, see
chunk 25). Body: `{ "confirm": "delete_kadence_migration_data" }`.

Real sequence (`KadenceMigrationController::reset`):
1. Reads the migrated Level ids and Access Group ids from `fmem_meta` cross-refs
   (`object_type = KadenceMigrationService::CROSS_REF_TYPE`, keys prefixed `level_` / `group_`)
   **before** anything is deleted.
2. Fires `fluent_members/migration/kadence/reset_state` (Pro drops its own
   orders/subscriptions/transactions here).
3. Deletes `fmem_membership_users` rows where `provider = 'rcp'`.
4. Calls `KadenceMigrationService::resetState()`.
5. Deletes the pricing rows and Levels collected in step 1.
6. Deletes the pivot rows and Access Groups collected in step 1 (the `group_` meta-key
   prefix is exclusively owned by `AccessGroupMigrator`).

---

## Payment / subscription import (Pro)

`fluent-members-pro`'s `MigrationHooksHandler` implements Kadence's `import_payment`,
`import_subscription`, `check_stripe_configured`, and `check_paypal_configured` filters —
note `import_payment`, not `import_order`/`import_transaction` separately as PMPro and
MemberPress have; Kadence's `payments` step covers both in one pass. PayPal
`paypal_era = 'rest_ppcp'` subscriptions get the same continuation treatment described in
chunk 25.

---

## Analysis (`KadenceAnalyzerService::analyze`)

Returns level/member counts plus `hasDrip()` and `hasCorporate()` — these drive whether
the `drip` and `corporate` steps are shown/skipped in the UI.

---

## Database provider value

Kadence-imported (and any legacy RCP-imported) membership users are stored with
**`provider = 'rcp'`** — unchanged by the rename. `WHERE provider = 'rcp'` matches both.

---

## What does NOT transfer

Nothing content-related is left manual anymore — Access Groups, drip rules, corporate
seats, orders, subscriptions, and transactions all have a migration step (Pro gates the
billing-data ones). Spot-check the automated Access Group mapping after migration; it's a
best-effort translation of Kadence's rule types, not guaranteed identical.

---

## Doc file

`guide/settings/migration/from-kadence-memberships.md`
