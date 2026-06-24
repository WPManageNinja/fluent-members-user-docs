---
chunk: 31
category: Pro Features
subcategory: Billing Actions
query-triggers: [billing, cancel billing, refund, admin cancel, admin refund, BillingActionController, setup intent, update payment method, transactions, orders, fmem_membership_orders, fmem_membership_transactions]
related-chunks: [29, 30, 05]
source-files: [fluent-members-pro/app/Http/Controllers/BillingActionController.php, fluent-members-pro/app/Models/MembershipOrder.php, fluent-members-pro/app/Models/MembershipTransaction.php, fluent-members-pro/app/Services/OrderHelper.php, fluent-members-pro/app/Services/TransactionHelper.php]
doc-files: [guide/transactions/index.md, guide/members/portal/updating-payment-method.md]
---

# Pro — Billing Actions

## Overview

Billing actions are Pro-only admin and member-facing operations on subscriptions and orders.

---

## Database tables

### `fmem_membership_orders`

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public order reference |
| `user_id` | int | WordPress user ID |
| `membership_user_id` | int | FK → fmem_membership_users.id |
| `membership_subscription_id` | int\|null | FK → fmem_membership_subscriptions.id |
| `provider` | varchar | `native` / `woocommerce` |
| `provider_order_id` | varchar | Stripe PaymentIntent ID or WC order ID |
| `status` | varchar | `pending`, `paid`, `refunded`, `failed` |
| `subtotal` | decimal | |
| `tax` | decimal | |
| `total` | decimal | |
| `currency` | varchar | ISO 4217 |
| `settings` | longtext | JSON metadata |

### `fmem_membership_transactions`

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | |
| `order_id` | int | FK → fmem_membership_orders.id |
| `user_id` | int | |
| `provider` | varchar | |
| `provider_transaction_id` | varchar | Stripe charge ID (ch_xxx) |
| `status` | varchar | `pending`, `paid`, `refunded`, `failed` |
| `amount` | decimal | |
| `currency` | varchar | |
| `settings` | longtext | |

---

## Admin billing routes

| Method | Path | Action |
|---|---|---|
| GET | `/billing/subscriptions` | List all subscriptions (admin) |
| POST | `/billing/subscriptions/{uuid}/cancel` | Admin: cancel a subscription |
| GET | `/billing/transactions` | List all transactions (admin) |
| POST | `/billing/transactions/{uuid}/refund` | Admin: refund a transaction |

---

## Member billing routes (in portal)

| Method | Path | Action |
|---|---|---|
| POST | `/billing/subscriptions/{uuid}/renew` | Member: retry failed payment |
| POST | `/billing/subscriptions/{uuid}/payment-method/setup-intent` | Get Stripe SetupIntent for card update |
| POST | `/billing/subscriptions/{uuid}/payment-method/update` | Save new card |

---

## Updating payment method (member self-service)

1. Member clicks "Update Payment Method" in portal
2. `POST /billing/subscriptions/{uuid}/payment-method/setup-intent`
3. Server creates a Stripe SetupIntent, returns `client_secret`
4. Front end mounts Stripe Elements → member enters new card
5. Stripe confirms the SetupIntent
6. `POST /billing/subscriptions/{uuid}/payment-method/update { payment_method_id }`
7. Server: attaches payment method to Stripe customer, sets as default on subscription
8. All future recurring charges use new card

Doc: `guide/members/portal/updating-payment-method.md`

---

## Refund flow (admin)

`POST /billing/transactions/{uuid}/refund`
Request: `{ amount: float }` (optional — partial refund; omit for full refund)

1. Looks up Stripe charge ID from `provider_transaction_id`
2. Calls Stripe API: `POST /v1/refunds { charge, amount }`
3. On success: updates transaction status to `refunded`, updates order status if fully refunded
4. Does NOT automatically change membership status — admin must also update status if desired

---

## Cancel subscription (admin)

`POST /billing/subscriptions/{uuid}/cancel`
Request: `{ cancel_immediately: bool }`

- `cancel_immediately: true` → Stripe cancel now → membership status → `cancelled`
- `cancel_immediately: false` → set `cancel_at_period_end = 1` → membership continues to `current_period_end` then auto-cancels

---

## OrderHelper + TransactionHelper

`OrderHelper::createOrder($data)` — creates an order record after successful checkout.
`OrderHelper::getOrders($userId)` — list orders for a user.
`TransactionHelper::createTransaction($order, $chargeData)` — records a transaction from a Stripe charge.
`TransactionHelper::getTransactions($userId)` — list transactions for a user.

---

## Doc files

| File | Covers |
|---|---|
| `guide/transactions/index.md` | Admin billing overview, all orders/transactions |
| `guide/members/portal/updating-payment-method.md` | Member self-service card update |
