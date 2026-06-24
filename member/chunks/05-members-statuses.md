---
chunk: 05
category: Core Entities
subcategory: Members & Statuses
query-triggers: [member, membership user, status, active, expired, suspended, pending, cancelled, trial, provider, add member manually, upgrade plan]
related-chunks: [02, 03, 11, 16]
source-files: [app/Http/Controllers/MembersController.php, app/Http/Controllers/MembershipUserController.php, app/Models/MembershipUser.php, app/Models/User.php]
doc-files: [guide/members/index.md, guide/members/detail.md, guide/members/adding-manually.md, guide/members/statuses.md, guide/members/suspending-and-cancelling.md]
---

# Members & Statuses

## What a "member" is

A WordPress user who has been assigned a Membership Level. One user can hold multiple simultaneous memberships (one row in `fmem_membership_users` per assignment).

---

## MembershipUser model

- **Table**: `fmem_membership_users`
- **Model**: `app/Models/MembershipUser.php`

### All fields

| Field | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `user_id` | int | WordPress user ID (casts to int) |
| `membership_level_id` | int | FK → fmem_membership_levels.id (casts to int) |
| `parent_membership_id` | int \| null | Set for corporate sub-members (casts to int) |
| `status` | varchar | See statuses below |
| `provider` | varchar | Which plugin created this record |
| `price_id` | int \| null | FK → fmem_membership_level_pricing.id |
| `provider_ref_id` | varchar | External customer/user ID at provider (e.g. Stripe customer ID) |
| `provider_source_id` | varchar | External subscription/order ID at provider |
| `expires_at` | datetime \| null | null = lifetime membership |
| `start_date` | datetime | When membership began |
| `cached_access` | longtext | Serialized array of access group IDs (performance cache) |
| `settings` | longtext | Serialized snapshot: `item_title`, `item_price`, `formatted_total` |

### Virtual (appended) attributes

`price_info` — computed at runtime:
- If `provider = fluent_cart` and price relation exists → reads from price model
- Otherwise reads from `settings` JSON snapshot
- Returns: `{item_title, item_price, formatted_total}` or null

### Key model methods

| Method | Returns |
|---|---|
| `user()` | belongsTo WordPress User |
| `membershipLevel()` | belongsTo MembershipLevel |
| `price()` | belongsTo MembershipLevelPricing |
| `parentMembership()` | belongsTo MembershipUser (parent) |
| `childMemberships()` | hasMany MembershipUser (corporate children) |
| `isCorporateParent()` | bool — true if level.type = corporate AND parent_membership_id is null |

---

## Member statuses

| Status | Access | Description |
|---|---|---|
| `active` | YES | Normal operating state; in good standing |
| `trial` | YES | Within free trial period; same access as active |
| `pending` | NO | Payment initiated but not yet confirmed |
| `expired` | NO | Past `expires_at`; awaiting renewal |
| `suspended` | NO | Admin-paused; distinct from expiry |
| `cancelled` | NO | Explicitly cancelled; record kept for history |

### Status transitions

```
→ active      triggered by: payment confirmed, admin manual assign, subscription renewed
→ trial       triggered by: checkout with trial pricing plan
→ pending     triggered by: order placed, payment not yet confirmed
→ expired     triggered by: cron job (fluent_members_check_expired_memberships, hourly) when expires_at passes
→ suspended   triggered by: admin action
→ cancelled   triggered by: member portal cancel, admin cancel, subscription cancelled at provider
```

### FluentCRM triggers on status change
See chunk #22.

### Email notifications on status change
See chunk #16.

---

## Provider values

The `provider` field records which system created or manages the membership:

| Value | Source |
|---|---|
| `fluent_cart` | FluentCart checkout |
| `woocommerce` | WooCommerce checkout (Pro) |
| `fluent_forms` | Fluent Forms payment form |
| `paymattic` | Paymattic payment form |
| `native` | Fluent Members Pro native Stripe checkout |
| `pmpro` | Imported from Paid Memberships Pro |
| `memberpress` | Imported from MemberPress |
| `manual` | Added manually by admin |

---

## Controllers

### MembersController (`app/Http/Controllers/MembersController.php`)

| Route | Method | Action |
|---|---|---|
| GET `/members` | `get()` | List members with filters/search |
| GET `/members/{id}` | `find()` | Get single member detail |
| GET `/members/upgrade-plan` | `upgradePlan()` | Get available upgrade options |

### MembershipUserController (`app/Http/Controllers/MembershipUserController.php`)

| Route | Method | Action |
|---|---|---|
| POST `/membership-users` | `store()` | Create a membership (admin manually assigns) |
| PUT `/membership-users/{id}/update-status` | `updateStatus()` | Change status (admin) |
| DELETE `/membership-users` | `remove()` | Remove a membership record |

Auth: all routes require `UserPolicy` (admin).

---

## Adding a member manually

Admin POSTs to `/membership-users` with: `user_id`, `membership_level_id`, optional `expires_at`, optional `status`.
Doc: `guide/members/adding-manually.md`

---

## Upgrading plans

`GET /members/upgrade-plan` returns available upgrade paths based on current level.
Doc: `guide/members/detail.md`
