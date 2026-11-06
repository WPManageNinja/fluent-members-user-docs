---
title: "Guided Setup and Quick Start"
description: "Follow the four steps of the Fluent Members guided setup to create your first level, connect payment, protect content and set up your pages."
---

# Guided Setup and Quick Start

The **guided setup** creates your first membership in four steps: a level, how it is paid for, what it protects, and the pages your members use. It opens by itself the first time you open **FluentMembers** on a new install.

Before you start on the free plugin, install FluentCart, Fluent Forms or Paymattic. A level needs one of them, or Pro, to take payment.

You move through the steps with the buttons at the bottom of the screen:

- **Next Step** saves the step and moves on.
- **Go Back** returns to the previous step.
- **Skip All** jumps to the last step, **Set Up Pages**.

If you leave and come back in the same browser, the setup picks up where you stopped.

## Step 1: Create a membership

The first screen is **Welcome to FluentMembers**. Fill in **Create a Membership**:

- **Membership Title** (required): the name members see, such as `Premium Membership`. You can rename it later.
- **Type:** **Individual** (default) is for one person. **Corporate** (Pro) is a multi-seat plan for teams.
- **Maximum Members** (Pro): appears for **Corporate**. It includes the account owner, so it must be at least 2. Leave it empty for unlimited seats.
- **Pricing Type** (required): how the level is paid for.

![Screenshot of step 1 of the guided setup with the Membership Title, Type and Pricing Type fields](/images/getting-started/quick-start/quick-start-step-1.webp)

Open **Pricing Type** to see your choices. Each plugin shows **Installed** or **Not Installed**.

![Screenshot of the Pricing Type list with FluentCart, FluentForms, Paymattic, WooCommerce and Native Payment](/images/getting-started/quick-start/quick-start-pricing-type.webp)

- **FluentCart**, **FluentForms** and **Paymattic:** sell through that plugin.
- **WooCommerce** (Pro): sell through a WooCommerce product.
- **Native Payment** (Pro): sell with the built-in Stripe or PayPal checkout.

> [!Note]
> **Type** and **Pricing Type** cannot be changed after you create the level. Choose carefully.

If **Native Payment** has no gateway ready yet, click **Configure** on its row to open **Connect a Payment Gateway**. Pick a mode, connect your account and click the **Enable Payments** button. You return to this step when the connection is done.

<!-- TODO(screenshot): quick-start-1
  screen: Guided setup step 1, Pricing Type, Native Payment, Configure
  state: Connect a Payment Gateway dialog open
  data: Stripe and PayPal not connected
  highlight: -
  view: admin
  alt: Screenshot of the Connect a Payment Gateway dialog with Stripe and PayPal cards
  reason: needs the develop build on the local site
-->

If nothing is available, a warning explains why and **Skip this step for now** appears at the bottom. You can create the level later from **Membership Levels**.

Click **Next Step**. This creates the level.

## Step 2: Set up payments

**Set Up Payments** shows the pricing type you chose, so what you fill in depends on it.

![Screenshot of step 2 of the guided setup with FluentCart selected, a product search and Create Pricing](/images/getting-started/quick-start/quick-start-step-2.webp)

- **FluentCart:** search for a product under **Search FluentCart Products**, or click **Create Pricing** to enter a **Title** and **Price**. That creates a one-time payment product. You can set up subscriptions later from the level's pricing page.
- **Fluent Forms** and **Paymattic:** search for a form. Only payment forms with a single fixed-price or recurring item are listed.
- **WooCommerce** (Pro): search for a product under **Search WooCommerce Products**.
- **Native Payment** (Pro): fill in **Create a Pricing Plan**. You can create one plan here, and add more later from the level's **Pricing** tab.

Click **Next Step**.

## Step 3: Protect your content

**Protect Your Content** creates an Access Group for your level. Under **1st Rule**, pick what to protect from **Select Restriction Type**. Click **Add Another Rule** to add a second one. The guided setup stops at two, and you can add more later.

![Screenshot of step 3 of the guided setup with the rule picker and the Unauthorized Access fields](/images/getting-started/quick-start/quick-start-step-3.webp)

Under **Unauthorized Access**, choose what blocked visitors get from **Action for Unauthorized Users**:

- **Display a custom message** (default): shows your **Custom Message** with a button. **Button Text** and **Button URL** are required here.
- **Redirect to a specific URL:** sends them to your **Redirect URL**.

Leave the rule empty to skip this step. When you add a rule, Fluent Members names the group after your level, such as `Premium Membership Access`, and attaches it to the level.

Click **Next Step**.

## Step 4: Set up pages

**Set Up Pages** connects the pages your members use, and your currency. Each page saves as soon as you pick it.

![Screenshot of step 4 of the guided setup with the Member Portal Page, Pricing Page and Select Currency fields](/images/getting-started/quick-start/quick-start-step-4.webp)

- **Member Portal Page:** where members manage their memberships. Select a page or click **+** to create one. The page needs the `[fluent_member_portal]` shortcode.
- **Pricing Page:** where visitors see your levels. Select a page or click **+** to create one. The page needs the `[fluent_membership_levels]` shortcode.
- **Select Currency:** the currency for new prices. The default is **United States Dollar (USD)**.

Click **Complete Setup**.

## Check the summary

A dialog lists what you set up, with **Completed** or **Skipped** beside each row. It reads **You're All Set!** when everything is done, and **Almost There!** when something is left.

![Screenshot of the Almost There dialog listing Membership Level, Content Protection, Payment, Member Portal Page and Pricing Page](/images/getting-started/quick-start/quick-start-completion.webp)

Click **Go To Dashboard**. The guided setup does not run again.

## Finish what you skipped

Until every item is done, the **Dashboard** shows a **Getting Started** card with **Setup Pages**, **Add Access Group**, **Add Membership Level** and **Setup Payment**. Click an item to go to its screen. You can also go straight to each guide:

- [Create a level](/docs/levels/creating)
- [Price with paywalls](/docs/levels/pricing-paywalls) or [Price with native payments](/docs/levels/pricing-native) (Pro)
- [Access groups overview](/docs/access-groups/)
- [Set up the portal](/docs/members/portal/setup) and [Pricing page](/docs/selling/pricing-page)

## Test as a visitor

Administrators skip all protection, so your own account always sees everything. Open a protected page in a private window while logged out. You should see your message or be redirected, and your pricing page should show your level.
