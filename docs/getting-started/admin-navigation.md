---
title: "Find Your Way Around"
description: "Learn the Fluent Members top bar, the tabs inside a level, the Settings sections and the theme switcher."
---

# Find Your Way Around

Fluent Members runs as one app inside your WordPress admin, with its own top bar. Use this page to learn where each screen lives. Only WordPress administrators can open it.

## Open the plugin

Click **FluentMembers** in your WordPress sidebar. Its sub-items jump straight to the main screens: **Dashboard**, **Levels** (which opens **Membership Levels**), **Members**, **Billing** (Pro) and **Settings**.

On a new install, the first click opens the [guided setup](/docs/getting-started/quick-start) instead.

## The top bar

Every screen shares the same bar. On small screens, its links move into a menu button.

<!-- TODO(screenshot): admin-navigation-1
  screen: Fluent Members dashboard, top bar only
  state: Pro active, so the Pro tag and Billing show
  data: -
  highlight: the links, the theme icon and the gear icon
  view: admin
  alt: Screenshot of the Fluent Members top bar with its links, the theme icon and the gear icon
-->

| Item | What it opens |
|---|---|
| **Dashboard** | [Your numbers, Launch checklist and recent activity](/docs/dashboard/dashboard). The logo opens it too. |
| **Membership Levels** | [The plans you offer](/docs/levels/), and the content each one unlocks. |
| **Members** | [Everyone who holds a membership](/docs/members/). |
| **Billing** (Pro) | [**Subscriptions** and **One-time**](/docs/billing/), from its dropdown. |
| Theme icon | Light or dark admin colours. |
| Gear icon | [Settings](#settings). |

With Pro active, a **Pro** tag also shows beside the logo. There is no separate **Access Groups** screen: you set what a level protects on the level itself.

## Inside a level

Click a level in **Membership Levels** to open it. The tabs across the top hold everything about that level.

<!-- TODO(screenshot): admin-navigation-2
  screen: an open level
  state: FluentCRM active, so the Automations tab shows
  data: a paid level with a native pricing plan
  highlight: the tab row
  view: admin
  alt: Screenshot of an open level showing the Setup, Pricing, Content Access, Members, Upgrade Paths, Automations and Integrations tabs
-->

- **Setup:** title, description and status.
- **Pricing:** the [plans](/docs/levels/pricing-native) or [paywalls](/docs/levels/pricing-paywalls) visitors pay through.
- **Content Access:** [what this level unlocks](/docs/levels/content-access), including [Bundles](/docs/content-access/bundles).
- **Members:** [who holds this level](/docs/levels/members-on-a-level).
- **Upgrade Paths** (Pro): [where members can move up to](/docs/levels/upgrade-paths). It shows only on levels with **Native Payment**.
- **Automations:** [FluentCRM automations](/docs/levels/automations) for this level. It shows only when FluentCRM is active.
- **Integrations:** [actions in other plugins](/docs/levels/integrations). It shows only when an integration is available.

A small mark on **Pricing** or **Content Access** means that tab is not set up yet. Open **More actions** to **Copy shortcode** or delete the level.

## Settings

Click the gear icon to open **Settings**. Its sections run down the left side.

<!-- TODO(screenshot): admin-navigation-3
  screen: Settings
  state: General Settings open, FluentCRM active, Pro active
  data: -
  highlight: the section list on the left
  view: admin
  alt: Screenshot of Settings with the section list on the left and General Settings open
-->

- [General Settings](/docs/settings/general): **Site Mode** (Pro), your portal, pricing and checkout pages, your currency, and **Run setup again**.
- [Public content](/docs/content-access/public-content): pages and posts everyone can see, whatever a membership covers.
- [Restricted content](/docs/content-access/restricted-content): what visitors without access see by default, including teasers, the join button and the login link.
- [Permissions](/docs/settings/permissions): who can change restrictions on content.
- [FluentCRM](/docs/integrations/fluentcrm): tag sync between levels and FluentCRM tags. It shows only when FluentCRM is active.
- [Payment Settings](/docs/settings/payment-settings/): Stripe (Pro) and PayPal (Pro).
- [Migration](/docs/settings/migration/): importing from another membership plugin.
- **Email Configuration:** [Mailing Settings](/docs/settings/email-configuration/mailing-settings) and [Email Notifications](/docs/settings/email-configuration/email-notifications).

## Change the theme

Click the theme icon in the top bar and choose **Light**, **Dark** or **System**. **System** follows your device's setting.

<!-- TODO(screenshot): admin-navigation-4
  screen: Fluent Members top bar
  state: theme menu open
  data: -
  highlight: Light, Dark and System
  view: admin
  alt: Screenshot of the theme menu with Light, Dark and System
-->
