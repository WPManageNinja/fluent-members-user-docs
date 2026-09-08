# Fluent Members Glossary

This glossary explains the core terms used across the Fluent Members documentation, from Membership Levels and Access Groups to Pro billing features. Use it as a quick reference whenever a term in a guide isn't clear.

## A

**Access Group:** A named collection of pages, posts, or your whole site that's restricted to members. Attach one or more Membership Levels to an [Access Group](/guide/access-groups/), the key that unlocks it.

**Access Group Block:** A Gutenberg option that restricts a single block instead of the whole post. Choose the required Access Group when [inserting the block](/guide/access-groups/gutenberg-block/inserting).

**Active:** The status that gives a member full access to their level's content. Set automatically after payment or a manual admin assignment, one of [seven statuses](/reference/membership-statuses).

**Admin Bypass:** Admins are automatically exempt from content restrictions so they can edit freely. Always test [protection rules](/guide/access-groups/protected-content) in an incognito window as a logged-out visitor.

## B

**Billing:** The charges, renewals, and refunds tied to a membership. Pro users review full history in the [Transaction History](/guide/transactions/) panel.

**Block Email Editor (Pro):** A visual, Gutenberg-based editor for building [email notification](/guide/settings/email-configuration/email-notifications) templates from blocks instead of plain text.

**Block-Level Protection:** Restriction scoped to one Gutenberg block rather than the whole post. Blocked blocks are removed entirely, not just hidden, set from the block's [restriction settings](/guide/access-groups/gutenberg-block/configuring).

## C

**Cached Access:** A stored snapshot of which Access Groups a member currently unlocks, speeding up page loads. Refreshes automatically whenever [status or access changes](/guide/members/).

**Cancellation Mode (Pro):** Controls when a cancelled subscription loses access: **Immediate** or **End of Period**. Choose per level in [cancellation modes](/guide/transactions/cancellation-modes).

**Cancelled:** A status that permanently revokes access after a member, admin, or provider ends the subscription. The record stays for history, see all [statuses](/reference/membership-statuses).

**Chain Map:** A diagram of how Level → Access Group → Content connect. The [Chain Map](/reference/chain-map) is the fastest way to trace why a member can, or can't, see something.

**Checkout:** The flow where a visitor pays for a membership, via FluentCart, Fluent Forms, Paymattic, WooCommerce, or native [Stripe/PayPal](/guide/levels/pricing-paywalls) (Pro).

**Content Dripping:** Releases content gradually after a member joins, instead of all at once. Configured on an Access Group's drip rules, each with its own unlock delay, see [Content Drip](/guide/levels/content-drip).

**Content Protection:** Every way Fluent Members restricts content: redirects, messages, partial previews, dripping, and block-level rules. Each [Access Group](/guide/access-groups/protected-content) picks its own combination.

**Corporate Membership (Pro):** One purchaser buys seats and invites teammates; cancelling the parent cascades access removal to the whole team. See [Corporate Memberships](/guide/levels/corporate-memberships) for setup.

**Currency:** The three-letter code (USD, EUR, GBP) used for prices sitewide. Set once in [General Settings](/guide/settings/general).

## D

**Dashboard:** The overview screen showing members, levels, and recent activity. Pro adds revenue signals, see [Reading the Dashboard](/guide/dashboard/dashboard).

**Drip Rule:** One time-gate entry in a [content drip](/guide/levels/content-drip) schedule, naming a piece of content and its unlock delay.

## E

**Email Notification:** An automatic email sent on a membership event. Three ship by default: **Welcome**, **Expiry**, and **Suspension**, each editable in [Email Notifications](/guide/settings/email-configuration/email-notifications).

**Entire Website Restriction:** An [Access Group](/guide/access-groups/protected-content) setting that locks the whole site, not just selected content. Visitors without the required level see the restriction everywhere.

**Expired:** A status set automatically once a membership's expiry date passes. Access is lost but the record stays, renewal restores it, see [statuses](/reference/membership-statuses).

## F

**FluentCart:** A WPManageNinja e-commerce plugin that can bill for memberships. A linked purchase [activates the level](/guide/levels/pricing-paywalls) automatically.

**FluentCommunity:** A WPManageNinja community platform. A Membership Level can be configured to automatically grant or remove a member's access to specific community spaces and courses as their membership status changes.

**FluentCRM:** A WPManageNinja CRM plugin. Fluent Members adds four automation triggers, Level Assigned, Removed, Expired, and Suspended, inside FluentCRM's own funnel builder; it doesn't tag or untag contacts on its own.

**Fluent Forms:** A form builder that can bill for memberships. Submitting a linked, paid form [activates the level](/guide/levels/pricing-paywalls) instantly.

**Fluent Members Pro:** The paid add-on adding native Stripe/PayPal checkout, subscriptions, refunds, and corporate memberships. See [fluentmembers.com](https://fluentmembers.com) for plans.

**Fluent Support:** A WPManageNinja helpdesk plugin. When active, agents automatically see a widget with the customer's membership levels and status badges right in the ticket view.

## H

**Hook:** A WordPress extension point for custom code on Fluent Members events. Actions and filters are catalogued in [Developer Hooks](/reference/developer-hooks).

## I

**Individual Level:** The standard type where each member buys their own access. Locked in when [creating a level](/guide/levels/creating), unlike Corporate Membership.

**Integration:** A connection enabling payments, CRM, or community access. Free options include FluentCart, Fluent Forms, and Paymattic; Pro adds WooCommerce and native Stripe/PayPal, see the full [list](/guide/levels/pricing-paywalls).

**Invite Token (Pro):** A single-use link a Corporate parent sends a teammate via [Seat Invites](/guide/members/portal/corporate-seat-invites), adding them as a sub-member on click.

## L

**Lifetime Membership:** A membership with no expiry date; access continues until an admin cancels or suspends it. Set when [creating a level](/guide/levels/creating).

**Login Popup:** A modal letting a non-logged-in visitor log in without leaving the page. Configure it to appear automatically from [Login Popup](/guide/settings/login-popup) settings.

## M

**Member:** A WordPress user assigned at least one Membership Level, viewable from the [Members List](/guide/members/). One user can hold several memberships at once.

**Member Portal:** A self-service page for viewing and cancelling memberships. Pro adds payment updates and renewals, once you [set up the portal](/guide/members/portal/setup).

**Membership:** The record linking a user to a level, tracking status, dates, and provider. See the [member's detail screen](/guide/members/detail).

**Membership Level:** The plan a member buys, connecting Access Groups (what's unlocked) to Pricing Plans (how it's paid). Managed from [Membership Levels](/guide/levels/).

**Membership Status:** The current state: active, trial, pending, expired, suspended, cancelled, or upgraded. See the [status reference](/reference/membership-statuses) for what triggers each.

**MembershipUser:** The internal record tying a WordPress user to a level, distinct from the user account itself. Backs the [member detail screen](/guide/members/detail).

**Merge Tag:** A placeholder like <span v-pre>`{{user_name}}`</span>, replaced with real data when an email sends. Works across every notification, see [Email Merge Tags](/reference/email-merge-tags).

**Migration:** Importing members and levels from Paid Memberships Pro, MemberPress, or Kadence Memberships via a step-by-step wizard. Start from [Migration Overview](/guide/settings/migration/).

## N

**Native Checkout (Pro):** Pro's built-in Stripe or PayPal checkout, no third-party form needed. Supports one-time and recurring payments once [Stripe is set up](/guide/settings/payment-settings/stripe-setup).

## O

**One-Time Purchase (Pro):** A membership from a single payment or manual grant, with no recurring subscription. Listed separately under [One-Time Purchases](/guide/transactions/one-time).

**Order (Pro):** A purchase event, an initial payment, renewal, or refund, tied to one member. Tracked under [Orders](/guide/transactions/).

**Overlay:** The visual layer over a teaser in Partial Content Preview mode, showing a message and CTA button. Configured from [Partial Content Lock](/guide/settings/partial-content-lock).

## P

**Parent Member (Pro):** The Corporate Membership purchaser who manages the team, inviting or removing sub-members from the [seat invites](/guide/members/portal/corporate-seat-invites) panel.

**Partial Content Preview:** A soft-paywall that shows non-members a post's opening, then a gradient overlay and Subscribe button. Set up from [Partial Content Lock](/guide/settings/partial-content-lock).

**Paymattic:** A payment form plugin, also sold as WP Payform, that can bill for memberships as a [paywall integration](/guide/levels/pricing-paywalls).

**Payment Intent (Pro):** The Stripe object tracking one payment from creation to completion, created server-side once [Stripe is connected](/guide/settings/payment-settings/stripe-setup).

**Payment Method (Pro):** The saved card on a Stripe-billed subscription. Members can [update it in the Portal](/guide/members/portal/updating-payment-method); Stripe only, not PayPal.

**Paywall:** A link between an external plugin's product and a Membership Level; a completed purchase grants the level. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Pending:** A status meaning payment has started but isn't confirmed. No access until the provider confirms it, per the [status reference](/reference/membership-statuses).

**Pricing Plan:** One purchasing option on a level, for example monthly or annual. Set the provider, price, and trial from [Pricing: Native Payment](/guide/levels/pricing-native).

**Provider:** The system that created a membership row, FluentCart, Stripe, a migration source, or [a manual assignment](/guide/members/adding-manually). Stored for auditing.

**Public Contents:** A whitelist of pages that stay visible even inside a protected Access Group. Set from [General Settings](/guide/settings/general).

## R

**Recurring Billing:** Automatic charges on a set schedule for as long as a [subscription](/guide/transactions/subscriptions) stays active. Requires WooCommerce Subscriptions or Pro's native billing.

**Redirect:** An [Unauthorized Access](/guide/access-groups/unauthorized-access) action sending non-members to another page instead of showing a restriction message.

**REST API Protection:** Blocks member-only content from WordPress REST responses, part of every Access Group's [content protection](/guide/access-groups/protected-content), preventing headless content leaks.

**Restriction Type:** What an [Access Group](/guide/access-groups/protected-content) protects: posts, post types, taxonomy terms, products, forms, spaces, or the whole site.

## S

**Seat (Pro):** One slot in a [Corporate Membership](/guide/levels/corporate-memberships) team; each invited sub-member fills one until the seat count is full.

**Setup Intent (Pro):** The Stripe object used when a member [updates their payment method](/guide/members/portal/updating-payment-method) without a new charge, just saving the card.

**Shortcode:** A WordPress tag for dynamic output: `[fluent_membership_level id="X"]` for a single pricing card, `[fluent_membership_levels]` for a multi-level pricing grid, `[fluent_members]` to gate inline content by level, and `[fluent_member_portal]` for the portal. Full list in the [Shortcode Reference](/reference/shortcode-reference).

**Start Date:** The date a membership became active. [Content drip](/guide/levels/content-drip) timers count forward from this date.

**Stripe:** The processor Pro uses for native checkout and subscriptions. Connect it via API keys in [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**Sub-member (Pro):** A [Corporate Membership](/guide/levels/corporate-memberships) team member whose access depends on the Parent Member; can't manage payments.

**Subscription (Pro):** A recurring agreement synced with Stripe or PayPal in real time. Migrated subscriptions appear in [Subscriptions](/guide/transactions/subscriptions) for record-keeping only.

**Suspended:** A status that temporarily revokes access without cancelling billing. An admin can [suspend a member](/guide/members/suspending-and-cancelling) and restore access later.

## T

**Transaction (Pro):** A single billing event, a charge, renewal, or refund, listed under the record's [Orders](/guide/transactions/) history.

**Trial:** A status for members in a free trial window with full access. Ends as active (card on file) or expired, see the [status reference](/reference/membership-statuses).

**Trial Period:** Free days at the start of a paid plan, set on the [Pricing Plan](/guide/levels/pricing-native). Status becomes active once the first charge runs.

## U

**Unauthorized Access:** What a non-member sees on protected content, [configured per Access Group](/guide/access-groups/unauthorized-access) as a redirect, message, or partial preview.

**Upgraded:** A status set on an old membership row when the same user is given a new membership on the same level while the old one was still active or trial. The record stays for history, see [statuses](/reference/membership-statuses).

## W

**Webhook:** A payment-event notification from Stripe or PayPal that keeps statuses in sync, set up during [Stripe](/guide/settings/payment-settings/stripe-setup) or [PayPal](/guide/settings/payment-settings/paypal-setup) setup.

**WooCommerce (Pro):** An e-commerce plugin that can bill for memberships as a [paywall integration](/guide/levels/pricing-paywalls); a completed purchase activates the level.

**WPFluent:** The shared framework powering [Fluent Members](https://fluentmembers.com) and other WPManageNinja plugins behind the scenes.
