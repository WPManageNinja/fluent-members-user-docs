---
name: audit-fluent-members-docs
description: 'Run a read-only quality gate across the whole Fluent Members docs site: verify file placement, link form, sidebar coverage, image integrity, convention compliance, and a clean production build. Produces a scored pass/fail checklist with offending paths, then offers fixes. USE FOR: audit the docs, check for broken links, verify doc conventions, run the quality gate, is everything consistent, lint the docs, pre-commit doc check, find docs missing from the sidebar, find orphaned images. DO NOT USE FOR: writing a new page (use write-fluent-members-doc), editing content (use edit-fluent-members-doc), or renaming/moving/deleting (use restructure-fluent-members-docs).'
license: MIT
compatibility: 'VitePress repo with guide/<category>/<slug>.md and reference/<slug>.md layout. Sidebar is inline in .vitepress/config.mjs. Images at public/images/<category>/<slug>/. Requires Node + npm to run docs:build.'
metadata:
  project: fluent-members-user-docs
  knowledge-base: member/chunks/
---

# Audit Fluent Members Docs

A read-only health check for the documentation site. Run it before committing or deploying.
It reports problems first; it fixes only with explicit user approval.

---

## Agent Behavior Rules

1. **DO** run all checks read-only and present the full scored report before changing anything.
2. **DO** show offending file paths for every failed check (not just a count).
3. **DO** ask for confirmation before applying any fix; route real fixes through the
   appropriate skill (edit / restructure / write).
4. **DO** finish with `npm run docs:build` and report its result.
5. **DO NOT** edit content silently.
6. **DO NOT** mark a check "pass" without the command output that proves it.

---

## Phase 1: Setup (Interactive)

### 1.1 Scope
> **Audit the whole site, or a specific section (guide/ or reference/)?**

Record as `SCOPE` (default: whole site).

### 1.2 Fix mode
> **Report only, or report and then offer to fix?**

Record as `FIX_MODE`. (Default: report only.)

---

## Phase 2: Context

1. Read `.vitepress/config.mjs` — extract all sidebar `link` values from both `/guide/` and `/reference/` zones.
2. Count docs:
   ```
   guide docs:     find guide -name '*.md' | wc -l
   reference docs: find reference -name '*.md' | wc -l
   sidebar links:  grep -c '"link"' .vitepress/config.mjs
   ```

---

## Phase 3: Checks

Run each; record PASS/FAIL + offending paths.

```
C1 PLACEMENT
  - guide/ docs must live in a category subfolder (never directly under guide/):
      find guide -maxdepth 1 -name '*.md'    -> expect only index.md or none
  - reference/ docs must be directly under reference/ (no sub-folders):
      find reference -mindepth 2 -name '*.md'  -> expect empty
  - Nested portal/gutenberg-block/settings subfolders are allowed:
      guide/members/portal/, guide/access-groups/gutenberg-block/, guide/settings/*/

C2 LINK FORM
  - No relative links anywhere:
      grep -rEn '\]\(\.\.?/' guide reference    -> expect empty
  - guide links must include the category segment:
      e.g. /guide/levels/creating  NOT /guide/creating
  - reference links must be /reference/<slug>:
      grep for /reference/ links with missing slug pattern
  - No bare /guide/ or /reference/ used as if they were doc links

C3 EXTERNAL
  - No residual links to external plugin docs:
      grep -rn 'fluentmembers.com/docs/' guide reference  -> expect empty

C4 BOILERPLATE
  - No support boilerplate:
      grep -rin 'contact our support team' guide reference   -> expect empty
      grep -rin 'reach out to our support team' guide reference -> expect empty

C5 SIDEBAR COVERAGE
  - Every sidebar link in config.mjs resolves to a real file:
      For each link (e.g. /guide/levels/creating), the file guide/levels/creating.md
      (or guide/levels/creating/index.md) must exist.
  - Every .md file in guide/ and reference/ must appear as a sidebar link.
      (Find slugs not in config.mjs — these are invisible orphaned pages.)

C6 IMAGES
  - Every ![](/images/<cat>/<slug>/<file>) ref resolves to a real file under public/images/.
  - Flag image folders under public/images/ that no doc references (orphaned).

C7 BOLD
  - No inner-whitespace bold (broken open or broken close).
      open : grep -rEn '(^|[[:space:]([{])\*\* ' guide reference
      close: grep -rEn ' \*\*([[:space:]]|$)' guide reference
    Union of matches should be empty.

C8 PRO MARKERS
  - Any sidebar entry referencing a Pro feature should have "(Pro)" in its text.
      Cross-reference: items with link containing /transactions/, /stripe-setup,
      /corporate-memberships, /updating-payment-method, /renewing-a-failed-subscription,
      /corporate-seat-invites should all have "(Pro)" in sidebar text.

C9 BUILD
  - npm run docs:build exits 0 with no dead-link warnings.
```

---

## Phase 4: Report (& optional fix)

Print a scored checklist:

| Check | Result | Offending paths |
| ----- | ------ | --------------- |
| C1 Placement | ✅ / ❌ | ... |
| C2 Link form | ✅ / ❌ | ... |
| C3 External links | ✅ / ❌ | ... |
| C4 Boilerplate | ✅ / ❌ | ... |
| C5 Sidebar coverage | ✅ / ❌ | ... |
| C6 Image integrity | ✅ / ❌ | ... |
| C7 Bold rule | ✅ / ❌ | ... |
| C8 Pro markers | ✅ / ❌ | ... |
| C9 Build | ✅ / ❌ | ... |

Summarize total pass/fail. If `FIX_MODE` allows and the user confirms, fix each issue
via the right skill and re-run the failed checks.

---

## Quick Reference

### One-shot survey
```
guide docs:     find guide -name '*.md' | wc -l
reference docs: find reference -name '*.md' | wc -l
sidebar links:  grep -c '"link"' .vitepress/config.mjs
orphan check:   find guide reference -name '*.md' | sort > /tmp/files.txt \
                && grep '"link"' .vitepress/config.mjs | sort > /tmp/links.txt
dup slugs:      find guide reference -name '*.md' -exec basename {} \; | sort | uniq -d
build:          npm run docs:build
```

### Path patterns
```
Guide page:      guide/<category>/<slug>.md
Guide nested:    guide/<category>/<subcategory>/<slug>.md
Reference page:  reference/<slug>.md
Image folder:    public/images/<category>/<slug>/
Sidebar config:  .vitepress/config.mjs  (sidebar object, /guide/ and /reference/ zones)
Knowledge base:  member/chunks/         (AI context; load relevant chunk before writing)
```

### Key Principles
1. **Read-only first** — report before you touch anything.
2. **Paths, not just counts** — every failure names its files.
3. **Sidebar is in config.mjs** — grep for `"link"` values there, not a separate JSON file.
4. **Both directions** — every file needs a sidebar link AND every sidebar link needs a file.
5. **Build is the final gate** — the only real broken-link checker.
6. **Fixes go through the proper skill**, never ad-hoc.
