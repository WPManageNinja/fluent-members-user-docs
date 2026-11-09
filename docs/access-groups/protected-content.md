---
title: "Restriction Types"
description: "Choose what an access group protects: posts, pages, specific items, products or your whole site, with exclusions for each rule."
---

# Restriction Types

**Restriction types** decide what an Access Group protects. Each rule in a group has one type, and a group can hold as many rules as you need.

## Add a rule

1. Go to **Fluent Members → Access Groups** and open a group.
2. Under **Content Protection Rules**, open the **Select Restriction Type** list in the **1st Rule** card and choose a type.
3. To protect something else with the same group, click **Add Another Rule** and choose its type.
4. Click **Save** in the **Unsaved Changes** bar at the top of the page. The bar appears as soon as you change a rule.

The word **Also** between two rules means *Access is granted if any rule matches*: the group protects everything any of its rules covers, and members of its levels can open all of it. The trash icon on a card removes that rule.

![Screenshot of the Content Protection Rules card with two rule cards joined by Also](/images/access-groups/protected-content/protected-content-1.webp)

## Core types

These types are always available:

| Type | What it protects |
|---|---|
| **Entire Website** | Every page of your site, including archives, the blog page and feeds. |
| **All Posts** | Every post, including posts you publish later. Custom post types are not included. |
| **All Pages** | Every page, including pages you publish later. |
| **All Categories Archive** | Every post, the same as **All Posts**. The category archive page itself still opens. |
| **All Tags Archive** | Every post, the same as **All Posts**. The tag archive page itself still opens. |
| **Specific Post/Page/CPT/Taxonomy etc.** | Only the posts, pages, categories and tags you pick. Terms from custom taxonomies protect nothing. |

Here's how the list looks when you choose a type:

![Screenshot of the restriction type list open on a rule card, showing the Core types](/images/access-groups/protected-content/protected-content-type-list.webp)

> [!Note]
> **Entire Website** also covers your pricing, checkout and member portal pages. Add them under **Excluded**, or visitors can't reach the pages they need to join.

## FluentCart types

These appear under **FluentCart Products** when FluentCart is active:

| Type | What it protects |
|---|---|
| **All Products** | Every FluentCart product. |
| **All Digital Products** | Every digital product. |
| **All Physical Products** | Every physical product. |
| **Specific Products/Categories/Brands etc.** | Only the products, categories and brands you pick. |
| **All Product Categories** | Every product, the same as **All Products**. |
| **All Product Brands** | Every product, the same as **All Products**. |

## WooCommerce types (Pro)

These appear under **WooCommerce Products** when Fluent Members Pro and WooCommerce are both active:

| Type | What it protects |
|---|---|
| **WC All Products** | Every WooCommerce product. |
| **WC All Product Categories Archive** | Every product, the same as **WC All Products**. |
| **WC All Product Tags Archive** | Every product, the same as **WC All Products**. |
| **WC All Product Brands Archive** | Every product, the same as **WC All Products**. |
| **WC All Product Shipping Classes Archive** | Every product, the same as **WC All Products**. |
| **Specific Products/Categories/Brands etc.** | Only the items you pick. |

## Pick specific items

The **Specific** types show a **Protected Content** field in the rule card.

1. Click **Add Content** and type part of a title.
2. Click a result to add it. Results are grouped by type, such as **Posts**, **Pages**, **Categories** and **Tags**. A tick marks an item you already added.

![Screenshot of the Protected Content field with a search open and matching pages listed under Pages](/images/access-groups/protected-content/protected-content-pick-specific.webp)

Picking a category or tag protects every post assigned directly to it, including posts you add later. A post that is only in a child category is not covered when you pick the parent, so it stays public. Pick each child category too. A single post or page stays the only one protected until you add more.

> [!Note]
> The **Specific Post/Page/CPT/Taxonomy etc.** search also lists terms from custom taxonomies, under **Categories** or **Tags**. Picking one saves without an error but protects nothing, so that content stays public. To protect a custom post type item, use the [Access Groups panel](/docs/access-groups/per-post-restrictions) in its editor.

## Exclude items from a rule

Every rule has an **Excluded** field. Click **Add Exclude** and search for the items this rule should skip. Excluding a category or tag skips the posts assigned directly to it, not posts that are only in a child category.

An exclusion applies to its own rule only. If another rule or another group covers the item, the item stays protected. To make something public across all your groups, use **Exclude Content from Restriction** in [General Settings](/docs/settings/general).

## Test your rules

Administrators skip all protection on your site, so log out or use a private window to see what visitors see. [How protection works](/docs/access-groups/how-protection-works) explains which check decides the result.
