---
title: "Pricing: Native Payment"
description: "Add recurring or one-time plans to a Native Payment level and manage them on the Pricing tab."
---

# Pricing: Native Payment

**Native Payment** (Pro) sells a membership level through a checkout built into your site, paid with Stripe or PayPal. You don't need a separate store or form plugin.

You need:

- **Fluent Members Pro** active.
- A level whose pricing type is **Native Payment**. See [Creating a Level](/docs/levels/creating).
- A connected gateway: [Stripe](/docs/settings/payment-settings/stripe-setup) or [PayPal](/docs/settings/payment-settings/paypal-setup). Test or live mode follows your site-wide switch. See [Test and Live Mode](/docs/getting-started/test-and-live-mode).

## Add plans

A level can have several plans, such as monthly and yearly. If you entered a price in the **New membership** dialog, that plan already exists. Add more like this:

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Pricing** tab.
2. Click **Add Pricing**. The **Add a price to** drawer opens.
3. Under **Payment Methods**, tick the methods checkout offers. The group shows only when more than one method is connected.
4. Fill in **Plan 1** under **Pricing Plans**.
5. Click **Add another plan** for each extra plan, such as a yearly option. The bin icon removes a draft plan.
6. Click **Add 1 plan**. The button counts your drafts, for example **Add 2 plans**.

![Screenshot of the Add a price drawer with a plan form under Pricing Plans](/images/levels/pricing-native/pricing-native-1.webp)

Each plan has these fields:

| Field | Notes |
|-------|-------|
| **Title** | The plan's name. Required. |
| **Price Type** | **Recurring** (default) bills on a schedule. **One-time** charges once. Required. |
| **Amount** | The price. Required. |
| **Setup Fee** | Optional one-time fee charged at sign-up. Enter `0` for none. |
| **Interval** | **Daily**, **Weekly**, **Monthly** or **Yearly** (default). Recurring plans only. |
| **Trial Days** | Optional free trial length. Enter `0` for no trial. Recurring plans only. |
| **Access** | One-time plans only. **Lifetime**, **A set time after purchase** (enter a length and **Days**, **Weeks**, **Months** or **Years**) or **Until a fixed date**. Recurring plans show **Follows billing**: access lasts while payments continue. |

If no gateway is connected, the drawer shows "No payment method is configured." with a **Configure Payments** button. Connect a gateway, then come back. If a gateway is connected but its webhook isn't verified, the drawer says so and links to finish it.

## Manage your plans

Each plan is a row on the **Pricing** tab. A row shows the plan's name, any setup fee or trial, its price such as `$29 / month`, and the Stripe or PayPal icons it accepts. An inactive plan looks dimmed.

![Screenshot of the Pricing tab listing two plans with a row menu open](/images/levels/pricing-native/pricing-native-2.webp)

To change the display order, click the up and down arrows beside a plan, then click **Save** in the bar that appears (or **Cancel**). The row's three-dot menu holds these options:

- **Edit:** Opens the **Edit pricing plan** drawer. It has **Plan details** (the fields above) and the plan's **Payment Methods**. Click **Save** to keep your changes.
- **Copy Checkout Link:** Copies a direct link to this plan's checkout.
- **Duplicate:** Creates a copy named `<title> - Duplicated(<id>)`. The copy is inactive, so buyers can't choose it.
- **Delete:** Removes the plan after you confirm.

You cannot delete a plan that members, orders or subscriptions use. The message lists what uses it.

Plans imported from another membership plugin show a **Migrated from** badge, such as **Migrated from MemberPress**. If your site's currency changes, older plans keep their own currency and new plans use the new one. A notice on the tab tells you when this applies.

## What visitors see at checkout

When a visitor chooses a plan on your pricing page or opens its checkout link:

1. The built-in checkout opens with the plan's price.
2. The visitor pays through the connected gateway.
3. The membership starts, and the member appears on the level's [Members tab](/docs/levels/members-on-a-level) and under **Fluent Members → Billing**.

Next, choose what buyers unlock on the level's [Content Access](/docs/levels/content-access) tab.
