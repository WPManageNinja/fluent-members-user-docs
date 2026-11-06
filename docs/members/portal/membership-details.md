---
title: "Membership Details"
description: "What members see and can do on the Membership Details page of the Member Portal."
---

# Membership Details

The **Membership Details** page is where a member reads everything about one membership and acts on it. Members open it by clicking **Manage** on a card in the Member Portal.

![Screenshot of the Membership Details page for a Pro membership with the More Action button at the top right](/images/members/portal/membership-details/membership-details-page.webp)

The breadcrumb at the top leads back to the list through **Members Profile**.

## Membership Details fields

Which fields appear depends on the membership:

| Field | Shows |
|---|---|
| **Membership Level** | The level name. |
| **Plan** | The pricing plan name, when the membership has one. |
| **Started** | The start date. |
| **Access until** or **Expired on** | **Access until** with the end date or **Lifetime access**. **Expired on** once the date has passed. |
| **Provider** | Where the membership came from. |
| **Amount** | The price and billing term, when the membership has a price. |
| **Status** | The membership status. |

Memberships with a subscription billed through Fluent Members Stripe or PayPal also show these fields (Pro):

| Field | Shows |
|---|---|
| **Payment Method** | The method, with the last 4 card digits when known. |
| **Payment Method Update** | When the member last changed it. |
| **Billing Status** | The subscription status, or **Scheduled for Cancellation**. |
| **Next Billing Date** or **Cancellation Date** | The next charge, or the date a scheduled cancellation takes effect. |

<!-- TODO(screenshot): membership-details-1
  screen: Member Portal, Membership Details page of a Stripe subscription
  state: billing fields and the Transaction Details table visible
  data: a membership with a real Stripe subscription and at least one payment
  highlight: -
  view: frontend
  alt: Screenshot of Membership Details with Payment Method, Billing Status and Next Billing Date fields above the Transaction Details table
  reason: needs a live Stripe subscription; the test subscription returns no billing data
-->

## Transaction Details (Pro)

**Transaction Details** lists the member's payments for this membership, newest first, up to the last 50. The columns are **Date Paid**, **Payment Method**, **Plan**, **Type**, **Amount** and **Status**. The section is hidden when there are no payments.

## Status notices

A notice appears above the details when something needs the member's attention:

| Notice | When |
|---|---|
| **Your last payment did not go through. Update your payment method to restore access.** | The subscription is past due or unpaid and the card can be updated. |
| **Your subscription is paused. Update your payment method to resume it.** | The subscription is paused and the card can be updated. |
| **Your membership has been suspended. Please contact the site administrator for more information.** | The membership is suspended. |
| **Your subscription is scheduled to cancel on** a date | The member chose **End of Billing Period** when cancelling. |
| **Your membership is scheduled to end on** a date**. You keep access until then.** | The member chose **Keep Until Expiry** when cancelling. |
| **Billing for this membership is managed in your PayPal account. To stop payments, cancel the subscription there.** | The subscription was migrated from an older PayPal setup. An **Open PayPal** link sits beside the notice. |

## Actions

Actions sit at the top right. **Renew Membership** is a button of its own when it applies, and the others are in the **More Action** menu. The menu is hidden when no action applies.

- **Cancel Membership** or **Cancel Subscription:** Ends the membership. See [Cancel a Membership](/docs/members/portal/cancelling).
- **Undo Cancellation:** Withdraws a scheduled **Keep Until Expiry** cancellation.
- **Upgrade Plan** (Pro): Opens a dialog with **Your current plan** and **Choose a plan to upgrade to**. Click **Upgrade** to confirm. It appears on an active or trial subscription when the level has [upgrade paths](/docs/levels/upgrade-paths).
- **Update Payment Method** (Pro): See [Update Payment Method](/docs/members/portal/updating-payment-method).
- **Renew Membership** (Pro): See [Renew a Membership](/docs/members/portal/renewing-a-membership).

## Team Members (Pro)

Owners of a corporate membership get a **Team Members** panel below the details, for managing seats. See [Corporate Seat Invites](/docs/members/portal/corporate-seat-invites). Without Pro, the panel is replaced by the text **Corporate membership management requires Fluent Members Pro.**
