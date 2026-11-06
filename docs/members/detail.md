---
title: Member Details
description: See one member's account information and every membership they hold, and act on each membership from its row menu.
---

# Member Details

**Member Details** shows one person's account information and every membership they hold, past and present. Come here to check a member's access or to change a membership.

Go to **Fluent Members → Members** and click the member's row.

![Screenshot of Member Details with the profile card and a Memberships table of two rows](/images/members/detail/detail-overview.webp)

## Profile

The card at the top shows the member's avatar, display name, email address, and **Registration Date**. Their WordPress role is on the right.

## Memberships table

Each membership has its own row, newest first:

| Column | What it shows |
|--------|---------------|
| **Plan** | The pricing plan, or **Corporate Child** for a seat on a team. A team owner's row also has a seat link, such as `2 / 10 seats used`. |
| **Level** | The Membership Level, which links to that level. |
| **Provider** | Where the membership came from: **FluentCart**, **WooCommerce**, **FluentForms**, **Paymattic**, **Corporate**, **Manual**, or a payment gateway name such as Stripe. A seat shows the team owner's name, which links to the owner. |
| **Start Date** | When the membership began. |
| **Expires** | The end date, or **Lifetime** if there is none. **Scheduled to end** appears below the date when a cancellation is scheduled. |
| **Amount** | The price of the plan. A seat with no price of its own shows **Included**. |
| **Status** | Active, Trial, Suspended, Cancelled, Expired, or Upgraded. See [Membership statuses](/reference/membership-statuses). |

To give this member another membership, click **Add Membership** and follow [Adding a Membership Manually](/docs/members/adding-manually).

<!-- TODO(screenshot): detail-1
  screen: Fluent Members → Members → a member → Memberships table
  state: A manual membership with a future expiry after Keep Until Expiry, row menu open
  data: Sample member with one manual subscription-plan membership
  highlight: Scheduled to end text in the Expires column
  view: admin
  alt: Screenshot of a membership row showing Scheduled to end under the expiry date, with Undo Cancellation in the row menu
  reason: needs the develop build on the local site
-->

## Row menu

Click the three-dot icon at the end of a row. The menu shows only what applies to that membership, and rows with nothing to do have no icon.

![Screenshot of a membership row menu open with Suspend and Cancel](/images/members/detail/detail-row-menu.webp)

| Action | When it appears |
|--------|-----------------|
| **Refund** (Pro) | The membership has a payment that can be refunded. Opens the [refund dialog](/docs/billing/refunds). |
| **Cancel Subscription** (Pro) | The membership has a Stripe or PayPal subscription through Fluent Members that can still be cancelled. |
| **Suspend** or **Suspend Access** | The status is Active or Trial. |
| **Reactivate** or **Reactivate Access** | The status is Suspended. A seat shows this only while the team owner's membership is Active or Trial. |
| **Undo Cancellation** | A cancellation is scheduled for the expiry date. |
| **Cancel** | The status is Active or Trial, and the membership has no Stripe or PayPal subscription managed through Fluent Members. |

**Suspend Access** and **Reactivate Access** are the labels on memberships with a subscription, because billing carries on while access is off. See [Suspending & Cancelling](/docs/members/suspending-and-cancelling) for what each action does.

## Team owners and seats

On a corporate level (Pro), click anywhere on the owner's row, or its seat link, to open the [Corporate Members](/docs/members/corporate-members) screen. The links and the three-dot icon in the row keep their own behaviour.
