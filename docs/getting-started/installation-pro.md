---
title: "Install and Activate Fluent Members Pro"
description: "Add the Fluent Members Pro plugin to your site for built-in Stripe and PayPal checkout, billing, corporate memberships and the block email editor."
---

# Install and Activate Fluent Members Pro

**Fluent Members Pro** (Pro) is a separate plugin that adds built-in Stripe and PayPal checkout, billing screens, corporate memberships, WooCommerce and the block email editor. See [Free vs Pro](/docs/getting-started/free-vs-pro) for the full list.

Before you start, you need:

- The free **Fluent Members** plugin [installed and active](/docs/getting-started/installation). Pro only runs on top of it, so keep both active.
- The **Fluent Members Pro** ZIP file.
- WordPress 6.5 or newer and PHP 7.4 or newer.

## Install Pro

1. Go to **Plugins → Add Plugin** and click **Upload Plugin**.
2. Click **Choose File** and select the **Fluent Members Pro** ZIP file.
3. Click **Install Now**.
4. Click **Activate Plugin**.

## Check that Pro is active

Inside the plugin you get:

- A **Pro** tag beside the logo in the top bar.
- **Billing** in the top bar, with **Subscriptions** and **One-time**, and a **Billing** item under **FluentMembers** in the WordPress sidebar.
- **Team** (corporate memberships with seats) available when you add a level, without the Pro badge.
- **Native Payment** (the built-in Stripe and PayPal checkout) and **WooCommerce** as pricing types, without the Pro badge.
- A **Site Mode** switch under **Settings → General Settings**, and a **Test Mode** or **Live Mode** badge in the admin bar. See [Test mode and live mode](/docs/getting-started/test-and-live-mode).

<!-- TODO(screenshot): installation-pro-1
  screen: Fluent Members top bar
  state: Pro active
  data: -
  highlight: the Pro tag beside the logo and the Billing menu
  view: admin
  alt: Screenshot of the Fluent Members top bar with the Pro tag and the Billing menu
-->

## What to do next

Stripe and PayPal do nothing until you connect them. Follow [Set up Stripe](/docs/settings/payment-settings/stripe-setup) or [Set up PayPal](/docs/settings/payment-settings/paypal-setup), and keep **Site Mode** on **Test** until you are ready to sell. If you have not run the [guided setup](/docs/getting-started/quick-start) yet, run it first so it offers **Built-in checkout**.
