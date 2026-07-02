# Inserting the Access Groups Block

You do not always need to restrict an entire page or post. Fluent Members lets you hide specific sections, like a premium video or a download link, inside a public post using the Gutenberg block editor. You can restrict a single block, or use the dedicated **Access Groups** container block to protect several blocks at once.


## Restrict Content in the Block Editor

### Method 1: Restrict a Single Block

If you only need to protect one specific piece of content, you don't need a special block.

1. Click on any standard block (Paragraph, Image, Heading, etc.) inside your WordPress editor.
2. Look at the right sidebar and make sure you're on the **Block** tab.
3. Scroll down to find the **Access Groups** panel.
4. Check the box next to the Group(s) that should be allowed to see this block.

### Method 2: Use the Access Groups Container (for multiple blocks)

If you want to protect several blocks together, use the dedicated container block.

1. Click the **+** button in the post editor to add a new block.
2. Type **fluent member** in the search box.
3. Click the **Access Groups** block from the results, it has a padlock icon.

![Block inserter ](/images/access-groups/inserting/gutenberg-access-group-1.webp)

4. Click inside the new container block and start adding your protected content, text, images, video embeds, or any other block.
5. Select the main **Access Groups** container block, go to the right sidebar, and check the desired Group(s) in the **Access Groups** panel to lock everything inside.

::: warning Some inner blocks have caveats
A few core blocks (Query Loop, certain pattern blocks) re-fetch their content from REST endpoints. Those won't automatically respect the wrapping container's protection, see [Nesting & Limits](/guide/access-groups/gutenberg-block/nesting-and-limits) for the full list.
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
For "whole post" cases use a [Protected Content rule](/guide/access-groups/protected-content). Restricting a block, either directly or via the container, is for *intra-post* mixes: public intro + member-only middle + public CTA.
:::

## Things That Trip People Up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Search doesn't find "Access Groups" | Fluent Members isn't activated, or the editor is in a heavily-customised state. | Confirm activation; refresh the editor. |
| No Access Groups panel on a block | The Inspector is on the **Post** tab, not the **Block** tab. | Click the block first, then the **Block** tab in the Inspector. |
| Content renders to non-members anyway | No Group was ticked in the panel. | Tick at least one Group, then check [Configuring](/guide/access-groups/gutenberg-block/configuring) for the fallback action. |


