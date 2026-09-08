---
chunk: 19
category: Integrations
subcategory: FluentCart
query-triggers: [FluentCart, fluent cart, cart integration, FLUENTCART_VERSION, cart_product_ids, FluentCartConnector, Integration Feed, watch_on_access_revoke, cart paywall, cart variants]
related-chunks: [03, 12]
source-files: [app/Modules/Integrations/FluentCart/FluentCartConnector.php, app/Modules/Integrations/FluentCart/Connector.php, app/Modules/Integrations/FluentCart/Paywalls.php, app/Modules/Integrations/FluentCart/Restrictions.php, app/Modules/Integrations/FluentCart/RestrictionSupport.php, app/Modules/Integrations/FluentCart/CustomerPortalIntegration.php, app/Modules/Integrations/FluentCart/Http/cart_api.php, app/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php, app/Modules/Integrations/FluentCart/Http/Controllers/RestrictionController.php, app/Services/MembershipLevelsRenderer.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Integration — FluentCart

## Detection

```php
defined('FLUENTCART_VERSION')
```

If true → FluentCart is active, and `fluentcart` becomes an available `pricing_type` for Membership Levels (see chunk 03). Provider key in shortcode/variant output: `fluent_cart`.

---

## Two independent mechanisms — do not conflate them

FluentCart integration is **two separate systems** that happen to work together, not one:

1. **Paywall / pricing display** — which FluentCart product variants are *shown as buyable options* on a Level's pricing card.
2. **Integration Feed** — which Level(s) actually get *granted or revoked* when a FluentCart order completes or is refunded.

A site is typically configured so both point at the same product, but nothing in the code couples them — the Feed can be attached to any FluentCart product regardless of which Level (if any) lists that product in its `cart_product_ids`.

---

## 1. Paywall / pricing display

Level settings key: `cart_product_ids[]` (int[], stored in the Level's `settings` JSON — same pattern as `ff_form_ids`/`paymattic_form_ids`, see chunk 03's `PROVIDER_SETTINGS_KEYS`). Only levels whose `pricing_type === 'fluentcart'` render this way (`MembershipLevelsRenderer::providersForLevel()`).

Variant resolution: `MembershipLevelsRenderer::getCartVariants($level, $prefetchedProducts = null)` — **not** `ShortcodeHandler` (a prior revision of this chunk pointed at `ShortcodeHandler::getCartVariants()`, which no longer exists).

```php
[
    'id'              => $variant->id,
    'post_id'         => $variant->post_id,
    'post_title'      => $product->post_title,
    'variation_title' => $variant->variation_title,
    'checkout_url'    => $checkoutUrl,   // built inline, see below
    'item_price'      => $variant->item_price,
    'formatted_total' => \FluentCart\App\Helpers\Helper::toDecimal($variant->item_price),
    'other_info'      => $variant->other_info,
    'provider'        => 'fluent_cart',
]
```

`checkout_url` is built with:

```php
add_query_arg([
    'fluent-cart' => 'instant_checkout',
    'item_id'     => $variant->id,
    'quantity'    => 1,
    'source'      => 'fluent_members',
    'level_id'    => $levelId,
], site_url());
```

For the `[fluent_membership_level]`/`[fluent_membership_levels]` shortcodes rendering many levels at once, product/variant data is prefetched in bulk (`MembershipLevelsRenderer::prefetchProviderResources()`) rather than queried per level.

---

## 2. Integration Feed (membership granting)

`FluentCartConnector` (`app/Modules/Integrations/FluentCart/FluentCartConnector.php`) extends FluentCart's own `\FluentCart\App\Modules\Integrations\BaseIntegrationManager` — the same base class FluentCart's other integrations (email marketing, etc.) use. This registers **Fluent Members as a FluentCart Integration Feed**, configured from *inside FluentCart's own product/checkout editor*, not from the Fluent Members admin.

Feed fields (`getSettingsFields()`):

| Field | Purpose |
|---|---|
| `name` | Feed label |
| `level_ids[]` | Level(s) to grant on a matching order |
| `remove_level_ids[]` | Level(s) to explicitly revoke on a matching order |
| `watch_on_access_revoke` | If enabled, auto-revoke the granted level(s) on refund or subscription-access expiration |

`processAction($order, $eventData)` runs on the feed event:
- If `is_revoke_hook` → `removeMembership()`: for each `remove_level_ids`, cancel any non-cancelled `MembershipUser` row for that user/level via `MembershipService::cancelMembership()`.
- Otherwise → `addMembership()`: for each `level_ids`, dedupe by `(user_id, membership_level_id, provider='fluent_cart', provider_source_id=$orderId)` to avoid double-granting on event replay; marks any existing active/trial membership on that level `upgraded`; builds the new membership via `ProviderDataService::prepareFluentCartEventData($levelId, $eventData)` and `MembershipUser::create()`; fires `do_action('fluent_members/membership_level_assigned', $membership, $userId)`.
- Also processes `remove_level_ids` in the same non-revoke pass (a single order event can grant some levels and remove others).

---

## Module files

| File | Role |
|---|---|
| `FluentCartConnector.php` | Registers the Integration Feed and handles grant/revoke (`processAction`) |
| `Connector.php` | Additional connection/bootstrap logic |
| `Paywalls.php` | Paywall registration support |
| `Restrictions.php` / `RestrictionSupport.php` | Access Group restriction support for FluentCart products/categories/brands |
| `CustomerPortalIntegration.php` | Portal tab/panel integration |
| `Http/cart_api.php` | REST API routes for FluentCart-specific endpoints |
| `Http/Controllers/PaywallController.php` | Paywall API controller |
| `Http/Controllers/RestrictionController.php` | Restriction-content API controller for FluentCart product buckets |

---

## Doc note

Paywalls/pricing covered in `guide/levels/pricing-paywalls.md`. The Integration Feed (grant/revoke) mechanism is not yet documented anywhere in `guide/` — worth a dedicated section or `guide/integrations/fluent-cart.md` since it's a materially different setup step (done in FluentCart, not Fluent Members) from the paywall linkage.
