---
title: "Content Access Tab"
description: "Choose what a Membership Level unlocks: its own content, other memberships, Bundles, FluentCommunity spaces and LMS courses, with an optional release schedule."
---

# Content Access Tab

The **Content Access** tab decides what members of a level can open. A level unlocks nothing until you add content here, include another membership, add a Bundle, or link a space or course.

## Open the tab

1. Go to **Fluent Members → Membership Levels** and open the level.
2. Click the **Content Access** tab.

<!-- TODO(screenshot): levels-content-access-1
  screen: Membership Levels, a level open on the Content Access tab
  state: a level with a few content rows, one included membership and one bundle
  data: level titled "Gold" with two rules, one release pill, one bundle chip
  highlight: the Content card, the Also gets access from card and the What Gold members get panel
  view: admin
  alt: Screenshot of the Content Access tab with the Content card, the Also gets access from card and the summary panel
-->

The tab has three cards and a summary panel:

- **Content:** Content only this level unlocks.
- **Also gets access from:** Other memberships, Bundles, FluentCommunity and courses that members get with this level.
- **Message for visitors without access:** What people without access see.
- **What (level) members get:** A read-only summary of **Content**, **Released later**, **Memberships**, **Bundles**, and **Community** and **Courses** when those are available.

Changes appear in a save bar with **Cancel** and **Save**. Click **Save** to keep them. If you leave the page with unsaved changes, Fluent Members asks you first.

## Add content

Use the **Content** card for posts, pages, categories, products and other content that only this level unlocks.

1. Click **Add content**. The **Add content to (level)** dialog opens.
2. Pick a type tab, such as **Everything**, **Pages**, **Posts** or **Categories & tags**. FluentCart products, WooCommerce products (Pro) and custom post types get their own tabs when they exist on your site.
3. Tick what you want. The list has two groups:
    - **Whole groups · new content is included automatically:** For example **All posts**, **All pages** or **Entire website**.
    - **Single items:** Search by title and tick the pages, posts, categories, tags or products you want.
4. Click **Add (n) items**.
5. Click **Save** in the save bar.

<!-- TODO(screenshot): levels-content-access-2
  screen: Add content to (level) dialog
  state: Pages tab selected, two pages ticked
  data: pages such as Lessons and Course Library
  highlight: the type tabs, the Whole groups heading, and the Add 2 items button
  view: admin
  alt: Screenshot of the Add content dialog with type tabs and two pages ticked
-->

Some rows carry a badge that helps you decide:

| Badge | Meaning |
|---|---|
| **Public now** | The item is open to everyone today. Adding it makes it members only. |
| **Also in (level)** | Another membership already unlocks it. |
| **Already added** | This level already has it. |
| **Already in (level) via (membership)** | It comes through an included membership. |
| **Public** or **System page · public** | It is [public content](/docs/content-access/public-content), so a membership cannot lock it. |

Added content appears as rows with its type, title, a short description and, for whole groups, a count. Click **Edit** on a row to change its items, or **×** to remove it.

> [!Note]
> **Entire website** covers every page, so you don't need to protect your pricing, checkout and member portal pages yourself. They are system pages and always stay public.

## Leave out content

Use **Leave out** to keep specific items out of a broad rule, such as one page inside **All pages**.

1. Click the three-dot menu in the **Content** card and choose **Leave out content**.
2. Pick the items and click **Add (n) items**.

Left-out items show as chips under **Leave out**. Click **+ Leave out** to add more, or **×** on a chip to remove it. Leave out only affects this level's own content. If another membership also unlocks the item, its members still get it.

Below the chips, **Public content** lists the site-wide items that are always open. It is read-only here. Click **Manage in Settings** to change it.

## Release content over time

Each content row has a release control. Items are available **Immediately** by default. Click the calendar icon or the release pill to open **Release schedule**:

- **Immediately:** Open as soon as they join.
- **After the member joins:** Enter a number and choose **days after joining** or **weeks after joining**. The pill reads **Day 7** or **Week 2**. The number can go up to 3650.
- **On a date:** Pick a date. The item opens that day for every member.

The popover explains the clock: it counts from when the member first got this level, and upgrades and renewals don't reset it. If a row holds several items, **Applies to** lets you tick which ones get the schedule. The ticked items move to their own row. Click **Apply**, then **Save**.

<!-- TODO(screenshot): levels-content-access-3
  screen: Release schedule popover on a content row
  state: After the member joins selected, 7 days
  data: row titled Lesson 2
  highlight: the three options and the Apply button
  view: admin
  alt: Screenshot of the Release schedule popover with After the member joins set to 7 days
-->

Members see upcoming releases under **Unlocking soon** on their membership page in the member portal, and a visitor who opens an item early sees a countdown. See [Release content over time](/docs/content-access/content-drip).

## Include other memberships

Use **Memberships** under **Also gets access from** when one level should include everything another gives, for example a Gold level that includes Silver.

1. Click **+ Include** and search for a membership.
2. Click it to add it as a chip. An **Inactive** tag shows if that level is inactive.
3. Click **Save**.

Click **×** on a chip to stop including it.

## Add Bundles

A **Bundle** is a set of content shared by several levels. Under **Bundles**, click **+ Add bundle**, search, and click one to add it. Click **Create a new bundle** to build one on the spot.

Each bundle shows as a chip with its rule count. Click the name to open it in a drawer, or **×** to remove it from this level (the bundle itself stays). Bundles this level gets through an included membership show in muted chips marked **from (level)**.

See [Bundles](/docs/content-access/bundles) for creating and editing them.

## Add FluentCommunity spaces and courses

When FluentCommunity is active, a **Community** row appears. Click **Manage** to open **Spaces & courses**. Members join these when their membership starts and leave when it ends.

1. Click **Add a space or course** and pick what to link.
2. For a space, choose the member's role: **Member** or **Moderator**. For a course, you can set a release date.
3. Under **When a membership ends**, choose **Remove access** (default) or **Keep access**.
4. Click **Done**, then **Save** on the page.

Members who already have the level aren't added on their own. Use **Add now** on a linked item to add them. See [FluentCommunity](/docs/integrations/fluent-community).

## Enroll members in LMS courses

When a supported learning plugin is active, a **Courses** row appears. Click **Manage** to open **Course enrollment**, add courses, and choose **Unenroll** (default) or **Keep enrolled** for when the membership ends. Click **Enroll now** on a course to enroll current members. Your learning plugin still controls lessons and progress. See [LMS courses](/docs/integrations/lms-courses).

## Choose what visitors without access see

Open **Message for visitors without access** to use the site default or set a message or redirect for this level. See [What blocked visitors see](/docs/content-access/unauthorized-access).

Click **Save** in the save bar to apply everything on the tab.
