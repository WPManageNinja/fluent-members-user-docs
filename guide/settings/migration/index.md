# Migration

Move data from another membership plugin into Fluent Members. The wizard supports three sources: **Paid Memberships Pro**, **MemberPress**, and **Content Restriction Pro**.
**Here's what you'll learn:**
- Which sources the wizard can read.
- The "Detected" vs "Not Detected" badge.
- The plan-of-attack before you click anything.
- Where each source's per-step walkthrough lives.

**Before we start:** Click the gear icon → **Migration** in the left rail. Have the source plugin active and its data populated.

---

## What you see

The Migration page header asks: *"Select Source from Where You Want to Import Your Contacts."* Three cards follow.

| Card | Badge | What "Detected" means |
|---|---|---|
| **Paid Memberships Pro** | Detected / Not Detected | The host plugin is active and its tables exist on this site. |
| **MemberPress** | Detected / Not Detected | Same. |
| **Content Restriction Pro** | Detected / Not Detected | Same. (Stripe-side data is read when [Stripe Setup](../payment-settings/stripe-setup) is also configured.) |

A card with **Detected** is clickable, opens its wizard. A **Not Detected** card is greyed out, the host plugin isn't active here.

Below the cards a help banner reads: *"FluentMembers Migration, Seamlessly migrate your membership data to FluentMembers. Transfer levels, access groups, members, and more in just a few clicks."* with a link to **The Documentation →**.

![Migration screen with PMPro detected](/screenshots/settings-migration.webp)

---

## What gets migrated

For each source, the wizard imports:

| Entity in source | Fluent Members equivalent |
|---|---|
| Membership plans / levels | **Levels** with pricing |
| Members / subscribers | **Members** with status |
| Active subscriptions / recurring rows | **Subscriptions** (Pro) |
| Transactions / order rows | **Transactions** (Pro) |
| Stripe customer + subscription IDs | Linked to local rows so they keep working (Pro + Stripe-import bridge) |
| Content-restriction rules | **Access Groups** with Protected Content rules |
| Content drip rules | **Content Drip** rules on the matching Access Group |

::: warning Email-template migration is manual
The wizard imports data. It does *not* copy your custom email templates, those need to be rebuilt in [Email Notifications](../email-configuration/email-notifications) once the data is in.
:::

---

## Recommended order of operations

Whichever source you migrate from, this order has the fewest surprises:

1. **Back up first.** Database snapshot of WordPress, plus a Stripe-data export if relevant.
2. **Install Fluent Members** (and Pro if you'll need subscriptions/refunds/corporate).
3. **Configure Stripe** in [Stripe Setup](../payment-settings/stripe-setup), only if the source's payments went through Stripe.
4. **Decide whether to run side-by-side or cut over.** Side-by-side keeps the old plugin active during migration; cut-over deactivates it.
5. **Open the matching wizard:**
   - [From Paid Memberships Pro](./from-paid-memberships-pro)
   - [From MemberPress](./from-memberpress)
   - [From Content Restriction Pro](./from-content-restriction-pro)
6. **Walk the steps in order.** Don't skip ahead, later steps depend on earlier ones.
7. **Verify** in Members / Transactions before you deactivate the source plugin.
8. **Deactivate** (don't delete) the source plugin. Keep it around for a few weeks in case you need to re-run.

::: tip In plain language
The wizard is mostly idempotent, re-running a step where rows already exist updates them rather than duplicating. But "mostly" isn't "always." Backups are cheap; pretending you don't need them costs hours.
:::

---

## What "Stripe-import bridge" means

When Fluent Members Pro is active AND your source has Stripe-connected subscriptions, the migration also links each Fluent Members subscription row to its existing Stripe customer/subscription ID. After migration:

- Renewals continue charging on the existing Stripe subscriptions.
- Cancellations from the Member Portal correctly call Stripe to stop them.
- The Transactions screen shows the new local transactions; Stripe Dashboard shows the same data with the original customer history.

Without Pro, the wizard still migrates everything *except* the Stripe linkage, members will need to re-enter their card to start fresh subscriptions.

---

## A real example: Sara migrates from PMPro

Sara ran PMPro for a year, then decided to move to Fluent Members. Her sequence:

1. Backed up everything.
2. Installed Fluent Members + Pro.
3. Connected her existing Stripe account in [Stripe Setup](../payment-settings/stripe-setup).
4. Opened Migration → PMPro was Detected → clicked the card.
5. Walked the wizard steps over a coffee.
6. Verified: 245 members imported, 18 active subscriptions linked to Stripe, transactions history populated.
7. Sent a heads-up email to her members about the new Member Portal URL.
8. Deactivated PMPro a week later when no support tickets came in.

Zero downtime, zero re-enrolment for her members.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| All three cards say Not Detected | None of the source plugins are active. | Activate the one you want to import from. |
| Wizard says 0 records to import | Source plugin's tables are empty or wrong prefix. | Confirm with `SHOW TABLES LIKE 'wp_pmpro_%'` etc. |
| Stripe subscriptions don't link after migration | Pro isn't active, or Stripe Setup isn't done. | Install Pro; configure Stripe. |
| Member statuses look wrong after import | Source uses different state names; the wizard maps but edge cases exist. | Spot-check a few; adjust manually if needed. |

---

## What's next?

Pick your source:

- **→ [From Paid Memberships Pro](./from-paid-memberships-pro)**
- **→ [From MemberPress](./from-memberpress)**
- **→ [From Content Restriction Pro](./from-content-restriction-pro)**

**Recommended reading:**
- [Stripe Setup](../payment-settings/stripe-setup): needed for the Stripe-import bridge.
- [Membership Statuses](/reference/membership-statuses): verify imported statuses match.
