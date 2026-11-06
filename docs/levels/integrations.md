---
title: "Level Integrations"
description: "Add members of a level to FluentCommunity spaces and courses automatically with an integration feed."
---

# Level Integrations

**Level Integrations** run an action in another plugin when someone joins or renews a level. Today they connect a level to **FluentCommunity**, adding members to spaces and courses automatically.

You need FluentCommunity active on your site. The **Integrations** tab doesn't appear in a level without it.

## Add a feed

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Integrations** tab.
2. Click **Add Integration** and choose **FluentCommunity**.

    ![Screenshot of the Level Integrations tab with the Add Integration menu open](/images/levels/integrations/integrations-list.webp)

3. Fill in the feed.

    ![Screenshot of the FluentCommunity feed form with its spaces, courses and event fields](/images/levels/integrations/integrations-feed-editor.webp)

4. Click **Create FluentCommunity Feed**.

## Feed settings

The feed has these settings:

| Setting | Notes |
|---------|-------|
| **Enable this Integration** | Turns the feed on for this level. |
| **Feed Title** | A name to identify the feed in the list. Required. |
| **Add to Spaces** | Spaces to add the member to. |
| **Add to Courses** | Courses to enroll the member in. Shown when FluentCommunity's course module is on. |
| **Remove From Spaces** | Spaces to remove the member from. |
| **Remove From Courses** | Courses to remove the member from. Shown when the course module is on. |
| **Mark the community profile as verified** | Marks the member as verified in FluentCommunity. |
| **Remove from selected Courses/Spaces on Refund or Subscription Access Expiration** | Removes the selected spaces and courses when the member loses access. |
| **Event Trigger** | When the feed runs: **Membership Assigned**, **Membership Renewed**, or both. Required. |

> [!Note]
> The removal option also runs when a membership is suspended. It still runs if you turn the feed off, so clear the checkbox if you don't want removals to happen.

## Manage feeds

The **Level Integrations** list shows each feed's **Status**, **Integration**, **Title** and **Triggers**.

- Use the **Status** switch to turn a feed on or off.
- Click a feed's title to edit it, or use **Edit** in its three-dot menu.
- Choose **Delete** in the menu to remove it.

See [FluentCommunity](/docs/integrations/fluent-community) for more on how the two plugins work together.
