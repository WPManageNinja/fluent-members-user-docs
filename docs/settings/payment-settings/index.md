---
title: "Payment Settings"
description: "See which payment gateways are ready to take payments, and open their settings."
---

# Payment Settings

**Payment Settings** lists the gateways for [native payments](/docs/levels/pricing-native) and shows whether each one is ready to take payments. Use it to check a gateway's status or open its settings.

Native payments need **Fluent Members Pro** (Pro). If you sell through FluentCart, Fluent Forms, Paymattic or WooCommerce with [paywalls](/docs/levels/pricing-paywalls), you do not need to configure anything here.

Go to **Fluent Members → Settings → Payment Settings**.

<!-- TODO(screenshot): payment-settings-1
  screen: Settings > Payment Settings
  state: Stripe connected in test mode, showing the Test Mode badge and a webhook badge, the test mode notice at the top, PayPal showing Disabled
  data: Default gateway cards
  highlight: Manage on the Stripe card
  view: admin
  alt: Screenshot of Payment Settings with the Stripe and PayPal cards, status badges and Manage buttons
  reason: needs the develop build on the local site
-->

## Gateway cards

There is one card each for **Stripe** and **PayPal**. Both take one-time and recurring payments. A card shows the gateway name, its status, a webhook badge once connected, a short description and a **Manage** button.

The status badge means:

| Badge | Meaning |
|---|---|
| **Disabled** | The gateway cannot take payments. It is turned off, not connected, or its webhook check has not passed. |
| **Test Mode** | Stripe is taking test payments. No real money moves. |
| **Sandbox Mode** | PayPal is taking sandbox payments. No real money moves. |
| **Live Mode** | The gateway is taking real payments. |

The webhook badge appears on a connected gateway:

- **Webhook verified:** The webhook check passed for the current mode.
- **Webhook not verified:** The check has not passed. On a public site, the gateway stays **Disabled** until it does.

Only a gateway with a status other than **Disabled** can be used at checkout.

## Test mode notice

When a gateway is in test or sandbox mode, a notice at the top says that checkout will not take real payments and asks you to switch to live mode before you start selling. On a local site it adds that the site cannot receive payment webhooks, so renewals will not sync there.

## Set up a gateway

Click **Manage** on a card to open its settings:

- [Set up Stripe](/docs/settings/payment-settings/stripe-setup) (Pro)
- [Set up PayPal](/docs/settings/payment-settings/paypal-setup) (Pro)

If you opened this page from a level's **Pricing** tab, a breadcrumb at the top takes you back to that level.

## Without Pro

On the free version, the cards show a **Pro Required** badge and a disabled **Pro Required** button. A **Prefer to stay on the free plan?** notice below them links to install FluentCart, Fluent Forms or Paymattic, which sell memberships through a paywall on a level's pricing.
