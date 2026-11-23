---
title: Adding a Membership Manually
description: Give a WordPress user a membership from the admin without taking a payment, and see how the expiry date is set.
---

# Adding a Membership Manually

**Add Membership** gives a person a membership from the admin, with no purchase and no charge. Use it for staff accounts, reviewers, or members who paid outside your site.

To add several people to one level at once, use [Members on a level](/docs/levels/members-on-a-level) instead.

## Before you start

- The person needs a WordPress account. If they don't have one, create it under **Users → Add New** first.
- You need an active [Membership Level](/docs/levels/) with at least one pricing plan.

## Add the membership

1. Go to **Fluent Members → Members**. If the person holds no membership yet, click the **No Membership** tab, because the default tab lists only people who hold one.
2. Click the person's row to open [Member Details](/docs/members/detail).
3. Click **Add Membership**.
4. In the **Membership Level** dialog, click a level to expand it and see its plans. Each level shows its plan count. Each plan shows its name, ID, level, a trial or setup fee if it has one, its price, and whether it is a **Subscription** or **One-time**.
5. Click **Assign** on the plan you want. **Cancel** closes the dialog without adding anything.

<!-- TODO(screenshot): adding-manually-1
  screen: Members → a member → Add Membership
  state: Membership Level dialog with one level expanded and its plans listed
  data: a level with a one-time plan and a subscription plan
  highlight: Assign button
  view: admin
  alt: Screenshot of the Membership Level dialog with a level expanded and an arrow pointing to Assign
-->

The dialog closes and the new row appears in the **Memberships** table with the status **Active** and the provider **Manual**. No payment is taken, even if the plan has a price or setup fee, and the **Amount** column shows `--`.

## What the dialog shows

- **Already Assigned:** The person holds this plan with the status Active or Trial.
- **Assign** greyed out: The person is Active or on Trial on another plan of the same level. One person can hold only one live membership per level, so if you try anyway, the admin shows "User already has a membership for this level."
- **No pricing plans yet:** The level has no plans. Click **Add pricing plan** to create one.
- **No active membership levels:** Click **Manage Membership Levels** to create or activate a level.

## How the expiry date is set

The expiry date comes from the plan you pick:

| Plan | Expiry on the new membership |
|------|------------------------------|
| **One-time** | None. The row shows **Lifetime**. |
| **Subscription** with no trial | One billing period from today, using the plan's interval and count. A plan that bills every 3 months gets 3 months. |
| **Subscription** with trial days | The number of trial days from today, and the status is still **Active**. |
| Plan on a [free level](/docs/levels/free-levels) | Set by the level's access length: lifetime, a set length of time from today, or a fixed end date. |

> [!Note]
> Nothing renews a manual membership. When the expiry date passes, access ends. To give ongoing access, pick a one-time plan. To end access early but let the member keep it until the expiry date, see [Suspending & Cancelling](/docs/members/suspending-and-cancelling).
