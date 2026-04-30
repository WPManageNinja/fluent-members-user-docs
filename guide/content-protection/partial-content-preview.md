# Partial Content Preview

Instead of a hard block, show non-members a tasty preview of your content with a call-to-action overlay. The soft paywall pattern.

This is the paywall pattern you see on newsletters, premium news sites, and Medium-style publications.

**Here's what you'll learn:**
- What partial content preview is and when to use it
- How to enable it globally
- How to customise the overlay (message, button, colours, opacity)
- How to set preview length (number of words shown)
- How to override settings per post
- How it interacts with other restriction actions

**Before we start:** Have an [Access Group](../core-concepts/access-groups.md) already, because the action is selected at the group level.

---

## What it looks like

A visitor lands on a protected post. They read the first paragraph (or two, or ten — you decide). Then the rest fades out under a semi-transparent overlay containing:

- A headline message ("This is premium content — join to keep reading")
- An action button ("Become a member")
- All in the colours you choose

::: tip In everyday words
Partial content preview = *the paywall you see on NYT, the Economist, Substack*.
:::

---

## Step 1 — Enable it globally

Partial content is switched on in one place: **Fluent Members → Settings → Partial Content**.

1. Go to **Fluent Members → Settings**.
2. Click the **Partial Content** tab.
3. Toggle **Enable Partial Content** to **On**.
4. Configure the defaults:
   - **Preview Length** — how many words of the protected content to show before the overlay (default: 60). Raise it for a longer tease, lower it for a stricter paywall.
   - **Overlay Message** — the headline above the button. HTML allowed. Default: a friendly "This content is available for members only" message.
   - **Overlay Message Color** — the text colour.
   - **Button Text** — the call-to-action label.
   - **Button URL** — where the button sends them (your pricing page).
   - **Button Color / Button Text Color** — match your brand.
   - **Overlay Color** — background of the fade area.
   - **Overlay Opacity** — how transparent the overlay is (0 to 100).
5. Click **Save Changes**.

![Partial Content settings](/images/content-protection/partial-content-settings.png)

---

## Step 2 — Apply it as the action on an Access Group

Now tell a group to use partial preview as its restriction action.

1. Go to **Fluent Members → Access Groups** and open a group.
2. Under **Action for Unauthorized Users**, pick **Display partial content**.
3. Save.

Non-members hitting content in this group will now see the preview + overlay instead of a redirect or custom message.

::: info Not seeing the "partial content" option?
You haven't enabled the global setting yet. Go back to **Settings → Partial Content** and toggle it on. The option only shows on group actions when the feature is globally enabled.
:::

---

## Step 3 — (Optional) Override per-post

Sometimes you want a specific post to have a different preview length or a custom button. Maybe one post is a flagship piece and should show more.

You can override the global settings on individual posts through the Gutenberg editor sidebar. See [Gutenberg Access Group block](./gutenberg-block.md) for the full walkthrough of the sidebar — the same sidebar has a **Partial Content Settings** panel.

Override fields available per-post:
- `enabled` — turn partial content on/off for this post specifically
- `preview_length`
- `overlay_message`, `overlay_message_color`
- `button_text`, `button_url`, `button_color`, `button_text_color`
- `overlay_color`, `overlay_opacity`

If you leave a field blank in the per-post panel, the global default kicks in.

---

## How preview length actually works

Fluent Members counts **words** in the rendered post content, then cuts at the threshold you set. It does its best to respect HTML boundaries — it won't leave a paragraph mid-word or break open tags. If a post has heavy HTML structure (lots of nested divs, embeds), the cut might fall a word or two off from the exact number — that's fine.

Embedded media (iframes, shortcodes that render complex widgets) inside the hidden section still renders on the server; only the overlay hides it visually. For very sensitive content, combine partial preview with a [hard-block rule](./restricting-pages-posts.md) — partial preview is a *visual* paywall, not a cryptographic one.

---

## A real example — Jordan's newsletter

Jordan writes a paid weekly column. He wants non-subscribers to see the first 3 paragraphs of every premium post, then a paywall.

**Global settings:**
- Preview Length: `180` words (roughly 3 paragraphs)
- Overlay Message: *"The rest of this post is for paying subscribers."*
- Button Text: *"Subscribe — $5/month"*
- Button URL: `/subscribe`
- Button Color: `#2563eb` (Jordan's brand blue)
- Overlay Color: `#ffffff`, Opacity `90`

**Access Group `Premium Posts`:**
- Rule: Categories → `premium`
- Action: Display partial content

The result: every premium post has a consistent, branded paywall. Jordan only updates the message if he runs a seasonal sale.

![Partial content frontend example](/images/content-protection/partial-content-frontend.png)

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Partial content shows nothing | Preview Length is 0 or very low | Raise Preview Length |
| Overlay button doesn't match brand | You set the colour at the group level but the global default is winning | Check the global Partial Content settings |
| Members still see the overlay | They're logged in but their Level doesn't include this group | Add the group to their Level |
| Overlay text appears below the content, not over it | Your theme's CSS is conflicting with the overlay positioning | Inspect the page with browser devtools; add a little CSS override |
| First N words cut mid-sentence | Fluent Members cuts on word boundaries, but sentence-ending can vary | Adjust Preview Length until the cut feels right |

---

## What's next?

**→ [Gutenberg Access Group block](./gutenberg-block.md)** — override settings per post, or gate specific blocks.

**Related reading:**
- [Access Groups](../core-concepts/access-groups.md) — where rules live
- [Partial Content default settings](../settings/partial-content-defaults.md) — the global settings page in detail
