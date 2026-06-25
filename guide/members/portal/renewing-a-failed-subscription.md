# Renewing a Failed Subscription
::: warning Requires Fluent Members Pro
Renew exists only for memberships on Native Payment (Stripe). Subscriptions sold through other paywalls (FluentCart, Fluent Forms, Paymattic) recover failed payments through *those* plugins' dunning flows.
:::

When a recurring payment fails, expired card, insufficient funds, fraud-flag from the bank, the membership eventually flips to `Expired`. Pro gives the member a one-click **Renew** button to recover the subscription without re-buying through your pricing page.

**Here's what you'll learn:**
- When the Renew button is available.
- The flow the member sees end-to-end.
- What happens server-side after a successful renewal.
- The difference between renewing and re-buying.

**Before we start:** The member has a `Past Due` or `Expired` subscription, and you've connected [Stripe](/guide/settings/payment-settings/stripe-setup).

::: warning Screenshot pending
Front-end screenshot of the Renew flow isn't in our reference folder yet.

[Screenshot needed: front-end Member Portal showing the Renew button on an Expired subscription card]
:::

---

## Step 1: The status that allows Renew

The **Renew** button appears on a membership card only when:

- The membership row is `Expired` (or `Past Due` in some integrations).
- The subscription has a non-empty `provider_subscription_id` (Stripe knows about it).
- Stripe is reachable from the site.

If any of those is false, the button isn't shown.

---

## Step 2: Member clicks Renew

A small modal opens explaining the situation: *"Your subscription lapsed because your last payment failed. Click Renew to retry the charge on your current payment method."*

Two buttons: **Cancel** and **Renew Now**.

::: tip In plain language
*Renew* retries the same subscription on the same card. *Re-buy* (going through your pricing page) creates a *new* subscription. Pick Renew when the lapse was payment-side; re-buy when you want a fresh start (e.g. after a long break).
:::

---

## Step 3: What happens server-side

When the member clicks **Renew Now**, Fluent Members:

1. Reuses the customer's existing Stripe customer ID.
2. Calls Stripe to retry the last failed invoice (or generate a new one for the missed period).
3. Stripe charges the card on file. If it succeeds → the local row flips back to `Active`, `expires_at` extends to the next period.
4. The `fluent_members/membership_renewed` action fires (so CRMs and analytics see it).

If the retry **fails**, the modal shows the bank's reason (declined, insufficient funds, etc.) and offers two paths:

- **Update payment method**: opens the [Update Payment Method](./updating-payment-method) flow.
- **Cancel**: keep the status as Expired and try later.

---

## What about 3D Secure / SCA?

If the bank requires authentication, Stripe presents a 3DS challenge inline. The member completes it; on success, Stripe captures the payment and Fluent Members flips the row to Active.

---

## A real example: Mike's annual lapsed by 3 days

Mike's annual Pro Yoga renewed on Feb 1. The renewal charge failed, the bank flagged a "fraud check" because Mike was travelling. The membership flipped to `Past Due` then `Expired` after a few days.

Mike returns home, opens the portal:

1. His Pro Yoga card shows status `Expired` with a **Renew** button.
2. He clicks it. Stripe retries the charge, this time with him at home, it succeeds.
3. The card flips to `Active`. His `expires_at` jumps to next Feb 1.

His subscription, customer record, and Stripe metadata are intact, no re-buy needed.

---

## What if Renew can't help?

If too much time has passed and Stripe has fully cancelled the subscription on its side (typically after a few weeks of failed retries), Renew won't appear, the subscription is dead.

In that case the member has to re-buy through your pricing page. The new row is a fresh subscription with a new Stripe ID.

---

## What admins can do here

Same as [Update Payment Method](./updating-payment-method), this is member-only by design. Admins can manually grant a fresh membership ([Adding a Membership Manually](../adding-manually)) to get someone access while they work out the billing.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Renew button missing on Expired card | Stripe-side subscription has been fully cancelled. | Member re-buys via your pricing page. |
| Renew clicks but nothing happens | Stripe.js or the API call failed. | Browser dev console will show the error. Try a different browser. |
| Same failure repeats after click | Underlying issue (expired card, etc.) hasn't been fixed. | Use [Update Payment Method](./updating-payment-method) first. |
| Renew succeeds but next renewal fails again | Card is on its way out. | Member should update payment method proactively. |

---

## What's next?

- **→ [🔒 Pro · Updating Payment Method](./updating-payment-method)**: if Renew keeps failing, this is the fix.
- **→ [🔒 Pro · Corporate Seat Invites](./corporate-seat-invites)**: the other Pro-only portal feature.

**Recommended reading:**
- [Stripe Setup](/guide/settings/payment-settings/stripe-setup): confirm the connection.
- [Membership Statuses](/reference/membership-statuses), `past_due` vs `expired` explained.
