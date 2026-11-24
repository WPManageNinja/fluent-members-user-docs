---
title: "Nesting & Limits"
description: "What happens when restricted blocks sit inside each other, and where block restrictions stop."
---

# Nesting & Limits

[Restricted blocks](/docs/content-access/gutenberg-block/inserting) work with any content the block editor renders. This page explains how layers of restriction combine, and where a block restriction doesn't reach.

## What a restriction covers

Fluent Members checks each block as WordPress renders it, then replaces the whole output if the visitor has no access. That covers text, media, layout blocks, embeds, buttons, shortcodes and blocks from other plugins alike, because the check doesn't depend on the block type.

Everything inside a restricted container is replaced with it.

## Nesting restricted blocks

You can put a restricted block or a **Restricted Content** container inside another container. Each layer with a level or Bundle picked must pass, and a layer with nothing picked adds no restriction of its own.

| Outer layer | Inner layer | Visitor sees the inner content when |
|---|---|---|
| Premium Content | Premium Content | They can access Premium Content. |
| Premium Content | Private Community | They can access both. |
| Premium Content | Nothing picked | They can access Premium Content. |

![Screenshot of the block editor with the List View showing a Restricted Content block nested inside another](/images/content-access/gutenberg-block/nesting-and-limits/nesting-and-limits-1.webp)

A member who passes the outer layer but not the inner one sees the outer content, with the restriction notice where the inner block would be. A visitor who fails the outer layer sees one notice for the whole container.

> [!Note]
> Nested layers are easy to lose track of in the editor. For bonus content on higher plans, two blocks side by side are easier to manage.

## Blocks inside a protected post

Whole-post protection runs first. A visitor blocked from the post never reaches the blocks. A member who can open the post still needs access to any restricted block inside it, so the post and the block can ask for different levels or Bundles.

## Limits

Block restrictions have a few limits:

- **Notice wording:** The notice isn't edited in the block. It comes from the level or Bundle's [restricted content settings](/docs/content-access/unauthorized-access), or from [Restricted content](/docs/content-access/restricted-content) in Settings. Blocks never redirect.
- **Content outside blocks:** Only content rendered as blocks is checked. For a page built with a tool that doesn't output blocks, protect it from a level's [Content Access](/docs/levels/content-access) tab or the [Membership access panel](/docs/content-access/per-post-restrictions).
- **Listings:** A restricted block doesn't change whether its post appears on your blog or in search, because the post itself isn't protected.

## Feeds

In an RSS feed, a restricted block is replaced by the restriction message, without the button or login link.

## Plan a landing page

For a page with several protected sections, keep each section as its own block between public content:

```
Hero (public)
Pricing (public)

Restricted Content block: Course Library
  What you get in the course

Restricted Content block: Premium Content
  Bonus video

Call to action (public)
```

Each section stands alone. Members see the sections their levels unlock, and everyone else sees a notice in each locked section. To show your plans on the same page, add the [Membership Levels block](/docs/content-access/gutenberg-block/membership-levels-block).
