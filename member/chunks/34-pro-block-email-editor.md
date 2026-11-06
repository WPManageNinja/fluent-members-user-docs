---
chunk: 34
category: Pro Features
subcategory: Block Email Editor
query-triggers: [block email editor, email block editor, Gutenberg email, email template, block editor email, FluentBlockParser, FluentMembersBlockEditorHandler]
related-chunks: [16]
source-files: [fluent-members-pro/app/Hooks/Handlers/FluentMembersBlockEditorHandler.php, fluent-members-pro/app/Services/Email/FluentBlockParser.php, fluent-members-pro/app/Services/Email/Blocks/, fluent-members-pro/app/Http/Controllers/EmailNotificationProController.php, fluent-members/app/Http/Controllers/EmailNotificationController.php]
doc-files: [guide/settings/email-configuration/email-notifications.md]
---

# Pro — Block Email Editor

## What it is

Fluent Members Pro replaces the plain HTML textarea email editor with a full Gutenberg block editor (loaded in an iframe against a dummy draft post) for creating email notification templates. Admins design emails with real WordPress blocks and get a live HTML preview rendered through the same parser used to send the email.

---

## Components (corrected paths)

| File | Role |
|---|---|
| `app/Hooks/Handlers/FluentMembersBlockEditorHandler.php` | Boots the custom block-editor page: creates/reuses a dummy post to hold the notification's block content, registers a REST autosave endpoint, enqueues editor assets, restricts the block inserter to allowed block types |
| `app/Services/Email/FluentBlockParser.php` | Converts saved Gutenberg block markup into email-safe (table-based) HTML |
| `app/Services/Email/Blocks/*` | One renderer class per supported block type (see list below) |
| `app/Http/Controllers/EmailNotificationProController.php` | Handles the preview endpoint |

(Not under `app/Modules/BlockEmailEditor/` — that path no longer exists in this version.)

---

## How it works

1. Admin opens **Settings → Email Notifications → [notification name]**.
2. Pro swaps in the block editor; `FluentMembersBlockEditorHandler` resolves/creates a dummy post whose content mirrors the notification's stored `settings.email_body`, and boots a scoped Gutenberg instance against it (custom asset loading, autosave via a dedicated REST route, block inserter limited by `fluent_members/editor_allowed_block_types`).
3. Admin adds blocks and saves; content is stored back into the notification's `settings.email_body` as Gutenberg block markup.
4. On preview or send, `FluentBlockParser::parse($content)` renders the block tree to email-safe HTML via the `fluent_members/parse_email_block_content` filter, then `fluent_members/render_block_email_template` wraps it with the mailing header/footer.
5. Merge tags (`{{user_name}}`, etc.) survive parsing unevaluated — `ShortcodeTemplateBuilder` replaces them afterward, both for preview and for the real send.

---

## Preview endpoint (Pro only)

`POST /email-notification/preview` → `EmailNotificationProController@preview`

Request body: `{ notification_name: string, block_content?: string }` (falls back to the notification's saved `settings.email_body` if `block_content` is omitted).

Response: `{ html: string }`.

**Free plugin's separate preview endpoint**: `POST /email-notification/preview-default-template` — shows the default (non-block) template rendered with a real member's data, not the block editor's live-typing preview.

---

## Block types supported (`app/Services/Email/Blocks/`)

One renderer class per Gutenberg block: Paragraph, Heading, Image, Button, Buttons, Separator, Columns, Column, Cover, Group, List, ListItem, MediaText, Preformatted, Pullquote, Quote, SocialLinks, Spacer, Table, Verse, Code, plus a Fluent-Members-specific `EmailRowBlock`. Each converts its block to email-client-safe markup (tables instead of flexbox/grid, inline styles, `max-width:100%` images).

---

## Settings storage for block email

When Pro is active, the free `EmailNotificationController`'s save path calls:
```php
apply_filters('fluent_members/prepare_email_template_data', $settingsWithoutTemplate, $settings)
```
Pro listens on this filter (`fluent-members-pro/app/Hooks/actions.php`) to restore the block-editor `email_body` that the free controller would otherwise strip as an unrecognized field — so block content is saved under the same `email_body` key the free plugin uses, just holding Gutenberg markup instead of plain HTML.

---

## Doc file

`guide/settings/email-configuration/email-notifications.md` (Pro section: block editor)
