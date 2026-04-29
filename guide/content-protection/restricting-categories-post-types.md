# Restricting Categories and Post Types

Protect every post in a category, or every item of a custom post type, in a single rule. Perfect for content libraries.

**Here's what you'll learn:**
- When category/post-type rules are the right fit
- How to protect every post in one or more categories
- How to protect every item of a custom post type
- How new content gets protected automatically
- Gotchas with archive pages

**Before we start:** You should have an [Access Group](../core-concepts/access-groups.md) to add the rule to.

---

## When to use this

- You run a course with 50 lesson posts — protect the `lesson` post type.
- You have a category called *Premium* and want every post in it gated.
- You're adding new protected content weekly and don't want to update rules each time.

The payoff: **new content is protected automatically** the moment you publish it in the matching category or post type.

---

## Method A — Protect a category

1. Open your Access Group.
2. Click **Add Rule**.
3. First dropdown → **Categories**.
4. Second field → pick one or more categories.
5. Click **Save Changes**.

Every post currently in the chosen categories — plus every future post — is now protected. That's it.

![Category restriction rule](/images/content-protection/category-rule.png)
<!-- SCREENSHOT-NEEDED
Page: Access Group edit screen
State: Rule Type="Categories" with two categories selected
Highlight: The category multi-select
-->

::: tip About posts in multiple categories
If a post is in both a restricted category and an unrestricted category, it's still restricted. Protection wins as long as *any* of its categories matches a rule.
:::

---

## Method B — Protect a custom post type

WordPress lets you register custom post types — think *Courses*, *Lessons*, *Products*, *Resources*, *Download files*. Fluent Members can protect them all.

1. Open your Access Group.
2. Click **Add Rule**.
3. First dropdown → **Post Types** (or the specific post type name if it's listed).
4. Second field → optionally pick specific items of that type, or leave empty to cover all.
5. Click **Save Changes**.

::: info Which post types appear?
Fluent Members lists all **public** post types registered on your site. If your custom post type was registered with `public => false`, it won't appear here.
:::

---

## What about archive pages?

Archive pages — the `/category/premium/` URL that lists all posts in that category — are **not** restricted by this rule. Only the individual post view is.

Why? Because WordPress archives are listing pages; they typically show excerpts. If your theme shows the full content in archives and you want that protected too, restrict the category itself as a Page rule (pick the category archive page) or use [Partial Content Preview](./partial-content-preview.md).

If you want *both* individual posts and the archive gated, two options:
1. Add a second rule for the archive URL via [Page restriction](./restricting-pages-posts.md).
2. Use [Partial Content Preview](./partial-content-preview.md) globally.

---

## Adding new content to a protected category/post type

There's nothing to do. If you publish a new post in a protected category, or a new item in a protected post type, it inherits the protection immediately. No re-saving of the Access Group needed.

This is the main reason course creators love this rule type — they focus on writing content, not updating rules.

---

## A real example — Sara's lesson library

Sara's course site has a custom post type called `lesson`. She also has a category called *Live Replays* on her standard posts.

**Her Access Group: `Full Library`**
- **Rule 1:** Post Types → `lesson` (all items)
- **Rule 2:** Categories → `live-replays`
- **Action:** Redirect to `/become-a-pro-member`
- **Attached to:** Pro Plan only

Every time Sara publishes a new lesson or a new live replay, Fluent Members automatically gates it. Her 3 intro lessons are handled by a *separate* Access Group (`Intro Videos`) that picks them out by ID and overrides with a "free sign-up" message.

---

## Combining category rules with other restriction types

You can mix rule types freely inside a single group. A common pattern:

**Access Group: `VIP Content`**
- Rule 1: Categories → `vip-articles`
- Rule 2: Post Types → `resource`
- Rule 3: Pages → `/members-only-live-event`

All three rules apply together. Any content matching *any* rule is protected.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Archive page still shows excerpts of protected posts | That's by design — archives list, they don't display protected content fully | If needed, protect the archive page separately |
| New post in the category isn't protected | The Access Group's Status may be Inactive | Set it to Active |
| "Post Types" dropdown doesn't include my CPT | Your CPT is registered as private, or hasn't loaded yet | Make sure the plugin that registers it runs before Fluent Members |
| Homepage accidentally blocked after a rule | Homepage may match an all-posts or all-pages rule | Add homepage to [Public Contents](../settings/public-contents.md) |

---

## What's next?

**→ [Restricting the entire website](./restricting-entire-website.md)** — for a fully private site.

**Related reading:**
- [Content Dripping](./content-dripping.md) — schedule access to category/post-type items
- [Access Groups](../core-concepts/access-groups.md) — the big picture
