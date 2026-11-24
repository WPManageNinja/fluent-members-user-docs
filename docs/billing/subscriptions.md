---
title: "Subscriptions (Pro)"
description: "Read the Subscriptions list and detail page, including columns, statuses, scheduled cancellations, transaction history and the actions you can take."
---

# Subscriptions (Pro)

The **Subscriptions** (Pro) list shows every recurring membership on your site. Use it to see who is paying, when the next charge runs, which cancellations are scheduled and which renewals have failed.

It includes subscriptions billed through Stripe or PayPal, subscriptions imported from Paid Memberships Pro, MemberPress or Kadence Memberships, and [subscriptions billed by other plugins](/docs/billing/provider-subscriptions).

## Open the list

Go to **Fluent Members → Billing → Subscriptions**.

Above the table, the status tabs are **All**, **Active**, **Trial** and **Payment failed**, with **More** holding **Paused**, **Cancelled** and **Expired**. The search and column icons sit on the right.

![Screenshot of the Subscriptions list with status tabs, member rows and pagination](/images/billing/subscriptions/subscriptions-list.webp)

## Columns

The table scrolls sideways when it does not fit your screen. A new browser shows **ID**, **Member**, **Billing Cycle**, **Status** and **Next Billing**. Turn on the others from the **Columns** icon. See [Filter & Search](/docs/billing/filters-and-search).

| Column | Shows |
|---|---|
| **ID** | The record number. |
| **Member** | The member's avatar, name and email. |
| **Level** | The Membership Level the subscription is for. |
| **Billing Cycle** | The recurring amount and interval, such as `$9.00 / monthly`. |
| **Status** | The current status, or the cancel date for a scheduled cancellation. See [Statuses](#statuses). |
| **Gateway** | Where the billing runs or came from, such as Stripe, PayPal, Paid Memberships Pro, MemberPress or FluentCart. |
| **Next Billing** | The date of the next charge, or `--` when none is scheduled. |
| **Total Paid** | The total collected on this subscription. |
| **Started** | The date the subscription was created. |
| **Last Payment** | The date of the most recent payment. |

Dates follow the date format set in **Settings → General** in WordPress. Click a row to open the subscription. The three-dot menu on each row holds **View**, plus **Cancel Subscription** when the subscription can be cancelled here.

A **Test** badge beside the **Billing Cycle** marks a test payment, where no real money moved. The same badge appears in the subscription's panels and beside **Amount** in **Transaction History**.

### Scheduled cancellations

When a subscription is set to end at the close of the billing period, the **Status** column shows **Cancels** followed by the end date, in your site's date format. **Next Billing** shows `--` for that row, because no further charge will run. The member keeps access until the date.

## Statuses

A subscription shows one of these statuses:

| Status | Meaning |
|---|---|
| **Awaiting payment** | Waiting on the gateway to confirm the subscription or its first payment. |
| **Trial** | Inside a trial. |
| **Active** | Billing normally. |
| **Payment failed** | A payment failed and is outstanding, or the subscription is unpaid. The member can update their payment method to restore access. |
| **Paused** | Billing is paused at the gateway. The member can update their payment method to resume it. |
| **Cancelled** | The subscription was cancelled. |
| **Expired** | The subscription has ended. |

## The subscription page

The heading shows the record number and status, with **More actions** on the right.

![Screenshot of a subscription page with Subscription Details, Transaction History, Activity, Member Information and Membership Information](/images/billing/subscriptions/subscription-detail.webp)

### Subscription Details

This panel holds the billing facts:

- **Subscription ID:** the Fluent Members ID, with a copy button.
- **Gateway Subscription ID:** the ID at Stripe or PayPal, or `--` if there is none.
- **Membership Level**, **Billing Cycle**, **Payment Gateway**, **Next Billing Date** and **Start Date**.
- **Card:** the card brand and last four digits, when a card is on file.
- **Trial Ends**, **Cancelled At** and **Ends At:** shown only when they apply.

### Transaction History

This table lists the latest 100 transactions with their **Date**, **Type**, **Amount**, **Payment Method** and **Status**. The panel is hidden when there are none.

- **Type** is **Payment**, **Renewal**, **Refund** or **Partial refund**.
- **Status** is **Paid**, **Pending**, **Failed**, **Refunded** or **Partially refunded**.
- A **Test** badge beside the amount marks a test-mode payment.

A **Refund** column appears when a payment has to be refunded at the gateway instead of here. See [Refunds](/docs/billing/refunds).

### Activity

This timeline lists events newest first: **Subscription created**, **Trial ended**, **Payment succeeded**, **Payment failed**, **Refund issued**, **Subscription canceled** and **Subscription expired**. A subscription cancelled without reaching its gateway reads **Subscription cancelled in FluentMembers only. The payment gateway was not changed.** See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

### Member Information

This panel shows the member's name and email, a **WP User #** link to their member page, and **Member Since**.

### Membership Information

This panel shows the **Level**, its **Access Group** list, **Trial Ends** when it applies, and any **Other Membership** the member holds with its status. A **View all memberships** link opens the member's page when they hold more than five.

## Actions

Click **More actions** to see what you can do with the subscription:

- **Refund:** appears when a payment on this subscription still has a refundable amount. See [Refunds](/docs/billing/refunds).
- **Cancel Subscription:** appears when the subscription can be cancelled from here. See [Cancel a Subscription](/docs/billing/cancelling-a-subscription).

**More actions** is greyed out when neither applies. Renewing and updating a card are member actions, which members do from the [member portal](/docs/members/portal/membership-details).

## Notices on this page

Two notices can appear above the details:

- **Scheduled cancellation:** "This subscription is scheduled for cancellation at the end of the current billing period." The subscription keeps its status until then.
- **Billing managed in PayPal:** "Billing for this subscription is managed in PayPal and cannot be cancelled from here. To stop payments, cancel it in your PayPal business account or ask the member to cancel it in theirs." This appears on PayPal subscriptions imported from another plugin.
