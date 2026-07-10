# PayPal Setup (Pro)

PayPal Setup is where you connect your PayPal Business account, choose Sandbox or Live mode, and configure the webhook that syncs payments, renewals, cancellations, and refunds back into Fluent Members. You only need to complete this setup once per mode.

> [!Note]
> Native PayPal integration is available in **Fluent Members Pro** only. Without Pro you can still accept PayPal payments through Fluent Forms or Paymattic via [Paywalls](/guide/levels/pricing-paywalls).

## Access PayPal Setup

Go to **Fluent Members → Settings → Payment Settings**, then click **Manage** on the PayPal card.

![Payment Settings showing Stripe active and PayPal disabled, with Manage highlighted on the PayPal card](/images/settings/payment/paypal/payment-settings-1.webp)

## Enable PayPal Payments

At the top of the page is the **PayPal Payment Settings** master toggle. Switch it on to activate PayPal as a payment method for your [Native Payment](/guide/levels/pricing-native) pricing plans, then click **Save Settings**.

![PayPal Payment Settings toggle and Save Settings button](/images/settings/payment/paypal/enable-paypal-settings-2.webp)

## Choose Your Payment Mode

With PayPal enabled, the page expands to show **Payment Mode**, **Connect with PayPal**, and **PayPal Webhook**.

| Mode | Use it for |
|---|---|
| **Sandbox Mode** | Development and staging. Uses PayPal's sandbox environment; no real money moves. |
| **Live Mode** | Production. Real PayPal accounts are charged. |

Each mode stores its own connected account and webhook independently, so you can connect both Sandbox and Live and switch between them with this selector.

> [!Note]
> If you switch from Live to Sandbox while subscriptions are running, renewal webhooks will arrive on the wrong endpoint and fail to sync. Only switch modes when no live transactions are in flight.

![PayPal Settings page showing Payment Mode, Connect with PayPal, and PayPal Webhook sections](/images/settings/payment/paypal/connect-with-paypal-3.webp)

## Connect With PayPal

Click **Connect with PayPal**. Fluent Members opens a **Connect PayPal** screen confirming which mode (Sandbox or Live) you're connecting.

![Connect PayPal screen with the Connect PayPal with Fluent Members button](/images/settings/payment/paypal/connect-paypal-4.webp)

Click **Connect PayPal with Fluent Members**. You're redirected to PayPal to log in and authorize the connection. Once approved, PayPal redirects you back to Fluent Members with your account connected, and no manual Client ID or Secret entry is required.

> [!Note]
> Advanced or self-hosted setups can still bypass the connect flow by defining credentials in `wp-config.php`, which take precedence over the connected account:
> ```php
> // Sandbox
> define('FMEM_PAYPAL_SANDBOX_CLIENT_ID', 'your-sandbox-client-id');
> define('FMEM_PAYPAL_SANDBOX_CLIENT_SECRET', 'your-sandbox-secret');
>
> // Live
> define('FMEM_PAYPAL_LIVE_CLIENT_ID', 'your-live-client-id');
> define('FMEM_PAYPAL_LIVE_CLIENT_SECRET', 'your-live-secret');
> ```

## Configure the PayPal Webhook

The webhook lets PayPal notify Fluent Members when a subscription activates, a payment is captured, or a refund is processed. Without it, member access will not update automatically. Copy the webhook endpoint URL shown under **PayPal Webhook** on the settings page; you'll paste it into the PayPal Developer Dashboard.

### Open Apps and Credentials

Log in to the [PayPal Developer Dashboard](https://developer.paypal.com) with the same account you connected, and open **Apps & Credentials**. Make sure you're on the tab (**Sandbox** or **Live**) matching the mode you connected. If you don't already have an app, click **Create App**.

![PayPal Apps and Credentials page with the Create App button highlighted](/images/settings/payment/paypal/create-app-3.webp)

### Add a Webhook

Open the app, scroll down to **Sandbox Webhooks** (or **Live Webhooks**), and click **Add Webhook**.

![Sandbox Webhooks section with the Add Webhook button highlighted](/images/settings/payment/paypal/add-webhook-4.webp)

### Paste the URL and Select Events

Paste the webhook URL you copied from Fluent Members, then select the following events under **Event types**, and click **Save**:

- Billing subscription activated
- Billing subscription cancelled
- Billing subscription expired
- Billing subscription re-activated
- Billing subscription suspended
- Payment capture completed
- Payment capture refunded
- Payment sale completed
- Payment sale refunded

![Add webhook modal with the URL pasted and event types selected](/images/settings/payment/paypal/add-webhook-url-and-events-5.webp)

### Confirm the Webhook Is Active

Once saved, the webhook appears in the list with a **Webhook ID** and its tracked events.

![Sandbox Webhooks list showing the new Webhook ID and its tracked events](/images/settings/payment/paypal/webhook-update-6.webp)

> [!Note]
> Sandbox and Live use separate webhooks. Repeat this section once in **Sandbox** during testing, and once in **Live** before going live.

## Webhook Events Reference

Fluent Members listens for the following PayPal events:

| PayPal Event | What Fluent Members Does |
|---|---|
| Billing subscription activated | Activates the subscription and member access. |
| Billing subscription re-activated | Re-activates a previously suspended subscription. |
| Billing subscription suspended | Suspends the subscription and flags access accordingly. |
| Billing subscription cancelled | Cancels the local subscription record. |
| Billing subscription expired | Marks the subscription as expired. |
| Payment capture completed | Confirms a one-time payment and activates the membership. |
| Payment capture refunded | Records a refund row and marks the original transaction as refunded. |
| Payment sale completed | Records a subscription renewal payment and extends membership expiry. |
| Payment sale refunded | Records a refund on a subscription charge. |

## How PayPal Subscriptions Work

When a member subscribes using PayPal, the checkout flow uses the **PayPal JS SDK** embedded on your pricing page:

1. Member clicks **Subscribe with PayPal** on the pricing card.
2. The PayPal popup opens, and the member logs in and approves the subscription plan.
3. Fluent Members receives the subscription ID and confirms the checkout server-side.
4. The **Billing subscription activated** webhook fires and activates the membership.

For one-time payments, the same flow applies but uses a PayPal Order (capture) instead of a subscription plan.

## Cancellation Behaviour

PayPal does not support a native "cancel at end of period" API. When a member cancels:

- **Cancel immediately**: The subscription is cancelled in PayPal straight away and access ends.
- **Cancel at end of period**: The subscription is cancelled in PayPal now, but Fluent Members continues access until the current billing period ends. No further charges occur.

## Confirm PayPal Is Connected

Once connected, both payment gateways show as **Active** on the Payment Settings screen.

![Payment Settings showing both Stripe and PayPal as Active](/images/settings/payment/paypal/payment-settings-7.webp)

## Disconnect PayPal

To remove your PayPal connection, click **Disconnect PayPal** in the settings panel. This removes the connected account from Fluent Members. Existing PayPal subscriptions will continue to charge your members in PayPal, but Fluent Members will no longer be able to process the webhook events or manage them.

> [!Note]
> Disconnecting with live subscriptions running means PayPal will keep charging your members, but Fluent Members cannot process the webhook events. Cancel or migrate all active subscriptions before disconnecting.
