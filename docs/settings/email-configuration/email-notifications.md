---
title: "Email Notifications"
description: "See the emails Fluent Members sends to members, when each one goes out, and how to turn them off or edit the subject and body."
---

# Email Notifications

**Email Notifications** are the automatic emails Fluent Members sends to members about their membership and payments. There are nine, and all nine are on by default, so members get them without any setup. Turn off the ones you do not want to send.

Set up [Mailing Settings](/docs/settings/email-configuration/mailing-settings) first, so emails carry your sender name and address.

## Turn a notification on or off

1. Go to **Fluent Members → Settings → Email Configuration → Email Notifications**.
2. In the **Notification Settings** table, use the switch in the **Enable** column on each row.

The switch saves right away. The **Event** column names the email, and the **Receiver** column shows who gets it.

<!-- TODO(screenshot): email-notifications-1
  screen: Fluent Members -> Settings -> Email Configuration -> Email Notifications
  state: Notification Settings table with the Event, Receiver and Enable columns and all nine rows on
  data: default rows, all switches on
  highlight: Enable column
  view: admin
  alt: Screenshot of the Notification Settings table listing all nine email notifications with their switches on
-->

## When each email is sent

The notifications cover these events:

| Notification | Sent when | Default subject |
|---|---|---|
| **Welcome Email** | A member gets a new membership: a purchase, a manual assignment, or joining a corporate seat. | <span v-pre>`Welcome, {{user_name}}!`</span> |
| **Membership Expiring** | A set number of days before an active or trial membership expires. | <span v-pre>`Your {{membership_level}} membership expires on {{expires_at}}`</span> |
| **Membership Expired** | A membership expires. | <span v-pre>`Your {{membership_level}} membership has expired`</span> |
| **Payment Receipt** | A charge or renewal succeeds. | <span v-pre>`Your receipt for {{membership_level}}`</span> |
| **Payment Failed** | A charge is declined. | <span v-pre>`Your payment for {{membership_level}} failed`</span> |
| **Subscription Cancelled** | A subscription or membership is cancelled, by the member, an admin or a gateway. | <span v-pre>`Your {{membership_level}} subscription has been cancelled`</span> |
| **Refund Issued** | A refund is processed, in full or in part. | <span v-pre>`Your refund for {{membership_level}}`</span> |
| **Team Invitation** (Pro) | A team owner invites someone to join. | <span v-pre>`You're invited to join {{membership_level}} on {{site_name}}`</span> |
| **Guest Account** | A guest checkout creates an account. The email holds the username and a set-password link. | <span v-pre>`Your account on {{site_name}}`</span> |

A few details affect who gets what:

- **Welcome Email:** Not sent when you restore a suspended member, when a member changes plans, or for members brought in by a [migration](/docs/settings/migration/). A migration can send it once the import finishes if you tick **Email migrated members**.
- **Membership Expiring:** A daily check sends this once for each expiry date. If the member renews and the date moves, the reminder can go out again for the new date. It is skipped when the membership was renewed or cancelled since, or when a cancellation is already scheduled.
- **Payment Receipt and Payment Failed:** Sent only when the amount is above zero, so a free trial start sends no receipt. Each payment sends its email once.
- **Subscription Cancelled:** Sent at the moment of cancelling, once per cancellation. For a cancellation at the end of the billing period, the member hears about it right away, and the email shows the date access ends.
- **Team Invitation:** This email holds the only copy of the join link. If you turn it off, owners cannot invite anyone and see "Invitation emails are turned off on this site. Please contact the site administrator." An invitee who has no account yet opens the link and creates one on the join page. An invitee whose email already has an account is asked to log in.
- **Guest Account:** If you turn it off, no set-password email goes out, and the guest must use the lost password link to get in.
- **Refund Issued:** A full refund also cancels the membership, so the member receives both this email and **Subscription Cancelled**. A partial refund sends only this email. See [Refunds](/docs/billing/refunds).
- **Corporate seats:** Seat holders do not receive **Membership Expired** or **Subscription Cancelled**. The owner of the corporate membership does.

> [!Note]
> Emails are queued through Action Scheduler when it is available, so they can arrive a little after the event. If emails do not arrive, check your site's email delivery first.

## Edit a notification

Click the edit icon on a row to open it. The page holds these settings:

- **Enable this email notification:** The same switch as in the table.
- **Reminder lead time:** Only on **Membership Expiring**. Set how many days before the expiry date to send the reminder, from 1 to 90. The default is 7.
- **Email Subject:** The subject line. It is required. Click the <span v-pre>`{{:}}`</span> button to pick a smartcode.
- **Email Body Type:** **Default Body** sends the built-in message, shown below as a preview with sample data. **Customized Body** (Pro) opens the [Custom Email Editor](/docs/settings/email-configuration/custom-email-editor), where every notification has a starter template to begin from.

<!-- TODO(screenshot): email-notifications-2
  screen: Email Notifications -> Membership Expiring -> edit
  state: Enable switch, Reminder lead time set to 7, Email Subject, Email Body Type and the Default Body preview
  data: Membership Expiring with the default lead time
  highlight: Reminder lead time field
  view: admin
  alt: Screenshot of the Membership Expiring notification with the Reminder lead time set to 7 days
-->

Click **Save Settings** in the top-right corner to save. The built-in message cannot be edited directly. On the free version, **Email Subject** and the switches are what you can change. Clicking **Customized Body** shows a notice that the feature requires Pro.

## Smartcodes

Use smartcodes in the subject and body. These appear in the <span v-pre>`{{:}}`</span> picker:

| Group | Smartcode | Replaced with |
|---|---|---|
| Member | <span v-pre>`{{user_name}}`</span> | The member's display name |
| Member | <span v-pre>`{{user_email}}`</span> | The member's email |
| Member | <span v-pre>`{{user_login}}`</span> | The member's username |
| Member | <span v-pre>`{{membership_level}}`</span> | The level name |
| Member | <span v-pre>`{{start_date}}`</span> | The start date, or `N/A` if there is none |
| Member | <span v-pre>`{{expires_at}}`</span> | The expiry date, or `Never` if there is none |
| Member | <span v-pre>`{{access_ends_at}}`</span> | The date access ends |
| Payment | <span v-pre>`{{payment_amount}}`</span> | The amount with currency |
| Payment | <span v-pre>`{{payment_date}}`</span> | The payment date |
| Payment | <span v-pre>`{{payment_item}}`</span> | The item name, or the level name |
| Payment | <span v-pre>`{{invoice_reference}}`</span> | The gateway's reference for the payment or refund |
| Team Invitation | <span v-pre>`{{inviter_name}}`</span> | The name of the team owner who invited the person |
| Team Invitation | <span v-pre>`{{join_url}}`</span> | The link that accepts the invitation |
| Guest Account | <span v-pre>`{{set_password_url}}`</span> | The link to set a password |
| General | <span v-pre>`{{site_name}}`</span> | Your site name |
| General | <span v-pre>`{{site_url}}`</span> | Your site URL |
| General | <span v-pre>`{{portal_url}}`</span> | The member portal URL |

The **Team Invitation** and **Guest Account** groups work only in those two emails. Payment smartcodes have a value only on the three payment emails. Elsewhere they print `N/A`. For the fallback syntax and every value,
