# Content Drip

**Content Drip** releases protected content on a schedule after a member joins. The member has the right level immediately, but specific content unlocks only after a set number of days, hours, and minutes — useful for paced courses, bootcamps, and week-by-week memberships.

Content drip rules are configured on the **[Access Group](/guide/access-groups/)** that protects the content, not on the level itself. The level decides who can access the group; drip rules decide when each item inside that group opens.

You need an access group with **Protected Content** configured and at least one level attached before you add drip rules.

## Access the Content Drip Section

Go to **Fluent Members → Access Groups**, open the group you want to schedule, then scroll to the **Content Drip** section at the bottom of the edit page.

Turn on the **Content Drip** toggle in the top-right corner of the section. If no rules exist yet, you will see *"No content drips added yet. Click the button below to add one."* Click **+ Add Content Drip**.

![Content Drip section on an Access Group](/images/levels/content-drip/content-drip-1.webp)

## Step 1: Add a Drip Rule

Each drip rule has three parts:

| Field | What it controls |
|-------|------------------|
| **Show This Content** | Which protected item this rule applies to. Search by keyword to pick a post, page, or other item. Leave blank to apply the drip to **all restricted content** in this group. |
| **Timeline** | When the rule fires. The default is **After duration** — a fixed delay from the member's start date on the attached level. |
| **Days / Hours / Minutes** | How long to wait before the content unlocks. |

For example: *Show **Lesson 3** **After duration** **14 days 0 hours 0 minutes** after the member joined.*

Click **+ Add Content Drip** to add more rules. Each rule keeps its own timing.

![Add a content drip rule](/images/levels/content-drip/add-content-drip-1.webp)

## Step 2: Chain Rules for a Paced Sequence

Add one rule per item you want to release on a different schedule. Content not covered by any rule unlocks immediately when the member joins.

Example for a weekly course:

| Rule | Show This Content | After duration |
|------|-------------------|----------------|
| 1 | Lesson 1 | 0 days |
| 2 | Lesson 2 | 7 days |
| 3 | Lesson 3 | 14 days |
| 4 | Lesson 4 | 21 days |

::: tip In plain language
A drip rule means the member has access to the group, but not yet to *this* item. Items without a drip rule open the moment they join.
:::

## Step 3: Save Your Changes

Click **Save** in the top-right corner of the page when you are done. Content drip settings are not applied until you save the access group.

### Remove a Drip Rule

Click **Delete** on the rule you want to remove. Other rules stay in place. Click **Save** to confirm the change.

## What Members See Before Content Unlocks

When a member visits content that has not dripped yet, they see a countdown notice such as *"Available in 6 days, 4 hours."* The exact message depends on the group's [Unauthorized Access](/guide/access-groups/unauthorized-access) settings. Dripped content is not redirected away — the member stays on the page and sees the countdown instead of the full content.

> [!Note]
> The delay is measured from the member's `start_date` on the level that grants this access group. If a member changes levels, the clock restarts from the new level's start date.


## Important Notes

::: warning Before you go live
- **Protected Content must be set** on the access group first, or the **Show This Content** picker will have nothing to search.
- **Toggle Content Drip on** — rules have no effect while the section is disabled.
- **Active members only** — drip timing applies to members with `active` or `trial` status on a level attached to this group.
- Content without a drip rule is available immediately after the member joins.
:::

Content drip is configured. See [Members on a Level](/guide/levels/members-on-a-level) to check who currently holds the levels attached to this group.
