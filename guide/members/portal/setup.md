# Member Portal Setup

The Member Portal is a single page on your site (any page you choose) where logged-in members see their memberships and manage them. It exists because the alternative, admin-managed everything, doesn't scale.
**Here's what you'll learn:**
- The single shortcode that powers the portal.
- The fastest way to create the portal page from inside Fluent Members.
- How to create one manually if you prefer.
- Where to link your members to.

**Before we start:** No prerequisites. The portal works even on a brand-new install, it just shows an empty state until someone has a membership.

---

## The shortcode

The whole portal is one shortcode:

```text
[fluent_member_portal]
```

Drop it on any WordPress page or post. When a logged-in member visits, the page renders their membership panel. Visitors who aren't logged in see a sign-in prompt.

::: tip In plain language
You don't theme the portal manually. The shortcode is a "render the portal here" instruction; the plugin draws the rest.
:::

---

## Option A: Let Fluent Members create the page for you

This is the fast path.

1. **Fluent Members → Settings → General Settings**.
2. Find the **Generate Portal Page** field. It's a page-picker dropdown with a **+** button to its right.
3. Click **+**. Fluent Members:
   - Creates a new WordPress page.
   - Inserts the shortcode into the page's content.
   - Publishes the page.
   - Saves the new page's ID into the Generate Portal Page setting so the plugin can link to it.
4. The dropdown now shows the new page (e.g. *Member Account (373)*). Below it, an inline tip reads *"Use 🔗 `[fluent_member_portal]` shortcode in your page. Edit / Preview."*

You're done. Click **Edit** to rename the page; click **Preview** to see it on the front end.

![General Settings, Generate Portal Page field](/screenshots/settings-general.webp)

---

## Option B: Create the page manually

If you already have a page you want to repurpose:

1. Open the page in the WordPress editor.
2. Add a **Shortcode** block (or paste into the Classic Editor as plain text).
3. Type: `[fluent_member_portal]`
4. Publish.
5. Go back to **Fluent Members → Settings → General Settings → Generate Portal Page** and select your existing page from the dropdown so the plugin knows where to link.

::: warning Pick one page
The plugin assumes there's one portal page. If you have the shortcode on multiple pages, they all *render*, but member-side links (e.g. from emails) will only point at the one in Settings.
:::

---

## Step: Link members to the portal

Once the page exists, give members a way to reach it:

- **Site menu.** Add the page to your primary navigation (Appearance → Menus). Common label: *My Membership* or *My Account*.
- **Email signature.** Include the portal URL in your Welcome Email body (see [Email Notifications](/guide/settings/email-configuration/email-notifications)).
- **Header dropdown.** Use a theme's user-menu widget that auto-links to a configured "account page", point it at the portal page.

::: tip One link that always works
Once Settings → General Settings → Generate Portal Page is set, every internal "go to the portal" link in Fluent Members emails and admin notices uses *that* page. Setting it correctly is mostly housekeeping, but it's the difference between members landing on the right page and getting confused.
:::

---

## What members see when they visit

Walk through [What Members See](./what-members-see) for the full tour. Short summary:

- **Logged in with active memberships:** card per membership, with Cancel (always), Update Payment Method (Pro), Renew (Pro), and corporate Team panel (Pro).
- **Logged in with no membership:** an empty state directing them to the pricing page.
- **Logged out:** sign-in prompt.

---

## A real example: Sara sets up her portal in 60 seconds

Sara's running through Fluent Members for the first time:

1. **Settings → General Settings**.
2. Generate Portal Page → click **+**.
3. A new page called *Member Portal* (or similar) is auto-created and selected.
4. Sara renames it to *My Yoga Membership* via the **Edit** link.
5. Adds the page to her header menu.

Total time: under a minute. Her members can now log in and see their plan.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Page shows the literal text `[fluent_member_portal]` | Shortcode didn't process, usually a theme or page-builder swallowing it. | Use a Shortcode block (Block Editor) or a basic page template. See [Troubleshooting → Portal page shows raw shortcode](/reference/troubleshooting). |
| Logged in but the portal says "Please log in" | A cache layer is serving the logged-out version. | Disable page-caching for this URL. |
| Two portal pages, two URLs | You forgot Option B step 5. | Pick the canonical one in Settings → General Settings. |
| Members see other members' info | Theme is caching the rendered page across users. | Disable page caching for the portal URL; use object cache instead. |

---

## What's next?

- **→ [What Members See](./what-members-see)**: the full tour of the rendered portal.
- **→ [Cancelling a Membership](./cancelling)**: the member-driven cancel flow.

**Recommended reading:**
- [General Settings](/guide/settings/general): the surrounding settings tab.
- [Shortcode Reference](/reference/shortcode-reference), `[fluent_member_portal]` documented.
