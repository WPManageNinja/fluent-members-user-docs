---
title: "Set Up Stripe (Pro)"
description: "Connect your Stripe account, add the webhook, pass the webhook check and turn on Stripe payments."
---

# Set Up Stripe (Pro)

**Stripe** (Pro) takes card payments for [native payment](/docs/levels/pricing-native) plans, both one-time and recurring. To take payments, connect your account and add a webhook, then pass the webhook check. Do this once for test mode and once for live mode.

You need **Fluent Members Pro** and a Stripe account. Without Pro, you can take Stripe payments through [paywalls](/docs/levels/pricing-paywalls) instead.

## Open the settings

Go to **Fluent Members → Settings → Payment Settings** and click **Manage** on the Stripe card.

<!-- TODO(screenshot): stripe-setup-1
  screen: Settings > Payment Settings > Stripe
  state: Stripe Payment Settings toggle on, Test Mode selected, connected account card reading "Your Stripe account is connected. Check the webhook to finish setup."
  data: Connected test account
  highlight: Payment Mode
  view: admin
  alt: Screenshot of Stripe Settings with the toggle, Payment Mode and the connected account card
  reason: needs the develop build on the local site
-->

## Step 1: Turn on Stripe Payment Settings

Turn on **Stripe Payment Settings** to show the setup fields. Until Stripe is ready, the page shows "Payments turn on once Stripe is connected and the webhook check passes." Payments stay off for now.

## Step 2: Choose a Payment Mode

Choose the mode you are setting up:

- **Test Mode** (default): For testing with Stripe's test cards. No real money moves.
- **Live Mode:** For real payments.

Each mode has its own connected account, signing secret and webhook check.

## Step 3: Connect your account

Under **Connect with Stripe**, click **Connect Test Mode** or **Connect Live Mode**. Stripe opens so you can authorize the connection, then returns you to this page.

The card now shows your account and reads "Your Stripe account is connected. Check the webhook to finish setup."

## Step 4: Add the webhook in Stripe

The webhook keeps payments, renewals, cancellations and refunds in sync. Stripe sends each event to your site, and Fluent Members checks it against your signing secret.

1. Under **Stripe Webhook**, click the **Webhook URL** to copy it. It looks like this:

    ```
    https://your-site.com/?fluent_members_payment_listener=1&payment_method=stripe
    ```

2. Under **How to configure?**, click **Add the endpoint in Stripe**. Stripe opens with the events already selected.
3. Paste the URL as the endpoint URL.
4. Check that the events match the **Events to send** list, including `customer.created`, and save the endpoint.
5. Copy the endpoint's signing secret from Stripe. It starts with `whsec_`.

<!-- TODO(screenshot): stripe-setup-2
  screen: Stripe dashboard, the new webhook endpoint
  state: Endpoint details with the signing secret area visible
  data: Blur the account name and secret
  highlight: Signing secret
  view: admin
  alt: Screenshot of a webhook endpoint in the Stripe dashboard with the signing secret area highlighted
  reason: needs a signed-in Stripe account, not reachable locally
-->

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
| `customer.created` | Only for the webhook check. |

## Step 5: Save the signing secret and check the webhook

1. Paste the secret into **Signing Secret**. The eye button shows or hides it.
2. Click **Check webhook**. This saves a secret you just pasted, then creates and deletes a temporary customer in your Stripe account and waits for Stripe to send the signed event to your site.

<!-- TODO(screenshot): stripe-setup-3
  screen: Settings > Payment Settings > Stripe
  state: Stripe Webhook block with Webhook URL, Signing Secret, How to configure?, Events to send and the Webhook status card with the Check webhook button
  data: Test mode, status Not verified
  highlight: Check webhook
  view: admin
  alt: Screenshot of the Stripe Webhook block with the signing secret field and the Check webhook button
  reason: needs the develop build on the local site
-->

**Webhook status** shows the result:

| Status | Meaning |
|---|---|
| **Not verified** | The check has not run for this mode. |
| **Checking** | Waiting for the test event to reach your site. |
| **Verified** | The event arrived, signed correctly. |
| **Failed** | The event did not arrive, or the setup is incomplete. The message says what to fix. |

When the check passes, the card reads "Your Stripe Account is Up & Running". If **Stripe Payment Settings** is off at this point, turn it on, since connecting to Stripe reloads the page. The Payment Settings page then shows **Test Mode** or **Live Mode** with **Webhook verified**.

> [!Note]
> The check proves that the webhook reaches your site, not that every event is selected. Make sure all the events above are selected in Stripe, or renewals will not sync.

## If the check fails

The message under **Webhook status** tells you what happened:

- **"The test event didn't arrive":** Check the endpoint URL, the `customer.created` event and the signing secret.
- **The event reached the site but the signature did not match:** Copy the signing secret from this endpoint in Stripe and save it again.
- **Stripe sent the event but the site did not accept it:** Check that the endpoint URL matches the **Webhook URL**, and that a firewall or security plugin is not blocking Stripe.
- **No webhook endpoint received it:** Add the endpoint with the link on this page, or select `customer.created` on your existing endpoint.
- **"Stripe webhook cannot be checked yet":** The message lists what is missing, a connected account or a signing secret.

If the temporary customer could not be deleted, a message gives its ID so you can remove it in Stripe.

## Going live

When you are ready for real payments:

1. Select **Live Mode**.
2. Repeat steps 3 to 5 with a live endpoint and its live signing secret. Saving a mode that has not passed its check turns Stripe payments off until it does.

Stripe uses one **Webhook URL** for both modes. The signing secret tells them apart, and test events are ignored while the site is in live mode.

> [!Note]
> Changing the connected account or signing secret, or moving the site to another address, cancels a passed check. Stripe payments cannot run on a public site until you click **Check webhook** again.

## Testing on a local site

A local site cannot receive webhooks from Stripe without the Stripe CLI. In test mode, Stripe can still be turned on without passing the check, so you can try checkout, but test renewals will not extend memberships there. Live mode needs a public site.

## Set the signing secret in wp-config.php

To keep secrets out of the database, define them in `wp-config.php`. These take priority over the field:

```php
define('FMEM_STRIPE_TEST_WEBHOOK_SECRET', 'whsec_...');
define('FMEM_STRIPE_LIVE_WEBHOOK_SECRET', 'whsec_...');
```

## Disconnect Stripe

Click **Disconnect Stripe** on the account card and confirm with **Yes, Disconnect**. This applies to the selected mode only. It removes that mode's account keys and signing secret, and clears its webhook check. If the other mode has a connected account, Stripe switches to it. Otherwise Stripe payments turn off.

Disconnecting does not cancel any subscription in Stripe. Those subscriptions stop syncing with Fluent Members for that mode, so cancel or move them first.
