---
title: "Custom Email Editor (Pro)"
description: "Write your own email notification bodies with the block editor, starter templates, smartcodes and a device preview."
---

# Custom Email Editor (Pro)

The **Custom Email Editor** (Pro) replaces an email notification's built-in message with one you write in the block editor. Use it when you want your own wording, layout or images in a member email.

You need **Fluent Members Pro**. On the free version, each notification sends its **Default Body**.

## Open the editor

1. Go to **Fluent Members → Settings → Email Configuration → Email Notifications**.
2. Click the edit icon on a notification.
3. Under **Email Body Type**, click **Customized Body**.

![Screenshot of the block email editor under Customized Body, with the toolbar and a Welcome Email starter template](/images/settings/email-configuration/custom-email-editor/custom-email-editor-overview.webp)

## Start from a template

If the body is empty and the notification has a starter template, the editor fills it in automatically. To change it:

1. Click the starter templates button in the toolbar, or **Browse Templates** under **Starter Templates** in the sidebar.
2. Choose a template in the **Choose a Starter Template** window.

Selecting a template replaces what is in the editor.

![Screenshot of the Choose a Starter Template window with Membership Welcome and Start Blank](/images/settings/email-configuration/custom-email-editor/custom-email-editor-starter-templates.webp)

The templates depend on the notification:

| Notification | Templates |
|---|---|
| **Welcome Email** | **Membership Welcome**, **Start Blank** |
| **Payment Receipt** | **Payment Receipt**, **Start Blank** |
| **Payment Failed** | **Payment Failed**, **Start Blank** |
| **Subscription Cancelled** | **Subscription Cancelled**, **Start Blank** |
| **Refund Issued** | **Refund Issued**, **Start Blank** |
| **Membership Expiring** | **Start Blank** |
| **Membership Expired** | **Start Blank** |

## Write the email

Add blocks with the **+** button. The editor offers blocks that work in email: **Paragraph**, **Heading**, **Image**, **Buttons**, **List**, **Table**, **Columns**, **Group**, **Separator**, **Spacer**, **Quote**, **Pullquote**, **Verse**, **Preformatted**, **Code**, **Custom HTML**, **Classic** and **Footnotes**.

The toolbar also has undo and redo, list view, and a fullscreen button.

## Add smartcodes

Smartcodes fill in details such as the member's name when the email is sent. Click the <span v-pre>`{{:}}`</span> button in the toolbar and pick one from the **Member**, **Payment** or **General** group. The list is on [Email Notifications](/docs/settings/email-configuration/email-notifications#smartcodes).

<!-- TODO(screenshot): custom-email-editor-3
  screen: Settings > Email Notifications > Payment Receipt > Customized Body
  state: Smartcode picker open in the editor toolbar with the Payment group visible
  data: Payment Receipt starter template
  highlight: The {{:}} button
  view: admin
  alt: Screenshot of the smartcode picker in the email editor showing the Payment smartcodes
  reason: needs the develop build on the local site
-->

Click a smartcode in the email to open its **Default value** box. The value you enter prints when the smartcode has nothing to show.

## Preview the email

Click the preview button in the toolbar to open **Email Preview**. Switch between **Desktop**, **Tablet** and **Mobile**. The preview uses sample data, such as the member John Doe, and shows what is in the editor even if it is not saved yet.

![Screenshot of the Email Preview panel with Desktop, Tablet and Mobile buttons and the rendered Welcome Email](/images/settings/email-configuration/custom-email-editor/custom-email-editor-preview.webp)

## Save

The editor saves as you work, and the status button in the toolbar shows **Save**, **Saving…** or **Saved**. Click **Update** at the top of the page to save the rest of the notification, such as the subject.

> [!Note]
> Autosave writes to the notification itself, not to a draft, and switches it to **Customized Body**. If the notification is turned on, the next email uses your latest content even before you click **Update**. Turn the notification off while you work on a big change.

Custom emails use your **Email Footer Text** from [Mailing Settings](/docs/settings/email-configuration/mailing-settings), but not the **Logo for Email Header**. Add an image block if you want a logo.

To go back to the built-in message, select **Default Body** and click **Update**. A notification with **Customized Body** selected and an empty body also sends the built-in message.
