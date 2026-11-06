---
title: "Mailing Settings"
description: "Set the sender name and address, footer, logo and branding used by the emails Fluent Members sends."
---

# Mailing Settings

**Mailing Settings** holds the sender details and branding for every email Fluent Members sends to members. Set them before you turn on any [email notification](/docs/settings/email-configuration/email-notifications), so emails carry your name and address.

Go to **Fluent Members → Settings → Email Configuration → Mailing Settings**.

![Screenshot of the Mailing Settings page with the sender fields, Email Footer Text editor, logo upload and Powered by checkbox](/images/settings/email-configuration/mailing-settings-1.webp)

## Sender details

Use names and addresses that match your domain and SMTP setup, as the **Default From Settings** notice at the top of the page advises.

| Field | Default | Notes |
|---|---|---|
| **From Name** | Your site title | The sender name members see in their inbox. |
| **From Email Address** | Your WordPress admin email | The address emails come from. |
| **Reply to Name** | Empty | Used only when **Reply to Email** is filled in. |
| **Reply to Email** | Empty | Where replies go. When empty, emails carry no Reply-To address, so replies go to the From address. |

## Email Footer Text

**Email Footer Text** appears at the bottom of every email. It is a rich text editor with these smartcodes:

| Smartcode | Replaced with |
|---|---|
| <span v-pre>`{{site_name_with_url}}`</span> | Your site name, linked to your site |
| <span v-pre>`{{site_name}}`</span> | Your site name |
| <span v-pre>`{{site_url}}`</span> | Your site URL |

## Logo for Email Header

Click **Upload** to choose a PNG or JPEG. The recommended size is 400×100px. Once a logo is set, use **Change** to replace it or the trash button to remove it.

The logo appears at the top of emails that use the **Default Body**. It does not appear on emails written in the [Custom Email Editor](/docs/settings/email-configuration/custom-email-editor) (Pro), so add an image block there if you want one.

## Powered by line

**Show "Powered by FluentMembers" in the email footer** adds a small branding line below your footer. It is on by default. With Pro active you can turn it off. On the free version it stays on, and the checkbox is locked.

Click **Save Settings** to keep your changes.

> [!Note]
> Fluent Members sends email through WordPress. To reach inboxes reliably, send from an address on your own domain and set up SPF and DKIM with your email provider. An SMTP plugin such as FluentSMTP helps with this.
