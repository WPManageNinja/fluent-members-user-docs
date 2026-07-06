# Login Popup

The Login Popup is an optional modal dialog that appears when a visitor tries to access restricted content. Instead of redirecting to a login page, the login form slides in as an overlay on the same page. You can customize the heading, message, button style, and supporting links and optionally have it open automatically on restricted pages.

## Access Login Popup Settings

Click the **Settings** gear icon in the top-right corner of any Fluent Members screen, then select **Login Popup** from the left-hand menu.

### Enabling the Popup

At the top of the card is the **Login Popup Settings** master toggle. Switch it on to activate the feature. When disabled, no popup appears anywhere on your site regardless of other settings.

![Access the Login Popup](/images/settings/login-popup/login-popup-1.webp)

## Configuring the Popup

With the toggle on, the following fields control the popup's appearance and behaviour:

- **Title**: The heading shown at the top of the modal (e.g. *"Login Required"*).
- **Custom Message**: A short explanation shown under the heading. Supports basic HTML (e.g. links, bold). Defaults to *"Please log in to access this content."*
- **Button Text**: Label for the Login button (e.g. *"Log In"*).
- **Button Color**: Background color of the Login button (default `#0073AA`).
- **Button Text Color**: Text color on the Login button (default `#FFFFFF`).
- **Button Size**: Choose **Small**, **Medium**, or **Large**.
- **Register URL**: Optional URL to your registration page. If left empty, defaults to WordPress's built-in `wp-login.php?action=register`.
- **Register Link Text**: The link text shown below the Login button (e.g. *"Register here"*).
- **Lost Password URL**: Optional URL to your password-reset page. Defaults to `wp-login.php?action=lostpassword` if empty.
- **Lost Password Link Text**: The link text for the lost password link (e.g. *"Lost your password?"*).
- **Auto Open Popup**: When checked, the popup opens automatically whenever a logged-out visitor lands on any restricted page. See below for when to use this.

Once you have set your fields, click **Save Settings**.

![Login Popup settings configured](/images/settings/login-popup/login-popup-settings-2.webp)

## Auto Open Popup

When **Auto Open Popup** is unchecked (the default), the popup only appears on pages where the linked [Access Group's Unauthorized Access](/guide/access-groups/unauthorized-access) action is set to **Show a login prompt**. The popup is triggered by the restriction engine, not on every page.

When **Auto Open Popup** is checked, the popup opens automatically on any page where the visitor is not logged in and any content is restricted regardless of the Access Group's action setting.

>[!Note]
> Auto Open applies site-wide. If your site has a mix of free and members-only content, enabling this will cause the popup to open on free pages too. Leave it unchecked and rely on the Access Group's **Show a login prompt** action to control exactly where the popup fires.


## How the Popup Works

The popup is a styled wrapper around WordPress's standard authentication flow:

1. The visitor clicks a restricted link or lands on a restricted page.
2. The popup slides in as an overlay no page redirect occurs.
3. The visitor submits their credentials inside the popup.
4. WordPress authenticates the request. If correct, the popup closes and the page reloads to show the member view. If incorrect, the WordPress error message appears inside the popup.

Because it uses WordPress's native `wp-login.php` action under the hood, everything WordPress login supports two-factor authentication plugins, custom login redirects, application passwords works inside the popup as well.


