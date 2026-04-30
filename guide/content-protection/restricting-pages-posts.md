# Restricting Specific Pages and Posts

Protect a handpicked list of pages or posts — or all of them at once. The most common way to gate content.

**Here's what you'll learn:**
- When page/post restriction is the right fit
- How to add a rule for specific pages or specific posts
- How to restrict *all* pages or *all* posts at once
- What happens to the homepage, the blog index, and archives

**Before we start:** You'll need an [Access Group](../core-concepts/access-groups.md) ready. If you haven't made one yet, create a group first — it takes 3 minutes.

---

## When to use this

Use page/post restrictions when you have a small-to-medium number of specific items to protect:

- A private landing page after registration (Welcome)
- A course home page
- Individual premium blog posts
- A thank-you page visible only to customers
- Any one-off page you want members-only

If you're protecting *every* post in a category or every item of a custom post type, the [category/post-type method](./restricting-categories-post-types.md) is faster. If you want *the whole site* private, see [Restricting the entire website](./restricting-entire-website.md).

---

## Step 1 — Open your Access Group

1. Go to **Fluent Members → Access Groups**.
2. Click the group you want to add a rule to — or create a new one.

---

## Step 2 — Add a restriction rule

1. Scroll to **Content Restriction Rules**.
2. Click **Add Rule**.
3. In the first dropdown, choose your type:
   - **Pages** — for WordPress Pages
   - **Posts** — for WordPress Posts (the blog post type)
4. In the second field, pick specific pages or posts.
5. Click **Save Changes**.

::: info Leaving the second field empty
If you pick **Pages** but leave the specific-items field empty, **all pages on the site** will be restricted. Same story for Posts. That's occasionally what you want (e.g. "everything in the blog is members-only") — but often it's not. Double-check before saving.
:::

![Add page/post restriction rule](/images/content-protection/page-post-rule.png)

---

## Step 3 — Choose what non-members see

Under **Action for Unauthorized Users**, pick:

- **Redirect** — send them to a URL (typically your pricing page)
- **Display a custom message** — replace the content with whatever you type
- **Display partial content** — show a teaser; see [Partial Content Preview](./partial-content-preview.md)

Save the group.

---

## What gets restricted and what doesn't

This is the part most people skip and later ask about. Here's exactly what happens when you restrict a page or post:

| Page type | Restricted? |
|---|---|
| The page/post itself | Yes |
| The homepage (if it's a static page matching the rule) | Yes — unless the homepage is listed in [Public Contents](../settings/public-contents.md) |
| The blog index (`/blog`) | No — it's an archive listing, not a single post |
| Category/tag archives | No — but if you protect a category, see the [category guide](./restricting-categories-post-types.md) |
| Excerpts and previews elsewhere on the site | No — only the full page/post view is protected |

If you want the homepage and a couple of public pages to *always* stay visible (even when you have broader rules), add them to **Fluent Members → Settings → Public Contents**. See [Public Contents](../settings/public-contents.md).

---

## Testing your rule

Always test in an **incognito / private browser window** where you're not logged in — admins bypass all content restrictions, so logged-in admin testing shows the protected content normally.

1. Open incognito.
2. Visit one of the pages you protected.
3. You should see the action you configured — redirect, message, or preview.

---

## A real example — Jordan's newsletter paywall

Jordan runs a weekly newsletter. He publishes 4 free posts a month and 4 premium posts. He doesn't want to use categories (they're messy in his theme), so he just picks the premium posts manually.

**His Access Group: `Premium Posts`**
- **Rule:** Posts → pick-and-choose list, adds new posts each month
- **Action:** Display partial content (first 300 words + overlay)
- **Attached to:** his single paid Level, *Member*

Each week when Jordan publishes a new premium post, he edits the `Premium Posts` access group and adds it to the rule. His theme's blog index is unchanged — readers see the post excerpts as normal, but clicking through shows the teaser + paywall.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Protected page is still visible | You're logged in as admin — admins bypass everything | Test in incognito |
| The homepage is suddenly blocked | Your homepage is a Page that got caught by an all-pages rule | Add it to Settings → Public Contents |
| Post listing pages still show protected post excerpts | That's normal — only the single view is protected | Use category/post-type rule if you want listings gated too |
| Rule saved but nothing changes | Status on the Access Group is Inactive | Set the group's Status to Active |

---

## What's next?

**→ [Restricting categories and post types](./restricting-categories-post-types.md)** — if you have many items to protect at once.

**Related reading:**
- [Public Contents](../settings/public-contents.md) — the allow-list that overrides rules
- [Partial Content Preview](./partial-content-preview.md) — soft paywall instead of a hard block
