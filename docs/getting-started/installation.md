---
title: "Install and Activate Fluent Members"
description: "Install the free Fluent Members plugin from a ZIP file or over FTP, then activate it."
---

# Install and Activate Fluent Members

**Fluent Members** is a free WordPress plugin. Install it from its ZIP file in a few minutes. You need an administrator account on a site running WordPress 6.3 or newer and PHP 7.4 or newer.

## Install from a ZIP file

This is the easiest way.

1. Go to **Plugins → Add Plugin** in your WordPress dashboard and click **Upload Plugin**.
2. Click **Choose File** and select the ZIP file.
3. Click **Install Now**.

    ![Screenshot of the WordPress Add Plugins screen with the upload form and the Install Now button](/images/getting-started/installation/upload-plugin.webp)

4. Click **Activate Plugin**.

## Install over FTP

Use this when uploading from the dashboard fails.

1. Unzip the plugin's ZIP file on your computer.
2. Connect to your server with an FTP client and open `/wp-content/plugins/`.
3. Upload the extracted folder there.
4. Go to **Plugins → Installed Plugins** and click **Activate** under **Fluent Members**.

## Open the plugin

Activating adds a **FluentMembers** item to your WordPress sidebar, with **Dashboard**, **Levels**, **Members** and **Settings** under it, and creates the plugin's own database tables (their names start with `fmem_`). Your posts, pages and theme are not changed.

On a new install, the first click on **FluentMembers** opens the [guided setup](/docs/getting-started/quick-start) instead of the dashboard. It can install FluentCart for you, so you do not need a payment plugin first. On a site that already has the plugin's tables, the guided setup does not appear. To add Stripe, PayPal or team memberships, see [Activate Pro](/docs/getting-started/installation-pro).
