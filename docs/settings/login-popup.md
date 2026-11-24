---
title: "Login Popup"
description: "Open a login form over a protected page for logged-out visitors, instead of sending them to the WordPress login screen."
---

# Login Popup

The **Login Popup** opens a login form over a protected page, on top of the page's normal restriction message or preview. Members log in and stay on the page they came for. It is no longer a separate settings tab. You control it from **Restricted content** settings.

## Turn the popup on

1. Go to **Fluent Members → Settings → Restricted content**.
2. Next to **Non-members see**, choose **A teaser** or **A message**. The login options don't appear with **Redirect**.
3. Check **Show "Already a member? Log in"**.
4. To open the form as soon as a protected page loads, check **Open the login form right away**.
5. Click **Save Settings**.

![Screenshot of Restricted content settings with the two login checkboxes turned on](/images/settings/login-popup/login-popup-1.webp)

**Open the login form right away** only appears while the login link is on. Without it, the form opens only when a visitor clicks **Log in**.

## What visitors see

A logged-out visitor who opens a single post or page they can't access sees your restriction message or teaser, with **Already a member? Log in** under it. The content stays protected either way.

- **Open the login form right away is on:** The popup opens over the page straight away.
- **It is off:** Nothing changes until the visitor clicks **Log in**, which opens the popup on the same page.

The popup holds the title **Login Required**, the line *Please log in to access this content.*, **Username or Email**, **Password** with a show or hide control, **Remember me**, the **Log In** button, and the register and lost password links. A close button dismisses it.

<!-- TODO(screenshot): login-popup-2
  screen: A protected post on the site, logged out
  state: Login popup open over the restriction message
  data: Sample protected post
  highlight: -
  view: frontend
  alt: Screenshot of the login popup open over a protected page with username, password and the Log In button
-->

After a correct login, the page reloads and shows the content the member can access. A wrong login shows "Invalid username or password." inside the popup. After 5 attempts from one IP address in 5 minutes, the popup shows "Too many login attempts. Please try again later."

> [!Note]
> Opening right away applies to single posts and pages a logged-out visitor can't access. Archives and feeds are not affected, and neither is content that is only waiting on a [content drip](/docs/content-access/content-drip) schedule.

The popup wording and button colors are no longer editable in the admin. The popup's login button uses the default **Log In** label.
