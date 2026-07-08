# Migration

The Migration tool lets you move membership data from another plugin into Fluent Members. The wizard supports three source plugins — **Paid Memberships Pro**, **MemberPress**, and **Kadence Memberships** — and runs each import in chunked steps to avoid PHP timeouts on large datasets.

## Access Migration

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Migration** from the left-hand menu.

## Supported Sources

The Migration page shows one card per supported source plugin. Each card displays a **Detected** or **Not Detected** badge:

- **Detected** — the source plugin is currently active on this site. Click the card to open its import wizard.
- **Not Detected** — the source plugin is not active. Activate it before running the migration.

| Source Plugin | Notes |
|---|---|
| **Paid Memberships Pro** | Full support — levels, members, subscriptions, orders, and PayPal import (Pro). |
| **MemberPress** | Full support — levels, members, subscriptions, orders, Stripe live-transfer, and PayPal import (Pro). |
| **Kadence Memberships** | Full support — levels, members, subscriptions, payments, and PayPal import (Pro). Previously named Restrict Content Pro. |

## What Gets Migrated

| Data | Paid Memberships Pro | MemberPress | Kadence Memberships |
|---|---|---|---|
| Membership levels → Fluent Members Levels | Yes | Yes | Yes |
| Member assignments | Yes | Yes | Yes |
| Member status (active, expired, cancelled) | Yes | Yes | Yes |
| Subscription records | Yes (Pro) | Yes (Pro) | Yes (Pro) |
| Transaction / order records | Yes (Pro) | Yes (Pro) | Yes (Pro) |
| Stripe subscription live-transfer | No | Yes (Pro) | No |
| PayPal PPCP subscription import | Yes (Pro) | Yes (Pro) | Yes (Pro) |

::: warning Content restriction rules are not migrated
The wizard imports member data and level assignments only. Which pages and posts are protected — and under which Access Groups — must be configured manually in Fluent Members after the import. See [Access Groups](/guide/access-groups/) to set these up.
:::

## Before You Start

Complete these steps before opening any migration wizard:

1. **Back up your database.** Take a full snapshot before touching anything.
2. **Install Fluent Members** (and Pro if you need subscriptions, transactions, or Stripe transfer).
3. **Keep the source plugin active** throughout the migration. Do not deactivate it until the cleanup step is complete.
4. **Configure Stripe** in [Stripe Setup](/guide/settings/payment-settings/stripe-setup) if the source plugin used Stripe and you want to keep existing subscriptions running (MemberPress + Pro only).
5. **Configure PayPal** in [PayPal Setup](/guide/settings/payment-settings/paypal-setup) if the source plugin used PayPal REST PPCP subscriptions and you want them to continue without members re-entering payment details (Pro only).

## Running the Migration

1. Open **Settings → Migration** and click the card for your source plugin.
2. Walk the wizard steps in order — each step must complete before the next begins.
3. Follow the per-source walkthrough for your plugin:
   - [From Paid Memberships Pro](/guide/settings/migration/from-paid-memberships-pro)
   - [From MemberPress](/guide/settings/migration/from-memberpress)
   - [From Kadence Memberships](/guide/settings/migration/from-kadence-memberships)

::: tip Steps are safe to re-run
The wizard uses a chunked step model. If a step is interrupted, re-running it updates existing rows rather than creating duplicates — but a database backup before you start is still strongly recommended.
:::

## After Migration

Once the wizard completes:

- **Verify member counts** — confirm imported totals match the source plugin's records.
- **Set up Access Groups** — assign your new Membership Levels to Access Groups and add protected content to them.
- **Test access** — log in as a sample member and confirm content is accessible or restricted as expected.
- **Deactivate the source plugin** — only after verification. Keep it installed (not deleted) for a few weeks in case you need to reference its data.
