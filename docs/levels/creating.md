---
title: "Creating a Level"
description: "Create a Membership Level by choosing how people get it, adding a first price, then finishing its setup."
---

# Creating a Level

A **Membership Level** is the plan or product that a visitor buys, joins for free, or that you assign by hand. Create a level, give it a price if it's paid, and attach the content it unlocks.

## Step 1: Create the level

Go to **Fluent Members → Membership Levels** and click **New membership**.

<!-- TODO(screenshot): creating-1
  screen: Fluent Members → Membership Levels
  state: list view with the New membership button visible
  data: a few existing levels
  highlight: the New membership button
  view: admin
  alt: Screenshot of the Membership Levels list with an arrow pointing to New membership
-->

Fill in the **New membership** dialog:

| Field | Notes |
|-------|-------|
| **Name** | The level's name. Required. |
| **How do people get it?** | Choose one card: **Free signup** (anyone can join, a free tier or lead magnet), **Paid** (once or on repeat), **Team** (Pro: one buyer, many seats, email invites) or **Assigned by you** (no public signup, you add members). |
| **Seats per team** (Team only) | The seat limit. The account owner counts as one seat, so the minimum is 2. Leave it empty for unlimited seats. |
| **Sold through** | Appears when your site has no selling provider set. Choose FluentCart, FluentForms, Paymattic, WooCommerce (Pro) or Native Payment (Pro). |
| **First price** or **Pricing** | Depends on how the level is sold. See below. |

<!-- TODO(screenshot): creating-2
  screen: New membership dialog
  state: Paid card selected, Name filled in, First price section showing a FluentCart product amount with Once, Monthly and Yearly buttons
  data: Name "Pro", amount 29, Monthly
  highlight: the four How do people get it? cards and the First price field
  view: admin
  alt: Screenshot of the New membership dialog with the four access cards and a first price
-->

> [!Note]
> **Team** shows a **Pro** badge and can't be selected without Fluent Members Pro. See [Corporate Memberships](/docs/levels/corporate-memberships).

### Choose how the level is sold

If you set one selling provider for the whole site in **Settings → Payment Settings**, every new paid level uses it and the dialog skips **Sold through**. The card then reads "Sold through" followed by that provider. See [Payment Settings](/docs/settings/payment-settings/).

Without a site-wide provider, pick one under **Sold through**. A provider row shows **Installed** or **Not Installed**. On the **Native Payment** row, click **Configure** to connect a gateway first. When you return from **Payment Settings**, your dialog is restored.

The pricing type cannot be changed after the level is created, so choose with care. A free level can be [converted to paid](/docs/levels/free-levels#convert-a-free-level-to-paid) once.

### Add the first price

What you see under **First price** depends on the provider:

- **FluentCart:** Enter an **Amount** and choose **Once**, **Monthly** or **Yearly**. Fluent Members creates a FluentCart product with the level's name and price, and links it. To use a product you already have, click **Use an existing product** and pick a variation that no other membership sells. Leave the amount empty to add prices later.
- **Native Payment** (Pro): Enter an **Amount** and choose **Once**, **Monthly** or **Yearly**. It is charged with Stripe or PayPal. Leave the amount empty to add prices later.
- **WooCommerce**, **FluentForms** or **Paymattic:** The dialog shows **Pricing · the next step**. After you create the level, its **Pricing** tab opens so you can link a product or payment form.
- **Free signup** and **Assigned by you** show no price section.

Click **Create membership**. The new level opens on its **Setup** tab, or on its **Pricing** tab when you still need to link a product or form.

## Step 2: Set up the level

The **Setup** tab shows summary cards for **Content Access**, **Pricing** and **Members**, with the **Level Information** form below them.

<!-- TODO(screenshot): creating-3
  screen: A level's Setup tab
  state: summary cards above the Level Information form, Unsaved changes bar visible with Save
  data: a paid level with a changed Description
  highlight: the Save button in the bar
  view: admin
  alt: Screenshot of the Setup tab with the unsaved changes bar and an arrow pointing to Save
-->

| Field | Notes |
|-------|-------|
| **Title** | Change it at any time. Required. |
| **Description** | Pricing shortcodes can show this to visitors. |
| **Maximum Members** (Pro) | Team levels only. The account owner counts as one seat, so the minimum is 2. Leave it empty for unlimited seats. |
| **Status** | **Active** (default) or **Inactive**. Pricing shortcodes skip inactive levels, and you can't assign members to them. |

When you change a field, a bar appears with **Cancel** and **Save**. Click **Save** to keep your changes.

If FluentCRM tag sync is on for the level, a **FluentCRM tag** line shows the synced tag and its state, with a **Manage in Settings** link.

> [!Note]
> If an older level has no pricing type yet, this form also asks for a **Pricing Type**. Choose one and save.

## Step 3: Finish the setup

A level can't be sold or unlock content until you finish these parts. A warning icon on the **Pricing** or **Content Access** tab shows what is missing.

1. **Add pricing.** Open the **Pricing** tab. For [Native Payment](/docs/levels/pricing-native) (Pro), click **Add Pricing** and set up plans. For a [paywall](/docs/levels/pricing-paywalls), link a product or form. A [free level](/docs/levels/free-levels) only needs an access length.
2. **Choose what it unlocks.** Use the [Content Access](/docs/levels/content-access) tab.
3. **Show it on your site.** Copy the shortcode from **More actions → Copy shortcode**, or from the row's three-dot menu in the list. Paste `[fluent_membership_level id="X"]` into your pricing page, replacing `X` with the level's ID. Visitors then see the level's pricing card. To show several levels in one grid, use `[fluent_membership_levels]`.

For a level you assign by hand, open the **Members** tab and use [Assign Members](/docs/levels/members-on-a-level). The dialog needs the level to have a plan.

Until a level has content and something to sell, its status badge in the list reads **No content yet** or **Not selling**.
