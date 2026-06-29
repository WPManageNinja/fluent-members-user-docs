# Creating a Level

A **Membership Level** is the plan you sell or offer on your site. This guide walks you through creating one from the **Add Membership Level** modal and completing the **Edit Level** tab.

## Access the Add Level Screen

Log in to your WordPress admin, click **Fluent Members → Levels**, then click **+ Add New Level** in the top right. The **Add Membership Level** modal opens.

![Add New Level](/images/levels/creating/add-new-level.webp)

## Step 1: Name the Level and Choose a Type

Fill in the modal fields:

- **Title:** The name members will see on pricing pages and in their portal (for example, `Pro Plan` or `VIP Access`). This field is required.
- **Type:** Choose how this membership works:
  - **Individual:** A single-user membership plan. One person buys and gets their own access.
  - **Corporate:** A group membership for organizations. One parent account buys seats and invites team members (Pro).

Click **Create**. The modal closes and you land on the level's edit screen.

> [!Note]
> You cannot switch a level from Individual to Corporate (or the other way around) after creation. If you picked the wrong type, delete the level and create it again.


![Add Membership Level modal](/images/levels/creating/add-membership-level-modal.webp)

## Step 2: Complete the Edit Level Tab

The edit screen opens on the **Edit Level** tab by default. Update these fields in the **Level Information** card:

| Field | Notes |
|-------|-------|
| **Title** | Pre-filled from the modal. You can change it anytime. |
| **Description** | Optional internal note about what the level includes. |
| **Status** | **Active** makes the level available for sale. **Inactive** hides it from pricing shortcodes. |

For **Corporate** levels, you will also see:

| Field | Notes |
|-------|-------|
| **Maximum Member** | The total number of seats for the plan (parent + invited members). Leave empty for unlimited seats. |

Click **Save** in the top right when you are done. The button appears after you make a change.

![Edit Level, Individual](/images/levels/creating/edit-level-individual-2.webp)

![Edit Level, Corporate](/images/levels/creating/edit-level-corporate-3.webp)


## Step 3: Finish the Rest of the Setup

Creating the level is only the first step. Before visitors can join and see protected content, you still need to:

1. **Add a Pricing Plan** on the **Pricing** tab so people can buy or sign up.
2. **Attach Access Groups** on the **Access Group** tab so holding the level unlocks content.
3. **Copy the shortcode** from the Levels list (for example, `[fluent_membership_level id="10"]`) and add it to your pricing page.

After creation, the new level appears in the main list with its **ID**, **Status**, and **Shortcode** ready to use.

## Important Notes

::: warning Before you go live
- A level with no **Pricing** plan can be created, but visitors cannot purchase or join it.
- A level with no **Access Groups** attached can still be sold, but members will not unlock any protected content.
- The **Save** button only appears after you edit a field on the Edit Level tab.
:::

Your level is now created. Continue with the [Membership Levels Overview](/guide/levels/) recommended setup order, or follow the [Quick Start](/guide/getting-started/quick-start) guide for a full walkthrough.
