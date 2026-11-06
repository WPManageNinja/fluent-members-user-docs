# Open questions

Collected from the Phase A audits on 2026-11-06, against free 9afdb75b and Pro 59d8187. Path abbreviations are defined at the top of each report in `audit/`.

## levels (audit/audit-levels.md)

1. **How is a free level meant to work?** Native amount must be >0 (`P/app/Http/Controllers/PaymentMethodController.php:141`), price types are only `one_time` and `subscription` (`P/app/Services/Payments/PricingService.php:16-19`), and assign needs a plan (`S/app/Http/Controllers/MembershipLevelController.php:524`). Yet the seeded Free Member level has "no plan" and members. Is a zero-price paywall the answer?
2. **Is one-time access lifetime?** The Assign dialog says "Access ends on the plan's expiry" (`F/Levels/_AssignMembersDialog.vue:51`), but the plan form has no expiry field and Interval is disabled for One-time (`NativePricingPlanForm.vue:90`). Old docs sold "Lifetime".
3. **Can plans be made inactive?** Delete refusal says "Set it to inactive instead" (`P/app/Services/Payments/PricingService.php:173`), but no status field exists in the plan forms.
4. **Should type be changeable?** API allows a type change when no memberships exist (`S/app/Http/Controllers/MembershipLevelController.php:229`), while the UI offers none. Docs should keep "permanent" unless told otherwise.
5. **Is license activation coming?** No License tab or code in this Pro commit. Should Step 3 be removed, or is it being added before release? Same for the download path and WordPress.org listing: neither is provable from source.
6. **Revenue by Membership on free sites:** card renders regardless, with native-only copy (`F/Dashboard/RevenueByMembership.vue:58`). Should docs mark it Pro?
7. **Demo data:** plans seeded with `provider: native` are hidden by `readProviders` (`P/app/Services/Payments/PricingService.php:51-53`). Reseed before screenshots, and could real migrated sites hit this?

## access (audit/audit-access.md)

1. **Default Unauthorized Access scope.** Tab copy says defaults are "copied into each newly created Access Group. Existing Access Groups are not affected." Runtime does the opposite: non-customized groups store nothing and read the global setting live, so changing it affects all of them (UnauthorizedAccessSettings.vue:16; AccessGroupController.php:954-956; AccessHelper.php:180-184; UnauthorizedAccess.vue:228-229). Bug in copy or in code? Docs currently can only describe the code.
2. **"All Categories Archive" / "All Tags Archive".** Label says archive; matching protects every post, including posts with no term, and term archive pages are not blocked (AccessHelper.php:1011; AccessHandler.php:447). Same pattern for WC archives (AccessHelper.php:1015-1021). Intended?
3. **CPT in "Specific Post/Page/CPT/Taxonomy etc."** Picker returns only post, page and terms (ContentService.php:149-150,181-187). `isIncludedInGroup` also only checks category and tag terms for type `post` (AccessHelper.php:748-752,762). So custom post types seem protectable only by per-post panel or Entire Website. Is CPT support planned, or should the label change?
4. **Entire Website and essential pages.** No automatic bypass for portal, pricing, checkout or redirect target in `hasAccess` (AccessHelper.php:22-47). Should docs tell admins to add them under **Exclude Content from Restriction**, or does the product intend to exempt them? Not testable without creating a site-wide group.
5. **"Customize for this rule" wording.** Button sits on the group card and applies to the whole group, not a rule, despite multi-rule UI (UnauthorizedAccess.vue:24; AccessGroupDetails.vue:115). Docs should say "group"; confirm no per-rule plan.
6. **Block fallback has no custom message.** Old docs promised per-block actions; code offers fixed text only (RestrictionRenderer.php:326-336). Removed deliberately, or planned? Determines whether to write "not available" or stay silent.

## members (audit/audit-members.md)

- Q1. Is `pending` a real membership status? Status sets exclude it (MembershipService:1054-1063; MembershipUserController:33,138,272; ML:149-155) and no write path was found, yet the live site has a row (user 123, membership 60) rendered `Pending` with no actions. Document it as legacy/demo, or drop it?
- Q2. Invite email says "If you don't have an account, you'll be asked to create one first." (F:Views/emails/corporate-invitation.php:27), but the join page offers only **Log In** (P:Views/public/corporate-join.php:19-23), and the email must match (CorporateMembershipService:566-568). Is a new invitee expected to register via wp-login first, or is account creation planned?
- Q3. FluentCart and WooCommerce rows: cancelling in Fluent Members has no outbound cancel (MembershipUserController:227; only Pro native handler on the filter, P:PaymentMethodsHandler:48,50). Is it intended that billing continues in the host plugin? The docs promise otherwise.
- Q4. Seat holders see **Cancel Membership** in the portal (PM:313-323; MemberPortalController:151-175), while docs say they cannot. Intended, or a missing guard?

## billing (audit/audit-billing.md)

1. One-time detail hardcodes **Expiration: Lifetime** (`SD`:305-308) for every row. Can a one-time plan have a limited duration? `formatRecordBlock` passes no expiry. If yes, the label is a bug; docs should not repeat it.
2. Refund Reason **Other** on a Stripe transaction: dialog offers it (`RefundPaymentDialog.vue`:168-171), server allows only duplicate, fraudulent, requested_by_customer (`BA`:919-928) and returns "Invalid refund reason was provided." Looks like a bug. Document as Stripe-unavailable, or will it be fixed?
3. One-time search placeholder says "Search by member, subscription or gateway ID" (`SL`:27) but search covers only name/email (`OT`:277-287). Fix copy, or extend search? Determines doc wording.
4. Expired one-time memberships have no status tab (`SL`:308-314) while backend accepts it (`OT`:761). Intentional?
5. API accepts `provider` filter (`P/.../SubscriptionController.php`:31, `OT`:273) but no UI sends it (`SL`:386-392). Planned? Old docs described it. Docs will say no filter unless told otherwise.
6. Should the sidebar group and URLs both move to **Billing** (`/docs/billing/...`)? Site is not live, but this needs the approval gate; internal route key is still `orders` (`AdminMenuHandler.php`:147).
7. Block-editor emails drop the header logo (`block_editor_template.php`:53-76; mailer :225-229). Intentional, or should the logo apply? Decides the Mailing Settings sentence.
8. Stripe/PayPal "Without Pro" sentences: FluentCart can take PayPal too? PayPal page omits it, free notice lists all three (`PaymentSettings.vue`:88-90). Not settled by code in this domain.

## integrations (audit/audit-integrations.md)

- Q1 Version: installed free and Pro headers say 1.0.0 (`fluent-members.php:6`, `fluent-members-pro.php:6`, readme `Stable tag: 1.0.0`), changelog tops out at v1.1.0, and from-kadence-memberships.md cites v1.1.0. Which version do docs and changelog target?
- Q2 FluentCart has two grant paths: paywall (Paywalls.php:41,118) and product feed (FluentCartConnector.php:53-115, Paywalls.php:131 `grantFeedLevels`). Which should docs recommend, and is using both on one product supported?
- Q3 Corporate imports run without Pro (_PmproStepRunner.vue:185; _MemberPressStepRunner.vue:187) but corporate levels are locked without Pro (_AddLevelDialog.vue:194-196). Should docs present corporate migration as Free?
- Q4 FluentCommunity checkbox says "Refund or Subscription Access Expiration", its tip says "cancellation or access expiration" (Connector.php:134-135), code also revokes on suspension (LevelIntegrationEventListener.php:46-50). Is suspension revocation intended?
- Q5 Hooks page scope: home links Dev Docs at developers.fluentmembers.com (index.md:14), and 150 hooks are undocumented here. Keep a curated list here, or move it to Dev Docs?
- Q6 Support channel: get-support.md sends users to wpmanageninja.com/account, the nav site is fluentmembers.com (config.mjs nav). Which is current?
- Q7 Migration.vue:61-63 waits for a documentation URL. Which page should **The Documentation** link to?
