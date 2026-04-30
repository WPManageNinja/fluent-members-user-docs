# Membership Levels — The Plans You Sell

A Membership Level is what a visitor buys (or joins for free). It decides which Access Groups that member can see.

By the end, you'll be able to build any plan structure your business needs — from a single free tier to a stacked offering with corporate team plans.

**Here's what you'll learn:**
- What a Level is and how it's different from an Access Group
- How to create, edit, and delete Levels
- Individual vs Corporate — which to pick
- How status and Max Members work
- How to attach Access Groups to a Level

**Before we start:** you should have at least one [Access Group](./access-groups.md) ready. If not, create one first — takes 3 minutes.

---

## What a Level is, really

A Level is a product in the membership sense. It's the *thing* a visitor buys. When Sara sells her *Pro Plan*, that's a Level.

Levels don't directly contain content — they hold a reference to the [Access Groups](./access-groups.md) they unlock. When a member buys a Level, Fluent Members grants them access to every group listed on that Level.

::: tip In everyday words
Level = *the ticket*. Access Group = *the room the ticket opens*.
:::

---

## Step 1 — Create a Level

Let's build Sara's **Pro Plan**.

Before any clicks: we're creating the top-level record that visitors will see on pricing pages and that members will be assigned to.

1. In your WordPress sidebar, open **Fluent Members → Levels**.
   *You'll land on the list of existing levels. Empty on a fresh install.*
2. Click **Add New Level** at the top right.
   *The creation form opens.*
3. Fill in the **Basic Information**:
   - **Title** — Sara types `Pro Plan`. Keep titles short and recognisable — this is what members will see in their portal.
   - **Description** — Optional. A short sentence explaining what this plan includes: *"Full access to all yoga lessons and monthly live calls."*
   - **Type** — Pick **Individual** or **Corporate**. Most people want Individual. See the next section for the difference.
4. In **Access Groups**, select one or more groups this Level should unlock.
   *If the dropdown is empty, you haven't created a group yet. Do that first.*
5. In **Status**, leave as **Active** unless you're still setting up.
6. Click **Create**.
   *The Level saves. You'll see it in the Levels list with its ID.*

![Create Membership Level](/images/membership-levels/create-level.png)

::: tip Small win
The Level's **ID** (visible in the list after saving) is what you'll paste into the `[fluent_membership_level id="X"]` shortcode when you build your pricing page. Jot it down.
:::

---

## Individual vs Corporate — which type should I pick?

This is a one-time decision per Level. You can't change the type after creation (you'd have to delete and recreate).

### Individual
One person, one membership. This is the default and what 90% of sites use.

Perfect for:
- Personal subscriptions
- Course sign-ups
- Newsletter subscriptions
- Anything where each member pays and accesses on their own

### Corporate
One buyer (the *parent*) purchases and then invites team members into seats. Each invited member gets the same access as the parent.

Perfect for:
- Agency training portals selling team packages
- Company licences for a group of employees
- Family or household plans
- Anywhere a single buyer represents multiple people

If you pick Corporate, you'll also set **Maximum Member** — how many seats this plan includes. See [Corporate Memberships](./corporate-memberships.md) for the full walkthrough.

::: info About "Maximum Member"
This field only appears on Corporate levels. It caps the number of team members (including the parent) who can share one purchase. The parent can invite up to this number and no more.
:::

---

## Step 2 — Set up pricing (in your payment plugin)

Fluent Members doesn't handle payments itself — [pricing is managed in your payment plugin](./pricing.md). Here's the pattern:

1. In your payment plugin (FluentCart, WooCommerce, Fluent Forms, or Paymattic), create a product or form that represents this plan.
2. Come back to **Fluent Members → Levels**, open your Level, and in the relevant settings section, link the product to the Level.

The exact steps differ per provider — see the [Pricing guide](./pricing.md) for each.

---

## Step 3 — Managing status

A Level has two statuses: **Active** and **Inactive**.

| Status | What happens |
|---|---|
| **Active** | The Level is available — members with this Level have access; the pricing shortcode displays it |
| **Inactive** | Existing members keep their access, but the Level is hidden from the pricing shortcode and new signups are blocked |

Use Inactive when you want to retire a legacy plan without kicking out the members who already bought it.

::: tip Retiring an old plan the clean way
1. Set the old Level to **Inactive** — new buyers can't sign up.
2. Leave existing members on the Level.
3. When you're ready to fully sunset it, move existing members to another Level first (see [Upgrading plans](../members/upgrading-plans.md)), then delete the old Level.
:::

---

## Step 4 — Editing a Level

You can edit almost anything about a Level after creation except the **Type** (Individual vs Corporate).

1. Go to **Fluent Members → Levels**.
2. Click the Level's title.
3. Change what you need and click **Update Level**.

Common edits:
- Adding a new Access Group to unlock more content
- Updating the description shown in the pricing card
- Flipping Status to Inactive when retiring the plan

---

## Deleting a Level

Open the Level and click **Delete Level**.

::: danger Before you delete
Deleting a Level immediately revokes access for every member who holds it. This is **not reversible**. Two things to do first:

1. Move existing members to another Level (see [Upgrading plans](../members/upgrading-plans.md)).
2. Disconnect any payment-provider products that refer to this Level, so no future purchases fail.

If the Level has pricing packages linked from payment providers, the system will warn you and block deletion until those are moved or removed.
:::

---

## A real example — Sara's two-tier structure

**Level 1: `Free`**
- Type: Individual
- Status: Active
- Access Groups: `Intro Videos`

**Level 2: `Pro Plan`**
- Type: Individual
- Status: Active
- Access Groups: `Intro Videos`, `Full Library`, `Live Replays`

When a visitor signs up for Free, they get the three intro videos. When they upgrade to Pro, they keep those and also unlock the full library and live replays — in a single step.

If Sara later decides to add an **Annual** tier for $149/year, she creates a third Level with the same Access Groups as Pro. No content changes needed.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Access Groups dropdown is empty | No active groups exist | Create a group first or activate an inactive one |
| Members don't get access even though they're on the right Level | Membership status isn't `active` or `trial` | Check the member's status in **Members** — only active/trial unlock content |
| Pricing shortcode doesn't show the Level | Level is **Inactive** or no payment provider product is linked | Activate the Level, confirm a product exists and is linked |
| Can't delete a Level | It has pricing packages from providers | Move or delete those first, then try again |

Still stuck? [Troubleshooting](../../reference/troubleshooting.md) has more.

---

## What's next?

You know how to build Levels. The two natural next steps:

- **→ [Pricing](./pricing.md)** — if you want to understand how money flows through Fluent Members
- **→ [Corporate Memberships](./corporate-memberships.md)** — if you're building team plans

**Related reading:**
- [Access Groups](./access-groups.md) — the content side
- [Managing Members](../members/managing-members.md) — after people start signing up
- [Shortcodes & Blocks](../shortcodes-and-blocks.md) — how to display Levels on your site
