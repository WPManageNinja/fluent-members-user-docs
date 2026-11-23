---
title: "Set Up PayPal (Pro)"
description: "Connect your PayPal account, let Fluent Members register and check the webhook, and turn on PayPal payments."
---

# Set Up PayPal (Pro)

**PayPal** (Pro) takes PayPal payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. Connect your account, and Fluent Members registers the webhook in your PayPal app for you. Do this once for sandbox credentials and once for live credentials.

**Requirements**

- **Fluent Members Pro** must be active.
- A [PayPal Business account](https://www.paypal.com/business). For testing, use a sandbox account from the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).

Without Pro, you can sell through [paywalls](/docs/levels/pricing-paywalls) instead.

## Open the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the PayPal row. The PayPal settings screen opens. A breadcrumb at the top leads back to **Payment Settings**, and a **Payment Activation** switch sits beside it.

<!-- TODO(screenshot): paypal-setup-1
  screen: Payment Settings -> PayPal -> Manage
  state: PayPal settings with the breadcrumb, the Payment Activation switch, the credentials tabs and the Connect with PayPal row
  data: Pro active, PayPal not connected, site in test mode
  highlight: Payment Activation switch and Connect with PayPal button
  view: admin
  alt: Screenshot of the PayPal settings screen before connecting, with the Connect with PayPal button
-->

The mode comes from **Site Mode** in [General Settings](/docs/settings/general). A line at the top of the setup says "Payments are in test mode." or "Payments are in live mode." In test mode, the line links to **Switch Site Mode to Live in General Settings to take real payments.**

## Step 1: Pick the credentials to set up

Click **Sandbox credentials** or **Live credentials**. Each set has its own connected account and webhook, and Fluent Members remembers the tab you used last. PayPal uses the set that matches your **Site Mode**: sandbox in test mode, live in live mode.

## Step 2: Connect your account

1. Under **Connect with PayPal**, click **Connect with PayPal**. The text beside it says which account you are connecting, for example "You will be redirected to PayPal to connect your sandbox account."
2. Log in to PayPal and authorize the connection.

You return to the settings with your account connected. You do not need to enter a Client ID or secret.

Once connected, the row reads **Your PayPal account is connected and ready.** and shows your account with a **Disconnect PayPal** button. Until the webhook check passes, it reads "Your PayPal account is connected. Check the webhook to finish setup." instead.

## Step 3: Check the webhook

The webhook keeps payments, renewals, cancellations and refunds in sync. PayPal sends each event to your site.

Fluent Members registers the webhook in your PayPal app for you. Under **PayPal Webhook**, click **Check webhook** to register it and confirm its URL and events. The **Webhook URL** looks like this, and you can click it to copy it:

```
https://your-site.com/?fluent_members_payment_listener=1&payment_method=paypal
```

The line under the URL tells you the state for the selected credentials:

- **Webhook is configured for the current mode.** The page also shows "Your webhook" with its ID and "is connected." Click the ID to copy it.
- **Webhook is not configured for the current mode yet.** Click **Check webhook**.

Under **Webhook status**, the badge shows **Not verified**, **Checking**, **Verified** or **Failed**. The button needs a connected account.

The webhook needs these events, listed under **Events to send**:

| Event | Used for |
|---|---|
| `PAYMENT.CAPTURE.COMPLETED` | A one-time payment succeeded. |
| `PAYMENT.CAPTURE.REFUNDED` | A one-time payment was refunded. |
| `PAYMENT.CAPTURE.REVERSED` | A one-time payment was reversed. |
| `PAYMENT.SALE.COMPLETED` | A subscription payment succeeded. |
| `PAYMENT.SALE.REFUNDED` | A subscription payment was refunded. |
| `PAYMENT.SALE.REVERSED` | A subscription payment was reversed. |
| `BILLING.SUBSCRIPTION.ACTIVATED` | A subscription started. |
| `BILLING.SUBSCRIPTION.RE-ACTIVATED` | A subscription resumed. |
| `BILLING.SUBSCRIPTION.SUSPENDED` | A subscription was paused. |
| `BILLING.SUBSCRIPTION.CANCELLED` | A subscription was cancelled. |
| `BILLING.SUBSCRIPTION.EXPIRED` | A subscription ended. |
| `BILLING.SUBSCRIPTION.PAYMENT.FAILED` | A subscription payment failed. |

> [!Note]
> If an event is missing, the matching change will not reach your site. Renewals will not extend memberships, for example. If the page shows a warning that the webhook does not point at this site, click **Check webhook** again.

## Step 4: Turn on payments

Turn on **Payment Activation**. PayPal turns on only once the account is connected and the webhook check passes. Until then, the page says "Payments turn on once PayPal is connected and the webhook check passes." When it works, a message confirms "PayPal payments enabled". You can also turn PayPal on or off from the switch on [Payment Settings](/docs/settings/payment-settings/).

## Going live

1. Open the **Live credentials** tab and click **Connect with PayPal** with your live PayPal account.
2. Click **Check webhook** until the badge reads **Verified**.
3. Switch **Site Mode** to **Live** in [General Settings](/docs/settings/general).

Sandbox and live keep separate accounts and webhooks, so finishing one does not set up the other.

## Testing on a local site

PayPal cannot send webhooks to a local site, and the page says so under the check. You can still try checkout in test mode, but sandbox renewals will not extend memberships there. Live mode needs a public site.

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

Click **Disconnect PayPal** on the account row and confirm with **Disconnect**. Click **Keep Connected** to cancel. This applies to the selected credentials only. For live mode, new live payments stop and Fluent Members stops recording renewals and other PayPal events until you reconnect. PayPal keeps charging existing subscriptions.

Disconnecting does not cancel any subscription in PayPal, so cancel or move them first.
