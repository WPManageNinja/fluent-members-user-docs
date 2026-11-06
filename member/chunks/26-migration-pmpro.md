---
chunk: 26
category: Migration
subcategory: Paid Memberships Pro
query-triggers: [PMPro migration, Paid Memberships Pro, pmpro, import from PMPro, PmproMigrationController, PmproMigrationService, PmproAnalyzerService, non-continuable gateways, reconcile_member_providers]
related-chunks: [25, 39]
source-files: [app/Http/Controllers/Migration/Pmpro/PmproMigrationController.php, app/Services/Migration/Pmpro/PmproMigrationService.php, app/Services/Migration/Pmpro/PmproAnalyzerService.php, app/Services/Migration/Pmpro/Steps/PmproCleanupMigrator.php, app/Services/Migration/Pmpro/Steps/PmproTransactionMigrator.php]
doc-files: [guide/settings/migration/from-pmpro.md]
---

# Migration — From Paid Memberships Pro (PMPro)

## Prerequisites

- PMPro active with `pmpro_membership_levels` table present (`PmproAnalyzerService::isAvailable()`)
- Fluent Members active; Pro active for orders/subscriptions/transactions

---

## Routes (`/wp-json/fluent-members/v2/migration/pmpro`)

| Method | Path | Controller method | Notes |
|---|---|---|---|
| GET | `/stats` | `getStats` | Flat counts for the overview screen |
| GET | `/status` | `getStatus` | Step completion + `debug_mode` + `paypal_configured` |
| POST | `/analyze` | `analyze` | Read-only scan; result cached into migration state |
| POST | `/migrate/levels` | `migrateLevels` | Imports levels using the analyzed level map |
| POST | `/migrate/access-groups` | `migrateAccessGroups` | Imports PMPro content restrictions as Access Groups |
| POST | `/migrate/members` | `migrateMembers` | Imports a chunk of `pmpro_memberships_users` rows |
| POST | `/migrate/corporate` | `migrateCorporate` | Links sponsored (child) members to their parent |
| POST | `/migrate/drip-content` | `migrateDripContent` | Imports PMPro Series drip rules into Access Group drips |
| POST | `/migrate/subscriptions` | `migrateSubscriptions` | Imports subscriptions (Pro) |
| POST | `/migrate/orders` | `migrateOrders` | Imports orders (Pro) |
| POST | `/migrate/transactions` | `migrateTransactions` | Imports orders as transaction rows (Pro) — via `PmproTransactionMigrator` |
| POST | `/migrate/cleanup` | `migrateCleanup` | Requires body `{ substep }` — see Cleanup below |
| GET | `/logs` | `getLogs` | Failed-row logs |
| GET | `/summary` | `getSummary` | Stored summary option + current status |
| POST | `/reset` | `resetState` | See chunk 25 "Reset" |

Every `migrate/*` step returns `{ processed, skipped, failed, has_more }`; the frontend
calls the same step repeatedly while `has_more` is true.

---

## Cleanup substeps (`PmproCleanupMigrator::SUBSTEPS`)

Called as `POST /migrate/cleanup` with `{ "substep": "<name>" }`, in this order:

1. `verify_memberships`
2. `fix_access_cache`
3. `fix_corporate_status`
4. `link_subscription_orders`
5. `reconcile_member_providers` — re-labels members from `provider = 'pmpro'` to
   `'stripe'`/`'paypal'` when their PMPro gateway maps to a continuable payment method
   (see "Provider reconciliation" and "Non-continuable gateways" below)
6. `build_summary`

---

## Non-continuable gateways

`PmproAnalyzerService::NON_CONTINUABLE_GATEWAYS`: `payflowpro`, `braintree`, `cybersource`,
`twocheckout`, `authorizenet`. Members on these gateways keep `provider = 'pmpro'` after
migration — Fluent Members has no way to keep billing them, so they must re-subscribe
through a Fluent Members-connected payment method. `PmproMigrationService::PAYPAL_GATEWAYS`
(`paypal`, `paypalexpress`, `paypalstandard`, `paypalwpp`) are the values recognized as
"this member should reconcile to PayPal" during cleanup.

---

## PayPal / Stripe order & subscription import (Pro)

`fluent-members-pro`'s `MigrationHooksHandler` implements PMPro's `import_order`,
`import_transaction`, `import_subscription`, and `link_subscription_orders` filters, plus
`check_paypal_configured` (PMPro has no Stripe-configured check — only a PayPal one). See
chunk 25 for the shared PayPal continuation / IPN mechanics and chunk 39 for full PayPal
checkout/webhook detail.

---

## After migration

- Access Groups ARE created automatically from PMPro's content restrictions — spot-check
  them, don't assume manual recreation is required.
- Non-continuable-gateway members need a fresh subscription.

---

## Doc file

`guide/settings/migration/from-pmpro.md`
