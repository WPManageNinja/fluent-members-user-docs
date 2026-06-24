---
chunk: 13
category: Settings
subcategory: General Settings
query-triggers: [general settings, portal page, currency, create portal page, fluent_members_general_settings, portal_page_id]
related-chunks: [11, 18]
source-files: [app/Http/Controllers/SettingsController.php, app/Functions/Utility.php]
doc-files: [guide/settings/general.md]
---

# Settings — General

## Option key

`fluent_members_general_settings` (WordPress option, via `Utility::getGeneralSettings()` / `Utility::updateGeneralSettings()`)

---

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `portal_page_id` | int | 0 | WordPress page ID of the member portal page |
| `portal_shortcode` | string | `[fluent_member_portal]` | Always this value — stored for UI display |
| `currency` | string | `USD` | ISO 4217 3-letter currency code |

### Currency validation

- Sanitized with `strtoupper(sanitize_text_field(...))`
- Must match `/^[A-Z]{3}$/` regex — defaults back to `USD` if invalid

---

## Routes

| Method | Path | Action |
|---|---|---|
| GET | `/settings/general` | Get general settings + page options list |
| POST | `/settings/general` | Update general settings + public contents |
| POST | `/settings/general/create-portal-page` | Auto-create portal page |

### GET response includes

- `settings` — the general settings object
- `public_contents` — the public content settings object
- `selected_options` — formatted selected public contents for the UI
- `page_options` — all published pages as `[{value, label, edit_url, view_url}]`

---

## Create portal page action

`POST /settings/general/create-portal-page`

Request body: `{ title: string }` (default: "Member Portal" if empty)

What it does:
1. Inserts a new published page with content `[fluent_member_portal]`
2. Saves the new page's ID as `portal_page_id` in general settings
3. Returns `{ message, page: { value, label, edit_url, view_url } }`

---

## Onboarding

`POST /settings/onboarding-completed`

Fields: `{ contact: { first_name, last_name, email, subscribe_updates, share_feedback }, skip_contact }`

Sets option `fluent_members_onboarding_completed = 'yes'` and optionally sends contact data to WPManageNinja.

---

## Doc file

`guide/settings/general.md`
