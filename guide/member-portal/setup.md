# Setting Up the Member Portal

The Member Portal is the frontend page your members log in to see and manage their memberships. One shortcode, one page, and you're done.

**Here's what you'll learn:**
- What the Member Portal is and why you need one
- How to create the portal page in three minutes
- How to link to the portal from your site nav
- What happens for logged-out visitors vs members
- How it interacts with corporate plans

**Before we start:** You'll need an active membership on your site (even a test one) to actually see the portal populated. If it's brand-new, [add a member manually](../members/adding-a-member-manually.md) first.

---

## Why you need a Member Portal

Your members pay you. They want a place to:
- Confirm which plan they're on
- See their renewal date
- Cancel if they need to
- Invite teammates (for corporate plans)

Without a portal, every one of those becomes a support ticket. A proper portal eliminates 80% of your repeat questions.

::: tip In everyday words
The Member Portal = the "my account" page — but for memberships.
:::

---

## Step 1 — Create a page

1. Go to **Pages → Add New**.
2. Give it a title — common choices: **My Membership**, **Account**, **Dashboard**.
3. Add a **Shortcode** block (or paste directly into any block that allows shortcodes).
4. Type:

   ```
   [fluent_member_portal]
   ```

5. Publish the page.

![Member portal page setup](/images/member-portal/portal-page-editor.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Pages → Add New (Gutenberg)
State: Page titled "My Membership" with the shortcode block showing [fluent_member_portal]
Highlight: The shortcode block
-->

That's it — the portal is live. Visit the page in a logged-in browser to see it.

---

## Step 2 — Add a link to it from your site navigation

To make the portal easy to find:

1. Go to **Appearance → Menus** (or your theme's menu settings).
2. Add a Custom Link pointing to your portal page's URL.
3. Label it **My Membership** or **Account**.
4. Save.

Many sites also add the portal link inside a user dropdown in the header — check your theme's options.

---

## Step 3 — Test both states

### As a logged-out visitor
Open an incognito window and visit the portal URL. You'll see a login prompt. This is intentional — the portal needs a logged-in user to show memberships.

### As a logged-in member
Log in as a test user with an active membership. Visit the portal. You should see:
- Your name
- Your active memberships (one row per membership)
- Status, start date, expiry date for each
- A cancel action
- A team panel (if you hold a corporate plan)

---

## What the portal renders

The portal is a Vue.js application that renders into the page. It fetches data from the `fluent-members/v2` REST API using the logged-in user's session.

Specifically, it shows:

| Panel | Contents |
|---|---|
| Profile header | User name, email, avatar |
| Active Memberships | Each active/trial membership with level, status, start/expiry |
| Billing history | Past orders (if the payment provider shares them) |
| Team Members | Only for corporate parents — roster with invite and remove actions |
| Account actions | Cancel membership, edit profile |

The portal respects your active theme — it inherits the background, typography, and containers from your theme's single-page layout.

---

## Styling the portal

The portal ships with its own styles, but it uses CSS variables so you can tweak it:

- Primary colour
- Button colour
- Border radius
- Container max-width

Add CSS to your theme or child theme using standard selectors. The portal's root element is `.fmem-portal`.

For deeper styling, see the [Member Portal – What Members See](./what-members-see.md) page.

---

## A real example — Sara's portal setup

Sara creates a page titled **My Yoga Membership** at `yourdomain.com/my-yoga-membership/`. Inside, she adds the shortcode:

```
[fluent_member_portal]
```

In her header menu, she adds a link labelled **My Account** that points to this URL, visible only when logged in (her theme supports conditional menus).

For new members, the welcome email links them straight to this page. After the first visit, members bookmark it and return whenever they need.

Sara customises the portal CTA colour to match her brand teal with:

```css
.fmem-portal .btn-primary {
  background-color: #2dd4bf;
}
```

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Portal page shows the raw shortcode text `[fluent_member_portal]` | Shortcodes aren't being processed — wrong block type or theme issue | Use a proper Shortcode block, or wrap in `do_shortcode()` if using page builder |
| "Please log in" even though I'm logged in | Theme or caching plugin serving a cached logged-out version | Exclude the portal page from full-page cache |
| Empty portal for a user who should have a membership | Membership status might not be `active` or `trial` | Check the member record |
| Team panel missing for a corporate parent | Their Level might be Individual type | Verify the Level's type is Corporate |

---

## What's next?

**→ [What Members See in the Portal](./what-members-see.md)** — tour of the portal interface.

**Related reading:**
- [Cancelling Membership](./cancelling-membership.md) — what the cancel flow does
- [Corporate Memberships](../core-concepts/corporate-memberships.md) — the team panel in detail
- [Shortcodes & Blocks](../shortcodes-and-blocks.md) — every shortcode Fluent Members ships
