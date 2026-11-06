---
title: "Cancel a Subscription (Pro)"
description: "Cancel a Stripe or PayPal subscription at the end of the billing period or immediately, and see which subscriptions cannot be cancelled here."
---

# Cancel a Subscription (Pro)

**Cancel Subscription** (Pro) stops a member's Stripe or PayPal billing from your site. You choose each time whether the member keeps access until the paid period ends or loses it right away. There is no site-wide setting for this.

## Cancel a subscription

1. Go to **Fluent Members → Billing → Subscriptions**.
2. Click the three-dot menu on the row and choose **Cancel Subscription**. You can also open the subscription and click **More Actions → Cancel Subscription**, or use the three-dot menu on the [member's page](/docs/members/detail).

    ![Screenshot of the three-dot menu on a Subscriptions row with View and Cancel Subscription](/images/billing/cancelling-a-subscription/cancelling-a-subscription-row-menu.webp)

3. Under **Cancellation Mode**, choose **End of Billing Period** or **Cancel Immediately**.

    ![Screenshot of the Cancel Subscription dialog with End of Billing Period selected](/images/billing/cancelling-a-subscription/cancelling-a-subscription-dialog.webp)

4. Click the button at the bottom right. It repeats the mode you chose.

**Cancel** at the bottom left closes the dialog without changing anything.

## Choose a mode

The two modes differ in when access ends:

| | **End of Billing Period** (default) | **Cancel Immediately** |
|---|---|---|
| Future renewals | Stopped | Stopped |
| Access | Kept until the current billing period ends | Revoked now |
| Subscription status | Stays as it is until the period ends | **Canceled** now |
| Next Billing | Stays until the period ends | Cleared |

Neither mode refunds anything. To return money, issue a [refund](/docs/billing/refunds). A full refund of any one payment, even a single renewal, also cancels the subscription immediately. To return money and keep the subscription running, refund a lower amount.

## How each gateway handles it

**End of Billing Period** works differently behind the scenes:

- **Stripe:** Stripe keeps the subscription until the period ends, then tells Fluent Members it has ended. A **Paused** Stripe subscription always cancels immediately, even if you choose **End of Billing Period**.
- **PayPal:** PayPal has no cancel-at-period-end option, so Fluent Members cancels at PayPal right away and keeps the member's access until the next billing date. If there is no next billing date, it cancels immediately.

## While a cancellation is scheduled

After you choose **End of Billing Period**, the subscription page shows this notice:

> This subscription is scheduled for cancellation at the end of the current billing period.

<!-- TODO(screenshot): cancelling-a-subscription-1
  screen: Billing → Subscriptions → a Stripe subscription
  state: subscription page with the scheduled cancellation notice at the top
  data: a Stripe subscription cancelled with End of Billing Period
  highlight: -
  view: admin
  alt: Screenshot of a subscription page with the scheduled cancellation notice
  reason: needs a live Stripe subscription; the local site's sample subscriptions have no gateway connection
-->

The status stays the same until the period ends. To end access sooner, cancel again and choose **Cancel Immediately**.

## When members cancel

Members can cancel their own subscription from the [member portal](/docs/members/portal/cancelling), with the same two modes. After choosing **End of Billing Period**, the portal shows **Scheduled for Cancellation** with a **Cancellation Date**.

<!-- TODO(screenshot): cancelling-a-subscription-2
  screen: Member portal → membership → Cancel Subscription
  state: cancel dialog open with both modes
  data: a member with a Stripe subscription
  highlight: -
  view: frontend
  alt: Screenshot of the member portal cancel dialog with End of Billing Period and Cancel Immediately
  reason: needs the develop build on the local site and a member with a Stripe or PayPal subscription
-->

If you have turned on the **Subscription Cancelled** [email notification](/docs/settings/email-configuration/email-notifications), the member gets an email when a subscription is cancelled.

## Subscriptions you cannot cancel here

**Cancel Subscription** only appears on subscriptions that are **Active**, **Trialing**, **Past Due**, **Unpaid** or **Paused** and billed through Stripe or PayPal. These cannot be cancelled here:

- **PayPal subscriptions imported from another plugin:** they stay billed through your PayPal account. Cancel in your PayPal business account, or ask the member to cancel in theirs. Cancelling the membership from the member's page ends it in Fluent Members, but PayPal keeps charging until the subscription is cancelled there.
- **Imported subscriptions with no Stripe or PayPal connection:** there is nothing here to cancel at a gateway. Imported subscriptions that do bill through Stripe can be cancelled as normal.
- **[Subscriptions from other plugins](/docs/billing/provider-subscriptions):** cancel them in the plugin that bills them.

To cancel a membership with no subscription behind it, see [Suspending & Cancelling](/docs/members/suspending-and-cancelling).
