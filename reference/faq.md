# Frequently Asked Questions

Quick answers to the most common questions about Fluent Members. If you can't find your answer here, try [Troubleshooting](/reference/troubleshooting) or the [Glossary](/guide/getting-started/glossary).

## General

### Is Fluent Members free?

Yes. The free plugin gives you Membership Levels, Access Groups, content protection, member portal, default welcome email, plus integrations with FluentCart, Fluent Forms, Paymattic, FluentCRM, FluentSupport, and FluentCommunity. **Fluent Members Pro** unlocks native Stripe checkout, the Block Email Editor, refunds, the Transactions screen, corporate memberships, WooCommerce restrictions, and the migration Stripe-import bridge.

### What WordPress / PHP versions does Fluent Members need?

WordPress 6.0+ and PHP 7.4+. Tested up to WordPress 6.9.

### Does Fluent Members work with my theme?

Yes. The plugin uses standard WordPress hooks and is fully responsive. It works with any theme that follows WordPress coding standards. If your theme is heavily customised, see [Troubleshooting → Theme conflicts](/reference/troubleshooting).

## Setup

### Do I have to use a separate payment plugin?

It depends.
- For **free** memberships or admin-comped access, you don't need anything else.
- For **paid** memberships with Fluent Members Pro, you can use native Stripe, no extra plugin.
- Without Pro, you connect a paywall to FluentCart, WooCommerce (also requires Pro), Fluent Forms, or Paymattic for payment processing.

### How do I create unlimited Membership Levels?

You already can. There is no level cap in either the free or Pro plugin.

### Where do I find my Level ID for the `[fluent_membership_level]` shortcode?

In **Fluent Members → Levels**. The first column is the ID.

### Where does the Member Portal page come from?

Settings → General Settings has a **Generate Portal Page** field with a **+** button that creates a page with the `[fluent_member_portal]` shortcode and saves its ID. You can also create the page manually, just paste the shortcode anywhere.

## Content protection

### Can I protect any type of content?

Yes, pages, posts, custom post types, taxonomies (categories, tags, custom taxonomies), and integration-provided content (FluentCart products / categories / brands, WooCommerce products, Fluent Forms, Paymattic forms, FluentCommunity spaces). Plus per-post override via the Gutenberg block or the meta box fallback.

### What if I want a teaser instead of a hard block?

Use the **Partial Content Preview** restriction action. It shows the first N words with a blurred overlay and a Subscribe button. Configure globally in Settings → Partial Content Lock; override per Access Group.

### Can I drip-feed content?

Yes, set drip rules on the Level. A rule says "this content becomes available N days after the user joined". See [Content Dripping](/guide/levels/content-drip).

### Does Fluent Members protect the REST API too?

Yes. Any public post type that's covered by an Access Group has its REST response scrubbed for users without access. Headless frontends respect the same access rules.

## Members & subscriptions

### What member statuses exist?

Six: `active`, `trial`, `pending`, `cancelled`, `expired`, `suspended`. Full meaning at [Membership Statuses](/reference/membership-statuses).

### How does a member cancel from the front-end?

They click **Cancel Membership** on the card in the Member Portal. The plugin updates the local status and, if a recurring subscription is in play (Pro), cancels it at the payment provider too.

### Does Fluent Members support recurring subscriptions?

Yes. The pricing plan's `price_type` set to `recurring` makes it a subscription. Native subscriptions need Pro + Stripe; integrations with FluentCart subscriptions / WooCommerce Subscriptions / Fluent Forms recurring payments also work.

### Can members manage their own profiles?

The portal lets them view memberships, cancel (free), update payment method, renew failed subscriptions, and invite corporate sub-members (Pro). For profile fields (name, password) they still use WordPress's own profile page.

### What's a corporate membership?

A Pro-only level type. One parent buys N seats, then invites team members from the portal. Cancelling the parent revokes the whole team. See [Corporate Memberships](/guide/levels/corporate-memberships).

## Emails

### How many email notifications does Fluent Members ship?

Exactly one in 1.0.0: the **Welcome Email** (`user_welcome`), sent when a membership is granted. Both free and Pro use the same notification, Pro just lets you compose the body with the Block Email Editor.

### Can I add custom email notifications for cancel / expire?

Not from the admin UI in 1.0.0. Developers can register new notifications by extending the `EmailNotifications` registry, see [Developer Reference → Hooks](/reference/developer-hooks). FluentCRM is the recommended path for production: subscribe to lifecycle actions like `fluent_members/membership_cancelled` and send branded emails from the CRM.

### My email isn't arriving, what should I check?

See [Troubleshooting → Email not delivered](/reference/troubleshooting).

## Payments

### Where does Stripe configuration live?

(Pro) Settings → Payment Settings → Stripe → **Manage**. You connect via OAuth (Stripe Connect) or paste keys manually, then copy the webhook URL into your Stripe dashboard.

### What's the webhook URL?

`https://yoursite.com/?fluent_members_payment_listener=1&payment_method=stripe`. You'll see the exact URL in the Stripe settings screen, copy it from there.

### Can I refund a transaction?

(Pro) Yes. From **Transactions** or from a member's detail screen, click **Refund** on a charge. Full or partial. Optionally, the refund cancels the membership too.

### Can I issue a refund through the integration's UI instead of Fluent Members?

Yes, refunds in FluentCart, WooCommerce, or Stripe Dashboard propagate back via webhooks (for Pro) or integration events. The plugin will pick up the refund and update local state.

## Integrations & migration

### Which membership plugins can I migrate from?

Three: **Paid Memberships Pro**, **MemberPress**, **Content Restriction Pro**. Each has a step-by-step wizard. See [Migrations](/guide/settings/migration/).

### Do my Stripe customers and subscriptions migrate too?

(Pro) Yes, the Pro plugin's Stripe-import bridge reads the original gateway data and links the new local records to the existing Stripe customer / subscription IDs.

### Does Fluent Members integrate with WooCommerce?

(Pro) Yes, WooCommerce restrictions, paywalls mapped to WC products, customer-portal endpoint, and an instant-checkout flow.

## Support

### Where do I get help?

Free plugin: the [WordPress.org support forum](https://wordpress.org/support/plugin/fluent-members/). Pro: through the licence portal on fluentmembers.com.

---

**What's next?**
- [Troubleshooting](/reference/troubleshooting): fixing the common issues.
- [Glossary](/guide/getting-started/glossary): the vocabulary.
- [Quick Start](/guide/getting-started/quick-start), 10 minutes to a working site.
