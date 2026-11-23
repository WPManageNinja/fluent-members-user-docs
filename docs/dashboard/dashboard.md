---
title: Dashboard Overview
description: Read the Fluent Members dashboard, from the stat cards and trend charts to the setup checklist and the recent activity feed.
---

# Dashboard Overview

The **Dashboard** is the first screen you see when you open Fluent Members. Use it to check how many members you have, what they paid this month, and what changed recently on your site.

Go to **Fluent Members → Dashboard**, or click **Dashboard** in the top navigation from any Fluent Members screen. On a new install, the [guided setup](/docs/getting-started/quick-start) opens first.

<!-- TODO(screenshot): dashboard-1
  screen: Dashboard, full page
  state: Pro active, Launch checklist visible
  data: a few members and some payments
  highlight: the four stat cards, Business Trends and the Launch checklist
  view: admin
  alt: Screenshot of the Fluent Members dashboard with the greeting, four stat cards, Business Trends, the Launch checklist and Recent Activity
-->


The screen opens with a greeting and your site title. If you have payments in a currency other than your site currency, a notice above the greeting lists the currencies left out of the totals. Click its close icon to dismiss it.

## Stat cards

Four cards sit under the greeting:

| Card | What it shows |
|------|---------------|
| **Active Members** | People who hold at least one membership with the status Active or Trial. Each person counts once. |
| **Revenue** | Payments received this calendar month, minus refunds. |
| **Recurring Revenue** | The monthly value of your active and trialing subscriptions. A yearly subscription counts as one twelfth of its price. |
| **Member Churn** | Members who cancelled this month, as a percentage of current active members plus those cancellations. |

> [!Note]
> **Revenue**, **Recurring Revenue**, and the money figures further down count only Stripe and PayPal payments taken through Fluent Members (Pro), including migrated subscriptions. Sales through FluentCart, WooCommerce, Fluent Forms, or Paymattic are not included. Test and live payments are both counted, so test purchases show up here while **Site Mode** is **Test**. See [Test mode and live mode](/docs/getting-started/test-and-live-mode).

## Business Trends

**Business Trends** plots three lines over time:

- **Growth:** New memberships created in the period. A member who joins two levels counts twice.
- **Revenue:** Payments received minus refunds, read against the left axis.
- **Churn:** Memberships now Cancelled, placed in the period when the record last changed.

The chart opens on the current month and the five months before it. Click the date range to choose another one, or pick a preset: **Last 7 days**, **Last 30 days**, **Last 3 months**, **Last 6 months**, or **Last 12 months**. Ranges up to 31 days plot each day, ranges up to 120 days plot each week, and longer ranges plot each month. The longest range is about 24 months.

Use the two icons beside the date range to switch between a bar chart and a line chart. Your choice is remembered in this browser.

## Membership Lifecycle

**Membership Lifecycle** shows four figures for the current calendar month:

- **Renewals:** Successful renewal payments. The line below shows how many active subscriptions bill in the next 30 days.
- **Cancellations:** Members who cancelled. The line below repeats the member churn percentage.
- **Refunds:** Refunds issued, with the total amount below.
- **Trial conversion:** The share of subscriptions started this month with a trial that are now active. The line below counts trials ending in the next 7 days.

<!-- TODO(screenshot): dashboard-2
  screen: Dashboard, Membership Lifecycle card
  state: current month with renewals and a cancellation
  data: a few members and some payments
  highlight: the four lifecycle figures
  view: admin
  alt: Screenshot of the Membership Lifecycle card with Renewals, Cancellations, Refunds and Trial conversion
-->


## Membership Activity

**Membership Activity** stacks **Signups** and **Cancellations** for each period, with a line for their combined total. It has its own date range, separate from **Business Trends**, and works the same way.

<!-- TODO(screenshot): dashboard-3
  screen: Dashboard, Membership Activity chart
  state: default date range
  data: a few members and some payments
  highlight: stacked Signups and Cancellations bars
  view: admin
  alt: Screenshot of the Membership Activity chart with stacked Signups and Cancellations bars
-->


## Revenue by Membership

**Revenue by Membership** ranks your top three levels by this week's revenue so far. Each row shows the level, its active member count, and the amount. Refunds are not subtracted here. The figure beside **Performance** compares this week with the same part of last week. The week starts on the day set under **Settings → General** in WordPress.

<!-- TODO(screenshot): dashboard-4
  screen: Dashboard, Revenue by Membership card
  state: two levels with revenue this week
  data: a few members and some payments
  highlight: the ranked levels and the Performance figure
  view: admin
  alt: Screenshot of the Revenue by Membership card with two levels ranked by revenue
-->


When there is no revenue this week, the card says so instead.

## Launch checklist

The **Launch checklist** card sits at the top of the right column until every item is done. Its heading shows a count such as `2 of 7 done`. Each item checks your real data, so it ticks itself when you finish it. Click the button on an item to open the screen that completes it:

- **Create a membership:** opens **Membership Levels**. Done when a level exists.
- **Protect content:** opens the **Content Access** tab of your first level. Done when any content is protected.
- **Publish a pricing page:** opens your pricing page, or **Settings** if you have none. Done when a pricing page is set.
- **Make a test purchase:** opens your checkout link. Done once a test payment or test order exists.
- **Connect Stripe or PayPal:** opens payment settings. This row reads **Switch FluentCart to live mode** or **Switch payments to live mode** when a gateway is connected but still in test mode. It reads **Set up WooCommerce payments** for WooCommerce and **Payments** for free-only sites.
- **Check your welcome email:** opens the **Welcome Email** so you can edit it.
- **Get your first member:** ticks itself when a real member joins. Test purchases do not count.

Click **Skip** on an item to set it aside, or the **×** to hide the card. See [Guided setup & quick start](/docs/getting-started/quick-start) for the table of buttons and tick rules.

<!-- TODO(screenshot): dashboard-5
  screen: Dashboard, right column
  state: Launch checklist with two items done and one skipped
  data: -
  highlight: the Launch checklist card, its count and the Skip links
  view: admin
  alt: Screenshot of the Launch checklist card on the Dashboard
-->

## Recent Activity

**Recent Activity** lists the latest 20 events, newest first, such as a member joining a level or an admin creating a pricing plan. Use the tabs to filter the feed:

- **All:** Every event.
- **Members:** Actions taken by members.
- **Admin:** Actions taken by admins and automatic system events.

Dashboard figures can take up to five minutes to refresh. To open the people behind the numbers, go to the [Members list](/docs/members/).
