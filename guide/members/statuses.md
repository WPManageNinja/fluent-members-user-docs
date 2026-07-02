# Status Reference

Every membership row in Fluent Members has a single status. The status controls whether a member can access protected content, what they see in the Member Portal, and which admin actions are available on that row.

## The Six Statuses

| Status | Has Access? | What it means |
|---|:---:|---|
| `active` | ✅ | Normal paid or manually assigned membership — full access granted |
| `trial` | ✅ | Inside the trial period of a Trial Plan — full access granted |
| `pending` | ❌ | Order placed but payment not yet confirmed |
| `cancelled` | ❌ | Membership cancelled by the member or an admin — access removed |
| `expired` | ❌ | Membership passed its expiry date and was automatically closed |
| `suspended` | ❌ | Admin has paused access — billing may still be running |

::: tip Quick reference
- **Active** and **Trial** both grant access — the difference is billing stage only.
- **Pending** means payment is unconfirmed. If it stays Pending, check the integration or webhook.
- **Cancelled** is intentional — someone ended it. **Expired** is automatic — the date passed.
- **Suspended** is a manual admin pause. You can restore access at any time by changing the status back to Active.
:::

## Available Admin Actions by Status

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

When a member visits the Member Portal page, what they see depends on their current status:

| Status | Portal shows |
|---|---|
| `active` | Active badge, expiry or lifetime date, Cancel button |
| `trial` | Trial badge and the trial end date |
| `pending` | Pending badge — no actions available |
| `cancelled` | Cancelled badge — member can re-purchase from your pricing page |
| `expired` | Expired badge — Pro: Renew button if the subscription is renewable |
| `suspended` | Suspended badge — no actions available |

When a member with a non-active status visits protected content, the [Unauthorized Access](/guide/access-groups/unauthorized-access) action on the Access Group decides what they see.

## Corporate Memberships

For Corporate Membership Levels, status changes on the parent account automatically cascade to all child (seat) accounts:

| Parent status changes to | Children also become |
|---|---|
| `cancelled` | `cancelled` |
| `expired` | `expired` |
| `suspended` | `suspended` |

See [Corporate Memberships](../levels/corporate-memberships) for details.

## Important Notes

::: warning Things to keep in mind
- **Suspended does not stop billing.** Suspension only removes content access. If the member is on a subscription, billing continues unless you also cancel the subscription through your payment provider.
- **Expired is set automatically.** The system runs an hourly check and flips any row whose expiry date has passed to `expired`. You do not need to do this manually.
- **A Pending row that doesn't move** usually means an integration webhook did not fire. Check the payment provider logs, then use [Add Membership](./adding-manually) to grant access manually if needed.
:::
