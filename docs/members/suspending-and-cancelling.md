---
title: Suspending & Cancelling
description: Pause a member's access with Suspend, restore it with Reactivate, or end a membership with Cancel, and see how each affects billing.
---

# Suspending & Cancelling

**Suspend** pauses a member's access and can be undone. **Cancel** ends the membership. Suspend when you expect to restore access, such as during a payment dispute. Cancel when the member is leaving.

Both start from the row menu on [Member Details](/docs/members/detail): go to **Fluent Members → Members**, click the member's row, then click the three-dot icon on the membership.

![Screenshot of a membership row menu with Refund, Suspend, and Cancel](/images/members/suspending-and-cancelling/suspending-and-cancelling-row-menu.webp)

## Suspend vs cancel

| | Suspend | Cancel |
|---|---------|--------|
| **Access** | Ends immediately | Ends immediately or at the expiry date, depending on the membership |
| **Billing** | Continues | Depends on the membership, as shown below |
| **Undo** | **Reactivate** | Add a new membership, unless the cancellation is only scheduled |

## Suspend a membership

1. Open the row menu on an Active or Trial membership and click **Suspend**. Memberships with a subscription show **Suspend Access** instead.
2. Click **Yes, Suspend** or **Yes, Suspend Access** to confirm.

    ![Screenshot of the suspend confirmation with No and Yes, Suspend](/images/members/suspending-and-cancelling/suspending-and-cancelling-suspend-confirm.webp)

The status changes to **Suspended** and the member loses access right away.

> [!Note]
> Suspending does not stop billing. A subscription keeps charging until it is cancelled.

Fluent Members also suspends a membership by itself (Pro) when its subscription becomes past due, unpaid, incomplete, failed, or paused.

## Reactivate a membership

1. Open the row menu on the suspended membership and click **Reactivate** or **Reactivate Access**.
2. Click **Yes, Reactivate** or **Yes, Reactivate Access** to confirm.

    ![Screenshot of a suspended membership with Reactivate in the row menu](/images/members/suspending-and-cancelling/suspending-and-cancelling-reactivate.webp)

The membership returns to the status it had before, Active or Trial. Reactivate fails with a message if the member already holds a live membership on the same level.

## Cancel a membership

What you see after clicking the action depends on the membership:

| Membership | Action | What happens |
|------------|--------|--------------|
| Manual or migrated, Active or Trial, with a future expiry date and no live subscription | **Cancel** | The **Cancel Membership** dialog offers **Keep Until Expiry** or **Cancel Immediately**. |
| Stripe or PayPal subscription through Fluent Members (Pro) | **Cancel Subscription** | The **Cancel Subscription** dialog offers **End of Billing Period** or **Cancel Immediately**. The plain **Cancel** action is not offered. |
| Migrated subscription still billed by PayPal (Pro) | **Cancel** | A confirmation warns that PayPal keeps charging until the subscription is cancelled in PayPal, by the member or from your PayPal business account. |
| Everything else, such as a lifetime membership, a team seat, or a FluentCart, WooCommerce, Fluent Forms, or Paymattic membership | **Cancel** | A confirmation asks you to click **Yes, Cancel**. Access ends immediately. |

![Screenshot of the Cancel Membership confirmation with No and Yes, Cancel](/images/members/suspending-and-cancelling/suspending-and-cancelling-cancel-confirm.webp)

> [!Note]
> **Cancel** on a FluentCart, WooCommerce, Fluent Forms, or Paymattic membership changes the membership in Fluent Members only. If the member has a subscription in that plugin, stop it there as well.

### Keep Until Expiry

**Keep Until Expiry** is selected by default in the **Cancel Membership** dialog. The member keeps access until the date shown, and the status stays as it is. **Scheduled to end** appears under the date in the **Expires** column. Once the date passes, the status changes to **Expired**.

<!-- TODO(screenshot): suspending-and-cancelling-1
  screen: Fluent Members → Members → a member → row menu → Cancel
  state: Cancel Membership dialog open, Keep Until Expiry selected, not submitted
  data: Sample member with a manual subscription-plan membership and a future expiry date
  highlight: -
  view: admin
  alt: Screenshot of the Cancel Membership dialog with Keep Until Expiry and Cancel Immediately
  reason: needs the develop build on the local site
-->

To take it back, open the row menu and click **Undo Cancellation**. To end access sooner, click **Cancel** and confirm.

**Cancel Immediately** sets the status to **Cancelled** and ends access now.

### Cancel a subscription (Pro)

**End of Billing Period** is selected by default in the **Cancel Subscription** dialog. It stops future renewals and keeps access until the current period ends, so the status stays as it is until then. **Cancel Immediately** cancels the subscription now and ends access. See [Subscription Cancellation Modes](/docs/billing/cancelling-a-subscription) for more detail.

<!-- TODO(screenshot): suspending-and-cancelling-2
  screen: Fluent Members → Members → a member → row menu → Cancel Subscription
  state: Cancel Subscription dialog open, End of Billing Period selected, not submitted
  data: Sample member with a live Stripe subscription
  highlight: -
  view: admin
  alt: Screenshot of the Cancel Subscription dialog with End of Billing Period and Cancel Immediately
  reason: needs a gateway-linked subscription, the local sample subscriptions do not show this action
-->

## After a cancellation

A cancelled membership cannot be reactivated. Its row stays on Member Details as a record. To give access again, [add a membership manually](/docs/members/adding-manually), or have the member buy again from your pricing page. Either way creates a new row.

## Corporate memberships

Actions on a team owner's membership (Pro) carry down to the seats:

- **Suspend the owner:** Active and Trial seats become Suspended.
- **Reactivate the owner:** Suspended seats return, up to the seats free on the level, oldest first.
- **Cancel the owner:** Live seats become Cancelled.

See [Corporate Members](/docs/members/corporate-members) for the full rules, including what happens to a seat you act on separately.
