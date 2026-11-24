---
title: "Default Unauthorized Access"
description: "Set what visitors without access see by default on protected content, and how restricted posts appear in lists, from Restricted content settings."
---

# Default Unauthorized Access

**Restricted content** in Settings sets what happens when a visitor without access reaches protected content. It also controls how restricted posts appear in excerpts and lists. It replaces the old **Unauthorized Access** settings tab. Set one site-wide behaviour here, then override it only on the levels or Bundles that need something different.

## Open the settings

Go to **Fluent Members → Settings → Restricted content**. A live preview on the right shows what visitors see as you change the fields.

![Screenshot of Restricted content settings with A message selected and the live preview beside it](/images/settings/unauthorized-access/unauthorized-access-1.webp)

## Who uses these settings

Every level and Bundle uses these settings unless it sets its own. A change here reaches all of them, including existing ones. At the bottom of the screen, a note lists any levels or Bundles that use their own settings, with links to them. See [What blocked visitors see](/docs/content-access/unauthorized-access).

## Non-members see

Choose what happens when someone opens protected content.

| Option | What happens |
|---|---|
| **A message** | The visitor stays on the page and sees your message. |
| **A teaser** | The visitor sees the first words, then your message. See [Partial Content Lock](/docs/settings/partial-content-lock). |
| **Redirect** | The visitor goes straight to another page. |

### Message and button

Shown with **A message** and **A teaser**.

| Field | Notes |
|---|---|
| **Message** | A headline and a sentence. Leave them blank to use the defaults: **Members only** and "This content is for members only. Please join to get access." |
| **Button** | The label (**Join now** by default) and a destination: **Pricing page** or **Another page or URL**. Type `/` to search your content, or paste a URL. |
| **Show "Already a member? Log in"** | Adds a login link for logged-out visitors. See [Login Popup](/docs/settings/login-popup). |

### Redirect

**Send them to** is required and must be on this site, such as your pricing or login page. Other domains need the `allowed_redirect_hosts` filter.

## Archives and feeds

Choose how protected posts show in blog pages, archives and feeds:

| Option | What visitors see |
|---|---|
| **Title and a members-only note** | The title with the members-only note in place of the excerpt. This is the default. |
| **Title and the written excerpt** | The excerpt you typed on the post. A post with no hand-written excerpt shows the members-only note. |
| **Title only** | No excerpt. |
| **Hide them from lists** | Posts visitors can't access are left out of lists. |

Feeds always show the members-only note, and search never lists protected posts. Administrators always see every post. Posts with a free preview or a scheduled release stay listed even with **Hide them from lists**.

## Save your changes

Click **Save Settings** to apply your changes.
