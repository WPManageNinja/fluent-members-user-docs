---
title: "Membership Levels"
description: "Find every Membership Level task in one place, then manage your levels from the list, the row menu and the level tabs."
---

# Membership Levels

A **Membership Level** is what you sell or offer on your site. It sets the price, the content that opens, and the people who hold it. Create a level for each kind of access you want to offer, such as Free, Pro or Team.

::: doc-tree levels hero

## What do you want to do?

Pick the goal that sounds like yours. Each card opens the right guide.

::: doc-tree levels tasks

## Every level feature on one map

Prefer the big picture? This map follows the tabs inside a level. Click a feature to open its guide.

::: doc-tree levels map

## Set up a level in order

Follow this order for each new level:

1. [Create the level](/docs/levels/creating). Choose how people get it: **Free signup**, **Paid**, **Team** or **Assigned by you**.
2. Add a price on the **Pricing** tab with [Native Payment](/docs/levels/pricing-native) (Pro) or a [paywall](/docs/levels/pricing-paywalls). A [free level](/docs/levels/free-levels) needs no price, only an access length.
3. Choose what the level unlocks on its [Content Access](/docs/levels/content-access) tab.
4. Add the level's shortcode to your pricing page.

When visitors buy, join or you [assign members](/docs/levels/members-on-a-level), they get everything the level unlocks.

## The Membership Levels list

Go to **Fluent Members → Membership Levels** to see every level on your site. The page heading reads **Memberships**.

![Screenshot of the Membership Levels list with Prices, Unlocks, Members and Status columns](/images/levels/index/levels-index-1.webp)

The list has these columns:

| Column | What it shows |
|--------|---------------|
| **Membership** | The level's name, with a line below it such as **Individual · renews**, **Individual · one payment**, **Free · Lifetime** or **Corporate · up to 10 seats**. Click the heading to sort. |
| **Prices** | Up to three price chips with the provider's icon, for example `$29 / month`. Off-sale prices look dimmed. A level with no price yet shows its provider and **no price yet**. A **No gateway** tag means a Native Payment level has no payment method turned on. **Webhook not verified** means a method is connected but its webhook isn't verified. |
| **Unlocks** | What the level opens, such as content, **Everything in** another membership, **Bundle:** names and community spaces. **Nothing yet** means no content is attached. A second line can read **Released over time with drip**. |
| **Members** | The number of active members. Team levels also show **seats per team** or **Unlimited seats**. |
| **Status** | A badge. See below. |

The **Status** badge tells you whether the level is ready:

- **Selling:** Active, has content and a price visitors can buy.
- **Open:** An active free level that has content.
- **Not selling:** Active with content, but no sellable price. Hover over the warning icon to see what's missing.
- **No content yet:** Active, but it unlocks nothing. Add content on its **Content Access** tab.
- **Inactive:** Hidden from pricing shortcodes.

Use the controls above the table to narrow the list:

- **All**, **Active** and **Inactive** filter by status.
- The search icon finds a level by ID or title.
- The **Columns** icon shows or hides the **Prices**, **Unlocks**, **Members** and **Status** columns.

## Create, edit, duplicate or delete a level

Click **New membership** to [create a level](/docs/levels/creating). Click a row to open a level, or click the three-dot menu at the end of the row:

- **Edit:** Opens the level.
- **Duplicate:** Creates a copy named `<title> (copy)` with the same settings and content access. Pro copies the Native Payment plans too, as inactive plans, so the copy can't sell until you add a new plan. A free level keeps its access length. Paywall links, upgrade paths and integration feeds are not copied.
- **Copy shortcode:** Copies `[fluent_membership_level id='<id>']`.
- **Delete:** Removes the level after you confirm. Its pricing plans, integration feeds and content access rules go with it. **Delete** is also under **More actions** inside a level.

> [!Note]
> You cannot delete a level that has member records, billing history or a [FluentCRM automation](/docs/levels/automations) using it. Choosing **Delete** explains why. Set the level's **Status** to **Inactive** instead.

## Inside a level

Opening a level shows its name and status badge, a **More actions** menu with **Copy shortcode** and **Delete**, and a row of tabs. A warning icon on **Pricing** or **Content Access** means that tab still needs attention.

![Screenshot of a level's Setup tab with the summary cards and the tab row](/images/levels/index/levels-index-2.webp)

| Tab | What it's for |
|-----|---------------|
| **Setup** | Summary cards, plus the [name, description, status](/docs/levels/creating#step-2-set-up-the-level) and, on team levels, the seat limit. |
| **Pricing** | The level's [Native Payment plans](/docs/levels/pricing-native) (Pro), [paywalls](/docs/levels/pricing-paywalls), or the access length of a [free level](/docs/levels/free-levels). |
| **Content Access** | [What the level unlocks](/docs/levels/content-access). |
| **Members** | [Everyone on the level](/docs/levels/members-on-a-level), and **Assign Members**. |
| **Upgrade Paths** (Pro) | [Routes between plans](/docs/levels/upgrade-paths). Shown on Native Payment levels only. |
| **Automations** | The [FluentCRM automations](/docs/levels/automations) that use the level. Shown when FluentCRM is active. |
| **Integrations** | [Level integrations](/docs/levels/integrations). Shown only when a plugin has registered one. |

## Check a level before going live

Before you send visitors to your pricing page, confirm that:

- The level's **Status** is **Active**.
- The status badge reads **Selling** (or **Open** for a free level).
- The level has a plan visitors can buy. Pricing shortcodes hide a level without one. Admins see a note saying it's hidden, and visitors see nothing.
- A test purchase unlocks the content you expect.
