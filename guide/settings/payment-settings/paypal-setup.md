# PayPal Setup (Pro)

PayPal Setup is where you connect your PayPal Business account, choose Sandbox or Live mode, enter your REST API credentials, and register the webhook endpoint that syncs payments, renewals, and refunds back into Fluent Members. You only need to complete this setup once.

> [!Note]
> Native PayPal integration is available in **Fluent Members Pro** only. Without Pro you can still accept PayPal payments through Fluent Forms or Paymattic via [Paywalls](/guide/levels/pricing-paywalls).

## Access PayPal Setup

Go to **Fluent Members → Settings → Payment Settings**, then click **Manage** on the PayPal card.

## Enabling PayPal Payments

At the top of the page is the **PayPal Payment Settings** master toggle. Switch it on to activate PayPal as a payment method for your [Native Payment](/guide/levels/pricing-native) pricing plans.

## Payment Mode

Select your **Payment Mode**:

| Mode | Use it for |
|---|---|
| **Sandbox** | Development and staging. Uses PayPal's sandbox environment — no real money moves. |
| **Live** | Production. Real PayPal accounts are charged. |

Each mode stores its own API credentials independently. You can have both sandbox and live credentials saved and switch between them with this selector.

> [!Note]
> If you switch from Live to Sandbox while subscriptions are running, renewal webhooks will arrive on the wrong endpoint and fail to sync. Only switch modes when no live transactions are in flight.

## Getting Your API Credentials

Fluent Members uses the **PayPal REST API (PPCP — PayPal Commerce Platform)**. You need a Client ID and Client Secret for the mode you are setting up.

**Step 1: Log in to the PayPal Developer Dashboard**

Go to [developer.paypal.com](https://developer.paypal.com) and sign in with your PayPal Business account.

**Step 2: Open My Apps & Credentials**

Click **Apps & Credentials** in the top navigation. Make sure you are on the correct tab — **Sandbox** or **Live** — matching the mode you selected in Fluent Members.

**Step 3: Create or select an app**

Click **Create App**, give it a name (e.g. "Fluent Members"), and click **Create App**. You can also use an existing app.

**Step 4: Copy your credentials**

Your **Client ID** is shown immediately. Click **Show** next to **Secret** to reveal your **Client Secret**. Copy both values.

## Entering Credentials in Fluent Members

Paste the **Client ID** and **Client Secret** into the corresponding fields in the PayPal settings page, then click **Save Settings**.

> [!Note]
> Credentials are encrypted before being stored in your database. You can also set them via `wp-config.php` constants to keep them out of the database entirely:
> ```php
> // Sandbox
> define('FMEM_PAYPAL_SANDBOX_CLIENT_ID', 'your-sandbox-client-id');
> define('FMEM_PAYPAL_SANDBOX_CLIENT_SECRET', 'your-sandbox-secret');
>
> // Live
> define('FMEM_PAYPAL_LIVE_CLIENT_ID', 'your-live-client-id');
> define('FMEM_PAYPAL_LIVE_SECRET', 'your-live-secret');
> ```
> Constants take precedence over database values.

## Setting Up the Webhook

The webhook lets PayPal notify Fluent Members when a subscription activates, a payment is captured, or a refund is processed. Without it, member access will not update automatically.

Fluent Members can register the webhook with PayPal automatically — you do not need to configure it manually in the PayPal Developer Dashboard.

**Step 1: Save your credentials first**

Enter your Client ID and Client Secret and click **Save Settings** before setting up the webhook. The webhook registration uses your saved credentials to authenticate with the PayPal API.

**Step 2: Click Set Up Webhook**

Click the **Set Up Webhook** button on the PayPal settings page. Fluent Members calls the PayPal API and registers the webhook endpoint automatically. When it succeeds, a Webhook ID is saved to your settings for the active mode.

Your webhook endpoint URL is:
```
https://your-site.com/wp-json/fluent-members/v2/paypal-webhook
```

::: warning Sandbox and Live have separate webhooks
The **Set Up Webhook** button registers a webhook for whichever mode is currently selected. Make sure you run it once in **Sandbox** during testing, and once in **Live** before going live.
:::

## Webhook Events Reference

Fluent Members listens for the following PayPal events:

| PayPal Event | What Fluent Members Does |
|---|---|
| `PAYMENT.CAPTURE.COMPLETED` | Confirms a one-time payment and activates the membership. |
| `PAYMENT.CAPTURE.REFUNDED` | Records a refund row and marks the original transaction as refunded. |
| `PAYMENT.SALE.COMPLETED` | Records a subscription renewal payment and extends membership expiry. |
| `PAYMENT.SALE.REFUNDED` | Records a refund on a subscription charge. |
| `BILLING.SUBSCRIPTION.ACTIVATED` | Activates the subscription and member access. |
| `BILLING.SUBSCRIPTION.RE-ACTIVATED` | Re-activates a previously suspended subscription. |
| `BILLING.SUBSCRIPTION.SUSPENDED` | Suspends the subscription and flags access accordingly. |
| `BILLING.SUBSCRIPTION.CANCELLED` | Cancels the local subscription record. |
| `BILLING.SUBSCRIPTION.EXPIRED` | Marks the subscription as expired. |

## How PayPal Subscriptions Work

When a member subscribes using PayPal, the checkout flow uses the **PayPal JS SDK** embedded on your pricing page:

1. Member clicks **Subscribe with PayPal** on the pricing card.
2. The PayPal popup opens — the member logs in and approves the subscription plan.
3. Fluent Members receives the subscription ID and confirms the checkout server-side.
4. The `BILLING.SUBSCRIPTION.ACTIVATED` webhook fires and activates the membership.

For one-time payments, the same flow applies but uses a PayPal Order (capture) instead of a subscription plan.

## Cancellation Behaviour

PayPal does not support a native "cancel at end of period" API. When a member cancels:

- **Cancel immediately** — the subscription is cancelled in PayPal straight away and access ends.
- **Cancel at end of period** — the subscription is cancelled in PayPal now, but Fluent Members continues access until the current billing period ends. No further charges occur.

## Disconnecting PayPal

To remove your PayPal connection, click **Disconnect PayPal** in the settings panel. This removes the stored credentials from Fluent Members. Existing PayPal subscriptions will continue to charge your members in PayPal, but Fluent Members will no longer be able to process the webhook events or manage them.

::: warning Cancel subscriptions before disconnecting
Disconnecting with live subscriptions running means PayPal will keep charging your members, but Fluent Members cannot process the webhook events. Cancel or migrate all active subscriptions before disconnecting.
:::
