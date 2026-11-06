---
title: "Introduction to Fluent Members"
description: "Start here: what Fluent Members does, the short path to your first membership, and a map of every feature with Free and Pro marked."
---

# Introduction to Fluent Members

::: doc-tree product hero

## What do you want to do?

Pick the one closest to your goal. Each card opens the guide for it.

::: doc-tree product tasks

## Set up your first membership

The guided setup opens by itself the first time you open the plugin, and does most of this for you.

::: doc-tree product journey

Have Pro? [Activate it](/docs/getting-started/installation-pro) before you start, so the guided setup offers Stripe, PayPal and corporate levels.

> [!Note]
> A level needs a way to be paid for. On the free plugin, install FluentCart, Fluent Forms or Paymattic before you run the guided setup. Without one of them, or Pro, you cannot create a level yet.

## How the pieces fit together

Fluent Members rests on three ideas. Everything else in the plugin supports them.

- **Membership Level:** the plan you offer, such as Gold or Team. A level says how it is paid for and what it unlocks.
- **Access Group:** the content you want to protect, and what everyone else sees instead. Attach a group to a level, and members on that level can open that content.
- **Member:** a WordPress user who holds a membership. A member can hold several memberships at once.

Think of the Access Group as the room and the Membership Level as the key.

## Where things live in the plugin

Every Fluent Members screen shares one top bar.

<!-- TODO(screenshot): introduction-1
  screen: Fluent Members dashboard, top bar only
  state: Pro active, so the Pro tag and Billing show
  data: -
  highlight: numbered badges on Dashboard, Membership Levels, Access Groups, Members, Billing, theme icon, gear icon
  view: admin
  alt: Screenshot of the Fluent Members top bar with Dashboard, Membership Levels, Access Groups, Members, Billing, the theme icon and the gear icon
  reason: needs the develop build on the local site
-->

1. **Dashboard:** your [numbers and recent activity](/docs/dashboard/dashboard).
2. **Membership Levels:** the [plans you offer](/docs/levels/), with their pricing.
3. **Access Groups:** the [content you protect](/docs/access-groups/).
4. **Members:** [everyone who holds a membership](/docs/members/).
5. **Billing** (Pro): [subscriptions and one-time memberships](/docs/billing/).
6. **The theme icon:** switch the admin between **Light**, **Dark** and **System**.
7. **The gear icon:** [Settings](/docs/getting-started/admin-navigation#settings), for options that apply to your whole site.

[Find your way around](/docs/getting-started/admin-navigation) has the full tour.

## Everything Fluent Members does, on one map

Each card is one area of the plugin. Pro features carry a badge. Click any item to open its guide.

::: doc-tree product map

## Free or Pro?

The free plugin protects your content, sells through other plugins and manages your members. Pro adds its own checkout and billing, teams, and WooCommerce.

| Free | Pro adds |
|---|---|
| Membership Levels, Access Groups, drip content, partial content lock, blocks and shortcodes | Corporate levels with seats, upgrade paths |
| Sell through FluentCart, Fluent Forms or Paymattic | Built-in Stripe and PayPal checkout, sell through WooCommerce |
| Members list, manual assignment, Member Portal with cancel | **Billing** screens, refunds, update payment method and renew in the portal |
| Email notifications, FluentCRM, Fluent Support, FluentCommunity, migration of levels and members | Block email editor, migration of subscriptions and payments |

Full list: [Free vs Pro](/docs/getting-started/free-vs-pro).

## How these docs work

A few conventions run through every page.

- The sidebar follows the order you'll need things: from installing, to selling, to managing members.
- Search sits at the top right. Press <kbd>/</kbd>, or <kbd>⌘</kbd> <kbd>K</kbd> / <kbd>Ctrl</kbd> <kbd>K</kbd>, to open it.
- **(Pro)** and the Pro badge mark features that need Fluent Members Pro.
- Button and field names appear in bold, exactly as they read on screen.

## Common questions

Short answers, each with the guide to read next.

::: faq
== Do I need Pro?
Not to sell memberships. The free plugin grants levels when someone pays through FluentCart, Fluent Forms or Paymattic. You need Pro for the built-in Stripe and PayPal checkout, WooCommerce and team memberships. See [Free vs Pro](/docs/getting-started/free-vs-pro).
== Can I sell recurring memberships?
Yes. Use FluentCart subscriptions on the free plugin, or Stripe, PayPal or WooCommerce Subscriptions with Pro. See [Price with paywalls](/docs/levels/pricing-paywalls).
== Why can I still see a protected page?
Administrators skip all protection, so your own account always sees everything. Test from a private window while logged out. See [How protection works](/docs/access-groups/how-protection-works).
== Can I protect only part of a page?
Yes. Use the [Access Groups block](/docs/access-groups/gutenberg-block/inserting) for a section, or [Partial content lock](/docs/settings/partial-content-lock) to show a preview of a post.
== Can I move from another membership plugin?
Yes. **Settings → Migration** imports from Paid Memberships Pro, MemberPress, Kadence Memberships and Restrict Content Pro. See [Migration overview](/docs/settings/migration/).
== Can I skip the guided setup?
Yes. **Skip All** jumps to the last step, and everything it sets up is available later from the plugin's own screens. See [Guided setup & quick start](/docs/getting-started/quick-start).
:::

## Need more?

Reference pages and help.

- [Glossary](/docs/getting-started/glossary)
- [Shortcodes](/reference/shortcodes)
- [Changelog](/changelog)
- [Get help](/docs/help-support/get-support)
