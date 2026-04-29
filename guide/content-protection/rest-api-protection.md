# REST API Protection

Fluent Members respects your restriction rules when content is fetched through the WordPress REST API, too. No extra setup needed.

**Here's what you'll learn:**
- What REST API protection does (and doesn't do)
- How it behaves for logged-in and logged-out users
- What's returned when access is denied
- When to whitelist specific endpoints

**Before we start:** This is an advanced topic. If you're just building a standard membership site with the WordPress editor, you don't need to read this. Everything works automatically.

---

## What it does

When a protected post is requested via the WordPress REST API — endpoints like `/wp-json/wp/v2/posts/123` — Fluent Members checks whether the requester is allowed to see that content. If not:

- **Unauthenticated requests** → 401 Unauthorized (or the content is stripped from the response).
- **Authenticated requests without access** → 403 Forbidden, or sanitised content (depending on Fluent Members settings and rule action).
- **Authenticated requests with access** → Full content returned normally.

This ensures that even if your theme or app fetches posts via the REST API, protected content stays protected.

---

## When this matters

- **Headless WordPress** — Next.js, Nuxt, Gatsby, or any frontend fetching posts via REST.
- **Page builders using REST** — Some dynamic-listing widgets hit the REST API to render recent posts.
- **Mobile apps** — Apps built on top of the WordPress REST API.
- **Search integrations** — Algolia, Elasticsearch connectors using REST.

If you use any of these, Fluent Members protection follows through.

---

## How authentication is checked

Fluent Members uses the standard WordPress REST authentication mechanisms:

- **Cookie auth** (default for logged-in browser sessions) — the user is automatically recognised.
- **Application Passwords** — WordPress's built-in token system.
- **JWT / custom auth plugins** — as long as they set `current_user_id()` correctly, Fluent Members respects them.

The Access Group engine runs regardless of auth method. It asks one question: *"Can this user ID see this post?"*

---

## What gets returned on denial

The response depends on the Access Group's configured action:

| Group action | API response |
|---|---|
| Redirect | `403` with a JSON body indicating no access |
| Custom message | `200` with `content` replaced by the custom message |
| Partial content | `200` with the preview content + overlay markup |

This mirrors what happens in a browser — the denial mode is consistent everywhere.

---

## Whitelisting endpoints

In most cases you don't need to whitelist anything. But two scenarios come up:

**Scenario 1 — Your own custom plugin exposes an endpoint that serves member-only data.** Fluent Members doesn't touch custom endpoints unless they map to post content. If you're building a custom endpoint, enforce your own access checks.

**Scenario 2 — You want a specific post protected on the frontend but open via REST** (rare, usually for syndication feeds). Add that post or its category to [Public Contents](../settings/public-contents.md).

---

## Things to know for developers

- The protection runs via the `rest_api_init` filter hook, applied to the standard `posts`, `pages`, and all public custom post type routes.
- Admins (users with `manage_options` capability) bypass all checks — useful for admin tooling.
- The filter runs on the *prepared response* — after WordPress has built the object but before it's sent — so you can further modify it with your own `rest_prepare_{post_type}` filter.

---

## What's next?

Back to the [Content Protection overview](./index.md).

**Related reading:**
- [Access Groups](../core-concepts/access-groups.md) — the underlying rule system
- [Public Contents](../settings/public-contents.md) — the allow-list that overrides rules
- [Troubleshooting](../../reference/troubleshooting.md) — debugging tips for headless setups
