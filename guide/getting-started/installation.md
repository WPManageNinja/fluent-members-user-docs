# Installing Fluent Members (Free Version)

Install and activate **Fluent Members** on your WordPress site in just a few minutes. You need administrator access to your WordPress dashboard to follow these steps.

## Install from the WordPress Directory (Recommended)

This is the easiest method. WordPress finds and downloads the plugin for you automatically.

1. Go to **Plugins → Add New Plugin** in your WordPress dashboard.
2. Search for **Fluent Members** in the search box at the top right.
3. Find the **Fluent Members** card by WPManageNinja and click **Install Now**.
4. Click **Activate** once the installation finishes.

A **Fluent Members** menu item will appear in your sidebar, meaning the plugin is ready to use.

![Fluent Members sidebar menu](/images/getting-started/installation-free/sidebar-menu-1.webp)

## Install by Uploading a ZIP File

Use this method if you downloaded the plugin ZIP from WordPress.org, or if your server does not have outbound internet access.

1. Download the `fluent-members.zip` file to your computer.
2. Go to **Plugins → Add New Plugin** in your WordPress dashboard.

![Add New Plugin](/images/getting-started/installation-free/add--plugin-2.webp)

3. Click **Upload Plugin** at the top of the page.
4. Click **Choose File**, select the ZIP file, then click **Install Now**.
5. Click **Activate Plugin** on the confirmation screen.

![Upload plugin ZIP file](/images/getting-started/installation-free/upload-plugin-3.webp)

## Install via FTP

Use this method if you prefer direct server access or if the WordPress dashboard upload fails.

1. Download and unzip the `fluent-members.zip` file on your computer. You will get a folder called `fluent-members`.
2. Connect to your server using an FTP client (such as FileZilla).
3. Navigate to the `/wp-content/plugins/` directory on your server.
4. Upload the entire `fluent-members` folder into that directory.
5. Go to **Plugins → Installed Plugins** in your WordPress dashboard.
6. Find **Fluent Members** in the list and click **Activate**.

## Confirm the Installation

**Fluent Members** sets up everything automatically upon activation. To verify it works:

1. Click **Fluent Members** in your WordPress sidebar to view the [Dashboard](/guide/dashboard/dashboard).
2. Check that the sidebar shows these core items: **Dashboard**, **Levels**, **Access Groups**, **Members**, and **Settings**.
3. Click **Settings** and confirm the screen loads without any errors.

## Important Notes

::: warning Before you troubleshoot
- **Database setup:** Upon activation, the plugin automatically creates six database tables (prefixed with `fmem_`) to store your membership data. Your existing posts, pages, and theme are not affected.
- **Plugin conflicts:** If the Fluent Members admin screen looks broken after activation (blank panels or missing menus), temporarily disable your caching or security plugin, clear your browser cache, and reload the page. If problems continue, see [Troubleshooting](/reference/troubleshooting).
:::

Once installed and verified, you are ready to start creating membership levels and protecting your WordPress content. Continue with the [Quick Start](/guide/getting-started/quick-start) guide to build your first site in about 10 minutes.

To unlock Stripe checkout, subscriptions, and other premium features, see [Install & Activate Fluent Members Pro](/guide/getting-started/installation-pro).
