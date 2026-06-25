# Migration from MemberPress

The MemberPress-specific wizard. Same 8-step structure as the [Paid Memberships Pro flow](./from-paid-memberships-pro) with MemberPress-specific mapping and gotchas.
**Here's what you'll learn:**
- How MemberPress's data model maps to Fluent Members.
- The wizard steps adapted for MemberPress.
- MemberPress-specific things that need extra care.

**Before we start:** MemberPress is active (so the card shows **Detected**) and you've read [Migration, Overview](./).

::: warning Screenshot pending
A MemberPress-specific wizard screenshot isn't in our reference folder yet.

[Screenshot needed: Migration wizard mid-flow, MemberPress source]
:::

---

## Mapping: MemberPress to Fluent Members

| MemberPress                       | Fluent Members                    |
|-----------------------------------|------------------------------------|
| Membership (CPT `memberpressproduct`) | Level + Pricing Plan          |
| Membership pricing                | Pricing Plan (Native or Paywall)   |
| Transaction (active)              | Membership row (`active`)          |
| Subscription                      | Subscription row (Pro)             |
| Transaction (paid)                | Transaction row (Pro)              |
| Content protection rule (CPT)     | Access Group + Protected Content rule |
| Corporate accounts (add-on)       | Corporate Level + child rows       |

::: tip In plain language
MemberPress stores memberships as a custom post type; Fluent Members stores them as DB rows. The wizard translates the CPT model into the relational model.
:::

---

## The wizard steps

| # | Step | What it does |
|---|------|--------------|
| 1 | **Detect / analyse** | Counts MemberPress Memberships, transactions, subscriptions. |
| 2 | **Migrate Access Groups** | One Access Group per MemberPress Membership. |
| 3 | **Migrate Levels** | Creates Levels from Membership CPTs; pricing preserved. |
| 4 | **Migrate Memberships** | Per-user Membership rows from active transactions. |
| 5 | **Migrate Orders** (Pro) | Each MemberPress transaction → Fluent Members order/transaction. |
| 6 | **Migrate Transactions** (Pro) | Detailed payment events. |
| 7 | **Migrate Subscriptions** (Pro) | Stripe linkage via the import bridge. |
| 8 | **Cleanup** | Wraps up. |

Same advice as for PMPro: run in order, don't skip, reset if a count looks off.

---

## MemberPress-specific gotchas

- **MemberPress Rules CPT**: MemberPress stores access rules as a separate CPT. The migrator reads those and converts them into Access Group Protected Content rules. Complex rules (multiple conditions, exclusions) may need manual review.
- **Corporate Accounts add-on**: If you use the Corporate Accounts add-on, it maps to Fluent Members Corporate Levels. Seat allocations are preserved.
- **Coupons**: MemberPress coupons don't migrate. Apply equivalent discounts in the new Pricing Plan or run them via Stripe's coupon feature.
- **Custom registration fields**: MemberPress's custom registration fields don't migrate. Use a registration form plugin or [Fluent Forms](https://fluentforms.com) to recreate them.
- **Stripe-attached subscriptions**: Linked via the Stripe-import bridge if [Pro + Stripe Setup](../payment-settings/stripe-setup) is in place.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Levels imported with zero pricing | The Membership had no published pricing. | Add a Pricing Plan manually after import. |
| Subscription bridge missing for some subs | Those subs were on a non-Stripe gateway. | Member needs to re-buy on the new flow. |
| Content rules don't restrict after import | The rule was tied to a CPT slug that doesn't exist on this site. | Check Access Group → Protected Content → adjust the rule. |
| MemberPress Corporate Accounts cap is wrong | The seat-count field maps to Maximum Member; some custom-add-on builds store it elsewhere. | Edit the Level → set Maximum Member manually. |

---

## What's next?

- **→ [Email Notifications](../email-configuration/email-notifications)**: recreate your email templates.
- **→ [Member Portal, Setup](../../members/portal/setup)**: switch your members to the new portal.

**Recommended reading:**
- [Migration, Overview](./): the cross-source rules.
- [Stripe Setup](../payment-settings/stripe-setup): required for subscription bridging.
