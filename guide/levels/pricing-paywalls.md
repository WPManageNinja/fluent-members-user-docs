# Paywalls Pricing

A **Paywall** is a Pricing Plan that points at an existing product or form in another plugin, FluentCart, Fluent Forms, or Paymattic. The buyer pays inside that plugin's checkout; Fluent Members grants the Level when the payment lands.

::: info Part of Chain 2: Buy & onboard · step 2 of 6
**Previously:** [Pricing: Native Payment](/guide/levels/pricing-native)
**Next:** [Transactions List](/guide/transactions/)

See the full chain in the [Chain Map](/reference/chain-map).
:::

Use Paywalls when you already sell through one of those plugins. Use [Native Payment](./pricing-native) when you want one tool (Stripe) to do everything.

**Here's what you'll learn:**
- How to open the Pricing modal and pick *Paywalls*.
- Where the pickable items in *Select Pricing* come from.
- The hard rule about which forms / products are eligible.
- How the membership gets granted after payment.

**Before we start:** A Level already exists ([Creating a Level](./creating)). The host plugin (FluentCart, Fluent Forms, or Paymattic) is installed and has at least one matching product or form.

---

## Step 1: Open the Pricing tab

1. **Fluent Members → Levels → your Level**.
2. Click **Pricing**.
3. Click **+ Add Pricing**.

The **Add Pricing** modal appears.

---

## Step 2: Pick Paywalls

In the **Pricing Type** dropdown, pick **Paywalls**.

![Pricing Type dropdown showing Paywalls + Native Payment](/screenshots/level-pricing-type-dropdown.webp)

The modal now shows a **Select Pricing** typeahead and an info banner.

---

## Step 3: Pick an existing product or form

Click into **Select Pricing**. A grouped list opens, items from each host plugin you have active.

| Group              | Items shown                                                  |
|--------------------|--------------------------------------------------------------|
| **FluentCart Products** | All FluentCart products with a single fixed price.       |
| **Fluent Forms**   | Payment forms that take exactly one fixed-price item.        |
| **Paymattic**      | Paymattic forms with a single fixed-price item.              |
| **WooCommerce** *(Pro)* | WC products with a single fixed price.                  |

![Select Pricing typeahead showing FluentCart Products + Fluent Forms](/screenshots/level-pricing-paywalls-typeahead.webp)

Pick one and click **Add**. The Pricing Plan is created and linked to that product/form.

::: warning Only simple paywalls work
The modal's info banner reads:
> *"Only payment forms with a single fixed-price or subscription item are listed. Forms with custom payment inputs, donation fields, or multiple pricing options are not supported."*

If your product or form lets the buyer type their own amount, has multiple plans inside one form, or supports donations, it won't appear here. Create a simpler version dedicated to this Level instead.
:::

---

## Step 4: Verify the link

After saving, the Pricing tab shows the new Plan with the host plugin's icon and price. From here the chain is:

1. Buyer clicks the Pricing card's button → they're taken to the host plugin's checkout (FluentCart cart, Fluent Forms form, etc.).
2. Buyer pays, your existing payment processor handles it (Stripe via FluentCart, PayPal via Paymattic, whatever you've configured there).
3. Host plugin fires a "payment completed" event.
4. Fluent Members listens, finds the matching Pricing Plan, and grants the Level to the buyer's WordPress user.

::: tip In plain language
Native Payment is "we'll take the money." Paywalls is "you take the money over there, just tell us when it lands."
:::

---

## How Paywalls compares to Native Payment

| | **Paywalls** | **Native Payment** |
|---|---|---|
| Needs Fluent Members Pro | No (FluentCart/Forms/Paymattic). WooCommerce is Pro. | Yes |
| Where checkout happens | Host plugin's checkout | Built into Fluent Members |
| Money flow | Through host plugin's gateway | Direct to your Stripe account |
| Refunds / subscription management | In the host plugin | Inside Fluent Members → Transactions |
| Best when… | You already sell through one of these | You want everything in one tool |

---

## A real example: Sara via FluentCart

Sara already runs FluentCart for her ebook shop. She:

1. Creates a FluentCart product *"Pro Yoga, Monthly Subscription"* at $19/mo.
2. In Fluent Members, opens her *Pro Yoga* Level → Pricing → **+ Add Pricing**.
3. Picks **Paywalls** → searches *"Pro Yoga"* → selects the FluentCart product.
4. Adds the Plan.

Buyer side: someone clicks Subscribe → FluentCart cart → Stripe Elements (FluentCart's own) → payment success → FluentCart fires its event → Fluent Members grants Pro Yoga.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Empty dropdown / no products listed | Host plugin isn't active, or none of its products meet the "single fixed-price" rule. | Activate the plugin; create or simplify a product. |
| Buyer paid but never got access | Host plugin's webhook / event didn't reach Fluent Members. | Check the host plugin's logs; ensure the product is linked. |
| Multiple Pricing Plans for the same Level get out of sync | That's fine, they're independent rows. Members can buy any one of them. | No fix needed; just be sure each maps to its own product. |
| WC product missing | WooCommerce paywalls need Fluent Members Pro. | Install Pro. |

---

## What's next?

- **→ [Attaching Access Groups](./attaching-access-groups)**: make the Level unlock content after the buyer pays.
- **→ [Pricing, Native Payment](./pricing-native)**: compare with the built-in path.

**Recommended reading:**
- [Glossary, Paywall](/guide/glossary): short definition.
- [Membership Statuses](/reference/membership-statuses): what state the new member lands in.
