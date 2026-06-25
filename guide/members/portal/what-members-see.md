# Member Portal: What Members See

A tour of the portal page from the member's side. This is the page they hit when they click "My Account" in your menu. What they see depends on their login state, their memberships, and whether you have Fluent Members Pro active.
**Here's what you'll learn:**
- The three states a visitor can be in (logged out / logged in no membership / logged in with memberships).
- What each membership card contains.
- Which actions appear in free vs Pro.
- How corporate parents see their team.

**Before we start:** You've [set up the portal](./setup). Open it as a member to follow along.

::: warning Screenshots pending
The front-end portal screenshots aren't in our reference folder yet. When you share them, they'll fit at the noted spots.

[Screenshot needed: front-end Member Portal page rendered for a logged-in active member]
:::

---

## State 1: Logged out

A visitor who isn't signed in sees a small box: *"Please log in to view your membership."* plus a sign-in link to your standard WordPress login.

::: tip Customise this if your login is non-standard
If you use a separate signin page (e.g. a custom Fluent Forms login), point the sign-in link there with WP's standard `wp_login_url()` filter or with the [Login Popup](/guide/settings/login-popup) settings.
:::

---

## State 2, Logged in, no memberships

A visitor who's logged in but holds no membership rows sees an empty-state card with a CTA to your pricing page:

*"You don't have any active memberships. [See plans](#)"*

Configure that CTA's link to your pricing page (where `[fluent_membership_level]` lives) in the future once the plugin exposes a setting; in 1.0 the link uses a default fallback.

---

## State 3: Logged in with one or more memberships

The most common case. The portal shows one **card per membership** the user holds.

### Each card displays:

- **Title**: the Plan title (e.g. *Monthly*) and Level name (e.g. *Pro Yoga*).
- **Status badge**: colored pill: Active / Trial / Pending / Cancelled / Expired / Suspended.
- **Start date**: when the membership was created.
- **Expires**: the expiry date, *Lifetime*, or *N/A*.
- **Amount**: original price.
- **Provider**, *FluentCart*, *Native Payment (Stripe)*, *Fluent Forms*, etc.

### Action buttons (depending on status and Pro)

| Button                          | Visible when…                                            | Free | Pro |
|----------------------------------|----------------------------------------------------------|:--:|:--:|
| **Cancel Membership**           | Status is `Active` or `Trial`.                          | ✅ | ✅ |
| **Update Payment Method**       | Status is `Active`/`Trial` and provider is Native Payment. |, | ✅ |
| **Renew**                       | Status is `Expired` and the subscription is renewable.   |, | ✅ |

---

## Corporate parents, the Team panel (Pro)

If the member holds a corporate parent membership, the portal adds a **Team Members** panel:

- A list of currently invited members, each with a status (Active, Pending invite, Expired).
- A **Send Invitation** button.
- A **Cancel** kebab on each row to remove a sub-member.

The full corporate flow is in [Corporate Seat Invites](./corporate-seat-invites).

::: tip In plain language
The portal shows the *parent* a team panel; sub-members never see the panel, they just see their own membership card, exactly like an Individual member would.
:::

---

## The portal updates live

Most actions update the portal in place, without a full page reload. Cancel a membership and the card immediately changes its status pill to *Cancelled*; remove a teammate and the team panel re-renders the seat count. Behind the scenes, the portal is a small Vue app calling the plugin's REST endpoints.

---

## A real example: Mike checks his Pro Yoga subscription

Mike has been on Pro Yoga for 6 months. He visits *My Yoga Membership*:

- He's logged in → State 3.
- One card: *Monthly · Pro Yoga · Active · Started Jan 1, 2026 · Expires Feb 1, 2026 (recurring) · $19.00 · Native Payment*.
- Three buttons: **Cancel Membership** · **Update Payment Method** · *(no Renew, he's not expired)*.

He clicks Cancel; the card updates without a reload to show *Cancelled*. He'll keep access until his current period ends (because Sara configured end-of-period cancellation).

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Portal renders for one member but not another | A page-cache plugin caches the rendered HTML across users. | Exclude the portal URL from cache, or use object cache only. |
| Pro buttons missing for paying members | Provider is FluentCart or another paywall, not Native Payment, Pro's portal buttons only work with Stripe-driven subs. | This is expected; tell members to manage through the provider's own portal. |
| Corporate Team panel is missing | The member holds an Individual Level, or is a sub-member rather than the parent. | Confirm the Level is Corporate; confirm this user is the parent. |
| Card shows status `Pending` and no actions | Payment hasn't confirmed yet. | Check Transactions / provider logs. |

---

## What's next?

- **→ [Cancelling a Membership](./cancelling)**: the cancel flow in detail.
- **→ [🔒 Pro · Updating Payment Method](./updating-payment-method)**: the Stripe-Elements flow inside the portal.
- **→ [🔒 Pro · Corporate Seat Invites](./corporate-seat-invites)**: the Team panel walkthrough.

**Recommended reading:**
- [Setup](./setup): get the page itself in place.
- [Membership Statuses](/reference/membership-statuses): what each badge means.
