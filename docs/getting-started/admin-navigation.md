---
title: "Find Your Way Around"
description: "Learn the Fluent Members top bar, the tabs inside a level, the Settings sections and the theme switcher."
---

# Find Your Way Around

Fluent Members runs as one app inside your WordPress admin, with its own top bar. Use this page to learn where each screen lives. Only WordPress administrators can open it.

## Open the plugin

Click **FluentMembers** in your WordPress sidebar (it shows a small **P** badge when Pro is active). Its sub-items jump straight to the main screens. They match the top bar, except that **Levels** in the sidebar opens the screen called **Membership Levels**.

## The top bar

Every screen shares the same bar. On small screens, its links move into a menu button.

<!-- TODO(screenshot): admin-navigation-1
  screen: Fluent Members dashboard, top bar only
  state: Pro active, so the Pro tag and Billing show
  data: -
  highlight: -
  view: admin
  alt: Screenshot of the Fluent Members top bar with its links, the theme icon and the gear icon
  reason: needs the develop build on the local site
-->

| Item | What it opens |
|---|---|
| **Dashboard** | [Your numbers, charts and recent activity](/docs/dashboard/dashboard). The logo opens it too. |
| **Membership Levels** | [The plans you offer](/docs/levels/). |
| **Access Groups** | [The content you protect](/docs/access-groups/). |
| **Members** | [Everyone who holds a membership](/docs/members/). |
| **Billing** (Pro) | [**Subscriptions** and **One-time**](/docs/billing/), from its dropdown. |
| Theme icon | Light or dark admin colours. |
| Gear icon | [Settings](#settings). |

With Pro active, a **Pro** tag also shows beside the logo. Older guides may mention **Orders** or **Transactions**: both now live under **Billing**.

## Inside a level

Click a level in **Membership Levels** to open it. The tabs across the top hold everything about that level.

![Screenshot of an open level showing its shortcode and the Level Details, Pricing, Access Groups, Members, Upgrade Paths and Integrations tabs](/images/getting-started/admin-navigation/admin-navigation-level-tabs.webp)

- **Level Details:** title, description and status.
- **Pricing:** the [plans](/docs/levels/pricing-native) or [paywalls](/docs/levels/pricing-paywalls) visitors pay through.
- **Access Groups:** the [content this level unlocks](/docs/levels/attaching-access-groups).
- **Members:** [who holds this level](/docs/levels/members-on-a-level).
- **Upgrade Paths** (Pro): [where members can move up to](/docs/levels/upgrade-paths). It shows only on levels with **Native Payment**.
- **Integrations:** [actions in other plugins](/docs/levels/integrations). It shows only when an integration is available.

The pill beside the breadcrumb holds the level's shortcode. Click it to copy. Deleting a level is under **More Actions**.

## Settings

Click the gear icon to open **Settings**. Its sections run down the left side.

![Screenshot of Settings with the section list on the left and General Settings open](/images/getting-started/admin-navigation/admin-navigation-settings.webp)

- [General Settings](/docs/settings/general): always-public content, your portal and pricing pages, and your currency.
- [Unauthorized Access](/docs/settings/unauthorized-access): what blocked visitors see by default.
- [Partial Content Lock](/docs/settings/partial-content-lock): previews of protected posts.
- [Login Popup](/docs/settings/login-popup): logging in without leaving the page.
- [Permissions](/docs/settings/permissions): who can change restrictions on content.
- [Payment Settings](/docs/settings/payment-settings/): Stripe (Pro) and PayPal (Pro).
- [Migration](/docs/settings/migration/): importing from another membership plugin.
- **Email Configuration:** [Mailing Settings](/docs/settings/email-configuration/mailing-settings) and [Email Notifications](/docs/settings/email-configuration/email-notifications).

## Change the theme

Click the theme icon in the top bar and choose **Light**, **Dark** or **System**. **System** follows your device's setting.

![Screenshot of the theme menu with Light, Dark and System](/images/getting-started/admin-navigation/admin-navigation-theme.webp)
