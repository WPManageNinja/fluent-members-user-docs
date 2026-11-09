---
title: "Pricing: Paywalls"
description: "Link a Membership Level to a product or payment form in FluentCart, FluentForms, Paymattic or WooCommerce."
---

# Pricing: Paywalls

A **Paywall** allows you to sell a membership level through a product or payment form you already have in another plugin. The visitor pays at that plugin's checkout, and Fluent Members grants the level once the payment completes.

**Requirements**

- A membership level must be created with a **FluentCart**, **FluentForms**, **Paymattic** or **WooCommerce** (Pro) pricing type. See [Creating a Level](/docs/levels/creating).
- The matching plugin must be active on your site.

Each level uses one provider, shown beside **Pricing Plan** on the **Pricing** tab.

## Adding a paywall

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Pricing** tab.
2. Click **Add Pricing**.

    ![Screenshot of the Pricing tab of a FluentCart level with no plans and an arrow pointing to Add Pricing](/images/levels/pricing-paywalls/pricing-paywalls-empty.webp)

3. Under **Select Pricing**, search for and choose a product or form. Items already linked to this level can't be chosen again.

    ![Screenshot of the Add Pricing modal with the Select Pricing list open, showing FluentCart products](/images/levels/pricing-paywalls/pricing-paywalls-product-list.webp)

4. Click **Add**.

The product appears on the **Pricing** tab, one row for each variation.

![Screenshot of the Pricing tab with the linked FluentCart product rows](/images/levels/pricing-paywalls/pricing-paywalls-plan-rows.webp)

Repeat these steps to link more products to the same level.

> [!Note]
> FluentForms and Paymattic list only forms with a single fixed-price or recurring item. Forms with custom payment inputs, donation fields or multiple pricing options are not supported.

### Creating a FluentCart product from the modal

On a FluentCart level, you can create the product without leaving the modal:

1. Click **Create Pricing**.
2. Enter a **Title** and **Price**.
3. Click **Add**.

This creates a one-time payment product. To go back to the list, click **Select an existing product**.

![Screenshot of the Add Pricing modal with the Title and Price fields for a new FluentCart product](/images/levels/pricing-paywalls/pricing-paywalls-create-form.webp)

On a FluentForms, Paymattic or WooCommerce level, the modal links to that plugin so you can create a form or product there.

## Manage your products

Each product or variation appears as its own row on the **Pricing** tab with its price. Click **View** to open the product's public page.

To change the display order, drag a row by its handle and click **Save**. The row's menu holds these options:

![Screenshot of linked FluentCart product rows on the Pricing tab with a row menu open and an arrow pointing to Copy Checkout Link](/images/levels/pricing-paywalls/pricing-paywalls-rows.webp)

- **Edit:** Opens the product or form in its own plugin, in a new tab.
- **Move up** and **Move down:** Change the display order without dragging.
- **Copy Checkout Link:** Copies a direct link to the checkout.
- **Delete:** Removes the link from this level. The product stays in its own plugin. If a product has several variations, this removes all of them from the level.

## When the provider isn't available

The **Pricing** tab tells you when a level can't be sold:

- **FluentCart isn't active:** The tab offers **Install FluentCart**, and **Open plugin browser** for other options.
- **Another provider's plugin isn't active:** The tab shows **The [plugin] plugin is not active.** with a **Go to Plugins** button.
- **A WooCommerce level without Pro:** The tab shows **WooCommerce pricing requires Fluent Members Pro.**

## Paywalls or Native Payment

| | **Paywalls** | **[Native Payment](/docs/levels/pricing-native)** |
|---|---|---|
| Requires Pro | No (WooCommerce needs Pro) | Yes |
| Where visitors pay | The other plugin's checkout | Built into Fluent Members |
| Best for | Sites already selling through that plugin | Sites that want one tool for membership and checkout |

Next, [attach Access Groups](/docs/levels/attaching-access-groups) so buyers unlock your protected content.
