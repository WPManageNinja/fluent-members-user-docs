---
title: "Free Levels"
description: "Offer a Membership Level that anyone can join without paying, set how long access lasts, and convert it to paid later."
---

# Free Levels

A **Free level** is a Membership Level that people join without paying. Use it for a free tier, a lead magnet or a members-only area that needs a sign-up but no checkout.

A free level has no pricing plans and no payment plugin. It still unlocks whatever you attach on its [Content Access](/docs/levels/content-access) tab.

## Create a free level

1. Go to **Fluent Members → Membership Levels** and click **New membership**.
2. Enter a **Name**.
3. Under **How do people get it?**, choose **Free signup**. Its description reads "Anyone can join. A free tier or lead magnet."
4. Click **Create membership**.

![Screenshot of the New membership dialog with Free signup selected](/images/levels/free-levels/free-levels-1.webp)

> [!Note]
> **Team** levels cannot be free. A free level is for one person, so the pricing type of a corporate level can't be set to **Free**.

You can also pick **Free** from the **Pricing Type** list when a level has no pricing type yet. Once a level is free, its pricing type is fixed until you [convert it to paid](#convert-a-free-level-to-paid).

## Choose how long access lasts

Open the level and click its **Pricing** tab. A free level shows **Anyone can join this level without paying, so it has no pricing plans.** and an **Access length** choice:

| Option | What happens |
|--------|--------------|
| **Lifetime** | Access lasts until the member leaves. This is the default. |
| **Fixed length** | Access ends after a set time. Enter the length in **Access ends after** and pick **Days**, **Weeks**, **Months** or **Years**. |
| **Until a fixed date** | Access ends on the same date for everyone. Pick the **Last day of access**. |

Click **Save** in the bar that appears. Changes apply to new joins only. Current members keep their end dates.

![Screenshot of the Pricing tab of a free level with the Access length options](/images/levels/free-levels/free-levels-2.webp)

A fixed-length or fixed-date free level can be joined once per account. A returning member sees "This free membership can only be joined once per account."

## How visitors join

Add the level to your pricing page with its shortcode, as you would a paid level. See [Pricing Page](/docs/selling/pricing-page) and Shortcodes.

- A free level's card shows a **Join for free** button. The default button text for a visitor who isn't logged in is **Log In to Join**.
- Clicking **Join for free** gives a logged-in visitor the membership straight away, with no checkout.
- The join also accepts a name and email from a visitor without an account when guest checkout is on for your site. Otherwise the visitor is asked to log in ("Please log in to join this membership.").
- Pricing shortcodes skip a level whose **Status** is **Inactive**.

In **Fluent Members → Membership Levels**, a free level shows a **Free signup** chip in the **Prices** column and **Free · Lifetime** (or its length) under its name. Its status badge reads **Open** once it protects content, or **No content yet** until you add some.

## Convert a free level to paid

Convert a level when you want to start charging for it.

1. Open the level and click its **Pricing** tab.
2. Click **Convert to paid**.
3. Choose a **Pricing Type** in the dialog. Only types you can use now are listed. If none is available, install FluentCart, FluentForms or Paymattic, or use Fluent Members Pro with a connected payment gateway.
4. Click **Convert to paid**.

![Screenshot of the Convert to paid dialog](/images/levels/free-levels/free-levels-3.webp)

The dialog tells you what happens:

- Current members keep their free access.
- New members have to pay. This can't be undone, so a level can't go back to free.
- The level is hidden from pricing tables until you add a price or paywall. Add one on the **Pricing** tab, using [Native Payment](/docs/levels/pricing-native) or a [paywall](/docs/levels/pricing-paywalls).

## Free tier in onboarding

The first-run setup can create a free level for you.

- On the get-paid step, **Free memberships only** skips payments for now. You can add paid prices to any membership later.
- On the **Your first membership** step, turn on **Also add a free tier** to create a second membership called **Free** that people can join at no cost. The switch is off and not needed when the first membership is already free.

<!-- TODO(screenshot): free-levels-4
  screen: Onboarding, Your first membership step
  state: Also add a free tier switch turned on, preview showing a Free plan with Join for free
  data: Membership name "All-Access Pass", a paid price
  highlight: the Also add a free tier switch
  view: admin
  alt: Screenshot of the onboarding membership step with Also add a free tier turned on
-->

## Free levels from other plugins

The migration tools import a zero-price level from another plugin as a Free level, with its length carried over. See the guides for [Paid Memberships Pro](/docs/settings/migration/from-paid-memberships-pro), [MemberPress](/docs/settings/migration/from-memberpress) and [Kadence Memberships](/docs/settings/migration/from-kadence-memberships). Members on those levels arrive as free members with their own end dates.

A zero-price level stays a paid level with an inactive zero price, instead of becoming a Free level, when it:

- is a group or corporate membership, or
- still has active billing subscriptions (MemberPress and Paid Memberships Pro), or live Stripe or PayPal billing (Kadence).

Length handling differs by source:

- **MemberPress:** A level that ends on a fixed date imports with no expiry for new members, and imported members keep their own end date. A length that can't be expressed also imports with no expiry.
- **Paid Memberships Pro:** A length in hours is rounded up to whole days.
- **Kadence Memberships:** An unrecognised length unit imports in months.

Each of these adjustments is logged in the migration warnings.
