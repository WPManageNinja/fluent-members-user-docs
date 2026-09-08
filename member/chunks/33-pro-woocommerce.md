---
chunk: 33
category: Pro Features
subcategory: WooCommerce Integration
query-triggers: [WooCommerce, woo, WC integration, WooCommerce product, WC_PLUGIN_FILE, woo paywall, woo variants, WooCommerce subscriptions, wc_subscriptions, wc_product_ids]
related-chunks: [03, 04, 12, 30]
source-files: [fluent-members-pro/app/Modules/Integrations/Woocommerce/Connector.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Paywalls.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/CustomerPortalIntegration.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Restrictions.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Services/InstantCheckoutService.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Http/Controllers/PaywallController.php, fluent-members-pro/app/Modules/Integrations/Woocommerce/Http/woo_api.php, fluent-members/app/Services/ProviderDataService.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Pro — WooCommerce Integration

## Detection

```php
defined('WC_PLUGIN_FILE') && defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')
```

Both WooCommerce AND Fluent Members Pro must be active. `MembershipLevel::availablePricingTypes()` only offers pricing type `woocommerce` when both are true (see chunk 03). Provider value stored on the membership record: `woocommerce`.

---

## Two separate roles for WooCommerce

WooCommerce shows up in Fluent Members in two distinct ways:

1. **Paywalls (`Paywalls.php`)** — a WC product/variation, when purchased, grants a Membership Level. This is what `pricing_type = 'woocommerce'` levels use.
2. **Restriction scope (`Connector.php`)** — Access Groups can restrict WC products/categories/tags/brands/shipping classes directly, independent of whether that level even sells via WooCommerce (see chunk 04's restriction-rule types).

---

## Level settings keys (paywall linking)

Stored in the Level's `settings` JSON (from `MembershipLevel::PROVIDER_SETTINGS_KEYS['woocommerce']` and read back by `ProviderDataService::getLevelIdsForWcProduct()`):

| Key | Type | Description |
|---|---|---|
| `wc_product_ids[]` | int[] | WooCommerce product IDs linked to this level |
| `wc_variation_ids[]` | int[] | Specific variation IDs to restrict to (empty = all variations of a linked variable product) |

Managed via Pro's own `woo` route group (not the free `/levels` routes):

| Method | Path | Controller@method |
|---|---|---|
| GET | `/woo/products/search` | `PaywallController@searchProduct` |
| GET | `/woo/levels/{levelId}/paywalls` | `PaywallController@getPaywalls` |
| POST | `/woo/levels/{levelId}/paywalls` | `PaywallController@addPaywall` |
| DELETE | `/woo/levels/{levelId}/paywalls` | `PaywallController@removePaywall` |

Fires `fluent_members/paywall_added` / `fluent_members/paywall_removed` on link/unlink.

There is no separate `/woocommerce/products`, `/woocommerce/sync`, or `/woocommerce/settings` route — those do not exist in this version.

---

## Membership grant flow (`Paywalls.php`)

Registered hooks:
- `woocommerce_order_status_completed` → `processUserAccess()`: for each paid order line item, resolves linked Level IDs via `ProviderDataService::getLevelIdsForWcProduct($productId, $variationId)`, supersedes any existing active/trial membership on that level (marks it `upgraded`), creates a new `MembershipUser` (`provider = 'woocommerce'`, `provider_source_id` = the WC order ID), migrates any corporate child memberships to the new parent record, and fires `fluent_members/membership_level_assigned`. Order is marked processed via `_fluent_members_processed` order meta to prevent double-processing; renewal orders (`wcs_order_contains_renewal()`) are skipped here and handled by the subscription hooks below.
- `woocommerce_order_status_changed` → `maybeRevokeOnStatusChange()`: cancels the matching membership(s) when the order moves to `cancelled`, `refunded`, or `failed`.
- If WooCommerce Subscriptions is active (`wcs_get_subscriptions_for_order()` exists):
  - `woocommerce_subscription_status_cancelled` / `woocommerce_subscription_status_expired` → cancels the membership tied to the subscription's parent order.
  - `woocommerce_subscription_status_active` → activates a `trial`-status membership tied to the subscription's parent order, sets `expires_at` from the subscription's next payment date.
  - `woocommerce_subscription_renewal_payment_complete` → extends `expires_at` on the matching membership(s) (and their corporate children) to the new period end; if the membership had lapsed to `expired`, restores it to `active` and fires `fluent_members/membership_renewed`.

---

## WooCommerce My Account tab (`CustomerPortalIntegration.php`)

Adds a membership tab to WooCommerce's My Account page via `woocommerce_account_menu_items` (menu entry) and a `woocommerce_account_{endpoint}_endpoint` action (tab content) — lets WC customers see their Fluent Members membership without visiting the dedicated Member Portal page.

---

## Instant checkout (`Services/InstantCheckoutService.php`)

Registered alongside `Paywalls`; supports a "buy now" style checkout path for a WC-linked Level's product without the customer manually navigating the WC cart.

---

## Doc note

Covered in `guide/levels/pricing-paywalls.md` (WooCommerce section).
