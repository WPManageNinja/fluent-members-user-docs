# Filters & Search

Once your site has been running for a while, [Subscriptions](/guide/transactions/subscriptions) and [One-Time Purchases](/guide/transactions/one-time) can each grow to hundreds or thousands of rows. Both views share the same filter-and-search pattern, so once you know one, you know both.

> [!Note]
> Both views are only available with Fluent Members Pro.

## Status Filter

Filter the list by status. The options differ slightly between the two views:

| View | Status options |
|---|---|
| Subscriptions | Pending, Incomplete, Trialing, Active, Past Due, Unpaid, Cancelled, Expired, Failed |
| One-Time Purchases | Active, Trial, Pending, Cancelled, Expired, Suspended |

## Provider Filter

Filter by where the record came from:

| View | Provider options |
|---|---|
| Subscriptions | Stripe, PayPal, PMPro, MemberPress, Kadence Memberships |
| One-Time Purchases | Stripe, PayPal, FluentCart, WooCommerce, Fluent Forms, Paymattic, PMPro, MemberPress, Kadence Memberships, Manual |

## Search Field

Search matches differently depending on the view:

- **Subscriptions**: the member's name or email address, the subscription's own ID, or the provider's gateway ID (for example, a Stripe subscription ID).
- **One-Time Purchases**: the member's name or email address only.

## Sorting

Both views can be sorted, click the column header or use the sort control:

| View | Sort options |
|---|---|
| Subscriptions | Next Billing Date, Total Paid, Started, Status |
| One-Time Purchases | Purchased, Amount, Status |

Both default to descending order (newest or highest first, or, for status, reverse-alphabetical).

## Pagination

The bottom of the table shows the total row count, a per-page selector (default 10), and page controls. Increase the per-page value to 25 or 50 when reviewing a large volume.

## Common Lookup Patterns

**Find every billing record for a specific member:**
Search their name or email address in whichever view holds the record you're after, Subscriptions if you're chasing a recurring plan, One-Time Purchases if it was a single purchase or a manual grant.

**Check for failed renewal payments:**
Open Subscriptions, filter by **Past Due**, and open a row to see the failure detail in its Transaction History panel.

**Confirm a refund was processed:**
Open the member's subscription or one-time purchase, and check its Transaction History panel for a `refund` row with status `refunded`.

**Find every subscription on a specific gateway:**
Open Subscriptions and filter by **Provider**.

::: tip Wrong view, no results?
If a search returns nothing, the record may be in the other view. A recurring plan lives in Subscriptions; anything else, one-time payments, manual grants, migrated non-recurring orders, lives in One-Time Purchases.
:::
