---
chunk: 26
category: Migration
subcategory: Paid Memberships Pro
query-triggers: [PMPro migration, Paid Memberships Pro, pmpro, import from PMPro, PmproMigrationController]
related-chunks: [25]
source-files: [app/Http/Controllers/Migration/PmproMigrationController.php]
doc-files: [guide/settings/migration/from-pmpro.md]
---

# Migration — From Paid Memberships Pro (PMPro)

## Prerequisites

- PMPro active and has members
- Fluent Members active
- Admin access

---

## Phase sequence

### Phase 1: detect
`POST /migration/pmpro/detect`

- Checks if PMPro tables exist (`pmpro_memberships_users`, `pmpro_membership_levels`, etc.)
- Returns: `{ has_pmpro, member_count, level_count, subscription_count, order_count }`
- Fails if PMPro tables not found

### Phase 2: analyze
`POST /migration/pmpro/analyze`

- Maps PMPro membership levels to Fluent Members levels
- Creates or matches existing levels by slug/name
- Returns: `{ levels: [{pmpro_id, pmpro_name, fluent_level_id, fluent_level_name, status}] }`

### Phase 3: import-members
`POST /migration/pmpro/import-members`
Request: `{ page: int, per_page: int }` (defaults: page 1, per_page 100)

- Reads from `pmpro_memberships_users` in chunks
- Creates `fmem_membership_users` records with:
  - `provider = 'pmpro'`
  - status mapped from PMPro status codes
  - `expires_at` from PMPro's `enddate` field
  - `start_date` from PMPro's `startdate`
- Returns: `{ imported, skipped, total, has_more }`

### Phase 4: import-subscriptions
`POST /migration/pmpro/import-subscriptions`
Request: `{ page: int, per_page: int }`

- Reads PMPro subscription data
- Creates `fmem_membership_subscriptions` records (Pro only)
- Skips if Fluent Members Pro not active

### Phase 5: import-orders
`POST /migration/pmpro/import-orders`
Request: `{ page: int, per_page: int }`

- Reads PMPro orders from `pmpro_membership_orders`
- Creates `fmem_membership_orders` records (Pro only)

### Phase 6: cleanup
`POST /migration/pmpro/cleanup`

- Sets WordPress option `fmem_pmpro_migration_completed = 'yes'`
- Returns success confirmation

---

## Status mapping (PMPro → Fluent Members)

| PMPro status | Fluent Members status |
|---|---|
| active | `active` |
| inactive | `expired` |
| cancelled | `cancelled` |
| expired | `expired` |
| admin_cancelled | `cancelled` |

---

## After migration

- Access Groups must be configured manually
- Content previously restricted by PMPro's rules is NOT automatically imported — assign posts to Access Groups manually

---

## Doc file

`guide/settings/migration/from-pmpro.md`
