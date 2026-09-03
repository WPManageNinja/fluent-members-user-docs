---
name: edit-fluent-members-doc
description: 'Edit the CONTENT of an EXISTING Fluent Members documentation page in place (same path, same sidebar link) while preserving every site convention. Handles wording changes, new/removed sections, updated steps, and swapped or added screenshots. USE FOR: edit the X doc, update the wording on, add a section to, rewrite this page, fix the screenshot in, this doc is out of date, correct an error in the doc, expand the X guide, update after plugin version bump. DO NOT USE FOR: creating a new page (use write-fluent-members-doc), renaming the slug / moving to another category / deleting / reordering the sidebar (use restructure-fluent-members-docs), or site-wide audits (use audit-fluent-members-docs).'
license: MIT
compatibility: 'VitePress repo with guide/<category>/<slug>.md and reference/<slug>.md layout. Sidebar inline in .vitepress/config.mjs. Images at public/images/<category>/<slug>/. Requires Node + npm.'
metadata:
  project: fluent-members-user-docs
  knowledge-base: member/chunks/
---

# Edit a Fluent Members Doc

Modify an existing page in place. The file path and sidebar `link` stay the same.
Before editing, load the relevant knowledge-base chunk from `member/chunks/` to ensure
technical accuracy.

---

## Agent Behavior Rules

1. **DO** locate the exact file before editing and confirm it with the user.
2. **DO** load the relevant chunk from `member/chunks/` (see `member/chunks/00-index.md`
   for the topic → chunk lookup) to verify technical accuracy before writing.
3. **DO** preserve all conventions: correct `/guide/` or `/reference/` links, `**term**`
   bold (no inner spaces), no support boilerplate, "(Pro)" markers for Pro features.
4. **DO** keep the H1 as line 1; if the H1 display title changes, update the matching
   `text` in the sidebar (`.vitepress/config.mjs`); the `link` stays the same.
5. **DO** put any new/replacement images in the doc's existing image folder
   `public/images/<category>/<slug>/`.
6. **DO** end on a green `npm run docs:build`.
7. **DO NOT** change the file path or move the file — that is restructure work.
8. **DO NOT** introduce relative links (`./slug`, `../slug`) or wrong-zone links
   (a `/reference/` link inside a guide doc for navigation is fine, but link format must match).
9. **DO NOT** add closing support boilerplate.
10. **DO NOT** touch unrelated docs.
11. **DO** before starting, map exactly where in the doc and which section needs to change,
    matching the user journey through that page.
12. **DO** link naturally, inline. Weave the link's anchor text into the sentence where the
    concept is actually discussed (e.g. "attach it to an [Access Group](...)"). One link per
    claim, on its single most relevant page — no link-stuffing.
13. **DO NOT** write a generic "See [Page](/path)." tacked onto the end of a sentence, and
    don't repeat the same "See [...]" pattern across entries — vary the phrasing per term/section.
14. **DO** keep image alt text short: a few words naming the screen or field shown
    (e.g. "Step 2: Restriction and Unauthorized Access fields"), not a full sentence
    describing everything visible in the screenshot.

---

## Phase 1: Setup (Interactive)

### 1.1 Target page
> **Which doc?** (title, sidebar label, or path like `guide/levels/creating.md`)

Resolve to a file. Check common locations:
```
find guide -name '<slug>.md'
find reference -name '<slug>.md'
```
If ambiguous or not found, ask. Record `TARGET_PATH`, `SLUG`, `CATEGORY`, `ZONE` (guide/reference).

### 1.2 The change
> **What should change?** (new wording, add/remove a section, update steps, swap image, reflect new plugin version…)

Record as `CHANGE`.

### 1.3 Technical accuracy check
Load the relevant knowledge-base chunk:
- Check `member/chunks/00-index.md` → find the chunk number for this topic
- Read that chunk file before writing any technical content

### 1.4 Images & title
> **Does this change involve images?** and **Does the page title (H1) change?**

Record `TOUCHES_IMAGES` and `TITLE_CHANGES`.

### 1.5 Confirm

| Parameter | Value |
| --- | --- |
| File | ... |
| Zone | guide / reference |
| Change | ... |
| Chunk loaded | member/chunks/XX-name.md |
| Touches images | yes / no |
| Title changes | yes / no |

Wait for confirmation.

---

## Phase 2: Context

1. Read `TARGET_PATH` fully.
2. Load relevant chunk from `member/chunks/` (identified in 1.3).
3. If `TITLE_CHANGES`: open `.vitepress/config.mjs` and find the sidebar entry whose
   `link` matches the page's path — update its `text` to match the new H1.
4. Read 1 neighbor doc in the same category if matching house style for new content.

---

## Phase 3: Procedure

```
1. EDIT     - Apply CHANGE to TARGET_PATH.
              Enforce conventions on touched lines:
              - Correct link format for zone (see Quick Reference)
              - **term** bold (no inner spaces)
              - "(Pro)" markers for Pro features
              - No support boilerplate

2. IMAGES   - If TOUCHES_IMAGES: add/replace files in
              public/images/<CATEGORY>/<SLUG>/
              Update ![alt](/images/<CATEGORY>/<SLUG>/<file>) refs.
              Remove refs whose files were deleted.

3. SIDEBAR  - If TITLE_CHANGES: update matching entry's "text" in config.mjs.
              Do NOT change its "link". Keep valid JS object syntax.

4. BUILD    - npm run docs:build ; fix warnings; rebuild until clean.
```

---

## Phase 4: Verify & Report

- File edited: `TARGET_PATH`
- Summary of what changed
- Chunk(s) used for accuracy: `member/chunks/XX.md`
- Images touched? (added/replaced/removed)
- Sidebar `text` updated? (yes/no — link unchanged)
- Build: pass / fail

---

## Quick Reference

### Locate
```
File by name:     find guide -name '<slug>.md'
                  find reference -name '<slug>.md'
Sidebar entry:    grep -n '<slug>' .vitepress/config.mjs
Image folder:     public/images/<category>/<slug>/
Chunk index:      member/chunks/00-index.md
```

### Link formats
```
Guide page:       /guide/<category>/<slug>
Guide nested:     /guide/<category>/<subcategory>/<slug>
Reference page:   /reference/<slug>
Image ref:        ![Alt](/images/<category>/<slug>/<name>.ext)
Bold:             **term**   (no inner spaces)
Pro marker:       Feature Name (Pro)
```

### Link style
```
Bad  (generic, repeated tail):
  Attach one or more Membership Levels to an Access Group. See [Access Groups](/guide/access-groups/).

Good (inline, natural, varied):
  Attach one or more Membership Levels to an [Access Group](/guide/access-groups/), the key that unlocks it.

- One link per claim, on its single most relevant page — don't link-stuff a sentence.
- Anchor text is the words already in the sentence, not a bolted-on "See X" clause.
- Vary the surrounding phrasing per term/section instead of one repeated template.
```

### Image alt text
```
Bad  (long descriptive caption):
  ![Step 2 of 4: Protect Your Content, showing the Apply Restriction To dropdown and the
   Unauthorized Access message, button text, and button URL fields](...)

Good (short, a few words):
  ![Step 2: Restriction and Unauthorized Access fields](...)
```

### Key Principles
1. **In place only** — same path, same sidebar link.
2. **Load the chunk first** — verify technical facts from `member/chunks/` before writing.
3. **Conventions survive edits** — don't regress links/bold/boilerplate.
4. **Title change ⇒ sidebar text change** (link stays).
5. **Images live in the doc's own folder.**
6. **Link inline, not with a bolted-on "See [...]" tail.**
7. **Alt text is short** — a few words, not a full sentence.
8. **Green build or it's not done.**
