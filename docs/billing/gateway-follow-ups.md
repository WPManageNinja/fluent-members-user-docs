---
title: "Gateway Follow-ups (Pro)"
description: "Finish the job when a subscription was cancelled in Fluent Members but may still be active at Stripe or PayPal, using the notices on the member's page and in the portal."
---

# Gateway Follow-ups (Pro)

A **gateway follow-up** (Pro) is a notice that a subscription was cancelled in Fluent Members only, so Stripe or PayPal may still be charging the member. Fluent Members records one whenever you confirm a [local-only cancel](/docs/billing/cancelling-a-subscription), and it also warns the member in the portal.

No notice is recorded when the gateway was checked and had nothing active for that record.

## When a follow-up is created

A follow-up is created when a subscription is cancelled without a matching gateway cancel, because:

- Stripe still has one or more active subscriptions for the customer that could not be matched to the record.
- Stripe could not be checked.
- The record is a PayPal one, which Fluent Members cannot look up.

This happens when you cancel a subscription that has no gateway ID and confirm **Cancel in FluentMembers Only**, when you cancel such a membership from the member's page, or when a member cancels one in the portal.

## What you see in the admin

Open the member's page from **Fluent Members → Members**. A **Payment gateway follow-ups** region appears above the **Memberships** table with one notice per subscription:

- **Stripe, with IDs found:** "A subscription was cancelled in FluentMembers only, and Stripe still has 1 active subscription for this member: sub_123. Cancel it in Stripe if it belongs to this membership." With several, the notice lists them all.
- **Gateway could not be checked:** "A subscription was cancelled in FluentMembers only and Stripe could not be checked. If the member is still being charged, cancel it in Stripe." PayPal reads the same with PayPal.

<!-- TODO(screenshot): gateway-follow-ups-1
  screen: Members → a member's page
  state: Payment gateway follow-ups notice above the Memberships table with a Mark as Resolved button
  data: a member with a subscription cancelled with Cancel in FluentMembers Only
  highlight: notice and Mark as Resolved button
  view: admin
  alt: Screenshot of the member page with a gateway follow-up notice and a Mark as Resolved button
  reason: needs a Stripe customer with an unmatched subscription
-->

Cancel the right subscription in your Stripe or PayPal dashboard, then click **Mark as Resolved** on the notice. The notice disappears and the activity log records **Payment gateway notice resolved**. A notice stays until you resolve it, and the page keeps the 50 most recent per member.

## What the member sees

On the **Member Portal** a notice sits above the stats, under **Subscriptions that may still be active**:

- **PayPal:** "Your Pro subscription may still be active in PayPal. Cancel it in your PayPal account so you are not charged again."
- **Stripe, or another named gateway:** "Your Pro subscription may still be active in Stripe. Please contact us so we can stop it and you are not charged again."
- With no gateway name: "Your Pro subscription may still be active with the payment provider. Please contact us so we can stop it and you are not charged again."

The level name replaces **Pro**. The notice has no button, and it goes away when you mark the follow-up as resolved. See [What Members See](/docs/members/portal/what-members-see).

When a member cancels in the portal a subscription Fluent Members could not confirm, the cancel dialog also warns them first. A Stripe record reads "We could not confirm your Stripe subscription. If you are charged again after cancelling, please contact us." A PayPal record asks them to also cancel in PayPal.

## Where else it shows

The subscription's **Activity** timeline reads **Subscription cancelled in FluentMembers only. The payment gateway was not changed.**
