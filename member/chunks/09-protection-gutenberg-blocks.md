---
chunk: 09
category: Content Protection
subcategory: Gutenberg Block Protection
query-triggers: [gutenberg block, block access, render_block, block inspector, block level, classic editor meta box, post sidebar, block restriction, fmemPartialContentSettings, checkBlockAccess]
related-chunks: [04, 06, 07]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Modules/Gutenberg/GutenbergModule.php, app/Modules/Gutenberg/AccessGroupBlock.php, app/Services/AccessHelper.php]
doc-files: [guide/access-groups/gutenberg-block/inserting.md, guide/access-groups/gutenberg-block/configuring.md, guide/access-groups/gutenberg-block/nesting-and-limits.md]
---

# Content Protection — Gutenberg Block Protection

## What it is

Two levels of Gutenberg integration:

1. **Post-level**: A sidebar panel lets you assign Access Groups to the **entire post/page**.
2. **Block-level**: A block Inspector panel lets you assign Access Groups to a **specific block** within a post.

---

## WordPress hook

```php
add_filter('render_block', [$this, 'protectBlock'], 10, 2);
```

Fires for every block rendered on any page. Skips admin and feed.

---

## `protectBlock($blockContent, $block)` flow

```
extract $block['attrs'] → $blockAttributes
AccessHelper::checkBlockAccess($userId, $blockAttributes) → true → return $blockContent unchanged
AccessHelper::checkBlockAccess() → false (user lacks required group) →
  isContentDripped() → true → return RestrictionRenderer::getDripRestrictionHtml()
  PartialContentService::isEnabled() → true →
    read per-block override: $blockAttributes['fmemPartialContentSettings']
    getMergedSettings($blockOverrides)
    settings.enabled !== 'no' →
      hasOnlyMediaContent($blockContent) → getMediaPlaceholderHtml($settings)
      contentExceedsPreviewLength($blockContent, N) → getBlockPartialContentHtml($blockContent, $settings)
  → return RestrictionRenderer::getRestrictedBlockHtml()
```

**Key**: blocked blocks are **completely removed** from rendered HTML. They are not hidden with CSS. Non-members cannot see the content via View Source.

---

## Block attributes used

| Attribute | Purpose |
|---|---|
| `fluentMembersAccessGroups` | Array of access group IDs that are allowed to see this block |
| `fmemPartialContentSettings` | Per-block partial content override (same fields as global settings) |

These are set by the block editor Inspector panel and saved in the post's block markup.

---

## AccessHelper::checkBlockAccess()

| Method | Returns | Description |
|---|---|---|
| `checkBlockAccess($userId, $blockAttributes)` | bool | True if user is in at least one of the assigned access groups (or no groups assigned = public) |

If `fluentMembersAccessGroups` is empty/not set → block is public, no restriction applied.

---

## Post-level sidebar panel

**Source**: `app/Modules/Gutenberg/GutenbergModule.php`

Registers a Gutenberg sidebar plugin (JavaScript) that renders an Access Groups checklist in the Document panel. Selecting groups here is equivalent to adding the post to those groups via the Access Group admin screen.

**Partial content settings panel**: The same sidebar also shows per-post Partial Content Settings if partial content is enabled globally (see chunk 07).

---

## Classic Editor fallback

For post types using Classic Editor (TinyMCE), Fluent Members renders a **meta box** in the post edit sidebar. The meta box shows the same Access Group checkboxes. The outcome is identical — saves the group assignment as post meta.

---

## Block-level Inspector panel

**Source**: `app/Modules/Gutenberg/AccessGroupBlock.php`

For every selected block, an Access Groups panel appears in the block Inspector sidebar (right column). Tick a group → only members of that group see the block.

Partial content settings are also available per-block in this panel.

---

## Nesting and limits

- Block-level restriction is additive — a block needs the user to be in **any one** of the ticked groups (OR logic)
- Post-level restriction and block-level restriction are independent — a user can have post access but still be blocked on a specific block (if different groups are required)
- Nested restricted blocks: outer block restriction takes effect first; inner blocks never render if outer is restricted

Doc: `guide/access-groups/gutenberg-block/nesting-and-limits.md`

---

## Doc files

| File | Covers |
|---|---|
| `guide/access-groups/gutenberg-block/inserting.md` | How to use the sidebar panel and Inspector panel |
| `guide/access-groups/gutenberg-block/configuring.md` | Selecting groups, partial settings, saving |
| `guide/access-groups/gutenberg-block/nesting-and-limits.md` | Logic rules, nesting behavior |
