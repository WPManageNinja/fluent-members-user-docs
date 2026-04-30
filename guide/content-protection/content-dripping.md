# Content Dripping — Release Content Over Time

Unlock lessons gradually as a member ages. Lesson 2 opens on day 7, Lesson 3 on day 14, and so on.

By the end, you'll know how to enable dripping on an Access Group, schedule the release of individual items, and test the schedule without waiting 30 days.

**Here's what you'll learn:**
- What content dripping does and when to use it
- How to enable dripping on an Access Group
- How to schedule individual items
- How the "day counter" works (start date basis)
- What members see before an item unlocks

**Before we start:** Dripping is configured on the Access Group level. You should have a group already with posts/lessons listed — otherwise there's nothing to schedule. See [Access Groups](../core-concepts/access-groups.md) if you haven't created one.

---

## When to use dripping

- **Online courses** — release a new lesson each week to keep learners engaged.
- **Bootcamps** — structure a 30-day programme where content unlocks in daily chunks.
- **Challenges** — keep the pressure on with paced releases.
- **Anti-binge protection** — stop members consuming everything in a day and cancelling.

If your content is best consumed on demand (like a podcast archive or reference library), skip dripping.

---

## Step 1 — Enable dripping on the Access Group

1. Go to **Fluent Members → Access Groups** and open the group you want to drip (e.g. *Full Library*).
2. Look for **Content Dripping** and toggle it **On**.
3. Save the group.

Enabling dripping unlocks a new panel where you schedule each item.

![Enable content dripping toggle](/images/content-protection/dripping-toggle.png)

::: info Dripping works with all rule types
Pages, posts, custom post types, categories — all driplable. The item list auto-populates from whatever your rules cover.
:::

---

## Step 2 — Schedule each item

Once dripping is enabled, the group shows a list of items covered by its rules. For each item, you set a **delay in days** — the number of days after the member's start date that the item becomes available.

1. In the dripping table, find the item you want to schedule.
2. In the delay field, type a number of days.
   - `0` = available immediately when the member joins
   - `7` = available 7 days after joining
   - `30` = available 30 days after joining
3. Repeat for every item you want dripped.
4. Click **Save Changes**.

::: tip Leave items at 0 for immediate access
If you want Lesson 1 immediate, Lesson 2 after a week, Lesson 3 after two weeks, set their delays to 0, 7, and 14 respectively.
:::

---

## Step 3 — Choose what non-ready members see

When a member tries to access a dripped item before its unlock date, Fluent Members shows a message explaining when it'll be available.

The default message is friendly: *"This content will be available on [date]."* You can customise this globally in your Access Group's action settings.

---

## How the "day counter" works

Dripping counts from the **member's start date** — the moment their membership became active for this particular Access Group.

- A member who joined on **Jan 1** will see Lesson 2 (delay: 7) unlock on **Jan 8**.
- A member who joined on **Feb 15** sees the same Lesson 2 unlock on **Feb 22**.

So each member has their own personal schedule. Someone who joined six months ago has access to everything already; someone who joined yesterday is on Day 1 of their journey.

---

## A real example — Sara's 8-week yoga course

Sara has an 8-week yoga course, with one lesson released each week.

**Access Group: `8-Week Journey`**
- Rules: Post Type → `lesson`, specific lessons 1 through 8
- Content Dripping: **On**
- Schedule:

| Lesson | Delay (days) |
|---|---|
| Lesson 1: Foundations | 0 |
| Lesson 2: Building Strength | 7 |
| Lesson 3: Flexibility | 14 |
| Lesson 4: Balance | 21 |
| Lesson 5: Core Work | 28 |
| Lesson 6: Flow | 35 |
| Lesson 7: Restorative | 42 |
| Lesson 8: Integration | 49 |

A member who buys Sara's course on April 1 will see:
- Lesson 1 immediately
- Lesson 2 unlocking on April 8
- Lesson 3 unlocking on April 15
- …and so on until Lesson 8 unlocks on May 20.

Once the schedule is set, Sara doesn't touch it again. New members each get their own personal 8-week journey.

---

## Testing the schedule without waiting

Dripping is date-based, so to test it you have three options:

**Option 1 — Set delays to 0 temporarily.** Verify your rules and access are wired correctly, then re-apply the real schedule.

**Option 2 — Change the test member's start date.** Go to **Fluent Members → Members**, open a test member, and edit their membership start date to be further in the past. Then visit the content as that member.

**Option 3 — Use your browser's local clock.** Some browsers and extensions can spoof the client clock for front-end testing, but the real unlock logic runs on the server, so this helps only for visual debugging.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Dripping toggle is off but I don't see it in the group | Feature may be hidden when no items are covered by rules yet | Add at least one rule first |
| Member got access immediately to a 7-day lesson | Their `start_date` is set more than 7 days ago | Check the member record's start date |
| Every item says "Available on a date in 1970" | Start date is blank/corrupt on the member record | Edit the member and set a proper start date |
| All items locked even for existing active members | Group status is Inactive, or the rule doesn't actually cover those items | Verify rules include those items, activate group |

---

## What's next?

**→ [Gutenberg Access Group block](./gutenberg-block.md)** — for per-post protection tweaks.

**Related reading:**
- [Access Groups](../core-concepts/access-groups.md) — the container for dripping
- [Member Statuses](../../reference/membership-statuses.md) — how status affects access
