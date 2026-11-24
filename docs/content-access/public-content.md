---
title: "Public Content"
description: "List the pages, posts, products and categories that everyone can see, even when a membership or an Entire website rule would lock them."
---

# Public Content

**Public content** is the list of items every visitor can open, whatever your memberships protect. It beats every membership, so use it for pages like About, Contact or Terms when a broad rule such as **Entire website** would otherwise lock them.

This screen was called **Always open** in earlier versions.

## Add public content

1. Go to **Fluent Members → Settings → Public content**.
2. Under **Your content**, click **Add content**. The **Add to public content** dialog opens on the **Pages** tab.
3. Pick a type tab if you need one, then tick the items. Search to find single items.
4. Click **Add (n) items**.

![Screenshot of the Add to public content dialog with two pages ticked](/images/content-access/public-content/public-content-add-dialog.webp)

The items save as soon as you add them. There is no **Save** button on this screen.

Each row shows the item's name and type, such as **Page**, **Post**, **Category** or **Tag**. Click **×** to remove an item. The item goes back to following your memberships.

> [!Note]
> Adding a category or tag makes the posts in it public, and its archive page stays reachable even when an **Entire website** rule is on.

## Items a membership would lock

An orange tag such as **Also in (level)** on a row means a membership would lock that item. It stays public, because public content wins. Remove the item here to hand it back to the membership.

<!-- TODO(screenshot): public-content-2
  screen: Settings, Public content list
  state: one row with the orange Also in tag
  data: a page also unlocked by a level named Gold
  highlight: the orange tag on the row
  view: admin
  alt: Screenshot of a public content row with an orange tag showing a membership would lock it
-->

## System pages

Under **System pages**, Fluent Members lists pages that are always public and can't be removed. They are added for you:

- **Pricing**, **Checkout** and **Member portal** from Fluent Members.
- **Privacy Policy** from WordPress.
- The checkout, cart, receipt, customer profile, login and registration pages of FluentCart, when it is active.

This is why an **Entire website** rule doesn't block visitors from your pricing and checkout pages.

## See who can open an item

The Content Access tab and the editor show who can see an item, and mark public content so you don't wonder why a lock doesn't apply:

- In the **Add content** dialog on a level, a **Public now** badge means the item is open to everyone today and adding it makes it members only. **Public** and **System page · public** mark items a membership cannot lock.
- In the post editor, the **Membership access** panel has a **Who can see this?** line, such as **Everyone · Public content (About)** or **Members of Gold**. For a members-only item, **Make public** adds it to this list in one click. For a public item, **Remove from public content** takes it off. See [Protect a single post](/docs/content-access/per-post-restrictions).

Public content applies everywhere that protection applies: pages, comments, excerpts, feeds and the REST API. [How protection works](/docs/content-access/how-protection-works) lists the order of checks.

To keep an item out of one level's content without making it public for everyone, use **Leave out** on the [Content Access tab](/docs/levels/content-access) instead.
