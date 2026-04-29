# WooCommerce Integration

Sell memberships through the world's biggest WordPress e-commerce platform. Works with both simple Woo products and WooCommerce Subscriptions.

**Here's what you'll learn:**
- How to connect a WooCommerce product to a Membership Level
- How WooCommerce Subscriptions (the add-on) works with Fluent Members
- Simple vs variable products — what to pick
- How to protect WooCommerce shop content with Access Groups
- Testing and gotchas

**Before we start:** You need both Fluent Members and WooCommerce installed and active. For recurring billing, you also need the **WooCommerce Subscriptions** add-on.

---

## What the integration gives you

- **"WooCommerce" option** in your Fluent Members Level's Pricing Packages.
- Automatic membership assignment when a Woo order completes.
- Subscription state tracking (with WC Subscriptions).
- Ability to apply Access Groups to Woo products and categories.

---

## Step 1 — Create the Woo product

1. Go to **Products → Add New** in WordPress.
2. Set up the product as normal — simple, variable, virtual, downloadable, whatever fits.
3. For a one-time membership fee, use a **Simple Product**.
4. For recurring billing, use a **Simple Subscription** (requires the WC Subscriptions plugin).
5. Set your price and publish.

::: tip Virtual + downloadable memberships
Membership products typically don't need shipping. Tick **Virtual** so WooCommerce skips shipping calculation and address collection. Tick **Downloadable** if you want to attach a PDF or file alongside the membership.
:::

---

## Step 2 — Link the product to a Membership Level

1. Go to **Fluent Members → Levels** and open your Level.
2. Scroll to **Pricing Packages**.
3. Click **Add New Price → WooCommerce**.
4. Pick the Woo product.
5. For variable products, you can link individual variations if different variations should grant different Levels.
6. Click **Save**.

![WooCommerce product linked](/images/integrations/woo-link.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Levels → [Level] → Edit
State: Pricing Packages with WooCommerce product selected
Highlight: The WooCommerce integration row
-->

---

## Step 3 — Test a purchase

1. Open your shop in an incognito window.
2. Buy the linked product.
3. Complete the checkout.
4. The buyer is now an active member. Verify in **Members** or on the [Member Portal](../member-portal/setup.md).

Only **completed** (processing or completed) orders trigger membership assignment. Pending, on-hold, and failed orders do not.

---

## WooCommerce Subscriptions (for recurring billing)

Without WooCommerce Subscriptions, you can only sell one-time purchases. To sell monthly or yearly subscriptions:

1. Install **WooCommerce Subscriptions** (paid add-on by WooCommerce).
2. Create a **Simple Subscription** product.
3. Set recurring price, interval, sign-up fee, trial.
4. Link it in Fluent Members → Levels → Pricing Packages.

When the subscription charges successfully each period, Fluent Members keeps the membership `active`. When a payment fails and the subscription is suspended or cancelled by Woo, Fluent Members updates the status accordingly.

### Status mapping

| WooCommerce Subscription status | Fluent Members status |
|---|---|
| Active | `active` |
| Pending cancellation | `active` (still paid-through) |
| On-hold | `suspended` |
| Cancelled | `cancelled` |
| Expired | `expired` |

---

## Variable products & multi-tier pricing

A common pattern: one Variable product with three variations (Monthly, Yearly, Lifetime). You can link each variation to a different Fluent Members Level:

- Monthly variation → *Pro Monthly* Level
- Yearly variation → *Pro Annual* Level
- Lifetime variation → *Pro Lifetime* Level

All three share the same product page but grant different Levels depending on which the customer picks.

---

## Protecting WooCommerce shop content

You can apply Access Groups to Woo content:
- **Product Categories** — hide entire categories from non-members
- **Specific Products** — gate specific items
- **Product Pages** — restrict individual product detail pages

Create a regular Access Group and add rules like *"Categories → Premium Products"* or *"Post Types → product"*. The Woo storefront respects the restriction engine.

---

## A real example — an e-commerce brand

A brand sells both one-time art prints and a monthly art club subscription.

**Woo setup:**
- Simple products for prints (no Fluent Members linkage)
- One Simple Subscription product: *Art Club — $25/mo*

**Fluent Members setup:**
- Level: *Art Club Member*
- Access Groups: `Members-Only Prints Gallery`, `Monthly Video Tutorials`
- Pricing Packages → WooCommerce → *Art Club* subscription

A customer can buy prints without becoming a member, or subscribe and get both the prints experience plus members-only content. One storefront, two revenue streams.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Integration option missing in Pricing Packages | WooCommerce isn't active | Activate it |
| Purchase complete but no membership | Order status still "on-hold" or "pending" | Wait for completion or mark complete |
| Subscription renewed but status stayed expired | Webhook didn't fire; look at WC Subscriptions logs | Check WC Subscriptions logs, manually resync |
| Trial not recognised | WC Subscriptions trial vs WC-standard trial — check the product | Confirm trial is set on the Simple Subscription product |
| Failed payment didn't suspend | WC Subscriptions is in "Pending cancellation" not "On-hold" | That's expected grace; configure your retry rules |

---

## What's next?

**→ [Fluent Forms](./fluent-forms.md)** or **[Paymattic](./paymattic.md)** — simpler, form-based paid signups.

**Related reading:**
- [Pricing](../core-concepts/pricing.md)
- [Membership Statuses](../../reference/membership-statuses.md)
