# Adding a Membership Manually

Manual membership granting is a common admin task, comping a staff account, fixing a paywall mix-up, granting access to a beta tester. Fluent Members exposes this through the **+ Add Membership** modal on the [Member Detail](./detail) page.

**Here's what you'll learn:**
- How to open the Add Membership modal.
- How the Level → Pricing → Assign flow works inside the modal.
- What gets recorded when you assign manually (no charge happens).
- When to use this vs the user buying themselves.

**Before we start:** The user must already have a WordPress account on your site, and at least one [Level](../levels/) with at least one Pricing Plan must exist.

---

## Step 1: Open the modal

1. **Fluent Members → Members**.
2. Click the row of the user you want to add a membership to. (If they don't appear, search by email; if they still don't appear, they don't have a WP account yet, create one via **Users → Add New** first.)
3. On the [Member Detail](./detail) page, click **+ Add Membership** in the top-right of the Memberships card.

The **Add Membership** modal opens.

![Add Membership modal, Levels listed as accordions, Pro Plan expanded with Payment Item and "+ Assign Member"](/screenshots/add-membership-modal.webp)

---

## Step 2: Pick the Level

The modal lists every Level on your site as a collapsible accordion (Pro Plan, Premium Plan, Starter, Pro, VIP, whatever you've built).

Click the Level's accordion header to expand it. You'll see every Pricing Plan attached to that Level as a card with:

- The Plan title (e.g. *Payment Item*) and ID (`#0`).
- An **Active** pill if the Plan is active.
- The provider source: *"Pro Plan Pay Form"* (Fluent Forms), *"FluentCart - Premium Plan"*, etc.
- Price ($30.00) and Interval (`one_time`, `monthly`).
- Trial Days (`0 days`).
- A **+ Assign Member** button.

---

## Step 3: Click + Assign Member

Click **+ Assign Member** on the Pricing Plan that should drive this membership. The modal closes; the new row appears in the Memberships table with Status `Active`, the chosen Plan's name, the matching provider, and a Created date of "now".

A success toast confirms: *"Membership created successfully."*

![Memberships table after manual add, new Active row appears](/screenshots/member-detail-row-actions.webp)

::: warning No charge happens
Manual assignment doesn't charge the user. It creates a local membership row only. If you want a charge, the user has to buy through your pricing page.
:::

---

## When to use this

- **Comping a staff account** so internal team members can preview the protected content.
- **Fixing a paywall miss** when a buyer paid but the integration's webhook didn't fire.
- **Granting a beta tester** access to a Level without payment.
- **Migrating an old member** who joined off-platform (gift card, in-person sale, etc.).

When **not** to use it:

- A user can pay, let them. Manual grants skip the Welcome Email's "first-time paying customer" feel, and they don't go through your accounting funnel.
- You want to charge them, manual grants don't charge.

---

## How the expiry is calculated

| Pricing Plan type | Expiry on the new row |
|---|---|
| `One-time` / `Lifetime` | `expires_at` is `NULL` (Lifetime). |
| `Subscription` (recurring) | `expires_at` = now + Interval × Interval count. The hourly cron will flip it to Expired when that date passes. |
| `Free` | `expires_at` is `NULL`. |
| `Trial` | `expires_at` = now + Trial Days. After that, behaviour depends on the integration, manual trial grants without follow-up rarely make sense. |

::: tip Choose the Plan that matches your intent
If you want a non-expiring comp, pick a Lifetime Plan (or a one-time Plan). If you want a 30-day trial, pick a Subscription Plan whose interval is Monthly, the cron will flip it to Expired in 30 days.
:::

---

## A real example: Sara comps her video editor

Sara hires Mike to edit her lesson videos. Mike needs access to all *Pro Yoga* content but shouldn't be charged.

She:

1. Creates a WP user for Mike (Users → Add New).
2. Opens **Members**, searches "Mike", clicks the row.
3. Clicks **+ Add Membership**.
4. Expands **Pro Yoga**, finds her Lifetime Plan, clicks **+ Assign Member**.

Mike's row now reads: `Pro Yoga / Lifetime, Active, Expires: Lifetime`. He can sign in and see every lesson.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Levels modal is empty | No Levels exist, or none have Pricing Plans. | Create a Plan first. |
| User isn't in the Members search | They don't have a WordPress account yet. | Create one in **Users → Add New**. |
| New row shows status `Pending` | The chosen Plan triggers an integration that expects payment first. | Pick a Native Payment or Free Plan for manual grants. |
| Welcome Email doesn't go out | The action that fires emails (`fluent_members/membership_level_assigned`) does run, but the notification may be disabled. | Toggle it on in [Email Notifications](/guide/settings/email-configuration/email-notifications). |

---

## What's next?

- **→ [Status Reference](./statuses)**: what each status means after you assign.
- **→ [Suspending & Cancelling](./suspending-and-cancelling)**: how to walk back if needed.

**Recommended reading:**
- [Member Detail](./detail): everything else you can do on this page.
- [Membership Statuses](/reference/membership-statuses): the canonical vocabulary.
