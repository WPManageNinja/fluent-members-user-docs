# Payment Settings

The list of payment gateways Fluent Members can charge through. As of 1.0, the only entry is **Stripe**.

**Here's what you'll learn:**
- The shape of the Payment Settings page.
- When the Stripe card is Active vs Inactive.
- The single button that takes you deeper.

**Before we start:** Click the gear icon → **Payment Settings** in the left rail. This tab is only relevant for Native Payment ([Pricing Type, Native Payment](../../levels/pricing-native)); paywall-driven sales bypass this tab entirely.

---

## What you see

The Payment Settings page is a list of cards, one per gateway. Currently:

| Card | What it does |
|---|---|
| **Stripe** | Accept one-time and recurring membership payments through Stripe. |

Each card shows:

- The gateway's logo and name.
- An **Active** badge (green) if it's currently in use, otherwise nothing.
- A one-line description.
- A **Manage** button to its right.

![Payment Settings, Stripe card with Active badge](/screenshots/settings-payment-settings.webp)

---

## Active vs Inactive

A gateway is **Active** when:

- Its master toggle is on.
- Its credentials are valid (Stripe: keys for the current Payment Mode are saved).
- It's reachable (no immediate API error on save).

If any of those is false, the **Active** badge disappears. New Pricing Plans configured as Native Payment won't list this gateway in their Payment Methods picker.

---

## Click Manage

The **Manage** button opens the gateway's detailed settings page. For Stripe, that's [Stripe Setup](./stripe-setup), connection, mode, webhook URL, and the list of events to subscribe to.

::: tip In plain language
This tab is the "table of contents." Each gateway has its own page reached via Manage. Today the list has one entry; in future releases more may appear.
:::

---

## Why only Stripe in 1.0?

The plugin is built to be multi-gateway, the architecture supports adding more (PayPal, Authorize.net, regional providers). Stripe is the first because it covers the majority of use cases globally and integrates cleanly with the rest of Fluent Members Pro's billing model (subscriptions, refunds, dunning).

For payments that aren't Stripe, use the [Paywalls Pricing Type](../../levels/pricing-paywalls), your FluentCart, Fluent Forms, or Paymattic gateway handles the money.

---

## A real example: Sara confirms Stripe is live

After connecting Stripe through Stripe Setup, Sara revisits Payment Settings to double-check:

1. She sees the **Stripe** card with the **Active** badge.
2. The description reads: *"Accept one-time and recurring membership payments with Stripe."*
3. She doesn't click Manage, everything she needs is configured already.

The card is the at-a-glance confirmation.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Stripe card without Active badge | Master toggle off, or keys for the current mode (test/live) aren't set. | Open Manage → toggle on → enter keys. |
| Manage button doesn't open the settings page | JavaScript error from another plugin. | Try in a private window with most plugins off. |
| Empty page | The Payment Settings menu item is missing. | Confirm Fluent Members Pro is active. |

---

## What's next?

- **→ [🔒 Pro · Stripe Setup](./stripe-setup)**: the full Stripe configuration and webhook walkthrough.

**Recommended reading:**
- [Pricing, Native Payment](../../levels/pricing-native): use Stripe in a Pricing Plan.
- [Pricing, Paywalls](../../levels/pricing-paywalls): when you'd skip native and use a paywall plugin.
