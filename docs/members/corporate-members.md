---
title: Corporate Members (Pro)
description: See who holds a seat on a team, check seat usage, and learn how owner changes affect each seat.
---

# Corporate Members (Pro)

The **Corporate Members** screen (Pro) lists the seats on one team: the people sharing a [corporate membership](/docs/levels/corporate-memberships) bought by the team owner. Use it to check who is on a team and how many seats are used.

Team owners invite people from the Member Portal. See [Corporate seat invites](/docs/members/portal/corporate-seat-invites) for that flow.

## Open the screen

1. Go to **Fluent Members → Members** and click the team owner's row.
2. In the **Memberships** table, click the seat link under the plan name, such as `2 / 10 seats used`. Clicking elsewhere on the row works too.

    <!-- TODO(screenshot): corporate-members-1
      screen: Members → a team owner
      state: Memberships table with the seat link under the plan name
      data: a corporate level owner with two seats used
      highlight: seat link
      view: admin
      alt: Screenshot of a team owner's membership row with an arrow pointing to the seat link
    -->

## What the screen shows

The top of the screen shows the owner's name, the level, and the seat count. Click the owner's name to go back to their details.

<!-- TODO(screenshot): corporate-members-2
  screen: Members → a team owner → seat link
  state: Corporate Members screen with owner, level, seat count, status tabs and one seat
  data: a corporate level owner with one seat holder
  highlight: seat count
  view: admin
  alt: Screenshot of the Corporate Members screen with the owner, level, seat count, status tabs, and one seat
-->

The table lists seats only, not the owner:

| Column | What it shows |
|--------|---------------|
| **Member** | Avatar, display name, and email address. |
| **Role** | The WordPress role. |
| **Status** | The status of the seat. |
| **Joined** | The date the seat was created. |
| **Start Date** | The date the seat's access began. |
| **Expires** | The end date, or **Lifetime** if there is none. |

Use the tabs to filter by status: **All**, **Active**, **Cancelled**, **Expired**, and **Suspended** (under **More**). Trial seats appear under **All**. Click the search icon to search **Search by name or email**.

This screen has no row actions. Click a row to open that person's [Member Details](/docs/members/detail), then use the row menu there.

## How seats are counted

The seat count includes the owner. On a level with a **Maximum Member** of 10, the owner plus nine others fill the team. Only Active and Trial seats count. If the level has no limit, the label shows the used count alone, such as `2 seats used`. When the owner bought the team plan more than once, the label also shows the split, such as `4 / 20 seats used (2 × 10 seats)`.

Pending invitations are not in this count, but they do hold a seat: owners cannot send more invitations than there are free seats.

## How a seat looks on Member Details

A seat's row on [Member Details](/docs/members/detail) differs from a normal membership:

- **Plan** shows **Corporate Child**.
- **Provider** shows the team owner's name, which links to the owner.
- **Amount** shows **Included** when the seat has no price of its own.
- **Expires** matches the owner's expiry date.

## How owner changes affect seats

Changes to the owner's membership carry down to the seats:

| Owner's membership | What happens to seats |
|--------------------|-----------------------|
| Suspended | Active and Trial seats become Suspended. |
| Back to Active or Trial | Suspended seats come back, along with Expired seats and seats that were Cancelled because the owner was cancelled. They return in order, oldest first, until no seats are free. |
| Cancelled | Active, Trial, and Suspended seats become Cancelled. |
| Expired | Active, Trial, and Suspended seats become Expired. |
| Moved to another corporate level | Seats that aren't Cancelled move to the new level and take its expiry date. |
| Moved to a level that isn't corporate | Live seats become Cancelled. |

A seat you cancelled on its own stays cancelled when the owner's membership comes back.

## Act on one seat

Open the seat holder's [Member Details](/docs/members/detail) and use the row menu on the **Corporate Child** row to [suspend or cancel](/docs/members/suspending-and-cancelling) that seat alone. **Cancel** on a seat ends access immediately.

**Reactivate** appears on a suspended seat only while the owner's membership is Active or Trial. If the team is full, Reactivate stops with `All seats in this team are used. Remove a seat or raise the level's seat limit first.`
