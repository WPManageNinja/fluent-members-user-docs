---
chunk: 11
category: Member-Facing
subcategory: Member Portal
query-triggers: [member portal, fluent_member_portal, self-service, my account, cancel membership, corporate seat, invite, update payment method, renew subscription, portal setup, what members see]
related-chunks: [05, 12, 30, 31, 32]
source-files: [app/Http/Controllers/MemberPortalController.php, app/Hooks/Handlers/MemberPortalHandler.php, fluent-members-pro/app/Http/Controllers/CorporatePortalController.php]
doc-files: [guide/members/portal/setup.md, guide/members/portal/what-members-see.md, guide/members/portal/cancelling.md, guide/members/portal/corporate-seat-invites.md, guide/members/portal/updating-payment-method.md, guide/members/portal/renewing-a-failed-subscription.md]
---

# Member Portal

## What it is

A Vue.js front-end dashboard rendered by the `[fluent_member_portal]` shortcode. Members self-manage their memberships here. No attributes needed — the portal reads the logged-in user's data automatically.

---

## Shortcode

```
[fluent_member_portal]
```

**Attributes**: none.
**Logged-out visitors**: see a login prompt (not redirected).
**Setup**: create a WordPress page, paste the shortcode, then set that page in **Settings → General → Member Portal Page**.

---

## Free features in portal

| Feature | Description |
|---|---|
| Profile header | Name, avatar, email |
| Membership cards | One card per active membership showing level name, status, dates |
| Cancel button | Member can cancel their own membership (if allowed) |
| Login prompt | Shown to logged-out visitors |

---

## Pro features in portal

| Feature | Description |
|---|---|
| Corporate team panel | Parent member sees list of sub-members, can invite new ones or remove existing ones |
| Update payment method | Member can update their stored Stripe card |
| Renew failed subscription | Member can manually trigger renewal after a payment failure |

---

## Free API routes (auth: `PortalPolicy` = any logged-in user)

| Method | Path | Controller@method | Action |
|---|---|---|---|
| GET | `/member-portal` | `MemberPortalController@getMemberships` | List all memberships for current user |
| GET | `/member-portal/{id}` | `MemberPortalController@getMembership` | Get single membership detail |
| POST | `/member-portal/{id}/cancel` | `MemberPortalController@cancelMembership` | Self-cancel a membership |

---

## Pro API routes (auth: `AuthenticatedPolicy` = any logged-in user)

| Method | Path | Controller@method | Action |
|---|---|---|---|
| GET | `/member-portal/{id}/corporate-members` | `CorporatePortalController@getCorporateMembers` | List corporate sub-members |
| POST | `/member-portal/{id}/corporate-invite` | `CorporatePortalController@sendCorporateInvite` | Invite a sub-member by email |
| POST | `/member-portal/{id}/corporate-remove` | `CorporatePortalController@removeCorporateMember` | Remove a sub-member |
| POST | `/billing/subscriptions/{uuid}/renew` | `BillingActionController@renewSubscription` | Renew a failed subscription |
| POST | `/billing/subscriptions/{uuid}/payment-method/setup-intent` | `BillingActionController@createPaymentMethodSetupIntent` | Get Stripe setup intent for card update |
| POST | `/billing/subscriptions/{uuid}/payment-method/update` | `BillingActionController@updatePaymentMethod` | Save new card after setup intent |

---

## Portal page setup

1. Create a WordPress page with content `[fluent_member_portal]`
2. Publish it
3. Go to **Settings → General** → select the page in **Member Portal Page** dropdown
4. OR click **Generate Portal Page** button in Settings → General (auto-creates + assigns)

Settings option key: `portal_page_id` inside `fluent_members_general_settings`.

Doc: `guide/members/portal/setup.md`

---

## Cancellation flow

Member clicks Cancel → `POST /member-portal/{id}/cancel` → `MemberPortalController::cancelMembership()`:
1. Acquires a short-lived option-based lock (`fmem_portal_cancel_lock_{id}`, 60s TTL) so a double-click can't double-cancel.
2. Fires `fluent_members/portal_provider_cancel_membership` — a provider (Pro Stripe/PayPal, WooCommerce Subscriptions, etc.) can fully own the cancellation here and return `true` (synced locally), a `WP_Error`, or an array response.
3. If unhandled, checks the membership is `active`/`trial`, then fires `fluent_members/portal_cancel_membership` for a lighter override.
4. Falls back to `MembershipService::cancelMembership()` (sets status to `cancelled`), respecting the immediate vs end-of-period cancellation mode where a subscription integration is wired in.

Both cancellation and detail responses run through filters (`fluent_members/portal_memberships`, `fluent_members/portal_membership_detail`) that integrations can hook to reshape the data before it reaches the Vue app.

Doc: `guide/members/portal/cancelling.md`

---

## Corporate detail enrichment

`GET /member-portal/{id}` adds extra fields when `membership->isCorporateParent()` is true:
`is_corporate` (bool), `max_members` (int|null, from the level), `child_count` (active sub-members, counted from `fmem_membership_users` where `parent_membership_id` = this membership).

## Corporate invite flow

See chunk #32 for full invite token flow.

Doc: `guide/members/portal/corporate-seat-invites.md`

---

## Doc files

| File | Covers |
|---|---|
| `guide/members/portal/setup.md` | Creating the portal page, connecting it in Settings |
| `guide/members/portal/what-members-see.md` | Walkthrough of portal UI |
| `guide/members/portal/cancelling.md` | Self-cancel flow, what happens |
| `guide/members/portal/corporate-seat-invites.md` | Invite flow, seat limits, removing members |
| `guide/members/portal/updating-payment-method.md` | Stripe card update (Pro) |
| `guide/members/portal/renewing-a-failed-subscription.md` | Manual renewal after failed payment (Pro) |
