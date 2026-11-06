---
title: "Chain Map"
description: "Twelve end-to-end journeys through Fluent Members, from first setup to renewals, refunds and migration, with a link for each step."
---

# Chain Map

The **Chain Map** shows how Fluent Members features connect into complete journeys. Use it when you know what you want to do, or want to trace what happens next, and need to see every step in order.

## Chain 1: First-Time Setup

Use this after you install the plugin, to get a working membership site.

1. [Install & activate](/docs/getting-started/installation)
2. [General settings](/docs/settings/general): currency, excluded content and the portal page
3. [Mailing settings](/docs/settings/email-configuration/mailing-settings): sender name and email
4. *(Optional, Pro)* [Set up Stripe](/docs/settings/payment-settings/stripe-setup) or [Set up PayPal](/docs/settings/payment-settings/paypal-setup)
5. [Create a level](/docs/levels/creating)
6. [Price with native payments](/docs/levels/pricing-native) or [Price with paywalls](/docs/levels/pricing-paywalls)
7. [Create an Access Group](/docs/access-groups/) and set its [restriction types](/docs/access-groups/protected-content)
8. [Attach the group to the level](/docs/levels/attaching-access-groups)
9. Add a [pricing page](/docs/selling/pricing-page)
10. Test in a private browser window

## Chain 2: Buy and Get Access

Use this to trace a missing membership after a purchase.

1. A visitor opens your pricing page and clicks a plan button
2. They pay at [checkout](/docs/selling/checkout) through Stripe or PayPal (Pro), or through FluentCart, Fluent Forms, Paymattic or WooCommerce (Pro)
3. The payment is confirmed by a webhook or by the connected plugin
4. A membership is created and the [member appears in the list](/docs/members/)
5. `fluent_members/membership_level_assigned` fires
6. The **Welcome Email** goes out, if you [turned it on](/docs/settings/email-configuration/email-notifications)
7. The member opens protected content and sees it

## Chain 3: Protection

Use this to work out why a visitor does or doesn't see a page.

1. A visitor opens a protected post or page
2. Fluent Members [checks the visitor's memberships](/docs/access-groups/how-protection-works) against the levels attached to the Access Group
3. Only **Active** and **Trial** memberships count
4. Without access, the visitor sees one of these:
   - The [partial content lock](/docs/settings/partial-content-lock), when it's on
   - The group's [unauthorized access](/docs/access-groups/unauthorized-access) action: **Redirect to a specific URL** or **Display a custom message**
5. A logged-out visitor can also get the [login popup](/docs/settings/login-popup), when it's on

## Chain 4: Day-to-Day Admin

Use this when you need to act on one member's record.

1. Spot something on the [dashboard](/docs/dashboard/dashboard)
2. Find the person in the [members list](/docs/members/)
3. Open their [member details](/docs/members/detail)
4. Use the row menu to [suspend or cancel](/docs/members/suspending-and-cancelling), or to [refund](/docs/billing/refunds) (Pro)
5. The status changes, and on a corporate membership the seats follow
6. The member's [portal](/docs/members/portal/what-members-see) shows the new status

## Chain 5: Member Self-Service

Use this to understand what members do on their own.

1. You [set up the portal](/docs/members/portal/setup)
2. A member [opens the portal](/docs/members/portal/what-members-see) and clicks **Manage** on a membership
3. On the [Manage page](/docs/members/portal/membership-details), they choose an action:
   - [Cancel](/docs/members/portal/cancelling)
   - [Update Payment Method](/docs/members/portal/updating-payment-method) (Pro, Stripe)
   - [Renew Membership](/docs/members/portal/renewing-a-membership) (Pro)
   - [Upgrade Plan](/docs/levels/upgrade-paths) (Pro)
   - [Invite a team member](/docs/members/portal/corporate-seat-invites) (Pro, corporate owners)
4. The change syncs with the gateway and the page updates

## Chain 6: Corporate Team (Pro)

Use this when you sell team plans.

1. [Create a corporate level](/docs/levels/corporate-memberships) and set **Maximum Member**
2. [Add pricing](/docs/levels/pricing-native)
3. A customer buys and becomes the owner
4. The owner opens the [portal](/docs/members/portal/corporate-seat-invites), enters an email under **Invite Member** and clicks **Send Invitation**
5. The invitee gets an email, logs in with that address and clicks **Accept Invitation**
6. A seat is created, and it appears on [Corporate members](/docs/members/corporate-members)
7. The seat follows the owner's status changes

## Chain 7: Recurring Renewal (Pro)

Use this to confirm renewals are syncing, or to hook custom logic to the renewal.

1. Stripe or PayPal charges the member at the end of the period
2. The webhook arrives: `invoice.paid` from Stripe, `PAYMENT.SALE.COMPLETED` from PayPal
3. The expiry date moves to the new period end and the membership stays **Active**
4. `fluent_members/membership_renewed` fires
5. The **Payment Receipt** email goes out, if you turned it on

## Chain 8: Failed Payment and Recovery (Pro)

Use this to follow a declined renewal.

1. A renewal charge fails
2. The webhook arrives: `invoice.payment_failed` from Stripe, `BILLING.SUBSCRIPTION.SUSPENDED` from PayPal
3. The **Payment Failed** email goes out, if you turned it on
4. When the subscription moves to past due or a similar state, the membership becomes **Suspended** and the member loses access
5. The member opens the [Manage page](/docs/members/portal/membership-details) and sees `Your last payment did not go through. Update your payment method to restore access.`
6. The member chooses [Update Payment Method](/docs/members/portal/updating-payment-method) (Stripe). A PayPal member fixes payment in PayPal.
7. The payment succeeds and the membership returns to **Active**

If the subscription expires instead, [Renew Membership](/docs/members/portal/renewing-a-membership) sends the member to checkout.

## Chain 9: Refund (Pro)

Use this when you reverse a payment.

1. Find the record under [Billing](/docs/billing/) with [filter & search](/docs/billing/filters-and-search), or open the [member's details](/docs/members/detail)
2. Choose [Refund](/docs/billing/refunds) and set a full or partial amount
3. Stripe or PayPal processes the refund and the transaction updates
4. `fluent_members/native_payment_refunded` fires, and the **Refund Issued** email goes out if you turned it on
5. A full refund of a charge or renewal also cancels the subscription and membership, except for payments carried over by a migration. A partial refund leaves access in place.

## Chain 10: Migration

Use this when you move a live site with paying members.

1. Back up your database and files
2. Install Fluent Members, plus Pro if you need linked subscriptions
3. [Set up Stripe](/docs/settings/payment-settings/stripe-setup) or [Set up PayPal](/docs/settings/payment-settings/paypal-setup), if payment data needs to come across
4. Open the [Migration screen](/docs/settings/migration/) and confirm your source is detected
5. Follow the guide for your source:
   - [From Paid Memberships Pro](/docs/settings/migration/from-paid-memberships-pro)
   - [From MemberPress](/docs/settings/migration/from-memberpress)
   - [From Kadence Memberships](/docs/settings/migration/from-kadence-memberships)
6. Run each step in order and check the result
7. Point members to your [portal](/docs/members/portal/setup)
8. Keep the source plugin until you have confirmed members, access and billing

## Chain 11: Custom Email Automation

Use this for messages beyond the [seven built-in emails](/docs/settings/email-configuration/email-notifications).

1. Install FluentCRM
2. Build an automation on a [Fluent Members trigger](/docs/integrations/fluentcrm): **Membership Level Assigned**, **Membership Level Removed**, **Membership Expiring**, **Membership Expired**, **Membership Suspended**, **Membership Renewed** or **Membership Cancelled**
3. Send your emails from FluentCRM

If you use another tool, listen to the same events through [developer hooks](/reference/developer-hooks).

## Chain 12: Plan Upgrade (Pro)

Use this when members can move to a higher plan.

1. Set up [upgrade paths](/docs/levels/upgrade-paths) on the level
2. A member opens the [Manage page](/docs/members/portal/membership-details) and chooses **Upgrade Plan**
3. They complete the upgrade
4. The old membership becomes **Upgraded** and a new membership holds the access
5. On a corporate membership, seats move to the new membership if the new level is corporate, and are cancelled if it isn't
6. `fluent_members/membership_upgraded` and `fluent_members/membership_plan_changed` fire
