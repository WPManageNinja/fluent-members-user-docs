# Access Groups Overview

An **Access Group** is a bundle of content protection rules attached to one or more Membership Levels. It says *"these posts/pages/products are restricted, and here's what to show people who don't have access."*

::: info Part of Chain 1: First-time site setup · step 8 of 10
**Previously:** [Pricing: Native Payment](/guide/levels/pricing-native)
**Next:** [Protected Content: Restriction Types](/guide/access-groups/protected-content)

See the full chain in the [Chain Map](/reference/chain-map).
:::

This page maps the **Access Groups** screen. The pages under it walk through each section of the edit form.

**Here's what you'll learn:**
- What the Access Groups list shows.
- The sections of the Group edit page.
- How Access Groups and Levels combine to grant content access.
- The order to set things up.

**Before we start:** Read the [Levels Overview](/guide/levels/) so you understand what an Access Group attaches to.

::: tip Drip rules live on the Level, not the Group
You might expect Content Drip to be configured here, since the drip rule decides *when* protected content appears. It isn't — drip rules are stored on the Level (`level.settings.drip_rules`) and evaluated against the member's `start_date` on that Level. See [Content Drip](/guide/levels/content-drip) for the configuration page.
:::

---

## The list

Open **Fluent Members → Access Groups** in wp-admin. One row per Group:

| Column          | What it shows                           |
|-----------------|------------------------------------------|
| **ID**          | Numeric ID.                              |
| **Title**       | The Group name (e.g. *VIP Vault*).       |
| **Description** | Short internal description.              |
| **Status**      | Active or Inactive.                      |

Tabs at the top filter the view: **All / Active / Inactive**. The search icon does title search.

![Access Groups list](/screenshots/access-groups-list.webp)

---

## The sections of the edit page

When you create or open a Group, the edit page has these editable sections:

| Section                    | What it does                                                                  |
|----------------------------|--------------------------------------------------------------------------------|
| **Basic Information**      | Title, description, status.                                                   |
| **Protected Content**      | The *Apply Restriction To* dropdown — what content this Group covers.         |
| **Unauthorized Access**    | What non-members see (redirect, message, partial, login, hide).               |
| **Active Levels**          | Multi-select for which Levels grant access to this Group.                     |

![Access Group edit page, full layout](/screenshots/access-group-edit-full.webp)

::: tip One Save button
There's no per-section Save. A single **Save** button appears in the top-right when you've made unsaved changes; it saves the whole page at once.
:::

The **Active Levels** multi-select is the UI for the `fmem_access_group_membership_levels` pivot table — the same join you can write from the Level side via the Level's *Access Group* tab. Either side works; pick whichever matches how you're thinking about the change. See [Attaching Access Groups](/guide/levels/attaching-access-groups) for the Level-side flow.

---

## How Groups and Levels combine

A user has access to a Group's content when **both** of these are true:

1. The user holds at least one Level listed in the Group's **Active Levels**.
2. Their membership row is in `active` or `trial` status (see [Membership Statuses](/reference/membership-statuses)).

Otherwise, the **Unauthorized Access** action kicks in: a redirect, a message, the [Partial Content overlay](/guide/settings/partial-content-lock), the login popup, or simply nothing.

::: tip In plain language
A Group is a bag of "things to protect" + a fallback action. Levels are the keys to the bag.
:::

---

## The order to set things up

1. **Create the Group** with a title and Active status.
2. **Protected Content** — pick what's inside the bag (all posts, all pages, a specific category, a FluentCart product…).
3. **Unauthorized Access** — decide what non-members see.
4. **Active Levels** — pick which Levels can unlock the bag (or do this from the Level side via [Attaching Access Groups](/guide/levels/attaching-access-groups)).
5. *(Optional, configured on the Level)* **[Content Drip](/guide/levels/content-drip)** — schedule when each item appears for new members.

You can do these in any order, but they're listed in the order most people find easiest.

---

## A real example: Sara's Pro Lessons

Sara creates a Group:

- **Title:** *Pro Lessons*
- **Status:** Active
- **Protected Content:** *Specific Post/Page/CPT/Taxonomy etc.* → her `lesson` custom post type.
- **Unauthorized Access:** *Redirect to a specific URL* → `/become-a-pro-member`.
- **Active Levels:** *Pro Yoga*.

She didn't add any drip rules on the *Pro Yoga* Level, so her lessons are available all at once after signup.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Members hold the right Level but still see the unauthorized fallback | The Group's Active Levels doesn't include their Level. | Open the Group → Active Levels → add it. |
| New posts you publish aren't protected | The Protected Content rule lists specific items, not the post type as a whole. | Change to *All Posts* or "All of this type". |
| The Save button doesn't show | Nothing has changed yet. | Edit any field. |
| Active Levels picker is empty | No Levels exist yet, or they're all Inactive. | Go to [Levels](/guide/levels/) and create at least one. |

---

## What's next?

- **→ [Protected Content: Restriction Types](./protected-content)**: every option in the *Apply Restriction To* dropdown.
- **→ [Unauthorized Access](./unauthorized-access)**: the five fallback actions explained.
- **→ [Attaching Access Groups](/guide/levels/attaching-access-groups)**: wire Levels to this Group from the Level side.

**Recommended reading:**
- [Content Drip](/guide/levels/content-drip): release content over time (configured on the Level).
- [Glossary](/guide/getting-started/glossary): terms.
