---
chunk: 36
category: Developer Reference
subcategory: API Routes — Pro Plugin
query-triggers: [Pro API routes, Stripe API, billing API, corporate API, subscription API, Pro REST endpoints, wp-json fluent-members pro routes, woo routes]
related-chunks: [35, 29, 30, 31, 32, 33, 34]
source-files: [fluent-members-pro/app/Http/Routes/api.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Http/woo_api.php]
doc-files: [reference/developer-hooks.md]
---

# API Routes — Pro Plugin

Base path: `/wp-json/fluent-members/v2`. Pro registers additional routes on top of the free ones (same base path, different prefixes).

---

## Pro Email Notifications (policy: free plugin's `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/email-notification/preview` | `EmailNotificationProController@preview` |

---

## Payment Method Settings (prefix `settings/payment-methods`, policy: `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/stripe` | `StripeSettingsController@get` |
| POST | `/stripe` | `StripeSettingsController@update` |
| POST | `/stripe/disconnect` | `StripeSettingsController@disconnect` |
| GET | `/paypal` | `PayPalSettingsController@get` |
| POST | `/paypal` | `PayPalSettingsController@update` |
| POST | `/paypal/disconnect` | `PayPalSettingsController@disconnect` |
| POST | `/paypal/seller-auth-token` | `PayPalSettingsController@sellerAuthToken` |
| POST | `/paypal/webhook/setup` | `PayPalSettingsController@setupWebhook` |

No `GET /settings/payment-methods/stripe` webhook-URL-returning route exists separately — Stripe/PayPal webhook endpoints are registered directly by `Services/Payments/Stripe/Webhook/WebhookListener.php` and `Services/Payments/PayPal/Webhook/WebhookListener.php`, not through this app router, so they don't appear as `router->` entries in `api.php`. Verify the exact webhook URL from the plugin's own settings screen rather than assuming a path here.

---

## Membership Level Pricing — Native (prefix `levels/{levelId}/pricing`, policy: `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `PaymentMethodController@getPricing` |
| POST | `/` | `PaymentMethodController@storePricing` |
| GET | `/{pricingId}` | `PaymentMethodController@findPricing` |
| PUT | `/{pricingId}` | `PaymentMethodController@updatePricing` |
| POST | `/{pricingId}/duplicate` | `PaymentMethodController@duplicatePricing` |
| DELETE | `/{pricingId}` | `PaymentMethodController@deletePricing` |

Controller is `PaymentMethodController` (Pro namespace), not a separate `MembershipLevelPricingController`. `storePricing`/`updatePricing` only succeed when the level's `pricing_type === 'native'` and require a non-empty, available `settings.payment_methods[]`.

---

## Checkout — Native Stripe (prefix `checkout/stripe`, policy: `AuthenticatedPolicy` — any logged-in user)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/payment-intent` | `CheckoutController@createStripePaymentIntent` |
| POST | `/confirm-payment-intent` | `CheckoutController@confirmStripePaymentIntent` |

---

## Checkout — Native PayPal (prefix `checkout/paypal`, policy: `AuthenticatedPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/create-order` | `PayPalCheckoutController@createOrder` |
| POST | `/capture-order` | `PayPalCheckoutController@captureOrder` |

---

## Billing — Subscriptions, Admin view (prefix `billing/subscriptions`, policy: `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `SubscriptionController@index` |
| GET | `/{subscriptionUuid}` | `SubscriptionController@show` |
| POST | `/{subscriptionUuid}/cancel` | `BillingActionController@cancelSubscription` |

## Billing — Subscriptions, Member actions (same `billing/subscriptions` prefix, separate policy: `AuthenticatedPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/{subscriptionUuid}/renew` | `BillingActionController@renewSubscription` |
| POST | `/{subscriptionUuid}/payment-method/setup-intent` | `BillingActionController@createPaymentMethodSetupIntent` |
| POST | `/{subscriptionUuid}/payment-method/update` | `BillingActionController@updatePaymentMethod` |
| GET | `/{subscriptionUuid}/available-upgrades` | `SubscriptionController@getAvailableUpgrades` |
| POST | `/{subscriptionUuid}/upgrade` | `BillingActionController@upgradeSubscription` |

---

## Billing — One-Time Purchases (prefix `billing/one-time`, policy: `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `OneTimeMembershipController@index` |
| GET | `/{id}` | `OneTimeMembershipController@show` |

---

## Billing — Transactions (prefix `billing/transactions`, policy: `UserPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `TransactionController@get` |
| POST | `/{transactionUuid}/refund` | `BillingActionController@refundTransaction` |

---

## Corporate Portal (prefix `member-portal`, policy: `AuthenticatedPolicy`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/{id}/corporate-members` | `CorporatePortalController@getCorporateMembers` |
| POST | `/{id}/corporate-invite` | `CorporatePortalController@sendCorporateInvite` |
| POST | `/{id}/corporate-remove` | `CorporatePortalController@removeCorporateMember` |

---

## WooCommerce Routes (conditional: only if `WC_PLUGIN_FILE` defined; separate file `Modules/Integrations/Woocommerce/Http/woo_api.php`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/woo/products/search` | `PaywallController@searchProduct` |
| GET | `/woo/levels/{levelId}/paywalls` | `PaywallController@getPaywalls` |
| POST | `/woo/levels/{levelId}/paywalls` | `PaywallController@addPaywall` |
| DELETE | `/woo/levels/{levelId}/paywalls` | `PaywallController@removePaywall` |

Note the prefix is `woo/`, not `woocommerce/`, and the controller is `PaywallController` under the WooCommerce module namespace, not a generic `WooCommerceController`.

---

## Total Pro routes: ~30 additional (plus 4 WooCommerce-conditional routes)
