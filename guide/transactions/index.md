# Transactions

The Transactions screen is your billing ledger — one row per billing event (initial charge, renewal, refund). Use it to confirm a payment landed, look up a charge by member or ID, or issue a refund directly from the admin.

> [!Note]
> The Transactions screen is only available with Fluent Members Pro. The **Transactions** link appears in the top navigation only when Pro is active.

## Access Transactions

In your WordPress admin, go to **Fluent Members → Transactions** using the top navigation bar. If the link is not visible, Fluent Members Pro is not active.

## Filter Tabs

The tab bar at the top filters the list by transaction status:

| Tab | Shows |
|---|---|
| **All** | Every transaction regardless of status |
| **Paid** | Successful charges money collected |
| **Pending** | Payments awaiting confirmation (e.g. 3D Secure in progress) |
| **Failed** | Charges that did not succeed (declined card, expired card) |
| **Refunded** | Charges where the amount was returned to the member |

## Columns

| Column | What it shows |
|---|---|
| **ID** | Transaction row ID use this when contacting support |
| **User** | Member's display name and email address |
| **Level** | The Membership Level the payment was for |
| **Type** | `charge` (initial payment), `renewal` (recurring), or `refund` |
| **Amount** | The transaction amount |
| **Status** | `paid`, `pending`, `failed`, or `refunded` |
| **Payment Method** | `stripe` or the integration that generated the transaction |
| **Date** | When the event occurred, in your site's timezone |

Click any row to open the transaction detail panel.

## Where Transactions Come From

Transactions are written automatically you do not create them manually:

- **Stripe (native checkout)**: every Stripe webhook event (charge, renewal, refund) creates or updates a transaction row
- **Paywall integrations (FluentCart, WooCommerce, etc.)**: successful payment hooks write a transaction row so all sources appear in one ledger
- **Refunds**: when you refund a transaction from this screen, or when Stripe sends a `charge.refunded` webhook event

## Issuing a Refund

1. Find the transaction you want to refund use the **Paid** tab or search by member name or email.
2. Click the row to open the detail panel.
3. Click **Refund** and enter the amount (leave blank for a full refund).
4. Confirm Fluent Members calls the Stripe API and marks the transaction as `refunded`.

::: warning Refunds do not change membership status
Issuing a refund does not automatically expire or cancel the member's access. If you want to revoke access, go to **Members**, find the member, and update their status manually. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).
:::

## Searching

Use the search field to filter by member name, email address, or transaction ID. The search applies within the currently active tab.

## How Transactions Relate to Members

Every transaction is linked to:

- A **member** (the WordPress user who paid)
- A **Membership Level** they purchased
- For renewals: the **subscription** that triggered the charge
- For refunds: the **parent transaction** being refunded

Click the **User** column in any row to jump to that member's detail page.

::: tip No transactions after a recent Stripe charge?
The most common cause is a missing or misconfigured webhook. Check that your Stripe webhook endpoint is set up correctly. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).
:::
