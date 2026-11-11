---
title: "Upgrade Paths (Pro)"
description: "Let members move from one Native Payment plan to another, with an optional discount and proration."
---

# Upgrade Paths (Pro)

An **Upgrade Path** (Pro) allows a member to switch from one plan to another from their portal, with an optional credit toward the new plan. Use it to move members from a lower plan to a higher one, such as monthly to yearly.

You need **Fluent Members Pro** and a [Native Payment](/docs/levels/pricing-native) level with at least two plans. The **Upgrade Paths** tab appears on Native Payment levels only.

## Add an upgrade path

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Upgrade Paths** tab.
2. Click **Add Upgrade Path**.

    ![Screenshot of the Upgrade Paths tab with an arrow pointing to Add Upgrade Path](/images/levels/upgrade-paths/upgrade-paths-empty.webp)

3. Fill in the fields.

    ![Screenshot of the Add Upgrade Path modal with From Plan, To Plan(s), Discount Amount and Prorate](/images/levels/upgrade-paths/upgrade-paths-dialog.webp)

4. After that, click the **Save** button.

| Field | Notes |
|-------|-------|
| **From Plan** | The plan the member is on now. Required. You can't change it when editing a path. |
| **To Plan(s)** | One or more plans the member can move to. Required. |
| **Discount Amount** | Optional fixed amount taken off the first charge on the new plan. |
| **Prorate** (on by default) | Credits the unused days of the member's current billing period toward the new plan. |

## Manage upgrade paths

The tab lists each path with its **From Plan**, **To Plan**, **Discount Amount** and **Is Prorate** value. Use the three-dot menu on a row to **Edit** or **Delete** it.

![Screenshot of the Upgrade Paths table with one path](/images/levels/upgrade-paths/upgrade-paths-table.webp)

## What members see

A member with an active subscription on the **From Plan** sees **Upgrade Plan** in the **More Actions** menu of their membership in the [Member Portal](/docs/members/portal/membership-details). The subscription must be billed through Stripe or PayPal.update pathces
 

The dialog shows **Your current plan** and **Choose a plan to upgrade to**, with the price now and the credit for each target plan. The member selects a plan and clicks **Upgrade**.

![Screenshot of the Upgrade Plan dialog](/images/levels/upgrade-paths/upgrade-paths-member-dialog.webp)

The member's first charge is the new plan's price minus the proration credit and the **Discount Amount**. The total credit can't exceed the new plan's price. Later charges use the new plan's full price.

> [!Note]
> A target plan only appears when it's active and uses the same currency as the current plan. On a corporate level, a target plan is unavailable when the team has more people than the new plan has seats.
