---
title: "Frequently Asked Questions"
description: "Quick answers about Fluent Members plans, requirements, content protection, members, emails, payments and migration."
---

# Frequently Asked Questions

Quick answers to common questions about **Fluent Members**.

## General

::: faq
== Is Fluent Members free?
Yes. The free plugin includes Membership Levels, free levels, Bundles, content protection, the Member Portal, email notifications and integrations with FluentCart, Fluent Forms, Paymattic, FluentCRM, Fluent Support, FluentCommunity and the LMS plugins.

**Fluent Members Pro** adds native Stripe and PayPal checkout, the **Billing** screens, refunds, corporate memberships, upgrade paths, the custom email editor and the WooCommerce integration.

== What WordPress and PHP versions do I need?
WordPress 6.3 or newer and PHP 7.4 or newer. The plugin is tested up to WordPress 7.1.

== How many levels can I create?
The plugin sets no limit on Membership Levels, in Free or Pro.
:::

## Setup

::: faq
== Do I need a separate payment plugin?
It depends on how you sell:

- **Free or admin-assigned memberships:** no payment plugin.
- **With Pro:** native Stripe and PayPal are built in, with no extra plugin.
- **Without Pro:** connect a paywall to FluentCart, Fluent Forms or Paymattic. The [guided setup](/docs/getting-started/quick-start) can install FluentCart for you.
- **WooCommerce:** needs Pro.

See [Payment settings](/docs/settings/payment-settings/).

== Where do I find a level ID?
Go to **Fluent Members → Membership Levels**, open the **Row actions** menu on a level and click **Copy shortcode**. The pasted shortcode holds the ID, for example `[fluent_membership_level id='10']`. The ID is also in the address when you open the level.

== How do I create the Member Portal page?
The [guided setup](/docs/getting-started/quick-start) creates it for you. You can also go to **Fluent Members → Settings → General Settings** and use the create button beside **Generate Portal Page**. It makes a page with the `[fluent_member_portal]` shortcode. See [Set up the portal](/docs/members/portal/setup).

== How do I test payments before going live?
With Pro, keep **Site Mode** on **Test** under **Settings → General Settings**, buy a plan yourself, then switch to **Live**. See [Test mode and live mode](/docs/getting-started/test-and-live-mode).

== Can I run the guided setup again?
Yes. Go to **Settings → General Settings** and click **Run setup again**. Your memberships, prices and content stay as they are.
:::

## Content Protection

::: faq
== What can I protect?
Pages, posts, categories, tags, FluentCart products and WooCommerce products (Pro), set on a level's **Content Access** tab. You can also protect a single post, or a block inside a post. See [Protect content by type](/docs/content-access/protected-content).

FluentCommunity spaces and courses, and LMS courses, are added to a level on the same tab. See [Content access](/docs/levels/content-access).

== Can I show a preview to visitors instead of blocking them?
Yes. Set **Non-members see** to **A teaser** in [Restricted content settings](/docs/content-access/restricted-content). It shows the first words of the content, then a message and a button.

== Can I release content over time?
Yes. Set a [release schedule](/docs/content-access/content-drip) on a rule in the level's **Content Access** tab. A rule can open immediately, after a set time since the member joined, or on a date.

== Does protection cover the REST API?
Yes, for protected posts and comments on the standard WordPress REST routes. Custom endpoints aren't covered.

== Why can I still see protected content?
Administrators always bypass restrictions. Test in a private browser window, logged out or as a member.
:::

## Members and Subscriptions

::: faq
== Which membership statuses exist?
Six: **Active**, **Trial**, **Suspended**, **Cancelled**, **Expired** and **Upgraded**. Only **Active** and **Trial** give access.

== How do members cancel?
In the Member Portal they click **Manage** on a membership, open **More Actions** and choose **Cancel Membership** or **Cancel Subscription**. See [Cancel a membership](/docs/members/portal/cancelling).

== Does Fluent Members support recurring subscriptions?
Yes. Native recurring plans use Stripe or PayPal and need Pro. FluentCart, Fluent Forms and Paymattic subscriptions also work, and so do WooCommerce subscriptions (Pro).

== What can members do in the portal?
Every member can view their memberships and cancel an active one. With Pro, members can also update a Stripe payment method, renew an eligible subscription, upgrade a plan and manage corporate seats. See [What members see](/docs/members/portal/what-members-see).

== What is a corporate membership?
A Pro feature where one member owns a set number of seats and invites a team through the portal. If the owner's membership is cancelled, suspended or expires, the seats follow. See [Corporate memberships](/docs/levels/corporate-memberships).

== Can members join a free level without paying?
Yes. A free level lets visitors join at no cost from your pricing page. See [Free levels](/docs/levels/free-levels).

== Can visitors buy without an account?
Yes, for levels that support [guest checkout](/docs/selling/checkout). The account is created from their purchase details.
:::

## Emails

::: faq
== Which email notifications are included?
Nine: **Welcome Email**, **Membership Expiring**, **Membership Expired**, **Payment Receipt**, **Payment Failed**, **Subscription Cancelled**, **Refund Issued**, **Team Invitation** and **Guest Account**. All nine are on by default. See [Email notifications](/docs/settings/email-configuration/email-notifications).

== Is there a suspension email?
No. To email members on suspension, use the **Membership Suspended** trigger in [FluentCRM](/docs/integrations/fluentcrm) or the `fluent_members/membership_suspended` hook in Developer Hooks.

== Can I customize the templates?
Yes. Edit the subject and body of each notification under **Fluent Members → Settings → Email Configuration → Email Notifications**, and use smartcodes for member and payment details. Pro adds the [custom email editor](/docs/settings/email-configuration/custom-email-editor).

== My emails aren't arriving. What do I check?
First check the notification is on, then your sender address in **Mailing Settings**.
:::

## Payments

::: faq
== Where do I set up Stripe and PayPal?
Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the gateway. This needs Pro. See [Set up Stripe](/docs/settings/payment-settings/stripe-setup) and [Set up PayPal](/docs/settings/payment-settings/paypal-setup).

== What is the webhook URL?
It's shown on the gateway's settings screen under **Webhook URL**. Copy it from there. It contains `?fluent_members_payment_listener=1&payment_method=stripe`, or `payment_method=paypal` for PayPal.

== Can I refund from Fluent Members?
Yes, with Pro. Open the record under **Billing** and refund it, in full or in part. A full refund of a charge or renewal also cancels the membership, except for payments carried over by a migration. See [Refunds](/docs/billing/refunds).

== What if I refund in the Stripe dashboard?
Stripe sends a `charge.refunded` webhook event and Fluent Members records the refund, as long as your webhook is set up.
:::

## Integrations and Migration

::: faq
== Which plugins can I migrate from?
Three: **Paid Memberships Pro**, **MemberPress** and **Kadence Memberships**, formerly Restrict Content Pro. See [Migration overview](/docs/settings/migration/).

== Do existing subscriptions carry over?
With Pro, Stripe subscriptions can stay linked after migration, and recurring billing continues. PayPal carry-over depends on the subscription type. See the guide for your source plugin in [Migration overview](/docs/settings/migration/).

== Does it work with WooCommerce?
Yes, with Pro. You can restrict WooCommerce products, sell a level through a product, and use WooCommerce Subscriptions. See [WooCommerce](/docs/integrations/woocommerce).

== Does it work with FluentCRM?
Yes. Fluent Members adds automation triggers to FluentCRM, such as **Membership Level Assigned**, **Membership Expiring**, **Membership Renewed** and **Membership Payment Failed**, and can sync levels with tags. See [FluentCRM](/docs/integrations/fluentcrm).
:::
