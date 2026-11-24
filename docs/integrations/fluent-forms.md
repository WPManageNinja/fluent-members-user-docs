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

1. Go to **Fluent Members → Settings → Payment Settings** and, under **How you sell memberships**, choose **Fluent Forms**, then click **Save Settings**. You can instead choose the provider when you create a level.
2. Open the level in **Fluent Members → Membership Levels** and go to its **Pricing** tab.
3. Click **Add Pricing**.
4. In the drawer, search under **Pick a payment form** and choose the form. Each form sells one membership.
5. Click **Link form**.

If you have no suitable form yet, create one in Fluent Forms first. A form can belong to one level only. If it already sells another level, you see **Sells** followed by that level's name, and **Already added** marks a form that is already on this level. Only payment forms with a single fixed-price or recurring item are listed.

![Screenshot of the Add Pricing drawer listing Fluent Forms forms](/images/integrations/fluent-forms/add-pricing-drawer.webp)

## Share the checkout link

Fluent Members gives each form its own checkout page. Open the three-dot menu on the form's row in the **Pricing** tab and click **Copy Checkout Link**. Your pricing shortcodes link to this page too.

A logged-out visitor can use the page if the form accepts guests. If you turned on the login requirement in the form's settings, they see "Please log in to access this form." with a **Log In** link.

## What happens after a payment

The membership follows the payment and its subscription:

| In Fluent Forms | In Fluent Members |
|-----------------|-------------------|
| One-time payment is paid | The membership is created with no expiry date. |
| Subscription starts | The membership is created and runs until the date already paid for. A trial subscription gives the **Trial** status. |
| Subscription payment is received | Access is extended. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription completes | The membership stays active with no expiry date if everything was paid. Otherwise the member keeps access until the date already paid for. |
| Payment is refunded, or a one-time payment fails or is cancelled | The membership is cancelled. If the payment is later marked paid, the membership is restored. |

Logged-out buyers and repeat purchases follow the [rules for every selling provider](/docs/integrations/).

> [!Note]
> Keep the form's payment setup unchanged after you connect it. If the form no longer has exactly one supported payment item, or its payment type changes, new payments do not create a membership. No warning appears, and the form keeps taking payments, so test a payment after any change.
