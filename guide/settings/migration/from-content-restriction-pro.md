# Migration from Content Restriction Pro

The third source. Same 8-step wizard structure as [PMPro](./from-paid-memberships-pro) and [MemberPress](./from-memberpress), with Content Restriction Pro–specific mapping.

::: info Part of Chain 10: Migration · step 6 of 6
**Previously:** [Migration from MemberPress](/guide/settings/migration/from-memberpress)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: tip Name change
Content Restriction Pro is the same plugin many know as "Restrict Content Pro" (RCP). Fluent Members' UI labels it as **Content Restriction Pro**, that's the name to look for on the Migration card.
:::

**Here's what you'll learn:**
- How RCP / Content Restriction Pro maps to Fluent Members.
- The wizard steps adapted for this source.
- RCP-specific gotchas.

**Before we start:** Content Restriction Pro is active (card shows **Detected**) and you've read [Migration, Overview](./).

::: warning Screenshot pending
A Content Restriction Pro wizard screenshot isn't in our reference folder yet.

[Screenshot needed: Migration wizard mid-flow, Content Restriction Pro source]
:::

---

## Mapping: Content Restriction Pro to Fluent Members

| Content Restriction Pro          | Fluent Members                    |
|----------------------------------|------------------------------------|
| Subscription Level                | Level                              |
| Level pricing                    | Pricing Plan                       |
| Member (subscription)            | Membership row                     |
| RCP Payments                     | Transaction (Pro)                  |
| RCP Subscription                 | Subscription (Pro)                 |
| Restrictions (per-post meta)     | Access Group + Protected Content rule |
| Drip rules                       | Content Drip on the matching Access Group |

::: tip In plain language
Content Restriction Pro's "this member holds level X" becomes a Fluent Members membership row exactly the same way as PMPro's, the wizard reads RCP's schema and writes Fluent Members' schema.
:::

---

## The wizard steps

Unlike the PMPro and MemberPress wizards (which expose a separate REST endpoint per step), the RCP wizard drives a **single** `runStep` endpoint that takes the step name as a parameter. The UI you see is still step-by-step, but under the hood it's one endpoint called repeatedly with different step values:

| # | Step name passed to `runStep` | What it does |
|---|--------------------------------|---------------|
| 1 | `detect` / `analyze`           | Counts levels, members, payments, subs. |
| 2 | Migrate Access Groups          | One Group per RCP Level. |
| 3 | Migrate Levels                 | RCP Levels → Fluent Members Levels. |
| 4 | Migrate Memberships            | Per-user rows. |
| 5 | Migrate Payments (Pro)         | Transactions imported. |
| 6 | Migrate Drip                   | Drip rules → Content Drip on matching Access Groups. |
| 7 | Migrate Subscriptions (Pro)    | Stripe-import bridge if Pro + Stripe Setup. |
| 8 | Cleanup                        | Wraps up. |

::: tip In plain language
For a regular user, the wizard just feels like a sequence of click-and-wait steps. The single-endpoint design only matters if you're building custom tooling — you can call the same endpoint multiple times by changing the step name.
:::

Step 6 ("Migrate Drip") is a first-class step here because RCP has explicit drip rules — same as PMPro, unlike MemberPress where drip data doesn't migrate.

---

## Content Restriction Pro–specific gotchas

- **Drip rules**: RCP's "post X is available N days after subscription" maps cleanly. Verify each Access Group's Content Drip rules after step 6.
- **Free Trials**: RCP supports trial periods on levels. These import as Trial-type Pricing Plans.
- **Discount codes**: Like the other sources, coupons don't migrate. Recreate them in your Stripe Dashboard if needed.
- **Custom user fields**: Don't migrate; recreate via registration plugin if needed.
- **Email templates**: Manual rebuild after migration; the wizard imports data, not templates.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Drip rules say "0 days" everywhere after step 6 | RCP's drip metadata uses a different storage format than what the migrator expected. | Manually verify a few; the rest should follow the same pattern. |
| Member statuses say "Cancelled" but they're still paying in Stripe | RCP uses "Active" for paying-but-already-cancelled-at-period-end. Default migrator rule may map these to Cancelled. | Re-check status filter; consider migrating with broader "still active" criteria. |
| Subscription count after migration is lower than RCP shows | RCP counts non-Stripe subs too (manual, offline). Those aren't bridged. | Manual subs need manual Migration. |

---

## What's next?

- **→ [Email Notifications](../email-configuration/email-notifications)**: rebuild your welcome email.
- **→ [Member Portal, Setup](../../members/portal/setup)**: give members the new URL.

**Recommended reading:**
- [Migration, Overview](./): the cross-source rules.
- [Stripe Setup](../payment-settings/stripe-setup): for the Stripe-import bridge.
- [Content Drip](/guide/levels/content-drip): verify imported drip rules.
