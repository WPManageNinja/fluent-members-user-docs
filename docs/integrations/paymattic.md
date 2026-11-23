---
title: "Paymattic"
description: "Sell a membership level through a Paymattic payment form and keep the membership in step with the payment."
---

# Paymattic

The **Paymattic** integration sells a membership level through a Paymattic payment form. Paymattic takes the payment, and Fluent Members creates the membership and keeps it in step with the subscription. Use it when you already take payments with Paymattic. It works on the free plan.

## What you need

Before you start, you need:

- Paymattic active on your site, with a payment method set up.
- A published form with exactly one payment item, either a fixed price or a fixed recurring payment.
- A customer email field on the form, if visitors without an account can buy.

Forms with custom amounts or several pricing options are not supported.

## Connect a form to a level

Follow these steps to sell a level through a form:

1. Go to **Fluent Members → Settings → Payment Settings** and, under **How you sell memberships**, choose **Paymattic**, then click **Save Settings**. You can instead choose the provider when you create a level.
2. Open the level in **Fluent Members → Membership Levels** and go to its **Pricing** tab.
3. Click **Add Pricing**.
4. In the drawer, search under **Pick a payment form** and choose the form. Each form sells one membership.
5. Click **Link form**.

If you have no suitable form yet, create one in Paymattic first. A form can belong to one level only. If it already sells another level, you see **Sells** followed by that level's name, and **Already added** marks a form that is already on this level. Only payment forms with a single fixed-price or recurring item are listed.

<!-- TODO(screenshot): paymattic-1
  screen: Fluent Members → Membership Levels → a Paymattic level → Pricing → Add Pricing
  state: the drawer open with Pick a payment form listing eligible forms
  data: a saved payment form with one fixed price item
  highlight: Link form
  view: admin
  alt: Screenshot of the Add Pricing drawer listing Paymattic forms
-->

## Share the checkout link

Fluent Members gives each form its own checkout page. Open the three-dot menu on the form's row in the **Pricing** tab and click **Copy Checkout Link**.

A logged-out visitor can use the page unless the form requires login in its Paymattic settings. That setting takes priority, and the visitor is asked to log in.

## What happens after a payment

The membership follows the payment and its subscription:

| In Paymattic | In Fluent Members |
|--------------|-------------------|
| One-time payment succeeds | The membership is created with no expiry date. |
| Subscription starts | The membership is created and runs until the date already paid for. |
| Subscription payment is received, online or recorded offline | Access is extended. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription completes | The membership stays active with no expiry date if everything was paid. Otherwise the member keeps access until the date already paid for. |
| Payment is refunded, or a one-time payment fails or is cancelled | The membership is cancelled. If the payment is later marked paid, the membership is restored. |

Refunding an offline subscription payment also cancels the membership. Logged-out buyers and repeat purchases follow the [rules for every selling provider](/docs/integrations/).

> [!Note]
> Keep the form's payment setup unchanged after you connect it. If the form no longer has exactly one supported payment item, or its payment type changes, new payments do not create a membership. No warning appears, and the form keeps taking payments, so test a payment after any change.
