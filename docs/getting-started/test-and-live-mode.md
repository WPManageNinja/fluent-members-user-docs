---
title: "Test Mode and Live Mode"
description: "Switch Stripe and PayPal between test and live payments for the whole site, and see which mode you are in."
---

# Test Mode and Live Mode

**Site Mode** (Pro) decides whether the built-in Stripe and PayPal checkout take real money or test payments. It is one switch for the whole site. Keep it on **Test** while you set up and try a purchase, then switch to **Live** when you are ready to sell.

> [!Note]
> Site Mode only controls payments taken through Fluent Members (Pro). If you sell through FluentCart, WooCommerce, Fluent Forms or Paymattic, test and live mode is set in that plugin.

## Switch the mode

Fluent Members starts in **Test** mode until you change it.

1. Go to **Fluent Members → Settings → General Settings**.
2. Under **Site Mode**, choose **Live** or **Test**.
3. Click **Save Settings**. The page reloads in the new mode.

The **Site Mode** row only shows when Fluent Members Pro is active.

![Screenshot of General Settings with the Site Mode row set to Test](/images/getting-started/test-and-live-mode/site-mode-test.webp)

## What the mode changes

- **Stripe:** payments use the credentials for the current mode. Its settings screen has **Live credentials** and **Test credentials** tabs, and a status line that reads **Payments are in test mode.** or **Payments are in live mode.**
- **PayPal:** **Test** uses PayPal Sandbox. The checkout notice reads **Sandbox Mode**.
- **Checkout:** while a gateway is in test mode, administrators see a notice on the checkout page, such as "Stripe is in test mode, so no real payment will be taken." Other visitors do not see it.
- **Records:** the **Subscriptions** list shows test and live subscriptions together, and marks test ones with a **Test** badge. The Dashboard counts payments from both modes.

Each mode needs its own connection. Connect the gateway and pass its webhook check for the mode you plan to use before payments turn on. See [Set up Stripe](/docs/settings/payment-settings/stripe-setup) and [Set up PayPal](/docs/settings/payment-settings/paypal-setup).

## See which mode you are in

Two places tell you, so you do not take a test payment by mistake or miss the switch to live.

### The admin bar badge

With Pro active, administrators see a badge in the WordPress admin bar, on your site and in the admin. It reads **Test Mode** in orange or **Live Mode** in green. In test mode, hovering it shows "Payments are in test mode for Stripe and PayPal. No real money is charged." Open it for shortcuts to **Dashboard**, **Members**, **Site Mode** and **Payment Settings**.

![Screenshot of the admin bar with the Test Mode badge and its menu open](/images/getting-started/test-and-live-mode/admin-bar-test-mode.webp)

### The Payment Settings alert

When Stripe or PayPal is turned on and the site is in test mode, **Fluent Members → Settings → Payment Settings** opens with a **Test Mode Enabled** alert: "No real payments will be processed." Click **Switch to Live** to jump to **General Settings**. On a local site it adds that subscription renewals won't sync, because Stripe and PayPal cannot send webhooks to a local address.

![Screenshot of Payment Settings with the Test Mode Enabled alert](/images/getting-started/test-and-live-mode/payment-test-alert.webp)

## Test a purchase, then go live

1. Leave **Site Mode** on **Test** and connect Stripe or PayPal in test or sandbox mode.
2. Buy a plan yourself from your [pricing page](/docs/selling/pricing-page) and check the membership, the emails and the portal.
3. Return to **General Settings**, choose **Live** and click **Save Settings**.
4. Connect the live credentials and run the webhook check if you have not yet.

The Dashboard **Launch checklist** has a matching item. It reads **Switch payments to live mode** while the site is in test mode, with a **Go live** link. See [Guided setup and quick start](/docs/getting-started/quick-start).
