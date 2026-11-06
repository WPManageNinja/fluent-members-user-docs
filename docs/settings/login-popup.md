---
title: "Login Popup"
description: "Open a login form over a protected page for logged-out visitors, instead of sending them to the WordPress login screen."
---

# Login Popup

The **Login Popup** opens a login form over a protected page, on top of the page's normal restriction message or preview. Turn it on when you want members to log in and stay on the page they came for.

## Turn the popup on

1. Go to **Fluent Members → Settings → Login Popup**.
2. Turn on **Login Popup Settings**. The other fields appear.
3. Change the fields you want, then click **Save Settings**.

The popup is off by default. While it is off, no field is visible.

![Screenshot of the Login Popup settings page with the Login Popup Settings toggle highlighted](/images/settings/login-popup/login-popup-1.webp)

## Fields

The fields control the popup:

<!-- TODO(screenshot): login-popup-2
  screen: Fluent Members → Settings → Login Popup
  state: Login Popup Settings on, every field visible, default values
  data: Default values
  highlight: -
  view: admin
  alt: Screenshot of the Login Popup settings with every field visible and the default values filled in
  reason: needs the develop build on the local site, which removes Button Size
-->

| Field | Default | Notes |
|---|---|---|
| **Title** | Login Required | Heading of the popup. |
| **Custom Message** | Please log in to access this content. | Text under the heading. Basic HTML such as links and bold works. |
| **Button Color** | `#0073AA` | Background of the login button. |
| **Button Text Color** | `#FFFFFF` | Text color of the login button. |
| **Button Text** | Log In | Label of the login button. |
| **Register URL** | Empty | Your registration page. Empty uses the WordPress registration page. |
| **Register Link Text** | Register here | Text of the registration link. |
| **Lost Password URL** | Empty | Your password reset page. Empty uses the WordPress lost password page. |
| **Lost Password Link Text** | Lost your password? | Text of the lost password link. |
| **Auto Open Popup** | On | Opens the popup as soon as a restricted page loads. |

## What visitors see

A logged-out visitor who opens a single post or page they cannot access sees the normal result set under [When Unauthorized](/docs/access-groups/unauthorized-access), such as your message or a preview. The content stays protected either way.

**Auto Open Popup** decides how the login form opens:

- **On:** The popup opens right away, over that result.
- **Off:** Nothing changes until the visitor clicks the login link in the restriction message. If you turned off **Show login link** in [Default unauthorized access](/docs/settings/unauthorized-access), nothing opens the popup.

The popup holds **Username or Email**, **Password** with a show or hide control, **Remember me**, the login button, and your two links.

<!-- TODO(screenshot): login-popup-3
  screen: A protected post on the site, logged out
  state: Login popup open over the restriction message
  data: Sample protected post
  highlight: -
  view: frontend
  alt: Screenshot of the login popup open over a protected page with username, password, Remember me and the Log In button
  reason: needs the develop build on the local site, which removes the page notice behind the popup
-->

After a correct login, the page reloads and shows the content the member can access. A wrong login shows "Invalid username or password." inside the popup. After 5 attempts from one IP address in 5 minutes, the popup shows "Too many login attempts. Please try again later."

> [!Note]
> Auto open applies to every singular page a logged-out visitor cannot access. Archives and feeds are not affected. If an Access Group's [Unauthorized Access](/docs/access-groups/unauthorized-access) action is set to redirect, the redirect wins and the visitor never sees the popup.

The login form also opens, even with **Login Popup Settings** off, when a logged-out visitor clicks the login link on a restriction message or on a [partial content lock](/docs/settings/partial-content-lock). After logging in there, the page reloads.
