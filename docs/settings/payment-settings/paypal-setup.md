---
title: "Set Up PayPal (Pro)"
description: "Connect your PayPal account, let Fluent Members register the webhook, add it by hand if needed and turn on PayPal payments."
---

# Set Up PayPal (Pro)

**PayPal** (Pro) takes PayPal payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. Connect your account and Fluent Members registers the webhook for you. Do this once for sandbox mode and once for live mode.

**Requirements**

- **Fluent Members Pro** must be active.
- A [PayPal Business account](https://www.paypal.com/business). For testing, use a sandbox account from the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/).

Without Pro, you can sell through [paywalls](/docs/levels/pricing-paywalls) instead.

## Open the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the PayPal card. The **PayPal Settings** screen opens. A breadcrumb at the top leads back to **Payment Settings**.

![Screenshot of the Payment Settings screen with Payment Settings underlined in the Settings menu and an arrow pointing to the Manage button on the PayPal card](/images/settings/payment-settings/paypal-setup-open-settings.webp)

## Step 1: Turn on PayPal Payment Settings

Turn on **PayPal Payment Settings** at the top. PayPal only takes payments once the selected mode is connected. When it is switched on and saved, a message confirms "PayPal payments enabled".

![Screenshot of the PayPal Settings screen with arrows pointing to the PayPal Payment Settings toggle and the Connect with PayPal button](/images/settings/payment-settings/paypal-setup-settings.webp)

## Step 2: Choose a Payment Mode

Under **Payment Mode**, choose the mode you are setting up:

- **Sandbox Mode** (default): For testing with PayPal's sandbox. No real money moves.
- **Live Mode:** For real payments.

Each mode has its own connected account and webhook.

## Step 3: Connect your account

1. Under **Connect with PayPal**, click **Connect with PayPal**. The text beside it says which account you are connecting, for example "You will be redirected to PayPal to connect your sandbox account." A **Connect PayPal** screen opens and shows the mode.

    ![Screenshot of the Connect PayPal screen in sandbox mode with the Connect PayPal with Fluent Members button](/images/settings/payment/paypal/connect-paypal-4.webp)

2. Click **Connect PayPal with Fluent Members** and log in to PayPal to authorize the connection.

You return to the settings with your account connected. You do not need to enter a Client ID or secret.

When the connection works, the card reads **Your PayPal Account is Up & Running** and shows your account with a **Disconnect PayPal** button.

## Step 4: Check the webhook

The webhook keeps payments, renewals, cancellations and refunds in sync. PayPal sends each event to your site.

Fluent Members registers the webhook in your PayPal app for you when you connect PayPal, and again when you save these settings with PayPal turned on. Under **PayPal Webhook**, the line under **Webhook URL** tells you the state for the selected mode:

- **Webhook is configured for the current mode.** The page shows "Your webhook", its ID and "is connected!". Use **Copy webhook ID** to copy the ID.
- **Webhook is not configured for the current mode yet.** Click **Set up webhook**. Fluent Members registers the webhook, or finds one that PayPal already has for this URL and uses it. A message confirms "PayPal webhook configured successfully."

The webhook needs these events, listed under **Events to send**:

| Event | Used for |
|---|---|
| `PAYMENT.CAPTURE.COMPLETED` | A one-time payment succeeded. |
| `PAYMENT.CAPTURE.REFUNDED` | A one-time payment was refunded. |
| `PAYMENT.SALE.COMPLETED` | A subscription payment succeeded. |
| `PAYMENT.SALE.REFUNDED` | A subscription payment was refunded. |
| `BILLING.SUBSCRIPTION.ACTIVATED` | A subscription started. |
| `BILLING.SUBSCRIPTION.RE-ACTIVATED` | A subscription resumed. |
| `BILLING.SUBSCRIPTION.SUSPENDED` | A subscription was paused. |
| `BILLING.SUBSCRIPTION.CANCELLED` | A subscription was cancelled. |
| `BILLING.SUBSCRIPTION.EXPIRED` | A subscription ended. |

> [!Note]
> If an event is missing, the matching change will not reach your site. Renewals will not extend memberships, for example.

### Add the webhook in PayPal yourself

If **Set up webhook** cannot register the webhook, add it in PayPal and then let Fluent Members pick it up.

1. Copy the **Webhook URL** from **PayPal Webhook**. It looks like this:

    ```
    https://your-site.com/?fluent_members_payment_listener=1&payment_method=paypal
    ```

2. Open the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) and go to **Apps & Credentials**. Switch to **Sandbox** or **Live** to match the mode you chose in step 2.
3. Open your app. If you do not have one, click **Create App**, enter an **App Name**, keep **Merchant** as the type, choose your **Sandbox Business Account**, and click **Create App**.

    ![Screenshot of the PayPal Create App window with an app name, the Merchant type, a sandbox business account and an arrow pointing to Create App](/images/settings/payment-settings/paypal-setup-create-app.webp)

4. Scroll down to **Sandbox Webhooks** (**Live Webhooks** in live mode) and click **Add Webhook**.

    ![Screenshot of the PayPal Sandbox Webhooks section with an arrow pointing to the Add Webhook button](/images/settings/payment-settings/paypal-setup-add-webhook.webp)

5. Paste the Webhook URL, then under **Event types** select the nine events from the table above, which sit under **Billing subscription**, **Payment capture** and **Payment sale**. Save the webhook.

    ![Screenshot of the PayPal Event types list with the Billing subscription events activated, cancelled, expired, re-activated and suspended selected](/images/settings/payment-settings/paypal-setup-select-events.webp)

PayPal shows "Webhook added successfully" and lists the webhook with its ID and the events it tracks.

![Screenshot of the PayPal Sandbox Webhooks list with the added webhook, its ID and the tracked events](/images/settings/payment-settings/paypal-setup-webhook-added.webp)

6. Go back to **PayPal Settings** in Fluent Members and click **Set up webhook**. Fluent Members finds the webhook you added for this URL and uses it.

## Step 5: Save the settings

Click **Save Settings** at the top right. PayPal turns off again if the selected mode has no connected account.

![Screenshot of the PayPal Settings screen with an arrow pointing to the Save Settings button](/images/settings/payment-settings/paypal-setup-save-settings.webp)

## Going live

Select **Live Mode** and repeat steps 3 and 4 with your live PayPal account. Sandbox and live keep separate accounts and webhooks, so finishing one does not set up the other.

## Testing on a local site

PayPal cannot send webhooks to a local site, so sandbox renewals will not extend memberships there. You can still try checkout in sandbox mode. Live mode needs a public site.

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

Click **Disconnect PayPal** on the account card and confirm with **Yes, Disconnect**. This applies to the selected mode only. It removes that mode's credentials and webhook ID. If the other mode is configured, PayPal switches to it. Otherwise PayPal payments turn off and the mode goes back to sandbox.

Disconnecting does not delete the webhook in PayPal and does not cancel any subscription there. Those subscriptions stop syncing with Fluent Members for that mode, so cancel or move them first.
