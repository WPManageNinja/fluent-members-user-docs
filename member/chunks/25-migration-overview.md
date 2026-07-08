---
chunk: 25
category: Migration
subcategory: Overview
query-triggers: [migration, migrate, import from, PMPro, MemberPress, Restrict Content Pro, Kadence Memberships, Kadence migration, migration wizard, import members, migration overview, PayPal import, paypal_era]
related-chunks: [26, 27, 28, 39]
source-files: [app/Http/Routes/api.php, app/Http/Controllers/Migration/]
doc-files: [guide/settings/migration/index.md]
---

# Migration — Overview

## Supported source plugins

| Plugin | Controller | Notes |
|---|---|---|
| Paid Memberships Pro (PMPro) | `PmproMigrationController` | Full support |
| MemberPress | `MemberPressMigrationController` | Full support |
| Kadence Memberships | `KadenceMigrationController` | Full support (renamed from Restrict Content Pro in v1.1.0) |

---

## What transfers

| Data | PMPro | MemberPress | Kadence |
|---|---|---|---|
| Membership levels → Fluent Members Levels | YES | YES | YES |
| Member assignments | YES | YES | YES |
| Member status (active, expired, cancelled) | YES | YES | YES |
| Subscription records | YES | YES (Pro) | YES (Pro) |
| Order/payment records | YES (Pro) | YES (Pro) | YES (Pro) |
| Stripe subscriptions (live transfer) | NO | YES (Pro) | NO |
| PayPal PPCP subscriptions (import, v1.1.0) | YES (Pro) | YES (Pro) | YES (Pro) |
| Access Group content rules | NO | NO | NO |

Content restriction rules (which posts are in which groups) must be set up manually after migration. Only member data and level assignments transfer automatically.

---

## Migration process models

### PMPro and MemberPress — sequential phase model

```
POST /migration/{plugin}/detect
POST /migration/{plugin}/analyze
POST /migration/{plugin}/import-members
POST /migration/{plugin}/import-subscriptions
POST /migration/{plugin}/import-orders
POST /migration/{plugin}/cleanup
```

Each step returns `{success, message, data}` — frontend advances on success.

### Kadence Memberships — named-step model

```
POST /migration/kadence/analyze
POST /migration/kadence/run-step   { step: 'access_groups' | 'levels' | 'drip' | 'memberships' | 'payments' | 'subscriptions' | 'corporate' | 'cleanup' }
GET  /migration/kadence/get-status
POST /migration/kadence/reset      (debug/WP-CLI only)
```

Steps have explicit dependencies — see chunk 28.

---

## Routes

All routes: namespace `/wp-json/fluent-members/v2/migration` — admin auth required (`UserPolicy`).

| Plugin | Route | Method |
|---|---|---|
| PMPro | `/migration/pmpro/detect` | POST |
| PMPro | `/migration/pmpro/analyze` | POST |
| PMPro | `/migration/pmpro/import-members` | POST |
| PMPro | `/migration/pmpro/import-subscriptions` | POST |
| PMPro | `/migration/pmpro/import-orders` | POST |
| PMPro | `/migration/pmpro/cleanup` | POST |
| MemberPress | `/migration/memberpress/detect` | POST |
| MemberPress | `/migration/memberpress/analyze` | POST |
| MemberPress | `/migration/memberpress/import-members` | POST |
| MemberPress | `/migration/memberpress/import-subscriptions` | POST |
| MemberPress | `/migration/memberpress/import-orders` | POST |
| MemberPress | `/migration/memberpress/cleanup` | POST |
| Kadence | `/migration/kadence/analyze` | POST |
| Kadence | `/migration/kadence/run-step` | POST |
| Kadence | `/migration/kadence/get-status` | GET |
| Kadence | `/migration/kadence/reset` | POST |

## PayPal subscription import (v1.1.0)

When Fluent Members Pro is active and PayPal is connected, `MigrationHooksHandler` adds PayPal import support to all three migration sources via filters:

| Filter | Source |
|---|---|
| `fluent_members/migration/pmpro/import_subscription` | PMPro |
| `fluent_members/migration/memberpress/import_subscription` | MemberPress |
| `fluent_members/migration/kadence/import_subscription` | Kadence |

PayPal REST PPCP subscriptions are identified by `paypal_era = 'rest_ppcp'` in the import payload. See chunk 39 for full details.

---

## Pre-migration checklist

1. Backup your database
2. Install and activate Fluent Members
3. Keep the source plugin installed and active during migration
4. Do not deactivate the source plugin until cleanup step completes

---

## Post-migration tasks

- Verify member counts match
- Set up Access Groups and assign content to them
- Assign your new Membership Levels to Access Groups
- Test membership access for a sample user
- Optionally deactivate the source plugin after verification

---

## Doc file

`guide/settings/migration/index.md`
