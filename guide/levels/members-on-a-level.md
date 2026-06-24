# Members on a Level

The fourth inner tab on a Level, a read-only list of every WordPress user who currently holds this Level. Use it for quick triage: who's on this plan, how many, and what state are they in.

**Here's what you'll learn:**
- How to open the Members tab on a Level.
- What each column tells you.
- How to spot something off without leaving this screen.
- Where to go for full member management.

**Before we start:** This tab is only useful once people are actually holding the Level. New Levels show an empty list.

---

## Step 1: Open the tab

1. **Fluent Members → Levels**.
2. Click the Level.
3. Click **Members** (the fourth tab).

The page lists every WordPress user holding this Level, with a search box and pagination.

![Members tab inside a Level](/screenshots/level-members-tab.webp)

---

## What the columns tell you

| Column          | Notes                                                              |
|-----------------|--------------------------------------------------------------------|
| **ID**          | Numeric ID of the membership row (not the WordPress user ID).      |
| **User**        | Avatar + display name + email.                                     |
| **Status**      | One of `Active`, `Trial`, `Pending`, `Cancelled`, `Expired`, `Suspended`. |
| **Role**        | The WordPress role of the user (Subscriber, Administrator, etc.).  |
| **Registered**  | Date the WordPress user was registered.                            |

The **Search by name or email** box at the top filters within this Level.

---

## What this tab is *not*

This is a triage view. From here you can see *that* someone holds the Level, but to actually act on a member, change their status, cancel, refund, you click their row to open their **Member Detail** page, or jump to the full **Members** screen.

::: tip Use it for quick checks
- "How many people are on Pro Yoga?", look at the pagination total.
- "Did Sara's signup go through?", search her email.
- "Why is this Level losing customers?", sort by status, look at the count of Cancelled / Expired.

For everything else, go to **Members** (top nav) or to a specific member's detail.
:::

---

## A real example: Sara checks her latest cohort

Sara launched a 7-day-trial campaign for *Pro Yoga*. After day 1 she:

1. Opens *Pro Yoga* → Members.
2. Glances at the **Status** column. New signups should show `Trial` for 7 days.
3. Notices 4 of 12 signups read `Pending` instead of `Trial`, a sign that payment didn't confirm. She'll cross-check with **Transactions** to see why.

The tab told her *something is off* without her needing to leave the Level.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Empty list even after recent signups | Members haven't been granted yet, payment may be Pending. | Open Transactions; see what state their payment is in. |
| Member appears with `Suspended` status | An admin suspended them, or a corporate parent was suspended (cascade). | Open the member's detail to see the trigger. |
| Two rows for the same email | They hold two memberships of this Level (rare; usually from a manual add + a paywall purchase). | Open the member's detail and clean one up. |

---

## What's next?

- **→ [Members, List](/guide/members/)**: see everyone across all Levels.
- **→ [Member Detail](/guide/members/detail)**: open one person and manage their memberships.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): what each status means.
- [Suspending & Cancelling](/guide/members/suspending-and-cancelling): the actions you can take from a member's detail.
