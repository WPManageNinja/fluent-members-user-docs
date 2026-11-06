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

1. Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.
2. In **Pricing Type**, choose **Paymattic**, then finish creating the level.

    ![Screenshot of the Pricing Type list with Paymattic as an option](/images/integrations/paymattic/paymattic-pricing-type.webp)

3. Open the level's **Pricing** tab and click **Add Pricing**.

    <!-- TODO(screenshot): paymattic-1
      screen: Membership Levels → a Paymattic level → Pricing → Add Pricing
      state: Select Pricing open, showing the Paymattic Forms group
      data: a level with the Paymattic pricing type
      highlight: -
      view: admin
      alt: Screenshot of the Add Pricing window listing Paymattic forms
      reason: the site has no eligible Paymattic form: level #9 DOCTEST Paymattic shows No payment forms found because form 848 lacks wpf_has_payment_field, which Paymattic writes when a form is saved. Needs a saved payment form
    -->

4. Choose the form under **Paymattic Forms** in **Select Pricing**, then click **Add**.

If you have no suitable form yet, click **Create a form in Paymattic**. A form can belong to one level only. If it already sells another level, you see "This form already sells" followed by that level's name.

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
| Payment is fully refunded | The membership is cancelled. |

Refunding an offline subscription payment also cancels the membership. Logged-out buyers and repeat purchases follow the [rules for every paywall](/docs/integrations/).

> [!Note]
> Keep the form's payment setup unchanged after you connect it. If the form no longer has exactly one supported payment item, or its payment type changes, new payments do not create a membership. No warning appears, and the form keeps taking payments, so test a payment after any change.
