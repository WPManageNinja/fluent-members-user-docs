---
title: Adding a Membership Manually
description: Give a WordPress user a membership from the admin without taking a payment, and see how the expiry date is set.
---

# Adding a Membership Manually

**Add Membership** gives a person a membership from the admin, with no purchase and no charge. Use it for staff accounts, reviewers, or members who paid outside your site.

To add several people to one level at once, use [Members on a level](/docs/levels/members-on-a-level) instead.

## Before you start

- The person needs a WordPress account. If they don't have one, create it under **Users → Add New** first.
- You need an active [Membership Level](/docs/levels/) with at least one pricing plan.

## Add the membership

1. Go to **Fluent Members → Members**. If the person holds no membership yet, click the **No Membership** tab, because the default tab lists only people who hold one.

    ![Screenshot of the Members screen on the No Membership tab](/images/members/adding-manually/adding-manually-no-membership-tab.webp)

2. Click the person's row to open [Member Details](/docs/members/detail).
3. Click **Add Membership**.

    ![Screenshot of Member Details with an arrow pointing to the Add Membership button](/images/members/adding-manually/adding-manually-add-button.webp)

4. In the **Membership Level** dialog, click a level to expand it and see its plans. Each plan shows its name, ID, level, trial or setup fee if it has one, price, and type.
5. Click **Assign** on the plan you want.

    ![Screenshot of the Membership Level dialog with the Business level expanded and an arrow pointing to Assign](/images/members/adding-manually/adding-manually-assign-plan.webp)

The dialog closes and the new row appears in the **Memberships** table with the status **Active** and the provider **Manual**. No payment is taken, even if the plan has a price or setup fee.

## What the dialog shows

- **Already Assigned:** The person holds this plan with the status Active or Trial.
- **Assign** greyed out: The person is Active or on Trial on another plan of the same level. One person can hold only one live membership per level.
- **No pricing plans yet:** The level has no plans. Click **Add pricing plan** to create one.
- **There are no active membership levels:** Click **Manage Membership Levels** to create or activate a level.

![Screenshot of the Membership Level dialog with a plan marked Already Assigned](/images/members/adding-manually/adding-manually-already-assigned.webp)

## How the expiry date is set

The expiry date comes from the plan you pick:

| Plan | Expiry on the new membership |
|------|------------------------------|
| **One-time** | None. The row shows **Lifetime**. |
| **Subscription** with no trial | One billing interval from today. |
| **Subscription** with trial days | The number of trial days from today, and the status is still **Active**. |

> [!Note]
> Nothing renews a manual membership. When the expiry date passes, the status changes to **Expired** and access ends. To give ongoing access, pick a one-time plan.
