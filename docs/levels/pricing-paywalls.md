---
title: "Pricing: Paywalls"
description: "Link a Membership Level to a product or payment form in FluentCart, WooCommerce, FluentForms or Paymattic."
---

# Pricing: Paywalls

A **Paywall** sells a membership level through a product or payment form you already have in another plugin. The visitor pays at that plugin's checkout, and Fluent Members grants the level once the payment completes.

You need:

- A level created with a **FluentCart**, **WooCommerce** (Pro), **FluentForms** or **Paymattic** pricing type. See [Creating a Level](/docs/levels/creating).
- The matching plugin active on your site.

A level uses one provider, shown beside **Pricing Plan** on the **Pricing** tab as **Sold through**. Click **Change in Settings: Payments** there to change the site-wide selling provider for new levels.

## Link a FluentCart or WooCommerce product

On these levels, each price is one variation of a product. The product's price, trial and renewals come from the other plugin, and the level's **Pricing** tab lists them.

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Pricing** tab.
2. Click **Add Pricing**. The **Add a price to** drawer opens.
3. Search under **Pick a variation** and select one. A variation that another level already sells shows **Sells** and the level's name, and your own shows **Already added**. Neither can be chosen.
4. Set **Access**. A recurring price shows **Follows billing**, so access lasts while payments continue. A one-time price lets you choose **Lifetime**, **A set time after purchase** or **Until a fixed date**.
5. Click **Link variation**.

![Screenshot of the Add a price drawer with a FluentCart variation selected](/images/levels/pricing-paywalls/pricing-paywalls-1.webp)

To make a new product, click **Create a new product in FluentCart** at the bottom of the drawer. It opens in a new tab. Publish the product, then come back and pick it.

Each linked price is a row on the **Pricing** tab:

| Part of the row | What it shows |
|-----------------|---------------|
| Up and down arrows | Change the display order. |
| **Name** and product | The price's name, and the product it belongs to. A trial shows as a "free trial" note. |
| Price and access | The amount from the other plugin and how long access lasts. **Expired** appears when a fixed end date has passed. |
| Members | How many members hold the price. |
| **On sale** switch | Turns sales of this price on or off. |
| Three-dot menu | **Edit**, **Open in FluentCart** (or WooCommerce) and **Remove**. |

Choose **Edit** to open **Edit price**. You can change **Name shown to members** and, for non-recurring prices, **Access**. Changes to access apply to new purchases. Current members keep their end dates. To change the amount or billing, use **Open in FluentCart** and edit the product there.

**Remove** unlinks the price from the level. The product stays in its own plugin. You cannot remove a price that members still hold. Turn **On sale** off instead, so new sales stop and current members keep access.

The tab warns you when:

- The plugin has become inactive: "WooCommerce is not active, so these prices cannot be sold. Activate WooCommerce to sell this membership." (with your provider's name)
- A linked variation was deleted or unpublished: "Some linked products or variations no longer exist or are not published."

## Link a FluentForms or Paymattic form

1. Open the level's **Pricing** tab and click **Add Pricing**.
2. Under **Pick a payment form**, search for a form and select it. A form another level sells shows **Sells** and that level's name.
3. Click **Link form**.

![Screenshot of the Add a price drawer listing payment forms](/images/levels/pricing-paywalls/pricing-paywalls-2.webp)

> [!Note]
> Only payment forms with a single fixed-price or recurring item are listed. Forms with custom payment inputs, donation fields or multiple pricing options are not supported.

Each linked form is a row with its name, price type and price. Use the arrows to change the order, and click **Save** in the bar that appears. The row's three-dot menu holds:

- **Edit:** Opens the form in its own plugin, in a new tab.
- **View:** Opens the form's public page.
- **Copy Checkout Link:** Copies a direct link to the checkout, when one exists.
- **Delete:** Removes the link from this level. The form stays in its own plugin.

## When the provider isn't available

The **Pricing** tab tells you when a level can't be sold:

- **FluentCart isn't active:** The tab offers **Install FluentCart**, a free install that Fluent Members runs for you.
- **Fluent Forms, Paymattic or WooCommerce isn't active:** The tab shows "The Fluent Forms plugin is not active." (with that plugin's name) and a **Go to Plugins** button.
- **A WooCommerce level without Pro:** The tab shows "WooCommerce pricing requires FluentMembers Pro."

## Paywalls or Native Payment

| | **Paywalls** | **[Native Payment](/docs/levels/pricing-native)** |
|---|---|---|
| Requires Pro | No (WooCommerce needs Pro) | Yes |
| Where visitors pay | The other plugin's checkout | Built into Fluent Members |
| Best for | Sites already selling through that plugin | Sites that want one tool for membership and checkout |

Next, choose what buyers unlock on the level's [Content Access](/docs/levels/content-access) tab.
