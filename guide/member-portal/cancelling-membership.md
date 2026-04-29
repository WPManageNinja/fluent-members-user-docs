# Cancelling a Membership (From the Portal)

How members cancel their own memberships — and exactly what happens when they do.

**Here's what you'll learn:**
- What the cancel button does (and doesn't do)
- What members see when they confirm
- How the cancellation flows through to your payment provider
- Admin-side cancellations (for comparison)
- How to handle edge cases (sub-members, corporate parents)

**Before we start:** You need the [Member Portal set up](./setup.md) and a test member to walk through with.

---

## The member's experience

From the member's perspective:

1. Log in to your site.
2. Open the Member Portal page.
3. Click **Cancel Membership** on the membership card.
4. A modal appears: *"Are you sure you want to cancel? You'll lose access immediately."*
5. Click **Confirm Cancellation**.
6. The card updates to show a cancelled state, and a short message confirms.

![Cancel membership modal](/images/member-portal/cancel-modal.png)
<!-- SCREENSHOT-NEEDED
Page: Member Portal (frontend) with cancel modal open
State: Modal asking "Are you sure?", Confirm/Cancel buttons
Highlight: The modal
-->

That's it from the member's side.

---

## What happens behind the scenes

When the cancel action fires:

1. The portal calls the `fluent-members/v2` API, posting a cancellation request with the membership ID.
2. Fluent Members verifies:
   - The logged-in user owns this membership
   - The membership is in a cancellable state (`active` or `trial`)
3. Status is set to `cancelled`.
4. The `expires_at` field is set to now (if it wasn't already in the past).
5. The `fluent_members/membership_cancelled` action fires.
6. **If the payment provider supports it**, the recurring subscription is cancelled at the provider too.
7. The portal updates to show the new state.

Access to protected content is revoked immediately — the next page load will show the restriction action.

---

## Access until end-of-period vs immediate access loss

Fluent Members' portal cancellation is **immediate** — the member loses access right away, even if they've paid for the rest of the month. This is the simplest, clearest model.

If your business needs *"access continues until the paid-through date"*:
- Set the payment provider to cancel the **subscription** but leave the **current period** active.
- Then the member's status stays `active` until the provider sends the "period ended" webhook.
- Fluent Members respects whatever status the provider sends.

This is configured in your payment plugin, not in Fluent Members.

---

## Corporate sub-members — can they cancel?

By default, **sub-members cannot cancel** — only the parent owns the billing relationship.

Sub-members see their membership card in the portal but without a cancel button. If they want out, they contact the parent, who removes them from the team panel.

---

## When the parent cancels a Corporate plan

If a corporate parent cancels their plan from the portal, here's what happens to sub-members:

1. Parent's status → `cancelled`.
2. All sub-members → `cancelled`.
3. Every sub-member loses access immediately.

This is a fan-out cascade. Think carefully before a corporate parent cancels — their entire team loses access.

::: warning Parent confirmation
Some sites add a custom warning modal to corporate parent cancellations: *"You're cancelling for 10 team members. Are you sure?"* This is a recommended UX enhancement but not part of the default.
:::

---

## Admin-side cancellations

Admins can also cancel memberships from **Fluent Members → Members**. The mechanics are identical:
- Status → `cancelled`
- Access revoked
- Subscription (if applicable) cancelled at the provider

The difference is context:
- **Member cancels** → treated as voluntary
- **Admin cancels** → treated as forced (policy violation, chargeback, etc.)

Internally, both paths call the same cancellation API.

---

## Reactivation

A cancelled member can come back in two ways:

**Option 1 — Repurchase.** They go to your pricing page and buy again. Fluent Members creates a new `active` membership record. Their old `cancelled` record stays in history.

**Option 2 — Admin reactivation.** An admin edits the old record and changes the status back to `active`. Best when it was a mistake, a chargeback reversed, or you want to win them back personally.

---

## A real example — Mike cancels

Mike has a Pro Monthly membership. His card is being auto-renewed on the 1st of each month.

- **Mar 15**: Mike clicks Cancel in the portal.
- Fluent Members flips his status to `cancelled`.
- It also calls FluentCart's subscription API: cancel the recurring charge.
- FluentCart stops the next scheduled charge.
- Mike's portal updates: *"Your membership was cancelled on Mar 15."*
- Mike immediately loses access to protected content.

If Mike changes his mind the next day, he can resubscribe at pricing page → new record → fresh `active`.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Cancel button doesn't appear | Membership isn't `active` or `trial` | Check status |
| Member cancelled but still being charged | Provider webhook didn't fire back, or the provider's subscription wasn't cancelled | Check your payment plugin's subscription list |
| Cancelled member still has access | Aggressive caching serving stale pages | Clear cache for that user / page |
| Sub-member sees a cancel button (shouldn't) | Custom theme override — default hides it | Check custom code / theme filters |

---

## What's next?

Back to [Member Portal Setup](./setup.md).

**Related reading:**
- [Membership Statuses](../../reference/membership-statuses.md) — `cancelled` in context
- [Managing Members](../members/managing-members.md) — admin-side view
- [Email Notifications](../settings/email-notifications.md) — send a "sorry to see you go" email
