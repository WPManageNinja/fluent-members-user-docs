---
title: "Nesting & Limits"
description: "What happens when restricted blocks sit inside each other, and where block restrictions stop."
---

# Nesting & Limits

[Restricted blocks](/docs/access-groups/gutenberg-block/inserting) work with any content the block editor renders. This page explains how layers of restriction combine, and where a block restriction doesn't reach.

## What a restriction covers

Fluent Members checks each block as WordPress renders it, then replaces the whole output if the visitor has no access. That covers text, media, layout blocks, embeds, buttons, shortcodes and blocks from other plugins alike, because the check doesn't depend on the block type.

Everything inside a restricted container is replaced with it. That includes a Query Loop or Latest Posts block placed inside.

## Nesting restricted blocks

You can put a restricted block or a container inside another container. Each layer with a group ticked must pass, and a layer with no group ticked adds no restriction of its own.

| Outer layer | Inner layer | Visitor sees the inner content when |
|---|---|---|
| Premium Content | Premium Content | They can access Premium Content. |
| Premium Content | Private Community | They can access both groups. |
| Premium Content | No group ticked | They can access Premium Content. |

A member who passes the outer layer but not the inner one sees the outer content, with the fixed notice where the inner block would be. A visitor who fails the outer layer sees one notice for the whole container.

> [!Note]
> Nested layers are easy to lose track of in the editor. For bonus content on higher plans, two blocks side by side are easier to manage.

## Blocks inside a protected post

Whole-post protection runs first. A visitor blocked from the post never reaches the blocks. A member who can open the post still needs access to any restricted block inside it, so the post and the block can ask for different groups.

## Limits

Block restrictions have a few limits:

- **Fixed notice:** The text can't be changed in the block. It reads **Access Restricted** and *This content requires special access privileges.* See [what everyone else sees](/docs/access-groups/gutenberg-block/inserting#what-everyone-else-sees).
- **Content outside blocks:** Only content rendered as blocks is checked. For a page built with a tool that doesn't output blocks, use a [restriction rule](/docs/access-groups/protected-content) or the [Access Groups panel](/docs/access-groups/per-post-restrictions).
- **Listings:** A restricted block doesn't change whether its post appears on your blog or in search, because the post itself isn't protected.

## REST API and feeds

The check also runs for feeds and for the content a REST API request returns:

- **REST API:** The rendered content has the same notice in place of the block, so a logged-out request doesn't receive the protected text.
- **Feeds:** The block is replaced by the line *This content requires special access privileges.*

## Plan a landing page

For a page with several protected sections, keep each section as its own block between public content:

```
Hero (public)
Pricing (public)

Access Groups block: Course Library
  What you get in the course

Access Groups block: Premium Content
  Bonus video

Call to action (public)
```

Each section stands alone. Members see the sections their levels unlock, and everyone else sees a notice in each locked section. To show your plans on the same page, add the [Membership Levels block](/docs/access-groups/gutenberg-block/membership-levels-block).
