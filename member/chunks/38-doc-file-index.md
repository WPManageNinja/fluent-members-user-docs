---
chunk: 38
category: Developer Reference
subcategory: Documentation File Index
query-triggers: [doc index, documentation file, where is the doc, which file, doc path, vitepress file list, all documentation files, sidebar structure]
related-chunks: [00]
source-files: [.vitepress/config.mjs]
---

# Documentation File Index

All doc files, their sidebar labels, and what they cover. Based on `.vitepress/config.mjs` (verified against the live file — the previous version of this chunk listed a completely different, now-nonexistent structure: no `guide/quick-start.md`/`guide/introduction.md` at guide root, no `guide/levels/creating-a-level.md`, no `reference/glossary.md`/`reference/faq.md`/`reference/changelog.md`. Everything below is current).

---

## Guide — Getting Started

| File | Sidebar label | Covers |
|---|---|---|
| `guide/getting-started/introduction.md` | Introduction | What Fluent Members does, big picture |
| `guide/getting-started/installation.md` | Installation | Free plugin install |
| `guide/getting-started/installation-pro.md` | Pro Installation | Pro plugin install |
| `guide/getting-started/quick-start.md` | Quick Start | 4-step setup wizard walkthrough |
| `guide/getting-started/glossary.md` | Glossary | Term definitions (moved here from `reference/` in this version) |

## Guide — Dashboard

| File | Sidebar label | Covers |
|---|---|---|
| `guide/dashboard/dashboard.md` | Dashboard Overview | Admin dashboard, stats |

## Guide — Levels

| File | Sidebar label | Covers |
|---|---|---|
| `guide/levels/index.md` | Levels Overview | What membership levels are, types |
| `guide/levels/creating.md` | Creating a Level | Step-by-step create level |
| `guide/levels/pricing-native.md` | Pricing: Native Payment | Pro native Stripe/PayPal pricing rows |
| `guide/levels/pricing-paywalls.md` | Pricing: Paywalls | FluentCart, Fluent Forms, Paymattic, WooCommerce paywalls |
| `guide/levels/attaching-access-groups.md` | Attaching Access Groups | Linking levels to groups |
| `guide/levels/content-drip.md` | Content Drip | Drip rules, time-based unlock |
| `guide/levels/members-on-a-level.md` | Members on a Level | Viewing members assigned to a level |
| `guide/levels/corporate-memberships.md` | Corporate Memberships (Pro) | Team seats, invite flow |

## Guide — Access Groups

| File | Sidebar label | Covers |
|---|---|---|
| `guide/access-groups/index.md` | Overview | What access groups are |
| `guide/access-groups/protected-content.md` | Protected Content: Restriction Types | Assigning content, restriction types |
| `guide/access-groups/unauthorized-access.md` | Setting Up Unauthorized Access Rules | Redirect vs. message, partial preview |
| `guide/access-groups/gutenberg-block/inserting.md` | Gutenberg Block: Inserting | Block-level protection (sidebar panel) |
| `guide/access-groups/gutenberg-block/configuring.md` | Gutenberg Block: Configuring | Group assignment per-block |
| `guide/access-groups/gutenberg-block/nesting-and-limits.md` | Gutenberg Block: Nesting & Limits | Logic rules, nesting behavior |

There is no separate `restricting-a-website.md` or `creating-a-group.md` page — "entire website" restriction and group creation are covered inside `protected-content.md` / `index.md`.

## Guide — Members

| File | Sidebar label | Covers |
|---|---|---|
| `guide/members/index.md` | Members List | Member list, search, filters |
| `guide/members/detail.md` | Member Detail | Individual member view |
| `guide/members/adding-manually.md` | Adding a Membership Manually | Admin manual assignment |
| `guide/members/statuses.md` | Status Reference | All member statuses |
| `guide/members/suspending-and-cancelling.md` | Suspending & Cancelling | Admin status actions |
| `guide/members/portal/setup.md` | Portal: Setup | Creating portal page, connecting in Settings |
| `guide/members/portal/what-members-see.md` | Portal: What Members See | Portal UI walkthrough |
| `guide/members/portal/cancelling.md` | Portal: Cancelling a Membership | Member self-cancel flow |
| `guide/members/portal/updating-payment-method.md` | Portal: Updating Payment Method (Pro) | Card update in portal |
| `guide/members/portal/renewing-a-failed-subscription.md` | Portal: Renewing a Failed Subscription (Pro) | Manual renewal |
| `guide/members/portal/corporate-seat-invites.md` | Portal: Corporate Seat Invites (Pro) | Invite/remove sub-members |

There is no `expiring-memberships.md`, `search-and-filter.md`, or `bulk-actions.md` page in this version.

## Guide — Orders (Pro)

Sidebar group is named **"Orders (Pro)"**, not "Transactions", even though the folder is still `guide/transactions/`:

| File | Sidebar label | Covers |
|---|---|---|
| `guide/transactions/index.md` | Orders Overview | Orders, subscriptions, transactions list |
| `guide/transactions/subscriptions.md` | Subscriptions | Managing subscriptions |
| `guide/transactions/one-time.md` | One-Time Purchases | Non-recurring order records |
| `guide/transactions/filters-and-search.md` | Filters & Search | Admin list filtering |
| `guide/transactions/refunds.md` | Refunds | Processing refunds |
| `guide/transactions/cancellation-modes.md` | Subscription Cancellation Modes | Immediate vs. end-of-period |

## Guide — Settings

| File | Sidebar label | Covers |
|---|---|---|
| `guide/settings/general.md` | General Settings | Portal page, currency |
| `guide/settings/partial-content-lock.md` | Partial Content Lock | Preview settings, overlay, word count |
| `guide/settings/login-popup.md` | Login Popup | Modal login configuration |
| `guide/settings/payment-settings/index.md` | Payment Settings | Payment settings overview |
| `guide/settings/payment-settings/stripe-setup.md` | Stripe Setup (Pro) | Stripe keys, webhook |
| `guide/settings/payment-settings/paypal-setup.md` | PayPal Setup (Pro) | PayPal keys, webhook |
| `guide/settings/migration/index.md` | Migration: Overview | Which plugins, what transfers |
| `guide/settings/migration/from-paid-memberships-pro.md` | Migration: From Paid Memberships Pro | PMPro step-by-step |
| `guide/settings/migration/from-memberpress.md` | Migration: From MemberPress | MemberPress + Stripe transfer |
| `guide/settings/migration/from-kadence-memberships.md` | Migration: From Kadence Memberships | Kadence (formerly RCP) chunked migration |
| `guide/settings/email-configuration/mailing-settings.md` | Email Configuration: Mailing Settings | From name, from email, footer |
| `guide/settings/email-configuration/email-notifications.md` | Email Configuration: Email Notifications | Welcome/expiry/suspension emails, merge tags, block editor (Pro) |

Public-contents settings are covered inside `general.md`, not a separate page. "Payment Settings" is its own top-level page (`payment-settings/index.md`), distinct from the Stripe/PayPal setup sub-pages.

## Guide — Help & Support

| File | Sidebar label | Covers |
|---|---|---|
| `guide/help-support/faq.md` | FAQ | Common questions |
| `guide/help-support/get-support.md` | Get Support | How to reach support |
| (external) | Changelog | Links to `/changelog`, not a `guide/` or `reference/` file — see note below |

## Reference

| File | Sidebar label | Covers |
|---|---|---|
| `reference/chain-map.md` | Chain Map | Visual map: level → group → content |
| `reference/membership-statuses.md` | Membership Statuses | All statuses with triggers |
| `reference/shortcode-reference.md` | Shortcode Reference | Both shortcodes, formal spec |
| `reference/email-merge-tags.md` | Email Merge Tags | Merge tags with examples |
| `reference/troubleshooting.md` | Troubleshooting | Common issues and fixes |
| `reference/developer-hooks.md` | Developer Hooks | All actions, filters, cron jobs |

`reference/glossary.md` and `reference/faq.md` do NOT exist in this version — glossary lives at `guide/getting-started/glossary.md`, FAQ at `guide/help-support/faq.md`. There is no `reference/changelog.md` file either; the "Changelog" nav/sidebar entries link to `/changelog` (a project-root page outside both `guide/` and `reference/`), reusing the same `guideSidebar` array per `config.mjs`.

---

## Chunk ↔ Doc file cross-reference

| Chunk | Primary doc files |
|---|---|
| 01 | — (identity, no user doc needed) |
| 02 | — (schema, for developers) |
| 03 | `guide/levels/` (all) |
| 04 | `guide/access-groups/` (most) |
| 05 | `guide/members/index.md`, `guide/members/statuses.md`, `reference/membership-statuses.md` |
| 06 | `guide/access-groups/protected-content.md`, `guide/access-groups/unauthorized-access.md` |
| 07 | `guide/settings/partial-content-lock.md` |
| 08 | `guide/levels/content-drip.md` |
| 09 | `guide/access-groups/gutenberg-block/` (all) |
| 10 | `guide/access-groups/protected-content.md` |
| 11 | `guide/members/portal/` (all) |
| 12 | `reference/shortcode-reference.md` |
| 13 | `guide/settings/general.md` |
| 14 | `guide/settings/login-popup.md` |
| 15 | `guide/settings/email-configuration/mailing-settings.md` |
| 16 | `guide/settings/email-configuration/email-notifications.md` |
| 17 | `guide/settings/partial-content-lock.md` |
| 18 | `guide/settings/general.md` |
| 19 | `guide/levels/pricing-paywalls.md` |
| 20 | `guide/levels/pricing-paywalls.md` |
| 21 | `guide/levels/pricing-paywalls.md` |
| 22–24 | (no dedicated `guide/integrations/` pages exist yet — see chunk 00's "Remaining doc gaps") |
| 25 | `guide/settings/migration/index.md` |
| 26 | `guide/settings/migration/from-paid-memberships-pro.md` |
| 27 | `guide/settings/migration/from-memberpress.md` |
| 28 | `guide/settings/migration/from-kadence-memberships.md` |
| 29 | `guide/settings/payment-settings/stripe-setup.md` |
| 30 | `guide/transactions/subscriptions.md` |
| 31 | `guide/transactions/index.md`, `guide/transactions/refunds.md`, `guide/transactions/cancellation-modes.md` |
| 32 | `guide/levels/corporate-memberships.md`, `guide/members/portal/corporate-seat-invites.md` |
| 33 | `guide/levels/pricing-paywalls.md` |
| 34 | `guide/settings/email-configuration/email-notifications.md` |
| 35 | `reference/developer-hooks.md` |
| 36 | `reference/developer-hooks.md` |
| 37 | `reference/developer-hooks.md` |
| 38 | — (this file — index only) |
| 39 | `guide/settings/payment-settings/paypal-setup.md` |

---

## Total doc files: 57 pages under `guide/` + `reference/` (plus a project-root `/changelog` page reusing the guide sidebar)
