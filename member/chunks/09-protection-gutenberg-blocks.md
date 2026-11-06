---
chunk: 09
category: Content Protection
subcategory: Gutenberg Block Protection
query-triggers: [gutenberg block, block access, render_block, block inspector, block level, classic editor meta box, post sidebar, block restriction, selectedGroups, fmemPartialContentSettings, checkBlockAccess, CONTENT_META_KEY, cpt access groups]
related-chunks: [04, 06, 07]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Modules/Gutenberg/GutenbergModule.php, app/Modules/Gutenberg/AccessGroupBlock.php, app/Services/AccessHelper.php]
doc-files: [guide/access-groups/gutenberg-block/inserting.md, guide/access-groups/gutenberg-block/configuring.md, guide/access-groups/gutenberg-block/nesting-and-limits.md]
---

# Content Protection — Gutenberg Block Protection

## What it is

Two levels of Gutenberg integration:

1. **Post-level**: A sidebar panel / classic-editor meta box lets you assign Access Groups to the
   **entire post/page** — stored as post meta, independent of the group's own content-matching rules.
2. **Block-level**: A per-block attribute (set via the block Inspector panel) restricts a
   **specific block** within a post to one or more Access Groups.

These are two different mechanisms with different storage — don't confuse them when reading source.

---

## Post-level assignment — `app/Modules/Gutenberg/AccessGroupBlock.php`

Despite the filename, this class is NOT the block-level Inspector — it wires up the **post-level**
group checklist:

- `registerRestFields()`: registers two REST fields on every public post type —
  `AccessGroup::CONTENT_META_KEY` (`_fmem_cpt_access_groups`, an int array of assigned group ids)
  and `_fmem_partial_content_settings` (the per-post partial-preview override, chunk 07). Both are
  readable/writable over the REST API, which is what the block-editor sidebar panel actually uses.
- `getLocalizedData()`: hooked to `fluent_members/gutenberg/localized_data`, supplies the editor JS
  with the list of active access groups plus the global partial-content settings/enabled flag.
- Classic Editor fallback: `addAccessGroupsMetaBox()` / `renderMetaBox()` / `saveAccessGroupsMetaBox()`
  render a checkbox list of access groups in a `side` meta box (for post types not using the block
  editor), posting `fmem_access_groups[]` guarded by the `fmem_access_groups_save` nonce, and saving
  to the same `_fmem_cpt_access_groups` meta key.

A post assigned this way is checked by `AccessHelper::getCptAccessGroups()` / `checkCptAccess()` —
see chunk 06's access resolution order (this check runs BEFORE the group's own content rules).

---

## Block-level restriction — `attrs.selectedGroups`

The per-block Inspector panel is implemented client-side (compiled into the `blocks/index.js`
bundle registered by `GutenbergModule::enqueueAssets()`) — there's no separate PHP "block type"
class to read. The server only ever sees the attribute it saves:

```php
add_filter('render_block', [$this, 'protectBlock'], 10, 2);
```

Fires for every block rendered on any page. Skips admin and feed.

### `AccessHelper::checkBlockAccess($userId, $attrs, $contentId=null, $contentType=null)`

```
$selectedGroupIds = $attrs['selectedGroups'] ?? []
empty($selectedGroupIds) → true (block is public, no restriction applied)
filter to currently-active access group ids → $selected
empty($selected) or no $userId → return empty($selected)  (i.e. false once a real group was selected)
for each of the user's unlocked groups that is in $selected:
    if a $contentId/$contentType was resolved (defaults to the current post), run
    ContentDripHelper::checkDripAccess() for that group (chunk 08)
      → not accessible → track earliest drip info, keep checking other matching groups
      → accessible    → return true
  → no group granted immediate access → return false (drip_info set if any group was drip-blocking)
```

### `AccessHandler::protectBlock($blockContent, $block)` flow

```
extract $block['attrs'] → $blockAttributes
AccessHelper::checkBlockAccess($userId, $blockAttributes) → true → return $blockContent unchanged
AccessHelper::checkBlockAccess() → false →
  isContentDripped() → true → return RestrictionRenderer::getDripRestrictionHtml()
  PartialContentService::isEnabled() → true →
    read per-block override: $blockAttributes['fmemPartialContentSettings']
    getMergedSettings($blockOverrides)
    settings.enabled !== 'no' →
      hasOnlyMediaContent($blockContent) → getMediaPlaceholderHtml($settings)
      contentExceedsPreviewLength($blockContent, N) → getBlockPartialContentHtml($blockContent, $settings)
  → return RestrictionRenderer::getRestrictedBlockHtml()
```

**Key**: blocked blocks are **completely removed** from rendered HTML. They are not hidden with CSS.
Non-members cannot see the content via View Source.

---

## Block attributes used

| Attribute | Purpose |
|---|---|
| `selectedGroups` | Array of access group IDs required to see this block (read by `checkBlockAccess()`) |
| `fmemPartialContentSettings` | Per-block partial content override (same fields as global settings, chunk 07) |

These are set by the block editor Inspector panel and saved in the post's block markup (`attrs`).

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
