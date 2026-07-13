# Shortcode Reference

Fluent Members ships **two** shortcodes. Both work in the Classic Editor, the Block Editor (via the Shortcode block), and in any theme template that calls `do_shortcode()`.

## The `[fluent_membership_level]` shortcode

Renders a pricing card / table for one Membership Level. Each Pricing Plan attached to the level becomes a buy button.

### Attributes

| Attribute | Type | Required | Default | What it does |
|---|---|---|---|---|
| `id` | integer | yes | none | The Level ID, from **Fluent Members → Levels**. |

That's the only attribute the shortcode accepts. Everything else (setup fee, trial length, billing cadence, the "billed every…" summary line) comes from the Pricing Plan you configured on the Level itself, in **Fluent Members → Levels → [your level] → Pricing Plans**, not from shortcode parameters.

If `id` is missing or `0`, the shortcode outputs "Invalid membership level ID." If the ID doesn't match a Level in the database, it outputs "Membership level not found." If no payment provider is active for the site, it renders nothing.

### Example

Show the pricing card for Level ID 4:

```text
[fluent_membership_level id="4"]
```

::: tip Finding the Level ID
Go to **Fluent Members → Levels** in wp-admin. The first column is the ID.
:::

### Where the Buy Buttons Go

Fluent Members checks which payment integrations are active and renders one buy button per available provider on each Pricing Plan:

- **FluentCart** → checkout for the mapped FluentCart product, if FluentCart is active.
- **WooCommerce** (Pro) → checkout for the mapped WooCommerce product, if WooCommerce and Pro are both active.
- **Fluent Forms** → the mapped form's URL, if Fluent Forms is active.
- **Paymattic** → the mapped form's URL, if Paymattic is active.
- **Native** (Pro) → the plugin's own Stripe or PayPal checkout, if Pro is active.
- **Migrated** → for sites that migrated from Paid Memberships Pro or MemberPress, pricing rows carried over from the old plugin render here automatically, even without a payment integration configured yet.


## The `[fluent_member_portal]` Shortcode

Mounts the Member Portal, a Vue-based self-service area where logged-in members see their memberships and (if Pro) manage payment methods or invite team-members.

### Attributes

None. The portal reads its data from the logged-in user, so there's nothing to configure inline.

### Example

```text
[fluent_member_portal]
```

Put it on any page (the plugin will offer to create one for you from **Settings → General → Create Portal Page**). Logged-out visitors see a "please log in" prompt; logged-in members see their dashboard.

### What Renders

| Section                     | Free | Pro |
|-----------------------------|:----:|:---:|
| Membership list             | ✅   | ✅  |
| Status badges               | ✅   | ✅  |
| Start date / expiry         | ✅   | ✅  |
| Cancel button               | ✅   | ✅  |
| Corporate seat panel        |      | ✅  |
| Update payment method       |      | ✅  |
| Renew failed subscription   |      | ✅  |

## What about the Gutenberg Block?

Fluent Members also ships **one** Gutenberg block, `fluent-members/access-group`, that wraps inner content and restricts it inline. It is NOT a shortcode; it's a real block. See [The Access Group Block](/guide/access-groups/gutenberg-block/inserting).


