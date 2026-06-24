---
chunk: 16
category: Settings
subcategory: Email Notifications
query-triggers: [email notification, welcome email, expiry email, suspension email, merge tag, {{user_name}}, membership_welcome, notification template, email shortcode groups]
related-chunks: [05, 15]
source-files: [app/Http/Controllers/EmailNotificationController.php, app/Services/Email/EmailNotifications.php, app/Services/Email/EmailNotificationMailer.php, app/Services/ShortCodeParser/ShortcodeTemplateBuilder.php]
doc-files: [guide/settings/email-configuration/email-notifications.md, reference/email-merge-tags.md]
---

# Settings — Email Notifications

## What it is

Configurable email templates sent to members on key membership events. Each notification can be enabled/disabled and its subject/body customised. Free: HTML editor. Pro: Gutenberg block editor.

---

## Built-in notifications

| Key | Label | When it fires |
|---|---|---|
| `membership_welcome` | Welcome Email | When a member is assigned to a Membership Level (new active/trial membership) |
| `membership_expired` | Expiry Notification | When membership status changes to `expired` |
| `membership_suspended` | Suspension Notification | When membership status changes to `suspended` |

---

## Notification data structure (per notification)

```php
[
    'settings' => [
        'active'          => 'yes' | 'no',
        'subject'         => string,
        'email_body'      => string (HTML),
        'is_default_body' => 'yes' | 'no',  // 'yes' = using built-in template
    ],
    'label'         => string,   // display name
    'template_path' => string,   // e.g. 'emails.membership.welcome.member'
    'defaults'      => [...],    // default subject and body
]
```

---

## Email merge tags

Use `{{tag}}` syntax in subject and body. Case-sensitive.

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
| GET | `/email-notification/get-short-codes` | Get merge tag groups for UI picker |
| POST | `/email-notification/enable-notification/{name}` | Toggle enabled/disabled |
| POST | `/email-notification/preview-default-template` | Preview default HTML template |
| GET | `/email-notification/{notification}` | Get single notification settings |
| PUT | `/email-notification/{notification}` | Update notification (subject, body, active) |
| [Pro] POST | `/email-notification/preview` | Preview Pro block-editor template |

---

## Template rendering

Free: default HTML templates in `app/Views/emails/membership/welcome/member.php` and similar.
Pro: `FluentBlockParser` renders Gutenberg block content into email-safe HTML.

`ShortcodeTemplateBuilder::make($view, $data)` — replaces `{{tags}}` with real values.

---

## Settings also exposed via `/settings/email-notifications`

`GET /settings/email-notifications` → formatted list of all notifications with `{enabled, subject, body, label}`.
`POST /settings/email-notifications` → batch update all notifications.

---

## Pro: `fluent_members/prepare_email_template_data` filter

Pro uses this filter to restore the block editor body before saving:

```php
// Controller strips email_body (free behaviour), Pro filter adds it back
$settings = apply_filters('fluent_members/prepare_email_template_data', $settingsWithoutTemplate, $settings);
```

---

## Doc files

| File | Covers |
|---|---|
| `guide/settings/email-configuration/email-notifications.md` | Enabling, editing templates, Pro block editor |
| `reference/email-merge-tags.md` | All available merge tags with examples |
