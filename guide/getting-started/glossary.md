# Fluent Members Glossary

This glossary explains the core terms used across the Fluent Members documentation, from Membership Levels and Access Groups to Pro billing features. Use it as a quick reference whenever a term in a guide isn't clear.

## A

**Access Group:** A named collection of pages, posts, categories, or your entire site that you want to restrict to members. Attach one or more Membership Levels to an Access Group, and any member holding one of those levels unlocks everything inside it. Think of it as a padlocked folder, with the Membership Level as the key. See [Access Groups](/guide/access-groups/).

**Access Group Block:** A Gutenberg block-inspector option that restricts a single paragraph, image, or button instead of locking the whole post. Choose which Access Group must be held to see that block; non-members see a restriction message or partial preview in its place. See [Gutenberg Block: Inserting](/guide/access-groups/gutenberg-block/inserting).

**Active:** The normal membership status that gives a member full access to everything their Membership Level unlocks. A membership becomes active after a successful payment or a manual assignment by an admin. See [Membership Statuses](/reference/membership-statuses).

**Admin Bypass:** WordPress administrators are automatically exempt from content restriction rules so they can edit freely. Always test your protection settings in a private or incognito window as a logged-out visitor, since your admin account never sees restrictions. See [Protected Content](/guide/access-groups/protected-content).

## B

**Billing:** The financial activity tied to a membership: charges, renewals, refunds, and payment method updates. Pro users can review full billing history in the Transaction History panel on each Subscription's or One-Time Purchase's detail page. See [Orders](/guide/transactions/).

**Block Email Editor (Pro):** A visual, Gutenberg-based editor for designing email notification templates instead of using a plain text area. Build emails from blocks like paragraphs, images, and buttons, then preview them before saving. See [Email Notifications](/guide/settings/email-configuration/email-notifications).

**Block-Level Protection:** Content restriction that targets a single Gutenberg block inside a post rather than the entire post. Blocked blocks are removed from the page entirely, not just hidden, so non-members can't see them even in the page source. See [Gutenberg Block: Configuring](/guide/access-groups/gutenberg-block/configuring).

## C

**Cached Access:** A stored snapshot of which Access Groups a member currently unlocks, used to speed up page loads on a busy membership site. The cache refreshes automatically whenever a membership status or Access Group assignment changes. See [Members List](/guide/members/).

**Cancellation Mode (Pro):** A setting that controls when a cancelled native Stripe or PayPal subscription actually loses access. **Immediate** ends access right away; **End of Period** keeps access until the current billing period runs out. See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).

**Cancelled:** A membership status that permanently revokes access, set when a member cancels, an admin cancels, or a payment provider reports the subscription ended. The record is kept for history, but the member can no longer reach protected content. See [Membership Statuses](/reference/membership-statuses).

**Chain Map:** A reference diagram showing how Fluent Members' core objects connect: **Membership Level (the key) → Access Group (the lock) → Content (what's protected)**. It's the fastest way to trace why a member can, or can't, see something. See [Chain Map](/reference/chain-map).

**Checkout:** The page or flow where a visitor pays for a membership. Checkout is handled by whichever payment integration you've connected: FluentCart, Fluent Forms, Paymattic, WooCommerce, or native Stripe/PayPal checkout (Pro). See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Content Dripping:** A schedule that releases content gradually after a member joins, instead of unlocking everything at once. Specific posts or pages become available a set number of days after the member's start date. See [Content Drip](/guide/levels/content-drip).

**Content Protection:** The full set of ways Fluent Members restricts access to content: page redirects, inline restriction messages, partial previews, content dripping, block-level restrictions, and REST API filtering. Every Access Group picks its own combination of these. See [Protected Content](/guide/access-groups/protected-content).

**Corporate Membership (Pro):** A membership type where one purchaser buys a set number of seats and invites teammates to fill them. All team members share the same content access, and cancelling the parent membership cascades access removal to the whole team. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Currency:** The three-letter currency code (for example USD, EUR, GBP) used to display prices across your membership site. Set it once in Settings → General and it applies to every pricing card and checkout flow. See [General Settings](/guide/settings/general).

## D

**Dashboard:** The main overview screen in Fluent Members, showing headline stats like total members, membership levels, and recent activity. Pro users also see revenue and billing signals alongside the free-plan charts. See [Reading the Dashboard](/guide/dashboard/dashboard).

**Drip Rule:** A single time-gate entry in a content drip schedule. Each rule names a piece of content and how many days after a member's start date it should unlock. See [Content Drip](/guide/levels/content-drip).

## E

**Email Notification:** An automatic email Fluent Members sends when a membership event occurs. Three notifications ship out of the box: **Welcome** (on enrollment or re-activation), **Expiry** (status becomes expired), and **Suspension** (status becomes suspended), each editable with its own subject and body. See [Email Notifications](/guide/settings/email-configuration/email-notifications).

**Entire Website Restriction:** An Access Group setting that locks down every page on the site, homepage, archives, and all posts, rather than individually selected content. Any visitor without the required Membership Level is redirected or shown a restriction message everywhere. See [Protected Content](/guide/access-groups/protected-content).

**Expired:** A membership status set automatically when a membership's expiry date passes. The member loses access but their record is kept, and they can renew or repurchase to restore it. See [Membership Statuses](/reference/membership-statuses).

## F

**FluentCart:** A WPManageNinja e-commerce plugin that can process payment for Fluent Members. When a customer completes a FluentCart purchase linked to a Membership Level, Fluent Members activates the membership automatically. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**FluentCommunity:** A WPManageNinja community platform that integrates with Fluent Members. When active, specific community spaces can be restricted to Membership Level holders, with members added or removed from spaces as their status changes. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**FluentCRM:** A WPManageNinja CRM plugin. Fluent Members can apply or remove contact tags in FluentCRM automatically when a membership is enrolled, expires, or is cancelled, useful for triggering email automations. See [General Settings](/guide/settings/general).

**Fluent Forms:** A WordPress form builder that can process payment for Fluent Members. Link a Fluent Forms payment form to a Membership Level, and the membership activates as soon as the form is submitted and paid. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Fluent Members Pro:** The paid add-on that extends the free WordPress membership plugin with native Stripe and PayPal checkout, subscriptions, refunds, corporate memberships, WooCommerce integration, and a visual block email editor. It's built for sites that need recurring billing without a third-party payment form. See [Fluent Members](https://fluentmembers.com).

**Fluent Support:** A WPManageNinja helpdesk plugin. When active alongside Fluent Members, support agents can see a customer's active membership levels directly inside the ticket view. See [General Settings](/guide/settings/general).

## H

**Hook:** A WordPress extension point that lets developers run their own code when a Fluent Members event occurs. Actions fire on events like a membership assignment or cancellation; filters let you modify values such as redirect URLs or webhook data. See [Developer Hooks](/reference/developer-hooks).

## I

**Individual Level:** The standard membership type, where each member purchases their own access independently. Contrast with Corporate Membership, where one purchaser buys seats for an entire team. See [Creating a Level](/guide/levels/creating).

**Integration:** A connection between Fluent Members and another plugin that enables payments, CRM automation, or community access. Free integrations include FluentCart, Fluent Forms, Paymattic, FluentCRM, Fluent Support, and FluentCommunity; Pro adds WooCommerce, native Stripe, and native PayPal. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Invite Token (Pro):** A single-use link generated when a Corporate Membership parent invites a teammate by email. The invitee clicks the link, logs in to WordPress, and is added as a sub-member automatically. See [Portal: Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

## L

**Lifetime Membership:** A membership with no expiry date, so the member keeps access indefinitely. Access only ends if an admin manually cancels or suspends the membership. See [Creating a Level](/guide/levels/creating).

**Login Popup:** An optional modal that lets a non-logged-in visitor log in without leaving the page when they hit protected content. It can also be configured to appear automatically on any restricted page load. See [Login Popup](/guide/settings/login-popup).

## M

**Member:** A WordPress user who has been assigned at least one Membership Level. A single user can hold multiple memberships on the same site at once. See [Members List](/guide/members/).

**Member Portal:** A self-service page where logged-in members view their active memberships and cancel. Pro members can also update their payment method, renew a failed subscription, and manage corporate team seats. See [Portal: Setup](/guide/members/portal/setup).

**Membership:** The individual record linking a WordPress user to a Membership Level. It tracks status, start date, expiry date, and which provider created it. See [Member Detail](/guide/members/detail).

**Membership Level:** The plan a member buys or is assigned. It connects to one or more Access Groups (the content it unlocks) and one or more Pricing Plans (how payment is handled). See [Membership Levels](/guide/levels/).

**Membership Status:** The current state of a membership: active, trial, pending, expired, suspended, cancelled, or upgraded. Status controls whether the member can reach protected content at any given moment. See [Membership Statuses](/reference/membership-statuses).

**MembershipUser:** The internal record tying a WordPress user to a Membership Level. When docs or error messages mention a "membership user," they mean this record, not the WordPress user account itself. See [Member Detail](/guide/members/detail).

**Merge Tag:** A placeholder in email templates, for example <span v-pre>`{{user_name}}`</span> or <span v-pre>`{{membership_level}}`</span>, that Fluent Members replaces with real member data when the email sends. Merge tags work across every built-in notification. See [Email Merge Tags](/reference/email-merge-tags).

**Migration:** The process of importing members, levels, and subscriptions from another membership plugin, Paid Memberships Pro, MemberPress, or Kadence Memberships, into Fluent Members using the built-in migration wizard. Each source plugin has its own step-by-step wizard. See [Migration: Overview](/guide/settings/migration/).

## N

**Native Checkout (Pro):** Fluent Members Pro's built-in Stripe or PayPal checkout, requiring no third-party form plugin. It supports one-time payments and recurring subscriptions directly on your site, including Stripe's 3D Secure card authentication. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

## O

**One-Time Purchase (Pro):** A membership with no recurring subscription behind it: a single native or paywall payment, a manual grant, or a non-recurring migrated order. It's listed in its own view, separate from Subscriptions. See [One-Time Purchases](/guide/transactions/one-time).

**Order (Pro):** A record of a purchase event, an initial payment, a renewal, or a refund. Each order belongs to one member and backs either a Subscription or a One-Time Purchase. See [Orders](/guide/transactions/).

**Overlay:** The visual layer placed over the teaser portion of a post in Partial Content Preview mode. It shows a customizable message and call-to-action button, signalling that more content is available after purchasing a membership. See [Partial Content Lock](/guide/settings/partial-content-lock).

## P

**Parent Member (Pro):** In a Corporate Membership, the user who purchased the seats and manages the team. The parent can invite, view, and remove sub-members directly from the Member Portal. See [Portal: Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

**Partial Content Preview:** A soft-paywall feature that shows non-members the opening portion of a protected post, followed by a gradient overlay and a Subscribe button. The full content stays hidden until the visitor purchases a membership. See [Partial Content Lock](/guide/settings/partial-content-lock).

**Paymattic:** A WordPress payment form plugin, also sold as WP Payform, that can process payment for Fluent Members. Link a Paymattic form to a Membership Level, and completing the form activates the membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Payment Intent (Pro):** The Stripe object that tracks a single payment from creation through completion. Fluent Members creates a Payment Intent on the server and sends it to the browser for the customer to finish checkout. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**Payment Method (Pro):** The saved card attached to a member's Stripe-billed subscription. Members can update it from the Member Portal without cancelling and restarting the subscription; this action is only available for Stripe, not PayPal. See [Portal: Updating Payment Method](/guide/members/portal/updating-payment-method).

**Paywall:** A link between a payment product in an external plugin and a Membership Level. When the customer completes the purchase through that product, Fluent Members grants the corresponding membership automatically. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Pending:** A membership status meaning a payment has started but isn't confirmed yet. The member has no access while pending; access is granted once the payment provider confirms the payment. See [Membership Statuses](/reference/membership-statuses).

**Pricing Plan:** One purchasing option attached to a Membership Level, for example a monthly or annual plan. Each plan specifies the payment provider, price, billing interval, and whether a free trial is offered. See [Pricing: Native Payment](/guide/levels/pricing-native).

**Provider:** The system that created a membership record, for example FluentCart, WooCommerce, Fluent Forms, Paymattic, native Stripe or PayPal, a migration source (Paid Memberships Pro, MemberPress, Kadence Memberships), or a manual admin assignment. Every membership row stores its provider for auditing and reporting. See [Adding a Membership Manually](/guide/members/adding-manually).

**Public Contents:** A whitelist of specific pages, posts, or terms that stay publicly visible even when they fall inside a protected Access Group. Use it to keep landing pages or free sample posts accessible to everyone. See [General Settings](/guide/settings/general).

## R

**Recurring Billing:** A payment pattern where a member is charged automatically on a set schedule, monthly, annually, or otherwise, for as long as their subscription stays active. It requires WooCommerce Subscriptions or Fluent Members Pro with native Stripe or PayPal. See [Subscriptions](/guide/transactions/subscriptions).

**Redirect:** An Unauthorized Access action that silently sends non-members to a different page, such as a pricing or login page, instead of showing a restriction message on the current page. It's the least disruptive way to route visitors toward becoming members. See [Unauthorized Access](/guide/access-groups/unauthorized-access).

**REST API Protection:** Automatic blocking of member-only content in WordPress REST API responses. Non-members who request a protected post through the API get an error response instead of the content, preventing headless or app-based content leaks. See [Protected Content](/guide/access-groups/protected-content).

**Restriction Type:** The kind of content an Access Group protects: individual posts or pages, entire post types, taxonomy terms, WooCommerce products, form access, community spaces, or the entire website. Pick one or combine several per Access Group. See [Protected Content](/guide/access-groups/protected-content).

## S

**Seat (Pro):** One slot in a Corporate Membership team. The parent purchases a set number of seats, and each invited sub-member fills one; no new sub-members can join once every seat is taken. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Setup Intent (Pro):** The Stripe object used when a member updates their payment method without making a new charge. It authorizes and saves the new card on file without processing a payment. See [Portal: Updating Payment Method](/guide/members/portal/updating-payment-method).

**Shortcode:** A WordPress tag that outputs dynamic content. Fluent Members provides `[fluent_membership_level id="X"]` to display a pricing card and `[fluent_member_portal]` to display the member self-service dashboard. See [Shortcode Reference](/reference/shortcode-reference).

**Start Date:** The date a membership record became active. Content drip timers count forward from this date to decide when each piece of content unlocks for that member. See [Content Drip](/guide/levels/content-drip).

**Stripe:** The payment processor Fluent Members Pro uses for native checkout and subscription billing. Connect it with API keys in Settings → Payment Settings → Stripe, then Stripe sends webhooks to keep subscription records in sync. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**Sub-member (Pro):** A team member in a Corporate Membership whose access comes from a Parent Member. Sub-members can view protected content but can't manage payments, and lose access if the parent's membership ends. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Subscription (Pro):** A recurring billing agreement that renews a membership automatically on a set schedule. Native subscriptions run through Stripe or PayPal and stay synced with the membership record in real time; subscriptions migrated from PMPro, MemberPress, or Kadence Memberships are shown for record-keeping only. See [Subscriptions](/guide/transactions/subscriptions).

**Suspended:** A membership status that revokes content access temporarily without cancelling the underlying billing. An admin can suspend a member for a policy reason and restore access by switching the status back to active. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).

## T

**Transaction (Pro):** A single billing event: a charge, a renewal, or a refund. Transactions are listed in the Transaction History panel of the Subscription or One-Time Purchase they belong to. See [Orders](/guide/transactions/).

**Trial:** A membership status for members inside a free trial window. Trial members have full content access; when the trial ends, the membership becomes active (with a payment method on file) or expired (without one). See [Membership Statuses](/reference/membership-statuses).

**Trial Period:** A set number of free days offered at the start of a paid subscription. The member's status is trial for that window; once it ends, the first charge runs and the status becomes active. See [Pricing: Native Payment](/guide/levels/pricing-native).

## U

**Unauthorized Access:** What a non-member or logged-out visitor sees when they try to reach protected content. Each Access Group is configured individually to redirect, show a restriction message, or display a partial content preview. See [Unauthorized Access](/guide/access-groups/unauthorized-access).

## W

**Webhook:** An automatic notification from Stripe or PayPal to your site reporting a payment event, a successful charge, a failed renewal, a cancellation, or a refund. Fluent Members uses webhooks to keep membership statuses in sync with the payment provider in real time. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup](/guide/settings/payment-settings/paypal-setup).

**WooCommerce (Pro):** A WordPress e-commerce plugin that can process payment for Fluent Members Pro. Link WooCommerce products or variations to Membership Levels, and completing the purchase activates the corresponding membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**WPFluent:** The shared framework that powers Fluent Members and other WPManageNinja plugins. It handles routing, database access, and hooks behind the scenes, and most users never interact with it directly. See [Fluent Members](https://fluentmembers.com).
