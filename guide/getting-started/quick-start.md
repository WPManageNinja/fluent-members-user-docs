# Quick Start

When you first activate **Fluent Members**, a 4-step setup wizard walks you through the core configuration. This guide follows that wizard screen by screen, so you know exactly what each one is asking and why.

::: tip Optional and skippable
Every screen has a **Skip All** button (bottom left) that jumps straight to the final summary. Nothing in the wizard is permanent, you can revisit any of it later from **Fluent Members → Levels**, **Access Groups**, **Settings**, or **Members**.
:::

## What You'll Set Up

| Step | Screen | What it does |
|---|---|---|
| 1 of 4 | Welcome to FluentMembers | Create your first Membership: a title and a type |
| 2 of 4 | Protect Your Content | Choose what this membership restricts and what non-members see |
| 3 of 4 | Set Up Payments | Connect a paywall integration or preview native billing |
| 4 of 4 | Almost Done! | Review a summary and set up your Member Portal page |

## Step 1 of 4: Welcome to FluentMembers

The wizard opens on **Welcome to FluentMembers**, "Let's create your first membership in just a few steps."

**Create a Membership:**

- **Membership Title**: the name members will see on pricing pages and in their portal. Example: `Premium Membership`, `Gold Plan`.
- **Type**: choose how this membership works:
  - **Individual**: a single-user membership plan. Selected by default.
  - **Corporate**: a multi-seat plan for teams. See [Corporate Memberships](/guide/levels/corporate-memberships).

You can change either field later. Click **Next Step** (bottom right) to continue, or **Skip All** (bottom left) to jump straight to the Step 4 summary.

::: tip You can always come back
This step only creates the Level shell. You add pricing plans, content rules, and drip schedules from **Fluent Members → Levels** after the wizard completes.
:::

![Step 1 of 4: Welcome to FluentMembers, showing the Membership Title field and Individual/Corporate type selector](/images/getting-started/quick-start/step-1.webp)

## Step 2 of 4: Protect Your Content

Step 2, **Protect Your Content**, chooses what this membership restricts and what a non-member sees when they hit it.

**Apply Restriction To:**

Use the **Select Type** dropdown to choose what gets locked down, specific pages or posts, an entire post type, categories or other content types, or your whole site. See [Protected Content: Restriction Types](/guide/access-groups/protected-content).

**Unauthorized Access:**

Choose what happens when someone without access tries to view this content, from the **Action for Unauthorized Users** dropdown. The wizard defaults to **Display a custom message**, which reveals three more fields:

- **Custom Message**: shown in place of the content. Defaults to `This content is for members only. Please join to get access.`
- **Button Text**: the call-to-action label. Defaults to `Subscribe Now`.
- **Button URL**: where that button sends the visitor, search for an existing page or paste a URL directly.

The other unauthorized-access actions (redirect, partial preview, login popup, hide entirely) are configured the same way from the Access Group's own settings after the wizard. See [Setting Up Unauthorized Access Rules](/guide/access-groups/unauthorized-access).

Click **Next Step** to continue, **Go Back** to revisit Step 1, or **Skip All** to jump to the summary.

::: info Nothing selected yet?
Leaving **Apply Restriction To** empty is fine, the note on this screen tells you exactly that: restrict pages, posts, your entire site, or specific categories and content types now, or skip and configure it later from Settings.
:::

![Step 2 of 4: Protect Your Content, showing the Apply Restriction To dropdown and the Unauthorized Access message, button text, and button URL fields](/images/getting-started/quick-start/step-2.webp)

## Step 3 of 4: Set Up Payments

Step 3, **Set Up Payments**, connects a payment method so you can start selling this membership.

**Paywall Integrations:**

The wizard detects which supported plugins are already installed on your site and shows each as **Installed** or **Not Installed**:

| Integration | Requires |
|---|---|
| FluentCart | Free |
| Fluent Forms | Free |
| Paymattic | Free |
| WooCommerce | Pro |

Select an installed integration and its own setup fields appear underneath. For FluentCart, that's a **Search FluentCart Products** field (type at least one character to search) and a **+ Create Pricing** link if you'd rather create a new product from here.

::: tip Prefer built-in billing?
The banner at the top of this step also points you to native billing: connect Stripe or PayPal directly from the **Native Payment** section instead of linking an external plugin's product. See [Stripe Setup (Pro)](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup (Pro)](/guide/settings/payment-settings/paypal-setup).
:::

Click **Next Step** to continue, **Go Back** to revisit Step 2, or **Skip All** to jump to the summary, you can always add pricing from the Level's own settings later.

![Step 3 of 4: Set Up Payments, showing the FluentCart, Fluent Forms, Paymattic, and WooCommerce integration cards with FluentCart selected](/images/getting-started/quick-start/step-3.webp)

## Step 4 of 4: Almost Done!

The final screen, **Almost Done!**, summarizes exactly what the wizard set up, so you can see at a glance what's done and what still needs attention:

| Item | Shows |
|---|---|
| Membership Level | Your title, or "new" if you skipped Step 1 |
| Content Protection | The restriction you chose, or "Skipped, No restriction set" |
| Payment | The integration and product you picked, or "Skipped" |
| Member Portal Page | Whether a portal page is connected |

**Member Portal Page:**

This is the one thing the wizard asks you to finish here: your members need a page to view and manage their memberships. Use the **Select an existing page** dropdown to attach an existing page, or click **+** to create a new one on the spot. Either way, the page needs the `[fluent_member_portal]` shortcode on it, the wizard shows you that shortcode directly under the field.

Click **Complete Setup** to finish, or **Go Back** to revisit Step 3.

![Step 4 of 4: Almost Done, showing the setup summary and the Member Portal Page selector](/images/getting-started/quick-start/step-4.webp)

## After the Wizard

Once the wizard closes, you land on the Fluent Members dashboard. Here's what to check next, especially for anything you skipped:

**1. Review your Membership Levels**

Go to **Fluent Members → Levels** to see the Level you created, or add another with **+ Add New Level**.

![The Levels screen reached from the Fluent Members sidebar menu](/images/quick-start/create-membership-level.png)

**2. Review your Access Groups**

Go to **Fluent Members → Access Groups** to see the restriction rule the wizard created, or add another with **+ Add New Group**.

See [Protected Content: Restriction Types](/guide/access-groups/protected-content).

![The Access Groups screen reached from the Fluent Members sidebar menu](/images/quick-start/create-access-group.png)

**3. Finish connecting payments**

If you skipped Step 3, go to **Fluent Members → Levels**, open your Level, and add a Pricing Plan.

See [Pricing: Paywalls](/guide/levels/pricing-paywalls) or [Pricing: Native Payment](/guide/levels/pricing-native).

**4. Confirm the member portal page is live**

If you didn't finish Step 4, create or edit a WordPress page, add the `[fluent_member_portal]` shortcode, and publish it.

See [Portal: Setup](/guide/members/portal/setup).

**5. Test as a non-member**

Open an incognito browser window, visit a protected page, and confirm you see the restriction message instead of the content. Admins always bypass protection, always test as a logged-out visitor.
