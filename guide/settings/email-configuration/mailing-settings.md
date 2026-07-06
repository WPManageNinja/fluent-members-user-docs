# Mailing Settings

Mailing Settings controls the global sender identity and footer branding applied to every email Fluent Members sends. Set these once and all your transactional notifications — welcome emails, expiry reminders, suspension alerts — will carry your brand name and address instead of WordPress's defaults.

## Access Mailing Settings

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Email Configuration → Mailing Settings** from the left-hand menu.

## Configuring Mailing Settings

- **From Name**: The sender display name shown in the recipient's inbox (e.g. your site or brand name). Defaults to your WordPress site title.

- **From Email Address**: The sender email address. WordPress's default (`wordpress@yoursite.com`) is often flagged as spam. Replace it with a real mailbox on your own domain `hello@yoursite.com`, `support@yoursite.com`, etc.

- **Reply to Name**: The display name shown when a recipient clicks Reply. If left empty, the From Name is used.

- **Reply to Email**: The address that receives replies. If left empty, replies go to the From Email Address. Use this when you send from a `noreply@` address but want replies routed to a monitored inbox.

- **Email Footer**: A rich-text editor for the footer block that appears at the bottom of every email. Supports basic HTML. The following smartcodes are available in the footer:

  | Smartcode | Replaced with |
  |---|---|
  | <span v-pre>`{{site_name_with_url}}`</span> | Your site name linked to the home URL |
  | <span v-pre>`{{site_name}}`</span> | Your site name (text only) |
  | <span v-pre>`{{site_url}}`</span> | The home URL (text only) |

![Mailing Settings page](/images/settings/email-configuration/mailing-settings-1.webp)

- **Logo for Email Header**: An image displayed at the top of every email above the body content. Upload a PNG or JPEG via the **Upload** button. Recommended width: 600px or less. Keep the file under 100 KB to avoid slow loading in email clients.

- **Enable "Powered by FluentMembers" in the email footer**: When checked, a small "Powered by FluentMembers" line is added to the bottom of every email. Uncheck to remove it there is no licensing requirement.

Once you have set your fields, click the **Save Settings** button in the top-right corner.

::: warning Set up SPF and DKIM for your From Email Address
The email address you use as the From address must be authorised to send from your domain. Without SPF and DKIM records, your emails are likely to land in spam or be rejected by major providers (Gmail, Outlook). An SMTP plugin such as FluentSMTP will guide you through this setup.
:::
