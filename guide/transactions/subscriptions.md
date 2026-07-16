# Subscriptions

The **Subscriptions** view lists every recurring membership on your site, native Stripe and PayPal subscriptions, plus subscriptions carried over from a PMPro, MemberPress, or Kadence Memberships migration.

## Access Subscriptions

Go to **Fluent Members → Orders → Subscriptions**.

## Columns

- **Member**: The subscriber's avatar, display name, and email address.
- **Level**: The Membership Level the subscription is for.
- **Amount**: The recurring charge amount and billing interval (for example, `$29.00 / month`).
- **Status**: A status badge, see [statuses](#subscription-statuses) below.
- **Next Billing**: The date of the next scheduled charge. Blank for cancelled or expired subscriptions.
- **Total Paid**: The sum of every successful charge and renewal collected on this subscription so far.

Click any row to open the subscription's detail page.

## Subscription Statuses

| Status | Meaning |
|---|---|
| `pending` | Created but the first payment has not yet been confirmed |
| `incomplete` | Initial payment attempt did not complete |
| `trialing` | Inside a free trial window |
| `active` | Billing normally |
| `past_due` | A renewal charge failed; the gateway is retrying |
| `unpaid` | Renewal retries were exhausted without success |
| `canceled` | Ended, by the member, an admin, or the gateway |
| `expired` | Ended without a successful cancellation flow |
| `failed` | The subscription could not be created |

## Filtering and Sorting

Filter the list by **Status** or by **Provider** (Stripe, PayPal, PMPro, MemberPress, or Kadence Memberships), and sort by next billing date, total paid, start date, or status. See [Filters & Search](/guide/transactions/filters-and-search) for the full walkthrough.

## The Subscription Detail Page

Opening a subscription shows:

- **Subscription info**: status, provider, recurring amount, billing interval, next billing date, trial end date (if any), and, for a subscription already scheduled to cancel, the date access ends.
- **Member info**: the subscriber's profile plus their lifetime value across every subscription they hold and a short list of their other memberships.
- **Membership info**: the Membership Level, its Access Groups, and, for a corporate parent, the seat count.
- **Transaction History**: every charge, renewal, and refund tied to this subscription, newest first.
- **Timeline**: subscription lifecycle events (created, trial ended, cancelled, expired) merged with the transaction history into a single reverse-chronological feed.

## Managing a Subscription

The actions available depend on how the subscription is billed:

| Action | Native Stripe | Native PayPal | Migrated (PMPro / MemberPress / Kadence Memberships) |
|---|:---:|:---:|:---:|
| Cancel | ✅ | ✅ | ❌ |
| Renew (retry a failed payment) | ✅ | ✅ | ❌ |
| Update payment method | ✅ | ❌ | ❌ |

Migrated subscriptions are shown for record-keeping (their status, billing history, and next billing date still display) but aren't connected to a live gateway from this screen, so they can't be cancelled or renewed here. Manage them from the original provider, or through Fluent Members' membership status controls, see [Suspending & Cancelling](/guide/members/suspending-and-cancelling).

::: tip Cancelling
Cancelling a subscription can take effect immediately or at the end of the current billing period, depending on the cancellation mode you choose. See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).
:::

::: tip Refunding a charge on this subscription
Open the transaction in the Transaction History panel and use its refund action. See [Refunds](/guide/transactions/refunds).
:::
