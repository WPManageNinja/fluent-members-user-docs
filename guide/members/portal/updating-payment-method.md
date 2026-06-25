# Updating Payment Method
::: warning Requires Fluent Members Pro
The Update Payment Method button only appears when the membership is on Native Payment (Stripe via Fluent Members Pro). Memberships sold through FluentCart, WooCommerce, Fluent Forms, or Paymattic update their payment method inside the *host* plugin's portal, not here.
:::

Members can swap the card on file for an active subscription without contacting you. This page walks the flow they see in the portal.

**Here's what you'll learn:**
- When the Update Payment Method button is visible.
- The Stripe Elements form that opens.
- What gets stored after success.
- Common reasons it doesn't go through.

**Before we start:** The member is signed in, holds an Active or Trial Native-Payment membership, and Stripe is connected ([Stripe Setup](/guide/settings/payment-settings/stripe-setup)).

::: warning Screenshot pending
Front-end screenshot of the Update Payment Method modal isn't in our reference folder yet.

[Screenshot needed: front-end Member Portal with Stripe Elements modal open for updating card]
:::

---

## Step 1: Member clicks Update Payment Method

On an Active or Trial membership card whose provider is Native Payment (Stripe), the **Update Payment Method** button is visible alongside the Cancel button. Member clicks it.

A modal opens with **Stripe Elements**, Stripe's secure card-entry widget, embedded into your site.

::: tip In plain language
The modal isn't a Fluent Members form. It's Stripe's own widget, hosted on your page via JavaScript. Card details never touch your server, they go straight from the member's browser to Stripe.
:::

---

## Step 2: Member enters new card details

The form asks for card number, expiry, CVC, and (if you've configured it in Stripe) postal/zip code.

Stripe runs its standard validation:
- Number is a valid card.
- Expiry isn't in the past.
- The card type is supported by your Stripe account.

If 3D Secure / SCA is required for the buyer's region, Stripe presents the bank's authentication challenge before continuing.

---

## Step 3: Member clicks Update

When the form is valid and they click **Update**, Fluent Members:

1. Creates a Stripe **Setup Intent** (no charge happens, just card attachment).
2. Stripe attaches the new card to the customer.
3. The subscription's default payment method is updated.
4. The local `current_payment_method` on the subscription is recorded.

The modal closes. The portal shows a success toast: *"Payment method updated."*

::: warning No retry on the failed invoice
Updating the card *does not* automatically retry a failed invoice. If the previous month's charge failed and the subscription is now `past_due`, the member also needs to click **Renew**, see [Renewing a Failed Subscription](./renewing-a-failed-subscription).
:::

---

## Rate-limited to prevent abuse

Each member can attempt this update a limited number of times per hour (default 5 attempts per hour). If they hit the limit, the button is greyed out with a tooltip. The limit prevents abuse of Setup Intents (each is a small Stripe API call) and is configurable via developer hooks if needed.

---

## A real example: Mike's card expired

Mike's bank issued him a new card. He visits the portal and:

1. Sees a banner on his Pro Yoga card: *"Your card on file has expired."* (This banner appears when the most recent charge failed because of an expired card.)
2. Clicks **Update Payment Method**.
3. Enters his new card; Stripe accepts it.
4. Clicks **Update** → toast confirms.
5. Now also clicks **Renew** to retry his missed renewal payment (separate flow, see [Renewing a Failed Subscription](./renewing-a-failed-subscription)).

His Pro Yoga is fully reactivated in under a minute.

---

## What admins can do here

Nothing, this flow is member-only. Admins can't update a member's card on their behalf (Stripe doesn't permit it for compliance reasons). If a member can't access the portal, they need to contact you for the link, but they still have to submit the card themselves.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Update button missing | Membership isn't on Native Payment, or status is Cancelled/Expired. | Confirm provider and status. |
| Stripe Elements modal stays blank | Stripe.js failed to load (CSP, ad-blocker, etc.). | Whitelist `js.stripe.com` in CSP / ad-blocker. |
| 3D Secure modal appears repeatedly | Bank requires SCA on the card. | Member needs to complete the challenge each time. |
| Toast says updated but next charge still fails | Card has insufficient funds, or bank declines for fraud. | Different card. |
| "Too many attempts" error | Rate limit hit. | Wait an hour, or raise the limit via developer hook. |

---

## What's next?

- **→ [🔒 Pro · Renewing a Failed Subscription](./renewing-a-failed-subscription)**: what to do after the card is updated.
- **→ [Cancelling](./cancelling)**: the alternative flow.

**Recommended reading:**
- [Stripe Setup](/guide/settings/payment-settings/stripe-setup): make sure Stripe is connected first.
- [Membership Statuses](/reference/membership-statuses): understand `past_due` and `expired`.
