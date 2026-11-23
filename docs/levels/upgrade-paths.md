---
title: "Upgrade Paths (Pro)"
description: "Let members move from one Native Payment plan to another, with an optional discount and proration."
---

# Upgrade Paths (Pro)

An **Upgrade Path** (Pro) lets a member switch from one plan to another from their portal, with an optional credit toward the new plan. Use it to move members from a lower plan to a higher one, such as monthly to yearly, or from one level to another.

You need **Fluent Members Pro** and a [Native Payment](/docs/levels/pricing-native) level. The **Upgrade Paths** tab appears on Native Payment levels only. On any other level, the tab says "Upgrade paths are only available for levels using native payments."

## Add an upgrade path

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Upgrade Paths** tab.
2. Click **Add Upgrade Path**.
3. Fill in the fields.
4. Click **Save**.

<!-- TODO(screenshot): upgrade-paths-1
  screen: Add Upgrade Path dialog on a Native Payment level
  state: From Plan chosen, two To Plans chosen from This level and another level, discount entered, Prorate ticked
  data: From Pro Monthly, to Pro Yearly and Team: Team Monthly
  highlight: the To Plans field and the Prorate checkbox
  view: admin
  alt: Screenshot of the Add Upgrade Path dialog with From Plan, To Plans, Discount Amount and Prorate
-->

| Field | Notes |
|-------|-------|
| **From Plan** | One of this level's plans: the plan the member is on now. Required. You can't change it when editing a path. |
| **To Plans** | One or more plans the member can move to. Required. The list groups plans under **This level** and under other Native Payment levels. |
| **Discount Amount** | Optional fixed amount taken off the first charge on the new plan. |
| **Prorate** (on by default) | Credits the unused part of the member's current billing period toward the new plan. |

In **To Plans**, a plan is greyed out when it:

- uses a different currency from the **From Plan** (tagged **Different currency**), or
- sits on an individual level while the **From Plan** is on a team level (tagged **Individual level**). A team plan can only be upgraded to another team plan.

## Manage upgrade paths

The tab lists each path with its **From Plan**, **To Plan**, **Discount Amount** and **Prorate** (**Yes** or **No**). A **To Plan** from another level shows the level's name before the plan, such as `Team: Team Monthly`. Use the three-dot menu on a row to **Edit** or **Delete** it.

<!-- TODO(screenshot): upgrade-paths-2
  screen: Upgrade Paths tab of a Native Payment level
  state: one path listed with a discount and Prorate Yes, row menu open
  data: From Pro Monthly to Pro Yearly
  highlight: the From Plan, To Plan, Discount Amount and Prorate columns
  view: admin
  alt: Screenshot of the Upgrade Paths table with one path
-->

## What members see

A member sees **Upgrade Plan** in the actions menu of their membership in the [Member Portal](/docs/members/portal/membership-details) when all of these are true:

- Their subscription is **active**.
- It's billed through Stripe or PayPal.
- An upgrade path starts at their plan, and at least one target plan is active, on an active Native Payment level, and in the same currency.

The **Upgrade Plan** dialog shows **Your current plan** and **Choose a plan to upgrade to**, with what the member pays now for each target. The member selects a plan and clicks **Upgrade**.

The member's first charge is the new plan's price minus the proration credit and the **Discount Amount**. The total credit can't exceed the new plan's price. Later charges use the new plan's full price. If two paths list the same target plan, the first path's terms apply.

> [!Note]
> When a team owner upgrades, a target plan is unavailable if the team has more people than the new plan has seats. The dialog tells the owner how many members to remove first.
