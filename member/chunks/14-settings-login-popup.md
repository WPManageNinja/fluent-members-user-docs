---
chunk: 14
category: Settings
subcategory: Login Popup
query-triggers: [login popup, modal, login modal, auto popup, register url, lost password, LoginPopupHandler, fluent_members_login_popup_settings]
related-chunks: [06, 13]
source-files: [app/Http/Controllers/SettingsController.php, app/Hooks/Handlers/LoginPopupHandler.php, app/Functions/Utility.php]
doc-files: [guide/settings/login-popup.md]
---

# Settings — Login Popup

## What it is

An optional modal dialog that appears when a visitor tries to access restricted content. Instead of redirecting to a login page, the login form slides in as an overlay. Can also auto-popup on restricted page loads.

---

## Option key

`fluent_members_login_popup_settings` (via `Utility::getLoginPopupSettings()` / `Utility::updateLoginPopupSettings()`)

---

## All fields

| Field | Type | Default | Description |
|---|---|---|---|
| `enabled` | `yes`/`no` | `no` | Master switch — show popup at all |
| `auto_popup` | `yes`/`no` | `no` | Auto-trigger popup without user clicking anything |
| `modal_title` | string | — | Heading text inside the popup |
| `custom_message` | HTML string | — | Body content (kses-filtered with `wp_kses_post`) |
| `button_text` | string | — | Login button label |
| `button_color` | hex | `#0073aa` | Login button background color |
| `button_text_color` | hex | `#ffffff` | Login button text color |
| `button_size` | `small`/`medium`/`large` | `medium` | Login button size |
| `register_url` | URL | — | Optional link to registration page |
| `register_link_text` | string | — | Text for the registration link |
| `lost_password_url` | URL | — | Optional link to password reset page |
| `lost_password_link_text` | string | — | Text for the lost password link |

### Validation rules

- `button_color`, `button_text_color` → `sanitize_hex_color()`, fallback to default if invalid
- `button_size` → must be in `['small', 'medium', 'large']`, else `'medium'`
- `register_url`, `lost_password_url` → `esc_url_raw()`
- `custom_message` → `wp_kses_post()`

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/login-popup` | Get popup settings |
| POST | `/settings/login-popup` | Update popup settings |

---

## Handler: LoginPopupHandler

`app/Hooks/Handlers/LoginPopupHandler.php`

Hooks registered by this handler:
- Enqueues the popup JavaScript and CSS assets on relevant pages
- Renders the popup HTML in the footer when enabled

Popup template: `app/Views/public/login-popup.php`

---

## Doc file

`guide/settings/login-popup.md`
