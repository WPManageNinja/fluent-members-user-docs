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

Note: `docs:screenshots:plan` and `docs:screenshots` are declared in package.json but point at a `scripts/` directory that does not currently exist — they will not run as-is.

There is no test suite. `npm run docs:build` is the gate: it errors on broken internal links, so treat a green build as verification.

## Architecture

- **Two content zones**, each with its own sidebar config and link format:
  - `guide/<category>/<slug>.md` — instructional content (how-to, setup, walkthroughs). URL: `/guide/<category>/<slug>`. **The category IS part of the URL.**
  - `reference/<slug>.md` — flat lookup content (glossary, shortcodes, merge tags, hooks). URL: `/reference/<slug>`.
  - Guide categories: `getting-started`, `dashboard`, `levels`, `access-groups`, `members`, `transactions`, `settings`, `help-support`. Some nest one level deeper (`members/portal/`, `settings/payment-settings/`, `settings/migration/`, `settings/email-configuration/`, `access-groups/gutenberg-block/`).

- **The sidebar and nav are hand-maintained in `.vitepress/config.mjs`** — an inline JS array (`guideSidebar`) plus a `/reference/` sidebar object, not generated from the filesystem. A page is invisible in site navigation until it is wired in here. Keep valid JS object syntax. `cleanUrls: true`, so links omit `.md`.

- **Images** live at `public/images/<category>/<slug>/<name>.webp` and are referenced with an absolute path `/images/<category>/<slug>/<name>.webp` (the `public/` prefix is dropped in refs). Prefer `.webp`.

- **Knowledge base for authoring: `member/chunks/`.** Numbered fact chunks (`00-index.md` maps topic → chunk) documenting the plugin's actual behavior, schema, and features. Load the relevant chunk to verify technical details **before** writing or editing a page — do not invent plugin behavior.

## Page conventions

- Line 1 is a bare `# H1` with **no frontmatter**, and it must match the sidebar `text` for that page.
- Bold UI labels and feature names: `**Fluent Members → Levels**`. No inner spaces: `**term**`, never `** term **`.
- Use `> [!Note]` callouts and tables for field references (see existing pages like `guide/levels/creating.md` for house style).
- Always use **absolute** links in the zone's format; never relative (`./slug`, `../slug`).
- Mark Pro-only features with `(Pro)` in both body text and the sidebar `text`.
- No closing support/boilerplate blocks at the end of pages.

## Skills — route doc work through these

Four repo-specific skills in `.claude/skills/` encode the full workflow (placement, sidebar wiring, image folders, knowledge-base lookup, clean build). Prefer them over ad-hoc edits:

- **write-fluent-members-doc** — create a new page
- **edit-fluent-members-doc** — edit an existing page's content in place
- **restructure-fluent-members-docs** — rename/move/delete/merge a page or reorder the sidebar (rewrites inbound links + moves image folder + updates config.mjs)
- **audit-fluent-members-docs** — read-only quality gate (links, sidebar coverage, images, build)

## Git

Main branch is `master`. Work happens on feature branches (e.g. `Rasel`). Commit/push only when asked.
