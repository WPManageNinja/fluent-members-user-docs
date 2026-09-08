---
chunk: 25
category: Migration
subcategory: Overview
query-triggers: [migration, migrate, import from, PMPro, MemberPress, Restrict Content Pro, Kadence Memberships, Kadence migration, migration wizard, import members, migration overview, MigrationRegistry, migration sources, named-step migration, MigrationHooksHandler, PayPal import, paypal_era, IPN continuation]
related-chunks: [26, 27, 28, 39]
source-files: [app/Services/Migration/MigrationRegistry.php, app/Http/Controllers/Migration/MigrationController.php, app/Http/Routes/api.php, fluent-members-pro/app/Hooks/Handlers/MigrationHooksHandler.php]
doc-files: [guide/settings/migration/index.md]
---

# Migration — Overview

## Supported source plugins (`MigrationRegistry::$sources`)

| Key | Label | Analyzer (`isAvailable()`) |
|---|---|---|
| `pmpro` | Paid Memberships Pro | `PmproAnalyzerService` |
| `memberpress` | MemberPress | `MemberPressAnalyzerService` |
| `kadence_memberships` | Kadence Memberships | `KadenceAnalyzerService` |

`GET /migration/sources` (`MigrationController::getSources`) returns this list with
`available` resolved per-site and the analyzer class name stripped. Each source also
carries a `description` and a logo `asset` path for the picker UI.

> No hooks run at boot for migration — it only executes on-demand, driven by the admin UI.

---

## All three sources now share one architecture

Every source (PMPro, MemberPress, Kadence) exposes the **same shape** of routes — this
replaced an older PMPro/MemberPress-specific sequential `detect → analyze → import-*
→ cleanup` flow. All three are now step-driven, callable independently and safe to re-run:

| Route (under `/migration/{source}` unless noted) | Method | Common to |
|---|---|---|
| `/stats` (PMPro, MemberPress) | GET | Flat counts for the overview screen |
| `/status` | GET | Per-step completion + `debug_mode` (+ `paypal_configured`, and for Kadence `stripe_configured`) |
| `/analyze` | POST | Read-only scan; PMPro/MemberPress persist the result into migration state |
| `/migrate/{step}` (PMPro, MemberPress) or `/run-step` with `{step}` body (Kadence) | POST | Runs one migration step, returns `{processed, skipped, failed, has_more}` |
| `/logs` | GET | Failed-row logs for troubleshooting |
| `/summary` | GET | Stored summary option merged with current status |
| `/reset` | POST | Deletes everything the migration created — see "Reset" below |

Every step handler wraps its work in `ActivityLogger::suppress()` / `resume()` so bulk
imports don't flood the Activity feed (see chunk covering `ActivityLogger` if present).

---

## What transfers (current code, not the old "content rules don't transfer" claim)

| Data | PMPro | MemberPress | Kadence |
|---|---|---|---|
| Levels + native pricing rows | Yes (`migrate/levels`) | Yes (`migrate/levels`) | Yes (`levels` step) |
| **Access Groups / content restriction rules** | **Yes** (`migrate/access-groups`) | **Yes** (`migrate/access-groups`) | **Yes** (`access_groups` step) |
| Member assignments | Yes (`migrate/members`) | Yes (`migrate/memberships`) | Yes (`memberships` step) |
| Corporate/sponsored sub-members | Yes (`migrate/corporate`) | Yes (`migrate/corporate`) | Yes (`corporate` step) |
| Content drip rules | Yes (`migrate/drip-content`) | — (no drip step) | Yes (`drip` step, only if source data has drip rules) |
| Orders | Yes, Pro (`migrate/orders`) | Yes, Pro (`migrate/orders`) | Yes, Pro (`payments` step) |
| Subscriptions | Yes, Pro (`migrate/subscriptions`) | Yes, Pro (`migrate/subscriptions`) | Yes, Pro (`subscriptions` step) |
| Transactions | Yes, Pro (`migrate/transactions`) | Yes, Pro (`migrate/transactions`) | folded into the `payments` step |

Access Group rules DO transfer automatically now for all three sources — the previous
"content restriction rules must be recreated manually" guidance is out of date. Kadence's
`AccessGroupMigrator` maps the source's global restriction types onto Fluent Members'
scope-type rules (`post` → `all_posts`, `page` → `all_pages`, `product` → `wc_all_products`,
`fluent-products` → `fct_all_products`).

---

## Provider reconciliation (PMPro, MemberPress)

A migrated member is not permanently stuck on `provider = 'pmpro'` /
`'memberpress'`. During cleanup, PMPro's `reconcile_member_providers` substep (and
MemberPress's equivalent) re-labels members whose source gateway maps to a continuable
payment method as `provider = 'stripe'` or `'paypal'`, so their subscription can keep
renewing through Fluent Members Pro's own billing instead of staying frozen on the old
plugin's gateway. PMPro gateways with **no** continuation path
(`payflowpro`, `braintree`, `cybersource`, `twocheckout`, `authorizenet`) are left as-is —
those members must re-subscribe.

---

## Order/transaction/subscription import + PayPal continuation (Pro, `MigrationHooksHandler`)

When Fluent Members Pro is active, `fluent-members-pro/app/Hooks/Handlers/MigrationHooksHandler.php`
hooks each source's Pro-only import filters so orders/transactions/subscriptions actually
get written (the free plugin defines the filters; Pro supplies the implementation):

| Source | Filters it implements |
|---|---|
| PMPro | `import_order`, `import_transaction`, `import_subscription`, `link_subscription_orders`, `check_paypal_configured` (no Stripe-transfer check) |
| MemberPress | `import_order`, `import_transaction`, `import_subscription`, `check_stripe_configured`, `check_paypal_configured` |
| Kadence | `import_payment`, `import_subscription`, `check_stripe_configured`, `check_paypal_configured` |

Each is namespaced `fluent_members/migration/{source}/{filter}`. A subscription's
`paypal_era` field is inspected — `'rest_ppcp'` means the source subscription was billed
through PayPal's newer REST/Commerce Platform APIs, and `MigrationHooksHandler` looks up
the plan via the PayPal API and sets `current_payment_method = 'paypal'` so renewals
continue through Fluent Members' own PayPal billing without the member re-entering
payment details (mirrors what PMPro's `reconcile_member_providers` substep does for
Stripe-continuable gateways — see above). Each source's handler also registers itself on
`fluent_members/paypal_ipn_continuation_sources` so legacy PayPal IPNs aimed at the old
plugin keep resolving after migration, and on `fluent_members/migration/{source}/reset_state`
so its own imported orders/subscriptions/transactions are cleaned up when the migration is
reset. Full PayPal checkout/webhook mechanics: chunk 39.

---

## Reset (all three sources)

- Endpoint: `POST /migration/{source}/reset` (Kadence: `.../reset`), body
  `{ "confirm": "delete_{source}_migration_data" }` — exact literal per source
  (`delete_pmpro_migration_data`, `delete_memberpress_migration_data`,
  `delete_kadence_migration_data`).
- Gate: allowed when **either** `WP_DEBUG` is true **or** the request runs under WP-CLI
  (`WP_CLI` defined) — an OR, not an AND. Blocked (403) otherwise.
- Deletes every `fmem_membership_users` row the migration created (matched by `provider`
  and, for MemberPress, by `provider_source_id` prefix), the Levels/pricing/Access Groups
  it created (Kadence, tracked via `fmem_meta` cross-refs), and fires
  `fluent_members/migration/{source}/reset_state` first so Pro can drop its own
  orders/subscriptions/transactions before the base rows disappear.

---

## Pre-migration checklist

1. Backup your database.
2. Install and activate Fluent Members (and Pro, if you need orders/subscriptions/corporate).
3. Keep the source plugin installed and active during migration.
4. Do not deactivate the source plugin until the `cleanup` step completes.

## Post-migration tasks

- Verify member counts match (`/stats` or `/summary`).
- Spot-check a couple of Access Groups — the automated content-rule mapping is a best
  effort, not guaranteed pixel-perfect.
- Test membership access for a sample migrated user.
- Optionally deactivate the source plugin after verification.

---

## Doc file

`guide/settings/migration/index.md`
