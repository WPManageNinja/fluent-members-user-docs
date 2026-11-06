# Audit: onboarding, Dashboard, Membership Levels, install/intro

Evidence: free 9afdb75b, Pro 59d8187, live site http://localhost:10053 (Pro active, view only).
Path keys: `F/` = src-free/resources/admin/Modules/, `A/` = src-free/resources/admin/, `S/` = src-free/, `P/` = src-pro/.
Doc column: section name = covered, `PARTIAL:` = mentioned but incomplete or wrong, `MISSING` = absent.

Limits of the live check:
- Onboarding never rendered: the site has it completed (`crawl/onboarding.png` is blank), so every wizard row is source only.
- The site runs Pro, so free-only states are source only.
- Pricing rows could not be seen live. Seeded plans have `provider: native`, but `P/app/Services/Payments/PricingService.php:51-53` reads only `stripe` and `paypal`, so `GET levels/4/pricing` returns `[]` and the tab shows "No pricing plan has been added yet", while the level list says "2 plans" and Assign Members lists both plans.
- **Screenshot blocker:** Pricing and Upgrade Paths screenshots need real plans, and creating them is outside this view-only audit.
- There is no corporate or paywall level on the site, so those rows are source only.
- Dashboard: `crawl/dashboard.png` shows only the top of the page. The lower cards were confirmed through section headings and `GET dashboard`.

## 1. FEATURE ROWS

| Feature/option group | UI location, exact label | Free/Pro | Source file:line | Live-checked | Doc page § or MISSING |
|---|---|---|---|---|---|
| Wizard trigger: new installs only; installs with existing tables skip it | Replaces app on first open | Free | S/app/Hooks/Handlers/ActivationHandler.php:46-47; A/Application.vue:5,42 | no (already completed) | PARTIAL: quick-start intro; installation.md says Dashboard opens |
| Wizard order: Level, Payments, Protect, Pages; "Step N of 4" progress | Wizard | Free | F/Onboarding/Index.vue:11,20-46 | no (already completed) | PARTIAL: quick-start table, wrong order |
| Footer buttons: Skip All (jumps to last step), Go Back, Next Step, Complete Setup | Wizard footer | Free | F/Onboarding/Index.vue:63,68,148-150,198-217 | no (already completed) | PARTIAL: quick-start tip |
| Skip this step for now (only when no pricing type is available) | Step 1 footer | Free | F/Onboarding/Index.vue:71-77,224-227 | no (already completed) | MISSING |
| Progress resumes after reload (browser localStorage) | Wizard | Free | F/Onboarding/Index.vue saveProgress/restoreProgress | no (already completed) | MISSING |
| Return link after leaving to a provider: Back to Fluent Members setup | Provider screens | Free | A/Bits/onboardingProviderReturn.js; S/app/Hooks/Handlers/AdminMenuHandler.php:190-191 | no (already completed) | MISSING |
| Step 1 Membership Title (required), Type (default Individual; Corporate has Pro badge) | Welcome to FluentMembers > Create a Membership | Free, Corporate Pro | F/Onboarding/LevelStep.vue:22-82,198; Index.vue:119 | no (already completed) | Step 1 |
| Step 1 Maximum Members (corporate; min 2, empty = unlimited, owner counts as a seat) | Same | Pro | F/Onboarding/LevelStep.vue:88-103,212 | no (already completed) | MISSING |
| Step 1 Pricing Type (required; permanent once created); warnings when blocked | Same | Free, Native and Woo Pro | F/Onboarding/LevelStep.vue:9,107-136,183-195 | no (already completed) | MISSING |
| Connect a Payment Gateway modal: Stripe (Test/Live), PayPal (Sandbox/Live), Enable Payments in %s | Pricing Type > Native Payment > Configure | Pro | F/Onboarding/NativePaymentConnect.vue:5,127-161,190; F/Levels/PricingTypeSelect.vue:126-132 | no (already completed) | PARTIAL: quick-start tip, wrong path |
| Step 2 Set Up Payments: identity card locked to the chosen provider; Connected/Unavailable status | Step 2 | Free | F/Onboarding/PaymentSystemStep.vue:3-40,395-398 | no (already completed) | PARTIAL: Step 3, describes a chooser |
| Step 2 native plan form (one plan only; default One-time) | Create a Pricing Plan | Pro | F/Onboarding/PaymentSystemStep.vue:43-58,219 | no (already completed) | MISSING |
| Step 2 paywall picker; FluentCart inline product (Title, Price, one-time) or Create Pricing | Select an existing product | Free, Woo Pro | F/Onboarding/PaymentSystemStep.vue:67-113,180,365-368 | no (already completed) | PARTIAL: Step 3 |
| Step 3 Protect Your Content: rules capped at 2 in wizard; auto-creates a group named after rule types + " Access" | Step 3 | Free | F/Onboarding/AccessGrantStep.vue:3,15,22,140-145 | no (already completed) | PARTIAL: Step 2, cap and naming absent |
| Step 3 Unauthorized Access: Redirect to a specific URL or Display a custom message (default); message default text; button fields required, button text empty | Step 3 | Free | F/Onboarding/AccessGrantStep.vue:80-84; F/AccessGroups/Components/UnauthorizedAccess.vue:121,129,201-202 | no (already completed) | PARTIAL: Step 2, wrong default |
| Step 4 Member Portal Page: select or create (default name Member Portal), `[fluent_member_portal]`, Edit/Preview links | Set Up Pages | Free | F/Onboarding/SetUpPagesStep.vue:10-51,132,386 | no (already completed) | PARTIAL: Step 4 |
| Step 4 Pricing Page: select or create (default Membership Plans), `[fluent_membership_levels]` | Set Up Pages | Free | F/Onboarding/SetUpPagesStep.vue:58-99,166,493 | no (already completed) | MISSING |
| Step 4 Select Currency (default USD) | Set Up Pages > Currency | Free | F/Onboarding/SetUpPagesStep.vue:107-123,235 | no (already completed) | MISSING |
| Completion dialog: You're All Set! / Almost There!; rows Level, Content Protection, Payment, Portal, Pricing Page; Go To Dashboard | After Complete Setup | Free | F/Onboarding/CompletionDialog.vue:5,21,27,47,50,173-199 | no (already completed) | PARTIAL: "Almost Done!" table, wrong place and labels |
| Dashboard greeting + Welcome to site title | Dashboard | Free | F/Dashboard/Dashboard.vue:11-20 | yes | Greeting |
| Currency mismatch notice (dismissible): amounts count only one currency | Dashboard top | Free | F/Dashboard/Dashboard.vue:3-8; S/app/Services/DashboardStatsService.php:794 | no (no mismatch on site) | MISSING |
| Stat cards: Active members, Revenue, Recurring revenue, Member churn, with captions | Dashboard | Free (revenue needs native payments) | S/app/Services/DashboardStatsService.php:392-462 | yes | PARTIAL: Top Statistic Cards, wrong four cards |
| Business trends: date range, bar/line toggle; Growth, Revenue, Churn; granularity auto, max ~24 months | Dashboard | Free | F/Dashboard/Dashboard.vue:63-73; S/app/Http/Controllers/DashboardController.php:321,409-420 | yes | MISSING |
| Membership lifecycle: Renewals, Cancellations, Refunds, Trial conversion | Dashboard | Free | S/app/Services/DashboardStatsService.php:291-374 | yes | MISSING |
| Membership Activity with date range | Dashboard | Free | F/Dashboard/Dashboard.vue:104-111; S/app/Http/Controllers/DashboardController.php:301 | yes | PARTIAL: Membership Activity, no date range |
| Revenue by Membership: native payments only, this week vs last | Dashboard | Pro effect | F/Dashboard/RevenueByMembership.vue:7,58; S/app/Services/DashboardStatsService.php:183 | yes (heading) | MISSING |
| Getting Started checklist: Setup Pages, Add Access Group, Add Membership Level, Setup Payment; hidden when complete | Dashboard side | Free | F/Dashboard/Dashboard.vue:144-146,379-411 | no (complete on site) | MISSING |
| Recent Activity: All/Members/Admin, last 20 events | Dashboard side | Free | F/Dashboard/RecentActivity.vue:4,101-122,132,137-139 | yes | MISSING |
| Theme control: Light, Dark, System | Top bar | Free | A/Pieces/ThemeToggle.vue:54-56 | no (menu not opened; sliders-style icon visible) | PARTIAL: Important Notes, says moon toggle |
| Level list columns: ID, Title (type and plan count beneath), Pricing Type, Access Group, Shortcode, Status | Membership Levels | Free | F/Levels/Levels.vue:53-180,511-513 | yes | PARTIAL: Understanding the Levels Dashboard |
| Column toggle (book icon; Columns) | List toolbar | Free | F/Levels/Levels.vue:29-31 | yes (icon) | MISSING |
| Status filter tabs and search by ID or Title | List toolbar | Free | F/Levels/Levels.vue:24,40,343-345 | yes | PARTIAL: index.md, says title only |
| Setup warning icon beside Status, with reason; No gateway tag | List | Free | F/Levels/Levels.vue:81-84,187-199; S/app/Http/Controllers/MembershipLevelController.php:69-79 | yes (icon on Free Member) | MISSING |
| Row menu: Edit, Duplicate, Delete | List | Free | F/Levels/Levels.vue:218-240 | yes | PARTIAL: Open and Manage, no Duplicate |
| Duplicate: copies settings and groups, drops paywalls; title suffix " - Duplicated(id)" | Row menu | Free | S/app/Http/Controllers/MembershipLevelController.php:427-481 | yes (menu only) | MISSING |
| Delete refused when level has members or billing history; hint to set inactive | Row menu, More Actions | Free | S/app/Http/Controllers/MembershipLevelController.php:336-378 | no (would change data) | MISSING |
| Add Membership Level modal: Title, Type, Maximum Member, Pricing Type (required), Create Level | Create Membership Level | Free, Corporate Pro | F/Levels/_AddLevelDialog.vue:8,19,27,84-99,136,222 | yes | PARTIAL: Creating Step 1 |
| Pricing Type list: FluentCart, FluentForms, Paymattic, WooCommerce (Pro), Native Payment (Pro); Installed/Not Installed; Configure; permanent | Create modal | Free, Woo and Native Pro | F/Levels/PricingTypeSelect.vue:80-135,239-248; S/app/Models/MembershipLevel.php:88-91 | yes | MISSING |
| Create disabled when no paywall plugin and no Pro | Create modal | Free | F/Levels/_AddLevelDialog.vue:115-117,133,206 | no (Pro on site) | MISSING |
| Legacy level without pricing type picks one on Level Details | Level Details | Free | F/Levels/EditLevel.vue:71-91 | no (no such level) | MISSING |
| Level header: breadcrumb, shortcode pill, More Actions > Delete | Level screen | Free | F/Levels/LevelLayout.vue:8-34 | yes | PARTIAL: Creating Step 2, no pill |
| Tabs: Level Details, Pricing, Access Groups, Members, Upgrade Paths (native only), Integrations (if available); warning icon when incomplete | Level screen | Free, Upgrade Paths Pro | F/Levels/LevelLayout.vue:44-51,127-167 | yes | PARTIAL: Level Configuration Tabs, four old tabs |
| Level Details stat cards: Access Groups, Pricing, Members | Level Details | Free | F/Levels/EditLevel.vue:13-31 | yes | MISSING |
| Level Information: Title, Description, Status; SaveBar on change | Level Details | Free | F/Levels/EditLevel.vue:2-8,40,63-68,113-116 | yes | 1. Edit Level; Creating Step 2 |
| Maximum Member on Level Details (min 2) | Level Details, corporate | Pro | F/Levels/EditLevel.vue:96-110; S/app/Models/MembershipLevel.php:42-43 | no (no corporate level) | PARTIAL: Corporate Step 2, min absent |
| Pricing tab header and paywall lockup; Add Pricing; no dropdown (type locked) | Pricing | Free | F/Levels/Paywalls/ManagePaywalls.vue:22-36,269 | yes | PARTIAL: Step 1 in both pricing pages, describes a dropdown |
| No-integration prompt: Install FluentCart, Open plugin browser, Pro Required | Pricing | Free | F/Levels/Paywalls/_NoPaywallState.vue:4-88; ManagePaywalls.vue:1115 | no (plugins active) | MISSING |
| Native plan form: Title, Price Type (Recurring default, One-time), Amount >0, Setup Fee, Interval (Daily/Weekly/Monthly/Yearly, default Yearly), Trial Days (Recurring only) | Add Pricing > Pricing Packages | Pro | F/Levels/Paywalls/components/NativePricingPlanForm.vue:21-110; ManagePaywalls.vue:362-374; P/app/Http/Controllers/PaymentMethodController.php:141 | yes | PARTIAL: Step 3 and Price Types, wrong types |
| Add several plans at once: Add another plan | Add Pricing | Pro | F/Levels/Paywalls/components/NativePaymentSection.vue:54-75 | yes | MISSING |
| Payment Methods selector, shown only with 2+ gateways | Add Pricing | Pro | F/Levels/Paywalls/nativePaymentMixin.js:50-53 | yes (hidden, Stripe only) | PARTIAL: Step 2, says always shown |
| Plan row menu: Edit, Move up, Move down, Copy Checkout Link, Duplicate, Delete; Edit Pricing Package modal | Pricing rows | Pro | F/Levels/Paywalls/components/PricingPlanRow.vue:42-80; EditNativePricingPlanModal.vue:13 | no (seed plans not listed) | PARTIAL: For Single Pricing Package |
| Drag to reorder with Save bar; order drives display | Pricing rows | Free | F/Levels/Paywalls/ManagePaywalls.vue:2-8,75-91,1032; PricingPlanRow.vue:3 | no (seed plans not listed) | MISSING |
| Plan delete refused when in use | Pricing rows | Pro | P/app/Services/Payments/PricingService.php:173 | no (would change data) | PARTIAL: Before you Delete, says deletion allowed |
| Migrated plans: read-only "Migrated from X" badge | Pricing rows | Free | F/Levels/Paywalls/ManagePaywalls.vue:780,892-896; PricingPlanRow.vue:10 | no (none on site) | MISSING |
| Multi-currency notice on plans | Pricing | Pro | F/Levels/Paywalls/ManagePaywalls.vue:14,343 | no (no mix on site) | MISSING |
| Select Pricing picker with single-item form limit notice | Add Pricing, paywall level | Free, Woo Pro | F/Levels/Paywalls/components/PaywallPricingSection.vue:44-115 | no (no paywall level) | Step 2 |
| FluentCart quick create (one-time) and Create Pricing | Add Pricing, cart level | Free | F/Levels/Paywalls/components/PaywallPricingSection.vue:4-39,138-149 | no (no paywall level) | MISSING |
| Paywall row: View, Edit, Copy Checkout Link, Delete; variants for Woo | Pricing rows | Free, Woo Pro | F/Levels/Paywalls/components/PricingPlanRow.vue:26-33,42-80,146-153; ManagePaywalls.vue:809-811 | no (no paywall level) | PARTIAL: Manage a Linked Product, Direct Checkout |
| Access Groups tab: group cards with status, protected items, Excluded, Content Drip summary | Access Groups | Free | F/Levels/LevelAccessGroups.vue:29-83,231-242; ContentChipList.vue | yes | PARTIAL: Step 2 Review, describes a table |
| Link Existing Group modal (no create inside; load more) | Access Groups | Free | F/Levels/LevelAccessGroups.vue:9,93-97; SelectAccessGroup.vue:21,96-103 | yes | PARTIAL: Step 1 |
| Add New: Create Access Group, Title then Next (active, linked) | Access Groups | Free | F/Levels/LevelAccessGroups.vue:13,227; _CreateAccessGroupModal.vue:12,23,41,96 | yes | PARTIAL: Create From the Modal, wrong flow |
| Edit, Unlink buttons per group | Access Groups | Free | F/Levels/LevelAccessGroups.vue:44-50 | yes | PARTIAL: Edit or Remove |
| Members tab table: ID, User, Role, Registered, Status; all statuses; search | Members | Free | F/Levels/LevelMembers.vue:9,30-52,104 | yes | PARTIAL: members-on-a-level, column order and "currently holds" |
| Assign Members: disabled if inactive, or corporate without Pro | Members | Free | F/Levels/LevelMembers.vue:14-16,165-175 | yes (dialog opened, not submitted) | MISSING |
| Assign dialog: Plan (required), No payment is taken note, search, Current Levels, previous status, load more, up to 100, progress and failures | Members | Free | F/Levels/_AssignMembersDialog.vue:4,23-51,68,123-125,141,179-214,223; S/app/Services/ManualAssignmentService.php:30 | yes | MISSING |
| Assign corporate warning: each user a separate Team owner | Assign dialog | Pro | F/Levels/_AssignMembersDialog.vue:54-58 | no (no corporate level) | MISSING |
| Assign empty state: No pricing plans yet, Add pricing plan | Assign dialog | Free | F/Levels/_AssignMembersDialog.vue:17-18 | no (level 4 has plans) | MISSING |
| Upgrade Paths table: From Plan, To Plan, Discount Amount, Is Prorate; Edit, Delete | Upgrade Paths | Pro, native levels | F/Levels/LevelUpgradePaths.vue:37-95,211-212; LevelLayout.vue:151-157 | yes | MISSING |
| Add Upgrade Path dialog: From Plan, To Plan(s), Discount Amount (0 to max), Prorate | Upgrade Paths | Pro | F/Levels/_UpgradePathDialog.vue:13-78,147-155; P/app/Services/Payments/PricingService.php:339-354,402 | yes (not saved; From Plan empty with seed data) | MISSING |
| Level Integrations list: Status toggle, Integration, Title, Triggers; Edit, Delete; Add Integration | Integrations | Free, needs a registered integration | F/Levels/LevelIntegrations.vue:5-14,57-141; S/app/Modules/Integrations/LevelIntegration/LevelIntegrationModule.php:24 | yes | MISSING |
| FluentCommunity feed: Feed Title, Add to Spaces, Add to Courses, Remove From Spaces, Remove From Courses, verified profile, remove on refund or cancel, Event Trigger (Membership Assigned, Renewed); Enable this Integration | Integrations editor | Free, needs FluentCommunity | S/app/Modules/Integrations/LevelIntegration/FluentCommunity/Connector.php:79-173; F/Levels/LevelIntegrationEditor.vue:36-38; Bootstrap.php:39-41 | yes (menu only) | MISSING |
| Corporate level creation with Pricing Type and seats | Create modal | Pro | F/Levels/_AddLevelDialog.vue:84-99 | yes (modal) | PARTIAL: Corporate Step 1 |
| Corporate portal: Team Members, Invite Member, Send Invitation, View/Resend/Cancel invitation, Cancel member | Member Portal | Pro | S/resources/public/components/CorporateManagement.vue:5,19,28,111-131 | no (no corporate level) | Corporate Step 4-5 |
| Free levels: no Free price type; native amount must be >0; assign needs a plan | Pricing, Assign | Pro rule | P/app/Http/Controllers/PaymentMethodController.php:141; P/app/Services/Payments/PricingService.php:16-19; S/app/Http/Controllers/MembershipLevelController.php:524 | yes (Free Member shows "no plan" + warning) | PARTIAL: pricing-native Price Types, invents Free |
| Lifetime: no such type; closest is One-time | Pricing | Pro | F/Levels/Paywalls/ManagePaywalls.vue:362-366 | yes | PARTIAL: pricing-native Price Types, invents Lifetime |
| Drip toggle on Access Group, default off | Access Group > Content Drip | Free | F/AccessGroups/AccessGroupDetails.vue:130-137,193 | no (reviewed in source only) | Content Drip intro |
| Drip rule: Show This Content, blank = all; Days, Hours, Minutes; delete shown only with 2+ rules | Access Group | Free | F/AccessGroups/Components/ContentDripping.vue:7-13,27,53,76-107; AccessGroupDetails.vue:147 | no (reviewed in source only) | Step 1 |
| Drip Timeline: After duration, Within duration (access then expires) | Access Group | Free | F/AccessGroups/Components/ContentDripping.vue:61-68; S/app/Services/ContentDripHelper.php:71-75 | no (reviewed in source only) | PARTIAL: Step 1, Within duration absent |
| Drip notices: "This content will be available in %s." / "This content is no longer available." | Front end | Free | S/app/Services/ContentDripHelper.php:75,271; S/app/Services/RestrictionRenderer.php:133-136 | no (needs member login) | PARTIAL: What Members See, wrong text |
| Drip clock uses the earliest start date across memberships granting the group | Behavior | Free | S/app/Services/AccessHelper.php:259-269 | no (behavior) | PARTIAL: Note, says clock restarts |
| Requirements: WP 6.3, PHP 7.4 | Plugin header | Free, Pro | site plugins fluent-members.php:7-8, fluent-members-pro.php:7-8 | yes (installed files) | PARTIAL: System Requirements, says 6.0 |
| Activation creates 10 tables | Activation | Free | S/database/DBMigrator.php:20-29 | no (source enough) | PARTIAL: Important Notes, says six |
| WP submenu: Dashboard, Levels, Access Groups, Members, Billing (Pro), Settings; top nav Membership Levels | WP sidebar | Free, Billing Pro | S/app/Hooks/Handlers/AdminMenuHandler.php:64-111,125-156 | yes | PARTIAL: Confirm the Installation, no Billing |
| Pro license activation: no License tab; no license code at this commit | Settings | Pro | F/Settings/Settings.vue:157-171; P/ grep "licen" hits only headers in app/Core/Application.php:8-9 | yes (settings nav) | PARTIAL: installation-pro Step 3, describes absent UI |

## 2. PAGE VERDICTS

Numbers `W#` count wrong facts. Evidence is by claim. Medium confidence is marked (M).

### docs/getting-started/quick-start.md: rewrite-heavy
Wrong:
- W1: Steps 2 and 3 order → Payments is step 2, Protect is step 3. Index.vue:28-44.
- W2: Step 1 is title + type only → Pricing Type is required, plus seats for corporate. LevelStep.vue:88-111,200.
- W3: "only creates the Level shell; add pricing after" → step 2 saves one plan or paywall. PaymentSystemStep.vue:794,815.
- W4: Step 3 shows integration cards to select → provider is fixed from step 1. PaymentSystemStep.vue:10; chooser in PricingTypeSelect.vue:80.
- W5: Native reached from a banner → Native Payment row > Configure > Connect a Payment Gateway. PricingTypeSelect.vue:126-132; NativePaymentConnect.vue:5.
- W6: Button Text defaults to `Subscribe Now` → empty and required. AccessGrantStep.vue:83; UnauthorizedAccess.vue:121.
- W7: Lists redirect, partial preview, login popup, hide as other actions (M) → this component offers Redirect and custom message. UnauthorizedAccess.vue:201-202. Access Groups audit should confirm the group screen.
- W8: Step 4 "Almost Done!" holds a summary → Step 4 is Set Up Pages, summary is a dialog afterward. SetUpPagesStep.vue:3; CompletionDialog.vue:21,27.
- W9: Summary values "new", "Skipped, No restriction set" → "Not configured", status Completed/Skipped. CompletionDialog.vue:40-42,128,175.
- W10: Skip All jumps to the summary → jumps to Set Up Pages. Index.vue:202-216.
- W11: `+ Add New Group` → Create Access Group. crawl.json access-groups.

Stale labels: Fluent Members → Levels; + Create Membership Level has no literal "+".
Missing: Pricing Type lock, Maximum Members, 2-rule cap, auto group name, Pricing Page, Currency, Skip this step for now, resume, Getting Started checklist.

### docs/getting-started/introduction.md: rewrite-light
Wrong:
- W12: WordPress 6.0 → 6.3. fluent-members.php:7.
- W13: Refunds "from the Transactions screen" → Billing has Subscriptions and One-time. AdminMenuHandler.php:148-156.
- W14: "For free or admin-assigned memberships, no payment plugin is required at all" → level create needs a paywall or Pro (_AddLevelDialog.vue:133,206; MembershipLevelController.php:102-115), and assign needs a plan (:524).
- W15: "Install, build your Levels and connect a payment provider later" → same block for free sites without a paywall plugin. _AddLevelDialog.vue:115-117.
- W16: Email: "Welcome, expiry, and suspension" (M) → live list has Welcome Email, Membership Expiring, Membership Expired, and more. crawl.json settings_email-notifications. Settings audit owns the full list.

Stale labels: Transactions.
Missing: Upgrade Paths (Pro), Assign Members, Level Integrations, `[fluent_membership_levels]`, Permissions role note (admin menu capability is `manage_options`, AdminMenuHandler.php:31).
Convention: opens with "This page gives you the big picture"; ends with What's Next block.

### docs/getting-started/installation.md: rewrite-light
Wrong:
- W17: Six tables → 10. DBMigrator.php:20-29.
- W18: First click shows the Dashboard → new installs get the wizard. ActivationHandler.php:47; Application.vue:5.

Stale labels: none in sidebar list, but add Billing note for Pro.
Missing: wizard hand-off, WP 6.3/PHP 7.4.
Unverified: WordPress.org listing (see Questions).

### docs/getting-started/installation-pro.md: rewrite-light
Wrong:
- W19: Step 3 License/Activation tab and Activate License → absent. Settings.vue:157-171; no license code in P/.
- W20: New Transactions menu → Billing. AdminMenuHandler.php:98-101.

Stale labels: "native Stripe" only, PayPal also exists.
Missing: Pro plugin header requirements.

### docs/getting-started/glossary.md: rewrite-light
Wrong:
- W21: Dashboard: "total members, membership levels" → the four current cards. DashboardStatsService.php:392-456.
- W22: Email Notification: "Three notifications ship" (M) → more on screen. crawl.json.
- W23: Currency: "applies to every pricing card" → existing prices keep their currency. ManagePaywalls.vue:343.
- W24: Shortcode: lists two → also `[fluent_membership_levels]`, `[fluent_members]`. ShortcodeHandler.php:17-19.
- W25: Lifetime Membership links to Creating a Level as if a feature there → no Lifetime type or setting. ManagePaywalls.vue:362-366.

Stale: Content Dripping lacks Within duration; FluentCommunity links to Paywalls instead of Integrations; Orders/Transactions wording.
Missing: Upgrade Path, Team owner/Seats, Pricing Type, Assign Members, Level Integration.

### docs/dashboard/dashboard.md: rewrite-heavy
Wrong:
- W26: Cards Total Members, Active Members, Access Groups, Membership Levels → Active members, Revenue, Recurring revenue, Member churn. DashboardStatsService.php:392-456; live.
- W27: Nav Orders → Billing. AdminMenuHandler.php:148.
- W28: Membership Trends and Membership Recap → gone; Business trends, Membership lifecycle, Revenue by Membership exist. Dashboard.vue:63-128.
- W29: Membership Activity monthly fixed → date range. Dashboard.vue:105.
- W30: Quick Actions, Latest Memberships, Expiring Soon → gone; Getting Started and Recent Activity. Dashboard.vue:144-170.
- W31: Moon toggle → Light/Dark/System theme control. ThemeToggle.vue:54-56.

Stale screenshots: both.
Missing: currency notice, chart toggle, checklist, activity filter.
Convention: closing sign-off line.

### docs/levels/index.md: rewrite-heavy
Wrong:
- W32: Columns Description and Type → Pricing Type column; type under title. Levels.vue:72,511-513.
- W33: Description "not shown to visitors" → rendered on pricing cards by default. S/app/Views/public/membership-levels.php:34-36; ShortcodeHandler.php:62.
- W34: Row menu Edit/Delete → plus Duplicate. Levels.vue:226-228.
- W35: Four tabs named Edit Level, Pricing, Access Group, Members → six, see LevelLayout.vue:127-162.
- W36: Delete warning implies any level deletes → refused with members or billing. MembershipLevelController.php:336-378.
- W37: Setup step 1 "title and type" → Pricing Type also required and permanent. _AddLevelDialog.vue:120,222.
- W38: Members tab "currently holding" → all statuses, including Expired, Cancelled. LevelMembers.vue:104; live.

Stale labels: Edit Level, Access Group tab, search "by title".
Missing: setup warning, column toggle, Duplicate, Level Details stat cards, shortcode pill, Upgrade Paths, Integrations, Assign Members.

### docs/levels/creating.md: rewrite-light
Wrong:
- W39: Modal has Title and Type → plus required Pricing Type, and Maximum Member. _AddLevelDialog.vue:84-99.
- W40: Button Create → Create Level. :136.

Stale labels: Edit Level tab (Level Details), Access Group, "← Membership Level" (now a breadcrumb).
Missing: Pricing Type list and lock, blocked state, stat cards.

### docs/levels/pricing-native.md: rewrite-heavy
Wrong:
- W41: Pricing Type dropdown in Add Pricing → no dropdown, set at creation. ManagePaywalls.vue:269; live.
- W42: "Stripe as the native payment gateway" only → Stripe and PayPal. NativePaymentConnect.vue:127-146; PricingService.php:51-53.
- W43: Payment Methods card always shown → only with 2+ methods. nativePaymentMixin.js:50-53; live.
- W44: Under Pricing Packages click + Create Pricing Plan, Save then Add → form is inline, Add another plan, Add. NativePaymentSection.vue:54-75; live.
- W45: Five price types → Recurring and One-time. ManagePaywalls.vue:362-366; PricingService.php:16-19.
- W46: Free plan → amount must be above zero. PaymentMethodController.php:141.
- W47: Trial note → Trial Days on Recurring only; no Trial type. NativePricingPlanForm.vue:104-110.
- W48: Section menu Edit Pricing/Remove Pricing → no such menu (M, not seen live). PricingPlanRow.vue; no such string in Levels.
- W49: Row menu Edit, Delete → plus Move up/down, Copy Checkout Link, Duplicate. PricingPlanRow.vue:42-80.
- W50: Delete a plan in use is allowed → refused. PricingService.php:173.
- W51: No Pro: "may appear ... no payment methods" → Pro badge and locked. PricingTypeSelect.vue:112.

Stale labels: Fluent Members → Levels, Transactions.
Missing: reorder, migrated badge, currency notice, Duplicate.

### docs/levels/pricing-paywalls.md: rewrite-light
Wrong:
- W52: Dropdown in Add Pricing → none, type fixed. ManagePaywalls.vue:269.
- W53: Grouped list across all plugins (M) → a level uses exactly one provider. MembershipLevel.php:88-98.
- W54: View Product, Edit Product, Delete Product → View, Edit, Delete. PricingPlanRow.vue:32,45,80.
- W55: Direct Checkout → Copy Checkout Link. PricingPlanRow.vue:66.
- W56: Native described as Stripe-only → also PayPal. NativePaymentConnect.vue:127-146.

Format: `:::Important Note` and `::: Info` are invalid containers; the Access Group note is misplaced here.
Missing: FluentCart quick create, Create Pricing, install prompt, Paywall header, reorder, Woo variants.

### docs/levels/attaching-access-groups.md: rewrite-heavy
Wrong:
- W57: "No access groups selected" → "No access groups linked". LevelAccessGroups.vue:29.
- W58: Select Access Group button → Link Existing Group and Add New. :9,13.
- W59: + Create Access Group in modal with Title/Description/Status → not shown (`showCreate=false`); Add New is Title then Next. :96; _CreateAccessGroupModal.vue:23,41.
- W60: Table of ID/Title/Description/Status → cards. :36-83; live.
- W61: Three-dot Edit/Remove → Edit, Unlink buttons. :44-50.
- W62: Set group Inactive to stop signups without affecting members → inactive groups are dropped from the access engine, and level needs an active group. AccessHelper.php:223; MembershipLevelController.php:66-69.

Stale labels: Fluent Members → Levels, Access Group tab.
Missing: protected/excluded/drip summary.

### docs/levels/content-drip.md: rewrite-light, move to access-groups/ (merge candidate)
Wrong:
- W63: Timeline only After duration → also Within duration. ContentDripping.vue:61-68.
- W64: "Available in 6 days, 4 hours" → "This content will be available in %s." ContentDripHelper.php:271.
- W65: Message depends on Unauthorized Access → drip uses its own notice. RestrictionRenderer.php:133-136.
- W66: Clock restarts on level change (M) → earliest start date among current memberships granting the group. AccessHelper.php:267-269.
- W67: Toggle top-right → left of the title. AccessGroupDetails.vue:130-137.
- W68: Delete link on any rule → trash icon, only with 2+ rules. ContentDripping.vue:9-18; AccessGroupDetails.vue:147.

Stale labels: + Add Content Drip → Add New (AccessGroupDetails.vue, add action near :157).
Note: placed under Levels, but it is an Access Group setting. Level tab only shows a summary.

### docs/levels/members-on-a-level.md: rewrite-heavy
Wrong:
- W69: "Read-only list" → Assign Members. LevelMembers.vue:14-16.
- W70: ID is membership record (M) → column bound to `ID` from the members endpoint, user-style key. :30,134.
- W71: Empty list means payments Pending → Pending rows are listed. :104; live #123 Pending.

Stale labels: Transactions, Levels; column order.
Unverified: "same email can appear twice"; the list includes ended memberships (live), but duplicates were not observed.
Missing: entire Assign Members flow.

### docs/levels/corporate-memberships.md: rewrite-light
Wrong:
- W72: Create steps omit required Pricing Type, so Create Level stays invalid. _AddLevelDialog.vue:222.
- W73: Seats only set on Level Details → also in create modal; min 2. _AddLevelDialog.vue:84-95.

Stale labels: + Add New Level, Create, Levels, Access Group tab.
Missing: Assign Members Team owner warning, Corporate in Assign (Pro), Pro badge state, resend/view/cancel invitation.

## 3. NEW PAGES NEEDED

- `docs/levels/assign-members`: Assign Members dialog, plan, limit 100, failures, corporate warning.
- `docs/levels/upgrade-paths` (Pro): table, dialog, discount, prorate, native-only.
- `docs/levels/integrations`: Level Integrations list, FluentCommunity feed, triggers.
- `docs/levels/free-levels`, only after Q1: how to offer a free level.
- Move `docs/levels/content-drip` to `docs/access-groups/content-drip`, keeping a short pointer on `attaching-access-groups`. Redirect needed.
- Duplicate and delete rules fit `docs/levels/index`; no page needed.

## 4. QUESTIONS

1. **How is a free level meant to work?** Native amount must be >0 (`P/app/Http/Controllers/PaymentMethodController.php:141`), price types are only `one_time` and `subscription` (`P/app/Services/Payments/PricingService.php:16-19`), and assign needs a plan (`S/app/Http/Controllers/MembershipLevelController.php:524`). Yet the seeded Free Member level has "no plan" and members. Is a zero-price paywall the answer?
2. **Is one-time access lifetime?** The Assign dialog says "Access ends on the plan's expiry" (`F/Levels/_AssignMembersDialog.vue:51`), but the plan form has no expiry field and Interval is disabled for One-time (`NativePricingPlanForm.vue:90`). Old docs sold "Lifetime".
3. **Can plans be made inactive?** Delete refusal says "Set it to inactive instead" (`P/app/Services/Payments/PricingService.php:173`), but no status field exists in the plan forms.
4. **Should type be changeable?** API allows a type change when no memberships exist (`S/app/Http/Controllers/MembershipLevelController.php:229`), while the UI offers none. Docs should keep "permanent" unless told otherwise.
5. **Is license activation coming?** No License tab or code in this Pro commit. Should Step 3 be removed, or is it being added before release? Same for the download path and WordPress.org listing: neither is provable from source.
6. **Revenue by Membership on free sites:** card renders regardless, with native-only copy (`F/Dashboard/RevenueByMembership.vue:58`). Should docs mark it Pro?
7. **Demo data:** plans seeded with `provider: native` are hidden by `readProviders` (`P/app/Services/Payments/PricingService.php:51-53`). Reseed before screenshots, and could real migrated sites hit this?
