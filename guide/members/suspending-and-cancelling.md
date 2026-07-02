# Suspending & Cancelling

Fluent Members gives you two ways to remove a member's access from the admin: **Suspend** and **Cancel**. Both revoke access immediately, but they behave differently when it comes to billing and whether the action can be reversed.

## Suspend vs Cancel at a Glance

| | Suspend | Cancel |
|---|---|---|
| **Access revoked?** | Yes, immediately | Yes, immediately |
| **Billing stops?** | No — recurring charges continue | Yes — the plugin notifies the payment provider to stop |
| **Reversible?** | Yes — change the status back to Active | No — you would need to grant a new membership |
| **Best used for** | Temporary holds, policy violations, payment disputes | Member requested cancellation, post-refund cleanup, irrecoverable failed payments |

## How to Suspend a Membership

1. Go to **Fluent Members → Members** and click the member's row to open their [Member Detail](/guide/members/detail) page.
2. On the membership row, click the action menu and select **Suspend**.
3. The row status changes to `Suspended` and access is revoked immediately.

To restore access, return to the same row and change the status back to **Active**. There is no dedicated "Unsuspend" button — updating the status field directly is how you reverse a suspension.

::: warning Suspend does not stop billing
If the membership is tied to a Stripe or FluentCart subscription, recurring charges will continue even after suspending. To stop billing as well, either cancel the subscription at the payment provider directly, or use Cancel instead of Suspend.
:::

## How to Cancel a Membership

1. Go to **Fluent Members → Members** and click the member's row to open their [Member Detail](/guide/members/detail) page.
2. On the membership row, click the action menu and select **Cancel**.
3. The row status changes to `Cancelled` and access is revoked immediately.
4. The plugin notifies the payment provider to stop recurring charges:
   - **Stripe (Pro):** subscription is cancelled immediately or at the end of the billing period, depending on your [Cancellation Modes](/guide/transactions/cancellation-modes) setting.
   - **FluentCart:** the linked subscription is cancelled.
   - **Fluent Forms / Paymattic / others:** the integration's cancel hook fires.

A cancelled member can re-purchase from your pricing page. The old `Cancelled` row stays in their membership history for your records, and a new `Active` row is created when they rejoin.

![Suspend and Cancel](/images/members/suspend-and-cancel/suspend-and-cancel-1.webp)

### Reactivating

How you restore access depends on which action was used:

- **After a Suspension**: Open the member's [Member Detail](/guide/members/detail) page, click the action menu on the suspended row, and change the status to **Active**. Access is restored immediately. There is no dedicated "Reactivate" button updating the status field directly is how you reverse a suspension.
- **After a Cancellation**: Cancelled memberships cannot be reversed. The cancelled row stays in the member's history. To restore access, use [Adding a Membership Manually](/guide/members/adding-manually) to create a new membership row.

![Reactivating a membership](/images/members/suspend-and-cancel/reactivate-2.webp)

## Corporate Memberships

When you suspend or cancel a **corporate parent** membership, every child (seat) account under that parent mirrors the new status automatically:

- Suspend the parent → all active children become `Suspended`
- Cancel the parent → all active children become `Cancelled`

To restore access for the entire team, change the parent's status back to Active. Individual child rows do not need to be updated separately.

## Important Notes

::: warning Things to keep in mind
- **Suspend does not stop billing.** Always check with your payment provider if you need to pause charges, or use Cancel instead.
- **Cancel may take effect immediately or at period end.** This depends on your Cancellation Modes setting. See [Cancellation Modes](/guide/transactions/cancellation-modes) to configure this behavior.
- **Cancelled rows are kept for your records.** The old row is not deleted — it remains in the member's history with a `Cancelled` status. A fresh membership row is created if they re-join.
- **Corporate cascades are parent-driven.** If child accounts were individually suspended for other reasons, un-suspending the parent will not automatically restore those children. Each child would need to be updated individually.
:::

