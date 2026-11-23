---
title: "WooCommerce (Pro)"
description: "Sell membership levels through WooCommerce products and subscriptions, restrict products to members, and show memberships in My Account."
---

# WooCommerce (Pro)

The **WooCommerce** integration (Pro) sells a membership level through a WooCommerce product and keeps the membership in step with the order or subscription. It also restricts products to members and adds a **Membership** tab to My Account. Use it when WooCommerce already runs your store.

You need WooCommerce 8.0 or newer and Fluent Members Pro active on your site. WooCommerce Subscriptions 5.0 or newer is needed only to sell recurring products. With older versions, Fluent Members asks you to update WooCommerce and does not sell through it. Without Pro, **WooCommerce** shows a Pro badge and cannot be selected.

## Choose WooCommerce as your selling provider

Follow these steps to sell through WooCommerce:

1. Go to **Fluent Members → Settings → Payment Settings**.
2. Under **How you sell memberships**, choose **WooCommerce**, then click **Save Settings**.

WooCommerce handles checkout, coupons, tax and invoices. The level's **Pricing** tab now shows **Sold through** WooCommerce.

<!-- TODO(screenshot): woocommerce-1
  screen: Fluent Members → Settings → Payment Settings
  state: How you sell memberships card with WooCommerce selected
  data: WooCommerce and Fluent Members Pro active
  highlight: WooCommerce card
  view: admin
  alt: Screenshot of the How you sell memberships card with WooCommerce selected
-->

## Add a price from a product

Each price on a level is one WooCommerce product or variation. Follow these steps to add one:

1. Go to **Fluent Members → Membership Levels**, open the level and go to its **Pricing** tab.
2. Click **Add Pricing**.
3. In the **Add a price to** drawer, search WooCommerce products and choose one under **Pick a variation**. Each variation sells one membership.
4. Click **Link variation**.

Simple products, subscription products and single variations can all be linked. A product or variation that already sells another level shows **Sells** followed by that level's name and cannot be picked. Click **Create a new product in WooCommerce** if the product does not exist yet.

The price, trial and renewals come from WooCommerce. Change them on the product and the list updates. If a linked product is unpublished or deleted, the **Pricing** tab warns you, and the price cannot be sold until you publish the product or remove the row.

<!-- TODO(screenshot): woocommerce-2
  screen: Fluent Members → Membership Levels → a WooCommerce level → Pricing → Add Pricing
  state: the Add a price drawer open with the WooCommerce product list
  data: a simple product and a subscription product, one already linked to another level
  highlight: Link variation
  view: admin
  alt: Screenshot of the Add a price drawer listing WooCommerce products
-->

### Edit or remove a price

Open the three-dot menu on a price row to **Edit**, **Open in WooCommerce** or **Remove**. Removing a price does not change the WooCommerce product. Use the move up and move down buttons to set the order visitors see.

The **Edit price** window has **Name shown to members** and **Access**. **Access** is **Follows billing**, **Lifetime**, **A set time after purchase** or **Until a fixed date**. Changes apply to new purchases, and current members keep their end dates.

## What happens after a purchase

The membership follows the order:

| In WooCommerce | In Fluent Members |
|----------------|-------------------|
| Order is paid and reaches **Processing** or **Completed** | The membership is created. |
| Cash on delivery order reaches **Processing** | Nothing yet. The membership is created when the order reaches **Completed**. |
| Order is cancelled, refunded or failed | The membership is cancelled. |
| Order is fully refunded | Its subscriptions are cancelled too. |

If you use WooCommerce Subscriptions, the membership follows the subscription as well:

| In WooCommerce Subscriptions | In Fluent Members |
|------------------------------|-------------------|
| Renewal payment completes | Access is extended. |
| Renewal payment fails, or the subscription goes on hold | The member keeps access for a grace period of 3 days by default. A later successful payment clears it. |
| Subscription is set to cancel at the end of the period | The member keeps access until that date. |
| Subscription is reactivated | Access is restored. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription expires | The membership is cancelled. |
| Renewal order is refunded | The membership is cancelled. |

A member can cancel a WooCommerce subscription from the membership portal when its payment method supports it. If it does not, the portal says to contact the store and leaves the membership unchanged. WooCommerce order notes record when a membership is granted, changed or renewed.

The shared rules for buyers without an account and repeat purchases are in the [rules for every selling provider](/docs/integrations/). Visitors can buy without an account only when your shop allows guest checkout.

> [!Note]
> Cancelling the membership in Fluent Members does not cancel the WooCommerce subscription. Cancel the subscription in WooCommerce to stop billing.

A cart that holds a price that is not on sale is refused with a message naming it.

## Instant checkout from the pricing page

When a logged-in visitor clicks the buy button for a WooCommerce plan, they go straight to checkout with only that product. Fluent Members saves whatever was in their cart and restores it when they reach the thank-you page or leave checkout.

## Restrict products to members

Add WooCommerce products to a level's protected content and only members can view and buy them. On the level's **Content Access** tab, click **Add content**, open **Products** and choose a rule from **WooCommerce Products**:

- **WC All Products**
- **WC All Product Categories Archive**
- **WC All Product Tags Archive**
- **WC All Product Brands Archive**
- **WC All Product Shipping Classes Archive**
- **Specific Products/Categories/Brands etc.**

The [Content Access tab](/docs/levels/content-access) explains how rules and bundles work.

Visitors without access cannot add a restricted product to the cart or buy it. Restricted products and variations are also hidden from shop listings, except products restricted only by **WC All Products**, which stay listed and are blocked on the product page. A product that sells a level is never blocked by these rules, so visitors can always buy their way in.

## The Membership tab in My Account

My Account gets a **Membership** tab, placed above **Log out**. It shows the same content as the [Member Portal](/docs/members/portal/what-members-see), so customers manage their memberships in the same place as their orders.
