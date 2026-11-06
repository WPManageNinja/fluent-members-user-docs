# Journey

**Status: APPROVED on 2026-11-06, applied the same day.** Reorganized to follow the Ninja Tables docs (`ninja-table-docs/REDESIGN-PLAN.md` §7, its `.claude/docs-overhaul/JOURNEY.md`, and its current sidebar).

Decisions: document `develop`, and the user updates the local site to it before page rewrites; full Ninja Tables design system; frontmatter on every page; test data and reseeding allowed on the local site; bring the user only the product questions that change what a page says.

Evidence: `audit/audit-*.md`, `FEATURE-MAP.md`, `QUESTIONS.md`. Audited against free 9afdb75b and Pro 59d8187. The user chose to document `develop`, so the delta must be re-audited once the site is updated.

Principle, taken from Ninja Tables: a new owner reads top to bottom. Group names are tasks, page names are short and task-first, and the sidebar follows the reader, not the folders. A page can sit in a group that differs from its folder, so most URLs stay put.

Marks: `new` new page, `merge` folded into another page, `move` URL changes, `H` heavy rewrite, `L` light rewrite, `keep` cleanup only. Pages with no path keep their current URL.

## Proposed sidebar

### 1. Get Started
- Introduction `L`, becomes the site-wide hub (map, numbered quick-start journey)
- Free vs Pro `new` docs/getting-started/free-vs-pro
- Install & activate `L`
- Activate Pro `L`
- Guided setup & quick start `H`
- Find your way around `new` docs/getting-started/admin-navigation
- Glossary `L`

### 2. Create Membership Levels
- Levels overview `H`
- Create a level `L`
- Price with native payments `H`
- Price with paywalls `H`
- Attach access groups `H`
- Upgrade paths `Pro` `new` docs/levels/upgrade-paths
- Corporate memberships `Pro` `L`
- Free levels: placement depends on QUESTIONS levels Q1

### 3. Protect Your Content
- Access groups overview `H`
- How protection works `new` docs/access-groups/how-protection-works
- Restriction types `H`
- What blocked visitors see `H` (docs/access-groups/unauthorized-access)
- Drip content `L` `move` from docs/levels/content-drip to docs/access-groups/content-drip
- Protect a single post `new` docs/access-groups/per-post-restrictions
- Partial content lock `L` (docs/settings/partial-content-lock)
- Subgroup, Blocks:
  - Access Groups block `L` (absorbs Configuring)
  - Nesting & limits `L`
  - Membership Levels block `new` docs/access-groups/gutenberg-block/membership-levels-block

### 4. Sell Memberships
- Pricing page `new` docs/selling/pricing-page
- Checkout & guest checkout `new` docs/selling/checkout
- Payment settings `L` (docs/settings/payment-settings/)
- Set up Stripe `Pro` `H`
- Set up PayPal `Pro` `L`
- Login popup `L` (docs/settings/login-popup)

### 5. Manage Members
- Read your dashboard `H` (docs/dashboard/dashboard)
- Members list `L`
- Member details `L`
- Add a membership manually `L`
- Members on a level `H` (absorbs Assign Members)
- Suspend or cancel a member `H`
- Corporate members `Pro` `new` docs/members/corporate-members

### 6. Member Portal
- Set up the portal `L`
- What members see `H`
- Membership details `new` docs/members/portal/membership-details
- Cancel a membership `L`
- Update payment method `Pro` `H`
- Renew a membership `H` `move` from renewing-a-failed-subscription to renewing-a-membership
- Corporate seat invites `Pro` `L`

### 7. Billing `Pro`; all pages `move` from docs/transactions/ to docs/billing/
- Billing overview `H`
- Subscriptions `H`
- Subscriptions from other plugins `new` docs/billing/provider-subscriptions
- One-time memberships `L`
- Filter & search `H`
- Refunds `H`
- Cancel a subscription `H` (slug cancellation-modes becomes cancelling-a-subscription)

### 8. Emails
- Mailing settings `L`
- Email notifications `H`
- Custom email editor `Pro` `new` docs/settings/email-configuration/custom-email-editor

### 9. Connect Other Plugins
- Integrations overview `new` docs/integrations/
- Level integrations `new` docs/levels/integrations
- FluentCart `new` docs/integrations/fluentcart
- Fluent Forms `new` docs/integrations/fluent-forms
- Paymattic `new` docs/integrations/paymattic
- WooCommerce `Pro` `new` docs/integrations/woocommerce
- FluentCRM `new` docs/integrations/fluentcrm
- Fluent Support `new` docs/integrations/fluent-support
- FluentCommunity `new` docs/integrations/fluent-community

### 10. Migrate to Fluent Members
- Migration overview `H`
- From Paid Memberships Pro `L`
- From MemberPress `L`
- From Kadence Memberships or Restrict Content Pro `L`

### 11. Settings
- General settings `L`
- Default unauthorized access `new` docs/settings/unauthorized-access
- Permissions `new` docs/settings/permissions
- Privacy & personal data `new` docs/settings/privacy

### 12. For Developers
- Shortcodes `new` reference/shortcodes
- Email smartcodes `new` reference/email-smartcodes
- Hooks & filters `H`, scope depends on QUESTIONS integrations Q5
- Chain map `L`

### 13. Help & Updates
- Membership statuses `L` (docs/members/statuses `merge` into this)
- Troubleshooting `L`
- FAQ `H`
- Get help `keep`
- Changelog `keep`, reconcile the version

## Proposed redirects (site not live, so logged only)

```
/docs/transactions/* -> /docs/billing/*
/docs/transactions/cancellation-modes -> /docs/billing/cancelling-a-subscription
/docs/levels/content-drip -> /docs/access-groups/content-drip
/docs/members/statuses -> /reference/membership-statuses
/docs/members/portal/renewing-a-failed-subscription -> /docs/members/portal/renewing-a-membership
/docs/access-groups/gutenberg-block/configuring -> /docs/access-groups/gutenberg-block/inserting
```

## Design to port from `ninja-table-docs/.vitepress/theme/`

Keep the Fluent Members purple `#6B35E8` and logo. Copy the system, not the teal.

1. **Aurora background and frosted nav/sidebar** (`aurora.css`, `Layout.vue` `#layout-top`), recoloured to purple. Off in print.
2. **Motion and sidebar accordion** (`motion.css`, `Layout.vue`): calm page enter, and only the current group stays open. Respects reduced motion.
3. **Doc trees** (`plugin-doc-tree.ts`, `doc-tree.css`, `trees/`, `TreeStrip.vue`, `scripts/qa/check-trees.mjs`): hero, "What do you want to do?" task cards, settings panel replica, mind map, and a "you are here" strip. First trees: `product` hub on Introduction, then `levels`, `access`, `settings` landing pages.
4. **Tabs and FAQ blocks** (`plugin-doc-blocks.ts`): `::: tabs` for Stripe vs PayPal or Free vs Pro paths, `::: faq` for the FAQ page.
5. **Pro pill** (`.nt-pro`) in the sidebar in place of `(Pro)` text.
6. **Home page cards** rewritten to match the 13 groups, plus the plain footer.
7. **Sync shared components** that have since diverged: `Feedback.vue`, `plugin-zoomable.ts`.
8. **Frontmatter** `title` and `description` per page, as Ninja Tables does. This changes the repo's no-frontmatter rule, so CLAUDE.md and the skills change with it. Needs approval.

## Live checks that need sample data

Approved: add test data and reseed. Currently code-only: paywall levels, corporate level and seats, plan rows on the Pricing tab (seeded `provider: native` plans are hidden), portal Manage page as a member, login popup on the front end, block and per-post protection on real content, cancel dialog, provider subscription detail, PayPal connected state, first-run wizard.
