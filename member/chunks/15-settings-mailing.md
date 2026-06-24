---
chunk: 15
category: Settings
subcategory: Mailing Settings
query-triggers: [mailing settings, from name, from email, reply to, email footer, email logo, header logo, powered by, EmailNotifications settings]
related-chunks: [16]
source-files: [app/Http/Controllers/SettingsController.php, app/Services/Email/EmailNotifications.php]
doc-files: [guide/settings/email-configuration/mailing-settings.md]
---

# Settings — Mailing

## What it is

Global email configuration that applies to all outgoing notification emails from Fluent Members — the From address, Reply-To, header logo, footer text, and branding.

---

## Stored in

`EmailNotifications::getSettings()` / `EmailNotifications::updateSettings()` (stored in WordPress options, separate from notification-specific settings).

Note: `notification_config` is stripped from the mailing settings response (it's a separate concern).

---

## All fields

| Field | Type | Default | Description |
|---|---|---|---|
| `from_name` | string | — | Sender display name (e.g. "Acme Academy") |
| `from_email` | email | — | Sender email address (use a real mailbox on your domain) |
| `reply_to_name` | string | — | Reply-to display name (can differ from from_name) |
| `reply_to_email` | email | — | Reply-to email address |
| `email_footer` | HTML string | — | Footer text/HTML added to every email (kses-filtered) |
| `email_header_logo` | URL | — | Logo image URL shown in email header |
| `enable_powered_by` | `yes`/`no` | `yes` | Show "Powered by Fluent Members" in footer |

### Validation rules

- `from_email`, `reply_to_email` → `sanitize_email()`
- `email_footer` → `wp_kses_post()`
- `email_header_logo` → `esc_url_raw()`

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/mailing` | Get mailing settings |
| POST | `/settings/mailing` | Update mailing settings |

---

## Email template structure

Every notification email is wrapped in a standard template (`app/Views/emails/general_template.php`) that uses these settings:
- Header: logo from `email_header_logo`
- Footer: text from `email_footer` + optional "Powered by Fluent Members" from `enable_powered_by`

Pro: `EmailNotificationMailer::wrapInTemplate()` is used to apply the wrapper.

---

## Common issue

Using the default WordPress sender (`wordpress@yoursite.com`) causes emails to land in spam or be rejected. Advise users to:
1. Set a real mailbox in `from_email`
2. Install an SMTP plugin (FluentSMTP, WP Mail SMTP, Mailgun, etc.)

---

## Doc file

`guide/settings/email-configuration/mailing-settings.md`
