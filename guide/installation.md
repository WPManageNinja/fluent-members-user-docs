# Installing Fluent Members

Get the plugin installed and activated on your WordPress site in about 3 minutes.

**Here's what you'll learn:**
- Three ways to install Fluent Members
- How to activate it after installation
- What happens the first time you activate (so nothing surprises you)
- How to confirm everything is working

**Before we start:** you'll need administrator access to your WordPress site. If you can reach **WordPress Dashboard → Plugins**, you're good to go.

## Three ways to install

### Method 1 — Install from the WordPress plugin directory (easiest)

This is the fastest way. No file downloading needed.

This method works because Fluent Members is listed in the official WordPress.org plugin directory, so WordPress can find and install it in one click.

1. Log into your WordPress dashboard and go to **Plugins → Add New Plugin**.
   *You'll see the plugin search screen — WordPress's built-in plugin marketplace.*
2. In the search box at the top right, type **Fluent Members**.
   *Results appear as you type. Look for the plugin card that says "Fluent Members" with the WPManageNinja author.*
3. Click **Install Now** on the Fluent Members card.
   *WordPress downloads the plugin in the background. The button will change to "Activate" when it's ready.*
4. Click **Activate**.
   *The plugin activates and sets up its database tables automatically. You'll see a new "Fluent Members" menu appear in your sidebar.*

![Install from WordPress plugin directory](/images/installation/install-from-directory.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Plugins → Add New → search "Fluent Members"
State: Plugin card visible with "Install Now" button highlighted
Highlight: The "Install Now" button with red arrow
Size: 1440 × 900 viewport
-->

::: tip Small win
See **Fluent Members** in your sidebar? You've nailed it. That's the plugin ready to use.
:::

### Method 2 — Upload a ZIP file manually

Use this method if you downloaded the ZIP file from WordPress.org (or received it directly).

This approach is handy if your server has limited outbound internet access, or if you want to install a specific version.

1. Download the `fluent-members.zip` file to your computer.
2. In your WordPress dashboard, go to **Plugins → Add New Plugin**.
3. Click **Upload Plugin** at the top of the page.
   *A file upload area will appear.*
4. Click **Choose File**, select the `fluent-members.zip` file you downloaded, then click **Install Now**.
   *WordPress unpacks the ZIP and installs the plugin. You'll see a progress screen.*
5. Click **Activate Plugin** on the success screen.
   *The plugin is now active.*

![Upload plugin ZIP](/images/installation/upload-plugin-zip.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Plugins → Add New → Upload Plugin area
State: File picker visible with zip selected
Highlight: "Upload Plugin" button and file field
Size: 1440 × 900 viewport
-->

### Method 3 — Manual upload via FTP

Use this method if you prefer direct server access, or if the other methods aren't available for some reason.

This is the most hands-on approach. You'll need an FTP client (like [FileZilla](https://filezilla-project.org/)) and your server credentials.

1. Download and unzip the `fluent-members.zip` file on your computer.
   *You'll get a folder called `fluent-members`.*
2. Connect to your server via FTP.
3. Navigate to `/wp-content/plugins/` on the server.
4. Upload the entire `fluent-members` folder into the `plugins` directory.
5. Go back to your WordPress dashboard → **Plugins → Installed Plugins**.
6. Find **Fluent Members** in the list and click **Activate**.

::: info FTP path note
The full path on most servers is something like `/var/www/html/wp-content/plugins/` — check with your hosting provider if you're unsure.
:::

## What happens when you activate

You don't need to do anything special during activation — Fluent Members handles setup automatically.

Here's what happens behind the scenes:
- Six new database tables are created in your WordPress database (prefixed with `fmem_`). These store your access groups, membership levels, pricing, members, and settings.
- A **Fluent Members** menu item appears in your WordPress sidebar, with sub-items for Dashboard, Levels, Access Groups, Members, and Settings.

Nothing on your existing site changes. Your posts, pages, and theme are untouched.

![Fluent Members in the WordPress sidebar](/images/installation/sidebar-menu.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin dashboard after activation
State: Sidebar with Fluent Members menu expanded, showing all sub-items
Highlight: The Fluent Members menu group with red box
Size: 1440 × 900 viewport, cropped to sidebar only
-->

## Confirming it works

Let's make sure everything is set up correctly before you start configuring.

1. Click **Fluent Members** in your sidebar.
   *You should land on the Fluent Members Dashboard. On a fresh install, it'll be mostly empty — that's expected.*
2. Check that the menu has these five items: **Dashboard**, **Levels**, **Access Groups**, **Members**, and **Settings**.
3. Click **Settings** and confirm the Settings screen loads without any errors.

If you see those screens, you're fully installed and ready.

::: warning Plugin conflict check
Some caching plugins and security plugins can interfere with Fluent Members' admin interface. If the dashboard looks broken (blank panels, missing menus), try temporarily disabling your caching plugin, clear your browser cache, and reload. If problems persist, see [Troubleshooting](../reference/troubleshooting.md).
:::

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| "Fluent Members" menu doesn't appear after activating | You may not have the Administrator role | Log in with an Administrator account — only admins see the plugin menu |
| The Dashboard loads but charts are empty | That's normal on a fresh install — no data yet | Start by [creating your first Membership Level](./core-concepts/membership-levels.md) |
| White screen or fatal error after activation | PHP version conflict | Confirm your server is running PHP 7.4 or higher in **Tools → Site Health** |
| Plugin won't install: "destination folder already exists" | A partial install is stuck | Delete the `fluent-members` folder in `/wp-content/plugins/` and try again |

Still stuck? Jump to [Troubleshooting](../reference/troubleshooting.md) for a more detailed checklist.

## What's next?

You've got Fluent Members installed. Nice work.

The fastest way to understand how everything fits together is the **[Quick Start guide](./quick-start.md)** — it walks you through building a real membership site from scratch in about 10 minutes, using our example persona Sara the yoga coach.
