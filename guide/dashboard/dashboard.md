# Dashboard Overview

The **Fluent Members** Dashboard is your central hub for monitoring your membership site. When you open the plugin, this screen gives you a real-time snapshot of your member growth, access rules, and recent account activity.

## Access the Dashboard

Log in to your WordPress dashboard and click **Fluent Members** in the left sidebar, the Dashboard opens by default. Once inside the plugin, its own top navigation bar (**Dashboard**, **Membership Levels**, **Access Groups**, **Members**, and **Orders** for Pro sites) stays visible, click **Dashboard** from any of those screens to come back here.

## Greeting

The Dashboard opens with a personal greeting, your avatar, a time-of-day greeting ("Good morning" / "Good afternoon" / "Good evening"), and your display name.

## Top Statistic Cards

Below the greeting, four quick-glance statistic cards summarize your site's current status:

- **Total Members:** The complete count of WordPress users who have a membership record, including cancelled or expired accounts.
- **Active Members:** The number of users who currently have an active membership (`active` or `trial` status) and can access your protected content.
- **Access Groups:** The total number of [Access Groups](/guide/access-groups/) you have created to protect your site's content, including both active and inactive groups.
- **Membership Levels:** The total number of [Membership Levels](/guide/levels/) you have created, published or not.

::: tip Reading the gap
The difference between *Total Members* and *Active Members* is your churn pile: cancelled, expired, and suspended accounts. A healthy site keeps this gap small relative to total members.
:::

![Fluent Members Dashboard: greeting, top statistic cards, Membership Activity chart, Quick Actions, Latest Memberships, and Expiring Soon](/images/getting-started/dashboard/dashboard-overview-1.webp)

## Performance Charts

Scrolling down, three charts help you visualize your site's performance over time.

#### Membership Activity

This bar chart compares your **New Signups** against **Cancellations** month by month. Each bar is split into two colours: signups created that month, and memberships moved to `cancelled` that month. Renewals are not counted as new signups. Use this chart to see quickly whether your membership base is growing or shrinking.

#### Membership Trends

This line chart tracks the running total of **Active** versus **Suspended** accounts over time. Unlike the bar chart, this shows totals at each point in time, not new events for that period. A steadily rising active line means your base is growing. A spike in the suspended line may indicate billing issues worth investigating.

#### Membership Recap

A donut chart with your total member count in the center, and a color-coded slice per Membership Level below it (for example, *Free Member*, *Starter*, *Pro*), each with its own member count. Click **View More** at the bottom of the card to jump to the full Levels list.

![Fluent Members Dashboard: Membership Trends line chart and Membership Recap donut chart](/images/getting-started/dashboard/dashboard-overview-2.webp)

## Side Panel Management

On the right side of the screen, you will find helpful tools for day-to-day management.

#### Quick Actions

Use these shortcut buttons to quickly **Create Membership Level**, **Add Access Group**, or jump straight to your global **Settings**. **Create Membership Level** opens the same modal as **Membership Levels → Add New Level**; **Add Access Group** opens the Create Access Group modal.

#### Latest Memberships

A list showing the five most recently created memberships. Each row shows an avatar, the member's name, the Membership Level they joined on, and a relative "Joined [X] ago" timestamp. Click any row to view that member's detailed profile and full membership history.

#### Expiring Soon

This section highlights members whose access will expire within the next 30 days, each row shows the member's name, their Membership Level, and the exact expiry date, so you can send them a quick renewal reminder. If the list is empty, you will see *"No recent expirations."*

## Important Notes

::: warning Before you draw conclusions from the numbers
- **User counts:** The *Total Members* count only tracks users with a Fluent Members record. It does not count standard WordPress users who have never interacted with your membership plans.
- **Dark mode:** Toggle a dark mode view with the moon icon in the top right corner of the Dashboard navigation bar, right next to the **Settings** shortcut (gear icon).
:::

The Fluent Members Dashboard is designed to give you instant clarity on your site's health. By checking this screen regularly, you can easily track signups, monitor cancellations, and navigate directly to your most used settings.
