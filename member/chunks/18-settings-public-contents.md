---
chunk: 18
category: Settings
subcategory: Public Contents
query-triggers: [public contents, bypass protection, exclude from protection, public posts, free content, ContentService, whitelist, fmem_public_contents]
related-chunks: [04, 06, 13]
source-files: [app/Http/Controllers/SettingsController.php, app/Services/ContentService.php, app/Functions/Utility.php]
doc-files: [guide/settings/general.md]
---

# Settings — Public Contents

## What it is

A whitelist of content items that should be publicly accessible even if they would otherwise be covered by an Access Group. If a post/page/term is listed here, it bypasses ALL content protection rules.

---

## Option key

Stored under the WordPress option `fmem_public_contents` via `Utility::getPublicContentSettings()` / `Utility::updatePublicContentSettings()`. Defaults from `Utility::defaultPublicContentSettings()`.

---

## Data structure

The same bucketed shape used by Access Group restriction rules (see chunk 04) — content ids are grouped by content-type bucket, not a flat list:

```php
[
    'contents' => [
        'post_ids'                      => [],
        'page_ids'                      => [],
        'category_ids'                  => [],
        'tag_ids'                       => [],
        // FluentCart
        'fct_product_ids'               => [],
        'fct_product_category_ids'      => [],
        'fct_product_brand_ids'         => [],
        // WooCommerce (Pro)
        'wc_product_ids'                => [],
        'wc_product_category_ids'       => [],
        'wc_product_tag_ids'            => [],
        'wc_product_brand_ids'          => [],
        'wc_product_shipping_class_ids' => [],
    ],
]
```

`ContentService::buildSelectedOptions($contents)` — formats the stored bucketed IDs into `{value, label}` pairs for the admin UI's search/select control.

---

## Routes

There is **no** dedicated `/settings/public-contents` REST route. Public contents are read and written through the **general settings** endpoints only:

| Method | Path | Action |
|---|---|---|
| GET | `/settings/general` | Returns `public_contents` (the raw bucketed contents) and `selected_options` (formatted `{value,label}` pairs) alongside the rest of general settings |
| POST | `/settings/general` | Accepts a `contents` field (sanitized with `getSafe('contents', 'fluentMembersSanitizeIds', [])`) and calls `Utility::updatePublicContentSettings(['contents' => $selectedContents])` |

A prior revision of this chunk documented standalone `GET`/`POST /settings/public-contents` endpoints — those do not exist in the current source.

---

## How it interacts with protection

`AccessHelper::hasAccess()` (or equivalent restriction-check path — see chunk 06) checks the public contents list before checking access groups. If the post/term is in the public contents list → access granted regardless of group membership.

---

## Doc note

Currently documented as part of `guide/settings/general.md` (public contents section). If it gets its own page, the path would be `guide/settings/public-contents.md`.
