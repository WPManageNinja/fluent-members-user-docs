---
chunk: 13
category: Settings
subcategory: General Settings
query-triggers: [general settings, portal page, pricing page, currency, create portal page, create pricing page, search pages, fluent_members_general_settings, portal_page_id, pricing_page_id]
related-chunks: [11, 12, 18]
source-files: [app/Http/Controllers/SettingsController.php, app/Functions/Utility.php]
doc-files: [guide/settings/general.md]
---

# Settings — General

## Option key

`fluent_members_general_settings` (WordPress option, via `Utility::getGeneralSettings()` / `Utility::updateGeneralSettings()`). `pricing_page_id` is a **separate** plain option (`Utility::getOption('pricing_page_id')`), not part of this settings object.

---

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `portal_page_id` | int | 0 | WordPress page ID of the member portal page. Self-heals on every `GET /settings/general` via `Utility::resolvePortalPageId()` if it drifts from the resolved page. |
| `portal_shortcode` | string | `[fluent_member_portal]` | Always this value — stored for UI display |
| `currency` | string | `USD` | ISO 4217 3-letter currency code |
| `pricing_page_id` *(separate option, not in this settings object)* | int | 0 | WordPress page ID hosting the auto-generated `[fluent_membership_levels]` pricing grid |

### Currency validation

- Sanitized with `strtoupper(sanitize_text_field(...))`
- Must match `/^[A-Z]{3}$/` regex — defaults back to `USD` if invalid

---

## Routes

| Method | Path | Controller@method | Action |
|---|---|---|---|
| GET | `/settings/general` | `getGeneralSettings` | Get general settings + public contents + pricing page info |
| GET | `/settings/general/search-pages` | `searchPortalPages` | Search-as-you-type page picker (used by the Portal Page dropdown) |
| POST | `/settings/general` | `updateGeneralSettings` | Update general settings (portal page, pricing page, currency) + public contents |
| POST | `/settings/general/create-portal-page` | `createPortalPage` | Auto-create the Member Portal page |
| POST | `/settings/general/create-pricing-page` | `createPricingPage` | Auto-create the Pricing page (`[fluent_membership_levels]`, see chunk #12) |

### GET `/settings/general` response includes

- `settings` — the general settings object
- `public_contents` — the public content settings object
- `selected_options` — formatted selected public contents for the UI
- `pricing_page` — `{value, label, edit_url, view_url}` for the pricing page, or `null` if none exists yet

The response no longer bulk-loads every published page as `page_options` — the Portal Page picker now calls `GET /settings/general/search-pages?search=...` on demand (returns up to 20 matches, always including the currently-selected page even if it doesn't match the search term).

---

## Create portal / pricing page actions

Both use a MySQL `GET_LOCK`/`RELEASE_LOCK` mutex (`fmem_portal_page_write_{blog_id}` / `fmem_pricing_page_write_{blog_id}`, default 10s timeout) so two concurrent "Create Page" clicks can't create duplicate pages; a lock miss returns `409`.

**`POST /settings/general/create-portal-page`** — body `{ title: string }` (default "Member Portal"):
1. If a valid portal page already exists, returns it as-is (no duplicate).
2. Otherwise inserts a published page with content `[fluent_member_portal]`, saves its ID as `portal_page_id`.
3. Returns `{ message, page: {value, label, edit_url, view_url} }`.

**`POST /settings/general/create-pricing-page`** — body `{ title: string }` (default "Membership Pricing"):
1. If a valid pricing page already exists, returns it as-is.
2. Otherwise inserts a published page with content `[fluent_membership_levels]`, saves its ID as the separate `pricing_page_id` option.
3. Returns the same `{ message, page: {...} }` shape.

---

## Onboarding

`POST /settings/onboarding-completed`

Fields: `{ contact: { first_name, last_name, email, subscribe_updates, share_feedback }, skip_contact }`

Sets option `fluent_members_onboarding_completed = 'yes'`. Contact data is only sent to WPManageNinja (`OnboardingService::sendContact()`) when `skip_contact` is falsy **and** `share_feedback` is checked — a plain "skip" or an unchecked feedback box both suppress the send.

---

## Doc file

`guide/settings/general.md`
