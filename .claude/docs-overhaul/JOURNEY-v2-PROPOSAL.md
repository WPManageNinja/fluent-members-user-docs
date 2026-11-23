# Journey v2 proposal (2026-11-23): Content Access and Bundles

**Status: PROPOSED, awaiting approval.** Replaces sections 2, 3, 8, 9 and 11 of `JOURNEY.md`; other groups keep their place. Evidence: `DELTA-2026-11-23.md`. Code: free `4998e8d0`, Pro `7f76c4b`; local site now identical to free develop.

Principle: protection is now set up inside a level, so the "Protect Your Content" group follows the level, not a separate Access Groups screen. Marks as in `JOURNEY.md`. Site is not live, so URLs can change (redirects logged only).

## 1. Get Started (adds)
- Guided setup (onboarding) and launch checklist `new`, merged into Quick start `H`
- Test mode vs live mode `new` docs/getting-started/test-and-live-mode
- Rest as before, all `H`/`L` for nav and screenshots

## 2. Create Membership Levels
- Levels overview `H`
- Create a level `H` (Free levels covered here)
- Free levels `new` docs/levels/free-levels
- Price with native payments `H`
- Price with paywalls `H`
- Content access tab `new` docs/levels/content-access (replaces attaching-access-groups)
- Upgrade paths `Pro` `L`
- Corporate memberships `Pro` `L`
- Level automations `new` docs/levels/automations

## 3. Protect Your Content (folder `docs/access-groups` -> `docs/content-access`, `move`)
- Content access overview `H` (how rules, bundles and levels fit together)
- How protection works `H`
- Protect content by type `H` (restriction types, custom taxonomies, the content picker)
- Bundles `new` (create, save as bundle, bundle drawer, visitor message)
- Release schedule (drip) `H` (per-rule release, Unlocking soon)
- Protect a single post `L`
- Public content `new` (was Always open, leave-out rules; setting page)
- What blocked visitors see `H` (restricted content settings plus per-bundle message)
- Partial content lock `H` (now inside Restricted content settings)
- Blocks: Membership Levels block `L`, Content block (confirm name) `H`, Nesting & limits `L`
- Courses and spaces `new` (LMS enrollment, FluentCommunity push/pull); detail stays on the integration pages

## 4. Sell Memberships
- Pricing page `H`, Checkout `H`, Payment settings `H` (test mode alert, option cards, global mode), Stripe `Pro` `H`, PayPal `Pro` `H`
- Login popup `H` (confirm whether it still has settings; otherwise fold into Restricted content)

## 5-7. Members, Portal, Billing
- `L`/`H` for cancel flow (local-only confirm, gateway follow-ups, scheduled cancel), portal price/renewal states, team invite sign-up, subscription list columns.
- `new` Gateway follow-ups (billing)

## 8. Emails
- Email notifications `H` (payment emails default on, starter templates, lead time), Mailing settings `L`, Custom email editor `L`

## 9. Connect Other Plugins
- FluentCart `H` (Membership tab, cart, edit price)
- FluentCRM `H` (settings tab, tag sync, triggers, conditions, actions, contact widget)
- LMS plugins `new` docs/integrations/lms-courses (LearnDash, LifterLMS, Tutor, LearnPress, Sensei, MasterStudy)
- FluentCommunity `H`, WooCommerce `Pro` `L`, Paymattic `L`, Fluent Forms `L`, Fluent Support `L`

## 11. Settings
- General settings `L` (Site Mode first)
- Public content, Restricted content `new` (setting pages; link to section 3)
- Permissions `L`, FluentCRM settings (see 9)
- Remove or merge: docs/settings/unauthorized-access, partial-content-lock, login-popup (confirm each)

## Redirects to log
```
/docs/access-groups/* -> /docs/content-access/*
/docs/levels/attaching-access-groups -> /docs/levels/content-access
/docs/settings/unauthorized-access -> /docs/content-access/what-blocked-visitors-see
/docs/settings/partial-content-lock -> /docs/content-access/partial-content-lock
```

## Work order after approval
1. Phase C on Create levels + Protect content (about 20 pages) with `verify-fluent-members-doc-against-code` and live walk-through.
2. New pages, then sidebar/trees (`node scripts/qa/check-trees.mjs`) and `npm run docs:build`.
3. Screenshots: rewrite the 16 plans for the new tabs, add plans for new screens, fill `TODO(screenshot)` placeholders.
4. Settings, selling, billing, members, integrations; final `audit-fluent-members-docs`.

## Questions for you
1. Rename the folder `access-groups` to `content-access`, or keep the old folder and only change titles?
2. Call them **Bundles** everywhere (matches the UI), with a glossary note "formerly access groups"?
3. OK to fold Login popup, Unauthorized access and Partial content pages into the new Restricted content pages?
