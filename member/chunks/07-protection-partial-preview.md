---
chunk: 07
category: Content Protection
subcategory: Partial Content Preview
query-triggers: [partial content, preview, word count, overlay, blur, teaser, partial preview, per-post override, fmem_partial_content_settings]
related-chunks: [06, 09, 17]
source-files: [app/Services/PartialContentService.php, app/Hooks/Handlers/AccessHandler.php]
doc-files: [guide/settings/partial-content-lock.md, guide/access-groups/protected-content.md]
---

# Content Protection — Partial Content Preview

## What it is

Instead of a hard block, non-members see the first N words of protected content plus a gradient/blur overlay with a CTA button ("Subscribe to keep reading"). The rest of the content is hidden in the HTML.

---

## Service

`app/Services/PartialContentService.php`

### Key static methods

| Method | Description |
|---|---|
| `isEnabled()` | Returns true if global partial content setting `enabled` = yes |
| `getMergedSettings($overrides)` | Merges global settings with per-post or per-block overrides |
| `hasOnlyMediaContent($content)` | True if content is purely images/video (no text to preview) |
| `contentExceedsPreviewLength($content, $wordCount)` | True if content has more than wordCount words |
| `getPartialContentHtml($content, $settings, $groupConfig)` | Returns HTML: visible portion + overlay |
| `getMediaPlaceholderHtml($settings, $groupConfig)` | Returns HTML: placeholder for media-only content |
| `getBlockPartialContentHtml($blockContent, $settings)` | Returns HTML for a block-level partial restriction |

---

## Settings (global defaults)

Stored in WordPress options via `Utility::getPartialContentSettings()`.

| Field | Type | Default | Description |
|---|---|---|---|
| `enabled` | `yes`/`no` | `no` | Master switch |
| `preview_length` | int | 50 | Word count to show before overlay (min 10) |
| `overlay_message` | HTML | — | Text shown inside the overlay |
| `overlay_message_color` | hex | `#333333` | Overlay text color |
| `button_text` | string | — | CTA button label |
| `button_url` | URL | — | CTA button destination |
| `button_color` | hex | `#0073aa` | CTA button background |
| `button_text_color` | hex | `#ffffff` | CTA button text color |
| `button_size` | `small`/`medium`/`large` | `medium` | CTA button size |
| `overlay_color` | hex | `#ffffff` | Overlay background color |
| `overlay_opacity` | int 0–100 | 90 | Overlay background opacity % |

Routes: `GET/POST /settings/partial-content`

---

## Per-post override

Any post can override global settings via a WordPress post meta:

- **Meta key**: `_fmem_partial_content_settings`
- **Meta value**: array with same keys as global settings
- **Merge behavior**: `getMergedSettings($pageOverrides)` — per-post values win over globals

**Where it's set**: Gutenberg sidebar panel on the post editor (or classic meta box).

---

## Per-block override

Any Gutenberg block that has block-level access group restriction also supports partial preview:

- **Block attribute**: `fmemPartialContentSettings` (on the block's `attrs`)
- **Merge behavior**: `getMergedSettings($blockOverrides)` — block values win over globals
- **Service method**: `getBlockPartialContentHtml($blockContent, $settings)` (no groupConfig — block-level)

---

## Decision flow in AccessHandler

```
user lacks access to post → 
  isContentDripped() → true → show drip message (partial skipped)
  PartialContentService::isEnabled() → false → show hard restriction
  getMergedSettings($pageOverrides) → settings
  settings.enabled = 'no' → show hard restriction
  hasOnlyMediaContent($content) → true → getMediaPlaceholderHtml()
  contentExceedsPreviewLength($content, N) → false → show hard restriction (content too short to preview)
  contentExceedsPreviewLength($content, N) → true → getPartialContentHtml()
```

Same flow applies for blocks via `protectBlock()` using `fmemPartialContentSettings`.

---

## Media-only content

If the post contains only images, video, or audio (no text), `hasOnlyMediaContent()` returns true and `getMediaPlaceholderHtml()` is shown instead of a word-count preview. The placeholder is a blurred/blacked-out box with the CTA overlay.

---

## Doc files

| File | Covers |
|---|---|
| `guide/settings/partial-content-lock.md` | Global configuration, all fields |
| `guide/access-groups/protected-content.md` | Per-group override (unauthorized access section) |
