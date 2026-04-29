# Integrations — Connecting Fluent Members to the Rest of Your Stack

Fluent Members talks to six other plugins out of the box. This page helps you pick the right ones for your setup.

This page gives you the overview. Each linked page walks you through setting up one integration in detail.

**Here's what you'll learn:**
- Which payment plugin to pick (if you haven't chosen one yet)
- Which non-payment plugins extend Fluent Members
- How integrations are detected automatically
- What order to set them up in

---

## How integrations work (the short version)

Every integration works the same way: **install the other plugin**, and Fluent Members detects it automatically and adds the relevant hooks, settings, and UI. You don't need to "enable" integrations manually — they appear when both plugins are active.

Each integration plugin exposes either:
- **Paywalls** (payment plugins): sell memberships through the other plugin's checkout
- **Restrictions** (shop plugins): protect the other plugin's own content (like WooCommerce products)
- **Triggers/Hooks** (automation plugins): let the other plugin react to Fluent Members events
- **Widgets** (support plugins): show Fluent Members data inside the other plugin's UI

---

## Payment integrations (pick at least one)

You need at least one payment integration to sell memberships. Here's how to choose:

| Your situation | Recommended |
|---|---|
| Starting fresh, want simplest setup | [FluentCart](./fluent-cart.md) |
| Already running a WooCommerce shop | [WooCommerce](./woocommerce.md) |
| Want a simple paid form, no e-commerce | [Fluent Forms](./fluent-forms.md) or [Paymattic](./paymattic.md) |
| Need WooCommerce Subscriptions for recurring billing | [WooCommerce](./woocommerce.md) + WC Subscriptions |
| Want both subscriptions and one-time purchases | [FluentCart](./fluent-cart.md) or WooCommerce |

You can use **multiple** payment integrations simultaneously. Many sites use FluentCart for subscriptions and WooCommerce for one-time physical product sales.

---

## Non-payment integrations

### [FluentCRM](./fluent-crm.md) — Automated email marketing
Exposes Fluent Members events as triggers in FluentCRM automations. Send a welcome sequence when someone joins, a winback when they expire, etc.

### [FluentSupport](./fluent-support.md) — Support ticket context
Shows each customer's active memberships in their support ticket sidebar. Your team sees who's on which plan at a glance.

---

## What order should I set these up?

If you're building a site from scratch:

1. **Install Fluent Members** → set up [Levels](../core-concepts/membership-levels.md) and [Access Groups](../core-concepts/access-groups.md).
2. **Install a payment integration** → see guides below. Connect products to Levels.
3. **Test a purchase end-to-end** → buy as a visitor, verify the Level is assigned.
4. **Install FluentCRM (optional)** → set up a Welcome automation.
5. **Install FluentSupport (optional)** → if you run a support desk, this gives context.

---

## Integration pages

- [FluentCart](./fluent-cart.md) — native e-commerce, subscriptions
- [WooCommerce](./woocommerce.md) — the biggest WP commerce platform
- [Fluent Forms](./fluent-forms.md) — form-based paid signups
- [Paymattic](./paymattic.md) — payment forms
- [FluentCRM](./fluent-crm.md) — automation triggers
- [FluentSupport](./fluent-support.md) — support context

---

## Things to know

- Each integration requires the matching plugin to be **installed and active**.
- When you deactivate the other plugin, the Fluent Members integration goes dark automatically — no data is lost, nothing breaks.
- Multiple payment plugins can be active at once. Members who bought through Woo can coexist with members who bought through FluentCart.
