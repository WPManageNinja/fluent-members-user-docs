---
chunk: 03
category: Core Entities
subcategory: Membership Levels
query-triggers: [membership level, level type, individual, corporate, level settings, creating levels, pricing plans, level model]
related-chunks: [02, 04, 05, 12, 19, 20, 21]
source-files: [app/Http/Controllers/MembershipLevelController.php, app/Models/MembershipLevel.php, app/Models/MembershipLevelPricing.php]
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

---

## Level types

| Type value | Meaning |
|---|---|
| `individual` | Standard plan — one WordPress user per membership |
| `corporate` | Team plan — parent user holds the plan and invites sub-members |

---

## Level status

| Value | Meaning |
|---|---|
| `active` | Level is available for sale and assignment |
| `inactive` | Hidden from public-facing shortcodes; existing members unaffected |

---

## Level settings (serialized JSON in `settings` column)

| Key | Used by | Description |
|---|---|---|
| `wc_product_ids[]` | WooCommerce (Pro) | WC product IDs linked to this level |
| `wc_variation_ids[]` | WooCommerce (Pro) | Specific variation IDs to show (empty = all) |
| `ff_form_ids[]` | Fluent Forms | Fluent Forms form IDs acting as checkout |
| `paymattic_form_ids[]` | Paymattic | Paymattic form IDs acting as checkout |
| Corporate config | Corporate levels | `max_members`, seat allocation settings |

---

## Level-to-Access-Group assignment

- Via API: `POST /levels/{id}/access-groups`
- Controller method: `AccessGroupController::assignAccessGroups()`
- Stored in pivot: `fmem_access_group_membership_levels`
- One level → many access groups; one access group → many levels

---

## Pricing rows (`fmem_membership_level_pricing`)

Each level can have multiple pricing rows, one per provider:

| `provider` value | Created by |
|---|---|
| `native` | Fluent Members Pro built-in Stripe pricing |
| `pmpro` | Imported via PMPro migration |
| `memberpress` | Imported via MemberPress migration |

**Key pricing fields**: `amount`, `price_type` (`one_time`/`subscription`), `trial_period_days`, `billing_period`, `billing_interval`, `status` (`active`/`inactive`)

---

## Content drip

Drip rules are stored on the Level (in `settings`). They specify: "X days after `start_date`, unlock content belonging to Access Group Y."

Source: `AccessHelper::isContentDripped()` reads drip config from the level when checking access.

Doc: `guide/levels/content-drip.md`

---

## REST API routes

| Method | Path | Action |
|---|---|---|
| GET | `/levels` | List all levels |
| POST | `/levels` | Create a level |
| GET | `/levels/pricing` | Get pricing for all levels |
| GET | `/levels/{id}` | Get single level |
| PUT | `/levels/{id}` | Update level |
| DELETE | `/levels/{id}` | Delete level |
| POST | `/levels/{id}/access-groups` | Assign access groups to level |
| [Pro] GET | `/levels/{id}/pricing` | Get pricing rows for level |
| [Pro] POST | `/levels/{id}/pricing` | Add pricing row |
| [Pro] GET | `/levels/{id}/pricing/{pricingId}` | Get single pricing row |
| [Pro] PUT | `/levels/{id}/pricing/{pricingId}` | Update pricing row |
| [Pro] DELETE | `/levels/{id}/pricing/{pricingId}` | Delete pricing row |

Auth: all routes require `UserPolicy` (admin).

---

## Doc files

| File | Covers |
|---|---|
| `guide/levels/index.md` | Levels overview |
| `guide/levels/creating.md` | How to create a level step-by-step |
| `guide/levels/attaching-access-groups.md` | Linking access groups to a level |
| `guide/levels/pricing-native.md` | Native Stripe pricing (Pro) |
| `guide/levels/pricing-paywalls.md` | FluentCart / FF / Paymattic / WooCommerce paywalls |
| `guide/levels/content-drip.md` | Drip content rules |
| `guide/levels/members-on-a-level.md` | Viewing members on a level |
| `guide/levels/corporate-memberships.md` | Corporate plan setup |

---

## When a new feature touches Levels

Update: `guide/levels/creating.md` or `guide/levels/index.md` for UI changes, `guide/levels/pricing-native.md` for Pro pricing changes, this chunk (#03), and chunk #38 (doc index).
