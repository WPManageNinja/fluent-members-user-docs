---
title: "Checkout and Guest Checkout"
description: "What members and guests see at checkout and when they join a free level, how accounts are created, and what happens after payment."
---

# Checkout and Guest Checkout

**Checkout** is the page where a visitor pays for a plan. Native payment plans (Pro) use the checkout built into Fluent Members, and visitors do not need an account first. Free levels use a short join page instead, and plans sold through FluentCart, WooCommerce, Fluent Forms or Paymattic use that plugin's own checkout.

**Requirements**

- A [native payment](/docs/levels/pricing-native) plan on an active level.
- A gateway set up in [Payment Settings](/docs/settings/payment-settings/).

Visitors reach checkout from a **Choose plan** button on your [pricing page](/docs/selling/pricing-page), or from a checkout link. To get a link for a plan, open its row menu on the level's **Pricing** tab and click **Copy Checkout Link**. Use the copied link as it is, because it carries a security token. A link without it shows "Checkout session could not be found."

## Choose the checkout page

Checkout, payment confirmation and free sign-up open on a page of your site, inside your theme. Without one, they open on a standalone page.

1. Go to **Fluent Members → Settings → General Settings** and find **Checkout Page**.
2. Select a page, or click the **+** button to create one. The page must hold the `[fluent_members_checkout]` shortcode.
3. Click **Save Settings**.

![Screenshot of the Checkout Page setting in General Settings](/images/selling/checkout/checkout-1.webp)

## The checkout interface

The page is split into two sections. A **Back to plans** link returns the visitor to the plans.

**Order summary (left)** shows the plan name, its billing interval and the **Due today** amount. A line under **Checkout** says what the visitor will be charged, such as "You'll be charged $29.00", or **No charge today**. It adds rows when they apply:

- **Free Trial: N days**, with what is charged after the trial.
- **Setup Fee**.
- **Account credit applied**, on an upgrade, with a line such as "$27.07 account credit applied, then $290.00 per year until cancel". A free trial does not apply to upgrades, and the summary says so.

**Payment details (right)** shows the gateway's payment form under **Payment method**. If the plan accepts both Stripe and PayPal, visitors can switch between them here.

![Screenshot of the checkout page with the plan, setup fee, Due today total and the Stripe payment method](/images/selling/checkout/checkout-2.webp)

The submit button changes with what the visitor is buying:

| Button | When |
|---|---|
| **Pay** | Something is due today. |
| **Start Free Trial** | A recurring plan with a free trial and no setup fee. |
| **Confirm Upgrade** | An upgrade that existing account credit pays for in full. |

If a card payment fails, Stripe shows the error above the form. The error clears as soon as the buyer edits their payment details, so an old "card declined" message does not stay on screen.

> [!Note]
> While a gateway is in test or sandbox mode, administrators see a **Test Mode** or **Sandbox Mode** notice above the payment form, such as "Stripe is in test mode, so no real payment will be taken." Members and visitors do not see it. See [test and live mode](/docs/getting-started/test-and-live-mode).

## Guest checkout experience

Guest checkout is on by default and has no setting. A logged-out visitor sees **Your Details** with **Name** and **Email**, and the message "We'll create your account and email you a link to set your password."

- **New email:** After payment, Fluent Members creates a WordPress account with the Subscriber role and emails the buyer a link to set a password.
- **Email with an account:** The visitor is told "An account already exists for this email address. Please log in to continue." and must log in to finish the purchase.
- **Logged-in members:** They skip **Your Details** and pay with their own account.

> [!Note]
> To sell only to logged-in visitors, turn guest checkout off with the `fluent_members/guest_checkout_enabled` filter. Visitors then see **Log In to Purchase** on the pricing page and **Log In to Continue** at checkout.

## Joining a free level

A free plan skips payment. On the pricing page its button reads **Join for free**, or **Log In to Join** when guests cannot join. It opens a **Join** page marked **Free membership**, with **No payment needed**.

- **Logged-out visitors:** They enter a **Name** and **Email**, and Fluent Members creates their account and emails a link to set a password.
- **Logged-in members:** They see **Your Account**, with a **Log Out** link if it is the wrong account, and one button to join.
- **Already a member:** The page says "You already have this membership." with a **Go to Portal** button. A suspended member is told to contact the site administrator.

A free level can be joined only once per account. When the visitor joins, a **Welcome!** page says "You've joined" followed by the level name, with **Membership Level**, **Started** and **Access Until** (or **No expiry**) and a **Go to Portal** button. See [free levels](/docs/levels/free-levels) for how to set one up.

![Screenshot of the free membership join page](/images/selling/checkout/checkout-3.webp)

## After payment is complete

**Success:** When the payment is confirmed, the member sees a **Congratulations!** page that says "You've joined" followed by the plan name. It shows these details:

- **Membership Level**
- **Started**
- **Provider**
- **Subscription Amount** for a recurring plan, or **Payment Amount** for a one-time plan
- **Payment Method**, such as Card **** 4242
- **Next Billing Date**, or **Trial Ends** while a free trial runs

A **Go to Portal** button opens the [Member Portal](/docs/members/portal/setup). Rows with nothing to show are left out.

<!-- TODO(screenshot): checkout-4
  screen: the checkout confirmation page on the frontend
  state: Congratulations page after a paid monthly plan
  data: a test payment for DOCTEST Plus
  highlight: You've joined
  view: frontend
  alt: Screenshot of the checkout confirmation page with the membership details
-->

**Pending:** If the gateway has not confirmed the payment yet, the member sees **We're confirming your checkout** and the message "This usually takes a moment. Your membership will appear in your portal as soon as it is confirmed." The page updates by itself, and **Check again** tries once more. If the membership does not appear within a few minutes, the page tells the member to contact the site owner.

**Not completed:** If the payment failed or was refunded, the page says so ("This payment did not go through, so no membership was added.") and invites the member to choose a plan and try again.

## When checkout is unavailable

A visitor who cannot buy a plan sees a short page instead of the payment form:

- **Already owns the level for life:** "You already have this membership, so there is nothing to buy again." with a **Go to Portal** button.
- **The plan cannot be sold:** Visitors see "This plan cannot be purchased right now. Please contact the site owner." Administrators see the real reason with a link to fix it, such as **Open payment settings**, **Open Plugins** or **Get FluentMembers Pro**.

The reasons administrators can see include "No active payment method is set up for this plan." and "This plan's payment methods need FluentMembers Pro, which is not active." Fix them in [Payment Settings](/docs/settings/payment-settings/) or activate Pro.

If a direct link shows a short message instead of the checkout page, use this table:

| Message | Fix |
|---|---|
| Selected pricing plan could not be found. | Make sure both the level and the plan are active. |
| Selected payment method could not be found for this pricing plan. | Connect a gateway the plan accepts. Check the plan's **Payment Methods** on the level's **Pricing** tab. |
| Checkout session could not be found. | Copy the link again with **Copy Checkout Link**. |
| Checkout confirmation could not be found. | Open the confirmation link from the original checkout again. |

## Plans sold through another plugin

If a plan is sold through FluentCart, WooCommerce, Fluent Forms or Paymattic, **Choose plan** sends the visitor to that plugin's own checkout. The plugin takes the payment, and Fluent Members grants the membership when the order completes.

FluentCart, Fluent Forms and Paymattic also support guest purchases, and WooCommerce does when your shop allows guest checkout. Fluent Members creates the WordPress user from the order's billing email once the order is paid. See each plugin's page under [Integrations](/docs/integrations/).
