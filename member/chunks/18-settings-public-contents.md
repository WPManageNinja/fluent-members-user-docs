---
chunk: 18
category: Settings
subcategory: Public Contents
query-triggers: [public contents, bypass protection, exclude from protection, public posts, free content, ContentService, whitelist]
related-chunks: [04, 06, 13]
source-files: [app/Http/Controllers/SettingsController.php, app/Services/ContentService.php, app/Functions/Utility.php]
doc-files: [guide/settings/general.md]
---

# Settings — Public Contents

## What it is

A whitelist of content items that should be publicly accessible even if they would otherwise be covered by an Access Group. If a post is listed here, it bypasses ALL content protection rules.

---

## Option key

Via `Utility::getPublicContentSettings()` / `Utility::updatePublicContentSettings()`

---

## Data structure

```php
[
    'contents' => [
        // Array of content identifiers (post IDs, taxonomy terms, etc.)
        // formatted by ContentService
    ]
]
```

`ContentService::buildSelectedOptions($contents)` — formats stored IDs into `{value, label}` pairs for the admin UI dropdown/search.

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/public-contents` | Get public contents list + formatted options |
| POST | `/settings/public-contents` | Update public contents list |

Also returned as part of `GET /settings/general` response (`public_contents` key).

Also updated via `POST /settings/general` (`contents` field in request body, sanitized with `getSafe('contents', 'fluentMembersSanitizeIds', [])`).

---

## How it interacts with protection

`AccessHelper::hasAccess()` checks the public contents list before checking access groups. If the post/term is in the public contents list → access granted regardless of group membership.

---

## Doc note

Currently documented as part of `guide/settings/general.md` (public contents section). If it gets its own page, the path would be `guide/settings/public-contents.md`.
