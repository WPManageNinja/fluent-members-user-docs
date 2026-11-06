---
chunk: 29
category: Pro Features
subcategory: Stripe Payments
query-triggers: [Stripe, native checkout, payment intent, payment method, Stripe setup, stripe connect, stripe webhook, StripeSettingsController, StripeConnectService, Stripe test mode, Stripe live mode, publishable key, secret key]
related-chunks: [30, 31, 36]
source-files: [fluent-members-pro/app/Services/Payments/Stripe/Stripe.php, fluent-members-pro/app/Services/Payments/Stripe/CheckoutService.php, fluent-members-pro/app/Services/Payments/Stripe/CheckoutAssets.php, fluent-members-pro/app/Services/Payments/Stripe/Plan.php, fluent-members-pro/app/Services/Payments/Stripe/StripeLock.php, fluent-members-pro/app/Services/Payments/Stripe/Webhook/WebhookListener.php, fluent-members-pro/app/Services/Payments/Stripe/Webhook/Webhook.php, fluent-members-pro/app/Services/Payments/Stripe/Webhook/WebhookSubscriptionHandler.php, fluent-members-pro/app/Services/StripeSettings.php, fluent-members-pro/app/Services/StripeConnectService.php, fluent-members-pro/app/Http/Controllers/StripeSettingsController.php, fluent-members-pro/app/Http/Controllers/CheckoutController.php]
doc-files: [guide/settings/payment-settings/stripe-setup.md, guide/transactions/index.md]
---

# Pro — Stripe Payments (Native)

## What it is

Fluent Members Pro includes a native Stripe integration that handles checkout directly — no third-party form plugin needed. Uses Stripe Payment Intents with Stripe Elements on the front end. Gateway key: `'stripe'`.

---

## Test / Live modes, each with its own credentials

Settings are **mode-scoped**, not a single set of keys. `StripeSettings` stores:

| Setting | Notes |
|---|---|
| `payment_mode` | `'test'` or `'live'` — which mode is currently active |
| `is_active` | `'yes'`/`'no'` — auto-forced to `'no'` if the active mode has no configuration |
| `test_publishable_key` / `live_publishable_key` | |
| `test_secret_key` / `live_secret_key` | encrypted at rest |
| `test_webhook_secret` / `live_webhook_secret` | encrypted at rest |

Test and live can each be connected independently; switching `payment_mode` swaps which pair is used for checkout without discarding the other.

`StripeSettingsController`:

| Method | Path | Action |
|---|---|---|
| GET | `/settings/payment-methods/stripe` | Get settings + webhook info + Connect account info for both modes |
| POST | `/settings/payment-methods/stripe` | Save settings for the posted `payment_mode` (only the changed mode's fields) |
| POST | `/settings/payment-methods/stripe/disconnect` | Clear credentials for one `mode` (`test` or `live`) |

---

## Stripe Connect (account info), separate from key entry

`StripeConnectService` handles a Stripe Connect OAuth flow (`getConnectConfig()`, `getConnectBase()`, `verifyAuthorizeSuccess()`, `getAccountInfo()`) used to show/verify the connected Stripe account per mode — this is in addition to, not instead of, pasting publishable/secret keys directly into settings.

---

## Checkout flow (payment intent)

Routes (`checkout/stripe`, logged-in user auth):

| Method | Path | Controller@method |
|---|---|---|
| POST | `/checkout/stripe/payment-intent` | `CheckoutController::createStripePaymentIntent` |
| POST | `/checkout/stripe/confirm-payment-intent` | `CheckoutController::confirmStripePaymentIntent` |

```
1. Member selects a pricing plan on the [fluent_membership_level] shortcode
2. POST /checkout/stripe/payment-intent { level_id, price_id, ... }
3. Server creates a Stripe Customer + PaymentIntent (or SetupIntent for subscriptions)
4. Front end mounts Stripe Elements (card input) with the returned client_secret
5. User enters card → confirmPayment() → Stripe redirects back
6. POST /checkout/stripe/confirm-payment-intent { payment_intent_id }
7. Server confirms, creates the MembershipOrder + MembershipTransaction (+ MembershipSubscription for recurring plans)
```

`Stripe::onPaymentEventTriggered()` is the shared entry point both the confirm-intent step and the webhook listener funnel into.

---

## Webhook — NOT a `/wp-json/` route

The Stripe webhook is **not** a REST endpoint. `Stripe::getWebhookUrl()` builds a query-arg URL on the site's own front end:

```
{site_url}/?fluent_members_payment_listener=1&payment_method=stripe
```

A `template_redirect`-style listener catches that query var and hands the raw request to `WebhookListener::handle()`. (PayPal uses the identical pattern with `payment_method=paypal` — see chunk 39.)

`WebhookListener`:
- Verifies the `Stripe-Signature` header against `test_webhook_secret` or `live_webhook_secret` (HMAC-SHA256, ±300s tolerance), auto-detecting mode from the event's `livemode` flag when a mode isn't pre-selected.
- Dedupes by Stripe event `id`, recorded via `Meta` (`object_type = 'stripe_webhook_event'`).
- Takes a short-lived processing lock per event id (WP option `fmem_stripe_event_lock_{id}`, 300s TTL) so a redelivered/concurrent webhook can't double-process.
- Delegates the verified event to `Webhook::process($event, $mode)`.

### Events handled

Split across two classes:

`Webhook.php` (payment/charge events):

| Stripe event | Handler method |
|---|---|
| `payment_intent.succeeded` | `handlePaymentIntentSucceeded` |
| `payment_intent.payment_failed` | `handlePaymentIntentFailed` |
| `charge.refunded` | `handleChargeRefunded` |
| `charge.refund.updated` | `handleChargeRefundUpdated` |

`WebhookSubscriptionHandler.php` (subscription lifecycle events):

| Stripe event | Handler method |
|---|---|
| `invoice.paid` | `handleInvoicePaid` |
| `invoice.payment_failed` | `handleInvoicePaymentFailed` |
| `customer.subscription.updated` | `handleCustomerSubscriptionUpdated` |
| `customer.subscription.deleted` | `handleCustomerSubscriptionDeleted` |

(8 events total. There is no `invoice.payment_succeeded` event in this codebase — the paid-invoice event is `invoice.paid`.)

---

## One-time vs subscription

| Price type | Stripe object created | Fluent Members records |
|---|---|---|
| `one_time` | PaymentIntent | MembershipOrder + MembershipTransaction (no subscription row) |
| `subscription` | SetupIntent → Stripe Subscription | MembershipOrder + MembershipTransaction + MembershipSubscription |

---

## Cancel / refund / renew are provider-agnostic

Admin billing actions (see chunk 31) route through shared, gateway-agnostic services — `Cancellation::processCancellation()`, `Refund::processRefund()`, `Renewal::processRenewal()` — which internally resolve the transaction's/subscription's `provider` and call into Stripe or PayPal accordingly. Nothing in `BillingActionController` calls the Stripe API directly.

---

## Doc files

| File | Covers |
|---|---|
| `guide/settings/payment-settings/stripe-setup.md` | Setup walkthrough, keys, webhook URL |
| `guide/transactions/index.md` | Viewing payments, orders |
