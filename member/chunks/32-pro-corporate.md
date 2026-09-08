---
chunk: 32
category: Pro Features
subcategory: Corporate Memberships
query-triggers: [corporate, corporate membership, team, seats, sub-member, sub-account, invite, parent member, fmem_join, CorporateMembershipService, CorporatePortalController, CorporateJoinHandler, team account, max_members]
related-chunks: [03, 05, 11]
source-files: [fluent-members-pro/app/Services/CorporateMembershipService.php, fluent-members-pro/app/Http/Controllers/CorporatePortalController.php, fluent-members-pro/app/Hooks/Handlers/CorporateJoinHandler.php, fluent-members/app/Models/MembershipUser.php, fluent-members/app/Models/MembershipLevel.php]
doc-files: [guide/levels/corporate-memberships.md, guide/members/portal/corporate-seat-invites.md]
---

# Pro — Corporate Memberships

## What it is

A Corporate Membership lets one "parent" member invite multiple sub-accounts. The parent buys one plan; their team members get access without purchasing individually.

---

## Level setup

Set `type = 'corporate'` on the Membership Level (chunk #03) and give it a `max_members` value on `fmem_membership_levels` directly — it's a first-class column, not a nested `settings.corporate_settings` key. **`max_members` includes the buyer/parent seat** — available child seats = `max_members - 1`.

---

## Database model

In `fmem_membership_users`:

| Field | Corporate parent | Sub-account |
|---|---|---|
| `parent_membership_id` | NULL | Parent's `id` in the same table |
| `provider` | e.g. `stripe`, `paypal` | `corporate` |

`MembershipUser::isCorporateParent()` → true when `level.type = 'corporate'` AND `parent_membership_id IS NULL`.

---

## Invite flow — sending (REST)

`CorporatePortalController`:

| Method | Path | Action |
|---|---|---|
| GET | `/member-portal/{id}/corporate-members` | `getCorporateMembers` — list the team |
| POST | `/member-portal/{id}/corporate-invite` | `sendCorporateInvite` |
| POST | `/member-portal/{id}/corporate-remove` | `removeCorporateMember` |

`sendCorporateInvite` calls `CorporateMembershipService::sendInvitationEmail($parentMembership, $email, $inviterUser)`:
- Rejects if an invite to that email is still pending (`Meta` lookup, `object_type = 'corporate_invite'`) → `rate_limited` error
- Rejects if the parent membership is no longer active
- Sends an email with a join link: `{site_url}/?fmem_join={TOKEN}`
- Invitation expiry defaults to **3 days** (`DEFAULT_INVITATION_EXPIRY_DAYS`), filterable via `fluent_members/corporate_invitation_expiry_days`

---

## Invite flow — accepting (NOT a REST route)

The join link is handled by `CorporateJoinHandler` on WordPress's `template_redirect` hook — it's a server-rendered page flow, not an API call:

```
1. Invitee opens {site_url}/?fmem_join={TOKEN}
2. Token must match /^[a-zA-Z0-9]{20,64}$/ or the handler ignores it entirely
3. Not logged in  → renders a "log in first" view (wp_login_url() back to the same join URL)
4. Logged in, GET → CorporateMembershipService::getJoinInfo($token) + verifyInvitedEmail($token, $userId)
                     renders a confirm view: "{inviter} has invited you to join the {level} membership."
5. Logged in, POST (form submit with a per-token nonce fmem_accept_join_{token})
                  → CorporateMembershipService::acceptJoinToken($token, $userId)
                  → creates the sub-account MembershipUser, renders a success view
```

Rejections `acceptJoinToken`/`getJoinInfo`/`verifyInvitedEmail` can return (as `WP_Error`): `inactive_membership`, `not_corporate`, `self_join` (inviter tried to join their own team), `already_member`.

---

## CorporateMembershipService — full method list

| Method | Purpose |
|---|---|
| `sendInvitationEmail($parentMembership, $email, $inviterUser)` | Send the invite |
| `getJoinInfo($token)` | Info for the confirm screen |
| `verifyInvitedEmail($token, $userId)` | Confirm the logged-in user matches the invited email |
| `acceptJoinToken($token, $userId)` | Create the sub-account |
| `removeSubAccount($parentMembership, $childMembershipId, $requesterId)` | Parent removes a team member |
| `getSubAccounts($parentMembership, $filters = [])` | List a parent's team |
| `getActiveChildCount($parentMembershipId)` | Used against `max_members - 1` to enforce the seat cap |

---

## Remove a sub-account (parent action)

`POST /member-portal/{id}/corporate-remove` → `CorporatePortalController::removeCorporateMember` → `CorporateMembershipService::removeSubAccount()`. Cancels the sub-account's `MembershipUser` record and revokes access immediately.

---

## Doc files

| File | Covers |
|---|---|
| `guide/levels/corporate-memberships.md` | Setting up corporate levels, seat limits |
| `guide/members/portal/corporate-seat-invites.md` | Invite flow, removing members |
