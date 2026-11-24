---
title: "Migration from Kadence Memberships"
description: "Import Kadence Memberships or Restrict Content Pro levels, restrictions, members, payments and subscriptions into Fluent Members, including free levels."
---

# Migration from Kadence Memberships

The **Migration** tool imports your **Kadence Memberships** levels, restrictions, drip schedules, members and group members into Fluent Members. Free Kadence levels become [Free levels](/docs/levels/free-levels). With **Fluent Members Pro** (Pro) it also imports payments and subscriptions.

Kadence Memberships was previously named **Restrict Content Pro**. If your site runs Restrict Content Pro, use the same **Kadence Memberships** card.

Before you begin, read the [Migration overview](/docs/settings/migration/).

## Before you start

- Keep the plugin active on the site. Its card shows **Not Detected** otherwise.
- Install **Fluent Members Pro** if you want payments and subscriptions imported.
- Take a full database backup.

## Step 1: Data Map

Go to **Fluent Members → Settings → Migration** and click the **Kadence Memberships** card, which carries the subtitle **Formerly Restrict Content Pro**.

![Screenshot of the Migration screen with an arrow pointing to the Kadence Memberships card](/images/settings/migration/migration-index-1.webp)

The wizard opens on the **Data Map** screen, which lists **What will be imported** with the records found on your site.

![Screenshot of the Import from Kadence Memberships wizard on the Data Map screen](/images/settings/from-kadence-memberships/from-kadence-memberships-3.webp)

These rows can appear. Rows with no records are hidden, except **Membership Levels**, **Restricted Posts and Terms** and **Total Memberships**.

| In Kadence Memberships | Becomes in FluentMembers |
|---|---|
| Membership Levels | Membership Levels |
| Restricted Posts and Terms | Access Groups, which are your Bundles |
| Drip Schedules | Content Drip Rules |
| Active Members | Memberships |
| Total Memberships | Memberships |
| Payments | Orders and Transactions |
| Subscriptions | Subscriptions |
| Group Members | Corporate Members |

Read the **Before You Migrate** panel, then click **Next**. Click **Scan again** first if you changed anything in Kadence. The panel always starts with two reminders: back up your database, and run the migration with the plugin active. Besides these, it can warn you about:

- **Role-only posts:** Fluent Members cannot restrict by user role, so a post restricted only by role is public after migration. Restrict it by hand.
- **Unsupported content:** Restrictions on the post types and taxonomies the panel names cannot be migrated, and that content is public.
- **Inline restrictions and shortcodes:** Content hidden with `[restrict]` or a similar shortcode becomes public once the plugin is deactivated. Shortcodes such as `[register_form]` show as plain text.
- **Payments:** Payments made outside Stripe and PayPal aren't imported. Memberships of deleted users or levels aren't migrated, and neither are their payments.
- **Group invitations:** Pending invitations aren't migrated, so invite those members again from Fluent Members.
- **Drip rules:** Rules in months or years become 30 days per month and 365 days per year.
- **Level terms:** A cheaper first payment is dropped, so new buyers pay the renewal amount from the start. A payment plan that ends in lifetime access or immediate expiry stays that way for existing members, while new buyers keep access until the end of their last paid period.

> [!Note]
> Not migrated: discount codes, email settings, the WordPress role a level assigns, the excerpt and hide-restricted-posts settings, membership notes, discount details on past payments, and Custom Redirects add-on redirects.

## Step 2: Migration

Tick **Email migrated members** if you want them to get the **Welcome Email** once the import finishes. It is off by default. See [Migration](/docs/settings/migration/#email-migrated-members).

Click **Migrate All** to run every step in order, or click **Run** on one step.

![Screenshot of the Migration Steps list for Kadence Memberships with the Migrate All button](/images/settings/from-kadence-memberships/from-kadence-memberships-4.webp)

| Step | What it does | Needs first |
|---|---|---|
| **Access Groups** | Imports restricted posts and terms as Bundles, shown on each level's **Content Access** tab. | Nothing |
| **Membership Levels** | Creates a Fluent Members level for each Kadence level. A free level becomes a **Free** level. | Access Groups |
| **Drip Content** | Imports drip schedules. Shows **No Drip Data** if there are none. | Membership Levels, Access Groups |
| **Memberships** | Imports members and their memberships. | Membership Levels |
| **Payments** (Pro) | Imports payments as orders and transactions. | Memberships |
| **Subscriptions** (Pro) | Imports recurring subscriptions. | Memberships, Payments |
| **Corporate Members** | Imports group members. Shows **No Corporate Data** if there are none. | Membership Levels, Memberships |
| **Cleanup & Verify** | Finishes and checks the migration. | All steps above |

Optional **Convert FluentCRM Automations** and **Sync Integrations** steps can follow. See the [Migration overview](/docs/settings/migration/). A step with no records shows **Nothing to import**.

### Free levels

A free Kadence level is imported as a **Free** level. A free level that is a group level, or that still has live billing subscriptions, is imported as a paid level with its $0 price turned off, and the log carries a warning. Review that level after the migration.

## Step 3: Review Data

Click **View Summary**. The screen shows the record total, a **What was imported** table and any failed records or warnings. Click **Download Migration Log** to review them, then click **View Members**.

<!-- TODO(screenshot): from-kadence-memberships-2
  screen: Import from Kadence Memberships → Review Data
  state: What was imported table with counts and Download Migration Log
  data: a completed migration on a throwaway site
  highlight: View Members button
  view: admin
  alt: Screenshot of the Review Data screen with the What was imported table
-->

## What happens to subscriptions

Auto-renewing Stripe and PayPal memberships need Fluent Members Pro. Without it, access ends at the expiry date **while the gateway keeps charging**.

With Pro, the result depends on the gateway:

| Gateway | What you do | Result |
|---|---|---|
| **Stripe** | Connect the same account in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) and add the Fluent Members webhook in Stripe. | Renewals and cancellations reach Fluent Members. If Stripe isn't connected, the wizard shows **Stripe is not connected** with a **Go to Payment Settings** link. The subscriptions still import, but they don't renew until you connect it. |
| **PayPal** | Deactivate Kadence Memberships and the free Restrict Content plugin, then connect the same PayPal account in [PayPal Setup](/docs/settings/payment-settings/paypal-setup). | Renewals are recorded. The subscription can only be cancelled in PayPal. |
| **PayPal payment plans** | Cancel the profile in your PayPal account when its last payment arrives. | The last payment is recorded in the activity log. Fluent Members cannot cancel a legacy PayPal profile. |
| **No gateway subscription ID** | Nothing to set up. | The subscription isn't imported and renewals can't be recorded. |
| **Other gateways**, as named in the panel | Cancel the subscription at the gateway, or it keeps charging. | It can't renew in Fluent Members. Access ends at the expiry date. |

## Status mapping

The status comes from the Kadence status and the membership's dates:

| Kadence Memberships record | Fluent Members status |
|---|---|
| Disabled membership | Cancelled |
| pending | Cancelled |
| active, cancelled or free, with an expiry date in the past | Expired |
| any other status | Expired |
| active, in a trial on a level that offers one | Trial |
| active, cancelled or free, not expired | Active |

A cancelled membership with time left stays **Active** until it expires.

## After the migration

- Compare member totals in **Fluent Members → Members** with Kadence Memberships.
- Check each imported level's [Content Access](/docs/levels/content-access) tab and restrict by hand anything the **Before You Migrate** panel listed.
- Log in as a sample member and open protected content.
- Point members to your [Member Portal](/docs/members/portal/setup).
- Deactivate the plugin as soon as the migration and its optional steps are done. Changes it records afterwards aren't imported.
