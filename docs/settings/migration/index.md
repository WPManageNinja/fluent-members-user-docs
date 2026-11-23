---
title: "Migration"
description: "Import levels, restrictions, members and billing records into Fluent Members from Paid Memberships Pro, MemberPress or Kadence Memberships."
---

# Migration

The **Migration** tool imports your membership data from **Paid Memberships Pro**, **MemberPress** or **Kadence Memberships** into Fluent Members. Use it when you are moving an existing membership site, so you don't have to rebuild levels and members by hand.

## Open Migration

Go to **Fluent Members → Settings → Migration**. The screen reads **Select a source to import your membership data**.

<!-- TODO(screenshot): migration-index-1
  screen: Fluent Members -> Settings -> Migration
  state: Three source cards: Paid Memberships Pro, MemberPress and Kadence Memberships (Formerly Restrict Content Pro), with the FluentMembers Migration notice below
  data: one source plugin active, the other two showing Not Detected
  highlight: the active source card
  view: admin
  alt: Screenshot of the Migration screen with three source cards, one of them available and two showing Not Detected
-->

The screen shows one card per source plugin. A card you can click means the plugin is active on this site. A greyed-out card shows **Not Detected**, and its tooltip says "Plugin not detected on this site", so activate that plugin first. The **Kadence Memberships** card carries the subtitle **Formerly Restrict Content Pro**.

To open a wizard straight from a link, add `?source=` after `#/settings/migration` in the admin address, with `pmpro`, `memberpress` or `kadence_memberships`. The wizard opens if that plugin is active.

## What each source imports

The steps differ slightly per source. The wizard shows the exact records it found on your site before anything is written.

| Data | Paid Memberships Pro | MemberPress | Kadence Memberships |
|---|---|---|---|
| Membership levels | Yes | Yes | Yes |
| Free levels, imported as **Free** levels | Yes | Yes | Yes |
| Access rules, imported as Bundles | Yes | Yes | Yes |
| Members and their memberships | Yes | Yes | Yes |
| Corporate or group members | Yes | Yes | Yes |
| Content drip | Yes | No | Yes |
| Orders and transactions (Pro) | Yes | Yes | Yes, from the **Payments** step |
| Subscriptions (Pro) | Yes | Yes | Yes |
| Stripe subscriptions keep renewing (Pro) | Yes | Yes | Yes |
| PayPal subscriptions keep renewing (Pro) | Yes | Yes | Legacy PayPal only |

Steps that need Pro show **Requires Pro** when Fluent Members Pro is not active.

A free level in the source becomes a [Free level](/docs/levels/free-levels) in Fluent Members. A free level that is a group or corporate level, or that still has live billing subscriptions, is imported as a paid level with its $0 price turned off instead, and the log carries a warning so you can review it.

> [!Note]
> Each source has its own list of settings that are not migrated, such as coupon or discount codes, email templates and some redirects. See the page for your source.

## Before you start

1. Back up your database. Outside debug mode, a migration cannot be undone from this screen.
2. Install **Fluent Members**. Add **Fluent Members Pro** if you want subscriptions, orders and transactions.
3. Keep the source plugin active while the migration runs.
4. If members pay through Stripe, connect the same Stripe account in [Set up Stripe](/docs/settings/payment-settings/stripe-setup) and add the Fluent Members webhook in Stripe.
5. If members pay through PayPal, connect the same PayPal account in [Set up PayPal](/docs/settings/payment-settings/paypal-setup).

## How the wizard works

Click a source card to open its wizard, titled **Import from** followed by the plugin name. The footer shows **Step 1/3**, **Step 2/3** or **Step 3/3**. Nothing is written until you run a step on the second screen. Your data in the source plugin is never changed or deleted.

1. **Data Map:** Shows **What will be imported**, with a record count per row, and a **Before You Migrate** panel built from what the wizard found on your site. Read this panel carefully. It names the subscriptions, content and level terms that need your attention. On Paid Memberships Pro and Kadence Memberships, click **Scan again** to refresh the counts. Click **Next**. If your source site uses a currency with three decimal places, an error alert shows and **Next** stays disabled.
2. **Migration:** Lists the **Migration Steps**. The steps run in the listed order. Click **Migrate All** to run them all, or **Run** to run one step.
3. **Review Data:** Click **View Summary** when the steps finish. It shows the record total and a **What was imported** table. Click **Download Migration Log** to keep a record, then **View Members**.

### Email migrated members

The **Migration** screen has an **Email migrated members** checkbox. It is off by default.

- **On:** Each imported member with active access gets the **Welcome Email** once the import finishes, and expiring reminders go out when due. Click **Edit the Welcome Email** to adjust it first. See [Email Notifications](/docs/settings/email-configuration/email-notifications).
- **Off:** Nothing is sent, and members already inside the reminder window skip the **Membership Expiring** email.

The choice locks once the first step starts.

### While the steps run

Keep the browser tab open. Progress is saved, so if the tab closes, reopen the same migration and click **Resume Migration**.

- **Pause** stops the run so you can continue later.
- A hint such as **Run Membership Levels first** names the next step to finish. **Run** stays disabled on later steps until the earlier ones are done.
- **Retry** appears on a step that failed or needs another pass.
- **Completed**, **Skipped** and **Nothing to import** show how a step ended. **Nothing to import** means the source had no records for it.

Each step runs once, and completed steps are skipped.

### Optional steps

Two optional steps can appear after **Cleanup & Verify**:

- **Convert FluentCRM Automations:** Copies FluentCRM automations that start on the source plugin's triggers into Fluent Members automations for the migrated levels. A published automation stays published and a draft stays a draft. One that checks the old plugin's membership condition stays a draft so you can edit that condition first. The originals are not changed. This step appears when FluentCRM is active and has such automations, and **Migrate All** runs it.
- **Sync Integrations:** Announces every migrated member with an active or trial membership as a new level assignment, so FluentCommunity spaces and courses linked on each level's **Content Access** tab, integration feeds and FluentCRM automations that start on **Membership Level Assigned** run for them. Those automations can send their own emails, but this step sends none. **Migrate All** does not run this step, so click **Sync** yourself when you're ready.

### Reset Migration

**Reset Migration** appears on the **Review Data** screen only when `WP_DEBUG` is on. It permanently deletes the members, payments and subscriptions imported from that source, plus the imported levels and Bundles nothing else uses. Automations already converted stay in FluentCRM.

When the reset finishes, a notice tells you what it kept. An imported level stays if it still has members, payments or a FluentCRM automation that uses it, and an imported Bundle stays if a level still uses it. If an item could not be removed right now, run **Reset Migration** again.

## Walkthrough for your source

- [From Paid Memberships Pro](/docs/settings/migration/from-paid-memberships-pro)
- [From MemberPress](/docs/settings/migration/from-memberpress)
- [From Kadence Memberships](/docs/settings/migration/from-kadence-memberships)

## After the migration

- **Check your members:** Compare totals in **Fluent Members → Members** with the source plugin.
- **Check your content access:** Open the imported levels and confirm their **Content Access** tab protects what you expect. See [Content Access](/docs/levels/content-access). Restrictions the wizard could not import become public once the source plugin is off, so restrict them by hand.
- **Test access:** Log in as a sample member and open protected content.
- **Deactivate the source plugin:** Do this as soon as the migration and its optional steps are done. Changes the source plugin records afterwards aren't imported.
