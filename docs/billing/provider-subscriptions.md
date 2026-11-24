---
title: "Subscriptions From Other Plugins (Pro)"
description: "See recurring memberships billed by FluentCart, WooCommerce, Fluent Forms or Paymattic in the Subscriptions list, and where to manage them."
---

# Subscriptions From Other Plugins (Pro)

When a recurring purchase in **FluentCart**, **WooCommerce**, **Fluent Forms** or **Paymattic** grants a membership, it appears in the [Subscriptions](/docs/billing/subscriptions) list (Pro) next to your Stripe and PayPal subscriptions. You get one list of everyone on a recurring plan, while the other plugin keeps handling the billing.

These rows are read-only here. You refund them in the plugin that bills them, and you cancel them there or from the member's page.

## Find these rows

Go to **Fluent Members → Billing → Subscriptions**. Turn on the **Gateway** column from the **Columns** icon if it is hidden. It names the plugin: **FluentCart**, **WooCommerce**, **FluentForms** or **Paymattic**.

![Screenshot of the Subscriptions list with a row billed by another plugin](/images/billing/provider-subscriptions/gateway-column.webp)

These rows differ from Stripe and PayPal rows in a few ways:

- **Billing Cycle** shows the price label saved from the other plugin, or `--` if there is none.
- **Next Billing** comes from the other plugin when it can report a date. Otherwise it shows `--`.
- **Total Paid** and **Last Payment** show `--`, because the payments live in the other plugin.
- The three-dot menu holds **View** only.

To find one by search, enter the member's name or email, or the subscription's numeric ID in the other plugin. See [Filter & Search](/docs/billing/filters-and-search).

## Status

These rows show the membership's status, not a billing status: **Active**, **Trial**, **Suspended**, **Cancelled** or **Expired**. When the member has set the subscription to end at a later date, **Status** reads **Cancels** with that date.

## The subscription page

Click a row to open it. The page has the same layout as other subscriptions, with these differences:

![Screenshot of a subscription billed by another plugin, with the Open in button at the top](/images/billing/provider-subscriptions/open-in-button.webp)

- **Open in [plugin name]:** replaces **More actions** and opens the record in that plugin in a new tab. It only appears when the plugin is active and Fluent Members has a reference to the record.
- **Gateway Subscription ID:** the subscription's ID in the other plugin, or `--`.
- **Order ID** (FluentCart and WooCommerce) or **Submission ID** (Fluent Forms and Paymattic): shown when known.
- **Renews / Ends:** the membership's end date, in place of **Ends At**.
- **Transaction History:** not shown. Check payments in the other plugin.
- **Activity:** lists only **Subscription created** and, when it applies, **Subscription expired**.

## Refund or cancel

Refund in the plugin that bills the member. Use **Open in [plugin name]** to get there.

To cancel, you have two routes:

- **In the other plugin:** cancel there, and Fluent Members updates the membership when that plugin reports the change. See the [integration guides](/docs/integrations/) for what each plugin sends.
- **From the member's page** (FluentCart and WooCommerce): a **Store billing** section under the **Memberships** table shows the store's subscription, with its next charge, payment method and links to the order and subscription. Its **Cancel Subscription** button, or **Cancel** in the row menu, cancels the subscription in the store and ends or schedules the membership. The button is missing when the store cannot cancel that subscription with its payment method, and a note says why. See [Suspending & Cancelling](/docs/members/suspending-and-cancelling).

> [!Note]
> Cancelling a Fluent Forms or Paymattic membership from the [member's page](/docs/members/suspending-and-cancelling) ends it in Fluent Members only. It does not stop billing in the other plugin, so cancel it there too.
