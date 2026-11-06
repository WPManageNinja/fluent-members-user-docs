# Membership Statuses

Every row in the Members list has a **status**. Status decides whether a person can see protected content, whether their email reminders fire, and what an admin can do next.

There are seven statuses. This page is the one-stop summary.

## The Statuses

| Status      | Has access? | What it means                                                                 |
|-------------|-------------|--------------------------------------------------------------------------------|
| `active`    | Yes         | The membership is live. This is the normal state for paying members.          |
| `trial`     | Yes         | Live, but inside a free-trial window. Behaves exactly like `active` for content access, the difference is only for billing systems. |
| `pending`   | No          | Created but waiting for payment / confirmation. Used by some integrations between order placed and order paid. |
| `cancelled` | No          | The member (or admin) cancelled. Access is revoked. Billing has stopped.       |
| `expired`   | No          | The membership reached its `expires_at` date and the hourly cron flipped it. Access is revoked. |
| `suspended` | No          | An admin paused this member. Access is revoked but billing is not necessarily stopped. Use for policy violations / payment disputes. |
| `upgraded`  | No          | The member's old row after an admin moved them to a different level. A new row on the new level takes over access; this row stays for history. |

## What Moves a Membership Between Statuses

### Becomes `active`
- Admin manually adds a member from **Members → Add Membership**.
- A paywall integration (FluentCart, WooCommerce, Fluent Forms, Paymattic) reports a successful payment.
- A native Stripe or PayPal checkout completes (Pro).
- The corporate join page is accepted by an invitee (Pro).
- Status change from `suspended` back to `active` via the admin UI.

### Becomes `trial`
- Pricing plan has `trial_period_days > 0` and the member is inside that window.

### Becomes `pending`
- Order placed but payment not yet confirmed (provider-dependent).

### Becomes `cancelled`
- Member clicks **Cancel** in the Member Portal.
- Admin cancels from the Members detail screen.
- A provider webhook reports the subscription ended: Stripe sends `customer.subscription.deleted`, PayPal sends **Billing subscription cancelled** (Pro).
- A refund triggers cancellation (when "cancel on refund" is enabled, Pro).
- Cascade: the corporate parent was cancelled, so children cascade to `cancelled`.

### Becomes `expired`
- The hourly cron `fluent_members_check_expired_memberships` picks up any `active|trial` row whose `expires_at <= NOW()` and flips it.
- Cascade: the corporate parent expired, so children cascade.

### Becomes `suspended`
- Admin clicks **Suspend** on the member detail.
- Cascade from a suspended corporate parent.

### Becomes `upgraded`
- An admin moves a member from their current level to a different one. The old row flips to `upgraded`, a new row is created on the new level, and `fluent_members/membership_upgraded` fires alongside `fluent_members/membership_status_updated`.
- Cascade: the corporate parent's old row is upgraded, so children cascade to `upgraded` too.

## What Members See at Each Status

| Status      | Member Portal shows                                  | Restricted content shows                              |
|-------------|------------------------------------------------------|--------------------------------------------------------|
| `active`    | "Active" badge, expiry/lifetime date, Cancel button  | The protected content, normally                       |
| `trial`     | "Trial" badge + trial-end date                        | The protected content, normally                       |
| `pending`   | "Pending" badge, no Cancel button                     | The fallback action you set on the Access Group       |
| `cancelled` | "Cancelled" badge, no actions; can re-purchase        | The fallback action                                   |
| `expired`   | "Expired" badge, **Renew** button if subscription is renewable (Pro) | The fallback action                       |
| `suspended` | "Suspended" badge, no actions                         | The fallback action                                   |
| `upgraded`  | Not shown; the member's new row on their current level shows instead | The fallback action, if this old row is somehow the only one checked |

## What Admin Actions Are Available at Each Status

| Status      | Cancel | Suspend | Renew (Pro) | Refund (Pro) | Change Level |
|-------------|--------|---------|-------------|--------------|---------------|
| `active`    | ✅     | ✅      |             | ✅ (on a charge) | ✅        |
| `trial`     | ✅     | ✅      |             | ✅           | ✅            |
| `pending`   | ✅     |         |             |              |               |
| `cancelled` |        |         | ✅ (if subscription) | ✅ (on past charges) |    |
| `expired`   |        |         | ✅          | ✅           |               |
| `suspended` | ✅     |         |             | ✅           | ✅            |
| `upgraded`  |        |         |             | ✅ (on past charges) |       |

## Cascade Behaviour

Corporate parent rows propagate their status to every child row in one shot:

- Parent → `cancelled` → all children → `cancelled`.
- Parent → `expired` → all children → `expired`.
- Parent → `suspended` → all children → `suspended`.
- Parent → `upgraded` → all children → `upgraded`.

Children cannot cancel themselves, but their access lifts and falls with the parent.

## Provider Values

Alongside `status`, every membership row also stores a `provider`, recording which system created or manages it:

| Value | Source |
|---|---|
| `fluent_cart` | FluentCart checkout |
| `woocommerce` | WooCommerce checkout (Pro) |
| `fluent_forms` | Fluent Forms payment form |
| `paymattic` | Paymattic payment form |
| `native` | Fluent Members Pro native Stripe or PayPal checkout |
| `pmpro` | Imported from Paid Memberships Pro |
| `memberpress` | Imported from MemberPress |
| `rcp` | Imported from Kadence Memberships (retained from the plugin's earlier name, Restrict Content Pro) |
| `manual` | Added manually by an admin |

## Where Status Is Stored

The single source of truth is `fmem_membership_users.status` on each membership row. Even Stripe- and PayPal-driven memberships use this column, the webhook just keeps it in sync.




## Status Reference

Every membership row in Fluent Members carries a single status value. The status controls whether a member can access protected content, what they see in the Member Portal, and which admin actions are available on that row.

### The Statuses

| Status | Has Access? | What it means |
|---|:---:|---|
| `active` | ✅ | Normal operating state: full access granted |
| `trial` | ✅ | Inside the trial period: same access as active |
| `pending` | ❌ | Payment initiated but not yet confirmed by the provider |
| `expired` | ❌ | Past the expiry date, set automatically by an hourly background job |
| `suspended` | ❌ | Admin has paused access; billing may still be running |
| `cancelled` | ❌ | Explicitly ended; record kept in history |
| `upgraded` | ❌ | The member's old membership row after they were moved to a different level; the old row is kept for history and a new row carries the new level |

::: tip
**Active** and **Trial** both grant full access; the difference is billing stage only. Every other status blocks access immediately.
:::

### Admin Actions by Status

The actions available on a membership row depend on its current status:

| Status | Cancel | Suspend | Refund (Pro) | Re-grant |
|---|:---:|:---:|:---:|:---:|
| `active` | ✅ | ✅ | ✅ | — |
| `trial` | ✅ | ✅ | ✅ | — |
| `pending` | ✅ | — | — | — |
| `cancelled` | — | — | ✅ | ✅ |
| `expired` | — | — | ✅ | ✅ |
| `suspended` | ✅ | — | ✅ | — |
| `upgraded` | — | — | ✅ | — |

To re-grant access to a cancelled or expired member, use [Adding a Membership Manually](/docs/members/adding-manually).

### What Members See in the Portal

When a member visits the Member Portal, the content shown depends on their status:

| Status | Portal shows |
|---|---|
| `active` | Active badge, expiry date or lifetime label, Cancel button |
| `trial` | Trial badge and the trial end date |
| `pending` | Pending badge; no actions available |
| `cancelled` | Cancelled badge; member can re-purchase from your pricing page |
| `expired` | Expired badge; Pro: Renew button if the subscription is renewable |
| `suspended` | Suspended badge; no actions available |
| `upgraded` | Not shown; the member instead sees their new, active membership row |

When a member with a non-active status tries to view protected content, the [Unauthorized Access](/docs/access-groups/unauthorized-access) setting on the Access Group controls what they see.

### Corporate Memberships

Status changes on a corporate parent account automatically cascade to all child (seat) accounts:

| Parent status changes to | Children also become |
|---|---|
| `cancelled` | `cancelled` |
| `expired` | `expired` |
| `suspended` | `suspended` |
| `upgraded` | `upgraded` |

See [Corporate Memberships](/docs/levels/corporate-memberships) for details.

### Important Notes

::: warning Things to keep in mind
- **Suspended does not stop billing.** Suspension only removes content access. If the member has a subscription, billing continues unless you also cancel it through your payment provider.
- **Expired is set automatically.** An hourly background job checks for rows whose expiry date has passed and flips them to `expired`. You do not need to do this manually.
- **A Pending row that stays Pending** usually means an integration webhook did not fire. Check the payment provider logs, then use [Adding a Membership Manually](/docs/members/adding-manually) to grant access if needed.
- **Cancelled rows are not deleted.** The record stays in the member's history. A new `Active` row is created if they re-join.
- **Upgraded rows are not deleted either.** Moving a member to a different level marks the old row `upgraded` and creates a fresh row on the new level, keeping full history of what they held before.
:::
