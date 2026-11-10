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
| **Access** | Ends immediately | Ends immediately, or at the end of the billing period for a subscription |
| **Billing** | Continues | Depends on the membership, as shown below |
| **Undo** | **Reactivate** | Add a new membership |

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
| Stripe or PayPal subscription through Fluent Members (Pro) | **Cancel Subscription** | The **Cancel Subscription** dialog offers **End of Billing Period** or **Cancel Immediately**. The plain **Cancel** action is not offered. |
| Migrated subscription still billed by PayPal (Pro) | **Cancel** | A confirmation warns that PayPal keeps charging until the subscription is cancelled in PayPal, by the member or from your PayPal business account. |
| Everything else, such as a manual membership, a lifetime membership, a team seat, or a FluentCart, WooCommerce, Fluent Forms, or Paymattic membership | **Cancel** | A confirmation asks you to click **Yes, Cancel**. Access ends immediately. |

![Screenshot of the Cancel Membership confirmation with No and Yes, Cancel](/images/members/suspending-and-cancelling/suspending-and-cancelling-cancel-confirm.webp)

> [!Note]
> **Cancel** on a FluentCart, WooCommerce, Fluent Forms, or Paymattic membership changes the membership in Fluent Members only. If the member has a subscription in that plugin, stop it there as well.

### Cancel a subscription (Pro)

The **Cancel Subscription** dialog asks for a **Cancellation Mode**. **End of Billing Period** stops future renewals and keeps access until the current billing period ends, so the status stays as it is until then. **Cancel Immediately** cancels the subscription now and ends access. See [Subscription Cancellation Modes](/docs/billing/cancelling-a-subscription) for more detail.

## After a cancellation

A cancelled membership cannot be reactivated. Its row stays on Member Details as a record. To give access again, [add a membership manually](/docs/members/adding-manually), or have the member buy again from your pricing page. Either way creates a new row.

## Corporate memberships

Actions on a team owner's membership (Pro) carry down to the seats:

- **Suspend the owner:** Active and Trial seats become Suspended.
- **Reactivate the owner:** Suspended seats return, up to the seats free on the level, oldest first.
- **Cancel the owner:** Live seats become Cancelled.

See [Corporate Members](/docs/members/corporate-members) for the full rules, including what happens to a seat you act on separately.
