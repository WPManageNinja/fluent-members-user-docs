# Migration from Paid Memberships Pro

The Migration tool imports your **Paid Memberships Pro (PMPro)** membership data levels, access restrictions, members, subscriptions, orders, and transactions into Fluent Members.

Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- Paid Memberships Pro must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** if you want corporate memberships, drip rules, subscriptions, orders, and transactions imported.
- Complete [PayPal Setup](/guide/settings/payment-settings/paypal-setup) if members used PayPal REST PPCP and you want subscriptions to continue without re-entry.
- Take a full database backup before running any step.

## Access the Migration Wizard

Go to **Settings → Migration** and click the **Paid Memberships Pro** card to open the import wizard.

![Migration source selection: click the Paid Memberships Pro card](/images/settings/migration/paid-memberships-pro/access-paid-memberships-1.webp)

## Step 1: Data Map

The wizard opens on the **Data Map** screen, which shows exactly what will be migrated and the record counts detected from PMPro.

| PMPro | Fluent Members |
|---|---|
| Membership Levels | Membership Levels |
| Page + Category Restrictions | Access Groups |
| Active Members | Memberships |

Review the counts and the **Before You Migrate** notice at the bottom of the modal. When everything looks correct, click **Next**.

> [!Note]
> PMPro shortcodes (`[pmpro_*]`) are not replaced automatically: update them manually after migration. Member login/account redirect settings are migrated to Fluent Members settings.

![Data Map: review what will be migrated and click Next](/images/settings/migration/paid-memberships-pro/mapping-data-2.webp)

## Step 2: Migration Steps

The second screen lists all migration steps. Click **Migrate All** to run every step in sequence, or click **Run** next to an individual step to run it on its own.

| Step | What it does |
|---|---|
| **1. Membership Levels** | Creates Fluent Members Levels matched by name to PMPro membership levels |
| **2. Access Groups** | Imports PMPro page and category restrictions as Fluent Members Access Groups |
| **3. Members** | Imports member records and their level assignments |
| **4. Corporate Memberships** | Imports corporate/group seat data (Pro), skipped automatically if no corporate data exists |
| **5. Content Drip Rules** | Imports drip schedule rules (Pro), skipped automatically if no drip data exists |
| **6. Subscriptions** | Imports recurring subscription records; transfers live PayPal REST PPCP subscriptions if configured (Pro) |
| **7. Orders** | Imports PMPro order records (Pro) |
| **8. Transactions** | Imports payment transaction history as Transaction rows (Pro) |
| **9. Cleanup & Verify** | Finalises the migration and marks it complete. Do not skip this step. |

![Migration Steps: click Migrate All or run each step individually](/images/settings/migration/paid-memberships-pro/migrate-all-3.webp)

## Step 3: Review Data

When all steps finish, the **Migration Complete** screen shows a summary of what was imported with counts per entity. Click **Download Migration Log** to save a record, then click **View Members** to confirm your members appear in Fluent Members.

![Migration Complete: review imported counts and click View Members](/images/settings/migration/paid-memberships-pro/migration-complete-4.webp)

## PayPal Subscription Transfer (Pro)

If your members were billed via **PayPal REST PPCP** in Paid Memberships Pro and you have [PayPal Setup](/guide/settings/payment-settings/paypal-setup) configured in Fluent Members Pro, the Subscriptions step can carry those live subscriptions over. After transfer:

- Renewals continue via PayPal webhooks; no member action required.
- Cancellations from the Member Portal correctly call PayPal to stop billing.
- The Transactions screen records new local rows going forward.

PayPal subscriptions on legacy IPN (non-PPCP) are handled via IPN continuation; Fluent Members takes over IPN routing once PMPro is deactivated.

## Status Mapping

| PMPro Status | Fluent Members Status |
|---|---|
| active | Active |
| inactive | Expired |
| expired | Expired |
| cancelled | Cancelled |
| admin_cancelled | Cancelled |

## After Migration

Once the Cleanup & Verify step finishes, confirm the import was successful:

- **Verify counts**: Compare member totals in Fluent Members against PMPro's records.
- **Set up Access Groups**: Confirm imported Access Groups reflect your intended content protection, and assign any remaining Levels manually. See [Access Groups](/guide/access-groups/).
- **Test access**: Log in as a sample member and confirm their content is accessible.
- **Rebuild email templates**: See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL**: Send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate PMPro**: Only after full verification. Keep it installed for a few weeks in case you need to reference its data.

![Imported members visible in Fluent Members → Members](/images/settings/migration/paid-memberships-pro/members-5.webp)
