---
name: fluent-members-doc-writer
description: 'Master voice-and-format guide for writing or rewriting Fluent Members end-user documentation. Load it BEFORE writing, drafting, expanding, rewriting or proofreading any page in docs/ or reference/. Covers the opening paragraph, tone, UI-path and bold conventions, option lists, steps, links, callouts, Pro marking, word choices, images/placeholders and the never-do list. USE FOR: write a doc, rewrite this page, match the house style, proofread, document this feature, update a page after the UI changed. Pairs with write-fluent-members-doc (new page procedure), edit-fluent-members-doc (in-place edit), fluent-members-docs-overhaul (full pass) and fluent-members-code-to-docs (plugin sync). The voice rules were learned from the Ninja Tables docs project.'
---

# Fluent Members Doc Writer: Master Skill

You are writing for **Fluent Members**, the WordPress membership plugin by WPManageNinja (Free + Pro). Docs are task-oriented how-to and reference pages for site owners, not developers (except pages explicitly for developers, e.g. `reference/hooks`).

This skill is about **what the words look like**. Procedure (files, sidebar, build) lives in `write-fluent-members-doc`, `edit-fluent-members-doc` and `restructure-fluent-members-docs`. Facts come from the plugin code, never from the old page (see `fluent-members-docs-overhaul` / `verify-fluent-members-doc-against-code`).

Where this skill and `CLAUDE.md` disagree on structure, `CLAUDE.md` wins. Where an old page and this skill disagree on voice, this skill wins.

---

## 1. Universal page rules (non-negotiable)

- Every page starts with frontmatter holding `title` and a one-sentence `description`, then a `# H1` that matches `title`. The sidebar `text` is a shorter, task-first label and does not have to match the H1.
- `##` for main sections, `###` for sub-topics.
- Links are absolute and in the zone's format: `[Text](/docs/<category>/<slug>)` or `[Text](/reference/<slug>)`. Never `.md`, never relative. Confirm the target exists (`find docs reference -name '<slug>.md'`).
- Images: `![Screenshot of what the reader sees](/images/<category>/<slug>/<name>.webp)`. Never external, never relative. Produced by the screenshot runner, never by hand (`fluent-members-doc-screenshots`).
- New or renamed page: wire it into `.vitepress/config.mjs`, run `npm run featured:generate`, and `npm run docs:build` must pass clean.
- Use the **exact UI labels of the current plugin** (read from code or the live site), not the old docs.
- No closing support or boilerplate block.

---

## 2. Voice and tone

### 2.1 Opening (first paragraph after the H1)
One to three sentences: what the feature is, what it does for the reader, when to use it. Bold the **feature name** on first use and add `(Pro)` right after it if it is Pro-only. Models:

> A **Membership Level** is the plan you sell or offer on your site. Create one when you want a group of people to get access to protected content.

> **Content Dripping** (Pro) releases protected content to a member a set time after they join, so access unlocks step by step instead of all at once.

Avoid "In this guide we will...", "This article explains...", "Welcome to...", "Fluent Members allows you to...".

### 2.2 Register
- Second person ("you", "your"). Call the people who buy or hold a membership **members**; call people looking at the site **visitors**.
- Present tense, imperative steps: "Click", "Open", "Choose", "Turn on".
- Short, direct sentences. One idea per sentence. When a choice matters, give the reason in one clause ("best for big libraries", "use this when members pay elsewhere").
- Contractions are fine in explanations ("doesn't", "you'll"); not in hard constraints ("cannot be changed after creation").
- State what the plugin *does* ("Inactive hides the level from pricing shortcodes"), not what it "allows" or "lets you".
- Developer prose (hooks, PHP, REST) only in `reference/` pages made for developers.

### 2.3 Bridge sentences
Never drop a list, table or image in cold. Lead in with one short sentence: "The fields depend on the level type:".

### 2.4 Ending
End on the action or the outcome, not a sign-off: "Click **Save** to keep your changes." or one line saying what happens next, with a link if the reader needs the next step. Never "Hope this helps", "That's it!", "Conclusion", or "contact support".

---

## 3. Formatting conventions

### 3.1 Punctuation
**No em dashes (`—`) in page prose.** Use a colon (label then description), a comma or parentheses (aside), or a full stop (new thought). (The Ninja Tables docs enforce this; fix any you meet on a page you touch.)

### 3.2 Bold and UI paths
| Use | Example |
|---|---|
| UI path | `**Fluent Members → Membership Levels**` (house style on this site: arrow `→`, spaces both sides, one bold span) |
| Buttons, tabs, fields, options, modal names | `**Save**`, `**Pricing**`, `**Maximum Member**`, the **Add Membership Level** modal |
| Feature name on first use | `**Content Dripping** (Pro)` |

- No inner whitespace inside markers: `**Save**`, never `** Save **`.
- Plain words for things that are not labels ("open a level", "the three-dot menu").
- Copy labels **exactly as displayed**, including capitalisation. The top nav item is "Membership Levels", not "Levels"; confirm each label in the app before you write it.

### 3.3 Option and field descriptions
Small sets: bullet, bold label, colon, description (house style puts the colon inside the bold: `**Title:** The name...`). Many fields or fields with notes: a table.

```
| Field | Notes |
|-------|-------|
| **Status** | **Active** makes the level available for sale. **Inactive** hides it from pricing shortcodes. |
```

Mark defaults and Pro inline: `**Mode** (default): ...`, `**Seats** (Pro): ...`. Give ranges and defaults only when the code confirms them.

### 3.4 Steps
- Numbered lists only when order matters. Bullets for everything else.
- One action per step. The first step names the path: `1. Go to **Fluent Members → Membership Levels** and click **+ Create Membership Level**.`
- Prerequisites first ("You need at least one Access Group"), the outcome stated at the end.
- Tutorial-style pages may use `## Step 1: ...` headings (see `docs/levels/creating.md`); reference pages use one `##` per UI group in screen order.

### 3.5 Links (sparse and load-bearing)
Link only when the reader would be stuck without it, or when explaining the concept here would bloat the page. Anchor text is the key noun already in the sentence, never "here" or "click here". Link a destination once per page, at its first meaningful mention.

### 3.6 Callouts
`> [!Note]` for a helpful aside or related setting; use it for a behaviour that surprises or data loss too. About one per page, two at most.

### 3.7 Pro marking
`(Pro)` after the feature or option name on its first mention on the page, plus the `<span class="fm-pro">Pro</span>` badge in the sidebar `text` for Pro pages. Decide Free vs Pro from the plugin code (is the code in `fluent-members-pro`, or behind a Pro check), not from the old docs.

### 3.8 Code
Inline code for shortcodes, attributes, hooks, file names and values typed by the user: `[fluent_membership_level id="10"]`. Fenced blocks with a language for anything multi-line. Never paste plugin source into user docs.

---

## 4. Words to use

| Say | Not |
|---|---|
| member | user, customer (for a person who holds a membership) |
| visitors | users (for people viewing the site) |
| Membership Level / level | plan, tier (unless it is the label of that screen; a level can contain pricing *plans*, keep the two apart) |
| Access Group | rule set, content group |
| turn on / turn off | enable / disable (except when quoting a label) |
| your site | the front end |
| protected content | locked content, gated content (unless quoting the UI) |

Describe a thing by the label the plugin shows. If the UI label and the older doc differ, the UI label wins, and mention removed or moved UI only in one short line telling the reader where it went.

---

## 5. Images, placeholders and videos

- One image per click-step, one or two per reference section; place it right after the sentence or step it shows. Never stack two images with no text between them. Alt text starts with "Screenshot of" and says what the reader sees.
- Produce images with the runner (`fluent-members-doc-screenshots`). Write the text first, then derive the shot list from it.
- During a rewrite or overhaul, old screenshots show the old UI. Strip them and leave a placeholder where a reader needs to see the screen (format in `fluent-members-docs-overhaul` §5). Never leave an image that no longer matches the text.
- Do not delete files from `public/images/` while rewriting; orphans are reported and removed only with the user's approval.
- Videos, if any: YouTube embeds from the WPManageNinja channel only.

---

## 6. Page types

| Writing... | Shape |
|---|---|
| A task ("Create a level", "Connect FluentCart") | Opening, prerequisites, numbered path or `Step N` sections, what happens next |
| One screen, tab or modal, option by option | Opening, how to open (numbered path under the intro), one `##` per UI group in screen order, option bullets or tables, `Click **Save**.` |
| A connected integration (FluentCart, Fluent Forms, FluentCRM, ...) | Opening (what syncs and why), prerequisites (plugin active, Pro?), setup steps, what the member/admin sees, limits |
| Pro feature | As above, `(Pro)` on the name, what the reader needs (Pro active, licence) before the steps |
| Reference (`reference/`) | Flat lookup: tables of names/values with one-line meanings, minimal narrative |

---

## 7. Never

- Invent UI, options, defaults or behaviour. If the code is ambiguous, record an open question.
- Carry a label, step, default or Free/Pro claim over from the old page without confirming it in code or on the live site.
- Use em dashes in prose, inner-space bold, relative links, `.md` in links, external image URLs, or support boilerplate.
- Add a page without the sidebar entry and featured card.
- Edit `.vitepress/dist/`, `.vitepress/cache/`, or anything in the plugin source folders.
- Commit or push unless the user asks.
