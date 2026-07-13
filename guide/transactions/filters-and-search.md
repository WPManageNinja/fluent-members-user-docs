# Filters & Search

Once your site has been running for a few months, the Transactions list can grow to hundreds or thousands of rows. Use the status tabs and search field together to quickly locate the row you need.

> [!Note]
> The Transactions screen is only available with Fluent Members Pro.

## Status Tabs

The tab strip at the top filters the list by transaction status:

| Tab | Filters to |
|---|---|
| **All** | Every transaction regardless of status |
| **Paid** | Successful charges |
| **Pending** | Payments awaiting confirmation |
| **Failed** | Charges that did not succeed |
| **Refunded** | Charges that were returned to the member |

Pick a tab first to narrow by status, then use the search field to narrow further within that tab.

## Search Field

Click the search icon at the top-right of the table. A text input opens; the list filters live as you type.

Search matches against:

- **User name**: partial, case-insensitive
- **User email**: partial match
- **Transaction ID**: exact match
- **Level title**: partial match

Search does not filter by Payment Method, Date, or Amount. For those, scroll the list or query the `fmem_membership_transactions` table directly.

![Transactions filter and search](/images/transactions/filter/filter-and-search-1.webp)

## Pagination

The bottom of the table shows the total row count, a per-page selector (default 10), and page controls. Increase the per-page value to 25 or 50 when reviewing a large volume; the setting persists for the current browser session.

## Common Lookup Patterns

**Find all transactions for a specific member:**
Open the **All** tab, search by the member's name or email; all their charges, renewals, and refunds appear together.

**Check for failed payments:**
Open the **Failed** tab and scan the Date column. Click any row to see the decline reason in the detail panel.

**Confirm a refund was processed:**
Open the **Refunded** tab and search by member name. Confirm the row shows status `refunded` and the date matches when you triggered it.

**Find renewal charges for a member:**
Open the **Paid** tab, search by member name, and look for rows where **Type** is `renewal`.

::: tip Search applies within the active tab
If a search returns no results, switch to the **All** tab first; the transaction may exist under a different status than the tab you have open.
:::
