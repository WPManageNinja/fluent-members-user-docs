# Native Payment Pricing

::: info Part of Chain 1: First-time site setup · step 7 of 10
**Previously:** [Creating a Level](/guide/levels/creating)
**Next:** [Access Groups Overview](/guide/access-groups/)

**Also part of:** Chain 2: Buy & onboard (step 1 of 6) · Chain 7: Recurring renewal (Pro) (step 1 of 4)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
**Native Payment** is the built-in checkout that Fluent Members Pro runs through Stripe. Without Pro, the Pricing Type dropdown still shows *Native Payment*, but no payment methods will be available, use [Paywalls](./pricing-paywalls) instead, or follow [Stripe Setup](/guide/settings/payment-settings/stripe-setup) to connect Pro first.
:::

Native Payment is the simplest path to selling memberships: no second plugin, no extra checkout, money goes straight to your connected Stripe account.

**Here's what you'll learn:**
- How to open the **Add Pricing** modal for a Level.
- Every field on the *Native Payment* form.
- The five Price Types and when to use each.
- How a Native Payment Pricing Plan actually charges the buyer.

**Before we start:** You need a Level already created ([Creating a Level](./creating)) and Stripe connected ([Stripe Setup](/guide/settings/payment-settings/stripe-setup)).

---

## Step 1: Open the Pricing tab

1. **Fluent Members → Levels**.
2. Click the Level you want to sell.
3. Click the **Pricing** tab.

On a brand-new Level you'll see *"No pricing plan has been added yet"* and an **+ Add Pricing** button in the top-right.

![Pricing tab, empty state](/screenshots/level-pricing-empty.webp)

---

## Step 2: Pick Native Payment

Click **+ Add Pricing**. The **Add Pricing** modal opens with a **Pricing Type** dropdown that has two options:

- **Paywalls**: sell through FluentCart, Fluent Forms, or Paymattic. (See [Pricing, Paywalls](./pricing-paywalls).)
- **Native Payment**: the built-in path, what this page covers.

Pick **Native Payment**.

![Pricing Type dropdown](/screenshots/level-pricing-type-dropdown.webp)

---

## Step 3: Pick the Payment Method

A **Payment Methods** card appears with a checkbox for each gateway you've configured. Today that's just **Stripe** (assuming you've [connected it](/guide/settings/payment-settings/stripe-setup)).

Tick **Stripe**.

::: info Why only Stripe?
Fluent Members Pro 1.0.0 ships with a single native gateway, Stripe. More are planned. If Stripe doesn't appear here, the connection in Settings → Payment Settings → Stripe is missing.
:::

![Add Pricing, Native Payment, Stripe checked](/screenshots/level-pricing-native-stripe.webp)

---

## Step 4: Create a Pricing Plan

Under **Pricing Packages** click **+ Create Pricing Plan**. The plan form expands inline.

| Field | Notes |
|-------|-------|
| **Title** *(required)*    | What buyers see, *Monthly*, *Annual*, *Founders' Lifetime*. |
| **Price Type** *(required)*| What kind of charge this is. See the table below. |
| **Interval**             | For recurring/trial: `Daily`, `Weekly`, `Monthly`, `Yearly`. |
| **Amount** *(required)*  | A number, in your currency (set in Settings → General Settings). |
| **Setup Fee**            | A one-off charge added on top of the first payment. Optional. |
| **Trial Days**           | Free-trial length, in days, before recurring billing kicks in. Optional. |

![Create Pricing Plan form](/screenshots/level-pricing-native-create-plan.webp)

Click **Save** on the plan, then **Add** on the modal.

::: tip You can add many plans to one Level
Each Level can carry multiple Pricing Plans, e.g. a $19 monthly *and* a $149 annual. Buyers see both as buttons in the pricing card and pick which one suits them.
:::

---

## The five Price Types

| Type        | What it does                                                       | Example |
|-------------|---------------------------------------------------------------------|---------|
| `Free`      | No charge; member joins instantly after confirming.                | Newsletter signup. |
| `One-time`  | Single charge, then access. Set an expiry separately if needed.     | $99 course. |
| `Subscription` | Charges on each Interval until cancelled.                       | $19/month. |
| `Lifetime`  | Single charge, never expires.                                       | $499 lifetime VIP. |
| `Trial`     | Free or low-cost trial, then converts to a recurring schedule.      | $0 for 7 days, then $19/mo. |

::: tip In plain language
*Subscription* and *Lifetime* both look like one button, but `Subscription` keeps charging until the buyer cancels; `Lifetime` charges once and never again. Don't confuse the two, a customer who expected lifetime but got a monthly charge is a refund waiting to happen.
:::

---

## What happens when a buyer clicks Subscribe

1. They click the button rendered by `[fluent_membership_level id="N"]`.
2. They land on the built-in checkout page; if not logged in, they're prompted to sign in or register.
3. Stripe Elements collects card details directly on your site.
4. Payment confirms → an order row is recorded in **Fluent Members → Transactions** → the member is granted the Level.
5. The Welcome Email goes out (if enabled in [Email Configuration → Email Notifications](/guide/settings/email-configuration/email-notifications)).
6. The member shows up in **Members** and on the **Members on a Level** tab.

For the full money story see [🔒 Pro · Transactions List](/guide/transactions/) and [Refunds](/guide/transactions/refunds).

---

## A real example: Sara's two plans

Sara wants Pro Yoga sold two ways:

- **Monthly:** Subscription / Monthly / $19 / no trial / no setup fee.
- **Annual:** Subscription / Yearly / $149 / no trial / no setup fee.

Both attached to her existing *Pro Yoga* Level. On her pricing page, the shortcode renders two buy buttons; the buyer picks one.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Stripe checkbox is missing | Stripe isn't connected. | Follow [Stripe Setup](/guide/settings/payment-settings/stripe-setup). |
| Buyer sees a "Webhook secret is not configured" error | The webhook signing secret hasn't been pasted into Stripe settings. | Set the secret in Stripe Settings; see Stripe Setup. |
| Trial Days set but the trial doesn't activate | Price Type must be `Trial` (not `Subscription`) for the trial behaviour. | Change Price Type to `Trial`. |
| Currency mismatch on checkout | The Pricing Plan's amount is in your site currency, but the Stripe account's default is different. | Confirm currency in Settings → General Settings and your Stripe Dashboard. |

---

## What's next?

- **→ [Attaching Access Groups](./attaching-access-groups)**: make the Level actually unlock content.
- **→ [🔒 Pro · Transactions List](/guide/transactions/)**: where the money lands.

**Recommended reading:**
- [Pricing, Paywalls](./pricing-paywalls): if you'd rather sell through another plugin.
- [Stripe Setup](/guide/settings/payment-settings/stripe-setup): connect or troubleshoot Stripe.
- [Glossary](/reference/glossary): terms used here.
