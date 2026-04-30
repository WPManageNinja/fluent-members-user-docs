# Restricting the Entire Website

Make your whole site members-only in a single toggle — with a handful of public pages (Home, Pricing, Login) kept accessible.

By the end of this page, you'll know how to flip the site into fully private mode, keep the handful of pages visitors still need to see, and avoid the common traps.

**Here's what you'll learn:**
- What "entire website" protection actually restricts
- How to turn it on safely, without locking yourself out
- How to keep specific pages public (Home, Pricing, Login)
- How it interacts with other restriction rules
- How to safely turn it off

**Before we start:** Be sure you have at least one [Membership Level](../core-concepts/membership-levels.md) with active members *before* you turn this on, unless you're in private testing. Otherwise every visitor — including yourself in incognito — will be blocked.

---

## When to use this

Private communities, member-only portals, client intranets, paid publications that refuse any public content. If your model is *"join or leave"*, this is the right setting.

If you want a mixed site — some public posts, some gated — don't use this. Use the per-page or per-category rules instead.

---

## Step 1 — Create (or open) an Access Group

Entire-website protection is just another rule type, attached to a normal Access Group.

1. Go to **Fluent Members → Access Groups**.
2. Create a new group (or open an existing one) — call it something like *Private Site*.
3. Attach it to the Membership Level(s) that should grant site access.

---

## Step 2 — Add the Entire Website rule

1. In the group, click **Add Rule**.
2. First dropdown → **Entire Website**.
3. There's nothing to fill in for the second field — this rule covers everything.
4. Click **Save Changes**.

![Entire website restriction rule](/images/content-protection/entire-website-rule.png)

::: warning Before saving
Make sure you've added essential pages (Home, Pricing, Login, Contact) to your [Public Contents](../settings/public-contents.md) allow-list *before* you save this rule — otherwise they'll be blocked too, and new visitors won't be able to sign up.
:::

---

## Step 3 — Add essentials to Public Contents

Public Contents is the allow-list that always stays accessible, no matter what rules exist. Typical essentials:

- **Home page** (so visitors can land)
- **Pricing / Membership Plans** (so they can sign up)
- **Login & Register** (the WP login page is already public, but custom login pages aren't)
- **Contact / About** (optional but human)
- **Privacy Policy / Terms** (legally required)

Set this up in **Fluent Members → Settings → Public Contents**. See the full guide: [Public Contents](../settings/public-contents.md).

---

## How it interacts with other rules

Entire-Website protection covers everything **except**:
- Pages listed in Public Contents
- Content explicitly allowed by another (less-restrictive) Access Group? **No — more restrictive wins.**

::: tip Heads up — it's OR, not AND
If any Access Group says a page is restricted, it's restricted. Protection rules stack additively. So you can't "unrestrict" a page by attaching it to a permissive group — you'd need to put it in Public Contents instead.
:::

---

## Step 4 — Choose what non-members see

Same three options as any other rule:

- **Redirect** — most common. Send them to your pricing page or sign-up page.
- **Custom message** — keeps them on the page they tried to visit.
- **Partial content preview** — tease them with a snippet, then paywall.

For whole-site protection, **Redirect to your pricing page** is usually the right choice.

---

## Testing without locking yourself out

**Admins always bypass content restrictions**, so while you're logged in, you won't notice the restriction. To test:

1. Open an incognito window.
2. Visit the site's home page — if it's in Public Contents, you should see it.
3. Click through to any other page — you should see the redirect/message/preview.
4. Log in as a member (different account) — everything should be accessible.

---

## Turning it off

If you need to undo this later:

Option 1 — **Disable just this rule.** Open the Access Group, find the Entire Website rule, and remove it. All other rules stay in place.

Option 2 — **Deactivate the whole group.** Change the group's Status to **Inactive**. Fast, reversible.

Option 3 — **Delete the group.** Irreversible; other rules in the group are lost.

---

## A real example — A client portal

A consultancy uses WordPress as a client portal. Only clients with an active membership should see anything.

**Public Contents allow-list:**
- `/` (homepage)
- `/how-to-sign-up`
- `/contact`
- `/login` (custom page)

**Access Group: `Client Portal Access`**
- Rule: Entire Website
- Action: Redirect to `/login`
- Attached to: *Client* Level

Any visitor hitting a page that isn't on the allow-list is redirected to the login page. After logging in as a Client, they can navigate freely. Non-clients see only the four pages.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| My homepage isn't showing to visitors | You forgot to add it to Public Contents | Settings → Public Contents → add homepage |
| Incognito still sees pages that should be blocked | Entire-Website rule saved but the Access Group is Inactive | Activate the group |
| WordPress login page is redirecting to itself | Login page is usually safe, but a Redirect action pointing *at* the login page could loop | Redirect to `/pricing` or similar instead |
| API calls / webhooks failing after turning this on | REST API endpoints respect restriction too | Whitelist needed API paths or keep a lightweight Access Group that allows them |

---

## What's next?

**Related reading:**
- [Public Contents](../settings/public-contents.md) — the essential allow-list
- [Login Popup](../settings/login-popup.md) — show a login box instead of redirecting
- [Access Groups](../core-concepts/access-groups.md) — how rules work in general
