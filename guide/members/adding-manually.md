# Adding a Membership Manually

Fluent Members lets you assign a membership to any WordPress user directly from the admin — without requiring them to purchase. This is useful for comping staff accounts, fixing a missed webhook, granting beta access, or migrating members from another platform.

#### Before You Start

- The user must already have a WordPress account on your site. If they do not, create one first via **Users → Add New**.
- At least one [Membership Level](../levels/) with at least one Pricing Plan must exist.

## How to Add a Membership

1. Go to **Fluent Members → Members**.
2. Find the user by name or email using the search field, then click their row to open the [Member Detail](./detail) page.
3. Click the **+ Add Membership** button at the top-right of the Memberships table.

![ Add Membership](/images/members/adding-memberships/manually-add-membership-1.webp)

4. The **Add Membership** modal opens. Each Level appears as a collapsible section — click a Level to expand it and see its available Pricing Plans.
5. Each Pricing Plan card shows the plan name, price, billing interval, trial days, and provider. Click **+ Assign Member** on the plan that matches the access you want to grant.

![ Assign Membership](/images/members/adding-memberships/assign-membership-2.webp)

6. The modal closes and the new membership row appears in the table with a status of **Active**.

::: warning No charge is applied
Manually assigning a membership does not charge the user. A membership record is created in your database only. If a payment is required, the user must purchase through your pricing page.
:::

![ Assign Membership](/images/members/adding-memberships/memberships-3.webp)

## When to Use Manual Assignment

- Granting access to a team member or staff account so they can preview protected content
- Fixing a membership that was purchased but not activated due to a failed integration webhook
- Giving a beta tester or reviewer access to a Level without payment
- Migrating a member who joined through an off-platform method (gift card, in-person sale, etc.)

## How Expiry is Set

The expiry date on the new membership row is determined by the Pricing Plan you choose:

| Plan type | Expiry on the new row |
|---|---|
| **One-time / Lifetime** | No expiry — membership is permanent |
| **Subscription (recurring)** | Expires after one billing interval; the system will flip it to Expired if not renewed |
| **Free** | No expiry |
| **Trial** | Expires after the configured trial period |

::: tip Pick the right plan for your intent
To grant permanent access, choose a Lifetime or one-time plan. To grant temporary access, choose a subscription plan — it will expire automatically after one interval.
:::

## Important Notes

::: warning Things to keep in mind
- **The user must have a WordPress account.** If the user does not appear in the Members search, they do not have a WordPress account yet. Create one under **Users → Add New** first.
- **Levels with no Pricing Plans will not appear in the modal.** Make sure your Level has at least one active Pricing Plan before trying to assign it manually.
- **A new row with `Pending` status** means the selected plan expects a payment confirmation from an integration. Choose a Native Payment or Free plan for manual grants to get an `Active` status immediately.
:::
