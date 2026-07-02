# Status Reference

Every membership row in Fluent Members carries a single status value. The status controls whether a member can access protected content, what they see in the Member Portal, and which admin actions are available on that row.

## The Six Statuses

| Status | Has Access? | What it means |
|---|:---:|---|
| `active` | ✅ | Normal operating state — full access granted |
| `trial` | ✅ | Inside the trial period — same access as active |
| `pending` | ❌ | Payment initiated but not yet confirmed by the provider |
| `expired` | ❌ | Past the expiry date — set automatically by an hourly background job |
| `suspended` | ❌ | Admin has paused access — billing may still be running |
| `cancelled` | ❌ | Explicitly ended — record kept in history |

::: tip
**Active** and **Trial** both grant full access — the difference is billing stage only. Every other status blocks access immediately.
:::

## Admin Actions by Status

The actions available on a membership row depend on its current status:

| Status | Cancel | Suspend | Refund (Pro) | Re-grant |
|---|:---:|:---:|:---:|:---:|
| `active` | ✅ | ✅ | ✅ | — |
| `trial` | ✅ | ✅ | ✅ | — |
| `pending` | ✅ | — | — | — |
| `cancelled` | — | — | ✅ | ✅ |
| `expired` | — | — | ✅ | ✅ |
| `suspended` | ✅ | — | ✅ | — |

To re-grant access to a cancelled or expired member, use [Adding a Membership Manually](./adding-manually).

## What Members See in the Portal

When a member visits the Member Portal, the content shown depends on their status:

| Status | Portal shows |
|---|---|
| `active` | Active badge, expiry date or lifetime label, Cancel button |
| `trial` | Trial badge and the trial end date |
| `pending` | Pending badge — no actions available |
| `cancelled` | Cancelled badge — member can re-purchase from your pricing page |
| `expired` | Expired badge — Pro: Renew button if the subscription is renewable |
| `suspended` | Suspended badge — no actions available |

When a member with a non-active status tries to view protected content, the [Unauthorized Access](/guide/access-groups/unauthorized-access) setting on the Access Group controls what they see.

## Corporate Memberships

Status changes on a corporate parent account automatically cascade to all child (seat) accounts:

| Parent status changes to | Children also become |
|---|---|
| `cancelled` | `cancelled` |
| `expired` | `expired` |
| `suspended` | `suspended` |

See [Corporate Memberships](/guide/levels/corporate-memberships) for details.

## Important Notes

::: warning Things to keep in mind
- **Suspended does not stop billing.** Suspension only removes content access. If the member has a subscription, billing continues unless you also cancel it through your payment provider.
- **Expired is set automatically.** An hourly background job checks for rows whose expiry date has passed and flips them to `expired`. You do not need to do this manually.
- **A Pending row that stays Pending** usually means an integration webhook did not fire. Check the payment provider logs, then use [Adding a Membership Manually](./adding-manually) to grant access if needed.
- **Cancelled rows are not deleted.** The record stays in the member's history. A new `Active` row is created if they re-join.
:::
