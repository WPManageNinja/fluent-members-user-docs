---
title: "Pricing: Native Payment"
description: "Add recurring or one-time plans to a Native Payment level and manage them on the Pricing tab."
---

# Pricing: Native Payment

**Native Payment** (Pro) sells a level through a checkout built into your site, using Stripe or PayPal. Use it when you don't want a separate store or payment form plugin.

You need:

- **Fluent Members Pro** active.
- A level created with the **Native Payment** pricing type. See [Creating a Level](/docs/levels/creating).
- A connected gateway. See [Stripe Setup](/docs/settings/payment-settings/stripe-setup) or [PayPal Setup](/docs/settings/payment-settings/paypal-setup).

## Add a plan

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Pricing** tab.
2. Click **Add Pricing**.

    ![Screenshot of the Pricing tab with no plans and an arrow pointing to Add Pricing](/images/levels/pricing-native/pricing-native-empty.webp)

3. Fill in the plan under **Pricing Packages**.

    ![Screenshot of the Add Pricing modal with a plan form under Pricing Packages](/images/levels/pricing-native/pricing-native-add-dialog.webp)

4. Click **Add another plan** to offer another option, such as monthly and yearly, on the same level.
5. Click **Add**.

Each plan has these fields:

| Field | Notes |
|-------|-------|
| **Title** | The plan's name. Required. |
| **Price Type** | **Recurring** (default) bills on a schedule. **One-time** charges once. Required. |
| **Amount** | The price, which must be above zero. Required. |
| **Setup Fee** | Optional one-time fee charged at sign-up. |
| **Interval** | **Daily**, **Weekly**, **Monthly** or **Yearly** (default). Recurring plans only. |
| **Trial Days** | Optional free trial length. Recurring plans only. |

A **Payment Methods** section also appears when two or more gateways are connected. Choose the ones this plan accepts.

If you see **No Payment Method is configured.**, click **Configure** and connect a gateway first.

## Manage your plans

Each plan appears on the **Pricing** tab with its price and payment method icons.

![Screenshot of the Pricing tab listing the Pro Monthly and Pro Yearly plans](/images/levels/pricing-native/pricing-native-plan-rows.webp)

To change the display order, drag a plan by its handle and click **Save**. Or use **Move up** and **Move down** in the plan's menu, which also holds these options:

![Screenshot of a plan's menu open with Edit, Move down, Copy Checkout Link, Duplicate and Delete](/images/levels/pricing-native/pricing-native-row-menu.webp)

- **Edit:** Opens the **Edit Pricing Package** modal, where you can also choose the plan's **Payment Methods**.
- **Copy Checkout Link:** Copies a direct link to this plan's checkout.
- **Duplicate:** Creates a copy named `<title> - Duplicated(<id>)`.
- **Delete:** Removes the plan after you confirm.

![Screenshot of the Edit Pricing Package modal with the plan's fields and Payment Methods](/images/levels/pricing-native/pricing-native-edit-modal.webp)

> [!Note]
> You cannot delete a plan that members or subscriptions use.

Plans imported from another membership plugin show a **Migrated from** badge, such as **Migrated from MemberPress**. If your site's currency changes, older plans keep their currency and new plans use the new one. A notice on the tab tells you when this applies.

## What visitors see at checkout

When a visitor chooses a plan on your pricing page or opens its checkout link:

1. The built-in checkout opens with the plan's price.
2. The visitor pays through the connected gateway.
3. The membership starts, and the member appears on the level's [Members tab](/docs/levels/members-on-a-level) and under **Fluent Members → Billing**.

Next, [attach Access Groups](/docs/levels/attaching-access-groups) so buyers unlock your protected content.
