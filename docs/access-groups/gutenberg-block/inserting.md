---
title: "Access Groups Block"
description: "Keep a post public and restrict only part of it, by locking a single block or wrapping several blocks in the Access Groups block."
---

# Access Groups Block

The **Access Groups** block protects part of a post while the rest stays public, such as a premium video or a download link inside a free article. Restrict one block from its own settings, or wrap several blocks in the container block. You need at least one active Access Group.

## Restrict a single block

Every block in the editor has its own **Access Groups** panel.

1. Click the block in the WordPress editor.
2. In the sidebar, open the **Block** tab and expand the **Access Groups** panel.
3. Tick the groups that can see this block.
4. Click **Save** or **Update**.

![Screenshot of the block editor with a paragraph selected and the Access Groups panel open in the Block tab](/images/access-groups/gutenberg-block/inserting/inserting-single-block-panel.webp)

## Restrict several blocks together

The container block protects everything you put inside it.

1. Click the **+** button in the editor and search for **Access Groups**.
2. Click the **Access Groups** block, which has a padlock icon.

    ![Screenshot of the block inserter with the Access Groups block in the search results](/images/access-groups/gutenberg-block/inserting/gutenberg-access-group-1.webp)

3. Add your content inside the block.
4. Select the container. In the **Block** tab, tick the groups under **Restrict inner content**.
5. Click **Save** or **Update**.

    ![Screenshot of the Access Groups block selected, with Restrict inner content and a group ticked in the sidebar](/images/access-groups/gutenberg-block/inserting/inserting-container-block-panel.webp)

## Who can see the block

- A member with a level attached to any ticked group sees the content.
- With no group ticked, everyone sees it. The same applies when every ticked group is inactive.
- Administrators always see it, so log out or use a private window to test.

Blocks run their own check, so the block's groups don't need rules that cover the post. **Exclude Content from Restriction** in [General Settings](/docs/settings/general) doesn't apply to blocks either.

## What everyone else sees

Blocks don't use a group's [When Unauthorized](/docs/access-groups/unauthorized-access) setting. A visitor without access sees a fixed notice in the block's place, with no redirect, custom message or button:

![Screenshot of a post on the site with a public paragraph, the Access Restricted notice and another public paragraph](/images/access-groups/gutenberg-block/inserting/inserting-frontend-restricted.webp)

Two things change that notice:

- **Partial Content Lock:** When [Partial Content Lock](/docs/settings/partial-content-lock) is on and the block's text is longer than the preview, visitors see a blurred preview instead. A block with only images or other media shows a blurred placeholder.
- **Content Drip:** A member waiting for [dripped content](/docs/access-groups/content-drip) sees the countdown notice.

## Change the preview for one block

When Partial Content Lock is on and a group is ticked, a single block's **Access Groups** panel gains more controls. The container block doesn't have them and always uses the global settings.

![Screenshot of a block's Access Groups panel with Enable Partial Content Lock, Preview Word Count, Overlay Message, Button Text and Button URL](/images/access-groups/gutenberg-block/inserting/inserting-partial-controls.webp)

Turn off **Enable Partial Content Lock** to show the fixed notice for this block. Set **Preview Word Count** from 10 to 500 words. Leave **Overlay Message**, **Button Text** or **Button URL** blank to use the global value.

## Block, panel or rule?

Use the option that matches how much you want to protect:

| You want to protect | Use |
|---|---|
| All posts, all pages or everything in a category | A [restriction rule](/docs/access-groups/protected-content) |
| One whole post, page or custom post type item | The [Access Groups panel](/docs/access-groups/per-post-restrictions) |
| Part of a post or landing page | A restricted block or the container block |

## If it doesn't work

Check these first:

| What you see | Likely cause | Fix |
|---|---|---|
| Search doesn't find the block | Fluent Members isn't active. | Activate the plugin and reload the editor. |
| No **Access Groups** panel | The sidebar is on the **Post** tab, or the panel is collapsed. | Click the block, open the **Block** tab and expand the panel. |
| Everyone can see the content | No active group is ticked, or you're logged in as an administrator. | Tick a group and test while logged out. |

[Nesting & limits](/docs/access-groups/gutenberg-block/nesting-and-limits) covers restricted blocks inside each other.
