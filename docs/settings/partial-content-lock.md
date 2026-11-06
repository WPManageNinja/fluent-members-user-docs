---
title: "Partial Content Lock"
description: "Show visitors the first words of protected content, then a blurred overlay with a message and a button."
---

# Partial Content Lock

**Partial Content Lock** shows visitors the first words of protected content, followed by a blurred overlay with a message and a button. Use it when a preview would convince a visitor to join.

It is off by default. Once you turn it on, it applies across your site to protected posts, pages and blocks.

## Turn it on

1. Click the **Settings** gear icon at the top right of any **Fluent Members** screen.
2. Click **Partial Content Lock** in the left menu.
3. Turn on **Partial Content Blur Settings**. The fields below appear.

    ![Screenshot of the Partial Content Lock screen with the Partial Content Blur Settings toggle turned off](/images/settings/partial-content/settings-partial-content-lock-1.webp)

4. Set the fields as described below.
5. Click **Save Settings**.

    ![Screenshot of the Partial Content Lock screen with the toggle on and every field showing](/images/settings/partial-content/settings-partial-content-lock-2.webp)

## Fields

Every field below applies across the site:

| Field | Notes |
|---|---|
| **Preview Length** | Words shown before the blur. From 10 to 500, 50 by default. |
| **Overlay Color** | Color of the gradient over the blurred content. White by default. |
| **Overlay Opacity** | How solid the overlay looks, from 0 to 100. 80 by default. |
| **Overlay Message** | The text on the overlay. |
| **Message Color** | Color of that text. |
| **Button Text** | The button label. |
| **Button URL** | Where the button goes, such as your pricing page. |
| **Button Color** | Button background. |
| **Button Text Color** | Button text. |
| **Button Size** | **Small**, **Medium** (default) or **Large**. |

The button shows only with both text and a URL. If you leave **Button Text** empty on a protected post, it uses the button from the group's [When Unauthorized](/docs/access-groups/unauthorized-access) message instead.

## What visitors see

The blur appears below a readable preview:

![Screenshot of a protected post on the site with a readable preview, blurred text, the overlay message and a Get Access button](/images/settings/partial-content/partial-content-lock-frontend.webp)

The blurred part is a copy of the preview, not the rest of your article, so the hidden text never reaches the visitor's browser.

## When the preview doesn't show

Protected content falls back to something else in these cases:

- **Redirect groups:** A group set to **Redirect to a specific URL** still redirects.
- **Logged-out visitors with the login popup on:** With [Login Popup](/docs/settings/login-popup) and **Auto Open Popup** turned on, the login form opens over the preview on protected posts and pages.
- **Short content:** Content no longer than **Preview Length** shows the normal restriction message instead.
- **Media only:** Content with no text shows a blurred placeholder with the overlay.
- **Dripped content:** A member waiting for [Content Drip](/docs/access-groups/content-drip) sees the countdown notice.
- **Turned off for one item:** See below.

## Change it for one post or block

When this feature is on, the editor shows extra controls in the **Access Groups** panel once a group is ticked: **Enable Partial Content Lock**, **Preview Word Count**, **Overlay Message**, **Button Text** and **Button URL**. Use them to turn off the preview for one item or give it different wording.

- For a whole post, see [Protect a single post](/docs/access-groups/per-post-restrictions#change-the-preview-for-this-post).
- For one block, see [Access Groups block](/docs/access-groups/gutenberg-block/inserting#change-the-preview-for-one-block). The container block always uses the settings on this page.

> [!Note]
> Posts showing a preview stay on your blog and archives even when **Show restricted posts on listing pages** is off in [Default unauthorized access](/docs/settings/unauthorized-access).
