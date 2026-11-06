---
chunk: 02
category: Foundation
subcategory: Database Schema
query-triggers: [database, tables, schema, model, fields, columns, relationships, migrations, fmem_, activity log, audit trail]
related-chunks: [03, 04, 05, 30]
source-files: [database/Migrations/*.php, app/Models/*.php]
doc-files: []
---

# Database Schema

All tables use WordPress table prefix + `fmem_`. Default full names: `wp_fmem_*`.

Every table below (including Orders/Subscriptions/Transactions) is created by the **free**
plugin's migrators in `database/Migrations/` and modeled by classes in `app/Models/`
(namespace `FluentMembers\App\Models`). The Pro add-on ships **no `app/Models/` directory
of its own** — it only adds controllers/services that read and write these same free-plugin
tables (e.g. Stripe/PayPal checkout populates `fmem_membership_orders` /
`fmem_membership_subscriptions` / `fmem_membership_transactions`, but the models themselves
are free-plugin code). Free-only installs can accumulate rows in the billing tables too
(e.g. manual `$0` records), they just have no Pro UI to manage them.

---

## Tables

### `fmem_membership_levels`
Model: `app/Models/MembershipLevel.php`
Migration: `database/Migrations/MembershipLevelsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | Auto-increment |
| `title` | varchar(255) | Level display name |
| `type` | varchar(50) | `individual` (default) or `corporate` |
| `pricing_type` | varchar(20), nullable | One of `MembershipLevel::PRICING_TYPES`: `fluentcart`, `fluentforms`, `paymattic`, `woocommerce`, `native`. Chosen once (at creation, or lazily claimed on the first pricing write) and permanent after that — a level can never switch pricing type. |
| `max_members` | int unsigned, nullable | Corporate seat cap (only meaningful when `type = corporate`) |
| `description` | text, nullable | Optional description |
| `status` | varchar(50) | `active` or `inactive` |
| `settings` | longtext, nullable | Serialized (`maybe_serialize`) — provider-specific paywall ids, corporate config |
| `created_at` / `updated_at` | timestamp | |

`settings` keys are provider-scoped via `MembershipLevel::PROVIDER_SETTINGS_KEYS` — only the
keys for the level's own `pricing_type` are legitimate on it:

| `pricing_type` | Settings keys it owns |
|---|---|
| `fluentcart` | `cart_product_ids` |
| `fluentforms` | `ff_form_ids` |
| `paymattic` | `paymattic_form_ids` |
| `woocommerce` | `wc_product_ids`, `wc_variation_ids` |
| `native` | none (native uses pricing rows, not settings keys) |

`availablePricingTypes()` gates which types are selectable on the current install:
`fluentcart` requires `FLUENTCART_VERSION`, `fluentforms` requires `FLUENTFORM_VERSION`,
`paymattic` requires `WPPAYFORM_VERSION`, `woocommerce` requires Pro + `WC_PLUGIN_FILE`,
`native` requires Pro. A level created before `pricing_type` existed has it `NULL` and is
treated as "legacy" (provider checks fail open for it).

---

### `fmem_membership_level_pricing`
Model: `app/Models/MembershipLevelPricing.php`
Migration: `database/Migrations/MembershipLevelPricingMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `title` | varchar(255) | Pricing plan name |
| `description` | text, nullable | |
| `membership_level_id` | bigint unsigned FK | → `fmem_membership_levels.id` |
| `provider` | varchar(100), default `default` | `native` (Pro built-in Stripe/PayPal), or a migration-origin marker like `pmpro`/`memberpress` |
| `price_type` | varchar(50) | `one_time` or `subscription` |
| `amount` | decimal(10,2) | |
| `currency` | varchar(3), default `USD` | |
| `interval` | varchar(50), nullable | `daily`, `weekly`, `monthly`, `yearly` (subscription only) |
| `interval_count` | int, default 1 | Number of intervals per billing period |
| `trial_period_days` | int, default 0 | 0 = no trial |
| `status` | varchar(50), default `active` | `active` or `inactive` |
| `settings` | longtext, nullable | Serialized — includes `payment_methods[]` and, for native rows, `upgrade_paths[]` (each: `to_price_ids[]`, `is_prorate`, `discount_amount`) |
| `created_at` / `updated_at` | timestamp | |

Native pricing rows can only be created/edited on a level whose `pricing_type = 'native'`
(Pro's `PaymentMethodController::assertNativeLevel()`), and creation requires
`settings.payment_methods` to be non-empty with every listed method actually connected
(`PaymentMethods::isAvailable()`) — you cannot save a native pricing plan before a payment
method (Stripe/PayPal) is connected.

---

### `fmem_access_groups`
Model: `app/Models/AccessGroup.php`
Migration: `database/Migrations/AccessGroupsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `title` | varchar(255) | Group display name |
| `description` | text, nullable | |
| `status` | varchar(50), default `active` | `active` or `inactive` |
| `settings` | longtext, nullable | Serialized JSON — contains `restriction_rules` (v2 envelope, see chunk 04) and unauthorized-access overrides |
| `created_at` / `updated_at` | timestamp | |

---

### `fmem_access_group_membership_levels`
Model: `app/Models/AccessGroupMembershipLevel.php`
Migration: `database/Migrations/AccessGroupMembershipLevelsMigrator.php`
Purpose: pivot table linking groups to levels

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `access_group_id` | bigint unsigned FK | → `fmem_access_groups.id` |
| `membership_level_id` | bigint unsigned FK | → `fmem_membership_levels.id` |

No `created_at` column on this pivot (unlike some other WPFluent pivots).

---

### `fmem_membership_users`
Model: `app/Models/MembershipUser.php`
Migration: `database/Migrations/MembershipUsersMigrator.php`
Purpose: one row per user-level assignment (a member can have multiple rows)

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `user_id` | bigint unsigned | WordPress user ID |
| `membership_level_id` | bigint unsigned FK | → `fmem_membership_levels.id` |
| `parent_membership_id` | bigint unsigned, nullable | Set for corporate sub-members |
| `status` | varchar(50), default `active` | `active`, `trial`, `expired`, `suspended`, `pending`, `cancelled`, `upgraded` |
| `provider` | varchar(100), default `default` | Which system created this record — see chunk 05 |
| `price_id` | bigint unsigned, nullable | → `fmem_membership_level_pricing.id` (if native pricing) |
| `provider_ref_id` | varchar(255), nullable | External customer/user ID at provider |
| `provider_source_id` | varchar(255), nullable | External subscription/order ID; unique per `(provider, provider_source_id)` |
| `expires_at` | timestamp, nullable | null = lifetime |
| `start_date` | timestamp, default now | |
| `cached_access` | longtext, nullable | Serialized array of access group IDs (perf cache) |
| `settings` | longtext, nullable | Serialized snapshot: `item_title`, `item_price`, `formatted_total`; also carries `pre_suspend_status` when suspended |
| `created_at` / `updated_at` | timestamp | |

Accessors: `settings` and `cached_access` auto-serialize/unserialize via model mutators.
`price_info` is an appended (virtual) attribute — for `provider = fluent_cart` with a price
relation it reads from the price model, otherwise it falls back to the `settings` snapshot.

---

### `fmem_meta`
Model: `app/Models/Meta.php`
Migration: `database/Migrations/MetaMigrator.php`
Purpose: generic key-value store (used for corporate invitations, etc.)

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `object_type` | varchar(50) | e.g. `corporate_invite` |
| `object_id` | bigint, nullable | ID of the related object |
| `meta_key` | varchar(192) | e.g. invited email address |
| `value` | longtext, nullable | Serialized |
| `created_at` / `updated_at` | timestamp, nullable (no default) | |

---

### `fmem_activity`
Model: `app/Models/Activity.php`
Migration: `database/Migrations/ActivityMigrator.php`
Purpose: activity/audit log — powers the Activities screen (`ActivityController@index`, chunk 35). **Not previously documented.**

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `event` | varchar(100) | Event key, e.g. a membership status change |
| `status` | varchar(20), default `info` | Log-level style status |
| `module_name` | varchar(64), default `membership` | Logical module the event belongs to |
| `module_type` | varchar(191), nullable | |
| `module_id` | bigint unsigned, nullable | ID of the related object |
| `dedupe_key` | varchar(191), unique, nullable | Prevents duplicate log rows (e.g. a redelivered webhook can't log twice) |
| `user_id` | bigint unsigned, nullable | Related WordPress user |
| `actor_type` | varchar(20), default `system` | Who triggered it (`system`, admin, etc.) |
| `created_by` | varchar(100), default `System` | Display label for the actor |
| `title` | varchar(191), default `''` | |
| `content` | text, nullable | |
| `meta` | longtext, nullable | Serialized |
| `created_at` / `updated_at` | timestamp | |

---

### `fmem_membership_orders`
Model: `app/Models/MembershipOrder.php` — **free plugin**, not Pro-namespaced
Migration: `database/Migrations/MembershipOrdersMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `uuid` | varchar(100), unique | Public-safe ID used in API URLs (`wp_generate_uuid4()`) |
| `user_id` | bigint unsigned, default 0 | |
| `membership_user_id` | bigint unsigned, nullable | → `fmem_membership_users.id` |
| `membership_level_id` | bigint unsigned | |
| `price_id` | bigint unsigned | |
| `item_name` | varchar(255), default `''` | |
| `provider` | varchar(100), default `stripe` | |
| `payment_method` | varchar(100), default `stripe` | |
| `status` | varchar(50), default `draft` | `MembershipOrder::STATUS_*`: `draft`, `pending`, `processing`, `completed`, `failed`, `cancelled`, `refunded` |
| `amount` | decimal(10,2), default 0.00 | |
| `currency` | varchar(3), default `USD` | |
| `provider_customer_id` / `provider_payment_id` / `provider_session_id` / `provider_subscription_id` | varchar(255), nullable | External references; `(provider, provider_payment_id)` and `(provider, provider_session_id)` are each unique |
| `settings` | longtext, nullable | Serialized |
| `created_at` / `updated_at` | timestamp | |

---

### `fmem_membership_subscriptions`
Model: `app/Models/MembershipSubscription.php` — **free plugin**, not Pro-namespaced
Migration: `database/Migrations/MembershipSubscriptionsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `uuid` | varchar(100), unique | Public-safe ID used in portal URLs |
| `user_id` | bigint unsigned | |
| `membership_user_id` | bigint unsigned, nullable | → `fmem_membership_users.id` |
| `parent_order_id` | bigint unsigned, nullable | → `fmem_membership_orders.id` |
| `membership_level_id` | bigint unsigned | |
| `price_id` | bigint unsigned | |
| `item_name` | varchar(255), default `''` | |
| `billing_interval` | varchar(45) | e.g. `monthly`, `yearly` |
| `interval_count` | int unsigned, default 1 | |
| `signup_fee` | decimal(10,2), default 0.00 | |
| `currency` | varchar(3) | |
| `quantity` | int unsigned, default 1 | Seat count for corporate |
| `recurring_amount` | decimal(10,2), default 0.00 | Per-unit recurring charge |
| `recurring_total` | decimal(10,2), default 0.00 | `recurring_amount × quantity` |
| `bill_times` | int unsigned, default 0 | 0 = unlimited (until cancelled) |
| `bill_count` | int unsigned, default 0 | Charges billed so far |
| `expire_at` | datetime, nullable | |
| `trial_ends_at` | datetime, nullable | |
| `canceled_at` | datetime, nullable | |
| `restored_at` | datetime, nullable | |
| `collection_method` | varchar(45), default `automatic` | |
| `trial_days` | int unsigned, default 0 | |
| `provider` | varchar(100), default `stripe` | |
| `provider_customer_id` / `provider_plan_id` / `provider_subscription_id` | varchar(255), nullable | `(provider, provider_subscription_id)` is unique |
| `next_billing_date` | datetime, nullable | |
| `status` | varchar(45), default `pending` | `MembershipSubscription::STATUS_*`: `pending`, `incomplete`, `trialing`, `active`, `past_due`, `canceled`, `expired`, `unpaid`, `failed` |
| `original_plan` | longtext, nullable | Serialized snapshot |
| `provider_response` | longtext, nullable | Serialized |
| `current_payment_method` | varchar(255), nullable | |
| `settings` | longtext, nullable | Serialized |
| `created_at` / `updated_at` | timestamp | |

---

### `fmem_membership_transactions`
Model: `app/Models/MembershipTransaction.php` — **free plugin**, not Pro-namespaced
Migration: `database/Migrations/MembershipTransactionsMigrator.php`

| Column | Type | Notes |
|---|---|---|
| `id` | bigint unsigned PK | |
| `uuid` | varchar(100), unique | Public-safe ID used in the refund API |
| `order_id` | bigint unsigned, default 0 | → `fmem_membership_orders.id` |
| `subscription_id` | bigint unsigned, nullable | → `fmem_membership_subscriptions.id` |
| `user_id` | bigint unsigned | |
| `membership_user_id` | bigint unsigned, nullable | |
| `membership_level_id` | bigint unsigned | |
| `price_id` | bigint unsigned, nullable | |
| `item_name` | varchar(255), default `''` | |
| `provider` | varchar(100), default `stripe` | |
| `transaction_type` | varchar(100), default `charge` | `MembershipTransaction::TYPE_*`: `charge`, `renewal`, `refund`, `partial_refund` |
| `status` | varchar(45) | `MembershipTransaction::STATUS_*`: `pending`, `succeeded`, `failed`, `refunded`, `partially_refunded` |
| `amount` | decimal(10,2), default 0.00 | |
| `currency` | varchar(10) | |
| `payment_method` / `payment_method_type` | varchar(100), nullable | |
| `card_last_4` | varchar(4), nullable | |
| `card_brand` | varchar(100), nullable | |
| `payment_mode` | varchar(20), default `test` | `test` or `live` |
| `payment_note` | text, nullable | |
| `provider_charge_id` / `provider_payment_id` / `provider_invoice_id` / `provider_refund_id` | varchar(192), nullable | Each unique per `(provider, ...)` |
| `parent_transaction_id` | bigint unsigned, nullable | → self, links a refund to its original charge |
| `settings` | longtext, nullable | Serialized |
| `created_at` / `updated_at` | timestamp | |

---

## Model relationships

```
MembershipLevel
  hasMany → MembershipLevelPricing (prices())
  belongsToMany → AccessGroup (via fmem_access_group_membership_levels, accessGroups())
  hasMany → MembershipUser (users())

MembershipUser
  belongsTo → MembershipLevel
  belongsTo → User (WP user)
  belongsTo → MembershipLevelPricing (price_id, optional)
  belongsTo → MembershipUser (parent_membership_id, for corporate sub-members)
  hasMany → MembershipUser (childMemberships, corporate children)

AccessGroup
  belongsToMany → MembershipLevel (via pivot)

MembershipSubscription
  belongsTo → MembershipUser, MembershipLevel, MembershipLevelPricing
  belongsTo → MembershipOrder (parentOrder(), via parent_order_id)

MembershipOrder
  belongsTo → MembershipUser, MembershipLevel, MembershipLevelPricing

MembershipTransaction
  belongsTo → MembershipOrder (order())
  belongsTo → MembershipSubscription (subscription())
  belongsTo → MembershipTransaction (parentTransaction(), self-referencing for refunds)
```
