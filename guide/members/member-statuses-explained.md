# Member Statuses Explained

A member can be in one of six states. Each state controls access, billing, and what they see in the portal. Here's what each one means, in plain English.

**Here's what you'll learn:**
- The six possible membership statuses
- What access each status grants (or doesn't)
- Who sets which status (system vs admin vs member)
- How statuses move (the lifecycle)
- Common status scenarios with real examples

**Before we start:** You don't need any prior setup to read this page — it's reference. But you'll get more from it after reading [Managing Members](./managing-members.md).

---

## The six statuses at a glance

| Status | Access? | Set by | Typical cause |
|---|---|---|---|
| **active** | ✅ Yes | System / Admin | Successful payment or manual grant |
| **trial** | ✅ Yes | System | Signed up during a trial period |
| **suspended** | ❌ No | Admin | Payment dispute, policy violation |
| **expired** | ❌ No | System (cron) | Membership end date passed without renewal |
| **upgraded** | ❌ No | System | Member moved to a higher plan |
| **cancelled** | ❌ No | Member / Admin | Member cancelled from the portal, or admin cancelled |

::: tip In everyday words
Only `active` and `trial` grant access. Everything else blocks content.
:::

---

## Each status in detail

### `active` — the everyday state

The normal, paying member. They have access to everything their Level unlocks.

- **Who sets it?** The payment plugin on successful payment. Also set manually by admins.
- **Can they lose access mid-period?** Only if an admin suspends, cancels, or the membership expires.

### `trial` — the grace period

A member in their introductory trial phase. Same access as `active` — no restrictions. The only difference is billing: they haven't been charged yet (or they've been charged a reduced trial amount, depending on the plan).

- **Who sets it?** The payment plugin at checkout if a trial is configured.
- **What happens when the trial ends?** The plugin processes the first real charge. If successful, status flips to `active`. If the charge fails, status typically flips to `suspended` or `cancelled` based on the provider.

### `suspended` — paused, recoverable

A temporary block. The member's record is intact, but they can't access content. An admin put them in this state manually — usually because of a payment dispute, policy violation, or a pause request.

- **Who sets it?** Admins only.
- **Can they recover?** Yes — an admin can unsuspend them. Status goes back to `active`.
- **Do they see something special?** The [Member Portal](../member-portal/setup.md) shows their status as Suspended. Protected content gives the normal non-member treatment.

### `expired` — end date reached

The membership's `expires_at` date has passed and no renewal happened.

- **Who sets it?** Fluent Members' built-in cron job. It runs on WordPress's `wp_cron` schedule and flips `active` → `expired` when the end date is in the past.
- **Can they recover?** Yes — renewal through the payment plugin auto-reactivates them; or an admin can manually extend the expiry date.

### `upgraded` — they moved to a better plan

A historical marker. When a member moves from one Level to another (typically to a higher tier), the old membership record is marked `upgraded`. A new membership record is created for the new Level.

This preserves the journey — you can still see *"Joe was on Starter before moving to Pro."*

- **Who sets it?** The system, during a plan-change operation.
- **Access?** The old `upgraded` record grants no access; the new `active` record does.

### `cancelled` — they're out

The member explicitly cancelled (or was cancelled by an admin). Access is revoked.

- **Who sets it?** The member (from the Member Portal) or an admin.
- **Can they recover?** An admin can reactivate them by editing the record and changing the status back, but best practice is to create a new record.
- **Is this the same as deleted?** No. The record stays in the database for reporting.

---

## The typical lifecycle

A common journey looks like this:

```
Signup (with trial)
     ↓
  trial → active (after trial ends, payment succeeds)
     ↓
  active → expired (end date passes)
     ↓
  expired → active (if they renew)
     OR
  active → cancelled (if they cancel from portal)
```

And an upgrade journey:

```
active on Level A
     ↓
  [buy Level B]
     ↓
  old record: upgraded
  new record on Level B: active
```

---

## What members see, by status

Here's what's visible in the portal for each status:

| Status | Portal view |
|---|---|
| active | Full — membership details, cancel button, team panel (if corporate) |
| trial | Full, with a trial countdown |
| suspended | Read-only record; note explaining the suspension |
| expired | "Your membership expired on X. Renew to regain access." |
| upgraded | Typically hidden from the portal (the new active record shows instead) |
| cancelled | "Your membership was cancelled on X. You can resubscribe from the pricing page." |

---

## A real example — walking Sara's member Mike

**Jan 1** — Mike signs up with a 7-day trial. Status = `trial`.
**Jan 8** — Trial ends, card charges $19. Status = `active`.
**Feb 8** — Next charge fails. Payment plugin suspends. Status = `suspended`.
**Feb 10** — Mike updates his card. Payment plugin retries, success. Status = `active`.
**Mar 15** — Mike upgrades from Pro Monthly to Pro Annual.
  - Monthly record: status = `upgraded`
  - New Annual record: status = `active`
**Sep 5** — Mike's annual renews successfully. Record stays `active`.
**Dec 1** — Mike decides to cancel from the portal. Status = `cancelled`. Access revoked.

One member, many statuses over time — all visible as a history in Mike's member detail view.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Member says "I renewed but I still can't log in" | Status stuck on `expired` because the cron didn't update yet | Re-save the member or wait for next cron run; check provider webhook |
| `upgraded` status shown to a member who still has access | They see the *new* record, not the old one — the old record is historical | That's normal |
| All expired members still have access | `wp_cron` may be disabled; use a real cron replacement | Set up a server cron job hitting `wp-cron.php` |
| Status changes aren't emailing the member | Depends on your [Email Notifications](../settings/email-notifications.md) setup | Configure per-event emails |

---

## What's next?

**→ [Upgrading plans](./upgrading-plans.md)** — how the `upgraded` status actually gets set.

**Related reading:**
- [Managing Members](./managing-members.md) — the list and filters
- [Member Portal](../member-portal/setup.md) — what members see
- [FluentCRM integration](../integrations/fluent-crm.md) — trigger automations on each status change
