---
title: "General Settings"
description: "Switch the site between test and live mode, set your member portal, pricing and checkout pages, pick the default currency and run the setup wizard again."
---

# General Settings

**General Settings** holds the site-wide options for your membership site: the test or live mode for payments, the pages that serve as your member portal, pricing page and checkout, and the default currency for new prices.

Go to **Fluent Members → Settings**. **General Settings** opens first. Click **Save Settings** in the top-right corner to apply your changes. If you leave with unsaved changes, **Unsaved Changes** shows at the top of the settings sidebar.

<!-- TODO(screenshot): general-settings-1
  screen: Fluent Members -> Settings -> General Settings
  state: Site Mode, Generate Portal Page, Generate Pricing Page, Checkout Page, Select Currency and Setup wizard rows, Save Settings in the top-right corner
  data: Pro active, portal and pricing pages selected, currency USD
  highlight: Save Settings button
  view: admin
  alt: Screenshot of General Settings with the Site Mode, page and currency rows
-->

## Site Mode (Pro)

**Site Mode** sets whether your site takes test payments or real payments. It shows only when **Fluent Members Pro** is active.

- **Test:** For setup. Payments are test payments and no real money moves.
- **Live:** For real transactions.

Stripe and PayPal follow this one switch, so you do not set a mode on each gateway. Click **Save Settings** after you change it. The admin screen reloads once the mode is saved.

While the site is in test mode, administrators see a **Test Mode** badge in the WordPress admin bar, and the [Payment Settings](/docs/settings/payment-settings/) screen shows a **Test Mode Enabled** notice with a **Switch to Live** button that opens this screen. In live mode the badge reads **Live Mode**.

> [!Note]
> A new site starts in test mode. Before you switch to **Live**, connect the gateway's live account and pass its webhook check. See [Set up Stripe](/docs/settings/payment-settings/stripe-setup) and [Set up PayPal](/docs/settings/payment-settings/paypal-setup).

## Generate Portal Page

This is the page where members manage their memberships, view account details and open member content.

- **Use an existing page:** Pick it from the dropdown. The page needs the `[fluent_member_portal]` shortcode. Click the shortcode to copy it.
- **Create a page:** Click **+**, enter a **Page Name** in the **Create Portal Page** dialog, and click **Create Page**. Fluent Members publishes the page and selects it.

**Edit** and **View** open the selected page. See [portal setup](/docs/members/portal/setup) for what happens next.

## Generate Pricing Page

This page displays all your active membership levels. It works the same way as the portal page, with the `[fluent_membership_levels]` shortcode and a **Create Pricing Page** dialog. See [Pricing page](/docs/selling/pricing-page).

## Checkout Page

**Checkout Page** is the page where checkout, payment confirmation and free sign-up open, inside your theme. Without one, they open on a standalone page.

1. Pick a page from the dropdown, or click **+** to create a page named **Checkout**.
2. The page needs the `[fluent_members_checkout]` shortcode. Click the shortcode to copy it.
3. Click **Save Settings**.

Fluent Members does not save a page that has no checkout shortcode and asks you to add it or pick another page. If a saved page later loses the shortcode, a warning under the field says checkout opens on a standalone page until you add it back. See [Checkout](/docs/selling/checkout).

## Select Currency

Pick the default currency for new prices. Existing prices, subscriptions and payments keep their own currency. A currency that payments cannot use shows **(not supported for payments)** after its name. Currencies with three decimal places are refused.

## Setup wizard

Click **Run setup again** to walk through the first-run setup again. Confirm **Run setup**, and the wizard opens. Your memberships, prices and content stay as they are.

## Other settings screens

- **Public content** and **Restricted content** set what stays open and what visitors see on protected content. See [Public content](/docs/content-access/public-content) and [Restricted content](/docs/content-access/restricted-content).
- **FluentCRM** appears in the settings sidebar when FluentCRM is active. See [FluentCRM](/docs/integrations/fluentcrm).
