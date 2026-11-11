---
title: "Billing (Pro)"
description: "Find every subscription and one-time membership on your site, with the payments, refunds and activity behind each one."
---

# Billing 

The **Billing** (Pro) section is your central hub for tracking member payments. It organizes your financial records into recurring subscriptions and one-time memberships, with each record holding its own payment history, refunds, and activity logs. You can use this area to check on a payment, issue a refund, or cancel a subscription.

> [!Note]
> The **Billing** menu only appears when Fluent Members Pro is active.

## Find your subscriptions and one-time records

Go to **Fluent Members → Billing**. Point at **Billing** in the top navigation to choose a list:

- **[Subscriptions](/docs/billing/subscriptions):** recurring memberships billed by Stripe or PayPal, carried over from a migration, or [billed by another plugin](/docs/billing/provider-subscriptions).
- **[One-time](/docs/billing/one-time):** memberships with no recurring billing behind them, such as single payments and memberships you add by hand.

Each list has its own status tabs, search and columns. See [Filter & Search](/docs/billing/filters-and-search).

![Screenshot of the Billing menu open in the top navigation, showing Subscriptions and One-time](/images/billing/index/billing-index-nav.webp)

## Viewing a Record's History

Click on any row to open the complete details for that specific record. There is no separate transactions screen; instead, each record maintains its own comprehensive history in one place:

 * **Transaction History:** Displays every charge, renewal, and refund. (Note: This panel remains hidden if the record has no transactions).
 * **Activity:** A chronological timeline of events, including the record's creation, successful or failed payments, and issued refunds.
 * **Member Information:** Displays the member's name, email, start date ("Member Since"), and a link to their WordPress user profile.
 * **Membership Information:** Details the specific Level, its connected Access Groups, and any other memberships the user holds.

## Refund or cancel from a record

The **More Actions** button holds the actions that apply to the record:

| Action | Available on | Result |
|---|---|---|
| **Refund** | Subscriptions and one-time memberships with a refundable payment | Opens the refund dialog. See [Refunds](/docs/billing/refunds). |
| **Cancel Subscription** | Subscriptions billed through Stripe or PayPal | Opens the cancel dialog. See [Cancel a Subscription](/docs/billing/cancelling-a-subscription). |
| **Cancel Membership** | One-time memberships | Cancels the membership. It is greyed out once the record is cancelled. See [One-time Memberships](/docs/billing/one-time). |

> [!Note]
> Subscriptions billed by another payment plugin (like WooCommerce or FluentCart) will not have a "More Actions" button. Instead, you will see an Open in [Plugin] button, which takes you directly to that specific plugin's dashboard to manage the billing.

## How Records Are Created

Records are created for you. You do not add them on this screen:

- **Stripe and PayPal checkout:** Each payment and webhook event updates the record. If a recent payment is missing, check the webhook in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) or [PayPal Setup](/docs/settings/payment-settings/paypal-setup).
- **Other plugins:** FluentCart, WooCommerce, Fluent Forms and Paymattic purchases that grant a membership appear in one of the two lists.
- **Migration:** Subscriptions or one-time purchases imported from platforms like Paid Memberships Pro, MemberPress, or Kadence will retain their source as the **Gateway**.
- **Manual memberships:** Memberships you [add by hand](/docs/members/adding-manually) from the backend will appear under the "One-time" list without a payment attached.
