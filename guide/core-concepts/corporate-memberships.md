# Corporate Memberships — Selling to Teams

Let one buyer purchase a plan, then invite teammates into seats. Each invitee gets the same access, no extra purchase needed.

By the end of this page, you'll know how to build a corporate Level, control seat limits, send invitations, and manage the team roster.

We'll follow **BlueWave Agency** as our running example. BlueWave wants to buy 10 seats for their staff and let each colleague get their own login.

**Here's what you'll learn:**
- What a Corporate Membership is and how it's different from Individual
- How to create a Corporate Level
- How the parent invites team members
- How invited members join
- How to remove a team member
- Where limits (seats, invites) come in

**Before we start:** Read [Core Concepts](./index.md) and [Membership Levels](./membership-levels.md) first — Corporate builds on top of them.

---

## What a Corporate Membership is, really

A Corporate Membership is a Level where **one person buys, and several people use**.

- The purchaser is called the **parent** — they hold the master membership record.
- The invited people are called **sub-members** — each gets their own WordPress user account linked to the parent.
- Each seat gives the sub-member the same content access as the parent.

::: tip In everyday words
Corporate = *a family plan, but for companies*. One bill, many logins.
:::

The parent manages the roster from the [Member Portal](../member-portal/what-members-see.md) on your site. They can see who's in, invite new people, and remove someone who leaves.

---

## Step 1 — Create a Corporate Level

1. Go to **Fluent Members → Levels → Add New Level**.
2. Fill in:
   - **Title** — BlueWave's plan would be called something like `Team Plan` or `Agency Pro (10 seats)`.
   - **Type** — Pick **Corporate**. This unlocks the seats field.
   - **Maximum Member** — Type how many total people (parent + invitees) can share one plan. BlueWave sets this to `10`.
   - **Description** — Optional short copy for the pricing card.
   - **Access Groups** — Tick the groups this plan unlocks.
   - **Status** — Active.
3. Click **Create**.

![Create corporate level with max members](/images/corporate-memberships/create-corporate-level.png)

::: tip Small win
If you see the **Maximum Member** field appear when you pick Corporate, you're on the right track. Individual plans don't show that field.
:::

---

## Step 2 — Price the Corporate Level

Corporate Levels get priced the same way as Individual Levels — through your [payment plugin](./pricing.md).

BlueWave creates a FluentCart product called *Team Plan — 10 seats, $299/year* and links it to their Corporate Level.

When someone buys the Team Plan, Fluent Members creates a **parent membership** record and assigns it to the buyer.

---

## Step 3 — The parent invites team members

This happens on the frontend, in the [Member Portal](../member-portal/setup.md). BlueWave's CFO (the parent) logs in, goes to the portal, and sees a **Team Members** panel alongside their membership info.

From there they:
1. Click **Send Invitation**.
2. Type a teammate's email address.
3. Click **Send**.

Fluent Members emails the teammate a join link with a secure token. The invitation contains a link like:

```
https://your-site.com/?fmem_join=abc123XYZ...
```

When the teammate clicks the link:
- If they're logged out, they're prompted to log in.
- If they're logged in, they see a confirmation screen saying *"BlueWave has invited you to join the Team Plan membership"*.
- After they confirm, their WordPress user is linked to BlueWave's parent membership, and they gain access immediately.

::: info How long invitations last
Invitations expire after 3 days. If the teammate doesn't accept in time, the parent can send a new invite. Also: a teammate can only be invited to the same membership once per hour, which blocks accidental spam.
:::

---

## Step 4 — Seat limits

If BlueWave's Team Plan has a **Maximum Member** of 10, here's what that means:

- The parent is counted as 1 seat.
- 9 more sub-members can be invited.
- Inviting beyond that number is blocked — the portal shows *"X / 10 seats"* and disables the form when full.

If BlueWave needs more seats, they can:
- Upgrade to a higher Corporate Level with a larger seat count, or
- An admin can edit the Level's **Maximum Member** field to increase the cap.

---

## Step 5 — Removing a team member

The parent can remove a sub-member at any time from the Team Members panel:

1. Find the member in the list.
2. Click the actions menu → **Cancel**.
3. Confirm the action.

The sub-member's record is cancelled — their access is revoked immediately, but their WordPress user account is untouched.

::: warning Heads up — irreversible for the sub-member
Removing a sub-member can't be undone from the portal. The parent would need to send a fresh invitation to re-add them. Admins can manually reactivate a cancelled sub-member from **Fluent Members → Members**.
:::

---

## What happens when the parent cancels

If the parent's subscription ends (cancelled or expired), all sub-members are cascaded:
- Their status is set to match the parent's (`cancelled` or `expired`).
- They lose access immediately.

This prevents sub-members from holding onto a plan after the payer stops paying.

If the parent is **suspended** by an admin, sub-members are also suspended. If the parent is reactivated, sub-members go back to active.

---

## A real example — BlueWave Agency

BlueWave bought the *Team Plan* (10 seats) on January 1st. Their CFO, Angela, holds the parent membership.

**Roster over the first month:**
1. Angela invites her five account managers. They each click the join link and become sub-members. (Seats used: 6 of 10.)
2. Two of them leave the company. Angela opens the portal and cancels their sub-accounts. (Seats used: 4 of 10.)
3. She invites two new hires. (Seats used: 6 of 10.)

All six have immediate access to whatever the Team Plan unlocks. Angela's own membership is the one being billed — her teammates never see a charge.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Team Members panel doesn't appear in the portal | The logged-in user holds an Individual plan, not a Corporate one | Make sure the Level is Corporate and the user is the parent |
| "Invitation failed" | Invalid email, or they've been invited in the last hour | Check the email, wait an hour if it's a retry |
| Invited user gets an error when clicking the link | Token expired (>3 days) or was already used | Parent should send a fresh invitation |
| Seats counter shows wrong number | Cancelled sub-members still counted | Refresh the portal; the count updates on reload |
| Sub-member lost access but parent is still active | The sub-member was manually cancelled, or the sub-member's user account was deleted | Parent can re-invite them |

Still stuck? See [Troubleshooting](../../reference/troubleshooting.md).

---

## What's next?

You've got Corporate Memberships wired up. The next things most people set up:

- **→ [Member Portal](../member-portal/setup.md)** — the frontend page where invitations are sent from
- **→ [Integrations](../integrations/index.md)** — connect a payment provider to start selling team plans

**Related reading:**
- [Membership Levels](./membership-levels.md) — how Levels work in general
- [Member Statuses](../../reference/membership-statuses.md) — what happens when a sub-member is cancelled, suspended, or expired
- [Welcome Email](../settings/email-notifications.md) — customise what new sub-members receive when they join
