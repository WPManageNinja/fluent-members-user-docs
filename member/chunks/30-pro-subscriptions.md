---
chunk: 30
category: Pro Features
subcategory: Subscriptions
query-triggers: [subscription, recurring, billing cycle, subscription status, past due, cancel subscription, fmem_membership_subscriptions, MembershipSubscription, SubscriptionHelper, SubscriptionController, SubscriptionRenewHelper, bill_times, bill_count, signup_fee, next_billing_date]
related-chunks: [05, 29, 31]
source-files: [fluent-members/app/Models/MembershipSubscription.php, fluent-members/database/Migrations/MembershipSubscriptionsMigrator.php, fluent-members-pro/app/Http/Controllers/SubscriptionController.php, fluent-members-pro/app/Services/SubscriptionHelper.php, fluent-members-pro/app/Services/SubscriptionRenewHelper.php, fluent-members-pro/app/Services/SubscriptionQueryService.php, fluent-members-pro/app/Services/MembershipUpgradeTargetService.php]
doc-files: [guide/transactions/index.md, guide/members/portal/renewing-a-failed-subscription.md]
---

# Pro — Subscriptions

## Table: `fmem_membership_subscriptions`

Model lives in the **free** plugin (`app/Models/MembershipSubscription.php`) even though subscriptions are a Pro-only feature — Pro's controllers/services are what create and act on rows.

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public-facing UUID (portal URLs, API paths) |
| `user_id` | int | WordPress user ID |
| `membership_user_id` | int\|null | FK → fmem_membership_users.id |
| `parent_order_id` | int\|null | FK → fmem_membership_orders.id — the order that created this subscription |
| `membership_level_id` | int | FK → fmem_membership_levels.id |
| `price_id` | int | FK → fmem_membership_level_pricing.id |
| `item_name` | varchar | Snapshot of the plan's display name |
| `billing_interval` | varchar | e.g. `month`, `year` |
| `interval_count` | int | Number of intervals per billing period (default 1) |
| `signup_fee` | decimal | One-off fee charged at signup (default 0) |
| `currency` | varchar | ISO 4217 |
| `quantity` | int | Default 1 |
| `recurring_amount` | decimal | Amount charged per period |
| `recurring_total` | decimal | `recurring_amount` × `quantity` |
| `bill_times` | int | Total number of billing cycles (0 = unlimited/until cancelled) |
| `bill_count` | int | Number of cycles billed so far |
| `expire_at` | datetime\|null | |
| `trial_ends_at` | datetime\|null | null = no trial |
| `canceled_at` | datetime\|null | |
| `restored_at` | datetime\|null | Set if a cancelled subscription is reactivated |
| `collection_method` | varchar | `automatic` (default) |
| `trial_days` | int | |
| `provider` | varchar | `stripe` (default) or `paypal` |
| `provider_customer_id` | varchar | Stripe customer ID / PayPal payer ID |
| `provider_plan_id` | varchar | Stripe Price ID / PayPal plan ID |
| `provider_subscription_id` | varchar | Stripe subscription ID (`sub_xxx`) or PayPal subscription ID |
| `next_billing_date` | datetime\|null | |
| `status` | varchar | See statuses below |
| `original_plan` | longtext | Serialized snapshot of the plan at signup |
| `provider_response` | longtext | Serialized raw gateway response |
| `current_payment_method` | varchar | e.g. `card` |
| `settings` | longtext | Serialized JSON |
| `created_at` / `updated_at` | timestamp | |

There is **no** `billing_amount` or `current_period_end`/`current_period_start` column — use `recurring_amount`/`recurring_total` and `next_billing_date` instead.

---

## Subscription statuses (model constants)

| Constant | Value | Description |
|---|---|---|
| `STATUS_PENDING` | `pending` | Created, not yet confirmed |
| `STATUS_INCOMPLETE` | `incomplete` | Initial payment not yet confirmed |
| `STATUS_TRIALING` | `trialing` | In trial period |
| `STATUS_ACTIVE` | `active` | Current |
| `STATUS_PAST_DUE` | `past_due` | Payment failed, not yet cancelled |
| `STATUS_CANCELED` | `canceled` | Note: single "l" — matches Stripe's spelling |
| `STATUS_EXPIRED` | `expired` | |
| `STATUS_UNPAID` | `unpaid` | |
| `STATUS_FAILED` | `failed` | |

---

## Model: `MembershipSubscription`

Lookup helpers: `findByUuid()`, `findByParentOrder($orderId)`, `findByMembershipUser($membershipUserId)`, `findByProviderSubscription($provider, $id)`, `findStripeManagedByProviderSubscription($id)` (matches a migrated Stripe-billed subscription from `memberpress`/`pmpro`/`rcp` provider markers whose `current_payment_method = 'stripe'`).

Relations: `user()`, `membershipUser()`, `parentOrder()`, `membershipLevel()`, `price()`.

---

## Admin subscription routes (`SubscriptionController`)

| Method | Path | Action |
|---|---|---|
| GET | `/billing/subscriptions` | List subscriptions (paginated, admin) |
| GET | `/billing/subscriptions/{uuid}` | Single subscription detail |
| GET | `/billing/subscriptions/{uuid}/available-upgrades` | Upgrade targets for this subscription |

Both read routes are thin wrappers over `SubscriptionQueryService`.

Mutating actions (cancel/renew/upgrade/payment-method) live on `BillingActionController` — see chunk 31.

---

## SubscriptionHelper — creating/updating rows

`fluent-members-pro/app/Services/SubscriptionHelper.php` (all **instance**, not static, methods):

| Method | Description |
|---|---|
| `processSubscription(MembershipOrder $order, $subscriptionData = [])` | Create/update the subscription row for a paid order |
| `getSubscriptionByHash($hash)` | Lookup by `uuid` |
| `getSubscriptionByParentOrder($orderId)` | |
| `getSubscriptionByMembershipUser($membershipUserId)` | |
| `getSubscriptionByProviderSubscription($provider, $subscriptionId)` | |
| `updateSubscriptionStatus($subscriptionHash, $status = 'pending')` | |

## SubscriptionRenewHelper

`processExpiredStripeRenewal(MembershipSubscription $subscription, MembershipOrder $order, array $renewData = [], $paymentMode = '')` — retries a failed/expired Stripe subscription's latest invoice.

---

## Cancel at period end vs immediate cancel

Handled by the shared `Cancellation` service (chunk 31), not per-gateway code:

```php
const MODE_IMMEDIATE = 'immediate';
const MODE_END_OF_PERIOD = 'end_of_period';
```

`MODE_END_OF_PERIOD` keeps access until `next_billing_date`, then the subscription is cancelled; `MODE_IMMEDIATE` cancels and revokes access now.

---

## Subscription renewal (failed payment recovery)

1. Member sees a "Payment Failed" badge in the portal
2. Clicks "Retry Payment" → `POST /billing/subscriptions/{uuid}/renew` (`BillingActionController::renewSubscription`)
3. The provider-agnostic `Renewal::processRenewal()` service resolves the subscription's gateway and retries payment (Stripe retries the latest invoice; PayPal issues a fresh checkout URL — see chunk 39)
4. On success → subscription status → `active`, linked MembershipUser status → `active`

Doc: `guide/members/portal/renewing-a-failed-subscription.md`

---

## Doc files

| File | Covers |
|---|---|
| `guide/transactions/index.md` | Subscription list view in admin |
| `guide/members/portal/renewing-a-failed-subscription.md` | Member-side renewal |
