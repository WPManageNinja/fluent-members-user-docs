---
title: "Membership Statuses"
description: "What each Fluent Members membership status means, what changes it, and what members and admins can do at each one."
---

# Membership Statuses

Every membership has a **status**. It decides whether the member can see protected content, what they see in the Member Portal, and which actions you have on that membership.

## The Statuses

Fluent Members uses six statuses. Only **Active** and **Trial** give access.

| Status | Access | What it means |
|---|---|---|
| **Active** | Yes | The membership is live. |
| **Trial** | Yes | The membership is live and inside a trial period. |
| **Suspended** | No | Access is paused, by an admin or after a failed payment. |
| **Cancelled** | No | The membership has ended and the record stays in the member's history. |
| **Expired** | No | The membership passed its expiry date. |
| **Upgraded** | No | The member moved to another level. This old record stays for history, and a new membership holds the access. |

> [!Note]
> **Suspended** does not stop billing on its own. If the member pays by subscription, the subscription keeps running until it is cancelled.

## What Changes a Status

### Becomes Active or Trial

- You assign a plan to the member with [Add Membership](/docs/members/adding-manually).
- A payment succeeds through native Stripe or PayPal (Pro), or through FluentCart, Fluent Forms, Paymattic or WooCommerce (Pro).
- An invited member accepts a [seat on a corporate level](/docs/members/portal/corporate-seat-invites) (Pro).
- You click **Reactivate** on a suspended membership. It returns to the status it had before, so a trial stays a trial.

A subscription in its trial period gives **Trial**. It changes to **Active** when the trial ends and billing starts.

### Becomes Suspended

- You choose **Suspend** on the [member's details](/docs/members/detail). The action is called **Suspend Access** on memberships with a native subscription.
- A failed payment moves a native subscription to past due, unpaid, incomplete, failed or paused (Pro).
- The owner of a corporate membership is suspended, so their seats are suspended too.

### Becomes Cancelled

- A member cancels in the [Member Portal](/docs/members/portal/cancelling).
- You choose **Cancel** or **Cancel Subscription** on the member's details.
- Stripe or PayPal reports that the subscription has ended (Pro).
- You fully refund a charge or renewal (Pro). This does not apply to payments carried over by a migration.
- The owner of a corporate membership is cancelled, so their seats are cancelled too.

If the member or admin chooses to cancel at the end of the billing period, the status stays **Active** until the period ends.

### Becomes Expired

- The expiry date passes. An hourly background job checks **Active** and **Trial** memberships in batches, so the change can take up to an hour or longer on a large site.
- A native subscription expires (Pro).
- The owner of a corporate membership expires, so their seats expire too.

### Becomes Upgraded

- A member buys or moves to another level through a paywall purchase or an [upgrade path](/docs/levels/upgrade-paths) (Pro). The old membership becomes **Upgraded** and a new membership is created.

## What Members See

Each membership in the portal has a status badge and a **Manage** button, at every status. The **Manage** page holds the actions. See [Membership details](/docs/members/portal/membership-details) for the full page.

| Status | Actions on the Manage page | Protected content |
|---|---|---|
| **Active**, **Trial** | **Cancel Membership** or **Cancel Subscription**. **Upgrade Plan**, **Update Payment Method**, **Renew Membership** and **Undo Cancellation** when they apply (Pro for all but **Undo Cancellation**). | Visible |
| **Suspended** | **Update Payment Method** and **Cancel Subscription** when a native subscription allows them (Pro). Otherwise none. | Blocked |
| **Cancelled**, **Expired** | None. **Renew Membership** appears when the native subscription can be renewed (Pro). | Blocked |
| **Upgraded** | None. The member's new membership is listed separately. | Blocked for this record |

When someone without access opens protected content, the Access Group's [unauthorized access](/docs/access-groups/unauthorized-access) setting decides what they see.

## What Admins Can Do

These actions are in the three-dot menu on each row of the **Memberships** table on the member's details page.

| Action | Available when |
|---|---|
| **Refund** (Pro) | The membership has a refundable transaction, at any status |
| **Cancel Subscription** (Pro) | The membership has a native subscription that can be cancelled |
| **Suspend** or **Suspend Access** | The status is **Active** or **Trial** |
| **Reactivate** or **Reactivate Access** | The status is **Suspended**. For a seat, the owner's membership must be **Active** or **Trial**. |
| **Undo Cancellation** | A cancellation is scheduled |
| **Cancel** | The status is **Active** or **Trial**, and the membership has no native subscription, or its billing is managed in PayPal |

To bring back a cancelled or expired member, assign a plan again with [Add Membership](/docs/members/adding-manually).

## Corporate Seats (Pro)

Status changes on a [corporate membership](/docs/levels/corporate-memberships) flow down to its seats:

| Owner becomes | Seats become |
|---|---|
| **Cancelled** | **Cancelled** |
| **Expired** | **Expired** |
| **Suspended** | **Suspended** |
| **Active** or **Trial** again | Restored, up to the free seats on the level |
| **Upgraded**, new level is corporate | Moved to the new corporate membership |
| **Upgraded**, new level is not corporate | **Cancelled** |

## Provider Values

Each membership also stores a `provider`, which records where it came from. You see this value in the database and in [developer hooks](/reference/developer-hooks).

| Value | Source |
|---|---|
| `manual` | Assigned by an admin |
| `stripe` | Native Stripe checkout (Pro) |
| `paypal` | Native PayPal checkout (Pro) |
| `fluent_cart` | FluentCart |
| `fluentform` | Fluent Forms |
| `paymattic` | Paymattic |
| `woocommerce` | WooCommerce (Pro) |
| `corporate` | A seat on a corporate membership (Pro) |
| `pmpro` | Imported from Paid Memberships Pro |
| `memberpress` | Imported from MemberPress |
| `rcp` | Imported from Kadence Memberships, formerly Restrict Content Pro |
| `native_payment` | Older admin grants on native plans, shown as **Manual** |

The status is stored in the `status` column of the `fmem_membership_users` table, on each membership row.
