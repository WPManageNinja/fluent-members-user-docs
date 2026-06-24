# Refunds

::: info Part of Chain 4: Day-to-day admin · step 5 of 6
**Previously:** [Suspending & Cancelling](/guide/members/suspending-and-cancelling)
**Next:** [What Members See](/guide/members/portal/what-members-see)

**Also part of:** Chain 9: Refund (step 3 of 5)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
Refunds work only for charges made through Native Payment (Stripe). Refunds for FluentCart, Fluent Forms, or Paymattic happen in their respective plugins.
:::

Reversing a payment is a few clicks: open the transaction, click **Refund**, decide full or partial, decide whether to also cancel the membership. This page is the practical walkthrough plus the edge cases.

**Here's what you'll learn:**
- Where the Refund button lives.
- The Refund modal's fields.
- Full vs partial refunds.
- The "also cancel membership" option.
- What happens server-side and on Stripe.

**Before we start:** You're on Fluent Members Pro with Stripe connected, and a Succeeded transaction exists.

::: warning Screenshot pending
A refund-modal screenshot isn't in our reference folder yet. The walk below describes what the UI shows.

[Screenshot needed: Transactions screen, refund modal open with amount input + "also cancel membership" toggle]
:::

---

## Step 1: Find the transaction

Open [Transactions](./) and use [Filters & Search](./filters-and-search) to find the row. The Refund action lives behind the row's kebab (⋮).

You can also open a refund from a [Member Detail](../members/detail) page, the kebab on the matching membership row offers **Refund** directly when a linked transaction exists.

---

## Step 2: Open the Refund modal

Click **Refund** in the kebab menu. The modal opens with three fields:

| Field | Notes |
|-------|-------|
| **Amount** | Pre-filled with the original charge amount. Editable down to any positive value ≤ original. |
| **Payment note** | Internal note. Stored on the new refund transaction; not sent to the member. |
| **Also cancel membership** | Checkbox. If ticked, the linked membership row flips to `Cancelled` after the refund succeeds. |

::: tip In plain language
*Full refund* = leave Amount at the original. *Partial refund* = lower the Amount. *Cancel the membership* = tick the checkbox; usually paired with full refunds, occasionally with partials when you're closing out a long-term relationship.
:::

---

## Step 3: Confirm

Click **Refund**. Behind the scenes:

1. Fluent Members calls Stripe to refund the amount. Stripe returns success (or an error).
2. A new transaction row is created with Type `refund`, Status `succeeded`, Amount = the refund amount, `parent_transaction_id` = the original.
3. The original transaction's Status flips to `refunded` (full refund) or `partially_refunded` (partial).
4. If "Also cancel membership" was ticked, the linked membership row flips to `Cancelled`. Stripe is told to stop the subscription if there is one.
5. If "Also cancel membership" was ticked, the lifecycle action `fluent_members/membership_cancelled` fires so CRM and analytics can react. There is no global `refund_processed` action in 1.0. Integrations that want to detect every refund regardless of gateway should watch the Transactions table for new rows where `type='refund'`, or hook the per-gateway dispatcher `fluent_members/refund_payment_stripe`.

You see a success toast: *"Refund processed successfully."*

---

## Full vs partial refunds

| | **Full** | **Partial** |
|---|---|---|
| When to use | The buyer is leaving, money back in full. | A pro-rated refund (e.g. cancellation mid-period). |
| Amount field | Leave at original. | Lower it. |
| What Stripe shows | Charge refunded. | Partial refund recorded; original charge stays "succeeded, partially refunded". |
| Original transaction status | `refunded` | `partially_refunded` |
| Can you refund again? | No. | Yes, until the total of refunds equals the original. |

::: warning You can refund multiple times
A partial refund leaves room for another partial. The modal will show the remaining refundable amount on the next attempt.
:::

---

## What about the membership?

By default, refunding doesn't end the membership, Stripe takes money back, but the member still has access. That's intentional: sometimes you refund a partial without ending the relationship.

To also end access, tick **Also cancel membership** in the modal. The plugin will:

- Flip the membership row to `Cancelled`.
- Cancel the Stripe subscription (immediate, regardless of your global cancellation-mode setting).
- Cascade to children if this was a corporate parent.

---

## What if Stripe rejects the refund?

Reasons Stripe might say no:

- Charge is too old (some banks limit refunds to ~120 days).
- The original payment was disputed (chargeback in flight).
- Your Stripe account doesn't have enough balance to fund the refund.

In all those cases, the modal shows Stripe's error message. The original transaction stays unchanged; no refund row is created.

---

## A real example: Sara refunds Mike one month

Mike emails: *"I forgot to cancel, please refund me one month and end the subscription."*

Sara:

1. Opens [Members](../members/) → searches Mike → opens his detail.
2. On the Active Pro Yoga row, kebab → **Refund**.
3. Modal opens with Amount pre-filled at $19. She leaves it.
4. Payment note: "Sara approved 6/17, user request, late notice."
5. Ticks **Also cancel membership**.
6. Clicks **Refund**.

Mike's $19 goes back to his card within a few business days. His membership flips to `Cancelled`. Sara sees a refund transaction row in Transactions; Mike sees `Cancelled` in his portal.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Refund button missing on a row | Transaction wasn't a Native Payment charge, or status is already refunded. | Refund in the host plugin (for paywalls), or note it's already refunded. |
| Modal shows "Maximum refundable: $X" lower than original | Partial refunds already applied. | Refund the remaining amount only. |
| Refund succeeds but membership still Active | "Also cancel membership" wasn't ticked. | Cancel separately via the kebab. |
| Stripe rejects with "charge_already_refunded" | A duplicate click submitted twice. | Refresh; the refund did go through. |

---

## What's next?

- **→ [Subscription Cancellation Modes](./cancellation-modes)**: control how subscriptions end (immediate vs end-of-period).
- **→ [Filters & Search](./filters-and-search)**: find specific transactions quickly.

**Recommended reading:**
- [Stripe Setup](/guide/settings/payment-settings/stripe-setup): make sure webhooks are set so Stripe-side refunds also sync here.
- [Suspending & Cancelling](../members/suspending-and-cancelling): the non-refund way to end an admin's relationship with a member.
