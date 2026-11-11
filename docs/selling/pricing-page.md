---
title: "Pricing Page"
description: "Create a page that lists your membership levels and their plans, so visitors can choose one and go to checkout."
---

# Pricing Page

A **pricing page** lists your membership levels and their plans, with a button on each plan that starts the purchase. Create one when your levels and pricing are ready, so visitors have a place to choose a plan.

You need at least one active level with a plan on its **Pricing** tab. See [Price with native payments](/docs/levels/pricing-native) or [Price with paywalls](/docs/levels/pricing-paywalls).

## Create the page

The quickest way is from General Settings:

1. Go to **Fluent Members → Settings → General Settings** and find **Generate Pricing Page**.
2. Click the **+** button next to the page field.
3. Enter a **Page Name** in the **Create Pricing Page** dialog and click **Create Page**.

Fluent Members publishes the page with the `[fluent_membership_levels]` shortcode and selects it in the field. If a pricing page is already set, it refuses with "Pricing page already exists."

![Screenshot of the Generate Pricing Page row with a page selected, the shortcode, and the Edit and View links](/images/selling/pricing-page/pricing-page-generate-row.webp)


If you have already built a sales page, select it from the dropdown field in **General Settings** and click **Save Settings**. You will then need to manually add the shortcode or block to that page. Use the **Edit** or **View** links below the field to quickly open it.

## What visitors see

The page displays each level as a dedicated section containing its title and description, followed by individual pricing cards for each plan.

Each plan card displays:

- The plan name and the level title (if different).
- The price and billing interval (e.g., "$9.00 Monthly").   
- Any setup fees or free trial periods.
- A purchase button that routes the visitor to your connected provider's checkout.

![Screenshot of a pricing page with Starter and Pro sections](/images/selling/pricing-page/pricing-page-cards.webp)

The level name also appears on a card when the plan name differs from it and the level title is not already shown above the card.

The button depends on the level and the visitor:

- **Choose plan:** Shown to logged-in members, and to visitors when the level can be bought as a guest. It opens the [checkout](/docs/selling/checkout) for native plans, or the purchase page of the plugin that sells a paywall plan.
- **Login to Purchase:** Shown to logged-out visitors when the level cannot be bought as a guest. It sends them to the login page and back.

Plans appear in the order you set on the level's **Pricing** tab.

> [!Note]
> A level without an active, purchasable plan will be hidden from the page automatically. Administrators will see a placeholder note explaining why it is hidden, while standard visitors will see nothing. If a native plan is missing, check your [Payment Settings](/docs/settings/payment-settings/) to ensure your gateway is properly connected.


## Customizing the Display (Shortcode Attributes)

You can modify the `[fluent_membership_levels]` shortcode to change the layout and text.

Example: `[fluent_membership_levels ids="2,3" columns="2" button_text="Join now"]`

| Attribute | Default | What it does |
|---|---|---|
| `ids` | All active levels | Comma-separated level IDs to show, in that order. Inactive levels are skipped. |
| `columns` | `3` | Plan cards per row, from 1 to 4. |
| `button_text` | Choose plan | Text of the button that starts the purchase. |
| `login_text` | Login to Purchase | Text of the button that asks visitors to log in. |
| `show_title` | `1` | Set to `0` to hide the level titles. |
| `show_description` | `1` | Set to `0` to hide the level descriptions. |
| `show_level_name` | Automatic | Set to `1` to always show the level name on plan cards, or `0` to never show it. |
| `show_unavailable` | `0` | Set to `1` to show a level with no plans, with the message "No plans are available for this membership level." |

For example, this shows two levels with a custom button:

```
[fluent_membership_levels ids="2,3" columns="2" button_text="Join now"]
```

Without `ids`, the page shows up to 20 levels. The level ID is in the **ID** column on **Fluent Members → Membership Levels**.

## Show a single level

Use `[fluent_membership_level id="10"]` to show the plans of one level anywhere on your site, such as on a sales page. It has no section heading, and it accepts `show_unavailable` as well. Its buttons always use the default text.

## Use the block instead

The **Membership Levels** block adds the same cards in the block editor, with the same choices in the block settings. See the [Membership Levels block](/docs/access-groups/gutenberg-block/membership-levels-block) for each option.

<!-- TODO(screenshot): pricing-page-1
  screen: Block editor on a page with the Membership Levels block selected
  state: Block settings sidebar with the Display panel open, showing Show level title, Show level description and Show level name in plan cards
  data: Starter and Pro levels selected
  highlight: Show level name in plan cards
  view: admin
  alt: Screenshot of the Membership Levels block settings with the Display panel open
  reason: needs the develop build on the local site
-->

Next, set up the [checkout](/docs/selling/checkout) your **Choose plan** buttons lead to.
