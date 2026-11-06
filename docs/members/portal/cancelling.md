---
title: "Cancel a Membership"
description: "How members cancel a membership or subscription from the Member Portal, and what happens next."
---

# Cancel a Membership

Members can cancel their own membership from the **Member Portal** without contacting you. Depending on the membership, they end it right away or keep access until a set date.

## Cancel from the portal

1. Open the Member Portal and click **Manage** on the membership.

    ![Screenshot of the Member Portal with an arrow on the Manage button of a membership card](/images/members/cancel-memberships/manage-1.webp)

2. Click **More Action**, then **Cancel Membership**. For a subscription billed through Fluent Members Stripe or PayPal, the item is **Cancel Subscription**.

    ![Screenshot of the Membership Details page with the More Action menu open and an arrow on Cancel Membership](/images/members/cancel-memberships/cancelling-more-action.webp)

3. Answer the dialog that opens. See the next section for which one the member gets.

The item is only there for an **Active** or **Trial** membership, or a subscription that can still be cancelled.

## Which dialog appears

### Plain confirmation

Most memberships get a simple question. Clicking **Yes, Cancel** ends the membership now, and **No** closes the dialog.

![Screenshot of the dialog asking Are you sure you want to cancel this membership, with No and Yes, Cancel buttons](/images/members/cancel-memberships/cancel-memberships-2.webp)

### Cancel Membership, with a choice

A manually added or migrated membership with a future end date and no live subscription gets a **Cancel Membership** dialog with two options:

- **Keep Until Expiry** (default): The member keeps access until the end date, then the membership ends.
- **Cancel Immediately:** The membership ends now and access stops.

The confirm button takes the name of the selected option, and **Cancel** closes the dialog.

<!-- TODO(screenshot): cancelling-1
  screen: Member Portal, Membership Details, More Action, Cancel Membership
  state: Cancel Membership dialog with Keep Until Expiry selected
  data: a manual membership with a future expiry date
  highlight: -
  view: frontend
  alt: Screenshot of the Cancel Membership dialog with the Keep Until Expiry and Cancel Immediately options
  reason: needs the develop build on the local site
-->

With **Keep Until Expiry**, the page shows **Your membership is scheduled to end on** the date, and **More Action** gains **Undo Cancellation**, which puts the membership back as it was. **Cancel Membership** stays in the menu, and using it then ends access right away.

### Cancel Subscription (Pro)

A subscription billed through Fluent Members Stripe or PayPal gets a **Cancel Subscription** dialog with a **Cancellation Mode**:

- **End of Billing Period** (default): Stops future renewals and keeps access until the current billing period ends.
- **Cancel Immediately:** Cancels the subscription now and removes access.

With **End of Billing Period**, the membership stays **Active** until that date. **Billing Status** shows **Scheduled for Cancellation**, and the member can take it back with [Renew Membership](/docs/members/portal/renewing-a-membership).

<!-- TODO(screenshot): cancelling-2
  screen: Member Portal, Membership Details, More Action, Cancel Subscription
  state: Cancel Subscription dialog with End of Billing Period selected
  data: a membership with a real Stripe subscription
  highlight: -
  view: frontend
  alt: Screenshot of the Cancel Subscription dialog with the End of Billing Period and Cancel Immediately options
  reason: needs a live Stripe subscription; the test subscription returns no billing data
-->

### Migrated PayPal subscriptions

A subscription migrated from an older PayPal setup gets the plain confirmation with a warning. Cancelling ends the membership, but PayPal keeps charging until the member cancels the subscription in their PayPal account. The page links there with **Open PayPal**.

## What happens after cancelling

- **Status:** The membership shows **Cancelled** in the portal and in your admin once it has ended.
- **Stripe and PayPal billing** (Pro): Fluent Members tells the gateway to stop the subscription.
- **Corporate memberships** (Pro): If the owner's membership is cancelled, the team's seats are cancelled too.
- **Access:** Protected content stops being available when the membership ends.

> [!Note]
> Cancelling in the portal only stops billing for subscriptions Fluent Members bills itself. It doesn't cancel a subscription in a connected plugin such as FluentCart, so cancel those in that plugin as well.

To cancel a member from your side, see [Suspend or Cancel a Member](/docs/members/suspending-and-cancelling).
