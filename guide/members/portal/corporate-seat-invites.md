# Corporate Seat Invites

::: info Part of Chain 5: Member self-serve · step 6 of 6
**Previously:** [Renewing a Failed Subscription](/guide/members/portal/renewing-a-failed-subscription)

**Also part of:** Chain 6: Corporate (step 3 of 3)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
The Team panel and the invite flow are Pro features. The parent's portal shows nothing extra in free; sub-members never see the Team panel.
:::

The front-end walkthrough of how a corporate parent invites their teammates and how those teammates accept. Pair this with the admin-side [Corporate Memberships](../../levels/corporate-memberships) page.

**Here's what you'll learn:**
- The Team Members panel layout.
- The single-email and bulk invite flows.
- What the invitee receives in email.
- The accept flow on the teammate's side.
- How to remove a teammate.

**Before we start:** The parent is signed in and holds an Active or Trial corporate-typed membership.

::: warning Screenshot pending
Front-end screenshots of the Team panel and the join-confirmation page aren't in our reference folder yet.

[Screenshot needed: front-end Member Portal showing the Team Members panel for a corporate parent]
:::

---

## The Team panel

The parent's portal shows their membership card plus a **Team Members** panel underneath. The panel has:

- **Seats counter**, "5 of 10 seats used" (or "5 used" with no cap if Maximum Member is empty).
- **Team list**: one row per sub-member, with their email, status (Active / Pending invite / Expired), join date, and a kebab (⋮) for actions.
- **Send Invitation** button, opens the invite modal.

---

## Step 1: Parent sends an invitation

Parent clicks **Send Invitation**. A modal opens with a single field: **Email**. They type the teammate's email. Click **Send**.

The plugin:

1. Validates the email format.
2. Confirms there's a seat free (`child_count < Maximum Member`, unless that's empty).
3. Generates a single-use join token.
4. Fires the Welcome Email's "invitation" variant to that address (subject configurable in [Email Notifications](/guide/settings/email-configuration/email-notifications)).
5. Records a `Pending invite` row in the Team panel.

::: tip Bulk invites
1.0 invites one at a time via the modal. For mass invites, paste-separated emails work in some installs (the modal accepts comma-separated input). For a true bulk import (CSV upload), use the admin-side path: open each sub-member's WP user account and run [Add Membership Manually](../adding-manually).
:::

---

## Step 2: Teammate clicks the invite link

The invite email contains a link of the form:

```
https://yoursite.com/?fluent_members_corporate_join=abc123XYZ
```

The teammate clicks. Three possible states:

| State | What they see |
|---|---|
| **Logged out** | Login / register form. After signing in or registering, they're shown the join-confirmation page. |
| **Logged in, matching email** | The join-confirmation page directly. |
| **Logged in, different user** | A notice: *"This invite is for someone else. Please sign out and try again."* |

On the join-confirmation page they see: *"[Parent's company name] has invited you to join [Level title]. Accept?"* with **Accept** and **Decline** buttons.

::: tip Single-use tokens
Each invite generates a unique token, valid until accepted (or until the parent revokes/re-issues). If the token is in the wrong hands, the parent can simply send a fresh invite from the Team panel; the old link becomes invalid.
:::

---

## Step 3: They click Accept

The plugin:

1. Validates the token.
2. Creates a new membership row for them with `parent_membership_id` pointing at the parent's row.
3. Fires `fluent_members/membership_level_assigned` so the Welcome Email goes out and CRM triggers fire.
4. The teammate lands on a "You're in!" confirmation page with a link to your protected content.

Their portal now shows a normal membership card, Pro Yoga or whatever the parent has. They cannot Cancel, Update Payment Method, or do anything billing-related. That's the parent's job.

---

## Step 4: Parent removes a teammate

In the Team panel, the parent finds the row → kebab (⋮) → **Cancel**.

The sub-member's membership row flips to `Cancelled`. Their seat is freed; the parent can invite someone else into it.

::: warning Removal is per-membership, not per-user
Cancelling a sub-member only ends *this specific membership*. Their WordPress account stays alive. If they hold other memberships on the site (rare but possible), those are unaffected.
:::

---

## What happens when the parent cancels

See [Corporate Memberships → Cascade](../../levels/corporate-memberships#cascade). Short version: every sub-member's row mirrors the parent's new status (Cancelled / Expired / Suspended). The team plan ends as a single unit — but the underlying lifecycle hooks fire **once per child**, not once for the whole team, so CRMs and analytics subscribed to those hooks will see N+1 events on a 10-seat cancel.

---

## A real example: BlueWave Agency invites their staff

Angela buys the *Team Plan* (10 seats). She:

1. Opens the portal → Team Members panel shows *0 of 10 seats used*.
2. Clicks **Send Invitation** → enters `tom@bluewave.com` → Send.
3. Tom gets an email. Clicks the link. He's not signed in, so registers a WP account, then accepts.
4. Tom's seat shows up in Angela's panel: *Active · joined Jun 17*.
5. Angela invites four more colleagues over the next few days. Panel shows *5 of 10 seats used*.
6. One colleague leaves the company. Angela opens the row → kebab → Cancel. Now *4 of 10 seats used* and she can invite their replacement.

The parent does everything; sub-members just click links.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Team panel missing in the portal | The user holds an Individual (not Corporate) Level, or they're a sub-member rather than the parent. | Confirm Level type and parent vs child. |
| Send Invitation says "Seats are full" | Maximum Member reached. | Remove an existing sub-member, or raise the seat cap. |
| Invite email never arrives | Site's outgoing mail isn't reaching the address. | See [Troubleshooting → Email not arriving](/reference/troubleshooting). |
| Teammate clicks the link and sees "This invite is for someone else" | They're logged in as a different WP user. | Sign out, then retry. |

---

## What's next?

- **→ [Corporate Memberships](../../levels/corporate-memberships)**: the admin-side configuration.
- **→ [What Members See](./what-members-see)**: what the team-panel-less sub-members look at.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): cascade rules for parents and children.
- [Setup](./setup): make sure the portal page exists first.
