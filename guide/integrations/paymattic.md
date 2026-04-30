# Paymattic Integration

Use Paymattic's payment forms to sell Membership Levels. An alternative to Fluent Forms — same form-based flow, different plugin.

**Here's what you'll learn:**
- When Paymattic is the right fit
- How to build a Paymattic form for a Membership Level
- How to link the form to a Level
- Limitations vs FluentCart/WooCommerce

**Before we start:** Paymattic must be installed and active. Fluent Members auto-detects it.

---

## When to pick Paymattic

- Your site is payment-form oriented (donations, service payments, single-product sales)
- You want one-time membership purchases
- You need recurring payments without installing a full e-commerce stack
- You want a simpler UI than WooCommerce

For complex stores or multi-product catalogues, prefer [WooCommerce](./woocommerce.md) or [FluentCart](./fluent-cart.md).

---

## Step 1 — Build the payment form

1. Go to **Paymattic → Add New Form**.
2. Pick a blank or template form.
3. Add a payment field with the price for your membership.
4. Configure your payment gateway (Stripe, PayPal, etc.).
5. Publish.

For a subscription, use Paymattic's recurring payment configuration. Paymattic supports fixed-interval recurring payments.

---

## Step 2 — Link the form to a Level

1. Go to **Fluent Members → Levels** → open your Level.
2. Pricing Packages → **Add New Price → Paymattic**.
3. Pick the form.
4. Save.

![Paymattic form linked as pricing](/images/integrations/paymattic-link.png)

---

## Step 3 — Embed the form

Use Paymattic's shortcode on a pricing page:

```
[wppayform id="1"]
```

Replace `1` with your form's ID.

On a successful payment, Fluent Members assigns the linked Level.

---

## User creation

Like Fluent Forms, Paymattic uses the form's email field to identify the buyer. If no matching WordPress user exists, one is created automatically.

---

## Limitations

- Subscription support is simpler than WooCommerce Subscriptions — check Paymattic's documentation for current recurring billing capabilities.
- No multi-product catalogue — one form per product/plan.
- No inventory management or advanced e-commerce features.

---

## A real example — a workshop series

A teacher sells access to a 6-month workshop series for $299. She doesn't want WooCommerce.

**Paymattic form:** one-time $299 payment with name, email, and a "goals" text field.
**Fluent Members Level:** *Workshop Series* with `expires_at` set 6 months from purchase.
**Pricing Packages → Paymattic:** linked.

Every purchase creates a user (if new), assigns the Level, and gives them 6 months of access.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Paymattic option missing in Pricing Packages | Paymattic not active, or minimum version missing | Install/activate Paymattic |
| Payment complete but member not created | Email field mapping issue | Check Paymattic's user registration settings |
| Recurring not tracking | Double-check Paymattic's subscription configuration | See Paymattic docs |

---

## What's next?

**→ [FluentCRM](./fluent-crm.md)** — automate emails on membership events.

**Related reading:**
- [Pricing](../core-concepts/pricing.md)
- [Fluent Forms](./fluent-forms.md) — comparable integration
