---
title: "Set Up Stripe (Pro)"
description: "Connect your Stripe account, add the webhook endpoint, save its signing secret, pass the webhook check and turn on Stripe payments."
---

# Set Up Stripe (Pro)

**Stripe** (Pro) takes card payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. To take payments, connect your Stripe account, add a webhook endpoint in Stripe, save its signing secret and pass the webhook check. Do this once for test credentials and once for live credentials.

**Requirements**

- **Fluent Members Pro** must be active.
- A [Stripe account](https://dashboard.stripe.com/register). You can create one while you connect.

Without Pro, you can still take Stripe payments through [paywalls](/docs/levels/pricing-paywalls).

## Open the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the Stripe row. The Stripe settings screen opens. A breadcrumb at the top leads back to **Payment Settings**, and a **Payment Activation** switch sits beside it.

<!-- TODO(screenshot): stripe-setup-1
  screen: Payment Settings -> Stripe -> Manage
  state: Stripe settings with the breadcrumb, the Payment Activation switch, the credentials tabs and the Connect with Stripe row
  data: Pro active, Stripe not connected, site in test mode
  highlight: Payment Activation switch and Connect Test Mode button
  view: admin
  alt: Screenshot of the Stripe settings screen before connecting, with the Connect Test Mode button
-->

The mode comes from **Site Mode** in [General Settings](/docs/settings/general). A line at the top of the setup says "Payments are in test mode." or "Payments are in live mode." In test mode, the line links to **Switch Site Mode to Live in General Settings to take real payments.**

## Step 1: Pick the credentials to set up

Click **Test credentials** or **Live credentials**. Each set has its own connected account and signing secret, and Fluent Members remembers the tab you used last. Stripe uses the set that matches your **Site Mode**.

## Step 2: Connect your account

Under **Connect with Stripe**, click **Connect Test Mode** or **Connect Live Mode**. Stripe opens so you can authorize the connection, then returns you to this page.

Once connected, the row reads **Your Stripe account is connected and ready.** and shows your account name with a **Disconnect Stripe** button. Until the webhook check passes, it reads "Your Stripe account is connected. Check the webhook to finish setup." instead.

## Step 3: Add the webhook in Stripe

The webhook keeps payments, renewals, cancellations and refunds in sync. Stripe sends each event to your site, and Fluent Members checks it against your signing secret. The **Stripe Webhook** block on the page walks you through it under **How to configure?**:

1. Click **Add the endpoint in Stripe**. This opens Stripe with the events below already selected.
2. Paste the **Webhook URL** from Fluent Members as the endpoint URL. Click the URL to copy it. It looks like this:

    ```
    https://your-site.com/?fluent_members_payment_listener=1&payment_method=stripe
    ```

3. Check that the events are selected, including `customer.created`, and save the endpoint.
4. Copy the signing secret from Stripe. It starts with `whsec_`.

Stripe must send these events, listed under **Events to send**:

| Event | Used for |
|---|---|
| `payment_intent.succeeded` | A one-time payment succeeded. |
| `payment_intent.payment_failed` | A one-time payment failed. |
| `charge.refunded` | A charge was refunded. |
| `charge.refund.updated` | A refund changed. |
| `charge.dispute.closed` | A dispute was closed. |
| `charge.dispute.funds_reinstated` | Funds from a dispute were reinstated. |
| `invoice.paid` | A subscription payment succeeded. |
| `invoice.payment_failed` | A subscription payment failed. |
| `customer.subscription.updated` | A subscription changed. |
| `customer.subscription.paused` | A subscription was paused. |
| `customer.subscription.resumed` | A subscription was resumed. |
| `customer.subscription.deleted` | A subscription ended. |
| `customer.created` | Used by the webhook check. |

> [!Note]
> If an event is missing in Stripe, the matching change will not reach your site. Renewals will not extend memberships, for example. Stripe's guide to [webhooks](https://docs.stripe.com/webhooks) explains how events and signing secrets work.

## Step 4: Save the signing secret

1. Paste the secret into **Signing Secret**. The eye button shows or hides it.
2. Click **Save Settings** at the top right.

The line under **Webhook URL** tells you the state for the selected credentials:

- **Webhook secret is not configured for the current mode yet.** Paste the signing secret and save.
- **Webhook secret is configured for the current mode.** The secret is saved. The field then reads "Saved. Paste a new secret to replace it", and leaving it blank keeps the saved secret.

## Step 5: Check the webhook

Click **Check webhook** under **Webhook status**. It creates and deletes a temporary customer in your Stripe account, then waits for Stripe to send the signed event to your site. The badge shows one of these:

| Badge | Meaning |
|---|---|
| **Not verified** | You have not run the check for these credentials. |
| **Checking** | Fluent Members is waiting for the event. |
| **Verified** | The webhook passed its check for this mode. |
| **Failed** | The event did not arrive. Check the endpoint URL, the `customer.created` event and the signing secret. |

The button needs a connected account.

## Step 6: Turn on payments

Turn on **Payment Activation**. Stripe turns on only once the account is connected and the webhook check passes. Until then, the page says "Payments turn on once Stripe is connected and the webhook check passes." When it works, a message confirms "Stripe payments enabled". You can also turn Stripe on or off from the switch on [Payment Settings](/docs/settings/payment-settings/).

## Going live

When you are ready for real payments:

1. Open the **Live credentials** tab and click **Connect Live Mode**.
2. Create the endpoint in your live Stripe account, as in step 3, save its live signing secret and run **Check webhook**.
3. Switch **Site Mode** to **Live** in [General Settings](/docs/settings/general).

Test and live keep separate accounts and secrets, so finishing one does not set up the other.

## Testing on a local site

A local site only receives Stripe webhooks through the [Stripe CLI](https://docs.stripe.com/stripe-cli), and the page says so under the check. You can still try checkout in test mode, but test renewals will not extend memberships there. Live mode needs a public site.

## Set the signing secret in wp-config.php

To keep secrets out of the database, define them in `wp-config.php`. These take priority over the field:

```php
define('FMEM_STRIPE_TEST_WEBHOOK_SECRET', 'whsec_...');
define('FMEM_STRIPE_LIVE_WEBHOOK_SECRET', 'whsec_...');
```

## Disconnect Stripe

Click **Disconnect Stripe** on the account row and confirm with **Disconnect**. Click **Keep Connected** to cancel. This applies to the selected credentials only. For live mode, new live payments stop and Fluent Members stops recording renewals and other Stripe events until you reconnect. Stripe keeps charging existing subscriptions.

Disconnecting does not cancel any subscription in Stripe, so cancel or move them first.
