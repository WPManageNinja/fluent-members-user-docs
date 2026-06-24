# Suspending & Cancelling

Two row-actions sit behind the kebab on every Memberships table row: **Suspend** and **Cancel**. They look similar but mean very different things, this page makes the difference plain.

::: info Part of Chain 4: Day-to-day admin · step 4 of 6
**Previously:** [Member Detail](/guide/members/detail)
**Next:** [Refunds](/guide/transactions/refunds)

**Also part of:** Chain 9: Refund (step 5 of 5)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- What Suspend does and what it doesn't.
- What Cancel does and how it integrates with payment providers.
- How to undo a Suspend.
- What happens to corporate sub-members when you do this to a parent.

**Before we start:** You're on the [Member Detail](./detail) page for someone with an `active` or `trial` membership.

---

## Suspend vs Cancel, the short version

| | **Suspend** | **Cancel** |
|---|---|---|
| Access revoked? | Yes, immediately. | Yes, immediately. |
| Billing stops? | No, recurring charges continue (unless you also cancel at the provider). | Yes, the plugin tells the payment provider to stop. |
| Reversible from admin UI? | Yes, change status to Active. | No, you'd grant a new membership. |
| Use it for | Policy violations, payment disputes, temporary holds. | The customer wants out, or you're cleaning up after a refund. |

::: tip In plain language
*Suspend* is "you're benched but still on the team payroll." *Cancel* is "you're off the team, and we're not billing you anymore."
:::

---

## How to Suspend

1. **Fluent Members → Members**, click the user's row.
2. On the membership row, open the kebab (⋮) → **Suspend**.
3. The row's status flips to `Suspended`. Access is revoked the instant the next page loads.

Re-enabling a suspended member: go to the same row and change status back to Active. (In 1.0 there's no dedicated "Unsuspend" action; the path is via the status field.)

::: warning Suspend doesn't cancel billing
If you've configured the membership through Stripe (Native Payment) or via FluentCart subscriptions, recurring charges keep going. To stop billing, either also cancel at the provider, or use Cancel instead.
:::

---

## How to Cancel

1. Same as above, but click **Cancel** in the kebab.
2. The row flips to `Cancelled`. Access is revoked.
3. The plugin tells the payment provider to stop recurring charges:
   - **Stripe (Pro):** subscription cancelled immediately (or at period end if you've configured that mode, see [Subscription Cancellation Modes](/guide/transactions/cancellation-modes)).
   - **FluentCart subscriptions:** matching subscription cancelled.
   - **Fluent Forms / Paymattic / others:** the integration's cancel hook fires; behaviour depends on the host plugin.

A cancelled member can re-buy through your pricing page. The old `Cancelled` row stays in their history for audit; a fresh `Active` row gets created.

---

## When to use which

- **Use Suspend when:** they violated a community guideline, you want a payment-dispute hold, an admin asks for a temporary "off" without losing the billing relationship.
- **Use Cancel when:** the customer asked to leave, you're cleaning up after a refund, the subscription is irrecoverable (multiple failed charges).

---

## Cascade for corporate parents

If the membership row you're suspending or cancelling is a *corporate parent*, every sub-member's row mirrors the parent's new status:

- Suspend the parent → every active child becomes `Suspended`.
- Cancel the parent → every active child becomes `Cancelled`.

This is automatic; you don't have to touch the children individually.

::: warning Sub-members can't be saved by un-suspending one child
The cascade is parent-driven. To restore access for the whole team, change the parent's status back to Active.
:::

---

## A real example: Sara handles a chargeback

A buyer files a chargeback through their bank. Stripe notifies the site. Sara:

1. Goes to the buyer's [Member Detail](./detail).
2. On the `Active` Pro Yoga row, opens kebab → **Suspend**. Status flips to `Suspended`. The buyer immediately loses access.
3. Sara investigates with Stripe; resolves the dispute over the next week.

If she wins the chargeback, she changes the row's status back to Active. If she loses, she cancels the row, the membership ends, and (in Pro) she may also issue a Refund on the Transaction record to keep the books square.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Suspend menu item is missing | Status isn't `Active` or `Trial`. | Suspend only applies to live memberships. |
| Cancelled the row but Stripe still charges next month | Stripe webhook URL wrong, or end-of-period mode misunderstood. | Check [Stripe Setup](/guide/settings/payment-settings/stripe-setup) and [Cancellation Modes](/guide/transactions/cancellation-modes). |
| Cancelled a row, member complains they lost access immediately and they expected end-of-period | Cancellation mode is set to *Immediate* (the default). | Change the mode in [Cancellation Modes](/guide/transactions/cancellation-modes). |
| Un-suspended the parent but children are still Suspended | The cascade only fires on status *change*. If children were Suspended for other reasons (manual), they need individual fixes. | Cancel + re-add each affected child. |

---

## What's next?

- **→ [🔒 Pro · Refunds](/guide/transactions/refunds)**: refund a transaction when you cancel.
- **→ [Member Portal, Cancelling](./portal/cancelling)**: the member-driven version of Cancel.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): the canonical vocabulary.
- [🔒 Pro · Subscription Cancellation Modes](/guide/transactions/cancellation-modes): immediate vs end-of-period.
