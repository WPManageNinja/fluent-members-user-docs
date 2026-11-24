---
title: "Integrations Overview"
description: "See which plugins connect to Fluent Members, what each connection does, and whether it needs Fluent Members Pro."
---

# Integrations Overview

**Integrations** connect Fluent Members to the other plugins on your site, so you can sell a level through your store or forms, give members spaces and courses, and react to membership changes. There is no connection screen: an integration starts working when its plugin is active.

## What each plugin does

Each integration does a different job:

| Plugin | What it does | Plan |
|--------|--------------|------|
| [FluentCart](/docs/integrations/fluentcart) | Sells a level through a product, adds a **Membership** tab to the product editor and the customer dashboard | Free |
| [Fluent Forms](/docs/integrations/fluent-forms) | Sells a level through a payment form | Free |
| [Paymattic](/docs/integrations/paymattic) | Sells a level through a payment form | Free |
| [WooCommerce](/docs/integrations/woocommerce) | Sells a level through a product, and adds a **Membership** tab to My Account | Pro |
| [FluentCommunity](/docs/integrations/fluent-community) | Adds members to spaces and courses, and removes them when access ends | Free |
| [LMS plugins](/docs/integrations/lms-courses) | Enrolls members in LearnDash, LifterLMS, Tutor LMS, LearnPress, Sensei LMS and MasterStudy LMS courses | Free |
| [FluentCRM](/docs/integrations/fluentcrm) | Starts automations, syncs levels with tags and shows memberships on the contact | Free |
| [Fluent Support](/docs/integrations/fluent-support) | Shows a customer's memberships next to their support ticket | Free |

## Selling a level through another plugin

FluentCart, Fluent Forms, Paymattic and WooCommerce are **selling providers**. The provider takes the payment, and Fluent Members creates the membership. Stripe and PayPal checkout (Pro) is the built-in alternative.

Pick the provider for your whole site on **Fluent Members → Settings → Payment Settings**, under **How you sell memberships**. New memberships use it, and the level's **Pricing** tab then shows only that provider. Choose **No selling, assign only** if you only hand out free levels and add members by hand. Switching later is safe: existing memberships keep their current provider and keep renewing.

![Screenshot of the How you sell memberships card with FluentCart selected](/images/integrations/index/payment-settings-fluentcart.webp)

[Pricing through a paywall](/docs/levels/pricing-paywalls) covers the steps the selling providers share.

## Rules for every selling provider

These rules apply to all four providers:

- **Visitors without an account:** When a visitor buys with a new email address, Fluent Members creates an account for that address and adds the membership to it. This works for FluentCart, Fluent Forms and Paymattic. WooCommerce does it only when the shop allows guest checkout.
- **Email already registered:** A logged-out buyer who uses a registered email address is stopped with "An account already exists for this email address. Please log in to continue."
- **Buying twice:** A member whose subscription for the level is still active is told to manage that subscription instead. A member who already holds the level for life is told "You already have this membership, so there is nothing to buy again."
- **Subscriptions:** Each renewal extends the membership. If a subscription is cancelled, the member keeps access until the date they have already paid for.
- **Cancelling from Fluent Members:** Cancelling a membership in Fluent Members does not cancel the subscription in the other plugin. Cancel it there to stop billing.

## Content and automation integrations

[FluentCommunity](/docs/integrations/fluent-community) and the [LMS plugins](/docs/integrations/lms-courses) are set up on a level's **Content Access** tab, next to your protected content. [FluentCRM](/docs/integrations/fluentcrm) works from the FluentCRM side, with a settings tab in Fluent Members for tag sync. [Fluent Support](/docs/integrations/fluent-support) only displays membership information.
