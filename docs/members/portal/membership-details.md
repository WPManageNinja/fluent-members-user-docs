---
title: "Membership Details"
description: "What members see and can do on the Membership Details page of the Member Portal."
---

# Membership Details

The **Membership Details** page is where a member reads everything about one membership and acts on it. Members open it by clicking **Manage** on a card in the Member Portal. The breadcrumb at the top leads back to the list through **My Profile**.

![Screenshot of the Membership Details page for a Stripe subscription with More Actions, the billing fields and the Transaction Details table](/images/members/portal/membership-details/membership-details-1.webp)

## Membership Details fields

Which fields appear depends on the membership:

| Field | Shows |
|---|---|
| **Membership Level** | The level name. |
| **Plan** | The pricing plan name, when the membership has one. |
| **Started** | The start date. |
| **Access**, **Access until** or **Expired on** | **Access** with **Lifetime** when there is no end date. **Access until** with the end date. **Expired on** once the date has passed. Ended memberships that never had an end date show none of these. |
| **Billing** | **Part of your team's plan** for a seat, or where billing is managed for store-billed memberships. |
| **Amount** | The price and billing term, when Fluent Members has the billing. Store-billed memberships and seats show none. |
| **Status** | The membership status. |

Memberships with a subscription billed through Fluent Members Stripe or PayPal also show these fields (Pro):

| Field | Shows |
|---|---|
| **Payment Method** | The method, with the last 4 card digits when known. |
| **Payment Method Update** | When the member last changed it. |
| **Billing Status** | The subscription status, or **Scheduled for Cancellation**. |
| **Next Billing Date** or **Cancellation Date** | The next charge, or the date a scheduled cancellation takes effect. |

## Content release schedule

When the member's access includes content released over time, a **Your content** section shows **Member since** with the day number, a bar reading **N of M items available now**, and an **Unlocking soon** list. Each item gives its title, where it comes from (the bundle or membership), and when it unlocks, such as after a number of days or on a date. See [Content Drip](/docs/content-access/content-drip).

## Billing by a store

A FluentCart or WooCommerce membership shows a **Billing** section instead of the Stripe fields:

- **Billed by**, **Payment Method**, **Billing Status** and **Next Charge**, or **Cancels on** when a cancellation is scheduled.
- Links: **View Order**, **Manage Subscription**, **Update Payment Method** and **Renew Subscription**, which open in the store.
- **Upgrade Options** when the store offers plan upgrades.

## Transaction Details (Pro)

**Transaction Details** lists the member's payments for this membership, newest first, up to the last 50. The columns are **Date Paid**, **Payment Method**, **Plan**, **Type**, **Amount** and **Status**. The section is hidden when there are no payments. On a narrow screen the table turns into a list of cards.

## Status notices

A notice appears above the details when something needs the member's attention. Only one shows at a time, in the order below:

| Notice | When |
|---|---|
| **Your subscription is paused. Update your payment method to resume it.** | The subscription is paused and the card can be updated. |
| **Your last payment did not go through. Update your payment method to restore access.** | The subscription is past due or unpaid and the card can be updated. |
| **Your last payment did not go through. Update your payment method in your store account to keep access.** | A FluentCart or WooCommerce subscription is past due or failing. |
| **Your membership has been suspended. Please contact the site administrator for more information.** | The membership is suspended. |
| **Your subscription is cancelled. You keep access until** a date | A store subscription was cancelled and access runs on. |
| **Billing for this membership is managed in your PayPal account. To stop payments, cancel the subscription there.** | The subscription was migrated from an older PayPal setup. An **Open PayPal** link sits beside the notice. |
| **Your membership is cancelled, but PayPal keeps charging until you cancel the subscription in your PayPal account.** | The same migrated PayPal subscription after the membership was cancelled. |
| **Your membership is scheduled to end on** a date**. You keep access until then.** | The member chose **Keep Until Expiry** when cancelling. |
| **Your subscription is scheduled to cancel on** a date | The member chose **End of Billing Period** when cancelling. Without a date it reads **Your subscription is scheduled to cancel at the end of the current billing period.** |

## Actions

**Renew Membership** or **View plans** is a button at the top right when it applies. The other actions are in the **More Actions** menu, which is hidden when none applies.

- **Cancel Membership** or **Cancel Subscription:** Ends the membership. See [Cancel a Membership](/docs/members/portal/cancelling).
- **Undo Cancellation:** Withdraws a scheduled cancellation.
- **Upgrade Plan** (Pro): Opens a dialog with **Your current plan** and **Choose a plan to upgrade to**. Click **Upgrade** to confirm. It appears on an active or trial subscription when the level has [upgrade paths](/docs/levels/upgrade-paths).
- **Update Payment Method** (Pro): See [Update Payment Method](/docs/members/portal/updating-payment-method).
- **Renew Membership** (Pro): See [Renew a Membership](/docs/members/portal/renewing-a-membership).

## Team Members (Pro)

Owners of a corporate membership get a **Team Members** panel below the details, for managing seats. See [Corporate Seat Invites](/docs/members/portal/corporate-seat-invites). Without Pro, the panel is replaced by the text **Corporate membership management requires FluentMembers Pro.**
