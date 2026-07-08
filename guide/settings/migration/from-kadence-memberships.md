# Migration from Kadence Memberships

The Migration tool allows you to import your **Kadence Memberships** data into Fluent Members. The wizard guides you through detecting your existing data, analyzing it, importing members, and completing the migration.

> [!Note]
> **Kadence Memberships** was previously known as **Restrict Content Pro (RCP)**. Fluent Members updated the integration name in v1.1.0. The migration card in Fluent Members shows **Kadence Memberships**. Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- Kadence Memberships must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** if you want subscription and payment records imported, or if members had active PayPal subscriptions you want to continue.
- Take a full database backup before running any step.

## Data Mapping

| Kadence Memberships | Fluent Members |
|---|---|
| Membership Level | Level |
| Level pricing | Pricing Plan |
| Member record | Membership row |
| Recurring subscription (Pro) | Subscription row |
| Payment record (Pro) | Transaction row |

::: warning Content restriction rules are not imported
Payment history, subscription records (without Pro), and content restriction rules (which pages are in which levels) do not transfer automatically. Content rules must be set up manually in [Access Groups](/guide/access-groups/) after migration.
:::

## Migration Steps

Open **Settings → Migration**, click the **Kadence Memberships** card, and run each step in order. Unlike other wizards, Kadence uses a **named-step** model — steps are run individually and some steps are optional depending on your data.

1. **Analyze**: Scans your Kadence Memberships data and maps each Membership Level to a Fluent Members Level. Levels are created or matched by name.

2. **Access Groups** *(optional)*: Imports Kadence access restriction groups into Fluent Members Access Groups.

3. **Levels**: Imports membership level and pricing data.

4. **Drip** *(optional)*: Imports drip schedule rules, if any exist.

5. **Members**: Reads member records from Kadence Memberships in batches and creates Membership rows in Fluent Members.

6. **Payments** *(Pro)*: Imports payment records. Skipped if Fluent Members Pro is not active.

7. **Subscriptions** *(Pro)*: Imports subscription records. Skipped if Fluent Members Pro is not active.

8. **Corporate** *(optional, Pro)*: Imports corporate seat data if corporate memberships were used.

9. **Cleanup**: Finalises the migration and marks it as complete. Do not skip this step.

Steps that depend on earlier steps cannot be run out of order — the wizard enforces the correct sequence automatically.

If any step returns an unexpected count, click **Reset Migration State** at the bottom of the wizard and re-run from that step.

## PayPal Subscription Transfer (Pro)

If your members were billed via **PayPal REST PPCP** in Kadence Memberships and you have [PayPal Setup](/guide/settings/payment-settings/paypal-setup) configured in Fluent Members Pro, the Import Subscriptions step can carry those live subscriptions over. After transfer:

- Renewals continue via PayPal webhooks — no member action required.
- Cancellations from the Member Portal correctly call PayPal to stop billing.
- The Transactions screen records new local rows going forward.

PayPal subscriptions billed on legacy IPN (non-PPCP) are handled via IPN continuation — Fluent Members takes over IPN routing once Kadence Memberships is deactivated.

## Status Mapping

| Kadence Memberships Status | Fluent Members Status |
|---|---|
| active | Active |
| expired | Expired |
| cancelled | Cancelled |
| disabled | Suspended |
| pending | Pending |

## After Migration

- **Verify counts** — compare member totals in Fluent Members against Kadence Memberships records.
- **Set up Access Groups** — assign Levels to Access Groups and add protected content. This step is always manual.
- **Test access** — log in as a sample member and confirm their content is accessible.
- **Rebuild email templates** — see [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL** — send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate Kadence Memberships** — only after full verification. Keep it installed for a few weeks in case you need to reference its data.
