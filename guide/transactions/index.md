# Transactions List

::: info Part of Chain 2: Buy & onboard · step 3 of 6
**Previously:** [Pricing: Paywalls](/guide/levels/pricing-paywalls)
**Next:** [Email Notifications](/guide/settings/email-configuration/email-notifications)

**Also part of:** Chain 7: Recurring renewal (Pro) (step 3 of 4) · Chain 9: Refund (step 1 of 5)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
The Transactions screen ships only with Fluent Members Pro. The wp-admin top nav shows **Transactions** alongside Dashboard / Levels / Access Groups / Members only when Pro is active.
:::

The **Transactions** screen is your ledger, one row per billing event (initial charge, renewal charge, refund). Use it to confirm money moved, find a specific charge by ID, or refund a payment.

**Here's what you'll learn:**
- How to open Transactions.
- The five filter tabs.
- The columns and what each tells you.
- What the empty state means.

**Before we start:** Pro plugin is active and at least one membership has been purchased.

---

## Step 1: Open Transactions

In wp-admin top nav, click **Transactions** (visible only with Pro). You land on a paginated list of every transaction the plugin knows about.

If no purchases have been made yet, the empty state reads *"No Transactions Found"* with a friendly icon.

![Transactions screen empty state](/screenshots/transactions-empty.webp)

---

## The five tabs

The tab bar at the top filters by transaction status:

| Tab          | Shows                                                  |
|--------------|--------------------------------------------------------|
| **All**      | Every transaction, regardless of status.              |
| **Succeeded**| Successful charges, money landed in your account.    |
| **Pending**  | Payments waiting for confirmation (e.g. 3DS in flight).|
| **Failed**   | Charges that didn't succeed (declined, expired card). |
| **Refunded** | Charges where some or all amount was returned.        |

---

## The columns

| Column            | What it shows |
|-------------------|---------------|
| **ID**            | Transaction row ID. Reference this in support emails. |
| **User**          | Member's display name and email. |
| **Level**         | Which Level the payment was for. |
| **Type**          | `charge`, `renewal`, or `refund`. |
| **Amount**        | The amount of this transaction (positive, refunds are positive too, just classed as `refund` type). |
| **Status**        | `succeeded`, `pending`, `failed`, `refunded`. |
| **Payment Method**| `Stripe`, or whatever paywall integration drove this. |
| **Date**          | When the event happened, in your site's timezone. |

Click any row to open the transaction's detail panel (1.0 shows the same fields in a side drawer; future versions add refund history).

---

## Where transactions come from

Transactions are written automatically:

- **Native Payment (Stripe):** Every Stripe webhook event lands here.
- **Paywall integrations (FluentCart, WC, etc.):** Their successful-payment hooks create Transaction rows so you have one ledger across all sources.
- **Refunds:** When you click Refund on a row, or when Stripe sends a `charge.refunded` event.

::: tip In plain language
Transactions is the *money* table; Members is the *people* table. One member can have many transactions (initial + renewals + refunds), and one transaction always points at one member.
:::

---

## How transactions tie to members

Every transaction is linked to:

- A **member** (the WordPress user who paid).
- A **membership row** (the specific Level they bought).
- For renewals: the **subscription** that triggered the charge.
- For refunds: the **parent transaction** that's being refunded.

From a transaction row you can jump to the member's [Detail](../members/detail) page (click the User column).

---

## Searching

The search icon opens a search field, filter by user name, email, or transaction ID. Search applies within the current tab.

---

## A real example: Sara reconciles last month

It's the first of the month. Sara:

1. Opens **Transactions → Succeeded**.
2. Filters by Date (UI is limited in 1.0, she scrolls to last month's range).
3. Tallies the total to confirm her Stripe payout matches.
4. Switches to **Refunded** to see how many returns happened, useful for her support metrics.

Two screens, no spreadsheet export required.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Transactions tab is missing | You're on free; only Pro adds this. | Install Fluent Members Pro. |
| Empty list even after a recent Stripe charge | Webhook URL not configured in Stripe. | See [Stripe Setup → webhooks](/guide/settings/payment-settings/stripe-setup). |
| Renewal charges don't appear | `invoice.paid` webhook isn't subscribed. | Add it in Stripe webhooks. |
| Duplicate rows for the same charge | Webhook delivered twice; the de-dup didn't catch it (rare). | Open both rows and verify, usually one is `pending`, one is `succeeded`. |
| Old paywall purchases (pre-Pro install) don't appear | Transactions are written from the moment Pro is active. | Imported via migration, see [Stripe Import Bridge](/guide/settings/migration/), would have populated history. |

---

## What's next?

- **→ [Filters & Search](./filters-and-search)**: narrow the list to what you're looking for.
- **→ [Refunds](./refunds)**: the refund workflow.

**Recommended reading:**
- [Stripe Setup](/guide/settings/payment-settings/stripe-setup): the source of most Transactions data.
- [Subscription Cancellation Modes](./cancellation-modes): what happens when a member cancels.
