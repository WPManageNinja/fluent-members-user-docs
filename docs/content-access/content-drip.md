---
title: "Release Content Over Time"
description: "Release protected content on a schedule after a member joins, or on a fixed date, using the release schedule on a level's content rows."
---

# Release Content Over Time

A **release schedule** opens protected content to a member some time after they join, or on a set date. The member holds the right level from day one, but each item opens only when its time comes. It suits paced courses and week-by-week programs.

You set the schedule on the content row, on a level's **Content Access** tab or inside a [Bundle](/docs/content-access/bundles). Add the content first. See [Content Access tab](/docs/levels/content-access).

## Set a schedule

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Content Access** tab.
2. On the content row, click the calendar icon. If the row already has a schedule, click its pill, such as **Day 7**.
3. In **Release schedule**, choose an option:
    - **Immediately:** Open as soon as they join.
    - **After the member joins:** Enter a number and choose **days after joining** or **weeks after joining**. The number can go up to 3650.
    - **On a date:** Pick a date. The item opens on that day for every member.
4. If the row holds several items, tick the ones to schedule under **Applies to**. They move to their own row with this schedule.
5. Click **Apply**, then **Save** in the save bar.

<!-- TODO(screenshot): content-drip-1
  screen: Release schedule popover on a content row
  state: After the member joins selected with 2 weeks after joining
  data: row for Lesson 3
  highlight: the three options, the number field and the Apply button
  view: admin
  alt: Screenshot of the Release schedule popover set to 2 weeks after joining
-->

A row with a schedule shows a pill instead of the calendar icon: **Day 7**, **Week 2**, or the date.

## When the clock starts

**After the member joins** counts from when the member first got the level. Upgrades and renewals don't reset it. If more than one of the member's levels gives the same content, the earliest start counts. The date option uses your site's timezone.

## Build a weekly course

Add each lesson as its own row, or as items in one row, and give each a different schedule.

| Item | Schedule |
|---|---|
| Lesson 1 | **Immediately** |
| Lesson 2 | **Week 1** |
| Lesson 3 | **Week 2** |
| Lesson 4 | **Week 3** |

Content with no schedule opens the moment the member joins.

## What members see

A member who has to wait stays on the page. They see **Available soon**, a line such as *This page opens on (date).*, and a countdown under **This content unlocks in**. When the time arrives, the title changes to **Available now** and a **View now** button opens the content. The member is never redirected, and the teaser doesn't show.

In the member portal, upcoming items list under **Unlocking soon** on the membership.

> [!Note]
> A schedule only holds back the member's own access path. If another level or Bundle gives the same content with no wait, it opens right away. Items you leave out of a level, and [public content](/docs/content-access/public-content), are never held back. Visitors without a level still get the normal [blocked result](/docs/content-access/unauthorized-access).

FluentCommunity courses have their own release date on the linked course. See [FluentCommunity](/docs/integrations/fluent-community).
