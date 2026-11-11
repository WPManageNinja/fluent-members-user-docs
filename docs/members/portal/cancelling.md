---
title: "Cancel a Membership"
description: "How members cancel a membership or subscription from the Member Portal, and what happens next."
---

# Cancel a Membership

Members can cancel their own membership from the **Member Portal** without contacting you. Depending on the membership, they end it right away or keep access until it expires.

## Cancel from the portal

1. Open the Member Portal and click **Manage** on the membership.

    ![Screenshot of the Member Portal with an arrow on the Manage button of a membership card](/images/members/cancel-memberships/manage-1.webp)

2. Click **More Actions**, then **Cancel Membership**. For a subscription billed through Fluent Members Stripe or PayPal, the item is **Cancel Subscription**.

    ![Screenshot of the Membership Details page with the More Actions menu open and an arrow on Cancel Membership](/images/members/cancel-memberships/cancelling-more-action.webp)

3. Answer the dialog that opens. See the next section for which one the member gets.

The item is only there for an **Active** or **Trial** membership. For a subscription billed through Fluent Members (Pro), it shows only while the subscription can still be cancelled.

If the member already chose to keep access until the end date, **More Actions** also holds **Undo Cancellation**. See [Cancel Membership, with a choice](#cancel-membership-with-a-choice).

## Which dialog appears

### Plain confirmation

A membership that does not meet the conditions above gets a simple question, "Are you sure you want to cancel this membership?". Clicking **Yes, Cancel** ends the membership now, and **No** closes the dialog.

![Screenshot of the dialog asking Are you sure you want to cancel this membership, with No and Yes, Cancel buttons](/images/members/cancel-memberships/cancel-memberships-2.webp)

### Cancel Membership, with a choice

A manually added or migrated membership gets a **Cancel Membership** dialog with a **Cancellation Mode** when it still has time left. The membership must:

- Come from **Manual**, or from a migration from PMPro, MemberPress or Restrict Content Pro.
- Have an end date in the future.
- Have no live subscription, and not be a corporate team seat.

The dialog offers two options:

- **Keep Until Expiry** (default): The member keeps access until the end date, then the membership ends. The option names that date.
- **Cancel Immediately:** The membership ends now and access stops.

The confirm button takes the name of the selected option, and **Go Back** closes the dialog.

![Screenshot of the Cancel Membership dialog with Keep Until Expiry selected, Cancel Immediately beside it and an arrow pointing to the Keep Until Expiry button](/images/members/cancel-memberships/cancelling-keep-until-expiry-dialog.webp)

With **Keep Until Expiry**, the member sees "Cancellation scheduled. You keep access until" the date. The page then reads **Your membership is scheduled to end on** the date, and the membership stays active until then.

![Screenshot of the Membership Details page with a notice reading Your membership is scheduled to end on January 10, 2027 and the status still Active](/images/members/cancel-memberships/cancelling-scheduled.webp)

While a cancellation is scheduled, the member has two choices in **More Actions**:

- **Undo Cancellation:** Puts the membership back as it was. The page confirms "Cancellation undone. Your membership stays active until" the date.
- **Cancel Membership:** Opens a plain confirmation that says "Your membership is already scheduled to end on" the date and "Cancelling now revokes your access immediately."

![Screenshot of the More Actions menu open with Cancel Membership and an arrow pointing to Undo Cancellation](/images/members/cancel-memberships/cancelling-undo-cancellation.webp)

### Cancel Subscription (Pro)

A subscription billed through Fluent Members Stripe or PayPal gets a **Cancel Subscription** dialog with a **Cancellation Mode**:

- **End of Billing Period** (default): Stops future renewals and keeps access until the current billing period ends.
- **Cancel Immediately:** Cancels the subscription now and removes access.

The confirm button takes the name of the selected mode, and **Go Back** closes the dialog.

With **End of Billing Period**, the membership stays **Active** until that date. **Billing Status** shows **Scheduled for Cancellation**, and the member can take it back with [Renew Membership](/docs/members/portal/renewing-a-membership).

![Screenshot of the Cancel Subscription dialog with End of Billing Period selected, Cancel Immediately beside it and an arrow pointing to the End of Billing Period button](/images/members/cancel-memberships/cancelling-subscription-dialog.webp)


### Migrated PayPal subscriptions

A subscription migrated from an older PayPal setup gets the plain confirmation with a warning: "Billing is managed in your PayPal account. Cancelling here ends your membership, but PayPal keeps charging until you cancel the subscription in PayPal." Cancelling ends the membership, but the member must also cancel the subscription in their PayPal account. The page links there with **Open PayPal**, which opens in a new tab.

## What happens after cancelling

- **Status:** The membership shows **Cancelled** in the portal and in your admin once it has ended.
- **Stripe and PayPal billing** (Pro): Fluent Members tells the gateway to stop the subscription.
- **Corporate memberships** (Pro): If the owner's membership is cancelled, the team's seats are cancelled too.
- **Access:** Protected content stops being available when the membership ends.

> [!Note]
> Cancelling in the portal only stops billing for subscriptions Fluent Members bills itself. It doesn't cancel a subscription in a connected plugin such as FluentCart, so cancel those in that plugin as well.

To cancel a member from your side, see [Suspend or Cancel a Member](/docs/members/suspending-and-cancelling).
