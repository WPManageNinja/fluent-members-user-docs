# Partial Content Default Settings

The global defaults for every partial-content preview on your site. Set once, apply everywhere — then override per-post if needed.

**Here's what you'll learn:**
- Every field on the Partial Content settings screen
- Sensible default values
- How to override per-post
- How these settings interact with the content-protection action

**Before we start:** If you're not using partial content preview at all, skip this page — the feature must be enabled here first for any Access Group to use it.

---

## Open the settings

**Fluent Members → Settings → Partial Content**.

![Partial Content settings](/images/settings/partial-content-defaults.png)
<!-- SCREENSHOT-NEEDED
Page: WP Admin → Fluent Members → Settings → Partial Content
State: Fully filled fields with a preview
Highlight: Enable toggle and Preview Length slider
-->

---

## Every field explained

| Field | Default | What it does |
|---|---|---|
| **Enable Partial Content** | `no` | Master switch. Must be `yes` for Access Groups to use partial-preview action. |
| **Preview Length** | `50` words | How many words of the post to show before the overlay. Min: 10. |
| **Overlay Message** | *"This content is available for members only."* | HTML headline above the button. Supports basic HTML. |
| **Overlay Message Color** | `#333333` | Hex colour of the overlay message text. |
| **Button Text** | *"Become a Member"* | Text on the CTA button. |
| **Button URL** | (blank) | Where the button sends visitors. Typically your pricing page. |
| **Button Color** | `#0073aa` | Hex for the button background. |
| **Button Text Color** | `#ffffff` | Hex for the button text. |
| **Button Size** | `medium` | `small`, `medium`, or `large`. |
| **Overlay Color** | `#ffffff` | Hex for the fade overlay behind the button. |
| **Overlay Opacity** | `90` | How opaque the overlay is, 0–100. |

---

## Recommended starting values

For most sites, these defaults produce a clean paywall:

- **Enable**: Yes
- **Preview Length**: `80` (roughly 2 short paragraphs — enough to hook, not enough to give away)
- **Overlay Message**: `<strong>The rest of this post is for members.</strong>`
- **Button Text**: `Continue Reading — Join Now`
- **Button URL**: your pricing page (`/pricing` or `/join`)
- **Button Color**: your brand's action colour
- **Overlay Color**: `#ffffff`
- **Overlay Opacity**: `90` (enough to hide content while hinting there's more)

Adjust to taste, then save.

---

## Per-post overrides

Every field on this screen can be overridden on individual posts. See [Gutenberg Access Group block](../content-protection/gutenberg-block.md) — the editor sidebar has a **Partial Content Settings** panel with the same fields.

Leave a per-post field blank to inherit the global default. Fill it in to override.

---

## Interaction with Access Groups

The partial-content action only becomes selectable on an Access Group if **Enable Partial Content** is `yes`. So:

1. Turn it on here first.
2. Then open an Access Group and set its action to **Display partial content**.
3. The group now uses the settings on this page — unless individual posts override them.

---

## A real example — Jordan's newsletter

Jordan sets:
- Enable: Yes
- Preview Length: `180` (about 3 paragraphs for a deep intro)
- Overlay Message: `<strong>Unlock this post with a subscription.</strong><br/><small>Cancel anytime.</small>`
- Button Text: `Subscribe for $5/month`
- Button URL: `/subscribe`
- Button Color: `#2563eb`
- Overlay Color: `#ffffff`
- Overlay Opacity: `88`

Every premium post uses these defaults. On one flagship post, Jordan overrides Preview Length to `50` to preserve the surprise of the reveal — just a one-field change in the Gutenberg sidebar.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Partial content action not available on groups | Enable Partial Content is still `no` | Turn it on and save |
| Preview cuts mid-sentence | Word count hits mid-sentence; Fluent Members cuts on nearest word boundary | Adjust Preview Length by a few words |
| Overlay barely visible | Opacity too low | Raise to 85–95 |
| Button URL opens same page | Button URL is empty | Fill it in |
| Colours not applying | Some themes override button classes | Use browser devtools to find the conflicting CSS |

---

## What's next?

Back to [Settings overview](./general.md).

**Related reading:**
- [Partial Content Preview](../content-protection/partial-content-preview.md) — the user-facing feature
- [Gutenberg Access Group block](../content-protection/gutenberg-block.md) — per-post overrides
