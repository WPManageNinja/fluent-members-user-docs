---
title: "Billing (Pro)"
description: "Find every subscription and one-time membership on your site, with the payments, refunds and activity behind each one."
---

# Billing (Pro)

**Billing** (Pro) is where you look up what members pay. It splits your records into recurring subscriptions and one-time memberships, and each record holds its own payments, refunds and activity. Use it to check a payment, issue a refund or cancel a subscription.

> [!Note]
> The **Billing** menu only appears when Fluent Members Pro is active.

## Open Billing

Go to **Fluent Members → Billing**. Point at **Billing** in the top navigation to choose a list:

![Screenshot of the Billing menu open in the top navigation, showing Subscriptions and One-time](/images/billing/index/billing-index-nav.webp)

- **[Subscriptions](/docs/billing/subscriptions):** recurring memberships billed by Stripe or PayPal, carried over from a migration, or [billed by another plugin](/docs/billing/provider-subscriptions).
- **[One-time](/docs/billing/one-time):** memberships with no recurring billing behind them, such as single payments and memberships you add by hand.

Each list has its own status tabs, search and columns. See [Filter & Search](/docs/billing/filters-and-search).

## What each record shows

Click any row to open its record. There is no separate transactions screen. Each record keeps its own history:

- **Transaction History:** every charge, renewal and refund for that record. The panel is hidden when the record has no transactions.
- **Activity:** a timeline of events such as the record being created, payments succeeding or failing, and refunds being issued.
- **Member Information:** the member's name and email, with a **Wp User** link that opens their member page.
- **Membership Information:** the level, its Access Groups, and any other memberships the member holds.

## What you can do from a record

The **More Actions** button holds the actions that apply to the record:

| Action | Available on | Result |
|---|---|---|
| **Refund** | Subscriptions and one-time memberships with a refundable payment | Opens the refund dialog. See [Refunds](/docs/billing/refunds). |
| **Cancel Subscription** | Subscriptions billed through Stripe or PayPal | Opens the cancel dialog. See [Cancel a Subscription](/docs/billing/cancelling-a-subscription). |
| **Revoke Membership** | One-time memberships | Cancels the membership. See [One-time Memberships](/docs/billing/one-time). |

Subscriptions billed by another plugin have no **More Actions** button. You manage those in that plugin.

## Where records come from

Records are created for you. You do not add them on this screen:

- **Stripe and PayPal checkout:** each payment and webhook event updates the record. If a recent payment is missing, check the webhook in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) or [PayPal Setup](/docs/settings/payment-settings/paypal-setup).
- **Other plugins:** FluentCart, WooCommerce, Fluent Forms and Paymattic purchases that grant a membership appear in one of the two lists.
- **Migration:** subscriptions and one-time purchases imported from Paid Memberships Pro, MemberPress or Kadence Memberships keep their source as the **Gateway**.
- **Manual memberships:** memberships you [add by hand](/docs/members/adding-manually) appear under **One-time** with no payment attached.
