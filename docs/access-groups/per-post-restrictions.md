---
title: "Protect a Single Post"
description: "Lock one post, page or custom post type item from the Access Groups panel in its editor, without changing your group rules."
---

# Protect a Single Post

The **Access Groups** panel in the editor protects one post or page on its own. Use it for a one-off item, or for a custom post type item that [group rules](/docs/access-groups/protected-content) can't pick. You need at least one active Access Group.

## Protect the post

1. Open the post or page in the WordPress editor.
2. In the sidebar, open the **Post** or **Page** tab and expand the **Access Groups** panel.
3. Tick the groups that should unlock this post.
4. Click **Save** or **Update**.

![Screenshot of the block editor with the Access Groups panel in the Post sidebar and one group ticked](/images/access-groups/per-post-restrictions/per-post-restrictions-panel.webp)

A member now needs a level attached to one of the ticked groups. Visitors without access get the group's [When Unauthorized](/docs/access-groups/unauthorized-access) result. If you tick several groups, they get the result of one of them, so give those groups matching settings.

## How it works with group rules

Your ticks replace the group rules for this post. Only the ticked groups count, even if another group's rules also cover the post. For example, if **All Posts** in one group covers the post and you tick a different group here, only members of the ticked group can open it.

With nothing ticked, the post simply follows your group rules. Inactive groups aren't listed, and a group that goes inactive later stops counting.

**Exclude Content from Restriction** in [General Settings](/docs/settings/general) still wins: an excluded post stays public even with groups ticked.

## Custom post types and the classic editor

The panel appears for every post type that uses the block editor. Post types that use the classic editor show an **Access Groups** box in the side column instead, with the same checkboxes. It has no partial preview controls.

## Change the preview for this post

When [Partial Content Lock](/docs/settings/partial-content-lock) is on and at least one group is ticked, more controls appear in the panel:

![Screenshot of the Access Groups panel with Enable Partial Content Lock, Preview Word Count, Overlay Message, Button Text and Button URL](/images/access-groups/per-post-restrictions/per-post-restrictions-partial.webp)

| Control | Notes |
|---|---|
| **Enable Partial Content Lock** | On by default. Turn it off to skip the preview on this post, so visitors get the normal [When Unauthorized](/docs/access-groups/unauthorized-access) result. |
| **Preview Word Count** | From 10 to 500 words. |
| **Overlay Message** | Leave blank to use the global message. |
| **Button Text** | Leave blank to use the global text. |
| **Button URL** | Leave blank to use the global URL. |

Unticking every group also turns **Enable Partial Content Lock** off for this post. Turn it back on if you tick a group again later.

> [!Note]
> Users who are not administrators may see a read-only panel. [Permissions](/docs/settings/permissions) controls who can add, change or remove restrictions.
