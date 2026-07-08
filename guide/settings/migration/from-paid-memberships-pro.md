# Migration from Paid Memberships Pro

The Migration tool allows you to import your Paid Memberships Pro membership data into Fluent Members. The wizard guides you through six steps: detecting your existing data, analyzing it, importing members, importing subscriptions, importing orders, and cleanup.

Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- Paid Memberships Pro must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** if you want subscriptions and transaction history imported.
- Take a full database backup before running any step.

## Data Mapping

| Paid Memberships Pro | Fluent Members |
|---|---|
| Membership Level | Level |
| User → Level (active row) | Membership row |
| Member status | Membership status (see mapping below) |
| Recurring subscription | Subscription row (Pro) |
| Order / payment | Transaction row (Pro) |

::: warning Content restriction rules are not imported
Which pages and posts are restricted and under which Access Groups — must be set up manually after migration. See [Access Groups](/guide/access-groups/) to configure content rules.
:::

## Migration Steps

Open **Settings → Migration**, click the **Paid Memberships Pro** card, and run each step in order.

1. **Detect**: Checks that PMPro tables exist and returns a count of members, levels, subscriptions, and orders. The migration cannot continue if PMPro tables are not found.

2. **Analyze**: Maps each PMPro Membership Level to a Fluent Members Level. Levels are created or matched by name. Review the mapping before proceeding.

3. **Import Members**: Reads members from PMPro in batches and creates Membership rows in Fluent Members. Returns an imported/skipped/total count when done.

4. **Import Subscriptions** *(Pro)*: Imports recurring subscription records. Skipped automatically if Fluent Members Pro is not active.

5. **Import Orders** *(Pro)*: Imports PMPro order records as Transaction rows. Skipped automatically if Fluent Members Pro is not active.

6. **Cleanup**: Finalises the migration and marks it as complete. Do not skip this step.

If any step returns an unexpected count, click **Reset Migration State** at the bottom of the wizard and re-run from that step.

## PayPal Subscription Transfer (Pro)

If your members were billed via **PayPal REST PPCP** in Paid Memberships Pro and you have [PayPal Setup](/guide/settings/payment-settings/paypal-setup) configured in Fluent Members Pro, the Import Subscriptions step can carry those live subscriptions over. After transfer:

- Renewals continue via PayPal webhooks — no member action required.
- Cancellations from the Member Portal correctly call PayPal to stop billing.
- The Transactions screen records new local rows going forward.

PayPal subscriptions on legacy IPN (non-PPCP) are handled via IPN continuation once PMPro is deactivated.

## Status Mapping

| PMPro Status | Fluent Members Status |
|---|---|
| active | Active |
| inactive | Expired |
| expired | Expired |
| cancelled | Cancelled |
| admin_cancelled | Cancelled |

## After Migration

- **Verify counts**: Compare member totals in Fluent Members against PMPro's records.
- **Set up Access Groups**: Assign your Levels to Access Groups and add protected content. This step is always manual.
- **Test access**: Log in as a sample member and confirm their content is accessible.
- **Rebuild email templates**: See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL**: Send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate PMPro**: Only after full verification. Keep it installed for a few weeks in case you need to reference its data.
