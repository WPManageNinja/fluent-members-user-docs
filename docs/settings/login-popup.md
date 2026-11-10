---
title: "Login Popup"
description: "Show logged-out visitors a login form on the protected page itself, instead of sending them to the WordPress login screen."
---

# Login Popup

The **Login Popup** replaces a protected page's content with a short login notice and opens a login form over the page. Turn it on when you want members to log in and stay on the page they came for.

## Turn the popup on

1. Go to **Fluent Members → Settings → Login Popup**.
2. Turn on **Login Popup Settings**. The other fields appear.
3. Change the fields you want, then click **Save Settings**.

The popup is off by default. While it is off, only the **Login Popup Settings** toggle is visible.

![Screenshot of the Login Popup settings page with Login Popup underlined in the Settings menu and an arrow pointing to the switched-off Login Popup Settings toggle](/images/settings/login-popup/login-popup-open-settings.webp)

Once it is on, the toggle and the first fields look like this:

![Screenshot of the Login Popup settings page with the Login Popup Settings toggle highlighted](/images/settings/login-popup/login-popup-1.webp)

## Fields

The fields control both the notice on the page and the popup.

The defaults are listed below. You can change every one of them. This example shows a customized setup, with a different title and message, a purple button, a **Register URL** that points to a pricing page and other link texts:

![Screenshot of the Login Popup settings with a custom title, message, button color, register link text and lost password link text](/images/settings/login-popup/login-popup-custom-settings.webp)

| Field | Default | Notes |
|---|---|---|
| **Title** | Login Required | Heading of the notice and the popup. |
| **Custom Message** | Please log in to access this content. | Text under the heading. Basic HTML such as links and bold works, and the field shows the tags as you type them. |
| **Button Color** | `#0073AA` | Background of the login button. |
| **Button Text Color** | `#FFFFFF` | Text color of the login button. |
| **Button Text** | Log In | Label of the login button. |
| **Button Size** | Medium | **Small**, **Medium** or **Large**. |
| **Register URL** | Empty | Your registration page, such as a pricing page. Empty uses the WordPress registration page. |
| **Register Link Text** | Register here | Text of the registration link. |
| **Lost Password URL** | Empty | Your password reset page. Empty uses the WordPress lost password page. |
| **Lost Password Link Text** | Lost your password? | Text of the lost password link. |
| **Auto Open Popup** | On | Opens the popup as soon as a restricted page loads. |

## What visitors see

With the popup on, a logged-out visitor who opens a single post or page they cannot access sees the notice in place of the content.

![Screenshot of a protected article showing the Login Required notice and the Log In button in place of the content](/images/settings/login-popup/login-popup-notice.webp)

**Auto Open Popup** decides what happens next:

- **On:** The popup opens right away.
- **Off:** The popup opens when the visitor clicks the button in the notice.

The popup holds your title and message, **Username or Email**, **Password** with a show or hide control, **Remember me**, the login button, and the lost password and register links. A close button at the top right dismisses it.

![Screenshot of the login popup open over a protected page with username, password, Remember me and the Log In button](/images/settings/login-popup/login-popup-modal.webp)

After a correct login, the page reloads and shows the content the member can access. A wrong login shows "Invalid username or password." inside the popup. After 5 attempts from one IP address in 5 minutes, the popup shows "Too many login attempts. Please try again later."

> [!Note]
> Turning the popup on applies to every singular page a logged-out visitor cannot access, and the notice replaces that page's content. Archives and feeds are not affected, and neither is content that is only waiting on a [content drip](/docs/access-groups/content-drip) schedule. If an Access Group's [Unauthorized Access](/docs/access-groups/unauthorized-access) action is set to redirect, the redirect wins and the visitor never sees the notice.

The popup form also opens, even with **Login Popup Settings** off, when a logged-out visitor clicks a checkout button on a restriction message or on a [partial content lock](/docs/settings/partial-content-lock). After logging in there, the visitor continues to that checkout.
