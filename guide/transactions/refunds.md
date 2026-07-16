# Refunds

You can issue a full or partial refund on any paid Stripe or PayPal transaction directly from the Fluent Members admin. The refund calls the gateway's API, records a refund transaction, and marks the original transaction as refunded.

> [!Note]
> Refunds work only for charges made through native Stripe or native PayPal payments. Charges from FluentCart, WooCommerce, Fluent Forms, or Paymattic must be refunded in their respective plugins.

## Find the Record

Refunds are issued from inside a record's detail page, there's no separate Transactions list anymore.

1. Open **Fluent Members → Orders**.
2. Go to **[Subscriptions](/guide/transactions/subscriptions)** if the charge belongs to a recurring plan, or **[One-Time Purchases](/guide/transactions/one-time)** if it was a single purchase.
3. Use the search field to find the member, then open their row. See [Filters & Search](/guide/transactions/filters-and-search).
4. In the **Transaction History** panel, find the transaction you want to refund.

You can also start from a member's detail page: open **Members**, find the member, and use the action menu on their membership row.

## Issue the Refund

1. On the transaction row, use the refund action.
2. Enter the amount to refund. Leave it at the original amount for a full refund, or enter a lower value for a partial refund.
3. For Stripe, optionally pick a reason (Duplicate, Fraudulent, or Requested by Customer). For PayPal, you can add a free-text note instead.
4. Add an optional internal note, stored on the refund record, not sent to the member.
5. Confirm.

Fluent Members calls the gateway's API, records a new transaction with type `refund` (or `partial_refund`), and updates the original transaction's status.

## Full vs Partial Refunds

| | Full refund | Partial refund |
|---|---|---|
| Amount | Equal to the remaining refundable amount | Less than the remaining refundable amount |
| Original transaction status after | `refunded` | `partially_refunded` |
| Can refund again? | No | Yes, until total refunds equal the original amount |

Fluent Members tracks how much of a charge has already been refunded, so a second partial refund can't push the total past the original amount.

## Refunds and Membership Access

Issuing a refund does **not** cancel or expire the member's access. Fluent Members returns the money via the gateway but leaves the membership row unchanged.

If you want to revoke access after refunding, update the member's status manually:

1. Go to **Members** and open the member's detail page.
2. Find the membership row and change the status to **Cancelled** or **Expired**.

See [Suspending & Cancelling](/guide/members/suspending-and-cancelling) for the full flow.

## When a Refund Is Rejected

A refund attempt is blocked before it reaches the gateway if:

- The transaction isn't a successful charge or renewal (refunds, for example, can't be refunded again).
- The transaction has no refundable amount left (it's already been fully refunded).
- The transaction's payment method isn't a gateway that supports refunds from this screen.

If the request reaches the gateway and it declines the refund, common reasons include:

- **Charge too old**: Most banks and PayPal limit refunds to a window after the original charge (Stripe: typically 120 days).
- **Dispute in progress**: A chargeback is already open on this charge.
- **Insufficient balance**: Your Stripe or PayPal account balance is too low to fund the refund.

When the gateway rejects the refund, the error message is shown and no refund transaction is created; the original transaction is unchanged.

::: warning Refunds do not sync automatically in every direction
If you issue a refund directly in the Stripe or PayPal dashboard (outside Fluent Members), the transaction record here will not update automatically unless the corresponding refund webhook is configured. Always refund through Fluent Members when possible, or make sure your gateway's webhook is set up correctly. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup](/guide/settings/payment-settings/paypal-setup).
:::
