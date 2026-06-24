---
chunk: 19
category: Integrations
subcategory: FluentCart
query-triggers: [FluentCart, fluent cart, cart integration, FLUENTCART_VERSION, CartHelper, cart paywall, cart variants, FluentCartConnector]
related-chunks: [03, 12]
source-files: [app/Modules/Integrations/FluentCart/FluentCartConnector.php, app/Modules/Integrations/FluentCart/Connector.php, app/Modules/Integrations/FluentCart/Paywalls.php, app/Modules/Integrations/FluentCart/Restrictions.php, app/Modules/Integrations/FluentCart/CustomerPortalIntegration.php, app/Modules/Integrations/FluentCart/Http/cart_api.php, app/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Integration — FluentCart

## Detection

```php
defined('FLUENTCART_VERSION')
```

If true → FluentCart is active. Provider key in shortcode: `cart`.

---

## What it does

| Feature | Description |
|---|---|
| Paywall products | FluentCart products/variants linked to a Membership Level act as checkout for that level |
| Pricing card | `[fluent_membership_level]` shows FluentCart variants as subscribe options |
| Membership grant | When a FluentCart order completes, Fluent Members receives a hook and creates/activates the membership |
| Customer portal | Integrates FluentCart customer portal with the Fluent Members member portal |
| Restrictions | FluentCart products/categories can be added as restricted content in Access Groups |

---

## Variant data (from `ShortcodeHandler::getCartVariants()`)

```php
[
    'id'              => $variant->id,
    'post_id'         => $variant->post_id,
    'post_title'      => $product->post_title,
    'variation_title' => $variant->variation_title,
    'checkout_url'    => $variant->checkout_url,
    'item_price'      => $variant->item_price,
    'formatted_total' => CartHelper::toDecimal($variant->item_price),
    'other_info'      => $variant->other_info,
    'provider'        => 'fluent_cart',
]
```

`CartHelper` = `\FluentCart\App\Helpers\Helper`

---

## Level settings keys (for FluentCart)

FluentCart products are linked to levels through the level's UI (not via `settings` JSON like WooCommerce/FF). The link is stored in `fmem_membership_level_pricing` with `provider = 'fluent_cart'`.

Products are accessed via the `products` relation on `MembershipLevel` → each product has `variants` with `checkout_url`, `item_price`, etc.

---

## Module files

| File | Role |
|---|---|
| `FluentCartConnector.php` | Main connector — hooks into FluentCart order events |
| `Connector.php` | Additional connection logic |
| `Paywalls.php` | Paywall registration and product linking |
| `Restrictions.php` | Access Group restriction support for FC products |
| `CustomerPortalIntegration.php` | Portal tab/panel integration |
| `Http/cart_api.php` | REST API routes for FluentCart-specific endpoints |
| `Http/Controllers/PaywallController.php` | Paywall API controller |

---

## Doc note

Paywalls/pricing covered in `guide/levels/pricing-paywalls.md`. Dedicated integration page not yet written; add to that doc or create `guide/integrations/fluent-cart.md` when expanding.
