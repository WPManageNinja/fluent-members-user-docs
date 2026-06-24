# Changelog

The version history for Fluent Members and Fluent Members Pro. Most recent first.

## 1.0.0: Initial release

The first stable release of Fluent Members.

### Free plugin highlights
- Unlimited Membership Levels (individual or corporate).
- Unlimited Access Groups, with many-to-many mapping to Levels.
- Five content-protection enforcement points: post / page content filter, Gutenberg block, REST API response filter, partial-content preview overlay, content dripping.
- Per-post override via the Access Group Gutenberg block and a meta box fallback for non-block themes.
- Default `user_welcome` email notification with global mailing settings (From, Reply-To, footer, header logo).
- Login Popup for guest-aware checkouts.
- Member Portal page via `[fluent_member_portal]` shortcode.
- Hourly cron for automatic expiry, with cascade to corporate sub-members.
- Built-in REST namespace `fluent-members/v2` for the admin SPA + extensions.
- Native integrations (auto-enabled when host plugin is active): FluentCart, FluentCRM (4 funnel triggers), Fluent Forms, FluentSupport, FluentCommunity, Paymattic.
- Migration wizards from Paid Memberships Pro, MemberPress, and Content Restriction Pro.

### Pro plugin highlights
- Native Stripe checkout (Payment Intents + Setup Intents), webhook listener covering 8 event types.
- Refunds, full and partial, with optional cascade to cancel the membership.
- Transactions admin screen.
- Block Email Editor (Gutenberg iframe with 22 email-safe blocks and starter templates).
- Update Payment Method via Stripe Setup Intent in the portal.
- Renew a failed subscription from the portal (dunning recovery).
- Subscription cancellation modes, immediate or end-of-period.
- Corporate memberships, parent/child seats, invite + join confirmation page, cascade across status changes.
- WooCommerce integration, restrictions, paywalls, WC customer-portal endpoint, instant-checkout flow.
- Stripe-import bridge during PMPro / MemberPress / RCP migration.

---

## Looking ahead

This page will fill out as releases ship. Refer to the plugin's `readme.txt` (under `/wp-content/plugins/fluent-members/`) for the live patch-level history once you're on a newer version.

---

**What's next?**
- [FAQ](/reference/faq): common questions.
- [Quick Start](/guide/getting-started/quick-start): get a site running in 10 minutes.
