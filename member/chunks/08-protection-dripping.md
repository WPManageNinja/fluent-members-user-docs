---
chunk: 08
category: Content Protection
subcategory: Content Dripping
query-triggers: [content drip, dripping, time-based access, unlock date, days after join, drip rule, drip schedule]
related-chunks: [03, 06, 09]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Services/AccessHelper.php, app/Services/RestrictionRenderer.php]
doc-files: [guide/levels/content-drip.md]
---

# Content Protection — Content Dripping

## What it is

Content dripping releases content gradually over time. A drip rule says: "this content unlocks N days after the member's `start_date`." Until that date, members see a restriction message — they know the content exists, but can't read it yet.

---

## How it works

Drip rules are configured per **Membership Level** (stored in the level's `settings` JSON). When a member visits a protected post:

```
AccessHelper::hasAccess($userId, $postId, $postType)
  → true  → member has access (drip period has passed) → show content
  → false →
      AccessHelper::isContentDripped() → true
        → protectContent() returns RestrictionRenderer::getRestrictionHtml($postId, $postType)
        → maybeRedirectRestrictedContent() does NOT redirect (drip content stays visible in-place)
      AccessHelper::isContentDripped() → false
        → normal protection flow (redirect or hard block)
```

**Key behavior**: drip check happens BEFORE partial content check. Dripped content never shows partial preview — it always shows the drip restriction message.

**Key behavior**: drip check also happens BEFORE redirect. A drip-locked page is never redirected — the member lands on the page but sees the drip message instead of the content.

---

## Drip restriction display

In blocks: `AccessHandler::protectBlock()` calls `RestrictionRenderer::getDripRestrictionHtml()` when `isContentDripped()` is true.

---

## AccessHelper drip methods

| Method | Returns | Description |
|---|---|---|
| `isContentDripped()` | bool | True if current content is locked because the drip timer hasn't expired |

The drip timer is: `start_date + drip_days > now`

---

## Drip rules on levels

Drip rules are stored on the Membership Level's `settings` JSON. They specify:
- How many days after `start_date` until the content unlocks
- Which Access Group(s) or specific content items the rule applies to

Doc: `guide/levels/content-drip.md` covers creating and configuring drip rules.

---

## Important notes for documentation

- Members with drip-locked content see the post in navigation / lists — they are NOT redirected
- The drip message tells them when the content will unlock (if configured)
- If a member is on multiple levels and one level grants immediate access, the content is NOT dripped
- Admins bypass drip (as with all protection)
