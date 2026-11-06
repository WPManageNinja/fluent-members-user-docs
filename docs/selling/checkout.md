---
title: "Checkout and Guest Checkout"
description: "What members and guests see at checkout for native payment plans, how accounts are created, and what happens after payment."
---

# Checkout and Guest Checkout

**Checkout** is the page where a visitor pays for a plan. Native payment plans (Pro) use the checkout built into Fluent Members, and visitors do not need an account first. There is nothing to configure: the page works once a gateway is ready.

You need a [native payment](/docs/levels/pricing-native) plan and a gateway set up in [Payment Settings](/docs/settings/payment-settings/). Paywall plans use the checkout of the plugin that sells them, covered under [Paywall plans](/docs/selling/checkout#paywall-plans).

Visitors reach checkout from a **Choose plan** button on your [pricing page](/docs/selling/pricing-page), or from a checkout link. To get a link for a plan, open its row menu on the level's **Pricing** tab and click **Copy Checkout Link**.

## The checkout page

The left side summarises the order and the right side takes the payment.

![Screenshot of the checkout page for Pro Monthly with the trial order summary, Your Details fields, the Stripe payment form and Start Free Trial](/images/selling/checkout/checkout-guest-details.webp)

The summary shows the plan, its billing, and **Due today**. It adds these rows when they apply:

- **Free Trial: N days**, with what is charged after the trial.
- **Setup Fee**.
- **Account credit applied**, on an upgrade. See [Upgrade paths](/docs/levels/upgrade-paths).

Under **Payment method**, visitors see the gateway's payment form. If the plan can use both Stripe and PayPal, they can switch between them.

The submit button matches the order:

| Button | When |
|---|---|
| **Pay** | Something is due today. |
| **Start Free Trial** | A recurring plan with a trial and no setup fee. |
| **Confirm Upgrade** | An upgrade fully covered by credit. |

> [!Note]
> While a gateway is in test or sandbox mode, administrators see a **Test Mode** or **Sandbox Mode** notice at checkout saying no real payment will be taken. Members and visitors do not see it.

![Screenshot of the checkout page for a logged-in administrator with the Test Mode notice above the payment form](/images/selling/checkout/checkout-logged-in-test-mode.webp)

## Guest checkout

Guest checkout is on by default and has no setting. A logged-out visitor sees **Your Details** with **Name** and **Email**, and the message "We'll create your account and email you a link to set your password."

- **New email:** After payment, Fluent Members creates a WordPress account with the Subscriber role, logs the buyer in, and emails them a link to set a password.
- **Email with an account:** The visitor sees "An account already exists for this email address. Please sign in to continue." and must log in first.

Logged-in members skip **Your Details** and pay with their own account.

To sell only to logged-in visitors, turn guest checkout off with the `fluent_members/guest_checkout_enabled` filter. Visitors then see **Login to Purchase** on the pricing page and **Sign In to Continue** at checkout.

## After payment

When the payment is confirmed, the member sees a **Congratulations!** page saying "You're now a [level] member". It lists **Membership Level**, **Started**, **Provider**, the amount and **Payment Method**, plus **Trial Ends** or **Next Billing Date** when they apply, and a **Go to Portal** button.

<!-- TODO(screenshot): checkout-1
  screen: Checkout success page after a completed payment
  state: Congratulations! page with the membership details and Go to Portal
  data: Pro Monthly, test card payment
  highlight: Go to Portal
  view: frontend
  alt: Screenshot of the Congratulations! page after checkout with the membership details and the Go to Portal button
  reason: needs a completed payment, which is not allowed on the local test site
-->

If the gateway has not confirmed the payment yet, the member sees **We're confirming your checkout** instead. The membership appears in the portal as soon as it is confirmed.

## When checkout is unavailable

The button shows **Checkout Unavailable** when the gateway is not ready, or when Pro is not active on the site. Check that the gateway's status is not **Disabled** in [Payment Settings](/docs/settings/payment-settings/).

If a plan or level is inactive, or a plan has no usable gateway, the link shows a short message such as "Selected pricing plan could not be found." instead of the checkout page.

## Paywall plans

Plans sold through FluentCart, Fluent Forms, Paymattic or WooCommerce use that plugin's own checkout. **Choose plan** goes there, and the plugin takes the payment. Fluent Members then grants the membership.

With FluentCart, Fluent Forms and Paymattic, guests can buy as well. Fluent Members creates the account from the order's email once the order is paid. See each plugin's page under [Connect other plugins](/docs/integrations/).
