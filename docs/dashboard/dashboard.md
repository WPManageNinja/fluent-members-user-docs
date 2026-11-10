---
title: Dashboard Overview
description: Read the Fluent Members dashboard, from the stat cards and trend charts to the setup checklist and the recent activity feed.
---

# Dashboard Overview

The **Dashboard** is the first screen you see when you open Fluent Members. Use it to check how many members you have, what they paid this month, and what changed recently on your site.

Go to **Fluent Members → Dashboard**, or click **Dashboard** in the top navigation from any Fluent Members screen.

![Screenshot of the Fluent Members dashboard with the greeting, four stat cards, the Business trends chart, and the Recent Activity panel](/images/dashboard/dashboard/dashboard-overview.webp)

The screen opens with a greeting and your site title. If you have payments in a currency other than your site currency, a notice above the greeting lists the currencies left out of the totals. Click its close icon to dismiss it.

## Stat cards

Four cards sit under the greeting:

| Card | What it shows |
|------|---------------|
| **Active members** | People who hold at least one membership with the status Active or Trial. Each person counts once. |
| **Revenue** | Payments received this calendar month, minus refunds. |
| **Recurring revenue** | The monthly value of your active and trialing subscriptions. A yearly subscription counts as one twelfth of its price. |
| **Member churn** | Members who cancelled this month, as a percentage of current active members plus those cancellations. |

> [!Note]
> **Revenue**, **Recurring revenue**, and the money figures further down count only Stripe and PayPal payments taken through Fluent Members (Pro), including migrated subscriptions. Sales through FluentCart, WooCommerce, Fluent Forms, or Paymattic are not included. Test mode payments are left out of every figure except **Recurring revenue**.

## Business trends

**Business trends** plots three lines over time:

- **Growth:** New memberships created in the period. A member who joins two levels counts twice.
- **Revenue:** Payments received minus refunds, read against the left axis.
- **Churn:** Memberships now Cancelled, placed in the period when the record last changed.

The chart opens on the current month and the five months before it. Click the date range to choose another one, or pick a preset: **Last 7 days**, **Last 30 days**, **Last 3 months**, **Last 6 months**, or **Last 12 months**. Ranges up to 31 days plot each day, ranges up to 120 days plot each week, and longer ranges plot each month. The longest range is about 24 months.

Use the two icons beside the date range to switch between a bar chart and a line chart. Your choice is remembered in this browser.

## Membership lifecycle

**Membership lifecycle** shows four figures for the current calendar month:

- **Renewals:** Successful renewal payments. The line below shows how many active subscriptions bill in the next 30 days.
- **Cancellations:** Members who cancelled. The line below repeats the member churn percentage.
- **Refunds:** Refunds issued, with the total amount below.
- **Trial conversion:** The share of subscriptions started this month with a trial that are now active. The line below counts trials ending in the next 7 days.

![Screenshot of the Membership lifecycle card with Renewals, Cancellations, Refunds, and Trial conversion](/images/dashboard/dashboard/dashboard-lifecycle.webp)



## Membership Activity

**Membership Activity** stacks **Signups** and **Cancellations** for each period, with a line for their combined total. It has its own date range, separate from **Business trends**, and works the same way.

![Screenshot of the Membership Activity chart with stacked Signups and Cancellations bars](/images/dashboard/dashboard/dashboard-membership-activity.webp)

## Revenue by Membership

**Revenue by Membership** ranks your top three levels by this week's revenue so far. Each row shows the level, its active member count, and the amount. Refunds are not subtracted here. The figure beside **Performance** compares this week with the same part of last week. The week starts on the day set under **Settings → General** in WordPress.

![Screenshot of the Revenue by Membership card with two levels ranked by revenue and a comparison with last week](/images/dashboard/dashboard/dashboard-revenue-by-membership.webp)

When there is no revenue this week, the card says so instead.

## Getting Started

The **Getting Started** card appears on the right until every setup step is done, with a count such as `2 out of 4 done`. Click a step to open the screen that completes it:

- **Setup Pages:** Opens **General Settings**. Done when a member portal page is set.
- **Add Access Group:** Opens **Access Groups**. Done when at least one group exists.
- **Add Membership Level:** Opens **Membership Levels**. Done when at least one level exists.
- **Setup Payment:** Opens **Payment Settings**. Done when a payment method is connected, or when a level has a paywall product or form ready to sell.

## Recent Activity

**Recent Activity** lists the latest 20 events, newest first, such as a member joining a level or an admin creating a pricing plan. Use the tabs to filter the feed:

- **All:** Every event.
- **Members:** Actions taken by members.
- **Admin:** Actions taken by admins and automatic system events.

Dashboard figures can take up to five minutes to refresh. To open the people behind the numbers, go to the [Members list](/docs/members/).
