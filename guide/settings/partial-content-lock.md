# Partial Content Lock

The styling and copy for the soft-paywall overlay. When an [Access Group's Unauthorized Access action](/guide/access-groups/unauthorized-access) is set to **Display partial preview**, this is what your visitors see. Set it once globally; override per-block in the Gutenberg editor when needed.
**Here's what you'll learn:**
- Every field in the **Partial Content Blur Settings** card.
- How the global defaults interact with per-block overrides.
- Sensible starting values.

**Before we start:** Click the gear icon → **Partial Content Lock** in the left rail.

---

## Step 1: Toggle the feature on

At the top of the card is a master toggle: **Partial Content Blur Settings**. Switch it on. A note appears: *"Editors can manage this option directly from the Access Groups panel inside the Gutenberg editor."*, that's the per-block override mention.

![Partial Content Lock card with toggle on and full field list](/screenshots/settings-partial-content-lock.webp)

---

## The fields

| Field | Default | What it controls |
|---|---|---|
| **Preview Length** | `50` | Number of words shown before the blur effect kicks in. |
| **Overlay Color** | `#FFFFFF` | Background colour of the gradient that fades to the overlay. |
| **Overlay Opacity** | (slider, default ~85%) | How opaque the overlay gets. Higher = more "wall," lower = more "tease." |
| **Overlay Message** | *"This content is Restricted."* | Headline shown on the overlay. Plain text. |
| **Message Color** | `#333333` | Text colour of the overlay message. |
| **Button Text** | *"Get Access"* | The CTA button's label. |
| **Button URL** | (empty, set to your pricing page) | Where the button links to. |
| **Button Color** | `#0073AA` | Background of the CTA button. |
| **Button Text Color** | `#FFFFFF` | Text colour of the CTA button. |
| **Button Size** | `Medium` | Radio: Small / Medium / Large. |

---

## Sensible starting values

For a typical newsletter-style soft paywall:

| Field | Starter value |
|---|---|
| Preview Length | `60` to `100` words (one-to-two paragraphs). |
| Overlay Color | `#FFFFFF` (or your site's body background). |
| Overlay Opacity | `85%` (visible but not impenetrable). |
| Overlay Message | *"This article continues for members."* |
| Button Text | *"Subscribe to read on"* |
| Button URL | `/pricing` (or your pricing page URL). |
| Button Color | Your brand primary. |

::: tip In plain language
The overlay says "stop reading," the message says "but here's why," the button says "what to do next." Three jobs, three controls.
:::

---

## How global vs per-block override works

The values here are *defaults*. The Gutenberg Access Groups block ([Configuring the Block](/guide/access-groups/gutenberg-block/configuring)) lets editors override Preview Length, Overlay Message, Button Text, and Button URL for a *single block*. Anything they leave blank in the block inherits from this page.

| Scope | Where it's set |
|---|---|
| Global default | This page (Settings → Partial Content Lock). |
| Per-block override | Gutenberg block Inspector panel. |

---

## What if the Action isn't *Display partial preview*?

The Partial Content Lock settings only matter when an Access Group's [Unauthorized Access](/guide/access-groups/unauthorized-access) action is set to *Display partial preview*. For other actions (Redirect, Custom Message, Login, Hide) these fields are unused.

---

## A real example: Sara configures her newsletter blur

Sara writes a paid newsletter. She wants free visitors to read the first ~80 words and see an enticing CTA:

| Field | Value |
|---|---|
| Preview Length | `80` |
| Overlay Color | `#FFFFFF` |
| Overlay Opacity | `90%` |
| Overlay Message | *"Want to keep reading? This article is for Pro Yoga members."* |
| Message Color | `#333333` |
| Button Text | *"Join Pro Yoga ($19/mo)"* |
| Button URL | `/pro-yoga` |
| Button Color | `#0073AA` |
| Button Text Color | `#FFFFFF` |
| Button Size | Large |

Saves. From now on, any Access Group with *Display partial preview* uses these values.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Overlay sits behind the content | Theme z-index conflict. | See [Troubleshooting → Partial overlay z-index](/reference/troubleshooting). |
| Settings don't apply | The Group's Unauthorized Access isn't set to *Display partial preview*. | Switch the action. |
| Preview shows zero words | Preview Length is `0`. | Raise to at least `10`. |
| Per-block override doesn't work | Block-side overrides only apply to fields the editor filled in. | Confirm the block's Inspector overrides. |

---

## What's next?

- **→ [Login Popup](./login-popup)**: the alternative soft-paywall pattern.
- **→ [Unauthorized Access](/guide/access-groups/unauthorized-access)**: the engine that uses these settings.

**Recommended reading:**
- [Configuring the Block](/guide/access-groups/gutenberg-block/configuring): per-block overrides.
- [General Settings](./general): the surrounding tab.
