# Payment Settings

The **Payment Settings** page lets you manage the payment gateways used for [Native Payment](/guide/levels/pricing-native) in Fluent Members. Here, you can view the available gateways, check their connection status, and open their settings for configuration.

> [!Note]
> These settings apply only to Native Payments. If you're using payment integrations such as FluentCart, Fluent Forms, or Paymattic, you don't need to configure anything on this page.

## Access Payment Settings

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Payment Settings** from the left-hand menu.

![Payment Settings page](/images/settings/payment/payment-settings/payment-settings-1.webp)

## Available Gateways

Here displays all the payment gateways supported by Fluent Members. Currently, Stripe (Pro) is the only available gateway.

Each gateway card includes the following information:

* **Gateway Name:** Displays the name and logo of the payment gateway.
* **Status:** Shows an Active badge when the gateway is enabled and configured correctly.
* **Description:** Provides a brief overview of the gateway.
* **Manage:** Opens the gateway settings, where you can configure and manage the payment gateway.

## Active vs Inactive

A gateway shows the **Active** badge when:

- Its master toggle is switched on
- Valid API credentials are saved for the current mode (Test or Live)
- The plugin can reach the gateway without an API error

If any of these conditions is not met, the badge disappears and the gateway will not appear as a payment option in Native Payment pricing plans.

## Stripe (Pro)

Click **Manage** on the Stripe card to open [Stripe Setup](/guide/settings/payment-settings/stripe-setup), where you configure your API keys, select Test or Live mode, and register the webhook endpoint.

::: warning Pro feature
Payment Settings and Stripe native checkout require **Fluent Members Pro**. If the Payment Settings menu item is missing or the page is empty, confirm that the Pro add-on is installed and activated.
:::
