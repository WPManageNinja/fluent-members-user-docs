---
chunk: 34
category: Pro Features
subcategory: Block Email Editor
query-triggers: [block email editor, email block editor, Gutenberg email, email template, block editor email, FluentBlockParser, FluentMembersBlockEditorHandler]
related-chunks: [16]
source-files: [fluent-members-pro/app/Modules/BlockEmailEditor/FluentMembersBlockEditorHandler.php, fluent-members-pro/app/Modules/BlockEmailEditor/FluentBlockParser.php, fluent-members-pro/app/Http/Controllers/EmailNotificationProController.php]
doc-files: [guide/settings/email-configuration/email-notifications.md]
---

# Pro — Block Email Editor

## What it is

Fluent Members Pro replaces the plain HTML textarea email editor with a Gutenberg-style block editor for creating email notification templates. Members can visually design emails with blocks (text, image, button, divider, etc.) and see a real-time preview.

---

## Components

| File | Role |
|---|---|
| `FluentMembersBlockEditorHandler.php` | Registers Gutenberg blocks for email editing, enqueues assets |
| `FluentBlockParser.php` | Converts block editor output (JSON/blocks) to email-safe HTML |
| `EmailNotificationProController.php` | Handles preview endpoint (`POST /email-notification/preview`) |

---

## How it works

1. Admin opens **Settings → Email Notifications → [notification name]**
2. Pro: the body editor is replaced by the Gutenberg block editor
3. Admin adds blocks (paragraph, image, button, divider, columns, etc.)
4. Block content saved as Gutenberg block markup (serialized HTML + comments)
5. On send: `FluentBlockParser::parse($blockContent)` converts to email-safe HTML
6. Merge tags (`{{user_name}}`, etc.) still work in block content — `ShortcodeTemplateBuilder` runs after parsing

---

## Preview endpoint (Pro only)

`POST /email-notification/preview`
Request: `{ notification: string, block_content: string }`

- Parses block content with `FluentBlockParser`
- Replaces merge tags with sample values
- Returns rendered HTML for the preview panel

**Free plugin preview endpoint**: `POST /email-notification/preview-default-template` (shows default template with real data for a specific member)

---

## Block types supported in email editor

| Block type | Rendered as |
|---|---|
| `core/paragraph` | `<p>` tag |
| `core/heading` | `<h1>`–`<h6>` |
| `core/image` | Inline `<img>` (email-safe) |
| `core/button` | Table-based button (email-safe) |
| `core/separator` | `<hr>` |
| `core/columns` | Multi-column email layout (table-based) |
| `core/list` | `<ul>/<ol>` |
| Custom merge tag picker | Inserts `{{tag}}` text in current block |

---

## FluentBlockParser

`FluentBlockParser::parse($content)` — takes Gutenberg serialized content, returns email-safe HTML string.

Key transformations:
- Gutenberg block divs → table-based layouts (email clients don't reliably render CSS flexbox/grid)
- All images given inline `style="max-width: 100%"`
- Links kept with `href` but `target="_blank"` added
- Merge tags preserved through parsing (not evaluated here — evaluated by `ShortcodeTemplateBuilder` later)

---

## Settings storage for block email

When Pro is active and the block editor saves content:
```php
apply_filters('fluent_members/prepare_email_template_data', $settingsWithoutTemplate, $settings)
```

Pro's listener on this filter restores the `email_body` (block content) that the free controller strips. This means the block content is saved under the same `email_body` key, but its value is Gutenberg block markup instead of plain HTML.

---

## Doc file

`guide/settings/email-configuration/email-notifications.md` (Pro section: block editor)
