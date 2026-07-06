# Migration from Paid Memberships Pro

This page walks you through importing your Paid Memberships Pro data into Fluent Members. The wizard runs six steps in sequence — detect, analyze, import members, import subscriptions, import orders, and cleanup. Complete the [Migration Overview](/guide/settings/migration/) checklist before starting.

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
Which pages and posts are restricted — and under which Access Groups — must be set up manually after migration. See [Access Groups](/guide/access-groups/) to configure content rules.
:::

## Migration Steps

Open **Settings → Migration**, click the **Paid Memberships Pro** card, and run each step in order.

1. **Detect** — Checks that PMPro tables exist and returns a count of members, levels, subscriptions, and orders. The migration cannot continue if PMPro tables are not found.

2. **Analyze** — Maps each PMPro Membership Level to a Fluent Members Level. Levels are created or matched by name. Review the mapping before proceeding.

3. **Import Members** — Reads members from PMPro in batches of 100 and creates Membership rows in Fluent Members. Returns an imported/skipped/total count when done.

4. **Import Subscriptions** *(Pro)* — Imports recurring subscription records. Skipped automatically if Fluent Members Pro is not active.

5. **Import Orders** *(Pro)* — Imports PMPro order records as Transaction rows. Skipped automatically if Fluent Members Pro is not active.

6. **Cleanup** — Finalises the migration and marks it as complete. Do not skip this step.

If any step returns an unexpected count, click **Reset Migration State** at the bottom of the wizard and re-run from that step.

## Status Mapping

| PMPro Status | Fluent Members Status |
|---|---|
| active | Active |
| inactive | Expired |
| expired | Expired |
| cancelled | Cancelled |
| admin_cancelled | Cancelled |

## After Migration

- **Verify counts** — compare member totals in Fluent Members against PMPro's records.
- **Set up Access Groups** — assign your Levels to Access Groups and add protected content. This step is always manual.
- **Test access** — log in as a sample member and confirm their content is accessible.
- **Rebuild email templates** — see [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL** — send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate PMPro** — only after full verification. Keep it installed for a few weeks in case you need to reference its data.
