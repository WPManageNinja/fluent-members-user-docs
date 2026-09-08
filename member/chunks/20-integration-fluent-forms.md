---
chunk: 20
category: Integrations
subcategory: Fluent Forms
query-triggers: [Fluent Forms, FLUENTFORM_VERSION, ff_form_ids, fluent forms paywall, form checkout, parseFormPlans, getCheckoutUrl, ff provider]
related-chunks: [03, 12]
source-files: [app/Modules/Integrations/FluentForms/Paywalls.php, app/Modules/Integrations/FluentForms/Http/ff_api.php, app/Modules/Integrations/FluentForms/Http/Controllers/PaywallController.php, app/Services/MembershipLevelsRenderer.php]
doc-files: [guide/levels/pricing-paywalls.md]
---

# Integration — Fluent Forms

## Detection

```php
defined('FLUENTFORM_VERSION')
```

Provider key in shortcode: `ff`.

---

## What it does

Fluent Forms payment forms act as the checkout for a Membership Level. A member submits a form with payment, Fluent Members receives the payment confirmation hook, and activates the membership.

---

## Level settings key

| Key | Type | Description |
|---|---|---|
| `ff_form_ids[]` | int[] | IDs of Fluent Forms forms linked to this level (stored in level's `settings` JSON) |

---

## Variant resolution (from `MembershipLevelsRenderer::getFluentFormVariants($level, $prefetchedForms = null, $limit = 0)`)

A prior revision of this chunk pointed at `ShortcodeHandler::getFluentFormVariants()` — that method no longer exists; the logic now lives on `MembershipLevelsRenderer` (`app/Services/MembershipLevelsRenderer.php`), alongside the equivalent methods for every other paywall provider.

Source model: `\FluentForm\App\Models\Form::whereIn('id', $formIds)->get()` (or a prefetched/bulk-loaded collection when rendering multiple levels at once, see chunk 19's prefetch note).

For each form:
1. `Paywalls::getCheckoutUrl($form->id)` — direct URL to the form page
2. `Paywalls::parseFormPlans($form)` — extracts plan variants (price + label) from the form's payment field config
3. If plans found → each plan becomes a variant with `checkout_url` pointing to the form
4. If no plans → `Paywalls::getOneTimePaymentData($form)` — extracts single payment amount
5. If no payment data → bare variant with `item_price: 0` and empty `formatted_total`

### Variant shape

```php
[
    'id'              => 0,         // Fluent Forms doesn't have product IDs
    'post_id'         => $form->id,
    'post_title'      => $form->title,
    'variation_title' => $form->title,
    'checkout_url'    => $checkoutUrl,
    'item_price'      => float,
    'formatted_total' => string,
    'other_info'      => ['payment_type' => 'one_time'],
    'provider'        => 'fluentform',   // tagged onto every variant AFTER the loop
]
```

Correction: a prior revision of this chunk said "provider NOT set" for Fluent Forms variants. That is wrong — `getFluentFormVariants()` tags every returned variant with `'provider' => 'fluentform'` in a pass after they're built (used by `PricingOrderService::orderKey()` to classify display order), regardless of whether it came from a parsed plan or the one-time/bare-variant fallback.

---

## Module files

| File | Role |
|---|---|
| `Paywalls.php` | Core paywall logic — `getCheckoutUrl`, `parseFormPlans`, `getOneTimePaymentData` |
| `Http/ff_api.php` | REST routes for Fluent Forms-specific endpoints |
| `Http/Controllers/PaywallController.php` | Paywall API controller |

---

## Doc note

Covered in `guide/levels/pricing-paywalls.md` (Fluent Forms section). Create `guide/integrations/fluent-forms.md` for a dedicated page.
