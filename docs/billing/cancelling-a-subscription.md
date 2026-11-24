---
title: "Cancel a Subscription (Pro)"
description: "Cancel a Stripe or PayPal subscription at the end of the billing period or immediately, confirm a cancel that stays local, and see which subscriptions cannot be cancelled here."
---

# Cancel a Subscription (Pro)

**Cancel Subscription** (Pro) stops a member's Stripe or PayPal billing from your site. You choose each time whether the member keeps access until the paid period ends or loses it right away. There is no site-wide setting for this.

## Cancel a subscription

1. Go to **Fluent Members → Billing → Subscriptions**.
2. Click the three-dot menu on the row and choose **Cancel Subscription**. You can also open the subscription and click **More actions → Cancel Subscription**, or use the three-dot menu on the [member's page](/docs/members/detail).
3. Under **Cancellation Mode**, choose **End of Billing Period** or **Cancel Immediately**.
4. Click the button at the bottom right. It repeats the mode you chose. **Go Back** closes the dialog without changing anything.

![Screenshot of the Cancel Subscription dialog with End of Billing Period and Cancel Immediately](/images/billing/cancelling-a-subscription/cancelling-a-subscription-1.webp)

## Choose a mode

| | **End of Billing Period** (default) | **Cancel Immediately** |
|---|---|---|
| Future renewals | Stopped | Stopped |
| Access | Kept until the current billing period ends | Revoked now |
| Subscription status | Stays as it is until the period ends | **Cancelled** now |
| Next Billing | Stays until the period ends | Cleared |

Neither mode refunds anything. To return money, issue a [refund](/docs/billing/refunds). A full refund of any one payment, even a single renewal, also cancels the subscription immediately.

## How each gateway handles it

- **Stripe:** Stripe keeps the subscription until the period ends, then tells Fluent Members it has ended. A **Paused** Stripe subscription always cancels immediately, even if you choose **End of Billing Period**.
- **PayPal:** PayPal has no cancel-at-period-end option, so Fluent Members cancels at PayPal right away and keeps the member's access until the next billing date. With no next billing date, it cancels immediately.

## While a cancellation is scheduled

After you choose **End of Billing Period**, the subscription page shows "This subscription is scheduled for cancellation at the end of the current billing period." In the **Subscriptions** list, the **Status** column reads **Cancels** with the end date and **Next Billing** shows `--`. The status changes when the period ends. To end access sooner, cancel again and choose **Cancel Immediately**.

## When no gateway subscription is linked

Some records have no Stripe or PayPal subscription ID, for example a placeholder created before the gateway confirmed the subscription. The dialog then opens with a note:

- **Stripe:** "No payment gateway subscription is linked to this record. FluentMembers checks Stripe for a matching one before cancelling."
- **PayPal:** "No PayPal subscription is linked to this record. FluentMembers cannot look up PayPal subscriptions, so it asks you to confirm before cancelling."

If Stripe has exactly one matching subscription, Fluent Members links it and cancels it as normal. Otherwise the dialog stops and asks you to confirm a local-only cancel, as described next.

## Confirm a cancel that stays local

When Fluent Members cannot cancel at the gateway, the dialog shows a warning instead of cancelling:

- **An active subscription was found in the payment gateway.** Stripe has one or more active subscriptions for this customer that cannot be matched safely to this record. The warning lists their IDs.
- **The payment gateway could not be checked.** Stripe could not be reached, or the record is a PayPal one that cannot be looked up.

To go ahead, tick **I understand this cancels the subscription in FluentMembers only.** and click **Cancel in FluentMembers Only**. The membership and subscription end here, the gateway is not changed, and a notice is added to the member's page so you can finish the job. See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

If you would rather fix it first, click **Go Back**, cancel the right subscription in Stripe or PayPal, then cancel the record here.

## When members cancel

Members can cancel their own subscription from the [member portal](/docs/members/portal/cancelling), with the same two modes. After **End of Billing Period**, the portal shows **Scheduled for Cancellation** with a **Cancellation Date**.

The **Subscription Cancelled** [email notification](/docs/settings/email-configuration/email-notifications) is on by default, so the member gets an email when a subscription is cancelled.

## Subscriptions you cannot cancel here

**Cancel Subscription** only appears on subscriptions that are **Active**, **Trial**, **Payment failed** or **Paused** and billed through Stripe or PayPal. These cannot be cancelled here:

- **PayPal subscriptions imported from another plugin:** they stay billed through your PayPal account. Cancel in your PayPal business account, or ask the member to cancel in theirs. Cancelling the membership from the member's page ends it in Fluent Members, but PayPal keeps charging until the subscription is cancelled there.
- **[Subscriptions from other plugins](/docs/billing/provider-subscriptions):** cancel them in the plugin that bills them, or from the member's page for FluentCart and WooCommerce.

To cancel a membership with no subscription behind it, see [Suspending & Cancelling](/docs/members/suspending-and-cancelling).
