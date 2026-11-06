---
title: "General Settings"
description: "Choose which content stays public, set your member portal and pricing pages, and pick the default currency for new prices."
---

# General Settings

**General Settings** holds the site-wide options for your membership site: which content always stays public, which pages serve as the member portal and pricing page, and the default currency for new prices.

## Open General Settings

Click the **Settings** gear in the top-right corner of any Fluent Members screen. **General Settings** opens first.

![Screenshot of the General Settings screen with Exclude Content from Restriction, Generate Portal Page, Generate Pricing Page and Select Currency, and an arrow pointing to Save Settings](/images/settings/general-settings/general-settings-overview.webp)

## Exclude Content from Restriction

Content you add here is public and no Access Group restricts it. Use it for pages that must stay open, such as your Home, Contact or Privacy Policy page.

Type at least one character, then pick from the results. The search covers posts, pages, categories and tags, plus WooCommerce or FluentCart products and product terms.

Adding a category or tag makes every post in it public.

> [!Note]
> This setting does not lift a restriction placed on a block inside a page. Blocks follow their own access check, so a restricted block stays restricted on an excluded page.

## Generate Portal Page

This is the page where members manage their memberships, view account details and access member content.

- **Use an existing page:** Pick it from the dropdown. The page needs the `[fluent_member_portal]` shortcode. Click the shortcode to copy it.
- **Create a page:** Click **+**, enter a **Page Name** in the **Create Portal Page** dialog, and click **Create Page**. Fluent Members publishes the page and selects it. If a published portal page is already set, the dialog selects that page instead of making a second one.

**Edit** and **View** open the selected page. See [portal setup](/docs/members/portal/setup) for what happens next.

## Generate Pricing Page

This page displays all your active membership levels. It works the same way as the portal page, with the `[fluent_membership_levels]` shortcode and a **Create Pricing Page** dialog.

## Select Currency

Pick the default currency for new prices. The default is **United States Dollar (USD)**. Existing prices, subscriptions and payments keep their own currency.

## Save your changes

Click **Save Settings** in the top-right corner to apply your changes.
