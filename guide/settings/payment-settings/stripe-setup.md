# Stripe Setup (Pro)

Stripe Setup is where you connect your Stripe account, choose Test or Live mode, enter your API keys, and register the webhook endpoint that syncs payments, renewals, and refunds back into Fluent Members. You only need to complete this setup once.

>[!Note]
> Native Stripe integration is available in **Fluent Members Pro** only. Without Pro you can still accept Stripe payments through FluentCart, Fluent Forms, or Paymattic via [Paywalls](/guide/levels/pricing-paywalls).

## Access Stripe Setup

Go to **Fluent Members → Settings → Payment Settings**, then click **Manage** on the Stripe card.

![Stripe Setup page](/images/settings/payment/stripe/payment-settings-1.webp)

## Enabling Stripe Payments

At the top of the page is the **Stripe Payment Settings** master toggle. Switch it on to activate Stripe as a payment method for your [Native Payment](/guide/levels/pricing-native) pricing plans.

![Enable Stripe Payments](/images/settings/payment/stripe/enable-stripe-settings-2.webp)

## Payment Mode

Below the toggle, select your **Payment Mode**:

| Mode | Use it for |
|---|---|
| **Test Mode** | Development and staging. Use Stripe's test cards — no real money moves. |
| **Live Mode** | Production. Real cards are charged for real money. |

Each mode stores its own API keys independently. You can have both test and live keys saved and switch between them with this radio button.

>[!Note]
> If you switch from Live to Test while subscriptions are running, renewal webhooks will arrive on the wrong-mode endpoint and fail to sync. Only switch modes when no live transactions are in flight.

## Connecting With Stripe

Below the mode selector, click the **Connect with Stripe** button to start the OAuth flow. You will be redirected to Stripe to authorise the connection. When authorisation is complete, the page confirms your account is connected, showing your business name and a **Disconnect Stripe** button.

Alternatively, you can enter your **Publishable Key** and **Secret Key** manually if the OAuth flow is not available for your account.

## Configuring the Stripe Webhook

The webhook lets Stripe notify Fluent Members when a payment succeeds, a subscription renews, or a refund is processed. Without it, member access will not update automatically.

**Step 1: Copy the webhook URL from Fluent Members**

On the Stripe settings page, locate the **Webhook URL** field and copy the endpoint shown. It looks like:

```
https://your-site.com/wp-json/fluent-members/v2/stripe-webhook
```

![Stripe settings with webhook URL](/images/settings/payment/stripe/stripe-settings-3.webp)

**Step 2: Open Webhooks in your Stripe Dashboard**

Log in to your Stripe account. Click **Developers** from the bottom-left corner, then select **Webhooks**.

![Stripe Developers — Webhooks](/images/settings/payment/stripe/stripe-developer-4.webp)

**Step 3: Add a new destination**

Click the **+ Add destination** button.

![Add destination button](/images/settings/payment/stripe/add-destination-5.webp)

**Step 4: Select the required events**

Search for and select the following events that Fluent Members needs:

- **`payment_intent.succeeded`**: Confirms a one-time payment and activates the membership.
- **`invoice.payment_succeeded`**: Records a renewal and extends the membership expiry date.
- **`invoice.payment_failed`**: Marks a subscription as past-due and triggers a failure notification.
- **`customer.subscription.updated`**: Syncs subscription status changes (active, past_due, cancelled).
- **`customer.subscription.deleted`**: Cancels the local subscription; cascades to child seats for corporate memberships.

Once you have selected all five events, click **Continue**.

![Select webhook events](/images/settings/payment/stripe/select-a-event-6.webp)

**Step 5: Set the endpoint URL and create**

Select **Webhook endpoint**, click **Continue**, then paste the webhook URL you copied from Fluent Members into the **Endpoint URL** field. Click **Create destination** to save.

![Paste webhook endpoint URL](/images/settings/payment/stripe/webhook-endpoint-7.webp)

**Step 6: Paste the signing secret back into Fluent Members**

After the endpoint is created, Stripe displays a **Signing secret** (starts with `whsec_`). Copy it and paste it into the **Webhook Signing Secret** field in Fluent Members, then click **Save Settings**.

::: warning Match the signing secret to the active mode
Test-mode endpoints have a test signing secret; live-mode endpoints have a live signing secret. Make sure you paste the secret that corresponds to the Payment Mode currently selected.
:::

## Webhook Events Reference

| Stripe Event | What Fluent Members Does |
|---|---|
| `payment_intent.succeeded` | Confirms a one-time payment and activates the membership. |
| `invoice.payment_succeeded` | Records a renewal transaction and extends the membership expiry date. |
| `invoice.payment_failed` | Marks the subscription as past-due and triggers a failure notification. |
| `customer.subscription.updated` | Syncs subscription status changes (active, past_due, cancelled). |
| `customer.subscription.deleted` | Cancels the local subscription; cascades to child seats for corporate memberships. |

## Disconnecting Stripe

To remove the Stripe connection, click **Disconnect Stripe** in the connected state panel. This severs the OAuth link and removes stored API keys from Fluent Members. Existing subscriptions in Stripe will continue to charge, but Fluent Members will no longer be able to sync events or manage them.

::: warning Cancel subscriptions before disconnecting
Disconnecting with live subscriptions running means Stripe will keep charging your members, but Fluent Members cannot process the webhook events. Cancel or migrate all active subscriptions before disconnecting.
:::
