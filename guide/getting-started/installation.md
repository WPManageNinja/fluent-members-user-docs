# Installation

Install and activate Fluent Members on your WordPress site in a few minutes. You need administrator access to your WordPress dashboard to follow these steps.

## Install from the WordPress Directory

This is the easiest method. WordPress finds and downloads the plugin for you automatically.

1. Go to **Plugins → Add New Plugin** in your WordPress dashboard.
2. Search for **Fluent Members** in the search box at the top right.
3. Click **Install Now** on the Fluent Members card by WPManageNinja.
4. Click **Activate** once the installation finishes.

A **Fluent Members** menu item will appear in your sidebar. That means the plugin is installed and ready.

![Fluent Members sidebar menu](/images/installation/sidebar-menu.png)

## Install by Uploading a ZIP File

Use this method if you downloaded the plugin ZIP from WordPress.org, or if your server does not have outbound internet access.

1. Download `fluent-members.zip` to your computer.
2. Go to **Plugins → Add New Plugin** in your WordPress dashboard.
3. Click **Upload Plugin** at the top of the page.
4. Click **Choose File**, select the ZIP file, then click **Install Now**.
5. Click **Activate Plugin** on the confirmation screen.

![Upload plugin ZIP file](/images/installation/upload-plugin-zip.png)

## Install via FTP

Use this method if you prefer direct server access or if the other methods are not available.

1. Download and unzip `fluent-members.zip` on your computer. You will get a folder called `fluent-members`.
2. Connect to your server using an FTP client such as FileZilla.
3. Navigate to `/wp-content/plugins/` on your server.
4. Upload the entire `fluent-members` folder into that directory.
5. Go to **Plugins → Installed Plugins** in your WordPress dashboard.
6. Find **Fluent Members** in the list and click **Activate**.

::: tip FTP path
On most servers the full path is `/var/www/html/wp-content/plugins/`. Check with your hosting provider if you are unsure.
:::

## What Happens on Activation

Fluent Members sets up everything automatically when you activate it. You do not need to run any setup scripts.

Behind the scenes, the plugin creates six database tables (prefixed with `fmem_`) to store your membership levels, access groups, members, and settings. Your existing posts, pages, and theme are not affected.

## Confirm the Installation

Before you start configuring, take 30 seconds to verify everything loaded correctly.

1. Click **Fluent Members** in your sidebar. You should land on the Dashboard screen. On a fresh install it will be mostly empty, which is expected.
2. Check that the sidebar shows these five items: **Dashboard**, **Levels**, **Access Groups**, **Members**, and **Settings**.
3. Click **Settings** and confirm the screen loads without errors.

If you see those screens, the installation is complete.

## Installing Fluent Members Pro

The Pro add-on installs the same way as the ZIP method above. Use the ZIP file from your licence portal. Activating Pro adds a **Transactions** item to the sidebar and unlocks native Stripe checkout, subscriptions, corporate memberships, and the block email editor.

::: warning Plugin conflicts
If the Fluent Members admin screen looks broken after activation (blank panels or missing menus), temporarily disable your caching or security plugin, clear your browser cache, and reload. If problems continue, see [Troubleshooting](/reference/troubleshooting).
:::


