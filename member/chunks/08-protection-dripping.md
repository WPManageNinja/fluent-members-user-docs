---
chunk: 08
category: Content Protection
subcategory: Content Dripping
query-triggers: [content drip, dripping, time-based access, unlock date, days after join, drip rule, drip schedule, ContentDripHelper, content_dripping_status, content_drips, show_content, countdown timer]
related-chunks: [04, 06, 09]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Services/AccessHelper.php, app/Services/ContentDripHelper.php, app/Services/RestrictionRenderer.php]
doc-files: [guide/levels/content-drip.md]
---

# Content Protection — Content Dripping

## What it is

Content dripping releases content gradually over time. A drip rule says: "this content unlocks N
days/hours/minutes after the member's `start_date` in the unlocking membership." Until that date,
members see a restriction message with a live countdown — they know the content exists, but can't
read it yet.

**Drip rules live on the Access Group, not the Membership Level.** Each group's `settings` JSON
carries `content_dripping_status` (`active`/`inactive`) and a `content_drips` array of rules. A
Level unlocks drip behavior only indirectly, by unlocking the Access Group that carries the rules.

---

## Service: `ContentDripHelper`

`app/Services/ContentDripHelper.php` — pure array logic, no DB access of its own.

| Method | Description |
|---|---|
| `checkDripAccess($contentId, $contentType, $group, $membershipStartDate)` | Returns `['accessible' => bool, 'drip_info' => array\|null]` for one group |
| `getDripStatusMessage($dripInfo)` | Human-readable message ("This content will be available in 3 days, 4 hours.") |

Called from `AccessHelper` at every point a group is checked for access: `checkCptAccess()`
(post individually assigned to groups), `checkUserGroupAccess()` (normal group-content matching),
and `checkBlockAccess()` (per-block restriction). If `content_dripping_status !== 'active'`, or the
group has no `content_drips`, or there's no known membership start date, the group is treated as
not drip-gated and access falls through to the normal group-match result.

---

## Drip rule shape (one entry in `content_drips`)

| Field | Type | Description |
|---|---|---|
| `timeline` | string | `after_duration` (content unlocks after the offset elapses) or anything else (content is available only UNTIL the offset elapses, then becomes unavailable) |
| `days` / `hours` / `minutes` | int | Offset from the member's start date, combined (`days*86400 + hours*3600 + minutes*60` seconds) |
| `show_content` | string[] | Which content this rule applies to, as prefixed keys (`post-123`, `page-45`, `category-5`, `tag-9`, `wc_product-7`, `fct_product-3`, etc.). **Empty array = applies to every piece of content the group protects.** |

`ContentDripHelper::checkDripAccess()` first confirms the rule's `show_content` matches the content
being checked (directly by id-key, or by the post's categories/tags, or by the product's WC/FluentCart
taxonomy terms), then evaluates the timeline against `membershipStartDate + offset` vs. now.

---

## Decision flow

```
AccessHelper resolves a matching group for this user + content (chunk 06 resolution order)
  → group's content_dripping_status !== 'active', or no content_drips, or no start date
      → accessible = true (not drip-gated)
  → group is drip-gated →
      ContentDripHelper::checkDripAccess() per matching drip rule
        → any rule blocks (target date not yet reached, or already passed for a "before" timeline)
            → accessible = false, drip_info recorded (earliest target date across all blocking rules)
        → no rule blocks → accessible = true
```

If access is denied for drip reasons, `AccessHelper::isContentDripped()` returns true (it reads the
last call's recorded `drip_info`) and:
- `protectContent()` returns `RestrictionRenderer::getRestrictionHtml()`, which auto-detects the
  drip info and renders `getDripRestrictionHtml()` instead of a generic restriction message
- `maybeRedirectRestrictedContent()` does NOT redirect — a drip-locked page always renders in place
- `protectBlock()` returns `RestrictionRenderer::getDripRestrictionHtml()` directly for blocks

**Key behavior**: the drip check happens BEFORE partial content and BEFORE redirect. Dripped content
never shows a partial preview or gets redirected — it always shows the drip restriction message.

---

## Drip restriction display

`RestrictionRenderer::getDripRestrictionHtml($dripInfo=null)`:
- `timeline === 'after_duration'`: shows "Content Not Yet Available" + the human message + a live
  JS countdown (days/hours/minutes/seconds, updates every second, reloads the page at zero)
- any other timeline: shows "Content No Longer Available" + the human message, no countdown

---

## Important notes for documentation

- Drip rules are configured on the **Access Group** (`content_dripping_status` + `content_drips`),
  not on the Membership Level — a Level only inherits drip behavior via the groups it unlocks
- The unlock clock starts at the MEMBERSHIP's `start_date` (per `fmem_membership_users` row), not
  the WordPress user's registration date — a member who upgrades or rejoins gets a fresh clock for
  that membership
- Members with drip-locked content see the post in navigation / lists — they are NOT redirected
- If a member matches multiple groups for the same content and at least one grants immediate
  (non-dripped) access, the content is NOT dripped — `checkUserGroupAccess()` keeps checking groups
  and returns true on the first one that isn't drip-blocked
- Admins bypass drip (as with all protection)

Doc: `guide/levels/content-drip.md` covers creating and configuring drip rules from the admin UI.
