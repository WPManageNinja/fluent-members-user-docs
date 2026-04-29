# Upgrading a Member to a Different Plan

Move a member from one Membership Level to another — without losing their history.

**Here's what you'll learn:**
- How upgrades happen automatically via your payment plugin
- How to manually upgrade a member from the admin
- Why Fluent Members uses the `upgraded` status
- How to downgrade (it's the same mechanism)
- What happens to content dripping when a member upgrades

**Before we start:** Skim [Membership Statuses](./member-statuses-explained.md) first — the `upgraded` status is central to how this all works.

---

## How automatic upgrades work

When a member who already holds Level A buys Level B through your payment plugin, Fluent Members handles the transition in one atomic move:

1. The old `active` membership on Level A is flipped to `upgraded`.
2. A new `active` membership on Level B is created for the same user.
3. Access updates immediately — they now have whatever Level B unlocks.

The member doesn't need to log out, clear cache, or do anything special. Their next page load reflects the new access.

::: tip In everyday words
Upgrades aren't a mutation — they're a replacement. The old record becomes a historical artifact. The new record is the live membership.
:::

---

## Manual upgrade from the admin

Sometimes you need to move a member without a purchase — maybe you're comping them up, or fixing a data issue.

1. Go to **Fluent Members → Members**.
2. Click the member to open their detail page.
3. Find the active membership and click **Edit**.
4. In the **Level** dropdown, pick the new Level.
5. Save.

Fluent Members sets the old record to `upgraded` and creates a new `active` record on the chosen Level. Same as automatic — just triggered by you.

![Edit membership level](/images/members/edit-level.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Members → [Member] → Edit
State: Edit form with Level dropdown open showing options
Highlight: The Level dropdown
-->

---

## Downgrades

A "downgrade" is the exact same operation as an upgrade — you're just moving to a lower-priced Level.

From Fluent Members' perspective, there's no difference. The old record becomes `upgraded`, the new record becomes `active` on the smaller Level.

::: info "Upgraded" label is generic
Don't be thrown off by the word "upgraded" in the status. It's a technical term meaning *"this membership was replaced by another on a different Level"* — it doesn't imply the new Level is necessarily higher-priced.
:::

---

## What about content dripping?

When a member moves to a new Level, [content dripping](../content-protection/content-dripping.md) uses the **new membership's start date** as the anchor — which is *today*.

This is usually what you want: their new lesson schedule starts fresh from the moment they upgraded. But if you'd rather preserve their original journey, manually edit the new membership's start date to match the original.

---

## What about payment-provider data?

When an upgrade happens via a payment plugin, the new record gets:
- The new provider reference (new order ID, new subscription ID)
- The new provider's product link

The old record keeps the original provider data for history. If a refund is issued on the old order, it applies to the historical record — not the new one.

---

## Preserving history

One of the reasons Fluent Members uses the `upgraded` status instead of simply deleting the old record is **reporting**. You can still query for:
- "How many members started on Starter and moved to Pro?"
- "What's the average time to upgrade?"
- "Which Level do most Pro members come from?"

All of that is possible because the old record with status `upgraded` stays in the database. Members don't see this record in their portal — it's admin-only historical data.

---

## Special case: Corporate upgrades

Upgrading a Corporate parent to a different Corporate Level affects all sub-members:
- Parent's old record → `upgraded`, new `active` on the new Level
- Each sub-member's record → cascaded to the new Level with their own new `active` records

::: warning Seat-count changes
If the new Level has *fewer* seats than the old one, you'll hit a seat conflict. Fluent Members cancels sub-members in reverse-join order until the seat count fits. Consider this before downgrading a corporate plan with many sub-members.
:::

---

## A real example — Mike moves from Monthly to Annual

**Before:**
- Mike, `active` on *Pro Monthly*, start_date = Feb 1, expires_at = Mar 1 (auto-renews monthly)

**On Mar 15, Mike upgrades to Pro Annual:**

**After:**
- Old Pro Monthly record — status = `upgraded`, preserved for history
- New Pro Annual record — status = `active`, start_date = Mar 15, expires_at = Mar 15 next year

Mike sees only the Annual membership in his portal. Sara (admin) sees both records on Mike's detail page — the historical Monthly and the live Annual.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Upgrade didn't deactivate the old plan | Fluent Members only handles upgrades within itself — manual provider overrides bypass it | Check provider webhook mapping |
| Member has access to *both* Level A and Level B after upgrade | Old record wasn't correctly flipped to `upgraded` | Manually edit the old record's status |
| Content dripping reset after upgrade | Start date reset is by design | Manually edit the new record's start date |
| Sub-members disappeared after Corporate downgrade | Seat count dropped below the roster | See the warning above; re-invite if needed |

---

## What's next?

Back to [Managing Members](./managing-members.md).

**Related reading:**
- [Membership Statuses](./member-statuses-explained.md) — the six possible states
- [Core Concepts](../core-concepts/index.md) — Levels vs Access Groups vs Members
- [Pricing](../core-concepts/pricing.md) — how upgrades relate to payment providers
