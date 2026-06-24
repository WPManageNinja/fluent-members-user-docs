# Reading the Dashboard

The first screen you see in **Fluent Members → Dashboard**. Four numbers up top, three charts in the middle, three side cards on the right, together they tell you how your membership business is doing right now.

::: info Part of Chain 4: Day-to-day admin · step 1 of 6
**Next:** [Members List](/guide/members/)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- What each of the four headline stats counts (and what it doesn't).
- How to read the two charts and the donut.
- Where the Quick Actions, Latest Members, and Expiring Soon cards come from.
- Which numbers are safe to check daily vs weekly.

**Before we start:** This page assumes Fluent Members is installed. If it's not, see [Installation](./installation).

![Dashboard, full view](/screenshots/dashboard.webp)

---

## The four headline stats

The top row of the Dashboard shows four cards. These are the numbers most worth glancing at.

| Card                | What it counts                                                                 |
|---------------------|--------------------------------------------------------------------------------|
| **Total Members**   | Distinct WordPress users who hold at least one membership row (any status).    |
| **Active Members**  | Distinct WordPress users with at least one membership in `active` or `trial`.  |
| **Access Groups**   | All [Access Groups](/reference/glossary) you've created, both active and inactive. |
| **Active Levels**   | [Membership Levels](/reference/glossary) whose status is **Active**.           |

::: tip In plain language
*Total Members* counts people. *Active Members* counts people with live access. The gap between them is your churn pile, cancelled, expired, suspended.
:::

---

## Membership Activity (bar chart)

A bar chart, one bar per month for the past several months. Each month splits into two colours: **New Signups** (the count of memberships created that month) and **Cancellations** (the count of memberships flipped to `cancelled` that month).

What to look at:
- **A growing signups bar** with a flat or smaller cancellations bar = healthy growth.
- **Cancellations climbing month over month** = something to investigate. Pricing change? Content issue? Payment failures?
- Renewals are NOT counted as new signups, those go quietly through the cron and Stripe webhooks.

---

## Membership Trends (line chart)

A line chart, two coloured series across time: **Active** and **Suspended**. This is the *running total* at each point in time, not new events.

It's the right place to see slow trends, is your active base steadily growing, or has it plateaued? Are suspensions spiking (often a sign of a billing problem)?

---

## Membership Recap (donut)

A donut chart showing how your Total Member count splits across **levels**. Each slice is a level (e.g. *Pro Plan*, *Premium Plan*, *Starter*) with a member count next to it. The centre shows your **Total Member** number.

Useful for product decisions: "Is most of my base on the cheap tier, or on the premium tier?"

Click **View More** at the bottom of the card to jump to the full Levels list.

---

## Side column, Quick Actions, Latest Members, Expiring Soon

### Quick Actions
A small shortcut card on the right. Three buttons:
- **Add Level**: opens the *Add Membership Level* modal (same as **Levels → Add New Level**).
- **Add Access Group**: opens the *Create Access Group* modal.
- **Settings**: jumps to Settings.

### Latest Members
The five most-recently registered members. Each row has an avatar, name, and email. Click any row to open that member's detail page.

### Expiring Soon
Members whose `expires_at` falls within the upcoming window (default 30 days). Empty state: *"No recent expirations."*

::: tip Use this list
When the Expiring Soon card has entries, those are the people most worth a personal nudge, a thank-you email, a renewal reminder, or a check that their payment method on file is still good.
:::

---

## Daily vs weekly, what to actually check

| Cadence | What to check                                                       |
|---------|----------------------------------------------------------------------|
| Daily   | *Total Members* and *Active Members* deltas. *Latest Members* feed.  |
| Weekly  | *Membership Activity* bars, is the cancel column growing?           |
| Monthly | *Membership Recap* donut, is the mix shifting between levels?       |

---

## Where the numbers come from

For the curious, the Dashboard reads directly from your WordPress database (the `fmem_membership_users`, `fmem_membership_levels`, `fmem_access_groups` tables). There is no cache; refreshing the page always re-queries.

::: info Add-on stats appear when Pro is active
With **Fluent Members Pro** installed, the Dashboard adds a **Transactions** entry to the top menu and surfaces a richer Membership Recap. The four headline stats are the same in free and Pro.
:::

---

## Things that trip people up

| What you're seeing                                  | What's probably going on                                                | Quickest fix |
|------------------------------------------------------|-------------------------------------------------------------------------|---|
| *Total Members* doesn't match my WP user count       | Normal, TM counts only users with a membership row, not all site users. | Look at WordPress → Users for the full list. |
| Charts empty even though I have members              | All your members joined before the chart's window.                       | The chart shows recent activity, not all-time. |
| *Active Members* stays the same after I add a member | The new member's status isn't `active` or `trial` yet.                  | Check the member's detail, `pending` doesn't count. |
| *Expiring Soon* shows people I've already renewed    | Renewal didn't flip the local row's `expires_at`.                        | See [Troubleshooting](/reference/troubleshooting). |

---

## What's next?

- **→ [Levels, Overview](./levels/)**: start building your first paid (or free) plan.
- **→ [Access Groups, Overview](./access-groups/)**: group the content you'll protect.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): what `active`, `trial`, etc. each mean.
- [Glossary](/reference/glossary): the vocabulary.
