---
chunk: 02
category: Foundation
subcategory: Database Schema
query-triggers: [database, tables, schema, model, fields, columns, relationships, migrations, fmem_]
related-chunks: [03, 04, 05, 30]
source-files: [database/Migrations/*.php, app/Models/*.php, fluent-members-pro/database/Migrations/*.php, fluent-members-pro/app/Models/*.php]
doc-files: []
---

# Database Schema

All tables use WordPress table prefix + `fmem_`. Default full names: `wp_fmem_*`.

---

## Free plugin tables

### `fmem_membership_levels`
Model: `app/Models/MembershipLevel.php`
Migration: `database/Migrations/MembershipLevelsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | Auto-increment |
| `title` | varchar | Level display name |
| `description` | text | Optional description |
| `type` | varchar | `individual` or `corporate` |
| `status` | varchar | `active` or `inactive` |
| `settings` | longtext | Serialized JSON — integration IDs, corporate config |
| `created_at` | datetime | |
| `updated_at` | datetime | |

Settings JSON keys: `wc_product_ids[]`, `wc_variation_ids[]`, `ff_form_ids[]`, `paymattic_form_ids[]`, corporate seat config

---

### `fmem_membership_level_pricing`
Model: `app/Models/MembershipLevelPricing.php`
Migration: `database/Migrations/MembershipLevelPricingMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `membership_level_id` | int FK | → fmem_membership_levels.id |
| `provider` | varchar | `native`, `pmpro`, `memberpress` |
| `title` | varchar | Pricing plan name |
| `amount` | decimal | Price amount |
| `price_type` | varchar | `one_time` or `subscription` |
| `trial_period_days` | int | 0 = no trial |
| `billing_period` | varchar | `day`, `week`, `month`, `year` |
| `billing_interval` | int | e.g. 1 = every 1 period |
| `status` | varchar | `active` or `inactive` |
| `settings` | longtext | Serialized JSON |
| `created_at` | datetime | |
| `updated_at` | datetime | |

Used by: native Stripe pricing (Pro), migrated pricing (PMPro, MemberPress), `ShortcodeHandler::getMigratedVariants()`

---

### `fmem_access_groups`
Model: `app/Models/AccessGroup.php`
Migration: `database/Migrations/AccessGroupsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `title` | varchar | Group display name |
| `description` | text | Optional |
| `settings` | longtext | Serialized JSON |
| `restriction_rules` | longtext | Serialized JSON — contains `restriction_types[]` |
| `created_at` | datetime | |
| `updated_at` | datetime | |

`restriction_rules.restriction_types` values: `posts`, `pages`, `categories`, `post_types`, `entire_website`

---

### `fmem_access_group_membership_levels`
Model: `app/Models/AccessGroupMembershipLevel.php`
Migration: `database/Migrations/AccessGroupMembershipLevelsMigrator.php`
Purpose: pivot table linking groups to levels

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `access_group_id` | int FK | → fmem_access_groups.id |
| `membership_level_id` | int FK | → fmem_membership_levels.id |
| `created_at` | datetime | |

---

### `fmem_membership_users`
Model: `app/Models/MembershipUser.php`
Migration: `database/Migrations/MembershipUsersMigrator.php`
Purpose: one row per user-level assignment (a member can have multiple rows)

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `user_id` | int | WordPress user ID |
| `membership_level_id` | int FK | → fmem_membership_levels.id |
| `parent_membership_id` | int \| null | Set for corporate sub-members |
| `status` | varchar | `active`, `trial`, `expired`, `suspended`, `pending`, `cancelled` |
| `provider` | varchar | Who created this record (see chunk 05) |
| `price_id` | int \| null | → fmem_membership_level_pricing.id (if native pricing) |
| `provider_ref_id` | varchar | External ID in payment provider (e.g. Stripe customer ID) |
| `provider_source_id` | varchar | External subscription/order ID |
| `expires_at` | datetime \| null | null = lifetime |
| `start_date` | datetime | |
| `cached_access` | longtext | Serialized — cached access group IDs for performance |
| `settings` | longtext | Serialized — price info snapshot (`item_title`, `item_price`, `formatted_total`) |
| `created_at` | datetime | |
| `updated_at` | datetime | |

Accessors: `settings` and `cached_access` auto-serialize/unserialize via model mutators.
`price_info` is an appended (virtual) attribute computed from `provider` + `price` relation or `settings`.

---

### `fmem_meta`
Model: `app/Models/Meta.php`
Migration: `database/Migrations/MetaMigrator.php`
Purpose: generic key-value store (used for corporate invitations, etc.)

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `object_type` | varchar | e.g. `corporate_invite` |
| `object_id` | int | ID of the related object |
| `meta_key` | varchar | e.g. invited email address |
| `value` | longtext | Serialized |
| `created_at` | datetime | |
| `updated_at` | datetime | |

---

## Pro plugin tables

### `fmem_membership_subscriptions`
Model: `fluent-members-pro/app/Models/MembershipSubscription.php`
Migration: `fluent-members-pro/database/Migrations/MembershipSubscriptionsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public-safe unique ID used in API URLs |
| `user_id` | int | WordPress user ID |
| `membership_level_id` | int FK | |
| `membership_user_id` | int FK | → fmem_membership_users.id |
| `payment_method` | varchar | `stripe` (currently) |
| `status` | varchar | `active`, `trial`, `pending`, `cancelled`, `expired` |
| `billing_period` | varchar | `month`, `year`, etc. |
| `billing_interval` | int | |
| `trial_end_at` | datetime \| null | |
| `next_payment_at` | datetime \| null | |
| `cancelled_at` | datetime \| null | |
| `provider_subscription_id` | varchar | Stripe subscription ID |
| `provider_customer_id` | varchar | Stripe customer ID |
| `settings` | longtext | Serialized |
| `created_at` | datetime | |
| `updated_at` | datetime | |

---

### `fmem_membership_orders`
Model: `fluent-members-pro/app/Models/MembershipOrder.php`
Migration: `fluent-members-pro/database/Migrations/MembershipOrdersMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public-safe unique ID |
| `user_id` | int | |
| `membership_level_id` | int FK | |
| `membership_user_id` | int FK | |
| `subscription_id` | int FK \| null | → fmem_membership_subscriptions.id |
| `status` | varchar | `paid`, `pending`, `refunded`, `failed` |
| `amount` | decimal | |
| `currency` | varchar | ISO 4217 |
| `payment_method` | varchar | |
| `provider_order_id` | varchar | External payment ID |
| `settings` | longtext | Serialized |
| `created_at` | datetime | |

---

### `fmem_membership_transactions`
Model: `fluent-members-pro/app/Models/MembershipTransaction.php`
Migration: `fluent-members-pro/database/Migrations/MembershipTransactionsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public-safe unique ID used in refund API |
| `order_id` | int FK | → fmem_membership_orders.id |
| `user_id` | int | |
| `type` | varchar | `charge`, `refund` |
| `amount` | decimal | |
| `currency` | varchar | |
| `status` | varchar | `success`, `failed`, `pending` |
| `provider_transaction_id` | varchar | Stripe charge/refund ID |
| `settings` | longtext | Serialized |
| `created_at` | datetime | |

---

## Model relationships

```
MembershipLevel
  hasMany → MembershipLevelPricing (price_id)
  belongsToMany → AccessGroup (via fmem_access_group_membership_levels)
  hasMany → MembershipUser

MembershipUser
  belongsTo → MembershipLevel
  belongsTo → User (WP user)
  belongsTo → MembershipLevelPricing (price_id, optional)
  belongsTo → MembershipUser (parent_membership_id, for corporate sub-members)
  hasMany → MembershipUser (childMemberships, corporate children)
  [Pro] hasOne → MembershipSubscription

AccessGroup
  belongsToMany → MembershipLevel (via pivot)

[Pro] MembershipSubscription
  belongsTo → MembershipUser
  hasMany → MembershipOrder

[Pro] MembershipOrder
  belongsTo → MembershipSubscription
  hasMany → MembershipTransaction
```
