# The Fluent Members Dashboard

Your membership control room — a bird's-eye view of every moving part in the plugin. Open it first each day.

**Here's what you'll learn:**
- What each Dashboard stat actually counts
- How to read the growth chart
- Which panels to check daily vs weekly
- Where the Dashboard data comes from (so you trust it)

**Before we start:** This page assumes Fluent Members is installed and active. If it's not, start with [Installation](./installation.md).

## Opening the Dashboard

Click **Fluent Members** in your WordPress sidebar. You land on the Dashboard by default.

On a brand-new install, most numbers will be `0` — that's expected. As members join and content is protected, the dashboard fills in.

![Fluent Members dashboard overview](/images/dashboard/dashboard-overview.png)

## The four key stats (top row)

The dashboard's top row shows four cards. These are the vital signs of your membership business.

### Total Members
The count of distinct WordPress users who have at least one active membership. "Active" means their status is `active` or `trial`.

A member with two plans is counted once, not twice.

### Active Memberships
The total number of individual membership records across the site with `active` or `trial` status. This number is usually higher than Total Members if people hold multiple plans.

### Membership Levels
How many Levels you've created, regardless of status. Click the card to jump to the Levels list.

### Access Groups
How many groups you've set up. Click to jump to Access Groups.

::: tip Daily check
If you're running a live membership site, glance at Total Members and Active Memberships each morning. Rising? Business is healthy. Flat or dropping? Time to investigate cancellations.
:::

## Membership growth chart

Below the stat cards sits a line chart showing new memberships created per day over the selected range (default: last 30 days).

**How to read it:**
- Each point = new memberships created that day (not renewals or state changes).
- The y-axis is absolute count, not cumulative.
- Hover any point to see the exact number for that date.

Use the date-range filter at the top to change the window (7 days, 30 days, 90 days, 1 year).

## Latest Levels

A panel showing the most recently created Membership Levels. Handy as a quick link to jump into a Level you're currently setting up.

Click any level title to open it for editing.

## Latest Members

The most recent members — roughly the last 5 signups. Each row shows:
- Member name + email
- Membership level
- Status badge
- Join date

Click the row to open that member's full record. Great for spot-checking that a signup went through as expected.

## Expiring Soon

Memberships whose expiry date is within the next 30 days. A warm-up for your renewal work:
- Proactively reach out to these members
- Confirm their payment method on file is valid
- Send a personal thank-you before they renew

Empty panel = no one expiring soon. Congratulations.

## Where the dashboard data comes from

For the curious: every number on the Dashboard comes from your WordPress database, specifically the Fluent Members tables:
- `fmem_membership_users` → member counts and statuses
- `fmem_membership_levels` → Levels count
- `fmem_access_groups` → Access Groups count
- Calculations for the chart query the `created_at` column of the membership users table.

The Dashboard queries run on page load — there's no cache. If you just added a member, the numbers update on refresh.

## A real example — Sara's morning routine

Sara opens the Dashboard every morning with her coffee:

1. **Total Members** is up by 3 from yesterday. Three new signups — nice.
2. **Active Memberships** went up by 4. Which means one existing member upgraded to a second plan — worth a look.
3. **Expiring Soon** has 2 entries. Sara drops them a personal email thanking them for their year with her.
4. **Membership Growth** chart is flat for the past week. Time to schedule a promotional post.

Total time: 3 minutes.

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Total Members doesn't match my WordPress user count | Normal — TM counts only users with an active membership, not all site users | If you want all users, see the WP Users screen |
| Growth chart is empty but I have members | All your members joined before the selected date range | Widen the range |
| Expiring Soon shows members I've already renewed | Status didn't update after renewal payment | Check the payment provider's subscription status; see [Troubleshooting](../reference/troubleshooting.md) |
| Dashboard shows a stale count after I deleted a member | Refresh the page — no cache, but the browser shows the previous view until reload | Hit refresh |
