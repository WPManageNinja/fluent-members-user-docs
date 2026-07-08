# Migration

The Migration tool lets you move membership data from another plugin into Fluent Members. The wizard supports three source plugins **Paid Memberships Pro**, **MemberPress**, and **Kadence Memberships** and runs each import in chunked steps to avoid PHP timeouts on large datasets.

## Access Migration

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Migration** from the left-hand menu.

![Access Migration](/images/settings/migration/migration-1.webp)

## Supported Sources

The Migration page shows one card per supported source plugin. Each card displays a **Detected** or **Not Detected** badge:

- **Detected**: The source plugin is currently active on this site. Click the card to open its import wizard.
- **Not Detected**: The source plugin is not active. Activate it before running the migration.

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

> [!Note]
> Only member data and membership level assignments are imported during the migration. Protected pages, posts, and access rules are **not** migrated. After the import is complete, you'll need to create and configure your **[Access Groups](/guide/access-groups/)** in Fluent Members to protect your content.
## Before You Start

Complete these steps before opening any migration wizard:

1. **Back up your database.** Take a full snapshot before touching anything.
2. **Install Fluent Members** (and Pro if you need subscriptions, transactions, or Stripe transfer).
3. **Keep the source plugin active** throughout the migration. Do not deactivate it until the cleanup step is complete.
4. **Configure Stripe** in [Stripe Setup](/guide/settings/payment-settings/stripe-setup) if the source plugin used Stripe and you want to keep existing subscriptions running (MemberPress + Pro only).
5. **Configure PayPal** in [PayPal Setup](/guide/settings/payment-settings/paypal-setup) if the source plugin used PayPal REST PPCP subscriptions and you want them to continue without members re-entering payment details (Pro only).

## Running the Migration

1. Open **Settings → Migration** and click the card for your source plugin.
2. Walk the wizard steps in order each step must complete before the next begins.
3. Follow the per-source walkthrough for your plugin:
   - [From Paid Memberships Pro](/guide/settings/migration/from-paid-memberships-pro)
   - [From MemberPress](/guide/settings/migration/from-memberpress)
   - [From Kadence Memberships](/guide/settings/migration/from-kadence-memberships)

::: tip Steps are safe to re-run
If the migration is interrupted, you can run it again without creating duplicate members. However, we strongly recommend creating a backup of your database before starting the migration.
:::


## After Migration

Once the migration is complete, follow these steps:

* **Check your members:** Make sure all members and membership levels have been imported correctly.
* **Create Access Groups:** Set up **Access Groups** and assign the appropriate **Membership Levels** to protect your content.
* **Test member access:** Log in with a test member account to confirm that protected content is accessible only to the correct members.
* **Disable the old plugin:** After verifying everything is working correctly, deactivate the source plugin. It's a good idea to keep it installed for a while in case you need to review or recover any data later.
