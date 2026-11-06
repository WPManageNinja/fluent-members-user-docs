---
chunk: 21
category: Integrations
subcategory: Paymattic
query-triggers: [Paymattic, WPPAYFORM_VERSION, paymattic integration, paymattic paywall, paymattic forms, wppayform]
related-chunks: [03, 12]
source-files: [app/Modules/Integrations/Paymattic/Paywalls.php, app/Modules/Integrations/Paymattic/Http/paymattic_api.php, app/Modules/Integrations/Paymattic/Http/Controllers/PaywallController.php, app/Services/MembershipLevelsRenderer.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Integration — Paymattic

## Detection

```php
defined('WPPAYFORM_VERSION')
```

Provider key in shortcode: `paymattic`.

---

## What it does

Paymattic (WP Payform) payment forms act as the checkout for a Membership Level. A member submits a Paymattic form with payment, Fluent Members receives the payment confirmation hook, and activates the membership.

---

## Level settings key

| Key | Type | Description |
|---|---|---|
| `paymattic_form_ids[]` | int[] | IDs of Paymattic forms linked to this level (stored in level's `settings` JSON) |

---

## Variant resolution (from `MembershipLevelsRenderer::getPaymatticVariants($level, $prefetchedForms = null, $limit = 0)`)

A prior revision of this chunk pointed at `ShortcodeHandler::getPaymatticVariants()` — that method no longer exists; the logic now lives on `MembershipLevelsRenderer` (`app/Services/MembershipLevelsRenderer.php`), alongside the equivalent methods for every other paywall provider (see chunk 20 for the Fluent Forms sibling).

Pattern is equivalent to Fluent Forms:
1. Load `wp_payform` posts by IDs from `paymattic_form_ids` in level settings (or a prefetched/bulk-loaded map when rendering multiple levels at once)
2. `Paywalls::getCheckoutUrl($formId)` — direct URL to the Paymattic form page
3. `Paywalls::parseFormPlans($form)` — extracts plan options from the form's payment fields
4. Each plan → a variant with `checkout_url` and price info
5. Fallback → `Paywalls::getOneTimePaymentData($form)`, then a bare `item_price: 0` variant if that's also empty

Every returned variant is tagged `'provider' => 'paymattic'` in a pass after the loop (matches the shape below).

### Variant shape

```php
[
    'id'              => 0,
    'post_id'         => $form->ID,
    'post_title'      => $form->post_title,
    'variation_title' => $form->post_title,
    'checkout_url'    => $checkoutUrl,
    'item_price'      => float,
    'formatted_total' => string,
    'other_info'      => ['payment_type' => 'one_time'],
    'provider'        => 'paymattic',
]
```

---

## Module files

| File | Role |
|---|---|
| `Paywalls.php` | Core paywall logic |
| `Http/paymattic_api.php` | REST routes |
| `Http/Controllers/PaywallController.php` | Paywall API controller |

---

## Doc note

Covered in `guide/levels/pricing-paywalls.md` (Paymattic section). Create `guide/integrations/paymattic.md` for a dedicated page.
