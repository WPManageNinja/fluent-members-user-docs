---
title: "Member Portal Setup"
description: "Create the Member Portal page with one click or the shortcode, and link members to it."
---

# Member Portal Setup

The **Member Portal** is a page on your site where logged-in members see their memberships and manage them without contacting you. Set it up once, then link to it from your menu and emails.

## Create the portal page

Use this when you don't have a portal page yet. Fluent Members builds it for you.

1. Go to **Fluent Members → Settings → General Settings**.
2. Find **Generate Portal Page** and click the **+** button next to the page selector.

    ![Screenshot of General Settings with an arrow on the plus button beside the Generate Portal Page selector](/images/members/portal-setup/generate-portal-page-1.webp)

3. In the **Create Portal Page** modal, type a **Page Name**.
4. Click **Create Page**.

Fluent Members publishes a new page with the shortcode already in it and selects it as your portal page. If a published portal page already exists, you get the message **Portal page already exists.** and no second page is created.

Below the selector, **Edit** opens the page in the WordPress editor and **View** opens it on your site.

## Use an existing page

Use this when the portal should live on a page you already have.

1. Open the page in the WordPress editor and add the shortcode. It takes no attributes:

    ```text
    [fluent_member_portal]
    ```

2. Publish the page.
3. Go to **Fluent Members → Settings → General Settings**.
4. Under **Generate Portal Page**, search for your page and select it.
5. Click **Save Settings**.

> [!Note]
> Add the shortcode to one page only. It renders on every page you place it on, but plugin links such as the `{{portal_url}}` email smartcode go to the page selected in settings.

## Link members to the portal

Give members a way to reach the page:

- **Site menu:** Add the page to your menu under **Appearance → Menus**.
- **Emails:** Add the `{{portal_url}}` smartcode to an email template. See [Email Notifications](/docs/settings/email-configuration/email-notifications).

Fluent Members also uses this address on the checkout success page (**Go to Portal**) and on the corporate invitation join page.

## Show the portal in a customer account

You don't need a separate page if members already use a store account. The same portal appears as a **Membership** item in these accounts:

- **FluentCart:** In the customer dashboard, when FluentCart is active.
- **WooCommerce** (Pro): In **My Account**, when WooCommerce is active.

The profile header and its **Logout** menu are hidden there, because the store account has its own.

## What members get

Members see their profile, stats and a card for each membership:

![Screenshot of the Member Portal with the member profile, Stats Overview cards and two membership cards](/images/members/portal-setup/memeber-dashboard-2.webp)

Read [What Members See](/docs/members/portal/what-members-see) for each part of this screen.
