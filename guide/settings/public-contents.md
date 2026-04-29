# Public Contents — The Always-Visible Allow List

Some pages must always stay public, no matter what rules you set. Public Contents is where you list them.

**Here's what you'll learn:**
- What Public Contents does in the restriction pipeline
- Which pages you should always add to it
- How to add or remove pages
- Gotchas (blog index, archive URLs, custom paths)

**Before we start:** This setting becomes essential when you've enabled [Entire Website restriction](../content-protection/restricting-entire-website.md). For per-page protection, you usually don't need it.

---

## Why Public Contents exists

Content rules in Fluent Members stack additively — if any rule matches, the content is restricted. That's great for locking things down, but it's dangerous for pages that *must* stay public, like your pricing page.

Public Contents is the **override**: pages listed here are **always** publicly accessible, no matter what rules you have.

::: tip In everyday words
Access Groups = locked doors. Public Contents = the lobby — always open, always visible.
:::

---

## Pages you'll usually add

These are the usual suspects every membership site keeps public:

- **Home page** — so new visitors can land
- **Pricing / Membership Plans** — so they can sign up
- **Login** — so members can get back in
- **Register / Sign Up** — if separate from login
- **Contact / About** — good UX, not required
- **Privacy Policy** — legally required in most jurisdictions
- **Terms of Service** — same
- **Blog index** — often required so your archive still works (even if individual posts are protected)

---

## Step 1 — Open the Public Contents settings

1. Go to **Fluent Members → Settings**.
2. Click the **Public Contents** tab.

You'll see a multi-select field listing all your pages and posts.

![Public Contents settings](/images/settings/public-contents.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Settings → Public Contents
State: Multi-select with 5-6 pages chosen (home, pricing, login, privacy, etc.)
Highlight: The multi-select field
-->

---

## Step 2 — Add your essential pages

1. Click inside the multi-select.
2. Type to search, or scroll through the list.
3. Click each page you want to keep public. Selections appear as tags.
4. Click **Save Changes**.

A green confirmation toast means they're saved.

---

## Removing a page from the allow-list

1. Click the **×** next to the page tag in the multi-select.
2. Click **Save Changes**.

The page is now subject to your regular content rules again.

---

## What counts as a "page" here?

The list you pick from includes:
- All Pages
- All Posts
- Custom post type items (if the post type is marked public)

It does **not** include:
- Archive URLs (`/category/premium/`, `/blog`, `/author/sara`)
- Tag pages
- Custom URLs not tied to a WordPress object

If you need to whitelist a URL that isn't a specific post — say, your blog archive — you'll need to configure that differently. Most themes expose the blog archive as a Page you can select; check **Settings → Reading** to see.

---

## Interaction with other settings

- Public Contents **always wins**. Even if a rule explicitly restricts a page, if it's in Public Contents, it stays visible.
- This includes the [Entire Website restriction](../content-protection/restricting-entire-website.md) — Public Contents carves out the exceptions.

---

## A real example — Angela's client portal

Angela runs a client-only portal with site-wide restriction. Her Public Contents list:
- Home (`/`)
- How to Sign Up (`/how-to-sign-up`)
- Login (`/login`)
- Contact (`/contact`)
- Privacy Policy (`/privacy`)
- Terms (`/terms`)

Every other URL is gated. Clients register via the sign-up page, log in, and then see the full portal.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| My pricing page is blocked despite being on the list | List wasn't saved, or it's a different URL | Save again; verify the page ID matches |
| Blog archive (`/blog`) still blocked | You can't whitelist archives directly | Set your WordPress Reading settings so the blog index is a Page, then whitelist that page |
| New page I added is blocked | It's not in the Public Contents list | Add it |
| Custom login page blocked | Even custom login pages are post-type pages — add to the list | Add `/login` page to the list |

---

## What's next?

**Related reading:**
- [Entire Website restriction](../content-protection/restricting-entire-website.md) — where this setting is critical
- [Login Popup](./login-popup.md) — alternative to redirecting blocked visitors
