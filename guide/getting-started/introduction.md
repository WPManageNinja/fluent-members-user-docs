# What is Fluent Members?

**Fluent Members** is a WordPress plugin that turns your site into a full membership platform, without writing a single line of code.

This page gives you the big picture. By the end, you'll understand what Fluent Members does, whether it fits what you're building, and how the main pieces fit together.

## What it does, in plain English

Fluent Members does three things:

1. **Organises your content into groups:** you decide which pages, posts, or custom content belongs to which tier.
2. **Controls who sees what:** logged-out visitors, free members, and paid members all see different things.
3. **Tracks your members:** from the moment someone joins, through renewals, to cancellations, all from one dashboard.

Everything else in the plugin (the shortcodes, the integrations, the email notifications) exists to support those three jobs.

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
Build a private resource library (templates, recordings, worksheets) only accessible to your clients.

**Community builders**
Create a members-only forum or discussion area. Non-members see a preview and an invitation to join.

**Agencies and training portals**
Sell team plans. One company buys ten seats, and each employee gets their own login and access.

**Subscription product sellers**
Gate downloadable files, PDFs, or premium tools behind a recurring payment.

## The three building blocks

Every Fluent Members site is built on three concepts. It's worth understanding them before you start clicking buttons.

### Access Groups

An [Access Group](/guide/getting-started/glossary#access-group) is a collection of content you want to protect. You might have an Access Group called *Premium Articles* that contains 50 posts, or one called *Private Lessons* that contains a custom post type.

Think of an Access Group as the **room**. The Membership Level is the **key**.

### Membership Levels

A [Membership Level](/guide/getting-started/glossary#membership-level) is a plan you offer your visitors: *Free*, *Pro*, *Annual*, *Team*, whatever makes sense for your business. Each Level unlocks one or more Access Groups.

Levels can be individual (one person) or corporate (a team with multiple seats).

### Members

A [Member](/guide/getting-started/glossary#member) is a WordPress user who has been assigned a Membership Level. When someone buys your Pro plan, Fluent Members creates a member record, links them to the Pro Level, and immediately grants them access to everything that Level unlocks.

## Free vs Pro

Fluent Members is available as a **free plugin** with a full content-protection feature set, and a **Pro add-on** that adds native payments, subscriptions, and advanced business tooling.

### Free features

| Feature | What it includes |
|---|---|
| Membership Levels & Plans | Unlimited levels; individual and upcoming corporate types |
| Access Groups | Restrict posts, pages, categories, tags, and custom post types |
| Partial Content Preview | Show a teaser and overlay to non-members |
| Member Management | Member list, detail view, manual assignment, status management |
| Member Portal | Self-service front-end page for members to view and cancel memberships |
| Email Notifications | Welcome, expiry, and suspension emails with merge tags |
| Migration Tools | Import members from Paid Memberships Pro, MemberPress, and Restrict Content Pro |
| FluentCart Integration | Sell memberships through FluentCart products |
| Fluent Forms Integration | Sell memberships through Fluent Forms payment forms |
| Paymattic Integration | Sell memberships through Paymattic payment forms |
| FluentCRM Integration | Auto-apply and remove CRM tags on membership events |
| Fluent Support Integration | Show member level inside support tickets |
| FluentCommunity Integration | Gate community spaces by Membership Level |

### Pro features

| Feature | What it adds |
|---|---|
| Native Stripe Checkout | Built-in Stripe payment flow, no third-party form plugin needed |
| Subscriptions | Full subscription lifecycle: create, renew, cancel, fail, recover |
| Orders & Transactions | Complete billing history with order and transaction records |
| Refunds | Admin-initiated refunds from the Transactions screen |
| Corporate Memberships | Parent buys seats; sub-members join via invite link |
| Drip Content | Release posts and pages gradually on a schedule after signup |
| Block-Level Protection | Restrict individual Gutenberg blocks inside a post |
| WooCommerce Integration | Sell memberships through WooCommerce products and variations |
| WooCommerce Subscriptions | Recurring billing managed through WC Subscriptions |
| Block Email Editor | Build email templates visually using Gutenberg blocks |
| Update Payment Method | Members can update their saved card from the portal |
| Renew Failed Subscription | Members can retry a failed renewal from the portal |
| Corporate Seat Management | Parent manages team invites and removals from the portal |
| Cancellation Modes | Choose immediate or end-of-period cancellation per subscription |

::: info Not sure which you need?
The free plugin is fully functional for content protection and member management. Upgrade to Pro when you need native payments, subscription billing, corporate teams, or drip content.
:::

## How it fits with your existing tools

Fluent Members works two ways for payments:

**Option A: Use the built-in Stripe (Pro).** The Pro plugin includes a native Stripe checkout, refunds, transactions, and subscription management. No second plugin needed.

**Option B: Use a payment plugin (Free or Pro).** Connect memberships to products in any of these:

| Payment plugin | Tier |
|---|---|
| FluentCart | Free |
| Fluent Forms | Free |
| Paymattic | Free |
| WooCommerce | Pro |

For free or admin-assigned memberships, no payment plugin is required at all.

Fluent Members also connects to:
- **FluentCRM:** funnel triggers fire when a member joins, expires, or is suspended.
- **Fluent Support:** your support team sees a customer's memberships right in the ticket.
- **FluentCommunity:** granting a Level can auto-enrol the member in a community space.

::: info No payment plugin yet?
That's fine. Install Fluent Members, build your Levels and Access Groups, and connect a payment provider later. Nothing breaks. You just won't sell until something is wired up.
:::

## What Fluent Members does NOT do

- It **doesn't process payments directly** in the free version. That's your payment plugin's job.
- It **doesn't build registration forms**. WordPress handles user registration, or you can use Fluent Forms.
- It **doesn't manage your WooCommerce shop**. It connects to it.
- It **doesn't replace a dedicated LMS**. If you need quizzes, course completion tracking, or certificates, pair it with a learning management plugin.

## System requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.0 or higher |
| PHP | 7.4 or higher |
| WordPress role | Administrator (to access the plugin panel) |
| Payment plugin | Optional. Required only for paid memberships unless you use the built-in Stripe checkout (Pro) |

## What's next?

If you're ready to get started, the next step is installing the plugin.

**→ [Installing Fluent Members](/guide/getting-started/installation)**

Once it's installed, follow the **[Quick Start guide](/guide/getting-started/quick-start)**, which walks you through the first-time setup wizard step by step.

**Related reading:**
- [Membership Levels](/guide/levels/): a deeper look at Levels, Pricing Plans, and Access Groups
- [Glossary](/guide/getting-started/glossary): plain-English definitions for every term in the docs
