---
title: "Corporate Seat Invites (Pro)"
description: "How corporate membership owners invite team members and manage seats from the Member Portal."
---

# Corporate Seat Invites (Pro)

**Corporate Seat Invites** (Pro) let the owner of a corporate membership fill their own seats. The owner invites people by email from the **Member Portal**, and each person who accepts gets access under the owner's membership.

## The Team Members panel

The owner opens the Member Portal and clicks **Manage** on the corporate membership. The **Team Members** panel is below the membership details.

![Screenshot of the Team Members panel with an email typed in the Invite Member field and an arrow on Send Invitation](/images/members/portal/corporate-seat-invites/corporate-seat-invites-panel.webp)

- **Seat count:** For example **2 / 10 seats · 1 pending**. The owner takes one seat, and pending invitations show separately. A level with no seat limit shows the member count instead.
- **Invite Member:** The email field and **Send Invitation** button. They're hidden once the corporate membership has ended or its subscription is scheduled to cancel.
- **Tabs:** **All**, **Active**, **Pending** and **Cancelled**, with a **Search...** field.
- **Table:** **ID**, **Member**, **Role**, **Joined** and **Status**, with a three-dot menu on each row.

Seat holders don't get this panel. They see a normal membership card with the provider **Corporate**, and their **Manage** page shows the usual membership details.

Without Pro, the owner sees **Corporate membership management requires Fluent Members Pro.** in place of the panel.

## Invite a team member

1. Type the person's email address under **Invite Member**.
2. Click **Send Invitation**.

The owner sees **Invitation sent to** the address, and a **Pending** row appears in the table. The person gets an email with an **Accept Invitation** button. The invitation expires after 3 days.

The invitation is refused in these cases:

| Message | Why |
|---|---|
| **An invitation was already sent to this email recently. Please wait before sending again.** | One invitation per email address per hour. |
| **This person is already a member of your team.** | The address belongs to the owner or a current seat holder. |
| **All 10 seats are occupied. No more members can join.** | Every seat is taken. The message shows the level's seat limit. |
| **All seats are taken or reserved by pending invitations. Cancel an invitation or remove a member first.** | The free seats are all held by pending invitations. |
| **This corporate membership is no longer active.** | The owner's membership has ended or is suspended. |

## Accept an invitation

The link in the email opens a **Join Corporate Membership** page on your site.

1. If the person isn't logged in, they see **Please log in to accept this invitation.** They click **Log In** and sign in with the invited email address.
2. The page says who invited them and to which membership.
3. They click **Accept Invitation**.

The page confirms **You have successfully joined the corporate membership!** and offers **Go to Portal**. Access starts right away.

<!-- TODO(screenshot): corporate-seat-invites-1
  screen: Join Corporate Membership page opened from an invitation link
  state: logged in as the invited person, Accept Invitation button visible
  data: a pending invitation for a test account
  highlight: Accept Invitation button
  view: frontend
  alt: Screenshot of the Join Corporate Membership page with the Accept Invitation button
  reason: needs a real invitation; sending one was out of scope for this pass
-->

The page shows an error instead in these cases:

| Message | Why |
|---|---|
| **This invitation was sent to a different email address.** | The person is logged in with another account. They log out and use the invited address. |
| **This invitation has expired.** | More than 3 days have passed. The owner sends a new one. |
| **This invitation link is invalid or has expired.** | The link is no longer valid, for example because it was cancelled or already used. |
| **You cannot join your own corporate membership as a sub-account.** | The owner opened their own invitation. |
| **You already have an active membership at this level.** | The person already holds this level. |

## Manage invitations

Open the three-dot menu on a **Pending** row:

- **View invitation:** Opens **Invitation details** with **Email**, **Invited by**, **Sent** and **Expires**.
- **Resend invitation:** Emails the invitation again.
- **Cancel invitation:** Withdraws it and frees the reserved seat.

## Remove a team member

1. Open the three-dot menu on the member's row and click **Cancel**. The item is only available for an **Active** seat.

    ![Screenshot of the Team Members panel with a seat holder's three-dot menu open](/images/members/portal/corporate-seat-invites/corporate-seat-invites-seat-menu.webp)

2. Click **Confirm** when asked **Are you sure you want to cancel this sub-account?**

The member's seat is cancelled and freed for someone else. Their WordPress account and any other memberships they hold aren't affected.

## When the owner's membership changes

Seats follow the owner's membership. If it's cancelled, expires or is suspended, every seat changes with it. If the team is larger than the plan allows, the panel shows a warning with how many members to remove before inviting again.

For the admin side, see [Corporate Memberships](/docs/levels/corporate-memberships) and [Corporate Members](/docs/members/corporate-members).
