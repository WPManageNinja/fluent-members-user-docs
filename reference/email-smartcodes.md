---
title: "Email Smartcodes"
description: "The smartcodes you can use in Fluent Members email subjects, bodies and footers, and the value each one prints."
---

# Email Smartcodes

**Smartcodes** are placeholders that Fluent Members replaces with real values when it sends an email. Use them in the subject and body of an [email notification](/docs/settings/email-configuration/email-notifications), so each member gets their own name, level and dates.

## Member

These codes work in every notification:

| Smartcode | Label in the picker | Prints |
|---|---|---|
| `{{user_name}}` | User Name | The member's display name |
| `{{user_email}}` | User Email | The member's email address |
| `{{membership_level}}` | Membership Level | The level title |
| `{{start_date}}` | Start Date | The membership start date, or `N/A` if there is none |
| `{{expires_at}}` | Expiry Date | The membership expiry date, or `Never` if there is none |
| `{{access_ends_at}}` | Access End Date | The expiry date while the membership is active or on trial with an expiry date. Otherwise today's date. |

Dates use the date format and timezone from your WordPress settings.

## Payment

These codes are filled only in **Payment Receipt**, **Payment Failed** and **Refund Issued**. Any other notification prints `N/A`.

| Smartcode | Label in the picker | Prints |
|---|---|---|
| `{{payment_amount}}` | Payment Amount | The amount with its currency |
| `{{payment_date}}` | Payment Date | The date of the payment |
| `{{payment_item}}` | Payment Item | The item name, or the level title if there is no item name |
| `{{invoice_reference}}` | Invoice Reference | The refund, invoice, charge or payment ID from the gateway, whichever comes first |

## General

These codes work in every notification:

| Smartcode | Label in the picker | Prints |
|---|---|---|
| `{{site_name}}` | Site Name | Your site title |
| `{{site_url}}` | Site URL | Your site address |
| `{{portal_url}}` | Membership/Renewal Portal URL | The address of your Member Portal page |

## Fallback Values

Add a fallback after a `|` to print your own text when a code has no value:

```text
Your access runs until {{expires_at|your plan ends}}.
```

Without a fallback, an empty `{{start_date}}` prints `N/A` and an empty `{{expires_at}}` prints `Never`. With a fallback, your text replaces those words.

## Email Footer

The **Email Footer Text** field in [Mailing Settings](/docs/settings/email-configuration/mailing-settings) has its own set of three codes:

| Smartcode | Prints |
|---|---|
| `{{site_name_with_url}}` | Your site title, linked to your site |
| `{{site_name}}` | Your site title |
| `{{site_url}}` | Your site address |

`{{site_name_with_url}}` works only in the footer.

## Inserting a Smartcode

Open a notification in **Fluent Members → Settings → Email Configuration → Email Notifications**. Use the picker beside the subject field to insert a code, or type it yourself. The email preview fills codes with sample data, and sent emails use real values.

> [!Note]
> A misspelled or unknown code is not removed. It appears in the email exactly as you typed it, so check the spelling before you turn a notification on.

The [custom email editor](/docs/settings/email-configuration/custom-email-editor) (Pro) has its own picker with the same codes, except `{{portal_url}}`. Type `{{portal_url}}` by hand there and it still works.
