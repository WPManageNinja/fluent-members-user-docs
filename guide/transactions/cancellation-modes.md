# Subscription Cancellation Modes

::: info Part of Chain 7: Recurring renewal (Pro) · step 4 of 4
**Previously:** [Transactions List](/guide/transactions/)

**Also part of:** Chain 9: Refund (step 4 of 5)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
Cancellation modes only apply to Native Payment subscriptions (Stripe). Paywall-driven memberships (FluentCart, etc.) follow the host plugin's cancellation behaviour.
:::

When a member (or admin) cancels a Stripe subscription, Fluent Members decides *when* the cancellation takes effect. Two modes: **Immediate** and **End of period**. Pick the one that matches your refund policy.

**Here's what you'll learn:**
- What each mode does to access and billing.
- Where to change the setting.
- The trade-offs in plain language.
- What members see when they cancel under each mode.

**Before we start:** You're on Fluent Members Pro and Stripe is connected.

---

## The two modes

| | **Immediate** | **End of period** |
|---|---|---|
| Local status flip | `Cancelled` now | `Cancelled` now (with `cancel_at_period_end` flag) |
| Access revoked | Now | At the next renewal date |
| Stripe behaviour | Cancel the subscription now | `cancel_at_period_end=true` on the subscription |
| Final charge | None | None, current period is already paid for |
| When `customer.subscription.deleted` fires | Now | At the period end |
| Best for | Refund-on-cancel policies, free trials | Pro-rata-free "you paid for the month, use it" policies |

::: tip In plain language
*Immediate* = "you're out now." *End of period* = "you're out, but you keep what you paid for until it expires." Most paying audiences prefer the second; most free-trial flows use the first.
:::

---

## Where to set it

This setting lives globally, per-site, not per-Level. As of 1.0 the toggle is reached via:

1. **Fluent Members → Settings → Payment Settings**.
2. Click **Manage** on the Stripe card.
3. Look for the **Cancellation Mode** option. (In some early Pro builds this lives behind a developer filter `fluent_members/stripe/cancellation_mode`; if you don't see the UI control, change it in code or with a small must-use plugin.)

The default is **Immediate** for safety, a fresh install won't accidentally extend access beyond what you intended.

---

## How each mode plays out

### Immediate

Sequence when a member clicks Cancel in the portal:

1. The portal card shows `Cancelled` instantly.
2. Stripe is told to cancel the subscription right now.
3. The membership row's `expires_at` is set to "now" (in case the cron checks).
4. The member loses access on the next page they visit.
5. No charge runs at the original renewal date.

### End of period

Sequence:

1. The portal card shows `Cancelled` instantly (it reads the `cancel_at_period_end` flag, not just the raw status).
2. Stripe is told to set `cancel_at_period_end=true`, the subscription remains *active* in Stripe with a marker to end at the next boundary.
3. The local membership row stays `Active` until that boundary.
4. The member keeps access throughout the paid-for period.
5. On the original renewal date, Stripe sends `customer.subscription.deleted`. Fluent Members flips the local row to fully `Cancelled`. The card updates.
6. No final charge runs.

::: warning Local status mismatch under End of period
Under End of period, the local `status` column on the membership row is still `Active` between the cancel-click and the period boundary. The portal card shows `Cancelled` because the UI reads both `status` and `cancel_at_period_end`. Admin tooling that reads just `status` will see `Active`, that's correct behaviour, not a bug.
:::

---

## What members see

In the portal:

| Mode | After clicking Cancel |
|---|---|
| Immediate | Card shows `Cancelled`. Cancel button gone. Protected content shows the fallback action on next visit. |
| End of period | Card shows `Cancelled` plus a small line: *"Your access ends on [date]"*. Protected content stays available. |

---

## What admins see

In **Member Detail → Memberships**:

| Mode | The row's Status pill |
|---|---|
| Immediate | `Cancelled` immediately |
| End of period | `Active` until the period ends, then `Cancelled` |

Filtering by `Cancelled` in the Members list won't surface End-of-period members until their period actually ends.

---

## Which to choose

**Pick Immediate when:**
- You include refunds with cancellations.
- You run free trials where conversion failure = instant access loss.
- You want the simplest mental model, Cancel means Cancel.

**Pick End of period when:**
- You charge non-refundable monthly fees.
- You value "you paid for this month, finish using it" goodwill.
- Your content is consumed in chunks the member already paid for.

::: tip You can change later
Switching modes affects new cancellations from that moment onwards. Existing scheduled cancellations keep their original mode.
:::

---

## A real example: Sara picks End of period

Sara's customers pay $19/month for unlimited access. A few cancel each month. Sara wants them to keep the full value of the month they paid for, no refund expected, no surprise access loss.

She sets the mode to **End of period**. Now:

- A member cancels on Jan 20. Their renewal date is Feb 1.
- They keep access through Jan 31.
- On Feb 1, Stripe ends the subscription. Their card flips to `Cancelled`.
- No charge runs.

Customers are happier; Sara's refund-request volume drops to nearly zero.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Cancellation mode setting not visible | Some Pro builds expose this only via filter. | Set `fluent_members/stripe/cancellation_mode` to `end_of_period` in code. |
| Member cancelled but Stripe still charges them | The webhook didn't update the local row, OR mode mismatch (Immediate locally, end-of-period on Stripe). | Re-check Stripe Settings and webhook. |
| End-of-period: admin reports show member as Active despite Cancel | Working as designed, admin tooling reads raw status. | Trust the portal card or check `cancel_at_period_end` programmatically. |
| Cascade to children fired too early under End of period | Some early Pro builds cascade immediately on cancel-click. | Update Pro to a recent build. |

---

## What's next?

- **→ [Refunds](./refunds)**: refund when you cancel.
- **→ [Stripe Setup](/guide/settings/payment-settings/stripe-setup)**: configure Stripe so the cancel actions can sync.

**Recommended reading:**
- [Cancelling a Membership (portal)](../members/portal/cancelling): the member-driven flow.
- [Suspending & Cancelling](../members/suspending-and-cancelling): admin-driven counterpart.
- [Membership Statuses](/reference/membership-statuses): what `Cancelled` means.
