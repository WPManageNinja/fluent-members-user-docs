---
title: "Integrations Overview"
description: "See which plugins connect to Fluent Members, what each connection does, and whether it needs Fluent Members Pro."
---

# Integrations Overview

**Integrations** connect Fluent Members to the other plugins on your site, so you can sell a level through your store or forms, restrict store products, and react to membership changes. There is no connection screen: an integration starts working when its plugin is active.

## What each plugin does

Each integration does a different job:

| Plugin | What it does | Plan |
|--------|--------------|------|
| [FluentCart](/docs/integrations/fluentcart) | Sells a level through a product, restricts products, and adds a **Membership** tab to the customer dashboard | Free |
| [Fluent Forms](/docs/integrations/fluent-forms) | Sells a level through a payment form | Free |
| [Paymattic](/docs/integrations/paymattic) | Sells a level through a payment form | Free |
| [WooCommerce](/docs/integrations/woocommerce) | Sells a level through a product, restricts products, and adds a **Membership** tab to My Account | Pro |
| [FluentCRM](/docs/integrations/fluentcrm) | Starts automations when a membership changes | Free |
| [Fluent Support](/docs/integrations/fluent-support) | Shows a customer's memberships next to their support ticket | Free |
| [FluentCommunity](/docs/integrations/fluent-community) | Adds members to spaces and courses, and removes them when access ends | Free |

## Selling a level through another plugin

FluentCart, Fluent Forms, Paymattic and WooCommerce are pricing types. You choose one when you create a level, in the **Pricing Type** field, and the level then sells only through that plugin. The plugin takes the payment and Fluent Members creates the membership.

![Screenshot of the Pricing Type list showing FluentCart, FluentForms, Paymattic, WooCommerce and Native Payment](/images/integrations/fluentcart/fluentcart-pricing-type.webp)

> [!Note]
> The pricing type cannot be changed after the level is created. Each product or form also belongs to one level only.

[Pricing through a paywall](/docs/levels/pricing-paywalls) covers the steps these plugins share.

## Rules for every paywall

These rules apply to all four selling plugins:

- **Visitors without an account:** When a visitor buys with a new email address, Fluent Members creates an account for that address and adds the membership to it. WooCommerce does this only when the shop allows guest checkout.
- **Email already registered:** A logged-out buyer who uses a registered email address is stopped with "An account already exists for this email address. Please sign in to continue."
- **Buying twice:** A member whose subscription for the level is still active cannot buy that level again. They are asked to manage the subscription instead.
- **One-time payments:** A one-time purchase creates a membership with no expiry date.
- **Subscriptions:** Each renewal extends the membership. If a subscription is cancelled, the member keeps access until the date they have already paid for.
- **Cancelling from Fluent Members:** Cancelling a paywall membership in Fluent Members does not cancel the subscription in the other plugin. Cancel the subscription there to stop billing.

## Reacting to membership changes

FluentCRM and FluentCommunity act when a membership changes, whichever way the member joined. Fluent Support only displays membership information.

FluentCommunity uses feeds, which you add on a level's **Integrations** tab. [Level integrations](/docs/levels/integrations) explains how that tab works.
