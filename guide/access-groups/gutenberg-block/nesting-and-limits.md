# Nesting & Limits

Whether you restrict a single block directly or wrap several blocks in the Access Groups container, most nested content behaves exactly as you'd expect. A few things don't, and a few have surprises worth knowing before you build something complex.

## What "just works" inside the block

These standard blocks behave perfectly:

- **Text:** Paragraph, Heading, List, Quote, Pullquote, Preformatted, Verse.
- **Media:** Image, Gallery, Audio, Video, File, Cover, Media & Text.
- **Layout:** Columns, Group, Stack, Row, Spacer, Separator.
- **Embed:** YouTube, Vimeo, Twitter, Spotify, and most other oEmbed services.
- **Buttons:** Buttons block, individual Button blocks.
- **Custom HTML:** Just HTML. No template logic.

For each of those, the engine wraps the rendered output in an "is the visitor allowed?" check. If yes, render. If no, show the configured fallback.

## What has caveats

| Inner block / source                       | What happens                                                                 |
|--------------------------------------------|------------------------------------------------------------------------------|
| **Query Loop (core)**                     | Loops render from a REST endpoint that may bypass the wrapper. The wrapping container still blocks the *display*, but the JSON might leak. |
| **Latest Posts (core)**                   | Same caveat, REST-fetched titles can appear in headless contexts.           |
| **Reusable Blocks / Patterns**            | Work, but the pattern's *source* isn't gated. Anyone who can read the pattern via REST can see its raw HTML. |
| **Shortcodes inside the block**           | Work as usual. The shortcode runs on the server; output is then gated.       |
| **Page-builder blocks (Elementor, Bricks)** | Mostly work. Aggressive page builders sometimes render outside the inserter's normal block tree and skip the wrapper. Test carefully. |
| **Form blocks (Fluent Forms, etc.)**      | Render fine. Submitted data is captured by the form, not by Fluent Members.  |
| **Other plugins' "membership" blocks**    | Conflict possible. Don't double-protect content with two membership plugins; pick one. |

::: warning REST API can leak protected content
The REST API has its own access check for whole-post protection ([Protected Content rules](/guide/access-groups/protected-content)), but block-level protection is harder to enforce in raw JSON. If you build a headless site that fetches `wp-json/wp/v2/posts/:id`, the JSON includes the protected blocks' HTML.

Fix: also wrap the protected content in a whole-post Protected Content rule, or strip the block server-side in your headless layer.
:::

## Nesting Access Groups Blocks

You can put a restricted block, or an Access Groups container, inside another. Restriction is additive: each layer that has Group(s) ticked must pass before the visitor sees what's inside it. A layer left with no Groups ticked imposes no restriction of its own, but it doesn't bypass an outer layer that does.

| Inner layer requires… | Outer layer requires… | Visitor sees inner content when |
|---|---|---|
| `Pro Lessons` | `Pro Lessons` | They're in `Pro Lessons`. (Outer and inner agree.) |
| `Pro Lessons` | `VIP Vault` | They're in `Pro Lessons` **and** `VIP Vault`. (Both layers must pass.) |
| No Groups ticked | `Pro Lessons` | They're in `Pro Lessons`. (The inner layer is unrestricted; the outer layer still gates it.) |

::: tip Stick with one layer
Nesting restricted blocks inside each other is easy to lose track of in the editor. For multi-tier "VIP gets bonus content" patterns, use two siblings (one for Pro, one for VIP) rather than nesting.
:::

## The recommended pattern for landing pages

For a landing page with multiple gated sections:

```
[Hero, public]
[Pricing card, public]

[Access Groups block, for Free tier]
  [What you get if you join Free]

[Access Groups block, for Pro tier]
  [Bonus video for Pro members]

[Footer CTA, public]
```

Each block stands alone with its own Groups and fallback. The page reads well to everyone, free visitors see the Free section's content (because they joined the Free Group), Pro members also see the Pro bonus, and unauthenticated visitors see the appropriate fallback in each slot.

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Inner Query Loop shows post titles to non-members | The loop's REST-fetched JSON bypassed the wrapper. | Wrap the whole post in a Protected Content rule too. |
| Two restricted blocks side-by-side, both block content for the same user | Each requires a Group the user doesn't have. | Re-check each block's Access Groups picker. |
| The block disappears on the front-end even for members | A theme's CSS is `display: none`-ing the wrapper class. | Inspect with DevTools; whitelist the class. |
| Reusable block's raw HTML leaks via the editor's pattern browser | Pattern source isn't gated. | Don't store sensitive content in reusable blocks. |


