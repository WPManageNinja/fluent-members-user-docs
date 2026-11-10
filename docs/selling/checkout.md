---
title: "Checkout and Guest Checkout"
description: "What members and guests see at checkout for native payment plans, how accounts are created, and what happens after payment."
---

# Checkout and Guest Checkout

**Checkout** is the page where a visitor pays for a plan. Native payment plans (Pro) use the checkout built into Fluent Members, and visitors do not need an account first. There is nothing to configure: the page works once a gateway is ready.

**Requirements**

- A [native payment](/docs/levels/pricing-native) plan on an active level.
- A gateway set up in [Payment Settings](/docs/settings/payment-settings/).

Paywall plans use the checkout of the plugin that sells them. See [Paywall plans](/docs/selling/checkout#paywall-plans-external-checkout).

Visitors reach checkout from a **Choose plan** button on your [pricing page](/docs/selling/pricing-page), or from a checkout link. To get a link for a plan, open its row menu on the level's **Pricing** tab and click **Copy Checkout Link**. Use the copied link as it is, because it carries a security token. A link without it shows "Checkout session could not be found."

## The checkout interface

The page is split into two sections.

![Screenshot of the checkout page for Pro Monthly with the trial order summary, Your Details fields, the Stripe payment form and Start Free Trial](/images/selling/checkout/checkout-guest-details.webp)

**Order summary (left)** shows the plan name, its billing interval and the **Due today** amount. A line under **Checkout** says what the visitor will be charged, such as "You'll be charged $29.00". It adds rows when they apply:

- **Free Trial: N days**, with what is charged after the trial.
- **Setup Fee**.
- **Account credit applied**, on an upgrade, with a line such as "$27.07 account credit applied, then $290.00 per year until cancel". A free trial does not apply to upgrades, and the summary says so.

![Screenshot of the checkout page for an upgrade to Gold Yearly with an Account credit applied row and Due today of $262.93](/images/selling/checkout/checkout-upgrade-credit.webp)

**Payment details (right)** shows the gateway's payment form under **Payment method**. If the plan accepts both Stripe and PayPal, visitors can switch between them here.

The submit button changes with what the visitor is buying:

| Button | When |
|---|---|
| **Pay** | Something is due today. |
| **Start Free Trial** | A recurring plan with a free trial and no setup fee. |
| **Confirm Upgrade** | An upgrade that existing account credit pays for in full. |

> [!Note]
> While a gateway is in test or sandbox mode, administrators see a **Test Mode** or **Sandbox Mode** notice above the payment form, such as "Stripe is in test mode, so no real payment will be taken." Members and visitors do not see it. A developer can change who sees it with the `fluent_members/checkout_show_test_mode_notice` filter.

![Screenshot of the checkout page for a logged-in administrator with the Test Mode notice above the payment form](/images/selling/checkout/checkout-logged-in-test-mode.webp)

## Guest checkout experience

Guest checkout is on by default and has no setting. A logged-out visitor sees **Your Details** with **Name** and **Email**, and the message "We'll create your account and email you a link to set your password."

- **New email:** After payment, Fluent Members creates a WordPress account with the Subscriber role, logs the buyer in, and emails them a link to set a password.
- **Email with an account:** The visitor sees "An account already exists for this email address. Please sign in to continue." and must log in to finish the purchase.
- **Logged-in members:** They skip **Your Details** and pay with their own account.

> [!Note]
> To sell only to logged-in visitors, turn guest checkout off with the `fluent_members/guest_checkout_enabled` filter. Visitors then see **Login to Purchase** on the pricing page and **Sign In to Continue** at checkout.

## After payment is complete

**Success:** When the payment is confirmed, the member sees a **Congratulations!** page that says "You're now a [plan] member". It shows these details:

- **Membership Level**
- **Started**
- **Provider**
- **Subscription Amount** for a recurring plan, or **Payment Amount** for a one-time plan
- **Payment Method**, such as Card **** 4242
- **Next Billing Date**, or **Trial Ends** while a free trial runs

A **Go to Portal** button opens the [Member Portal](/docs/members/portal/setup).

![Screenshot of the Congratulations! page after checkout with the membership details and the Go to Portal button](/images/selling/checkout/checkout-success.webp)

**Pending:** If the gateway has not confirmed the payment yet, the member sees **We're confirming your checkout** and the message "This usually takes a moment. Your membership will appear in your portal as soon as it is confirmed." The membership shows in the portal as soon as it clears.

![Screenshot of the We're confirming your checkout page with the Go to Portal button](/images/selling/checkout/checkout-processing.webp)

## Troubleshooting unavailable checkouts

If the button reads **Checkout Unavailable**, confirm that:

- Fluent Members Pro is active.
- Your payment gateway is fully set up and not marked **Disabled** in [Payment Settings](/docs/settings/payment-settings/).

If a direct link shows a short message instead of the checkout page, use this table:

| Message | Fix |
|---|---|
| Selected pricing plan could not be found. | Make sure both the level and the plan are active. |
| Selected payment method could not be found for this pricing plan. | Connect a gateway the plan accepts. Check the plan's **Payment Methods** on the level's **Pricing** tab. |
| Checkout session could not be found. | Copy the link again with **Copy Checkout Link**. |

## Paywall plans (external checkout)

If a plan uses a paywall instead of native payment, **Choose plan** sends the visitor to that plugin's own checkout. This covers FluentCart, WooCommerce, Fluent Forms and Paymattic. The plugin takes the payment, and Fluent Members grants the membership when the order completes.

FluentCart, Fluent Forms and Paymattic also support guest purchases. Fluent Members creates the WordPress user from the order's billing email once the order is paid. See each plugin's page under [Connect other plugins](/docs/integrations/).
