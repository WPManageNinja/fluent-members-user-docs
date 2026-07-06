# Migration from MemberPress

The Migration tool allows you to import your MemberPress membership data into Fluent Members. The wizard guides you through six steps: detecting your existing data, analyzing it, importing members, importing subscriptions, importing orders, and cleanup. MemberPress is the only source that supports a **live Stripe subscription transfer** (Pro), meaning existing subscribers do not need to re-enter their card details after migration.

Before you begin, complete the [Migration Overview](/guide/settings/migration/) checklist.

## Before You Start

- MemberPress must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Install **Fluent Members Pro** and complete [Stripe Setup](/guide/settings/payment-settings/stripe-setup) if you want subscriptions, transaction history, or the Stripe live-transfer imported.
- Take a full database backup before running any step.

## Data Mapping

| MemberPress | Fluent Members |
|---|---|
| Membership (product) | Level |
| Membership pricing | Pricing Plan |
| Transaction (active) | Membership row |
| Subscription | Subscription row (Pro) |
| Transaction (paid) | Transaction row (Pro) |

::: warning Content restriction rules are not imported
Which pages and posts are restricted must be configured manually in Fluent Members after migration. See [Access Groups](/guide/access-groups/) to set up content rules.
:::

## Migration Steps

Open **Settings → Migration**, click the **MemberPress** card, and run each step in order.

1. **Detect**: Checks that MemberPress tables exist and returns a count of members, products, subscriptions, and transactions.

2. **Analyze**: Maps each MemberPress Membership product to a Fluent Members Level. Levels are created or matched by name.

3. **Import Members**: Reads MemberPress member records in batches and creates Membership rows in Fluent Members.

4. **Import Subscriptions** *(Pro)*: Imports subscription records. If the subscription was billed via Stripe and Fluent Members Pro has Stripe connected, the live Stripe subscription is transferred — members continue to be billed without re-entering card details.

5. **Import Orders** *(Pro)*: Imports MemberPress transaction records as Fluent Members Transaction rows.

6. **Cleanup**: Finalises the migration and marks it as complete.

If any step returns an unexpected count, click **Reset Migration State** and re-run from that step.

## Stripe Subscription Transfer (Pro)

When Fluent Members Pro is active and [Stripe Setup](/guide/settings/payment-settings/stripe-setup) is configured with the same Stripe account MemberPress used, the Import Subscriptions step transfers each Stripe-billed subscription to Fluent Members by updating its metadata in Stripe. After transfer:

- Renewals continue charging on the existing Stripe subscriptions — no member action required.
- Cancellations from the Member Portal correctly call Stripe to stop billing.
- The Transactions screen shows new local records; Stripe Dashboard retains the original customer history.

Subscriptions on non-Stripe gateways (PayPal, offline) are not transferred. Those members will need to re-purchase after migration.

## Status Mapping

| MemberPress Status | Fluent Members Status |
|---|---|
| active | Active |
| expired | Expired |
| cancelled | Cancelled |
| suspended | Suspended |
| pending | Pending |

## After Migration

- **Verify counts**: Compare totals in Fluent Members against MemberPress records.
- **Set up Access Groups**: Assign Levels to Access Groups and add protected content. This step is always manual.
- **Test access**: Log in as a sample member and confirm their content is accessible.
- **Rebuild email templates**: See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL**: Send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate MemberPress**: Only after full verification. Keep it installed for a few weeks in case you need to reference its data.
