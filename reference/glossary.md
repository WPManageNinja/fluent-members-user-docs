# Glossary

Short, plain-language definitions of the terms used across these docs. Skim this once and the rest of the documentation will read faster.

## Access Group

A labelled bag of "things to protect", pages, posts, post types, taxonomies, products, forms, community spaces. You connect one or more **Membership Levels** to an Access Group; anyone holding one of those levels gets to see everything in the group. Think of it as a padlocked folder.

## Access Group Block

The Gutenberg block (`fluent-members/access-group`) that lets you wrap any content in the editor and protect it inline, instead of building a rule in **Access Groups**. See [The Access Group Block](/guide/access-groups/gutenberg-block/inserting).

## Cached access

A snapshot of which Access Groups a single user can currently see, stored inline on the user's membership row. Used so the plugin doesn't have to re-query every time someone opens a page. Rebuilt whenever you change levels, access groups, or a user's membership.

## Cancellation mode (Pro)

Choice between **immediate** and **end-of-period** when a subscription is cancelled. See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).

## Content Dripping

The schedule that says *"this lesson is available 7 days after you join"*. The user holds the right level, but the content is time-locked. See [Content Dripping](/guide/levels/content-drip).

## Corporate Membership (Pro)

A level type where one paying **parent** holds N seats, then invites team members to fill those seats. Cancelling the parent revokes the whole team. See [Corporate Memberships](/guide/levels/corporate-memberships).

## Drip rule

A single line in a level's drip schedule. It points at a piece of content and says "available after X days/weeks/months from the user's start date".

## Lifetime membership

A membership row with no `expires_at` value. The hourly expiry cron never touches it. To revoke access, an admin must change the status manually.

## Member Portal

The front-end page (any WP page containing the `[fluent_member_portal]` shortcode) where logged-in members manage their own memberships. See [Member Portal Setup](/guide/members/portal/setup).

## Membership Level

The product a member buys (or gets assigned). Each level has one or more **Pricing Plans**, may be **Individual** or **Corporate**, and links to one or more Access Groups. See [Membership Levels](/guide/levels/).

## Merge tag (smartcode)

A `{{user_name}}`-style placeholder used in email subjects and bodies. The plugin replaces them at send time. Full list at [Email Merge Tags](/reference/email-merge-tags).

## Native checkout

The built-in checkout page used when a Pricing Plan's provider is `default`. For paid plans it requires **Pro** so Stripe is available to actually collect money; for `free` plans it works in the free plugin.

## Partial Content Preview

Show a short teaser of restricted content with a blurred overlay and a Subscribe button, instead of a hard block. See [Partial Content Preview](/guide/settings/partial-content-lock).

## Paywall

A mapping between a payment-plugin product / form and a Fluent Members level. When someone pays for the product, the corresponding membership gets granted. Free plugin supports FluentCart, Fluent Forms, Paymattic paywalls. Pro adds WooCommerce and native Stripe.

## Pricing Plan

A row in `fmem_membership_level_pricing`, one selling option for a Level. Pricing plans carry the provider, price type (`one_time` / `recurring` / `lifetime` / `free` / `trial`), amount, currency, interval, and trial days.

## Provider

The system that issued a given membership. Examples: `default` (native), `stripe`, `fluentcart`, `woocommerce`, `fluentform`, `paymattic`. Used to know who to call when the user wants to cancel or refund.

## REST namespace

Every plugin endpoint sits under `wp-json/fluent-members/v2/…`. The admin Vue app is the main consumer; you can also call it from your own code with a logged-in admin's REST nonce.

## Restriction Action

What happens when a non-member tries to see protected content: `redirect`, `message`, `login`, `partial`, or `hide`. Set per Access Group.

## Status

The state of a single membership row. Vocabulary: `active`, `trial`, `pending`, `cancelled`, `expired`, `suspended`. Full meaning at [Membership Statuses](/reference/membership-statuses).

## Stripe webhook (Pro)

The URL Stripe calls when something happens to a payment or subscription. The plugin's listener is at `?fluent_members_payment_listener=1&payment_method=stripe`. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

## Sub-member (corporate child)

A team member sitting under a corporate parent. Their membership row carries `parent_membership_id` pointing at the parent. Sub-members can't pay or cancel; only the parent can.

## Suspended

A status that revokes access without cancelling billing. Used when an admin temporarily blocks a member (policy violation, payment dispute) without losing the subscription. Reverse via status change back to `active`.

## Transaction (Pro)

A single billing event, initial charge, renewal charge, or refund, stored in `fmem_membership_transactions`. The Transactions screen shows them all.

## WPFluent

The micro-framework powering Fluent Members, FluentCart, FluentCRM, and other WPManageNinja plugins. You'll see references in `boot/app.php`, `Hooks/`, and the routing layer.

---

**What's next?**
- [Membership Statuses](/reference/membership-statuses): what each status does and how to move between them.
- [Shortcode Reference](/reference/shortcode-reference): the two shortcodes Fluent Members ships.
