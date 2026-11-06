---
name: verify-fluent-members-doc-against-code
description: 'Verify ONE Fluent Members doc page claim by claim against the plugin source (free + Pro, `dev` branch) and the live local site, then fix what is wrong. Extracts every checkable claim (UI label, option, default, step, path, Free/Pro flag, shortcode attribute, hook, limit), proves or disproves each with file:line evidence, checks coverage of options the page forgot, and applies the fixes. USE FOR: verify this doc against the code, is this page accurate, fact-check a doc, the UI changed so check this page, deep audit of a page or a category folder. DO NOT USE FOR: site-wide link/sidebar lint (audit-fluent-members-docs), a full multi-page pass (fluent-members-docs-overhaul, which calls this per page), writing a new page (write-fluent-members-doc). Adapted from the Ninja Tables verify skill.'
---

# Verify a Fluent Members doc against the plugin code

After this procedure every factual statement on the page is **proven true by the code** (or the live UI), every real option of the screen it documents is covered, and nothing invented remains. One page at a time; a folder is a loop of pages.

**Hard rules**
- This machine only. Never use the Chrome extension, remote-device, computer-use or any other-PC tool, never `screencapture`. Browser checks = headless local Chrome via `playwright-core`.
- Plugin source is read-only. Never trust the old doc, `member/chunks/`, or memory over the code. If you cannot prove a claim, mark it `unverified`; do not "fix" it to a guess.
- Do not commit. Do not delete images (report orphans). Do not run `npm run docs:build` while other agents are editing in parallel; the lead builds once at the end.

## Step 0: Orient
1. Read the page. Note the screen or feature it documents and its sidebar group.
2. Find the code: `fluent-members-code-to-docs` §3 (feature → plugin path map), `member/chunks/00-index.md` for a pointer, then `ctx_search`. Typical homes (WPFluent plugin): admin Vue SPA views/components, `app/Http/Controllers` + `routes`, `app/Hooks/Handlers`, `app/Models`, `app/Services`, `app/Views`, `database/`, and the same layout in `fluent-members-pro` (Pro extends free through `fluent_members/*` filters).
3. Check recent drift: `git -C <source> log --oneline -n 30 -- <those files>`. Recent commits are the likeliest source of wrong text.

## Step 1: Extract the claims
Scratch table (not in the repo): `# | Page line | Type | Claim | Code evidence (file:line) | Live UI | Verdict`.

Claim types, every time:
- **LABEL**: any bold UI text, button, tab, modal, menu path. Exact wording and capitalisation as displayed.
- **OPTION**: each field/switch/choice the page says exists, and its choices.
- **DEFAULT**: default values and initial states.
- **STEP**: order and result of each step; prerequisites.
- **FLAG**: Free/Pro marking and conditions (Pro active, level type Individual vs Corporate, integration plugin active).
- **BEHAVIOUR**: what the member or visitor experiences; what is saved; what is hidden when off. Includes status names, email triggers, redirect and restriction behaviour.
- **LIMIT**: numbers, ranges, counts.
- **NAME**: shortcodes and attributes, hooks/filters, REST routes, option keys, class names.
- **LINK**: internal links point to the page that really covers the topic.
- **IMAGE**: each screenshot shows the UI the text describes (or is a stale one to strip).

## Step 2: Prove each claim
1. **Code**: open the exact component/handler and quote `path:line`. For labels read the rendered template text, not just a translation key. For defaults find where state is initialised, not the first use. For behaviour follow it to where it is applied (the restriction check, the status transition, the mail trigger).
2. **Free vs Pro**: confirm which plugin holds the code and any licence or Pro gate.
3. **Conditions**: Individual vs Corporate levels, each provider/integration, Free-only vs Pro-active. Check both branches when the page does not say.
4. **Live UI** (the 3-6 most important claims, not all): `http://localhost:10053` (`admin`/`admin`), headless Chrome. Pro is active locally, so Free-only states are code-only; say so.
5. Verdict: `OK`, `WRONG`, `OUTDATED` (was true, UI/flow changed), `MISSING` (real option/behaviour the page should state), `UNVERIFIED`, `POLISH` (true but unclear).

Known-risk areas in this repo (the previous audit found these wrong in the old docs; always re-prove from code): the **member status set**, the **email-notification list**, the **integrations** (FluentCRM, FluentCommunity, FluentSupport), and exact nav/tab labels (top nav says **Membership Levels**).

## Step 3: Coverage check
List every control on the documented screen from the Vue template (fields, switches, selects, hidden-until-toggled controls, Pro-gated ones). Real and user-facing but not on the page → `MISSING`. On the page but not in the UI → `WRONG`. Compare with sibling pages for contradictions.

## Step 4: Fix
Edit the page with `edit-fluent-members-doc` + `fluent-members-doc-writer`:
- Change `WRONG`, `OUTDATED`, `MISSING` items to what the code proves, with exact bold labels.
- Leave `UNVERIFIED` text unchanged and list it; never guess.
- Mark Pro with `(Pro)` on first use (page and sidebar `text`).
- Keep the slug, absolute links, no `.md`, no relative links.
- Stale screenshots: strip them and leave a `TODO(screenshot)` placeholder (format in `fluent-members-docs-overhaul` §5).

## Step 5: Report (per page)
```
Page: docs/<category>/<slug>.md   Verdict: ok | fixed | needs-decision
Claims checked: N   OK n   WRONG n   OUTDATED n   MISSING n   UNVERIFIED n   POLISH n
Fixed: <what changed + evidence path:line>
Unverified (left as is): <claim + why>
Placeholders added: <ids>
Needs decision: <questions>
Plugin issues noticed (not docs errors): <e.g. stale in-app text, bugs>
```
Folder runs: append each block to `.claude/docs-overhaul/reports/verify-<folder>.md` with a summary table.

## Gate (lead, once, after all pages)
`npm run docs:build`; every `/images/...` ref exists on disk; grep the known-risk labels across `docs/` for leftovers; `grep -rn '—' docs`.
