# Adding a Member Manually

Grant someone a membership directly from the admin — no payment required. Perfect for comps, team members, testing, and imported users.

**Here's what you'll learn:**
- When manual adding is the right approach
- How to grant a Level to an existing user
- How to grant a Level to a new user you create
- How to set start/expiry dates
- What happens to notifications when you add manually

**Before we start:** You need at least one [Membership Level](../core-concepts/membership-levels.md) already created.

---

## When to add manually

- Comping a friend, affiliate, or influencer
- Giving staff access to member-only content
- Migrating members from a previous platform
- Creating a test account for QA
- Onboarding VIP clients who pay via invoice rather than online

If the member should pay through a checkout flow — don't add them manually. Send them to your pricing page instead.

---

## Method A — Grant access to an existing user

Use this when the person already has a WordPress account on your site.

1. Go to **Fluent Members → Members**.
2. Click **Add Member** at the top right.
   *A form opens.*
3. In the **User** field, start typing the user's email or name. Pick them from the dropdown.
4. Pick the **Membership Level** you want to grant.
5. Optionally set:
   - **Start Date** — defaults to today.
   - **Expires At** — leave blank for lifetime; or pick a future date.
   - **Status** — defaults to `active`. You can start them on `trial` if you want.
6. Click **Create**.

The user now has the membership. Access is immediate.

![Add member form](/images/members/add-member-form.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Members → Add Member
State: Form with user picked, level selected, start date today, expires blank
Highlight: The user search field
-->

---

## Method B — Create the user and grant access in one go

Use this when the person isn't yet on your site.

1. First, create the WordPress user: **Users → Add New**. Set their role, email, and send them a password reset.
2. Come back to **Fluent Members → Members → Add Member**.
3. Pick the newly-created user and follow Method A.

There isn't a combined "create user + assign membership" form — WordPress handles user creation separately. That's by design; Fluent Members doesn't duplicate user management.

---

## Setting dates carefully

| Field | What it does |
|---|---|
| **Start Date** | The anniversary point. Used for [content dripping](../content-protection/content-dripping.md). |
| **Expires At** | When the membership ends. Blank = lifetime. |

For a **lifetime** comp, leave Expires blank.
For a **30-day comp**, set Expires to today + 30 days.
For a **1-year** grant, set Expires to today + 1 year.

The Expires date is the moment the member's status flips to `expired` automatically (via the built-in cron job).

---

## Notifications when adding manually

When you add a member manually, Fluent Members fires the same `fluent_members/membership_level_assigned` event it fires for a paid signup. That means:

- If you've enabled the [Welcome Email](../settings/email-notifications.md), the new member gets one.
- If you've wired up the [FluentCRM trigger](../integrations/fluent-crm.md), the automation runs.

If you *don't* want the notification to fire (for example, you're importing members silently), temporarily disable the notification in **Settings → Email Notifications** before doing the import. Re-enable afterward.

---

## Corporate memberships — adding sub-members manually

For a corporate plan, you can also add a sub-member by hand from the admin:

1. Open the parent member's record.
2. In their corporate membership, find the **Team Members** panel.
3. Click **Add Sub-Member** (or equivalent), pick a WP user, and confirm.

The sub-member is linked to the parent and gets the same access. This bypasses the invitation-email flow — useful for pre-populating a company's team.

---

## A real example — Sara's team

Sara employs two part-time assistants who need access to her Full Library to preview lessons. They aren't paying — they're staff.

1. She creates two WordPress users for them via **Users → Add New**.
2. Goes to **Fluent Members → Members → Add Member**.
3. For each assistant, grants the **Pro Plan** Level with a blank expiry date (lifetime).
4. Leaves the Welcome Email *enabled*, so each assistant gets the same onboarding as a real member.

Now her team can see all content as a regular member would, and they experience the portal/email flow firsthand — useful for support.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| "User already has this membership" error | They do — duplicates not allowed on the same Level | Edit the existing record instead |
| Welcome email fires twice | Adding manually while the user bought via a provider at the same time | Do one or the other, not both |
| Start date is in the future but member has access right now | Dripping uses start date as anchor — general access isn't gated by start date | That's by design |
| Can't pick a user from the dropdown | They don't have a WordPress account yet | Create the WP user first |

---

## What's next?

**→ [Upgrading plans](./upgrading-plans.md)** — move a member to a different Level.

**Related reading:**
- [Managing Members](./managing-members.md) — the members list
- [Membership Statuses](../../reference/membership-statuses.md) — `active`, `trial`, `cancelled`, and friends
- [Email Notifications](../settings/email-notifications.md) — customise the welcome email
