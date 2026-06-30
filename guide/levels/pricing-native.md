# Pricing: Native Payment

**Native Payment** is the built-in checkout in **Fluent Members Pro**. Visitors pay through Stripe directly on your site — no FluentCart, Fluent Forms, or other payment plugin required.

> [!Note]
> Native Payment needs **Fluent Members Pro** and a connected Stripe account. Without Pro, the **Native Payment** option may appear in the Pricing Type dropdown, but no payment methods will be available. Use [Pricing: Paywalls](/guide/levels/pricing-paywalls) instead, or complete [Stripe Setup (Pro)](/guide/settings/payment-settings/stripe-setup) first.


## Access the Pricing Tab

Log in to your WordPress admin, go to **Fluent Members → Levels**, open the level you want to sell, then click the **Pricing** tab. If no plan exists yet, you will see *"No pricing plan has been added yet"* and an **+ Add Pricing** button in the top right.

![Pricing tab, empty state](/images/levels/pricing-native/level-pricing-empty.webp)

## Step 1: Choose Native Payment

Click **+ Add Pricing**. In the **Add Pricing** modal, open the **Pricing Type** dropdown and select **Native Payment**.

- **Native Payment:** Built-in Stripe checkout (this guide).
- **Paywalls:** Sell through FluentCart, Fluent Forms, Paymattic, or WooCommerce (Pro).

![Pricing Type dropdown](/images/levels/pricing-native/add-pricing-2.webp)

## Step 2: Select Stripe

A **Payment Methods** card appears. Check the checkbox of **Stripe**.

If Stripe is not listed, connect it first under **Fluent Members → Settings → Payment Settings → Stripe**. Fluent Members Pro currently supports Stripe as the native payment gateway.

![Native Payment with Stripe selected](/images/levels/pricing-native/payment-3.webp)

## Step 3: Create a Pricing Plan

Under **Pricing Packages**, click **+ Create Pricing Plan** and fill in the form:

| Field | Notes |
|-------|-------|
| **Title** | What buyers see on the pricing card (for example, `Monthly` or `Annual`). Required. |
| **Price Type** | How this plan charges. See the table below. Required. |
| **Interval** | For recurring or trial plans: Daily, Weekly, Monthly, or Yearly. |
| **Amount** | Price in your site currency (set in **Settings → General**). Required. |
| **Setup Fee** | Optional one-time fee added to the first payment. |
| **Trial Days** | Optional free-trial length before recurring billing starts. |

Click **Save** on the plan, then **Add** on the modal. You can add multiple plans to one level (for example, monthly and annual options).

![Create Pricing Plan form](/images/levels/pricing-native/level-pricing-native-create-plan-4.webp)

## Edit or Remove Pricing

Once a Native Payment plan exists, you can change or delete it from the **Pricing** tab using the **three-dot** menus.

### For Entire Native Payment Setup

Next to the **Native Payment** section header, click the **three-dot icon** on the right. A menu opens with two options:

- **Edit Pricing:** Opens the pricing setup so you can change payment methods or manage the overall Native Payment configuration.
- **Remove Pricing:** Deletes the entire Native Payment setup from this level, including all packages under it.

![Edit or remove Native Payment](/images/levels/pricing-native/edit-remove-native-payment-5.webp)

### For single pricing package

In the pricing table, each package row has its own **three-dot icon** in the **Action** column. Click it to open:

- **Edit:** Opens that package's form so you can update the title, price, price type, interval, setup fee, or trial days.
- **Delete:** Removes only that package from the level. Other packages on the same level are not affected.

::: warning Before you Delete
Removing a pricing package or the full Native Payment setup does not cancel existing member subscriptions automatically. Review active members on this level before deleting a plan they are currently using.
:::


![Edit or delete a pricing package](/images/levels/pricing-native/edit-remove-pricing-package-6.webp)


## Price Types

| Type | What it does | Example |
|------|----------------|---------|
| **Free** | No charge. The member joins after confirming. | Newsletter signup |
| **One-time** | Single payment, then access. | $99 course |
| **Subscription** | Recurring charge on the chosen interval until cancelled. | $19/month |
| **Lifetime** | Single payment with no expiry. | $499 lifetime VIP |
| **Trial** | Trial period, then converts to recurring billing. | 7 days free, then $19/month |

::: tip Subscription vs Lifetime
**Subscription** keeps charging on each billing cycle until the member cancels. **Lifetime** charges once and never bills again.
:::

## What Happens at Checkout

When a visitor clicks the buy button on your `[fluent_membership_level]` pricing card:

1. They are taken to the built-in checkout page (and prompted to log in or register if needed).
2. Stripe Elements collects card details on your site.
3. After payment confirms, the membership is activated and recorded in **Fluent Members → Transactions** (Pro).
4. The member appears in **Members** and on the level's **Members** tab.

## Important Notes

::: warning Before you go Live
- **Stripe must be connected** before the Stripe checkbox appears on the Pricing tab.
- **Webhook signing secret** must be saved in Stripe settings, or checkout can fail after payment.
- For trial behaviour, set **Price Type** to **Trial** — trial days on a **Subscription** plan alone may not behave as expected.
- A level still needs **Access Groups** attached, or members can pay but will not unlock protected content.
:::

Native Payment is set up. Next, [attach Access Groups](/guide/levels/attaching-access-groups) to the level so buyers can access your protected content.
