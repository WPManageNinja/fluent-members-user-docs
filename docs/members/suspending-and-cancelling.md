---
title: Suspending & Cancelling
description: Pause a member's access with Suspend, restore it with Reactivate, or end a membership with Cancel, and see how each affects billing.
---

# Suspending & Cancelling

**Suspend** pauses a member's access and can be undone. **Cancel** ends the membership. Suspend when you expect to restore access, such as during a payment dispute. Cancel when the member is leaving.

Both start from the row menu on [Member Details](/docs/members/detail): go to **Fluent Members → Members**, click the member's row, then click the three-dot icon on the membership.

## Suspend vs cancel

| | Suspend | Cancel |
|---|---------|--------|
| **Access** | Ends immediately | Ends immediately, or at the end date or billing period when you choose that |
| **Billing** | Continues | Depends on the membership, as shown below |
| **Undo** | **Reactivate** | **Undo Cancellation** while a cancel is scheduled, otherwise add a new membership |

## Suspend a membership

1. Open the row menu on an Active or Trial membership and click **Suspend**. Memberships with a subscription show **Suspend Access** instead.
2. Click **Yes, Suspend** or **Yes, Suspend Access** to confirm. **No** closes the box.

The status changes to **Suspended** and the member loses access right away.

> [!Note]
> Suspending does not stop billing. A subscription keeps charging until it is cancelled.

Fluent Members also suspends a membership by itself (Pro) when its subscription becomes past due, unpaid, incomplete, failed, or paused.

## Reactivate a membership

1. Open the row menu on the suspended membership and click **Reactivate** or **Reactivate Access**.
2. Click **Yes, Reactivate** or **Yes, Reactivate Access** to confirm.

The membership returns to the status it had before, Active or Trial. Reactivate fails with a message if the member already holds a live membership on the same level. If the membership's term has already ended, the item is greyed out as **Reactivate: term ended** with the date, so use **Add membership again** instead.

## Cancel a membership

What you see after clicking the action depends on the membership:

| Membership | Action | What happens |
|------------|--------|--------------|
| Stripe or PayPal subscription through Fluent Members (Pro) | **Cancel Subscription** | The dialog offers **End of Billing Period** or **Cancel Immediately**. The plain **Cancel** action is not offered. |
| FluentCart or WooCommerce subscription that is still live (Pro) | **Cancel** or **Cancel Subscription** in **Store billing** | The **Cancel Membership** dialog cancels the store subscription. **Keep Until Expiry** stops payments and keeps access until the date. **Cancel Immediately** ends access now. Nothing is refunded. |
| Manual membership, or one migrated from Paid Memberships Pro, MemberPress or Kadence Memberships, with an end date in the future and no live subscription | **Cancel** | The **Cancel Membership** dialog offers **Keep Until Expiry** or **Cancel Immediately**. |
| Migrated subscription still billed by PayPal (Pro) | **Cancel** | A confirmation warns that PayPal keeps charging until the subscription is cancelled in PayPal, by the member or from your PayPal business account. |
| Everything else, such as a lifetime membership, a team seat, or a Fluent Forms or Paymattic membership | **Cancel** | A confirmation asks you to click **Yes, Cancel**. Access ends immediately. |

<!-- TODO(screenshot): suspending-and-cancelling-1
  screen: Members → a member → Cancel on a hand-added membership
  state: Cancel Membership dialog with Keep Until Expiry selected
  data: a manual membership with an expiry date in the future
  highlight: Keep Until Expiry and Cancel Immediately cards
  view: admin
  alt: Screenshot of the Cancel Membership dialog with Keep Until Expiry selected and Cancel Immediately beside it
-->

### Keep access until the end date

For a hand-added or migrated membership, **Keep Until Expiry** (default) keeps access until the end date, then ends the membership. You can undo it until then. While it is scheduled:

- The **Expires** column shows **Scheduled to end** under the date.
- The row menu holds **Undo Cancellation**, which puts the membership back as it was.
- **Cancel** now asks "This membership is already scheduled to end on" the date, and cancelling revokes access immediately.

### Cancel a subscription (Pro)

The **Cancel Subscription** dialog asks for a **Cancellation Mode**. **End of Billing Period** stops future renewals and keeps access until the current billing period ends. **Cancel Immediately** cancels the subscription now and ends access. When Fluent Members cannot confirm the cancel at the gateway, it asks you to confirm a local-only cancel and adds a follow-up notice. See [Cancel a Subscription](/docs/billing/cancelling-a-subscription) and [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

> [!Note]
> **Cancel** on a Fluent Forms or Paymattic membership changes the membership in Fluent Members only. If the member has a subscription in that plugin, stop it there as well.

## After a cancellation

A cancelled membership cannot be reactivated. Its row stays on Member Details as a record. To give access again, use **Add membership again** from the row menu, [add a membership manually](/docs/members/adding-manually), or have the member buy again from your pricing page. Each creates a new row.

## Corporate memberships

Actions on a team owner's membership (Pro) carry down to the seats:

- **Suspend the owner:** Active and Trial seats become Suspended.
- **Reactivate the owner:** Suspended seats return, up to the seats free on the level, oldest first.
- **Cancel the owner:** Live seats become Cancelled.

See [Corporate Members](/docs/members/corporate-members) for the full rules, including what happens to a seat you act on separately.
