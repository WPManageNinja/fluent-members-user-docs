---
title: "Protect a Single Post"
description: "Lock one post, page or custom post type item, or let extra memberships in, from the Membership access panel in its editor."
---

# Protect a Single Post

The **Membership access** panel in the editor protects one post or page on its own. Use it for a one-off item, or to let a membership open an item without changing that level's content rules. You need at least one active Membership Level.

## Protect the post

1. Open the post or page in the WordPress editor.
2. In the sidebar, open the **Post** or **Page** tab and expand **Membership access**.
3. Under **Add to memberships**, choose **Only these memberships**.
4. In **Memberships and content bundles**, pick the memberships and [Bundles](/docs/content-access/bundles) that should unlock the post.
5. Click **Save** or **Update**.

![Screenshot of the Membership access panel with Only these memberships selected and one membership picked](/images/content-access/per-post-restrictions/per-post-restrictions-1.webp)

Picking a membership adds this post to that membership's content. The panel's **Who can see this?** line updates after you save, for example **Members of Gold**. Visitors without access get the message set for the membership. See [What blocked visitors see](/docs/content-access/unauthorized-access).

## How it works with level rules

The panel adds to your rules. It doesn't replace them.

- **Follow membership rules (recommended):** Nothing is ticked. The post follows the content rules on your levels.
- **Also let these memberships in:** Shown when level rules already protect the post. The memberships you pick get in too, and members whose levels already cover the post keep access.
- **Only these memberships:** Shown when no rule protects the post. Only the memberships you pick can open it.

Switching back to **Follow membership rules** clears your picks. If you pick a membership that is inactive, it isn't offered.

[Public content](/docs/content-access/public-content) still wins. For an item that is public, the panel says so, and **Remove from public content** hands it back to your memberships. For a members-only item, **Make public** opens it to everyone in one click.

## Custom post types and the classic editor

The panel appears for every post type that uses the block editor. Post types that use the classic editor show a **Membership access** box in the side column instead, with **Memberships** and **Content bundles** checkboxes. It has no teaser controls.

## Change the teaser for this post

When [Restricted content](/docs/content-access/restricted-content) is set to **A teaser** and you've picked at least one membership, more controls appear in the panel:

| Control | Notes |
|---|---|
| **Enable Partial Content Lock** | Turn it off to skip the teaser on this post, so visitors see the normal message. |
| **Preview Word Count** | From 10 to 500 words. |
| **Overlay Message** | Leave blank to use the site message. |
| **Button Text** | Leave blank to use the site text. If you set it, also set **Button URL**. |
| **Button URL** | Leave blank to use the site URL. |
| **Login link** | **Default**, **Show** or **Hide**. |
| **Login Link Text** | Shown when the login link isn't hidden. |

Clearing every membership also clears these overrides.

> [!Note]
> Who can change a restriction is set under [Permissions](/docs/settings/permissions). People without permission see a read-only panel that says so.
