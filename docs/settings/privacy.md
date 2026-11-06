---
title: "Privacy and Personal Data"
description: "Export or erase a member's personal data with the WordPress privacy tools, and see which records Fluent Members keeps."
---

# Privacy and Personal Data

Fluent Members plugs into the WordPress privacy tools, so you can handle a member's request for their data the same way you handle any other personal data request. There is no separate screen for it in Fluent Members. Use **Tools → Export Personal Data** and **Tools → Erase Personal Data** in your WordPress admin.

## Export a member's data

Go to **Tools → Export Personal Data** in WordPress and add a request with the member's email address. Once the request is confirmed, the export includes these Fluent Members groups:

| Group | Includes |
|---|---|
| **Membership Activity** | Activity log entries about the member. |
| **Memberships** | Level, status, provider, start date, end date and creation date. |
| **Membership Orders** | Order ID, item, amount, status, payment method and date. |
| **Membership Subscriptions** | Subscription ID, item, status, billing interval, recurring amount and next billing date. |
| **Membership Transactions** | Transaction ID, item, type, amount, status, card brand, last 4 digits and date. |
| **Corporate Membership Seats** | Level, seat holder name and email, status and start date. |

With **Fluent Members Pro** (Pro), the export adds these groups:

- **Corporate Invitations Received**
- **Corporate Invitations Sent**
- **Updated Payment Methods**

## Erase a member's data

Go to **Tools → Erase Personal Data** in WordPress and add a request with the member's email address. Once the request is confirmed, Fluent Members does the following:

- Replaces the member's name and email in their activity log entries with a placeholder.
- Clears the card brand and last 4 digits from their transactions.

With Fluent Members Pro, it also does the following:

- Deletes pending corporate invitations sent to that email, so their join links stop working.
- Removes saved card details from their orders and subscriptions.

### What is kept

WordPress shows a message for anything Fluent Members keeps:

- **Billing records:** Membership, order, subscription and payment records stay for accounting, with their amounts, dates and payment reference IDs.
- **Live subscriptions:** Payment details on a subscription that is still billing stay in place. Cancel the subscription first, then run the erasure again.
- **Gateway copies** (Pro): Stripe and PayPal keep their own copy of the customer and their saved cards. To remove it, delete the customer in your Stripe or PayPal dashboard.

> [!Note]
> Erasing personal data doesn't delete the member's WordPress account or cancel their membership.

## Delete a member's WordPress account

Deleting a user in WordPress removes them from Fluent Members too. Their memberships are cancelled and removed, and any [manager role](/docs/settings/permissions) they had is removed. With Fluent Members Pro, their active Stripe and PayPal subscriptions are also cancelled at the gateway. The exception is a legacy PayPal subscription, which you cancel in PayPal.
