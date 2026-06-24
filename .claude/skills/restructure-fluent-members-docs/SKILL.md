---
name: restructure-fluent-members-docs
description: 'Perform STRUCTURAL operations on Fluent Members docs while protecting reference integrity: rename a doc (change its slug/URL), move a doc to another category, delete a doc, merge two docs, or reorder the sidebar. Always rewrites inbound links, moves the image folder, and updates config.mjs. USE FOR: rename this doc, change the slug, change the URL of, move X to another category, delete this doc, remove this page, merge these two docs, reorder the sidebar, change the order of pages. DO NOT USE FOR: content/wording edits (use edit-fluent-members-doc), creating a brand-new page (use write-fluent-members-doc), or read-only audits (use audit-fluent-members-docs).'
license: MIT
compatibility: 'VitePress repo with guide/<category>/<slug>.md and reference/<slug>.md layout. Sidebar inline in .vitepress/config.mjs. Images at public/images/<category>/<slug>/. Requires git, Node + npm.'
metadata:
  project: fluent-members-user-docs
  knowledge-base: member/chunks/
---

# Restructure Fluent Members Docs

Structural changes are high-risk because **a path IS the public URL**: renaming or moving
a doc breaks every inbound link, can orphan an image folder, and desyncs the sidebar.
This skill makes those changes safely.

**Important difference from Fluent Forms:** In this project the category IS part of the URL.
Moving a doc between categories changes its URL. Always rewrite inbound links.

---

## Agent Behavior Rules

1. **DO** confirm the operation and exact old/new paths before any change.
2. **DO** find every inbound link before renaming/moving:
   `grep -rl '/guide/<old-path>' guide reference` and same for `/reference/`.
3. **DO** rewrite every inbound reference to the new path.
4. **DO** move the doc's image folder with it and fix in-doc image refs when the path changes.
5. **DO** update `.vitepress/config.mjs` — the `link`, `text`, and group as needed — keeping
   valid JS object syntax and groups `collapsed: true`.
6. **DO** use `git mv` for renames/moves so history is preserved.
7. **DO** end on a green `npm run docs:build`.
8. **DO NOT** rename or move without rewriting every inbound reference.
9. **DO NOT** leave an orphaned image folder under the old path.
10. **DO NOT** delete a doc without removing its sidebar entry AND reporting any inbound links
    that will become dead.
11. **DO NOT** change page wording here (that's edit-fluent-members-doc).

---

## Phase 1: Setup (Interactive)

### 1.1 Operation
> **Which operation?** rename | move-category | delete | reorder | merge

Record as `OPERATION`.

### 1.2 Identifiers (by operation)

- **rename:** `OLD_PATH` (e.g. `guide/levels/creating.md`), `NEW_SLUG` (the new filename, same category)
- **move-category:** `FILE_PATH`, `OLD_CATEGORY`, `NEW_CATEGORY`, target sidebar group
- **delete:** full file path + category
- **merge:** `FROM_PATH`, `INTO_PATH` (content of FROM folded into INTO, then FROM deleted)
- **reorder:** sidebar group name + the new item order

Resolve current path with `find guide -name '<slug>.md'` or `find reference -name '<slug>.md'`.

### 1.3 Inbound link survey

Run for each affected path and show the user count + file list:
```
grep -rln '/guide/<old-category>/<old-slug>' guide reference
grep -rln '/reference/<old-slug>' guide reference   (for reference docs)
```
Make the blast radius visible before confirming.

### 1.4 Confirm

| Parameter | Value |
| --- | --- |
| Operation | ... |
| Old path → new path | ... |
| URL change | /guide/old/path → /guide/new/path |
| Inbound links | N files (listed) |
| Sidebar change | ... |

Wait for confirmation.

---

## Phase 2: Context

1. Read `.vitepress/config.mjs` and locate the affected sidebar entry/entries.
2. Confirm the image folder path: `public/images/<category>/<slug>/`.

---

## Phase 3: Procedure (by operation)

```
RENAME (slug changes, same category):
  1. git mv guide/<CAT>/<OLD_SLUG>.md guide/<CAT>/<NEW_SLUG>.md
  2. git mv public/images/<CAT>/<OLD_SLUG> public/images/<CAT>/<NEW_SLUG>   (if exists)
  3. In the moved file, rewrite image refs /images/<CAT>/<OLD_SLUG>/ -> /<NEW_SLUG>/
  4. grep -rl '/guide/<CAT>/<OLD_SLUG>' guide reference -> rewrite each to /guide/<CAT>/<NEW_SLUG>
  5. config.mjs: update entry "link" to /guide/<CAT>/<NEW_SLUG> (and "text" if title changed)
  6. BUILD

MOVE-CATEGORY (slug same, category changes — URL CHANGES):
  1. git mv guide/<OLD_CAT>/<SLUG>.md guide/<NEW_CAT>/<SLUG>.md
  2. git mv public/images/<OLD_CAT>/<SLUG> public/images/<NEW_CAT>/<SLUG>  (if exists)
  3. In the moved file, rewrite image refs /images/<OLD_CAT>/<SLUG>/ -> /images/<NEW_CAT>/<SLUG>/
  4. grep -rl '/guide/<OLD_CAT>/<SLUG>' guide reference -> rewrite to /guide/<NEW_CAT>/<SLUG>
     (Unlike Fluent Forms, the category IS in the URL — all inbound links break on a category move)
  5. config.mjs: move the entry into the new sidebar group; update "link" to /guide/<NEW_CAT>/<SLUG>
  6. BUILD

MOVE TO REFERENCE (guide → reference or vice versa):
  1. git mv guide/<CAT>/<SLUG>.md reference/<SLUG>.md
  2. Move image folder accordingly
  3. Rewrite all inbound /guide/<CAT>/<SLUG> links to /reference/<SLUG>
  4. config.mjs: remove from /guide/ sidebar, add to /reference/ sidebar
  5. BUILD

DELETE:
  1. grep -rln '/guide/<CAT>/<SLUG>' guide reference -> report dead links; fix or flag
  2. git rm guide/<CAT>/<SLUG>.md
  3. rm -rf public/images/<CAT>/<SLUG>
  4. config.mjs: remove the sidebar entry
  5. BUILD

MERGE (FROM into INTO):
  1. Fold FROM's content into INTO file (preserve conventions)
  2. Move any still-needed images into INTO's image folder; fix refs
  3. grep -rl '<FROM_LINK>' guide reference -> rewrite to <INTO_LINK>
  4. Delete FROM (file + image folder + sidebar entry)
  5. BUILD

REORDER:
  1. Reorder items within the group in config.mjs (keep valid JS, collapsed:true preserved)
  2. BUILD
```

---

## Phase 4: Verify & Report

- Operation performed; old path → new path
- URL change: old public URL → new public URL
- Inbound links rewritten: count + file list
- Image folder moved/removed
- Sidebar diff in config.mjs (link/text/group/order)
- Dead links remaining (for delete): listed, or "none"
- Build: pass / fail

---

## Quick Reference

### Survey & locate
```
File by slug:    find guide -name '<slug>.md'
                 find reference -name '<slug>.md'
Inbound links:   grep -rln '/guide/<cat>/<slug>' guide reference
Image folder:    public/images/<category>/<slug>/
Sidebar entry:   grep -n '<slug>' .vitepress/config.mjs
```

### URL rules
```
Guide URL:         /guide/<category>/<slug>
Guide nested URL:  /guide/<category>/<subcategory>/<slug>
Reference URL:     /reference/<slug>
Category IS in URL — a category move ALWAYS breaks all inbound links
```

### Key Principles
1. **Path = public URL** — renaming or moving breaks links unless you rewrite them all.
2. **Category is part of the URL** — unlike Fluent Forms, a category move changes the URL.
3. **Survey blast radius first** (`grep -rln`) and show it before acting.
4. **Image folder travels with the doc**; never orphan it.
5. **Sidebar stays in sync** — update config.mjs link/text/group/order.
6. **Use `git mv`; finish on a green build.**
