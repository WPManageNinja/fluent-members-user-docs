---
chunk: 27
category: Migration
subcategory: MemberPress
query-triggers: [MemberPress migration, memberpress, import from MemberPress, MemberPressMigrationController, Stripe subscription transfer]
related-chunks: [25, 29]
source-files: [app/Http/Controllers/Migration/MemberPressMigrationController.php]
doc-files: [guide/settings/migration/from-memberpress.md]
---

# Migration — From MemberPress

## Prerequisites

- MemberPress active and has members
- Fluent Members active
- For Stripe subscription transfer: Fluent Members Pro active with Stripe connected

---

## Phase sequence

### Phase 1: detect
`POST /migration/memberpress/detect`

- Checks for MemberPress tables (`mepr_transactions`, `mepr_subscriptions`, `mepr_members`, `mepr_products`)
- Returns: `{ has_memberpress, member_count, product_count, subscription_count, transaction_count }`

### Phase 2: analyze
`POST /migration/memberpress/analyze`

- Maps MemberPress membership products to Fluent Members levels
- Creates/matches levels by name
- Returns level mapping array

### Phase 3: import-members
`POST /migration/memberpress/import-members`
Request: `{ page: int, per_page: int }`

- Reads from MemberPress member records in chunks
- Creates `fmem_membership_users` with `provider = 'memberpress'`
- Maps MemberPress status codes to Fluent Members statuses

### Phase 4: import-subscriptions
`POST /migration/memberpress/import-subscriptions`
Request: `{ page: int, per_page: int }`

- Reads from `mepr_subscriptions`
- For Stripe subscriptions: optionally transfers the live Stripe subscription to Fluent Members Stripe account (Pro)
- Creates `fmem_membership_subscriptions` records

#### Stripe subscription transfer (Pro)

If the MemberPress subscription was billed via Stripe and Fluent Members Pro has Stripe connected:
- Calls Stripe API: `POST /v1/subscriptions/{id}` to update the subscription's linked payment method and metadata
- Links the Stripe subscription to the new Fluent Members subscription record
- Member continues to be billed without needing to re-enter card details

### Phase 5: import-orders / transactions
`POST /migration/memberpress/import-orders`
Request: `{ page: int, per_page: int }`

- Reads from `mepr_transactions`
- Creates `fmem_membership_transactions` records (Pro)

### Phase 6: cleanup
`POST /migration/memberpress/cleanup`

- Sets `fmem_memberpress_migration_completed = 'yes'`

---

## Status mapping (MemberPress → Fluent Members)

| MemberPress status | Fluent Members status |
|---|---|
| active | `active` |
| expired | `expired` |
| cancelled | `cancelled` |
| suspended | `suspended` |
| pending | `pending` |

---

## Doc file

`guide/settings/migration/from-memberpress.md`
