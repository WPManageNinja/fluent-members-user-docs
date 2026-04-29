# Login Popup

Instead of redirecting non-members away, show them a branded login popup right on the page they tried to visit. Fewer bounces, more conversions.

**Here's what you'll learn:**
- What the login popup does and when to use it
- How to turn it on
- How to customise its title, message, button, and colours
- How to add Register and Lost Password links
- How it interacts with content restriction actions

**Before we start:** This is optional. If your site doesn't have protected content yet, there's nothing for a popup to trigger on.

---

## When to use a popup instead of a redirect

- Your protected content is worth reading — you want visitors to stay on the page.
- You're selling a subscription and every bounce costs you.
- Your theme has a tightly integrated login flow (e.g. social login) and a popup keeps it in the page context.
- Your content is gated but occasionally shared publicly — visitors click a link and you don't want to confuse them with a redirect.

If your protected content isn't worth reading to non-members (e.g. behind-the-scenes admin pages), skip the popup — a redirect is simpler.

---

## Step 1 — Turn it on

1. Go to **Fluent Members → Settings → Login Popup**.
2. Toggle **Enable Login Popup** to **Yes**.
3. Decide on the trigger:
   - **Auto Popup** (yes) — The popup opens automatically when a logged-out visitor hits protected content.
   - **Auto Popup** (no) — The popup only opens when the visitor clicks a "login" link/button. You trigger it manually.
4. Click **Save Changes**.

![Login Popup settings](/images/settings/login-popup-settings.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Settings → Login Popup
State: All fields filled, enabled=yes, auto_popup=yes
Highlight: The Enable Login Popup toggle
-->

---

## Step 2 — Customise the popup content

Further down the settings form, you'll see:

| Field | What it controls |
|---|---|
| **Modal Title** | The heading at the top of the popup. Example: *"Sign in to continue"* |
| **Custom Message** | A line below the title. Example: *"This content is for members. Log in with your account to access."* |
| **Button Text** | The label on the login button. Default: *Login* |
| **Button Color** | Hex colour for the button background. Default: `#0073aa` |
| **Button Text Color** | Hex for the button text. Default: `#ffffff` |
| **Button Size** | `small`, `medium`, or `large` |

Fill each to match your brand. A short, friendly message does much better than a generic "Please log in".

---

## Step 3 — Add Register and Lost Password links

Members-only login is limiting — you should also let new visitors sign up, and existing members recover passwords. The popup supports both:

| Field | What it does |
|---|---|
| **Register URL** | Where the "Register" link takes them. Usually your pricing page or `/register` |
| **Register Link Text** | The clickable label. Default: *"Sign up"* |
| **Lost Password URL** | Where the "Forgot password?" link goes. Default WordPress route: `/wp-login.php?action=lostpassword` |
| **Lost Password Link Text** | The clickable label. Default: *"Forgot password?"* |

Leave the URL field blank to hide a link entirely.

Click **Save Changes** when you're done.

---

## How it looks to visitors

When a logged-out visitor tries to access protected content:
1. The popup fades in over the page.
2. They see the title, message, and a login form (username + password fields).
3. Below the button sits the Register link and Lost Password link (if configured).
4. Successful login refreshes the page, now showing the content.
5. They can close the popup if they change their mind — clicking the × returns them to the page they were on (still restricted).

::: info Popup wins over redirect
If you've enabled the login popup **and** have a restriction set to Redirect, the popup takes priority for non-logged-in visitors. Logged-in members without access still get the redirect.
:::

---

## Interaction with content restriction

The popup replaces the **restricted state** for logged-out visitors only:

| Visitor | Login Popup enabled | What happens |
|---|---|---|
| Logged out | No | Redirect / custom message / partial preview (whatever the group specifies) |
| Logged out | Yes | Popup overlay |
| Logged in without access | — | Always sees the redirect / message / preview |

So the popup is purely a "log in first" nudge — it doesn't change how non-members with wrong-level memberships are handled.

---

## A real example — Jordan's newsletter

Jordan runs a premium newsletter. When a curious visitor clicks a protected post, he doesn't want them bouncing back to Google.

**His settings:**
- Enabled: Yes
- Auto Popup: Yes
- Modal Title: *"Welcome back, reader"*
- Custom Message: *"This post is for paid subscribers. Log in to continue, or sign up below."*
- Button Text: *Log In*
- Button Color: `#2563eb` (his brand blue)
- Register URL: `/subscribe`
- Register Link Text: *"New here? Subscribe for $5/month"*

The result: every protected post click opens a clear, on-brand login experience. Readers can log in without losing the link they clicked.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Popup doesn't appear | Auto Popup is off, or login popup is disabled | Check Enable + Auto Popup settings |
| Popup appears but login fails | Wrong credentials, or WP login URL overridden by another plugin | Check plain-text WP login first |
| Popup styling looks off | Your theme's CSS overriding popup classes | Add CSS overrides, inspect with devtools |
| Register link missing | Register URL field is blank | Fill it in |
| Popup appears on the homepage | Homepage was accidentally caught by a restriction | Add homepage to [Public Contents](./public-contents.md) |

---

## What's next?

**Related reading:**
- [Public Contents](./public-contents.md) — pages that bypass the popup entirely
- [Access Groups](../core-concepts/access-groups.md) — where restriction actions are configured
