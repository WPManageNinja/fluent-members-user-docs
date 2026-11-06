---
chunk: 16
category: Settings
subcategory: Email Notifications
query-triggers: [email notification, welcome email, expiry email, expiring email, lead days, merge tag, {{user_name}}, {{portal_url}}, user_welcome, membership_expiring, membership_expired, notification template, email shortcode groups]
related-chunks: [05, 15]
source-files: [app/Http/Controllers/EmailNotificationController.php, app/Services/Email/EmailNotifications.php, app/Services/Email/EmailNotificationMailer.php, app/Services/Email/BlockEditorHelper.php, app/Services/ShortCodeParser/ShortcodeTemplateBuilder.php]
doc-files: [guide/settings/email-configuration/email-notifications.md, reference/email-merge-tags.md]
---

# Settings — Email Notifications

## What it is

Configurable email templates sent to members on key membership events. Each notification can be enabled/disabled and its subject/body customised. Free: HTML editor. Pro: Gutenberg block editor (`BlockEditorHelper`).

---

## Built-in notifications

Source: `EmailNotifications::getDefaultNotifications()`.

| Key | Event | Label | When it fires |
|---|---|---|---|
| `user_welcome` | `membership_level_assigned` | Welcome Email | When a user gets a membership assigned (new active/trial membership) |
| `membership_expiring` | `membership_expiring` | Membership Expiring | Sent a configurable number of days **before** a membership expires |
| `membership_expired` | `membership_expired` | Membership Expired | When a membership has expired |

There is **no** built-in suspension notification — a prior revision of this chunk listed `membership_welcome` and a `membership_suspended` notification; neither key exists in the current source. The welcome key is `user_welcome`, and `membership_expiring` (lead-time reminder) is the newer addition.

---

## `membership_expiring` lead time

`membership_expiring` is the only notification with `'lead_time' => true`. Its `defaults.lead_days` is `7`. When an admin updates it via `PUT /email-notification/{notification}`, `lead_days` is clamped: `0`/empty → `7` (default), otherwise `min(90, $leadDays)` — so the valid range in practice is 1–90 days before `expires_at`.

---

## Notification data structure (per notification)

```php
[
    'name'          => string,   // e.g. 'user_welcome'
    'event'         => string,   // e.g. 'membership_level_assigned'
    'recipient'     => 'member',
    'title'         => string,   // display name
    'description'   => string,
    'template_path' => string,   // e.g. 'emails.membership.welcome.member'
    'lead_time'      => true,    // only present on membership_expiring
    'defaults'      => [...],    // default subject/body(/lead_days)
    'settings'      => [
        'active'          => 'yes' | 'no',
        'subject'         => string,
        'email_body'      => string (HTML),
        'is_default_body' => 'yes' | 'no',  // 'yes' = using built-in template
        'lead_days'       => int,           // membership_expiring only
    ],
]
```

Settings are persisted as a single serialized blob via `Meta` (`object_type = 'email_notification'`, `meta_key = 'email_notifications_config'`), cached under `email_notifications_config`.

---

## Email merge tags

Use `{{tag}}` syntax in subject and body. Case-sensitive. Source: `EmailNotificationController::getShortCodeGroups()`.

### Member group

| Tag | Outputs |
|---|---|
| `{{user_name}}` | Member's WordPress display name |
| `{{user_email}}` | Member's email address |
| `{{membership_level}}` | Name of the membership level |
| `{{start_date}}` | Membership start date |
| `{{expires_at}}` | Membership expiry date (blank if lifetime) |

### General group

| Tag | Outputs |
|---|---|
| `{{site_name}}` | WordPress site name (`get_bloginfo('name')`) |
| `{{site_url}}` | WordPress site URL |
| `{{portal_url}}` | Membership/Renewal Portal URL |

### Adding custom tags (developer)

```php
add_filter('fluent_members/email_notification_shortcode_groups', function($groups) {
    $groups[] = [
        'title' => 'My Data',
        'shortcodes' => [
            ['key' => '{{my_tag}}', 'title' => 'My Custom Value'],
        ],
    ];
    return $groups;
});
```

After registering the group (for UI picker), handle substitution via `ShortcodeTemplateBuilder` or a separate filter.

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/email-notification` | List all notifications |
| GET | `/email-notification/{notification}` | Get single notification settings — response includes both `data` (the notification) and `shortcodes` (merge tag groups for the UI picker) |
| PUT | `/email-notification/{notification}` | Update notification (subject, body, active, lead_days) |
| POST | `/email-notification/enable-notification/{name}` | Toggle enabled/disabled |
| POST | `/email-notification/preview-default-template` | Preview a template — `template` param must be one of the currently-registered `template_path` values (falls back to the first allowed one); returns rendered HTML with all links/buttons disabled |
| [Pro] POST | `/email-notification/preview` | Preview Pro block-editor template (`EmailNotificationProController::preview`) |

There is **no** dedicated `/email-notification/get-short-codes` route — merge tag groups are returned inline from `GET /email-notification/{notification}`, not fetched separately.

---

## Template rendering

Free: default HTML templates under `app/Views/emails/membership/*` (`welcome/member`, `expiring/member`, `expired/member`).
Pro: `BlockEditorHelper` / Gutenberg block parser renders block content into email-safe HTML.

`ShortcodeTemplateBuilder::make($view, $data, ['context' => 'html'])` — replaces `{{tags}}` with real values.

---

## Settings also exposed via `/settings/email-notifications`

`GET /settings/email-notifications` → formatted list of all notifications with `{enabled, subject, body, label}`.
`POST /settings/email-notifications` → batch update all notifications.

---

## Pro: `fluent_members/prepare_email_template_data` filter

The controller strips `email_body` before saving (free behaviour, forces `is_default_body = 'yes'`); Pro uses this filter to restore the block-editor body:

```php
$settings = apply_filters('fluent_members/prepare_email_template_data', $settingsWithoutTemplate, $settings);
```

---

## Doc files

| File | Covers |
|---|---|
| `guide/settings/email-configuration/email-notifications.md` | Enabling, editing templates, Pro block editor |
| `reference/email-merge-tags.md` | All available merge tags with examples |
