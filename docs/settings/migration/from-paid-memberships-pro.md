---
title: "Migration from Paid Memberships Pro"
description: "Import Paid Memberships Pro levels, restrictions, members, subscriptions and orders into Fluent Members."
---

# Migration from Paid Memberships Pro

The **Migration** tool imports your **Paid Memberships Pro (PMPro)** levels, page and category restrictions, members, corporate memberships and drip content into Fluent Members. With **Fluent Members Pro** (Pro) it also imports subscriptions, orders and transactions.

Before you begin, read the [Migration overview](/docs/settings/migration/).

## Before you start

- Keep Paid Memberships Pro active on the site. Its card shows **Not Detected** otherwise.
- Install **Fluent Members Pro** if you want subscriptions, orders and transactions imported.
- Take a full database backup.

## Step 1: Data Map

Go to **Settings → Migration** and click the **Paid Memberships Pro** card. The wizard opens on the **Data Map** screen, which lists **What will be imported** with the records found on your site.

<!-- TODO(screenshot): from-paid-memberships-pro-1
  screen: Settings → Migration → Paid Memberships Pro card → Data Map
  state: What will be imported table and the Before You Migrate panel
  data: a site with PMPro active and sample levels and members
  highlight: Next button
  view: admin
  alt: Screenshot of the Import from Paid Memberships Pro wizard on the Data Map screen
  reason: Paid Memberships Pro is not active on the local site
-->

These rows can appear. Rows with no records are hidden, except **Membership Levels** and **Page + Category Restrictions**.

| In Paid Memberships Pro | Becomes in FluentMembers |
|---|---|
| Membership Levels | Membership Levels |
| Page + Category Restrictions | Access Groups |
| Series (Drip Content) | Content Drip Rules |
| Active, Expired, Cancelled and Paused Members | Memberships |
| Corporate | Corporate Parents |
| Corporate Members | Corporate Children |
| Orders | Orders |
| Subscriptions | Subscriptions |

Read the **Before You Migrate** panel, then click **Next**. Besides the items below, it can warn you about:

- **Inline restrictions:** Posts that restrict content with a PMPro shortcode or block become public once PMPro is deactivated. Restrict them by hand.
- **Shortcodes:** Pages using `[pmpro_*]` shortcodes show them as plain text once PMPro is deactivated.
- **Level terms:** Paid trials become free for new buyers. A cheaper first payment is dropped, so new buyers pay the renewal amount from the start. A fixed membership length doesn't apply to new purchases, while existing members keep their end dates.
- **Skipped records:** Memberships of deleted users or levels are not migrated, and neither are their payments. An older subscription on a membership with a newer one isn't imported either, so cancel it at its gateway if it still charges.

> [!Note]
> Not migrated: discount codes, email settings and templates, user fields, level groups, custom level and order fields, and the login redirect.

## Step 2: Migration

Click **Migrate All** to run every step in order, or click **Run** on one step.

<!-- TODO(screenshot): from-paid-memberships-pro-2
  screen: Import from Paid Memberships Pro → Migration
  state: Migration Steps list before running
  data: a site with PMPro active
  highlight: Migrate All button
  view: admin
  alt: Screenshot of the Migration Steps list for Paid Memberships Pro with the Migrate All button
  reason: Paid Memberships Pro is not active on the local site
-->

| Step | What it does | Needs first |
|---|---|---|
| **Membership Levels** | Creates a Fluent Members level for each PMPro level. | Nothing |
| **Access Groups** | Imports page and category restrictions. | Membership Levels |
| **Members** | Imports members and their memberships. | Membership Levels, Access Groups |
| **Corporate Memberships** | Imports corporate parents and their seats. | Members |
| **Content Drip Rules** | Imports series drip rules. | Access Groups |
| **Subscriptions** (Pro) | Imports recurring subscriptions. | Members |
| **Orders** (Pro) | Imports PMPro orders. | Members |
| **Transactions** (Pro) | Imports payment history. | Orders, Subscriptions |
| **Cleanup & Verify** | Finishes and checks the migration. | All steps above |

Optional **Convert FluentCRM Automations** and **Sync Integrations** steps can follow. See the [Migration overview](/docs/settings/migration/).

## Step 3: Review Data

Click **View Summary**. The screen shows the record total, a **What was imported** table and any failed records or warnings. Click **Download Migration Log** to review them, then click **View Members**.

## What happens to subscriptions

Subscriptions need Fluent Members Pro. Without it, renewals and cancellations aren't recorded, so a membership ends at its next payment date. Install Pro before you migrate (or later, then run the **Subscriptions** step), or cancel the subscription at its gateway.

With Pro, the result depends on the gateway:

| Gateway | What you do | Result |
|---|---|---|
| **Stripe** | Connect the same account in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) and add the Fluent Members webhook in Stripe. | Renewals and cancellations reach Fluent Members. |
| **PayPal (REST)** | Connect the same PayPal app in [PayPal Setup](/docs/settings/payment-settings/paypal-setup), in the same live or sandbox mode as PMPro, before the **Subscriptions** step. | The subscription imports and its renewals are recorded. If PayPal isn't connected, the subscription doesn't import until you connect it and click **Retry**. |
| **Legacy PayPal** | Deactivate PMPro and connect the same PayPal account. | Renewals are recorded. The subscription can only be cancelled in PayPal. |
| **PayPal with no subscription ID** | Nothing to set up. | Not imported. The membership ends at its next payment date. |
| **Payflow Pro, Braintree, CyberSource, 2Checkout, Authorize.net** | Cancel the subscription at the gateway. | It can't renew in Fluent Members. The membership ends at its next payment date. |

## Status mapping

Each PMPro status becomes one Fluent Members status:

| PMPro status | Fluent Members status |
|---|---|
| active | Active |
| expired | Expired |
| changed, admin_changed | Expired |
| cancelled, admin_cancelled | Cancelled |
| inactive | Cancelled |
| paused | Suspended |

## After the migration

- Compare member totals in **Fluent Members → Members** with PMPro.
- Check the imported [Access Groups](/docs/access-groups/) and restrict by hand anything the **Before You Migrate** panel listed.
- Log in as a sample member and open protected content.
- Point members to your [Member Portal](/docs/members/portal/setup).
- Deactivate PMPro as soon as the migration and its optional steps are done. Changes PMPro records afterwards aren't imported.
