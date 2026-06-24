---
chunk: 32
category: Pro Features
subcategory: Corporate Memberships
query-triggers: [corporate, corporate membership, team, seats, sub-member, invite, parent member, fmem_join, CorporateMembershipService, CorporatePortalController, team account]
related-chunks: [03, 05, 11]
source-files: [fluent-members-pro/app/Services/CorporateMembershipService.php, fluent-members-pro/app/Http/Controllers/CorporatePortalController.php, fluent-members/app/Models/MembershipUser.php]
doc-files: [guide/levels/corporate-memberships.md, guide/members/portal/corporate-seat-invites.md]
---

# Pro — Corporate Memberships

## What it is

A Corporate Membership allows one "parent" member to invite multiple sub-members. The parent buys one plan; their team members get access without purchasing individually.

---

## Level type

Set `type = 'corporate'` on the Membership Level (chunk #03). Only corporate-type levels support the invite flow.

---

## Database model

In `fmem_membership_users`:

| Field | Corporate parent | Sub-member |
|---|---|---|
| `parent_membership_id` | NULL | Parent's `id` in same table |
| `status` | `active` | `active` |
| `provider` | e.g. `native`, `woocommerce` | `manual` |

`MembershipUser::isCorporateParent()` → true when: `level.type = 'corporate'` AND `parent_membership_id IS NULL`.

---

## Invite flow (full sequence)

```
1. Parent member visits portal → Corporate tab → clicks "Invite Member"
2. POST /member-portal/{id}/corporate-invite { email: 'invitee@example.com' }
3. CorporateMembershipService::validateInvitationRequest()
   → rate limit: max 1 invite per email per hour (uses WP transient)
   → check: invitee is not already a sub-member of this parent
   → check: level.corporate_settings.max_members not exceeded
4. CorporateMembershipService::sendInvitationEmail()
   → generates token: Str::random(32)
   → stores token in DB with parent_membership_id + invitee_email
   → sends email with join URL: {site_url}?fmem_join={TOKEN}
5. Invitee clicks join URL → Fluent Members catches ?fmem_join parameter
6. If invitee is logged in:
   → Token validated → sub-member record created
7. If invitee is NOT logged in:
   → Shown login/register prompt
   → After login/register → token processed → sub-member created
8. Sub-member is enrolled: MembershipUser created with parent_membership_id = parent.id
```

---

## Rate limiting

`CorporateMembershipService::validateInvitationRequest()` uses WordPress transients:
- Key: `fmem_invite_rate_{parentId}_{inviteeEmail}`
- TTL: 3600 seconds (1 hour)
- If transient exists → `throw ValidationException('Too many invitations. Try again in 1 hour.')`

---

## Join URL token

- Token: `Str::random(32)` — 32-character random string
- Stored: in `fmem_meta` table (key: `corporate_invite_token_{token}`)
- Expires: configurable (default 24–48 hours)
- URL: `{site_url}?fmem_join={TOKEN}`

---

## Max seats

Corporate seat limit is stored in the level's `settings` JSON:

| Key | Type | Description |
|---|---|---|
| `corporate_settings.max_members` | int | Maximum sub-members this level allows (0 = unlimited) |

When max is reached, invites are rejected.

---

## Remove a sub-member (parent action)

`POST /member-portal/{id}/corporate-remove { sub_member_user_id: int }`

- Finds the sub-member's MembershipUser record where `parent_membership_id = id`
- Updates status to `cancelled`
- Revokes access immediately

---

## View corporate team (parent action)

`GET /member-portal/{id}/corporate-members`

Returns array of:
```php
[
    'user_id'     => int,
    'name'        => string,
    'email'       => string,
    'status'      => string,
    'joined_date' => datetime,
    'avatar'      => string (URL),
]
```

---

## Doc files

| File | Covers |
|---|---|
| `guide/levels/corporate-memberships.md` | Setting up corporate levels, seat limits |
| `guide/members/portal/corporate-seat-invites.md` | Invite flow, removing members |
