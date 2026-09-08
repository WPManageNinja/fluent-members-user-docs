---
chunk: 05
category: Core Entities
subcategory: Members & Statuses
query-triggers: [member, membership user, status, active, expired, suspended, pending, cancelled, trial, upgraded, provider, provider marker, add member manually, upgrade plan, cascade status, corporate children]
related-chunks: [02, 03, 11, 16]
source-files: [app/Http/Controllers/MembersController.php, app/Http/Controllers/MembershipUserController.php, app/Models/MembershipUser.php, app/Models/User.php, app/Services/MembershipService.php]
doc-files: [guide/members/index.md, guide/members/detail.md, guide/members/adding-manually.md, guide/members/statuses.md, guide/members/suspending-and-cancelling.md]
---

# Members & Statuses

## What a "member" is

A WordPress user who has been assigned a Membership Level. One user can hold multiple simultaneous memberships (one row in `fmem_membership_users` per assignment).

---

## MembershipUser model

- **Table**: `fmem_membership_users`
- **Model**: `app/Models/MembershipUser.php`
- **Service**: `app/Services/MembershipService.php` (status transitions, provider detection, cascading)

Full column list is in chunk 02.

### Key model methods

| Method | Returns |
|---|---|
| `user()` | belongsTo WordPress User |
| `membershipLevel()` | belongsTo MembershipLevel |
| `price()` | belongsTo MembershipLevelPricing |
| `parentMembership()` | belongsTo MembershipUser (parent) |
| `childMemberships()` | hasMany MembershipUser (corporate children) |
| `isCorporateParent()` | bool — true if level.type = corporate AND parent_membership_id is null |
| `getPriceInfoAttribute()` (appended) | `{item_title, item_price, formatted_total}` — from the `fluent_cart` price relation if applicable, else from the `settings` snapshot |

---

## Member statuses

| Status | Access | Description |
|---|---|---|
| `active` | YES | Normal operating state; in good standing |
| `trial` | YES | Within free trial period; same access as active |
| `pending` | NO | Payment initiated but not yet confirmed (set by checkout flows, not settable via the admin `updateStatus` endpoint) |
| `expired` | NO | Past `expires_at`; awaiting renewal |
| `suspended` | NO | Admin-paused; distinct from expiry. Settings gain a `pre_suspend_status` key so un-suspending restores the right prior state |
| `cancelled` | NO | Explicitly cancelled; record kept for history |
| `upgraded` | NO | Superseded by a newer membership row on the same level for the same user (see "Upgrades" below) |

`MembershipUserController::updateStatus()` only allows setting one of:
`active`, `trial`, `suspended`, `cancelled`, `expired`, `upgraded` — `pending` is not a
target status an admin can set by hand.

### Status transitions

```
→ active      triggered by: payment confirmed, admin manual assign, subscription renewed,
                             un-suspending (restores pre_suspend_status if it was active/trial)
→ trial       triggered by: checkout with trial pricing plan
→ pending     triggered by: order placed, payment not yet confirmed
→ expired     triggered by: cron job when expires_at passes
→ suspended   triggered by: admin action (MembershipService::suspendMembership) — only from
                             active/trial; stores pre_suspend_status; cascades to corporate children
→ cancelled   triggered by: member portal cancel, admin cancel (MembershipService::cancelMembership),
                             subscription cancelled at provider; cascades to corporate children
→ upgraded    triggered by: admin (or checkout) assigns the SAME user a NEW membership on the
                             SAME level while an active/trial one already exists — the old row
                             flips to `upgraded` and MembershipService::fireMembershipUpgraded()
                             fires; cascades to corporate children
```

Corporate sub-memberships track their parent's status via
`MembershipService::cascadeStatusToChildren()` — suspending/cancelling/upgrading a parent
membership cascades the same transition to every child row (`parent_membership_id`).

### FluentCRM triggers on status change
See chunk #22.

### Email notifications on status change
See chunk #16.

---

## Provider markers

The `provider` column records which system created/manages the row. Two related but
different vocabularies exist:

**As persisted on `MembershipUser.provider`** — admin-created rows (via
`MembershipUserController::store()`) are **always** recorded as `manual`, regardless of which
price/provider was used to resolve the price and expiry. Real checkout/migration flows write
their own literal markers.

**Canonical provider markers resolved by `MembershipService`** (`detectProvider()` /
`providerPricingType()` — used to validate a posted price against a level's `pricing_type`):

| Marker | Maps to `pricing_type` | Source |
|---|---|---|
| `fluent_cart` | `fluentcart` | FluentCart checkout |
| `woocommerce` | `woocommerce` | WooCommerce checkout (Pro) |
| `fluentform` | `fluentforms` | Fluent Forms payment form (note: singular `fluentform`, not `fluent_forms`) |
| `paymattic` | `paymattic` | Paymattic payment form |
| `native_payment` | `native` | Live native Stripe/PayPal checkout (Pro) |
| `stripe` / `paypal` | `native` | Also resolve to native — alternate live markers |
| `pmpro` / `memberpress` / `rcp` | `native` | Migration-imported subscriptions (billed via native Stripe/PayPal going forward); `rcp` is the marker used for Kadence Memberships imports (legacy string, kept for backward compatibility with already-migrated installs — the migration UI/routes are named "Kadence", the stored marker is still `rcp`) |
| `manual` | — (fails open) | Added manually by admin |

---

## Controllers

### MembersController (`app/Http/Controllers/MembersController.php`)

| Route | Method | Action |
|---|---|---|
| GET `/members` | `get()` | List members with filters/search |
| GET `/members/{id}` | `find()` | Get single member detail |

There is no `/members/upgrade-plan` route in the current API — available-upgrade lookups now
live under Pro's subscription billing routes (`GET /billing/subscriptions/{uuid}/available-upgrades`,
chunk 31), not under `/members`.

### MembershipUserController (`app/Http/Controllers/MembershipUserController.php`)

| Route | Method | Action |
|---|---|---|
| POST `/membership-users` | `store()` | Create a membership (admin manually assigns; always `provider = manual`) |
| PUT `/membership-users/{id}/update-status` | `updateStatus()` | Change status (admin) |
| DELETE `/membership-users` | `remove()` | Remove/cancel a membership record |

Auth: all routes require `UserPolicy` (admin).

`store()` requires `membership_level_id`, `price_id`, `provider_ref_id` (numeric), `user_id`;
the posted price must belong to the target level's `pricing_type` (validated via
`providerPricingType()`) or the request is rejected with a 422. If the user already holds an
active/trial membership on that same level, the old row is flipped to `upgraded` instead of
being left duplicated.

---

## Adding a member manually

Admin POSTs to `/membership-users` with: `user_id`, `membership_level_id`, `price_id`,
`provider_ref_id`, optional `status`, optional `provider`.
Doc: `guide/members/adding-manually.md`
