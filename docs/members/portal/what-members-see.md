---
title: "What Members See"
description: "What the Member Portal shows to visitors and members: the login prompt, profile, stats and membership cards."
---

# What Members See

The **Member Portal** changes with who is looking at it. Visitors get a login prompt, and members get their profile, stats and a card for each membership.

## Visitors who are not logged in

Visitors stay on the page and see a short prompt. **Log In** opens the WordPress login page and brings them back to the portal afterwards.

![Screenshot of the portal prompt reading Please log in to view your memberships, with a Log In button](/images/members/portal/what-members-see/what-members-see-logged-out.webp)

## Logged-in members

Members see three sections, top to bottom:

![Screenshot of the Member Portal with the member profile, Stats Overview cards and the Your memberships list](/images/members/portal-setup/memeber-dashboard-2.webp)

A logged-in person with no memberships still sees the profile and stats, with the text **You don't have any memberships yet.** in place of the list.

### Profile

The profile shows the member's avatar, display name, user ID, email address and registration date. The three-dot menu holds **Logout**.

### Stats Overview

Four cards sum up the member's account:

| Card | Shows |
|---|---|
| **Active Membership** | How many memberships give access now, out of the member's total. |
| **Next payment** | The amount and date of the next subscription charge. |
| **Next Expire** | When the next membership ends. |
| **Total Spent** | The member's lifetime spend. |

A card shows **N/A** when it has nothing to report.

### Your memberships

**Your memberships** lists every membership the member holds, including ended ones, with a count beside the heading. The list shows 5 cards per page, and the member can change that with the page size menu below it.

Each card shows:

- **Level and ID:** The Membership Level name and the membership ID, such as **Pro (#61)**.
- **Status:** **Active**, **Trial**, **Suspended**, **Cancelled**, **Expired** or **Upgraded**. A trial shows the days left, such as **Trial - 5 days**.
- **Start date:** For example, **Started 2026-09-27**.
- **Provider:** Where the membership came from, such as **FluentCart**, **WooCommerce**, **FluentForms**, **Paymattic**, **Corporate** or **Manual**.
- **End date:** **Expires** with a date, **Expired** with a date, **Lifetime access** or **N/A**.
- **Price:** The amount and its billing term, such as **$29.00 per month** or **one-time**.
- **Manage:** Opens the membership's details.

## Actions on a membership

Cards hold no action except **Manage**. Everything else is on the [Membership Details](/docs/members/portal/membership-details) page, where the available actions depend on the membership:

- [Cancel a membership](/docs/members/portal/cancelling)
- [Update the payment method](/docs/members/portal/updating-payment-method) (Pro)
- [Renew a membership](/docs/members/portal/renewing-a-membership) (Pro)
- [Invite team members](/docs/members/portal/corporate-seat-invites) (Pro), for owners of a corporate membership
