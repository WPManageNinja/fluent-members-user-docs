---
title: "Default Unauthorized Access"
description: "Set what visitors without access see by default on protected content, in post excerpts and on listing pages."
---

# Default Unauthorized Access

**Default Unauthorized Access** sets what happens when a visitor without access reaches protected content. It also controls how restricted posts appear in excerpts and on listing pages. Use it to set one site-wide behaviour, then override it only on the Access Groups that need something different.

## Open the settings

Click the **Settings** gear in the top-right corner of any Fluent Members screen, then click **Unauthorized Access**.

![Screenshot of the Unauthorized Access settings with Display a custom message selected, showing Custom Message, Button Text, Button URL, Excerpts of Restricted Posts and Show restricted posts on listing pages](/images/settings/unauthorized-access/unauthorized-access-message.webp)

## Which Access Groups use these settings

An Access Group uses these settings until you click **Customize for this rule** on its **When Unauthorized** card. See [What blocked visitors see](/docs/access-groups/unauthorized-access).

> [!Note]
> The text on this screen says existing Access Groups are not affected. In the current version, a group that has not been customized reads these settings each time a visitor is blocked, so a change here reaches those groups too. A customized group keeps its own settings.

## Action for Unauthorized Users

Choose what happens on protected content. The fields below change with your choice.

### Display a custom message

This is the default. The visitor stays on the page and sees your message.

| Field | Notes |
|-------|-------|
| **Custom Message** | Required. The default is "This content is for members only. Please join to get access." |
| **Button Text** | Optional button below the message. Leave it blank to hide the button. |
| **Button URL** | Where the button links, such as your pricing or registration page. Type `/` to search your content, or paste a URL. |

### Redirect to a specific URL

The visitor goes straight to another page.

![Screenshot of the Unauthorized Access settings with Redirect to a specific URL selected and the Redirect URL field filled with /pricing/](/images/settings/unauthorized-access/unauthorized-access-redirect.webp)

**Redirect URL** is required and must be on this site, such as `/pricing/` or your login page.

## Excerpts of Restricted Posts

Choose what visitors without access see in place of a restricted post's excerpt:

- **Show the restriction message** (default): Shows the restriction message.
- **Show the hand-written excerpt:** Shows the excerpt you typed on the post. A post with no hand-written excerpt shows the restriction message.
- **Hide the excerpt:** Shows nothing.

RSS feeds always show the restriction message, whichever option you choose.

## Show restricted posts on listing pages

This is checked by default. Uncheck it to hide posts visitors can't access from blog pages, archives, search, feeds and widgets. Previous and next post links and REST API lists skip those posts too.

Some posts stay listed even when this is unchecked:

- Posts the visitor can't open yet because of [Content Drip](/docs/access-groups/content-drip).
- Posts that show a preview through [Partial Content Lock](/docs/settings/partial-content-lock).

Administrators always see every post.

## Save your changes

Click **Save Settings** in the top-right corner to apply your changes.
