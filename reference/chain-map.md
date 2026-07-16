# Chain Map

Eleven end-to-end journeys that connect Fluent Members' features into something a real person walks through. Every guide page belongs to at least one of these chains; many belong to more than one.

If you ever land on a page and think *"OK, but what comes next?"*, find the chain it's on here and follow the arrow.

## How to Use This Page

- Find the chain that matches what you're trying to do.
- Walk the steps top to bottom. Each step links to its dedicated page.
- The **Use this map when…** tip at the bottom of each chain helps you confirm you're in the right one.


## Chain 1: First-Time Site Setup

The admin-onboarding chain. You just installed Fluent Members and want it doing something real.

1. [Installation](/guide/getting-started/installation)
2. [General Settings](/guide/settings/general), pick currency, exclude public content, generate portal page
3. [Mailing Settings](/guide/settings/email-configuration/mailing-settings), From name, From email, footer
4. *(Optional, Pro)* [Stripe Setup](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup](/guide/settings/payment-settings/paypal-setup)
5. [Levels Overview](/guide/levels/) → [Creating a Level](/guide/levels/creating)
6. [Pricing: Native Payment](/guide/levels/pricing-native) *or* [Pricing: Paywalls](/guide/levels/pricing-paywalls)
7. [Access Groups Overview](/guide/access-groups/) → [Protected Content](/guide/access-groups/protected-content)
8. [Attach the Group to the Level](/guide/levels/attaching-access-groups), either from the Group's Active Levels card or the Level's Access Group tab
9. Drop `[fluent_membership_level id="N"]` on a pricing page
10. Test as a guest

::: tip Use this map when…
You just installed the plugin and want a complete, working membership site as fast as possible.
:::


## Chain 2: Buy & Onboard

What happens when a real visitor clicks Subscribe.

1. Pricing page renders via `[fluent_membership_level]`
2. Visitor clicks Subscribe → provider checkout (Stripe / PayPal / FluentCart / Form)
3. Payment confirms
4. Webhook (Stripe or PayPal, Pro) or integration event (FluentCart, Forms, Paymattic) fires
5. Membership row created → [Member appears in Members list](/guide/members/)
6. `fluent_members/membership_level_assigned` fires
7. [Welcome Email sent](/guide/settings/email-configuration/email-notifications)
8. Member visits protected content → sees it

::: tip Use this map when…
You want to trace what happens from "checkout button clicked" to "member has access", useful for debugging missing grants.
:::

## Chain 3: Restriction & Enforcement

What a non-member sees when they hit protected content.

1. Visitor lands on a protected post or page
2. `AccessHandler` runs → looks up the [Levels attached](/guide/levels/attaching-access-groups) to the Group via the pivot
3. Checks the visitor's memberships and statuses
4. If no access → reads the Group's [Unauthorized Access](/guide/access-groups/unauthorized-access) action
5. Renders the chosen fallback:
   - **Redirect** → browser goes elsewhere
   - **Custom message** → post body replaced
   - **Display partial preview** → [Partial Content overlay](/guide/settings/partial-content-lock)
   - **Show a login prompt** → [Login Popup](/guide/settings/login-popup)
   - **Hide entirely** → empty body

::: tip Use this map when…
You're trying to figure out why non-members see (or don't see) what you intended on a restricted page.
:::

## Chain 4: Day-to-Day Admin

How an admin manages a single member from a Dashboard signal.

1. [Dashboard](/guide/dashboard/dashboard) shows a signal (Expiring Soon entry, cancellation spike, etc.)
2. [Members list](/guide/members/) → search or filter
3. [Member Detail](/guide/members/detail) → Memberships table
4. Row kebab → [Suspend or Cancel](/guide/members/suspending-and-cancelling) *or* [Refund (Pro)](/guide/transactions/refunds)
5. Status flips → cascades to children if corporate
6. Member's [Portal view](/guide/members/portal/what-members-see) updates next time they visit

::: tip Use this map when…
You need to act on a specific member's record, a chargeback, a refund request, a policy violation.
:::

## Chain 5: Member Self-Serve

What a logged-in member can do from the portal page.

1. [Portal page set up](/guide/members/portal/setup) on your site
2. Member visits → sees [their card](/guide/members/portal/what-members-see)
3. Picks an action:
   - [Cancel](/guide/members/portal/cancelling) (free)
   - [Update Payment Method](/guide/members/portal/updating-payment-method) *(Pro)*
   - [Renew](/guide/members/portal/renewing-a-failed-subscription) *(Pro, on Expired)*
   - [Invite teammate](/guide/members/portal/corporate-seat-invites) *(Pro, corporate parents)*
4. Provider sync fires (Stripe / PayPal / paywall)
5. Status updates → UI re-renders

::: tip Use this map when…
You want to understand the member-facing side of the plugin, what your customers actually interact with.
:::

## Chain 6: Corporate (Team Plan)

End-to-end for a B2B team purchase.

1. Admin [creates a Corporate Level](/guide/levels/creating), sets **Maximum Member**
2. Admin adds [Pricing](/guide/levels/pricing-native)
3. Parent buys → becomes parent membership
4. Parent visits the [Portal](/guide/members/portal/what-members-see) → **Team Members** panel appears
5. Parent sends invite → [Email goes to invitee](/guide/members/portal/corporate-seat-invites)
6. Invitee clicks join link → confirmation page → Accept
7. Sub-member row created with `parent_membership_id` set
8. Sub-member uses content (just like an individual member)
9. *(Eventually)* parent's status changes → [cascade flips children](/guide/levels/corporate-memberships#cascade)

::: tip Use this map when…
You're selling team plans and want to understand both the admin-side configuration and the member-side invite flow as one journey.
:::


## Chain 7: Recurring Renewal (Pro, Happy Path)

What happens at renewal time with zero UI interaction.

1. Stripe (or PayPal) charges the member at period end
2. The provider's renewal webhook reaches Fluent Members: Stripe sends `invoice.payment_succeeded`, PayPal sends **Payment sale completed**
3. The subscription record's status stays `active`, and `fluent_members/membership_renewed` fires (Pro)
4. Local `expires_at` extends to the new period end
5. Member stays Active; no notification by default

::: tip Use PayPal? See the equivalent table
[PayPal Webhook Events Reference](/guide/settings/payment-settings/paypal-setup#webhook-events-reference) lists the exact PayPal event for every step in this chain.
:::

::: tip Use this map when…
You want to confirm renewals are syncing correctly, or hook custom email/CRM logic to the renewal moment.
:::


## Chain 8: Failed Renewal & Recovery

When the renewal charge fails and the member needs to fix it.

1. Stripe (or PayPal) charges the member → fails
2. The provider's failure webhook arrives: Stripe sends `invoice.payment_failed`, PayPal sends **Billing subscription suspended**. The subscription is marked `past_due`
3. Eventually [the cron](/reference/troubleshooting) flips the membership row to `expired` and fires `fluent_members/membership_expired`
4. Member visits [Portal](/guide/members/portal/what-members-see) → sees Expired card + [Renew button](/guide/members/portal/renewing-a-failed-subscription)
5. Member clicks Renew → Stripe retries on the existing card
6. *(If card is bad)* Member [updates payment method](/guide/members/portal/updating-payment-method) first → then Renew
7. Charge succeeds → row back to Active

::: tip Use this map when…
You want a dunning-flow walkthrough, or you're explaining to a customer why their card was declined and what to do.
:::

## Chain 9: Refund (Admin-Driven Exit)

Reversing a payment.

1. Refund request arrives
2. Admin opens [Orders](/guide/transactions/) → Subscriptions or One-Time Purchases → [finds the record](/guide/transactions/filters-and-search)
3. Opens the record's Transaction History panel → uses the [refund action](/guide/transactions/refunds) on the transaction
4. Admin sets amount (full or partial); Stripe refunds can pick a reason, PayPal refunds accept a note
5. Refund fires through `fluent_members/refund_payment_{gateway}` → Stripe or PayPal
6. The transaction's status flips to `refunded` (or `partially_refunded`); the order status updates too if the refund was full
7. Refunding does not change membership status by itself; if access should end, cancel or expire the membership separately → [cascades to children](/guide/levels/corporate-memberships#cascade) if corporate
8. Member sees the refund reflected on their card in 5-10 days

::: tip Use this map when…
You need to refund a customer and want to understand the full chain of what changes on the local site and at Stripe.
:::

## Chain 10: Migration (From PMPro / MemberPress / Kadence Memberships)

Moving an existing membership site onto Fluent Members.

1. Back up everything (DB, files)
2. Install Fluent Members *(and Pro if you'll need Stripe- or PayPal-linked subscriptions)*
3. [Stripe Setup](/guide/settings/payment-settings/stripe-setup) or [PayPal Setup](/guide/settings/payment-settings/paypal-setup), only if payment data needs to come across
4. [Migration Overview](/guide/settings/migration/), confirm your source shows **Detected**
5. Pick the wizard:
   - [From Paid Memberships Pro](/guide/settings/migration/from-paid-memberships-pro)
   - [From MemberPress](/guide/settings/migration/from-memberpress)
   - [From Kadence Memberships](/guide/settings/migration/from-kadence-memberships)
6. Walk the wizard steps in order, verify after each
7. Switch your members to the new [Portal](/guide/members/portal/setup) URL
8. Deactivate (don't delete) the source plugin for a week
9. Delete when confident

::: tip Use this map when…
You're moving a real site with paying members and need every step in order.
:::


## Chain 11: Custom Email Automation

For everything Fluent Members doesn't send out of the box.

1. Recognise: only [Welcome Email](/guide/settings/email-configuration/email-notifications) ships
2. Install FluentCRM (or your own CRM)
3. Subscribe to a [lifecycle hook](/reference/developer-hooks):
   - `fluent_members/membership_expired`
   - `fluent_members/membership_suspended`
   - `fluent_members/membership_status_updated` (catches every transition, including cancellations, and renewals via `membership_renewed` on Pro)
4. Build a CRM funnel for each event you care about
5. Send branded emails from the CRM

For developers, [`fluent_members/prepare_email_template_data`](/reference/developer-hooks) can adjust an existing notification's data before it renders.

::: tip Use this map when…
You need to send renewal reminders, "your card failed" notifications, "we miss you" emails, or any transactional message other than the Welcome Email.
:::

## Where Every Guide Page Lives

If you want a page-by-chain index instead, every guide page lists its chain(s) in a small `Part of the … chain` callout near the top.


