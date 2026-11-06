---
title: "Set Up PayPal (Pro)"
description: "Connect your PayPal account, let Fluent Members register the webhook, pass the webhook check and turn on PayPal payments."
---

# Set Up PayPal (Pro)

**PayPal** (Pro) takes PayPal payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. Connect your account and Fluent Members registers the webhook for you. Do this once for sandbox mode and once for live mode.

You need **Fluent Members Pro** and a PayPal Business account. Without Pro, you can sell through [paywalls](/docs/levels/pricing-paywalls) instead.

## Open the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the PayPal card.

<!-- TODO(screenshot): paypal-setup-1
  screen: Settings > Payment Settings > PayPal
  state: PayPal Payment Settings toggle on, Sandbox Mode selected, not connected, showing Connect with PayPal and the PayPal Webhook block with Webhook status
  data: Sandbox, not connected
  highlight: Connect with PayPal
  view: admin
  alt: Screenshot of PayPal Settings with the toggle, Payment Mode, Connect with PayPal and the PayPal Webhook block
  reason: needs the develop build on the local site
-->

## Step 1: Turn on PayPal Payment Settings

Turn on **PayPal Payment Settings**. Until PayPal is ready, the page shows "Payments turn on once PayPal is connected and the webhook check passes."

## Step 2: Choose a Payment Mode

Choose the mode you are setting up:

- **Sandbox Mode** (default): For testing with PayPal's sandbox. No real money moves.
- **Live Mode:** For real payments.

Each mode has its own connected account, webhook and webhook check.

## Step 3: Connect your account

1. Click **Connect with PayPal**. A **Connect PayPal** screen opens and shows the mode.

    ![Screenshot of the Connect PayPal screen in sandbox mode with the Connect PayPal with Fluent Members button](/images/settings/payment/paypal/connect-paypal-4.webp)

2. Click **Connect PayPal with Fluent Members** and log in to PayPal to authorize the connection.

You return to the settings with your account connected. You do not need to enter a Client ID or secret.

## Step 4: Check the webhook

Fluent Members registers the webhook in your PayPal app when you connect, and checks its URL and events. If that works, the webhook shows as verified, and payments turn on. The account card reads "Your PayPal Account is Up & Running", and the page shows "Your webhook" with its ID, followed by "is connected!".

If it did not work, or you see "Your PayPal account is connected. Check the webhook to finish setup.", click **Check webhook**. This registers the webhook if needed, adopts one already registered for this URL, adds any missing events, and confirms the URL matches your site.

<!-- TODO(screenshot): paypal-setup-2
  screen: Settings > Payment Settings > PayPal
  state: Connected sandbox account, webhook verified, "Your webhook <id> is connected!" and Webhook status showing Verified
  data: Sandbox account, blur the webhook ID
  highlight: Check webhook
  view: admin
  alt: Screenshot of the PayPal Webhook block with a connected webhook and the Verified status
  reason: needs a connected PayPal account and the develop build on the local site
-->

**Webhook status** shows **Not verified**, **Verified** or **Failed**, with a message when something is wrong. For example, it tells you when a webhook does not point at this site and gives the expected URL.

The webhook needs these events, listed under **Events to send**:

- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.REFUNDED`
- `PAYMENT.SALE.COMPLETED`
- `PAYMENT.SALE.REFUNDED`
- `BILLING.SUBSCRIPTION.ACTIVATED`
- `BILLING.SUBSCRIPTION.RE-ACTIVATED`
- `BILLING.SUBSCRIPTION.SUSPENDED`
- `BILLING.SUBSCRIPTION.CANCELLED`
- `BILLING.SUBSCRIPTION.EXPIRED`

Once it passes, the Payment Settings page shows **Sandbox Mode** or **Live Mode** with **Webhook verified**.

> [!Note]
> Connecting a different account, or moving the site to another address, cancels a passed check. PayPal payments cannot run on a public site until you click **Check webhook** again.

## Going live

Select **Live Mode** and repeat steps 3 and 4 with your live PayPal account. Saving a mode that has not passed its check turns PayPal payments off until it does.

## Testing on a local site

PayPal cannot send webhooks to a local site. In sandbox mode, PayPal can still be turned on without passing the check, so you can try checkout, but sandbox renewals will not extend memberships there. Live mode needs a public site.

## How cancelling works with PayPal

When a member or admin cancels a PayPal subscription, PayPal cancels it right away either way. **Cancel Immediately** ends access too. **End of Billing Period** keeps access in Fluent Members until the next billing date, with no further charges. See [Cancel a subscription](/docs/billing/cancelling-a-subscription).

## Set credentials in wp-config.php

Advanced setups can skip the connect flow by defining credentials in `wp-config.php`. These take priority over a connected account:

```php
// Sandbox
define('FMEM_PAYPAL_SANDBOX_CLIENT_ID', 'your-sandbox-client-id');
define('FMEM_PAYPAL_SANDBOX_CLIENT_SECRET', 'your-sandbox-secret');

// Live
define('FMEM_PAYPAL_LIVE_CLIENT_ID', 'your-live-client-id');
define('FMEM_PAYPAL_LIVE_CLIENT_SECRET', 'your-live-secret');
```

## Disconnect PayPal

Click **Disconnect PayPal** on the account card and confirm with **Yes, Disconnect**. This applies to the selected mode only. It removes that mode's credentials and webhook ID, and clears its webhook check. If the other mode is configured, PayPal switches to it. Otherwise PayPal payments turn off.

Disconnecting does not cancel any subscription in PayPal. Those subscriptions stop syncing with Fluent Members for that mode, so cancel or move them first.
