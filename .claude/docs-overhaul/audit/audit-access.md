# Audit: Access Groups, content protection, blocks, access settings

Source: free `9afdb75b`, Pro `59d8187`. Paths are relative to `src-free/` unless prefixed `pro:`. `Vue:` = `resources/admin/Modules/`. `Blk:` = `resources/blocks/`.
Live scripts and captures: `audit-access-live.cjs`, `audit-access-rest.cjs`, `crawl-access/`, all view-only; nothing saved.
Live limit: no block-restricted or per-post-restricted content exists on the site (admin REST scan returned none) and Partial Content Lock is off, so front-end behaviour of those paths is source-only. Creating test data was out of scope.
Doc shorthand: AG=access-groups/index, PC=access-groups/protected-content, UA=access-groups/unauthorized-access, INS/CFG/NEST=access-groups/gutenberg-block/*, GEN=settings/general, PCL=settings/partial-content-lock, DRIP=levels/content-drip (outside this audit's page list; read for coverage only).

## 1. FEATURE ROWS

| # | Feature/option group | UI location, exact label | Free/Pro | Source file:line | Live-checked | Doc § |
|---|---|---|---|---|---|---|
| 1 | List columns: ID, Title, Protected Content, Excluded, Drip, Used By, Status | Access Groups list | Free | Vue:AccessGroups/AccessGroups.vue:46-100 | yes | partial: AG "List View" (wrong columns) |
| 2 | Status tabs All/Active/Inactive, search toggle | Access Groups list | Free | AccessGroups.vue:25-35,198-201 | yes | covered: AG "List View" |
| 3 | Row menu: Edit, Duplicate, Delete | Access Groups list, row three-dot | Free | AccessGroups.vue:110-136 | no (source only; opening row menu not scripted) | MISSING |
| 4 | Duplicate: title gets ` - Duplicated(<id>)`, keeps rules and levels | Row menu, **Duplicate** | Free | app/Http/Controllers/AccessGroupController.php:296-332 | no (would create data) | MISSING |
| 5 | Delete refused while a level uses the group; error names the levels | Row menu or **More Actions → Delete** | Free | AccessGroupController.php:234-262 | partial (menu seen, not run) | MISSING |
| 6 | Create dialog: Title (required), Description, Status (default Active); on Create opens edit page | **Create Access Group** button | Free | AccessGroups/_AddAccessGroupDialog.vue:8-41,127; AccessGroupController.php:82-85 | yes (opened, not saved) | partial: AG "Create New" (wrong label, no dialog) |
| 7 | Basic Information: Title, Description, Status | Edit page card | Free | AccessGroups/AccessGroupDetails.vue:54-84 | yes | covered: AG "Configuring" |
| 8 | Inactive group enforces nothing | Status radio | Free | app/Services/AccessHelper.php:223 | no (source) | MISSING |
| 9 | **More Actions** holds Delete only | Edit page header | Free | AccessGroupDetails.vue:17-41 | yes | MISSING |
| 10 | Save bar (Cancel, Save) on unsaved change | Fixed top bar | Free | AccessGroupDetails.vue:2-11 | no (source; bar not captured) | partial: AG notes (no Cancel) |
| 11 | Levels granting access: **Members of** chips, **Add Level**, **Can Access** | Content Protection Rules card | Free | AccessGroups/Components/ActiveLevels.vue:4,48,55; AccessGroupDetails.vue:94-99 | yes | partial: AG "Active Levels" (old label) |
| 12 | Two-way level linking | Group side and Level side | Free | AccessGroupController.php:125 | yes (chips on group 1) | covered: AG notes |
| 13 | Rule cards: one type per rule, **1st Rule**, **Add Another Rule**, trash; divider **Also / Access is granted if any rule matches** | Content Protection Rules | Free | Components/RestrictionRules.vue:13,21-42,46,180 | partial (cards and Add Another Rule seen; Also divider needs 2 rules, source) | partial: PC "Apply Restriction To" (describes old multi-select) |
| 14 | Core types: Entire Website, All Posts, All Pages, All Categories Archive, All Tags Archive, Specific Post/Page/CPT/Taxonomy etc. | Rule type select, group **Core** | Free | RestrictionRules.vue:678-682 | yes (dropdown dumped) | covered: PC table (behaviour wrong, see verdict) |
| 15 | All Categories/All Tags Archive actually restrict every post; term archive page itself is not blocked | Rule type | Free | AccessHelper.php:1011; app/Hooks/Handlers/AccessHandler.php:447 | no (no such group live) | partial: PC table (states the opposite) |
| 16 | Entire Website: blocks singular plus archive/home/feed; redirect or message page; no automatic bypass for portal, pricing or checkout | Rule type | Free | AccessHelper.php:691; AccessHandler.php:441-474 | no (would need a site-wide group) | partial: PC table |
| 17 | FluentCart types: All Products, All Digital Products, All Physical Products, Specific Products/Categories/Brands etc., All Product Categories, All Product Brands | Rule type, group **FluentCart Products** | Free, needs FluentCart | app/Modules/Integrations/FluentCart/Connector.php:37-68; AccessHelper.php:703 | yes | partial: PC table (3 of 6) |
| 18 | WooCommerce types: WC All Products, WC All Product Categories/Tags/Brands/Shipping Classes Archive, Specific Products/Categories/Brands etc. | Rule type, group **WooCommerce Products** | Pro, needs WooCommerce | pro:app/Modules/Integrations/Woocommerce/Connector.php:29-63 | yes | partial: PC table and notes (no WC types listed, no (Pro) mark) |
| 19 | Picker: **Protected Content** field, **Add Content**, "Type to search"; only on Specific types | Rule card | Free | RestrictionRules.vue:56-57,83,107,226 | yes (group 1) | partial: PC "Include Content" (old label) |
| 20 | Picker scope is posts, pages, public-taxonomy terms; no custom post type items despite label | Rule card | Free | app/Services/ContentService.php:149-150,181-187,246-254 | no (source) | partial: PC table (claims CPT) |
| 21 | Per-rule exclusion: **Excluded**, **Add Exclude**, on every rule; term exclusion removes posts in that term; applies to that rule only | Rule card | Free | RestrictionRules.vue:113-114,164; AccessHelper.php:687,718-739 | yes (UI) | partial: PC "Exclude Content" (old label, wrong scope) |
| 22 | Access logic: any matching group whose level the member holds grants access; status active or trial and not expired | Runtime | Free | AccessHelper.php:22-47,240-248,960-991; app/Models/MembershipUser.php:17 | yes (guest blocked) | partial: AG notes (no OR logic, no expiry) |
| 23 | Administrators bypass all front-end protection | Runtime | Free | AccessHandler.php:32; AccessHelper.php:363-366 | no (source) | covered: PC notes |
| 24 | **When Unauthorized** card states: **Using global defaults**, read-only summary | Edit page | Free | Components/UnauthorizedAccess.vue:4,35-77 | yes | MISSING |
| 25 | **Customize for this rule**, **Done**, **Edit**, **Revert to defaults** | When Unauthorized header | Free | UnauthorizedAccess.vue:17-28,332-364 | yes (Customize opened, not saved) | MISSING |
| 26 | Actions: only **Redirect to a specific URL** and **Display a custom message** | When Unauthorized form, Settings tab | Free | UnauthorizedAccess.vue:200-203; Vue:Settings/UnauthorizedAccessSettings.vue:34-35; SettingsController.php:474 | yes | partial: UA table, AG (adds nonexistent actions) |
| 27 | Redirect URL required, on-site only unless `allowed_redirect_hosts`; self and looped redirects skipped | Redirect URL | Free | app/Services/RestrictionRenderer.php:18-39,74-92; AccessGroupController.php:983-986 | no (would save) | partial: UA "Redirect" (says any full URL) |
| 28 | Custom Message (HTML via kses), Button Text, Button URL with `/` page search; button needs both | Message form | Free | UnauthorizedAccess.vue:108-150,376-380; RestrictionRenderer.php:143-161 | yes | covered: UA "Custom Message" (no `/` search) |
| 29 | Logged-out visitors clicking a checkout button get login popup | Front end | Free | RestrictionRenderer.php:381-390 | no (needs checkout button config) | MISSING |
| 30 | Comments hidden, form closed, count 0, comment REST/feeds blocked | Runtime | Free | AccessHandler.php:51-54,58-99,349-372 | no (source) | covered: PC "Hide Comments" |
| 31 | REST: restricted item returns `fluent_members_rest_forbidden` 401/403; blocks in `content.rendered` run through render_block filter | Runtime | Free | AccessHandler.php:337-347,374-408 | yes (guest posts list: 9 of 18 forbidden) | partial: NEST warning (block claim contradicts source) |
| 32 | Feeds: content and excerpt replaced by restriction text; enclosures removed | Runtime | Free | AccessHandler.php:44-46,300-320,515-516 | yes (`/feed/` showed message) | MISSING |
| 33 | Query Loop and Latest Posts gated server side | Runtime | Free | AccessHandler.php:37-40,186-250,506 | no (source) | partial: INS, NEST (say REST bypass) |
| 34 | **Content Drip** toggle on the Access Group; switching on adds a row; **Add New** | Edit page card | Free | AccessGroupDetails.vue:137,155-158,557-560 | yes (toggle seen) | partial: DRIP (old button label); AG says configure on Level |
| 35 | Drip fields: **Show This Content** (blank = all restricted), **Timeline**, **Days/Hours/Minutes** (hours max 23, minutes max 59) | Drip row | Free | Components/ContentDripping.vue:7,53,61-112; resources/admin/utils/dripDuration.js:1 | no (row not opened) | covered: DRIP Step 1 |
| 36 | Timeline **Within duration**: content available until the duration, then "Content No Longer Available" | Drip row | Free | ContentDripping.vue:67-70; app/Services/ContentDripHelper.php:217-221; RestrictionRenderer.php:200-204 | no (source) | MISSING |
| 37 | Before unlock: "Content Not Yet Available" + countdown, no redirect; timer runs from earliest membership start | Front end | Free | RestrictionRenderer.php:185-199; AccessHandler.php:429-431; AccessHelper.php:259-270 | no (no drip live) | covered: UA note, DRIP |
| 38 | Drip column text, e.g. **Off · N rules unused** | List | Free | AccessGroups.vue:76-84,286-300 | no (no drip live) | MISSING |
| 39 | Per-post panel: **Access Groups** on Post/Page sidebar; checkboxes; selection overrides group rules | Block editor, Post tab | Free | Blk:access-groups/global-access-groups.js:376-393,414-419; AccessHelper.php:33-35 | yes (panel in editor_newpost.png) | MISSING |
| 40 | Classic editor **Access Groups** meta box | Non-block post types | Free | app/Modules/Gutenberg/AccessGroupBlock.php:27,95-110 | no (no classic type checked) | MISSING |
| 41 | Per-post partial overrides: **Enable Partial Content Lock**, **Preview Word Count**, **Overlay Message**, **Button Text**, **Button URL**; shown only with a group ticked and global on | Post panel | Free | global-access-groups.js:27-82,396-410; app/Services/PartialContentService.php:18-28 | no (global off) | MISSING |
| 42 | Single-block panel: **Access Groups** on every block except container, same partial controls | Block tab | Free | global-access-groups.js:120-139,147,237,260 | no (source; opening editor creates an auto-draft) | covered: INS Method 1 |
| 43 | Container block **Access Groups**: lock icon, subtitle **Restrict inner content**, checkboxes only; no partial or action controls | Block inserter | Free | Blk:access-groups/block.js:23-30; Edit.jsx:36-57 | no (source) | partial: CFG (invents controls) |
| 44 | No group ticked = visible to everyone; all ticked groups inactive = visible | Block | Free | AccessHelper.php:53-62 | no (source) | partial: INS correct, CFG contradicts |
| 45 | Block fallback: fixed "Access Restricted / This content requires special access privileges", or partial blur, or drip notice; ignores group's When Unauthorized | Front end | Free | AccessHandler.php:548-583; RestrictionRenderer.php:326-336 | no (no block live) | partial: CFG (wrong) |
| 46 | Permission read-only notes in editor | Editor | Free | Blk:access-groups/restriction-permission.js:115-119; app/Services/RestrictionGuard.php:91-108 | no (admin only) | MISSING |
| 47 | **Membership Levels** block: levels picker, **Plans per row**, **Logged-in button**, **Logged-out button**, **Show level title**, **Show level description** | Block inserter | Free | Blk:membership-levels/block.js:5-53; Edit.jsx:75-161; app/Modules/Gutenberg/MembershipLevelsBlock.php:24 | no (source) | MISSING |
| 48 | `[fluent_membership_levels]` attributes | Shortcode | Free | app/Hooks/Handlers/ShortcodeHandler.php:18,56-64 | no (source) | MISSING |
| 49 | `[fluent_members]` inline restriction shortcode with `level`/`levels` | Shortcode | Free | ShortcodeHandler.php:19; app/Services/RestrictionShortcodeService.php:33-67 | no (source) | MISSING |
| 50 | FluentCart product widget **Membership Restriction** attaches product to groups | FluentCart product page | Free, needs FluentCart | app/Modules/Integrations/FluentCart/ProductRestrictionWidget.php:21,114-126 | no (source) | MISSING |
| 51 | **Exclude Content from Restriction**: posts, pages, categories, tags, products; runs before all checks except block-level | Settings → General Settings | Free | Settings/GeneralSettings.vue:14-44,600-615; AccessHelper.php:29,100-141 | yes | partial: GEN item 1 (pages/posts only) |
| 52 | **Generate Portal Page**: select, **+** opens **Create Portal Page** dialog (**Page Name**, **Create Page**), **Edit**, **View**, shortcode hint | General Settings | Free | GeneralSettings.vue:52-107,366-368; app/Http/Controllers/SettingsController.php:186-222 | yes (dialog opened, not saved) | partial: GEN item 2 (says + creates instantly) |
| 53 | **Generate Pricing Page**: same pattern, `[fluent_membership_levels]` | General Settings | Free | GeneralSettings.vue:115-167; SettingsController.php:285-322 | yes | MISSING |
| 54 | **Select Currency**: default for new prices only; default USD | General Settings | Free | GeneralSettings.vue:176-191,526 | yes | partial: GEN item 3 (invents per-plan override) |
| 55 | Default action, Redirect URL, Custom Message, Button Text, Button URL; defaults: message, "This content is for members only. Please join to get access." | Settings → **Unauthorized Access** | Free | UnauthorizedAccessSettings.vue:15-106; app/Functions/Utility.php:745-754; SettingsController.php:471-505 | yes | MISSING |
| 56 | **Excerpts of Restricted Posts**: Show the restriction message (default), Show the hand-written excerpt, Hide the excerpt | Unauthorized Access tab | Free | UnauthorizedAccessSettings.vue:124-131; AccessHandler.php:285-297; Utility.php:705-710 | yes (default seen) | MISSING |
| 57 | **Show restricted posts on listing pages** (default on); off hides from blog, archives, search, feeds, widgets, REST lists, adjacent links, sitemaps; drip and partial posts stay listed; admins and editors unaffected | Unauthorized Access tab | Free | UnauthorizedAccessSettings.vue:139-146; Hooks/Handlers/ListingVisibilityHandler.php:16-20,68-77; Services/ListingVisibilityService.php:80-107,202-208; Utility.php:726-731 | yes (default seen; off not run) | MISSING |
| 58 | **Partial Content Blur Settings** master toggle, default off; fields hidden until on | Settings → Partial Content Lock | Free | Settings/PartialContent.vue:15-28,229 | yes | covered: PCL |
| 59 | Preview Length (min 10, max 500, step 10, default 50), Overlay Color, Overlay Opacity (step 5, default 80), Overlay Message, Message Color, Button Text, Button URL, Button Color, Button Text Color, Button Size (default Medium) | Partial Content Lock | Free | PartialContent.vue:32-207,229-239 | no (toggle not flipped; source) | covered: PCL (no max or defaults for length, opacity, size) |
| 60 | When partial applies: global on, not opted out, not redirected, not dripped; only if content exceeds preview, else restriction message; media-only gets placeholder; button falls back to group's button | Runtime | Free | AccessHandler.php:523-539,567-580; PartialContentService.php:18-28,166-193,251-254 | no (global off) | partial: PCL, UA (wrong trigger) |
| 61 | **Content Restrictions**: **Default for other users who can edit posts**: Can add new restrictions (default), Cannot change restrictions | Settings → **Permissions** | Free | Settings/Permissions/Permissions.vue:14-29; app/Services/PermissionManager.php:457-461 | yes | MISSING |
| 62 | **Managers** table, tabs All/Manager/Author, **Add Manager**, Edit, Remove (falls back to default) | Permissions | Free | Permissions.vue:38-53,72-111,292 | partial (tabs and Add Manager seen; no managers exist, Edit and Remove from source) | MISSING |
| 63 | Add Role dialog: **Select User**, **Select Role**, **Attach Role**; administrators refused | Add Manager | Free | Permissions/ManagerDialog.vue:4,13,52,82; PermissionManager.php:255-256 | yes (opened, not saved) | MISSING |
| 64 | Roles: **Restriction Manager** (add, change, remove), **Restriction Author** (add only); scope is editor restrictions on content they can edit | Add Role | Free | PermissionManager.php:40-50,110-122,473-484; RestrictionGuard.php:91-108 | yes (role list) | MISSING |

## 2. PAGE VERDICTS

### docs/access-groups/index.md: rewrite-heavy
Wrong facts:
1. L9 columns "ID, Title, Description, Status" → ID, Title, Protected Content, Excluded, Drip, Used By, Status (AccessGroups.vue:46-100; live).
2. L11 "+ Add New Access Group ... start a new rule set" → **Create Access Group**, opens a dialog first (AccessGroups.vue:16; _AddAccessGroupDialog.vue:8).
3. L17-22 four sections → Basic Information, Content Protection Rules, When Unauthorized, Content Drip (AccessGroupDetails.vue:54,91; UnauthorizedAccess.vue:4; AccessGroupDetails.vue:137).
4. L20,31 "Apply Restriction To dropdown" → no such field; rule cards with one type each (RestrictionRules.vue:21-42).
5. L21 actions include partial preview, login popup, hide → only redirect and message (UnauthorizedAccess.vue:200-203).
6. L22,33 "Active Levels" section → **Members of** row inside rules card (ActiveLevels.vue:4).
7. L40 Content Drip is "inside the Membership Level settings, not the Access Group" → exact reverse; also contradicts DRIP page (AccessGroupDetails.vue:137).

Stale labels: Protected Content section, Unauthorized Access section, Active Levels, "single Save button in the top-right" (it is a full top Save bar with Cancel). Both screenshots old.
Missing: row menu, Duplicate, Delete block, More Actions, status effect, OR logic, membership expiry in access requirement.
Conventions: `:::warning` instead of `> [!Note]`; H1 "Access Groups Overview" vs sidebar "Overview".

### docs/access-groups/protected-content.md: rewrite-heavy
Wrong facts:
8. L7 multi-select, removable tags → single type per rule; **Add Another Rule** (RestrictionRules.vue:21-42,180).
9. L15 All Categories Archive protects category archive pages → every post is protected, archive not blocked on its own (AccessHelper.php:1011; AccessHandler.php:447).
10. L16 All Tags Archive, same (same lines).
11. L17 Specific type picks custom post types → search returns post/page and terms only (ContentService.php:149-150,181-187).
12. L19 All Products covers all integrations → separate FluentCart **All Products** and **WC All Products** (Connector.php:39-41; pro:Connector.php:33-35).
13. L20 Entire Website: "only members with an active Level" → only levels attached to this group (AccessHelper.php:960-991).
14. L23 tip: combining Specific and All Products in one field → impossible as described and redundant.
15. L38 tip: future CPT posts covered by All Posts → `all_posts` matches post type `post` only (AccessHelper.php:1011).
16. L46 Excluded item "will remain publicly visible" → removed from this rule only; another rule or group still protects it. Only General Settings exclusion is site-wide (AccessHelper.php:687,29).

Stale labels: section title **Protected Content** → **Content Protection Rules**; **Apply Restriction To**; **Include Content** → **Protected Content / Add Content**; **Exclude Content** → **Excluded / Add Exclude**; "Etc." → "etc."; "left column".
Missing: Digital/Physical/All Product Categories/All Product Brands types, all WC types with (Pro), **Also** rule logic, per-post panel, listings, excerpts, feeds, REST. Hide Comments section is accurate; keep.

### docs/access-groups/unauthorized-access.md: rewrite-heavy
Wrong facts:
17. L17,38-40 **Display partial preview** action → not an option (UnauthorizedAccess.vue:200-203).
18. L7 opens dropdown directly → card first shows **Using global defaults**; dropdown appears after **Customize for this rule** (UnauthorizedAccess.vue:23,35-38; live).
19. L21 full URL works → must be on this site or allowed through `allowed_redirect_hosts`, else save fails (RestrictionRenderer.php:91; AccessGroupController.php:986).
20. L17,40 "per-Group overrides available" for partial → none on groups; only per post and per block (global-access-groups.js:27-82).

Stale labels: **Unauthorized Access** card → **When Unauthorized**; "right column" (single stack); messages have no trailing period; sidebar text "Setting Up Unauthorized Access Rules" does not match H1.
Missing: global default inheritance, Revert to defaults, Edit/Done, `/` URL search, listing and excerpt settings, redirect loop protection, Within duration notice. Keep button rule at L34 and drip note at L49.

### docs/access-groups/gutenberg-block/inserting.md: rewrite-light
Wrong facts:
21. L41 "Every post in a CPT" → use Access Group rule → no rule type targets a CPT except Entire Website (AccessHelper.php:1010-1033; RestrictionRules.vue:678-682).
22. L31 Query Loop and patterns re-fetch from REST and bypass → Query Loop renders server side; post content in loop is gated (AccessHandler.php:506,514).

Unproven: L22 search "fluent member": block has no keywords (block.js:23-30), so **Access Groups** is the safe term. Verify by hand in the editor.
Missing: per-post panel for "whole post" row (L42 only shows rule), partial controls on single blocks.
Conventions: emoji table cells; comma splice at L23.

### docs/access-groups/gutenberg-block/configuring.md: rewrite-heavy (or merge into inserting)
Wrong facts:
23. L27 no Groups hides from everyone → visible to everyone (AccessHelper.php:55-57). Contradicts L79 and INS L54.
24. L36-43 per-block **Action for Unauthorized Users** control → does not exist (Edit.jsx:36-57; global-access-groups.js:207-248).
25. L42-43 **Show a login prompt**, **Hide entirely** → do not exist (same).
26. L51,80 partial overrides on the container, tied to a chosen action → container has none; single blocks only, gated by the global toggle (global-access-groups.js:122,147,237).
27. L57-63 block fallback overrides group's action → block never reads a group's action; fixed text or global partial blur (AccessHandler.php:567-583; RestrictionRenderer.php:326-336).
28. L70-72 example with custom message and CTA → impossible in the block (same).

Stale labels: "multi-select labelled Access Groups" → checkboxes under **Restrict inner content**.
Conventions: relative links at L3,31,36 (`./inserting`, `../protected-content`, `../unauthorized-access`); "Here's what you'll learn"; "Before you start".

### docs/access-groups/gutenberg-block/nesting-and-limits.md: rewrite-light
Wrong facts:
29. L22,73 Query Loop renders from REST → server side (AccessHandler.php:506,514).
30. L23 Latest Posts REST caveat → explicitly gated (AccessHandler.php:37-40,186-250).
31. L31-33 REST JSON exposes protected blocks → `content.rendered` passes the `render_block` filter which is registered for all non-admin requests (AccessHandler.php:32,42,550). Source-derived; no block-restricted post exists to test live.
32. L16,67 "configured fallback", "its own Groups and fallback" → fixed text, no per-block config (RestrictionRenderer.php:326-336).

Correct: nesting table L42-44 (each `render_block` pass gates independently; AccessHandler.php:548-583).
Unproven, cut unless tested: L26 page builders, L28 conflicts, L75 theme CSS, L76 pattern browser.

### docs/settings/general.md: rewrite-light
Wrong facts:
33. L15 **+** "automatically" creates a page, each click creates one → opens **Create Portal Page** dialog requiring **Page Name** (GeneralSettings.vue:366-368; live).
34. L17 currency override on individual plans if gateway supports it → no plan-level currency selector in Levels/Paywalls/*.vue; plan takes stored or default currency (nativePaymentMixin.js:17,359); UI says "Default currency for new prices" (GeneralSettings.vue:177).

Stale labels: "Fluent Member" → **Fluent Members**.
Missing: **Generate Pricing Page**, **Edit** / **View** links, categories, tags and products in exclusions, block-level restriction not bypassed by exclusion (AccessHelper.php:49-97 does not call the exclusion check), existing prices keep currency.

### docs/settings/partial-content-lock.md: rewrite-light
Wrong facts:
35. L3,37 only effective when action is **Display partial preview** → that action does not exist; applies to all restricted content when toggled on unless redirected, dripped, or opted out (AccessHandler.php:429-431,523-539).
36. L3 overrides on "individual blocks or posts" via Block Inspector L34 applies to every block → not the container (global-access-groups.js:122,147).

Stale labels: "FluentMember" → **Fluent Members**.
Missing: Max 500, default 50, step 10; opacity default 80; size default Medium; content shorter than preview falls back to restriction message; media-only placeholder; **Enable Partial Content Lock** opt-out per post/block; button falls back to group button; restricted posts stay on listings when partial is on.
Conventions: `::: tip`; run-on at L3 and L34; L28 leading space.

### docs/levels/content-drip.md (outside list, for levels auditor)
Stale: **+ Add Content Drip** → **Add New**; empty-state text gone (toggle adds a row, AccessGroupDetails.vue:557-560); **Delete** → trash icon, and absent on a lone rule (ContentDripping.vue:9). Wrong: notice "depends on Unauthorized Access settings" → fixed text (RestrictionRenderer.php:185-204). Missing: **Within duration**.

## 3. NEW PAGES NEEDED

| Proposed page | Features (rows) |
|---|---|
| `docs/access-groups/per-post-restrictions` | 39, 40, 41, 46: Post panel, classic meta box, partial overrides, read-only notes |
| `docs/access-groups/how-protection-works` | 22, 23, 30-33, 37, 57: logic, comments, feeds, REST, listings, what visitors see. Can absorb PC "Hide Comments" |
| `docs/settings/unauthorized-access` | 55, 56, 57 |
| `docs/settings/permissions` | 61-64 |
| `docs/access-groups/gutenberg-block/membership-levels-block` | 47 |
| `reference/shortcodes` | 48, 49 (CLAUDE.md lists shortcodes as reference content; no such page exists) |
| Section in PC or `docs/integrations`, confirm with products auditor | 50 |

Merge: fold CFG into INS once invented controls are removed; NEST reduces to nesting table and tested limits.

## 4. QUESTIONS

1. **Default Unauthorized Access scope.** Tab copy says defaults are "copied into each newly created Access Group. Existing Access Groups are not affected." Runtime does the opposite: non-customized groups store nothing and read the global setting live, so changing it affects all of them (UnauthorizedAccessSettings.vue:16; AccessGroupController.php:954-956; AccessHelper.php:180-184; UnauthorizedAccess.vue:228-229). Bug in copy or in code? Docs currently can only describe the code.
2. **"All Categories Archive" / "All Tags Archive".** Label says archive; matching protects every post, including posts with no term, and term archive pages are not blocked (AccessHelper.php:1011; AccessHandler.php:447). Same pattern for WC archives (AccessHelper.php:1015-1021). Intended?
3. **CPT in "Specific Post/Page/CPT/Taxonomy etc."** Picker returns only post, page and terms (ContentService.php:149-150,181-187). `isIncludedInGroup` also only checks category and tag terms for type `post` (AccessHelper.php:748-752,762). So custom post types seem protectable only by per-post panel or Entire Website. Is CPT support planned, or should the label change?
4. **Entire Website and essential pages.** No automatic bypass for portal, pricing, checkout or redirect target in `hasAccess` (AccessHelper.php:22-47). Should docs tell admins to add them under **Exclude Content from Restriction**, or does the product intend to exempt them? Not testable without creating a site-wide group.
5. **"Customize for this rule" wording.** Button sits on the group card and applies to the whole group, not a rule, despite multi-rule UI (UnauthorizedAccess.vue:24; AccessGroupDetails.vue:115). Docs should say "group"; confirm no per-rule plan.
6. **Block fallback has no custom message.** Old docs promised per-block actions; code offers fixed text only (RestrictionRenderer.php:326-336). Removed deliberately, or planned? Determines whether to write "not available" or stay silent.
