---
title: "Billing (Pro)"
description: "Find every subscription and one-time membership on your site, with the payments, refunds and activity behind each one."
---

# Billing (Pro)

The **Billing** (Pro) section is your central hub for tracking member payments. It splits your records into recurring subscriptions and one-time memberships, and each record holds its own payment history, refunds and activity. Use it to check a payment, issue a refund or cancel a subscription.

> [!Note]
> The **Billing** menu only appears when Fluent Members Pro is active.

## Find your subscriptions and one-time records

Point at **Billing** in the top navigation and choose a list:

- **[Subscriptions](/docs/billing/subscriptions):** recurring memberships billed by Stripe or PayPal, carried over from a migration, or [billed by another plugin](/docs/billing/provider-subscriptions).
- **[One-time](/docs/billing/one-time):** memberships with no recurring billing behind them, such as single payments and memberships you add by hand.

Each list has its own status tabs, search and columns. See [Filter & Search](/docs/billing/filters-and-search).

![Screenshot of the Billing menu open in the top navigation, showing Subscriptions and One-time](/images/billing/index/billing-menu.webp)

## View a record's history

Click a row to open the full record. There is no separate transactions screen, so each record keeps its history in one place:

- **Transaction History:** every charge, renewal and refund. The panel is hidden when the record has no transactions.
- **Activity:** a timeline of events, such as the record's creation, successful or failed payments and refunds.
- **Member Information:** the member's name and email, a **WP User #** link to their member page and **Member Since**.
- **Membership Information:** the level and any other memberships the member holds.

## Refund or cancel from a record

The **More actions** button holds what applies to the record:

| Action | Available on | Result |
|---|---|---|
| **Refund** | Records with a refundable payment | Opens the refund dialog. See [Refunds](/docs/billing/refunds). |
| **Cancel Subscription** | Subscriptions billed through Stripe or PayPal | Opens the cancel dialog. See [Cancel a Subscription](/docs/billing/cancelling-a-subscription). |
| **Cancel Membership** | One-time memberships | Cancels the membership after a confirmation. See [One-time Memberships](/docs/billing/one-time). |

> [!Note]
> Subscriptions billed by another plugin, such as FluentCart or WooCommerce, have no **More actions** button. An **Open in** button takes you to that plugin instead. When a cancel is needed, the member's page can often do it for you. See [Subscriptions From Other Plugins](/docs/billing/provider-subscriptions).

## Test payments

Test payments carry a **Test** badge. Both lists show live and test records together, so check the badge before you act on a record.

## How records are created

Records are created for you. You do not add them on this screen:

- **Stripe and PayPal checkout:** each payment and webhook event updates the record. If a recent payment is missing, check the webhook in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) or [PayPal Setup](/docs/settings/payment-settings/paypal-setup).
- **Other plugins:** FluentCart, WooCommerce, Fluent Forms and Paymattic purchases that grant a membership appear in one of the two lists.
- **Migration:** subscriptions and one-time purchases imported from Paid Memberships Pro, MemberPress or Kadence Memberships keep their source as the **Gateway**.
- **Manual memberships:** memberships you [add by hand](/docs/members/adding-manually) appear under **One-time** with the gateway **Manual**.
- **Free levels:** memberships from a [free level](/docs/levels/free-levels) take no payment and do not appear in either list.

When a cancellation leaves a subscription active at the payment gateway, a notice appears on the member's page. See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).
