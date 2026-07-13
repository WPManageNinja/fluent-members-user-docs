# Frequently Asked Questions

Quick answers to the most common questions about Fluent Members. If your answer is not here, see [Troubleshooting](/reference/troubleshooting) or open a ticket at [Get Support](/guide/help-support/get-support).

## General

### Is Fluent Members Free?

Yes. The free plugin includes Membership Levels, Access Groups, content protection, Member Portal, email notifications, and native integrations with FluentCart, Fluent Forms, Paymattic, FluentCRM, FluentSupport, and FluentCommunity.

**Fluent Members Pro** adds native Stripe checkout, the Block Email Editor, Transactions screen, refunds, corporate memberships, WooCommerce integration, and the Stripe-import bridge for migrations.

### What WordPress and PHP Versions Are Required?

WordPress 6.0+ and PHP 7.4+. Tested up to WordPress 6.9.

### Does Fluent Members Work With Any Theme?

Yes. The plugin uses standard WordPress hooks and outputs no theme-specific markup. If you notice a conflict, see [Troubleshooting](/reference/troubleshooting).

## Setup

### Do I Need a Separate Payment Plugin?

- **Free or admin-comped memberships**: no payment plugin needed.
- **Paid memberships with Pro**: native Stripe is built in, no extra plugin required.
- **Paid memberships without Pro**: connect a paywall to FluentCart, Fluent Forms, or Paymattic.
- **WooCommerce**: requires Pro.

### Is There a Cap on How Many Membership Levels I Can Create?

No. Both the free and Pro plugins support unlimited Levels.

### Where Do I Find My Level ID for the `[fluent_membership_level]` Shortcode?

Go to **Fluent Members → Levels**. The ID is shown in the first column of the list.

### How Do I Create the Member Portal Page?

Go to **Settings → General Settings** and click the **+** button next to **Generate Portal Page**. This creates a page with the `[fluent_member_portal]` shortcode automatically. You can also create the page manually and paste the shortcode anywhere in the content.

## Content Protection

### What Types of Content Can I Protect?

Pages, posts, custom post types, categories, tags, custom taxonomies, FluentCart products, WooCommerce products, Fluent Forms, Paymattic forms, and FluentCommunity spaces. You can also restrict individual blocks within a post using the Gutenberg block inspector.

### Can I Show a Teaser to Non-Members Instead of Blocking Them?

Yes, use the **Partial Content Preview** restriction action. It shows the first N words with a blurred overlay and a call-to-action button. Configure the defaults in **Settings → Partial Content Lock**, or override per Access Group.

### Can I Drip-Feed Content Over Time?

Yes. Set drip rules on the Membership Level: each rule specifies how many days after joining a member gains access to specific content. See [Content Dripping](/guide/levels/content-drip).

### Does Protection Apply to the REST API?

Yes. Any post type covered by an Access Group has its REST API response scrubbed for users who do not have access. Headless frontends follow the same rules.

## Members & Subscriptions

### What Membership Statuses Are Available?

Six: `active`, `trial`, `pending`, `cancelled`, `expired`, `suspended`. See [Status Reference](/guide/members/statuses) for what each means and what triggers it.

### How Does a Member Cancel Their Own Membership?

From the Member Portal, they click **Cancel Membership** on their membership card. For recurring Stripe subscriptions (Pro), the plugin cancels at the provider according to your configured [cancellation mode](/guide/transactions/cancellation-modes).

### Does Fluent Members Support Recurring Subscriptions?

Yes. Set a pricing plan to `recurring` to create a subscription. Native recurring payments require **Pro + Stripe**. FluentCart subscriptions, WooCommerce Subscriptions, Fluent Forms recurring payments, and Paymattic recurring payments are also supported.

### What Can Members Do in the Portal?

- **Free**: view memberships, cancel a membership
- **Pro**: update payment method, retry a failed subscription, manage corporate seat invites

Profile fields (name, password) are managed through WordPress's standard profile page.

### What Is a Corporate Membership?

A Pro feature where one parent member purchases a set number of seats and invites team members via the portal. Cancelling the parent membership revokes access for all sub-members. See [Corporate Memberships](/guide/levels/corporate-memberships).

## Emails

### How Many Email Notifications Does Fluent Members Include?

Three: **Welcome Email** (fires when a membership is granted), **Expiry Notification** (fires on `expired` status), and **Suspension Notification** (fires on `suspended` status). See [Email Notifications](/guide/settings/email-configuration/email-notifications).

### Can I Customise Notification Templates?

Yes, edit the subject and body of each notification from **Settings → Email Configuration → Email Notifications**. The free plugin provides a rich-text editor. Pro adds the Gutenberg Block Email Editor.

### Can I Add Custom Event-Based Notifications (Cancel, Upgrade, etc.)?

Not from the admin UI. Developers can register additional notifications via the `EmailNotifications` registry; see [Developer Hooks](/reference/developer-hooks). For production use, FluentCRM is the recommended approach: hook into lifecycle actions like `fluent_members/membership_cancelled` and send branded emails from there.

### My Emails Are Not Arriving — What Do I Check?

See [Troubleshooting](/reference/troubleshooting). The most common cause is a misconfigured From address or missing SMTP plugin. Set up your sender in **Settings → Email Configuration → Mailing Settings** and install [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/) for reliable delivery.

## Payments

### Where Is the Stripe Configuration?

Go to **Settings → Payment Settings**, click **Manage** on the Stripe card. Connect via Stripe Connect (OAuth) or enter your API keys manually, then copy the webhook URL into your Stripe Dashboard. Requires **Pro**. See [Stripe Setup](/guide/settings/payment-settings/stripe-setup).

### What Is the Stripe Webhook URL?

`/wp-json/fluent-members/v2/stripe-webhook`: the exact full URL is shown on the Stripe settings screen, copy it from there.

### Can I Issue a Refund From Fluent Members?

Yes (Pro). Open **Transactions**, find the charge, and click **Refund**. Full and partial refunds are supported. Refunding does not automatically cancel the membership; do that separately if needed. See [Refunds](/guide/transactions/refunds).

### What if I Refund Through the Stripe Dashboard Instead?

Stripe will send a `charge.refunded` webhook event. Fluent Members picks it up and marks the transaction as refunded automatically, as long as the webhook is configured correctly.

## Integrations & Migration

### Which Plugins Can I Migrate From?

Three: **Paid Memberships Pro**, **MemberPress**, and **Restrict Content Pro**. Each has a dedicated step-by-step wizard. See [Migration Overview](/guide/settings/migration/).

### Do Existing Stripe Subscriptions Carry Over During Migration?

Yes (Pro). The Stripe-import bridge links the new Fluent Members records to the existing Stripe customer and subscription IDs, so recurring billing continues without interruption. Supported for migrations from Paid Memberships Pro and MemberPress.

### Does Fluent Members Work With WooCommerce?

Yes (Pro): restrict WooCommerce products to specific Membership Levels, use WC products as paywalls, support WooCommerce Subscriptions for recurring billing, and use the instant-checkout flow.
