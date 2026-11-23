---
title: "What Blocked Visitors See"
description: "Set whether visitors without access are redirected or shown a message, using the site default or a level's or Bundle's own settings."
---

# What Blocked Visitors See

The **Message for visitors without access** card decides what happens when someone without access opens content protected by a level or [Bundle](/docs/content-access/bundles). They are sent to another page, or they see a message in place of the content.

## Use the site default

A new level or bundle shows **Site default**, with **Using the site default** and a read-only summary of its action, message, button and login link. It follows [Restricted content](/docs/content-access/restricted-content). If you change those settings, everything on the site default follows.

## Set a message for one level or bundle

1. Go to **Fluent Members → Membership Levels**, open a level and click the **Content Access** tab. For a bundle, open the bundle from the **Bundles** row.
2. Open **Message for visitors without access**.
3. Click **Customize for this membership** (or **Customize for this bundle**). The form starts with your site values.
4. Choose an option under **Action for Unauthorized Users** and fill in its fields.
5. Click **Done**, then **Save** in the save bar (or **Save bundle** in a bundle's drawer).

<!-- TODO(screenshot): unauthorized-access-2
  screen: Content Access tab, Message for visitors without access card open
  state: Customize for this membership clicked, Display a custom message selected
  data: message "This lesson is for Gold members.", button View Plans
  highlight: Action for Unauthorized Users, Custom Message, Button Text and Button URL
  view: admin
  alt: Screenshot of the Message for visitors without access card in edit mode with a custom message and button
-->

The card then reads **Customized for this membership**, and the heading shows **Redirect** or **Custom Message**. Click **Edit** to change it, or **Use the site default** to go back.

### Redirect to a specific URL

Choose **Redirect to a specific URL** and enter a **Redirect URL**, such as `/pricing/`. Visitors go straight to that page. The address must be on your own site, or the level or bundle won't save. To send visitors to another domain, a developer must allow it with the `allowed_redirect_hosts` WordPress filter.

Fluent Members skips the redirect when it would loop, for example when the target is the protected page itself or another protected page that redirects again. The visitor then sees the message on the page instead.

### Display a custom message

Choose **Display a custom message**. The content is replaced by your message, with an optional button under it.

| Field | Notes |
|---|---|
| **Custom Message** | Required. The text visitors see. |
| **Button Text** | The button label, such as `Subscribe Now`. |
| **Button URL** | Where the button goes. Type `/` and part of a page title to search, or paste a URL. Required when you set **Button Text**. |
| **Show login link** | Adds a login link for logged-out visitors. |
| **Login Link Text** | The link label. It starts as `Already a member? Log in`. |

The button shows only when both **Button Text** and **Button URL** are filled in.

## When several levels protect the same content

If more than one level or bundle protects an item, a customized message takes priority over the site default. When several are customized, the one created most recently wins.

## Where this card doesn't apply

- **Teaser:** When [Restricted content](/docs/content-access/restricted-content) is set to **A teaser**, a post longer than the teaser length shows the start of the post, then your message and button. A level using a redirect still redirects.
- **Release schedule:** A member waiting for [released content](/docs/content-access/content-drip) stays on the page and sees a countdown, never a redirect or your message.
- **Lists and feeds:** Excerpts and listing pages follow **Archives and feeds** in [Restricted content](/docs/content-access/restricted-content).

> [!Note]
> The login form and the **Open the login form right away** option are set once for the site in [Restricted content](/docs/content-access/restricted-content), not per level.
