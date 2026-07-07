# Subscription Cancellation Modes

When a member or admin cancels a Stripe subscription, Fluent Members decides when the cancellation takes effect. Two modes are available: **Immediate** and **End of Period**. Choose the one that matches your refund policy.

> [!Note]
> Cancellation modes apply only to native Stripe subscriptions. Memberships driven by FluentCart, WooCommerce, or other paywall integrations follow the host plugin's own cancellation behaviour.

## The Two Modes

| | Immediate | End of Period |
|---|---|---|
| Access revoked | Now | At the next renewal date |
| Stripe action | Cancel subscription now | Set `cancel_at_period_end = true` |
| Local membership status | `Cancelled` immediately | Stays `Active` until period ends, then `Cancelled` |
| Final charge | None | None — current period is already paid |
| `customer.subscription.deleted` webhook | Fires now | Fires at the period boundary |

## Where to Configure

Go to **Settings → Payment Settings**, click **Manage** on the Stripe card, and look for the **Cancellation Mode** toggle.

The default is **Immediate**. A fresh install will not accidentally extend access beyond what you intend.

## How Each Mode Works

### Immediate

When a member cancels:

1. The portal card shows `Cancelled` immediately.
2. Fluent Members tells Stripe to cancel the subscription right now.
3. The membership row's `expires_at` is set to the current time.
4. The member loses access on their next page load.
5. No charge runs at what would have been the renewal date.

### End of Period

When a member cancels:

1. The portal card shows `Cancelled` with an *"Access ends on [date]"* notice.
2. Fluent Members sets `cancel_at_period_end = true` on the Stripe subscription — it stays active in Stripe until the period boundary.
3. The local membership row stays `Active` until that boundary.
4. The member keeps access throughout the paid period.
5. On the original renewal date, Stripe sends `customer.subscription.deleted`. Fluent Members flips the local row to `Cancelled`.
6. No final charge runs.

::: warning Admin views under End of Period
Under End of Period, the membership row's `status` column stays `Active` between the cancel click and the period boundary. The member portal shows `Cancelled` because it reads both the `status` field and the `cancel_at_period_end` flag. Admin tooling or reports that read only `status` will show `Active` — this is expected behaviour, not a bug.
:::

## Which Mode to Choose

**Use Immediate when:**
- You include a refund on cancellation
- You run free trials where a failed conversion should remove access instantly
- You want Cancel to mean instant revocation

**Use End of Period when:**
- You charge non-refundable monthly or annual fees
- You want members to keep access through the period they already paid for
- You prefer to minimise refund requests by letting the period run out naturally

::: tip Mode changes apply to new cancellations only
Switching modes affects cancellations from that point forward. Any subscription already marked `cancel_at_period_end` keeps its original behaviour.
:::


