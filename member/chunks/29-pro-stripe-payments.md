---
chunk: 29
category: Pro Features
subcategory: Stripe Payments
query-triggers: [Stripe, native checkout, payment intent, payment method, Stripe setup, stripe connect, stripe webhook, CheckoutService, NativeCheckoutController, stripe publishable key, stripe secret key]
related-chunks: [30, 31, 36]
source-files: [fluent-members-pro/app/Modules/Stripe/CheckoutService.php, fluent-members-pro/app/Modules/Stripe/Stripe.php, fluent-members-pro/app/Http/Controllers/NativeCheckoutController.php, fluent-members-pro/app/Services/StripeConnectService.php]
doc-files: [guide/settings/payment-settings/stripe-setup.md, guide/transactions/index.md]
---

# Pro — Stripe Payments (Native)

## What it is

Fluent Members Pro includes a native Stripe integration that handles checkout directly — no third-party form plugin needed. Uses Stripe Payment Intents with Stripe Elements on the front end.

---

## Setup

1. Activate Fluent Members Pro
2. Go to **Settings → Payment Settings → Stripe**
3. Enter Publishable Key and Secret Key (test or live)
4. Add webhook endpoint URL to Stripe dashboard: `{site_url}/wp-json/fluent-members/v2/stripe-webhook`
5. Copy Webhook Signing Secret from Stripe → paste in Fluent Members Settings

**Disconnect**: `POST /settings/payment-methods/stripe/disconnect` removes stored keys.

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/payment-methods/stripe` | Get Stripe settings (masked keys) |
| POST | `/settings/payment-methods/stripe` | Save Stripe keys + webhook secret |
| POST | `/settings/payment-methods/stripe/disconnect` | Remove stored Stripe credentials |
| POST | `/checkout/stripe/payment-intent` | Create a payment intent for checkout |
| POST | `/checkout/stripe/confirm-payment-intent` | Confirm payment after 3DS / card auth |

---

## Checkout flow (payment intent)

```
1. Member selects a pricing plan on the [fluent_membership_level] shortcode
2. POST /checkout/stripe/payment-intent { level_id, price_id, ... }
3. Server creates Stripe Customer + PaymentIntent (or SetupIntent for subscriptions)
4. Returns { client_secret, publishable_key, intent_type }
5. Front end mounts Stripe Elements (card input) with client_secret
6. User enters card → confirmPayment() → Stripe redirects back
7. POST /checkout/stripe/confirm-payment-intent { payment_intent_id }
8. Server confirms, creates MembershipUser + Subscription records
```

---

## One-time vs subscription

| Price type | Stripe object created | Fluent Members record |
|---|---|---|
| One-time | PaymentIntent | MembershipUser (no subscription) |
| Subscription | SetupIntent → Stripe Subscription | MembershipUser + MembershipSubscription |

---

## Settings stored

| Setting | Description |
|---|---|
| `stripe_publishable_key` | Stripe publishable key (test or live) |
| `stripe_secret_key` | Stripe secret key (encrypted at rest) |
| `stripe_webhook_secret` | Webhook signing secret |
| `stripe_test_mode` | `yes`/`no` — use test keys |

Via: `StripeConnectService::getSettings()` / `StripeConnectService::updateSettings()`

---

## Webhook events handled

| Stripe event | Action |
|---|---|
| `invoice.payment_succeeded` | Renew subscription, extend `expires_at` |
| `invoice.payment_failed` | Mark subscription as past-due, trigger notification |
| `customer.subscription.deleted` | Cancel Fluent Members subscription |
| `customer.subscription.updated` | Update subscription metadata |
| `payment_intent.succeeded` | Confirm one-time payment, activate membership |

Webhook endpoint: `POST /wp-json/fluent-members/v2/stripe-webhook`
Verification: `Stripe::constructEvent($payload, $sigHeader, $webhookSecret)` — request rejected if signature invalid.

---

## StripeConnectService

Handles reading and writing Stripe credentials. Keys are encrypted with WordPress salts before storing.

---

## Doc files

| File | Covers |
|---|---|
| `guide/settings/payment-settings/stripe-setup.md` | Setup walkthrough, keys, webhook URL |
| `guide/transactions/index.md` | Viewing payments, orders |
