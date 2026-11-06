# Inserting the Access Groups Block

You do not always need to restrict an entire page or post. Fluent Members lets you hide specific sections, like a premium video or a download link, inside a public post using the Gutenberg block editor. You can restrict a single block, or use the dedicated **Access Groups** container block to protect several blocks at once.


## Restrict Content in the Block Editor

### Method 1: Restrict a Single Block

If you only need to protect one specific piece of content, you don't need a special block.

1. Click on any standard block (Paragraph, Image, Heading, etc.) inside your WordPress editor.
2. Look at the right sidebar and make sure you're on the **Block** tab.
3. Scroll down to find the **Access Groups** panel.
4. Check the box next to the Group(s) that should be allowed to see this block.

### Method 2: Use the Access Groups Container (for Multiple Blocks)

If you want to protect several blocks together, use the dedicated container block.

1. Click the **+** button in the post editor to add a new block.
2. Type **fluent member** in the search box.
3. Click the **Access Groups** block from the results, it has a padlock icon.

![Block inserter ](/images/access-groups/inserting/gutenberg-access-group-1.webp)

4. Click inside the new container block and start adding your protected content, text, images, video embeds, or any other block.
5. Select the main **Access Groups** container block, go to the right sidebar, and check the desired Group(s) in the **Access Groups** panel to lock everything inside.

::: warning Some inner blocks have caveats
A few core blocks (Query Loop, certain pattern blocks) re-fetch their content from REST endpoints. Those won't automatically respect the wrapping container's protection, see [Nesting & Limits](/docs/access-groups/gutenberg-block/nesting-and-limits) for the full list.
:::

## Block vs. Protected Content Rule

| Use case | Use this block | Use an Access Group rule |
|---|:--:|:--:|
| Whole post is members-only | ❌ | ✅ |
| Only a footer section of a post is members-only | ✅ | ❌ |
| A landing page mixes public + member-only blocks | ✅ | ❌ |
| Every post in a CPT is members-only | ❌ | ✅ |
| One specific post is members-only | ❌ | ✅ (Specific picker) |

::: tip Cleanest pattern
For "whole post" cases use a [Protected Content rule](/docs/access-groups/protected-content). Restricting a block, either directly or via the container, is for *intra-post* mixes: public intro + member-only middle + public CTA.
:::

## Things That Trip People Up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Search doesn't find "Access Groups" | Fluent Members isn't activated, or the editor is in a heavily-customised state. | Confirm activation; refresh the editor. |
| No Access Groups panel on a block | The Inspector is on the **Post** tab, not the **Block** tab. | Click the block first, then the **Block** tab in the Inspector. |
| Content renders to non-members anyway | No Group was ticked in the panel. | Tick at least one Group, then check [Configuring](/docs/access-groups/gutenberg-block/inserting) for the fallback action. |



## Configuring the Access Groups Block

You've inserted the block ([Inserting](./inserting)) and added some inner content. Now tell Fluent Members **which** members can see it and **what** non-members should get instead.

**Here's what you'll learn:**
- Where the block's settings panel lives.
- How to attach one or more Access Groups to a single block instance.
- How the per-block fallback action works alongside the global one.
- The override behaviour for Partial Content Preview.

**Before you start:** The Access Groups block is inserted in your post and you've added at least one inner block.

### Step 1: Open the Block's Inspector

1. Click anywhere inside the Access Groups block to select it.
2. On the right side of the editor, the **Settings** panel opens. If it's collapsed, click the gear icon at the top-right of the editor to expand it.

An **Access Groups** panel appears in the Inspector with the block's controls.

### Step 2: Pick Access Groups

The first control is a multi-select labelled **Access Groups**. Tick one or more Groups that should grant access to *this specific block's content*.

| Behaviour | When you tick… |
|---|---|
| Show inner content to *any* matching member | One or more Groups |
| Hide inner content from everyone (preview only) | No Groups |
| Show to members of multiple tiers | All applicable Groups (OR-style match) |

::: tip This is in addition to the Group's own rules
The Group still has its own [Protected Content](../protected-content) rule that gates *whole posts*. This block adds the same Group's protection to one specific block inside one specific post. The two don't conflict; they're independent rule sets that the engine checks.
:::

### Step 3: Pick the Per-Block Fallback Action

The next control is **Action for Unauthorized Users**, the same options as on the [Unauthorized Access card](../unauthorized-access), minus Redirect.

| Action | What a non-member sees inside this block's slot |
|---|---|
| **Display a custom message** | A short HTML message you type below. |
| **Display partial preview** | Inner content blurred with the global overlay. |
| **Show a login prompt** | The Login Popup appears. |
| **Hide entirely** | The block slot collapses; the post continues. |

::: warning No "redirect" inside a block
*Redirect to a specific URL* doesn't exist here. Redirecting from a single block would send the visitor away from the whole post, which is rarely what you want. Use a custom message with a link instead.
:::

### Step 4: Partial Content Override (Optional)

If you picked **Display partial preview**, the Inspector exposes a small set of overrides: Preview Length, Overlay Message, Button Text, Button URL. These let you set a different teaser for *this block* than your global [Partial Content Lock](/docs/settings/partial-content-lock) defaults.

Leave them empty to inherit the global settings.

### How Per-Block Fallback Interacts With the Group's Fallback

The block's settings *override* the parent Group's Unauthorized Access action **for this block only**. Everything else on the post (other blocks, the whole-post Protected Content rules) still uses the Group's setting.

| Scenario | Block fallback | Group fallback (Unauthorized Access) |
|---|---|---|
| Whole post protected | n/a | This applies |
| Single block protected via this block | This applies | n/a (block sits outside Group's whole-post rule) |
| Both (block inside a protected post) | Block wins for the block; Group wins for the rest | Both apply, each in its scope |

### An Example Setup

A blog post is free to read, but one embedded video is for paying members only. The Access Groups block wraps just the video embed, configured like this:

- **Access Groups:** *Pro Lessons* and *Annual Yoga* (either level can unlock the video).
- **Action for Unauthorized Users:** Display a custom message, for example *"This video is for Pro members. Visit our pricing page to join."*

Non-members keep reading the surrounding free content. Where the video would be, they see the custom message and CTA instead. The rest of the site's Access Group rules (the whole *Pro Lessons* content library, for instance) keep working as configured, independent of this block.

### Things That Trip People Up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Inspector panel doesn't show an Access Groups section | The block isn't selected, or the sidebar is collapsed. | Click the block; expand the sidebar. |
| Inner content shows to non-members anyway | No Access Groups ticked. | Pick at least one Group. |
| Partial preview overrides don't apply | Action set to a non-partial mode. | Pick *Display partial preview*. |
| Block fallback ignored on the published page | A caching plugin is caching the logged-out HTML. | Clear the cache for that URL. |
