---
title: "FluentCommunity"
description: "Add members to FluentCommunity spaces and courses when they join a level, and take them out when access ends."
---

# FluentCommunity

The **FluentCommunity** integration adds members to spaces and courses when their membership starts, and removes them when it ends. Use it to make a community or a course part of what a level includes. It works on the free plan.

You need FluentCommunity active on your site. Courses appear only when the course module is turned on in FluentCommunity. FluentCommunity still controls access inside each space and course. Fluent Members only adds and removes members.

## Link spaces and courses to a level

Follow these steps to connect a level to your community:

1. Go to **Fluent Members → Membership Levels** and open the level.
2. Open the **Content Access** tab. In the **Also gets access from** card, find the **Community** row and click **Manage**. The row shows only while FluentCommunity is active.
3. In the **Spaces & courses** drawer, click **Add a space or course** (or **Add a space** when courses are off).
4. Search and pick the spaces and courses you want, then click **Save**.
5. Click **Done**, then click **Save** in the bar at the bottom of the tab.

A space shows whether it is public, private or secret, and a course shows its modules and lessons. An item that already belongs to another level shows **Also in** followed by that level's name. The [Content Access tab](/docs/levels/content-access) explains the rest of the tab.

<!-- TODO(screenshot): fluent-community-1
  screen: Fluent Members → Membership Levels → a level → Content Access → Spaces & courses drawer
  state: drawer open with one space and one course linked
  data: a FluentCommunity space and a course linked to DOCTEST Plus
  highlight: Add a space or course
  view: admin
  alt: Screenshot of the Spaces and courses drawer with a space and a course linked
-->

New members join from now on. Current members of the level are not added until you click **Add now** on the item, which appears when some members are missing. The page shows the progress while it adds them, and you can stop it with **Stop**.

## Set the role and the course release

Each linked item has one setting:

| Item | Setting |
|------|---------|
| Space | **Space role**: **Member** (default) or **Moderator**. |
| Course | A release schedule. Members get their seat right away, and FluentCommunity opens the course for them on the day you set. Without a schedule, the tag **Enroll on join** shows and the course opens at once. |

Click the release pill on a course to open **Release schedule**. Choose **Immediately**, **After the member joins** (for example day 7 or week 2), or **On a date** (the same day for every member). **After the member joins** counts from when the member first got the membership, so upgrades and renewals don't reset it. Release schedules need a FluentCommunity version that supports them. Without it, courses enroll on join.

If you change a role or a release date for an item that already has members, a banner offers **Apply now**. Members whose course has not opened yet get the new date, and a course that is already open stays open. Roles set by hand in FluentCommunity stay.

## Choose what happens when a membership ends

Under **When a membership ends**, pick one option for the whole drawer:

- **Remove access** (default): Members leave these spaces and courses when their membership ends.
- **Keep access**: Members stay in, and you remove them in FluentCommunity yourself.

Spaces and courses a member also gets from another active membership are never removed. A member who was already in the space or course before, who was added by hand, or who is an administrator stays too.

A cancellation set to take effect at the end of the paid period changes nothing until that date, because the member keeps access until then.

## Remove a space or course from a level

Click the **×** on a saved item. A window asks what to do with current members:

- **Keep current members**: They stay. Only the link to this level is removed.
- **Remove** followed by the number of members added by FluentMembers: Those members leave the space or course. Members with another membership, added by hand, administrators and blocked members stay.

The window shows how many members would be removed. If Fluent Members added nobody, there is nothing to remove.

> [!Note]
> A level that includes another membership shows that membership's spaces and courses as **Included**, with the name of the level they come from. Change them on that level.
