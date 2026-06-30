# Pricing: Paywalls

A **Paywall** connects a **Membership Level** to an existing product or payment form in another plugin. The buyer pays through that plugin's checkout; **Fluent Members** grants the level when payment completes.

Use **Paywalls** when you already sell through FluentCart, Fluent Forms, Paymattic, or WooCommerce (Pro). Use [Pricing: Native Payment](/guide/levels/pricing-native) when you want built-in Stripe checkout inside Fluent Members Pro.

## Access the Pricing Tab

Log in to your WordPress admin, go to **Fluent Members → Levels**, open the level you want to sell, then click the **Pricing** tab. If no plan exists yet, you will see *"No pricing plan has been added yet"*. Click **+ Add Pricing** in the top right.

![Pricing tab, empty state](/images/levels/pricing-paywalls/level-pricing-empty.webp)

## Step 1: Choose Paywalls

In the **Add Pricing** modal, open the **Pricing Type** dropdown and select **Paywalls**.

- **Paywalls:** Sell through a connected payment plugin (this guide).
- **Native Payment:** Built-in Stripe checkout in Fluent Members Pro.

Click **Add** after you select a product in Step 2.

![Choose Paywalls in the Add Pricing modal](/images/levels/pricing-paywalls/level-pricing-type-dropdown-2.webp)

## Step 2: Select a Product or Form

With **Paywalls** selected, click **Select Pricing** and search or browse the grouped list. Items come from each active host plugin:

| Group | What appears |
|-------|----------------|
| **FluentCart Products** | FluentCart products linked to your store |
| **Fluent Forms** | Payment forms with one fixed-price item |
| **Paymattic** | Paymattic forms with one fixed-price item |
| **WooCommerce** *(Pro)* | WooCommerce products with a single fixed price |

Pick the product or form you want (for example, a FluentCart product), then click **Add** at the bottom of the modal.

::: warning Only simple paywalls are supported
Only payment forms with a **single fixed-price or subscription item** appear in the list. Products or forms with custom amounts, donation fields, or multiple pricing options inside one form are not supported. Create a dedicated product or form for this level instead.
:::

![Select a FluentCart product in the Paywalls modal](/images/levels/pricing-paywalls/level-pricing-paywalls-typeahead-3.webp)

## Step 3: Review Linked Products

After you save, the **Pricing Plan** card lists each linked product as its own row with a thumbnail, title, and price. You can add more than one paywall to the same level by clicking **+ Add Pricing** again.

### Manage a Linked Product

Each product row has a **three-dot icon** on the right. Click it to open:

- **View Product:** Open the linked product in the host plugin.
- **Edit Product:** Change which product or form is linked to this paywall row.
- **Delete Product:** Remove this paywall from the level.

![View, edit, or delete a linked product](/images/levels/pricing-paywalls/edit-product-4.webp)

### Direct Checkout

On any linked product row, the **three-dot** menu also includes **Direct Checkout**. Use this to open or copy the checkout link for that specific product so visitors can buy without going through the membership shortcode first.

![Direct Checkout option on a paywall row](/images/levels/pricing-paywalls/direct-checkout-5.webp)

::: warning Before you delete
Removing a paywall does not cancel existing subscriptions in the host plugin. Check active members on this level before deleting a product they are currently using.
:::

## What Happens at Checkout

When a visitor clicks the buy button on your `[fluent_membership_level]` pricing card:

1. They are sent to the host plugin's checkout (FluentCart cart, Fluent Forms form, Paymattic form, or WooCommerce checkout).
2. They pay using the gateway configured in that plugin (Stripe, PayPal, etc.).
3. The host plugin fires a payment-completed event.
4. **Fluent Members** matches the product or form to the linked level and activates the membership.

## Paywalls vs Native Payment

| | **Paywalls** | **Native Payment** |
|---|---|---|
| Requires Pro | No (WooCommerce paywalls need Pro) | Yes |
| Checkout location | Host plugin | Built into Fluent Members |
| Best for | Sites already using FluentCart, Forms, Paymattic, or WooCommerce | One-tool Stripe checkout inside Fluent Members |


Your paywall is set up. Next, [attach Access Groups](/guide/levels/attaching-access-groups) so members can access your protected content.
