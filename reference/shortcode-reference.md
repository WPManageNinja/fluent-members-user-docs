# Shortcode Reference

Fluent Members ships **two** shortcodes. Both work in the Classic Editor, the Block Editor (via the Shortcode block), and in any theme template that calls `do_shortcode()`.

## `[fluent_membership_level]`

Renders a pricing card / table for one Membership Level. Each Pricing Plan attached to the level becomes a buy button.

### Attributes

| Attribute           | Default        | What it does                                                                 |
|---------------------|----------------|--------------------------------------------------------------------------------|
| `id`                | **required**   | The Level ID, from **Fluent Members → Levels**.                                |
| `payment_type`      | (all)          | Restrict displayed plans to one price type: `one_time`, `recurring`, `lifetime`, `trial`, `free`. |
| `signup_fee`        | (from plan)    | Override the displayed setup fee.                                              |
| `trial_days`        | (from plan)    | Override the trial-period label.                                                |
| `repeat_interval`   | (from plan)    | Override the billing cadence text shown next to the price.                      |
| `billing_summary`   | `yes`          | `yes` shows the small "billed every…" line; `no` hides it.                      |

### Examples

Show the pricing card for Level ID 4:

```text
[fluent_membership_level id="4"]
```

Show only the monthly recurring plan:

```text
[fluent_membership_level id="4" payment_type="recurring"]
```

Drop the small billing-summary line under the price (cleaner for hero sections):

```text
[fluent_membership_level id="4" billing_summary="no"]
```

### Where the buy buttons go

Each button links to the matching provider:
- `default` provider → the plugin's own native checkout page (Pro to actually charge with Stripe; free for `free` plans).
- `fluentcart` → FluentCart checkout for the mapped product.
- `woocommerce` (Pro) → WooCommerce checkout for the mapped product.
- `fluentform` → the form's URL.
- `paymattic` → the form's URL.
- `stripe` (Pro) → native Stripe checkout flow.

::: tip Finding the Level ID
Go to **Fluent Members → Levels** in wp-admin. The first column is the ID.
:::

---

## `[fluent_member_portal]`

Mounts the Member Portal, a Vue-based self-service area where logged-in members see their memberships and (if Pro) manage payment methods or invite team-members.

### Attributes

None. The portal reads its data from the logged-in user, so there's nothing to configure inline.

### Example

```text
[fluent_member_portal]
```

Put it on any page (the plugin will offer to create one for you from **Settings → General → Create Portal Page**). Logged-out visitors see a "please log in" prompt; logged-in members see their dashboard.

### What renders

| Section                     | Free | Pro |
|-----------------------------|:----:|:---:|
| Membership list             | ✅   | ✅  |
| Status badges               | ✅   | ✅  |
| Start date / expiry         | ✅   | ✅  |
| Cancel button               | ✅   | ✅  |
| Update payment method       |,    | ✅  |
| Renew failed subscription   |,    | ✅  |
| Corporate seat panel        |,    | ✅  |
| Recent transactions         |,    | ✅  |

---

## What about the Gutenberg block?

Fluent Members also ships **one** Gutenberg block, `fluent-members/access-group`, that wraps inner content and restricts it inline. It is NOT a shortcode; it's a real block. See [The Access Group Block](/guide/access-groups/gutenberg-block/inserting).

---

**What's next?**
- [Quick Start](/guide/quick-start): see both shortcodes in action.
- [The Access Group Block](/guide/access-groups/gutenberg-block/inserting): the block-editor equivalent.
- [Member Portal Setup](/guide/members/portal/setup): where `[fluent_member_portal]` belongs.
