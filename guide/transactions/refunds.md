# Refunds

You can issue a full or partial refund on any paid Stripe transaction directly from the Fluent Members admin. The refund calls the Stripe API, records a refund transaction row, and marks the original transaction as refunded.

> [!Note]
> Refunds work only for charges made through native Stripe payments. Charges from FluentCart, WooCommerce, Fluent Forms, or Paymattic must be refunded in their respective plugins.

## Find the Transaction

Open **Fluent Members → Transactions**, switch to the **Paid** tab, and locate the row. Use the search field to filter by member name, email, or transaction ID. See [Filters & Search](/guide/transactions/filters-and-search).

You can also initiate a refund from a member's detail page open **Members**, find the member, and use the action menu on their membership row.

## Issue the Refund

1. Click the action menu on the transaction row.
2. Click **Refund**.
3. Enter the amount to refund. Leave it at the original amount for a full refund, or enter a lower value for a partial refund.
4. Add an optional **Payment Note** stored internally on the refund row, not sent to the member.
5. Click **Confirm**.

Fluent Members calls the Stripe API, records a new transaction row with type `refund`, and updates the original transaction's status to `refunded`.

## Full vs Partial Refunds

| | Full refund | Partial refund |
|---|---|---|
| Amount | Equal to original charge | Less than original charge |
| Original transaction status after | `refunded` | `partially_refunded` |
| Can refund again? | No | Yes — until total refunds equal the original amount |
| Stripe shows | Charge fully refunded | Partial refund on the charge |

## Refunds and Membership Access

Issuing a refund does **not** cancel or expire the member's access. Fluent Members returns the money via Stripe but leaves the membership row unchanged.

If you want to revoke access after refunding, update the member's status manually:

1. Go to **Members** and open the member's detail page.
2. Find the membership row and change the status to **Cancelled** or **Expired**.

See [Suspending & Cancelling](/guide/members/suspending-and-cancelling) for the full flow.

## When Stripe Rejects a Refund

Stripe may decline a refund for these reasons:

- **Charge too old** — most banks limit refunds to 120 days from the original charge
- **Dispute in progress** — a chargeback is already open on this charge
- **Insufficient Stripe balance** — your Stripe account balance is too low to fund the refund

When Stripe rejects, the modal shows the error message. No refund row is created and the original transaction is unchanged.

::: warning Stripe-side refunds do not sync automatically
If you issue a refund directly in the Stripe Dashboard (outside Fluent Members), the transaction row in Fluent Members will not update automatically unless the `charge.refunded` webhook is configured. Always refund through Fluent Members when possible, or ensure your Stripe webhook is set up correctly. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).
:::
