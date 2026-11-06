# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

End-user documentation for **Fluent Members** (a WordPress membership plugin by WPManageNinja), built as a **VitePress** static site. This repo contains docs and site config — **not** the plugin's source code. Content is written against the live plugin admin UI: task-oriented, screenshot-driven how-to pages.

## Commands

```bash
npm install            # install deps
npm run docs:dev       # local dev server with hot reload
npm run docs:build     # production build — MUST pass clean (fails on dead links); the definition of "done"
npm run docs:preview   # preview the production build
```

`npm run shots -- scripts/screenshots/plans/<plan>.json` takes doc screenshots (see Screenshots below).

There is no test suite. `npm run docs:build` is the gate: it errors on broken internal links, so treat a green build as verification.

## Architecture

- **Two content zones**, each with its own sidebar config and link format:
  - `docs/<category>/<slug>.md` — instructional content (how-to, setup, walkthroughs). URL: `/docs/<category>/<slug>`. **The category IS part of the URL.**
  - `reference/<slug>.md` — flat lookup content (glossary, shortcodes, merge tags, hooks). URL: `/reference/<slug>`.
  - Guide categories: `getting-started`, `dashboard`, `levels`, `access-groups`, `selling`, `members`, `billing`, `integrations`, `settings`, `help-support`. Some nest one level deeper (`members/portal/`, `settings/payment-settings/`, `settings/migration/`, `settings/email-configuration/`, `access-groups/gutenberg-block/`).

- **The sidebar and nav are hand-maintained in `.vitepress/config.mjs`** — an inline JS array (`docsSidebar`) shared by `/docs/`, `/reference/` and `/changelog`, not generated from the filesystem. Groups follow the reader's journey and page order in `.claude/docs-overhaul/JOURNEY.md`, so a page's sidebar group can differ from its folder. A page is invisible in site navigation until it is wired in here. Keep valid JS object syntax. `cleanUrls: true`, so links omit `.md`.

- **Images** live at `public/images/<category>/<slug>/<name>.webp` and are referenced with an absolute path `/images/<category>/<slug>/<name>.webp` (the `public/` prefix is dropped in refs). Prefer `.webp`.

- **Knowledge base for authoring: `member/chunks/`.** Numbered fact chunks (`00-index.md` maps topic → chunk) documenting the plugin's actual behavior, schema, and features. Load the relevant chunk to verify technical details **before** writing or editing a page — do not invent plugin behavior.

## Page conventions

- Every page starts with frontmatter holding `title` and a one-sentence `description`, followed by a `# H1` that matches `title`. The sidebar `text` is a shorter, task-first label and does not have to match the H1.
- Bold UI labels and feature names: `**Fluent Members → Levels**`. No inner spaces: `**term**`, never `** term **`.
- Use `> [!Note]` callouts and tables for field references (see existing pages like `docs/levels/creating.md` for house style).
- Always use **absolute** links in the zone's format; never relative (`./slug`, `../slug`).
- Mark Pro-only features with `(Pro)` in body text and `<span class="fm-pro">Pro</span>` in the sidebar `text`.
- No closing support/boilerplate blocks at the end of pages.

## Design system

The theme is ported from the Ninja Tables docs (`ninja-table-docs/.vitepress/theme/`) and recoloured to the Fluent Members purple. Classes and variables use the `fm-` prefix.

- `aurora.css` is the soft colour background and frosted nav and sidebar. `motion.css` holds the page and hover transitions. `Layout.vue` adds the sidebar accordion, so only the current group stays open.
- **Doc trees** (`.vitepress/trees/<id>.json`, registered in `trees/index.ts`) drive landing pages through `::: doc-tree <id> hero|tasks|journey|map|panel` lines, and the "you are here" strip on child pages. After editing a tree, `node scripts/qa/check-trees.mjs` must print `✓`.
- `::: tabs` and `::: faq` blocks split sections with `== Label` lines (`plugin-doc-blocks.ts`). Do not nest another `:::` block inside them.

## Skills — route doc work through these

Repo-specific skills in `.claude/skills/` encode the full workflow (placement, sidebar wiring, image folders, knowledge-base lookup, clean build). Prefer them over ad-hoc edits:

- **write-fluent-members-doc** — create a new page
- **edit-fluent-members-doc** — edit an existing page's content in place
- **restructure-fluent-members-docs** — rename/move/delete/merge a page or reorder the sidebar (rewrites inbound links + moves image folder + updates config.mjs)
- **audit-fluent-members-docs** — read-only quality gate (links, sidebar coverage, images, build)
- **fluent-members-doc-writer** — master voice/format guide; **load before writing any page**
- **fluent-members-docs-overhaul** — update the WHOLE site to the current plugin (feature map → journey → page-by-page verify/rewrite → screenshot placeholders); resumable via `.claude/docs-overhaul/`
- **verify-fluent-members-doc-against-code** — prove one page claim-by-claim against the plugin source and live site
- **fluent-members-code-to-docs** — get the plugin source (`develop` branches), map code → doc pages, sync after a release
- **fluent-members-doc-screenshots** — take/annotate/place admin screenshots with the headless-Chrome runner; fills `TODO(screenshot)` placeholders

## Writing voice (summary — full rules in `fluent-members-doc-writer`)

- Open with 1–3 sentences: what the feature is and when to use it; bold the feature name, add `(Pro)` if Pro-only. No "In this guide…".
- Second person, present tense, imperative steps, short direct sentences. Members are **members**; people on the site are **visitors**.
- **No em dashes (`—`)** in prose. End on the action or outcome, never a sign-off or support line.
- Exact UI labels as shown in the current app (top nav says **Membership Levels**). Bold labels, `**Fluent Members → Membership Levels**` paths, `> [!Note]` for the one aside a page may need.
- Never state anything you have not proven against the plugin code or live site; the old docs and `member/chunks/` are drafts, not evidence.

## Updating docs after plugin UI/feature changes

1. `fluent-members-code-to-docs` — get the plugin source (`develop` branches of WPManageNinja/fluent-members and fluent-members-pro, checked out read-only under `~/Desktop/WPManageninja-clone-from-git/`), record the shas.
2. `fluent-members-docs-overhaul` — Phase A feature map (code + live site `http://localhost:10053`), Phase B journey/structure plan (**approval gate**), Phase C each page: verify (`verify-fluent-members-doc-against-code`), rewrite (`fluent-members-doc-writer`), strip stale screenshots, leave `TODO(screenshot)` placeholders.
3. `fluent-members-doc-screenshots` — fill the placeholders with the runner.
4. `audit-fluent-members-docs` + clean `npm run docs:build`.

Working state (ledger, feature map, questions, redirects) lives in `.claude/docs-overhaul/`; plugin catalog and sync log in `.claude/plugin-memory/`. Both are excluded from the site build. Never commit unless asked.

## Git

Main branch is `master`. Work happens on feature branches (e.g. `Rasel`). Commit/push only when asked.

## Screenshots

Doc screenshots are **generated by script, never by hand**: a JSON plan in `scripts/screenshots/plans/` drives headless Google Chrome (`playwright-core`) against the local dev site `http://localhost:10053` (Local site `fcrmv3`, login `admin`/`admin`), crops to the Fluent Members app (no WP chrome), draws purple `#6B35E8` arrows, and writes 2x `.webp` into `public/images/<category>/<slug>/`. Ported from the FluentCart docs repo.

```bash
npm run shots -- scripts/screenshots/plans/<plan>.json [--only=name1,name2]
```

- Runner: `scripts/screenshots/shoot.cjs` (step vocabulary documented at its top); library in `scripts/screenshots/lib/`; raw PNGs in `scripts/screenshots/raw/` (gitignored).
- Never use the Chrome extension, computer-use or `screencapture` for this. Verify every image with Read before placing it. Full workflow: the **fluent-members-doc-screenshots** skill.

## Featured (social-share) images

Every page has its own link-preview card — the image Slack, X, LinkedIn and Facebook show when a docs URL is shared. Cards are **generated, not designed by hand**: `scripts/generate-featured-images.mjs` renders a branded 1200×630 PNG carrying the page's title and section into `public/images/featured/`, and the VitePress config (`featuredImageFor()`) points each page's `og:image` / `twitter:image` at it. A page with no card falls back to `default.png`.

```bash
npm run featured:generate     # render cards for pages that don't have one yet (idempotent)
npm run featured:regenerate   # re-render every card (after changing the generator's design)
```

- Run `npm run featured:generate` after adding a page and commit the PNG alongside it.
- If you rename or retitle a page, delete its old card first and run the generator again — it skips existing files and only *reports* orphans, it never deletes them.
- Card naming rule: the page's served path (after `rewrites`) minus `.md`, with `/` replaced by `--`, plus `.png`. It lives in both the script (`cardNameFor()`) and the config (`featuredImageFor()`) — change one, change the other.
- These PNGs are the deliberate exception to any "images must be `.webp`" rule in this repo: social scrapers expect PNG/JPEG.
