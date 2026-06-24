# Content Drip

**Content Drip** schedules when each piece of protected content becomes available to a new member after they join a Level. The member holds the right Level immediately, but they can't see Lesson 3 until Day 14. Perfect for paced courses, bootcamps, and email-sequence-style memberships.

**Here's what you'll learn:**
- Where Content Drip is configured (it's a Level setting, not an Access Group setting).
- How a single drip rule works (Show This Content + Timeline + Days/Hours/Minutes).
- How to chain multiple drip rules for a paced sequence.
- What "after duration" means in practice.

**Before we start:** You've already created a [Level](./creating) and at least one [Access Group](/guide/access-groups/) with **Protected Content** configured. Drip rules pick from the Level's attached Groups, so without that wiring there's nothing to drip.

::: warning Drip rules live on the Level, not the Access Group
Under the hood, drip rules are stored in the Level's `settings.drip_rules` and evaluated by `ContentDripHelper::checkDripAccess()` against the member's `start_date` on the Level. The Access Group decides *who* gets access; the Level's drip rules decide *when*, for the content that Level grants.
:::

---

## Step 1: Open the Level

1. **Fluent Members → Levels**.
2. Click the Level you want to drip-feed.
3. Find the **Content Drip** section on the Level edit page.

[Screenshot needed: Content Drip section on the Level edit page, toggle and rule rows]

::: warning Verification needed
If the Content Drip card isn't where this page describes, for example, it's on a different inner tab of the Level, or it sits inside the Pricing tab, send a screenshot. The memory I'm working from confirms drip is a Level setting (`level.settings.drip_rules`) but doesn't pin down which inner tab houses the UI.
:::

---

## Step 2: Add your first drip rule

A drip rule has three parts:

| Part                     | What it controls |
|---------------------------|------------------|
| **Show This Content**    | Which item(s): within the content unlocked by this Level's attached Access Groups: this rule applies to. |
| **Timeline**             | When the rule fires. The 1.0 default is **After duration**, a fixed delay from the member's start date on this Level. |
| **Days / Hours / Minutes** | The delay length. All three default to `0`. |

So a rule reads: *"Show **Lesson 3** **After duration** **14 days 0 hours 0 minutes** after the member joined this Level."*

The drip rule's pickable items match what the Level can grant, posts, post types, taxonomies, WooCommerce products, FluentCart products. If you haven't [attached an Access Group with protected content](./attaching-access-groups) to this Level, the picker will be empty.

---

## Step 3: Chain rules for a paced course

Add more rules to schedule the rest of the content. Each rule has independent timing.

Example for an 8-week bootcamp:

| Rule | Show This Content | After duration |
|---|---|---|
| 1 | Lesson 1 | 0 days  |
| 2 | Lesson 2 | 7 days  |
| 3 | Lesson 3 | 14 days |
| 4 | Lesson 4 | 21 days |
| … | …        | …       |

Items not covered by any drip rule are visible immediately when the member joins.

::: tip In plain language
A drip rule says "yes you have the Level, but not yet for *this* item." Items without a drip rule open the moment a member joins.
:::

---

## Step 4: Remove a rule

Each rule has a delete control. Click it to drop just that rule; other rules stay in place.

---

## What members see before a drip rule fires

When a member visits an item that hasn't dripped yet, they see a countdown notice: *"Available in 6 days, 4 hours."* The exact text depends on the matching Access Group's [Unauthorized Access](/guide/access-groups/unauthorized-access) setup, but the default is a short countdown rather than a hard block.

::: info "After duration" is measured from the member's `start_date` on this Level
Fluent Members reads the member's `start_date` (the moment their membership row was created) and adds the rule's delay. If a member changes Levels, the clock starts fresh from the new Level's `start_date`.
:::

---

## A real example: Sara's "Foundations" course

Sara has a *Pro Yoga* Level that grants access to her *Foundations* Access Group (6 lesson posts). She wants new members to receive one lesson per week.

On her *Pro Yoga* Level edit page, in the Content Drip section, she adds 6 rules:

| Rule | Show This Content | After duration |
|---|---|---|
| 1 | Lesson 1 | 0 days  |
| 2 | Lesson 2 | 7 days  |
| 3 | Lesson 3 | 14 days |
| 4 | Lesson 4 | 21 days |
| 5 | Lesson 5 | 28 days |
| 6 | Lesson 6 | 35 days |

A new member sees Lesson 1 immediately. Lesson 2 unlocks a week in. By week 5 they've gone through the full sequence, the value matches the time invested, and they're less likely to binge-and-cancel.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Show This Content picker is empty | The Level has no Access Group attached, or that Group's Protected Content rule is empty. | [Attach a Group](./attaching-access-groups) with Protected Content set. |
| Drip says 0 days but content is still locked | Member status isn't `active` or `trial`. | Confirm status on the [Member Detail](/guide/members/detail). |
| Countdown timer says "Available in 1970" | The member's `start_date` is corrupt or missing. | Edit the membership row; reset start_date. |
| Drip rule fires for *all* posts, not just one | The rule's Show This Content covers a broader scope than you intended. | Refine the picker to specific items. |

---

## What's next?

- **→ [Attaching Access Groups](./attaching-access-groups)**: wire the Groups whose content will be drip-fed.
- **→ [Access Groups Overview](/guide/access-groups/)**: build the Groups the drip rule picks from.

**Recommended reading:**
- [Protected Content](/guide/access-groups/protected-content): the picker that feeds Show This Content.
- [Glossary, Content Dripping](/guide/getting-started/glossary).
