---
title: "Members on a Level"
description: "See everyone on a Membership Level and assign users to it without taking payment."
---

# Members on a Level

The **Members** tab lists everyone with a membership record on a level, whatever its status. Use it to check who is on the level, or to give people access yourself with **Assign Members**.

## Review the list

Go to **Fluent Members → Membership Levels**, open the level and click the **Members** tab.

![Screenshot of the Members tab with the member table and an arrow pointing to Assign Members](/images/levels/members-on-a-level/members-on-a-level-table.webp)

The table has these columns:

| Column | What it shows |
|--------|---------------|
| **ID** | The person's WordPress user ID. |
| **User** | Their name and email. |
| **Role** | Their WordPress role. |
| **Registered** | When their WordPress account was created, not when they joined this level. |
| **Status** | Their latest membership status on this level. See [Membership Statuses](/reference/membership-statuses). |

Use **Search by name or email** to find someone. Click a row to open that member's page.

## Assign members to a level

**Assign Members** gives users this level without taking payment. Use it for comps, staff or members you've moved from elsewhere.

You need an active level with at least one plan. The button is unavailable on an inactive level, and a level with no plans shows **No pricing plans yet** with an **Add pricing plan** button.

1. On the **Members** tab, click **Assign Members**.
2. Under **Plan**, choose the plan to assign. The modal reminds you that no payment is taken and that access ends on the plan's expiry.
3. Select the users. Search by name, email or username, or click **Load more** to see more.
4. Click **Assign Members** at the bottom of the modal.

![Screenshot of the Assign Members modal with a plan selected and two users ticked](/images/levels/members-on-a-level/members-on-a-level-assign-dialog.webp)

The user list helps you choose:

- **Current Levels** shows the levels each user holds now.
- A status tag beside a name shows their previous status on this level.
- Users who are already active, on trial or suspended on this level aren't listed.

You can assign up to 100 users at a time. If some can't be assigned, the modal lists each one with the reason, and the others are still assigned.

Assigned members count as **Membership Assigned** for any [Level Integrations](/docs/levels/integrations) on the level.

> [!Note]
> On a corporate level, each user you select becomes a separate Team owner with their own seats. See [Corporate Memberships](/docs/levels/corporate-memberships).

For members across all levels, go to [**Fluent Members → Members**](/docs/members/).
