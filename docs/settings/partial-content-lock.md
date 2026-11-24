---
title: "Partial Content Lock"
description: "Show visitors the first words of protected content, faded or blurred, with a message and a button, by choosing the teaser in Restricted content settings."
---

# Partial Content Lock

**Partial Content Lock** shows visitors the first words of protected content, followed by a faded or blurred ending with a message and a button. Use it when a preview would convince a visitor to join. It is now the **A teaser** option in **Restricted content** settings, not a separate settings tab.

## Turn it on

1. Go to **Fluent Members → Settings → Restricted content**.
2. Next to **Non-members see**, choose **A teaser**.
3. Set the fields below.
4. Click **Save Settings**.

![Screenshot of Restricted content settings with A teaser selected and the teaser fields showing](/images/settings/partial-content-lock/partial-content-lock-1.webp)

The setting applies across your site to protected posts, pages and restricted blocks. The screen shows a live preview as you change it.

## Fields

| Field | Notes |
|---|---|
| **Teaser length** | Words shown before the call to action. From 10 to 500, in steps of 10. 50 by default. |
| **Teaser style** | How the last lines look: **Fade out** or **Blur**. Blur is the default. |
| **Message** | A headline and a sentence below the teaser. Leave blank to use the default text, shown as the placeholder. |
| **Button** | The button label, and where it goes: **Pricing page** (the page set in General Settings) or **Another page or URL**. |
| **Show "Already a member? Log in"** | Opens a login form on the same page for logged-out visitors. |
| **Open the login form right away** | Available when the login link is on. Opens the login form as soon as a protected page loads. See [Login Popup](/docs/settings/login-popup). |

Colors and fonts come from your theme.

The button shows only when it has text and a destination. If **Button** points to the pricing page and none is set, the button is hidden.

## When the teaser doesn't show

Protected content falls back to something else in these cases:

- **Redirect:** With **Redirect** chosen, or a level or Bundle set to redirect, visitors are sent to the page instead.
- **Short content:** Content no longer than **Teaser length** shows the normal restriction message instead.
- **Media only:** Content with no text shows a blurred placeholder.
- **Dripped content:** A member waiting for [Content Drip](/docs/content-access/content-drip) sees the countdown notice.
- **Turned off for one item:** See below.

## Change it for one post or block

With **A teaser** on, the editor shows extra controls once a level or Bundle is picked: **Enable Partial Content Lock**, **Preview Word Count**, **Overlay Message**, **Button Text**, **Button URL**, **Login link** and **Login Link Text**. Use them to turn off the preview for one item or give it different wording.

- For a whole post, see [Protect a single post](/docs/content-access/per-post-restrictions).
- For one block, see [Restricted Content block](/docs/content-access/gutenberg-block/inserting#change-the-preview-for-one-block). The container block always uses the settings on this page.

> [!Note]
> Posts showing a preview stay in blog and archive lists even when **Archives and feeds** is set to **Hide them from lists**.
