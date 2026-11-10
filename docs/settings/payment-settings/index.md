---
title: "Payment Settings"
description: "See which payment gateways are ready to take payments, and open their settings."
---

# Payment Settings

**Payment Settings** manages the gateways for [native payments](/docs/levels/pricing-native) (Pro). Use it to check whether Stripe or PayPal is ready to take payments, and to open a gateway's settings.

If you sell through FluentCart, WooCommerce, Fluent Forms or Paymattic with [paywalls](/docs/levels/pricing-paywalls), you do not need to configure anything here.

Go to **Fluent Members → Settings → Payment Settings**.

![Screenshot of the Payment Settings screen with Payment Settings underlined in the Settings menu, above the Stripe and PayPal cards](/images/settings/payment-settings/payment-settings-cards.webp)

## Gateway cards

There is one card each for **Stripe** and **PayPal**. Both take one-time and recurring payments. A card shows the gateway's name, a status badge, a short description and a **Manage** button.

The status badge tells you what the gateway is doing:

| Badge | Meaning |
|---|---|
| **Disabled** | The gateway cannot take payments. It is not connected yet, or it is turned off on its own settings page. |
| **Test Mode** | Stripe is taking test payments. No real money moves. |
| **Sandbox Mode** | PayPal is taking sandbox payments. No real money moves. |
| **Live Mode** | The gateway is taking real payments. |

> [!Note]
> Only a gateway with a status other than **Disabled** can be used at checkout. A plan whose gateways are all **Disabled** cannot be bought. See [Checkout](/docs/selling/checkout).

A gateway stays **Disabled** until you connect your account and turn it on. Open it with **Manage** to do both.

## Test mode notice

When a gateway is in test or sandbox mode, a notice at the top of the page says so, for example "Stripe is in test mode, so checkout won't take real payments. Switch it to live mode before you start selling." If both gateways are in test mode, it names both.

Administrators also see a **Test Mode** notice at checkout while a gateway is in test mode. Members and visitors do not.

## Set up a gateway

Click **Manage** on a card to open its settings:

- [Set up Stripe](/docs/settings/payment-settings/stripe-setup) (Pro)
- [Set up PayPal](/docs/settings/payment-settings/paypal-setup) (Pro)

If you opened this page from a level's **Pricing** tab, a breadcrumb at the top takes you back to that level.

If the cards do not load, the page shows "Could not load payment methods. Please try again." with a **Retry** button.

## Without Pro

On the free version, the cards show a **Pro Required** badge, and the **Manage** button becomes a disabled **Pro Required** button. 

A **Prefer to stay on the free plan?** notice below them explains that native Stripe and PayPal are part of Fluent Members Pro. It links to install FluentCart, Fluent Forms or Paymattic, so you can still sell memberships by attaching a paywall to a level's pricing.
