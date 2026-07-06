# Migration from Content Restriction Pro

The **Migration** tool allows you to import your **Content Restriction Pro** membership data into Fluent Members. The migration process guides you through each step, including detecting your existing data, analyzing it, importing members, and completing the migration.

>[!Note]
> **Content Restriction Pro** is also known as **Restrict Content Pro (RCP)**. In Fluent Members, it appears as **Content Restriction Pro** on the Migration page. Only member data is imported. Subscription and transaction history are not included in the migration. Before you begin, make sure you have completed the **[Migration Overview](/guide/settings/migration/)** checklist.

#### Before You Start

- Content Restriction Pro must be **active** on the site so the Migration card shows **Detected**.
- Fluent Members must be installed and active.
- Fluent Members Pro is **not required** this migration imports levels and members only.
- Take a full database backup before running any step.

## Data Mapping

| Content Restriction Pro | Fluent Members |
|---|---|
| Subscription Level | Level |
| Level pricing | Pricing Plan |
| Member (subscription) | Membership row |

::: warning Subscriptions, orders, and content rules are not imported
Payment history, subscription records, and content restriction rules (which pages are in which levels) do not transfer from Content Restriction Pro. Content rules must be set up manually in [Access Groups](/guide/access-groups/) after migration.
:::

## Migration Steps

Open **Settings → Migration**, click the **Content Restriction Pro** card, and run each step in order.

1. **Detect**: Checks that Content Restriction Pro tables exist and returns a count of members and levels.

2. **Analyze**: Maps each RCP Subscription Level to a Fluent Members Level. Levels are created or matched by name.

3. **Import Members**: Reads member records from Content Restriction Pro in batches and creates Membership rows in Fluent Members.

4. **Cleanup**: Finalises the migration and marks it as complete.

## Status Mapping

| Content Restriction Pro Status | Fluent Members Status |
|---|---|
| active | Active |
| expired | Expired |
| cancelled | Cancelled |
| disabled | Suspended |
| pending | Pending |

## After Migration

- **Verify counts** compare member totals in Fluent Members against Content Restriction Pro records.
- **Set up Access Groups** assign Levels to Access Groups and add protected content. This step is always manual.
- **Test access** log in as a sample member and confirm their content is accessible.
- **Rebuild email templates** see [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Update the portal URL** send members the new [Member Portal](/guide/members/portal/setup) link.
- **Deactivate Content Restriction Pro** only after full verification.
