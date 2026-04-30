# Gutenberg Access Group Block & Sidebar

Attach Access Groups to a post right from the Gutenberg editor — and protect specific blocks inside a post, not just the whole thing.

**Here's what you'll learn:**
- How to attach Access Groups to a post from the editor sidebar
- How to protect *specific blocks* inside a post (mixed-access pages)
- How to override Partial Content settings per post
- Where the same controls live in the Classic editor (meta box fallback)

**Before we start:** You should have at least one [Access Group](../core-concepts/access-groups.md) with `active` status — otherwise the sidebar will show an empty list.

---

## The editor sidebar

When you open any post (standard or custom post type) in the Gutenberg editor, Fluent Members adds a panel to the right-hand settings sidebar.

It has two parts:
1. **Access Groups** — tick which groups protect this post.
2. **Partial Content Settings** — override the global partial-preview defaults for this post only (only shows if partial content is enabled globally).

To open it:
1. Open a post for editing.
2. In the top-right sidebar, click the Fluent Members icon (or toggle the sidebar if it's collapsed).
3. Tick the Access Groups you want to apply.
4. Click **Update** to save the post.

![Fluent Members editor sidebar](/images/content-protection/editor-sidebar.png)

::: tip Small win
Saving a post with an Access Group ticked has the same effect as adding that specific post to the group's rule list — only without touching the Access Groups screen. Two paths, same result.
:::

---

## Protecting specific blocks inside a post

This is the headline feature of the Gutenberg integration. Instead of restricting a whole post, you can restrict **individual blocks**.

For example, a post might have:
- A public intro paragraph (no restriction)
- A video block (members-only)
- A download link (members-only)
- A public footer

Here's how you do it:

1. Click the block you want to restrict.
2. In the block's settings on the right sidebar, look for **Access Groups** under the block inspector.
3. Tick which groups should be allowed to see this block.
4. Save the post.

Now non-members see the public intro and footer, but the video and download link are replaced with the restriction action (redirect, message, or partial preview).

::: info How block restriction works under the hood
Fluent Members adds a class to restricted blocks and filters the rendered HTML before sending it to the visitor. If the visitor's Level doesn't unlock the group, the block is removed from the output entirely — it's not hidden with CSS, so there's no way to view-source around it.
:::

---

## Overriding Partial Content settings per post

Global Partial Content settings apply to all posts by default. But some posts deserve special treatment — a flagship article might need a shorter teaser, or a different CTA.

The sidebar has a **Partial Content Settings** section for this. Expand it, and you'll see fields matching the global settings:

- Enabled (yes / no / use default)
- Preview Length
- Overlay Message + colour
- Button Text, URL, colour
- Overlay colour, opacity

Fill only the fields you want to override. Blank fields inherit the global defaults.

See [Partial Content Preview](./partial-content-preview.md) for what each field does.

---

## Classic editor fallback — meta box

Not everyone uses Gutenberg. If a post type is registered to use the Classic Editor (or you're using the Classic Editor plugin), Fluent Members falls back to a **meta box** in the post-edit screen.

The meta box shows the same list of Access Groups as checkboxes. It appears in the sidebar under the post editor, just like any other meta box. Save the post to apply.

The meta box only shows Access Groups that are **active**. If you don't see groups you created, check their status.

---

## A real example — a mixed-access post

Sara writes a weekly blog post with both free and paid content in the same article. Her structure:

- **Paragraph 1** (public): A catchy intro
- **Paragraph 2-3** (public): The free insight
- **Video block** (members-only — `Pro Content`)
- **Download PDF button** (members-only — `Pro Content`)
- **Paragraph 4** (public): A teaser for next week

She uses the block-level Access Group selector to restrict only the video and the PDF button. Free visitors get the post with two placeholders where the restricted blocks would be; Pro members see everything.

![Mixed-access post frontend](/images/content-protection/mixed-access-frontend.png)

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Sidebar panel is empty | No active Access Groups exist | Create one, or set an inactive group to active |
| Block restriction doesn't appear to work | You ticked the group, but the group's rules don't include this post type | Restrict through rules, or rely on block-level only |
| Partial Content overrides not applying | You toggled the global setting off | Turn Partial Content **On** in Settings first |
| Classic editor meta box missing | The post type is using Gutenberg; or the post type isn't public | Confirm editor and public visibility of the CPT |

---

## What's next?

**→ [REST API protection](./rest-api-protection.md)** — how block/post protection applies to API responses.

**Related reading:**
- [Partial Content Preview](./partial-content-preview.md) — the global settings page
- [Access Groups](../core-concepts/access-groups.md) — all the rule types explained
