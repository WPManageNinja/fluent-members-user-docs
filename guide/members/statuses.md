# Status Reference

Every membership row has a single status. The status decides whether the holder sees protected content, what the Member Portal shows them, and what actions you can take on them. This page is the practical reference; the full table lives in [Membership Statuses](/reference/membership-statuses).

**Here's what you'll learn:**
- The six statuses you'll see in the **Members** screen.
- A short answer to "Has access?" for each.
- Where each status comes from (admin action vs cron vs webhook).
- Which admin actions are available at each status.

**Before we start:** No prerequisites. This page is read-it-once and refer back.

---

## The six statuses

| Status      | Has access? | Most common cause |
|-------------|:--:|------------------------------------------------|
| `active`    | ✅ | Normal paid or comped membership.              |
| `trial`     | ✅ | Inside the trial window of a Trial Plan.       |
| `pending`   | ❌ | Order placed, payment not yet confirmed.       |
| `cancelled` | ❌ | Member or admin cancelled; billing stopped.    |
| `expired`   | ❌ | Hourly cron flipped a row whose date passed.   |
| `suspended` | ❌ | Admin paused access (billing may still run).   |

::: tip In plain language
*Active* and *Trial* both unlock content; the difference is purely billing. *Pending* is "we haven't confirmed money yet." *Cancelled / Expired* are both "no longer a member", cancel is intentional, expire is automatic. *Suspended* is an admin's "you're benched", you can let them back in by changing the status to Active.
:::

---

## What admin actions are available at each status

| Status      | Cancel | Suspend | Refund (Pro) | Re-grant via Add Membership |
|-------------|:--:|:--:|:--:|:--:|
| `active`    | ✅ | ✅ | ✅ (on a linked charge) | n/a |
| `trial`     | ✅ | ✅ | ✅ | n/a |
| `pending`   | ✅ |, |, | n/a |
| `cancelled` |, |, | ✅ (on past charges) | ✅ |
| `expired`   |, |, | ✅ | ✅ |
| `suspended` | ✅ |, | ✅ | n/a |

For the full move-between-status reference, see [Membership Statuses](/reference/membership-statuses).

---

## What members see at each status

The Member Portal page (`[fluent_member_portal]` shortcode) renders different content based on status:

| Status      | The Portal shows                                            |
|-------------|--------------------------------------------------------------|
| `active`    | "Active" badge, expiry/lifetime date, **Cancel** button.    |
| `trial`     | "Trial" badge + trial-end date.                              |
| `pending`   | "Pending" badge. No actions available.                       |
| `cancelled` | "Cancelled" badge. The member can re-buy via your pricing page. |
| `expired`   | "Expired" badge. *Pro:* **Renew** button if the subscription is renewable. |
| `suspended` | "Suspended" badge. No actions.                               |

When a non-`active`/`trial` member visits a protected page, the [Access Group's Unauthorized Access action](/guide/access-groups/unauthorized-access) decides what they see.

---

## Cascade, what corporate parents do to children

Corporate Levels cascade status changes from parent to children. If you change the parent's status, every child mirrors it.

| Parent → | Children → | Triggered by |
|---|---|---|
| `cancelled` | `cancelled` | Parent self-cancel, admin cancel, Stripe `customer.subscription.deleted`. |
| `expired`   | `expired`   | The hourly cron flips the parent. |
| `suspended` | `suspended` | Admin suspends the parent. |

See [Corporate Memberships](../levels/corporate-memberships) for the full corporate model.

---

## A real example: Sara investigates a Pending

Sara sees a row with status `Pending` that hasn't moved in two days:

1. Opens the row. Provider says `FluentForms`, so the buyer paid through a Fluent Forms form.
2. Switches to Fluent Forms → Submissions. The submission is there, payment status `succeeded`.
3. Suspects the webhook bridging Fluent Forms → Fluent Members didn't fire.
4. Manually assigns the membership via [Add Membership](./adding-manually) to get the buyer their access.
5. Logs the bug, investigates the webhook chain later.

The Pending status was the early signal.

---

## What's next?

- **→ [Suspending & Cancelling](./suspending-and-cancelling)**: the two admin actions explained in depth.
- **→ [Member Portal, Setup](./portal/setup)**: give members a self-service page.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): the canonical reference (move-between rules, cascade detail).
- [Member Detail](./detail): where you act on a row.
