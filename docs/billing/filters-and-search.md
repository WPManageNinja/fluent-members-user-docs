---
title: "Filter & Search (Pro)"
description: "Find a record in the Subscriptions and One-time lists with status tabs, search, column sorting, column visibility and pagination."
---

# Filter & Search (Pro)

The [Subscriptions](/docs/billing/subscriptions) and [One-time](/docs/billing/one-time) lists (Pro) share the same tools for finding a record: status tabs, search, column sorting and pagination. Each tool works on one list at a time, so a record in the other list won't show up.

## Status tabs

The tabs above the table filter by status. The last tabs sit under **More**:

| List | Tabs |
|---|---|
| **Subscriptions** | **All**, **Active**, **Trialing**, **Past due**, then **Paused**, **Canceled** and **Expired** under **More** |
| **One-time** | **All**, **Active**, **Trial**, **Cancelled**, then **Suspended** under **More** |

Records with any other status, such as a **Pending** subscription or an **Expired** one-time membership, appear under **All** only.

## Search

Click the magnifier icon to open the search box, then type. Results update as you type, and **Cancel** closes the box and clears the search.

![Screenshot of the Subscriptions list with the search box open and a name entered](/images/billing/filters-and-search/filters-and-search-search.webp)

What search matches depends on the list:

| List | Matches |
|---|---|
| **Subscriptions** | Part of the member's name or email. The full **Subscription ID** or **Gateway Subscription ID**. For [subscriptions from other plugins](/docs/billing/provider-subscriptions), the numeric subscription ID in that plugin. |
| **One-time** | Part of the member's name or email only. |

> [!Note]
> The **One-time** search box shows the same placeholder as **Subscriptions**, "Search by member, subscription or gateway ID", but it only searches names and emails.

## Sort

Click a column header with arrows to sort by it. Click again to reverse the order or clear the sort. You can only sort by these columns:

| List | Sortable columns | Default |
|---|---|---|
| **Subscriptions** | **Next Billing**, **Total Paid**, **Started** | **Started**, newest first |
| **One-time** | **Purchased** | **Purchased**, newest first |

## Choose columns

Click the **Columns** icon beside the magnifier and tick the columns you want to see:

![Screenshot of the Columns menu open with its list of column checkboxes](/images/billing/filters-and-search/filters-and-search-columns.webp)

- **Subscriptions:** **Level**, **Status**, **Gateway**, **Next Billing**, **Total Paid**, **Started** and **Last Payment**.
- **One-time:** **Level**, **Status**, **Gateway**, **Amount** and **Purchased**.

The other columns are always on. Your choice is saved in your browser, separately for each list.

## Pagination

The footer shows the total count, a per-page selector and page numbers. Each list shows 10 rows per page by default, and you can choose 10, 20, 50, 80, 100, 120 or 150.

![Screenshot of the table footer with the total count, per-page selector and page numbers](/images/billing/filters-and-search/filters-and-search-footer.webp)

The footer is hidden when all the records fit on one page.

## Common lookups

- **All billing for one member:** search their name or email in **Subscriptions**, then in **One-time**.
- **Failed renewals:** open **Subscriptions** and click **Past due**. Open a row and check **Transaction History** for the **Failed** payment.
- **A refund went through:** open the record and look in **Transaction History** for a **Refund** or **Partial Refund** row.
- **A subscription you saw in Stripe or PayPal:** paste its full subscription ID from the gateway into the **Subscriptions** search.
