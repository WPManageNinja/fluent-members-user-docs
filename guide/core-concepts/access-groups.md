# Access Groups — Deciding What to Protect

An Access Group is a labelled bundle of rules that tells Fluent Members which content is protected and what non-members see when they try to reach it.

By the end of this page, you'll know how to create a group, add restriction rules, decide what happens to unauthorised visitors, and connect groups to your Membership Levels.

**Here's what you'll learn:**
- What an Access Group actually is (and why they're separate from Levels)
- How to create one
- How to add restriction rules — pages, posts, categories, post types, or the whole site
- How to control what non-members see (redirect, custom message, or preview)
- How to attach a group to a Membership Level

**Before we start:** It helps to have read the [Core Concepts](./index.md) overview first — otherwise some of the "why" on this page will feel abstract.

---

## What an Access Group is, really

An Access Group is like a **folder with rules attached**.

You drop content into the folder (pages, posts, post types) and you set the rules (*only Pro members can see this*; *show non-members a custom message*). Then you attach that folder to one or more [Membership Levels](./membership-levels.md).

::: tip In everyday words
Access Group = *the locked content*. Membership Level = *the key*. Member = *the person holding the key*.
:::

### Why groups, not a direct Level → content link?

Because groups are reusable. One group like *Premium Articles* can be unlocked by your *Monthly*, *Annual*, and *Lifetime* plans — all at once — without you duplicating content rules three times.

---

## When you'd actually use this

- You sell online lessons and want to protect them all at once.
- You run a newsletter and want only subscribers to read posts in the *Premium* category.
- You want to lock a single page (like a Live Event) behind a specific plan.
- You want your entire site private, and only logged-in members to see anything.
- You're using custom post types (courses, resources, files) and want to protect them.

---

## Step 1 — Create the group

Let's make Sara's first group: `Pro Content`.

Before we touch any buttons: we're creating an empty, named container. We'll fill it with rules in Step 2.

1. In your WordPress sidebar, open **Fluent Members → Access Groups**.
   *This is where all your groups live. On a fresh install the list is empty.*
2. Click **Add New Group** at the top right.
   *A form appears.*
3. Fill in the fields:
   - **Title** — Give it a name your future self will recognise. Sara types `Pro Content`.
   - **Description** — Optional, but useful for teams. Sara types *"All premium yoga lessons."*
   - **Status** — Leave as **Active**. Inactive groups are ignored by the restriction engine — useful when you want to "pause" a group without deleting it.
4. Click **Create**.
   *The group saves and opens so you can add rules.*

![Create Access Group](/images/access-groups/create-group.png)

::: tip Small win
A green success message means the group is saved. Your group now exists in the `fmem_access_groups` database table — but it doesn't protect anything yet.
:::

---

## Step 2 — Add Restriction Rules

This is the heart of the feature. Rules tell the group *which content is protected*.

Behind the scenes, each rule is stored with a **restriction type** (the kind of content) and an optional list of specific item IDs. You can add as many rules to a group as you need.

1. Inside the group you just created, scroll to **Content Restriction Rules**.
2. Click **Add Rule**.
   *A new rule row appears with two fields.*
3. In the first field, pick a **Restriction Type**:
   - **Pages** — restricts specific pages, or all pages
   - **Posts** — restricts specific posts, or all posts
   - **Categories** — restricts all posts in the chosen categories
   - **Post Types** — restricts an entire custom post type (courses, lessons, etc.)
   - **Entire Website** — blocks everything on the site from non-members
4. In the second field, pick the specific items (if the type supports it). Leave empty to restrict *all* items of that type.
5. Click **Add Rule** again to add more rules — groups can hold multiple rules.
6. Click **Save Changes** at the bottom right.
   *A green toast confirms it's saved.*

::: info Rule types
See dedicated guides for each rule type:
- [Restricting pages and posts](../content-protection/restricting-pages-posts.md)
- [Restricting categories and post types](../content-protection/restricting-categories-post-types.md)
- [Restricting the entire website](../content-protection/restricting-entire-website.md)
:::

---

## Step 3 — Choose what non-members see

This is the "what happens if someone without access lands here?" setting. It sits right under the rules.

Under **Action for Unauthorized Users**, you have three choices:

### Option A — Redirect to a specific URL
Good when you want non-members sent to a pricing page. You type a URL, and any unauthorised visitor is redirected.

Example use: *"Send them to my /become-a-pro-member page."*

### Option B — Display a custom message
Good when you want to keep the visitor on the page. The protected content is replaced with whatever HTML you type in the **Custom Message** field.

Example use: *"This lesson is for Pro members. [Join now](https://fluentmembers.com/pricing)."*

### Option C — Display partial content (if enabled)
Good when you want to tease the content. The visitor sees the first N words, then an overlay with a call-to-action. Set this up globally in [Partial Content settings](../settings/partial-content-defaults.md) first.

Example use: *Newsletter sites showing the first paragraph, then a paywall.*

::: tip Heads up
If you enable the [Login Popup](../settings/login-popup.md) globally, it takes priority for non-logged-in visitors — they see a login box instead of the redirect or message.
:::

---

## Step 4 — Attach the group to a Membership Level

A group on its own doesn't do anything — it needs to be attached to a Level. The attachment says *"holders of this Level can see what's in this group."*

1. Go to **Fluent Members → Levels**.
2. Open an existing Level (or [create one](./membership-levels.md) if you haven't yet).
3. In the **Access Groups** field, tick the group(s) this Level should unlock.
4. Click **Update**.

That's it. Your group is now live: it protects content, and members with the attached Level(s) can see through it.

---

## Content Dripping — release content over time

Access Groups also support [Content Dripping](../content-protection/content-dripping.md). With dripping enabled on a group, content unlocks gradually — for example, *"Lesson 3 becomes available 14 days after signup."*

This is optional. If you're building a linear course or bootcamp, it's one of the most-loved features. Leave the Content Dripping toggle off if you don't need it.

---

## A real example — Sara's setup

Sara runs two tiers: **Free** and **Pro**. Here's how her Access Groups look:

### Group: `Intro Videos`
- **Rule 1:** Post Type → `lesson`, specific items: lesson 1, lesson 2, lesson 3
- **Action:** Display a custom message — *"Sign up for free to watch."*
- **Attached to Levels:** Free, Pro

### Group: `Full Library`
- **Rule 1:** Post Type → `lesson` (all items, leaving Intro-Videos to override for its three)
- **Rule 2:** Category → `live-replays` (all posts in that category)
- **Action:** Redirect to `/become-a-pro-member`
- **Attached to Levels:** Pro

The result: Sara's three intro lessons are free for any logged-in user. Everything else is Pro-only. No duplication.

![Sara's access groups list](/images/access-groups/saras-setup.png)

---

## Editing, duplicating, and deleting groups

- **Edit** — Click any group title in the list to open it. Make changes, click **Update Group**.
- **Delete** — Open a group and click **Delete**. This is irreversible, but it does *not* delete the content itself — only the restriction rules.

::: warning Before you delete
Deleting a group that's attached to active Levels will instantly make all the content in those rules public again. If the group is no longer needed but you're not sure, set its **Status** to *Inactive* instead — it stops protecting but preserves the config.
:::

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Content still visible to non-members after adding a rule | You're viewing as an admin (admins bypass restrictions) | Test in an incognito window |
| "No access groups found" in the Level dropdown | No groups exist yet, or they're all marked inactive | Create a group first; double-check status |
| Members can see some pages but not others | Those pages might be in your [Public Contents](../settings/public-contents.md) allow-list | Check Settings → Public Contents |
| Protection seems to stop working after a caching plugin clear | The restriction check runs at page render time, usually unaffected — but some aggressive full-page caches can serve cached protected HTML | Exclude protected URLs from your cache, or clear cache |

Still stuck? Jump to [Troubleshooting](../../reference/troubleshooting.md).

---

## What's next?

You now understand the content side of Fluent Members. The natural next step is creating the plan that unlocks this group.

**→ [Membership Levels](./membership-levels.md)** — build the plans your visitors can buy.

**Related reading:**
- [Content Dripping](../content-protection/content-dripping.md) — release content on a schedule
- [Partial Content Preview](../content-protection/partial-content-preview.md) — teaser-and-paywall pattern
- [Gutenberg Access Group block](../content-protection/gutenberg-block.md) — protect specific blocks inside a post
