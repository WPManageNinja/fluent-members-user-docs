# Glossary

Every term used across the Fluent Members documentation, defined in plain language and arranged A–Z.
Skim this page once and the rest of the docs will read much faster.

## A

### Access Group

A named container of protected content pages, posts, post types, categories, taxonomies, or an entire website. You attach one or more **Membership Levels** to an Access Group; members holding any of those levels can see everything inside the group. Think of an Access Group as a padlocked folder and the Membership Level as the key.

See [Protected Content](/guide/access-groups/protected-content).

### Access Group Block

A Gutenberg editor feature that lets you restrict individual blocks (paragraphs, images, buttons, etc.) inside a post without creating a full Access Group rule. You select the block, open the block Inspector panel, and tick which Access Groups can see it. Non-members get either a restriction message or a partial preview in place of that block.

See [Gutenberg Block: Inserting](/guide/access-groups/gutenberg-block/inserting).

### Active

The normal operating membership status. A member with status `active` has full access to every Access Group their level grants. This is the state memberships enter after a successful payment or a manual admin assignment.

See [Membership Statuses](/reference/membership-statuses).

### Admin Bypass

Site administrators (WordPress role `administrator`) always skip all content protection rules automatically — redirects, content filters, block filters, and REST API checks. Always test your protection rules while logged in as a non-admin user, or in an incognito window.

## B

### Billing

The collective term for the financial side of a subscription: charges, renewals, refunds, and payment method management. Billing history is stored across three tables: `fmem_membership_orders`, `fmem_membership_transactions`, and `fmem_membership_subscriptions`.

See [Transactions](/guide/transactions/).

### Block Email Editor (Pro)

A Pro feature that replaces the plain HTML textarea in email notification settings with a Gutenberg-based visual editor. You build email templates from blocks (paragraphs, images, buttons, dividers) and preview them before saving. The plugin converts block markup to email-safe HTML at send time.

See [Email Notifications](/guide/settings/email-configuration/email-notifications).

### Block-Level Protection

Content restriction applied to a single Gutenberg block rather than an entire post. A member can have access to the post but still be blocked on a specific block within it if that block has a different Access Group assigned. Blocked blocks are completely removed from the rendered HTML — they are not hidden with CSS and cannot be seen via View Source.

See [Gutenberg Block: Configuring](/guide/access-groups/gutenberg-block/configuring).

## C

### Cached Access

A serialized snapshot of the Access Group IDs a user is currently permitted to see, stored in the `cached_access` column of `fmem_membership_users`. The plugin reads this cache instead of re-querying on every page load. The cache is automatically rebuilt when a membership status changes, or when Access Group assignments change.

### Cancellation Mode (Pro)

Controls whether a subscription cancellation takes effect immediately or at the end of the current billing period. **Immediate** cancellation revokes access at once; **end-of-period** lets the member keep access until the date they already paid for. Configured in Settings → Payment Settings.

See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).

### Cancelled

A membership status set when a member explicitly cancels, an admin cancels, or a payment provider triggers cancellation. The membership record is kept in the database for history but access is revoked immediately. Distinct from **Expired** (time ran out) and **Suspended** (admin-paused).

See [Membership Statuses](/reference/membership-statuses).

### Chain Map

A visual reference diagram showing how the three core entities connect: **Membership Level** (the key) → **Access Group** (the lock) → **Content** (what is protected). Understanding this chain is the fastest way to reason about why a member can or cannot see a piece of content.

See [Chain Map](/reference/chain-map).

### Checkout

The page or flow where a visitor purchases a membership. Depending on which payment integration is active, checkout is handled by FluentCart, Fluent Forms, Paymattic, WooCommerce, or the native Stripe checkout (Pro). Each integration has its own checkout URL; the `[fluent_membership_level]` shortcode links directly to the correct checkout for each Pricing Plan.

### Content Dripping

A time-based release schedule that unlocks content gradually after a member joins. A drip rule says "this post is available 14 days after the member's start date." The member holds the correct level and can see the post in navigation, but the content is replaced by a restriction message until the timer expires.

See [Content Drip](/guide/levels/content-drip).

### Content Protection

The collective set of mechanisms Fluent Members uses to hide or restrict access to site content: page/post redirect, `the_content` filter replacement, partial content preview, content dripping, Gutenberg block-level restriction, archive lockdown, and REST API response filtering.

### Corporate Membership (Pro)

A Membership Level type where one **Parent Member** buys seats and invites team members to fill them. Sub-members get the same content access as the parent's level without purchasing individually. Cancelling the parent's membership revokes access for the whole team. Seat limits, invitations, and removal are managed from the Member Portal.

See [Corporate Memberships](/guide/levels/corporate-memberships).

### Currency

The ISO 4217 three-letter currency code used by the plugin (e.g. `USD`, `GBP`, `EUR`). Set once in **Settings → General**. This value is used to format prices displayed in the `[fluent_membership_level]` shortcode pricing card.

## D

### Dashboard

The overview screen in the Fluent Members admin area showing at-a-glance statistics: total members, active memberships, recent signups, revenue summary (Pro), and quick-access links to common tasks.

See [Reading the Dashboard](/guide/dashboard).

### Drip Rule

A single time-gate entry within a Membership Level's drip schedule. Each drip rule points at a specific piece of content (a post, a category, an Access Group) and defines how many days after the member's `start_date` that content becomes accessible.

See [Content Drip](/guide/levels/content-drip).

## E

### Email Notification

An automated email sent to a member when a key membership event occurs. Fluent Members ships three built-in notifications: **Welcome** (on enrollment), **Expiry** (when membership expires), and **Suspension** (when membership is suspended). Each notification has a configurable subject and body using **Merge Tags**.

See [Email Notifications](/guide/settings/email-configuration/email-notifications).

### Entire Website Restriction

An Access Group restriction type that protects every page on the site — archives, homepage, taxonomies, and singulars rather than individually selected posts. Any visitor who lacks the required membership level is redirected or shown the restriction message on every page.

See [Protected Content](/guide/access-groups/protected-content).

### Expired

A membership status set automatically by the hourly cron job (`fluent_members_check_expired_memberships`) when a membership's `expires_at` date passes and its current status is `active` or `trial`. An expired member loses access but their record is kept. They can renew to restore access.

See [Membership Statuses](/reference/membership-statuses).

## F

### FluentCart

A WPManageNinja e-commerce plugin that can act as the payment provider for Fluent Members. When FluentCart is installed, its products and product variants appear as Pricing Plans on the `[fluent_membership_level]` shortcode. FluentCart handles the checkout; Fluent Members activates the membership when the order completes.

See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

### FluentCommunity

A WPManageNinja community platform plugin. When active alongside Fluent Members, specific community spaces can be gated behind Membership Levels. Members are automatically added to or removed from spaces as their membership status changes.

### FluentCRM

A WPManageNinja CRM plugin. When active, Fluent Members membership events (enrollment, status change, cancellation, expiry) can automatically apply or remove FluentCRM contact tags and add contacts to lists. Used to trigger email sequences and automations based on membership activity.

### Fluent Forms

A WordPress form builder that can act as the payment provider for Fluent Members. A Fluent Forms payment form is linked to a Membership Level; when a visitor submits the form and pays, Fluent Members activates the corresponding membership. Multiple forms can be linked to one level (e.g. monthly and annual plans as separate forms).

See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

### Fluent Members Pro

The paid add-on plugin that extends the free Fluent Members core. Pro adds: native Stripe checkout, subscription management, billing history (orders, transactions), refunds, corporate memberships, WooCommerce integration, update-payment-method in the member portal, and the block email editor.

### Fluent Support

A WPManageNinja helpdesk plugin. When active alongside Fluent Members, an agent viewing a support ticket can see the submitter's active membership level(s) in the ticket sidebar. Optionally, access to submit tickets can be restricted to members of specific levels.

## H

### Hook

A WordPress extension point — either an **action** (`do_action`) or a **filter** (`apply_filters`) — that third-party code can use to modify Fluent Members behavior. Examples: `fluent_members/member_enrolled` (action, fires when a membership is created), `fluent_members/rest_forbidden_message` (filter, customizes the API error message for blocked content).

See [Developer Hooks](/reference/developer-hooks).

## I

### Individual Level

The default Membership Level type, where each member buys their own seat. Contrast with **Corporate Membership** where one purchaser buys seats for a whole team.

### Integration

A connection between Fluent Members and another plugin that extends checkout, content access, or CRM capabilities. Free integrations: FluentCart, Fluent Forms, Paymattic, FluentCRM, Fluent Support, FluentCommunity. Pro integrations: WooCommerce, native Stripe.

### Invite Token (Pro)

A 32-character random string generated when a **Corporate Membership** parent invites a sub-member by email. The token is embedded in a join URL (`?fmem_join=TOKEN`). When the invitee clicks the link and is logged in, the token is validated, consumed, and a sub-member record is created. Tokens expire after 24–48 hours. The system rate-limits invitations to one per email address per hour.

See [Portal: Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

## L

### Lifetime Membership

A membership with no `expires_at` date. The hourly expiry cron job ignores lifetime memberships. To revoke a lifetime membership, an admin must manually change the status to `cancelled` or `suspended`.

### Login Popup

An optional modal dialog that slides in when a non-logged-in visitor encounters protected content, letting them log in without leaving the page. Configured in **Settings → Login Popup**. Can also be set to auto-trigger on restricted page loads.

See [Login Popup](/guide/settings/login-popup).

## M

### Member

A WordPress user who has been assigned at least one Membership Level. One user can hold multiple simultaneous memberships (one `fmem_membership_users` row per assignment).

### Member Portal

The self-service front-end page for logged-in members. Created by placing the `[fluent_member_portal]` shortcode on a WordPress page. Members can view their active memberships, cancel a membership, and (Pro) update their payment method, renew a failed subscription, and manage corporate team seats.

See [Portal: Setup](/guide/members/portal/setup).

### Membership

The individual record linking one WordPress user to one Membership Level, stored in the `fmem_membership_users` table. One user can have multiple membership records (one per level they hold). Each record tracks status, provider, start date, expiry date, and access cache.

### Membership Level

The plan a member buys or is assigned. Levels have a name, description, type (`individual` or `corporate`), one or more **Pricing Plans**, optional **Content Drip** rules, and links to one or more **Access Groups**. A level is the "key" that unlocks the "padlock" (Access Group).

See [Membership Levels](/guide/levels/).

### Membership Status

The current state of a single membership record. Possible values: `active`, `trial`, `pending`, `expired`, `suspended`, `cancelled`. Status determines whether the member can access protected content.

See [Membership Statuses](/reference/membership-statuses).

### MembershipUser

The internal model name (PHP class `MembershipUser`, table `fmem_membership_users`) for a membership record. When docs or error messages reference a "membership user", they mean this record — not the WordPress user themselves.

### Merge Tag

A `{{placeholder}}` used in email notification subjects and bodies. At send time, Fluent Members replaces each tag with the member's real data. Built-in tags: `{{user_name}}`, `{{user_email}}`, `{{membership_level}}`, `{{start_date}}`, `{{expires_at}}`, `{{site_name}}`, `{{site_url}}`.

See [Email Merge Tags](/reference/email-merge-tags).

### Migration

The process of importing member data, levels, and subscriptions from a competing membership plugin (Paid Memberships Pro, MemberPress, or Restrict Content Pro) into Fluent Members. The migration wizard handles this in phases (detect → analyze → import members → import subscriptions → cleanup) to avoid PHP timeouts.

See [Migration: Overview](/guide/settings/migration/).

## N

### Native Checkout (Pro)

The built-in Stripe checkout flow included with Fluent Members Pro. Uses the Stripe Payment Intents API with Stripe Elements on the front end. No third-party form plugin needed. Supports one-time payments and recurring subscriptions, and 3D Secure authentication.

See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

## O

### Order (Pro)

A record in `fmem_membership_orders` representing a purchase event — an initial payment, a renewal charge, or a refunded payment. Each order belongs to one member and may link to a subscription. Orders are the parent; **Transactions** are the individual charge records under an order.

See [Transactions](/guide/transactions/).

### Overlay

The semi-transparent layer placed over teaser content in **Partial Content Preview** mode. The overlay sits on top of the hidden portion of the post text, shows a customizable message and CTA button, and visually signals that there is more content behind a paywall.

## P

### Parent Member (Pro)

In a **Corporate Membership**, the user who purchased the seats. The parent member manages the team from the Member Portal — inviting, viewing, and removing sub-members. The parent's membership record has `parent_membership_id = NULL`; all sub-members point back to the parent's record ID.

### Partial Content Preview

A soft paywall that shows non-members a teaser (the first N words) of a protected post, followed by a gradient overlay and a Subscribe CTA button. The rest of the content is hidden in the rendered HTML. Word count, overlay color, button label, and CTA URL are all configurable globally and can be overridden per-post or per-block.

See [Partial Content Lock](/guide/settings/partial-content-lock).

### Paymattic

A WordPress payment forms plugin (also known as WP Payform) that can act as the payment provider for Fluent Members. Works the same way as Fluent Forms: a Paymattic form is linked to a Membership Level, and completing the form activates the membership.

See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

### Payment Intent (Pro)

A Stripe API object created when a member initiates checkout via the native Stripe integration. The Payment Intent tracks the full lifecycle of a charge — from creation through authentication (3D Secure) to confirmation. Fluent Members creates the intent server-side and passes the `client_secret` to the front end for Stripe Elements to complete.

### Payment Method (Pro)

The saved card or bank account on file for a subscription. Members can update their payment method from the Member Portal without re-entering all their details; the new card is attached to their Stripe customer and set as the default for future recurring charges.

See [Portal: Updating Payment Method](/guide/members/portal/updating-payment-method).

### Paywall

A connection between a third-party payment plugin product (a FluentCart variant, a Fluent Forms form, a WooCommerce product, etc.) and a Membership Level. When the payment is completed through that product, Fluent Members automatically activates the corresponding level for the buyer. Free plugin supports FluentCart, Fluent Forms, and Paymattic paywalls. Pro adds WooCommerce and native Stripe.

### Pending

A membership status meaning a payment has been initiated but not yet confirmed. The member has no access while `pending`. Once payment is confirmed by the payment provider, the status moves to `active` (or `trial`).

See [Membership Statuses](/reference/membership-statuses).

### Pricing Plan

One selling option for a Membership Level, stored in the `fmem_membership_level_pricing` table. A single level can have multiple pricing plans (e.g. monthly and annual). Each plan defines the provider (FluentCart, native Stripe, etc.), price type (`one_time`, `recurring`, `lifetime`, `free`, or `trial`), amount, currency, billing interval, and trial days.

### Provider

The system that created a given membership record. Stored in the `provider` column of `fmem_membership_users`. Common values: `fluent_cart`, `woocommerce`, `fluent_forms`, `paymattic`, `native` (Pro Stripe), `pmpro` (migrated from PMPro or RCP), `memberpress` (migrated from MemberPress), `manual` (admin-assigned).

### Public Contents

A whitelist of posts, pages, or taxonomy terms that are always publicly accessible, even if they fall within an Access Group's protection rules. Configured in **Settings → General**. This is useful for making a landing page or a free sample post visible to everyone while the rest of the site is restricted.

## R

### Recurring Billing

A subscription-based payment pattern where the member is charged automatically on a set interval (weekly, monthly, annually). Requires either WooCommerce Subscriptions, or Fluent Members Pro with Stripe. The `fmem_membership_subscriptions` table tracks the subscription state, and Stripe webhooks keep it in sync.

### Redirect

One of the **Unauthorized Access** behaviors available on an Access Group. Instead of showing a restriction message in place, the visitor is silently redirected to a URL of your choice (e.g. a pricing page or login page). The redirect URL is set per Access Group.

### REST API Protection

Automatic filtering of WordPress REST API responses for protected post types. When a post belongs to an Access Group, the `rest_prepare_{post_type}` filter intercepts the API response and replaces the content with a `fluent_members_rest_forbidden` error (HTTP 401/403) for unauthorized users. This prevents headless or API-consuming frontends from leaking member content.

### Restriction Type

The dimension of content that an Access Group protects. Available types: specific **posts/pages**, entire **post types**, **taxonomy terms** (categories, tags, custom taxonomies), selected **WooCommerce products**, **Fluent Forms** forms, **Paymattic** forms, **FluentCart** products, **Fluent Community** spaces, or the **entire website**.

## S

### Seat (Pro)

One slot in a **Corporate Membership**. The corporate level's `max_members` setting defines how many seats the parent can fill. Each sub-member occupies one seat. When all seats are filled, new invitations are rejected until a seat is freed.

### Setup Intent (Pro)

A Stripe API object used when a member updates their saved payment method without making a new charge. The Setup Intent authorizes the new card and attaches it to the Stripe customer. This is different from a **Payment Intent**, which also triggers a charge.

### Shortcode

A WordPress content tag that renders dynamic output. Fluent Members ships two shortcodes:
- `[fluent_membership_level id="X"]` renders a pricing card for a specific Membership Level.
- `[fluent_member_portal]` renders the full Member Portal dashboard for logged-in users.

See [Shortcode Reference](/reference/shortcode-reference).

### Start Date

The `start_date` column on a membership record, storing when the membership began. Used as the anchor point for **Content Dripping** timers. Drip rules calculate "available after N days" from this date.

### Stripe

The payment processor used by **Fluent Members Pro** for native checkout and subscription billing. Fluent Members Pro connects to Stripe via API keys stored in **Settings → Payment Settings → Stripe**. Stripe webhooks notify the plugin of payment success, failure, subscription renewal, and cancellation events.

See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

### Sub-member (Pro)

A team member in a **Corporate Membership** whose access is granted by a **Parent Member**. Sub-members have their own WordPress user accounts and can access protected content, but they cannot pay, upgrade, or cancel independently. Their membership record carries the parent's membership ID in `parent_membership_id`. If the parent cancels, all sub-members lose access.

### Subscription (Pro)

A recurring billing agreement stored in `fmem_membership_subscriptions`. A subscription links a member, a Membership Level, a Pricing Plan, and a Stripe subscription ID. The subscription table tracks billing cycle dates, payment status (`active`, `past_due`, `cancelled`), and whether cancellation is immediate or end-of-period.

See [Transactions](/guide/transactions/).

### Suspended

A membership status that revokes access without cancelling the underlying billing. Used when an admin needs to temporarily block a member (policy violation, payment dispute, manual hold). The subscription continues to run in the background. Restore access by changing status back to `active`.

See [Membership Statuses](/reference/membership-statuses).

## T

### Transaction (Pro)

A single billing event an initial charge, a subscription renewal charge, or a refund stored in `fmem_membership_transactions`. Each transaction belongs to an **Order**. The Transactions screen in the admin shows all transaction records with amounts, dates, and status.

See [Transactions](/guide/transactions/).

### Trial

A membership status for members in a free trial period. Trial members have the same content access as `active` members. When the trial period ends, the status moves to `active` (if payment is set up) or `expired` (if no payment method).

See [Membership Statuses](/reference/membership-statuses).

### Trial Period

A configurable number of free days at the start of a paid subscription. Set on a **Pricing Plan** via the `trial_days` field. During the trial, the member's status is `trial`. When the trial ends, Stripe charges the first billing amount and the status becomes `active`.

## U

### Unauthorized Access

The experience a non-member or logged-out visitor sees when they try to reach protected content. Configured per **Access Group** options include redirecting to another page, showing an inline restriction message, or showing a **Partial Content Preview** teaser.

See [Unauthorized Access](/guide/access-groups/unauthorized-access).

## W

### Webhook

An HTTP callback from a payment provider to your site, notifying Fluent Members of a real-time event payment success, subscription renewal, payment failure, or cancellation. For Stripe (Pro), the webhook endpoint is registered at `wp-json/fluent-members/v2/stripe-webhook`. Incoming requests are verified using a webhook signing secret before being processed.

See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

### WooCommerce (Pro)

A WordPress e-commerce plugin that can act as the payment provider for Fluent Members Pro. WooCommerce products and product variations are linked to Membership Levels; completing a WooCommerce order activates the membership. When WooCommerce Subscriptions is also installed, recurring billing is managed through WC Subscriptions and synced back to Fluent Members.

See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

### WPFluent

The shared micro-framework (a Laravel-inspired WordPress abstraction layer) that powers Fluent Members, FluentCart, FluentCRM, and other WPManageNinja plugins. You'll encounter it in `boot/app.php`, the `Hooks/` directory, and the REST routing layer. End users do not interact with WPFluent directly.


