---
chunk: 12
category: Member-Facing
subcategory: Shortcodes
query-triggers: [shortcode, fluent_membership_level, fluent_membership_levels, fluent_members, fluent_member_portal, pricing card, pricing grid, content gating shortcode, subscribe button, shortcode attributes, provider resolution]
related-chunks: [03, 11, 19, 20, 21, 29, 33]
source-files: [app/Hooks/Handlers/ShortcodeHandler.php, app/Services/MembershipLevelsRenderer.php, app/Services/RestrictionShortcodeService.php, app/Services/NativePricingService.php]
doc-files: [reference/shortcode-reference.md, guide/members/portal/setup.md]
---

# Shortcodes

## Four shortcodes at a glance

| Shortcode | Attributes | What it renders |
|---|---|---|
| `[fluent_membership_level id="X"]` | `id` (int, required) | Pricing card for one Membership Level |
| `[fluent_membership_levels]` | `ids`, `columns`, `button_text`, `login_text`, `show_title`, `show_description` | A pricing grid for multiple Levels |
| `[fluent_members]` | `levels`/`level`, `message`, `button_text`, `button_url` | Content-gating wrapper — only members of the given Level(s) see the wrapped content |
| `[fluent_member_portal]` | none | Full member self-service dashboard |

Registration: `ShortcodeHandler::register()` — all three level/content shortcodes in one handler:
`add_shortcode('fluent_membership_level', [renderSingle])`, `add_shortcode('fluent_membership_levels', [renderMultiple])`, `add_shortcode('fluent_members', [renderRestriction])`.
Portal shortcode registered separately by `MemberPortalHandler`.

---

## `[fluent_membership_level id="X"]`

### Source: `ShortcodeHandler::renderSingle()` → `MembershipLevelsRenderer::renderSingle()`

### Attributes

| Attribute | Type | Required | Default | Description |
|---|---|---|---|---|
| `id` | integer | YES | — | Membership Level ID (find in **Fluent Members → Levels**) |

### Validation

- If `id` is missing or 0 → returns `__('Invalid membership level ID.')` (checked in the shortcode handler itself, before the renderer runs)
- If level not found in DB → returns `__('Membership level not found.')`
- If the level's `pricing_type` resolves to no available provider on this install → returns empty string `''`

---

## `[fluent_membership_levels]`

### Source: `ShortcodeHandler::renderMultiple()` → `MembershipLevelsRenderer::renderMultiple()`

Renders a responsive pricing grid for several Levels in one call — this is the shortcode auto-inserted onto the generated Pricing page (**Settings → General → Create Pricing Page**, `POST /settings/general/create-pricing-page`).

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `ids` | comma-separated ints | — (empty = all active levels via `resolveLevels()`) | Which Levels to show, in order |
| `columns` | integer | `3` | Grid columns, clamped to 1–4 |
| `button_text` | string | `Choose Package` | CTA button label on every card |
| `login_text` | string | `Login to Purchase` | Button label shown to logged-out visitors |
| `show_title` | `0`/`1` | `1` | Show the Level title on each card |
| `show_description` | `0`/`1` | `1` | Show the Level description on each card |

Resources (products/forms) for every level's provider are prefetched together (`prefetchProviderResources()`) so a multi-card grid stays a bounded number of queries instead of one per card.

---

## `[fluent_members]` (content gating)

### Source: `ShortcodeHandler::renderRestriction()` → `RestrictionShortcodeService::render()`

Wraps arbitrary post/page content and only reveals it to members of the given Level(s) — a lighter-weight alternative to an Access Group for a single block of inline content.

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `levels` / `level` | comma-separated ints | — | Membership Level ID(s) allowed to see the content. Both attrs are merged; either works. |
| `message` | string | global unauthorized-access message | Override text shown to non-members |
| `button_text` | string | global unauthorized-access button text | Override CTA label |
| `button_url` | string | global unauthorized-access button URL | Override CTA link |

### Access logic (`RestrictionShortcodeService::hasAccess()`)

1. Site admins always pass.
2. `fluent_members/shortcode_user_can_access` filter can short-circuit with an explicit bool.
3. If `levels`/`level` was present in the shortcode call but produced no valid IDs (typo, smart quotes) → **fails closed** (denied), rather than silently showing to everyone.
4. Otherwise checks `AccessHelper::userHasAnyLevel($userId, $levelIds)`.

Denied visitors see `RestrictionRenderer::getRestrictionHtmlFromConfig()` output (same restriction-message rendering used elsewhere); a thrown exception during the check falls back to a generic "You do not have permission" block rather than exposing the content.

---

## Payment provider resolution (single-provider-per-level)

Since a Membership Level's `pricing_type` is permanent (see chunk #03), `MembershipLevelsRenderer::providersForLevel()` resolves **at most one** provider token per level — it is no longer a first-match cascade across every active integration:

| Level `pricing_type` | Provider token | Requires |
|---|---|---|
| `fluentcart` | `cart` | FluentCart active |
| `woocommerce` | `woo` | WooCommerce active + Pro |
| `fluentforms` | `ff` | Fluent Forms active |
| `paymattic` | `paymattic` | Paymattic active |
| `native` | `native` | Pro active |
| `native`, but Pro's native checkout isn't wired on this install | `migrated` | Falls back to imported PMPro/MemberPress/Kadence pricing rows so old data still renders |

If the resolved token isn't in `getAvailablePaywallProviders()` (the plugin/integration isn't active), the level renders nothing (`renderSingle`) or is skipped (`renderMultiple`).

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

A pricing row counts as "migrated" (`isMigratedPricing()`) when its `provider` is `pmpro`, `memberpress`, or `rcp` (Kadence Memberships), OR its `settings.migrated_from` key is set — so a custom import can opt in without matching a hardcoded provider list. Only `status = 'active'` rows render.

Source: `MembershipLevelsRenderer::getMigratedVariants()` → `NativePricingService::formatPricing()`

---

## `[fluent_member_portal]`

No attributes. See chunk #11 for full detail.

Template: `app/Views/public/membership-level.php` (single-level card), `app/Views/public/membership-levels.php` (multi-level grid).

---

## Common recipes

### Three-tier pricing page (individual cards)
```html
<div class="pricing-grid">
  [fluent_membership_level id="1"]
  [fluent_membership_level id="2"]
  [fluent_membership_level id="3"]
</div>
```

### Same pricing page, as one auto-laid-out grid
```
[fluent_membership_levels ids="1,2,3" columns="3"]
```

### Gate a paragraph to Gold members only
```
[fluent_members level="4"]This paragraph is for Gold members only.[/fluent_members]
```

### Portal on "My Account" page
```
[fluent_member_portal]
```

---

## Doc file

`reference/shortcode-reference.md` — formal parameter reference for all four shortcodes.
