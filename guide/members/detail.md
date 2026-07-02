# Member Detail

The **Member Detail** page opens when you click any row in the [Members list](./). It shows everything about one specific user — their account information and every membership they hold — and gives you direct controls to manage their memberships from a single screen.

## User Information

At the top of the page you will see the user's WordPress account details:

- **Avatar** and **Display Name**
- **Email Address**
- **Registration Date** — when the WordPress user account was created
- **Role** — the WordPress role assigned to this user (e.g. Subscriber, Administrator)

## Memberships Table

Below the user details is a table listing every membership this user holds. A single user can hold multiple memberships at the same time — each one appears as its own row.

| Column | What it shows |
|---|---|
| **Plan & Level** | The pricing plan title and the Membership Level name |
| **Provider** | Where the membership came from: `default` (native payment), `FluentForms`, `FluentCart`, `WooCommerce`, etc. |
| **Start Date** | When the membership was created |
| **Expires** | The expiry date, `Lifetime`, or blank for cancelled or expired rows |
| **Amount** | The charge amount at the time of purchase |
| **Status** | Coloured pill: `Active`, `Trial`, `Pending`, `Cancelled`, `Expired`, or `Suspended` |

To add a new membership to this user, click the **+ Add Membership** button at the top-right of the table. See [Adding a Membership Manually](./adding-manually) for the full steps.

## Row Actions

Each membership row has an action menu at the end of the row. The available actions depend on the current status of that membership:

- **Suspend** — available when status is `Active` or `Trial`. Revokes the member's access without cancelling their billing. See [Suspending & Cancelling](./suspending-and-cancelling).
- **Cancel** — available when status is `Active`, `Trial`, or `Pending`. Ends the membership and removes access.
- **Refund** *(Pro only)* — available when a linked transaction exists. Opens the refund modal. See [Refunds](/guide/transactions/refunds).

::: tip Actions are status-aware
The menu only shows actions that apply to the current status. If an action you expect is missing, check the status pill on that row first.
:::

## Important Notes

::: warning Things to keep in mind
- **A user can have multiple membership rows.** Each row is a separate membership, not a separate user account. If you see the same user twice, they hold more than one membership.
- **Refund is a Pro feature.** The Refund action only appears if Fluent Members Pro is installed and a transaction is linked to that membership row.
- **Cancelling does not automatically issue a refund.** You must use the Refund action separately after cancelling.
:::
