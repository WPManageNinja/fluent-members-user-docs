---
chunk: 00
title: Master Index
purpose: Load this first. Maps every topic to its chunk number so you load only what you need.
always-load: true
---

# Chunk Index — Fluent Members Knowledge Base

## How to use

1. Load this file (chunk 00)
2. Find the topic in the table below → get the chunk number
3. Load only that chunk file
4. For cross-cutting questions load 2-3 chunks max

## Topic → Chunk map

| Topic | Chunk |
|---|---|
| Plugin name, version, constants, namespaces | 01 |
| Entry point, boot sequence, framework | 01 |
| Database tables, model files, field names | 02 |
| Table relationships, DB migrations | 02 |
| Membership Level model, types, settings | 03 |
| Creating levels, level fields | 03 |
| Access Group model, restriction types | 04 |
| Assigning content to groups, group-level pivot | 04 |
| MembershipUser model, all member fields | 05 |
| Member statuses (active/trial/expired/suspended/pending/cancelled) | 05 |
| Provider values (fluent_cart, woocommerce, native, pmpro…) | 05 |
| Page/post redirect, the_content filter, archive lockdown | 06 |
| AccessHelper, RestrictionRenderer | 06 |
| Partial content preview, word count, overlay | 07 |
| Per-post partial override, per-block partial override | 07 |
| Content dripping, time-based access | 08 |
| Gutenberg block-level access, render_block filter | 09 |
| Block Inspector panel, classic editor meta box | 09 |
| REST API protection, rest_prepare_{type} filter | 10 |
| fluent_members/rest_forbidden_message filter | 10 |
| Member portal shortcode [fluent_member_portal] | 11 |
| Portal API routes, what members see | 11 |
| Corporate seat management in portal (Pro) | 11 |
| Payment method update in portal (Pro) | 11 |
| Subscription renewal in portal (Pro) | 11 |
| [fluent_membership_level] shortcode | 12 |
| Payment provider resolution at render time | 12 |
| Settings → General (portal_page_id, currency) | 13 |
| create-portal-page action | 13 |
| Settings → Login Popup (all 12 fields) | 14 |
| LoginPopupHandler | 14 |
| Settings → Mailing (from/reply-to/logo/footer) | 15 |
| Settings → Email Notifications (notifications, merge tags) | 16 |
| Email merge tags {{user_name}} etc. | 16 |
| Settings → Partial Content defaults (all 10 fields) | 17 |
| Settings → Public Contents, bypass list | 18 |
| FluentCart integration (paywalls, variants, CartHelper) | 19 |
| Fluent Forms integration (ff_form_ids, parseFormPlans) | 20 |
| Paymattic integration (paymattic_form_ids, wp_payform) | 21 |
| FluentCRM integration (4 triggers, MemberHelper) | 22 |
| Fluent Support integration | 23 |
| FluentCommunity integration (LevelIntegrationModule) | 24 |
| Migration overview, supported sources, what transfers | 25 |
| PMPro migration phases and API endpoints | 26 |
| MemberPress migration, Stripe-import bridge | 27 |
| Restrict Content Pro migration, run-step loop | 28 |
| Native Stripe checkout, payment intent flow (Pro) | 29 |
| Stripe webhook IPN, Stripe Connect settings (Pro) | 29 |
| MembershipSubscription model, subscription lifecycle (Pro) | 30 |
| Subscription renewal, SubscriptionRenewHelper (Pro) | 30 |
| Cancel/refund/renew/update-payment-method endpoints (Pro) | 31 |
| BillingActionController, Refund service (Pro) | 31 |
| Corporate invite token flow, CorporateMembershipService (Pro) | 32 |
| ?fmem_join=TOKEN handler, rate limiting (Pro) | 32 |
| WooCommerce paywalls, InstantCheckoutService (Pro) | 33 |
| WC Subscriptions, variation handling (Pro) | 33 |
| Block email editor, FluentBlockParser (Pro) | 34 |
| Email block types (14 blocks) (Pro) | 34 |
| All free plugin REST API routes | 35 |
| All Pro plugin REST API routes | 36 |
| WordPress filters and actions (all hooks) | 37 |
| Every .md doc file → feature it covers | 38 |

## Chunk file list

```
member/chunks/
├── 00-index.md                        ← you are here
├── 01-plugin-identity.md
├── 02-database-schema.md
├── 03-membership-levels.md
├── 04-access-groups.md
├── 05-members-statuses.md
├── 06-protection-page-post-archive.md
├── 07-protection-partial-preview.md
├── 08-protection-dripping.md
├── 09-protection-gutenberg-blocks.md
├── 10-protection-rest-api.md
├── 11-member-portal.md
├── 12-shortcodes.md
├── 13-settings-general.md
├── 14-settings-login-popup.md
├── 15-settings-mailing.md
├── 16-settings-email-notifications.md
├── 17-settings-partial-content.md
├── 18-settings-public-contents.md
├── 19-integration-fluent-cart.md
├── 20-integration-fluent-forms.md
├── 21-integration-paymattic.md
├── 22-integration-fluent-crm.md
├── 23-integration-fluent-support.md
├── 24-integration-fluent-community.md
├── 25-migration-overview.md
├── 26-migration-pmpro.md
├── 27-migration-memberpress.md
├── 28-migration-rcp.md
├── 29-pro-stripe-payments.md
├── 30-pro-subscriptions.md
├── 31-pro-billing-actions.md
├── 32-pro-corporate.md
├── 33-pro-woocommerce.md
├── 34-pro-block-email-editor.md
├── 35-api-routes-free.md
├── 36-api-routes-pro.md
├── 37-hooks-filters.md
└── 38-doc-file-index.md
```

## Common load patterns

| Task | Load chunks |
|---|---|
| Fix a content protection bug | 00 → 06 (+ 07/08/09/10 as needed) |
| Add a new settings field | 00 → 13–18 (pick the right settings chunk) |
| Add a new integration | 00 → 19–24 (nearest integration as pattern) |
| Update migration docs | 00 → 25 → 26/27/28 |
| Pro billing question | 00 → 30 + 31 |
| New email merge tag | 00 → 16 |
| New shortcode | 00 → 12 + 38 (doc index) |
| Review all REST routes | 00 → 35 + 36 |
