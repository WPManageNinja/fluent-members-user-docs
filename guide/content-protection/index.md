# Content Protection — Every Way to Gate Your Content

Fluent Members offers seven different ways to control what non-members see. This overview helps you pick the right one.

There's no single right answer. The feel of your site changes dramatically based on the method you pick. This page is your map — pick the one that fits your goal.

**Here's what you'll learn:**
- The seven content-protection approaches Fluent Members supports
- When each one is the right fit
- How they stack together (some do, some don't)
- Where to go next for each

## The seven protection methods

### 1. Restricting specific pages or posts
You pick a list of individual pages/posts to protect. Non-members get redirected, blocked, or previewed.

Best for: a small number of premium pages (a private landing page, a course home, a resource page).

**→ [Restricting pages and posts](./restricting-pages-posts.md)**


### 2. Restricting categories or custom post types
You protect *all* posts in a category, or every item of a custom post type (like `lesson`, `course`, `resource`).

Best for: structured content libraries — courses, lessons, premium articles.

**→ [Restricting categories and post types](./restricting-categories-post-types.md)**

### 3. Restricting the entire website
The big red button. Every page of your site becomes members-only. A couple of allow-listed pages (Home, Pricing, About) stay public.

Best for: private communities, B2B portals, internal tools.

**→ [Restricting the entire website](./restricting-entire-website.md)**

### 4. Partial Content Preview
Non-members see the first N words of a protected post, followed by a stylised overlay with a "Become a member" call-to-action.

Best for: content marketers who want teasers to drive conversions — newsletter paywalls, premium article sites.

**→ [Partial Content Preview](./partial-content-preview.md)**

---

### 5. Content Dripping
Content unlocks gradually, based on how long a member has been signed up. *Lesson 2* unlocks 7 days after joining, *Lesson 3* unlocks 14 days after, and so on.

Best for: structured courses, bootcamps, email-sequence-style memberships.

**→ [Content Dripping](./content-dripping.md)**

---

### 6. Gutenberg Access Group block
Protect *specific blocks* inside a post — not the whole page. You can have an introduction that's public, then a block that says *"Members only"*, then a video that only members see.

Best for: mixed-access pages where some content is public and some is gated.

**→ [Gutenberg Access Group block](./gutenberg-block.md)**

---

### 7. REST API protection
When a protected post is fetched via the WordPress REST API (used by some themes, apps, and page builders), Fluent Members respects the restriction there too. You don't have to configure this — it's automatic.

**→ [REST API protection](./rest-api-protection.md)** *(advanced)*

---

## How they stack

| Method | Stacks with others? |
|---|---|
| Pages/posts | Yes — can combine with any other rule |
| Categories/post types | Yes |
| Entire website | Overrides everything; other rules still respected inside |
| Partial preview | Used **as** the action for any restriction — not a rule itself |
| Content dripping | Applies on top of any Access Group; works alongside other rules |
| Gutenberg block | Works inside a post regardless of other rules |
| REST API | Automatic — respects whatever rule applies |

---

## How do I decide?

Use this decision tree:

```
Do you want the WHOLE site to be members-only?
└── Yes → "Restricting the entire website"
└── No → Continue

Do you want to protect a few specific pages?
└── Yes → "Restricting pages and posts"
└── No → Continue

Do you have a custom post type (course, lesson, resource)?
└── Yes → "Restricting categories and post types"
└── No → Continue

Should non-members see a teaser, not a hard block?
└── Yes → "Partial Content Preview" (on top of any rule above)
└── No → Continue

Should content unlock over time?
└── Yes → "Content Dripping"
└── No → A simple page/post or category rule is enough

Is the content mixed (some public, some member-only) within ONE post?
└── Yes → "Gutenberg Access Group block"
```

---

## What's next?

Pick the method that fits your situation and go deep:

- [Restricting pages and posts](./restricting-pages-posts.md)
- [Restricting categories and post types](./restricting-categories-post-types.md)
- [Restricting the entire website](./restricting-entire-website.md)
- [Partial Content Preview](./partial-content-preview.md)
- [Content Dripping](./content-dripping.md)
- [Gutenberg Access Group block](./gutenberg-block.md)
- [REST API protection](./rest-api-protection.md)

**Related reading:**
- [Access Groups](../core-concepts/access-groups.md) — the container for all restriction rules
- [Login Popup](../settings/login-popup.md) — show a login box instead of a redirect
