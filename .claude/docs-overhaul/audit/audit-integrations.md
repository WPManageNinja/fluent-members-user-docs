# Audit: integrations, migration, reference and help pages

Sources: `F:` = src-free at 9afdb75b, `P:` = src-pro at 59d8187. Live captures: scratchpad `crawl-int/*.png`, `crawl-int.json`, `crawl-int2.json`, `crawl-int3.json`.

Side effects of live checks (nothing was saved by a click; no migration step run): opening the Kadence card fires `POST migration/kadence/analyze`, which per source scans and caches the result for 5 minutes (`F:app/Services/Migration/KadenceMemberships/KadenceMigrationService.php` ANALYZE_CACHE_TTL). One page load also fired `POST /wp/v2/users/me?_locale=user`, not triggered by a click of mine; it may have rewritten that user's stored preferences. Run 1 also logged 6 admin-ajax POSTs. I inspected neither payload, so those two are unverified as harmless.

Live site limits: all 5 levels use Native Payment, so no paywall row exists to inspect. PMPro and MemberPress show Not Detected, so only the Kadence wizard could be opened.

## 1. FEATURE ROWS

Last column starts with covered, partial or MISSING.

| Feature/option group | UI location, exact label | Free/Pro | Source file:line | Live-checked | Doc page § or MISSING |
|---|---|---|---|---|---|
| Level Integrations tab. Tab only exists when an enabled integration is registered | Membership Levels → level → **Integrations**, heading **Level Integrations** | Free | F:resources/admin/Modules/Levels/LevelLayout.vue:158; F:app/Modules/Integrations/LevelIntegration/LevelIntegrationModule.php:24 | yes | MISSING |
| Feed list columns and row actions | **Status, Integration, Title, Triggers**; Edit, Delete; **Add Integration** | Free | F:resources/admin/Modules/Levels/LevelIntegrations.vue:14,57-89 | yes (empty list; row actions no, no feed exists) | MISSING |
| Feed run rules: runs on chosen triggers; revoke runs on removed, expired or suspended even if the feed is disabled | Enable toggle + revoke checkbox | Free | F:app/Modules/Integrations/LevelIntegration/LevelIntegrationEventListener.php:21-27,46-50,168-195 | no (would need a real member event) | MISSING |
| FluentCommunity feed. Default title "FluentCommunity Integration Feed", enabled, trigger Membership Assigned | Add Integration → **FluentCommunity**; **Enable this Integration**, **Feed Title** | Free, requires FluentCommunity | F:.../LevelIntegration/FluentCommunity/Connector.php:28-43,76-84 | yes | MISSING |
| Spaces and courses. Course fields hidden when course module is off | **Add to Spaces, Add to Courses, Remove From Spaces, Remove From Courses** | Free | Connector.php:85-124,140-144 | yes | MISSING |
| Verified profile, default off | **Mark the community profile as verified** | Free | Connector.php:125-130; Bootstrap.php:215 | yes | MISSING |
| Revoke on loss of access, default on | **Remove from selected Courses/Spaces on Refund or Subscription Access Expiration** | Free | Connector.php:131-136; Bootstrap.php:118 | yes | MISSING |
| Trigger options | **Event Trigger**: **Membership Assigned, Membership Renewed** | Free | Connector.php:153-178 | yes | MISSING |
| Deleting a feed runs tracked revocation for that level's members | Row Delete | Free | Bootstrap.php:94-116 | no (would delete data) | MISSING |
| FluentCart paywall, grant on `order_paid_done`, revoke on full refund or cancel, subscription sync | Level Details **Pricing Type** = FluentCart; Pricing tab | Free | F:.../FluentCart/Paywalls.php:41-48 | no (no paywall level; would need an order) | partial: pricing-paywalls.md "What Happens at Checkout" (grant only) |
| Create FluentCart product inline. One-time only. Needs Title, Price | Add Pricing: **Title, Price, Create Pricing**, or **Select an existing product** | Free | F:.../Paywalls/components/PaywallPricingSection.vue:6-46,149; paywallPricingMixin.js:240 | no (no FluentCart-priced level) | MISSING |
| One product or form per level | Error "This product already sells ..." | Free and Pro | F:.../FluentCart/Http/Controllers/PaywallController.php:128 | no (would save) | MISSING |
| FluentCart restriction types | Access Group rule: **All Products, All Digital Products, All Physical Products, Specific Products/Categories/Brands etc., All Product Categories, All Product Brands** | Free | F:.../FluentCart/Connector.php:35-69 | yes | partial: docs/access-groups/protected-content.md (other audit), absent from integration pages |
| FluentCart storefront enforcement: purchase blocked, cart validated, shop and single product intercepted | Frontend messages | Free | F:.../FluentCart/Restrictions.php:33-41,67,106-108 | no (needs non-member shop session and restricted product) | MISSING |
| Product editor widget. Admin only, multi-select Access Groups, saves live, broad rules read-only | FluentCart product → **Membership Restriction**; **Select access groups**, **Manage Access Groups**, **View** | Free | F:.../FluentCart/ProductRestrictionWidget.php:21,30,96,113-128; VueTemplates/ProductRestriction.vue; Http/cart_api.php:24-25 | yes (widget renders; attach not clicked) | MISSING |
| FluentCart product integration feed, reverse direction | FluentCart product → **Integrations** → FluentMembers: **Title, Add to levels, Remove from level, Remove from selected level on Refund or Subscription Access Expiration** | Free | F:.../FluentCart/FluentCartConnector.php:22,53-115 | no (tab still blank at capture) | MISSING |
| Membership tab in FluentCart customer dashboard | Customer dashboard → **Membership** | Free | F:.../FluentCart/CustomerPortalIntegration.php:25-28 | no (guessed URL returned 404) | MISSING |
| Fluent Forms paywall. Exactly one payment component, fixed or fixed subscription | Pricing Type **FluentForms**; group **Fluent Forms** | Free | F:.../FluentForms/Paywalls.php:51-62,575-595 | no (no FF-priced level) | partial: pricing-paywalls.md Step 2 |
| FF standalone checkout page and subscription lifecycle | Row action **Copy Checkout Link** when a URL exists | Free | F:.../FluentForms/Paywalls.php:65,312; 174-247 | no (no linked form) | MISSING |
| Paymattic paywall, same limits; offline, gateway-notice and Square handling | Pricing Type **Paymattic**; group **Paymattic Forms** | Free | F:.../Paymattic/Paywalls.php:82-111,1088-1092 | no (no linked form) | partial: pricing-paywalls.md Step 2 (group label stale) |
| Guest purchase on paywalls. FluentCart, FF, Paymattic; Woo only when the shop allows guest checkout. Registered email refused | Checkout validation | Free (Woo Pro) | F:app/Services/GuestPaywallService.php:16,98-110; F:.../FluentCart/Paywalls.php:89-116; P:.../Woocommerce/Paywalls.php:37,58 | no (needs checkout) | MISSING |
| Repurchase block on a billed membership | Checkout validation | Free (Woo Pro) | F:.../FluentCart/Paywalls.php:60; FluentForms/Paywalls.php:75; Paymattic/Paywalls.php:121; P:.../Woocommerce/Paywalls.php:98 | no (needs checkout) | MISSING |
| WooCommerce paywall. COD at processing does not grant; whole product only | Pricing Type **WooCommerce** (Pro badge) | Pro | P:.../Woocommerce/Paywalls.php:43-46,178; Http/Controllers/PaywallController.php:126; F:.../PricingTypeSelect.vue:248 | no (no Woo-priced level) | partial: pricing-paywalls.md, FAQ |
| WooCommerce Subscriptions sync | Automatic | Pro | P:.../Woocommerce/Paywalls.php:49-53 | no (needs subscription order) | partial: FAQ one line |
| Woo restriction types | **WC All Products, WC All Product Categories Archive, WC All Product Tags Archive, WC All Product Brands Archive, WC All Product Shipping Classes Archive, Specific Products/Categories/Brands etc.** | Pro | P:.../Woocommerce/Connector.php:29-64 | yes | partial: protected-content.md (other audit) |
| Woo storefront enforcement: hide product and variation, block purchase and add to cart | Frontend | Pro | P:.../Woocommerce/Restrictions.php:67-78 | no (needs non-member session) | MISSING |
| Instant checkout. Logged-in only, saves and restores the cart | Pricing card buy link | Pro | P:.../Woocommerce/Services/InstantCheckoutService.php:23-35 | no (would change cart) | partial: FAQ one phrase |
| Membership tab in My Account | Woo My Account → **Membership** | Pro | P:.../Woocommerce/CustomerPortalIntegration.php:19-20,35 | no (capture matched footer text, inconclusive) | MISSING |
| FluentCRM triggers. Subscription Status, **Target Membership Levels** (empty = all), run multiple | FluentCRM → Automations → New Automation → **FluentMembers**: **Membership Level Assigned, Membership Level Removed, Membership Expired, Membership Suspended** | Free, requires FluentCRM | F:.../FluentCRM/Bootstrap.php:34-37; Triggers/BaseMembershipTrigger.php:47-99 | yes (trigger list; settings form no, would create a funnel) | MISSING (chain-map 11 and FAQ say to use hooks) |
| FluentSupport ticket sidebar widget: level and status per customer; WP-linked customer only | Ticket → **Membership Levels** widget | Free, requires Fluent Support | F:.../FluentSupport/Bootstrap.php:15,20-56 | no (needs ticket from a member) | MISSING |
| Migration page. Three cards, only **Not Detected** badge, disabled card and tooltip | Settings → **Migration**: "Select a source to import your membership data" | Free | F:resources/admin/Modules/Settings/Migration.vue:5,13,29-31 | yes | partial: migration/index.md (badge wrong) |
| Documentation line is plain text, not a link | **The Documentation** | Free | Migration.vue:61-63 | yes | MISSING (product gap) |
| Detection per source | Card state | Free | F:app/Services/Migration/Pmpro/PmproAnalyzerService.php:36-45; MemberPress/MemberPressAnalyzerService.php:10-20; KadenceMemberships/KadenceAnalyzerService.php:21-31 | yes (Kadence detected, 2 not) | partial: index.md, troubleshooting |
| Restrict Content Pro. Still supported through the Kadence card: same constants and `rcp_` tables; no separate source | **Kadence Memberships** card | Free | KadenceAnalyzerService.php:23,28; MigrationRegistry.php:38-62 | yes (plugin menu "Restrict" active, card enabled) | covered: from-kadence-memberships.md note |
| Wizard frame | **Import from %s**; **Step n/3**: **Data Map, Migration, Review Data**; Cancel, Next, Back, Close, **View Summary**, **View Members** | Free | F:.../Migration/_MigrationDialog.vue:14,31-61 | yes (Kadence, steps 1-2) | partial: per-source pages |
| Data Map table | **What will be imported**: In %s, **Becomes in FluentMembers**, Records | Free | _PmproStats.vue:4-11,26-40; _MemberPressStats.vue; _KadenceStats.vue | yes (Kadence) | partial: rows incomplete on all 3 |
| Warnings panel, computed per site | **Before You Migrate** (back up, deactivate timing, gateway-specific outcomes, unsupported content) | Free | _PmproMigration.vue:255-378; _MemberPressMigration.vue:265-370; _KadenceMembershipsMigration.vue:266-414 | yes (Kadence) | partial: PMPro names it, MP and Kadence call it Validation Warnings |
| "Not migrated" list per source | Same panel | Free | _PmproMigration.vue:376; _MemberPressMigration.vue:368; _KadenceMembershipsMigration.vue:412 | yes (Kadence) | partial: short notes, PMPro wrong |
| Step list, order and dependencies; hard refusal "Run X first" | **Migration Steps** | Free; Subscriptions, Orders, Transactions, Payments require Pro | _PmproStepRunner.vue:182-190; _MemberPressStepRunner.vue:181-188; _KadenceStepRunner.vue:194-201; PmproMigrationService.php:56; MemberPressMigrationService.php:41; KadenceMigrationService.php:42 | yes (Kadence) | covered: step tables, except Pro flags in PMPro |
| Runner controls and states | **Migrate All, Resume Migration, Pause, Run, Retry**; **Keep this tab open**; **Requires Pro, No Corporate Data, No Drip Data, Completed, Skipped, Not Found, Processing…** | Free | _PmproStepRunner.vue:9-10,23,34,85-139; _KadenceStepRunner.vue:102 | yes (Kadence, initial state) | partial: Migrate All and Run only |
| Optional **Convert FluentCRM Automations**. Copies source-trigger funnels; keeps published or draft; included in Migrate All | Runner and summary row | Free, requires FluentCRM | _AutomationConversionRow.vue:12-13,222; Support/AutomationConverter.php | no (row absent at this state; action would write) | MISSING |
| Optional **Sync Integrations**. Announces active or trial migrated members so feeds and funnels run; not in Migrate All; no FM emails | Runner and summary row | Free | _IntegrationSyncRow.vue:8-9,217; Support/IntegrationSync.php | yes (row seen, "Run Cleanup & Verify first") | MISSING |
| Stripe subscriptions continue, all 3 sources. Connect same account and add webhook | Warning; Kadence alert **Stripe is not connected** + **Go to Payment Settings** | Pro | _PmproMigration.vue:288; _MemberPressMigration.vue:282; _KadenceMembershipsMigration.vue:284; _KadenceStepRunner.vue:7-15; PmproMigrationService.php:2311; P:app/Hooks/Handlers/MigrationHooksHandler.php:1113 | no (no Stripe subs in source data) | partial: MemberPress only, marked No for others |
| PayPal REST PPCP import | Warning; blocked until connected, then Retry | Pro | MemberPress/Steps/SubscriptionMigrator.php:183-186; _PmproMigration.vue:296-303 | no (no PayPal subs in source data) | covered: all 3 pages (blocked-until-connected missing) |
| Legacy PayPal. Renewals recorded after source deactivated and same account connected; cancel only in PayPal | Warning | Pro | P:MigrationHooksHandler.php:410-453; _PmproMigration.vue:310; _KadenceMembershipsMigration.vue:292; P:app/Services/SubscriptionQueryService.php:1447 | no (no such subs) | partial: omits cancel limit |
| Non-continuable gateways end at next payment date | Warning | Free | PmproAnalyzerService.php:23; KadenceAnalyzerService.php:10-12; _MemberPressMigration.vue:328 | no (no such subs) | partial: MemberPress note only, and wrong remedy |
| Status mapping | Automatic | Free | PmproMigrationService.php:68-76; MemberPress/Steps/MembershipMigrator.php:434-458; MemberPressMigrationService.php:1069-1089; KadenceMigrationService.php:56,482-510 | no (would need import) | partial: tables wrong (see §2) |
| Review screen | **%s Records Migration Completed**, **What was imported**, **Download Migration Log** | Free | _KadenceMembershipsMigration.vue:96-103,178 | no (needs completed run) | partial: page says "Migration Complete" |
| Reset. All 3 sources, WP_DEBUG only | **Reset Migration** | Free | _PmproMigration.vue:170; _MemberPressMigration.vue:181; _KadenceMembershipsMigration.vue:182-188 | no (review screen only; no completed run) | partial: troubleshooting wrong |
| Membership Expiring email note after import | Warning line | Free | _PmproMigration.vue:378 | yes (Kadence) | MISSING |
| Public hook surface, 192 emitted names; about 150 undocumented, including integration feeds, guest, paywall, upgrade | Code only | Free and Pro | scan of `do_action`/`apply_filters` in F: and P: | n/a (code only) | partial: developer-hooks.md |
| Reference pages in navigation | Sidebar | n/a | `.vitepress/config.mjs` has no `/reference` entry | n/a (config) | MISSING: see §2 config |

## 2. PAGE VERDICTS

Wrong facts carry IDs W1 to W48.

### docs/settings/migration/index.md: rewrite-heavy
Wrong facts:
- W1 "Detected or Not Detected badge" → only **Not Detected** exists (Migration.vue:29-31; live).
- W2 "Protected pages, posts, and access rules are not migrated" → Access Groups step imports them in all 3 (_PmproStepRunner.vue:183; _MemberPressStepRunner.vue:181; _KadenceStepRunner.vue:194).
- W3 table: Stripe live-transfer "No" for PMPro and Kadence, and checklist "MemberPress + Pro only" → Stripe subscriptions carry over for all 3 (_PmproMigration.vue:288; _KadenceMembershipsMigration.vue:284; PmproMigrationService.php:2311).
- W4 "each step must complete before the next begins" → dependency graph, not linear; some steps run independently, for example PMPro subscriptions and orders only need members (PmproMigrationService.php:56).

Stale guidance: pages say deactivate after verification and keep it a few weeks; the UI says deactivate as soon as migration and optional steps are done, because later changes are not imported (_KadenceMembershipsMigration.vue:274). Stale labels: "Run again" tip vs "each step runs once, and completed steps are skipped". Prose has dropped punctuation at lines 3 and 51 (removed em dashes).

Missing: Before You Migrate panel, Pause/Resume/Retry, Convert FluentCRM Automations, Sync Integrations, what is never migrated, gateway outcomes table, Membership Expiring email note.

### docs/settings/migration/from-paid-memberships-pro.md: rewrite-light
Wrong facts:
- W5 "Member login/account redirect settings are migrated" → login redirect is listed as not migrated (_PmproMigration.vue:376).
- W6 Corporate and Drip steps marked (Pro) → not Pro-gated (_PmproStepRunner.vue:185-186; `PRO_ONLY_STEPS`, PmproMigrationService.php:38).
- W7 status `inactive` → Expired → Cancelled (PmproMigrationService.php:73). Table also omits `changed` and `admin_changed` → Expired, `paused` → Suspended (:74-76).
- W8 Data Map table of 3 rows said to show "exactly what will be migrated" → 11 rows (_PmproStats.vue:26-38).

Stale labels: "Migration Complete" → "%s Records Migration Completed". Missing: Stripe section, not-migrated list, optional steps, legacy PayPal cancel limit.

### docs/settings/migration/from-memberpress.md: rewrite-light
Wrong facts:
- W9 "MemberPress is the only source that supports a live payment subscription transfer" → same flow for PMPro and Kadence (see W3).
- W10 "transfers ... by updating its metadata in Stripe" → no Stripe write in the import handler (P:MigrationHooksHandler.php:252-410, no `metadata` hit in the file). UI asks only for same account plus webhook.
- W11 Data Map `Transactions (Pro)` → Orders → Transactions (_MemberPressStats.vue:31).
- W12 "Members on those payment methods will need to re-subscribe" as a requirement → membership ends when the paid period runs out; cancel at gateway (_MemberPressMigration.vue:328).
- W13 status `pending` → Pending → falls through to Cancelled (MembershipMigrator.php:458; MemberPressMigrationService.php:1075).
- W14 status table states 1:1 maps → paid-up `suspended` and `cancelled` import as Active; lapsed `active` imports as Expired (MembershipMigrator.php:441-455).
- W15 "Set up Access Groups ... always manual" → rules import as Access Groups (_MemberPressStepRunner.vue:181).

Stale labels: **Validation Warnings** → **Before You Migrate**; "Migration Complete". Missing: full not-migrated list (:368), Vaulting and no-ID cases, optional steps, PayPal blocked until connected.

### docs/settings/migration/from-kadence-memberships.md: rewrite-light
Wrong facts:
- W16 status `disabled` → Suspended → Cancelled (KadenceMigrationService.php:486).
- W17 status `pending` → Pending → Cancelled (:490; Steps/MembershipMigrator.php:187-191).
- W18 `cancelled` → Cancelled → stays Active until expiry, since `cancelled` is an access-granting status (:56,494-510). `trial` also missing from the table.
- W19 Data Map "exactly what will be migrated" of 3 rows, and it lists Active Members and Total Memberships only → includes Restricted Posts and Terms, Drip Schedules, Payments → Orders and Transactions, Subscriptions, Group Members (_KadenceStats.vue; live).
- W20 "Set up Access Groups ... always manual" → step 1 imports them (_KadenceStepRunner.vue:194; live).

Unresolved, not counted: the note "updated its integration name in v1.1.0" conflicts with installed header 1.0.0 (Q1). Stale labels: **Validation Warnings**; "greyed out" → **No Drip Data**, **No Corporate Data** (live). Missing: Stripe section and **Stripe is not connected** alert, payment plan and group invite warnings, Not migrated list (:412), optional steps. The "RCP Ultimate Member addon" note has no support in migration code (grep: 0 hits); verify or remove.

### docs/levels/pricing-paywalls.md (integration angle): rewrite-heavy
Wrong facts:
- W21 "Step 1: In Add Pricing, open Pricing Type and select Paywalls" → Pricing Type is set on the level (_AddLevelDialog.vue:98; EditLevel.vue:72); the modal uses it as `lockedCategory` (_AddPaywallModal.vue:114,211; live, no selector on level 1).
- W22 Options "Paywalls" and "Native Payment" → **FluentCart, FluentForms, Paymattic, WooCommerce, Native Payment** (PricingTypeSelect.vue:234-248).
- W23 Row menu **View Product, Edit Product, Delete Product, Direct Checkout** → inline **View**; menu **Edit, Move up, Move down, Copy Checkout Link, Delete** (PricingPlanRow.vue:32-80).
- W24 Native = "Built-in Stripe" → Stripe and PayPal (PricingTypeSelect.vue:234-239).

Stale labels: **Fluent Members → Levels** → **Membership Levels**; groups **Paymattic** → **Paymattic Forms**, **WooCommerce** → **WooCommerce Products** (paywallPricingMixin.js:9-27). Lines 37 and 63 use invalid containers (`::: Info`, `:::Important Note`), and the 63-65 note is about Access Groups, not paywalls.

Missing: one provider per level (MembershipLevel.php:168; PaywallController.php:93 "This level does not use FluentCart pricing"), so the "add more than one paywall" line needs that limit; inline product create, one object per level, refund and cancel revocation, guest and repurchase rules, Woo COD rule, per-provider detail. Move those to new pages.

### reference/developer-hooks.md: rewrite-heavy (or retire, Q5)
Wrong facts:
- W25 `{src}` = `fc` for FluentCart → no `fc_` hooks exist. Only `fluent_members/fluentcart_payment_skipped` (FluentCart/Paywalls.php:643).
- W26 WooCommerce emits the set → only `woocommerce_payment_skipped` (P:.../Woocommerce/Paywalls.php:733).
- W27 Paymattic has `_subscription_activated` → not emitted (Paymattic/Paywalls.php scan). FF and Paymattic each have their own set; FF `ff_payment_processed` comes via `$options['processed']` (FluentForms/Paywalls.php:169,1035).
- W28 "No global refund event" → `fluent_members/native_payment_refunded` fires for native gateways (P:app/Services/Payments/Refund.php:421). Host-plugin refunds use per-source hooks.
- W29 `membership_renewed` listed as Pro-only → also emitted by free (F:app/Services/MembershipService.php:1170; P:app/Services/MembershipPaymentSyncService.php:682).
- W30 `{source}/import_order` and `import_transaction` for all 3 → Kadence has `import_payment` and `import_subscription` only (P:MigrationHooksHandler.php:52-53).
- W31 `check_stripe_configured` Kadence only → also MemberPress (MemberPressMigrationService.php:701).
- W32 "Legacy code uses `fluent-members/`" → no `fluent-members/` hook is emitted in either plugin (scan).
- W33 `refund_payment_{gateway_key}` documented as a dispatcher, with a working Slack example → only `add_action` exists (P:app/Services/Payments/BasePaymentMethod.php:95); no `do_action` for it in app/ of either plugin (grep), so the example never fires.

Stale labels: top menu list "Levels ... Orders, Settings" → **Membership Levels**, **Billing** (AdminMenuHandler.php:129-148), and Settings is not one of the items. "Here's what you'll learn" breaks the writing rules.

Missing: `membership_expiring`, `membership_plan_changed`, `membership_upgrade_completed`, `native_subscription_synced`, `membership_not_stored`, `paywall_added/removed`, `paywall_event_failed`, `guest_*`, `integration/*`, `shortcode_*`, `manager/*`, `user_deleting`.

### reference/chain-map.md: rewrite-light
Wrong facts:
- W34 Chain 11 "only three notifications: Welcome, Expiry, and Suspension" → **Welcome Email, Membership Expiring, Membership Expired** (F:app/Services/Email/EmailNotifications.php:32-60).
- W35 "every guide page lists its chain(s) in a `Part of the … chain` callout" → no other page does (grep: 1 hit, this page).
- W36 Chain 9 step 5 "Refund fires through `fluent_members/refund_payment_{gateway}`" → that hook is never fired (see W33).

To verify with the Access Groups audit: Chain 3 lists 5 actions; UnauthorizedAccess.vue:200-203 has 2 base actions and live shows **Show a Message**.

Stale labels: "Orders" → **Billing** (Chains 9, index). Missing: FluentCRM's 4 native triggers in Chain 11, which only offers hooks (Bootstrap.php:34-37; live); WooCommerce in Chain 2 (P:.../Woocommerce/Paywalls.php:43-44); chain for upgrades, FluentCommunity feeds, guest paywall purchase, optional migration steps in Chain 10. Mentions internals (`AccessHandler`, pivot) that end users do not need.

### reference/troubleshooting.md: rewrite-light
Wrong facts:
- W37 "Reset Migration State ... isn't available for PMPro or MemberPress" → **Reset Migration** on all 3, WP_DEBUG only (_PmproMigration.vue:170; _MemberPressMigration.vue:181; controllers set `debug_mode`).
- W38 "Subscriptions carried over ... can't be cancelled from this screen at all" → Cancel depends on the rail. Stripe and REST PayPal are cancellable; legacy PayPal is not (P:app/Services/SubscriptionQueryService.php:1439-1453). Contradicts all 3 migration pages.
- W39 PayPal webhooks "set up manually ... rather than automatically" → connect attempts automatic setup, and a setup route exists (P:app/Http/Controllers/PayPalSettingsController.php:52,114,128; P:app/Http/Routes/api.php:38).

Imprecise, not counted: step 2 names `wp_mepr_members`, while detection checks `mepr_transactions` (MemberPressAnalyzerService.php:17). Stale labels: "Settings → Email Notifications" → Settings → Email Configuration → Email Notifications; "Levels → edit" → Membership Levels. The "wizard says 0" heading should cover the **Not Detected** state. "What's Next?" closing breaks the page rules. Verified correct: cron hook, batch filter, `.fmem_partial-content-overlay`, `asset_listed_slugs`.

Missing: paywall grant failures (`membership_not_stored`, paywall index), guest email refusal, Level Integrations tab absent, FluentCommunity not syncing.

### docs/help-support/faq.md: rewrite-heavy
Wrong facts:
- W40 WordPress "6.0+", tested "6.9" → Requires 6.3, Tested up to 7.1 (installed plugin header and readme.txt:4-6).
- W41 Protectable content includes Fluent Forms, Paymattic forms, FluentCommunity spaces → restriction types are Core, FluentCart, WooCommerce only (live `ag_types`; `get_integrations` registered only by FluentCart/Connector.php:16 and P:.../Woocommerce/Connector.php:15). FluentCommunity access is granted by feeds.
- W42 Emails "Expiry Notification", "Suspension Notification" → Membership Expiring, Membership Expired; no suspension email (EmailNotifications.php:32-60; live crawl `settings_email-notifications`).
- W43 Stripe webhook `/wp-json/fluent-members/v2/stripe-webhook` → `?fluent_members_payment_listener=1&payment_method=stripe` (P:app/Services/Payments/Stripe/Stripe.php:50).
- W44 "Three: ... Restrict Content Pro" → card is **Kadence Memberships** (MigrationRegistry.php:57).
- W45 Stripe carry-over "PMPro and MemberPress" → also Kadence (_KadenceMembershipsMigration.vue:284).
- W46 "Native recurring requires Pro + Stripe" and "native Stripe" throughout → PayPal too (PricingTypeSelect.vue:234-239).
- W47 Six statuses → `upgraded` also exists (MembershipService.php:658).
- W48 Drip "on the Membership Level" → Access Group editor (AccessGroups/Components/ContentDripping.vue; live crawl).

Stale labels: **Levels**, **Transactions screen**, **Orders** → **Membership Levels**, **Billing**. Line 99 has an em dash. Missing: FluentCRM triggers, FluentSupport widget, FluentCommunity feeds, upgrade paths, PayPal, guest checkout.

### docs/help-support/get-support.md: keep (light cleanup)
No checkable wrong fact. External account URL not verified (Q6). Line 29 is a sign-off and step 4 "Support Hours" is filler. Should link to Troubleshooting.

### index.md (home): rewrite-light
Not counted separately: "Content Restriction Pro" (line 49) is a wrong name, the third variant; "Payment Settings (Stripe)" omits PayPal; "Orders (Pro)" → Billing; Reference card links to glossary and promises shortcodes and merge tags, which are not in reference/; "walks Sara" jargon. No integrations card.

### changelog.md: keep, reconcile
Top entry v1.1.0 (July 08, 2026) vs installed Version 1.0.0 in both plugins (Q1). No mention of Level Integrations, Upgrade Paths, guest checkout, Permissions.

### .vitepress/config.mjs: fix
No `/reference/` sidebar and no nav or sidebar item for reference/chain-map, developer-hooks, troubleshooting, membership-statuses. The only `/reference` links come from faq.md, glossary.md and chain-map.md. CLAUDE.md's claim of a `/reference/` sidebar object is false at this commit. reference/membership-statuses.md and docs/members/statuses.md overlap.

## 3. NEW PAGES NEEDED

Proposed new category `integrations`, wired into `docsSidebar`:

- `docs/integrations/index.md`: map of what each plugin does, Free/Pro, install requirement.
- `docs/integrations/fluentcart.md`: paywall, inline product create, restriction types, **Membership Restriction** widget, product Integrations feed, **Membership** dashboard tab, refund and subscription sync.
- `docs/integrations/fluent-forms.md`: form rules, lifecycle, checkout link.
- `docs/integrations/paymattic.md`: same, with offline handling.
- `docs/integrations/woocommerce.md` (Pro): paywall, restriction types, storefront behaviour, Subscriptions, instant checkout, My Account tab, COD rule.
- `docs/integrations/fluentcrm.md`: 4 triggers, conditions, migration conversion.
- `docs/integrations/fluent-support.md`: widget.
- `docs/integrations/fluent-community.md`: feed fields, triggers, revoke behaviour.
- `docs/levels/integrations.md`: Integrations tab, feed list and status. Could merge into fluent-community until a second provider exists.
- `docs/settings/migration/after-migration.md` or a section in index: Convert FluentCRM Automations, Sync Integrations, gateway outcomes table.

Keep pricing-paywalls.md as the shared flow and link out per provider.

## 4. QUESTIONS

- Q1 Version: installed free and Pro headers say 1.0.0 (`fluent-members.php:6`, `fluent-members-pro.php:6`, readme `Stable tag: 1.0.0`), changelog tops out at v1.1.0, and from-kadence-memberships.md cites v1.1.0. Which version do docs and changelog target?
- Q2 FluentCart has two grant paths: paywall (Paywalls.php:41,118) and product feed (FluentCartConnector.php:53-115, Paywalls.php:131 `grantFeedLevels`). Which should docs recommend, and is using both on one product supported?
- Q3 Corporate imports run without Pro (_PmproStepRunner.vue:185; _MemberPressStepRunner.vue:187) but corporate levels are locked without Pro (_AddLevelDialog.vue:194-196). Should docs present corporate migration as Free?
- Q4 FluentCommunity checkbox says "Refund or Subscription Access Expiration", its tip says "cancellation or access expiration" (Connector.php:134-135), code also revokes on suspension (LevelIntegrationEventListener.php:46-50). Is suspension revocation intended?
- Q5 Hooks page scope: home links Dev Docs at developers.fluentmembers.com (index.md:14), and 150 hooks are undocumented here. Keep a curated list here, or move it to Dev Docs?
- Q6 Support channel: get-support.md sends users to wpmanageninja.com/account, the nav site is fluentmembers.com (config.mjs nav). Which is current?
- Q7 Migration.vue:61-63 waits for a documentation URL. Which page should **The Documentation** link to?
