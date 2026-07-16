# Membership Levels Overview

A **Membership Level** is the core product or subscription plan you offer on your site, such as a *Free Tier*, *Pro Plan*, or *VIP Access*. Every user who joins your site will be assigned to at least one level, which determines what restricted content they can see and how much they pay.

## Access Membership Levels

Log in to your WordPress admin, click **Fluent Members** in the left sidebar, then click **Membership Levels** in the plugin's own top navigation. This opens the Membership Levels list where you can view, create, and manage every plan on your site.

## Understanding the Levels Dashboard

On the Levels screen, you will see a list of all your created levels with the following details:

- **ID:** The unique numeric ID for the level (e.g. `#10`). You will need this for shortcodes.
- **Title:** The name of your membership plan.
- **Description:** A short internal note explaining what the level offers.
- **Type:** Displays whether the plan is **Individual** (one person per membership) or **Corporate** (one parent account with team seats, available in Pro).
- **Access Group:** Shows the total number of restriction rules or [Access Groups](/guide/access-groups/) attached to this level.
- **Status:** Indicates if the level is currently **Active** (available for users) or **Inactive**.
- **Shortcode:** Provides a ready-to-use shortcode (e.g. `[fluent_membership_level id="1"]`) with a quick copy button to display the pricing card on your pages.

You can also use the **All**, **Active**, and **Inactive** tabs at the top to filter your view, or use the search icon to find a specific level by its title. To create a new plan, click **+ Create Membership Level** at the top right.

![The Membership Levels list, showing the ID, Title, Description, Type, Access Group, Status, and Shortcode columns](/images/levels/membership-levels-overview/access-levels-1.webp)

## Level Configuration Tabs

Click a level's title to open its configuration screen directly, or click the three-dot menu at the end of its row for a small **Edit** / **Delete** menu.

![The three-dot row menu open on a level, showing Edit and Delete](/images/levels/membership-levels-overview/edit-levels-2.webp)

Choosing **Edit** opens the level's configuration screen, with a **Cancel** / **Save** bar (and an **Unsaved Changes** indicator once you start editing) at the top, plus a **More Actions** dropdown for anything not covered by the tabs below it. This area is divided into four main tabs:

1. **Edit Level:** Change the title, description, and status under **Level Information**. For Corporate levels, you'll also see a **Maximum Member** field here, leave it empty for unlimited corporate seats.
2. **Pricing:** Set up how you want to sell this level. You must add at least one Pricing Plan (like a one-time fee or subscription) for users to join.
3. **Access Group:** Select which protected folders or content rules this level unlocks.
4. **Members:** View a complete list of all WordPress users who currently hold this specific membership level.

![The Edit Level tab, showing the Title, Description, Maximum Member, and Status fields, with Cancel, Save, and More Actions controls above](/images/levels/membership-levels-overview/edit-levels-3.webp)

### Recommended Setup Order

If you are building your first membership site, follow this exact order to avoid getting stuck:

1. **Create the Level:** Give it a title and choose the type (Individual or Corporate). The type cannot be changed after creation.
2. **Add a Pricing Plan:** Without a pricing plan, visitors cannot purchase or sign up for the level.
3. **Attach Access Groups:** Connect your level to the content you want to protect.
4. **Publish the Shortcode:** Copy the shortcode from the main list and paste it onto your pricing page so visitors can see it.

### Important Notes

::: warning Before you go live
 * **Attach an Access Group:** A membership level without an **Access Group** will not unlock any protected content.

 * **Check the Level Status:** Make sure the membership level is **Active** and has at least one **Pricing Plan** if the shortcode is not displaying.
:::


The Levels screen is the control center for your membership products. By understanding how to organize, price, and attach access rules to your levels, you can easily build out a secure and profitable membership site. For a guided walkthrough, see the [Quick Start](/guide/getting-started/quick-start) guide.
