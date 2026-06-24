---
chunk: 25
category: Migration
subcategory: Overview
query-triggers: [migration, migrate, import from, PMPro, MemberPress, Restrict Content Pro, migration wizard, import members, migration overview]
related-chunks: [26, 27, 28]
source-files: [app/Http/Routes/api.php, app/Http/Controllers/Migration/]
doc-files: [guide/settings/migration/index.md]
---

# Migration — Overview

## Supported source plugins

| Plugin | Controller | Status |
|---|---|---|
| Paid Memberships Pro (PMPro) | `PmproMigrationController` | Full support |
| MemberPress | `MemberPressMigrationController` | Full support |
| Restrict Content Pro (RCP) | `RcpMigrationController` | Full support |

---

## What transfers

| Data | PMPro | MemberPress | RCP |
|---|---|---|---|
| Membership levels → Fluent Members Levels | YES | YES | YES |
| Member assignments | YES | YES | YES |
| Member status (active, expired, cancelled) | YES | YES | YES |
| Subscription records | YES | YES | NO |
| Order records | YES (Pro) | YES (Pro) | NO |
| Stripe subscriptions (live transfer) | NO | YES (Pro) | NO |
| Access Group content rules | NO | NO | NO |

Content restriction rules (which posts are in which groups) must be set up manually in Fluent Members after migration. Only member data and level assignments transfer automatically.

---

## Migration process model

All three migrations use a **chunked step approach** to avoid PHP timeouts:

```
POST /migration/{plugin}/detect     → check if source plugin is active + count records
POST /migration/{plugin}/analyze    → analyze levels/plans to map them
POST /migration/{plugin}/import-members   → import member records in batches
POST /migration/{plugin}/import-subscriptions → import subscription records (if applicable)
POST /migration/{plugin}/import-orders  → import order records (Pro, if applicable)
POST /migration/{plugin}/cleanup    → finalize, set migration complete flag
```

Each step returns `{success, message, data}` — the frontend polls and advances to the next step on success.

---

## Routes

All routes: namespace `/wp-json/fluent-members/v2/migration`

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
| RCP | `/migration/rcp/detect` | POST |
| RCP | `/migration/rcp/analyze` | POST |
| RCP | `/migration/rcp/run-step` | POST |
| RCP | `/migration/rcp/cleanup` | POST |

Auth: all require admin (`UserPolicy`).

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
