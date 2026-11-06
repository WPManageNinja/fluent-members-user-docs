---
title: "Email Notifications"
description: "Turn on the emails Fluent Members sends to members, see when each one is sent, and edit the subject and body."
---

# Email Notifications

**Email Notifications** are the automatic emails Fluent Members sends to members about their membership and payments. There are seven, and all of them are off until you turn them on.

Set up [Mailing Settings](/docs/settings/email-configuration/mailing-settings) first, so emails carry your sender name and address.

## Turn a notification on

1. Go to **Fluent Members → Settings → Email Configuration → Email Notifications**.
2. Turn on the switch in the **Enable** column for each email you want to send.

The switch saves right away. Every email goes to the member, as the **Receiver** column shows.

<!-- TODO(screenshot): email-notifications-1
  screen: Settings > Email Configuration > Email Notifications
  state: Notification Settings table with all seven rows
  data: Default rows, all switches off
  highlight: Enable column
  view: admin
  alt: Screenshot of the Notification Settings table listing all seven email notifications
  reason: needs the develop build on the local site
-->

## When each email is sent

The notifications cover these events:

| Notification | Sent when | Default subject |
|---|---|---|
| **Welcome Email** | A member gets a new membership: a purchase, a manual assignment, or joining a corporate seat. | <span v-pre>`Welcome, {{user_name}}!`</span> |
| **Membership Expiring** | A set number of days before an active or trial membership expires. | <span v-pre>`Your {{membership_level}} membership expires on {{expires_at}}`</span> |
| **Membership Expired** | A membership expires. | <span v-pre>`Your {{membership_level}} membership has expired`</span> |
| **Payment Receipt** (Pro) | A native Stripe or PayPal charge or renewal succeeds. | <span v-pre>`Your receipt for {{membership_level}}`</span> |
| **Payment Failed** (Pro) | A native charge is declined. | <span v-pre>`Your payment for {{membership_level}} failed`</span> |
| **Subscription Cancelled** | A subscription or membership is cancelled, by the member, an admin or a gateway. | <span v-pre>`Your {{membership_level}} subscription has been cancelled`</span> |
| **Refund Issued** (Pro) | A native refund is confirmed, in full or in part. | <span v-pre>`Your refund for {{membership_level}}`</span> |

A few details affect who gets what:

- **Welcome Email:** Not sent when you restore a suspended member, during a migration, or when a member changes plans.
- **Membership Expiring:** A daily check sends this once for each expiry date. If the member renews and the date moves, the reminder can go out again for the new date. It is skipped when a cancellation is already scheduled.
- **Payment Receipt:** Sent only when the amount is above zero, so a free trial start sends no receipt. It covers native payments only, not payments taken by FluentCart, Fluent Forms, Paymattic or WooCommerce.
- **Payment Failed:** Sent for Stripe declines, and for PayPal subscriptions migrated from another plugin. The PayPal events Fluent Members listens for do not include a declined payment, so native PayPal subscriptions do not send it. The default body asks the member to update their payment method.
- **Subscription Cancelled:** Sent at the moment of cancelling, once per cancellation. For a cancellation at the end of the billing period, the member hears about it right away, and the email shows the date access ends. It also goes out when a membership without a subscription is cancelled, or when the plugin that sold a paywall plan cancels it.
- **Refund Issued:** A full refund also cancels the membership, so the member receives both this email and **Subscription Cancelled**. A partial refund sends only this email. See [Refunds](/docs/billing/refunds).
- **Corporate seats:** Seat holders do not receive **Membership Expired** or **Subscription Cancelled**. The owner of the corporate membership does.

> [!Note]
> Emails are queued through Action Scheduler when it is available, so they can arrive a little after the event. If emails do not arrive, check your site's email delivery first.

## Edit a notification

Click the edit icon on a row to open it.

![Screenshot of the Welcome Email editor with the Default Body preview and the Update button](/images/settings/email-configuration/email-notifications/email-notifications-default-body.webp)

The page holds these settings:

- **Enable this email notification!:** The same switch as in the table.
- **Reminder lead time:** Only on **Membership Expiring**. Set how many days before the expiry date to send the reminder, from 1 to 90. The default is 7.
- **Email Subject:** The subject line. Click the <span v-pre>`{{:}}`</span> button to pick a smartcode.
- **Email Body Type:** **Default Body** sends the built-in message, shown below as a preview with sample data. **Customized Body** (Pro) opens the [Custom Email Editor](/docs/settings/email-configuration/custom-email-editor).

![Screenshot of the Reminder lead time setting showing 7 days](/images/settings/email-configuration/email-notifications/email-notifications-lead-time.webp)

Click **Update** to save. The built-in message cannot be edited directly. On the free version, **Email Subject** and the switches are what you can change. Clicking **Customized Body** shows a notice that the feature requires Pro.

## Smartcodes

Use smartcodes in the subject and body. These appear in the <span v-pre>`{{:}}`</span> picker:

| Group | Smartcode | Replaced with |
|---|---|---|
| Member | <span v-pre>`{{user_name}}`</span> | The member's display name |
| Member | <span v-pre>`{{user_email}}`</span> | The member's email |
| Member | <span v-pre>`{{membership_level}}`</span> | The level name |
| Member | <span v-pre>`{{start_date}}`</span> | The start date, or `N/A` if there is none |
| Member | <span v-pre>`{{expires_at}}`</span> | The expiry date, or `Never` if there is none |
| Member | <span v-pre>`{{access_ends_at}}`</span> | The date access ends |
| Payment | <span v-pre>`{{payment_amount}}`</span> | The amount with currency |
| Payment | <span v-pre>`{{payment_date}}`</span> | The payment date |
| Payment | <span v-pre>`{{payment_item}}`</span> | The item name, or the level name |
| Payment | <span v-pre>`{{invoice_reference}}`</span> | The gateway's reference for the payment or refund |
| General | <span v-pre>`{{site_name}}`</span> | Your site name |
| General | <span v-pre>`{{site_url}}`</span> | Your site URL |
| General | <span v-pre>`{{portal_url}}`</span> | The member portal URL |

Payment smartcodes have a value only on the three payment emails. Elsewhere they print `N/A`. For the fallback syntax and every value, see [Email smartcodes](/reference/email-smartcodes).
