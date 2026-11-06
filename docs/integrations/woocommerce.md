---
title: "WooCommerce (Pro)"
description: "Sell membership levels through WooCommerce products, restrict products to members, and show memberships in My Account."
---

# WooCommerce (Pro)

The **WooCommerce** integration (Pro) sells a membership level through a WooCommerce product and keeps the membership in step with the order. It also restricts products to members and adds a **Membership** tab to My Account. Use it when WooCommerce already runs your store.

You need WooCommerce and Fluent Members Pro active on your site. Without Pro, **WooCommerce** shows a Pro badge in the **Pricing Type** list and cannot be selected.

## Sell a level with a product

Follow these steps to connect a product to a level:

1. Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.
2. In **Pricing Type**, choose **WooCommerce**, then finish creating the level.

    ![Screenshot of the Pricing Type list with WooCommerce as an option](/images/integrations/woocommerce/woocommerce-pricing-type.webp)

3. Open the level's **Pricing** tab and click **Add Pricing**.

    ![Screenshot of the Add Pricing window listing WooCommerce products](/images/integrations/woocommerce/woocommerce-add-pricing.webp)

4. Choose a product under **WooCommerce Products** in **Select Pricing**, then click **Add**.

If you have no product yet, click **Create a product in WooCommerce**.

A product can belong to one level only. If it already sells another level, you see "This product already sells" followed by that level's name. Connect the whole product: a single variation cannot be sold as its own paywall.

## What happens after a purchase

The membership follows the order:

| In WooCommerce | In Fluent Members |
|----------------|-------------------|
| Order is paid and reaches **Processing** or **Completed** | The membership is created. |
| Cash on delivery order reaches **Processing** | Nothing yet. The membership is created when the order reaches **Completed**. |
| Order is cancelled, refunded or failed | The membership is cancelled. |

If you use WooCommerce Subscriptions, the membership follows the subscription too:

| In WooCommerce Subscriptions | In Fluent Members |
|------------------------------|-------------------|
| Renewal payment completes | Access is extended. |
| Subscription is reactivated | Access is restored. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription expires | The membership is cancelled. |
| Renewal order is refunded | The membership is cancelled. |

Logged-out buyers and repeat purchases follow the [rules for every paywall](/docs/integrations/). Visitors can buy without an account only when your shop allows guest checkout.

> [!Note]
> Cancelling the membership in Fluent Members does not cancel the WooCommerce subscription. Cancel the subscription in WooCommerce to stop billing.

## Instant checkout from the pricing page

When a logged-in visitor clicks the buy button for a WooCommerce plan, they go straight to checkout with only that product. Fluent Members saves whatever was in their cart and restores it when they reach the thank-you page or leave checkout.

## Restrict products to members

Access Groups can protect WooCommerce products. Add a rule from the **WooCommerce Products** group in an Access Group:

- **WC All Products**
- **WC All Product Categories Archive**
- **WC All Product Tags Archive**
- **WC All Product Brands Archive**
- **WC All Product Shipping Classes Archive**
- **Specific Products/Categories/Brands etc.**

[Protected content](/docs/access-groups/protected-content) explains how rules work.

Visitors without access cannot add a restricted product to the cart or buy it. Restricted products and variations are also hidden from shop listings, except products restricted only by **WC All Products**, which stay listed and are blocked on the product page. A product that sells a level is never blocked by these rules, so visitors can always buy their way in. Administrators are not restricted.

## The Membership tab in My Account

My Account gets a **Membership** tab, placed above **Log out**. It shows the same content as the [Member Portal](/docs/members/portal/what-members-see), so customers manage their memberships in the same place as their orders.

![Screenshot of the Membership tab in WooCommerce My Account](/images/integrations/woocommerce/woocommerce-account-membership.webp)
