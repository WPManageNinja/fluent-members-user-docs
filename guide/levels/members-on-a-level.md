# Members on a Level

The **Members** tab on a level shows every WordPress user who currently holds that membership level. Use it for quick checks: who is on this plan, how many, and what status each membership is in.

This is a read-only list. To change a member's status, cancel a membership, or view full history, open the member's detail page or go to **Fluent Members → Members**.

You need at least one member on the level before this tab shows useful data. New levels start with an empty list.

## Access the Members Tab

Go to **Fluent Members → Levels**, open the level you want to review, then click the **Members** tab.

The page lists every user holding this level. Use **Search by name or email** in the top right to filter the list.

![Members tab on a level](/images/levels/members-on-a-level/member.webp)

## What the Columns Show

| Column | What it shows |
|--------|----------------|
| **ID** | Numeric ID of the membership record (not the WordPress user ID). |
| **User** | Avatar, display name, and email address. |
| **Status** | Current membership status — for example, **Active**, **Trial**, **Pending**, **Cancelled**, **Expired**, or **Suspended**. |
| **Role** | The member's WordPress role (for example, Subscriber). |
| **Registered** | The date the WordPress user account was registered. |

Click a row to open that member's **Member Detail** page for full membership history and actions.

## What This Tab Is For

Use the Members tab for quick triage without leaving the level:

- Check how many people are on this plan (pagination total at the bottom).
- Search for a specific signup by name or email.
- Spot status patterns — for example, several **Pending** or **Expired** rows after a campaign.

For site-wide member management, use **Fluent Members → Members** in the top navigation instead.

## Important Notes

::: warning Good to know
- An **empty list** after recent signups often means payments are still **Pending** — check **Fluent Members → Transactions** (Pro) or the host payment plugin.
- The same email can appear twice if the user holds two membership records on this level (for example, a manual add plus a purchase).
- **Registered** shows when the WordPress user was created, not necessarily when they joined this level.
:::


