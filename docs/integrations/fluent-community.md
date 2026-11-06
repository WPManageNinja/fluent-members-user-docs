---
title: "FluentCommunity"
description: "Add members to FluentCommunity spaces and courses when they join a level, and remove them when access ends."
---

# FluentCommunity

The **FluentCommunity** integration adds members to spaces and courses when they join a level, and removes them when access ends. Use it to make a community or a course part of what a membership includes. It works on the free plan.

You need FluentCommunity active on your site. Each connection is a feed that you add to one level, on the level's **Integrations** tab. [Level integrations](/docs/levels/integrations) explains the feed list.

## Add a feed

Follow these steps to connect a level to your community:

1. Go to **Fluent Members → Membership Levels** and open the level.
2. Open the **Integrations** tab, click **Add Integration** and choose **FluentCommunity**.

    ![Screenshot of the Add Integration menu on a level's Integrations tab with FluentCommunity listed](/images/integrations/fluent-community/fluent-community-add-integration.webp)

3. Fill in the fields below.

    ![Screenshot of the FluentCommunity feed form with its space, course and trigger fields](/images/integrations/fluent-community/fluent-community-feed.webp)

4. Click **Create FluentCommunity Feed**.

## Feed fields

The feed form has these fields:

| Field | Notes |
|-------|-------|
| **Enable this Integration** | Turns the feed on or off. On by default. |
| **Feed Title** | The name shown in the feed list. Required. |
| **Add to Spaces** | Spaces the member joins. |
| **Add to Courses** | Courses the member is enrolled in. |
| **Remove From Spaces** | Spaces the member is removed from when the feed runs. |
| **Remove From Courses** | Courses the member leaves when the feed runs. |
| **Mark the community profile as verified** | Marks the member as verified in FluentCommunity. Off by default. |
| **Remove from selected Courses/Spaces on Refund or Subscription Access Expiration** | Takes back the feed's spaces and courses when access ends. On by default. |
| **Event Trigger** | When the feed runs: **Membership Assigned** (default), **Membership Renewed**, or both. Required. |

The two course fields appear only when the course module is turned on in FluentCommunity.

## When members are added

When the chosen event happens, the feed creates the member's community profile if needed, applies the removals, then adds the member to the selected spaces and courses. They join spaces as a member and courses as a student.

If you later change the selected spaces or courses, the feed takes back the ones you removed the next time it runs for that member.

## When access is taken back

With **Remove from selected Courses/Spaces on Refund or Subscription Access Expiration** on, the member loses the feed's spaces and courses when their membership is removed, expires or is suspended. This happens even if you have turned the feed off.

A cancellation that takes effect at the end of the paid period changes nothing until that date, because the member keeps access until then.

Some members keep their place:

- A member who was already in the space or course before the feed added them stays in it.
- A member who also has it through another membership stays in it until that membership loses access too.

> [!Note]
> Deleting a feed takes back its spaces and courses from that level's members, unless the feed's removal checkbox was off when it added them.
