# What is Fluent Members?

**Fluent Members** is a WordPress membership plugin that lets you control access to your website content, manage members, and create membership plans without writing code.

You can use it to create free or paid membership levels, protect content, manage members, and connect your memberships with payment and other business tools.

This guide gives you an overview of Fluent Members and explains how its main features work together.

## What Does Fluent Members Do?

At its core, Fluent Members handles three main things:

1. **Organises your content:** Decide which pages, posts, or other content should be available to each membership level.
2. **Controls access:** Choose what logged-out visitors, free members, and paid members can see.
3. **Manages members:** View members, assign membership levels, manage their status, and handle their membership lifecycle.

Other features, such as email notifications, integrations, shortcodes, and content protection tools, support these main functions.

> [!Note]
> The basic structure is simple: create **Membership Levels**, connect them to **Access Groups**, and assign members to the appropriate level.

## Who Can Use Fluent Members?

Fluent Members is useful for any website that needs to restrict content or provide members with access to specific resources.

Common use cases include:

- **Online courses:** Protect lessons and other course content for paying members.
- **Blogs and newsletters:** Show free previews while keeping full content available to members.
- **Coaching and consulting:** Create private libraries for clients, such as templates, videos, and worksheets.
- **Online communities:** Restrict community areas or resources to specific membership levels.
- **Training portals:** Create team or corporate memberships where multiple users can access the same resources.
- **Subscription websites:** Protect downloadable files, PDFs, tools, and other premium resources.

## The Three Main Concepts

Before setting up Fluent Members, it helps to understand three basic concepts: Access Groups, Membership Levels, and Members.

### Access Groups

An [Access Group](/guide/access-groups/) is a collection of content that you want to protect.

For example, you could create an Access Group for:

- Premium blog posts
- Private lessons
- A custom post type
- A specific category or tag
- Your entire website, locked down in a single rule

Think of an Access Group as a **room** that contains protected content.

### Membership Levels

A [Membership Level](/guide/levels/) is a plan that you offer to your users.

For example:

- Free
- Pro
- Annual
- Team

Each Membership Level can provide access to one or more Access Groups.

Fluent Members supports **individual** membership levels for one person and [corporate](/guide/levels/corporate-memberships) membership levels for teams (Pro).

### Members

A [Member](/guide/members/) is a WordPress user who has a Membership Level.

When a user joins a membership, Fluent Members creates or updates their member record, connects them to the appropriate Membership Level, and gives them access to the content available to that level.

In simple terms:

**Access Groups contain the content → Membership Levels control access → Members receive the access.**

## Free vs Pro

Fluent Members has a free plugin and a Pro add-on.

The **free plugin** provides the core membership and content protection features. **Pro** adds payment processing, subscriptions, corporate memberships, and other advanced features.

### Free Features

| Feature | What it includes |
|---|---|
| Membership Levels | Create unlimited individual membership levels |
| Access Groups | Restrict posts, pages, categories, tags, and custom post types |
| Partial Content Preview | Show a preview or teaser to users without access |
| Content Dripping | Release content according to a schedule |
| Block-Level Protection | Restrict individual Gutenberg blocks |
| Member Management | View members, assign levels, and manage member status |
| Member Portal | Let members view and manage their memberships from the frontend |
| Email Notifications | Send membership-related emails such as welcome, expiry, and suspension notifications |
| Migration Tools | Import members from Paid Memberships Pro, MemberPress, and Kadence Memberships |
| FluentCart Integration | Sell memberships through FluentCart products |
| Fluent Forms Integration | Connect memberships with Fluent Forms payment forms |
| Paymattic Integration | Connect memberships with Paymattic payment forms |
| FluentCRM Integration | Trigger CRM automations when a membership is assigned, removed, expires, or is suspended |
| Fluent Support Integration | Display membership information inside support tickets |
| FluentCommunity Integration | Restrict community spaces based on Membership Level |

### Pro Features

| Feature | What it adds |
|---|---|
| Stripe Checkout | Accept payments through native Stripe checkout |
| PayPal Checkout | Accept payments through native PayPal checkout |
| Subscriptions | Manage subscription creation, renewals, cancellations, failures, and recovery |
| Orders & Transactions | Keep records of orders and payment transactions |
| Refunds | Process refunds from the Transactions area |
| Corporate Memberships | Create team memberships with multiple seats |
| WooCommerce Integration | Sell memberships through WooCommerce products and variations |
| WooCommerce Subscriptions | Support recurring membership payments through WooCommerce Subscriptions |
| Block Email Editor | Create email templates using Gutenberg blocks |
| Update Payment Method | Allow members to update their saved payment method |
| Failed Subscription Renewal | Allow members to retry failed subscription payments |
| Corporate Seat Management | Let corporate members manage team invitations and seats |
| Cancellation Modes | Choose whether a subscription ends immediately or at the end of its current period |

> [!Note]
> The free version is enough if you mainly need content protection and member management. You need Pro when you want native Stripe or PayPal payments, subscription billing, corporate memberships, or detailed order and transaction management.

## How Does Fluent Members Handle Payments?

Fluent Members gives you two main ways to connect payments with memberships.

### Option 1: Use Native Payments with Pro

With Pro, you can use the built-in [Stripe](/guide/settings/payment-settings/stripe-setup) or [PayPal](/guide/settings/payment-settings/paypal-setup) checkout.

This allows you to handle payments, subscriptions, refunds, transactions, and related billing features without relying on a separate payment form plugin.

### Option 2: Connect a Payment Plugin

You can also connect Fluent Members with supported payment and commerce plugins.

| Payment plugin | Available with |
|---|---|
| FluentCart | Free |
| Fluent Forms | Free |
| Paymattic | Free |
| WooCommerce | Pro |

You do not need a payment plugin for free memberships or memberships assigned manually by an administrator.

> [!Note]
> A Membership Level is tied to its selected payment method. After you set the payment method for a Level, you cannot switch that Level to a different payment method.
>
> If you are not ready to choose a payment method, create your Membership Levels and Access Groups first.

## Other Integrations

Fluent Members can also connect with other Fluent products to extend your membership workflow.

- **FluentCRM:** Fluent Members adds four automation triggers inside FluentCRM's funnel builder, for when a member is assigned, removed, expires, or is suspended.
- **Fluent Support:** Display a customer's membership information inside support tickets.
- **FluentCommunity:** Automatically enrol members in community spaces based on their Membership Level.

> [!Note]
> You can install and configure Fluent Members before connecting a payment provider. You can create your Levels and Access Groups first and connect payments later when you are ready to sell memberships.

## What Fluent Members Does Not Do

Understanding what Fluent Members does **not** handle can help you choose the right tools for your website.

- The **free version does not process payments directly**. You need a supported payment or commerce plugin for paid memberships.
- Fluent Members **does not create registration forms**. WordPress handles user registration, or you can use a form plugin such as Fluent Forms.
- Fluent Members **does not manage your WooCommerce store**. It integrates with WooCommerce to connect products and memberships.
- Fluent Members **does not replace a dedicated LMS**. If your website needs features such as quizzes, course completion tracking, or certificates, you may need a separate learning management plugin.

## System Requirements

| Requirement | Minimum |
|---|---|
| WordPress | 6.0 or higher |
| PHP | 7.4 or higher |
| WordPress role | Administrator for access to the plugin panel |
| Payment plugin | Optional. Required for paid memberships unless you use Pro's native Stripe or PayPal checkout |

## What's Next?

Now that you understand the main concepts, you can start setting up Fluent Members.

The recommended next step is to **[install the plugin](/guide/getting-started/installation)** and complete the initial setup.

After installation, follow the **[Quick Start](/guide/getting-started/quick-start)** guide to create your first Membership Levels and Access Groups.

### Related Guides

- **[Membership Levels](/guide/levels/):** Learn how Membership Levels, pricing plans, and Access Groups work together.
- **[Glossary](/guide/getting-started/glossary):** Find plain-English definitions for the terms used throughout the Fluent Members documentation.
