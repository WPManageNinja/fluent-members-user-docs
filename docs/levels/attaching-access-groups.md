---
title: "Attaching Access Groups"
description: "Link Access Groups to a Membership Level so holding the level unlocks protected content."
---

# Attaching Access Groups

A level unlocks nothing on its own. Attach **Access Groups** to decide which protected content its members can see. Members of the level get everything its active groups protect.

## Link an existing group

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Access Groups** tab.
2. Click **Link Existing Group**.

    ![Screenshot of the Access Groups tab with no groups linked and an arrow pointing to Link Existing Group](/images/levels/attaching-access-groups/attaching-access-groups-empty.webp)

3. Select each group this level should unlock. Each card shows the group's title, ID, status and the levels already using it.

    ![Screenshot of the Select Access Group modal with a card for each group](/images/levels/attaching-access-groups/attaching-access-groups-link-modal.webp)

4. Click **Select**.

One group can serve many levels. Linking it here doesn't affect its other levels.

## Create a new group from the tab

1. On the **Access Groups** tab, click **Add New**.
2. Enter a **Title** and click **Next**.

    ![Screenshot of the Create Access Group modal with the Title field](/images/levels/attaching-access-groups/attaching-access-groups-create-modal.webp)

The new group is created, linked to this level, and opened so you can choose what it protects. See [Access Groups](/docs/access-groups/).

## Review and change linked groups

Each linked group appears as a card with its status and number of protected items. The card lists its **Protected Content** and **Excluded** items, and summarizes its **Content Drip** rules if it has any.

![Screenshot of the Access Groups tab with linked group cards and an arrow pointing to Unlink](/images/levels/attaching-access-groups/attaching-access-groups-cards.webp)

- **Edit:** Opens the group's settings.
- **Unlink:** Removes the group from this level after you confirm. The group itself stays on your site.

> [!Note]
> Unlinking a group takes away its content from members of this level, unless another of their levels also includes it. An inactive group grants no access at all, and a level needs at least one active group to finish its setup.

You can make the same connection from the other side: open an Access Group and click **Add Level**.
