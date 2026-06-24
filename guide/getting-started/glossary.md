# Fluent Members Glossary

This glossary defines common terms used throughout the Fluent Members documentation to help you understand key features and concepts effectively.

## A

**Access Group:** A named collection of content pages, posts, categories, or your entire site that you want to restrict to members. You attach one or more Membership Levels to an Access Group; any member holding one of those levels gains access to everything inside. Think of it as a padlocked folder and the Membership Level as the key. See [Access Groups](/guide/access-groups/).

**Access Group Block:** A Gutenberg block inspector feature that lets you restrict a single block a paragraph, image, or button without locking the whole post. You choose which Access Group must be held to see that block; non-members see a restriction message or partial preview in its place. See [Gutenberg Block: Inserting](/guide/access-groups/gutenberg-block/inserting).

**Active:** The normal membership status that gives a member full access to all the content their level unlocks. A membership becomes active after a successful payment or a manual assignment by an admin. See [Membership Statuses](/reference/membership-statuses).

**Admin Bypass:** WordPress administrators are automatically exempt from all content protection rules. Always test your protection settings in an incognito window as a logged-out visitor, since your admin account will never see restrictions. See [Protected Content](/guide/access-groups/protected-content).

## B

**Billing:** The collective term for all financial activity on a membership, charges, renewals, refunds, and payment method updates. Billing history is visible in the Transactions screen for Pro users. See [Transactions](/guide/transactions/).

**Block Email Editor (Pro):** A visual editor that lets you design email notification templates using Gutenberg blocks instead of a plain text area. Build emails from paragraphs, images, and buttons, then preview them before saving. See [Email Notifications](/guide/settings/email-configuration/email-notifications).

**Block-Level Protection:** Content restriction that targets a single Gutenberg block inside a post rather than the entire post. Blocked blocks are completely removed from the page, not just hidden, so non-members cannot see the content even in the page source. See [Gutenberg Block: Configuring](/guide/access-groups/gutenberg-block/configuring).

## C

**Cached Access:** A stored snapshot of which Access Groups a member is currently allowed to see, used to speed up page loads. The cache refreshes automatically whenever a membership status or Access Group assignment changes. See [Members List](/guide/members/).

**Cancellation Mode (Pro):** A setting that controls when a cancelled subscription takes effect either immediately (access ends right away) or at the end of the current billing period (access continues until the next renewal date). See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).

**Cancelled:** A membership status that permanently revokes access, set when a member cancels, an admin cancels, or a payment provider triggers a cancellation. The member's record is kept for history, but they can no longer access protected content. See [Membership Statuses](/reference/membership-statuses).

**Chain Map:** A reference diagram showing how Fluent Members' three core objects connect: **Membership Level (the key) → Access Group (the lock) → Content (what is protected)**. Understanding this chain is the fastest way to troubleshoot why a member can or cannot see something. See [Chain Map](/reference/chain-map).

**Checkout:** The page or flow where a visitor pays for a membership. Checkout is handled by whichever payment plugin you have connected FluentCart, Fluent Forms, Paymattic, WooCommerce, or native Stripe (Pro). See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Content Dripping:** A schedule that releases content gradually over time after a member joins. Instead of unlocking everything at once, specific posts or pages become available a set number of days after the member's start date. See [Content Drip](/guide/levels/content-drip).

**Content Protection:** The full set of ways Fluent Members restricts access to content page redirects, inline restriction messages, partial previews, content dripping, block-level restrictions, and REST API filtering. See [Protected Content](/guide/access-groups/protected-content).

**Corporate Membership (Pro):** A membership type where one purchaser buys a set number of seats and invites team members to fill them. All team members share the same content access, and revoking the parent membership removes access for the entire team. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Currency:** The three-letter currency code (e.g. USD, EUR, GBP) used to display prices across your site. Set once in Settings → General and applied to all pricing cards and checkout flows. See [General Settings](/guide/settings/general).

## D

**Dashboard:** The main overview screen in Fluent Members showing headline stats such as total members, active memberships, and recent sign-ups. Pro users also see a revenue summary and billing activity. See [Reading the Dashboard](/guide/dashboard/dashboard).

**Drip Rule:** A single time-gate entry in a content drip schedule. Each rule specifies a piece of content and how many days after a member's start date that content should become available. See [Content Drip](/guide/levels/content-drip).

## E

**Email Notification:** An automatic email sent to a member when a membership event occurs. Fluent Members includes three built-in notifications: Welcome (on enrollment), Expiry (when a membership expires), and Suspension (when a membership is suspended). See [Email Notifications](/guide/settings/email-configuration/email-notifications).

**Entire Website Restriction:** An Access Group setting that locks down every page on the site homepage, archives, and all posts rather than individually selected content. Any visitor without the required membership level is redirected or shown a restriction message everywhere. See [Protected Content](/guide/access-groups/protected-content).

**Expired:** A membership status that is set automatically when a membership's end date passes. An expired member loses access but their record is kept; they can renew to restore access. See [Membership Statuses](/reference/membership-statuses).

## F

**FluentCart:** A WPManageNinja e-commerce plugin that can handle payment for Fluent Members. When a customer completes a FluentCart purchase linked to a Membership Level, Fluent Members automatically activates the membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**FluentCommunity:** A WPManageNinja community platform. When active, specific community spaces can be restricted to Membership Level holders, and members are added or removed from spaces automatically as their status changes. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**FluentCRM:** A WPManageNinja CRM plugin. Fluent Members can automatically apply or remove contact tags in FluentCRM when a membership is enrolled, expires, or is cancelled useful for triggering email automations. See [General Settings](/guide/settings/general).

**Fluent Forms:** A WordPress form builder that can handle payment for Fluent Members. Link a Fluent Forms payment form to a Membership Level; when the form is submitted and paid, the membership activates. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Fluent Members Pro:** The paid add-on that extends the free plugin with native Stripe checkout, subscriptions, billing history, refunds, corporate memberships, WooCommerce integration, and a visual block email editor. See [Fluent Members](https://fluentmembers.com).

**Fluent Support:** A WPManageNinja helpdesk plugin. When active alongside Fluent Members, support agents can see a customer's active membership levels directly inside the ticket view. See [General Settings](/guide/settings/general).

## H

**Hook:** A WordPress extension point that lets developers run their own code when specific Fluent Members events occur. Actions fire at events like enrollment or cancellation; filters let you modify values like error messages or redirect URLs. See [Developer Hooks](/reference/developer-hooks).

## I

**Individual Level:** The standard membership type where each member purchases their own access independently. Contrast with Corporate Membership, where one purchaser buys seats for a team. See [Creating a Level](/guide/levels/creating).

**Integration:** A connection between Fluent Members and another plugin to enable payments, CRM automation, or community access. Free integrations include FluentCart, Fluent Forms, Paymattic, FluentCRM, Fluent Support, and FluentCommunity; Pro adds WooCommerce and Stripe. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Invite Token (Pro):** A single-use link generated when a Corporate Membership parent invites a team member by email. The invited person clicks the link, logs in to WordPress, and is automatically added as a sub-member. See [Portal: Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

## L

**Lifetime Membership:** A membership with no expiry date. The member keeps access indefinitely unless an admin manually cancels or suspends the membership. See [Creating a Level](/guide/levels/creating).

**Login Popup:** An optional modal dialog that appears when a non-logged-in visitor encounters protected content, letting them log in without leaving the page. It can also be set to appear automatically on any restricted page load. See [Login Popup](/guide/settings/login-popup).

## M

**Member:** A WordPress user who has been assigned at least one Membership Level. A single user can hold multiple memberships at the same time. See [Members List](/guide/members/).

**Member Portal:** A self-service page for logged-in members where they can view their active memberships and cancel. Pro members can also update their payment method, renew a failed subscription, and manage corporate team seats. See [Portal: Setup](/guide/members/portal/setup).

**Membership:** The individual record that links a WordPress user to a Membership Level. It tracks the member's status, start date, expiry date, and which payment provider created it. See [Member Detail](/guide/members/detail).

**Membership Level:** The plan a member buys or is assigned. It connects to one or more Access Groups (the content the member can see) and contains one or more Pricing Plans (how payment is handled). See [Membership Levels](/guide/levels/).

**Membership Status:** The current state of a membership active, trial, pending, expired, suspended, or cancelled. Status controls whether the member can access protected content at any given moment. See [Membership Statuses](/reference/membership-statuses).

**MembershipUser:** The internal record that ties a WordPress user to a Membership Level. When documentation or error messages refer to a "membership user," they mean this record, not the WordPress user account itself. See [Member Detail](/guide/members/detail).

**Merge Tag:** A placeholder in email templates, for example `{{user_name}}` or `{{membership_level}}`, that Fluent Members replaces with real member data at the time of sending. See [Email Merge Tags](/reference/email-merge-tags).

**Migration:** The process of importing members, levels, and subscriptions from another membership plugin (Paid Memberships Pro, MemberPress, or Restrict Content Pro) into Fluent Members using the built-in migration wizard. See [Migration: Overview](/guide/settings/migration/).

## N

**Native Checkout (Pro):** Fluent Members Pro's built-in Stripe checkout, requiring no third-party form plugin. It supports both one-time payments and recurring subscriptions, including 3D Secure card authentication. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

## O

**Order (Pro):** A record of a purchase event an initial payment, a renewal, or a refund. Each order belongs to one member and may contain one or more Transactions. See [Transactions](/guide/transactions/).

**Overlay:** The visual layer placed over the teaser portion of a post in Partial Content Preview mode. It shows a customizable message and a call-to-action button, signalling that more content is available after purchasing a membership. See [Partial Content Lock](/guide/settings/partial-content-lock).

## P

**Parent Member (Pro):** In a Corporate Membership, the user who purchased the seats and manages the team. The parent can invite, view, and remove sub-members directly from the Member Portal. See [Portal: Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

**Partial Content Preview:** A soft-paywall feature that shows non-members the first portion of a protected post followed by a gradient overlay and a Subscribe button. The full content remains hidden until the visitor purchases a membership. See [Partial Content Lock](/guide/settings/partial-content-lock).

**Paymattic:** A WordPress payment form plugin (also sold as WP Payform) that can handle payment for Fluent Members. Link a Paymattic form to a Membership Level; completing the form activates the membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Payment Intent (Pro):** The Stripe object that tracks a single payment from creation through to completion. Fluent Members creates a Payment Intent on the server and sends it to the browser for the customer to finish checkout. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**Payment Method (Pro):** The saved card or bank account attached to a member's subscription. Members can update their payment method from the Member Portal without cancelling and restarting the subscription. See [Portal: Updating Payment Method](/guide/members/portal/updating-payment-method).

**Paywall:** A link between a payment product in an external plugin and a Membership Level. When the customer completes the purchase through that product, Fluent Members automatically grants them the corresponding membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**Pending:** A membership status that means a payment has been started but not yet confirmed. The member has no access while pending; access is granted once the payment provider confirms payment. See [Membership Statuses](/reference/membership-statuses).

**Pricing Plan:** One purchasing option attached to a Membership Level, for example a monthly plan or an annual plan. Each plan specifies the payment provider, price, billing interval, and whether a free trial is offered. See [Pricing: Native Payment](/guide/levels/pricing-native).

**Provider:** The system that created a membership record for example FluentCart, WooCommerce, Fluent Forms, Paymattic, native Stripe, or a manual admin assignment. See [Adding a Membership Manually](/guide/members/adding-manually).

**Public Contents:** A whitelist of specific pages, posts, or terms that stay publicly visible even when they fall inside a protected Access Group. Use it to keep landing pages or free sample posts accessible to everyone. See [General Settings](/guide/settings/general).

## R

**Recurring Billing:** A payment pattern where a member is automatically charged on a set schedule, monthly, annually, or otherwise for as long as their subscription is active. Requires WooCommerce Subscriptions or Fluent Members Pro with Stripe. See [Transactions](/guide/transactions/).

**Redirect:** An Unauthorized Access action that silently sends non-members to a different page, such as a pricing page or login page instead of showing a restriction message on the current page. See [Unauthorized Access](/guide/access-groups/unauthorized-access).

**REST API Protection:** Automatic blocking of member-only content in WordPress REST API responses. Non-members who request a protected post through the API receive an error response instead of the content, preventing API-based content leaks. See [Protected Content](/guide/access-groups/protected-content).

**Restriction Type:** The kind of content an Access Group protects individual posts or pages, entire post types, taxonomy terms, WooCommerce products, form access, community spaces, or the entire website. See [Protected Content](/guide/access-groups/protected-content).

## S

**Seat (Pro):** One slot in a Corporate Membership team. The parent purchases a set number of seats; each invited sub-member fills one. No new sub-members can be added once all seats are taken. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Setup Intent (Pro):** The Stripe object used when a member updates their payment method without making a new charge. It authorizes and saves the new card without processing a payment. See [Portal: Updating Payment Method](/guide/members/portal/updating-payment-method).

**Shortcode:** A WordPress tag that outputs dynamic content. Fluent Members provides `[fluent_membership_level id="X"]` to display a pricing card and `[fluent_member_portal]` to display the member self-service dashboard. See [Shortcode Reference](/reference/shortcode-reference).

**Start Date:** The date a membership record became active. Content drip timers count forward from this date to determine when individual pieces of content should unlock for that member. See [Content Drip](/guide/levels/content-drip).

**Stripe:** The payment processor used by Fluent Members Pro for its built-in checkout and subscription billing. Connect Stripe with API keys in Settings → Payment Settings → Stripe; Stripe then sends webhooks to keep subscription records in sync. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**Sub-member (Pro):** A team member in a Corporate Membership whose access is provided by a Parent Member. Sub-members can view protected content but cannot manage payments; if the parent's membership ends, all sub-members lose access. See [Corporate Memberships](/guide/levels/corporate-memberships).

**Subscription (Pro):** A recurring billing agreement that automatically renews a membership on a set schedule. Subscriptions are managed through Stripe and kept in sync with the membership record in real time. See [Transactions](/guide/transactions/).

**Suspended:** A membership status that revokes content access temporarily without cancelling the underlying billing. An admin can suspend a member for a policy reason and restore access by changing the status back to active. See [Suspending & Cancelling](/guide/members/suspending-and-cancelling).

## T

**Transaction (Pro):** A single billing event a charge, a renewal, or a refund. Transactions are listed in the Transactions screen and belong to a parent Order record. See [Transactions](/guide/transactions/).

**Trial:** A membership status for members in a free trial period. Trial members have full content access; when the trial ends the membership transitions to active (if a payment method is on file) or expired (if not). See [Membership Statuses](/reference/membership-statuses).

**Trial Period:** A set number of free days offered at the start of a paid subscription. During the trial the member's status is trial; after it ends the first charge is processed and the status becomes active. See [Pricing: Native Payment](/guide/levels/pricing-native).

## U

**Unauthorized Access:** What a non-member or logged-out visitor sees when they try to reach protected content. Each Access Group can be individually configured to redirect, show a restriction message, or display a partial content preview. See [Unauthorized Access](/guide/access-groups/unauthorized-access).

## W

**Webhook:** An automatic notification from Stripe to your site that reports payment events a successful charge, a failed renewal, a cancellation, or a refund. Fluent Members uses webhooks to keep membership statuses in sync with Stripe in real time. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

**WooCommerce (Pro):** A WordPress e-commerce plugin that can handle payment for Fluent Members Pro. Link WooCommerce products or variations to Membership Levels; completing the purchase activates the corresponding membership. See [Pricing: Paywalls](/guide/levels/pricing-paywalls).

**WPFluent:** The shared framework that powers Fluent Members and other WPManageNinja plugins. It handles routing, database access, and hooks behind the scenes; most users will never interact with it directly. See [Fluent Members](https://fluentmembers.com).
