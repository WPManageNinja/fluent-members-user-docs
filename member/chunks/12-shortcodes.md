---
chunk: 12
category: Member-Facing
subcategory: Shortcodes
query-triggers: [shortcode, fluent_membership_level, fluent_member_portal, pricing card, subscribe button, shortcode attributes, provider resolution]
related-chunks: [03, 11, 19, 20, 21, 29, 33]
source-files: [app/Hooks/Handlers/ShortcodeHandler.php, app/Services/NativePricingService.php]
doc-files: [reference/shortcode-reference.md, guide/members/portal/setup.md]
---

# Shortcodes

## Both shortcodes at a glance

| Shortcode | Attributes | What it renders |
|---|---|---|
| `[fluent_membership_level id="X"]` | `id` (int, required) | Pricing card for one Membership Level |
| `[fluent_member_portal]` | none | Full member self-service dashboard |

Registration: `ShortcodeHandler::register()` → `add_shortcode('fluent_membership_level', ...)`
Portal shortcode registered by: `MemberPortalHandler`

---

## `[fluent_membership_level id="X"]`

### Source: `ShortcodeHandler::renderSubscription()`

### Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| `id` | integer | YES | — | Membership Level ID (find in **Fluent Members → Levels**) |

### Validation

- If `id` is missing or 0 → returns `__('Invalid membership level ID.')`
- If level not found in DB → returns `__('Membership level not found.')`
- If no payment providers are active → returns empty string `''`

### Payment provider resolution

`getAvailablePaywallProviders()` checks defined constants in this order:

| Check | Provider key | Required |
|---|---|---|
| `defined('FLUENTCART_VERSION')` | `cart` | FluentCart active |
| `defined('WC_PLUGIN_FILE') && defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')` | `woo` | WooCommerce + Pro |
| `defined('FLUENTFORM_VERSION')` | `ff` | Fluent Forms active |
| `defined('WPPAYFORM_VERSION')` | `paymattic` | Paymattic active |
| `defined('FLUENT_MEMBERS_PRO_PLUGIN_VERSION')` | `native` | Pro (Stripe) active |
| Always (if `native` not in list) | `migrated` | Fallback for imported PMPro/MemberPress pricing |

### Variant data shape (per provider)

All providers return the same shape:
```php
[
    'id'              => int,        // variant/product ID
    'post_id'         => int,        // parent product/level ID
    'post_title'      => string,     // product name
    'variation_title' => string,     // variation name or same as post_title
    'checkout_url'    => string,     // direct link to checkout
    'item_price'      => float,
    'formatted_total' => string,     // price formatted with currency symbol
    'other_info'      => [
        'payment_type'    => 'one_time' | 'subscription',
        'signup_fee'      => float|string,
        'trial_days'      => string,       // e.g. '7 days'
        'repeat_interval' => string,       // e.g. 'month' or '3 months'
        'billing_summary' => string,       // human-readable billing description
    ],
    'provider'        => string,     // 'fluent_cart' | 'woo' | 'ff' | 'paymattic' | 'native' | 'migrated'
]
```

### Assets enqueued

- `scss/public/_public.scss` → handle `fluent-members-frontend-app-styles`
- `js/public/buy-pricing.js` → handle `fluent-members-frontend-app-scripts`
- Login popup assets: `RestrictionRenderer::enqueueCheckoutLoginAssets()` (if user is logged out)

### Migrated pricing fallback

If `native` is not in providers, `migrated` is always added. This renders pricing rows from `fmem_membership_level_pricing` with `provider IN ('pmpro', 'memberpress')` and `status = 'active'`.

Source: `ShortcodeHandler::getMigratedVariants()` → `NativePricingService::formatPricing()`

---

## `[fluent_member_portal]`

No attributes. See chunk #11 for full detail.

Template: `app/Views/public/membership-level.php` (for level shortcode)

---

## Common recipes

### Three-tier pricing page
```html
<div class="pricing-grid">
  [fluent_membership_level id="1"]
  [fluent_membership_level id="2"]
  [fluent_membership_level id="3"]
</div>
```

### Portal on "My Account" page
```
[fluent_member_portal]
```

---

## Doc file

`reference/shortcode-reference.md` — formal parameter reference for both shortcodes.
