# Email Notifications

Email Notifications lets you enable, disable, and customise the transactional emails Fluent Members sends to members on key membership events. Each notification has its own subject line and body editor with merge tag support. Set up [Mailing Settings](/guide/settings/email-configuration/mailing-settings) first so your emails carry the correct sender name, address, and logo.

## Access Email Notifications

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Email Configuration → Email Notifications** from the left-hand menu.

![Email Notifications page](/images/settings/email-notification/email-notification-1.webp)

## Built-In Notifications

Fluent Members ships with three built-in email notifications:

| Notification | When it fires |
|---|---|
| **Welcome Email** | When a member is assigned to a Membership Level — covers new purchases, manual admin grants, Stripe checkouts, corporate join acceptances, and re-activations from Suspended status. |
| **Expiry Notification** | When a member's status changes to `expired`. |
| **Suspension Notification** | When a member's status changes to `suspended`. |

::: warning Welcome Email re-fires on re-activation
If you suspend a member and later set their status back to Active, the Welcome Email fires again because re-activation triggers a fresh membership assignment event. Temporarily disable the Welcome Email before re-activating if you want to avoid the re-send.
:::

## Enabling and Disabling Notifications

The notifications list shows each notification with an **Enable** toggle on the right. Switch the toggle on to activate a notification; switch it off to disable it. A disabled notification never fires regardless of the underlying event.

![Default email body editor](/images/settings/email-notification/default-body-2.webp)

## Editing a Notification

Click the **pencil icon** on the right of any notification row to open its editor. Two fields are available:

- **Subject**: The email subject line. Supports merge tags.
- **Email Body**: The email body content. Uses a rich-text editor (free) or Gutenberg block editor (Pro). Supports merge tags and basic HTML.

After making changes, click **Save**. The next time the notification event fires, the updated content is sent.

![Customised email body](/images/settings/email-notification/customized-body-3.webp)

## Available Merge Tags

Use these tags in both the subject and body of any notification. Tags are case-sensitive and use <span v-pre>`{{double curly brace}}`</span> syntax.

### Member

| Tag | Replaced with |
|---|---|
| <span v-pre>`{{user_name}}`</span> | The member's WordPress display name |
| <span v-pre>`{{user_email}}`</span> | The member's email address |
| <span v-pre>`{{membership_level}}`</span> | The name of the Membership Level granted |
| <span v-pre>`{{start_date}}`</span> | The membership start date |
| <span v-pre>`{{expires_at}}`</span> | The membership expiry date (blank for Lifetime memberships) |

### Site

| Tag | Replaced with |
|---|---|
| <span v-pre>`{{site_name}}`</span> | Your WordPress site name |
| <span v-pre>`{{site_url}}`</span> | Your WordPress home URL |

::: warning Merge tags vs footer smartcodes
Merge tags (<span v-pre>`{{user_name}}`</span>, <span v-pre>`{{membership_level}}`</span>, etc.) work in the notification subject and body only. The email footer in [Mailing Settings](/guide/settings/email-configuration/mailing-settings) uses a separate set of smartcodes (<span v-pre>`{{site_name_with_url}}`</span>, etc.) that only work in the footer. Do not mix the two.
:::
