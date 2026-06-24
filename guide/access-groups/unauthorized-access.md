# Unauthorized Access

The **Unauthorized Access** card on the Access Group edit page decides what a non-member sees when they hit your protected content. Pick the right action and your site behaves like a hard paywall, a soft paywall, or a quiet redirect, your call.

::: info Part of Chain 3: Restriction & enforcement · step 2 of 4
**Previously:** [Protected Content: Restriction Types](/guide/access-groups/protected-content)
**Next:** [Partial Content Lock](/guide/settings/partial-content-lock)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- The five Action options the dropdown gives you.
- Which fields appear under each action.
- A simple rule of thumb for picking the right one.

**Before we start:** Open an Access Group's edit page; the **Unauthorized Access** card sits in the right column.

---

## Step 1: Find the card

In the Access Group edit page, the right column shows two cards. The top one is **Unauthorized Access**. It has a single dropdown labelled **Action for Unauthorized Users**, followed by fields specific to the chosen action.

![Unauthorized Access card with Redirect selected](/screenshots/access-group-edit-full.webp)

---

## The five Actions

| Action                         | What a non-member sees                                                       | Extra fields                       |
|---------------------------------|------------------------------------------------------------------------------|-------------------------------------|
| **Redirect to a specific URL** | Their browser is sent to a URL you choose (e.g. `/pricing`).                | **Redirect URL** *(required)*       |
| **Display a custom message**   | The protected post body is replaced with HTML you typed.                    | **Custom Message** (rich-text HTML) |
| **Display partial preview**    | The first N words show, then a blurred overlay with a CTA covers the rest.  | Reads from [Partial Content Lock](/guide/settings/partial-content-lock) globally; per-Group overrides available. |
| **Show a login prompt**        | The [Login Popup](/guide/settings/login-popup) appears over the page.       | None on this card; styling is in Settings → Login Popup. |
| **Hide entirely**              | The page returns an empty body, effectively a 404 from their point of view.| None                                |

::: tip Rule of thumb
- "Send them to my pricing page" → **Redirect**.
- "Tell them this is premium and link to the offer" → **Custom message**.
- "Tease them with the intro paragraph" → **Partial preview**.
- "I want them to log in, not buy yet" → **Login prompt**.
- "Don't even acknowledge the content exists" → **Hide entirely**.
:::

---

## Step 2: Fill the extra fields

### If you pick *Redirect to a specific URL*

A **Redirect URL** field appears (required). Type a relative path (`/pricing`) or a full URL. A red validation message reads *"Please enter redirect URL"* if you save with this empty.

### If you pick *Display a custom message*

A rich-text editor appears under the dropdown. Type anything HTML-safe, a heading, a paragraph, a button link. WordPress's `wp_kses_post` sanitizer cleans the input on save.

### If you pick *Display partial preview*

No extra fields on this card. The actual configuration (preview length, overlay colour, button text) lives in [Settings → Partial Content Lock](/guide/settings/partial-content-lock) globally. Per-Group overrides can also be set in the Gutenberg block editor.

### If you pick *Show a login prompt*

No extra fields here. The popup itself is themed in [Settings → Login Popup](/guide/settings/login-popup). If that section is disabled, the action falls back to a plain "log in" notice.

### If you pick *Hide entirely*

No extra fields. The post body returns empty, visitors see whatever your theme renders around a blank post.

---

## A real example: Sara's three Groups

Sara uses different Actions for different content:

| Group                | Action                       | Why |
|---------------------|------------------------------|-----|
| *Pro Lessons*       | **Redirect** → `/pro-yoga`   | Push non-members straight to her sales page. |
| *Members' Library*  | **Partial preview**          | Free visitors read the intro, then a CTA, converts well for evergreen content. |
| *Internal Notes*    | **Hide entirely**            | She uses this for behind-the-scenes posts she doesn't want anyone to know exist. |

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Redirect URL field saves but the page still loads the post body | Caching plugin is serving an older version. | Clear cache. |
| Custom Message renders as plain text, not HTML | The pasted HTML used disallowed tags (e.g. `<script>`). | Use only allowed tags; preview first. |
| Partial preview shows zero words | Preview Length is set to 0 or the post is media-only. | Raise Preview Length in [Partial Content Lock](/guide/settings/partial-content-lock). |
| Login prompt never appears | Login Popup is disabled. | Enable it in [Settings → Login Popup](/guide/settings/login-popup). |

---

## What's next?

- **→ [Active Levels](/guide/levels/attaching-access-groups)**: wire Levels to this Group.
- **→ [Content Drip](/guide/levels/content-drip)**: time-gate items inside the Group.

**Recommended reading:**
- [Partial Content Lock](/guide/settings/partial-content-lock): the soft-paywall styling.
- [Login Popup](/guide/settings/login-popup): the popup styling.
- [Glossary](/guide/glossary): terms.
