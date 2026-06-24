# Corporate Memberships

::: info Part of Chain 6: Corporate · step 2 of 3
**Previously:** [Creating a Level](/guide/levels/creating)
**Next:** [Corporate Seat Invites](/guide/members/portal/corporate-seat-invites)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
Corporate Memberships need Fluent Members Pro. The Level *type* exists in free, but seat invites, the team panel in the Member Portal, and cascade-on-cancel are all Pro behaviour.
:::

A Corporate Level lets one buyer (the **parent**) pay once and invite teammates (the **sub-members**) into seats. Each invited person gets their own WordPress login and the same access the parent has.

**Here's what you'll learn:**
- How a Corporate Level differs from an Individual Level, at creation and afterwards.
- What **Maximum Member** does (and what an empty field means).
- The end-to-end flow: buy → invite → accept → use → remove.
- What cascades when the parent's status changes.

**Before we start:** Read [Creating a Level](./creating) first; this page builds on it.

---

## How Corporate differs from Individual

| | **Individual** | **Corporate** |
|---|---|---|
| Buyers per Level | 1 (the user themselves) | 1 buyer (the parent) + N invitees |
| Maximum Member field | Hidden | Visible; sets the seat cap (empty = unlimited) |
| Who pays | The user | Just the parent |
| Who can cancel | The user (themselves) or an admin | Only the parent or an admin, sub-members cannot |
| Portal page | Shows the user's own membership | Shows the parent's + a **Team** panel |
| Cascade behaviour | Not applicable | When the parent's status changes, every child mirrors it |

---

## Step 1: Create the Corporate Level

1. **Fluent Members → Levels → + Add New Level**.
2. Title: `Team Plan` (or whatever fits).
3. Type: pick the **Corporate** card.
4. Click **Create**.

![Add Membership Level modal with Corporate selected](/screenshots/level-add-corporate-modal.webp)

---

## Step 2: Set the seat cap

On the Edit Level tab, fill in **Maximum Member**.

| Value | What it means |
|-------|---------------|
| `10`  | 1 parent + 9 invitees can share this purchase. |
| `5`   | 1 parent + 4 invitees. |
| *(empty)* | **Unlimited** seats. The parent can invite forever. |

::: warning "Empty" is unlimited, not zero
The placeholder text reads *"Leave this field empty to allow unlimited corporate seats."* If you actually want only the parent and no invitees, set it to `1`, a `0` here is treated as unlimited just like empty.
:::

Save the Level.

![Edit Level, Corporate, with Maximum Member field](/screenshots/level-edit-corporate.webp)

---

## Step 3: Wire up Pricing and Access Groups

The same as any other Level. Add a [Pricing Plan](./pricing-native) and [attach Access Groups](./attaching-access-groups). Whatever the parent unlocks, every sub-member unlocks too.

::: tip One price for the whole seat pool
The Pricing Plan charges the parent once (or recurring once), there's no per-seat math in 1.0.0. If you want different prices for different team sizes, create one Corporate Level per size (e.g. *Team, 5 seats*, *Team, 25 seats*).
:::

---

## Step 4: The parent buys

Nothing special on the buyer side. They click the Pricing card's button on your pricing page, pay (Stripe or paywall), and get the parent membership. From the Members list they look like a normal member, but the Portal will treat them as the parent.

---

## Step 5: The parent invites teammates

From the front-end **Member Portal** the parent sees a **Team Members** panel alongside their membership card. The detailed flow is in [Member Portal, Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

Short version:

1. Parent clicks **Send Invitation**, types a teammate's email.
2. Fluent Members emails the teammate a join link of the form:
   ```
   https://yoursite.com/?fluent_members_corporate_join=…
   ```
3. The teammate clicks the link. If they're logged out, they sign in (or register). If they're logged in as a different user, they get a "this invite isn't for you" notice.
4. On accept, their WordPress user is linked to the parent's membership; they gain access immediately.

---

## Step 6: Removing a teammate

The parent goes to **Team Members**, finds the row, opens the kebab → **Cancel**. The sub-member's membership row is cancelled; their WordPress account is untouched.

::: warning Cancellation is per-membership
A teammate who was using the team seat for *Team Plan* loses access only to whatever Team Plan unlocked. Their WordPress login still works; any unrelated memberships they hold are unaffected.
:::

---

## Cascade, what happens when the parent's status changes

When the parent membership flips status, every sub-member mirrors it. The plugin's `MembershipService::cascadeStatusToChildren()` does this in one shot.

| Parent → | Children → | Triggered by |
|---|---|---|
| `cancelled` | `cancelled` | Parent self-cancel in portal, admin cancel, or Stripe `customer.subscription.deleted`. |
| `expired`   | `expired`   | The hourly cron flips the parent when `expires_at` passes. |
| `suspended` | `suspended` | Admin clicks Suspend on the parent. |
| `active` (from `suspended`) | `active` | Admin unsuspends. |

::: warning Lifecycle hooks fire per child, not once for the parent
The cascade is not a single bulk event. `cascadeStatusToChildren` fires the matching lifecycle action (`fluent_members/membership_cancelled`, `membership_expired`, `membership_suspended`, or `membership_level_assigned` on re-activation) **separately for every child**. So a 10-seat team that cancels triggers 10 `membership_cancelled` actions plus the parent's own. CRM funnels and Welcome-back automations subscribed to these events will fire N+1 times — usually fine, but worth knowing before you point an external system at the hook.
:::

---

## A real example: BlueWave Agency

BlueWave buys a *Team Plan* (10 seats, $299/yr). Their CFO Angela:

1. **Day 1**, buys the plan; she's now the parent.
2. Opens the Member Portal → **Team Members** → invites 5 colleagues (one by one or paste-separated).
3. They accept over the next few days. Seats used: 6 of 10.
4. **Day 60**, two colleagues leave. Angela cancels their rows in the Team panel. Seats used: 4 of 10.
5. She invites two new hires. Seats used: 6 of 10.
6. **Day 365**, the renewal charge fails. Angela's status flips to `past_due` and eventually `cancelled`. All five active sub-members cascade to `cancelled` in one operation.

That last step is the trade-off of Corporate: simplicity for the buyer, single point of failure for the team.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Team Members panel doesn't appear in the portal | The user holds an Individual plan, not Corporate. | Confirm the Level type. |
| Invite email never arrives | Your site's outgoing mail isn't reaching the invitee. | See [Troubleshooting → Email not delivered](/reference/troubleshooting). |
| Seat count says full but I removed someone | The page is cached. | Hard refresh the portal. |
| Sub-member lost access but parent is still active | The parent removed them, or an admin cancelled the row. | Re-invite them. |
| Corporate column says "Unlimited", I didn't want that | Maximum Member is empty (or `0`). | Edit the Level → fill in a number. |

---

## What's next?

- **→ [Member Portal, Corporate Seat Invites](/guide/members/portal/corporate-seat-invites)**: the full front-end flow.
- **→ [Member Portal, What Members See](/guide/members/portal/what-members-see)**: what the parent and sub-members each look at.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): what each status does, especially cascade rules.
- [Glossary, Corporate Membership](/guide/glossary): short definition.
