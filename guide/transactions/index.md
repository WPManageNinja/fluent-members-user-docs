# Orders

**Orders** is the Pro billing hub. It replaces the old flat Transactions ledger with two focused views: **Subscriptions** for recurring billing and **One-Time Purchases** for single, non-recurring purchases. Every payment, refund, and status change lives inside the record it belongs to instead of one long combined list.

> [!Note]
> Orders is only available with Fluent Members Pro. The **Orders** link appears in the top navigation only when Pro is active.

## Access Orders

In your WordPress admin, go to **Fluent Members → Orders** using the top navigation bar. Orders opens two sub-views:

- **[Subscriptions](/guide/transactions/subscriptions)**: recurring memberships, native (Stripe, PayPal) or migrated from PMPro, MemberPress, or Kadence Memberships.
- **[One-Time Purchases](/guide/transactions/one-time)**: memberships bought once, with no recurring billing behind them, manual grants, migrated one-off orders, and single native or paywall-integration purchases.

## Why Two Views Instead of One List

A subscription and a one-time purchase behave differently: a subscription can be cancelled or renewed and has a next billing date, a one-time purchase has neither. Splitting them means each view only shows the columns and actions that actually apply, instead of a single table full of blank cells.

## Where Transaction History Went

There's no longer a standalone Transactions screen. Every charge, renewal, and refund is now shown inside the **Transaction History** panel on that record's detail page, alongside a **Timeline** that merges billing events with subscription lifecycle events (created, trial ended, cancelled, expired) into one reverse-chronological feed. Open any row in Subscriptions or One-Time Purchases to see it.

## Issuing a Refund

Refunds are still issued per-transaction, from inside a Subscription's or a One-Time Purchase's detail view. Open the record, find the transaction in its Transaction History panel, and use the refund action on that row. See [Refunds](/guide/transactions/refunds) for the complete walkthrough.

::: warning Refunds do not change membership status
Issuing a refund does not automatically expire or cancel the member's access. If you want to revoke access, update the member's status manually. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).
:::

## Where Orders Come From

Orders (and the transactions behind them) are written automatically, you do not create them manually:

- **Stripe or PayPal native checkout (Pro)**: every webhook event (charge, renewal, refund) creates or updates the underlying transaction record.
- **Paywall integrations (FluentCart, WooCommerce, Fluent Forms, Paymattic)**: successful payment hooks write a transaction so all sources appear in the same views.
- **Migration**: importing from PMPro, MemberPress, or Kadence Memberships carries over historical orders, subscriptions, and transactions.
- **Manual grants**: memberships an admin adds by hand from the Members screen appear under One-Time Purchases with no payment attached.

## How Orders Relate to Members

Every subscription and one-time purchase is linked to a member, a Membership Level, and, on the detail page, that member's other memberships and lifetime value. Open the **Member** column on any row to jump to that member's detail page.

::: tip No orders after a recent Stripe or PayPal charge?
The most common cause is a missing or misconfigured webhook. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup](/guide/settings/payment-settings/paypal-setup).
:::
