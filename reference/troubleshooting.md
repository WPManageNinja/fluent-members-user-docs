---
title: "Troubleshooting"
description: "Fixes for the most common Fluent Members problems with protected content, emails, webhooks, renewals, paywalls and migrations."
---

# Troubleshooting

Start here when something on your membership site doesn't behave as expected. Each section names the symptom and the checks to run, in order.

## I Can Still See Protected Content

Administrators always bypass restrictions so they can edit content. Test in a private browser window, logged out or as a member.

## A Member Can't See Content They Paid For

1. Open the member under **Fluent Members → Members** and check the status. Only **Active** and **Trial** give access. See [Membership Statuses](/reference/membership-statuses).
2. Check that the level is attached to the Access Group that protects the content. See [Attach access groups](/docs/levels/attaching-access-groups).
3. If the Access Group uses [drip content](/docs/access-groups/content-drip), check whether the content has unlocked yet.

## A Payment Didn't Create a Membership

Paywall purchases through FluentCart, Fluent Forms, Paymattic or WooCommerce (Pro) grant access only when the purchase matches a level.

1. Open the level and check that the product or form is attached in [Price with paywalls](/docs/levels/pricing-paywalls).
2. Check that the payment finished in the plugin that took it. An unpaid order doesn't grant access.
3. Check whether the buyer was logged out. Guest purchases can't always create an account. See [Checkout & guest checkout](/docs/selling/checkout).

To log the reason on your own site, listen to `fluent_members/membership_not_stored` and the skipped-payment hooks in [Developer Hooks](/reference/developer-hooks).

## The Member Portal Shows Raw Shortcode Text

A theme or page builder didn't process the shortcode.

1. Put `[fluent_member_portal]` in a **Shortcode** block in the block editor, or on its own line in the Classic Editor.
2. In a page builder, use its shortcode widget, not a text widget.

## An Email Notification Isn't Arriving

1. Check the notification is on. All notifications are off by default. Go to **Fluent Members → Settings → Email Configuration → Email Notifications**.
2. Check the sender in **Email Configuration → Mailing Settings**. Use an address on your own domain.
3. Check your site can send mail at all. WordPress's default mail often fails on shared hosting, so install an SMTP plugin such as FluentSMTP.
4. Open the notification and preview it, to rule out a broken template.
5. Check the spam folder.

Seats on a corporate membership don't get the **Membership Expired** or **Subscription Cancelled** emails. Only the owner does.

## The Stripe Webhook Isn't Verified (Pro)

Payments stay off until Stripe is connected and the webhook check passes.

1. Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on **Stripe**.
2. Copy the **Webhook URL** from the **Stripe Webhook** section. It contains `?fluent_members_payment_listener=1&payment_method=stripe`. Paste exactly that into the endpoint in your Stripe dashboard.
3. Confirm every event listed under **Events to send** is selected on the endpoint, including `customer.created`.
4. Copy the signing secret from Stripe into **Signing Secret**. Test and live mode have separate secrets, so use the one for your current mode.
5. Click **Check webhook**. It creates and deletes a temporary customer in your Stripe account, then waits for Stripe's signed event.
6. If the check still fails, ask your host or security plugin to allow POST requests to the webhook URL.

A site on a local address can't receive webhooks from Stripe.

## PayPal Subscriptions Aren't Renewing or Cancelling (Pro)

1. Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on **PayPal**.
2. Click **Check webhook** in the **PayPal Webhook** section. Fluent Members registers the webhook in your PayPal app and confirms its URL and events.
3. Confirm you are in the right mode. PayPal keeps sandbox and live webhooks separate.
4. If you connected a different PayPal account, click **Check webhook** again so the webhook is registered on the new app.

See [Set up PayPal](/docs/settings/payment-settings/paypal-setup) for the full setup.

## Memberships Aren't Expiring on Time

Expiry runs hourly through the WordPress cron event `fluent_members_check_expired_memberships`. If cron doesn't fire, memberships stay **Active** past their expiry date.

1. Go to **Tools → Site Health** and look for scheduled event warnings. WP-Cron only runs when someone visits your site.
2. If `DISABLE_WP_CRON` is set in `wp-config.php`, set up a real server cron job that calls `wp-cron.php` every few minutes.
3. The job handles 100 memberships per run by default. For a large backlog, raise it with the `fluent_members/expiry_batch_size` filter in [Developer Hooks](/reference/developer-hooks), up to 1000.

## Restricted Content Shows Through a Custom REST Endpoint

Fluent Members protects the standard WordPress REST post routes and comment routes for protected content. Custom endpoints, such as `/wp-json/your-plugin/v1/posts`, aren't covered. Check access in your own endpoint before you return the content.

## Cancelling Doesn't Stop the Subscription

The result depends on how the member pays:

- **Stripe and PayPal (Pro):** **End of Billing Period** keeps the membership **Active** until the period ends, so this is expected until then. **Cancel Immediately** ends it now. See [Cancel a subscription](/docs/billing/cancelling-a-subscription).
- **Older PayPal subscriptions, including migrated ones:** when billing is managed in PayPal, Fluent Members ends the membership but PayPal keeps charging. The member or you must cancel in PayPal too.
- **FluentCart and WooCommerce:** cancelling in Fluent Members ends the membership. Check the subscription in the plugin that bills it.

## The Partial Content Overlay Sits Behind the Content

A theme or page builder is overriding the stacking order. Add this in **Appearance → Customize → Additional CSS**:

```css
.fmem_partial-content-overlay { z-index: 99 !important; }
```

## A Migration Source Shows Not Detected

The **Migration** screen only detects a source plugin that is active and has its database tables.

1. Activate Paid Memberships Pro, MemberPress or Kadence Memberships. Installed but inactive isn't enough.
2. Check the plugin's tables still exist. Fluent Members looks for `pmpro_membership_levels`, `mepr_transactions` or `rcp_memberships` with your database prefix.

For a half-finished run on a test site, **Reset Migration** appears on all three sources when `WP_DEBUG` is on. See [Migration overview](/docs/settings/migration/).

## A Corporate Owner Can't Invite Anyone (Pro)

The invite fails with `All seats are taken or reserved by pending invitations.` or `All %d seats are occupied. No more members can join.`, where `%d` is the seat count. Pending invitations hold a seat.

- Cancel a pending invitation or remove a member from the owner's **Team Members** panel, or
- Raise **Maximum Member** on the level under **Fluent Members → Membership Levels**.

If the invitee sees `This invitation was sent to a different email address.`, they must log in with the invited email.

## The Custom Email Editor Is Blank (Pro)

Fluent Members removes other plugins' scripts and styles from the editor to avoid conflicts, so a blank editor usually comes from an optimizer rewriting assets.

1. Deactivate caching and optimization plugins for a moment and reload the editor.
2. If it loads, turn off asset optimization on the editor page in that plugin, or reactivate plugins one by one to find the conflict.

## Refund or Update Payment Method Doesn't Appear (Pro)

1. Check **Fluent Members Pro** is active.
2. **Refund** appears only when the membership has a refundable native transaction.
3. **Update Payment Method** appears only for Stripe subscriptions. PayPal doesn't support it.

## Your Site Looks Broken After Activating

Switch to a default theme with other plugins deactivated, on a staging copy if the site is live. If the problem clears, reactivate plugins one at a time to find the conflict.
