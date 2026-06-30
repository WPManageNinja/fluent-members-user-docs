# Attaching Access Groups

A **Membership Level** on its own unlocks nothing. To grant content access, attach one or more **Access Groups** to the level. Anyone who holds that level can then see everything those groups protect.

You need a level already created and at least one [access group](/guide/access-groups/) available before you start.

## Access the Access Group Tab

Go to **Fluent Members → Levels**, open the level you want to configure, then click the **Access Group** tab.

If no groups are linked yet, the table shows *"No access groups selected"*. Click **Select Access Group** in the top right.

![Access Group tab, empty state](/images/levels/attaching-access-groups/level-access-groups-empty.webp)

## Step 1: Select Access Groups

Click **Select Access Group**. A modal opens with a card for each access group on your site. Each card shows:

- **ID** and **Status** (for example, `#12` · Active)
- **Title** and **Description**
- **Level chips** at the bottom showing which other levels already use this group
- A **checkbox** in the top-right corner to select the group

Tick every group this level should unlock, then click **Select** at the bottom of the modal. A success message confirms the update — there is no separate Save button on this tab.

::: tip One group can power many levels
If a group card shows chips like *Lifetime*, *Free Member*, or *Business Team*, that group already unlocks content for those levels. Attaching it to another level does not affect the existing links.
:::

![Select Access Group modal](/images/levels/attaching-access-groups/level-select-access-group-modal-2.webp)


## Create an Access Group from the Modal

If the group you need does not exist yet, click **+ Create Access Group** at the bottom left of the **Select Access Group** modal.

Fill in the form:

- **Title:** Name of the access group (required)
- **Description:** Short note about what the group protects
- **Status:** **Active** or **Inactive**

Click **Create**. You return to the **Select Access Group** modal, where the new group appears as a selectable card.

![Create Access Group modal](/images/levels/attaching-access-groups/create-access-group-3.webp)

## Step 2: Review Attached Groups

Back on the **Access Group** tab, the table lists every linked group with **ID**, **Title**, **Description**, and **Status**.

## Edit or Remove an Access Group

Each attached row has a **three-dot icon** on the right. Click it to open:

- **Edit:** Open the access group settings for that linked group.
- **Remove:** Detach the group from this level.

![Edit or remove an attached access group](/images/levels/attaching-access-groups/edit-or-remove-4.webp)

::: warning Removal revokes access immediately
Removing a group takes away access to its protected content for every member on this level. There is no grace period. To stop new signups without affecting current members, leave the group attached and set the group to **Inactive** under **Access Groups** instead.
:::

## Attach from the Access Group Side

You can make the same connection from the other direction: open an access group and choose which levels can unlock it from the **Active Levels** card on the group edit screen. Both flows update the same link between levels and groups.


