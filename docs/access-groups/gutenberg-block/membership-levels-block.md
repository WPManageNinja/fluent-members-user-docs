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

![Screenshot of the Membership Levels block picker with a list of levels and the sidebar settings](/images/access-groups/gutenberg-block/membership-levels-block/membership-levels-block-picker.webp)

Only active levels are offered. A block with no level selected shows nothing on your site.

## Block settings

Select the block and open the **Block** tab in the sidebar. The settings sit in four panels.

![Screenshot of the Block tab with the Membership Levels, Layout, Button Text and Display panels open](/images/access-groups/gutenberg-block/membership-levels-block/membership-levels-block-settings.webp)

### Membership Levels

Choose **Levels to display** in either field, and remove a level by deleting it from the first field:

- **Search and select levels:** Type a level's name and pick it from the suggestions.
- **Select a level:** Choose one from the dropdown to add it.

### Layout

**Plans per row** sets how many plan cards appear per row within each level, from 1 to 4. The default is 3.

### Button Text

Both fields are optional:

| Field | Notes |
|---|---|
| **Logged-in button** | The label for visitors who can buy straight away. Defaults to **Choose plan**. |
| **Logged-out button** | The label for logged-out visitors when the level requires login first. Defaults to **Login to Purchase**. |

### Display

All of these are toggles:

| Toggle | Notes |
|---|---|
| **Show level title** | Shows the level's name above its plans. On by default. |
| **Show level description** | Shows the level's description. On by default. |

## What visitors see

Each level appears as a section with its plan cards. A level with no plan available to buy is left out. Administrators see a note in its place, such as *Silver Monthly is hidden — it has no plan customers can buy yet.* Visitors see nothing.

![Screenshot of the Membership Levels block on a page with a section for each level and its plan cards](/images/access-groups/gutenberg-block/membership-levels-block/membership-levels-block-frontend.webp)

To add the same list without the block, use the `[fluent_membership_levels]` shortcode. See [Shortcodes](/reference/shortcodes) and [Pricing page](/docs/selling/pricing-page).
