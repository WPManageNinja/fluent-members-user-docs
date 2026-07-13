# Transactions

The **Transactions** screen is your billing ledger one row per billing event (initial charge, renewal, refund). Use it to confirm a payment landed, look up a charge by member or ID, or issue a refund directly from the admin.

> [!Note]
> The Transactions screen is only available with Fluent Members Pro. The **Transactions** link appears in the top navigation only when Pro is active.


## Access Transactions

In your WordPress admin, go to **Fluent Members → Transactions** using the top navigation bar.

## Filter Tabs

The tab bar at the top filters the list by transaction status:

| Tab | Shows |
|---|---|
| **All** | Every transaction regardless of status |
| **Paid** | Successful charges (money collected) |
| **Pending** | Payments awaiting confirmation (e.g. 3D Secure in progress) |
| **Failed** | Charges that did not succeed (declined card, expired card) |
| **Refunded** | Charges where the amount was returned to the member |

## Columns

- **ID**: The unique transaction row ID. Use this when contacting support or referencing a specific charge.
- **User**: The member's display name and email address. Click the name to open their profile.
- **Level**: The Membership Level the payment was for.
- **Type**: The nature of the transaction `charge` (initial payment), `renewal` (recurring), or `refund`.
- **Amount**: The exact amount processed for this transaction.
- **Status**: A status badge showing `paid`, `pending`, `failed`, or `refunded`.
- **Payment Method**: The gateway used, including card type and masked card number (e.g. Visa \*\*\*\*4242).
- **Date**: The timestamp when the billing event occurred, in your site's timezone.

![Transactions screen](/images/transactions/index/transaction-dashboard-1.webp)

## Where Transactions Come From

Transactions are written automatically you do not create them manually:

- **Stripe (native checkout)**: every Stripe webhook event (charge, renewal, refund) creates or updates a transaction row
- **Paywall integrations (FluentCart, WooCommerce, etc.)**: successful payment hooks write a transaction row so all sources appear in one ledger
- **Refunds**: when you refund a transaction from this screen, or when Stripe sends a `charge.refunded` webhook event

## Issuing a Refund

Find the transaction in the **Paid** tab, open the action menu on the row, and click **Refund**. Enter the amount (full or partial) and confirm. See [Refunds](/guide/transactions/refunds) for the complete walkthrough.

::: warning Refunds do not change membership status
Issuing a refund does not automatically expire or cancel the member's access. If you want to revoke access, update the member's status manually. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).
:::

## Searching

Use the search field to filter by member name, email address, or transaction ID. Search applies within the currently active tab if a search returns nothing, switch to the **All** tab first.

## How Transactions Relate to Members

Every transaction is linked to a member, a Membership Level, and (for renewals) the subscription that triggered the charge. Click the **User** column in any row to jump to that member's detail page.

::: tip No transactions after a recent Stripe charge?
The most common cause is a missing or misconfigured webhook. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).
:::
