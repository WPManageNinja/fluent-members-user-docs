---
title: "Update Payment Method (Pro)"
description: "How members replace the card on a Stripe subscription from the Member Portal."
---

# Update Payment Method (Pro)

**Update Payment Method** (Pro) replaces the card on a Stripe subscription from the **Member Portal**. Members use it when a card is about to expire or a payment has failed. No card details pass through your site's forms, because the fields come from Stripe.

## When members can use it

**Update Payment Method** appears in the **More Actions** menu when all of these are true:

- [Stripe is connected](/docs/settings/payment-settings/stripe-setup) on your site.
- The membership has a subscription billed through Fluent Members Stripe.
- The subscription is active, trialing, past due, unpaid or paused.
- The subscription isn't scheduled to cancel.

PayPal subscriptions don't have this action. Memberships sold through FluentCart, WooCommerce, Fluent Forms or Paymattic are also excluded, because those plugins hold the payment details.

A member whose membership was suspended after a failed payment can still use it, as long as the subscription meets these rules.

When a payment has failed, the details page also tells the member to act. A past due or unpaid subscription shows **Your last payment did not go through. Update your payment method to restore access.** A paused subscription shows **Your subscription is paused. Update your payment method to resume it.**

## Update the card

1. Open the Member Portal and click **Manage** on the membership.
2. Click **More Actions**, then **Update Payment Method**.

    ![Screenshot of the More Actions menu open with Cancel Subscription, Upgrade Plan and an arrow pointing to Update Payment Method](/images/members/portal/updating-payment-method/updating-payment-method-menu.webp)

3. Enter the new card details in the **Update Payment Method** dialog.

    <!-- TODO(screenshot): updating-payment-method-2
      screen: Member Portal, Update Payment Method dialog
      state: Stripe payment form loaded, Go Back and Update Card buttons visible
      data: a membership with a real Stripe subscription, Stripe test keys
      highlight: -
      view: frontend
      alt: Screenshot of the Update Payment Method dialog with the Stripe card form and the Update Card button
      reason: needs a real Stripe customer; opening the dialog sends a request to Stripe
    -->

4. Click **Update Card**. If the bank asks for authentication, the member completes it to finish.

**Go Back** closes the dialog without changing anything.

## What happens next

The dialog closes and the details page reloads. **Payment Method** shows the new card's last 4 digits, and **Payment Method Update** shows the date.

If the subscription had an unpaid invoice, Fluent Members also tries to collect it on the new card, so the member doesn't need to do anything else. When that works, **Billing Status** and the membership status update on the reloaded page. If the charge fails, the error shows in the dialog and the member can try again.

## Limits

Each customer gets 5 update attempts per hour by default. A developer can change this with the `fluent_members/stripe/setup_intent_rate_limit_max_attempts` and `fluent_members/stripe/setup_intent_rate_limit_ttl` filters. After the limit, the member sees **Too many payment method update attempts. Please try again later.**

> [!Note]
> Only the member can do this. There is no admin screen for entering a card on a member's behalf.
