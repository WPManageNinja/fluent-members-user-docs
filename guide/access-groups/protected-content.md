# Protected Content: Restriction Types

The **Protected Content** section of an Access Group answers one question: *what's inside the bag?* You pick from a single dropdown, **Apply Restriction To**, and the items underneath light up to be protected.
**Here's what you'll learn:**
- Where to find the *Apply Restriction To* dropdown.
- Every restriction type the dropdown lists, plain English.
- How integration-provided types (FluentCart, WooCommerce, etc.) appear.
- When new content gets protected automatically, and when it doesn't.

**Before we start:** You have an Access Group open in the edit screen. If not, see [Access Groups Overview](./).

---

## Step 1: Find the dropdown

In the Access Group edit page, the **Protected Content** card sits in the left column under Basic Information. It has one field labelled **Apply Restriction To** with placeholder *"Select Type"*.

Click it, the options drop down.

![Apply Restriction To dropdown open](/screenshots/access-group-restriction-dropdown.webp)

---

## The restriction types

The dropdown lists these options (the labels are what you'll see in the UI):

| Type                                       | Protects                                                                                  | New content auto-protected? |
|---------------------------------------------|--------------------------------------------------------------------------------------------|:--:|
| **All Posts**                              | Every WordPress post (default post type).                                                  | Yes |
| **All Pages**                              | Every WordPress page.                                                                       | Yes |
| **All Categories Archive**                 | The category-listing archive pages (`/category/foo/`).                                     | Yes |
| **All Tags Archive**                       | The tag-listing archive pages (`/tag/foo/`).                                              | Yes |
| **Specific Post/Page/CPT/Taxonomy etc.**   | A handpicked list, you search and add specific items (post, page, custom post type, category, tag, custom taxonomy). | No, only the items you add |
| **FluentCart PRODUCTS**                    | FluentCart products you select (or all of them).                                           | Depends on the sub-rule    |
| **All Products**                           | Every product across active commerce integrations.                                         | Yes                         |

::: tip In plain language
- *All Posts* is the "everyone in this room" rule, new posts join the room automatically.
- *Specific Post/Page/CPT/Taxonomy etc.* is the "named guest list" rule, only the items you add are protected; new content isn't.
:::

---

## Integration-provided types

The list grows when host plugins are active. If FluentCart is installed, **FluentCart PRODUCTS** shows up. If WooCommerce is installed (with Fluent Members Pro), **All Products** covers WC products too. These types come from the same registry that the [Paywalls Pricing](../levels/pricing-paywalls) modal uses, they describe content sources, not just storefronts.

::: warning Integration content is restricted, not paywalled
This dropdown decides *who sees* a product, anyone without an active Level is blocked. It does NOT auto-sell the product as a paywall. To map a product to a Level so a purchase grants the Level, use [Pricing, Paywalls](../levels/pricing-paywalls).
:::

---

## "Specific", how the picker works

Pick **Specific Post/Page/CPT/Taxonomy etc.** and an item-picker appears under the dropdown. Search by title; results are grouped by source (e.g. *Posts*, *Pages*, *Lessons (CPT)*, *Category: Premium*). Click items to add them. Remove by clicking the X on the chip.

You can mix sources in one rule, e.g. one specific page + three lessons + the *Premium* category.

---

## A real example: Sara's Pro Lessons

Sara's content is a custom post type called `lesson`. She picks:

- **Apply Restriction To:** *Specific Post/Page/CPT/Taxonomy etc.*
- **Items:** `Post Type → Lessons` (selects every lesson, present and future, of that CPT).

Now every lesson post is protected. When she publishes lesson 47 next week, it inherits the rule automatically because she selected the post type rather than handpicking individual posts.

---

## How rules combine inside one Group

Each Group has exactly one **Apply Restriction To** value. To protect content from two different types (e.g. all posts *and* all FluentCart products), create two Groups and attach both to the same Level. The user holds the Level → both Groups grant access.

::: tip One Group, one rule type
Don't try to mix "All Posts" and "All Pages" inside the same Group, there's no UI for that. Two Groups, one Level.
:::

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Protected post still visible to logged-out visitors | You're testing as an admin. Admins bypass restrictions. | Test in an incognito window. |
| Dropdown doesn't show *FluentCart PRODUCTS* | FluentCart isn't installed/active. | Activate the plugin. |
| Specific items picker doesn't find your CPT | The CPT isn't registered as `public` in your code. | Register it as public. |
| New lessons aren't protected | You used "Specific" with a handpicked list. | Switch to a post-type-level rule. |

---

## What's next?

- **→ [Unauthorized Access](./unauthorized-access)**: what non-members see.
- **→ [Active Levels](/guide/levels/attaching-access-groups)**: which Levels can unlock this Group.

**Recommended reading:**
- [Content Drip](/guide/levels/content-drip): time-gate the items inside this Group.
- [Levels, Attaching Access Groups](../levels/attaching-access-groups): wire from the Level side.
