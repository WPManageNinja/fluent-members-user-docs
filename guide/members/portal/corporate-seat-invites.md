# Corporate Seat Invites

> [!Note]
> The Team panel and the invite flow require Fluent Members Pro. The parent's portal shows no Team panel in the free version, and sub-members never see the panel regardless of plan.


When a member holds a Corporate Membership, their portal includes a **Team Members** panel where they can invite teammates, monitor seat usage, and remove sub-members all without admin involvement. This page walks through that flow from the parent's side.

## The Team Members Panel

The corporate parent sees their membership card plus a **Team Members** panel below it. The panel shows:

- **Seats counter**: How many seats are used out of the allowed maximum (e.g. *5 of 10 seats used*). If no seat limit is set on the level, only the used count is shown.
- **Team list**: One row per sub-member with their name, email, status (Active / Pending / Expired), join date, and a remove action
- **Send Invitation** button opens the invite modal

## How to Invite a Teammate

1. The parent clicks **Send Invitation** in the Team Members panel.
2. A modal opens with a single **Email** field. They enter the teammate's email address and click **Send**.
3. The plugin validates the request it checks the email format, confirms a seat is available, and enforces a rate limit of one invite per email address per hour.
4. A unique single-use invite link is generated and emailed to the teammate.
5. A **Pending** row appears in the Team panel immediately.

## How the Teammate Accepts

The invite email contains a link in this format:

```
https://yoursite.com/?fmem_join=TOKEN
```

When the teammate clicks the link, one of three things happens depending on their login state:

| State | What they see |
|---|---|
| **Logged out** | A login or register prompt. After signing in, the join confirmation is shown automatically. |
| **Logged in (matching email)** | The join confirmation page directly. |
| **Logged in (different account)** | A notice asking them to sign out and retry with the correct account. |

On the join confirmation page they see the parent's plan name and **Accept** / **Decline** buttons. Clicking **Accept** creates their membership row and grants access immediately. Their portal then shows a normal membership card for the level; they cannot cancel, update a payment method, or take any billing action. Those belong to the parent.

::: tip Invite links are single-use
Each invite generates a unique token that expires once accepted. If the link lands in the wrong hands, the parent can simply send a new invite the old link becomes invalid.
:::

## How to Remove a Teammate

In the Team panel, the parent finds the sub-member's row and clicks the remove action. The sub-member's membership is cancelled immediately, their seat is freed, and the parent can invite a replacement.

::: warning Removal ends the membership, not the WordPress account
Removing a sub-member only cancels their membership on this Corporate Level. Their WordPress user account remains active, and any other memberships they hold on your site are unaffected.
:::

## What Happens When the Parent Cancels

When the parent's corporate membership is cancelled, expired, or suspended, every sub-member's row mirrors the new status automatically. The cascade fires one lifecycle hook per child row, so integrations like FluentCRM will see one event per sub-member, not one event for the whole team.

For the full admin-side configuration of corporate levels and seat limits, see [Corporate Memberships](/guide/levels/corporate-memberships).

## Important Notes

::: warning Things to keep in mind
- **Team panel is missing.** The panel only appears for a corporate parent. Confirm the Membership Level type is set to Corporate and that this user is the parent, not a sub-member.
- **"Seats are full" error when sending an invite.** The seat limit on the level has been reached. Remove an existing sub-member or raise the maximum in the level settings.
- **Invite email never arrived.** Your site's outgoing mail may not be reaching the address. Check your mail plugin or SMTP configuration.
- **Teammate sees "This invite is for someone else."** They are logged in as a different WordPress user. They need to sign out and retry with the correct account.
:::
