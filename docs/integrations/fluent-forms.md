---
title: "Fluent Forms"
description: "Sell a membership level through a Fluent Forms payment form and keep the membership in step with the payment."
---

# Fluent Forms

The **Fluent Forms** integration sells a membership level through a payment form. Fluent Forms takes the payment, and Fluent Members creates the membership and keeps it in step with the subscription. Use it when you want a checkout with your own form fields. It works on the free plan.

## What you need

Before you start, you need:

- Fluent Forms active on your site, with payments set up.
- A published form with exactly one payment item, either a fixed price or a fixed subscription.
- An email field on the form, if visitors without an account can buy.

Forms with custom payment inputs, donation fields or several pricing options are not supported, and they do not appear in the list.

## Connect a form to a level

Follow these steps to sell a level through a form:

1. Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.
2. In **Pricing Type**, choose **FluentForms**, then finish creating the level.

    ![Screenshot of the Pricing Type list with FluentForms as an option](/images/integrations/fluent-forms/fluent-forms-pricing-type.webp)

3. Open the level's **Pricing** tab and click **Add Pricing**.

    ![Screenshot of the Add Pricing window listing Fluent Forms payment forms](/images/integrations/fluent-forms/fluent-forms-add-pricing.webp)

4. Choose the form in **Select Pricing**, then click **Add**.

If you have no suitable form yet, click **Create a form in Fluent Forms**. A form can belong to one level only. If it already sells another level, you see "This form already sells" followed by that level's name.

## Share the checkout link

Fluent Members gives each form its own checkout page. Open the three-dot menu on the form's row in the **Pricing** tab and click **Copy Checkout Link**. Your pricing shortcodes link to this page too.

A logged-out visitor can use the page if the form accepts guests. If you turned on the login requirement in the form's settings, they see **Login Required** with a link to log in.

## What happens after a payment

The membership follows the payment and its subscription:

| In Fluent Forms | In Fluent Members |
|-----------------|-------------------|
| One-time payment is paid | The membership is created with no expiry date. |
| Subscription starts | The membership is created and runs until the date already paid for. A trial subscription gives the **Trial** status. |
| Subscription payment is received | Access is extended. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription completes | The membership stays active with no expiry date if everything was paid. Otherwise the member keeps access until the date already paid for. |
| Payment is refunded | The membership is cancelled. |

Logged-out buyers and repeat purchases follow the [rules for every paywall](/docs/integrations/).

> [!Note]
> Keep the form's payment setup unchanged after you connect it. If the form no longer has exactly one supported payment item, or its payment type changes, new payments do not create a membership. No warning appears, and the form keeps taking payments, so test a payment after any change.
