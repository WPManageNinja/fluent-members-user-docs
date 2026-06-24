# Migration from Paid Memberships Pro

The PMPro-specific wizard. Walks you through importing levels, members, subscriptions, transactions, and content rules.

::: info Part of Chain 10: Migration · step 4 of 6
**Previously:** [Migration](/guide/settings/migration/)
**Next:** [Migration from MemberPress](/guide/settings/migration/from-memberpress)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- How the wizard maps PMPro concepts to Fluent Members.
- The ten step actions and what each one does.
- Verification points after each step.
- Common gotchas specific to PMPro.

**Before we start:** PMPro is active on the site (so the card shows **Detected**) and you've read [Migration, Overview](./).

::: warning Screenshot pending
A mid-flow screenshot of the wizard isn't in our reference folder yet.

[Screenshot needed: Migration wizard mid-flow, PMPro source, step-by-step UI]
:::

---

## Mapping: PMPro concepts to Fluent Members

| PMPro                             | Fluent Members                    |
|-----------------------------------|------------------------------------|
| Membership Level                  | Level (Individual or Corporate)    |
| Level pricing / billing schedule  | Pricing Plan (Native Payment or Paywalls per the source provider) |
| User → level (active row)         | Membership row (status: `active`)  |
| Recurring subscription            | Subscription row (Pro)             |
| Order / payment                   | Transaction row (Pro)              |
| Content restriction (post meta)   | Access Group + Protected Content rule |
| Group plans / family plans        | Corporate Level + child rows       |

::: tip In plain language
PMPro's "user has level X" becomes Fluent Members' "user holds Membership row for Level X." The data model is similar; the wizard does the translation.
:::

---

## The wizard steps

The wizard runs in a fixed sequence. **Do not skip ahead**, later steps assume earlier ones ran successfully.

| # | Step | What it does |
|---|------|--------------|
| 1 | **Detect / analyse** | Counts source rows; reports what will be imported. |
| 2 | **Analyse billing** | Inspects PMPro orders + recurring subscriptions to plan the Pro-only imports. |
| 3 | **Migrate Access Groups** | One Access Group per PMPro level, named after it. |
| 4 | **Migrate Levels** | Creates Fluent Members Levels with title + description; statuses mirrored. |
| 5 | **Migrate Members** | Creates a Membership row per active PMPro user-level link. |
| 6 | **Migrate Corporate** | PMPro group plans → Fluent Members corporate parent + children. |
| 7 | **Migrate Drip Content** | PMPro drip rules → Fluent Members Content Drip rules on the matching Access Group. |
| 8 | **Migrate Orders** (Pro) | Imports each PMPro order. Subscriptions and Orders are chunked, so large sites run multiple sub-passes. |
| 9 | **Migrate Transactions / Subscriptions** (Pro) | Imports payment events; links PMPro→Stripe subscriptions to local rows so renewals keep firing. |
| 10 | **Cleanup** | Wraps up state and clears the wizard's internal cache. |

Each step has its own button. Run them in order. Most steps display a count when they finish.

::: tip Drip rules migrate from PMPro
Unlike MemberPress, PMPro's "post X is available N days after signup" drip rules import automatically (step 7) and become Content Drip rules on the matching Access Group. Verify them under Access Groups → your Group → Content Drip after the step completes.
:::

---

## Verification after each step

| After step… | Look at | Expected |
|---|---|---|
| 2, Access Groups | Fluent Members → Access Groups | One Group per PMPro level. |
| 3, Levels | Fluent Members → Levels | Levels match titles; each has an Access Group attached. |
| 4, Memberships | Members | User count matches PMPro's active total. |
| 5, Orders | Transactions | Orders appear with correct dates and amounts. |
| 7, Subscriptions | Members → detail → membership row | Provider says `default` (Native Payment) with a Stripe ID linked. |

If any step's count is off, click **Reset Migration State** at the bottom of the wizard and re-run from that step.

---

## Stripe-import bridge details

For step 7 to link existing PMPro→Stripe subscriptions:

- Fluent Members Pro must be active.
- [Stripe Setup](../payment-settings/stripe-setup) must be configured with the same Stripe account PMPro used.
- The webhook URL must be set in Stripe (so future events come to Fluent Members).

Without these, subscriptions migrate but they don't keep auto-renewing through Stripe. Members would need to re-buy.

---

## PMPro-specific gotchas

- **Custom level metadata**: PMPro lets you store arbitrary meta on levels. The wizard imports the visible fields; custom meta is left behind. If you rely on that meta in templates, you'll need to migrate it manually.
- **Content restriction by category**: PMPro's "this category requires level X" maps to an Access Group with **All Categories Archive** restriction type, plus the matching category in *Specific*.
- **Email templates**: PMPro's email subjects/bodies don't import. Re-set them in [Email Notifications](../email-configuration/email-notifications).
- **Payment Gateway Add Ons**: PMPro supports many gateways. Only Stripe is linked automatically. Other gateways (PayPal, Authorize.net) leave their subscriptions on those providers, Fluent Members won't auto-sync events.

---

## A real example: Sara's checklist

Sara (from the [Overview](./)) ran through these 8 steps in 25 minutes:

1. **Detect**, wizard says 245 members, 18 active subs, 1,124 transactions. She nodded.
2. **Access Groups**, 5 groups created.
3. **Levels**, 5 levels created.
4. **Memberships**, 245 rows created. Cross-checked PMPro: 245.
5. **Orders**, 1,124 rows.
6. **Transactions**, 1,124 paired events.
7. **Subscriptions**, 18 rows. Sara checked Stripe: customer IDs intact, `cancel_at_period_end` flags preserved.
8. **Cleanup**, done.

She then deactivated PMPro a week later.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Step shows count 0 | Earlier step didn't run / cleared state mid-way. | Reset and start from step 1. |
| Some members missing after step 4 | They were in a status PMPro considers "expired" / "cancelled" by default not imported. | Check the migrator's options; re-run with broader status filter. |
| Subscriptions don't link to Stripe | Pro inactive, or Stripe Setup incomplete. | Install Pro; complete Stripe. |
| Migrated members can't log in | Migration doesn't touch WP user accounts. | They already had WP accounts via PMPro; logins work as before. |

---

## What's next?

After migration, set up the rest of Fluent Members:

- **→ [Email Notifications](../email-configuration/email-notifications)**: rebuild your welcome email.
- **→ [Member Portal, Setup](../../members/portal/setup)**: give members the new portal URL.

**Recommended reading:**
- [Migration, Overview](./): the cross-source rules.
- [Stripe Setup](../payment-settings/stripe-setup): for the Stripe-import bridge.
