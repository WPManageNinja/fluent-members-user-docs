---
chunk: 21
category: Integrations
subcategory: Paymattic
query-triggers: [Paymattic, WPPAYFORM_VERSION, paymattic integration, paymattic paywall, paymattic forms, wppayform]
related-chunks: [03, 12]
source-files: [app/Modules/Integrations/Paymattic/Paywalls.php, app/Modules/Integrations/Paymattic/Http/paymattic_api.php, app/Modules/Integrations/Paymattic/Http/Controllers/PaywallController.php]
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

## Variant resolution (from `ShortcodeHandler::getPaymatticVariants()`)

Pattern is equivalent to Fluent Forms:
1. Load forms by IDs from `paymattic_form_ids` in level settings
2. `Paywalls::getCheckoutUrl($formId)` — direct URL to the Paymattic form page
3. `Paywalls::parseFormPlans($form)` — extracts plan options from the form's payment fields
4. Each plan → a variant with `checkout_url` and price info
5. Fallback → single payment amount if no plans

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
