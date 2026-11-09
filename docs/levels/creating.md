---
title: "Creating a Level"
description: "Create a Membership Level by setting its title, type and pricing type, then complete its details."
---

# Creating a Level

A **Membership Level** is the actual plan or product that a visitor buys (or joins for free). You can easily build any plan structure your business needs by creating a level and assigning it the right access and pricing.

## Step 1: Create the Level

Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.

![Screenshot of the Membership Levels list with an arrow pointing to the Create Membership Level button](/images/levels/creating/creating-create-button.webp)

Fill in the fields in the **Add Membership Level** modal:

| Field | Notes |
|-------|-------|
| **Title** | The level's name. Required. |
| **Type** | **Individual** (default) is a single user membership plan. **Corporate** (Pro) is a group membership for organizations. See [Corporate Memberships](/docs/levels/corporate-memberships). |
| **Maximum Member** (Pro) | Appears when you choose **Corporate**. It's the seat limit, with a minimum of 2. |
| **Pricing Type** | How the level is sold. Required. |

![Screenshot of the Add Membership Level modal with Title, Type and Pricing Type fields](/images/levels/creating/creating-add-level-modal.webp)



Choose the **Pricing Type** from this list:
- **FluentCart**, **FluentForms** or **Paymattic:** Sell through that plugin. See [Pricing: Paywalls](/docs/levels/pricing-paywalls). The row must say **Installed** before you can select it.
- **WooCommerce** (Pro): Sell through WooCommerce products.
- **Native Payment** (Pro): Sell through your own Stripe or PayPal checkout. See [Pricing: Native Payment](/docs/levels/pricing-native). If no gateway is connected, click **Configure** on this row to open **Payment Settings**.

> [!Note]
> The **Pricing Type** cannot be changed after you create the level, so choose carefully. Without Pro or a supported payment plugin on your site, the modal shows **No pricing type available yet** and you can't create a level.

Click **Create Level**. The new level opens on its **Level Details** tab.

![Screenshot of the Pricing Type list showing FluentCart, FluentForms, Paymattic, WooCommerce and Native Payment](/images/levels/creating/creating-pricing-type-list.webp)



## Step 2: Complete the Level Details

The **Level Details** tab shows summary cards for **Access Groups**, **Pricing** and **Members**, with the **Level Information** form below them.

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

![Screenshot of the Level Details tab with the Unsaved Changes bar and an arrow pointing to Save](/images/levels/creating/creating-level-details.webp)


## Step 3: Finish the setup

Your level is created, but it can't be sold or unlock content until you finish its pricing and show it on your site.

### Add pricing

Fluent Members takes payment through the plugin or gateway you chose as the **Pricing Type**, not inside the level form. Open your new level and click the **Pricing** tab.

- **FluentCart, FluentForms, Paymattic or WooCommerce** (Pro): Link the level to a product or form from that plugin. See [Price with paywalls](/docs/levels/pricing-paywalls).
- **Native Payment** (Pro): Click **Add Pricing** and set up a plan with Stripe or PayPal. See [Price with native payments](/docs/levels/pricing-native).

![Screenshot of the Pricing tab of a level with two plans and an arrow pointing to Add Pricing](/images/levels/creating/creating-pricing-tab.webp)


### Display the level on your site

1. Find the level's ID in the **ID** column of the levels list, or read it from the shortcode beside the page title on the level's screen.
2. Paste the shortcode `[fluent_membership_level id="X"]` into your pricing page, replacing `X` with the ID. Visitors then see the level's pricing card and subscribe button.

![Screenshot of a level's screen with an arrow pointing to the copyable shortcode beside the title](/images/levels/creating/creating-level-shortcode.webp)

To show several levels in one grid, use `[fluent_membership_levels]`. See [Shortcodes](/reference/shortcodes).

### Attach an Access Group

[Attach an active Access Group](/docs/levels/attaching-access-groups) on the **Access Groups** tab, so members of the level can open your protected content.

A warning icon stays beside the level's **Status** in the list until it has both a price visitors can buy and an active Access Group.
