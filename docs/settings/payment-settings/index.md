---
title: "Payment Settings"
description: "Choose how you sell memberships, see which payment gateways are ready, turn them on or off and open their settings."
---

# Payment Settings

**Payment Settings** is where you choose how you sell memberships and manage the Stripe and PayPal gateways for [native payments](/docs/levels/pricing-native) (Pro). Use it to pick a selling option, check whether a gateway is ready and open its settings.

Go to **Fluent Members → Settings → Payment Settings**.

![Screenshot of Payment Settings with the test mode alert, the selling option cards and the gateway list](/images/settings/payment-settings/payment-settings-1.webp)

## Test mode alert

While the site is in test mode and at least one gateway is turned on, a **Test Mode Enabled** alert tells you "No real payments will be processed." If a gateway cannot receive webhooks on this site, it adds "Subscription renewals won't sync on this local site."

Click **Switch to Live** to open [General Settings](/docs/settings/general), where the site-wide **Site Mode** lives. Stripe and PayPal follow that one switch.

## How you sell memberships

Under **How you sell memberships**, pick one option. New memberships use it, and the price drawer on a level shows only this provider. Each card shows an **In use** badge for the saved choice, or **Ready** for an option you can pick.

| Option | What it sells with |
|---|---|
| **Stripe & PayPal** (Pro) | Stripe and PayPal checkout. Billing, refunds and card updates live in Fluent Members. |
| **FluentCart** | Product variations in your store. Coupons, tax and invoices come from FluentCart. |
| **WooCommerce** (Pro) | Products and WooCommerce Subscriptions. |
| **Fluent Forms** | A payment form grants the membership. |
| **Paymattic** | Payment or donation forms. |
| **No selling, assign only** | Free signups and memberships you assign by hand. |

An option whose plugin is not installed shows an **Install** button. One that needs a newer plugin version shows an **Update** link. **Stripe & PayPal** and **WooCommerce** show a **Pro** badge on the free version.

Click **Save Settings** to keep your choice. Switching later is safe: existing memberships keep their provider and keep renewing, and only new memberships use the new one. See [native payments](/docs/levels/pricing-native) and [paywalls](/docs/levels/pricing-paywalls).

## Payment gateways

The **Payment gateways** list has one row each for **Stripe** and **PayPal**. Both take one-time and recurring payments. A row shows the gateway name, status badges, a short description, a switch and a **Manage** button.

| Badge | Meaning |
|---|---|
| **Disabled** | The gateway is off, or not connected yet. |
| **Test Mode** | Stripe is on and the site is in test mode. No real money moves. |
| **Sandbox Mode** | PayPal is on and the site is in test mode. No real money moves. |
| **Live Mode** | The gateway is on and the site is in live mode. |
| **Webhook verified** or **Webhook not verified** | Shown on a connected gateway. See the setup pages for the webhook check. |

The description under the name reads "Cards, Apple Pay and Google Pay." for Stripe and "PayPal balance, cards and Pay Later." for PayPal.

### Turn a gateway on or off

Use the switch on the row.

- Turning on a gateway that is not connected yet opens its settings, so you can connect it first.
- Turning off asks "Turn off Stripe?" (or PayPal) and says "Checkout stops offering Stripe until you turn it back on." Click **Turn off** to confirm.
- A gateway turns on only once its account is connected and its webhook check passes. If it refuses, a message says what is missing.

Click **Manage** to open a gateway's settings:

- [Set up Stripe](/docs/settings/payment-settings/stripe-setup) (Pro)
- [Set up PayPal](/docs/settings/payment-settings/paypal-setup) (Pro)

If you opened this page from a level's **Pricing** tab, a breadcrumb at the top takes you back to that level. If the list does not load, the page shows "Couldn't load your payment methods." with a retry button.

## Without Pro

On the free version, the gateway rows show a **Pro Required** badge and a **Pro** notice instead of **Manage**. A **Prefer to stay on the free plan?** notice explains that native Stripe and PayPal are part of Fluent Members Pro. It links to install FluentCart, Fluent Forms or Paymattic, so you can still sell memberships by attaching a paywall to a level's pricing.
