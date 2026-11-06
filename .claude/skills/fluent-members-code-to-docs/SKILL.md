---
name: fluent-members-code-to-docs
description: 'Bridge between the Fluent Members plugin source and the docs. Use for "update docs for the new plugin version", "what changed in the plugin", "document the new <feature> from the code", or any request that needs reading the plugin PHP/Vue before writing. Gets a read-only checkout of the `dev` branches (free + Pro), records the sha, maps plugin paths to doc pages, reads the user-visible surface, then hands off to fluent-members-doc-writer + edit/write skills and the screenshot runner. Adapted from the Ninja Tables code-to-docs skill.'
---

# Fluent Members Code-to-Docs

| What | Where | Access |
|---|---|---|
| Free plugin source | GitHub `WPManageNinja/fluent-members`, branch **`dev`** (the integration branch; the default branch is empty scaffolding, never analyse it). Local checkout: `/Users/authlab-24/Desktop/WPManageninja-clone-from-git/fluent-members` | **Read-only** |
| Pro plugin source | GitHub `WPManageNinja/fluent-members-pro`, branch **`dev`**. Local checkout: `/Users/authlab-24/Desktop/WPManageninja-clone-from-git/fluent-members-pro` | **Read-only** |
| Built plugin the local site runs | `~/Local Sites/fcrmv3/app/public/wp-content/plugins/fluent-members(-pro)` (built assets, no Vue sources, not a git repo) | Read-only, compare the `Version:` header |
| Live site | `http://localhost:10053` (`admin`/`admin`) | Headless Chrome only |
| Older knowledge base | `member/chunks/` (index `00-index.md`) | Map of where to look, may be stale |
| Docs | this repo, `docs/<category>/<slug>.md`, `reference/<slug>.md` | Edits go here |

Never edit the plugin source; never run state-changing git in it (`checkout` of other branches, `reset`, `stash`, `commit`, `push`).

---

## Workflow

### 0. Get the source (once per session)
```bash
CL=/Users/authlab-24/Desktop/WPManageninja-clone-from-git
for r in fluent-members fluent-members-pro; do
  if [ -d "$CL/$r/.git" ]; then git -C "$CL/$r" fetch origin dev && git -C "$CL/$r" log -1 --format='%h %ad %s' origin/dev
  else gh repo clone WPManageNinja/$r "$CL/$r" -- --branch dev; fi
done
```
Read from the `dev` working tree (`git -C ... checkout dev` and `pull --ff-only` are fine **only in these dedicated checkouts**, and only when the user asked you to refresh). Record both shas for the ledger. If the site's built `Version:` differs from the source, say so before documenting.

Then read, before anything else: `.claude/plugin-memory/CATALOG.md` (module → key files → doc pages, admin route map, Pro-only list, known gaps; build it on first run, §3) and the top entries of `.claude/plugin-memory/CHANGES.md`.

### 1. Confirm scope
- **Version/range** ("docs for the next release"): previous recorded sha → `origin/dev`; `git log --oneline <old>..origin/dev` and `git diff --stat <old>..origin/dev -- . ':!vendor' ':!assets' ':!*.lock'`.
- **Single feature**: find it in CATALOG, read that module/view.
- **Everything changed** (UI/UX redesign): use `fluent-members-docs-overhaul` instead; this skill is for targeted syncs.
- Huge range → scope by screen or module with the user.

### 2. Read the code
- `ctx_search` the index first, then Read only what it points to; `ctx_index` source folders that are not indexed.
- The user-visible surface lives in: Vue template labels and translated strings, PHP `__('...', 'fluent-members')`, settings keys and their defaults, validation rules, REST routes and the controller that serves them, `fluent_members/*` filters and actions, Pro gates (code that exists only in `fluent-members-pro`), emails (templates and trigger events), shortcodes and block attributes.
- Purely internal changes (refactors, build config, CSS polish) usually need no doc change; record them as skipped.
- Confirm behaviour live on `http://localhost:10053` with the headless runner, never the Chrome extension.

### 3. Map plugin paths to doc pages
First run: build `.claude/plugin-memory/CATALOG.md` from the real tree with one row per module: `module | key files | user-facing surface | doc pages | Free/Pro`. Starting guide (verify against the tree; the plugin is a WPFluent app with a Vue admin SPA):

| Plugin area | Doc target |
|---|---|
| Admin SPA: Dashboard, Membership Levels, Access Groups, Members, Billing (Pro), Settings views | `docs/dashboard`, `docs/levels`, `docs/access-groups`, `docs/members`, `docs/transactions`, `docs/settings` |
| Content protection (page/post/archive, partial preview, dripping, Gutenberg block access, REST) | `docs/access-groups/*` (incl. `gutenberg-block/`), `docs/settings/*` |
| Member portal, login popup | `docs/members/portal/*`, `docs/settings/*` |
| Payment providers and integrations (FluentCart, Fluent Forms, Paymattic, PayPal/Stripe/WooCommerce Pro) | `docs/settings/payment-settings/*` |
| Migration tools (PMPro, MemberPress, RCP) | `docs/settings/migration/*` |
| Email notifications, mailing | `docs/settings/email-configuration/*` |
| Shortcodes, hooks/filters, REST routes | `reference/*` |

Nothing matches → grep `docs reference` for the feature name. Still nothing → it needs a new page: propose category + slug to the user before creating it.

### 4. Write
Load `fluent-members-doc-writer`. Use `edit-fluent-members-doc` (existing page; run `verify-fluent-members-doc-against-code` for the claims) or `write-fluent-members-doc` (new page, sidebar, featured card).

### 5. Screenshots
Strip stale images and leave `TODO(screenshot)` placeholders (format in `fluent-members-docs-overhaul` §5), or, when the screen is reachable and the text is final, run `fluent-members-doc-screenshots` to fill them. Record the plan names and the plugin sha in `.claude/plugin-memory/CHANGES.md`.

### 6. Verify
`npm run docs:build` clean; every referenced image exists on disk; no em dashes, relative links or support boilerplate on touched pages.

---

## Hard rules
- Never fabricate behaviour. Ambiguous code → ask.
- Never copy plugin source into user docs (hook names, shortcode attributes and REST routes are fine on reference pages).
- Never skip the writer skill.
- Never write secrets or real keys; use `<your-api-key>`-style placeholders.
- Never commit or push unless asked.

## Report (end of every run)
```
## Plugin → Docs sync summary
Source: fluent-members dev@<sha>, fluent-members-pro dev@<sha>; site build <version>
Range: <since>..HEAD (<N> commits, <M> files)
Doc pages updated / created: <path>: <reason>
Screenshots: <plan>: <refreshed/added>, placeholders left: <n>
Plugin changes skipped (no doc impact): <path>: <reason>
Open questions: <...>
```
Then prepend a `CHANGES.md` entry and update `CATALOG.md` (`Last fully audited:` per module touched).
