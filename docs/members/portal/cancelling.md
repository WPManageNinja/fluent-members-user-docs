---
title: "Cancel a Membership"
description: "How members cancel a membership or subscription from the Member Portal, and what happens next."
---

# Cancel a Membership

Members can cancel their own membership from the **Member Portal** without contacting you. Depending on the membership, they end it right away, keep access until it expires, or stop a subscription at the end of the billing period.

## Cancel from the portal

1. Open the Member Portal and click **Manage** on the membership.
2. Click **More Actions**, then **Cancel Membership**. For a subscription billed through Fluent Members Stripe or PayPal, or a live FluentCart or WooCommerce subscription, the item is **Cancel Subscription**.
3. Answer the dialog that opens. The next section shows which one the member gets.

The item is only there for an **Active** or **Trial** membership. For a subscription billed through Fluent Members (Pro), it shows only while the subscription can still be cancelled.

<!-- TODO(screenshot): cancelling-1
  screen: Member Portal → Manage → More Actions
  state: menu open with Cancel Subscription highlighted
  data: a member with a Stripe subscription
  highlight: Cancel Subscription item
  view: frontend
  alt: Screenshot of the Membership Details page with the More Actions menu open and an arrow on Cancel Subscription
-->

## Which dialog appears

### Plain confirmation

A membership that does not meet the conditions below gets a simple question, "Are you sure you want to cancel this membership?". **Yes, Cancel** ends the membership now, and **No** closes the dialog.

### Cancel Membership, with a choice

A manually added or migrated membership gets a **Cancel Membership** dialog with a **Cancellation Mode** when it still has time left. The membership must:

- Come from **Manual**, or from a migration from Paid Memberships Pro, MemberPress or Kadence Memberships.
- Have an end date in the future.
- Have no live subscription, and not be a corporate team seat.

The dialog offers two options:

- **Keep Until Expiry** (default): The member keeps access until the end date, then the membership ends. The option names that date.
- **Cancel Immediately:** The membership ends now and access stops.

The confirm button takes the name of the selected option, and **Go Back** closes the dialog.

<!-- TODO(screenshot): cancelling-2
  screen: Member Portal → Cancel Membership dialog
  state: Keep Until Expiry selected, Cancel Immediately beside it
  data: a member with a manual membership that has an end date in the future
  highlight: Keep Until Expiry button
  view: frontend
  alt: Screenshot of the Cancel Membership dialog with Keep Until Expiry selected and Cancel Immediately beside it
-->

With **Keep Until Expiry**, the member sees "Cancellation scheduled. You keep access until" the date. The page then reads **Your membership is scheduled to end on** the date, and the membership stays active until then.

While a cancellation is scheduled, **More Actions** holds two choices:

- **Undo Cancellation:** Puts the membership back as it was. The page confirms "Cancellation undone. Your membership stays active until" the date.
- **Cancel Membership:** Opens a plain confirmation that says "Your membership is already scheduled to end on" the date and "Cancelling now revokes your access immediately."

### Cancel Subscription (Pro)

A subscription billed through Fluent Members Stripe or PayPal gets a **Cancel Subscription** dialog with a **Cancellation Mode**:

- **End of Billing Period** (default): Stops future renewals and keeps access until the current billing period ends.
- **Cancel Immediately:** Cancels the subscription now and removes access.

The confirm button takes the name of the selected mode, and **Go Back** closes the dialog.

With **End of Billing Period**, the membership stays **Active** until that date. **Billing Status** shows **Scheduled for Cancellation** with a **Cancellation Date**, and the member can take it back with [Renew Membership](/docs/members/portal/renewing-a-membership).

If Fluent Members has no gateway ID for the subscription, the dialog opens with a note. A Stripe record reads "We could not confirm your Stripe subscription. If you are charged again after cancelling, please contact us." A PayPal record asks the member to also cancel in their PayPal account. See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

### FluentCart and WooCommerce subscriptions (Pro)

A live FluentCart or WooCommerce subscription gets a plain confirmation: "Cancel your subscription? No further payments will be taken, and you keep access until" the date. Cancelling stops the store subscription and the member keeps access until the date. A payment plan (installments) in FluentCart cannot be cancelled by the member, and the page says to contact the store.

### Migrated PayPal subscriptions

A subscription migrated from an older PayPal setup gets the plain confirmation with a warning: "Billing is managed in your PayPal account. Cancelling here ends your membership, but PayPal keeps charging until you cancel the subscription in PayPal." The member must also cancel in their PayPal account. The page links there with **Open PayPal**, which opens in a new tab.

## What happens after cancelling

- **Status:** The membership shows **Cancelled** in the portal and in your admin once it has ended.
- **Stripe and PayPal billing** (Pro): Fluent Members tells the gateway to stop the subscription.
- **Corporate memberships** (Pro): If the owner's membership is cancelled, the team's seats are cancelled too.
- **Access:** Protected content stops being available when the membership ends.
- **Email:** The **Subscription Cancelled** [email notification](/docs/settings/email-configuration/email-notifications) is on by default.

> [!Note]
> Cancelling in the portal does not cancel a subscription in Fluent Forms or Paymattic, so cancel those in that plugin as well.

To cancel a member from your side, see [Suspending & Cancelling](/docs/members/suspending-and-cancelling).
