# What is Fluent Members?

Fluent Members is a WordPress plugin that turns your site into a full membership platform, without writing a single line of code.

This page gives you the big picture. By the end, you'll understand what Fluent Members does, whether it fits what you're building, and how the main pieces fit together.

**Here's what you'll learn:**

- What Fluent Members actually is
- The three things every membership site needs, and how Fluent Members handles each one
- Real types of sites you can build with it
- How it fits into your existing WordPress setup

## What it does, in plain English

Fluent Members does three things:

1. **Organises your content into groups**, you decide which pages, posts, or custom content belongs to which tier.
2. **Controls who sees what**, logged-out visitors, free members, and paid members all see different things.
3. **Tracks your members**, from the moment someone joins, through renewals, to cancellations, all from one dashboard.

That's it. Everything else in the plugin, the shortcodes, the integrations, the email notifications, exists to support those three jobs.

::: tip The core idea in one sentence
You create **Membership Levels** (the plans you sell), attach **Access Groups** (the content bundles) to them, and Fluent Members handles the rest.
:::

## Who it's for

Fluent Members is built for site owners who want to sell or gate access to content. Common use cases:

**Online course creators**
Lock your lessons behind a paid membership. Free visitors see a course overview; paying members get everything.

**Newsletter writers and bloggers**
Publish free teasers for everyone, and full articles only for paid subscribers.

**Coaches and consultants**
Build a private resource library, templates, recordings, worksheets, only accessible to your clients.

**Community builders**
Create a members-only forum or discussion area. Non-members see a preview and an invitation to join.

**Agencies and training portals**
Sell team plans. One company buys ten seats, and each employee gets their own login and access.

**Subscription product sellers**
Gate downloadable files, PDFs, or premium tools behind a recurring payment.

Your case might not be on this list, that's fine. If you want to charge for access to content on a WordPress site, Fluent Members is designed for you.


## The three building blocks

Every Fluent Members site is built on three concepts. It's worth understanding them before you start clicking buttons.

### 1. Access Groups, "the locked rooms"

An [Access Group](../reference/glossary.md#access-group) is a collection of content you want to protect. You might have an Access Group called *Premium Articles* that contains 50 posts. Or one called *Private Lessons* that contains a custom post type.

Think of an Access Group as the **room**. The Membership Level is the **key**.

### 2. Membership Levels, "the plans"

A [Membership Level](../reference/glossary.md#membership-level) is a plan you offer your visitors. *Free*, *Pro*, *Annual*, *Team*, whatever makes sense for your business. Each Level unlocks one or more Access Groups.

Levels can be individual (one person) or corporate (a team with multiple seats).

### 3. Members, "the people"

A [Member](../reference/glossary.md#member) is a WordPress user who has been assigned a Membership Level. When someone buys your Pro plan, Fluent Members creates a member record, links them to the Pro Level, and immediately grants them access to everything that Level unlocks.

## How it fits with your existing tools

Fluent Members works two ways for payments:

**Option A, Use the built-in Stripe (requires Fluent Members Pro).** Pro plugin includes a native Stripe checkout, refunds, transactions, dunning, and subscription management. No second plugin needed.

**Option B, Use a payment plugin.** You can sell memberships through any of these:

| Payment plugin | What it handles |
|---|---|
| **FluentCart** | Native WPManageNinja checkout and subscriptions |
| **WooCommerce** *(Pro)* | Products, variations, WooCommerce Subscriptions |
| **Fluent Forms** | Payment forms with fixed-price plans |
| **Paymattic** | Payment forms with fixed-price plans |

For free or admin-comped memberships, neither is required, Fluent Members can grant access on its own.

Fluent Members also connects to:
- **FluentCRM**: funnel triggers fire when a member joins, is removed, expires, or is suspended.
- **Fluent Support**: your support team sees a customer's memberships right in the ticket.
- **FluentCommunity**: granting a Level can auto-enrol the member in a community space or course.

::: info No payment plugin yet?
That's okay, install Fluent Members, build your Levels and Access Groups, and connect a payment provider later. Nothing breaks. You just won't sell until something is wired up.
:::

## What Fluent Members does NOT do

It's helpful to know the limits:

- It **doesn't process payments directly**. That's your payment plugin's job.
- It **doesn't build registration forms**. WordPress handles user registration, or you can use Fluent Forms.
- It **doesn't manage your WooCommerce shop**. It connects to it.
- It **doesn't replace a dedicated LMS**. If you need quizzes, course completion tracking, or certificates, pair it with a learning management plugin.

## System requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.0 or higher |
| PHP | 7.4 or higher |
| WordPress role | Administrator (to access the plugin panel) |
| Payment plugin | Optional, required only for paid memberships unless you use the built-in Stripe checkout (Pro). Supports FluentCart, WooCommerce (Pro), Fluent Forms, Paymattic. |


## What's next?

If you're ready to get started, the next step is installing the plugin.

**→ [Installing Fluent Members](./installation.md)**, takes about 3 minutes.

Once it's installed, we recommend the **[Quick Start guide](./quick-start.md)**, it walks you through building a complete basic membership site from scratch in about 10 minutes.

**Related reading:**
- [Core Concepts explained](./levels/): a deeper look at Levels, Groups, and Members
- [Glossary](../reference/glossary.md): plain-English definitions for every term in the docs
