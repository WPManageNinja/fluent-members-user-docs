---
title: "Migration from MemberPress"
description: "Import MemberPress memberships, rules, members, subscriptions and transactions into Fluent Members."
---

# Migration from MemberPress

The **Migration** tool imports your **MemberPress** memberships, rules, members and corporate accounts into Fluent Members. With **Fluent Members Pro** (Pro) it also imports orders, transactions and subscriptions.

Before you begin, read the [Migration overview](/docs/settings/migration/).

## Before you start

- Keep MemberPress active on the site. Its card shows **Not Detected** otherwise.
- Install **Fluent Members Pro** if you want orders, transactions and subscriptions imported.
- Take a full database backup.

## Step 1: Data Map

Go to **Settings → Migration** and click the **MemberPress** card. The wizard opens on the **Data Map** screen, which lists **What will be imported** with the records found on your site.

<!-- TODO(screenshot): from-memberpress-1
  screen: Settings → Migration → MemberPress card → Data Map
  state: What will be imported table and the Before You Migrate panel
  data: a site with MemberPress active and sample memberships and members
  highlight: Next button
  view: admin
  alt: Screenshot of the Import from MemberPress wizard on the Data Map screen
  reason: MemberPress is not active on the local site
-->

These rows can appear. Rows with no records are hidden, except **Membership Levels** and **Rules**.

| In MemberPress | Becomes in FluentMembers |
|---|---|
| Membership Levels | Membership Levels |
| Rules | Access Groups |
| Members (one-time) | Memberships |
| Members (recurring) | Memberships |
| Transactions (Pro) | Transactions |
| Corporate Accounts | Corporate Parents |
| Sub Accounts | Corporate Children |

Read the **Before You Migrate** panel, then click **Next**. Besides the items below, it can warn you about:

- **Unsupported rules:** Rules on custom post types or taxonomies, URIs, regular expressions or partial content aren't migrated, and neither are WooCommerce or FluentCart rules while that plugin is inactive. That content becomes public once MemberPress is deactivated.
- **Level terms:** Paid trials become free for new buyers. A level that keeps access after the last payment loses that rule for new buyers. A one-time level that expires gives new buyers lifetime access. Existing members keep their rule or end date.

> [!Note]
> Not migrated: coupon codes, email settings and scheduled reminders, custom registration fields, group upgrade paths and fallback memberships, who-can-purchase rules, membership access URLs, thank-you and login redirect pages, tax settings, per-account sub-account limits, and MemberPress shortcodes and blocks in your content.

## Step 2: Migration

Click **Migrate All** to run every step in order, or click **Run** on one step.

<!-- TODO(screenshot): from-memberpress-2
  screen: Import from MemberPress → Migration
  state: Migration Steps list before running
  data: a site with MemberPress active
  highlight: Migrate All button
  view: admin
  alt: Screenshot of the Migration Steps list for MemberPress with the Migrate All button
  reason: MemberPress is not active on the local site
-->

| Step | What it does | Needs first |
|---|---|---|
| **Access Groups** | Imports MemberPress rules. | Nothing |
| **Membership Levels** | Creates a Fluent Members level for each membership. | Access Groups |
| **Memberships** | Imports members and their memberships. | Membership Levels |
| **Orders** (Pro) | Imports orders. | Memberships |
| **Transactions** (Pro) | Imports payment history. | Memberships |
| **Subscriptions** (Pro) | Imports recurring subscriptions. | Memberships, Orders |
| **Corporate Members** | Imports corporate accounts and sub accounts. Shows **No Corporate Data** if there are none. | Memberships |
| **Cleanup & Verify** | Finishes and checks the migration. | All steps above |

Optional **Convert FluentCRM Automations** and **Sync Integrations** steps can follow. See the [Migration overview](/docs/settings/migration/).

## Step 3: Review Data

Click **View Summary**. The screen shows the record total, a **What was imported** table and any failed records or warnings. Click **Download Migration Log** to review them, then click **View Members**.

## What happens to subscriptions

Subscriptions that renew through Stripe or PayPal need Fluent Members Pro. Without it, renewals and cancellations aren't recorded, so access ends at the paid-through date **while the gateway keeps charging**. Install Pro before you migrate, or cancel the subscription at the gateway.

With Pro, the result depends on the gateway:

| Gateway | What you do | Result |
|---|---|---|
| **Stripe** | Connect the same account in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) and add the Fluent Members webhook in Stripe. | Renewals and cancellations reach Fluent Members. |
| **PayPal (REST)** | Connect the same PayPal account in [PayPal Setup](/docs/settings/payment-settings/paypal-setup), in the same live or sandbox mode as MemberPress, before the **Subscriptions** step. | The subscription imports and its renewals are recorded. If PayPal isn't connected, the subscription doesn't import until you connect it and click **Retry**. |
| **Legacy PayPal** | Deactivate MemberPress and connect the same PayPal account. | Renewals are recorded. The subscription can only be cancelled in PayPal. |
| **PayPal Vaulting** | Nothing to set up. | Imported, but it can't renew. The membership ends when the paid period runs out. |
| **PayPal with no subscription ID** | Nothing to set up. | Renewals can't be recorded. The membership ends when the paid period runs out. |
| **Other gateways**, such as Authorize.net or offline payments | If the gateway still charges, cancel the subscription there. | It can't renew in Fluent Members. The membership ends when the paid period runs out. |

## Status mapping

The status comes from the MemberPress status and whether the member is still paid up.

For recurring memberships:

| MemberPress status | Paid up | Fluent Members status |
|---|---|---|
| active, confirmed | Yes | Active |
| active, confirmed | No | Expired |
| suspended | Yes | Active |
| suspended | No | Suspended |
| cancelled | Yes | Active |
| cancelled | No | Cancelled |
| any other status | Either | Cancelled |

For one-time memberships, a complete or confirmed transaction becomes **Active**, or **Expired** once its end date has passed. A refunded transaction, or any other status, becomes **Cancelled**.

## After the migration

- Compare member and subscription totals in Fluent Members with MemberPress.
- Check the imported [Access Groups](/docs/access-groups/) and restrict by hand anything the **Before You Migrate** panel listed.
- Log in as a sample member and open protected content.
- Point members to your [Member Portal](/docs/members/portal/setup).
- Deactivate MemberPress as soon as the migration and its optional steps are done. Changes MemberPress records afterwards aren't imported.
