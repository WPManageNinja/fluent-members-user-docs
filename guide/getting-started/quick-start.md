# Quick Start

When you first activate **Fluent Members**, a 4-step setup wizard walks you through the core configuration. This guide follows that wizard screen by screen, so you know exactly what each one is asking and why.

> [!Note]
> Every screen has a **Skip All** button (bottom left) that jumps straight to the final summary. Nothing in the wizard is permanent, you can revisit any of it later from **Fluent Members → Levels**, **Access Groups**, **Settings**, or **Members**.


## What You'll Set Up

| Step | Screen | What it does |
|---|---|---|
| 1 | Welcome to FluentMembers | Create your first Membership: a title and a type |
| 2 | Protect Your Content | Choose what this membership restricts and what non-members see |
| 3 | Set Up Payments | Connect a paywall integration or preview native billing |
| 4 | Almost Done! | Review a summary and set up your Member Portal page |

## Step 1: Welcome to FluentMembers

The wizard opens on **Welcome to FluentMembers**, "Let's create your first membership in just a few steps."

### Create a Membership

- **Membership Title**: The name members will see on pricing pages and in their portal. Choose something that clearly explains what the plan offers, for example `Premium Membership`, `Gold Plan`, `Pro Membership`, or `VIP Access`.
- **Type**: choose how this membership works:
  - **Individual**: A single-user membership plan. Selected by default, and the right fit for most membership sites.
  - **Corporate**: A multi-seat plan for teams, one parent account manages several [member seats](/guide/levels/corporate-memberships).

Click **Next Step** (bottom right) to continue, or **Skip All** (bottom left) to jump straight to the Step 4 summary.

> [!Note]
> The Title can be renamed anytime, but **Type** is locked in at creation, if you pick wrong, delete the Level and recreate it. This step only builds the Level shell; pricing, content rules, and drip schedules come later from **Fluent Members → Levels**.


![Step 1: Membership Title and Type fields](/images/getting-started/quick-start/step-1.webp)

## Step 2: Protect Your Content

**Protect Your Content** chooses what this membership restricts and what a non-member sees when they hit it.

### Apply Restriction To

Use the **Select Type** dropdown to choose what gets locked down, specific pages or posts, an entire post type, categories, or your whole site, the same [restriction types](/guide/access-groups/protected-content) available to any Access Group.

### Unauthorized Access

Choose what happens when someone without access tries to view this content, from the **Action for Unauthorized Users** dropdown. The wizard defaults to **Display a custom message**, which reveals three more fields:

- **Custom Message**: Shown in place of the content. Defaults to `This content is for members only. Please join to get access.`, but you can swap in your own copy, for example `This article is available to Premium members. Join now to unlock this content.`
- **Button Text**: Add the call-to-action label. Defaults to `Subscribe Now`; other options that work well are `Join Now`, `Get Access`, or `Become a Member`.
- **Button URL**: Where that button sends the visitor, search for an existing page (your pricing page, registration page, or login page all work) or paste a URL directly.

The other [unauthorized-access actions](/guide/access-groups/unauthorized-access) (redirect, partial preview, login popup, hide entirely) are configured the same way from the Access Group's own settings after the wizard.

Click **Next Step** to continue, **Go Back** to revisit Step 1, or **Skip All** to jump to the summary.

::: info Nothing selected yet?
Leaving **Apply Restriction To** empty is fine, the note on this screen tells you exactly that: restrict pages, posts, your entire site, or specific categories and content types now, or skip and configure it later from Settings.
:::

![Step 2: Restriction and Unauthorized Access fields](/images/getting-started/quick-start/step-2.webp)

## Step 3: Set Up Payments

**Set Up Payments** connects a payment method so you can start selling this membership.

### Paywall Integrations

The wizard detects which supported plugins are already installed on your site and shows each as **Installed** or **Not Installed**:

| Integration | Requires |
|---|---|
| FluentCart | Free |
| Fluent Forms | Free |
| Paymattic | Free |
| WooCommerce | Pro |

Select an installed integration and its own setup fields appear underneath. For FluentCart, that's a **Search FluentCart Products** field (type at least one character to search) and a **+ Create Pricing** link if you'd rather create a new product from here.

::: tip Prefer built-in billing?
The banner at the top of this step also points you to native billing: connect [Stripe](/guide/settings/payment-settings/stripe-setup) or [PayPal](/guide/settings/payment-settings/paypal-setup) (Pro) directly from the **Native Payment** section instead of linking an external plugin's product.
:::

Click **Next Step** to continue, **Go Back** to revisit Step 2, or **Skip All** to jump to the summary, you can always add pricing from the Level's own settings later.

![Step 3: Payment integration cards](/images/getting-started/quick-start/step-3.webp)

## Step 4: Almost Done!

**Almost Done!** summarizes exactly what the wizard set up, so you can see at a glance what's done and what still needs attention:

| Item | Shows |
|---|---|
| Membership Level | Your title, or "new" if you skipped Step 1 |
| Content Protection | The restriction you chose, or "Skipped, No restriction set" |
| Payment | The integration and product you picked, or "Skipped" |
| Member Portal Page | Whether a portal page is connected |

### Member Portal Page

This is the one thing the wizard asks you to finish here: your members need a page to view and manage their memberships. Use the **Select an existing page** dropdown to attach an existing page, or click **+** to create a new one on the spot. 

Either way, the page needs the `[fluent_member_portal]` shortcode on it, the wizard shows you that shortcode directly under the field.

Click **Complete Setup** to finish, or **Go Back** to revisit Step 3.

![Step 4: Setup summary and Member Portal Page field](/images/getting-started/quick-start/step-4.webp)

## After the Wizard

Once the wizard closes, you land on the Fluent Members dashboard. Here's what to check next, especially for anything you skipped:

### 1. Review your Membership Levels

Go to **Fluent Members → Levels** to see the Level you created, or add another with **+ Create Membership Level**, for example a `Free`, `Basic`, `Pro`, and `Premium` tier, each with its own pricing and access rules.

### 2. Review your Access Groups

Go to **Fluent Members → Access Groups** to see the restriction rule the wizard created, or add another with **+ Add New Group** to protect more [content types](/guide/access-groups/protected-content).

### 3. Finish connecting payments

If you skipped Step 3, go to **Fluent Members → Levels**, open your Level, and add a Pricing Plan through a [paywall integration](/guide/levels/pricing-paywalls) or [native payment](/guide/levels/pricing-native).

### 4. Confirm the member portal page is live

If you didn't finish Step 4, [set up the Member Portal page](/guide/members/portal/setup): create or edit a WordPress page, add the `[fluent_member_portal]` shortcode, and publish it.

### 5. Test as a non-member

Open an incognito browser window, visit a protected page, and confirm you see the restriction message instead of the content. Admins always bypass protection, always test as a logged-out visitor.

## Quick Setup Checklist

Before you send traffic to your membership site, confirm you have:

- Created at least one Membership Level with the correct type
- Chosen the content to protect and attached it to an Access Group
- Added a Pricing Plan, if the membership is paid
- Connected a payment method, native or paywall
- Created or connected the Member Portal page with the `[fluent_member_portal]` shortcode
- Tested the protected content as a logged-out visitor

Once every box is checked, your basic Fluent Members setup is ready. From here you can add more Levels, build out additional Access Groups, and layer in Pro features like corporate seats and native billing as your site grows.
