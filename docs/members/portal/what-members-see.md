---
title: "What Members See"
description: "What the Member Portal shows to visitors and members: the login prompt, profile, stats, notices and membership cards."
---

# What Members See

The **Member Portal** is the page where your members manage their own memberships. It changes with who is looking at it, so a visitor and a member see different things on the same page.

Visitors who are not logged in get a short login prompt. Members get their profile, a **Stats Overview** of their account and a card for every membership they hold. From each card they open the full membership details, where they can cancel, renew or update their payment method.

To put the portal on your site, see [Set up the Member Portal](/docs/members/portal/setup).

## Visitors who are not logged in

Visitors stay on the page and see "Please log in to view your memberships." with a **Log In** button. The button opens your login popup on the page, and its link goes to the WordPress login page and back to the portal.

![Screenshot of the portal prompt reading Please log in to view your memberships, with a Log In button](/images/members/portal/what-members-see/what-members-see-1.webp)

## Logged-in members

Members see these sections, top to bottom.

### Profile

The profile shows the member's avatar, display name, email address and **Registered on** date. The three-dot menu holds **Log Out**.

### Gateway notices

When a subscription was cancelled but may still be active at Stripe or PayPal, a notice appears here. See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

### Stats Overview

Up to four cards sum up the member's account. A card with nothing to report is left out.

| Card | Shows |
|---|---|
| **Active memberships** | How many memberships give access now, out of the member's total, such as **1** of **3**. Only **Active** and **Trial** memberships that have not ended count. |
| **Next payment** | The amount and date of the next subscription charge, such as **on** a date. It looks at active and trialing subscriptions whose next charge is still ahead. |
| **Expires next** | When the soonest access-giving membership ends. With 30 days or more left it shows the date. With fewer it counts down in days. When every live membership is lifetime, the card reads **Access** with **Lifetime**. |
| **Total spent** | The member's lifetime spend, with refunds taken off, marked **lifetime**. A member who paid in more than one currency sees the amounts listed together. |

> [!Note]
> **Total spent** and **Next payment** come from payments recorded by Fluent Members' own checkout (Pro). Memberships bought through FluentCart, WooCommerce, Fluent Forms or Paymattic record no payments in Fluent Members, so those cards stay hidden for them.

### Your memberships

**Your memberships** lists the member's memberships with a count beside the heading, such as **3 memberships**. Memberships that ended more than 30 days ago, and upgraded ones, are tucked away. A **Show N past memberships** link reveals them and **Hide past memberships** hides them again. If every membership is past, the list shows them all.

The list shows 5 cards per page. Below it, the member can move between pages and choose **3 / page**, **5 / page**, **10 / page**, **20 / page** or **50 / page**.

![Screenshot of the Member Portal with the profile, Stats Overview cards and two membership cards](/images/members/portal/what-members-see/what-members-see-2.webp)

Each card shows:

- **Level and status:** The Membership Level name and a badge: **Active**, **Trial**, **Suspended**, **Cancelled**, **Expired** or **Upgraded**. A trial counts down, such as **Trial: 5 days left**.
- **Start date:** For example, **Started** with the date.
- **Billing note:** **Part of your team's plan** for a seat. **Billing is managed in your orders** (the word **orders** links to the store's order history) or **Billing is managed where you purchased this membership** for FluentCart, WooCommerce, Fluent Forms and Paymattic memberships.
- **Access line:** **Renews** with a date when billing is ongoing and no cancellation is scheduled, **Expires** with a date, **Expired** with a date, or **Lifetime**.
- **Price:** The amount and its term, such as **per month**, **every 3 months** or **one-time**. It appears only where Fluent Members has the billing: Stripe and PayPal memberships, and memberships with a live Stripe or PayPal subscription. For a one-time purchase it is the amount actually charged. Seats and store-billed memberships show no price.
- **View plans:** An outline button on a lapsed membership with no live subscription, when a pricing page is set. It opens your pricing page.
- **Manage:** Opens the membership's details.

When a member holds no memberships, the list reads **You don't have any memberships yet.** with a **Browse memberships** button to your pricing page, when one is set.

Dates follow the date format set in **Settings → General** in WordPress.

## Actions on a membership

Cards hold no action except **Manage** and **View plans**. Everything else is on the [Membership Details](/docs/members/portal/membership-details) page, where the available actions depend on the membership:

- [Cancel a membership](/docs/members/portal/cancelling)
- [Update the payment method](/docs/members/portal/updating-payment-method) (Pro)
- [Renew a membership](/docs/members/portal/renewing-a-membership) (Pro)
- [Invite team members](/docs/members/portal/corporate-seat-invites) (Pro), for owners of a corporate membership
