---
chunk: 06
category: Content Protection
subcategory: Page / Post / Archive Redirect
query-triggers: [content protection, restrict page, restrict post, redirect, template_redirect, the_content, archive protection, entire website, AccessHelper, RestrictionRenderer, global exclusions, public contents, CPT access groups, WooCommerce product protection, FluentCart product protection]
related-chunks: [04, 07, 08, 09, 10, 18]
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

add_filter('the_comments', [$this, 'filterRestrictedComments'], 10, 2);
add_filter('comments_open', [$this, 'maybeCloseComments'], 10, 2);
add_filter('get_comments_number', [$this, 'maybeZeroCommentsCount'], 10, 2);
```

---

## `AccessHelper::hasAccess($userId, $contentId, $contentType)` — the core check

Resolution order (first match wins):

```
1. isGloballyExcluded($contentId, $contentType) → true → PUBLIC (Public Contents bypass list, see chunk 18)
2. getCptAccessGroups($contentId, $contentType) → non-empty
     (post/page individually assigned to specific groups via _fmem_cpt_access_groups meta, chunk 09)
     → checkCptAccess(): user must be in one of THOSE groups (+ drip check) → true/false, stop here
3. getAllAccessGroups() empty, OR no active group's rules protect this content → PUBLIC
4. user has no matching group in their memberships → false (restricted)
5. user has a matching group → checkUserGroupAccess(): drip check via ContentDripHelper → true/false
```

`$contentType` is normalized first (`normalizeContentType()`): WooCommerce/FluentCart CPT slugs map to
`wc_product`, `wc_product_category`, `wc_product_tag`, `wc_product_brand`, `wc_product_shipping_class`,
`fct_product`, `fct_product_category`, `fct_product_brand` — this is not just posts/pages, it also
covers WooCommerce and FluentCart catalog content when those integrations register the mapping.

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

**Condition to activate**: at least one active Access Group has a rule with `type === 'entire_website'`
in its normalized v2 rules (`AccessHelper::groupRules($group)` — see chunk 04 for the rules envelope
shape). This replaces the older flat `restriction_rules.restriction_types` check.

**Flow**:
```
hasEntireWebsiteRestriction() → false → return (do nothing)
AccessHelper::hasAccess($userId, null, 'post') → true → return
RestrictionRenderer::getRedirectUrl(null, 'post')
  → has URL → wp_safe_redirect() + exit
  → no URL  → get_header() + echo restriction HTML + get_footer() + exit
```

An `entire_website` rule can still carve out exceptions via its own `exclude_ids` bucket
(`ruleProtectsContent()` checks exclusion before granting the broad match) — admins can protect
the whole site except a handful of posts/pages.

---

## Global exclusions (Public Contents bypass)

`AccessHelper::isGloballyExcluded($contentId, $contentType)` is checked BEFORE any access-group
logic. It reads `Utility::getPublicContentSettings()['contents']` (Settings → Public Contents,
see chunk 18) and matches by `post_ids`, `page_ids`, `category_ids`, `tag_ids` for posts, or the
WooCommerce/FluentCart product config for `wc_product`/`fct_product` content. A match always wins —
this content is public regardless of any Access Group assignment.

---

## AccessHelper (service)

Key public methods (`app/Services/AccessHelper.php`):

| Method | Returns | Description |
|---|---|---|
| `isAdmin()` | bool | True if current user is WP administrator |
| `currentUserId()` | int | 0 if logged out |
| `hasAccess($userId, $contentId, $contentType)` | bool | Core access check — see resolution order above |
| `checkBlockAccess($userId, $attrs, $contentId=null, $contentType=null)` | bool | Block-level check, reads `attrs['selectedGroups']` (chunk 09) |
| `isContentDripped()` | bool | True if the LAST `hasAccess()`/`checkBlockAccess()` call was blocked by a drip rule (reads `getLastDripInfo()`) |
| `getLastDripInfo()` | array\|null | The drip info (`timeline`, `target_date`, `days`, `hours`, `minutes`) from the last blocked check |
| `getAllAccessGroups()` | array | All `status = active` groups, each with `id` + decoded `settings` |
| `getUserAccessGroups($userId)` | array | Groups unlocked by the user's active/trial memberships, each carrying `_membership_start_date` for drip evaluation |
| `getBlockingGroupConfig($contentId, $contentType)` | array\|null | Resolved unauthorized-access config (message/redirect/button) of the group blocking access |
| `groupRules($group)` | array | Normalizes a group's `settings.restriction_rules` (v1 or v2) into the canonical v2 rule list |
| `ruleProtectsContent($id, $type, $rule)` | bool | Whether one rule protects a given content id/type (public — reused by the WooCommerce paywall widget) |
| `isIncludedInGroup($id, $type, $include)` | bool | Bucket-matching helper for `specific_content_type`/`wc_specific_products`/`fct_specific_products` rules |
| `isGloballyExcluded($contentId, $contentType)` | bool | Public Contents bypass check (see above) |
| `getUserActiveLevelIds($userId)` | int[] | Level IDs from the user's active/trial, non-expired memberships |
| `userHasAnyLevel($userId, $levelIds=[])` | bool | Whether the user holds any of the given levels (or any level at all) |
| `flushUserLevelIds($userId=null)` | void | Clears the per-request level-id cache after a membership mutation |
| `normalizeContentType($contentType)` | string | Maps WC/FluentCart CPT slugs to `wc_product`/`fct_product`/etc. |

---

## RestrictionRenderer (service)

Key public methods (`app/Services/RestrictionRenderer.php`):

| Method | Returns | Description |
|---|---|---|
| `getRedirectUrl($contentId, $contentType)` | string\|false | Redirect URL if the blocking group's `unauthorized_action === 'redirect'`, else `false` |
| `getRestrictionHtml($contentId, $contentType, $dripInfo=null)` | string | Full restriction message + optional CTA button; auto-delegates to the drip message if the content is drip-blocked |
| `getDripRestrictionHtml($dripInfo=null)` | string | Drip-specific message, with a live JS countdown timer when the drip is `after_duration` |
| `getRestrictionNotice($contentId, $contentType)` | string | Plain-text notice (used where a message-only string is needed, not full HTML) |
| `getRestrictionHtmlFromConfig(array $config)` | string | Renders restriction HTML from an already-resolved config (shortcode-level use) |
| `getRestrictedBlockHtml()` | string | Generic HTML for a blocked Gutenberg block with no group config |
| `getCheckoutLoginAttr($buttonUrl)` | string | Adds `data-fmem-checkout-url` to the CTA button for logged-out visitors, wiring up the login popup (chunk 14) |
| `enqueueCheckoutLoginAssets()` | void | Enqueues login popup assets + footer render via `LoginPopupService` |

---

## Hide comments on restricted content

Three hooks in `AccessHandler` suppress comment UI on posts the current user cannot access:

| Method | WordPress filter | Effect |
|---|---|---|
| `filterRestrictedComments($comments, $query)` | `the_comments` | Strips inaccessible comments from `WP_Comment_Query` result |
| `maybeCloseComments($open, $postId)` | `comments_open` | Returns `false` for restricted posts — disables comment form |
| `maybeZeroCommentsCount($count, $postId)` | `get_comments_number` | Returns `0` for restricted posts — hides count in themes |

`filterRestrictedComments` bulk-primes post/meta/term caches (`_prime_post_caches`) before looping
so `hasAccess()` doesn't cause N+1 queries on multi-post comment sets (sidebar widgets, REST).
All three share a per-request `$this->postAccessCache[$postId]` to avoid redundant `hasAccess()` calls.

A companion `rest_prepare_comment` filter protects single-comment REST reads the same way — see chunk 10.

---

## Key facts for docs

- Admins ALWAYS bypass protection — test in incognito / as non-admin user
- A post individually assigned to Access Groups (via the post-editor checklist, chunk 09) is checked
  against ONLY those groups — the group's own content-matching rules are skipped for that post
- If redirect URL is set on the blocking group → visitor is redirected; otherwise restriction HTML is shown in-place
- `entire_website` affects archive/taxonomy/homepage but NOT singular pages (singular handled by `maybeRedirectRestrictedContent`), and can still exclude specific content via the rule's own `exclude_ids`
- Drip check happens BEFORE the redirect and BEFORE partial content — a drip-locked page is never redirected and never shows a partial preview, always the drip message
- Public Contents (Settings → Public Contents) always wins over Access Group rules — check it first when a page unexpectedly isn't protected
- Protection isn't limited to posts/pages — WooCommerce and FluentCart product/category/brand content share the same `hasAccess()` resolution path
