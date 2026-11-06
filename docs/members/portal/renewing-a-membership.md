---
title: "Renew a Membership (Pro)"
description: "How members restart a subscription from the Member Portal with the Renew Membership button."
---

# Renew a Membership (Pro)

**Renew Membership** (Pro) lets a member keep a subscription they scheduled to cancel, or restart one that has expired. It's on the **Membership Details** page in the **Member Portal**, for subscriptions billed through Fluent Members Stripe or PayPal.

## When the button appears

Members see **Renew Membership** beside **More Action** in either of these cases:

- **Scheduled to cancel:** The member chose **End of Billing Period** when [cancelling](/docs/members/portal/cancelling), and the subscription hasn't ended yet.
- **Expired:** The subscription has expired, and its pricing plan is still active on the level.

The payment gateway must also be active and configured on your site. If the plan was removed or turned off, an expired subscription shows no button, and the member has to buy again from your pricing page.

Memberships sold through FluentCart, WooCommerce, Fluent Forms or Paymattic don't have this button.

## Renew the membership

1. Open the Member Portal and click **Manage** on the membership.
2. Click **Renew Membership**.

    <!-- TODO(screenshot): renewing-a-membership-1
      screen: Member Portal, Membership Details page
      state: Renew Membership button beside More Action, Billing Status Scheduled for Cancellation
      data: a membership with a real Stripe subscription scheduled to cancel
      highlight: Renew Membership button
      view: frontend
      alt: Screenshot of the Membership Details page with an arrow on the Renew Membership button
      reason: needs a live Stripe subscription; the test subscription returns no billing data
    -->

There is no confirmation dialog. The click starts the renewal straight away, and what follows depends on the case:

| Case | What happens |
|---|---|
| Stripe, scheduled to cancel | The cancellation is removed and the subscription carries on. The page reloads with **Next Billing Date** back in place. |
| PayPal, scheduled to cancel | The member goes to checkout to subscribe again through PayPal. |
| Expired, Stripe or PayPal | The member goes to checkout to pay for the same plan. |

If the renewal fails, the error shows at the top of the page.

## Failed payments

A failed renewal doesn't show **Renew Membership** on its own. Fluent Members suspends the membership, and the details page shows **Your last payment did not go through. Update your payment method to restore access.** The fix is to [update the payment method](/docs/members/portal/updating-payment-method), which also tries to collect the unpaid invoice.
