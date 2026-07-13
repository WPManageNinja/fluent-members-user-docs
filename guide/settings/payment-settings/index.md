# Payment Settings

The **Payment Settings** page lets you manage the payment gateways used for [Native Payment](/guide/levels/pricing-native) in Fluent Members. Here, you can view the available gateways, check their connection status, and open their settings for configuration.

> [!Note]
> These settings apply only to Native Payments. If you're using payment integrations such as FluentCart, Fluent Forms, or Paymattic, you don't need to configure anything on this page.

## Access Payment Settings

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Payment Settings** from the left-hand menu.

![Payment Settings page](/images/settings/payment/payment-settings/payment-settings-1.webp)

## Available Gateways

The Payment Settings page shows one card for each supported native gateway. Currently two gateways are available; both require **Fluent Members Pro**:

| Gateway | Notes |
|---|---|
| **Stripe** | Credit/debit cards via Payment Intents and Setup Intents. Supports one-time and recurring subscriptions. |
| **PayPal** | PayPal checkout via REST PPCP. Supports one-time and recurring subscriptions. Added in v1.1.0. |

Each gateway card includes:

* **Gateway Name:** Displays the name and logo of the payment gateway.
* **Status:** Shows an **Active** badge when the gateway is enabled and configured correctly.
* **Description:** Provides a brief overview of the gateway.
* **Manage:** Opens the gateway settings for configuration.

## Active vs Inactive

A gateway shows the **Active** badge when:

- Its master toggle is switched on
- Valid API credentials are saved for the current mode (Test or Live)
- The plugin can reach the gateway without an API error

If any of these conditions is not met, the badge disappears and the gateway will not appear as a payment option in Native Payment pricing plans.

## Stripe (Pro)

Click **Manage** on the Stripe card to open [Stripe Setup](/guide/settings/payment-settings/stripe-setup), where you configure your API keys, select Test or Live mode, and register the webhook endpoint.

## PayPal (Pro)

Click **Manage** on the PayPal card to open [PayPal Setup](/guide/settings/payment-settings/paypal-setup), where you enter your Client ID and Client Secret, select Sandbox or Live mode, and register the webhook with one click.

::: warning Pro feature
Payment Settings and all native checkout gateways (Stripe and PayPal) require **Fluent Members Pro**. If the Payment Settings menu item is missing or the page is empty, confirm that the Pro add-on is installed and activated.
:::
