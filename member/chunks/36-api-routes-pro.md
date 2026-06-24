---
chunk: 36
category: Developer Reference
subcategory: API Routes — Pro Plugin
query-triggers: [Pro API routes, Stripe API, billing API, corporate API, subscription API, Pro REST endpoints, wp-json fluent-members pro routes]
related-chunks: [35, 29, 30, 31, 32, 33, 34]
source-files: [fluent-members-pro/app/Http/Routes/api.php]
doc-files: [reference/developer-hooks.md]
---

# API Routes — Pro Plugin

Base path: `/wp-json/fluent-members/v2`

All routes extend the free plugin. Pro registers additional routes on top of the free ones.

---

## Pro Email Notifications

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/email-notification/preview` | `EmailNotificationProController@preview` | Admin |

---

## Stripe Settings

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/settings/payment-methods/stripe` | `StripeSettingsController@getSettings` | Admin |
| POST | `/settings/payment-methods/stripe` | `StripeSettingsController@updateSettings` | Admin |
| POST | `/settings/payment-methods/stripe/disconnect` | `StripeSettingsController@disconnect` | Admin |

---

## Membership Level Pricing (Pro CRUD)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/levels/{levelId}/pricing` | `MembershipLevelPricingController@index` | Admin |
| POST | `/levels/{levelId}/pricing` | `MembershipLevelPricingController@store` | Admin |
| GET | `/levels/{levelId}/pricing/{pricingId}` | `MembershipLevelPricingController@find` | Admin |
| PUT | `/levels/{levelId}/pricing/{pricingId}` | `MembershipLevelPricingController@update` | Admin |
| DELETE | `/levels/{levelId}/pricing/{pricingId}` | `MembershipLevelPricingController@delete` | Admin |

---

## Checkout (Native Stripe)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/checkout/stripe/payment-intent` | `NativeCheckoutController@createPaymentIntent` | Public |
| POST | `/checkout/stripe/confirm-payment-intent` | `NativeCheckoutController@confirmPaymentIntent` | Public |

---

## Stripe Webhook

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/stripe-webhook` | `StripeWebhookController@handleWebhook` | None (verified by signature) |

---

## Billing — Subscriptions (Admin)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/billing/subscriptions` | `BillingActionController@getSubscriptions` | Admin |
| POST | `/billing/subscriptions/{uuid}/cancel` | `BillingActionController@cancelSubscription` | Admin |

---

## Billing — Transactions (Admin)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/billing/transactions` | `BillingActionController@getTransactions` | Admin |
| POST | `/billing/transactions/{uuid}/refund` | `BillingActionController@refundTransaction` | Admin |

---

## Billing — Member Portal Actions

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/billing/subscriptions/{uuid}/renew` | `BillingActionController@renewSubscription` | Logged-in user |
| POST | `/billing/subscriptions/{uuid}/payment-method/setup-intent` | `BillingActionController@createPaymentMethodSetupIntent` | Logged-in user |
| POST | `/billing/subscriptions/{uuid}/payment-method/update` | `BillingActionController@updatePaymentMethod` | Logged-in user |

---

## Corporate Portal

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/member-portal/{id}/corporate-members` | `CorporatePortalController@getCorporateMembers` | Logged-in user (parent) |
| POST | `/member-portal/{id}/corporate-invite` | `CorporatePortalController@sendCorporateInvite` | Logged-in user (parent) |
| POST | `/member-portal/{id}/corporate-remove` | `CorporatePortalController@removeCorporateMember` | Logged-in user (parent) |

---

## WooCommerce Routes (conditional: only if WC active)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/woocommerce/products` | `WooCommerceController@getProducts` | Admin |
| POST | `/woocommerce/sync` | `WooCommerceController@sync` | Admin |
| GET | `/woocommerce/settings` | `WooCommerceController@getSettings` | Admin |
| POST | `/woocommerce/settings` | `WooCommerceController@updateSettings` | Admin |

---

## Total Pro routes: ~25 additional (plus WC conditional routes)
