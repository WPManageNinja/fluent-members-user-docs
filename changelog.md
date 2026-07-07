# Changelog

Stay updated with the latest improvements, new features, bug fixes, and performance enhancements in **Fluent Members**.

## Fluent Members v1.0.0

_Released on June 01, 2025_

:::tabs
== ✨ Added
```markdown
• Unlimited Membership Levels with individual and corporate seat support
• Unlimited Access Groups with many-to-many mapping to Levels
• Five content-protection enforcement points: post/page content filter, Gutenberg block,
  REST API response filter, partial-content preview overlay, and content dripping
• Per-post override via the Access Group block inspector panel and a meta box fallback
  for classic themes
• Member Portal via [fluent_member_portal] shortcode — members can view, cancel, and
  manage their memberships
• Pricing card shortcode [fluent_membership_level id="X"] for embedding checkout buttons
• Login Popup for guest-aware restricted content
• Three built-in email notifications: Welcome Email, Expiry Notification, Suspension
  Notification — with merge tag support
• Global Mailing Settings: From name, From email, Reply-To, header logo, footer text
• Hourly cron for automatic membership expiry with cascade to corporate sub-members
• REST namespace fluent-members/v2 for the admin SPA and extensions
• Native integrations: FluentCart, FluentCRM (4 funnel triggers), Fluent Forms,
  FluentSupport, FluentCommunity, Paymattic
• Migration wizards from Paid Memberships Pro, MemberPress, and Restrict Content Pro
```
:::

## Fluent Members Pro v1.0.0

_Released on June 01, 2025_

:::tabs
== ✨ Added
```markdown
• Native Stripe checkout via Payment Intents and Setup Intents
• Stripe webhook listener for subscription lifecycle events
• Transactions admin screen — full billing ledger with paid, pending, failed, and
  refunded tabs
• Full and partial refunds directly from the Transactions screen
• Subscription management: active, trialing, past due, cancelled, paused statuses
• Subscription cancellation modes: immediate or end-of-period
• Update Payment Method via Stripe Setup Intent from the member portal
• Renew a failed subscription from the portal (dunning recovery)
• Block Email Editor — Gutenberg iframe with email-safe blocks and starter templates
• Corporate memberships: parent/child seats, invite token flow, cascade across status
  changes
• WooCommerce integration: product restrictions, paywalls, instant checkout,
  WC Subscriptions support
• Stripe-import bridge during migration from Paid Memberships Pro and MemberPress
```
:::
