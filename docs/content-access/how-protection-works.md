---
title: "How Protection Works"
description: "See the checks Fluent Members runs when someone opens protected content, and what stays hidden across comments, feeds, excerpts and the REST API."
---

# How Protection Works

**Content protection** runs a short series of checks each time someone opens a post or page. Knowing the order helps you plan your levels and Bundles and work out why someone is blocked or let in.

## Who gets in

To open protected content, a member needs all of the following:

- A level whose [Content Access](/docs/levels/content-access) covers the content, through its own content, an included membership or a [Bundle](/docs/content-access/bundles). One path is enough, even if other levels also cover it.
- A membership on that level with the status **Active** or **Trial**.
- A membership that has not passed its expiry date.
- Content that has been released, if the row has a [release schedule](/docs/content-access/content-drip).

Logged-out visitors never pass these checks.

## The order of the checks

For a post or page, Fluent Members works down this list and stops at the first match:

1. **Public content:** An item on the [Public content](/docs/content-access/public-content) list, or a system page such as pricing, checkout or the member portal, is open to everyone.
2. **Memberships ticked on the post:** If the post has memberships or Bundles picked in its [Membership access panel](/docs/content-access/per-post-restrictions), members of those get in.
3. **Level and bundle content:** If no level or Bundle covers the content, and nothing is ticked on the post, it is public.
4. **The member's levels:** If something covers the content, the member needs a level that covers it. An item left out of a level's content doesn't count for that level.

Anyone who fails gets the result set in [Restricted content](/docs/content-access/restricted-content), or the level's or bundle's own [message](/docs/content-access/unauthorized-access).

## What a blocked visitor sees

On a single post or page, a visitor who fails the checks gets one of these:

- **A redirect:** If the action is a redirect, the visitor is sent to that URL instead of seeing the page.
- **A teaser:** If **Non-members see** is **A teaser** and the post is longer than the teaser length, the visitor sees the start of the post, then your message and button.
- **The message:** In every other case, the visitor sees the message and button.

Content that is still waiting for its release time never redirects and never shows a teaser. The visitor sees a countdown until it opens. See [Release content over time](/docs/content-access/content-drip).

An **Entire website** rule goes further than single posts. It also covers the blog page, archives, search results and feeds, so a blocked visitor is redirected or sees the message there too. Public content and system pages stay open. See [What you can protect](/docs/content-access/protected-content).

> [!Note]
> Users with the `manage_options` capability, which normally means administrators, skip all protection on your site. Test from a private window or with a member account.

People who can edit a post can also see its real content in the editor and in WordPress preview.

## What stays protected

Protection follows the content beyond its own page. For a visitor without access:

| Where | What happens |
|---|---|
| **Comments** | Existing comments are hidden, the comment form closes and the comment count shows zero. The comment feed and comment REST responses are covered too. |
| **Lists and loops** | The post's content is replaced wherever a loop shows it, including the Query Loop and Latest Posts blocks. |
| **Excerpts** | Follow **Archives and feeds** in [Restricted content](/docs/content-access/restricted-content). |
| **Feeds** | Content and excerpt are replaced by the members-only note, and enclosures such as podcast files are removed. |
| **REST API** | The request gets a permission error instead of the post's data: `401` for a logged-out visitor and `403` for a logged-in user without access. Editors who request the `edit` context for a post they can edit still get the data. |

These happen automatically, with nothing to turn on.

Post titles stay visible on your blog, archives and search results by default. To hide protected posts from lists, set **Archives and feeds** to **Hide them from lists** in [Restricted content](/docs/content-access/restricted-content).

## Protect part of a page

The **Restricted Content** block runs a separate check. Only the memberships picked on the block count, and a member of one of them can see it. See [Restricted blocks](/docs/content-access/gutenberg-block/inserting).

For small inline pieces of a classic post or a template, use the `[fluent_members]` shortcode.
