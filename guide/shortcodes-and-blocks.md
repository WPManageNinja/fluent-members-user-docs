# Shortcodes & Blocks Cheat Sheet

A one-page reference for every shortcode and editor block Fluent Members ships with. Bookmark it.

**Here's what you'll find:**
- Every shortcode + what it does + full attributes
- Every Gutenberg block + its options
- Worked examples for common use cases

---

## Shortcodes

### `[fluent_membership_level id="X"]`

Renders the pricing card for a specific Membership Level — level name, description, price, interval, and a Subscribe button.

**Attributes:**

| Attribute | Required | Description |
|---|---|---|
| `id` | Yes | The ID of the Membership Level (find in Fluent Members → Levels) |

**Example:**
```
[fluent_membership_level id="2"]
```

**What renders:**
- Level title
- Description
- Price (from the linked payment provider)
- Billing interval (if subscription)
- Subscribe Now button → routes to the provider's checkout

**Common use:** Build a pricing page with multiple cards side-by-side by using multiple shortcodes in a grid layout.

**Details:** [Core Concepts — Pricing](./core-concepts/pricing.md)

---

### `[fluent_member_portal]`

Renders the full Member Portal — a Vue-powered dashboard showing the logged-in member's memberships, subscription info, and (for corporate parents) a team panel.

**Attributes:**

None. The shortcode has no attributes — the portal reads the logged-in user's data automatically.

**Example:**
```
[fluent_member_portal]
```

**What renders:**
- Profile header (name, avatar, email)
- Active membership cards
- Cancel actions
- Team management panel (if the user holds a corporate parent plan)
- Login prompt for logged-out visitors

**Common use:** Drop on a page titled "My Account" or "My Membership" and link it from your main navigation.

**Details:** [Member Portal Setup](./member-portal/setup.md)

---

## Gutenberg blocks

### Access Group selector (post sidebar)

Not a block you insert — it's a sidebar panel in the post editor. When you edit a post, a Fluent Members panel appears in the right sidebar with:
- A list of your active Access Groups as checkboxes
- A Partial Content Settings panel (if partial content is enabled globally)

Tick the groups you want to apply to this post.

**Details:** [Gutenberg Access Group block](./content-protection/gutenberg-block.md)

---

### Block-level access control

When you select any block inside the Gutenberg editor, the block's Inspector sidebar gets an **Access Groups** section. Tick which groups should allow the block to appear. Blocks are completely removed from the rendered output for users without access — not hidden with CSS, not reachable via view-source.

**Details:** [Gutenberg Access Group block](./content-protection/gutenberg-block.md)

---

### Classic editor meta box

For post types using the Classic Editor, Fluent Members falls back to a meta box in the sidebar — same Access Group checkboxes, same outcome. Save the post to apply.

---

## Common recipes

### A three-tier pricing page

```
<div class="pricing-grid">
  <div class="pricing-card">[fluent_membership_level id="1"]</div>
  <div class="pricing-card">[fluent_membership_level id="2"]</div>
  <div class="pricing-card">[fluent_membership_level id="3"]</div>
</div>
```

Wrap each shortcode in a grid container in your block editor, use columns, and style via your theme.

---

### Member account page + navigation link

**Page content:**
```
[fluent_member_portal]
```

**Menu:**
Add a Custom Link to your menu pointing to the page URL. Some themes support conditional menu items — show it only when logged in.

---

### Mixed-access post

Use the block-level Access Group selector:

- Paragraph 1 (public) — no Access Group selected
- Video block (members-only) — tick *Pro Content* Access Group
- Paragraph 2 (public) — no Access Group
- Download button (members-only) — tick *Pro Content*

Non-members see the public paragraphs and nothing else. Pro members see everything.

---

## What's next?

**Related reading:**
- [Shortcode reference](../reference/shortcode-reference.md) — the formal reference with all data types
- [Gutenberg Access Group block](./content-protection/gutenberg-block.md) — how block-level protection works
- [Member Portal Setup](./member-portal/setup.md) — the portal in detail
