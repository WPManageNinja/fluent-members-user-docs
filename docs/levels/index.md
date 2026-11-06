---
title: "Membership Levels"
description: "Find every Membership Level task in one place, then manage your levels from the list, the row menu and the level tabs."
---

# Membership Levels

A **Membership Level** is what you sell or offer on your site. It sets the price, the protected content that opens, and the people who hold it. Create a level for each kind of access you want to offer, such as Starter, Pro or Team.

::: doc-tree levels hero

## What do you want to do?

Pick the goal that sounds like yours. Each card opens the right guide.

::: doc-tree levels tasks

## Every level feature on one map

Prefer the big picture? This map follows the tabs inside a level. Click a feature to open its guide.

::: doc-tree levels map

## Set up a level in order

Follow this order for each new level:

1. [Create the level](/docs/levels/creating) and choose its **Type** and **Pricing Type**. You cannot change the **Pricing Type** later.
2. Add a price with [Native Payment](/docs/levels/pricing-native) (Pro) or a [paywall](/docs/levels/pricing-paywalls).
3. [Attach at least one active Access Group](/docs/levels/attaching-access-groups) so the level unlocks content.
4. Add the level's shortcode to your pricing page. See [Shortcodes](/reference/shortcodes) for the options.

When visitors buy or you [assign members](/docs/levels/members-on-a-level), they get everything the level's active Access Groups protect.

## The Membership Levels list

Go to **Fluent Members → Membership Levels** to see every level on your site.

![Screenshot of the Membership Levels list with seven levels, showing the ID, Title, Pricing Type, Access Group, Shortcode and Status columns](/images/levels/membership-levels-overview/index-levels-list.webp)

The list has these columns:

| Column | What it shows |
|--------|---------------|
| **ID** | The level's number. Shortcodes use it. |
| **Title** | The level's name, with its type and number of plans underneath. |
| **Pricing Type** | How the level is sold: FluentCart, FluentForms, Paymattic, WooCommerce or Native Payment. A **No gateway** tag means a Native Payment level has no payment method turned on yet. |
| **Access Group** | The Access Groups linked to the level. |
| **Shortcode** | The level's `[fluent_membership_level]` shortcode. Click it to copy. |
| **Status** | **Active** or **Inactive**. A warning icon means setup isn't finished. Hover over it to see what's missing. |

Use the controls above the table to narrow the list:

- **All**, **Active** and **Inactive** filter by status.
- The search icon finds a level by ID or title.
- The **Columns** icon shows or hides the **Pricing Type**, **Access Group**, **Shortcode** and **Status** columns.

## Edit, duplicate or delete a level

Click a row to open the level, or click the three-dot menu at the end of the row:

![Screenshot of a level's row menu open with Edit, Duplicate and Delete options](/images/levels/membership-levels-overview/index-level-row-menu.webp)

- **Edit:** Opens the level.
- **Duplicate:** Creates a copy named `<title> - Duplicated(<id>)`, with the same settings and Access Groups. Native Payment plans are copied too. Paywalls are not.
- **Delete:** Removes the level after you confirm. You can also find **Delete** under **More Actions** inside a level.

> [!Note]
> You cannot delete a level that has member records or billing history. Set its **Status** to **Inactive** instead.

## Inside a level

Opening a level shows its shortcode next to the page title, with a tab for each part of its setup. A warning icon on **Pricing** or **Access Groups** means that tab still needs attention.

![Screenshot of the Level Details tab with the Access Groups, Pricing and Members summary cards above the Level Information form](/images/levels/membership-levels-overview/index-level-details.webp)

| Tab | What it's for |
|-----|---------------|
| **Level Details** | Summary cards, plus the [title, description, status](/docs/levels/creating#step-2-complete-the-level-details) and, on corporate levels, the seat limit. |
| **Pricing** | The level's [Native Payment plans](/docs/levels/pricing-native) (Pro) or [paywalls](/docs/levels/pricing-paywalls). |
| **Access Groups** | The [groups this level unlocks](/docs/levels/attaching-access-groups). |
| **Members** | [Everyone on the level](/docs/levels/members-on-a-level), and the **Assign Members** button. |
| **Upgrade Paths** (Pro) | [Routes between plans](/docs/levels/upgrade-paths). Shown on Native Payment levels only. |
| **Integrations** | [Level integrations](/docs/levels/integrations). Shown when a supported plugin such as FluentCommunity is active. |

## Check a level before going live

Before you send visitors to your pricing page, confirm that:

- The level's **Status** is **Active**. Pricing shortcodes skip inactive levels.
- The level has a plan visitors can buy. Pricing shortcodes hide a level without one. Admins see a note saying it's hidden, and visitors see nothing.
- No warning icon shows beside the level's **Status** in the list.
- A test purchase unlocks the content you expect.
