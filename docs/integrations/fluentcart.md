---
title: "FluentCart"
description: "Sell membership levels through FluentCart products, restrict products to members, and show memberships in the customer dashboard."
---

# FluentCart

The **FluentCart** integration sells a membership level through a FluentCart product and keeps the membership in step with the order or subscription. It also restricts products to members and adds a **Membership** tab to the customer dashboard. Use it when FluentCart already runs your store. It works on the free plan.

You need FluentCart active on your site.

## Sell a level with a product

Follow these steps to connect a product to a level:

1. Go to **Fluent Members → Membership Levels** and click **Create Membership Level**.
2. In **Pricing Type**, choose **FluentCart**, then finish creating the level.

    ![Screenshot of the Pricing Type list with FluentCart as an option](/images/integrations/fluentcart/fluentcart-pricing-type.webp)

3. Open the level's **Pricing** tab and click **Add Pricing**.

    ![Screenshot of the Add Pricing window with the Select Pricing field and the Create Pricing button](/images/integrations/fluentcart/fluentcart-add-pricing.webp)

4. Choose a product in **Select Pricing**, or create one as described below.
5. Click **Add**.

The list shows published FluentCart products. A product can belong to one level only. If it already sells another level, you see "This product already sells" followed by that level's name.

### Create a product from the level

Click **Create Pricing** to create a product without leaving the level. Enter a **Title** and a **Price**, then click **Add**.

![Screenshot of the Create Pricing form with a title and a price filled in](/images/integrations/fluentcart/fluentcart-create-pricing.webp)

This creates a one-time payment product. To sell a subscription, open the three-dot menu on the product's row in the **Pricing** tab, click **Edit**, and set up the subscription on the product in FluentCart. Click **Select an existing product** to return to the list.

## What happens after a purchase

The membership follows the order and its subscription:

| In FluentCart | In Fluent Members |
|---------------|-------------------|
| Order is paid | The membership is created. A one-time purchase has no expiry date, and a subscription runs until the next billing date. |
| Subscription is in a trial | The membership status is **Trial**. |
| Subscription renews | Access is extended to the new billing date. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription is reactivated | Access is restored. |
| All installments are paid | The membership stays active with no expiry date. |
| Order is fully refunded or cancelled | The membership is cancelled. |

A partial refund does not change the membership. Refunding a renewal order in full cancels the membership.

> [!Note]
> Cancelling the membership in Fluent Members does not cancel the FluentCart subscription. Cancel the subscription in FluentCart to stop billing.

Logged-out buyers and repeat purchases follow the [rules for every paywall](/docs/integrations/).

## Assign levels with a product feed

A product feed adds or removes levels from the FluentCart side. Use it when a product should give a level as well as what it already sells, for example a level included with a physical product. The level does not need the FluentCart pricing type.

1. Open the product in FluentCart and go to its **Integrations** tab.
2. Click **Add Integration** and choose **FluentMembers**.
3. Fill in the fields below, then click **Create Fluent Members Feed**.

![Screenshot of the Fluent Members feed form with its level and trigger fields](/images/integrations/fluentcart/fluentcart-feed.webp)

The form has these fields:

| Field | Notes |
|-------|-------|
| **Enable this Integration** | Turns the feed on or off. On by default. |
| **Title** | The name shown in the product's feed list. |
| **Add to levels** | Levels the customer joins when the feed runs. |
| **Remove from level** | Levels cancelled for the customer when the feed runs. |
| **Remove from selected level on Refund or Subscription Access Expiration** | Cancels the levels this order gave when access ends. On by default. |
| **Event Trigger** | The FluentCart events that run the feed, such as **Order Paid (Payment / Subscription)**. |
| **Run on Selected Variations Only** | Limits the feed to chosen variations. Leave it empty for all variations. |

A feed runs only for customers linked to a WordPress account. To sell to visitors without an account, use the paywall above.

## Restrict products to members

Access Groups can protect FluentCart products. Add a rule from the **FluentCart Products** group in an Access Group:

- **All Products**
- **All Digital Products**
- **All Physical Products**
- **Specific Products/Categories/Brands etc.**
- **All Product Categories**
- **All Product Brands**

[Protected content](/docs/access-groups/protected-content) explains how rules work.

Visitors without access cannot buy a restricted product. Adding it is refused with "This product is restricted. Please check membership requirements." A restricted product already in the cart is refused at checkout, with a message that names it. The product page and a restricted shop page show your [unauthorized access](/docs/access-groups/unauthorized-access) response instead. A product that sells a level is never blocked by these rules, so visitors can always buy their way in. Administrators are not restricted.

### Restrict from the product editor

The product editor has a **Membership Restriction** card, so you can restrict one product without leaving FluentCart.

![Screenshot of the Membership Restriction card with the list of access groups open](/images/integrations/fluentcart/fluentcart-membership-restriction.webp)

Select one or more Access Groups in the card. Each change saves immediately. Each group shows the levels it belongs to, and **View** opens it. **Manage Access Groups** opens the Access Groups screen.

The card only manages the specific products list. A product restricted by a broader rule, such as a category or a site-wide rule, shows as read-only, and you change that rule in the Access Group. Only administrators see the card.

## The Membership tab for customers

The FluentCart customer dashboard gets a **Membership** tab. It shows the same content as the [Member Portal](/docs/members/portal/what-members-see), so customers manage their memberships in the same place as their orders.

![Screenshot of the Membership tab in the FluentCart customer dashboard](/images/integrations/fluentcart/fluentcart-account-membership.webp)
