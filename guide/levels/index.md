# Levels Overview

A **Level** is the membership you're selling (or giving away). Think of it like a single product line, *Pro Plan*, *Premium*, *VIP*. Every member you ever have ends up holding one or more Levels.

::: info Part of Chain 1: First-time site setup · step 5 of 10
**Previously:** [Stripe Setup](/guide/settings/payment-settings/stripe-setup)
**Next:** [Creating a Level](/guide/levels/creating)

See the full chain in the [Chain Map](/reference/chain-map).
:::

This page is the map for the **Levels** screen. The pages under it walk through each tab and field.

**Here's what you'll learn:**
- What the Levels list shows.
- The two Level types: Individual and Corporate.
- The four inner tabs you'll work with after creating a Level: Edit Level, Pricing, Access Group, Members.
- Which order to set things up so you don't get stuck.

**Before we start:** Read the [Dashboard page](/guide/dashboard/dashboard) for the bigger picture. No other prerequisites.

---

## The Levels list

Open **Fluent Members → Levels** in wp-admin. You'll see one row per Level with these columns:

| Column          | What it shows                                                       |
|-----------------|---------------------------------------------------------------------|
| **ID**          | Numeric ID. You'll need this for the `[fluent_membership_level]` shortcode. |
| **Title**       | The Level name (e.g. *Pro Plan*).                                   |
| **Description** | Short description for your reference.                               |
| **Type**        | `Individual` or `Corporate`.                                         |
| **Access Group**| How many [Access Groups](/guide/getting-started/glossary) this Level unlocks.    |
| **Status**      | Active or Inactive.                                                 |
| **Shortcode**   | `[fluent_membership_level id="N"]` with a copy button.              |

Tabs at the top of the list filter the view: **All / Active / Inactive**. The search icon does title search.

![Levels list](/screenshots/levels-list.webp)

---

## Two Level types

Every Level is either **Individual** or **Corporate**. You pick this when you create the Level, and it can't be changed afterwards.

| Type          | Use it for                                                              |
|---------------|--------------------------------------------------------------------------|
| **Individual**| One person per membership. The default. Most sites use this.            |
| **Corporate** | One parent buys, then invites teammates into seats. *Pro feature.*      |

::: tip In plain language
*Individual* is one ticket, one person. *Corporate* is a family plan, one bill, many logins. See [Corporate Memberships](./corporate-memberships) for the full setup.
:::

---

## The four inner tabs

When you open any Level (by clicking its title in the list), the edit screen has four tabs across the top:

| Tab               | What you do here                                                       |
|-------------------|--------------------------------------------------------------------------|
| **Edit Level**    | Title, description, status. For Corporate, also Maximum Member.        |
| **Pricing**       | Add one or more [Pricing Plans](./pricing-native). Each plan is a way to sell this Level. |
| **Access Group**  | Tick which [Access Groups](/guide/access-groups/) this Level unlocks.   |
| **Members**       | See every WordPress user who currently holds this Level.                |

In the top-right of the page, **More Actions** holds a single item: **Delete**.

---

## The order to set things up

If you're brand new, this is the order that stops you getting stuck:

1. **Create the Level** ([Creating a Level](./creating)), give it a title and a type.
2. **Add a Pricing Plan** ([Native Payment](./pricing-native) or [Paywalls](./pricing-paywalls)), without at least one Plan, nobody can buy or join.
3. **Attach Access Groups** ([Attaching Access Groups](./attaching-access-groups)), without a Group attached, holding the Level doesn't unlock anything.
4. **Drop the shortcode** on a page (the *Shortcode* column gives you the snippet), that's your pricing page.

::: warning Don't skip step 3
A Level with no Access Groups *does* let people buy it, but they won't actually see any restricted content, because nothing is connected. Always attach at least one Group.
:::

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Can't change a Level from Individual to Corporate | Type is set at creation and locked. | Delete and recreate. |
| Members hold the Level but can't see protected content | No Access Groups attached. | [Attach a Group](./attaching-access-groups). |
| The shortcode renders nothing on the page | Level is Inactive, or it has no Pricing Plans. | Set Status to Active; add a Pricing Plan. |

---

## What's next?

- **→ [Creating a Level](./creating)**: the modal and the fields explained.
- **→ [Pricing, Native Payment](./pricing-native)**: sell with the built-in Stripe checkout (Pro).
- **→ [Pricing, Paywalls](./pricing-paywalls)**: sell through FluentCart, Fluent Forms, or Paymattic.

**Recommended reading:**
- [Glossary](/guide/getting-started/glossary): the vocabulary.
- [Membership Statuses](/reference/membership-statuses): what `active`, `trial`, etc. mean for a member.
