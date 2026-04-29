# What Members See in the Portal

A guided tour of the Member Portal from your members' side — so you know what they see before they ask.

**Here's what you'll learn:**
- The full layout members see
- What actions they can perform (and can't)
- How corporate parents see the team panel
- What data is pulled from where

**Before we start:** The portal must be set up. If it isn't, see [Portal Setup](./setup.md).

---

## The layout at a glance

When a logged-in member visits the portal page, they see a Vue-powered dashboard with three main zones:

1. **Top — Profile header** (name, email, avatar, logout)
2. **Middle — Membership cards** (one per membership)
3. **Corporate parents only — Team panel** (sub-members, invitations, seats used)

![Member portal frontend](/images/member-portal/portal-frontend.png)
<!-- SCREENSHOT-NEEDED
Page: Member Portal frontend (logged-in member view)
State: Active member with 1 active membership, corporate parent with 3 sub-members
Highlight: Three zones labeled Profile, Memberships, Team
-->

---

## The profile header

At the top sits the member's profile block:
- Name (pulled from the WordPress user's display name)
- Email
- Avatar (Gravatar or uploaded)
- A logout link

Nothing here is editable from the portal — members update their profile from the standard WordPress profile page. If you want the two to feel unified, link **My Profile** from your site nav.

---

## Membership cards

Each active or trial membership gets its own card. A card contains:

| Field | Source |
|---|---|
| Level title | `fmem_membership_levels.title` |
| Status badge | `fmem_membership_users.status` |
| Start date | `fmem_membership_users.start_date` |
| Expires date | `fmem_membership_users.expires_at` (if set) |
| Payment provider | `fmem_membership_users.provider` |
| Cancel button | Only shown if cancellation is allowed |

If a member holds multiple memberships (a common scenario), they see multiple cards — one per membership.

::: info What about suspended / expired / cancelled memberships?
By default, the portal only shows `active` and `trial` memberships. Historical records (`expired`, `upgraded`, `cancelled`) are typically hidden to avoid clutter. Customise via filters if you need to show them.
:::

---

## The cancel action

Members can cancel their own memberships from the portal. The full flow is covered in [Cancelling Membership](./cancelling-membership.md).

In short:
1. Member clicks **Cancel Membership**.
2. A confirmation modal asks them to confirm.
3. On confirm, Fluent Members flips the status to `cancelled`, revokes access immediately, and (if the provider supports it) cancels the recurring subscription at the provider.

Access is lost immediately — not at the end of the current billing period. If you prefer "access until paid-through date" behaviour, you'll need to handle that in your payment provider's configuration.

---

## The team panel (corporate members only)

If the logged-in member is the **parent** of a [Corporate Membership](../core-concepts/corporate-memberships.md), they see an additional **Team Members** panel.

The panel shows:

**Seats summary:**
- "3 / 10 seats used"
- A progress bar or counter

**Sub-member list:**
- Each sub-member's name and email
- Their status badge
- A **Remove** action

**Invitation form:**
- Email input
- **Send Invitation** button
- A list of pending invitations (email, sent date)

Corporate sub-members see the standard portal but *don't* see a team panel — only the parent can manage the team.

---

## Role-by-role summary

| Who logs in | What they see |
|---|---|
| Individual member | Their memberships + profile |
| Corporate parent | Their memberships + team panel (manage) |
| Corporate sub-member | The parent's membership listed + profile (no manage) |
| Logged-out visitor | Login form |
| Admin user with no membership | Profile only (no membership cards) |

---

## Data flow — for the curious

The portal is a Vue.js Single-Page Application rendered on one page. When the page loads:

1. Vue initialises and calls the Fluent Members REST API at `fluent-members/v2/me`.
2. The API returns the logged-in user's memberships, statuses, team info.
3. Vue renders the dashboard with that data.

All actions (cancel, invite, remove) call additional endpoints under the same namespace. Nothing leaves the site.

---

## A real example — the three perspectives

### Angela (Corporate parent at BlueWave Agency)
Sees:
- Profile block
- 1 membership card (Team Plan, active, expires 2026-06-01)
- Team panel showing 5 of 10 seats used, with a list of her 4 teammates + herself

### Tom (sub-member at BlueWave)
Sees:
- Profile block
- 1 membership card (Team Plan, active, linked to Angela as parent) — **no** team panel

### Mike (solo Pro member)
Sees:
- Profile block
- 1 membership card (Pro Plan, active, auto-renewing monthly)
- Cancel button

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Member reports empty portal | Their status isn't `active` or `trial` | Check their membership record |
| Member sees two cards for what they bought once | They bought, upgraded, bought again — multiple active records | Confirm in admin; clean up if duplicates |
| Corporate parent doesn't see team panel | Their Level is Individual, not Corporate, or they're a sub-member | Check the Level's type |
| Cancelled member still sees their old card | Cache — portal loaded before cancel | Refresh the page |
| Expired member sees nothing | Expired memberships are hidden by default | That's intentional; customise via filters if needed |

---

## What's next?

**→ [Cancelling Membership](./cancelling-membership.md)** — the exact cancellation flow.

**Related reading:**
- [Setup](./setup.md) — get the portal page published
- [Corporate Memberships](../core-concepts/corporate-memberships.md) — what the team panel does
