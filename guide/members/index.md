# Members List

The **Members** screen lists everyone on your site who holds at least one membership. It's the command centre for member management, search, filter, jump to a member, and see at a glance how the system is doing.
**Here's what you'll learn:**
- How to open the Members screen.
- The four filter tabs at the top.
- What each column tells you.
- How to find one specific member quickly.

**Before we start:** No prerequisites. You can open this screen even before anyone has signed up.

---

## Step 1: Open Members

In wp-admin, click **Fluent Members → Members**.

You land on a paginated list of WordPress users who hold at least one membership row. Each row shows their basic info and their level pills.

![Members list](/screenshots/members-list.webp)

---

## The four filter tabs

The tab bar above the table filters the list:

| Tab           | Shows                                                                       |
|---------------|------------------------------------------------------------------------------|
| **All**       | Every membership row (any status).                                          |
| **Active**    | Only `active` and `trial` rows.                                             |
| **Expired**   | Only `expired` rows.                                                        |
| **More views ↓** | A dropdown that opens additional filters: Pending, Cancelled, Suspended, and so on. |

::: tip Why "More views" instead of always-visible tabs?
*Active* and *Expired* are the two states admins look at most often. Tucking the rarer states (Pending, Cancelled, Suspended) into a dropdown keeps the tab strip clean while still being one click away.
:::

---

## The columns

| Column              | What it shows |
|---------------------|----------------|
| **ID**              | Membership row ID (not the WP user ID). |
| **User**            | Avatar + display name + email. |
| **Membership Level**| Coloured pills. A user can hold multiple Levels, they all show side-by-side. |
| **Role**            | The WordPress role of the user (Subscriber, Administrator, etc.). |
| **Registered**      | When the WordPress user account was created. |

Click any row to open that member's [Detail](./detail) page.

---

## Searching

The search icon in the top-right of the table opens a search field. Type a name or email substring; the list filters as you type. Search applies to the *current* filter tab, if you're on Active, you're searching within Active.

::: tip In plain language
Members shows the *people*. The list filters by membership *status* (Active / Expired / etc.) and then by name. Click a row to open one specific person and manage them.
:::

---

## Pagination

The bottom-left says `Total N`. The "per page" dropdown defaults to 10. The page numbers on the right let you jump forward.

For sites with hundreds of members, lift the per-page to 25 or 50, page numbers compress accordingly.

---

## A real example: Sara checks who's expiring

Sara wants to email anyone whose membership lapsed last month:

1. Opens **Members**.
2. Clicks **Expired** tab.
3. Sorts by Registered to roughly approximate sign-up date (1.0 doesn't filter by `expires_at` directly here, that view lives on the [Dashboard's Expiring Soon card](/guide/dashboard/dashboard)).
4. Notes the emails, drops a personal note to each.

For a more automated approach she'd use [FluentCRM](https://fluentcrm.com) listening on the `fluent_members/membership_expired` action.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| List is empty after signups | The new members are in `Pending` and the **Active** tab is selected. | Switch to **All** or to **More views → Pending**. |
| Same user appears twice | They hold two memberships. Each row is a membership, not a user. | Open the user's [Detail](./detail) page, both memberships will be listed there. |
| Search doesn't match | The current tab excludes the user (e.g. they're Pending but you're on Active). | Search on **All**. |

---

## What's next?

- **→ [Member Detail](./detail)**: open one person and manage their memberships.
- **→ [Adding a Membership Manually](./adding-manually)**: comp an admin or do a manual grant.

**Recommended reading:**
- [Status Reference](./statuses): what each status does.
- [Membership Statuses](/reference/membership-statuses): the canonical vocabulary.
