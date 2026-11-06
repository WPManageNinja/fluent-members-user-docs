---
name: fluent-members-doc-screenshots
description: Take, annotate, and place pixel-consistent screenshots of the Fluent Members admin for the docs pages. Use whenever the user asks to "take screenshots", "add images", "capture the UI", "update the screenshot", or when a doc page being written needs an image of a Fluent Members screen. Covers the headless-Chrome runner (scripts/screenshots/shoot.cjs), JSON shot plans, crop/arrow/naming rules, placing images in markdown, and verification. Do NOT use the Claude-in-Chrome extension or macOS screencapture for this.
---

# Fluent Members Doc Screenshots

Every screenshot is taken by a script, never by hand, so output is reproducible and every image shares the same framing, scale and arrow style. Ported from the FluentCart docs pipeline (`fluent-cart-docs/.claude/skills/fluentcart-doc-screenshots`). Read this whole file, then follow §2.

## 1. Facts you must not rediscover

| Thing | Value |
|---|---|
| Dev site | `http://localhost:10053` (Local by Flywheel site `fcrmv3`, this Mac). Login `admin` / `admin`. Fluent Members + Pro are installed there. |
| Plugin code | `~/Local Sites/fcrmv3/app/public/wp-content/plugins/fluent-members` (built, no Vue sources, not a git repo). Source of truth for features: the knowledge base `member/chunks/` and the `dev` branch of WPManageNinja/fluent-members(-pro). |
| Admin URL | `http://localhost:10053/wp-admin/admin.php?page=fluent-members#<route>`. Routes (from the built app): `/` dashboard, `/levels`, `/levels/:id`, `/access-groups`, `/access-groups/create`, `/access-groups/:id/edit`, `/members`, `/members/:id`, `/subscriptions`, `/subscriptions/:uuid`, `/one-time`, `/one-time/:id`, `/settings`, `/settings/email-notifications`. |
| App root | `#fluent-members-app_app`. Top nav: Dashboard, Membership Levels, Access Groups, Members, Billing, Settings gear. |
| Runner | `npm run shots -- scripts/screenshots/plans/<plan>.json` (= `node scripts/screenshots/shoot.cjs …`). Library in `scripts/screenshots/lib/` (`harness.cjs`, `annotate.cjs`). |
| Browser | Headless **real Google Chrome** via `playwright-core` (already in node_modules). No download, no permissions. |
| Output | `public/images/<category>/<slug>/<name>.webp`, referenced as `/images/<category>/<slug>/<name>.webp`. Raw PNGs go to `scripts/screenshots/raw/` (gitignored). |
| Scale | Viewport 1600 CSS px wide, device scale factor 2 → ~2880 px wide. Never resize output. |
| Arrow colour | `#6B35E8` with a white halo (`lib/annotate.cjs`). webp quality 82. |

### What does NOT work (do not retry)
- **Claude-in-Chrome extension / any `mcp__claude-in-chrome__*`, `mcp__Claude_Browser__*`, computer-use tools**: forbidden by the user's global rules (other PC). Use only this runner.
- **AppleScript + `screencapture`**: captures overlapping windows, needs permissions. Skip.
- If a browser task cannot be done by the runner, extend the runner (`lib/harness.cjs`) or SKIP it and tell the user exactly what to capture.

## 2. Workflow

### Step 1 — Decide the shot list from the doc
For the page, list each shot: `name | what it shows | clip | arrow target | where in the .md`.
- One image per procedural step involving a click, right after the sentence that says to click. Pure-reading sections get one image per section.
- Arrows only where the sentence says "click"/"select"/"open"; a field-reference image gets no arrow. One arrow per image, never labelled.
- Reuse an existing image name to replace a stale screenshot (check `public/images/<category>/<slug>/`).
- Naming: `kebab-case`, `<screen>-<what>.webp`, no numbers or dates.
- Verify behaviour against `member/chunks/` first; never invent UI. If a label from the doc isn't on the site, stop and tell the user which step is missing.

### Step 2 — Write the plan JSON
Create `scripts/screenshots/plans/<category>--<slug>.json`:

```json
{
  "outDir": "public/images/levels/creating",
  "viewport": { "width": 1600, "height": 1100 },
  "steps": [
    { "admin": "/levels" },
    { "shot": { "name": "levels-list", "clip": "app",
                "arrows": [ { "target": { "role": "button", "name": "Create Membership Level" }, "from": "bottom", "len": 140 } ] } }
  ]
}
```

Step vocabulary is documented at the top of `scripts/screenshots/shoot.cjs`: `admin`, `front`, `viewport`, `click`, `fill`, `fillByLabel`, `hideCss`, `css`, `eval`, `press`, `wait`, `scrollTop`, `shot`, `stack`. (`setColor` and the `{row:…}` selector / `rows` clip are FluentCart-specific — they rely on `.setting-label`; use CSS/text/role selectors instead unless Members' settings use the same markup.)

Selectors: CSS string; `{"text":"Save"}`; `{"role":"button","name":"^save$"}`; `{"selector":"css","hasText":"…"}`.

Clips: `"app"` (whole app incl. top nav, WP chrome excluded); `{"element": <sel>, "pad": 24}` for a dialog/card/table (Element Plus dialogs are appended to `<body>`: click, `{"wait":800}`, then clip the `.el-dialog`); `"crop": {"height": N}` (image px) trims dead space under short pages — **the Levels list at 1000px viewport leaves ~half the image empty, so crop**; raise `viewport.height` for tall forms.

Arrows: `from` = side the arrow comes from, pick the side with empty space (top-nav item → `bottom`; header button → `bottom`/`left`; table row control → `right`). `len` 130–160.

Data: empty forms look fake — type realistic sample values with `fillByLabel`/`fill` **without saving**. Use obviously fake data (`Acme Studio`, `jane@example.com`); never real customer data. If a setting must be saved to show an effect, save, shoot, then restore it.

### Step 3 — Run
```
npm run shots -- scripts/screenshots/plans/<plan>.json
npm run shots -- scripts/screenshots/plans/<plan>.json --only=name1,name2
```
If login loops, re-run (site is slow). If a selector isn't found, inspect the live DOM/built assets; don't guess.

### Step 4 — Verify every image (mandatory)
Open each `.webp` with Read and check: no WP admin bar/menu/browser chrome; control fully in frame with breathing room; arrow tip just outside the control, not covering text; correct state (tab, toggles, filled values, dialog open); no big empty area at the bottom (fix with `crop.height`). Fix the plan and re-run with `--only=`. Never hand-edit images.

### Step 5 — Place in markdown
`![Screenshot of <what the reader sees>](/images/<category>/<slug>/<name>.webp)` on its own line directly after the sentence it illustrates (blank lines around; indent 4 spaces inside numbered lists). Never stack two images without text between. Then `npm run docs:build` must pass clean; for a new page also `npm run featured:generate`. Don't commit unless asked.

### Step 6 — Leave the site as found
Undo any saved setting; delete test levels/members you created for a shot. Keep the plan JSON in `scripts/screenshots/plans/` as the regression fixture.

## 2b. Filling `TODO(screenshot)` placeholders

The docs overhaul strips stale images and leaves placeholders (format in `fluent-members-docs-overhaul` §5):

```bash
grep -rn 'TODO(screenshot)' docs reference            # the queue
grep -rhoE 'TODO\(screenshot\): [a-z0-9-]+' docs reference | sort | uniq -d   # duplicate ids: must print nothing
```

For each placeholder: `screen` + `state` + `data` + `highlight` + `view` + `alt` are the shot spec. Put them in the plan (`name` = a short kebab name, `outDir` = `public/images/<category>/<slug>`), run, verify the image (Step 4), then **replace the whole comment** with `![<alt>](/images/<category>/<slug>/<name>.webp)` in the same position. A placeholder that cannot be shot locally stays, with a line added to `.claude/docs-overhaul/QUESTIONS.md`. Finish with `npm run docs:build`. Create fake sample data first when the screen would otherwise be empty, and delete it afterwards.

## 3. Recipes
- **List screen** (`/levels`, `/members`): `admin` → `shot` clip `app` + `crop.height`.
- **Create/edit form** (`/levels/:id`, `/access-groups/create`): taller viewport (1400+), fill sample values, one `app` shot, then `element`/`crop` close-ups per section.
- **Dialog/drawer**: click trigger → `wait 800` → clip `{"element": ".el-dialog"}` (or `.el-drawer`).
- **Row action menu (⋮)**: click the row's ⋮ button, wait, shoot `app` or the popper element.
- **Front-end portal / pricing page**: `{"front": "/<path>/"}` (logged in, admin bar hidden); member portal root is `#fmem_member-portal-app`.
- **Before/after**: two `shot`s with `"export": false`, then `stack`.

## 4. Hard rules
- Never take screenshots by hand or through any browser extension / computer-use tool.
- Never crop out part of a control to fit an arrow; move the arrow.
- Never publish an image showing another product's UI or WP chrome.
- Never invent UI that isn't on the site.
