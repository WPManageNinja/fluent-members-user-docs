# Membership Levels 

A **Membership Level** is the core plan you offer on your membership site: free, a recurring subscription, or a one-time purchase. Every member who joins your site is assigned to at least one level, and that level decides what protected content they can see and what they pay for it.

You can create as many levels as your site needs, for example:

- Free Membership
- Pro Membership
- Premium Membership
- VIP Access
- Agency Membership *(Corporate, Pro)*

## Access Membership Levels

Log in to your WordPress admin, click **Fluent Members** in the left sidebar, then click **Membership Levels** in the plugin's own top navigation. This opens the Membership Levels list, the main screen for viewing, creating, and managing every plan on your site.

## Understanding the Levels Dashboard

The Levels screen lists every level you've created, with these columns:

- **ID:** The unique numeric ID for the level (e.g. `#10`). You'll need this when writing a membership shortcode by hand.
- **Title:** The plan name members see on pricing pages and in their portal, e.g. `Free Plan`, `Pro Plan`, `Premium Plan`. Keep it short and clear so visitors instantly understand what they're buying.
- **Description:** A short internal note about what the level includes, not shown to visitors.
- **Type:** Whether the plan is **Individual** (one person per membership, the standard option) or **Corporate** *(Pro)*, where one parent account manages multiple team seats, for example a company buying one Agency plan and inviting several employees.
- **Access Group:** The number of [Access Groups](/guide/access-groups/) attached to this level, the rules that decide which protected content, courses, downloads, or members-only pages a holder can reach.
- **Status:** **Active** (available for new sign-ups) or **Inactive** (hidden from pricing shortcodes). Set a level to Active before you expect visitors to join it.
- **Shortcode:** A ready-to-use tag, e.g. `[fluent_membership_level id="1"]`, with a quick copy button. Drop it on any page or post to display that level's pricing card, most commonly on a dedicated pricing page where visitors compare plans.

Use the **All**, **Active**, and **Inactive** tabs at the top to filter the list, or the search icon to find a level by title. To start a new plan, click **+ Create Membership Level** at the top right.

![The Membership Levels list, showing the ID, Title, Description, Type, Access Group, Status, and Shortcode columns](/images/levels/membership-levels-overview/access-levels-1.webp)

## Open and Manage a Level

There are two ways to open a level:

- **Click its title** to go straight to the level's configuration screen.
- **Click the three-dot menu** at the end of its row for a small **Edit** / **Delete** menu.

![The three-dot row menu open on a level, showing Edit and Delete](/images/levels/membership-levels-overview/edit-levels-2.webp)

> [!Note]
> Deleting a level cannot be undone. Confirm it's no longer attached to an active pricing page before removing it.

## Level Configuration Tabs

Opening a level (via its title, or **Edit** from the row menu) lands you on its configuration screen: a **Cancel** / **Save** bar sits at the top (with an **Unsaved Changes** indicator once you start editing), alongside a **More Actions** dropdown for anything not covered by the four tabs below.

![The Edit Level tab, showing the Title, Description, Maximum Member, and Status fields, with Cancel, Save, and More Actions controls above](/images/levels/membership-levels-overview/edit-levels-3.webp)

### 1. Edit Level

Update the **Level Information**:

- **Title:** Rename the level anytime, for example changing `Basic Plan` to `Pro Membership`.
- **Description:** A short internal summary, for example *"Get access to premium tutorials, downloads, and members-only resources."*
- **Status:** **Active** or **Inactive**. Flip it to Active once you're ready to sell the plan.

For **Corporate** levels *(Pro)*, this tab also shows **Maximum Member**, the total number of seats (parent plus invited teammates). Set it to `10` to cap the team at ten seats, or leave it empty for unlimited seats.

> [!Note]
> A level's type (Individual or Corporate) is locked in at creation and cannot be changed afterward. If you picked the wrong type, delete the level and create it again.

### 2. Pricing

Add at least one **Pricing Plan** so people can actually purchase or join the level, one-time payment, recurring subscription, or multiple billing periods side by side. For example, you could offer a `$49` one-time plan, a `$9/month` subscription, and a `$90/year` subscription on the same level.

::: warning No pricing plan, no purchases
A level with no Pricing Plan can still be created and saved, but visitors have no way to buy or join it through the pricing interface.
:::

### 3. Access Group

Attach the [Access Groups](/guide/access-groups/) that this level should unlock, this is what actually protects your content. For example: **Pro Membership** → **Pro Content Access Group** → **Premium Articles**. Anyone who joins Pro Membership automatically gains access to everything the Pro Content Access Group protects.

::: warning No Access Group, no content unlocked
A level with no Access Group attached can still be sold, but members won't unlock any protected content after joining.
:::

### 4. Members

Shows every WordPress user currently holding this specific level, handy for a quick headcount or for confirming a particular member's plan without leaving this screen.

## Recommended Setup Order

Building your first membership site? Set things up in this order to avoid getting stuck:

1. **Create the Level:** Pick a clear title and the type, Individual or Corporate. Remember, the type can't change later.
2. **Add a Pricing Plan:** Without one, visitors can't purchase or sign up.
3. **Attach Access Groups:** Connect the level to whatever content it should protect.
4. **Publish the Shortcode:** Copy it from the Levels list and paste it onto your pricing page.

## Check Your Membership Before Going Live

Before sending traffic to your pricing page, confirm:

- **Status is Active.** An inactive level won't appear for new sign-ups.
- **At least one Pricing Plan exists**, if you're charging for the level.
- **The right Access Groups are attached**, matching exactly the content you want members to unlock.
- **You've tested the full flow** with a real or throwaway account: the pricing card displays correctly, the price is right, sign-up or checkout completes, the membership gets assigned, protected content unlocks, and anything that should stay restricted still is.

## Common Setup Issues

**Pricing card isn't showing?** Check that the level is **Active**, has at least one Pricing Plan, and that the shortcode uses the correct level ID and sits on a page that renders shortcodes properly.

**Member joined but can't see protected content?** Open the **Access Group** tab on their level and confirm the group protecting that content is actually attached.

**Wrong people can see content?** Check which level the Access Group is attached to, then check the individual user's assigned level under the **Members** tab, this usually pins down whether it's an access-rule problem or a membership-assignment problem.

## Summary

**Create Level → Add Pricing → Connect Access Groups → Publish Shortcode → Test**

Once a level is Active, has a Pricing Plan, and is connected to the right Access Groups, members can join it and immediately get the access you intended. For a full guided walkthrough, see the [Quick Start](/guide/getting-started/quick-start) guide.
