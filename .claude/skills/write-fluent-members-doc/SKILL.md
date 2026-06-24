---
name: write-fluent-members-doc
description: 'Create a NEW Fluent Members end-user documentation page in this VitePress site, correctly placed in a category folder and wired into the sidebar in config.mjs. Optionally converts pasted content or raw notes into a clean doc. USE FOR: add a doc, write a new doc page, create a doc for X, document this feature, write a guide for, new documentation page, turn this content into a doc. DO NOT USE FOR: editing an existing page (use edit-fluent-members-doc), renaming/moving/deleting a page or reordering the sidebar (use restructure-fluent-members-docs), site-wide quality checks (use audit-fluent-members-docs), or non-doc markdown like README.md.'
license: MIT
compatibility: 'VitePress repo with guide/<category>/<slug>.md and reference/<slug>.md layout. Sidebar inline in .vitepress/config.mjs (two zones: /guide/ and /reference/). Images at public/images/<category>/<slug>/. Requires Node + npm.'
metadata:
  project: fluent-members-user-docs
  knowledge-base: member/chunks/
---

# Write a Fluent Members Doc

Create one new documentation page end-to-end: place it in the right folder, load the
relevant knowledge-base chunk for technical accuracy, write in the house style, set up its
image folder, wire it into `.vitepress/config.mjs`, and verify with a clean build.

---

## Agent Behavior Rules

1. **DO** complete Phase 1 setup and confirm the summary table before writing anything.
2. **DO** load the relevant knowledge-base chunk from `member/chunks/` before writing —
   check `member/chunks/00-index.md` for the topic → chunk mapping.
3. **DO** place the file at `guide/<category>/<slug>.md` or `reference/<slug>.md`.
4. **DO** make line 1 a bare `# H1` (no frontmatter) that matches the sidebar `text`.
5. **DO** use the correct link format for the zone (see Quick Reference).
6. **DO** add the page to `.vitepress/config.mjs` in the correct sidebar zone and group.
7. **DO** end on a green `npm run docs:build`.
8. **DO NOT** create a bare `.md` file directly under the project root.
9. **DO NOT** use relative links (`./slug`, `../slug`).
10. **DO NOT** add closing support boilerplate.
11. **DO NOT** invent a new category folder or a new sidebar group without asking the user.
12. **DO NOT** write `** term **` (inner-whitespace bold) — use `**term**`.
13. **DO** mark Pro-only features with `(Pro)` — both in body text and sidebar `text`.

---

## Phase 1: Setup (Interactive)

Ask the user directly for each item. Do not assume or skip.

### 1.1 Title
> **What is the page title?** (becomes the `# H1` and the sidebar label)

Record as `TITLE`.

### 1.2 Zone
> **Is this a guide page or a reference page?**

- **guide/** — instructional content: how-to, setup steps, feature walkthroughs
- **reference/** — lookup content: glossary, shortcode specs, merge tags, changelog, FAQ

Record as `ZONE`.

### 1.3 Category folder (guide only)
> **Which category does it belong in?**

Show existing categories:
```
ls guide/      # e.g. levels, access-groups, members, settings, transactions
```
Or for nested pages (portal sub-pages, gutenberg-block sub-pages, settings sub-pages):
```
ls guide/members/      # portal/
ls guide/settings/     # payment-settings/, migration/, email-configuration/
ls guide/access-groups/ # gutenberg-block/
```
The user picks. If none fits, STOP and ask whether to add a new category — do not invent one.
Record as `CATEGORY` (may include a sub-path, e.g. `members/portal`).

### 1.4 Slug (with uniqueness check)
Derive `SLUG` = kebab-case of `TITLE`. Verify globally unique:
```
find guide reference -name '<slug>.md'  # must return nothing
```
If it collides, ask for a distinct slug. The file will be:
- Guide: `guide/<CATEGORY>/<SLUG>.md`
- Reference: `reference/<SLUG>.md`

### 1.5 Sidebar group + position
Open `.vitepress/config.mjs`. Show the existing sidebar group names for the chosen zone.
```
# Guide groups: Getting Started, Dashboard, Levels, Access Groups, Members,
#               Transactions (Pro), Settings
# Reference groups: Reference (single group)
```
Ask:
> **Which sidebar group should this appear in, and after which item?**

Record as `SIDEBAR_GROUP` and `SIDEBAR_POSITION`.

### 1.6 Pro flag
> **Is this a Pro-only feature?** (if yes, add "(Pro)" to sidebar text and mark in body)

Record as `IS_PRO`.

### 1.7 Knowledge base chunk
Look up the relevant chunk in `member/chunks/00-index.md`. Load it.
Record as `CHUNK_LOADED`.

### 1.8 Images
> **Are there images?** If yes, where are the source files?

Record as `HAS_IMAGES` + source paths.

### 1.9 Source content (optional)
> **Do you have existing content (pasted notes / draft) to convert, or should I draft
> from your description?**

Record as `SOURCE_CONTENT`.

### 1.10 Confirm

| Parameter | Value |
| --- | --- |
| Title | ... |
| Zone | guide / reference |
| Category | ... |
| File path | guide/<category>/<slug>.md |
| Public URL | /guide/<category>/<slug> |
| Sidebar group | ... |
| Position | after "..." |
| Pro-only | yes / no |
| Chunk loaded | member/chunks/XX-name.md |
| Images | yes / no |
| Source content | yes / no |

Wait for confirmation before proceeding.

---

## Phase 2: Context

1. Load `CHUNK_LOADED` (already done in 1.7) — use it to verify all technical details.
2. Read 1–2 existing docs in the same `CATEGORY` to match tone, heading depth, and image style.
3. Read the target group in `.vitepress/config.mjs` for the insertion point.

---

## Phase 3: Procedure

```
1. SCAFFOLD - Copy templates/doc-template.md to guide/<CATEGORY>/<SLUG>.md (or reference/<SLUG>.md).
              Replace the H1 with TITLE; delete the scaffold-notes comment.

2. BODY     - Write the page using facts from CHUNK_LOADED:
              - H1 (line 1) → 1-3 sentence intro (bold the **feature name** on first use)
              - ## sections, ### sub-topics
              - Bullets for unordered info; numbered lists only for strict sequences
              - Cross-links in correct format for the zone (see Quick Reference)
              - Mark Pro features "(Pro)" if IS_PRO
              - NO support boilerplate
              If SOURCE_CONTENT: convert it (fix bold whitespace, rewrite links to
              correct format, remove HTML wrappers).

3. IMAGES   - If HAS_IMAGES:
              mkdir -p public/images/<CATEGORY>/<SLUG>/
              Copy/convert source files in. Reference each as:
              ![alt text](/images/<CATEGORY>/<SLUG>/<file>.ext)

4. SIDEBAR  - Insert into .vitepress/config.mjs under the correct zone and SIDEBAR_GROUP
              at SIDEBAR_POSITION:
              { text: "<TITLE>", link: "/guide/<CATEGORY>/<SLUG>" }
              (or { text: "<TITLE>", link: "/reference/<SLUG>" } for reference)
              Keep the group collapsed: true. Keep valid JS object syntax.

5. BUILD    - Run: npm run docs:build
              Fix any dead-link / parse warnings; rebuild until clean.
```

---

## Phase 4: Verify & Report

- File created: `guide/<CATEGORY>/<SLUG>.md` (or `reference/<SLUG>.md`)
- Public URL: `/guide/<CATEGORY>/<SLUG>` (or `/reference/<SLUG>`)
- Sidebar entry added under **<SIDEBAR_GROUP>**
- Knowledge base chunk used: `member/chunks/XX.md`
- Image folder: `public/images/<CATEGORY>/<SLUG>/` (N files) or "none"
- Build: pass / fail (+ any warnings fixed)

---

## Quick Reference

### Paths & formats
```
Guide file:      guide/<category>/<slug>.md
Guide nested:    guide/<category>/<subcategory>/<slug>.md
Reference file:  reference/<slug>.md

Guide link:      /guide/<category>/<slug>
Guide nested:    /guide/<category>/<subcategory>/<slug>
Reference link:  /reference/<slug>

Image file:      public/images/<category>/<slug>/<name>.ext
Image ref:       ![Alt](/images/<category>/<slug>/<name>.ext)

Bold:            **term**                  (no inner spaces)
Pro marker:      Feature Name (Pro)
Build:           npm run docs:build
```

### Locate / check
```
Slug unique?     find guide reference -name '<slug>.md'   (must be empty)
Sidebar zone:    read .vitepress/config.mjs → sidebar object
Chunk to load:   member/chunks/00-index.md → lookup table → read chunk file
Category list:   ls guide/
Nested cats:     ls guide/members/ ; ls guide/settings/ ; ls guide/access-groups/
```

### Existing sidebar groups (guide zone)
```
Getting Started   → guide/ root files
Dashboard         → guide/dashboard.md
Levels            → guide/levels/
Access Groups     → guide/access-groups/ (incl. gutenberg-block/ sub-pages)
Members           → guide/members/ (incl. portal/ sub-pages)
Transactions(Pro) → guide/transactions/
Settings          → guide/settings/ (incl. payment-settings/, migration/, email-configuration/)
```

### Key Principles
1. **Load the chunk first** — `member/chunks/00-index.md` → correct chunk → write from facts.
2. **Zone determines the link format** — guide links include the category; reference links don't.
3. **Sidebar is in config.mjs** — not a separate JSON file; keep valid JS syntax.
4. **Sidebar is mandatory** — a doc not wired in is invisible in the site nav.
5. **Never invent a category** — confirm with user if none fits.
6. **Green build or it's not done.**
