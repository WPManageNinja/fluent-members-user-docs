# Chain Map

Eleven end-to-end journeys that connect Fluent Members' features into something a real person walks through. Every guide page belongs to at least one of these chains; many belong to more than one.

If you ever land on a page and think *"OK, but what comes next?"* — find the chain it's on here and follow the arrow.

## How to use this page

- Find the chain that matches what you're trying to do.
- Walk the steps top to bottom. Each step links to its dedicated page.
- The **Use this map when…** tip at the bottom of each chain helps you confirm you're in the right one.

---

## Chain 1: First-time site setup

The admin-onboarding chain. You just installed Fluent Members and want it doing something real.

1. [Installation](/guide/getting-started/installation)
2. [General Settings](/guide/settings/general) — pick currency, exclude public content, generate portal page
3. [Mailing Settings](/guide/settings/email-configuration/mailing-settings) — From name, From email, footer
4. *(Optional, Pro)* [Stripe Setup](/guide/settings/payment-settings/stripe-setup)
5. [Levels Overview](/guide/levels/) → [Creating a Level](/guide/levels/creating)
6. [Pricing: Native Payment](/guide/levels/pricing-native) *or* [Pricing: Paywalls](/guide/levels/pricing-paywalls)
7. [Access Groups Overview](/guide/access-groups/) → [Protected Content](/guide/access-groups/protected-content)
8. [Attach the Group to the Level](/guide/levels/attaching-access-groups) — either from the Group's Active Levels card or the Level's Access Group tab
9. Drop `[fluent_membership_level id="N"]` on a pricing page
10. Test as a guest

::: tip Use this map when…
You just installed the plugin and want a complete, working membership site as fast as possible.
:::

---

## Chain 2: Buy & onboard

What happens when a real visitor clicks Subscribe.

1. Pricing page renders via `[fluent_membership_level]`
2. Visitor clicks Subscribe → provider checkout (Stripe / FluentCart / Form)
3. Payment confirms
4. Webhook (Stripe) or integration event (FluentCart, Forms, Paymattic) fires
5. Membership row created → [Member appears in Members list](/guide/members/)
6. `fluent_members/membership_level_assigned` fires
7. [Welcome Email sent](/guide/settings/email-configuration/email-notifications)
8. Member visits protected content → sees it

::: tip Use this map when…
You want to trace what happens from "checkout button clicked" to "member has access" — useful for debugging missing grants.
:::

---

## Chain 3: Restriction & enforcement

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

---

## Chain 4: Day-to-day admin

How an admin manages a single member from a Dashboard signal.

1. [Dashboard](/guide/dashboard/dashboard) shows a signal (Expiring Soon entry, cancellation spike, etc.)
2. [Members list](/guide/members/) → search or filter
3. [Member Detail](/guide/members/detail) → Memberships table
4. Row kebab → [Suspend or Cancel](/guide/members/suspending-and-cancelling) *or* [Refund (Pro)](/guide/transactions/refunds)
5. Status flips → cascades to children if corporate
6. Member's [Portal view](/guide/members/portal/what-members-see) updates next time they visit

::: tip Use this map when…
You need to act on a specific member's record — a chargeback, a refund request, a policy violation.
:::

---

## Chain 5: Member self-serve

What a logged-in member can do from the portal page.

1. [Portal page set up](/guide/members/portal/setup) on your site
2. Member visits → sees [their card](/guide/members/portal/what-members-see)
3. Picks an action:
   - [Cancel](/guide/members/portal/cancelling) (free)
   - [Update Payment Method](/guide/members/portal/updating-payment-method) *(Pro)*
   - [Renew](/guide/members/portal/renewing-a-failed-subscription) *(Pro, on Expired)*
   - [Invite teammate](/guide/members/portal/corporate-seat-invites) *(Pro, corporate parents)*
4. Provider sync fires (Stripe / paywall)
5. Status updates → UI re-renders

::: tip Use this map when…
You want to understand the member-facing side of the plugin — what your customers actually interact with.
:::

---

## Chain 6: Corporate (team plan)

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

---

## Chain 7: Recurring renewal (Pro, happy path)

What happens at renewal time with zero UI interaction.

1. Stripe charges the card at period end
2. `invoice.paid` webhook reaches Fluent Members
3. `WebhookSubscriptionHandler::handleInvoicePaid` runs
4. New `Transaction` row inserted (type `renewal`)
5. `MembershipPaymentSyncService` fires `fluent_members/membership_renewed`
6. Local `expires_at` extended
7. Member stays Active; no notification by default

::: tip Use this map when…
You want to confirm renewals are syncing correctly, or hook custom email/CRM logic to the renewal moment.
:::

---

## Chain 8: Failed renewal & recovery

When the renewal charge fails and the member needs to fix it.

1. Stripe charges card → fails
2. `invoice.payment_failed` webhook → row marked `past_due`
3. Eventually [the cron](/reference/troubleshooting) flips the row to `Expired` + fires `membership_expired`
4. Member visits [Portal](/guide/members/portal/what-members-see) → sees Expired card + [Renew button](/guide/members/portal/renewing-a-failed-subscription)
5. Member clicks Renew → Stripe retries on the existing card
6. *(If card is bad)* Member [updates payment method](/guide/members/portal/updating-payment-method) first → then Renew
7. Charge succeeds → row back to Active

::: tip Use this map when…
You want a dunning-flow walkthrough, or you're explaining to a customer why their card was declined and what to do.
:::

---

## Chain 9: Refund (admin-driven exit)

Reversing a payment.

1. Refund request arrives
2. Admin opens [Transactions list](/guide/transactions/) → [filters by user / amount](/guide/transactions/filters-and-search)
3. Row kebab → [Refund modal](/guide/transactions/refunds)
4. Admin sets amount (full / partial) and ticks "Also cancel membership" *(if appropriate)*
5. Refund fires through `fluent_members/refund_payment_stripe` → Stripe
6. New Transaction row created with `type='refund'`
7. *(If "Also cancel" ticked)* membership → `Cancelled` → [cascades to children](/guide/levels/corporate-memberships#cascade)
8. Member sees Cancelled in their Portal; refund lands on their card in 5-10 days

::: tip Use this map when…
You need to refund a customer and want to understand the full chain of what changes on the local site and at Stripe.
:::

---

## Chain 10: Migration (from PMPro / MemberPress / RCP)

Moving an existing membership site onto Fluent Members.

1. Back up everything (DB, files)
2. Install Fluent Members *(and Pro if you'll need Stripe-linked subscriptions)*
3. [Stripe Setup](/guide/settings/payment-settings/stripe-setup) — only if Stripe data needs to come across
4. [Migration Overview](/guide/settings/migration/) — confirm your source shows **Detected**
5. Pick the wizard:
   - [From Paid Memberships Pro](/guide/settings/migration/from-paid-memberships-pro)
   - [From MemberPress](/guide/settings/migration/from-memberpress)
   - [From Content Restriction Pro](/guide/settings/migration/from-content-restriction-pro)
6. Walk the wizard steps in order — verify after each
7. Switch your members to the new [Portal](/guide/members/portal/setup) URL
8. Deactivate (don't delete) the source plugin for a week
9. Delete when confident

::: tip Use this map when…
You're moving a real site with paying members and need every step in order.
:::

---

## Chain 11: Custom email automation

For everything Fluent Members doesn't send out of the box.

1. Recognise: only [Welcome Email](/guide/settings/email-configuration/email-notifications) ships
2. Install FluentCRM (or your own CRM)
3. Subscribe to a [lifecycle hook](/reference/developer-hooks):
   - `fluent_members/membership_cancelled`
   - `fluent_members/membership_expired`
   - `fluent_members/membership_renewed`
   - `fluent_members/membership_suspended`
4. Build a CRM funnel for each event you care about
5. Send branded emails from the CRM

Or — for developers — register an additional notification type via `fluent_members/default_notifications` filter.

::: tip Use this map when…
You need to send renewal reminders, "your card failed" notifications, "we miss you" emails, or any transactional message other than the Welcome Email.
:::

---

## Where every guide page lives

If you want a page-by-chain index instead, every guide page lists its chain(s) in a small `Part of the … chain` callout near the top.

## Reference reading

- [Glossary](/guide/getting-started/glossary)
- [Membership Statuses](/reference/membership-statuses)
- [Developer Hooks](/reference/developer-hooks)
- [Troubleshooting](/reference/troubleshooting)
