---
title: Members List
description: Find members and other WordPress users, filter them by membership status, and open a member's details.
---

# Members List

The **Members** screen lists everyone who holds a membership on your site. Use it to find a person, filter by status, and open their details.

Go to **Fluent Members → Members**.

![Screenshot of the Members screen with the status tabs, search icon, and a table of members](/images/members/index/members-list-overview.webp)

## Columns

The table has these columns:

| Column | What it shows |
|--------|---------------|
| **ID** | The WordPress user ID. Click the header to sort the rows on the current page. |
| **User** | Avatar, display name, and email address. |
| **Membership Level** | Up to two level tags. When there are more, a `+N` tag opens the rest in a dropdown. |
| **Role** | The WordPress role, such as Subscriber or Administrator. |
| **Registered** | The date the WordPress account was created, such as November 6, 2026. |

Click any row to open that member's [details](/docs/members/detail).

## Status tabs

The tabs filter the list, and the **Membership Level** column then shows only memberships with that status. The screen opens on **Members**.

- **Members:** Everyone holding a membership of any status. A membership whose level was deleted does not count.
- **Active:** People with a membership in Active status. Trial members are not included, so check **Trial** too.
- **No Membership:** WordPress users who hold no membership, including those whose only membership belonged to a deleted level. Use this tab to find someone before you [add a membership manually](/docs/members/adding-manually).
- **More:** A dropdown with **Expired**, **Trial**, **Cancelled**, **Upgraded**, and **Suspended**.

![Screenshot of the Members screen with the More dropdown open, showing Expired, Trial, Cancelled, Upgraded and Suspended](/images/members/index/members-list-more-statuses.webp)

See [Membership statuses](/reference/membership-statuses) for what each status means.

## Search

Click the search icon on the right to open the search field, then type in **Search members by name or email**. Search also matches the WordPress username. Click **Cancel** to close it.

![Screenshot of the Members screen with the search field open](/images/members/index/members-list-search.webp)

Search runs inside the tab you have open. If a person doesn't appear on **Members**, they hold no membership, so try **No Membership**.

## Pagination

The list shows 10 people per page. When there are more than that, the footer shows the total, a page size dropdown, and page numbers.
