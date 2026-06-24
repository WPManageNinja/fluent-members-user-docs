# Login Popup

A small in-page login modal that opens instead of a hard block. When an [Access Group's Unauthorized Access action](/guide/access-groups/unauthorized-access) is set to **Show a login prompt**, this is what your visitors see. Styling and copy live here.

::: info Part of Chain 3: Restriction & enforcement · step 4 of 4
**Previously:** [Partial Content Lock](/guide/settings/partial-content-lock)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- The master toggle plus every field on the Login Popup card.
- How the popup interacts with WordPress's standard login.
- The "Auto Open" checkbox and when to use it.

**Before we start:** Click the gear icon → **Login Popup** in the left rail.

---

## Step 1: Toggle the feature on

At the top of the card is **Login Popup Settings**. Switch it on. A note appears: *"Enable on-page login popup for public user."*

![Login Popup full settings](/screenshots/settings-login-popup.webp)

---

## The fields

| Field | Default | What it controls |
|---|---|---|
| **Title** | *"Login Required"* | Heading shown at the top of the modal. |
| **Custom Message** | *"Please log in to access this content."* | Subtitle / explanation under the heading. Supports basic HTML. |
| **Button Color** | `#0073AA` | Background of the Login button. |
| **Button Text Color** | `#FFFFFF` | Text colour of the Login button. |
| **Button Text** | *"Log In"* | Login button label. |
| **Button Size** | `Medium` | Radio: Small / Medium / Large. |
| **Register URL** | (empty) | Custom registration URL. Defaults to WordPress's `wp-login.php?action=register` if empty. |
| **Register Link Text** | *"Register here"* | Link text shown below the Login button. |
| **Lost Password URL** | (empty) | Custom lost-password URL. Defaults to WordPress's standard `wp-login.php?action=lostpassword` if empty. |
| **Lost Password Link Text** | *"Lost your password?"* | Link text shown below the Login button. |
| **Auto Open Popup** | unchecked | Whether the popup opens automatically when a restricted page loads. |

---

## Auto Open Popup, when to tick it

When *Auto Open Popup* is **unchecked**, the popup only appears when an Access Group is set to *Show a login prompt*, the engine triggers it on the restricted post.

When **checked**, the popup also opens automatically on any page where the user is *not* logged in and content is restricted, regardless of the Group's action setting. Useful for members-only sites where you assume people just need to log in.

::: warning Don't auto-open on every page
Auto Open applies site-wide. If your site has free *and* paid content, auto-opening on free pages annoys readers. Leave it off and rely on the Group's *Show a login prompt* action only where it makes sense.
:::

---

## Plain WordPress login under the hood

The popup is a styled wrapper around WordPress's `wp-login.php` action. When a user submits:

1. The credentials go to WordPress's normal authentication flow.
2. If correct, the user is signed in and the popup closes; the page reloads to render their member view.
3. If incorrect, the WordPress error message appears in the popup.

This means everything WordPress login supports, application passwords, 2FA plugins, custom login redirects, works inside the popup too.

---

## A real example: Sara's coaching client area

Sara's coaching clients sign in to access their private resources. She wants a friendly login experience, not a hard block:

| Field | Value |
|---|---|
| Title | *"Welcome back"* |
| Custom Message | *"Please log in to access your client resources."* |
| Button Color | `#0073AA` |
| Button Text | *"Log In to My Account"* |
| Button Size | Large |
| Register URL | (empty, clients don't self-register) |
| Lost Password Link Text | *"Forgot your password?"* |
| Auto Open Popup | ✅ (the whole client area is members-only) |

She then sets her client-resources Access Group's Action to *Show a login prompt*.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Popup never appears | Login Popup is disabled at the master toggle. | Toggle it on. |
| Popup opens on free pages too | Auto Open is checked. | Uncheck it. |
| Register link points to standard WP login | Custom Register URL field is empty. | Fill in your custom URL. |
| Submitting login does nothing | Theme conflict, popup JS isn't initialised. | Check browser console for errors; whitelist `/wp-includes/js/`. |

---

## What's next?

- **→ [Payment Settings](./payment-settings/)**: set up Stripe.
- **→ [Partial Content Lock](./partial-content-lock)**: the soft-paywall alternative.

**Recommended reading:**
- [Unauthorized Access](/guide/access-groups/unauthorized-access): the engine that triggers this popup.
- [General Settings](./general): the surrounding tab.
