# Quick Start

When you first activate **Fluent Members**, a 3-step setup wizard walks you through the core configuration. This guide follows that wizard from start to finish, so you know exactly what each screen is asking and why.

You can skip any step and come back later from the Settings menu — nothing in the wizard is permanent.

## What you'll set up

| Step | What it does |
|---|---|
| Step 1 | Create your first Membership Level and choose its type |
| Step 2 | Create an Access Group — the content bundle members unlock |
| Step 3 | Connect a payment system so members can buy memberships |


## Step 1 — Create a Membership

The wizard opens on the **Welcome to FluentMembers** screen. This is where you define your first Membership Level.

**Fill in the fields:**

- **Membership Title** — the name members will see on pricing pages and in their portal. Example: `Pro Plan`, `Annual Member`, `Basic Access`.
- **Type** — choose how this membership works:
  - **Individual** — one person buys one seat. This is the standard option for most membership sites.
  - **Corporate** *(upcoming)* — one purchaser buys a block of seats and invites team members to fill them.

Once you've filled in the title and selected a type, click **Next Step**.

::: tip You can always come back
This step only creates the Level shell. You add pricing plans, content rules, and drip schedules from **Fluent Members → Levels** after the wizard completes.
:::

![The Step 1 welcome screen showing the Membership Title field and type selector](/images/quick-start/starting-1.webp)


## Step 2 — Grant Access

Step 2 asks **what this membership unlocks** that is, which Access Group members will be able to see.

An **Access Group** is a named container of protected content. Think of it as a padlocked folder. The Membership Level you just created is the key.

**To create your first Access Group here:**

1. Click **+ Create Access Group**. A small form appears with two fields.
2. **Title**: Give the group a clear name. Examples: `Pro Content`, `Course Library`, `Members Only Area`.
3. **Description** *(optional)*: A short note for your own reference, not shown to members. 200-character limit.
4. Click **Add**. The Access Group is created and linked to the Membership Level from Step 1.

You can create more than one Access Group here, or skip and add them later from **Fluent Members → Access Groups**.

Click **Next Step** when done.

::: info What gets protected?
The Access Group is created here, but which specific pages, posts, or post types it protects is configured inside the Access Group's settings not in this wizard. After completing setup, go to **Fluent Members → Access Groups**, open the group, and add restriction rules.
:::

![The Step 2 Grant Access screen showing the Title and Description fields for a new Access Group](/images/quick-start/grant-access-2.webp)

## Step 3 — Connect a Payment System

Step 3 lets you choose how members will pay for memberships.

#### Paywall integrations (free):

These work by linking an existing product in another plugin to your Membership Level. When a customer completes a purchase in that plugin, Fluent Members automatically activates their membership.

| Integration | How it works |
|---|---|
| **Fluent Cart** | Link a FluentCart product variant to a Membership Level |
| **Fluent Forms** | Link a payment form submission to a Membership Level |
| **Paymattic** | Link a Paymattic payment form to a Membership Level |
| **WooCommerce** | Link a WooCommerce product or product variation to a Membership Level |

#### Native payment (Pro):

| Integration | How it works |
|---|---|
| **Stripe** | Built-in Stripe checkout with no third-party form plugin needed. Supports one-time and recurring subscriptions. |

This step is a preview of your payment options. Actual connection of a payment plugin to a Membership Level happens inside **Fluent Members → Levels → Pricing Plans** after the wizard.

Click **Complete Installation** to finish setup.

::: tip Nothing to configure here yet
If you haven't decided on a payment plugin, click **Skip All** and set up payments later from **Fluent Members → Levels**.
:::

![The Step 3 Payment System screen showing Fluent Cart, Fluent Forms, Paymattic, WooCommerce, and Stripe options](/images/quick-start/payment-system-3.webp)

## After the wizard

When you click **Complete Installation**, the wizard closes and you land on the Fluent Members dashboard. Your first Membership Level and Access Group already exist — here's what to do next:

**1. Protect some content**

Go to **Fluent Members → Access Groups**, open the Access Group you created, and add restriction rules: which posts, pages, post types, or categories it should lock down.

See [Protected Content: Restriction Types](/guide/access-groups/protected-content).

**2. Connect a payment system**

Go to **Fluent Members → Levels**, open your Level, and add a Pricing Plan that links to your payment plugin.

See [Pricing: Paywalls](/guide/levels/pricing-paywalls) or [Pricing: Native Payment](/guide/levels/pricing-native).

**3. Add the member portal**

Create a WordPress page, add the shortcode `[fluent_member_portal]`, and publish it. This is where logged-in members manage their membership.

See [Portal: Setup](/guide/members/portal/setup).

**4. Test as a non-member**

Open an incognito browser window, visit a protected page, and confirm you see the restriction message instead of the content. Admins always bypass protection — always test as a logged-out visitor.


