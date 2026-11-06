---
title: "Creating a Level"
description: "Create a Membership Level by setting its title, type and pricing type, then complete its details."
---

# Creating a Level

Create a **Membership Level** for each kind of access you want to sell or offer. You set its name, type and pricing type first, then finish its details on the level's own screen.

## Step 1: Open the Add Membership Level modal

Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.

![Screenshot of the Membership Levels list with an arrow pointing to the Create Membership Level button](/images/levels/creating/creating-create-button.webp)

Fill in the fields in the **Add Membership Level** modal:

![Screenshot of the Add Membership Level modal with Title, Type and Pricing Type fields](/images/levels/creating/creating-add-level-modal.webp)

| Field | Notes |
|-------|-------|
| **Title** | The level's name. Required. |
| **Type** | **Individual** (default) is a single user membership plan. **Corporate** (Pro) is a group membership for organizations. See [Corporate Memberships](/docs/levels/corporate-memberships). |
| **Maximum Member** (Pro) | Appears when you choose **Corporate**. It's the seat limit, with a minimum of 2. |
| **Pricing Type** | How the level is sold. Required. |

Choose the **Pricing Type** from this list:

![Screenshot of the Pricing Type list showing FluentCart, FluentForms, Paymattic, WooCommerce and Native Payment](/images/levels/creating/creating-pricing-type-list.webp)

- **FluentCart**, **FluentForms** or **Paymattic:** Sell through that plugin. See [Pricing: Paywalls](/docs/levels/pricing-paywalls). The row must say **Installed** before you can select it.
- **WooCommerce** (Pro): Sell through WooCommerce products.
- **Native Payment** (Pro): Sell through your own Stripe or PayPal checkout. See [Pricing: Native Payment](/docs/levels/pricing-native). If no gateway is connected, click **Configure** on this row to open **Payment Settings**.

> [!Note]
> The **Pricing Type** cannot be changed after you create the level, so choose carefully. Without Pro or a supported payment plugin on your site, the modal shows **No pricing type available yet** and you can't create a level.

Click **Create Level**. The new level opens on its **Level Details** tab.

## Step 2: Complete the Level Details

The **Level Details** tab shows summary cards for **Access Groups**, **Pricing** and **Members**, with the **Level Information** form below them.

![Screenshot of the Level Details tab with the Unsaved Changes bar and an arrow pointing to Save](/images/levels/creating/creating-level-details.webp)

| Field | Notes |
|-------|-------|
| **Title** | Change it at any time. Required. |
| **Description** | Pricing shortcodes can show this to visitors. |
| **Maximum Member** (Pro) | Corporate levels only. The account owner counts as one seat, so the minimum is 2. Leave it empty for unlimited seats. |
| **Status** | **Active** (default) or **Inactive**. Pricing shortcodes skip inactive levels, and you can't assign members to them. |

When you change a field, an **Unsaved Changes** bar appears at the top of the screen. Click **Save** to keep your changes.

The level's shortcode sits next to the page title. Click it to copy.

> [!Note]
> If a level was created before pricing types existed, this form also asks for a **Pricing Type**. Choose one and save.

## Step 3: Finish the setup

Your new level can't be sold or unlock content yet. To finish it:

1. Add a price on the **Pricing** tab, with [Native Payment](/docs/levels/pricing-native) (Pro) or a [paywall](/docs/levels/pricing-paywalls).
2. [Attach an active Access Group](/docs/levels/attaching-access-groups) on the **Access Groups** tab.
3. Add the level to your pricing page with a [shortcode](/reference/shortcodes).

A warning icon stays beside the level's **Status** in the list until it has both a price visitors can buy and an active Access Group.
