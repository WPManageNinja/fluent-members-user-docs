---
title: "How Protection Works"
description: "See the checks Fluent Members runs when someone opens protected content, and what stays hidden across comments, feeds, excerpts and the REST API."
---

# How Protection Works

**Content protection** runs a short series of checks each time someone opens a post or page. Knowing the order helps you plan your Access Groups and work out why someone is blocked or let in.

## Who gets in

To open protected content, a member needs all of the following:

- A level attached to a group that covers the content. One group is enough, even if other groups cover the same content.
- A membership on that level with the status **Active** or **Trial**. See [Membership statuses](/reference/membership-statuses).
- A membership that has not passed its expiry date.
- Content that has dripped open, if the group uses [Content Drip](/docs/access-groups/content-drip).

The **Members of** row on a group names the levels that unlock it:

![Screenshot of the Content Protection Rules card with the Members of row and the levels that can access the content](/images/access-groups/how-protection-works/how-protection-works-members-of.webp)

Logged-out visitors never pass these checks.

> [!Note]
> An inactive group protects nothing, but it can still grant access. If an active group protects a post and a member's level is attached to an inactive group whose rules also cover that post, the member gets in. To remove a level's access, [detach the level from the group](/docs/levels/attaching-access-groups) instead of deactivating the group.

## The order of the checks

For a post or page, Fluent Members works down this list and stops at the first match:

1. **Global exclusion:** Content listed under **Exclude Content from Restriction** in [General Settings](/docs/settings/general) is public. This covers the posts and pages you list, and any post in a category or tag you list.
2. **Access Groups panel:** If the post has groups ticked in its [Access Groups panel](/docs/access-groups/per-post-restrictions), only those groups count. The rules of your other groups are ignored for this post.
3. **Group rules:** If no active group's rules cover the content, it is public. An item listed under **Excluded** on a rule doesn't count as covered by that rule.
4. **Member's groups:** If a group covers the content, the member must hold a level for a group that covers it.

Anyone who fails gets the result set under [When Unauthorized](/docs/access-groups/unauthorized-access). If [Login Popup](/docs/settings/login-popup) is on with **Auto Open Popup**, the login form opens over that result for logged-out visitors, unless the group redirects them.

## What a blocked visitor sees

On a single post or page, a visitor who fails the checks gets one of these:

- **A redirect:** If the group's unauthorized action is a redirect, the visitor is sent to that URL instead of seeing the page.
- **A preview:** If [Partial Content Lock](/docs/settings/partial-content-lock) is on and the post is longer than its **Preview Length**, the visitor sees the start of the post with a blurred overlay, a message and a button.
- **The restriction message:** In every other case, the visitor sees the message set under [When Unauthorized](/docs/access-groups/unauthorized-access).

Content that is still dripping never redirects and never shows the partial preview. The visitor sees the restriction message until the content opens. See [Content Drip](/docs/access-groups/content-drip).

An **Entire Website** rule goes further than single posts. It also covers the blog page, archives, search results and feeds, so a blocked visitor is redirected or sees the restriction message there too. See [Restriction types](/docs/access-groups/protected-content).

> [!Note]
> Users with the `manage_options` capability, which normally means administrators, skip all protection on your site. Test from a private window or with a member account.

People who can edit a post can also see its real content in the editor and in WordPress preview. On the live page, they are treated like anyone else unless they are administrators.

## What stays protected

Protection follows the content beyond its own page. For a visitor without access:

| Where | What happens |
|---|---|
| **Comments** | Existing comments are hidden, the comment form closes and the comment count shows zero. The comment feed and comment REST responses are covered too. |
| **Lists and loops** | The post's content is replaced wherever a loop shows it, including the Query Loop and Latest Posts blocks. |
| **Excerpts** | Follow **Excerpts of Restricted Posts** in [Default unauthorized access](/docs/settings/unauthorized-access). |
| **Feeds** | Content and excerpt are replaced by the restriction text, and enclosures such as podcast files are removed. |
| **REST API** | The request gets a permission error instead of the post's data: `401` for a logged-out visitor and `403` for a logged-in user without access. Editors who request the `edit` context for a post they can edit still get the data. |

These happen automatically, with nothing to turn on.

Post titles, however, stay visible on your blog, archives and search results by default. To hide protected posts from those lists, and from feeds and widgets, turn off **Show restricted posts on listing pages** in [Default unauthorized access](/docs/settings/unauthorized-access). Posts that are dripping or showing a partial preview stay listed either way.

## Protect part of a page

[Restricted blocks](/docs/access-groups/gutenberg-block/inserting) run a separate check. Only the groups ticked on the block count, and a member with a level for one of those groups can see it. **Exclude Content from Restriction** does not apply, so a restricted block stays restricted on an excluded page.

For small inline pieces of a classic post or a template, use the `[fluent_members]` shortcode. See [Shortcodes](/reference/shortcodes).
