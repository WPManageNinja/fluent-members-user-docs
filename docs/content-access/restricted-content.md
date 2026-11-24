---
title: "Restricted Content Settings"
description: "Set what visitors without access see site-wide: a teaser, a message or a redirect, plus how protected posts appear in lists and feeds."
---

# Restricted Content Settings

**Restricted content** sets the default for everyone who opens protected content without access. Every level and [Bundle](/docs/content-access/bundles) uses it unless it sets its own message.

It replaces the separate Unauthorized Access, Partial Content Lock and Login Popup settings from earlier versions. A live preview on the right shows your changes as a visitor would see them.

## Open the settings

1. Go to **Fluent Members → Settings → Restricted content**.
2. Change the options below.
3. Click **Save Settings** at the top.

![Screenshot of the Restricted content settings with the form on the left and the live preview on the right](/images/content-access/restricted-content/restricted-content-settings.webp)

## Choose what visitors see

**Non-members see** has three choices. A new site starts on **A message**.

| Choice | What visitors get |
|---|---|
| **A teaser** | The start of the post, then your message and button. |
| **A message** | Your message and button in place of the content. |
| **Redirect** | They go to another page. |

### Redirect

Choose **Redirect** and enter a page under **Send them to**, such as your pricing or login page. Type `/` and part of a title to search, or paste a URL. The address must be on your own site. To send visitors to another domain, a developer must allow it with the `allowed_redirect_hosts` WordPress filter.

### A teaser

These options appear when you choose **A teaser**:

- **Teaser length:** How many words visitors read before the message. From 10 to 500 in steps of 10. The default is 50.
- **Teaser style:** How the last lines look, **Fade out** or **Blur**. The default is **Blur**.

A post that is shorter than the teaser length shows only the message, with no teaser. You can override the teaser for one post in the editor. See [Protect a single post](/docs/content-access/per-post-restrictions).

### Message and button

These apply to **A teaser** and **A message**:

| Field | Notes |
|---|---|
| **Message** | A headline (up to 120 characters) and a sentence that sells the membership. The headline starts as `Members only`. |
| **Button** | The button text, which starts as `Join now`, and where it goes. Choose **Pricing page** to use the page set in [General Settings](/docs/settings/general), or **Another page or URL** and enter an address. With no pricing page set, the button is hidden. |
| **Show "Already a member? Log in"** | Adds a login link for logged-out visitors. It opens a login form on the same page. |
| **Open the login form right away** | Appears when the login link is on. Logged-out visitors see the login form as soon as a protected page loads. |

## Archives and feeds

**Archives and feeds** decides how protected posts appear in lists:

- **Title and a members-only note:** The default. The note replaces the excerpt where your theme shows one.
- **Title and the written excerpt:** Only posts with a hand-written excerpt show it. Other posts show the members-only note.
- **Title only:** No excerpt.
- **Hide them from lists:** Protected posts don't appear in lists. Administrators still see every post, and posts with a free preview or a scheduled release stay listed.

Feeds always show the members-only note, and search never lists protected posts.

## Check the preview

The **Live preview, as a visitor** panel updates as you type. Switch between **Desktop** and **Mobile**. Under a teaser it says how many words visitors read before the message. Colours and fonts come from your theme, so the preview is a guide, not an exact match.

## Levels and bundles with their own message

At the bottom of the form, a note lists any levels or bundles that use their own settings, with a link to each. Open one to change or reset it. See [What blocked visitors see](/docs/content-access/unauthorized-access).

Click **Save Settings** to apply your changes to every level and bundle on the site default.
