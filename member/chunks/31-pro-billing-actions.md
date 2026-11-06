---
chunk: 31
category: Pro Features
subcategory: Billing Actions
query-triggers: [billing, cancel billing, refund, admin cancel, admin refund, BillingActionController, setup intent, update payment method, transactions, orders, one-time payments, fmem_membership_orders, fmem_membership_transactions, OrderHelper, TransactionHelper, refund lock]
related-chunks: [29, 30, 05]
source-files: [fluent-members/app/Models/MembershipOrder.php, fluent-members/app/Models/MembershipTransaction.php, fluent-members/database/Migrations/MembershipOrdersMigrator.php, fluent-members/database/Migrations/MembershipTransactionsMigrator.php, fluent-members-pro/app/Http/Controllers/BillingActionController.php, fluent-members-pro/app/Http/Controllers/OneTimeMembershipController.php, fluent-members-pro/app/Http/Controllers/TransactionController.php, fluent-members-pro/app/Services/OrderHelper.php, fluent-members-pro/app/Services/TransactionHelper.php, fluent-members-pro/app/Services/Payments/Refund.php, fluent-members-pro/app/Services/Payments/Cancellation.php, fluent-members-pro/app/Services/Payments/Renewal.php]
doc-files: [guide/transactions/index.md, guide/transactions/one-time.md, guide/transactions/refunds.md, guide/transactions/cancellation-modes.md, guide/members/portal/updating-payment-method.md]
---

# Pro — Billing Actions

## Overview

Billing actions are Pro-only admin and member-facing operations on orders, transactions, and subscriptions. The database models (`MembershipOrder`, `MembershipTransaction`) live in the **free** plugin; Pro's controllers/services are what create and act on the rows.

---

## Database tables

### `fmem_membership_orders`

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | Public order reference |
| `user_id` | int | WordPress user ID |
| `membership_user_id` | int\|null | FK → fmem_membership_users.id |
| `membership_level_id` | int | FK → fmem_membership_levels.id |
| `price_id` | int | FK → fmem_membership_level_pricing.id |
| `item_name` | varchar | Snapshot of the plan's display name |
| `provider` | varchar | `stripe` (default) or `paypal` |
| `payment_method` | varchar | `stripe` (default) |
| `status` | varchar | See order statuses below |
| `amount` | decimal | |
| `currency` | varchar | ISO 4217, default USD |
| `provider_customer_id` | varchar | Stripe customer ID / PayPal payer ID |
| `provider_payment_id` | varchar | Stripe PaymentIntent ID / PayPal order ID |
| `provider_session_id` | varchar | Client-generated checkout attempt UUID |
| `provider_subscription_id` | varchar | If this order created a subscription |
| `settings` | longtext | Serialized JSON |
| `created_at` / `updated_at` | timestamp | |

Order status constants (`MembershipOrder`): `STATUS_DRAFT` (`draft`), `STATUS_PENDING` (`pending`), `STATUS_PROCESSING` (`processing`), `STATUS_COMPLETED` (`completed`), `STATUS_FAILED` (`failed`), `STATUS_CANCELLED` (`cancelled`), `STATUS_REFUNDED` (`refunded`).

There is no `subtotal`/`tax`/`total` split and no `membership_subscription_id` column on orders — a *subscription* points back to its originating order via `fmem_membership_subscriptions.parent_order_id` (the reverse of what you'd expect).

### `fmem_membership_transactions`

| Column | Type | Description |
|---|---|---|
| `id` | int PK | |
| `uuid` | varchar | |
| `order_id` | int | FK → fmem_membership_orders.id |
| `subscription_id` | int\|null | FK → fmem_membership_subscriptions.id |
| `user_id` | int | |
| `membership_user_id` | int\|null | |
| `membership_level_id` | int | |
| `price_id` | int\|null | |
| `item_name` | varchar | |
| `provider` | varchar | `stripe` (default) or `paypal` |
| `transaction_type` | varchar | See transaction types below |
| `status` | varchar | See transaction statuses below |
| `amount` | decimal | |
| `currency` | varchar | |
| `payment_method` | varchar | |
| `payment_method_type` | varchar | |
| `card_last_4` | varchar(4) | |
| `card_brand` | varchar | |
| `payment_mode` | varchar | `test` or `live` |
| `payment_note` | text | |
| `provider_charge_id` | varchar | Stripe charge ID |
| `provider_payment_id` | varchar | |
| `provider_invoice_id` | varchar | |
| `provider_subscription_id` | varchar | |
| `provider_refund_id` | varchar | |
| `parent_transaction_id` | int\|null | Self-referencing — a refund transaction points back at the charge it refunds |
| `settings` | longtext | |
| `created_at` / `updated_at` | timestamp | |

Transaction type constants (`MembershipTransaction`): `TYPE_CHARGE` (`charge`), `TYPE_RENEWAL` (`renewal`), `TYPE_REFUND` (`refund`), `TYPE_PARTIAL_REFUND` (`partial_refund`).
Transaction status constants: `STATUS_PENDING` (`pending`), `STATUS_SUCCEEDED` (`succeeded`), `STATUS_FAILED` (`failed`), `STATUS_REFUNDED` (`refunded`), `STATUS_PARTIALLY_REFUNDED` (`partially_refunded`).

There is no `provider_transaction_id` field — use `provider_charge_id` (and `provider_payment_id`/`provider_invoice_id`/`provider_refund_id` for the other gateway references), and transaction status is `succeeded`, not `paid`.

---

## Admin billing routes

| Method | Path | Controller@method |
|---|---|---|
| GET | `/billing/subscriptions` | `SubscriptionController::index` |
| GET | `/billing/subscriptions/{uuid}` | `SubscriptionController::show` |
| GET | `/billing/subscriptions/{uuid}/available-upgrades` | `SubscriptionController::getAvailableUpgrades` |
| POST | `/billing/subscriptions/{uuid}/cancel` | `BillingActionController::cancelSubscription` |
| GET | `/billing/one-time` | `OneTimeMembershipController::index` |
| GET | `/billing/one-time/{id}` | `OneTimeMembershipController::show` |
| GET | `/billing/transactions` | `TransactionController::get` |
| POST | `/billing/transactions/{uuid}/refund` | `BillingActionController::refundTransaction` |

`billing/one-time` (non-recurring purchases) is a separate admin listing from `billing/subscriptions` — the free-plugin-style single `Orders & Transactions` screen actually splits into three views: Subscriptions, One-Time, Transactions.

---

## Member billing routes (authenticated user, in portal)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/billing/subscriptions/{uuid}/renew` | `BillingActionController::renewSubscription` |
| POST | `/billing/subscriptions/{uuid}/payment-method/setup-intent` | `BillingActionController::createPaymentMethodSetupIntent` |
| POST | `/billing/subscriptions/{uuid}/payment-method/update` | `BillingActionController::updatePaymentMethod` |
| POST | `/billing/subscriptions/{uuid}/upgrade` | `BillingActionController::upgradeSubscription` |

---

## Updating payment method (member self-service)

1. Member clicks "Update Payment Method" in portal
2. `POST /billing/subscriptions/{uuid}/payment-method/setup-intent` → Stripe SetupIntent `client_secret`
3. Front end mounts Stripe Elements → member enters new card → Stripe confirms the SetupIntent
4. `POST /billing/subscriptions/{uuid}/payment-method/update { payment_method_id }` → server attaches the payment method to the Stripe customer and sets it default on the subscription
5. Future recurring charges use the new card

Doc: `guide/members/portal/updating-payment-method.md`

---

## Refund flow (admin) — provider-agnostic, with a lock

`POST /billing/transactions/{uuid}/refund` → `BillingActionController::refundTransaction`:

1. Acquires a short-lived refund lock keyed on the transaction UUID (`acquireRefundLock`/`releaseRefundLock`) so a double-click can't double-refund
2. Looks up the `MembershipTransaction` by `uuid`, resolves its order, validates it's actually refundable
3. Delegates to `Refund::processRefund($transaction, $refundData)` — a gateway-agnostic service that resolves the transaction's `provider` (`stripe` or `paypal`) and calls that gateway's refund API
4. On success: records a new `TYPE_REFUND`/`TYPE_PARTIAL_REFUND` transaction (`parent_transaction_id` pointing at the original charge), updates order status if fully refunded
5. Does **not** automatically change membership status — admin must update that separately if desired

`Refund::getRefundableAmount($transaction)` computes how much is left to refund (supports partial refunds).

---

## Cancel subscription (admin)

`POST /billing/subscriptions/{uuid}/cancel` → `BillingActionController::cancelSubscription`, delegates to the shared `Cancellation::processCancellation($subscription, $cancelData)`:

- `Cancellation::MODE_IMMEDIATE` → cancelled at the gateway now → membership status → `cancelled`
- `Cancellation::MODE_END_OF_PERIOD` → membership continues until `next_billing_date`, then auto-cancels

Same service backs both Stripe and PayPal cancellations (see chunks 29/39 for gateway specifics).

---

## OrderHelper + TransactionHelper (instance methods, not static)

`fluent-members-pro/app/Services/OrderHelper.php`:

| Method | Description |
|---|---|
| `processOrder($pricingId, $userId, $orderData = [])` | Create/advance an order for a checkout attempt |
| `createOrderFromSnapshot(array $snapshot, array $orderData = [])` | |
| `getOrderByHash($hash)` | Lookup by `uuid` |
| `getOrderByProviderSession($provider, $sessionId)` / `getOrderByProviderPayment(...)` / `getOrderByProviderSubscription(...)` | |
| `updateOrderStatus($orderHash, $status = 'processing')` | |

`fluent-members-pro/app/Services/TransactionHelper.php`:

| Method | Description |
|---|---|
| `processTransaction(MembershipOrder $order, MembershipSubscription $subscription = null, $transactionData = [])` | Record a transaction from a gateway charge |
| `getTransactionByHash($hash)` | Lookup by `uuid` |
| `getTransactionByProviderCharge(...)` / `getTransactionByProviderPayment(...)` / `getTransactionByProviderInvoice(...)` / `getTransactionByProviderRefund(...)` | |
| `updateTransactionStatus($transactionHash, $status = 'pending')` | |

---

## Doc files

| File | Covers |
|---|---|
| `guide/transactions/index.md` | Admin billing overview: subscriptions, one-time, transactions |
| `guide/transactions/one-time.md` | One-time (non-recurring) purchase view |
| `guide/transactions/refunds.md` | Admin refund flow |
| `guide/transactions/cancellation-modes.md` | Immediate vs end-of-period cancellation |
| `guide/members/portal/updating-payment-method.md` | Member self-service card update |
