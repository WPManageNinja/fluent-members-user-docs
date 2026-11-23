# Overhaul changes log

## 2026-11-23: Delta sync to develop (Journey v2)

- Plugin: free 4998e8d0, Pro 7f76c4b (local site matches). Baseline was free 9afdb75b, Pro 59d8187. See `DELTA-2026-11-23.md`, `JOURNEY-v2-PROPOSAL.md`.
- Folder `docs/access-groups` -> `docs/content-access`; `levels/attaching-access-groups` -> `levels/content-access` (REDIRECTS.md).
- Rewrote content access, levels, getting started, settings, integrations, selling, billing, members, portal and reference pages against develop. New pages: bundles, public-content, restricted-content, free-levels, automations, test-and-live-mode, lms-courses, gateway-follow-ups.
- Doc trees and home page updated; sidebar rewired; all image lines removed, 142 TODO(screenshot) placeholders left.
- To do: screenshot plans and shots; live-site check of claims the agents could not verify; decide whether to fold settings/unauthorized-access, partial-content-lock and login-popup into Restricted content.

Newest first: date, plugin shas, pages touched, skipped items.

## 2026-11-06: Phases A and B

- Audited against free 9afdb75b and Pro 59d8187 (the local site's code). `develop` was at free 7b0d0793 and Pro 8f4583e, so its changes still need a delta audit once the site is updated.
- Feature map: 350 features (36 covered, 170 partial, 144 missing). About 310 wrong facts logged in `audit/`, some repeated across pages.
- Structure applied from `JOURNEY.md`: 13 sidebar groups, 6 URL changes, 2 merges, 26 placeholder pages.
- Design ported from the Ninja Tables docs and recoloured purple. No doc trees written yet.
- Merged pages (`configuring`, `statuses`) were appended unedited to their target pages and still contain wrong facts until rewritten.
- Skipped until pages are final: frontmatter on existing pages, featured cards for moved, merged and new pages.
