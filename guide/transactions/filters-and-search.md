# Filters & Search

::: info Part of Chain 9: Refund · step 2 of 5
**Previously:** [Transactions List](/guide/transactions/)
**Next:** [Refunds](/guide/transactions/refunds)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
The Transactions screen is Pro-only.
:::

The Transactions list scales, once you've sold for a few months, it's hundreds or thousands of rows. This page is the short reference for narrowing down to the row you need.

**Here's what you'll learn:**
- The five tabs and what each filters to.
- The search field and which columns it searches.
- The pagination controls.
- A few common "I need to find X" patterns.

**Before we start:** You're on the [Transactions list](./).

---

## The five tabs

The tab strip filters by **status**:

| Tab          | Filters to status… |
|--------------|---------------------|
| **All**      | All statuses        |
| **Succeeded**| `succeeded`         |
| **Pending**  | `pending`           |
| **Failed**   | `failed`            |
| **Refunded** | `refunded`          |

Switching tabs is purely visual, the URL doesn't change in 1.0, so you can't bookmark "Failed only". You can, however, link members to specific row IDs.

::: tip In plain language
Tabs = status filter, fast. Search = name/email/ID filter, also fast. Combine: pick a tab first, then search within it.
:::

---

## The search field

Click the search icon (top-right of the table). A text input opens. Type at least 1 character; the list filters live.

The search matches across:

- **User name** (partial, case-insensitive).
- **User email** (partial).
- **Transaction ID** (exact match).
- **Level title** (partial).

It does **not** match against Payment Method, Date, or Amount in 1.0. For those you need to scroll the full list (or wait for a richer filter UI in a later release).

---

## Pagination

The bottom of the table shows `Total N`, a per-page dropdown (default 10), and page numbers.

For triage of a busy site, raise per-page to 25 or 50, fewer page-flips. The per-page choice persists across tabs in the current session.

---

## Common patterns

### "I need to find a charge for user Jane Smith"

1. **All** tab.
2. Search "Jane Smith" → 3-5 rows appear.
3. Pick the right Date / Level.

### "I need to see if any payments failed this week"

1. **Failed** tab.
2. Scan the Date column.
3. Click each row to open the side drawer and read the bank's decline reason.

### "I need to verify a Stripe refund landed"

1. **Refunded** tab.
2. Search by amount or by user name.
3. Confirm the row's Status is `refunded` and Date matches when you triggered it.

### "I need to find a renewal charge for a specific subscription"

1. **Succeeded** tab.
2. Search by user.
3. Look for rows where Type is `renewal`.

---

## A real example: Sara digs out an old charge for a support ticket

A member emails: *"I was charged $19 on March 15. Can you confirm?"*

Sara:

1. Opens Transactions → **Succeeded** tab.
2. Searches the member's email.
3. Finds the row dated March 15 with Amount $19 and Status `succeeded`.
4. Replies to the member with a screenshot.

Total: under a minute.

---

## What's missing in 1.0

Be honest about the limits so you know when to drop to the database directly:

| Want to filter by… | 1.0 supports? |
|---|---|
| Date range | No, you scroll. |
| Amount range | No. |
| Payment Method | No (only via the row content). |
| Type (`charge` vs `renewal` vs `refund`) | No (mix in tabs). |
| Provider source (e.g. only FluentCart) | No. |

For these, raise a feature request, query the `fmem_membership_transactions` table directly, or wait for a future release.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Search returns nothing for an email I'm sure exists | Search applies within the current tab. | Switch to **All**. |
| Many duplicate rows after search | Member has many transactions; the search matches each. | Add more search terms. |
| Per-page setting doesn't persist | It only persists in the current browser session. | Set it once per session. |

---

## What's next?

- **→ [Refunds](./refunds)**: once you've found the row, refund it.
- **→ [Subscription Cancellation Modes](./cancellation-modes)**: what happens after a Cancel.

**Recommended reading:**
- [Transactions List](./): the entry point.
- [Membership Statuses](/reference/membership-statuses): what each row's underlying status means.
