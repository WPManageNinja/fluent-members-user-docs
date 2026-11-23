---
title: "Membership Levels Block"
description: "Show your membership levels and their pricing plans on any page with the Membership Levels block."
---

# Membership Levels Block

The **Membership Levels** block shows the levels you choose, with their pricing plans and buy buttons, on any page or post. Use it to build a pricing page or add plans to a landing page.

## Add the block

1. Click the **+** button in the WordPress editor and search for **Membership Levels**.
2. Click the block. A picker appears on the page.
3. Tick the levels to show. Use **Search levels…** to find one by name or ID.
4. Click **Display Selected**. The button shows how many levels you ticked, and the block now previews your plans.
5. Click **Save** or **Update**.

<!-- TODO(screenshot): membership-levels-block-1
  screen: Block editor with a new Membership Levels block
  state: Picker open on the canvas with levels listed and one ticked
  data: At least two active levels with prices
  highlight: Search levels field and the Display Selected button
  view: admin
  alt: Screenshot of the Membership Levels block picker with a list of levels to tick
-->

Only active levels are offered. A block with no level selected shows nothing on your site. If you have no levels yet, the picker offers **Create a Membership Level**.

## Block settings

Select the block and open the **Block** tab in the sidebar. The settings sit in four panels.

<!-- TODO(screenshot): membership-levels-block-2
  screen: Block editor with the Membership Levels block selected
  state: Block tab showing the Membership Levels, Layout, Button Text and Display panels open
  data: Two levels selected
  highlight: -
  view: admin
  alt: Screenshot of the Block tab with the Membership Levels, Layout, Button Text and Display panels open
-->

### Membership Levels

Under **Levels to display**, use **Search and select levels** to add a level by name. Remove a level by deleting its token from the field.

### Layout

**Plans per row** sets how many plan cards appear per row within each level, from 1 to 4. The default is 3.

### Button Text

Both fields are optional:

| Field | Notes |
|---|---|
| **Logged-in button** | The label for visitors who can buy straight away. Defaults to **Choose plan**. |
| **Logged-out button** | The label for logged-out visitors when the level requires login first. Defaults to **Log In to Purchase**. |

### Display

All of these are toggles:

| Toggle | Notes |
|---|---|
| **Show level title** | Shows the level's name above its plans. On by default. |
| **Show level description** | Shows the level's description. On by default. |
| **Show level name in plan cards** | Repeats the level name on each plan card. Off by default while the level title is shown, and on when the title is hidden. |

## What visitors see

Each level appears as a section with its plan cards. A level with no plan available to buy is left out of the page. Administrators see a note in its place. Visitors see nothing.

<!-- TODO(screenshot): membership-levels-block-3
  screen: A page on the site with the Membership Levels block
  state: Two levels each with plan cards
  data: Two active levels with priced plans
  highlight: -
  view: frontend
  alt: Screenshot of the Membership Levels block on a page with a section for each level and its plan cards
-->

To add the same list without the block, use the `[fluent_membership_levels]` shortcode.
