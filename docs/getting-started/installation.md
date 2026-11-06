---
title: "Install and Activate Fluent Members"
description: "Install the free Fluent Members plugin from your WordPress dashboard, a ZIP file or FTP, then activate it."
---

# Install and Activate Fluent Members

**Fluent Members** is a free WordPress plugin. Install it from your WordPress dashboard in a few minutes. You need an administrator account on a site running WordPress 6.3 or newer and PHP 7.4 or newer.

## Install from the WordPress dashboard

This is the easiest way. WordPress downloads the plugin for you.

1. Go to **Plugins → Add Plugin** in your WordPress dashboard (**Add New** on older versions of WordPress).
2. Search for **Fluent Members**.
3. Click **Install Now** on the **Fluent Members** card.
4. Click **Activate**.

## Install from a ZIP file

Use this when you already have the plugin's ZIP file.

1. Go to **Plugins → Add Plugin** and click **Upload Plugin**.
2. Click **Choose File** and select the ZIP file.
3. Click **Install Now**.

    ![Screenshot of the WordPress Add Plugins screen with the upload form and the Install Now button](/images/getting-started/installation/installation-upload-plugin.webp)

4. Click **Activate Plugin**.

## Install over FTP

Use this when uploading from the dashboard fails.

1. Unzip the plugin's ZIP file on your computer.
2. Connect to your server with an FTP client and open `/wp-content/plugins/`.
3. Upload the extracted folder there.
4. Go to **Plugins → Installed Plugins** and click **Activate** under **Fluent Members**.

## Open the plugin

Activating adds a **FluentMembers** item to your WordPress sidebar, and creates the plugin's own database tables (their names start with `fmem_`). Your posts, pages and theme are not changed.

On a new install, the first click on **FluentMembers** opens the guided setup instead of the dashboard. On a site that has run the plugin before, the guided setup does not appear.

Before you run it on the free plugin, install FluentCart, Fluent Forms or Paymattic, because a level needs one of them to take payment. Continue with [Guided setup & quick start](/docs/getting-started/quick-start). To add Stripe, PayPal or team memberships first, see [Activate Pro](/docs/getting-started/installation-pro).
