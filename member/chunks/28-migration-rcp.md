---
chunk: 28
category: Migration
subcategory: Restrict Content Pro
query-triggers: [Restrict Content Pro migration, RCP migration, rcp, import from RCP, RcpMigrationController]
related-chunks: [25]
source-files: [app/Http/Controllers/Migration/RcpMigrationController.php]
doc-files: [guide/settings/migration/from-restrict-content-pro.md]
---

# Migration — From Restrict Content Pro (RCP)

## Prerequisites

- Restrict Content Pro active and has members
- Fluent Members active
- No Pro requirement (orders/subscriptions not imported from RCP)

---

## Phase sequence

RCP uses a simpler 4-phase flow (no separate subscription/order import phases):

### Phase 1: detect
`POST /migration/rcp/detect`

- Checks for RCP tables (`rcp_memberships`, `rcp_membership_levels`)
- Returns: `{ has_rcp, member_count, level_count }`

### Phase 2: analyze
`POST /migration/rcp/analyze`

- Maps RCP membership levels to Fluent Members levels
- Creates/matches levels
- Returns level mapping

### Phase 3: run-step (chunked import)
`POST /migration/rcp/run-step`
Request: `{ step: 'members', page: int, per_page: int }`

- All import work done in one route via `step` parameter
- `step = 'members'` → imports member records in chunks
- Reads from `rcp_memberships`
- Creates `fmem_membership_users` with `provider = 'pmpro'` (Note: RCP migrations use 'pmpro' as the provider value — confirmed in controller)
- Returns: `{ imported, skipped, total, has_more, current_step }`

### Phase 4: cleanup
`POST /migration/rcp/cleanup`

- Sets `fmem_rcp_migration_completed = 'yes'`

---

## What does NOT transfer from RCP

- Payment/subscription history (RCP store is different format)
- Content restriction rules (which posts are in which levels)

---

## Status mapping (RCP → Fluent Members)

| RCP status | Fluent Members status |
|---|---|
| active | `active` |
| expired | `expired` |
| cancelled | `cancelled` |
| disabled | `suspended` |
| pending | `pending` |

---

## Provider value note

RCP-imported membership users have `provider = 'pmpro'` in the database (not `rcp`). This is a known quirk of the v1.0.0 implementation. If querying the database directly, filter by `provider = 'pmpro'` for both PMPro-imported AND RCP-imported records.

---

## Doc file

`guide/settings/migration/from-restrict-content-pro.md`
