# Dashboard Overview

The **Fluent Members** Dashboard is your central hub for monitoring your membership site. When you open the plugin, this screen gives you a real-time snapshot of your member growth, active access rules, and recent account activity.

## Access the Dashboard

Log in to your WordPress dashboard and click **Fluent Members** in the left sidebar the Dashboard opens by default. If you are on another plugin screen, click **Dashboard** in the top navigation to return here.

![Fluent Members Dashboard overview](/screenshots/dashboard.webp)

## Top Statistic Cards

At the top of the Dashboard, you will find four quick-glance statistic cards that summarize your site's current status:

- **Total Members:** The complete count of WordPress users who have a membership record, including cancelled or expired accounts.
- **Active Members:** The number of users who currently have an active membership (`active` or `trial` status) and can access your protected content.
- **Access Groups:** The total number of [Access Groups](/guide/access-groups/) you have created to protect your site's content, including both active and inactive groups.
- **Active Levels:** The number of [Membership Levels](/guide/levels/) currently published and available for users to join.

::: tip Reading the gap
The difference between *Total Members* and *Active Members* is your churn pile: cancelled, expired, and suspended accounts. A healthy site keeps this gap small relative to total members.
:::

## Performance Charts

The middle section features three charts that help you visualize your site's performance over time.

### Membership Activity

This bar chart compares your **New Signups** against **Cancellations** month by month. Each bar is split into two colours: signups created that month, and memberships moved to `cancelled` that month. Renewals are not counted as new signups. Use this chart to see quickly whether your membership base is growing or shrinking.

### Membership Trends

This line chart tracks the running total of **Active** versus **Suspended** accounts over time. Unlike the bar chart, this shows totals at each point in time, not new events for that period. A steadily rising active line means your base is growing. A spike in suspended accounts may indicate billing issues worth investigating.

### Membership Recap

A donut chart showing how your total active members are divided across your different Membership Levels. Each slice represents one level (for example, *Starter*, *Pro*, *Annual*) with a member count. Click **View More** at the bottom of the card to jump to the full Levels list.

## Side Panel Management

On the right side of the screen, you will find helpful tools for day-to-day management.

### Quick Actions

Use these shortcut buttons to quickly **Add Level**, **Add Access Group**, or jump straight to your global **Settings**. **Add Level** opens the same modal as **Levels → Add New Level**; **Add Access Group** opens the Create Access Group modal.

### Latest Members

A list showing the five most recently enrolled members. Each row shows an avatar, name, and email address. Click any member to view their detailed profile and full membership history.

### Expiring Soon

This section highlights members whose access will expire within the next 30 days, allowing you to send them a quick renewal reminder. If the list is empty, you will see *"No recent expirations."*

## Important Notes

::: warning Before you draw conclusions from the numbers
- **User counts:** The *Total Members* count only tracks users with a Fluent Members record. It does not count standard WordPress users who have never interacted with your membership plans.
- **Dark mode:** You can toggle a dark mode view by clicking the moon icon in the top right corner of the Dashboard navigation bar.
:::

The Fluent Members Dashboard is designed to give you instant clarity on your site's health. By checking this screen regularly, you can easily track signups, monitor cancellations, and navigate directly to your most used settings.
