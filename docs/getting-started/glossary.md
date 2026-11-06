---
title: "Glossary"
description: "Plain definitions of the terms used across the Fluent Members docs, from Membership Levels and Access Groups to Pro billing features."
---

# Glossary

This **glossary** explains the terms used across the Fluent Members docs. Use it when a word in a guide or on a screen isn't clear.

## A

**Access Group:** A named set of content you want to protect, with what blocked visitors see instead. Attach it to one or more Membership Levels, and members holding one of those levels can open the content. See [Access groups overview](/docs/access-groups/).

**Access Groups block:** A block that protects whatever you place inside it, instead of the whole post. See [Access Groups block](/docs/access-groups/gutenberg-block/inserting).

**Active:** The normal membership status. The member has access to everything their level unlocks. See [Membership statuses](/reference/membership-statuses).

**Administrator:** WordPress administrators skip all protection, so they always see everything. Test your protection in a private window while logged out. See [How protection works](/docs/access-groups/how-protection-works).

## B

**Billing (Pro):** The top bar menu that holds **Subscriptions** and **One-time**. See [Billing overview](/docs/billing/).

**Block email editor (Pro):** An editor for designing email notifications with blocks, starting from a template if you want. See [Custom email editor](/docs/settings/email-configuration/custom-email-editor).

## C

**Cancellation mode (Pro):** Decides when a cancelled subscription ends. **End of Billing Period** keeps access until the paid time runs out. **Cancel Immediately** ends it right away. See [Cancel a subscription](/docs/billing/cancelling-a-subscription).

**Cancelled:** A membership status for a membership someone has ended. See [Membership statuses](/reference/membership-statuses).

**Chain map:** A reference that traces how levels, Access Groups and content connect. Use it to work out why a member can or cannot see something. See [Chain map](/reference/chain-map).

**Checkout:** The page where a visitor pays. It belongs to the plugin that sells the level, or to Fluent Members itself when you use Native Payment (Pro). See [Checkout & guest checkout](/docs/selling/checkout).

**Corporate Child (Pro):** The label on a member who holds a seat on someone else's corporate membership. Their seat ends when the owner's membership ends. See [Corporate members](/docs/members/corporate-members).

**Corporate membership (Pro):** A level type for teams. One owner holds the membership and invites people to its seats. See [Corporate memberships](/docs/levels/corporate-memberships).

**Currency:** The default currency for new prices, set under **Settings → General Settings**. Existing prices, subscriptions and payments keep their own currency. See [General settings](/docs/settings/general).

## D

**Dashboard:** The first screen of the plugin. Its cards show **Active members**, **Revenue**, **Recurring revenue** and **Member churn**, above charts and recent activity. See [Read your dashboard](/docs/dashboard/dashboard).

**Drip content:** Releases protected content on a schedule that starts when a member joins. **After duration** unlocks content after a set time. **Within duration** makes it available until a set time, then it ends. See [Drip content](/docs/access-groups/content-drip).

## E

**Email notification:** An automatic email for a membership event: **Welcome Email**, **Membership Expiring** and **Membership Expired**. See [Email notifications](/docs/settings/email-configuration/email-notifications).

**Entire Website:** A restriction type that protects every page on your site. See [Restriction types](/docs/access-groups/protected-content).

**Exclude Content from Restriction:** A list under **Settings → General Settings** of content that stays public, whichever Access Groups cover it. See [General settings](/docs/settings/general).

**Expired:** A membership status set when a membership's end date passes. The member loses access and the record stays. See [Membership statuses](/reference/membership-statuses).

## F

**FluentCart:** An e-commerce plugin. Sell a level as a FluentCart product, and the membership is granted when the order is paid. See [FluentCart](/docs/integrations/fluentcart).

**FluentCommunity:** A community plugin. Add members to spaces automatically when they join a level. See [FluentCommunity](/docs/integrations/fluent-community).

**FluentCRM:** A CRM plugin. Start automations when a membership changes. See [FluentCRM](/docs/integrations/fluentcrm).

**Fluent Forms:** A form plugin. Sell a level through a payment form. See [Fluent Forms](/docs/integrations/fluent-forms).

**Fluent Members Pro:** The paid plugin that adds to the free one. See [Free vs Pro](/docs/getting-started/free-vs-pro).

**Fluent Support:** A helpdesk plugin. Agents see a customer's memberships inside their ticket. See [Fluent Support](/docs/integrations/fluent-support).

## G

**Guest checkout (Pro):** Buying a native plan without being logged in. The visitor enters an email address at checkout and the account is created for them. See [Checkout & guest checkout](/docs/selling/checkout).

**Guided setup:** The four steps that open the first time you open the plugin on a new install. See [Guided setup & quick start](/docs/getting-started/quick-start).

## H

**Hook:** An extension point for developers. Actions run code on an event, and filters change a value. See [Hooks & filters](/reference/developer-hooks).

## I

**Individual:** The standard level type, where each member holds their own membership. See [Create a level](/docs/levels/creating).

**Integration:** A connection to another plugin. See [Integrations overview](/docs/integrations/).

**Invitation (Pro):** How a team owner fills a seat. The person gets an emailed link, logs in with the same email address and joins the team. See [Corporate seat invites](/docs/members/portal/corporate-seat-invites).

## L

**Level integration:** An action in another plugin that runs when a member joins or leaves a level, set on the level's **Integrations** tab. See [Level integrations](/docs/levels/integrations).

**Login popup:** A dialog that lets a logged-out visitor log in without leaving a protected page. It is off by default. See [Login popup](/docs/settings/login-popup).

## M

**Member:** A WordPress user who holds at least one membership. A member can hold several at once. See [Members list](/docs/members/).

**Member Portal:** The page where logged-in members see and manage their memberships, using the `[fluent_member_portal]` shortcode. See [Set up the portal](/docs/members/portal/setup).

**Membership:** The record linking one WordPress user to one level, with its status, dates and provider. See [Member details](/docs/members/detail).

**Membership Level:** The plan a member buys or is given. It has a type and a pricing type, and unlocks one or more Access Groups. See [Levels overview](/docs/levels/).

**Membership status:** The current state of a membership: **Active**, **Trial**, **Suspended**, **Cancelled**, **Expired** or **Upgraded**. Only **Active** and **Trial** give access. See [Membership statuses](/reference/membership-statuses).

**Migration:** Importing levels, members and more from Paid Memberships Pro, MemberPress, Kadence Memberships or Restrict Content Pro. See [Migration overview](/docs/settings/migration/).

## N

**Native Payment (Pro):** The built-in Stripe and PayPal checkout, as opposed to selling through another plugin. See [Price with native payments](/docs/levels/pricing-native).

## O

**One-time membership (Pro):** A membership with no recurring subscription behind it, listed under **Billing → One-time**. See [One-time memberships](/docs/billing/one-time).

## P

**Partial Content Lock:** Shows visitors the start of a protected post, followed by a message and a button. See [Partial content lock](/docs/settings/partial-content-lock).

**Permissions:** A setting that decides who can add, change or remove access restrictions on content. It has two roles, **Restriction Manager** and **Restriction Author**. See [Permissions](/docs/settings/permissions).

**Paymattic:** A payment form plugin. Sell a level through a Paymattic form. See [Paymattic](/docs/integrations/paymattic).

**Payment method (Pro):** The saved card on a Stripe subscription. Members can replace it from the portal. PayPal subscriptions do not offer this. See [Update payment method](/docs/members/portal/updating-payment-method).

**Paywall:** A link between a level and a product or form in another plugin. When the purchase completes, the member gets the level. See [Price with paywalls](/docs/levels/pricing-paywalls).

**Prorate (Pro):** An option on an upgrade path that credits what a member has already paid toward the new plan. See [Upgrade paths](/docs/levels/upgrade-paths).

**Pricing plan (Pro):** One way to pay for a level with Native Payment, such as monthly or yearly. See [Price with native payments](/docs/levels/pricing-native).

**Pricing Type:** How a level is paid for: FluentCart, FluentForms, Paymattic, WooCommerce (Pro) or Native Payment (Pro). It cannot be changed after you create the level. See [Create a level](/docs/levels/creating).

**Provider:** The system that created a membership, such as a paywall plugin, a gateway, a migration or a manual assignment. See [Member details](/docs/members/detail).

## R

**Recurring billing:** Charging a member automatically on a schedule. Use FluentCart subscriptions, or Stripe, PayPal or WooCommerce Subscriptions with Pro. See [Subscriptions](/docs/billing/subscriptions).

**Recent Activity:** A panel on the dashboard that lists the latest membership events, filtered by **All**, **Members** or **Admin**. See [Read your dashboard](/docs/dashboard/dashboard).

**Redirect:** An unauthorized access action that sends blocked visitors to another URL on your site. See [What blocked visitors see](/docs/access-groups/unauthorized-access).

**Restriction type:** The kind of content a rule in an Access Group protects, such as **Entire Website**, **All Posts** or specific content. See [Restriction types](/docs/access-groups/protected-content).

## S

**Restriction Author / Restriction Manager:** The two permission roles. An author can add restrictions but cannot change or remove saved ones. A manager can add, change and remove them. See [Permissions](/docs/settings/permissions).

**Seat (Pro):** One place on a corporate membership. **Maximum Members** sets how many there are, and the owner counts as one. See [Corporate memberships](/docs/levels/corporate-memberships).

**Shortcode:** A tag you paste into a page: `[fluent_membership_level]`, `[fluent_membership_levels]`, `[fluent_members]` or `[fluent_member_portal]`. See [Shortcodes](/reference/shortcodes).

**Smartcode:** A placeholder in an email, such as <span v-pre>`{{user_name}}`</span> or <span v-pre>`{{membership_level}}`</span>, replaced with real data when the email is sent. See [Email smartcodes](/reference/email-smartcodes).

**Stripe (Pro):** A payment gateway for Native Payment. See [Set up Stripe](/docs/settings/payment-settings/stripe-setup).

**Subscription (Pro):** A recurring payment behind a membership, listed under **Billing → Subscriptions**. See [Subscriptions](/docs/billing/subscriptions).

**Suspended:** A membership status that removes access until it is restored. See [Suspend or cancel a member](/docs/members/suspending-and-cancelling).

## T

**Team owner (Pro):** The person who holds a corporate membership and manages its seats from the portal. People in those seats show as **Corporate Child** on their member details. See [Corporate members](/docs/members/corporate-members).

**Transaction (Pro):** One payment event, such as a charge, renewal or refund, listed under **Transaction History** on a subscription or one-time membership. See [Billing overview](/docs/billing/).

**Trial:** A membership status during a free trial. Trial members have access. See [Membership statuses](/reference/membership-statuses).

**Trial Days (Pro):** The free days at the start of a recurring pricing plan. See [Price with native payments](/docs/levels/pricing-native).

## U

**Unauthorized Access:** What visitors without access get: a redirect or a custom message. Set a site-wide default, or customize it for an Access Group. See [What blocked visitors see](/docs/access-groups/unauthorized-access).

**Upgrade path (Pro):** A move a member can make from one pricing plan to another, with an optional discount or proration. See [Upgrade paths](/docs/levels/upgrade-paths).

**Upgraded:** The status left on a membership after the member moved to another level or plan. See [Membership statuses](/reference/membership-statuses).

## W

**Webhook:** A message Stripe or PayPal sends to your site about a payment event, which keeps membership statuses up to date. See [Set up Stripe](/docs/settings/payment-settings/stripe-setup) or [Set up PayPal](/docs/settings/payment-settings/paypal-setup).

**WooCommerce (Pro):** An e-commerce plugin. Sell a level as a product, and restrict products to members. See [WooCommerce](/docs/integrations/woocommerce).
