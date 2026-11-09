---
title: "What Blocked Visitors See"
description: "Set whether visitors without access are redirected or shown a message, using your global default or a group's own settings."
---

# What Blocked Visitors See

The **When Unauthorized** card decides what happens when someone without access opens a post or page protected by an Access Group. They are sent to another page, or they see a message in place of the content.

## Use the global default

A new group shows **Using global defaults** on this card, with a read-only summary of the action. It follows the settings in [Default unauthorized access](/docs/settings/unauthorized-access). If you change those settings later, every group on the global default follows.

![Screenshot of the When Unauthorized card showing Using global defaults and the Customize for this rule button](/images/access-groups/unauthorized-access/unauthorized-access-defaults.webp)

## Set an action for one group

1. Go to **Fluent Members → Access Groups** and open a group.
2. On the **When Unauthorized** card, click **Customize for this rule**. The setting applies to the whole group, and the form starts with your global values.
3. Choose an option under **Action for Unauthorized Users**, then fill in its fields as described below.

    ![Screenshot of the When Unauthorized card in edit mode with Action for Unauthorized Users, Custom Message, Button Text and Button URL](/images/access-groups/unauthorized-access/unauthorized-access-customize-form.webp)

4. Click **Done**.
5. Click **Save** in the **Unsaved Changes** bar at the top of the page. The bar appears as soon as you click **Customize for this rule**.

The card now shows **Customized for this rule**, with the **Action** and its message or URL. Click **Edit** to change it, or **Revert to defaults** to go back to the global default.

![Screenshot of the When Unauthorized card showing Customized for this rule with Revert to defaults and Edit](/images/access-groups/unauthorized-access/unauthorized-access-customized.webp)

### Redirect to a specific URL

Visitors go straight to the page you set in **Redirect URL**, such as your pricing page. Enter a path like `/pricing/` or a full address on your site.

![Screenshot of the When Unauthorized card with Redirect to a specific URL selected and a Redirect URL](/images/access-groups/unauthorized-access/redirect-to-specific-url-1.webp)

The address must be on your own site, or the group won't save. To send visitors to another domain, a developer must allow it with the `allowed_redirect_hosts` WordPress filter.

Fluent Members skips the redirect when it would loop, for example when the target is the protected page itself or another protected page that redirects again. The visitor then sees the restriction message on the page instead.

### Display a custom message

The content is replaced by your message, with an optional button under it.

![Screenshot of the When Unauthorized card with Display a custom message selected and the Custom Message, Button Text and Button URL fields](/images/access-groups/unauthorized-access/display-a-custom-message-2.webp)

| Field | Notes |
|---|---|
| **Custom Message** | Required. The text visitors see. Basic HTML works. |
| **Button Text** | The button label, such as `View Plans`. |
| **Button URL** | Where the button goes. Type `/` and part of a page title to search your pages, or paste a URL. |

The button shows only when you fill in both **Button Text** and **Button URL**. It is a plain link to that URL. Logged-out visitors also get a separate login link, **Already a member? Log in** by default, which opens the login form.

Here's what a logged-in visitor without access sees on a protected post:

![Screenshot of a protected post on the site with the custom message and a View Plans button in place of the content](/images/access-groups/unauthorized-access/unauthorized-access-frontend-message.webp)

## Where this card doesn't apply

The action covers posts and pages protected by the group's rules or the [Access Groups panel](/docs/access-groups/per-post-restrictions). A few cases work differently:

- **Login Popup:** When [Login Popup](/docs/settings/login-popup) is on with **Auto Open Popup**, the login form opens over your message for logged-out visitors. A group using a redirect still redirects them.
- **Partial Content Lock:** When [Partial Content Lock](/docs/settings/partial-content-lock) is on, a group using a message shows a blurred preview instead, if the content is longer than the preview. A group using a redirect still redirects.
- **Content Drip:** A member waiting for [dripped content](/docs/access-groups/content-drip) stays on the page and sees a notice, never a redirect or your message.
- **Restricted blocks:** A block uses fixed text instead of this card. See [Access Groups block](/docs/access-groups/gutenberg-block/inserting).

> [!Note]
> Excerpts and listing pages have their own settings. See [Default unauthorized access](/docs/settings/unauthorized-access).
