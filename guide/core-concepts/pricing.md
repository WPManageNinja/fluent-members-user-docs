# Pricing — Where Money Enters the Picture

Fluent Members doesn't charge cards itself. Instead, it connects to payment plugins you already trust. This page explains how that connection works.

**Here's what you'll learn:**
- Why pricing lives in your payment plugin, not in Fluent Members
- The four supported payment plugins and what each handles best
- How a "pricing plan" connects to a Membership Level
- Free plans, paid plans, trials, and one-time vs recurring
- Where to click, in which plugin, for each

**Before we start:** Have you [created a Membership Level](./membership-levels.md) yet? Pricing hangs off a Level, so you'll want that in place. And you'll need one of the four supported payment plugins installed.

---

## How pricing actually works

Here's the model in one paragraph:

> **Fluent Members stores the relationship: "this product or form in my payment plugin grants this Membership Level."** Your payment plugin stores the actual price, billing interval, trial days, and currency. When a purchase completes, the plugin tells Fluent Members, *"Joe just bought this product"* — and Fluent Members assigns Joe the matching Level.

This is powerful because:
- You keep your existing checkout, tax settings, and payment processor
- You can sell the same product as both a membership and a non-membership item
- You can stack offers (upgrades, coupons, bundles) using your payment plugin's features

---

## The four supported payment plugins

| Plugin | Best for | Subscription support |
|---|---|---|
| **FluentCart** | Native, modern, easiest integration | Full (monthly/yearly/custom intervals) |
| **WooCommerce** | If you already run a Woo shop | Via WooCommerce Subscriptions add-on |
| **Fluent Forms** | Simple paid-form memberships | Fixed-price plans |
| **Paymattic** | Simple payment-form memberships | Fixed-price plans |

You can use more than one at a time. Many sites mix Woo for one-time purchases with FluentCart for subscriptions.

See each dedicated guide for setup steps:
- [FluentCart integration](../integrations/fluent-cart.md)
- [WooCommerce integration](../integrations/woocommerce.md)
- [Fluent Forms integration](../integrations/fluent-forms.md)
- [Paymattic integration](../integrations/paymattic.md)

---

## Step 1 — Create the priced product in your payment plugin

Go to your payment plugin and create the product (or form) that represents your membership. The exact steps depend on the plugin — open the integration page linked above for your provider.

Examples:
- **FluentCart:** Products → Add Product → set price (and, for subscriptions, a variation with subscription settings).
- **WooCommerce:** Products → Add Product → Simple or Variable, set Regular price. For subscriptions, add the WooCommerce Subscriptions plugin.
- **Fluent Forms:** Forms → create a form with a Payment field and a fixed price (or a set of subscription plans).
- **Paymattic:** Payment Forms → create a form with a fixed or subscription price.

---

## Step 2 — Connect the product to a Level

Now we tell Fluent Members, *"When someone buys this product, grant them this Level."*

1. Go to **Fluent Members → Levels**.
2. Open the Level you want to price.
3. Find the **Pricing Packages** section (it only appears if at least one payment plugin is active).
4. Click **Add new Price** (or the equivalent button for your provider) and pick the product/form you created.
5. Click **Save** (or **Update Level**).

![Pricing Packages section](/images/pricing/pricing-packages-section.png)

From now on, every purchase of that product auto-assigns the member to the Level.

---

## Free vs paid plans

**Free plans** don't need a price product at all. A user who registers on your site and is then assigned a Free Level will have access immediately. You can assign the Level in two ways:

- Manually through **Fluent Members → Members → Add User**
- Automatically using the [FluentCRM integration](../integrations/fluent-crm.md) or a custom workflow

**Paid plans** always route through one of the four payment plugins. You never enter a price directly inside Fluent Members — if you're looking for that field, you're in the wrong place.

---

## One-time vs subscription

Both are supported, but the setting lives **inside your payment plugin**, not in Fluent Members:

| Purchase type | What happens after checkout |
|---|---|
| **One-time** | Member gets access immediately. If no expiry is set by the plugin, they keep access forever (Lifetime) |
| **Subscription** | Member is active as long as the subscription is active. On cancellation, Fluent Members sets the status to `cancelled` |

Fluent Members listens to the subscription events sent by the payment plugin and updates the member's status accordingly. You don't have to do anything extra.

---

## Trials

Trial periods are set in your payment plugin, not in Fluent Members. When a trial is configured on the product, the member's status starts as `trial` and flips to `active` when the trial ends and billing succeeds.

Trial members have the same content access as active members — the difference is billing only.

See [Membership Statuses](../../reference/membership-statuses.md) for the full status lifecycle.

---

## Currencies

Fluent Members displays whatever currency your payment plugin sends. The `fmem_membership_level_pricing` table stores a `currency` column (ISO code, default `USD`) that's populated from the provider's data at the time of purchase. You don't configure currency inside Fluent Members.

---

## Displaying prices on your site

Once your Level has a linked pricing package, you can show it on any page using the shortcode:

```
[fluent_membership_level id="X"]
```

Replace `X` with the ID from the Levels list. This renders a pricing card with the price, billing interval (if any), and a **Subscribe Now** button that takes the visitor to the provider's checkout.

See the full [Shortcodes & Blocks](../shortcodes-and-blocks.md) reference for customisation.

---

## A real example — Sara's tiered pricing

Sara builds this structure:

| Level | Payment plugin | Product | Price | Interval |
|---|---|---|---|---|
| Free | — | — | $0 | — |
| Pro Monthly | FluentCart | *Pro Monthly* subscription product | $19 | Monthly |
| Pro Annual | FluentCart | *Pro Annual* subscription product | $149 | Yearly |

She creates one Level per billing cadence, each connected to its own FluentCart product. The shortcode `[fluent_membership_level id="2"]` renders her Pro Monthly card; `[fluent_membership_level id="3"]` renders Pro Annual.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| No "Pricing Packages" section on the Level edit screen | No payment plugin is active | Install and activate FluentCart, WooCommerce, Fluent Forms, or Paymattic |
| Price shortcode renders nothing | No product linked to this Level, or Level is Inactive | Link a product in the provider, activate the Level |
| Member paid but wasn't granted the Level | The provider webhook didn't fire | Check your payment plugin's webhook/order status; see [Troubleshooting](../../reference/troubleshooting.md) |
| Wrong currency showing up | Currency comes from your payment plugin | Update it in the provider's settings |

---

## What's next?

You now understand how pricing works. Next up:

- **→ [Corporate Memberships](./corporate-memberships.md)** — if you're selling team plans
- **→ [Pick a payment integration](../integrations/index.md)** — pick the provider that fits your site

**Related reading:**
- [Membership Levels](./membership-levels.md) — the plan they're priced against
- [Managing Members](../members/managing-members.md) — after people buy
- [Membership Statuses reference](../../reference/membership-statuses.md) — `trial`, `active`, `cancelled`, and the rest
