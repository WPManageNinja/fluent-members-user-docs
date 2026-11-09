---
title: "Drip Content"
description: "Release protected content on a schedule after a member joins, or make it available only for a limited time."
---

# Drip Content

**Content Drip** releases protected content on a schedule after a member joins. The member holds the right level from day one, but each item opens only when its time comes, which suits paced courses and week-by-week programs.

You set drip rules on the [Access Group](/docs/access-groups/) that protects the content, not on the level. The group needs at least one rule under **Content Protection Rules** first.

## Add a drip rule

1. Go to **Fluent Members → Access Groups** and open the group.
2. Turn on the **Content Drip** toggle. The first rule appears.

    ![Screenshot of the Content Drip card with its toggle turned off](/images/access-groups/content-drip/content-drip-1.webp)

3. Fill in the rule's fields, as described below.
4. To add another rule, click **Add New**.
5. Click **Save** in the **Unsaved Changes** bar at the top of the page.

Each rule has these fields:

| Field | Notes |
|---|---|
| **Show This Content** | The items this rule applies to. Type at least one character to search. Keep it blank to apply the rule to all restricted content of this group. A category or tag covers posts assigned directly to it, not posts that are only in a child category. |
| **Timeline** | **After duration** (default) or **Within duration**. |
| **Days** | Part of the delay. |
| **Hours** | Part of the delay, up to 23. |
| **Minutes** | Part of the delay, up to 59. |

When a group has more than one rule, each rule shows a trash icon that removes it. Turning the toggle off stops all the rules but keeps them, and the group's **Drip** column on the list reads `Off · 1 rule unused`.


![Screenshot of a Content Drip rule with Show This Content, Timeline, Days, Hours and Minutes](/images/access-groups/content-drip/add-content-drip-1.webp)

In **Show This Content**, type part of a title. Matching items appear in a list grouped by type, such as **Posts**. Click one to add it.

![Screenshot of the Show This Content field with a search open and matching posts listed under Posts](/images/access-groups/content-drip/content-drip-search.webp)


## Choose a timeline

The timeline decides what the duration means:

- **After duration:** The item opens once the duration has passed. Use this to release lessons one by one.
- **Within duration:** The item is available until the duration has passed, then closes. Use this for limited-time bonuses.

The clock starts at the member's start date on the level. If two of the member's levels unlock the same group, the earlier start date counts.

## Build a weekly course

Add one rule per item you want to release on a different schedule. Content that no rule covers is available the moment the member joins.

| Rule | Show This Content | Timeline | Days |
|---|---|---|---|
| 1 | Lesson 2 | After duration | 7 |
| 2 | Lesson 3 | After duration | 14 |
| 3 | Lesson 4 | After duration | 21 |

Lesson 1 needs no rule because the member can open it straight away.

## What members see

A member who has to wait stays on the page and sees **Content Not Yet Available**, a line such as *This content will be available in 6 days, 4 hours.*, and a live countdown. The page reloads when the countdown ends. [When Unauthorized](/docs/access-groups/unauthorized-access) doesn't apply here, so the member is never redirected.

After a **Within duration** rule has run out, the member sees **Content No Longer Available** and *This content is no longer available.*

> [!Note]
> Drip rules only hold back members of the group's levels. If another group the member can access covers the same content with no waiting rule, the content opens right away. Visitors without a level still get the normal [blocked result](/docs/access-groups/unauthorized-access).

![site showing Content Not Yet Available and a countdown](/images/access-groups/content-drip/content-drip-frontend-countdown.webp)


