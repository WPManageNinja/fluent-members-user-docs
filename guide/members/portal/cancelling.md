# Cancelling a Membership

The member-driven cancel flow. Members click a button, confirm, and they're out. This page is what your support team will quote when someone emails *"how do I cancel?"*.
**Here's what you'll learn:**
- The single button members use to cancel themselves.
- What happens at the provider when they cancel.
- The two cancellation modes (immediate vs end-of-period).
- What the member sees afterwards, and whether they can come back.

**Before we start:** The member is signed in to your site and the [Member Portal page](./setup) is reachable.

---

## Step 1: Member opens the portal

The member visits the URL with `[fluent_member_portal]` on it. They see their card for the membership they want to cancel, Status badge, dates, amount, and a **Cancel Membership** button (visible only when status is `Active` or `Trial`).

---

## Step 2: Member clicks Cancel Membership

A confirmation modal opens. The exact copy depends on your [cancellation mode](/guide/transactions/cancellation-modes):

| Mode | Modal copy |
|---|---|
| **Immediate** | *"Are you sure? You'll lose access right away."* |
| **End of period** | *"Are you sure? Your access continues until [expiry date], then ends."* |

They click **Confirm Cancellation**.

---

## Step 3: What happens server-side

The plugin runs through this sequence:

1. **Local status flip.** The membership row's status goes to `Cancelled`. The portal card updates in place.
2. **Provider sync (if applicable).** If the membership is on Native Payment (Stripe), the plugin tells Stripe to cancel the subscription using the configured mode.
3. **Cascade to children (corporate parents only).** Every sub-member's row flips to `Cancelled`.
4. **Action fires.** `fluent_members/membership_cancelled` runs, so [FluentCRM](/guide/settings/email-configuration/email-notifications) or other integrations can react.

::: tip In plain language
For most setups it's one click → access ends. The provider-side cancel keeps Stripe (or whoever) from billing again.
:::

---

## Immediate vs End of period

The two cancellation modes have different semantics:

| | **Immediate** | **End of period** |
|---|---|---|
| Local status flip | Now | Now |
| Access revoked | Now | Not yet, at next renewal |
| Stripe behaviour | Cancel now | `cancel_at_period_end=true` |
| When the cron flips Expired | n/a, already Cancelled | At the original `expires_at` |

End-of-period is the friendlier option for paying customers, they keep what they paid for. Immediate is simpler for "they want out now, no refund" cases.

::: warning End-of-period status stays "Active" locally
With End-of-period mode, the local row keeps `Active` status until Stripe fires `customer.subscription.deleted` at the period boundary. Members see "Cancelled" on their portal card because the UI also reads `cancel_at_period_end`, but admin tooling that reads the raw status sees `Active` until then.
:::

See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes) for the full configuration.

---

## What the member sees afterwards

After cancellation:

- Their portal card shows status `Cancelled`.
- Cancel button is gone; no actions remain on the card.
- Protected content is no longer accessible (subject to mode).
- If the Welcome Email or a "sorry to see you go" custom email is enabled, they receive it. (In 1.0, only the Welcome Email ships; goodbye emails are FluentCRM territory.)

---

## Can they come back?

Yes, the cancelled row stays in their history. They re-buy through your pricing page, which creates a *new* Active row alongside the old Cancelled one. Their old data, payment history, and any analytics on them stays intact.

---

## What the admin sees

From the [Member Detail](../detail) screen the cancelled row appears with status `Cancelled`. The Cancel and Suspend kebab actions are gone (already cancelled). The Refund action remains available (Pro) if a transaction needs reversing.

---

## A real example: Mike cancels Pro Yoga

Mike opens the portal, clicks Cancel on his Monthly Pro Yoga card.

| Site setting | What happens |
|---|---|
| Cancellation mode = **Immediate** | Mike loses access right now. His next billing date passes without a charge. |
| Cancellation mode = **End of period** | Mike keeps access until February 1. He's not billed again. On Feb 1, Stripe sends `customer.subscription.deleted` and the cron flips his row to fully ended. |

In both cases his row says Cancelled.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Cancel button is missing | Status isn't `Active` or `Trial`. | Confirm status in the card. |
| Cancelled but next month's Stripe charge still happened | Webhook isn't reaching Stripe, or the cancellation didn't sync. | See [Stripe Setup](/guide/settings/payment-settings/stripe-setup) → webhook configuration. |
| Member expected to keep access through period end but lost it immediately | Mode is set to *Immediate* (the default). | Change mode in [Cancellation Modes](/guide/transactions/cancellation-modes). |
| Corporate parent cancelled but sub-members still have access | Cache, or cascade hasn't run yet. | Wait a few seconds, refresh; if persistent, check the cron. |

---

## What's next?

- **→ [🔒 Pro · Updating Payment Method](./updating-payment-method)**: let members fix a failed card.
- **→ [🔒 Pro · Renewing a Failed Subscription](./renewing-a-failed-subscription)**: bring an expired one back.

**Recommended reading:**
- [🔒 Pro · Subscription Cancellation Modes](/guide/transactions/cancellation-modes): immediate vs end-of-period in depth.
- [Suspending & Cancelling](../suspending-and-cancelling): the admin-side counterpart.
