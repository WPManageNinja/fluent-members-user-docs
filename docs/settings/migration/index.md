---
title: "Migration"
description: "Import levels, access rules, members and billing records into Fluent Members from Paid Memberships Pro, MemberPress or Kadence Memberships."
---

# Migration

The **Migration** tool imports your membership data from **Paid Memberships Pro**, **MemberPress** or **Kadence Memberships** into Fluent Members. Use it when you are moving an existing membership site, so you don't have to rebuild levels and members by hand.

## Open Migration

Click the **Settings** gear in the top-right corner of any Fluent Members screen, then click **Migration**.

![Screenshot of the Migration settings screen with three source cards. Paid Memberships Pro and MemberPress show Not Detected, and Kadence Memberships is available](/images/settings/migration/migration-index-sources.webp)

The screen shows one card per source plugin. A card you can click means the plugin is active on this site. A greyed-out card shows **Not Detected**, so activate that plugin first.

## What each source imports

The steps differ slightly per source. The wizard shows the exact records it found on your site before anything is written.

| Data | Paid Memberships Pro | MemberPress | Kadence Memberships |
|---|---|---|---|
| Membership levels | Yes | Yes | Yes |
| Access rules, as **Access Groups** | Yes | Yes | Yes |
| Members and their memberships | Yes | Yes | Yes |
| Corporate or group members | Yes | Yes | Yes |
| Content drip | Yes | No | Yes |
| Orders and transactions (Pro) | Yes | Yes | Yes, from the **Payments** step |
| Subscriptions (Pro) | Yes | Yes | Yes |
| Stripe subscriptions keep renewing (Pro) | Yes | Yes | Yes |
| PayPal subscriptions keep renewing (Pro) | Yes | Yes | Legacy PayPal only |

Steps that need Pro show **Requires Pro** when Fluent Members Pro is not active.

> [!Note]
> Each source has its own list of settings that are not migrated, such as coupon or discount codes, email templates and some redirects. See the page for your source.

## Before you start

1. Back up your database. Outside debug mode, a migration cannot be undone from this screen.
2. Install **Fluent Members**. Add **Fluent Members Pro** if you want subscriptions, orders and transactions.
3. Keep the source plugin active while the migration runs.
4. If members pay through Stripe, connect the same Stripe account in [Stripe Setup](/docs/settings/payment-settings/stripe-setup) and add the Fluent Members webhook in Stripe.
5. If members pay through PayPal, connect the same PayPal account in [PayPal Setup](/docs/settings/payment-settings/paypal-setup).

## How the wizard works

Click a source card to open its wizard. The wizard has three screens, and nothing is written until you run a step on the second one. Your data in the source plugin is never changed or deleted.

1. **Data Map:** Shows **What will be imported**, with a record count per row, and a **Before You Migrate** panel built from what the wizard found on your site. Read this panel carefully. It names the subscriptions, content and level terms that need your attention. Click **Next**.
2. **Migration:** Lists the **Migration Steps**. The steps run in the listed order. Click **Migrate All** to run them all, or **Run** to run the next one.
3. **Review Data:** Click **View Summary** when the steps finish. It shows the record total and a **What was imported** table. Click **Download Migration Log** to keep a record, then **View Members**.

### While the steps run

Keep the browser tab open. Progress is saved, so if the tab closes, reopen the same migration and click **Resume Migration**.

- **Pause** stops the run so you can continue later.
- A hint such as **Run Membership Levels first** names the next step to finish. **Run** stays disabled on later steps until the earlier ones are done.
- **Retry** appears on a step that failed or needs another pass.
- **Completed**, **Skipped** and **Not Found** show how a step ended. **Not Found** means the source had no records for it.

Each step runs once, and completed steps are skipped.

### Optional steps

Two optional steps can appear after **Cleanup & Verify**:

- **Convert FluentCRM Automations:** Copies FluentCRM automations that start on the source plugin's triggers into Fluent Members automations for the migrated levels. A published automation stays published and a draft stays a draft. One that checks the old plugin's membership condition stays a draft so you can edit that condition first. The originals are not changed. This step appears when FluentCRM is active and has such automations, and **Migrate All** runs it.
- **Sync Integrations:** Announces every migrated member with an active or trial membership as a new level assignment, so integration feeds and FluentCRM automations that start on **Membership Level Assigned** run for them. Those automations can send their own emails, but Fluent Members sends none. **Migrate All** does not run this step, so click it yourself when you're ready.

### Reset Migration

**Reset Migration** appears on the **Review Data** screen only when `WP_DEBUG` is on. It permanently deletes the members, payments and subscriptions imported from that source, plus the imported levels and Access Groups nothing else uses. Automations already converted stay in FluentCRM.

## Walkthrough for your source

- [From Paid Memberships Pro](/docs/settings/migration/from-paid-memberships-pro)
- [From MemberPress](/docs/settings/migration/from-memberpress)
- [From Kadence Memberships](/docs/settings/migration/from-kadence-memberships)

## After the migration

- **Check your members:** Compare totals in **Fluent Members → Members** with the source plugin.
- **Check your Access Groups:** Confirm that imported groups protect what you expect. Restrictions the wizard could not import become public once the source plugin is off, so restrict them by hand.
- **Test access:** Log in as a sample member and open protected content.
- **Check emails:** Members with an upcoming end date get the **Membership Expiring** email if it is enabled. See [Email Notifications](/docs/settings/email-configuration/email-notifications).
- **Deactivate the source plugin:** Do this as soon as the migration and its optional steps are done. Changes the source plugin records afterwards aren't imported.
