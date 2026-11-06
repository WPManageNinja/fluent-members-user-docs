---
title: "Access Groups Overview"
description: "Create access groups that link your protected content to Membership Levels, and find every content protection feature in one place."
---

# Access Groups Overview

An **Access Group** links the content you want to protect to the Membership Levels that unlock it. Create one whenever a set of posts, pages or products should be for members only.

::: doc-tree access hero

## What do you want to do?

Pick the goal that sounds like yours. Each card takes you straight to the right guide.

::: doc-tree access tasks

## Every protection feature on one map

Here is the whole protection system at a glance, grouped by where you set it. Click a feature to open its guide.

::: doc-tree access map

## The Access Groups list

Go to **Fluent Members → Access Groups** to see your groups. Use the **All**, **Active** and **Inactive** tabs to filter the list, or click the search icon to find a group by name.

![Screenshot of the Access Groups list with the Create Access Group button](/images/access-groups/overview/access-group.webp)

Each row shows a summary of the group:

| Column | What it shows |
|---|---|
| **ID** | The group's number. |
| **Title** | The group's name. |
| **Protected Content** | How many items the rules cover. A rule such as **All Posts** counts as one item. |
| **Excluded** | How many items the rules leave out. |
| **Drip** | The state of [Content Drip](/docs/access-groups/content-drip), for example `2 items · After`. `Off · 1 rule unused` means rules exist but the toggle is off. |
| **Used By** | How many levels unlock the group. Hover to see their names. |
| **Status** | **Active** or **Inactive**. An inactive group protects nothing, but it can still grant access to content an active group protects. To remove access, [detach the level](/docs/levels/attaching-access-groups). |

## Create an access group

1. Go to **Fluent Members → Access Groups** and click **Create Access Group**.
2. Enter a **Title**. **Description** is optional. **Status** starts on **Active**.
3. Click **Create**. The group's edit page opens.

    ![Screenshot of the Create Access Group dialog with Title, Description and Status](/images/access-groups/overview/access-groups-index-create-dialog.webp)

4. Under **Content Protection Rules**, click **Add Level** next to **Members of** and choose the levels that unlock this group.
5. In the rule card, choose what to protect. [Restriction types](/docs/access-groups/protected-content) lists every option.
6. Under **When Unauthorized**, keep the global default or click **Customize for this rule** to [set what blocked visitors see](/docs/access-groups/unauthorized-access).
7. Click **Save** in the bar at the top of the page.

The content is protected as soon as you save.

## What's on the edit page

The edit page has four cards, and one **Save** bar that appears at the top when you change something. **Cancel** in the same bar discards your changes.

![Screenshot of an access group's edit page with Basic Information, Content Protection Rules, When Unauthorized and Content Drip](/images/access-groups/overview/access-group-edit-full-2.webp)

- **Basic Information:** **Title**, **Description** and **Status**.
- **Content Protection Rules:** The **Members of** row names the levels that unlock the group. The rule cards below it set what is protected.
- **When Unauthorized:** What visitors without access see.
- **Content Drip:** A toggle that releases content on a schedule after a member joins.

You can also attach groups from the level's side, and the result is the same. See [Attach access groups](/docs/levels/attaching-access-groups).

## Duplicate or delete a group

Click the three-dot menu at the end of a row for **Edit**, **Duplicate** and **Delete**.

![Screenshot of the row menu on the Access Groups list with Edit, Duplicate and Delete](/images/access-groups/overview/access-groups-index-row-menu.webp)

- **Duplicate:** Creates a copy with the same rules, settings and levels. Its title ends in ` - Duplicated(<id>)`, where `<id>` is the original group's ID.
- **Delete:** Also available under **More Actions** on the edit page. A group that a level still uses cannot be deleted. The error names the levels, so remove the group from them first.
