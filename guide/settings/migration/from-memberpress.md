# Migration from MemberPress

The Migration tool imports your **MemberPress** membership data levels, members, subscriptions, transactions, and payment history into Fluent Members. MemberPress is the only source that supports a **live payment subscription transfer** (Pro): existing Stripe or PayPal REST PPCP subscribers continue to be billed automatically after migration without re-entering their payment details.

Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- MemberPress must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** if you want subscriptions, transaction history, Stripe live-transfer, or PayPal import.
- Complete [Stripe Setup](/guide/settings/payment-settings/stripe-setup) if members used Stripe and you want subscriptions to continue without re-entry.
- Complete [PayPal Setup](/guide/settings/payment-settings/paypal-setup) if members used PayPal REST PPCP and you want subscriptions to continue without re-entry.
- Take a full database backup before running any step.

## Access the Migration Wizard

Go to **Settings → Migration** and click the **MemberPress** card to open the import wizard.

![Migration source selection: click the MemberPress card](/images/settings/migration/memberpress/access-memberpress-1.webp)

## Step 1: Data Map

The wizard opens on the **Data Map** screen, which shows exactly what will be migrated and the record counts detected from MemberPress.

| MemberPress | Fluent Members |
|---|---|
| Membership Levels | Membership Levels |
| Rules | Access Groups |
| Members (one-time) | Memberships |
| Transactions (Pro) | Transactions |

Review the counts and the **Validation Warnings** at the bottom of the modal. When everything looks correct, click **Next**.

> [!Note]
> Coupon codes and scheduled email reminders from MemberPress cannot be migrated and will need to be recreated in Fluent Members manually.

![Data Map: review what will be migrated and click Next](/images/settings/migration/memberpress/import-from-memberships-2.webp)

## Step 2: Migration Steps

The second screen lists all migration steps. Click **Migrate All** to run every step in sequence, or click **Run** next to an individual step to run it on its own.

| Step | What it does |
|---|---|
| **1. Access Groups** | Imports MemberPress Rules as Fluent Members Access Groups |
| **2. Membership Levels** | Creates Fluent Members Levels matched by name to MemberPress memberships |
| **3. Memberships** | Imports member records and their level assignments |
| **4. Orders** | Imports order records as Transaction rows (Pro) |
| **5. Transactions** | Imports payment transaction history (Pro) |
| **6. Subscriptions** | Imports subscription records; transfers live Stripe or PayPal subscriptions if configured (Pro) |
| **7. Corporate Members** | Imports corporate seat data (skipped automatically if no corporate data exists) |
| **8. Cleanup & Verify** | Finalises the migration and marks it complete. Do not skip this step. |

![Migration Steps: click Migrate All or run each step individually](/images/settings/migration/memberpress/migrate-all-3.webp)

## Step 3: Review Data

When all steps finish, the **Migration Complete** screen shows a summary of what was imported with counts per entity. Click **Download Migration Log** to save a record, then click **View Members** to confirm your members appear in Fluent Members.

![Migration Complete: review imported counts and click View Members](/images/settings/migration/memberpress/migration-complete-4.webp)

## Stripe Subscription Transfer (Pro)

When Fluent Members Pro is active and [Stripe Setup](/guide/settings/payment-settings/stripe-setup) is configured with the same Stripe account MemberPress used, the Subscriptions step transfers each Stripe-billed subscription by updating its metadata in Stripe. After transfer:

- Renewals continue charging on the existing Stripe subscriptions; no member action required.
- Cancellations from the Member Portal correctly call Stripe to stop billing.
- The Transactions screen shows new local records; Stripe Dashboard retains the original customer history.

## PayPal Subscription Transfer (Pro)

When Fluent Members Pro is active and [PayPal Setup](/guide/settings/payment-settings/paypal-setup) is configured, the Subscriptions step imports live **PayPal REST PPCP** subscriptions from MemberPress. After transfer:

- Renewals continue via PayPal webhooks; no member action required.
- Cancellations from the Member Portal correctly call PayPal to stop billing.
- The Transactions screen records new local rows going forward.

PayPal subscriptions on legacy IPN (non-PPCP) are handled via IPN continuation; Fluent Members takes over IPN routing once MemberPress is deactivated.

> [!Note]
> Offline or manual payment subscriptions cannot be transferred automatically. Members on those payment methods will need to re-subscribe through Fluent Members after migration.

## Status Mapping

| MemberPress Status | Fluent Members Status |
|---|---|
| active | Active |
| expired | Expired |
| cancelled | Cancelled |
| suspended | Suspended |
| pending | Pending |

## After Migration

Once the Cleanup & Verify step finishes, confirm the import was successful:

- **Verify counts**: Compare member and subscription totals in Fluent Members against MemberPress records.
- **Set up Access Groups**: Assign your Levels to Access Groups and add protected content. This step is always manual. See [Access Groups](/guide/access-groups/).
- **Test access**: Log in as a sample member and confirm their content is accessible or restricted as expected.
- **Rebuild email templates**: See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL**: Send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate MemberPress**: Only after full verification. Keep it installed for a few weeks in case you need to reference its data.

![Imported members visible in Fluent Members → Members](/images/settings/migration/memberpress/preview-5.webp)
