# FluentCart Integration

Sell Membership Levels through FluentCart's native checkout. The cleanest, fastest payment integration for Fluent Members.

**Here's what you'll learn:**
- What the FluentCart integration gives you
- How to create a membership product in FluentCart
- How to link that product to a Fluent Members Level
- How one-time vs subscription products work
- How to restrict FluentCart content with Access Groups (bonus)

**Before we start:** You need both plugins installed and active. Fluent Members detects FluentCart automatically — no "enable integration" button to click.

---

## What the integration gives you

Once both plugins are active, three things happen:

1. **"Pricing Packages"** section appears in your Fluent Members Level edit screen, with a FluentCart option.
2. When a FluentCart order completes, Fluent Members **automatically assigns** the matching Level to the buyer.
3. When a FluentCart subscription changes state (paused, cancelled, expired), Fluent Members **automatically updates** the member's status.

You don't need to write any code or configure webhooks.

---

## Step 1 — Create the membership product in FluentCart

1. Go to **FluentCart → Products → Add New**.
2. Set up the product like any other:
   - Title, description, image
   - Pricing (one-time or subscription)
   - Tax, shipping if applicable (memberships usually don't need shipping)
3. Save.

For a subscription plan, use FluentCart's Subscription product type and set:
- Recurring price
- Billing interval (monthly, yearly, custom)
- Optional trial period
- Optional sign-up fee

---

## Step 2 — Link the FluentCart product to a Fluent Members Level

1. Go to **Fluent Members → Levels** and open the Level (or create a new one).
2. Scroll to **Pricing Packages**.
3. Click **Add New Price → FluentCart**.
4. Pick the FluentCart product you just created.
5. Click **Save**.

![FluentCart Linked Product](/images/integrations/fluentcart-link.png)

From now on, any purchase of that FluentCart product grants the linked Level.

---

## Step 3 — Test the flow end-to-end

1. Go to your storefront as a logged-out visitor.
2. Add the product to cart and complete the checkout.
3. Log in as the new customer.
4. Visit the [Member Portal](../member-portal/setup.md) — you should see the Level listed as active.
5. Visit any protected content — access should work.

If the membership didn't appear, check the order status in FluentCart. Only *completed* orders trigger membership assignment.

---

## Subscription status mapping

Here's how FluentCart subscription states translate to Fluent Members statuses:

| FluentCart state | Fluent Members status |
|---|---|
| Trial | `trial` |
| Active | `active` |
| Paused | `suspended` |
| Cancelled | `cancelled` |
| Expired | `expired` |

Status updates flow automatically. You don't touch anything — when a customer's card fails and FluentCart pauses the subscription, Fluent Members immediately suspends the membership.

---

## Protecting FluentCart shop content with Access Groups

The integration also lets you apply Access Groups to FluentCart products and pages. This is handy if you want:

- A premium download that's only accessible after joining a membership
- A members-only product category
- Hiding certain products from non-members

Create an [Access Group](../core-concepts/access-groups.md) with Pages or Post Type rules covering FluentCart content, and attach it to a Level. FluentCart pages respect the same restriction engine as the rest of WordPress.

---

## A real example — Sara's Pro Plan

Sara creates a FluentCart subscription product:
- Title: *Pro Plan — Monthly*
- Price: $19
- Interval: monthly
- Trial: 7 days free

In Fluent Members, she creates a Level called *Pro Plan* and links the FluentCart product in Pricing Packages. She adds `Full Library` as the access group.

A new customer buys on Jan 1:
- Fluent Members creates a `trial` membership for 7 days.
- On Jan 8, FluentCart charges $19. Membership flips to `active`.
- Every month, FluentCart auto-charges. The membership stays `active`.
- When the customer cancels, FluentCart updates — Fluent Members flips to `cancelled`.

Sara never manually touches any of this.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| "Pricing Packages → FluentCart" option missing | FluentCart isn't active, or its version is too old | Install/activate FluentCart |
| Purchase completed but no membership assigned | FluentCart order status isn't "completed" yet | Check order status in FluentCart |
| Trial not showing | Product in FluentCart doesn't have a trial period configured | Edit the FluentCart product's subscription settings |
| Member's status not updating after pause | Webhook delay; usually resolves within minutes | Wait a bit, check again |

---

## What's next?

**→ [WooCommerce](./woocommerce.md)** — if you're already using Woo.

**Related reading:**
- [Pricing](../core-concepts/pricing.md) — how pricing works across all providers
- [Membership Statuses](../../reference/membership-statuses.md) — how provider states map to Fluent Members states
