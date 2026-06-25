# General Settings

The first tab in **Settings**. Three controls that affect the whole site: which pages stay public, which page is your member portal, and what currency you trade in.
**Here's what you'll learn:**
- Each of the three fields and what it does.
- The fastest way to create the portal page.
- How currency is applied.

**Before we start:** Click the gear icon in the top-right of any Fluent Members screen → **General Settings** is the first item in the left rail.

---

## The three fields

![General Settings, full layout](/screenshots/settings-general.webp)

---

### Exclude Content from Restriction

A typeahead. Type the title of a page, post, or CPT item; the dropdown shows matches. Pick one to exclude it from *every* Access Group's protection, that piece of content stays public no matter what.

::: tip In plain language
This is the universal allow-list. Use it for genuinely public pages, Home, About, Contact, Pricing, Privacy Policy. Anything you add here is invisible to the restriction engine.
:::

**Use it for:**
- Pricing page (so even if it's a CPT, non-members reach it).
- About / Contact pages on otherwise locked-down sites.
- Legal pages (Privacy, Terms).

**Don't use it for:**
- Anything you only want *some* members to see, that's what Access Groups are for.

---

### Generate Portal Page

A page-picker dropdown with a **+** button to its right.

| Action | What it does |
|--------|---------------|
| **Pick an existing page** | Tell Fluent Members "this page is my member portal." Internal links in emails and admin notices point to it. |
| **Click +** | Auto-create a new page with `[fluent_member_portal]` and select it. The fastest setup path. |

Below the dropdown an inline tip reads: *"Use 🔗 `[fluent_member_portal]` shortcode in your page. Edit / Preview."* The Edit / Preview links open the selected page.

See [Member Portal, Setup](../members/portal/setup) for the full setup walkthrough.

---

### Select Currency

A dropdown with flag icons. Picks the currency Fluent Members uses for new Pricing Plans by default.

| Currency choice affects… | How |
|---|---|
| New Pricing Plans | Default `currency` value (you can override per Plan). |
| Display labels | `$19.00` vs `€19.00` vs `£19.00` etc. |
| Stripe charges | Stripe must accept this currency for your account. |

::: warning Currency is per-Plan, not per-site
The setting here is just the default. Each Pricing Plan can override the currency. If your Stripe account supports multi-currency, you can sell in EUR on one Plan and USD on another.
:::

---

## The Save button

In the top-right of the page is **Save Settings**. It saves all three fields together. No per-field save.

---

## A real example: Sara's first-day setup

Sara opens General Settings on a fresh install:

1. **Exclude Content from Restriction**, she adds her Home, Pricing, About, Contact, Privacy, Terms.
2. **Generate Portal Page**, clicks **+**. A *Member Portal* page is auto-created. She renames it to *My Yoga Account* via the Edit link.
3. **Select Currency**, picks USD.
4. Clicks **Save Settings**.

Total time: under 60 seconds. The site is configured.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Public page still gets the Unauthorized fallback | Page isn't in *Exclude Content from Restriction*. | Add it. |
| Currency change didn't update existing Plans | The setting is for *new* Plans only. | Edit each Plan, set the new currency. |
| Generate Portal Page **+** creates a duplicate page each time | Each click creates a new page. | Delete the duplicates from Pages → All Pages. |
| Save shows success but field reverted | Auto-saving conflict with another tab. | Reload the page, edit once, save. |

---

## What's next?

- **→ [Partial Content Lock](./partial-content-lock)**: the soft-paywall styling.
- **→ [Login Popup](./login-popup)**: the popup styling.

**Recommended reading:**
- [Member Portal, Setup](../members/portal/setup): pair this with the Generate Portal Page step above.
- [Access Groups, Overview](/guide/access-groups/): the engine that respects *Exclude Content from Restriction*.
