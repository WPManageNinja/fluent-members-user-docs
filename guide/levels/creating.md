# Creating a Level

A Level is the first thing you build on a fresh Fluent Members install. This page walks the **Add Membership Level** modal and the **Edit Level** tab.
**Here's what you'll learn:**
- How to open the Add Level modal.
- Every field the modal and the edit screen ask for.
- How **Individual** and **Corporate** differ at creation time.
- What to do right after the Level is saved.

**Before we start:** No prerequisites. You can create a Level even before you've built any [Access Groups](/guide/access-groups/), you'll attach them later.

---

## Step 1: Open the Add Level modal

1. In wp-admin, go to **Fluent Members → Levels**.
2. Click **+ Add New Level** in the top-right.

The **Add Membership Level** modal opens with two fields.

![Add Membership Level modal (Individual)](/screenshots/level-add-individual-modal.webp)

---

## Step 2: Fill in the modal

| Field | Notes |
|-------|-------|
| **Title** *(required)* | The name members will see, like `Premium Plan`. Keep it short. |
| **Type**    | Pick one of two cards: **Individual** ("Single user membership plan.") or **Corporate** ("Group membership for organizations."). |

Click **Create**. The modal closes and you land on the Level's edit page.

::: warning Type is permanent
You can't change a Level from Individual to Corporate (or vice versa) after creation. If you picked wrong, delete the Level and start over. No members will be lost, but only because there aren't any yet.
:::

---

## Step 3: Fill out the Edit Level tab

The edit page opens on the **Edit Level** tab by default. The **Level Information** card has these fields:

| Field            | Notes |
|------------------|-------|
| **Title** *(required)* | Pre-filled from the modal. You can change it later. |
| **Description** | Optional, free text. Shown internally and in some integrations. |
| **Status** | `Active` or `Inactive`. Active Levels are visible to buyers; Inactive ones are hidden from pricing shortcodes. |

For a **Corporate** Level there's one extra field:

| Field | Notes |
|-------|-------|
| **Maximum Member** | Number of seats (parent + children) the Level allows. **Leave empty to allow unlimited corporate seats.** |

![Edit Level, Individual](/screenshots/level-edit-individual.webp)

![Edit Level, Corporate, with Maximum Member field](/screenshots/level-edit-corporate.webp)

::: tip In plain language
*Maximum Member* counts the parent. A 10-seat plan = 1 parent + 9 invitees. Leaving it blank means the parent can invite forever, which you probably don't want unless you're using it as an internal "everyone at our company" Level.
:::

Click **Save** when you're done. Save lives in the top-right of the page; it appears once you have unsaved changes.

---

## Step 4: Set up the rest

The Level exists, but nobody can buy it yet and holding it unlocks nothing. The next three things in order:

1. **Add a Pricing Plan** so people can buy or join, [Native Payment](./pricing-native) for built-in Stripe, [Paywalls](./pricing-paywalls) for a separate payment plugin.
2. **Attach Access Groups** so holding the Level actually unlocks content, [Attaching Access Groups](./attaching-access-groups).
3. **Drop the shortcode** on a pricing page, copy `[fluent_membership_level id="N"]` from the Levels list row.

---

## A real example: Sara's Pro Plan

Sara teaches yoga online. She creates a Level:

- **Title:** `Pro Yoga`
- **Type:** Individual (each person buys their own seat)
- **Description:** *"Full lesson library plus monthly live classes."*
- **Status:** Active

Then she opens the **Pricing** tab and adds two Pricing Plans (Monthly at $19, Annual at $149), and over in **Access Group** she ticks her *Pro Lessons* group. Done, her Pro Yoga page can now sell memberships.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| The Save button doesn't appear | You haven't made any changes yet. | Edit any field; the button shows. |
| Maximum Member field doesn't appear | This is an Individual Level, not Corporate. | Delete and recreate as Corporate. |
| Level shows in the list but the shortcode renders nothing | Level has no Pricing Plans. | Go to the **Pricing** tab and add one. |

---

## What's next?

- **→ [Pricing, Native Payment](./pricing-native)**: fastest if you have Fluent Members Pro and want one tool to do everything.
- **→ [Pricing, Paywalls](./pricing-paywalls)**: if you already sell through FluentCart, Fluent Forms, or Paymattic.
- **→ [Attaching Access Groups](./attaching-access-groups)**: connect this Level to your protected content.

**Recommended reading:**
- [🔒 Pro · Corporate Memberships](./corporate-memberships): the full Corporate-only workflow.
- [Glossary](/guide/getting-started/glossary): terms used here.
