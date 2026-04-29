# Managing Members

The Members screen is your roster — where you find, filter, inspect, and edit every person who holds a membership on your site.

**Here's what you'll learn:**
- How to navigate the Members list
- What every column means
- How to search and filter
- What's on a member's detail page
- Common actions you'll perform

**Before we start:** Make sure you have at least one member for this page to make sense. If your site is brand new, [Add a member manually](./adding-a-member-manually.md) or wait for the first purchase.

---

## Opening the Members list

Click **Fluent Members → Members** in the WordPress sidebar. You'll see a table listing every member on your site.

![Members list view](/images/members/members-list.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Members
State: Table with 5-10 members, different statuses
Highlight: The status column and filter row
-->

---

## Columns, in plain English

| Column | What it shows |
|---|---|
| **Name / Email** | The WordPress user behind the membership |
| **Membership Level** | Which Level they hold |
| **Status** | Their current membership state — `active`, `trial`, `suspended`, `expired`, `upgraded`, or `cancelled` |
| **Start Date** | When this membership began |
| **Expires** | When it ends (blank = lifetime / no expiry) |
| **Provider** | Which payment plugin delivered the purchase (FluentCart, WooCommerce, etc.) |
| **Actions** | Quick links — view, edit status, remove |

If you're curious what each status means, head to [Membership Statuses](../../reference/membership-statuses.md).

---

## Filtering the list

Four filters are available above the table:

1. **Search** — free text, matches on user name or email.
2. **Status** — show only `active`, `trial`, `cancelled`, etc.
3. **Membership Level** — limit to a specific Level.
4. **Date range** — filter by when memberships started.

Use filters together. For example:
- *"Who's expired in the last 30 days?"* → Status = expired + date range = last 30 days.
- *"Which Pro members started this month?"* → Level = Pro + date range = this month.

---

## Drilling into a member

Click any member's row (or the View action) to open their full detail page. You'll see:

### Profile section
WordPress user info — name, email, avatar, user ID.

### Memberships
Every membership this user holds, across all Levels. You can see multiple rows for members who've held several plans over time.

For each membership:
- Level title
- Status
- Start / expiry date
- Payment provider and order reference
- Parent membership (if this is a corporate sub-member)
- Team members (if this is a corporate parent)

### Actions
- **Change status** — suspend, cancel, or reactivate
- **Edit membership** — change start/expiry date, change Level
- **Remove** — delete the membership record

---

## Common actions

### Suspend a member
1. Open the member.
2. Find the specific membership.
3. Click **Suspend**.
4. Confirm.

The member loses access immediately but the record is preserved. To restore, use **Unsuspend**.

### Cancel a membership
1. Open the member.
2. Click **Cancel** on the relevant membership.
3. Confirm.

Cancelled members lose access. The record remains in the database for reporting but the status is `cancelled`.

### Extend an expiry date
1. Open the member.
2. Click **Edit** on the membership.
3. Change the **Expires At** field to a future date.
4. Save.

Great for comping a free month, or granting a grace period.

### Move a member to a different Level
1. Open the member.
2. Click **Edit**.
3. Change the **Level** field.
4. Save.

The old membership is typically preserved with status `upgraded`; a new membership on the new Level is created. See [Upgrading plans](./upgrading-plans.md).

---

## Bulk actions

The list view supports basic bulk actions — select rows via checkboxes, then choose an action from the bulk dropdown. Available:

- Suspend selected
- Cancel selected
- Delete selected

::: danger Bulk delete is permanent
Bulk delete removes the membership records entirely. It does **not** delete the WordPress user accounts — those remain. Use bulk delete sparingly and only on test data. For real members, prefer Cancel (reversible status change) over Delete (irreversible record removal).
:::

---

## Exporting members

Click the **Export CSV** button at the top right of the list. This exports the currently-filtered results to a downloadable CSV file.

Useful for:
- Emailing a newsletter to a specific segment
- Reporting on paid vs trial vs expired members
- Archiving a monthly snapshot

The CSV includes all visible columns plus member ID and internal fields.

---

## A real example — Sara's monthly cleanup

At the end of each month, Sara opens the Members list and does four things:

1. Filters by Status = `expired` to see who lapsed. She sends them a personal "come back" offer.
2. Filters by Status = `trial` to see who's still in their trial. She emails them a quick tips guide.
3. Checks the Level filter = `Pro Plan` + date = this month → new Pro signups. She sends them a personal welcome video.
4. Exports the full list as a CSV for her records.

Time: 15 minutes once a month.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Filter shows 0 results but I know there are members | Multiple filters narrowing too hard | Clear filters and try one at a time |
| Two rows for the same person | They hold multiple memberships; this is normal | Drill into their profile to see both |
| Status column shows "upgraded" on an old row | That's the historical record of their previous plan | That's expected — see [Membership Statuses](../../reference/membership-statuses.md) |
| Expired member can still see protected content | The user might also hold another active membership; or cache is stale | Check their other memberships; flush caches |

---

## What's next?

**→ [Adding a member manually](./adding-a-member-manually.md)** — for comping plans, testing, or direct entries.

**Related reading:**
- [Membership Statuses](../../reference/membership-statuses.md) — every status explained
- [Member Portal](../member-portal/setup.md) — what members see from their side
- [Upgrading plans](./upgrading-plans.md) — moving members between Levels
