# Attaching Access Groups to a Level

A Level on its own unlocks nothing. To grant content access, you attach one or more **Access Groups** to the Level. Holders of the Level then see everything those Groups protect.

::: info Part of Chain 1: First-time site setup · step 10 of 10
**Previously:** [Protected Content: Restriction Types](/guide/access-groups/protected-content)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- Where to attach Groups on the Level edit screen.
- The Select Access Group modal, what the cards mean.
- How to detach a Group (and what happens to members when you do).
- Whether to attach Groups to the Level or the other way around (short answer: either, both work).

**Before we start:** You need both pieces ready, a Level ([Creating a Level](./creating)) and at least one Access Group ([Access Groups Overview](/guide/access-groups/)).

---

## Step 1: Open the Access Group tab

1. **Fluent Members → Levels**.
2. Click the Level you want to wire up.
3. Click the **Access Group** tab.

On a brand-new Level, the table is empty: *"No access groups selected"*. There's a **Select Access Group** button in the top-right.

![Access Group tab, empty state](/screenshots/level-access-groups-empty.webp)

---

## Step 2: Pick Groups

Click **Select Access Group**. A modal opens with a card for each Group on your site.

Each card shows:
- The Group's ID (e.g. `#6`) and status pill (`Active`).
- Title, e.g. *VIP Vault*.
- A short description.
- Small chips at the bottom showing which other Levels already use this Group (e.g. *Starter*, *+2*).
- A checkbox to select it.

Tick the Groups you want this Level to unlock, then click **Select**.

![Select Access Group modal](/screenshots/level-select-access-group-modal.webp)

You're returned to the Access Group tab. The table now lists the attached Groups with columns *ID / Title / Description / Status* and a row-action kebab on each row.

![Access Group tab, Pro Plan Group attached + kebab open showing Edit/Remove](/screenshots/level-access-group-attached.webp)

::: tip A Group can power many Levels
The chips at the bottom of each Group card show this: if you see *Starter, Pro, VIP* under a Group, that Group already grants access to holders of all three Levels. Attaching it to a fourth doesn't disturb the existing three.
:::

---

## Step 3: Save (already saved)

There's no explicit Save button on this tab, selections persist immediately when you click **Select** in the modal. You'll see a success toast: *"Access groups updated successfully."*

---

## Removing a Group from a Level

In the Access Group table, click the kebab (⋮) on the row → **Remove**.

::: warning Removal revokes access for current members
The moment you remove a Group, holders of this Level lose access to whatever content the Group was protecting. There's no grace period. If you only want to retire the Group for *new* signups, leave it attached and instead change the Group's Status to *Inactive* in [Access Groups](/guide/access-groups/), existing memberships keep working until they expire naturally.
:::

---

## A real example: Sara wires Pro Yoga to Pro Lessons

Sara has:
- A Level called *Pro Yoga*.
- An Access Group called *Pro Lessons* covering her lesson custom post type.

She opens Pro Yoga → Access Group → Select Access Group → ticks *Pro Lessons* → Select. Done.

Now anyone who buys Pro Yoga can see the lesson posts. New lessons she adds to the post type are protected automatically, she doesn't have to update the Level.

---

## Levels-side or Groups-side?

You can wire the same thing from two directions:

- **From the Level** (this page), open the Level, pick which Groups it grants.
- **From the Group**: open the Group, pick which Levels can see it (the *Active Levels* card). See [Active Levels](/guide/levels/attaching-access-groups).

Both flows write to the same join table. Pick the direction that matches how you're currently thinking, *"this plan unlocks…"* vs *"this content is for…"*

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Access Group modal is empty | No Groups exist yet, or none are Active. | Go to [Access Groups](/guide/access-groups/) and create one. |
| Members hold the Level but still see "members only" pages | The Group's Protected Content rules don't cover those pages. | Open the Group → [Protected Content](/guide/access-groups/protected-content). |
| Removed a Group, members complain about lost access | They were holding access through this Group only. | Re-attach the Group, or change the Group's restriction rules instead. |

---

## What's next?

- **→ [Members on a Level](./members-on-a-level)**: see who currently holds this Level.
- **→ [Access Groups, Overview](/guide/access-groups/)**: build more Groups.

**Recommended reading:**
- [Active Levels](/guide/levels/attaching-access-groups): the Group-side view of the same join.
- [Glossary](/guide/glossary): terms.
