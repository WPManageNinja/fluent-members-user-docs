---
title: "Restricted Content Block"
description: "Keep a post public and restrict only part of it, by locking a single block or wrapping several blocks in the Restricted Content block."
---

# Restricted Content Block

The **Restricted Content** block protects part of a post while the rest stays public, such as a premium video or a download link inside a free article. Restrict one block from its own settings, or wrap several blocks in the container block. You need at least one active membership level or [Bundle](/docs/content-access/bundles).

## Restrict a single block

Every block in the editor has a **Membership access** panel.

1. Click the block in the WordPress editor.
2. In the sidebar, open the **Block** tab and expand the **Membership access** panel.
3. Under **Visible to**, choose **Members of these memberships**.
4. In **Memberships and content bundles**, pick the levels or Bundles that can see this block.
5. Click **Save** or **Update**.

<!-- TODO(screenshot): inserting-1
  screen: Block editor, a paragraph block selected
  state: Block tab open, Membership access panel expanded, Visible to set to Members of these memberships with one level picked
  data: Sample post with a paragraph; a level named Premium Content
  highlight: Visible to options and the Memberships and content bundles field
  view: admin
  alt: Screenshot of the block editor with a paragraph selected and the Membership access panel open in the Block tab
-->

Choose **Everyone** under **Visible to** to remove the restriction again.

## Restrict several blocks together

The container block protects everything you put inside it.

1. Click the **+** button in the editor and search for **Restricted Content**. It sits in the **FluentMembers** block category.
2. Click the **Restricted Content** block.
3. Add your content inside the block, where it says **Add the content only these members can see.**
4. Select the container. In the **Block** tab, open **Membership access** and pick the levels or Bundles in **Memberships and content bundles**.
5. Click **Save** or **Update**.

<!-- TODO(screenshot): inserting-2
  screen: Block editor with the Restricted Content block selected
  state: Block tab open, Membership access panel showing Who can see the content inside this block with one level picked
  data: Sample post; container holding a paragraph
  highlight: Memberships and content bundles field
  view: admin
  alt: Screenshot of the Restricted Content block selected, with its Membership access panel and a membership picked
-->

On the editor canvas the container shows **Members only** and the names of the picked memberships. With nothing picked it shows **No membership picked, so everyone can see this**.

> [!Note]
> If you have no levels or Bundles yet, the panel says **No memberships yet. Create one in FluentMembers to restrict this content.** Click **Create a membership**, then reload the editor. Only active levels are offered.

## Who can see the block

- A member with an active membership in any picked level or Bundle sees the content.
- With nothing picked, everyone sees it. The same applies when every pick is inactive or no longer exists.
- Someone who can edit the post sees the block in the editor and in Preview.

Blocks run their own check, so the picked levels or Bundles don't need rules that cover the post. To confirm what visitors see, log out or use a private window.

Picking a level restricts the block to that level. Picking a Bundle restricts it to every level that includes the Bundle. See [Bundles](/docs/content-access/bundles).

## What everyone else sees

A visitor without access sees a restriction notice in the block's place. Blocks never redirect. The notice holds a headline (**Members only** by default), the message, a button (**Join now**, linking to your pricing page when one is set) and, for logged-out visitors, **Already a member? Log in**.

The wording comes from the level or Bundle that has its own [restricted content settings](/docs/content-access/unauthorized-access). Without one, it comes from [Restricted content](/docs/content-access/restricted-content) in Settings.

<!-- TODO(screenshot): inserting-3
  screen: A post on the site, logged out
  state: Public paragraph, the restriction notice from a Restricted Content block, another public paragraph
  data: Default restricted content settings
  highlight: -
  view: frontend
  alt: Screenshot of a post on the site with a public paragraph, the Members only notice and another public paragraph
-->

Two things change that notice:

- **Teaser:** When Restricted content is set to **A teaser** and the block's text is longer than the preview, visitors see the first words with a fade or blur instead. A block with only images or other media shows a blurred placeholder. See [Partial Content Lock](/docs/settings/partial-content-lock).
- **Content Drip:** A member waiting for [dripped content](/docs/content-access/content-drip) sees the countdown notice.

## Change the preview for one block

When Restricted content is set to **A teaser** and a level or Bundle is picked, a single block's **Membership access** panel gains more controls. The container block doesn't have them and always uses the global settings.

| Control | Notes |
|---|---|
| **Enable Partial Content Lock** | Turn off to show the plain notice for this block. |
| **Preview Word Count** | From 10 to 500 words. |
| **Overlay Message** | Leave blank to use the global message. |
| **Button Text** and **Button URL** | Leave blank to use the global button. **Button URL** is required when **Button Text** is set. |
| **Login link** | **Default**, **Show** or **Hide**. |
| **Login Link Text** | Shown unless the login link is hidden. Leave blank to use the default. |

## Block, panel or rule?

Use the option that matches how much you want to protect:

| You want to protect | Use |
|---|---|
| Everything a level unlocks | The level's [Content Access](/docs/levels/content-access) tab |
| One whole post, page or custom post type item | The [Membership access panel](/docs/content-access/per-post-restrictions) |
| Part of a post or landing page | A restricted block or the container block |

## If it doesn't work

Check these first:

| What you see | Likely cause | Fix |
|---|---|---|
| Search doesn't find the block | Fluent Members isn't active. | Activate the plugin and reload the editor. |
| No **Membership access** panel | The sidebar is on the **Post** tab, or the panel is collapsed. | Click the block, open the **Block** tab and expand the panel. |
| The picker is read-only | Your account can't change saved restrictions. | Ask an administrator or manager to change it. |
| Everyone can see the content | Nothing is picked, or every pick is inactive. | Pick an active level or Bundle and test while logged out. |

[Nesting & limits](/docs/content-access/gutenberg-block/nesting-and-limits) covers restricted blocks inside each other.
