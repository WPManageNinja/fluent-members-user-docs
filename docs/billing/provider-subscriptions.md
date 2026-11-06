---
title: "Subscriptions From Other Plugins (Pro)"
description: "See recurring memberships billed by FluentCart, WooCommerce, Fluent Forms or Paymattic in the Subscriptions list, and where to manage them."
---

# Subscriptions From Other Plugins (Pro)

When a recurring purchase in **FluentCart**, **WooCommerce**, **Fluent Forms** or **Paymattic** grants a membership, it appears in the [Subscriptions](/docs/billing/subscriptions) list (Pro) next to your Stripe and PayPal subscriptions. You get one list of everyone on a recurring plan, while the other plugin keeps handling the billing.

These rows are read-only here. You refund and cancel them in the plugin that bills them.

## Find these rows

Go to **Fluent Members → Billing → Subscriptions**. The **Gateway** column names the plugin: **FluentCart**, **WooCommerce**, **FluentForms** or **Paymattic**.

<!-- TODO(screenshot): provider-subscriptions-1
  screen: Billing → Subscriptions
  state: list including rows whose Gateway is FluentCart or WooCommerce
  data: a recurring FluentCart or WooCommerce purchase that granted a membership
  highlight: Gateway column
  view: admin
  alt: Screenshot of the Subscriptions list with a row billed by another plugin
  reason: the local site has no recurring purchases from other plugins
-->

These rows differ from Stripe and PayPal rows in a few ways:

- **Billing Cycle** shows the price label saved from the other plugin, or `--` if there is none.
- **Next Billing** comes from the other plugin when it can report a date. Otherwise it shows `--`.
- **Total Paid** and **Last Payment** show `--`, because the payments live in the other plugin.
- The three-dot menu holds **View** only.

To find one by search, enter the member's name or email, or the subscription's numeric ID in the other plugin. See [Filter & Search](/docs/billing/filters-and-search).

## Status

The status comes from the membership, so it uses the same names as other subscriptions:

| Membership status | Shown as |
|---|---|
| Active | **Active** |
| Trial | **Trialing** |
| Suspended | **Past Due** |
| Cancelled | **Canceled** |
| Expired | **Expired** |

## The subscription page

Click a row to open it. The page has the same layout as other subscriptions, with these differences:

<!-- TODO(screenshot): provider-subscriptions-2
  screen: Billing → Subscriptions → a row billed by another plugin
  state: subscription page with the Open in button visible
  data: a recurring FluentCart or WooCommerce purchase that granted a membership
  highlight: Open in button
  view: admin
  alt: Screenshot of a subscription billed by another plugin, with the Open in button at the top
  reason: the local site has no recurring purchases from other plugins
-->

- **Open in [plugin name]:** replaces **More Actions** and opens the record in that plugin in a new tab. It only appears when the plugin is active and Fluent Members has a reference to the record.
- **Gateway Subscription ID:** the subscription's ID in the other plugin, or `--`.
- **Order ID** (FluentCart and WooCommerce) or **Submission ID** (Fluent Forms and Paymattic): shown when known.
- **Renews / Ends:** the membership's end date, in place of **Ends At**.
- **Transaction History:** not shown. Check payments in the other plugin.
- **Activity:** lists only **Subscription created** and, when it applies, **Subscription expired**.

## Refund or cancel

Do both in the plugin that bills the member. Use **Open in [plugin name]** to get there. When that plugin reports the change, Fluent Members updates the membership. See the [integration guides](/docs/integrations/) for what each plugin sends.

> [!Note]
> Cancelling this membership from the [Members](/docs/members/suspending-and-cancelling) screen ends it in Fluent Members only. It does not stop billing in the other plugin, so cancel it there too.
