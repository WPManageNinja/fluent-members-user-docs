---
title: "Shortcodes"
description: "Every Fluent Members shortcode, its attributes and defaults, for pricing cards, the Member Portal and members-only content."
---

# Shortcodes

**Shortcodes** place Fluent Members features on any page or post. Use them when you work in the Classic Editor or a page builder, or when you need more options than a block offers.

Fluent Members registers four shortcodes:

| Shortcode | What it shows |
|---|---|
| `[fluent_membership_level]` | The pricing card for one level |
| `[fluent_membership_levels]` | A grid of pricing cards for several levels |
| `[fluent_member_portal]` | The Member Portal |
| `[fluent_members]` | Wrapped content, only to members who have access |

To find a level ID, go to **Fluent Members → Membership Levels** and read the **ID** column.

## Single Level

`[fluent_membership_level id="10"]` shows the pricing card for one level.

| Attribute | Default | Notes |
|---|---|---|
| `id` | None, required | The level ID. Without a valid number the shortcode prints `Invalid membership level ID.`. An ID that does not exist prints `Membership level not found.`. |
| `show_unavailable` | `0` | Set to `1` to show the card even when the level has no plans to sell. |

## Multiple Levels

`[fluent_membership_levels ids="10,12,15" columns="3"]` shows a grid of pricing cards. The [Membership Levels block](/docs/access-groups/gutenberg-block/membership-levels-block) offers most of the same options in the block editor.

| Attribute | Default | Notes |
|---|---|---|
| `ids` | Empty | Level IDs, separated by commas. Leave it empty to show active levels in ID order. |
| `columns` | `3` | Number of columns, from `1` to `4`. Values outside that range are moved to the nearest limit. |
| `button_text` | `Choose plan` | The label on the plan button. |
| `login_text` | `Login to Purchase` | The label on the plan button when a visitor must log in first. |
| `show_title` | `1` | Set to `0` to hide the level title. |
| `show_description` | `1` | Set to `0` to hide the level description. |
| `show_unavailable` | `0` | Set to `1` to include levels with no plans to sell. |
| `show_level_name` | Empty | Controls the line under each plan title. `1` shows it, `0` hides it. Left empty, it shows unless it repeats the section heading. |

The grid shows up to 20 levels. A level with no plans to sell is left out, and administrators see a note about it on the page instead of a card.

## Member Portal

`[fluent_member_portal]` shows the Member Portal. It takes no attributes.

Logged-in members see their memberships. Visitors who are logged out see `Please log in to view your memberships.` and a **Log In** link that returns them to the page. See [Set up the portal](/docs/members/portal/setup) to create the page in one click.

## Members-Only Content

`[fluent_members]` hides the content between its tags from anyone without access.

```text
[fluent_members levels="10,12" message="Join to read the rest." button_text="See plans" button_url="/pricing"]
This text is only visible to members of level 10 or level 12.
[/fluent_members]
```

| Attribute | Default | Notes |
|---|---|---|
| `levels` | Empty | Level IDs, separated by commas. |
| `level` | Empty | Works the same as `levels`. The IDs from both attributes are combined. |
| `message` | Your default message | The message shown to people without access. |
| `button_text` | Your default button | The button label shown to people without access. |
| `button_url` | Your default button | The button link shown to people without access. |

Access works like this:

- **With level IDs:** the member needs an active or trial membership on at least one listed level.
- **With no `levels` or `level` attribute:** any active or trial membership on any level gives access.
- **With a `levels` or `level` attribute that holds no valid ID:** nobody gets access except administrators. This catches typos and curly quotes pasted from a word processor.
- **Administrators:** always see the content.

Defaults for the message and button come from [Default unauthorized access](/docs/settings/unauthorized-access). If you set either `button_text` or `button_url`, the shortcode ignores both default button values, so set the two together.

> [!Note]
> Test `[fluent_members]` in a private browser window, logged out or as a member. As an administrator you always see the hidden content.
