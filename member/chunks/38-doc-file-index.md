---
chunk: 38
category: Developer Reference
subcategory: Documentation File Index
query-triggers: [doc index, documentation file, where is the doc, which file, doc path, vitepress file list, all documentation files, sidebar structure]
related-chunks: [00]
source-files: [.vitepress/config.mjs]
---

# Documentation File Index

All doc files, their sidebar labels, and what they cover.
Based on `.vitepress/config.mjs` (current structure).

---

## Top-level pages

| File | Sidebar label | Covers |
|---|---|---|
| `index.md` | Home | Landing page |

---

## Guide — Getting Started

| File | Sidebar label | Covers |
|---|---|---|
| `guide/quick-start.md` | Quick Start | Installation, first setup |
| `guide/introduction.md` | Introduction | What Fluent Members does |

---

## Guide — Dashboard

| File | Sidebar label | Covers |
|---|---|---|
| `guide/dashboard.md` | Dashboard | Overview of admin dashboard, stats |

---

## Guide — Levels

| File | Sidebar label | Covers |
|---|---|---|
| `guide/levels/index.md` | Overview | What membership levels are, types |
| `guide/levels/creating-a-level.md` | Creating a Level | Step-by-step create level |
| `guide/levels/pricing-paywalls.md` | Pricing & Paywalls | FluentCart, FF, Paymattic, WooCommerce, Stripe integrations |
| `guide/levels/content-drip.md` | Content Drip | Drip rules, time-based unlock |
| `guide/levels/access-groups-assignment.md` | Access Group Assignment | Linking levels to groups |
| `guide/levels/trial-periods.md` | Trial Periods | Setting up free trials |
| `guide/levels/corporate-memberships.md` | Corporate Memberships | Team seats, invite flow |
| `guide/levels/upgrade-downgrade.md` | Upgrade & Downgrade | Plan switching |

---

## Guide — Access Groups

| File | Sidebar label | Covers |
|---|---|---|
| `guide/access-groups/index.md` | Overview | What access groups are |
| `guide/access-groups/creating-a-group.md` | Creating a Group | Step-by-step create group |
| `guide/access-groups/protected-content.md` | Protected Content | Assigning content, restriction types |
| `guide/access-groups/unauthorized-access.md` | Unauthorized Access | Redirect vs. message, partial preview |
| `guide/access-groups/restricting-a-website.md` | Restricting a Website | Entire website lockdown |
| `guide/access-groups/gutenberg-block/inserting.md` | Inserting Blocks | Block-level protection (sidebar panel) |
| `guide/access-groups/gutenberg-block/configuring.md` | Configuring Blocks | Group assignment per-block |
| `guide/access-groups/gutenberg-block/nesting-and-limits.md` | Nesting & Limits | Logic rules, nesting behavior |

---

## Guide — Members

| File | Sidebar label | Covers |
|---|---|---|
| `guide/members/index.md` | Overview | Member list, search, filters |
| `guide/members/detail.md` | Member Detail | Individual member view |
| `guide/members/adding-manually.md` | Adding Manually | Admin manual assignment |
| `guide/members/statuses.md` | Member Statuses | All 6 statuses |
| `guide/members/suspending-and-cancelling.md` | Suspending & Cancelling | Admin status actions |
| `guide/members/expiring-memberships.md` | Expiring Memberships | How expiry works, cron |
| `guide/members/search-and-filter.md` | Search & Filter | Admin list filtering |
| `guide/members/bulk-actions.md` | Bulk Actions | Bulk status changes |
| `guide/members/portal/setup.md` | Portal Setup | Creating portal page, connecting in Settings |
| `guide/members/portal/what-members-see.md` | What Members See | Portal UI walkthrough |
| `guide/members/portal/cancelling.md` | Cancelling | Member self-cancel flow |
| `guide/members/portal/corporate-seat-invites.md` | Corporate Seat Invites | Invite, remove sub-members (Pro) |
| `guide/members/portal/updating-payment-method.md` | Updating Payment Method | Card update in portal (Pro) |
| `guide/members/portal/renewing-a-failed-subscription.md` | Renewing Failed Subscription | Manual renewal (Pro) |

---

## Guide — Transactions (Pro)

| File | Sidebar label | Covers |
|---|---|---|
| `guide/transactions/index.md` | Overview | Orders, subscriptions, transactions list |
| `guide/transactions/subscriptions.md` | Subscriptions | Managing subscriptions |
| `guide/transactions/orders.md` | Orders | Order records |
| `guide/transactions/refunds.md` | Refunds | Processing refunds (Pro) |

---

## Guide — Settings

| File | Sidebar label | Covers |
|---|---|---|
| `guide/settings/general.md` | General | Portal page, currency, public contents |
| `guide/settings/login-popup.md` | Login Popup | Modal login configuration |
| `guide/settings/partial-content-lock.md` | Partial Content Lock | Preview settings, overlay, word count |
| `guide/settings/payment-settings/stripe-setup.md` | Stripe Setup | Stripe keys, webhook (Pro) |
| `guide/settings/email-configuration/mailing-settings.md` | Mailing Settings | From name, from email, email footer |
| `guide/settings/email-configuration/email-notifications.md` | Email Notifications | Welcome/expiry/suspension emails, merge tags, block editor (Pro) |
| `guide/settings/migration/index.md` | Migration Overview | Which plugins, what transfers |
| `guide/settings/migration/from-pmpro.md` | From PMPro | PMPro step-by-step |
| `guide/settings/migration/from-memberpress.md` | From MemberPress | MemberPress + Stripe transfer |
| `guide/settings/migration/from-restrict-content-pro.md` | From Restrict Content Pro | RCP chunked migration |

---

## Reference

| File | Sidebar label | Covers |
|---|---|---|
| `reference/chain-map.md` | Chain Map | Visual map: level → group → content |
| `reference/glossary.md` | Glossary | Term definitions |
| `reference/membership-statuses.md` | Membership Statuses | All statuses with triggers |
| `reference/shortcode-reference.md` | Shortcode Reference | Both shortcodes, formal spec |
| `reference/email-merge-tags.md` | Email Merge Tags | All 7 merge tags with examples |
| `reference/faq.md` | FAQ | Common questions |
| `reference/troubleshooting.md` | Troubleshooting | Common issues and fixes |
| `reference/developer-hooks.md` | Developer Hooks | All actions, filters, cron jobs |
| `reference/changelog.md` | Changelog | Version history |

---

## Chunk ↔ Doc file cross-reference

| Chunk | Primary doc files |
|---|---|
| 01 | — (identity, no user doc needed) |
| 02 | — (schema, for developers) |
| 03 | `guide/levels/` (all) |
| 04 | `guide/access-groups/` (most) |
| 05 | `guide/members/index.md`, `guide/members/statuses.md` |
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
| 22 | `guide/integrations/fluent-crm.md` |
| 23 | `guide/integrations/fluent-support.md` |
| 24 | `guide/integrations/fluent-community.md` |
| 25 | `guide/settings/migration/index.md` |
| 26 | `guide/settings/migration/from-pmpro.md` |
| 27 | `guide/settings/migration/from-memberpress.md` |
| 28 | `guide/settings/migration/from-restrict-content-pro.md` |
| 29 | `guide/settings/payment-settings/stripe-setup.md` |
| 30 | `guide/transactions/subscriptions.md` |
| 31 | `guide/transactions/index.md`, `guide/transactions/refunds.md` |
| 32 | `guide/levels/corporate-memberships.md`, `guide/members/portal/corporate-seat-invites.md` |
| 33 | `guide/levels/pricing-paywalls.md` |
| 34 | `guide/settings/email-configuration/email-notifications.md` |
| 35 | `reference/developer-hooks.md` |
| 36 | `reference/developer-hooks.md` |
| 37 | `reference/developer-hooks.md` |
| 38 | — (this file — index only) |

---

## Total doc files: 48 pages
