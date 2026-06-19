# Gutenberg "Access Groups" Block, Inserting

Fluent Members ships one Gutenberg block: **Access Groups**. It's a *container* block, wrap any inner blocks inside it, and you've gated *just those blocks* (not the whole post). Useful when most of a page is public but one section is members-only.

**Here's what you'll learn:**
- How to find the block in the WordPress block inserter.
- What the inserted block looks like and what its toolbar shows.
- The difference between gating a whole post (via an Access Group's Protected Content rule) and gating *just one block* inside a post (this block).

**Before we start:** You're editing a post or page in WordPress. You've already created at least one [Access Group](../).

---

## Step 1: Open the block inserter

In the post editor:

1. Click the **+** button (top-left of the editor, or inline between blocks).
2. In the search box, type **Fluent Member**. The result *Access Groups* appears with a padlock icon.
3. Click it.

The block is inserted into the post with placeholder text *"Add content here…"* and an inner-block prompt *"Type / to choose a block"*.

![Block inserter searching for Fluent Member](/screenshots/gutenberg-inserter.webp)

---

## Step 2: Understand what you just inserted

The Access Groups block is a **container**, by itself it does nothing. You add WordPress blocks inside it, and *those inner blocks* are what get protected.

[Screenshot: Inserted Access Groups block with empty content area and toolbar visible]

Toolbar elements:

| Icon                | What it does                                                       |
|---------------------|--------------------------------------------------------------------|
| **Padlock**         | Visual indicator, this is the Access Groups container.            |
| **Drag handle (⠿)** | Reorder the block within the post (standard Gutenberg).            |
| **Up / Down arrows**| Move up or down one slot.                                          |
| **Kebab (⋮)**       | Standard block actions (duplicate, remove, copy, etc.).            |

::: tip In plain language
Think of the block as a glass cabinet on the page. The cabinet itself is visible, but what's *inside* the cabinet only unlocks for members. The next page ([Configuring](./configuring)) is where you pick *which* members.
:::

---

## Step 3: Add inner blocks

With the Access Groups block selected, click into the placeholder *"Add content here…"* and start typing. The slash command (`/`) opens the inner-block picker. Add any blocks you want gated:

- Paragraphs, headings, lists, images.
- Buttons, columns, groups.
- Embeds (YouTube, Vimeo, etc.).
- Other plugins' blocks.

These nested blocks are the members-only payload. Anything *outside* the Access Groups block stays public.

::: warning Some inner blocks have caveats
A few core blocks (Query Loop, certain pattern blocks) re-fetch their content from REST endpoints. Those won't automatically respect the wrapping container's protection, see [Nesting & Limits](./nesting-and-limits) for the full list.
:::

---

## When to use this block vs an Access Group Protected Content rule

| Use case                                          | Use this block | Use an Access Group rule |
|---------------------------------------------------|:--:|:--:|
| Whole post is members-only                       | ❌ | ✅ |
| Only a footer section of a post is members-only  | ✅ | ❌ |
| A landing page mixes public + member-only blocks | ✅ | ❌ |
| Every post in a CPT is members-only              | ❌ | ✅ |
| One specific post is members-only                | ❌ | ✅ (Specific picker) |

::: tip Cleanest pattern
For "whole post" cases use a [Protected Content rule](../protected-content). The block is for *intra-post* mixes, public intro + member-only middle + public CTA.
:::

---

## A real example: Sara's free post with a hidden video

Sara writes a free blog post: *"5 stretches you can do at your desk."* Four of the stretches are public; the fifth (with a video walkthrough) is Pro Yoga members only.

She:

1. Writes the intro and stretches 1-4 as normal paragraph + image blocks.
2. Inserts an **Access Groups** block.
3. Inside, adds a heading *"5. Hip Opener (Pro members)"* and a video embed.
4. Closes the block, writes a public CTA paragraph: *"Want stretch 5? Join Pro Yoga."*

Non-members see the post normally, with stretch 5 replaced by the fallback action she configures next.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Search doesn't find "Fluent Member" | Fluent Members isn't activated, or the editor is in a heavily-customised state. | Confirm activation; refresh the editor. |
| Block inserts but has no toolbar padlock | Older browser cache or block-editor version mismatch. | Hard refresh; update WordPress. |
| Inner blocks render to non-members anyway | You forgot to configure the Group picker, that's the next page. | See [Configuring](./configuring). |

---

## What's next?

- **→ [Configuring the Block](./configuring)**: pick the Access Group(s) and the fallback action for this specific block.
- **→ [Nesting & Limits](./nesting-and-limits)**: what works inside the block and what doesn't.

**Recommended reading:**
- [Protected Content, Restriction Types](../protected-content): when you want whole-post protection instead.
- [Glossary, Access Group block](/reference/glossary).
