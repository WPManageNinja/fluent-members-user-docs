---
chunk: 17
category: Settings
subcategory: Partial Content Defaults
query-triggers: [partial content settings, preview length, overlay settings, partial content defaults, word count, overlay color, overlay opacity]
related-chunks: [07, 13]
source-files: [app/Http/Controllers/SettingsController.php, app/Functions/Utility.php]
doc-files: [guide/settings/partial-content-lock.md]
---

# Settings — Partial Content Defaults

## What it is

Global default settings for the Partial Content Preview feature. These apply to all protected posts unless overridden per-post (`_fmem_partial_content_settings` meta) or per-block (`fmemPartialContentSettings` attribute).

---

## Option key

Via `Utility::getPartialContentSettings()` / `Utility::updatePartialContentSettings()`

---

## All fields

| Field | Type | Default | Constraint | Description |
|---|---|---|---|---|
| `enabled` | `yes`/`no` | `no` | — | Master switch — enable partial preview globally |
| `preview_length` | int | 50 | min 10 | Word count to show before the overlay |
| `overlay_message` | HTML string | — | kses | Message text shown inside the overlay |
| `overlay_message_color` | hex | `#333333` | sanitize_hex_color | Overlay message text color |
| `button_text` | string | — | sanitize_text_field | CTA button label (e.g. "Subscribe to read more") |
| `button_url` | URL | — | esc_url_raw | CTA button destination (e.g. pricing page) |
| `button_color` | hex | `#0073aa` | sanitize_hex_color | CTA button background color |
| `button_text_color` | hex | `#ffffff` | sanitize_hex_color | CTA button text color |
| `button_size` | `small`/`medium`/`large` | `medium` | enum | CTA button size |
| `overlay_color` | hex | `#ffffff` | sanitize_hex_color | Overlay background color |
| `overlay_opacity` | int 0–100 | 90 | `max(0, min(100, ...))` | Overlay background opacity percentage |

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/partial-content` | Get partial content settings |
| POST | `/settings/partial-content` | Update partial content settings |

---

## Relationship to per-post / per-block overrides

`PartialContentService::getMergedSettings($overrides)` merges:
1. Global defaults (these settings)
2. Per-post meta `_fmem_partial_content_settings` (overrides globals for that post)
3. Per-block attribute `fmemPartialContentSettings` (overrides for that specific block)

Per-post and per-block overrides only set the keys they want to change; unset keys fall back to global defaults.

---

## Doc file

`guide/settings/partial-content-lock.md`
