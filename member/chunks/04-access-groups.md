---
chunk: 04
category: Core Entities
subcategory: Access Groups
query-triggers: [access group, restriction types, protected content, content assignment, post protection, category protection, entire website, lock, unlock]
related-chunks: [03, 05, 06, 09]
source-files: [app/Http/Controllers/AccessGroupController.php, app/Models/AccessGroup.php, app/Models/AccessGroupMembershipLevel.php, app/Modules/Gutenberg/GutenbergModule.php, app/Modules/Gutenberg/AccessGroupBlock.php]
doc-files: [guide/access-groups/index.md, guide/access-groups/protected-content.md, guide/access-groups/unauthorized-access.md, guide/access-groups/gutenberg-block/inserting.md, guide/access-groups/gutenberg-block/configuring.md, guide/access-groups/gutenberg-block/nesting-and-limits.md]
---

# Access Groups

## What it is

An Access Group is a named collection of content to protect together. A Level is the "key"; an Access Group is the "locked room". One group can be linked to many Levels; one Level can unlock many Groups.

---

## Model

- **Table**: `fmem_access_groups`
- **Model file**: `app/Models/AccessGroup.php`
- **Pivot table**: `fmem_access_group_membership_levels`
- **Pivot model**: `app/Models/AccessGroupMembershipLevel.php`

---

## Restriction types

Stored in `restriction_rules` column (serialized JSON) as `restriction_rules.restriction_types[]`:

| Value | What it locks |
|---|---|
| `posts` | Specific posts (by post ID) |
| `pages` | Specific pages (by post ID) |
| `categories` | Taxonomy terms (categories, tags, custom taxonomies) |
| `post_types` | Entire custom post types |
| `entire_website` | All archive pages + non-singular content |

Multiple types can be set on one group simultaneously.

---

## Restriction rule data structure

```json
{
  "restriction_types": ["posts", "pages"],
  "post_ids": [12, 45, 67],
  "page_ids": [3, 8],
  "category_ids": [],
  "post_type_slugs": []
}
```

The exact structure is managed by `AccessGroupController` and consumed by `AccessHelper`.

---

## Unauthorized access behaviour

Configured per Access Group, defines what happens when a non-member visits protected content:

| Behaviour | Description |
|---|---|
| Redirect | Redirect visitor to a specific URL |
| Show message | Replace content with a restriction HTML message |
| Partial preview | Show N words + overlay (see chunk 07) |
| Content drip message | Show drip-specific restriction message (see chunk 08) |

Source: `RestrictionRenderer::getRedirectUrl()`, `RestrictionRenderer::getRestrictionHtml()`

Doc: `guide/access-groups/unauthorized-access.md`

---

## Content assignment methods

### 1. Access Group admin screen
Assign posts/pages/categories/post-types directly in the Access Group settings UI.

### 2. Gutenberg sidebar panel (per post/page)
When editing a post, a Fluent Members sidebar panel lists all active Access Groups as checkboxes. Ticking a group assigns that specific post to the group.

### 3. Block-level assignment (per Gutenberg block)
Selecting any block in the editor shows an Access Groups inspector panel. Only members of ticked groups see the block.

Doc: `guide/access-groups/gutenberg-block/configuring.md`

---

## REST API routes

| Method | Path | Action |
|---|---|---|
| GET | `/access-groups` | List all groups |
| POST | `/access-groups` | Create group |
| GET | `/access-groups/contents` | Get all protected content across all groups |
| GET | `/access-groups/all-access-groups` | Flat list (used in UI dropdowns) |
| GET | `/access-groups/{id}` | Get single group |
| PUT | `/access-groups/{id}` | Update group |
| DELETE | `/access-groups/{id}` | Delete group |
| POST | `/levels/{id}/access-groups` | Assign groups to a level |

Auth: all routes require `UserPolicy` (admin).

---

## Gutenberg integration

- **Module**: `app/Modules/Gutenberg/GutenbergModule.php` — registers sidebar plugin
- **Block handler**: `app/Modules/Gutenberg/AccessGroupBlock.php` — block-level protection logic
- **WP filter**: `render_block` (see chunk 09 for full block protection logic)

---

## Doc files

| File | Covers |
|---|---|
| `guide/access-groups/index.md` | Overview: what groups are, how they work |
| `guide/access-groups/protected-content.md` | Restriction types and content assignment |
| `guide/access-groups/unauthorized-access.md` | Redirect, message, partial preview options |
| `guide/access-groups/gutenberg-block/inserting.md` | How to insert/use the block panel |
| `guide/access-groups/gutenberg-block/configuring.md` | Configuring block-level restrictions |
| `guide/access-groups/gutenberg-block/nesting-and-limits.md` | Nesting rules and known limits |

---

## When a new restriction type is added

1. Update `restriction_rules.restriction_types` docs in `guide/access-groups/protected-content.md`
2. Update the restriction types table in this chunk (#04)
3. Update `AccessHandler` handling in chunk #06
4. Check `guide/access-groups/index.md` overview
