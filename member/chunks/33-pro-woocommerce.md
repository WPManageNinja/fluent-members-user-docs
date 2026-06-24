---
chunk: 33
category: Pro Features
subcategory: WooCommerce Integration
query-triggers: [WooCommerce, woo, WC integration, WooCommerce product, WC_PLUGIN_FILE, woo paywall, woo variants, WooCommerce subscriptions, wc_subscriptions]
related-chunks: [03, 12, 30]
source-files: [fluent-members-pro/app/Modules/Integrations/Woocommerce/, fluent-members-pro/app/Http/Routes/api.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Pro — WooCommerce Integration

## Detection

```php
defined('WC_PLUGIN_FILE') && defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')
```

Both WooCommerce AND Fluent Members Pro must be active. Provider key in shortcode: `woo`.

---

## What it does

| Feature | Description |
|---|---|
| WooCommerce products as paywalls | WC products/variations linked to a Membership Level — member buys product → membership activated |
| WooCommerce Subscriptions support | WC Subscriptions plugin (or WooPayments recurring) for recurring billing |
| Pricing card | `[fluent_membership_level]` shows WC product variations as subscribe options |
| Membership grant on WC order | WC order completed hook → Fluent Members creates/activates membership |
| WooCommerce My Account tab | Adds Memberships tab to WC My Account page |

---

## Variant resolution (from `ShortcodeHandler::getWooVariants()`)

Source: WooCommerce product model linked to level's `woo_product_ids[]` in level settings.

For each product:
1. If simple product → one variant
2. If variable product → one variant per variation
3. Each variation: `get_permalink()` for checkout_url, `get_price()` for item_price
4. WC Subscriptions pricing detected via `WC_Subscriptions_Product::get_sign_up_fee()`, `::get_price_string()`, etc.

### Variant shape

```php
[
    'id'              => $variation->get_id(),
    'post_id'         => $product->get_id(),
    'post_title'      => $product->get_name(),
    'variation_title' => $variation->get_name(),
    'checkout_url'    => get_permalink($variation->get_id()),
    'item_price'      => $variation->get_price(),
    'formatted_total' => wc_price($variation->get_price()),
    'other_info'      => [
        'payment_type'    => 'subscription' | 'one_time',
        'billing_summary' => string,  // e.g. "$10.00 / month"
    ],
    'provider'        => 'woo',
]
```

---

## Level settings key

| Key | Type | Description |
|---|---|---|
| `woo_product_ids[]` | int[] | WooCommerce product IDs linked to this level |

---

## Routes (Pro WooCommerce routes in api.php)

Conditional block: only registered if `defined('WC_PLUGIN_FILE')`.

| Method | Path | Action |
|---|---|---|
| GET | `/woocommerce/products` | List WC products available for linking |
| POST | `/woocommerce/sync` | Sync WC order statuses with membership statuses |
| GET | `/woocommerce/settings` | Get WC integration settings |
| POST | `/woocommerce/settings` | Update WC integration settings |

---

## Membership grant hook

Registered in WooCommerce module:
```php
add_action('woocommerce_order_status_completed', function($orderId) {
    // Check if order contains a membership product
    // Create/update MembershipUser with provider = 'woocommerce'
});
```

---

## WooCommerce Subscriptions lifecycle

If WooCommerce Subscriptions plugin is active:
- `subscription_status_updated` hook → syncs WC subscription status to MembershipUser status
- `woocommerce_subscription_renewal_payment_complete` → extends membership `expires_at`
- `woocommerce_subscription_cancelled` → cancels the membership

---

## Doc note

Covered in `guide/levels/pricing-paywalls.md` (WooCommerce section). Dedicated page: create `guide/integrations/woocommerce.md`.
