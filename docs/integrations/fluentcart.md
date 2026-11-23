---
title: "FluentCart"
description: "Sell membership levels through FluentCart products, manage prices from the product editor, and show memberships in the customer dashboard."
---

# FluentCart

The **FluentCart** integration sells a membership level through a FluentCart product and keeps the membership in step with the order or subscription. It adds a **Membership** card to the product editor and a **Membership** tab to the customer dashboard. Use it when FluentCart already runs your store. It works on the free plan.

You need FluentCart 2.3.0 or newer active on your site. With an older version, Fluent Members shows a notice asking you to update FluentCart and does not sell memberships through it.

## Choose FluentCart as your selling provider

Follow these steps to sell through FluentCart:

1. Go to **Fluent Members → Settings → Payment Settings**.
2. Under **How you sell memberships**, choose **FluentCart**, then click **Save Settings**.

FluentCart handles checkout, coupons, tax and invoices. The level's **Pricing** tab now shows **Sold through** FluentCart. If you leave the provider unset, you choose how a level is sold each time you create one.

<!-- TODO(screenshot): fluentcart-1
  screen: Fluent Members → Settings → Payment Settings
  state: How you sell memberships card with FluentCart selected
  data: FluentCart active
  highlight: FluentCart card
  view: admin
  alt: Screenshot of the How you sell memberships card with FluentCart selected
-->

## Sell a level with a product

When you create a paid level that sells through FluentCart, the creation dialog asks for the first price. You can do either of these:

- Choose **Create a new product**, then enter the **Amount** and pick **Once**, **Monthly** or **Yearly**. Fluent Members creates the FluentCart product with the level's name and links it.
- Choose **Use an existing product** and pick a FluentCart product or variation that no other membership sells.

Leave the amount empty to add prices later.

<!-- TODO(screenshot): fluentcart-2
  screen: Fluent Members → Membership Levels → New membership dialog
  state: Paid selected with FluentCart as the provider, first price section visible
  data: a level named DOCTEST Plus
  highlight: Create a new product and Amount
  view: admin
  alt: Screenshot of the New membership dialog with the FluentCart first price fields
-->

### Add more prices

A level can have several prices, for example a monthly and a yearly variation.

1. Open the level in **Fluent Members → Membership Levels** and go to its **Pricing** tab.
2. Click **Add Pricing**.
3. In the **Add a price to** drawer, search for a product and choose a variation under **Pick a variation**. Each variation sells one membership.
4. Click **Link variation**.

A variation that already sells another level shows **Sells** followed by that level's name and cannot be picked. One that is already on this level shows **Already added**. Click **Create a new product in FluentCart** if the product does not exist yet.

The price, trial and renewals come from FluentCart. Change them on the product and the list updates.

<!-- TODO(screenshot): fluentcart-3
  screen: Fluent Members → Membership Levels → a FluentCart level → Pricing → Add Pricing
  state: the Add a price drawer open with the variation list
  data: two FluentCart products, one already linked to another level
  highlight: Link variation
  view: admin
  alt: Screenshot of the Add a price drawer listing FluentCart variations
-->

### Edit or remove a price

Open the three-dot menu on a price row for these choices:

- **Edit** opens the **Edit price** window.
- **Open in FluentCart** opens the product in FluentCart.
- **Remove** unlinks the price. The FluentCart product is not changed.

Use the move up and move down buttons on a row to set the order visitors see. A row can carry an **On sale** or **Expired** tag.

The **Edit price** window has these fields:

| Field | Notes |
|-------|-------|
| **Name shown to members** | The price name members see. Required. |
| **Access** | **Follows billing** keeps access while payments continue. **Lifetime** never ends. **A set time after purchase** ends after the **Access length** you enter, in days, weeks, months or years. **Until a fixed date** ends on the **Last day of access** for everyone. |

Changes to access apply to new purchases. Current members keep their end dates.

<!-- TODO(screenshot): fluentcart-4
  screen: Fluent Members → Membership Levels → a FluentCart level → Pricing → row menu → Edit
  state: Edit price window with the Access options visible
  data: a linked subscription variation
  highlight: Access
  view: admin
  alt: Screenshot of the Edit price window with the Access options
-->

## Manage prices from the product

The FluentCart product editor has a **Membership** tab, shown to administrators. Its **Membership access** card lists each variation of the product:

| Column | Notes |
|--------|-------|
| **Variation** | The variation of this product. |
| **Gives membership** | The level a purchase grants, or **No membership**. |
| **Access** | How long access lasts, with the same choices as **Edit price**. |
| **Selling** | On: buying this price gives the membership. Off: new purchases are refused at checkout, while current members keep access and their renewals continue. The product stays visible in your store. |

A price that members already hold is locked to its level, so turn **Selling** off to stop new sales instead. A product must be published before it can sell a membership. The tab lists only levels that sell through FluentCart, and **Create a level** takes you to make one. **Open Memberships in FluentMembers** opens the level list.

<!-- TODO(screenshot): fluentcart-5
  screen: FluentCart → Products → a product → Membership tab
  state: Membership access card with two variations, one giving a level
  data: a product with a monthly and a yearly variation linked to DOCTEST Plus
  highlight: Selling toggle
  view: admin
  alt: Screenshot of the Membership tab on a FluentCart product
-->

## What happens after a purchase

The membership follows the order and its subscription:

| In FluentCart | In Fluent Members |
|---------------|-------------------|
| Order is paid | The membership is created. A one-time purchase has no expiry date unless the price sets one, and a subscription runs until the next billing date. |
| Subscription is in a trial | The membership status is **Trial**. |
| Subscription renews | Access is extended to the new billing date. |
| Renewal payment fails | The member keeps access for a grace period of 3 days by default. A later successful payment clears it. |
| Subscription is paused | The membership is suspended, and restored when the subscription resumes. |
| Subscription is cancelled | The member keeps access until the date already paid for. If no paid time remains, the membership is cancelled. |
| Subscription is reactivated | Access is restored. |
| All installments are paid | The membership stays active with no expiry date. |
| Order is fully refunded or cancelled | The membership is cancelled. |

A partial refund does not change the membership. A member can cancel a FluentCart subscription from the membership portal, except a payment plan, which they must change with the store.

> [!Note]
> Cancelling the membership in Fluent Members does not cancel the FluentCart subscription. Cancel the subscription in FluentCart to stop billing.

The shared rules for buyers without an account and repeat purchases are in the [rules for every selling provider](/docs/integrations/). A cart that holds a price that is not on sale is refused at checkout with a message naming it.

## What customers and admins see

Customers see their memberships in several places:

- The FluentCart customer dashboard has a **Membership** tab with the same content as the [Member Portal](/docs/members/portal/what-members-see). It shows for customers who hold any membership.
- Order and subscription pages in the customer dashboard list the memberships they gave, with a **Manage your membership** link.
- The thank-you page and the order email show a **Membership** block with a **Start using your membership** link. The smart code <code v-pre>{{order.memberships}}</code> adds the same block to your own FluentCart templates.

In the FluentCart admin, an order shows **Memberships from this order**, a customer shows **Memberships**, and a subscription shows **Memberships billed by this subscription**. Each row links to the member in Fluent Members. FluentCart's order log records when a membership is granted, changed or renewed.

<!-- TODO(screenshot): fluentcart-6
  screen: FluentCart → Orders → an order that granted a membership
  state: the Memberships from this order widget in the order sidebar
  data: a paid order for a linked variation
  highlight: Open member
  view: admin
  alt: Screenshot of the Memberships from this order widget on a FluentCart order
-->

## Remove levels with a product feed

A product feed takes a level away from a customer when a FluentCart event runs. Use it, for example, when buying an upgrade product should end a free level.

1. Open the product in FluentCart and go to its **Integrations** tab.
2. Click **Add Integration** and choose **FluentMembers**.
3. Enter a **Title**, then pick the levels in **Remove from level**.
4. Choose the FluentCart events that run the feed, then save.

The feed cancels only memberships the customer holds as free, assigned by an admin or a one-time FluentCart purchase. A membership billed by a live subscription is never removed this way, and neither is the one the same order just gave. A feed runs only for customers with a WordPress account.

## Restrict products to members

Add FluentCart products to a level's protected content and only members can view and buy them. On the level's **Content Access** tab, click **Add content**, open **Products** and choose a rule from **FluentCart Products**:

- **All Products**
- **All Digital Products**
- **All Physical Products**
- **Specific Products/Categories/Brands etc.**
- **All Product Categories**
- **All Product Brands**

The [Content Access tab](/docs/levels/content-access) explains how rules and bundles work.

Visitors without access cannot buy a restricted product. Adding it is refused with "This product is restricted. Please check membership requirements." A restricted product already in the cart is refused at checkout with a message that names it. The product page and a restricted shop page show your restricted content message instead. A product that sells a level is never blocked, so visitors can always buy their way in.
