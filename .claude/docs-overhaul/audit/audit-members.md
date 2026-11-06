# Audit: Members, portal, shortcodes, front end, login popup, privacy

Paths: `F:` = src-free (9afdb75b), `P:` = src-pro (59d8187), relative to `app/` unless they start with `resources/`. `MD` = `resources/admin/Modules/Members/MemberDetails.vue`. `ML` = `.../Members/MembersList.vue`. `MS` = `.../Members/MemberSettings.vue`. `PM` = `resources/public/components/MembershipManage.vue`. `PL` = `resources/public/components/MembershipList.vue`. `CM` = `resources/public/components/CorporateManagement.vue`.

Live limits on this site (http://localhost:10053): admin holds 0 memberships and no member password is available, so the portal list with rows, Manage page and all portal actions could not be driven. No corporate level holder exists (scan of all 60 holders found no owner or seat). Login Popup is `enabled: no`, and it was not turned on (view only), so the popup front end and its fields were not live-checked. No published page holds a levels shortcode (REST search returned none; `page 653` in the brief is a FluentPlayer page, not pricing). Demo rows store provider `native` (47) and `manual` (13); no code path writes `native`. Evidence captures: `audit-m.json`, `audit-m2.json`, `audit-m3.json`, `audit-m/*.png` in the scratchpad.

## 1. FEATURE ROWS

Doc column: `covered`, `partial`, or `MISSING`, followed by the page.

| Feature/option group | UI location, exact label | Free/Pro | Source file:line | Live-checked | Doc page § |
|---|---|---|---|---|---|
| Members list columns: ID (sortable), User, Membership Level (2 tags then +N dropdown), Role, Registered | **Members** | Free | F:resources/admin/Modules/Members/MembersList.vue:38-103 | yes | partial, members/index § Understanding |
| Tabs: **Members** (default, holders only), **Active** (status active only), **No Membership** | Members | Free | ML:143-148; F:Http/Controllers/MembersController.php:35-47 | yes | partial, members/index § Filter Tabs |
| **More** dropdown: Expired, Trial, Cancelled, Upgraded, Suspended | Members | Free | ML:149-155 | yes | partial, members/index § Filter Tabs |
| Search (icon toggle, placeholder **Search members by name or email**; also matches username) | Members | Free | ML:18,24; MembersController:49-57 | yes | partial, members/index § Search |
| Pagination, default 10, shown only when total exceeds per page | Members | Free | ML:110,159-176 | yes | covered, members/index § Pagination |
| Member header: avatar, name, email, **Registration Date:**, role badge | Member Details | Free | MD:33-50 | yes | covered, detail § Viewing |
| Membership table columns: Plan, Level (links to level), Provider, Start Date, Expires (date or **Lifetime**), Amount, Status | Member Details | Free | MD:77-178 | yes | partial, detail § Table |
| Expiry colouring (expired, expiring within 7 days) | Expires cell | Free | MD:402-415 | no (not asserted visually) | MISSING |
| Corporate rows on detail: **Corporate Child**, owner name as Provider link, **Included** amount tooltip, seat usage link `N / M seats used`, row click opens team | Member Details | Pro data, free UI | MD:80-100,129-136,163-167,419-433,454-462 | no (no corporate data) | MISSING |
| Row actions: **Refund** (when refundable transaction), **Cancel Subscription**, **Suspend**/**Suspend Access**, **Reactivate**/**Reactivate Access**, **Cancel** | Row menu | Free; Refund and Cancel Subscription Pro | MD:189-228,477-518 | yes (Refund, Suspend, Cancel, Reactivate; none on expired, cancelled, pending) | partial, detail § Row Actions |
| **Add Membership** dialog titled **Membership Level**: accordion, `N levels · N plans available`, plan cards (#id, Active tag, level, trial pill, setup fee pill, amount, type), **Assign** / **Already Assigned**, empty states with **Add pricing plan**, **Manage Membership Levels** | Member Details | Free | MS:6-97 | yes (opened, not saved) | partial, adding-manually § How to |
| Manual grant rules: provider always `manual`, status active, blocked if user already holds level, expiry from plan (trial days first, else interval, one-time none) | Add Membership | Free | F:Services/MembershipService.php:62-72,404-427,1066-1072; F:Http/Controllers/MembershipUserController.php:172-192 | no (would write data) | partial, adding-manually § How Expiry |
| Status set in code: active, trial, suspended, cancelled, expired, upgraded (access = active, trial) | Everywhere | Free | MembershipService:1054-1063; F:Models/MembershipUser.php:17 | partial (live has a seeded pending row) | partial, statuses, reference/membership-statuses |
| Hourly expiry cron, daily expiring check | Background | Free | F:Hooks/Handlers/MembershipCronHandler.php:34-40,63-100 | no (cron) | covered, statuses, reference |
| Auto suspend when subscription goes past_due, unpaid, incomplete, failed, paused | Background | Pro | P:Services/MembershipPaymentSyncService.php:158-169 | no (needs gateway events) | MISSING |
| Suspend: confirmation, stores prior status; native sub text says billing continues | Row menu | Free | MD:617-628; MembershipService:628-652 | no (would change data) | partial, suspending § Suspend |
| Reactivate: restores trial or active; seat blocked when owner not live or seats full | Row menu | Free | MD:499-509,648-660; MembershipUserController:300-312,409-423 | yes (item seen, not run) | partial, suspending § Reactivating |
| Cancel: confirmation **Cancel Membership**, **Yes, Cancel**; PayPal-managed warning; hidden for gateway-managed Stripe sub | Row menu | Free | MD:486-492,510-512,528-534,679-689 | yes (item seen, not run) | partial, suspending § Cancel |
| **Cancel Subscription** dialog: **Cancellation Mode**, **End of Billing Period** (default), **Cancel Immediately** | Row menu | Pro | F:resources/admin/Modules/Members/CancelSubscriptionDialog.vue:14-59,108 | no (no live sub in sample) | MISSING in members pages |
| Refund dialog from row (**Refund Payment**, max amount, in-gateway note) | Row menu | Pro | F:resources/admin/Modules/Members/RefundPaymentDialog.vue:9-106 | no (not opened) | partial, detail links transactions/refunds |
| Corporate Members screen: tabs All, Active, Cancelled, Expired, Suspended; search **Search by name or email**; columns Member, Role, Status, Joined, Start Date, Expires; seat label in breadcrumb; row opens member | `/members/:id/corporate/:membershipId` | Pro data, free UI | F:resources/admin/Modules/Members/CorporateMembers.vue:17,28,51-88,160-181; F:resources/admin/routes.js:288 | no (no corporate data) | MISSING |
| Seat maths: `max_members` includes owner; free seats exclude pending invites | Everywhere | Pro | F:Models/MembershipLevel.php:42; MembershipService:504-523; P:Services/CorporateMembershipService.php:308-311 | no | partial, corporate-seat-invites |
| Cascade: suspend, cancel, expire mirror; reactivate restores all suspended and marker-cancelled seats up to free seats | Background | Free | MembershipService:695-732,753-847 | no | partial, suspending § Corporate, statuses § Corporate |
| Plan change: seats move to new corporate parent; moving to non-corporate ends seats | Background | Free | F:Services/PlanChangeService.php:29-53 | no | MISSING (docs say children become upgraded) |
| Portal page generator: **Generate Portal Page**, select, + (Create), `[fluent_member_portal]` badge, **Edit**, **View** | Settings → General Settings | Free | F:resources/admin/Modules/Settings/GeneralSettings.vue:52-107; F:Http/Controllers/SettingsController.php:222 | no (would create page; screen in another audit) | partial, portal/setup § Option A |
| `[fluent_member_portal]`: no attributes; logged out shows **Please log in to view your memberships.** + **Log In** | Front end | Free | F:Hooks/Handlers/MemberPortalHandler.php:17-44 | yes | covered, portal/setup, what-members-see |
| Portal header: avatar, name, #ID, email, **Registered at**, three-dot menu **Logout** (hidden when embedded) | Portal | Free | F:resources/public/components/PortalHeader.vue:3-25; PL:126 | yes | MISSING |
| **Stats Overview** cards: Active Membership `N of N`, Next payment, Next Expire, Total Spent | Portal | Free | PL:24-27; F:Services/PortalStatsService.php:46-51,73,82,113 | yes (admin, zero data) | MISSING |
| **Your memberships** list: level + #id, badge (`Trial - N days`), Started, provider, expiry label, price + caption, **Manage**; pagination 5 per page (sizes 3, 5, 10, 20, 50) | Portal | Free | PL:37-91,121,137-145; F:Http/Controllers/MemberPortalController.php:220-255; PortalPagination.vue:109 | partial (empty state only) | partial, what-members-see § Each Card |
| Empty state **You don't have any memberships yet.** (no pricing link) | Portal | Free | PL:94-96 | yes | partial, what-members-see, setup (wrong text) |
| Manage page: breadcrumb **Members Profile**, **Membership Details** (Membership Level, Plan, Started, Access until/Expired on, Provider, Amount, Status) | Portal `#/membership/:id` | Free | PM:25-28,86-135,263-286 | no (admin has no rows) | MISSING |
| Billing fields: Payment Method, Payment Method Update, Billing Status, Next Billing Date / Cancellation Date | Manage page | Pro | PM:114-129,402-427; P:Hooks/Handlers/PaymentMethodsHandler.php:494-518 | no | MISSING |
| **Transaction Details** table: Date Paid, Payment Method, Plan, Type, Amount, Status (last 50) | Manage page | Pro | PM:140-185; PaymentMethodsHandler:892-905 | no | MISSING |
| **More Action** menu: **Cancel Subscription**/**Cancel Membership**, **Upgrade Plan**, **Update Payment Method** | Manage page | Free for Cancel; rest Pro | PM:40-61,334-361,446-448 | no | MISSING, cancelling describes three-dot icon |
| Status notices: suspended, paused, past due, scheduled cancel, PayPal-managed + **Open PayPal** link | Manage page | Mixed | PM:74-82,471-496 | no | MISSING |
| Portal cancel: plain confirm (**Yes, Cancel**) or subscription modal with member-chosen mode, default end of period | Manage page | Free plain; Pro modal | F:resources/public/components/MembershipCancellationDialog.vue:17-114,148; PaymentMethodsHandler:856-869 | no | partial, cancelling |
| **Upgrade Plan** dialog (**Your current plan**, **Choose a plan to upgrade to**, credit line) | Manage page | Pro | F:resources/public/components/UpgradeMembershipDialog.vue:18-96,282-298; PM:377-381 | no | MISSING in members pages |
| **Update Payment Method** dialog (Stripe only): **Update Card**, **Go Back**; collects open invoice; 5 tries/hour per customer | Manage page | Pro | F:resources/public/components/UpdatePaymentMethodDialog.vue:10-42; P:Services/Payments/UpdateCustomerPaymentMethod.php:215-225,380-383,414-423; P:Services/Payments/Stripe/Stripe.php:436-447 | no | partial, updating-payment-method |
| **Renew Membership** button: resume scheduled cancel, or expired sub to checkout; Stripe and PayPal | Manage page | Pro | PM:31-39,547-578; P:Services/Payments/Renewal.php:122-180,215-252; P:Services/Payments/PayPal/PayPal.php:430-464 | no | partial, renewing-a-failed-subscription |
| Corporate panel: **Team Members**, `N / M seats · K pending`, over-limit alert, **Invite Member** + **Send Invitation**, tabs All/Active/Pending/Cancelled, search, columns ID/Member/Role/Joined/Status, seat menu **Cancel** | Manage page | Pro | CM:5-142,279-323; P:Http/Controllers/CorporatePortalController.php | no | partial, corporate-seat-invites |
| Invitation row menu: **View invitation**, **Resend invitation**, **Cancel invitation**; details dialog | Team panel | Pro | CM:108-123,176-214; CorporatePortalController:56-101 | no | MISSING |
| Free fallback: **Corporate membership management requires Fluent Members Pro.** | Manage page | Free | PM:198-202 | no | partial (doc says no panel) |
| Invite rules: 1/hour per email, seat check, already in team, optional daily limit filter, 3-day expiry filter | Team panel | Pro | CorporateMembershipService:25,149-161,286-313,333-337 | no | partial, corporate-seat-invites |
| Join page `?fmem_join=TOKEN`: login state, **Accept Invitation**, **Go to Portal**, email-match error, expired error | Front end | Pro | P:Hooks/Handlers/CorporateJoinHandler.php:28-121; P:Views/public/corporate-join.php:19-53; CorporateMembershipService:566-575 | no | partial, corporate-seat-invites § Accepts |
| Portal embedded in FluentCart customer dashboard (**Membership** tab) | FluentCart account | Free | F:Modules/Integrations/FluentCart/CustomerPortalIntegration.php:25-35 | no (not opened) | MISSING |
| Portal embedded in WooCommerce My Account (**Membership** endpoint) | Woo account | Pro | P:Modules/Integrations/Woocommerce/CustomerPortalIntegration.php:16-49 | no | MISSING |
| `[fluent_members levels= level= message= button_text= button_url=]`: gate content; empty levels attr fails closed; no attr = any level; admins pass; falls back to Unauthorized defaults | Shortcode | Free | F:Hooks/Handlers/ShortcodeHandler.php:26-37; F:Services/RestrictionShortcodeService.php:78-118 | no (no page uses it; not created) | MISSING |
| `[fluent_membership_level id= show_unavailable=0]` | Shortcode | Free | ShortcodeHandler:42-51; F:Views/public/membership-level.php | no (no page) | partial, levels/creating, levels/index (id only) |
| `[fluent_membership_levels ids= columns=3 button_text= login_text= show_title=1 show_description=1 show_unavailable=0]`; columns clamp 1-4; empty ids = all active up to 20 | Shortcode | Free | ShortcodeHandler:56-76; F:Services/MembershipLevelsRenderer.php:55-56,366 | no (no page) | MISSING |
| Generated pricing page: **Generate Pricing Page**, content `[fluent_membership_levels]` | General Settings | Free | GeneralSettings.vue:115; SettingsController:322 | no (would create page) | partial, settings/general (other audit) |
| Pricing cards: plan, level, price, summary, setup fee, trial, **Choose plan** / **Login to Purchase**; admin-only hidden-level note; **No membership levels are available.** | Front end | Free | F:Views/public/membership-levels.php:15-110; F:Views/public/membership-levels-hidden-note.php:17-30; MembershipLevelsRenderer:1060 | no (no page) | MISSING |
| **Membership Levels** Gutenberg block (ids, columns, buttonText, loginText, showTitle, showDescription; no show_unavailable) | Block editor | Free | F:Modules/Gutenberg/MembershipLevelsBlock.php:24-53 | no | MISSING |
| Checkout page: summary, **Due today**, **Setup Fee**, **Free Trial: N days**, method selector, test mode notice, submit **Pay**/**Start Free Trial**/**Confirm Upgrade**, **Sign In to Continue**, **Checkout Unavailable** | Front end `?fmem_checkout=1` | Native = Pro | F:Hooks/Handlers/CheckoutHandler.php:26-130; F:Views/public/checkout.php:38-73,119-127,159-356 | yes (visitor, Starter Monthly, no submit) | partial, levels/pricing-native § Checkout |
| Guest checkout: **Your Details**, Name, Email, `We'll create your account and email you a link to set your password.`; no admin setting, filter `fluent_members/guest_checkout_enabled`; needs Pro for native; existing email told to sign in at init; role subscriber | Checkout | Pro for native; paywall per provider | F:Views/public/checkout.php:277-302; F:Hooks/Handlers/GuestCheckoutHandler.php:36-93; F:Services/GuestIdentityService.php:9,184-186,272-295; P:Services/GuestCheckoutService.php:47-59 | yes | MISSING (pricing-native says prompted to log in or register) |
| Success page **Congratulations!**, `You're now a %s member`, fields, **Go to Portal**; processing page **We're confirming your checkout** | Front end | Native = Pro | F:Views/public/checkout-success.php:24-82; F:Views/public/checkout-processing.php:23-42 | no (needs payment) | MISSING |
| Login Popup master toggle **Login Popup Settings**, default off; fields hidden until on | Settings → Login Popup | Free | F:resources/admin/Modules/Settings/LoginPopup.vue:15-28; F:Functions/Utility.php:620 | yes | covered, login-popup § Enabling |
| Fields: Title, Custom Message, Button Color, Button Text Color, Button Text, Button Size, Register URL, Register Link Text, Lost Password URL, Lost Password Link Text; defaults Login Required, Please log in to access this content., Log In, #0073aa, #ffffff, Register here, Lost your password? | Settings → Login Popup | Free | LoginPopup.vue:31-180; Utility:617-631 | yes for defaults via REST; fields not rendered (off) | covered, login-popup § Configuring |
| **Auto Open Popup**, default on | Settings → Login Popup | Free | LoginPopup.vue:189-196,218; Utility:621 | yes (value `yes`) | partial, wrong default |
| Front end when on: singular restricted page for guests, content replaced by notice with Title, Message and button; popup auto opens or opens from button; **Username or Email**, **Password** with show toggle, **Remember me**, links, close, reload on success | Front end | Free | F:Hooks/Handlers/LoginPopupHandler.php:45-95; F:Views/public/login-popup.php:13-66; F:resources/js/public/login-popup.js:70-98,234-238 | no (setting off) | partial, login-popup § How |
| Popup also opens from restriction CTA and partial-content buttons when off; return from registration reopens with `fmem_login=1` | Front end | Free | F:Services/RestrictionRenderer.php:154,309,381-398; F:Services/PartialContentService.php:274; login-popup.js:52-68; LoginPopupHandler:31-34 | no | MISSING |
| Login limits: 5 tries per 5 minutes per IP; fixed error **Invalid username or password.** | Front end | Free | LoginPopupHandler:162-169,191-194 | no | MISSING |
| Redirect action wins over popup (redirect runs later on `template_redirect`) | Front end | Free | LoginPopupHandler:42; F:Hooks/Handlers/AccessHandler.php:48,411-436 | no | MISSING |
| Personal data export groups: Membership Activity, Memberships, Membership Orders, Membership Subscriptions, Membership Transactions, Corporate Membership Seats | Tools → Export Personal Data (**FluentMembers**) | Free | F:Hooks/Handlers/PrivacyHandler.php:48-59,556,578-602 | no (would write data) | MISSING |
| Personal data erase: anonymises activity, strips billing details except live subs (message), keeps records for accounting (message) | Tools → Erase Personal Data | Free | PrivacyHandler:66-73,202-235,251,394-410 | no | MISSING |
| Pro export/erase: invites received and sent, Updated Payment Methods; deletes pending invites; Stripe/PayPal copy notice | Tools (**FluentMembers Pro**) | Pro | P:Hooks/Handlers/PrivacyHandler.php:37-62,262-271,284-294,535 | no | MISSING |
| Deleting a WP user cancels and deletes membership rows; Pro stops billing | Users → Delete | Free + Pro | F:Hooks/Handlers/UserHandler.php:65-83; P:Hooks/Handlers/PaymentMethodsHandler.php:466-491 | no | MISSING |

## 2. PAGE VERDICTS

Each wrong fact has an ID (`W#`). Line numbers are doc lines.

### docs/members/index.md | rewrite-light
- W1 L3, L7: "all WordPress users" → default tab lists holders only (ML:143; MembersController:39-42). Live: Total 60 of 101 users.
- W2 L24: Active includes `trial` → status `active` only (MembersController:35-37); Trial is its own item (ML:151).
- W3 L25: Expired is a top-level tab → it sits under **More** (ML:144-150). Live confirmed.
- W4 L27: **More views ▾** with Pending, Cancelled, Suspended, Upgraded → **More** with Expired, Trial, Cancelled, Upgraded, Suspended; no Pending (ML:149-155). Live confirmed.
- W5 L11: "No Membership is displayed" → `--`, or blank on the Members tab (ML:89). Two tags then `+N` not mentioned (ML:51,59).
- W6 L31: field in the corner labelled **Search by name or email** → search icon opens a field, placeholder **Search members by name or email** (ML:18,24); also matches username (MembersController:53).
- W7 L35: bottom always shows pagination → only when total exceeds per page (ML:110,174).
- Stale labels: relative link `./detail` L15.
- Missing: nothing else.

### docs/members/detail.md | rewrite-light
- W8 L21, L23: combined "Plan & Level", "Start Date & Created" → separate **Plan**, **Level**; **Start Date** only, no Created (MD:77,106,144).
- W9 L24: "N/A or blank" for lifetime, expired, cancelled → **Lifetime** when no date, otherwise the date (MD:153-156). Live cancelled row shows a date.
- W10 L22: "native payment" provider → labels FluentCart, WooCommerce, FluentForms, Paymattic, Corporate, Manual, else capitalised raw value; seats show owner's name (MD:129-139,463-476).
- W11 L39: Cancel on Pending → only active/trial and not on gateway-managed Stripe subs (MD:486-492,510-512). Live pending row has no menu.
- Stale labels: status list omits Upgraded L26; note L43 names only Cancel.
- Missing: **Reactivate**, **Cancel Subscription**, **Suspend Access** variants, corporate seat cells, seat link to team screen. Relative links L29, L38.

### docs/members/adding-manually.md | rewrite-light
- W12 L18: **Add Membership** modal → header **Membership Level** with `N levels · N plans available` (MS:6-8). Live confirmed.
- W13 L19: **+ Assign Member**, card shows provider → **Assign**; card shows name, #id, Active tag, level, trial and setup fee pills, amount, type; no provider (MS:62-93). Live confirmed.
- W14 L56: levels without plans do not appear → shown with `0 plans`, **No pricing plans yet**, **Add pricing plan** (MS:49-50). Live: Free Member.
- W15 L57: row may be Pending, choose native plan → grants are always `manual`, status active, for any plan (MembershipService:62-66).
- W16 L44, L46: recurring expires after one interval, separate "Trial" plan type → when trial days exist expiry is trial end only (MembershipService:1070-1072,417-426).
- Missing: **Already Assigned**, disabled Assign when the user holds the level, 409 error text (MS:84-88; MembershipUserController:188-192), Assign Members from the level's Members tab.
- Conventions: `####` heading L5, relative links L8, L13, `:::` blocks instead of `> [!Note]`.

### docs/members/statuses.md | merge into reference/membership-statuses.md (keep one status page), then rewrite-light
- W17 L11: `pending` means payment awaiting provider → not in code status set; no membership write path found (MembershipService:1054-1063; MembershipUserController:138,272). See Q1.
- W18 L13: suspended = admin pause → also automatic on failed payment states (P:MembershipPaymentSyncService:158-169).
- W19 L29: Pending has Cancel → no menu (MD:483-492,510). Live.
- W20 L32: Suspended has Cancel → only Reactivate (MD:510-512). Live.
- W21 L27-33: Refund tied to status → tied to refundable transactions, any status (MD:477-479,519-521).
- W22 L43: portal shows Cancel button → card shows **Manage**; cancel lives in **More Action** (PL:79; PM:40-61).
- W23 L49: upgraded not shown → portal lists every row, badge **Upgraded** (MemberPortalController:28-36; no filter on `portal_memberships`).
- W24 L15, L73: upgraded when moved by admin → set when a member changes plan (paywall purchase or Pro upgrade), no admin move exists (F:Services/PaywallLifecycle.php:348-377; MD:187-229).
- W25 L62: parent upgraded, children upgraded → seats move to new corporate parent, or end when the new level is not corporate (PlanChangeService:29-53).
- Stale labels: L44, L47 assume card-level actions.
- Missing: Reactivate as restore path, trial restored after reactivate.

### docs/members/suspending-and-cancelling.md | rewrite-heavy
- W26 L11, L20: reverse by changing status field, no dedicated button → **Reactivate** in row menu (MD:213-220). Live.
- W27 L10: Cancel always stops billing → PayPal-managed: PayPal keeps charging until cancelled in PayPal (MD:528-531; PM:449-451).
- W28 L29: pick **Cancel** → for gateway-managed Stripe subs Cancel is hidden, **Cancel Subscription** dialog instead (MD:197-204,486-492).
- W29 L30: row changes to Cancelled immediately → **End of Billing Period** keeps it Active until the period ends (P:PaymentMethodsHandler:718; MembershipPaymentSyncService:178-185).
- W30 L32, L62: mode set by "your Cancellation Modes setting" → no Settings screen field (no match under `resources/admin/Modules/Settings`); admin picks in dialog (CancelSubscriptionDialog.vue:14-59). The same claim in docs/transactions/cancellation-modes.md needs cross-checking by its auditor.
- W31 L33: FluentCart linked subscription is cancelled → no FluentCart listener on any cancel filter or removal hook (only P:PaymentMethodsHandler:48,50 register cancel filters; removal hook used only by FluentCRM and LevelIntegration). Q3.
- W32 L64: reactivating parent will not restore individually suspended seats → it restores every suspended seat up to free seats (MembershipService:727-728,836-843,695-718).
- Stale labels: **Suspend Access**, **Reactivate Access**, **Yes, Suspend**, **Yes, Cancel**. Typo "cliking" L44.
- Missing: auto suspend on failed payment, trial restored by reactivate, seat reactivate blocked (MembershipUserController:300-312).

### docs/members/portal/setup.md | rewrite-light
- W33 L19-22: field **Member Portal Page**, button **Generate Portal Page**, **Preview** → field is titled **Generate Portal Page**, + icon button aria **Create**, links **Edit** and **View** (GeneralSettings.vue:52,76,99,107).
- W34 L50: Cancel always available → only with active/trial, or actionable subscription (PM:313-323).
- W35 L55: empty state directs to pricing → plain text, no link (PL:94-96). Live.
- Missing: FluentCart and WooCommerce embed, `#/membership/:id` route.

### docs/members/portal/what-members-see.md | rewrite-heavy
- W36 L11: empty state links to pricing → same as W35.
- W37 L23-28: card has Plan & Level, Start Date, Expires, Amount, Provider labels → level + #id, badge, `Started …`, provider, `Expires …`/`Lifetime access`/`N/A`, price + caption (PL:44-77; MemberPortalController:220-255). **Native Payment** not a label.
- W38 L34-38: action buttons on card with Active/Trial rules → card has only **Manage**; actions on Manage page (PL:79; PM:31-61).
- W39 L46-48: Team panel rows and remove → see W57, W58.
- Missing: header + Logout, Stats Overview, pagination, Manage page sections, Transaction Details, notices, Upgrade Plan.

### docs/members/portal/cancelling.md | rewrite-light
- W40 L20: **Manage** only on Active/Trial → every card (PL:79).
- W41 L24: three-dot icon → **More Action** button (PM:46-47).
- W42 L30: **Confirm Cancellation** → **Yes, Cancel**; subscription modal **Confirm** (MembershipCancellationDialog.vue:106,114,160-162).
- W43 L42-45: admin configures modes; end of period changes status now → member chooses in modal, default end of period; status stays until period end, notice shows date (MembershipCancellationDialog.vue:24-79,148; PM:464-469).
- W44 L47: cannot be undone → scheduled cancel can be undone with **Renew Membership** (Renewal.php:159-175).
- Stale: "FluentMember" L3, L34.
- Missing: PayPal-managed message, plain vs subscription dialog.

### docs/members/portal/updating-payment-method.md | rewrite-heavy (house style too)
- W45 L14, L26: on Active/Trial card next to Cancel → **More Action** on Manage page; rule is subscription active/trialing/past_due/unpaid/paused, not scheduled, Stripe only (PM:324-333; P:PaymentMethodsHandler:697-710).
- W46 L51, L58: **Update** then toast *Payment method updated.* → **Update Card**, message `Payment method updated successfully.` or resumed variants (UpdatePaymentMethodDialog.vue:42; P:Http/Controllers/BillingActionController.php:132-144).
- W47 L60: update does not retry failed invoice → it collects the open invoice (UpdateCustomerPaymentMethod.php:215-225; Stripe.php:436-447). Also breaks L80 and table row L99.
- W48 L68, L100: button greyed with tooltip → error `Too many payment method update attempts. Please try again later.` (UpdateCustomerPaymentMethod.php:380-383).
- W49 L76: banner *Your card on file has expired.* → string absent; notice `Your last payment did not go through. Update your payment method to restore access.` (PM:481-483).
- Conventions: `:::`, emoji, "Here's what you'll learn", "What's Next", relative links, invented example, screenshot-pending blocks.
- Missing: suspended past_due member can still update; PayPal not supported (PM:324-333; PaymentMethodsHandler:708-710).

### docs/members/portal/renewing-a-failed-subscription.md | rewrite-heavy (rename: not failed-only)
- W50 L28-29: Renew on Expired or Past Due with Stripe ID → subscription expired, or active/trialing/past_due/unpaid with `cancel_at_period_end` (Renewal.php:159-180).
- W51 L3: Stripe only → PayPal too (PayPal.php:430-464; Renewal.php:147-157).
- W52 L38-40: modal, **Renew Now** → no modal; **Renew Membership** posts at once, may redirect to checkout (PM:31-39,547-568).
- W53 L52-54: retries failed invoice on same card → expired subs go to checkout at the renewal price (Renewal.php:215-252; PayPal.php:464); scheduled cancels resume.
- W54 L6: failed payment flips to Expired → membership is suspended first (MembershipPaymentSyncService:158-169).
- W55 L57-60: failure modal with two paths → inline error alert only (PM:66-71,572-574).
- Conventions: same as above; relative links L59, L94, L111-112.

### docs/members/portal/corporate-seat-invites.md | rewrite-light
- W57 L15, L20: modal with Email → inline **Invite Member** field, **Send Invitation** (CM:18-28).
- W58 L13-14: `5 of 10 seats used`, row fields → `N / M seats · K pending`, owner counted; columns ID, Member, Role, Joined, Status (CM:60-88,279-289).
- W59 L37: login or register prompt → **Please log in to accept this invitation.** + **Log In** only (corporate-join.php:19-23). Q2.
- W60 L41: **Accept** / **Decline** → **Accept Invitation** only (corporate-join.php:33).
- W61 L41: seat cannot cancel → portal offers **Cancel Membership** with no parent check (PM:313-323; MemberPortalController:151-175). Q4.
- W62 L65: "Seats are full" → `All %d seats are occupied. No more members can join.` or `All seats are taken or reserved by pending invitations...` (CorporateMembershipService:310,1049).
- W63 L67: "This invite is for someone else." → `This invitation was sent to a different email address.` (CorporateMembershipService:567).
- W64 L4: free shows no Team panel → shows `Corporate membership management requires Fluent Members Pro.` (PM:198-202).
- Stale: "remove action" is **Cancel**; `:::` blocks. Sidebar Pro mark present, page H1 lacks `(Pro)`.
- Missing: 3-day invite expiry, pending seats reservation, **Resend invitation**, **Cancel invitation**, **View invitation**, tabs, search, over-limit alert, **Go to Portal**.

### docs/settings/login-popup.md | rewrite-light
- W65 L11: when off no popup anywhere → restriction and partial-content CTA buttons still open it (RestrictionRenderer:381-398; PartialContentService:274).
- W66 L37: Auto Open unchecked by default → checked, `auto_popup: yes` (Utility:621; LoginPopup.vue:218). Live REST confirms.
- W67 L37, L42: **Show a login prompt** action → no such action; actions are **Redirect to a specific URL**, **Display a custom message** (F:resources/admin/Modules/AccessGroups/Components/UnauthorizedAccess.vue:201-202; UnauthorizedAccessSettings.vue:34-35).
- W68 L39, L42: Auto Open applies to free pages, unchecked limits scope → scope is the master toggle: any singular page guests cannot access; Auto Open only decides whether it opens or waits for the button (LoginPopupHandler:47-69,227-229).
- W69 L52: WordPress error shown → fixed `Invalid username or password.` (LoginPopupHandler:191-194).
- W70 L54: uses `wp-login.php`, 2FA and custom redirects work → AJAX `wp_signon`, then reload (LoginPopupHandler:189,200; login-popup.js:234-238). 2FA behaviour not provable here.
- Stale: field order differs from UI (Colors before Button Text).
- Missing: page content replaced by notice, Remember me, password toggle, rate limit, redirect action wins, return from registration.

### reference/membership-statuses.md | keep as the single status page, rewrite-light
- W71 L13, L31-32, L59, L71: `pending` lifecycle → Q1 (same evidence as W17).
- W72 L14: cancelled means billing stopped → not for PayPal-managed (MD:528-531).
- W73 L16, L45-47: suspended only by admin or cascade → automatic on failed payment states (MembershipPaymentSyncService:158-169).
- W74 L17, L50: upgraded when admin moves → member plan change (PaywallLifecycle.php:348-377).
- W75 L38: cancel on refund "when enabled" → no setting; automatic for charge/renewal refunds, not migrated (P:Services/Payments/Refund.php:635-643,740-754).
- W76 L51, L84: children cascade to upgraded → seats moved or ended (PlanChangeService:29-53).
- W77 L57: portal Cancel button → see W22.
- W78 L63: upgraded row not shown → see W23.
- W79 L71, L74: Pending and Suspended have Cancel → no (MD:510-512). Live.
- W80 L67: Renew and Change Level admin columns → no such row actions (MD:187-229).
- W81 L86: children cannot cancel → they can (Q4).
- W82 L96, L98: provider `fluent_forms`, `native` → `fluentform`; real native rows store `stripe` or `paypal` (P:MembershipPaymentSyncService:593; F:Services/MembershipService.php:27-32). `corporate` row missing. `native` only in demo data here.
- Missing: Reactivate restores `pre_suspend_status`.

### Other pages noticed
- docs/getting-started/glossary.md:157 points to a **Shortcode Reference** that does not exist; lists only 2 of 4 shortcodes.
- docs/levels/pricing-native.md:94 "prompted to log in or register" contradicts guest checkout (live).

## 3. NEW PAGES NEEDED

| Proposed path | Covers |
|---|---|
| `reference/shortcodes` (sidebar + glossary link) | All 4 shortcodes, every attribute, defaults, fail-closed rule, columns clamp, render limit, Membership Levels block mapping |
| `docs/members/corporate-members` (Pro) | Corporate Members screen, seat maths, seat rows on Member Detail, reactivate limits, plan-change behaviour |
| `docs/members/portal/membership-details` | Manage page sections, More Action, notices, Transaction Details, Upgrade Plan (or merge into what-members-see, but that page is already long) |
| `docs/getting-started/pricing-page` (or `docs/levels/pricing-page`) | Generate Pricing Page, cards, buttons, hidden-level note, block |
| `docs/getting-started/checkout-and-guest-checkout` | Checkout page labels, guest flow, existing-email rule, success and processing pages, Free vs Pro button behaviour |
| `docs/settings/privacy` (or `docs/help-support/privacy`) | Export and erase groups, retained records, Pro additions, user deletion effects |

Merge `docs/members/statuses.md` into `reference/membership-statuses.md`. Rename `renewing-a-failed-subscription` to `renewing-a-membership`.

## 4. QUESTIONS

- Q1. Is `pending` a real membership status? Status sets exclude it (MembershipService:1054-1063; MembershipUserController:33,138,272; ML:149-155) and no write path was found, yet the live site has a row (user 123, membership 60) rendered `Pending` with no actions. Document it as legacy/demo, or drop it?
- Q2. Invite email says "If you don't have an account, you'll be asked to create one first." (F:Views/emails/corporate-invitation.php:27), but the join page offers only **Log In** (P:Views/public/corporate-join.php:19-23), and the email must match (CorporateMembershipService:566-568). Is a new invitee expected to register via wp-login first, or is account creation planned?
- Q3. FluentCart and WooCommerce rows: cancelling in Fluent Members has no outbound cancel (MembershipUserController:227; only Pro native handler on the filter, P:PaymentMethodsHandler:48,50). Is it intended that billing continues in the host plugin? The docs promise otherwise.
- Q4. Seat holders see **Cancel Membership** in the portal (PM:313-323; MemberPortalController:151-175), while docs say they cannot. Intended, or a missing guard?
