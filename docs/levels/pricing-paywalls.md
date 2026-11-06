---
title: "Pricing: Paywalls"
description: "Link a Membership Level to a product or payment form in FluentCart, FluentForms, Paymattic or WooCommerce."
---

# Pricing: Paywalls

A **Paywall** links a level to a product or payment form in another plugin. The visitor pays through that plugin's checkout, and Fluent Members grants the level when payment completes. Use a paywall when you already sell through FluentCart, FluentForms, Paymattic or WooCommerce (Pro).

You need a level created with one of these pricing types, and that plugin active on your site. See [Creating a Level](/docs/levels/creating). Each level uses one provider, shown beside **Pricing Plan** on the tab.

## Add a paywall

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Pricing** tab.
2. Click **Add Pricing**.

    ![Screenshot of the Pricing tab of a FluentCart level with no plans and an arrow pointing to Add Pricing](/images/levels/pricing-paywalls/pricing-paywalls-empty.webp)

3. Under **Select Pricing**, search for and choose a product or form. Items already linked to this level can't be chosen again.

    ![Screenshot of the Add Pricing modal with the Select Pricing list open, showing FluentCart products](/images/levels/pricing-paywalls/pricing-paywalls-product-list.webp)

4. Click **Add**.

Repeat these steps to link more products to the same level.

> [!Note]
> FluentForms and Paymattic list only forms with a single fixed-price or recurring item. Forms with custom payment inputs, donation fields or multiple pricing options are not supported.

### Create a FluentCart product from the modal

On a FluentCart level, click **Create Pricing** in the modal, enter a **Title** and **Price**, and click **Add**. This creates a one-time payment product. To go back to the list, click **Select an existing product**.

![Screenshot of the Add Pricing modal with the Title and Price fields for a new FluentCart product](/images/levels/pricing-paywalls/pricing-paywalls-create-form.webp)

On a FluentForms, Paymattic or WooCommerce level, the modal links to that plugin so you can create a form or product there.

## Manage linked products

Each product or variation appears as its own row with its price. Click **View** to open the product's public page, or open the row's menu:

![Screenshot of linked FluentCart product rows on the Pricing tab with a row menu open and an arrow pointing to Copy Checkout Link](/images/levels/pricing-paywalls/pricing-paywalls-rows.webp)

- **Edit:** Opens the product or form in its own plugin, in a new tab.
- **Move up** and **Move down:** Change the display order. You can also drag rows by their handle and click **Save**.
- **Copy Checkout Link:** Copies a direct link to the checkout.
- **Delete:** Removes the link from this level. The product stays in its own plugin. If a product has several variations, this removes all of them from the level.

## If the provider isn't available

The **Pricing** tab tells you when a level can't be sold:

- **FluentCart isn't active:** The tab offers **Install FluentCart**, and **Open plugin browser** for other options.
- **Another provider's plugin isn't active:** The tab shows **The [plugin] plugin is not active.** with a **Go to Plugins** button.
- **A WooCommerce level without Pro:** The tab shows **WooCommerce pricing requires Fluent Members Pro.**

## Paywalls compared with Native Payment

| | **Paywalls** | **[Native Payment](/docs/levels/pricing-native)** |
|---|---|---|
| Requires Pro | No (WooCommerce needs Pro) | Yes |
| Where visitors pay | The other plugin's checkout | Built into Fluent Members |
| Best for | Sites already selling through that plugin | Sites that want one tool for membership and checkout |

Next, [attach Access Groups](/docs/levels/attaching-access-groups) so buyers unlock your protected content.
