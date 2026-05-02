# Core Concepts — How Fluent Members Fits Together

The three ideas that make the whole plugin click. Once you get these, everything else makes sense.

If you've just installed Fluent Members and you're about to start building, please read this page first. Five minutes here will save you hours later.

We'll walk through the three building blocks of Fluent Members — **Access Groups**, **Membership Levels**, and **Members** — and how they connect. No clicks yet. Just the mental model.

**Here's what you'll learn:**
- What each building block is and what job it does
- How they connect to one another
- A real example that makes the model click
- Where to go next to start building

## The 30-second Mental Model

```
        ┌──────────────────┐          ┌──────────────────┐
        │  ACCESS GROUP    │  ◄───────│  MEMBERSHIP      │
        │ (the content)    │          │  LEVEL (the plan) │
        │                  │          │                  │
        │ "Pro Lessons"    │          │ "Pro Plan"       │
        │ "VIP Articles"   │          │ "Annual"         │
        └──────────────────┘          └──────────────────┘
                                              ▲
                                              │
                                              │
                                      ┌──────────────────┐
                                      │  MEMBER          │
                                      │  (the person)    │
                                      │                  │
                                      │ Sara Jones       │
                                      │ user_id: 42      │
                                      └──────────────────┘
```

Read the diagram like this:

- A **Member** is assigned a **Membership Level**.
- A **Membership Level** grants access to one or more **Access Groups**.
- An **Access Group** protects a set of content.

When Sara buys the Pro Plan, Fluent Members checks her plan, sees that Pro Plan unlocks the *Pro Lessons* and *Pro Community* access groups, and lets her through.


## 1. Access Groups — The Content Side

An [Access Group](./access-groups.md) is a labelled bundle of **rules about what to protect**. A rule might say:

- "All posts of type *lesson*"
- "These specific pages: About, Contact, Pricing"
- "All content in the *Premium* category"
- "The entire website"

You can add as many rules as you want to a single group. You can also configure *what happens when a non-member lands on protected content*, redirect them, show a custom message, show a partial preview, or pop a login box.

::: tip Mental shortcut
Groups are about **content**. They never mention people or plans.
:::

Example groups Sara might build:
- `Pro Lessons` — her entire course library
- `Live Session Replays` — recorded monthly Q&As
- `Coach Notes` — private PDFs

---

## 2. Membership Levels — The Plan Side

A [Membership Level](./membership-levels.md) is what you **sell** (or give away). Think of it as the product.

Every Level has:

- A **title** (like *Free*, *Pro*, *Team*)
- A **type** — either `Individual` (one person) or `Corporate` (multiple seats)
- A **status** (`active` or `inactive`)
- A list of **Access Groups** it unlocks
- Optional **Max Members** (for corporate plans)

Levels don't carry the price themselves. The price lives inside your [payment provider](./pricing.md) (FluentCart, WooCommerce, Fluent Forms, or Paymattic), and you link the provider's product to the Level.

::: tip Mental shortcut
Levels are about **what you sell**. They unlock Access Groups, but they don't know or care what's *inside* those groups.
:::

---

## 3. Members — The People Side

A [Member](../members/managing-members.md) is a WordPress user who has been assigned a Membership Level. Every member record tracks:

- Which Level they hold
- Their current **status** (`active`, `trial`, `suspended`, `expired`, `upgraded`, `cancelled`)
- Their start date and expiry date (if any)
- Which provider and product they bought through
- For corporate sub-members: which parent membership they belong to

You'll see members listed under **Fluent Members → Members**.

::: tip Mental shortcut
Members are about **who has access right now**. Their status decides whether they can see protected content.
:::

---

## Why the split?

It's tempting to think *"why not just attach content directly to a Level?"*. Here's why the split matters:

**Access Groups are reusable.** One group (like *Premium Articles*) can be attached to multiple Levels — for example, both *Pro Monthly* and *Annual Plan* might include it.

**Levels can stack.** A single Level (like *VIP*) can unlock multiple groups in one go — *Articles*, *Videos*, and *Private Community*, for example.

**Content rules are independent of billing.** If Sara changes her pricing model — say, adding a new tier — she doesn't have to touch any content rules. She just wires the new Level to the existing groups.

---

## A worked example

Sara the yoga coach has two plans:

### Level: *Free*
- Unlocks: `Intro Videos` (one Access Group with 3 posts)

### Level: *Pro* ($19/mo)
- Unlocks: `Intro Videos` + `Full Library` + `Live Replays`

When someone signs up for *Free*, they get access to the three intro videos. When they upgrade to *Pro*, they keep the intros and gain access to the full library and replays — with zero extra configuration, because the Level already lists those groups.

Now imagine Sara adds an *Annual Plan* for $149/year. She creates a new Level called *Annual* and ticks the same three access groups. Done — same content, new plan.

---

## How the pieces map to the admin menu

| Admin menu item | Building block | What you do there |
|---|---|---|
| **Access Groups** | Groups | Create/edit the content bundles and their protection rules |
| **Levels** | Levels | Create/edit plans and attach Access Groups to them |
| **Members** | Members | View and manage the people who hold memberships |
| **Dashboard** | All three | At-a-glance stats, charts, recent activity |
| **Settings** | Cross-cutting | Login popup, email, partial preview defaults |

---

## What's next?

Now that the model makes sense, pick where you want to dive in:

- **→ [Access Groups](./access-groups.md)** — if you want to learn what to protect, how
- **→ [Membership Levels](./membership-levels.md)** — if you want to start building plans
- **→ [Pricing](./pricing.md)** — if you want to understand how money flows through the plugin
- **→ [Corporate Memberships](./corporate-memberships.md)** — if you're selling team plans

**Related reading:**
- [Quick Start](../quick-start.md) — build a real working site end-to-end
- [Glossary](../../reference/glossary.md) — plain-English definitions for every term
