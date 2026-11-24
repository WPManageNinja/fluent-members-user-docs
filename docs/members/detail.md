---
title: Member Details
description: See one member's account information and every membership they hold, and act on each membership from its row menu.
---

# Member Details

**Member Details** shows one person's account information and every membership they hold, past and present. Come here to check a member's access, change a membership or follow up a payment gateway notice.

Go to **Fluent Members → Members** and click the member's row. A breadcrumb at the top, **Members > Member Details**, leads back to the list.

![Screenshot of Member Details with the profile card and a Memberships table of two rows](/images/members/detail/members-detail-1.webp)

## Profile

The card at the top shows the member's avatar, display name, email address, and **Registration Date**. Their WordPress role, such as **Subscriber**, is shown on the right.

## Gateway follow-up notices

When a subscription was cancelled in Fluent Members without confirming it at Stripe or PayPal, a notice appears above the table with a **Mark as Resolved** button. See [Gateway Follow-ups](/docs/billing/gateway-follow-ups).

## Memberships table

Each membership has its own row:

| Column | What it shows |
|--------|---------------|
| **Plan** | The pricing plan, or **Corporate Child** for a seat on a team. A team owner's row also has a seat link, such as `2 / 10 seats used`, with the team plans bought and seats per plan when the owner bought more than one. |
| **Level** | The Membership Level, which links to that level. |
| **Provider** | Where the membership came from: **FluentCart**, **WooCommerce**, **FluentForms**, **Paymattic**, **Corporate**, **Manual**, **Free**, **FluentCRM tag**, or a gateway name such as Stripe. A seat shows the team owner's name, which links to the owner. |
| **Start Date** | When the membership began. |
| **Expires** | The end date, or **Lifetime** if there is none. **Scheduled to end** appears under the date when a cancellation is scheduled. |
| **Amount** | The price of the plan, with a **Test** badge on test payments. Memberships you add by hand show `--`, and a seat with no price of its own shows **Included**. |
| **Status** | Active, Trial, Suspended, Cancelled, Expired, Upgraded, or Plan Deleted. |

The footer shows the total and a page size dropdown, set to 10 per page by default.

To give this member another membership, click **Add Membership** and follow [Adding a Membership Manually](/docs/members/adding-manually).

## Store billing

When a membership was bought through FluentCart or WooCommerce, a **Store billing** section sits under the table. Each card shows the plan, the store, the kind (**Subscription**, **Installment plan**, **One-time payment** or **Paid in full**), a status, **Next Charge** or **Cancels on**, the **Payment Method**, and links to **Order #** and **Subscription #** in the store. **Cancel Subscription** appears when the store can cancel it, and a note explains why when it cannot.

## Row menu

Click the three-dot icon at the end of a row. The menu shows only what applies to that membership, and rows with nothing to do have no icon.

![Screenshot of a membership row menu open with Suspend and Cancel](/images/members/detail/members-detail-2.webp)

| Action | When it appears |
|--------|-----------------|
| **Refund** (Pro) | The membership has a payment that can be refunded. Opens the [refund dialog](/docs/billing/refunds). |
| **Cancel Subscription** (Pro) | The membership has a Stripe or PayPal subscription through Fluent Members that can still be cancelled. |
| **Suspend** or **Suspend Access** | The status is Active or Trial. |
| **Reactivate** or **Reactivate Access** | The status is Suspended. A seat shows this only while the team owner's membership is Active or Trial. When the term has ended, the item reads **Reactivate: term ended** with the date and is greyed out. |
| **Add membership again** | The membership is Expired or Cancelled, or Suspended past its end date, and has no live subscription. |
| **Undo Cancellation** | A cancellation is scheduled. |
| **Cancel** | The status is Active, Trial or Suspended, and the membership has no Stripe or PayPal subscription managed through Fluent Members. |

**Suspend Access** and **Reactivate Access** are the labels on memberships with a subscription, because billing carries on while access is off. See [Suspending & Cancelling](/docs/members/suspending-and-cancelling) for what each action does.

## Team owners and seats

On a corporate level (Pro), click anywhere on the owner's row, or its seat link, to open the [Corporate Members](/docs/members/corporate-members) screen. The links and the three-dot icon in the row keep their own behaviour.
