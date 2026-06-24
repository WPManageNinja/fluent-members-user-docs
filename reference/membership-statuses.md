# Membership Statuses

Every row in the Members list has a **status**. Status decides whether a person can see protected content, whether their email reminders fire, and what an admin can do next.

There are six statuses. This page is the one-stop summary.

## The six statuses

| Status      | Has access? | What it means                                                                 |
|-------------|-------------|--------------------------------------------------------------------------------|
| `active`    | Yes         | The membership is live. This is the normal state for paying members.          |
| `trial`     | Yes         | Live, but inside a free-trial window. Behaves exactly like `active` for content access, the difference is only for billing systems. |
| `pending`   | No          | Created but waiting for payment / confirmation. Used by some integrations between order placed and order paid. |
| `cancelled` | No          | The member (or admin) cancelled. Access is revoked. Billing has stopped.       |
| `expired`   | No          | The membership reached its `expires_at` date and the hourly cron flipped it. Access is revoked. |
| `suspended` | No          | An admin paused this member. Access is revoked but billing is not necessarily stopped. Use for policy violations / payment disputes. |

## What moves a membership between statuses

### → `active`
- Admin manually adds a member from **Members → Add Membership**.
- A paywall integration (FluentCart, WooCommerce, Fluent Forms, Paymattic) reports a successful payment.
- A native Stripe checkout completes (Pro).
- The corporate join page is accepted by an invitee (Pro).
- Status change from `suspended` back to `active` via the admin UI.

### → `trial`
- Pricing plan has `trial_period_days > 0` and the member is inside that window.

### → `pending`
- Order placed but payment not yet confirmed (provider-dependent).

### → `cancelled`
- Member clicks **Cancel** in the Member Portal.
- Admin cancels from the Members detail screen.
- Stripe webhook reports `customer.subscription.deleted` (Pro).
- A refund triggers cancellation (when "cancel on refund" is enabled, Pro).
- Cascade: the corporate parent was cancelled, so children cascade to `cancelled`.

### → `expired`
- The hourly cron `fluent_members_check_expired_memberships` picks up any `active|trial` row whose `expires_at <= NOW()` and flips it.
- Cascade: the corporate parent expired, so children cascade.

### → `suspended`
- Admin clicks **Suspend** on the member detail.
- Cascade from a suspended corporate parent.

## What members see at each status

| Status      | Member Portal shows                                  | Restricted content shows                              |
|-------------|------------------------------------------------------|--------------------------------------------------------|
| `active`    | "Active" badge, expiry/lifetime date, Cancel button  | The protected content, normally                       |
| `trial`     | "Trial" badge + trial-end date                        | The protected content, normally                       |
| `pending`   | "Pending" badge, no Cancel button                     | The fallback action you set on the Access Group       |
| `cancelled` | "Cancelled" badge, no actions; can re-purchase        | The fallback action                                   |
| `expired`   | "Expired" badge, **Renew** button if subscription is renewable (Pro) | The fallback action                       |
| `suspended` | "Suspended" badge, no actions                         | The fallback action                                   |

## What admin actions are available at each status

| Status      | Cancel | Suspend | Renew (Pro) | Refund (Pro) | Change Level |
|-------------|--------|---------|-------------|--------------|---------------|
| `active`    | ✅      | ✅      |,           | ✅ (on a charge) | ✅          |
| `trial`     | ✅      | ✅      |,           | ✅           | ✅            |
| `pending`   | ✅      |,       |,           |,            |,             |
| `cancelled` |,      |,       | ✅ (Pro, if subscription)  | ✅ (on past charges) |,  |
| `expired`   |,      |,       | ✅ (Pro)    | ✅           |,             |
| `suspended` | ✅      |,       |,           | ✅           | ✅            |

## Cascade behaviour

Corporate parent rows propagate their status to every child row in one shot:

- Parent → `cancelled` → all children → `cancelled`.
- Parent → `expired` → all children → `expired`.
- Parent → `suspended` → all children → `suspended`.

Children cannot cancel themselves, but their access lifts and falls with the parent.

## Where status is stored

The single source of truth is `fmem_membership_users.status` on each membership row. Even Stripe-driven memberships use this column, the webhook just keeps it in sync.

The status vocabulary is also exposed to your code via `MembershipService::getStatusLabels()` if you're building admin UI.

---

**What's next?**
- [Cancelling a Membership](/guide/members/portal/cancelling): the portal-side flow.
- [Glossary](/guide/glossary): definitions for everything else.
- [Member Portal, What Members See](/guide/members/portal/what-members-see): how statuses surface to the member.
