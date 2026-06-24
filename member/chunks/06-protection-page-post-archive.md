---
chunk: 06
category: Content Protection
subcategory: Page / Post / Archive Redirect
query-triggers: [content protection, restrict page, restrict post, redirect, template_redirect, the_content, archive protection, entire website, AccessHelper, RestrictionRenderer]
related-chunks: [04, 07, 08, 09, 10]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Services/AccessHelper.php, app/Services/RestrictionRenderer.php]
doc-files: [guide/access-groups/protected-content.md, guide/access-groups/unauthorized-access.md]
---

# Content Protection — Page / Post / Archive

## Registration

`AccessHandler::register()` is called on plugin boot. It bails immediately if `AccessHelper::isAdmin()` is true (admins always bypass all protection).

```php
add_filter('the_content', [$this, 'protectContent'], 10);
add_filter('render_block', [$this, 'protectBlock'], 10, 2);
add_action('template_redirect', [$this, 'maybeRestrictArchive'], 5);
add_action('template_redirect', [$this, 'maybeRedirectRestrictedContent']);
add_action('rest_api_init', [$this, 'registerRestApiProtection']);
```

---

## Singular content redirect — `maybeRedirectRestrictedContent()`

**Fires**: `template_redirect`
**Applies to**: singular pages (`is_singular() === true`)
**Skips**: admin, feeds, non-singular pages

**Flow**:
```
get current user ID (0 if logged out)
get post ID + post type
AccessHelper::hasAccess($userId, $postId, $postType)
  → true  → allow through (do nothing)
  → false →
      AccessHelper::isContentDripped() → true → allow through (drip shows message in content filter)
      RestrictionRenderer::getRedirectUrl($postId, $postType)
        → has URL → wp_safe_redirect() + exit
        → no URL  → fall through to content filter
```

---

## Content replacement — `protectContent()`

**Fires**: `the_content` filter, priority 10
**Applies to**: singular pages, main query only, not admin, not feed

**Flow**:
```
AccessHelper::hasAccess() → true → return $content unchanged
AccessHelper::hasAccess() → false →
  AccessHelper::isContentDripped() → true
    → return RestrictionRenderer::getRestrictionHtml($postId, $postType)
  PartialContentService::isEnabled() → true
    → read per-post override: get_post_meta($postId, '_fmem_partial_content_settings', true)
    → merge with global settings
    → if enabled !== 'no':
        hasOnlyMediaContent($content) → getMediaPlaceholderHtml($settings, $groupConfig)
        contentExceedsPreviewLength($content, $wordCount) → getPartialContentHtml($content, $settings, $groupConfig)
  → return RestrictionRenderer::getRestrictionHtml($postId, $postType)
```

Post meta key for per-post partial override: `_fmem_partial_content_settings`

---

## Archive / entire-website lockdown — `maybeRestrictArchive()`

**Fires**: `template_redirect`, priority 5 (before singular check)
**Applies to**: non-singular, non-404, non-admin, non-feed pages

**Condition to activate**: at least one Access Group has `entire_website` in its `restriction_rules.restriction_types`.

**Flow**:
```
hasEntireWebsiteRestriction() → false → return (do nothing)
AccessHelper::hasAccess($userId, null, 'post') → true → return
RestrictionRenderer::getRedirectUrl(null, 'post')
  → has URL → wp_safe_redirect() + exit
  → no URL  → get_header() + echo restriction HTML + get_footer() + exit
```

---

## AccessHelper (service)

Key static methods:

| Method | Returns | Description |
|---|---|---|
| `isAdmin()` | bool | True if current user is WP administrator |
| `currentUserId()` | int | 0 if logged out |
| `hasAccess($userId, $postId, $postType)` | bool | Core access check — considers user's active memberships, access groups, drip rules |
| `isContentDripped()` | bool | True if current content is drip-locked for user |
| `getAllAccessGroups()` | array | Returns all groups with their restriction_rules |
| `getBlockingGroupConfig($postId, $postType)` | array | Config of the group that is blocking access |
| `checkBlockAccess($userId, $blockAttributes)` | bool | Checks block-level access group assignment |

---

## RestrictionRenderer (service)

Key static methods:

| Method | Returns | Description |
|---|---|---|
| `getRedirectUrl($postId, $postType)` | string\|null | URL to redirect to, or null to show message |
| `getRestrictionHtml($postId, $postType)` | string | HTML restriction message |
| `getRestrictedBlockHtml()` | string | HTML for blocked Gutenberg block |
| `getDripRestrictionHtml()` | string | HTML for drip-locked content |
| `enqueueCheckoutLoginAssets()` | void | Enqueues login popup assets for shortcode page |

---

## Key facts for docs

- Admins ALWAYS bypass protection — test in incognito / as non-admin user
- If redirect URL is set on the group → visitor is redirected; otherwise restriction HTML is shown in-place
- `entire_website` affects archive/taxonomy/homepage but NOT singular pages (singular handled by `maybeRedirectRestrictedContent`)
- Drip check happens BEFORE partial content check (drip wins)
