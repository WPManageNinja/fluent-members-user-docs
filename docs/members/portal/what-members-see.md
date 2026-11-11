---
title: "What Members See"
description: "What the Member Portal shows to visitors and members: the login prompt, profile, stats and membership cards."
---

# What Members See

The **Member Portal** is the page where your members manage their own memberships. It changes with who is looking at it, so a visitor and a member see different things on the same page.

Visitors who are not logged in get a short login prompt. Members get their profile, a **Stats Overview** of their account and a card for every membership they hold. From each card they open the full membership details, where they can cancel, renew or update their payment method.

Use this page to see exactly what your members see, for example before you answer a support question or add a membership to a level. To put the portal on your site, see [Set up the Member Portal](/docs/members/portal/setup).

## Visitors who are not logged in

Visitors stay on the page and see a short prompt. **Log In** opens the WordPress login page and brings them back to the portal afterwards.

![Screenshot of the portal prompt reading Please log in to view your memberships, with a Log In button](/images/members/portal/what-members-see/what-members-see-logged-out.webp)

## Logged-in members

Members see three sections, top to bottom:

A logged-in person with no memberships still sees the profile and stats, with the text **You don't have any memberships yet.** in place of the list.

### Profile

The profile shows the member's avatar, display name, user ID such as **#12**, email address and registration date, such as **Registered at** a date. The three-dot menu holds **Logout**.

![Screenshot of the Member Portal with the member profile, Stats Overview cards and the Your memberships list](/images/members/portal-setup/memeber-dashboard-2.webp)

### Stats Overview

Four cards sum up the member's account:

| Card | Shows |
|---|---|
| **Active Membership** | How many memberships give access now, out of the member's total, such as **1** with **of 3**. Only **Active** and **Trial** memberships that have not ended count. |
| **Next payment** | The amount and date of the next subscription charge, such as **on** a date. It looks at active and trialing subscriptions whose next charge is still ahead. |
| **Next Expire** | When the soonest access-giving membership ends. With 30 days or more left it shows the date. With fewer it counts down, such as **12** with **days**. |
| **Total Spent** | The member's lifetime spend, with refunds taken off. If the member paid in more than one currency, the amounts are listed together. |

A card shows **N/A** when it has nothing to report.

> [!Note]
> **Total Spent** counts payments taken through Fluent Members' own checkout (Pro) in live mode. Test and sandbox payments are left out. Memberships bought through FluentCart, WooCommerce, Fluent Forms or Paymattic record no payments in Fluent Members, so the card reads **N/A** for them.

### Your memberships

**Your memberships** lists every membership the member holds, including ended ones, with a count beside the heading. The list shows 5 cards per page. Below it, the member can move between pages and choose **3 / page**, **5 / page**, **10 / page**, **20 / page** or **50 / page**.

Each card shows:

- **Level and ID:** The Membership Level name and the membership ID, such as **Pro (#61)**.
- **Status:** **Active**, **Trial**, **Suspended**, **Cancelled**, **Expired** or **Upgraded**. A trial shows the days left, such as **Trial - 5 days**.
- **Start date:** For example, **Started September 27, 2026**.
- **Paid via:** Where the membership came from, such as **FluentCart**, **WooCommerce**, **FluentForms**, **Paymattic**, **Corporate** or **Manual**.
- **End date:** **Expires** with a date, **Expired** with a date, **Lifetime access** or **N/A**. A membership that ended shows **N/A** when it has no past end date.
- **Price:** The amount and its billing term, such as **$29.00 per month** or **one-time**.
- **Manage:** Opens the membership's details.

Dates follow the date format set in **Settings → General** in WordPress.

## Actions on a membership

Cards hold no action except **Manage**. Everything else is on the [Membership Details](/docs/members/portal/membership-details) page, where the available actions depend on the membership:

- [Cancel a membership](/docs/members/portal/cancelling)
- [Update the payment method](/docs/members/portal/updating-payment-method) (Pro)
- [Renew a membership](/docs/members/portal/renewing-a-membership) (Pro)
- [Invite team members](/docs/members/portal/corporate-seat-invites) (Pro), for owners of a corporate membership
