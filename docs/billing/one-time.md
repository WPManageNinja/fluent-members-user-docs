---
title: "One-time Memberships (Pro)"
description: "Read the One-time Memberships list and detail page, and refund or cancel a membership with no recurring billing behind it."
---

# One-time Memberships (Pro)

The **One-time Memberships** (Pro) list shows memberships with no recurring billing behind them. Use it to check single payments and manually added memberships, and to refund or cancel one.

## What appears here

A membership is listed here when all of these are true:

- It has no subscription record in Fluent Members.
- It was not a recurring purchase in FluentCart, WooCommerce, Fluent Forms or Paymattic. Those appear under [Subscriptions](/docs/billing/provider-subscriptions).
- It is not on a corporate level, does not own seats, and is not a seat on someone else's plan.

## Open the list

Go to **Fluent Members → Billing → One-time**.

![Screenshot of the One-time Memberships list with member rows, amounts and gateways](/images/billing/one-time/one-time-list.webp)

The table has these columns:

| Column | Shows |
|---|---|
| **ID** | The record number. |
| **Member** | The member's avatar, name and email. |
| **Level** | The Membership Level. |
| **Amount** | The amount paid. Manual and corporate records show `--`. Records from other plugins show their saved price label, and other records with no payment show **Free**. |
| **Status** | **Active**, **Trial**, **Cancelled**, **Suspended** or **Expired**. |
| **Gateway** | Where the record came from, such as Stripe, PayPal, FluentCart or **Manual**. |
| **Purchased** | The date the membership was created. |

Click a row to open it, or use **View** in the three-dot menu. To change the columns, sort or search, see [Filter & Search](/docs/billing/filters-and-search).

A **Test** badge beside the **Amount** marks a test payment, where no real money moved. The same badge appears in the record's panels and in **Transaction History**.

## The record page

A record with a payment opens with an **Order Information** panel showing **Order ID**, **Membership Level**, **Amount**, **Payment Gateway** and **Purchased**:

![Screenshot of a paid one-time membership page with Order Information, Transaction History and Activity](/images/billing/one-time/one-time-detail-paid.webp)

A record with no payment opens with a **Membership Details** panel showing **Membership Level**, **Amount** and **Purchased**:

![Screenshot of a manually added one-time membership page with Membership Details and Activity](/images/billing/one-time/one-time-detail-manual.webp)

The other panels are the same on both:

- **Transaction History:** each payment and refund, when there are any. A **TEST** tag beside the amount marks a test-mode payment.
- **Activity:** **Membership created**, **Order placed**, **Payment succeeded**, **Payment failed**, **Refund issued** and **Membership cancelled**, newest first.
- **Member Information:** the member's name and email, a **WP User #** link to their member page, and **Member Since**.
- **Membership Information:** the **Level**, its **Access Group** list, the **Expiration** (**Lifetime** for these memberships), and any **Other Membership** the member holds.

## Refund a payment

Click **More Actions → Refund**. The option is greyed out when nothing is refundable. A full refund of a payment also cancels the membership, and that includes refunding the last remainder after a partial refund. See [Refunds](/docs/billing/refunds).

## Cancel a membership

Cancelling ends the membership without refunding anything. Use it to remove access while keeping the payment.

1. Open the record and click **More Actions → Cancel Membership**.
2. Click **Cancel Membership** in the confirmation box. **Go Back** closes it without changes.

![Screenshot of the Cancel Membership confirmation saying the member loses access immediately and no payment is refunded, with Go Back and Cancel Membership buttons](/images/billing/one-time/one-time-revoke-confirm.webp)

The confirmation reads "Cancel this membership now? The member loses access immediately. This does not refund any payment." The status changes to **Cancelled**, and **Cancel Membership** is greyed out from then on.
