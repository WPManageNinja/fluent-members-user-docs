---
title: "Set Up Stripe (Pro)"
description: "Connect your Stripe account, add the webhook endpoint, save its signing secret and turn on Stripe payments."
---

# Set Up Stripe (Pro)

**Stripe** (Pro) takes card payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. To take payments, connect your Stripe account, add a webhook endpoint in Stripe and save its signing secret. Do this once for test mode and once for live mode.

**Requirements**

- **Fluent Members Pro** must be active.
- A [Stripe account](https://dashboard.stripe.com/register). You can create one while you connect.

Without Pro, you can still take Stripe payments through [paywalls](/docs/levels/pricing-paywalls).

## Access the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the Stripe card. The **Stripe Settings** screen opens. A breadcrumb at the top leads back to **Payment Settings**.

![Screenshot of the Payment Settings screen with Payment Settings underlined in the Settings menu and an arrow pointing to the Manage button on the Stripe card](/images/settings/payment-settings/stripe-setup-open-settings.webp)

### Step 1: Enable Stripe payments

Turn on **Stripe Payment Settings** at the top to show the setup fields. Stripe only takes payments once the selected mode is connected. When it is switched on and saved, a message confirms "Stripe payments enabled".

### Step 2: Choose a payment mode

Under **Payment Mode**, choose the mode you are setting up:

- **Test Mode** (default): For testing with [Stripe's test cards](https://docs.stripe.com/testing). No real money moves.
- **Live Mode:** For real payments.

Each mode has its own connected account and signing secret.

### Step 3: Connect your account

Under **Connect with Stripe**, click **Connect Test Mode** or **Connect Live Mode**.

![Screenshot of the Stripe Settings screen with arrows pointing to the Stripe Payment Settings toggle, the Connect Test Mode button and the Webhook URL](/images/settings/payment-settings/stripe-setup-settings.webp)

Stripe opens so you can authorize the connection. Enter your email address and click **Continue**, then follow the steps Stripe shows. In test mode, Stripe also offers **Use blank account**, which connects an empty test account without any setup.

![Screenshot of the Stripe page that connects Fluent Plugins by WPManageNinja, with an email field and an arrow pointing to the Continue button](/images/settings/payment-settings/stripe-setup-connect.webp)

Stripe then returns you to this page. When the connection works, the card reads **Your Stripe Account is Up & Running** and shows your account name with a **Disconnect Stripe** button.

### Step 4: Add the webhook in Stripe

The webhook keeps payments, renewals, cancellations and refunds in sync. Stripe sends each event to your site, and Fluent Members checks it against your signing secret.

1. Under **Stripe Webhook**, click the copy icon beside **Webhook URL**. It looks like this:

    ```
    https://your-site.com/?fluent_members_payment_listener=1&payment_method=stripe
    ```

2. Open your [Stripe Dashboard](https://dashboard.stripe.com/). Make sure it is in the same mode as the one you chose in step 2: a sandbox for test mode, or your live account for live mode.
3. Click **Developers** at the bottom left, then **Webhooks**.

    ![Screenshot of the Stripe Dashboard with the Developers menu open and Webhooks underlined](/images/settings/payment-settings/stripe-setup-developers-webhooks.webp)

4. Click **Add destination**. Stripe's older dashboards call this **Add endpoint**.

    ![Screenshot of the Stripe Webhooks tab with an arrow pointing to the Add destination button](/images/settings/payment-settings/stripe-setup-add-destination.webp)

5. On **Select events**, choose the 10 events listed in the table below, then click **Continue**. The **Selected events** tab shows how many you have chosen.

    ![Screenshot of the Stripe Create an event destination screen on Select events, with 10 events selected and an arrow pointing to Continue](/images/settings/payment-settings/stripe-setup-select-events.webp)

6. Choose **Webhook endpoint** as the destination type, then click **Continue**.

    ![Screenshot of the Stripe Choose destination type screen with Webhook endpoint selected](/images/settings/payment-settings/stripe-setup-destination-type.webp)

7. Enter a **Destination name**, paste the Webhook URL into **Endpoint URL**, and click **Create destination**.

    ![Screenshot of the Stripe Configure destination screen with the destination name and endpoint URL filled in and an arrow pointing to Create destination](/images/settings/payment-settings/stripe-setup-configure-destination.webp)

8. On the destination page, find **Signing secret** and click the eye icon to reveal it. Copy the value that starts with `whsec_`.

    ![Screenshot of the Stripe destination details page with an arrow pointing to the Signing secret](/images/settings/payment-settings/stripe-setup-signing-secret.webp)

Stripe must send these events:

| Event | Used for |
|---|---|
| `payment_intent.succeeded` | A one-time payment succeeded. |
| `payment_intent.payment_failed` | A one-time payment failed. |
| `charge.refunded` | A charge was refunded. |
| `charge.refund.updated` | A refund changed. |
| `invoice.paid` | A subscription payment succeeded. |
| `invoice.payment_failed` | A subscription payment failed. |
| `customer.subscription.updated` | A subscription changed. |
| `customer.subscription.paused` | A subscription was paused. |
| `customer.subscription.resumed` | A subscription was resumed. |
| `customer.subscription.deleted` | A subscription ended. |

> [!Note]
> If an event is missing in Stripe, the matching change will not reach your site. Renewals will not extend memberships, for example. Check this list when something does not sync. Stripe's guide to [webhooks](https://docs.stripe.com/webhooks) explains how events and signing secrets work.

### Step 5: Save the signing secret

1. Go back to **Stripe Settings** in Fluent Members and paste the secret into **Signing Secret**. The eye button shows or hides it.
2. Click **Save Settings** at the top right.

![Screenshot of the Stripe Settings screen with an arrow pointing to the Signing Secret field and another to the Save Settings button](/images/settings/payment-settings/stripe-setup-save-secret.webp)

The line under **Webhook URL** tells you the state for the selected mode:

- **Webhook secret is not configured for the current mode yet.** Paste the signing secret for this mode and save.
- **Webhook secret is configured for the current mode.** The secret is saved. The field then reads "Saved. Paste a new secret to replace it", and leaving it blank keeps the saved secret.

## Going live

When you are ready for real payments:

1. Select **Live Mode**.
2. Click **Connect Live Mode**.
3. Create a webhook destination in your live Stripe account, as in step 4, and save its live signing secret.

Test and live keep separate accounts and secrets, so finishing one does not set up the other.

## Testing on a local site

A local site cannot receive webhooks from Stripe unless you forward them with the [Stripe CLI](https://docs.stripe.com/stripe-cli). You can still try checkout in test mode, but test renewals will not extend memberships there. Live mode needs a public site.

## Set the signing secret in wp-config.php

To keep secrets out of the database, define them in `wp-config.php`. These take priority over the field:

```php
define('FMEM_STRIPE_TEST_WEBHOOK_SECRET', 'whsec_...');
define('FMEM_STRIPE_LIVE_WEBHOOK_SECRET', 'whsec_...');
```

## Disconnect Stripe

Click **Disconnect Stripe** on the account card and confirm with **Yes, Disconnect**.

![Screenshot of the Stripe Settings screen with the Your Stripe Account is Up & Running card and an arrow pointing to the Disconnect Stripe button](/images/settings/payment-settings/stripe-setup-disconnect.webp)

This applies to the selected mode only. It removes that mode's account keys and signing secret. If the other mode has a connected account, Stripe switches to it. Otherwise Stripe payments turn off and the mode goes back to test.

Disconnecting does not cancel any subscription in Stripe. Those subscriptions stop syncing with Fluent Members for that mode, so cancel or move them first.
