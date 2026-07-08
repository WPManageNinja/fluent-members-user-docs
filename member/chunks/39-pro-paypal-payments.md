---
chunk: 39
category: Pro Features
subcategory: PayPal Payments
query-triggers: [PayPal, PayPal checkout, PayPal subscription, PayPal webhook, PayPal settings, PayPalCheckoutController, PayPalSettings, PayPalLock, BILLING.SUBSCRIPTION, paypal_era, REST PPCP, PayPal import, fmem_renew_token, paypal disconnect, seller auth token, create-order, capture-order, paypal_lock_ttl]
related-chunks: [30, 31, 36, 26, 27, 28]
source-files: [fluent-members-pro/app/Services/Payments/PayPal/PayPal.php, fluent-members-pro/app/Services/Payments/PayPal/PayPalSettings.php, fluent-members-pro/app/Http/Controllers/PayPalCheckoutController.php, fluent-members-pro/app/Http/Controllers/PayPalSettingsController.php, fluent-members-pro/app/Services/Payments/PayPal/PayPalLock.php, fluent-members-pro/app/Services/Payments/PayPal/Webhook/Webhook.php, fluent-members-pro/app/Services/Payments/PayPal/Webhook/WebhookListener.php, fluent-members-pro/app/Services/Payments/PayPal/Webhook/WebhookSubscriptionHandler.php, fluent-members-pro/app/Services/Payments/PayPal/CheckoutService.php, fluent-members-pro/app/Hooks/Handlers/MigrationHooksHandler.php]
doc-files: [guide/settings/payment-settings/paypal-setup.md]
added-in: v1.1.0
---

# Pro — PayPal Payments (Native)

## What it is

Fluent Members Pro v1.1.0 adds a native PayPal integration (REST PPCP — PayPal Commerce Platform). Supports one-time payments and recurring subscriptions via the PayPal JS SDK on the front end and the PayPal Orders/Subscriptions REST API on the back end.

Gateway key: `'paypal'`
Brand color: `#003087`
Icon: `paypal-icon.svg`

---

## API routes

All under namespace `/wp-json/fluent-members/v2/` — admin auth required (`UserPolicy`):

| Method | Path | Controller method |
|---|---|---|
| GET | `/paypal` | `PayPalSettingsController::get` |
| POST | `/paypal` | `PayPalSettingsController::update` |
| POST | `/paypal/disconnect` | `PayPalSettingsController::disconnect` |
| POST | `/paypal/seller-auth-token` | `PayPalSettingsController::sellerAuthToken` |
| POST | `/paypal/webhook/setup` | `PayPalSettingsController::setupWebhook` |

Checkout routes — logged-in user auth (`AuthPolicy`):

| Method | Path | Controller method |
|---|---|---|
| POST | `checkout/paypal/create-order` | `PayPalCheckoutController::createOrder` |
| POST | `checkout/paypal/capture-order` | `PayPalCheckoutController::captureOrder` |

---

## Settings fields (`PayPalSettings`)

| Field | Type | Default | Notes |
|---|---|---|---|
| `payment_mode` | string | `'sandbox'` | `'sandbox'` or `'live'` only |
| `sandbox_client_id` | string | `''` | |
| `sandbox_client_secret` | string | `''` | **encrypted at rest** |
| `live_client_id` | string | `''` | |
| `live_client_secret` | string | `''` | **encrypted at rest** |
| `sandbox_webhook_id` | string | `''` | |
| `live_webhook_id` | string | `''` | |
| `sandbox_account_id` | string | `''` | Merchant PayPal account ID |
| `live_account_id` | string | `''` | |
| `sandbox_email_address` | string | `''` | |
| `live_email_address` | string | `''` | |
| `sandbox_account_status` | string | `''` | |
| `live_account_status` | string | `''` | |

### Encryption

```php
const ENCRYPTED_PREFIX = 'enc:v1:';
$secretKeyFields = ['sandbox_client_secret', 'live_client_secret'];
```

On save: if field is in `$secretKeyFields`, value is non-blank, and does not already start with `'enc:v1:'`, it is encrypted via `App::make('encrypter')->encryptString($value)` and stored with the prefix. On read: prefix stripped and decrypted. Blank values stored as-is.

### wp-config constant overrides

| Constant | Overrides field |
|---|---|
| `FMEM_PAYPAL_SANDBOX_CLIENT_ID` | `sandbox_client_id` |
| `FMEM_PAYPAL_SANDBOX_CLIENT_SECRET` | `sandbox_client_secret` (trusted as-is, not decrypted) |
| `FMEM_PAYPAL_LIVE_CLIENT_ID` | `live_client_id` |
| `FMEM_PAYPAL_LIVE_CLIENT_SECRET` | `live_client_secret` (trusted as-is, not decrypted) |

Constants take precedence over DB values.

### API base URLs

| Mode | Base URL |
|---|---|
| `live` | `https://api-m.paypal.com` |
| `sandbox` | `https://api-m.sandbox.paypal.com` |

### Key `PayPalSettings` methods

| Method | Returns |
|---|---|
| `getMode()` | `'sandbox'` or `'live'` |
| `getClientId($mode)` | string |
| `getClientSecret($mode)` | string (decrypted) |
| `getWebhookId($mode)` | string |
| `getAccountId($mode)` | string |

---

## Checkout flow

### create-order

```
POST checkout/paypal/create-order
{
  price_id: int,
  payment_method: 'paypal',
  order_uuid: string,       // client-generated UUID for this attempt
  fmem_renew_token: string  // only present for renewal flow
}
```

Calls `PaymentMethods::get('paypal')->initializeCheckout($data)`. Returns PayPal plan ID (subscription) or order ID (one-time) for the JS SDK.

### capture-order

```
POST checkout/paypal/capture-order
{
  order_uuid: string,
  subscription_id: string,  // present for subscription checkout
  paypal_order_id: string   // present for one-time payment checkout
}
```

Branching:
- `subscription_id` present → `confirmDeferredCheckout($orderUuid, $subscriptionId, $userId, 'subscription')`
- otherwise → `confirmDeferredCheckout($orderUuid, $paypalOrderId, $userId, 'payment')`

### Front-end JS data (`loadCheckoutAssets`)

```js
fluentMembersPayPalCheckout = {
  checkout_type: 'subscription' | 'payment',
  rest: { nonce, url },
  i18n: { processing, completed, failed, cancelled }
}
```

Subscriptions inject `intent=subscription&vault=true` into SDK URL; one-time uses `intent=capture`.

---

## Cancellation (`PayPal::cancelSubscription`)

PayPal has no native cancel-at-period-end API. Strategy:

| Cancel mode | PayPal action | Local result |
|---|---|---|
| `MODE_IMMEDIATE` | Cancel subscription via API | `status = cancelled` immediately |
| `MODE_END_OF_PERIOD` | Cancel via API now | Local access continues until `next_billing_date` |

Edge case: if `next_billing_date` is empty and mode is `MODE_END_OF_PERIOD`, falls back to `MODE_IMMEDIATE`.

`PayPalHelper::resolveSubscriptionApiMode($subscription)` determines whether to hit sandbox or live API for an existing subscription.

Returns same key shape as Stripe cancellation result — `Cancellation::processCancellation` is payment-method agnostic.

---

## Renewal (`PayPal::renewSubscription`)

PayPal subscriptions are terminal once cancelled — cannot be re-billed off-session. Renewal = fresh checkout URL:

1. `NativePricingService::buildCheckoutUrl($pricing->id, 'paypal')`
2. Generate one-time token: `wp_generate_password(32, false)`
3. Append `?fmem_renew_token={token}` to checkout URL
4. Store token as WP option `fmem_paypal_renew_tk_{token}` with TTL of 1 hour:
   ```php
   ['renew_sub_uuid' => $uuid, 'user_id' => int, 'price_id' => int, 'expires_at' => time() + HOUR_IN_SECONDS]
   ```
5. Expired tokens pruned by `deleteExpiredRenewTokens()` before each new token
6. Returns `['status' => $subscription->status, 'checkout_url' => $checkoutUrl]`

---

## PayPalLock (concurrent-request mutex)

Prevents double-processing of the same capture or webhook event.

```php
const TTL = 300; // 5 minutes — filterable via 'fluent_members/paypal_lock_ttl'
```

WP option key: `fmem_paypal_confirm_lock_` + `md5($rawKey)`
Handle format: `{option_key}|{random_value}.{expiry_timestamp}`

- `acquire($rawKey)` → handle string or `false` (already locked)
- `release($handle)` → atomic compare-and-delete via direct DB query: `DELETE FROM wp_options WHERE option_name = %s AND option_value = %s`
- Stale expired locks are reclaimed atomically — a fresh lock taken by another worker is never deleted

---

## Webhook events

Endpoint: `POST /wp-json/fluent-members/v2/paypal-webhook`

Dedup: each event ID stored in meta (`WEBHOOK_META_OBJECT_TYPE = 'paypal_webhook_event'`) — duplicate event IDs are rejected.

| Event | Handler | Action |
|---|---|---|
| `PAYMENT.CAPTURE.COMPLETED` | `Webhook::handleCaptureCompleted` | Confirm one-time payment, activate membership |
| `PAYMENT.CAPTURE.REFUNDED` | `Webhook::handleCaptureRefunded` | Record refund row, update parent transaction |
| `PAYMENT.SALE.COMPLETED` | `WebhookSubscriptionHandler::handleSaleCompleted` | Record subscription renewal payment |
| `PAYMENT.SALE.REFUNDED` | `WebhookSubscriptionHandler::handleSaleRefunded` | Record subscription refund |
| `BILLING.SUBSCRIPTION.ACTIVATED` | `WebhookSubscriptionHandler::handleSubscriptionLifecycle` | Activate subscription |
| `BILLING.SUBSCRIPTION.RE-ACTIVATED` | `WebhookSubscriptionHandler::handleSubscriptionLifecycle` | Re-activate suspended subscription |
| `BILLING.SUBSCRIPTION.SUSPENDED` | `WebhookSubscriptionHandler::handleSubscriptionLifecycle` | Suspend subscription |
| `BILLING.SUBSCRIPTION.CANCELLED` | `WebhookSubscriptionHandler::handleSubscriptionLifecycle` | Cancel subscription |
| `BILLING.SUBSCRIPTION.EXPIRED` | `WebhookSubscriptionHandler::handleSubscriptionLifecycle` | Expire subscription |

`PAYMENT.CAPTURE.REFUNDED` guard: skips events where `resource.custom_id` starts with `'fmem_refund_'` — prevents self-initiated refund echo loop.

Refund `resolveCaptureIdFromLinks($links)`: walks `links` array for `rel = 'up'` to find parent capture ID.

---

## PayPal subscription import (migration bridge)

`MigrationHooksHandler` (Pro) registers filter handlers for all three migration sources:

| Source | Filter | Handler |
|---|---|---|
| PMPro | `fluent_members/migration/pmpro/import_subscription` | `handleImportPmproSubscription` |
| MemberPress | `fluent_members/migration/memberpress/import_subscription` | `handleImportMemberPressSubscription` |
| Kadence Memberships | `fluent_members/migration/kadence/import_subscription` | `handleImportKadenceSubscription` |

IPN continuation sources registered via `fluent_members/paypal_ipn_continuation_sources` for each.

### `paypal_era` field

When a migrated subscription used PayPal REST PPCP billing, `paypal_era = 'rest_ppcp'` is stored on the subscription meta. Handler then:
- Calls PayPal API to look up the plan and fetch `provider_plan_id`
- Sets `current_payment_method = 'paypal'`

This allows migrated PPCP subscriptions to renew via PayPal webhooks without the member re-entering payment details.

### `check_paypal_configured` filter

`fluent_members/migration/{plugin}/check_paypal_configured` (bool) — each source has one. Controls whether the migration UI shows the PayPal import option.

---

## Key facts for docs

- Requires Fluent Members Pro active
- `payment_mode` only accepts `'sandbox'` or `'live'` — anything else falls back to `'sandbox'`
- `sandbox_client_secret` and `live_client_secret` are encrypted at rest with `enc:v1:` prefix
- PayPal has no end-of-period API — Fluent Members cancels at PayPal but holds local access until `next_billing_date`
- Subscription renewal requires a fresh checkout URL — the `fmem_renew_token` is valid for 1 hour
- `PayPalLock` TTL defaults to 300 s — filterable via `fluent_members/paypal_lock_ttl`
- 9 webhook events handled (5 subscription lifecycle + 2 capture + 2 sale)
- Webhook dedup via `paypal_webhook_event` meta prevents the same event being processed twice
