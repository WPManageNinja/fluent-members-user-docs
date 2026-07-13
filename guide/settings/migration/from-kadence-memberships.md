# Migration from Kadence Memberships

The Migration tool imports your **Kadence Memberships** data levels, access groups, members, payments, and subscriptions into Fluent Members.

> [!Note]
> **Kadence Memberships** was previously known as **Restrict Content Pro (RCP)**. The source plugin was renamed, and Fluent Members updated its integration name to match in v1.1.0. The migration card in Fluent Members shows **Kadence Memberships**.

Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- Kadence Memberships must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** if you want payment history, subscriptions, or corporate seat data imported, or if members had active PayPal subscriptions you want to continue.
- Complete [PayPal Setup](/guide/settings/payment-settings/paypal-setup) if members used PayPal REST PPCP and you want subscriptions to continue without re-entry.
- Take a full database backup before running any step.

## Access the Migration Wizard

Go to **Settings → Migration** and click the **Kadence Memberships** card to open the import wizard.

![Migration source selection: click the Kadence Memberships card](/images/settings/migration/kadence/access-kadence-memberships-1.webp)

## Step 1: Data Map

The wizard opens on the **Data Map** screen, which shows exactly what will be migrated and the record counts detected from Kadence Memberships.

| Kadence Memberships | Fluent Members |
|---|---|
| Membership Levels | Membership Levels |
| Active Members | Memberships |
| Total Memberships | Memberships |

Review the counts and the **Validation Warnings** at the bottom of the modal. When everything looks correct, click **Next**.

> [!Note]
> Coupon codes and discount rules cannot be migrated. If you were using the RCP Ultimate Member addon, UM account sync will no longer function after migration.

![Data Map: review what will be migrated and click Next](/images/settings/migration/kadence/mapping-data-2.webp)

## Step 2: Migration Steps

The second screen lists all migration steps. Click **Migrate All** to run every step in sequence, or click **Run** next to an individual step to run it on its own.

| Step | What it does |
|---|---|
| **1. Access Groups** | Imports Kadence access restriction groups as Fluent Members Access Groups |
| **2. Membership Levels** | Creates Fluent Members Levels matched by name to Kadence membership levels |
| **3. Drip Content** | Imports drip schedule rules (greyed out and skipped automatically if no drip data exists) |
| **4. Memberships** | Imports member records and their level assignments |
| **5. Payments** | Imports payment records as Transaction rows (Pro) |
| **6. Subscriptions** | Imports subscription records; transfers live PayPal REST PPCP subscriptions if configured (Pro) |
| **7. Corporate Members** | Imports corporate seat data (greyed out and skipped automatically if no corporate data exists) |
| **8. Cleanup & Verify** | Finalises the migration and marks it complete. Do not skip this step. |

Steps that depend on earlier steps cannot be run out of order; the wizard enforces the correct sequence automatically.

![Migration Steps: click Migrate All or run each step individually](/images/settings/migration/kadence/migrate-all-3.webp)

## Step 3: Review Data

When all steps finish, the **Migration Complete** screen shows a summary of what was imported with counts per entity. If any records failed to migrate, a warning appears with a **Download Migration Log** link: review it to see which records need manual attention.

Click **Download Migration Log** to save a record, then click **View Members** to confirm your members appear in Fluent Members.

![Migration Complete: review imported counts and click View Members](/images/settings/migration/kadence/migration-complete-4.webp)

## PayPal Subscription Transfer (Pro)

If your members were billed via **PayPal REST PPCP** in Kadence Memberships and you have [PayPal Setup](/guide/settings/payment-settings/paypal-setup) configured in Fluent Members Pro, the Subscriptions step can carry those live subscriptions over. After transfer:

- Renewals continue via PayPal webhooks; no member action required.
- Cancellations from the Member Portal correctly call PayPal to stop billing.
- The Transactions screen records new local rows going forward.

PayPal subscriptions on legacy IPN (non-PPCP) are handled via IPN continuation; Fluent Members takes over IPN routing once Kadence Memberships is deactivated.

## Status Mapping

| Kadence Memberships Status | Fluent Members Status |
|---|---|
| active | Active |
| expired | Expired |
| cancelled | Cancelled |
| disabled | Suspended |
| pending | Pending |

## After Migration

Once the Cleanup & Verify step finishes, confirm the import was successful:

- **Verify counts**: Compare member totals in Fluent Members against Kadence Memberships records.
- **Set up Access Groups**: Assign your Levels to Access Groups and add protected content. This step is always manual. See [Access Groups](/guide/access-groups/).
- **Test access**: Log in as a sample member and confirm their content is accessible or restricted as expected.
- **Rebuild email templates**: See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL**: Send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate Kadence Memberships**: Only after full verification. Keep it installed for a few weeks in case you need to reference its data.

![Imported members visible in Fluent Members → Members](/images/settings/migration/kadence/view-member-5.webp)
