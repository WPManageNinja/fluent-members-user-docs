---
title: "Corporate Seat Invites (Pro)"
description: "How corporate membership owners invite team members and manage seats from the Member Portal, and how invitees join with or without an account."
---

# Corporate Seat Invites (Pro)

**Corporate Seat Invites** (Pro) let the owner of a corporate membership fill their own seats. The owner invites people by email from the **Member Portal**, and each person who accepts gets access under the owner's membership. Invitees without an account can create one from the invitation.

## Open the Team Members panel

The owner opens the Member Portal and clicks **Manage** on the corporate membership. The **Team Members** panel is below the membership details.

<!-- TODO(screenshot): corporate-seat-invites-1
  screen: Member Portal → Manage on a corporate membership
  state: Team Members panel with an email typed in the Invite Member field
  data: a corporate owner with one pending invitation and one seat holder
  highlight: Send Invitation button
  view: frontend
  alt: Screenshot of the Team Members panel with an email typed in the Invite Member field and an arrow on Send Invitation
-->

- **Seat count:** For example **2 / 10 seats · 1 pending**. The owner takes one seat, and pending invitations show separately. A level with no seat limit shows the member count instead, such as **3 members**.
- **Invite Member:** The **Enter email address** field and **Send Invitation** button. They're hidden once the corporate membership has ended or its subscription is scheduled to cancel.
- **Tabs:** **All**, **Active**, **Pending** and **Cancelled**, with a **Search members** field.
- **Table:** **Member**, **Role**, **Joined** and **Status**, with a three-dot menu on each row. On a narrow screen each row becomes a card.

If the team is larger than the plan allows, a warning reads "Your plan's seat limit is" the limit "but your team has" the count "people", with how many members to remove before inviting again.

Seat holders don't get this panel. They see a normal membership card, and their **Manage** page shows the usual membership details. Without Pro, the owner sees **Corporate membership management requires Fluent Members Pro.** in place of the panel.

## Send an invitation

1. Type the person's email address under **Invite Member**.
2. Click **Send Invitation**.

The owner sees **Invitation sent to** the address, and a **Pending** row appears in the table. The person gets an email with an **Accept Invitation** button. The invitation expires after 3 days unless a developer changes it with the `fluent_members/corporate_invitation_expiry_days` filter.

If the site cannot send the email, the owner sees "Invitation created, but this site could not send the email. Resend it, or share the join link yourself." The row reads **Email not delivered**, and the join link is in the invitation details.

### If the invitation is refused

The owner sees one of these messages and nothing is sent:

| Message | Why |
|---|---|
| **An invitation was already sent to this email recently. Please wait before sending again.** | One invitation per email address per hour. |
| **This person is already a member of your team.** | The address belongs to the owner or a current seat holder. |
| **All 10 seats are occupied. No more members can join.** | Every seat is taken. The message shows the level's seat limit. |
| **All seats are taken or reserved by pending invitations. Cancel an invitation or remove a member first.** | The free seats are all held by pending invitations. |
| **This corporate membership is no longer active.** | The owner's membership has ended or is suspended. |
| **Invitation emails are turned off on this site. Please contact the site administrator.** | The team invitation email is switched off in your [email notifications](/docs/settings/email-configuration/email-notifications). |

## Accept an invitation as the invitee

The link in the email opens a **Join Corporate Membership** page on your site. What the invitee sees depends on whether the invited address has an account.

**With an account:**

1. If the person isn't logged in, they see "This invitation was sent to" their address "which already has an account. Log in with that account to accept it." They click **Log In** and sign in with the invited address.
2. The page says who invited them and to which membership.
3. They click **Accept Invitation**.

**Without an account:**

1. The page says who invited them and to which membership, and asks them to create an account to accept.
2. The **Email** field shows the invited address and cannot be changed. They enter **Your name** and a **Password** of at least 8 characters.
3. They click **Create Account and Join**. The account is created, they are logged in, and the seat is claimed.

<!-- TODO(screenshot): corporate-seat-invites-2
  screen: Join Corporate Membership page opened from an invitation link, logged out
  state: account creation form with Email, Your name, Password and Create Account and Join
  data: a pending invitation for an email with no account
  highlight: Create Account and Join button
  view: frontend
  alt: Screenshot of the Join Corporate Membership page with the account creation form
  reason: needs a real invitation for an address with no account
-->

Either way the page ends with **Welcome!**, **You have successfully joined the corporate membership!** and a **Go to Portal** button. Access starts right away.

### If the invitation cannot be accepted

The page shows **Something Went Wrong** with one of these messages:

| Message | Why |
|---|---|
| **This invitation was sent to a different email address.** | The person is logged in with another account. They log out and use the invited address. |
| **This invitation has expired.** | The invitation is past its expiry time, 3 days by default. The owner sends a new one. |
| **This invitation link is invalid or has expired.** | The link is no longer valid, for example because it was cancelled or already used. |
| **You cannot join your own corporate membership as a sub-account.** | The owner opened their own invitation. |
| **You already have an active membership at this level.** | The person already holds this level. |
| **You already have an active sub-account under this corporate membership.** | The person already holds a seat on this team. |
| **All 10 seats are occupied. No more members can join.** | The team filled up after the invitation was sent. |
| **This corporate membership is no longer active.** | The owner's membership ended or was suspended after the invitation was sent. |
| **This team has just changed its plan. Open your invitation link again to join.** | The owner changed plan while the person was joining. |

## Resend or cancel a pending invitation

Open the three-dot menu on a **Pending** row:

- **View invitation:** Opens **Invitation details** with **Email**, **Invited by**, **Sent**, **Expires** and a **Join link** with a **Copy** button. The invitee must log in or sign up with the invited address. **Resend invitation** is also in the dialog, and **Close** dismisses it.
- **Resend invitation:** Emails the invitation again.
- **Cancel invitation:** Asks "Are you sure you want to cancel this invitation?" and, once confirmed, withdraws it and frees the reserved seat.

## Remove a team member

1. Open the three-dot menu on the member's row and click **Remove Member**. The item is only available for an **Active** seat.
2. Confirm. The box asks to remove the person from the team, tells the owner they lose the access this membership gives them, and says the seat is freed for someone else.

Their WordPress account and any other memberships they hold aren't affected.

## What happens when the owner's membership changes

Seats follow the owner's membership. If it's cancelled, expires or is suspended, every seat changes with it.

For the admin side, see [Corporate Memberships](/docs/levels/corporate-memberships) and [Corporate Members](/docs/members/corporate-members).
