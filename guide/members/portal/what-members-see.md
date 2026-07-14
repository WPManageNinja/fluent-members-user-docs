# What Members See

The Member Portal renders differently depending on who is visiting and what memberships they hold. This page walks through each state a visitor can be in and what appears on screen.

## Logged Out

A visitor who is not signed in sees a simple prompt to log in. They are not redirected; the portal page stays in place and shows a sign-in link to your standard WordPress login page.

## Logged In (No Membership)

A member who is logged in but holds no membership rows sees an empty state with a link directing them to your pricing page. No membership cards or action buttons are shown.

## Logged In (With Memberships)

This is the most common case. The portal shows one card per membership the member holds. A member with multiple memberships sees multiple cards stacked on the same page.

![Member dashboard](/images/members/portal-setup/memeber-dashboard-2.webp)

### What Each Membership Card Shows

Each membership card displays the following details:

 * **Plan & Level:** Shows the pricing plan and the assigned membership level (for example, Monthly · Pro Access).
 * **Status:** Displays the current membership status, such as **Active, Trial, Pending, Cancelled, Expired, or Suspended**.
 * **Start Date:** The date the membership was created.
 * **Expires:** Shows the membership expiration date, **Lifetime** for lifetime memberships, or remains blank if the membership is not active.
 * **Amount:** The amount paid when the membership was purchased.
 * **Provider:** Indicates the source of the membership, such as **FluentCart, Native Payment, or Fluent Forms**.

### Action Buttons

The buttons available on each card depend on the membership status and whether Pro is installed:

| Button | When it appears | Free | Pro |
|---|---|:---:|:---:|
| **Cancel Membership** | Status is `Active` or `Trial` | ✅ | ✅ |
| **Update Payment Method** | Status is `Active` or `Trial`, provider is Native Payment (Stripe) | — | ✅ |
| **Renew** | Status is `Expired` and the subscription is renewable | — | ✅ |

Actions update the card immediately without a full page reload. Cancelling a membership changes the status pill to `Cancelled` in place.

## Corporate Team Panel (Pro)

Members who hold a **corporate parent** membership see an additional **Team Members** panel below their membership card. The panel shows:

- A list of invited sub-members with each one's current status (Active, Pending, Expired)
- A **Send Invitation** button to invite new seat holders by email
- A remove option on each row to revoke a seat

Sub-members do not see the Team panel; they see only their own membership card, the same as any individual member.

For the full invite and seat management flow, see [Corporate Seat Invites](/guide/members/portal/corporate-seat-invites).

