---
chunk: 04
category: Core Entities
subcategory: Access Groups
query-triggers: [access group, restriction types, protected content, content assignment, post protection, category protection, entire website, lock, unlock, restriction rules v2, scope rule, bucket ids, unauthorized access, woocommerce protection, fluentcart protection]
related-chunks: [03, 05, 06, 09]
source-files: [app/Http/Controllers/AccessGroupController.php, app/Models/AccessGroup.php, app/Models/AccessGroupMembershipLevel.php, app/Services/AccessHelper.php, app/Modules/Gutenberg/GutenbergModule.php, app/Modules/Gutenberg/AccessGroupBlock.php]
doc-files: [guide/access-groups/index.md, guide/access-groups/protected-content.md, guide/access-groups/unauthorized-access.md, guide/access-groups/gutenberg-block/inserting.md, guide/access-groups/gutenberg-block/configuring.md, guide/access-groups/gutenberg-block/nesting-and-limits.md]
---

# Access Groups

## What it is

An Access Group is a named collection of content to protect together. A Level is the "key";
an Access Group is the "locked room". One group can be linked to many Levels; one Level can
unlock many Groups.

---

## Model

- **Table**: `fmem_access_groups`
- **Model file**: `app/Models/AccessGroup.php`
- **Pivot table**: `fmem_access_group_membership_levels`
- **Pivot model**: `app/Models/AccessGroupMembershipLevel.php`
- **Controller**: `app/Http/Controllers/AccessGroupController.php`

---

## Restriction rules — v2 envelope

`AccessGroup.settings.restriction_rules` is stored as:

```json
{
  "version": 2,
  "rules": [
    { "id": "rule_0", "type": "entire_website", "include_ids": {}, "exclude_ids": {} },
    { "id": "rule_1", "type": "specific_content_type", "include_ids": {"post_ids": [12, 45]}, "exclude_ids": {} }
  ]
}
```

A group can hold multiple rules at once (they combine). A legacy v1 (flat, pre-rules) group is
normalized to this v2 shape on read via `AccessHelper::normalizeRestrictionRulesToV2()`; the
write path (`AccessGroupController::sanitizeRestrictionRules()`) always persists v2 — a rule
with no `type` is dropped rather than silently saved empty.

### Rule `type` values

**Broad "scope" types** — protect an entire set with no `include_ids` needed:

| Value | What it locks |
|---|---|
| `entire_website` | All archive pages + non-singular content, site-wide |
| `all_posts` | Every post |
| `all_pages` | Every page |
| `all_categories` | Every category/tag taxonomy term (posts side) |
| `all_tags` | Every tag |
| `wc_all_products` | All WooCommerce products (Pro) |
| `wc_all_product_categories` / `wc_all_product_tags` / `wc_all_product_brands` / `wc_all_product_shipping_classes` | All WC products in that taxonomy (Pro) |
| `fct_all_products` / `fct_digital_products` / `fct_physical_products` / `fct_product_categories` / `fct_product_brands` | All FluentCart products in that scope |

**Bucketed "specific" types** — hand-picked IDs in `include_ids`/`exclude_ids`, keyed by bucket:

| Rule type | Buckets it can use |
|---|---|
| `specific_content_type` | `post_ids`, `page_ids`, `category_ids`, `tag_ids`, plus any custom post type slug bucket |
| `wc_specific_products` | `wc_product_ids`, `wc_product_category_ids`, `wc_product_tag_ids`, `wc_product_brand_ids`, `wc_product_shipping_class_ids` |
| `fct_specific_products` | `fct_product_ids`, `fct_digital_product_ids`, `fct_physical_product_ids`, `fct_product_category_ids`, `fct_product_brand_ids` |

`exclude_ids` uses the same bucket shapes as `include_ids` and works on any rule type — it
carves specific items back out of a broad scope or a specific list. The authoritative bucket
allow-list and prefix↔bucket mapping live in `AccessHelper::allowedRuleBucketKeys()` and
`AccessHelper::contentOptionPrefixBucketMap()` — extend those, and the write-side sanitizer
and read-side option resolver, if a new content type needs a bucket.

Multiple rules (and multiple types) can be set on one group simultaneously.

---

## Unauthorized access behaviour

Each Access Group either **inherits the global default** (`unauthorized_access_customized:
false`, nothing stored) or **customizes its own** (`true`, with an `unauthorized_access`
object matching the global settings shape — see chunk 18):

| Behaviour | Description |
|---|---|
| Redirect | Redirect visitor to a specific URL — requires `redirect_url` |
| Show message | Replace content with a restriction HTML message — requires `custom_message` |
| Partial preview | Show N words + overlay (see chunk 07) |
| Content drip message | Show drip-specific restriction message (see chunk 08) |

Source: `RestrictionRenderer::getRedirectUrl()`, `RestrictionRenderer::getRestrictionHtml()`

Doc: `guide/access-groups/unauthorized-access.md`

---

## Content assignment methods

### 1. Access Group admin screen
Assign posts/pages/categories/post-types/WC or FluentCart products directly in the Access
Group settings UI (writes into `restriction_rules` as above).

### 2. Gutenberg sidebar panel (per post/page)
When editing a post, a Fluent Members sidebar panel lists all active Access Groups as
checkboxes. Ticking a group assigns that specific post to the group.

### 3. Block-level assignment (per Gutenberg block)
Selecting any block in the editor shows an Access Groups inspector panel. Only members of
ticked groups see the block.

Doc: `guide/access-groups/gutenberg-block/configuring.md`

---

## Duplicating and deleting a group

- `POST /access-groups/{id}/duplicate` clones title (`" - Duplicated(<id>)"` suffix),
  description, status, and re-normalizes `restriction_rules` to v2 on the copy even if the
  source was still legacy v1.
- `DELETE /access-groups/{id}` is refused (422) if any active Membership Level still
  references the group — unassign it from those levels first. On success it also detaches
  the group's content-level post meta (`AccessGroup::removeFromPosts()`) after the DB delete
  commits.

---

## REST API routes

| Method | Path | Action |
|---|---|---|
| GET | `/access-groups` | List all groups |
| POST | `/access-groups` | Create group |
| GET | `/access-groups/contents` | Search all protectable content across selected types (`AccessGroupController::getAllContents`) |
| GET | `/access-groups/link-suggestions` | Autocomplete suggestions for the unauthorized-access redirect URL field |
| GET | `/access-groups/{id}` | Get single group (with resolved rule options) |
| PUT | `/access-groups/{id}` | Update group (title/description/status/settings, and `active_levels[]` to re-sync attached levels) |
| DELETE | `/access-groups/{id}` | Delete group (blocked if any level still references it) |
| POST | `/access-groups/{id}/duplicate` | Duplicate a group |
| GET | `/levels/{id}/access-groups` | List access groups attached to a level (`AccessGroupController::getLevelAccessGroups`) |
| POST | `/levels/{id}/access-groups` | Assign access groups to a level (`AccessGroupController::assignAccessGroups`) |

Auth: all routes require `UserPolicy` (admin). There is no separate `sync-levels` /
`sync-contents` endpoint — a group's attached levels are synced via `PUT /access-groups/{id}`
(`active_levels[]`), and a level's attached groups via `POST /levels/{id}/access-groups`.

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

1. Add the bucket/scope to `AccessHelper::allowedRuleBucketKeys()` / `contentOptionPrefixBucketMap()` / `scopeTypes()` and update `guide/access-groups/protected-content.md`
2. Update the rule-type tables in this chunk (#04)
3. Update `AccessHandler` handling in chunk #06
4. Check `guide/access-groups/index.md` overview
