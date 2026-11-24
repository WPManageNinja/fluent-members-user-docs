---
title: "Refunds (Pro)"
description: "Refund a Stripe or PayPal payment from Fluent Members, understand what a full or partial refund does to access, and handle payments you must refund at the gateway."
---

# Refunds (Pro)

**Refunds** (Pro) send money back through Stripe or PayPal without leaving your site. Issue one when a member asks for their money back, or when a payment was charged in error. A full refund of any one payment also ends the member's access.

Refunds here work on Stripe and PayPal payments only. Payments made through FluentCart, WooCommerce, Fluent Forms or Paymattic are [refunded in those plugins](/docs/billing/provider-subscriptions).

## Issue a refund

1. Go to **Fluent Members → Billing** and open the subscription or one-time membership.
2. Click **More actions → Refund**. The **Refund Payment** dialog opens.
3. Fill in the fields and click the refund button.

![Screenshot of the Refund Payment dialog with Refund Amount, Refund Reason, Refund Note and the full refund notice](/images/billing/refunds/refund-dialog.webp)

You can also open the same dialog from the three-dot menu on a membership in the [member's page](/docs/members/detail).

The dialog has these fields:

| Field | Notes |
|---|---|
| **Refund Transaction** | Choose which payment to refund. Each option reads like **Initial Payment**, **Renewal Payment**, then its date and refundable amount. Appears when there is more than one option. |
| **Refund Amount** | Starts at the most you can refund. **Maximum refundable** under the field shows the limit. Lower the amount for a partial refund. |
| **Refund Reason** | Required. Choose **Requested by customer** (default), **Duplicate**, **Fraudulent** or **Other**. **Other** sends no reason to the gateway and makes the note required. |
| **Refund Note** | Optional, except with **Other**, where it must explain the refund. |

As you type an amount, a notice under the form tells you the result. A lower amount shows "This is a partial refund. The member keeps their access." The full amount shows "This is a full refund. It normally cancels the membership and ends this member's access immediately." On a team plan it adds that team members lose access too. The button changes to match, for example **Full Refund $29.00** or **Refund $10.00**. **Cancel** closes the dialog without refunding.

## What happens after you refund

A new row appears in **Transaction History** and the **Activity** timeline shows **Refund issued**. The original payment row stays as it was, and the amount you can still refund goes down.

| | Full refund | Partial refund |
|---|---|---|
| New row type | **Refund** | **Partial refund** |
| New row status | **Refunded** | **Partially refunded** |
| Subscription | Cancelled immediately | Keeps running |
| Membership | Cancelled | Keeps its access |

> [!Note]
> "Full" means the whole amount of that one payment, not of the subscription. Refunding all of a single renewal cancels the whole subscription immediately and ends access. To return one month's payment and keep the membership running, enter a lower amount. Refunding the last remainder after a partial refund also counts as a full refund.

A partial refund leaves the rest of the payment refundable, so you can refund again later. If you want to end access after a partial refund, [cancel the subscription](/docs/billing/cancelling-a-subscription) or [cancel the membership](/docs/billing/one-time).

If the gateway reports the refund as still processing, the new row shows **Pending** until the gateway confirms it. Access stays unchanged until then.

The **Refund Issued** [email notification](/docs/settings/email-configuration/email-notifications) is on by default, so the member gets an email when the refund is processed.

If a full refund goes through but the subscription cannot be cancelled, the member keeps access and Fluent Members logs "Refunded membership needs review". Cancel the subscription yourself. Refunds of payments imported from another membership plugin do not cancel anything automatically.

## When a refund is rejected

Fluent Members blocks the refund before contacting the gateway if:

- The transaction is not a **Paid** charge or renewal.
- The gateway does not support refunds from here.
- The payment has no gateway reference to refund against.
- Nothing is left to refund on the payment, or the amount is zero or more than what remains.
- Another refund on the same payment is still in progress.

If the gateway itself declines, you see its error message. Fluent Members saves a **Failed** refund row with the gateway's message, and the original payment can still be refunded.

## Payments you must refund at the gateway

Some payments cannot be refunded from Fluent Members, such as payments imported from another plugin and PayPal subscriptions imported from another plugin. These payments show **Refund in Stripe** or **Refund in PayPal** in a **Refund** column in **Transaction History**. When every payment on a record is like this, the dialog lists them with the same label and no refund button.

<!-- TODO(screenshot): refunds-2
  screen: Billing → Subscriptions → an imported subscription
  state: Transaction History with the Refund column showing Refund in PayPal or Refund in Stripe
  data: a subscription migrated from another plugin with an imported payment
  highlight: Refund in PayPal label
  view: admin
  alt: Screenshot of Transaction History with a Refund in PayPal label on an imported payment
  reason: the local site has no imported payments without a gateway reference
-->

Refund these in your Stripe or PayPal account. A PayPal refund made there is recorded in Fluent Members when PayPal reports it.

## Refunds made in Stripe or PayPal

Refunds you issue in the gateway's own dashboard reach Fluent Members through webhooks. Stripe sends `charge.refunded` and `charge.refund.updated`, and PayPal sends its refund events. Make sure the webhook is set up in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) or [PayPal Setup](/docs/settings/payment-settings/paypal-setup), or these refunds will not appear in **Transaction History**.
