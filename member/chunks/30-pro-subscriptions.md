---
chunk: 30
category: Pro Features
subcategory: Subscriptions
query-triggers: [subscription, recurring, billing cycle, subscription status, past due, cancel subscription, fmem_membership_subscriptions, MembershipSubscription, SubscriptionHelper]
related-chunks: [05, 29, 31]
source-files: [fluent-members-pro/app/Models/MembershipSubscription.php, fluent-members-pro/app/Services/SubscriptionHelper.php, fluent-members-pro/app/Http/Controllers/BillingActionController.php]
doc-files: [guide/transactions/index.md, guide/members/portal/renewing-a-failed-subscription.md]
---

# Pro — Subscriptions

## Table: `fmem_membership_subscriptions`

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public-facing UUID (used in portal URLs) |
| `membership_user_id` | int | FK → fmem_membership_users.id |
| `user_id` | int | WordPress user ID (denormalized) |
| `membership_level_id` | int | FK → fmem_membership_levels.id |
| `price_id` | int | FK → fmem_membership_level_pricing.id |
| `provider` | varchar | `native` / `woocommerce` |
| `provider_subscription_id` | varchar | Stripe subscription ID (sub_xxx) or WC subscription ID |
| `provider_customer_id` | varchar | Stripe customer ID (cus_xxx) |
| `status` | varchar | See subscription statuses |
| `trial_end_at` | datetime | When trial period ends (null if no trial) |
| `current_period_end` | datetime | When current billing period ends |
| `current_period_start` | datetime | When current billing period started |
| `cancel_at_period_end` | tinyint | 1 = will cancel at period end, not immediately |
| `billing_interval` | varchar | `month` / `year` / `week` etc |
| `billing_interval_count` | int | Number of intervals per billing period |
| `billing_amount` | decimal | Amount charged per period |
| `settings` | longtext | JSON: additional config |
| `created_at` | datetime | |
| `updated_at` | datetime | |

---

## Subscription statuses

| Status | Description |
|---|---|
| `active` | Subscription is current |
| `trialing` | In trial period |
| `past_due` | Payment failed but subscription not yet cancelled |
| `cancelled` | Subscription cancelled |
| `paused` | Subscription paused (if Stripe supports) |
| `incomplete` | Initial payment not yet confirmed |

---

## Model: `MembershipSubscription`

Relationships:
- `membershipUser()` → belongsTo MembershipUser
- `membershipLevel()` → belongsTo MembershipLevel
- `price()` → belongsTo MembershipLevelPricing
- `orders()` → hasMany MembershipOrder

Key scopes:
- `active()` → where status in ['active', 'trialing']
- `forUser($userId)` → where user_id = $userId

---

## SubscriptionHelper

`fluent-members-pro/app/Services/SubscriptionHelper.php`

Key static methods:

| Method | Description |
|---|---|
| `getActiveSubscriptions($userId)` | Get all active subscriptions for a user |
| `cancelSubscription($subscription, $atPeriodEnd)` | Cancel via Stripe API (immediate or end-of-period) |
| `renewSubscription($subscription)` | Retry failed payment via Stripe API |
| `getPortalSubscriptions($userId)` | Subscriptions formatted for the member portal UI |

---

## Cancel at period end vs immediate cancel

`cancel_at_period_end = 1` → member keeps access until `current_period_end`, then subscription terminates automatically.

`cancel_at_period_end = 0` + immediate cancel → membership cancelled now, access ends now.

Controlled by the "Cancellation Mode" setting in Settings → Payment Settings.

---

## Subscription renewal (failed payment recovery)

1. Member goes to portal → sees "Payment Failed" badge
2. Clicks "Retry Payment"
3. `POST /billing/subscriptions/{uuid}/renew`
4. `SubscriptionHelper::renewSubscription()` calls Stripe to retry the latest invoice
5. On success → subscription status → `active`, MembershipUser status → `active`

Doc: `guide/members/portal/renewing-a-failed-subscription.md`

---

## Doc files

| File | Covers |
|---|---|
| `guide/transactions/index.md` | Subscription list view in admin |
| `guide/members/portal/renewing-a-failed-subscription.md` | Member-side renewal |
