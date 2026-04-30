# Fluent Forms Integration

Use Fluent Forms' payment fields to sell Membership Levels. Perfect for simple "pay and join" flows without setting up a full e-commerce plugin.

**Here's what you'll learn:**
- When Fluent Forms is the right payment integration
- How to build a payment form that assigns a Membership Level
- How to link form entries to Members
- Limitations (no subscriptions, one-time only)

**Before we start:** You need Fluent Forms installed and active. The Pro version is required for payment fields.

---

## When to pick Fluent Forms

- You want one-time purchases only (no recurring billing)
- You have one or a few membership tiers
- You prefer a form-based buying experience over a cart
- You want to collect extra info during purchase (company, preferences, etc.)

If you need **recurring billing**, see [FluentCart](./fluent-cart.md) or [WooCommerce](./woocommerce.md) instead. Fluent Forms handles subscriptions only with a paired payment plugin workaround.

---

## Step 1 — Build the payment form

1. Go to **Fluent Forms → Add New**.
2. Pick a blank form or a payment template.
3. Add a **Payment** field with the membership price.
4. Add any fields you want to collect (name, email, address).
5. Configure a payment gateway (Stripe, PayPal, etc.) in the form's Payment Settings.
6. Publish the form.

---

## Step 2 — Link the form to a Membership Level

1. Go to **Fluent Members → Levels** and open your Level.
2. Scroll to **Pricing Packages** → **Add New Price → Fluent Forms**.
3. Pick the form you built.
4. Save.

![Fluent Forms linked as pricing](/images/integrations/fluent-forms-link.png)

---

## Step 3 — Embed the form on a page

Use Fluent Forms' shortcode on your pricing page:

```
[fluentform id="1"]
```

Replace `1` with your form's ID.

When a visitor submits with a successful payment, Fluent Members assigns the linked Level.

---

## What happens to the WordPress user?

- If the submitter's email matches an existing WordPress user, Fluent Members assigns the Level to that user.
- If no user exists, Fluent Members creates one using the form's email field, and links the Level.

::: tip Heads up — watch your email field
Fluent Forms uses the **email field mapped in the form settings** to identify the user. If the email field is mis-mapped, no user is created or matched. Double-check in the form's Post Feed or User Registration settings.
:::

---

## Limitations

- **No native subscriptions.** Fluent Forms primarily handles one-time payments. For recurring, use FluentCart or WooCommerce.
- **No built-in cancellation flow.** The member can cancel from the portal, but there's no subscription to cancel on the provider side.
- **Manual expiry.** If you want the membership to expire after X days, you'll need to set `expires_at` manually or through another automation.

---

## A real example — a single paid form membership

A solo coach sells lifetime access to her course for a flat $99.

**Form:** one page, name + email + payment field ($99 Stripe).
**Fluent Members Level:** *Lifetime Course* with no expiry.
**Pricing Packages → Fluent Forms:** linked.

Every successful submission creates a WordPress user (if new), assigns the Lifetime Course level, and redirects them to the course content. She handles it with zero carts or stores.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Fluent Forms option missing in Pricing Packages | Fluent Forms not installed / active, or not Pro | Install/activate Fluent Forms Pro |
| Payment completed but no member created | Email field in form isn't mapped to user creation | Check form settings → User Registration / Post Feed |
| Member created but missing Level | Form to Level linkage wrong | Re-link in Fluent Members → Levels |

---

## What's next?

**→ [Paymattic](./paymattic.md)** — similar form-based payment integration.

**Related reading:**
- [Pricing](../core-concepts/pricing.md)
- [Adding a Member Manually](../members/adding-a-member-manually.md)
