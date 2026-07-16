# One-Time Purchases

The **One-Time Purchases** view lists every membership on your site that isn't tied to a recurring subscription, single native or paywall-integration purchases, admin-added members, and orders carried over from a migration.

## What Counts as One-Time

A membership shows up here when it has no subscription record behind it. That covers:

- A one-time Stripe or PayPal charge (no recurring billing set up on the pricing plan).
- A purchase through FluentCart, WooCommerce, Fluent Forms, or Paymattic that used a one-time price.
- A membership imported from PMPro, MemberPress, or Kadence Memberships that wasn't a recurring subscription there either.
- A membership an admin added manually from the Members screen with no payment attached.

Corporate parent memberships and their seats are never listed here, they're managed from [Corporate Memberships](/guide/levels/corporate-memberships) instead.

## Access One-Time Purchases

Go to **Fluent Members → Orders → One-Time Purchases**.

## Columns

- **Member**: The buyer's avatar, display name, and email address.
- **Level**: The Membership Level the purchase was for.
- **Amount**: The amount paid. Blank for manually added memberships with no payment.
- **Status**: The membership's status, `active`, `expired`, `cancelled`, `suspended`, `pending`, or `trial`. See [Status Reference](/guide/members/statuses).
- **Purchased**: The date the membership was created.

Click any row to open its detail page.

## Filtering and Sorting

Filter by **Status** or by **Provider** (Stripe, PayPal, FluentCart, WooCommerce, Fluent Forms, Paymattic, PMPro, MemberPress, Kadence Memberships, or Manual), and sort by purchase date, amount, or status. Search matches the member's name or email address. See [Filters & Search](/guide/transactions/filters-and-search).

## The Detail Page

Opening a one-time purchase shows:

- **Record info**: status, provider, whether it was a paid or manual grant, and whether the payment is still refundable.
- **Member info**: the buyer's profile.
- **Membership info**: the Membership Level and its Access Groups.
- **Transaction History**: the payment (and any refund) tied to this membership.
- **Timeline**: the purchase and any refund events, newest first.

## Refunding a One-Time Purchase

One-time purchases have no cancel or renew action, there's no subscription to act on. To return the member's money, open the transaction in the Transaction History panel and use its refund action. See [Refunds](/guide/transactions/refunds).

::: warning A refund does not revoke access
Refunding a one-time purchase does not automatically change the membership's status. If you want to end their access, update the status manually. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).
:::
