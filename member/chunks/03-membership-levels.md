---
chunk: 03
category: Core Entities
subcategory: Membership Levels
query-triggers: [membership level, level type, individual, corporate, level settings, creating levels, pricing plans, level model, pricing type, single pricing type, duplicate level, delete level, setup complete]
related-chunks: [02, 04, 05, 12, 19, 20, 21]
source-files: [app/Http/Controllers/MembershipLevelController.php, app/Http/Controllers/AccessGroupController.php, app/Models/MembershipLevel.php, app/Models/MembershipLevelPricing.php, app/Services/MembershipPricingService.php, fluent-members-pro/app/Http/Controllers/PaymentMethodController.php, fluent-members-pro/app/Services/Payments/PricingService.php]
doc-files: [guide/levels/index.md, guide/levels/creating.md, guide/levels/attaching-access-groups.md, guide/levels/pricing-native.md, guide/levels/pricing-paywalls.md, guide/levels/content-drip.md, guide/levels/members-on-a-level.md, guide/levels/corporate-memberships.md]
---

# Membership Levels

## What it is

A Membership Level is a plan you sell or offer. Visitors buy a Level; the Level unlocks one or more Access Groups. Levels are the "keys"; Access Groups are the "locks".

---

## Model

- **Table**: `fmem_membership_levels`
- **Model file**: `app/Models/MembershipLevel.php`
- **Pricing model**: `app/Models/MembershipLevelPricing.php` (table: `fmem_membership_level_pricing`)
- **Controller**: `app/Http/Controllers/MembershipLevelController.php`

Full column list is in chunk 02.

---

## Level types

| Type value | Meaning |
|---|---|
| `individual` | Standard plan — one WordPress user per membership. Default. |
| `corporate` | Team plan — parent user holds the plan and invites sub-members. Requires `FLUENT_MEMBERS_PRO_PLUGIN_VERSION`; also takes `max_members` (seat cap). |

`type` is locked in once memberships exist for the level — `update()` refuses to change
`type` while any `MembershipUser` row references the level.

---

## Level status

| Value | Meaning |
|---|---|
| `active` | Level is available for sale and assignment |
| `inactive` | Hidden from public-facing shortcodes; existing members unaffected |

The level list endpoint also computes (not stored) `setup_complete` + `setup_incomplete_reason`
per level: `setup_complete` requires at least one **active** Access Group attached AND the
level to be sellable (an active native pricing plan with a connected payment method, or an
active paywall). This drives the "needs setup" hints in the admin UI.

---

## Pricing type — chosen once, permanent

Every level has a `pricing_type`, one of `MembershipLevel::PRICING_TYPES`:
`fluentcart`, `fluentforms`, `paymattic`, `woocommerce`, `native`.

- **Chosen at creation** (or left blank and lazily "claimed" by the first successful write —
  a legacy level with no `pricing_type` accepts the first type it's given, then locks to it).
- **Permanent afterward** — `update()` rejects any attempt to change a level's `pricing_type`
  once set, returning a 422 (`"The pricing type cannot be changed after the level is created."`).
- **Availability is install-dependent** (`MembershipLevel::availablePricingTypes()`):
  `fluentcart` needs `FLUENTCART_VERSION`, `fluentforms` needs `FLUENTFORM_VERSION`,
  `paymattic` needs `WPPAYFORM_VERSION`, `woocommerce` needs Pro + `WC_PLUGIN_FILE`,
  `native` needs Pro. If no pricing type is available at all on the install, the create form
  allows a blank/legacy level.
- Each type owns its own `settings` keys (`PROVIDER_SETTINGS_KEYS`, see chunk 02) — writing a
  foreign key onto a level is stripped on save.

---

## Level-to-Access-Group assignment

- Set inline on create/update (`access_groups[]` in the level payload) via
  `$membershipLevel->accessGroups()->attach()` / `->sync()`.
- Or via the dedicated endpoint: `POST /levels/{id}/access-groups` →
  `AccessGroupController::assignAccessGroups()`.
- Stored in pivot: `fmem_access_group_membership_levels`.
- One level → many access groups; one access group → many levels.

---

## Pricing rows (`fmem_membership_level_pricing`)

Each level can have multiple pricing rows. `provider` defaults to `default`; real values seen
in practice are `native` (Pro's built-in Stripe/PayPal pricing) and migration-origin markers
(e.g. `pmpro`, imported PMPro pricing).

**Key pricing fields**: `amount`, `price_type` (`one_time`/`subscription`), `interval`
(`daily`/`weekly`/`monthly`/`yearly`), `interval_count`, `trial_period_days`, `status`
(`active`/`inactive`), `settings.payment_methods[]`, `settings.upgrade_paths[]`.

**Native pricing is gated**: `POST/PUT /levels/{levelId}/pricing` (Pro) only works on a level
whose `pricing_type = 'native'`, and every create/update requires `settings.payment_methods`
to be non-empty with each listed method actually connected — you cannot save a native pricing
plan before Stripe or PayPal is connected in Settings.

---

## Content drip

Drip rules live on the **Access Group's** settings (`content_dripping_status`, `content_drips[]`),
not directly on the Level — a Level's members inherit drip timing through whichever Access
Groups the Level unlocks. `AccessHelper::isContentDripped()` reads that config when checking
access.

Doc: `guide/levels/content-drip.md`

---

## Duplicating and deleting a level

- `POST /levels/{id}/duplicate` clones title (`" - Duplicated(<id>)"` suffix), type,
  `pricing_type`, `max_members`, description, status, and attached Access Groups. It does
  **not** clone native pricing rows themselves, only their display order (via a
  `fluent_members/duplicate_pricing_order` filter), and fires `fluent_members/level_duplicated`.
- `DELETE /levels/{id}` is refused (422) if the level has **any** billing history (orders,
  subscriptions, or transactions referencing it) or **any** member records — delete the
  members/history first, or set the level `inactive` instead.

---

## REST API routes

| Method | Path | Action |
|---|---|---|
| GET | `/levels` | List all levels (paginated, with `setup_complete` computed) |
| POST | `/levels` | Create a level |
| GET | `/levels/pricing` | Get pricing summary across all levels |
| GET | `/levels/{id}` | Get single level (with pricing + stats) |
| PUT | `/levels/{id}` | Update level |
| DELETE | `/levels/{id}` | Delete level (blocked if billing history/members exist) |
| GET | `/levels/{id}/setup-status` | Whether the level has an active access group / sellable pricing |
| POST | `/levels/{id}/pricing-order` | Save the display order of a level's pricing plans |
| GET | `/levels/{id}/access-groups` | List access groups attached to a level |
| POST | `/levels/{id}/access-groups` | Assign access groups to level |
| POST | `/levels/{id}/duplicate` | Duplicate a level |
| [Pro] GET | `/levels/{levelId}/pricing` | Get native pricing rows for level |
| [Pro] POST | `/levels/{levelId}/pricing` | Add native pricing row (level must be `pricing_type = native`) |
| [Pro] GET | `/levels/{levelId}/pricing/{pricingId}` | Get single pricing row |
| [Pro] PUT | `/levels/{levelId}/pricing/{pricingId}` | Update pricing row |
| [Pro] POST | `/levels/{levelId}/pricing/{pricingId}/duplicate` | Duplicate a pricing row |
| [Pro] DELETE | `/levels/{levelId}/pricing/{pricingId}` | Delete pricing row |

Auth: all routes require `UserPolicy` (admin).

---

## Doc files

| File | Covers |
|---|---|
| `guide/levels/index.md` | Levels overview |
| `guide/levels/creating.md` | How to create a level step-by-step |
| `guide/levels/attaching-access-groups.md` | Linking access groups to a level |
| `guide/levels/pricing-native.md` | Native Stripe/PayPal pricing (Pro) |
| `guide/levels/pricing-paywalls.md` | FluentCart / Fluent Forms / Paymattic / WooCommerce paywalls |
| `guide/levels/content-drip.md` | Drip content rules |
| `guide/levels/members-on-a-level.md` | Viewing members on a level |
| `guide/levels/corporate-memberships.md` | Corporate plan setup |

---

## When a new feature touches Levels

Update: `guide/levels/creating.md` or `guide/levels/index.md` for UI changes, `guide/levels/pricing-native.md` for Pro pricing changes, this chunk (#03), and chunk #38 (doc index).
