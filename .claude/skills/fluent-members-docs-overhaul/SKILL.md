---
name: fluent-members-docs-overhaul
description: 'Full, page-by-page update of the Fluent Members docs against the CURRENT plugin, for when the UI/UX or features changed. Builds a feature map from the plugin code and the live local site, checks the sidebar/category structure against the user journey, then touches every doc one at a time: verifies every step and label against the code, adds missing features, rewrites in the house voice (fluent-members-doc-writer), strips stale screenshots and leaves TODO(screenshot) placeholders for the screenshot runner. Resumable through a ledger in .claude/docs-overhaul/. USE FOR: update all docs from the previous docs to the new plugin, the UI changed, check every doc from the beginning, make sure every feature is documented, reorganise categories for the user journey. DO NOT USE FOR: one page (edit-fluent-members-doc), a release-range sync (fluent-members-code-to-docs), taking screenshots (fluent-members-doc-screenshots), a read-only health check (audit-fluent-members-docs). Adapted from the Ninja Tables docs overhaul.'
---

# Fluent Members Docs Overhaul

Goal: every page describes the plugin exactly as it works **today**, every user-visible feature has a home, and the sidebar walks a new site owner from install to a protected, sold, managed membership without a gap. The previous docs are a **draft to correct**, never a source of truth. Stale screenshots are removed here and replaced by placeholders; `fluent-members-doc-screenshots` fills them later.

This skill is an **orchestrator**: it decides *what* each page must say and in *which order* pages sit. Other skills decide *how*:

| Need | Load |
|---|---|
| Voice, format, headings, callouts, links, Pro marking | `fluent-members-doc-writer` (always, first) |
| In-place edit procedure | `edit-fluent-members-doc` |
| New page (file + sidebar + featured card) | `write-fluent-members-doc` |
| Move / merge / delete / reorder | `restructure-fluent-members-docs` |
| Per-page claim-by-claim proof against code | `verify-fluent-members-doc-against-code` |
| Plugin source access, helper commands, release diffs | `fluent-members-code-to-docs` |
| Pre-existing knowledge base (secondary, may be stale) | `member/chunks/00-index.md` |
| Images | `fluent-members-doc-screenshots` |

---

## Hard rules

- **Never touch the other PC.** No `mcp__claude-in-chrome__*`, `mcp__remote-devices__*`, `mcp__Claude_Browser__*`, `mcp__computer-use__*`, RemoteTrigger, SendMessage, ListAgents, Artifact. Live checks use headless Chrome on THIS machine only. Repeat this rule verbatim in the prompt of every subagent you start.
- **Plugin source is read-only.** No edits, no state-changing git (checkout of other branches, reset, stash, commit, push).
- **Code + live site beat old docs and beat `member/chunks/`.** The chunks were written earlier and can be stale; treat them as a map of where to look. Never carry a step, label, default or Free/Pro claim over from the old text without confirming it in the code or on the site. Unclear after both → record it in `QUESTIONS.md` and ask.
- **Never invent** a feature, option, default or behaviour.
- **Slugs are URLs.** Moving or renaming changes the public URL (`/docs/<category>/<slug>`). Do it only with approval, through `restructure-fluent-members-docs`, and log `old → new` in `REDIRECTS.md`.
- **Two approval gates:** the structure plan (§3) and any delete / merge / slug rename. Everything else proceeds.
- Never commit or push unless asked. Never edit `.vitepress/dist/` or `.vitepress/cache/`.

---

## 1. Working files (resumability)

Live in `.claude/docs-overhaul/` (excluded from the site build). On every start read them and continue from the first unfinished item. Never redo a `done` page unless the plugin changed since (compare the sha in the ledger).

| File | Purpose |
|---|---|
| `FEATURE-MAP.md` | One row per user-visible feature/option group: `# | Feature | Where in the UI | Free/Pro | Source (file:line) | Live-checked | Doc page §`. Empty `Doc page §` = undocumented. The overhaul is finished only when no row is empty. |
| `LEDGER.md` | One row per doc page: `Page | Group | Status | Code ✓ | Live ✓ | Features (#) | Placeholders | Open questions | Plugin sha`. Status: `todo → in-progress → done` (or `merge-into:<slug>`, `delete`, `new`). |
| `JOURNEY.md` | The approved structure (§3). |
| `REDIRECTS.md` | `old /docs/... → new /docs/...` for every approved rename/merge. |
| `QUESTIONS.md` | Open product questions with `file:line` evidence, batched for the user. |
| `CHANGES.md` | Per-run log, newest first: plugin shas, pages touched, what was skipped. |

---

## 2. Phase A: build the feature map (no doc edits yet)

### 2.1 Inventory
- Get plugin source up to date (read-only) via `fluent-members-code-to-docs` §0. Record free + Pro branch and sha, and the plugin `Version:` headers.
- List every doc page with its H2/H3 outline: `find docs reference -name '*.md' | sort`. Flag structural debt: pages missing from the sidebar, orphan images, em dashes, relative links, old labels.

### 2.2 Read the plugin, screen by screen
Walk the admin in the order a user meets it, using the live nav as the skeleton: **Dashboard → Membership Levels → Access Groups → Members → Billing (Pro) → Settings**, then the front end: protected content experience, login popup, member portal, pricing/level shortcodes, Gutenberg block controls, per-post protection panel, and integrations (FluentCart, Fluent Forms, Paymattic, FluentCRM, FluentSupport, FluentCommunity, WooCommerce Pro) and migration tools.

For each screen record every control: exact label, default, options, what it changes for the member or visitor, when it shows (level type, Pro, integration active), and Free/Pro gating. Source order: Vue templates and translated strings, PHP `__('...', 'fluent-members')`, settings defaults and validation, Hooks/Handlers, REST routes and controllers, Pro-only code in `fluent-members-pro`, then `member/chunks/` as a cross-check.

Search the context-mode index first (`ctx_search`), read only what it points to; index source folders with `ctx_index` when needed.

### 2.3 Confirm on the local site
Site `http://localhost:10053` (`admin`/`admin`), admin app `.../wp-admin/admin.php?page=fluent-members#/<route>`. It runs the built plugin (check the version header against the source you read; if they differ, say so).
- Drive it with headless Chrome via `playwright-core` (the same stack as `scripts/screenshots/shoot.cjs`) from a script in the session scratchpad. Captures taken for checking never go under `public/images/`.
- Check what code reading leaves uncertain: does the option appear, where, under which condition, what does the member actually experience.
- Create throwaway data only, named `DOCTEST <feature>`; delete it at the end. Never alter the sample levels/members used for screenshots.
- A screen that cannot be reached (live payment gateway, OAuth, remote service): document from code and mark `Live-checked: no (<reason>)`.

### 2.4 Coverage pass
Map each FEATURE-MAP row to the page § that covers it today. Empty rows are the missing content. Report counts (total / covered / partial / missing / wrong-in-old-docs) before Phase B.

---

## 3. Phase B: check the structure against the user journey (approval gate)

Derive structure from the feature map, not from the current folders. A new site owner's path:

1. **Understand and install**: what Fluent Members is, Free vs Pro, install, licence, first-run setup.
2. **Create what you sell**: Membership Levels (Individual, Corporate), pricing plans, status.
3. **Decide what is protected**: Access Groups, page/post/archive protection, partial preview, dripping, block-level access, REST protection.
4. **Take members in**: pricing shortcodes, login popup, payments (native, FluentCart, Fluent Forms, Paymattic, PayPal/Stripe/WooCommerce Pro), migration from PMPro/MemberPress/RCP.
5. **Manage members**: member list, statuses, profile, manual add, corporate seats, subscriptions and billing actions (Pro).
6. **The member's side**: member portal, cancelling, account pages.
7. **Settings**: General, Login Popup, Mailing, Email Notifications, Partial Content, Public Contents, integrations.
8. **Reference and help**: shortcodes, hooks/filters, glossary, troubleshooting.

Every step must be reachable reading top to bottom; no page assumes a concept that only appears later without a link. Propose in `JOURNEY.md`: sidebar groups and order (short, task-first labels), per page `keep / move / merge / split / new / delete` with a one-line reason, new pages for missing features (category + slug), any slug rename with its redirect. **Show it to the user and wait for approval.** Apply it with `restructure-fluent-members-docs` and `write-fluent-members-doc`, then `npm run docs:build`.

---

## 4. Phase C: touch every page (one at a time, in journey order)

For each page in LEDGER order, set `in-progress`, then:

1. **Load** `fluent-members-doc-writer` (once per session; re-read if unsure).
2. **Collect** the FEATURE-MAP rows for this page and the matching code files.
3. **Verify every claim** with `verify-fluent-members-doc-against-code`: menu path, button labels, step order, defaults, option lists, what happens after **Save**, Free/Pro. Wrong → fix. Missing → add. Gone from the plugin → delete, and mention the new location only if it moved.
4. **Complete it:** every assigned feature gets its own option or step with what it does, when to use it, defaults and conditions. Prerequisites first, outcome last.
5. **Rewrite in house voice** (writer skill §2-§3): H1 on line 1 (no frontmatter), 1-3 sentence opening with the bold feature name and `(Pro)`, the right page shape (§6 of the writer skill), exact bold labels, absolute links (check every target), at most two `> [!Note]`, no em dashes, ends on the action or outcome.
6. **Strip screenshots** (§5) and place placeholders.
7. **Record** in LEDGER: Code ✓, Live ✓, feature numbers, placeholder count, open questions, plugin sha; fill the FEATURE-MAP `Doc page §` cells; status `done`. Update the sidebar `text` if the H1 changed.

Parallelising: pages are independent after Phase B, so batches may go to subagents. Give each one: its page list, its FEATURE-MAP rows, this skill's path, the writer skill, the hard rules **including the other-PC rule verbatim**, and "do not edit `config.mjs`, `index.md` or any page outside your list; do not run the build". Review every returned page yourself before marking it done. Run `npm run docs:build` every ~10 pages.

---

## 5. Screenshots: remove now, mark for later

Remove every `![...](/images/...)` line from each page you rewrite. **Do not delete or rename files in `public/images/`**; they become orphans until the screenshot pass replaces them (orphans are reported, never bulk-deleted).

Add a placeholder wherever a reader needs to see the screen: the first time a step opens a screen, each documented settings section, each modal, and the visible member/visitor result. Not every click. HTML comment (invisible on the site, parsed by the screenshot pass):

```md
<!-- TODO(screenshot): levels-creating-1
  screen: Fluent Members → Membership Levels, Create modal
  state: Add Membership Level modal open, Type = Individual
  data: sample level "Pro Plan"
  highlight: Create button
  view: admin
  alt: Screenshot of the Add Membership Level modal with the Title field and Individual/Corporate type selector
-->
```

- `id` = `<slug>-<n>`, numbered in page order, unique across the site.
- `view`: `admin` or `frontend` (portal, login popup, protected page). `highlight`: what the arrow points at, or `-`.
- Sample data is obviously fake (`Acme Studio`, `jane@example.com`).
- No `{{ }}`, no `-->` and no `---` inside the comment. Own line, blank line before and after; inside a list item, indent to the item's text.

Queue and duplicate-id check:
```bash
grep -rn 'TODO(screenshot)' docs reference | wc -l
grep -rhoE 'TODO\(screenshot\): [a-z0-9-]+' docs reference | sort | uniq -d   # must print nothing
```

---

## 6. Phase D: verify and hand over

1. FEATURE-MAP: no empty `Doc page §` cells (or each approved as "no doc needed").
2. LEDGER: every row `done` / merged / deleted as approved.
3. Every page in the sidebar exactly once, in `JOURNEY.md` order; every H1 matches its sidebar `text`.
4. `npm run docs:build` clean. No dangling image refs: every `/images/...` in the docs exists on disk (check) and none is external or relative; report orphan files, do not delete.
5. Content lint: `grep -rn '—' docs reference` (no em dashes in prose), no `** x **`, no relative links, no support boilerplate.
6. `npm run featured:generate` for new pages; for retitled pages delete the old card first.
7. Delete DOCTEST data created on the local site.
8. Prepend a `CHANGES.md` entry. Report:

```
## Docs overhaul summary
Plugin: fluent-members <branch>@<sha>, Pro <branch>@<sha>, site build <version>
Features: <total> mapped, <n> newly documented, <n> corrected, <n> removed (gone from plugin)
Pages: <n> rewritten, <n> new, <n> merged, <n> moved, <n> deleted
Structure: <groups> sidebar groups (JOURNEY.md), redirects needed: <n> (REDIRECTS.md)
Screenshots: <n> image refs removed, <n> placeholders added, <n> orphan files left
Open questions: <n> (QUESTIONS.md)
```
