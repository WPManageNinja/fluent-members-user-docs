---
chunk: 10
category: Content Protection
subcategory: REST API Protection
query-triggers: [REST API, rest_prepare, API protection, headless, JSON API, 401, forbidden, rest_authorization_required_code, fluent_members_rest_forbidden]
related-chunks: [04, 06]
source-files: [app/Hooks/Handlers/AccessHandler.php, app/Services/AccessHelper.php]
doc-files: [guide/access-groups/protected-content.md]
---

# Content Protection — REST API Protection

## What it is

Fluent Members protects WordPress REST API responses for post types that are also protected by Access Groups. Headless frontends and API consumers receive a 401/403 error instead of the post content for unauthorised users.

---

## Registration

```php
add_action('rest_api_init', [$this, 'registerRestApiProtection']);
```

`registerRestApiProtection()` iterates all public post types and adds a filter for each:

```php
$postTypes = get_post_types(['public' => true], 'names');
foreach ($postTypes as $postType) {
    add_filter("rest_prepare_{$postType}", [$this, 'protectRestContent'], 20, 3);
}
```

**Priority 20**: fires after other plugins that modify the REST response.

---

## `protectRestContent($response, $post, $request)` flow

```
AccessHelper::isAdmin() → true → return $response unchanged
get $userId (0 if logged out)
get $postId from $post->ID
get $postType from $post->post_type
AccessHelper::hasAccess($userId, $postId, $postType) → true → return $response unchanged
→ access denied:
    $message = apply_filters('fluent_members/rest_forbidden_message', default_message, $post, $request)
    return new WP_REST_Response(
        {
            'code'    => 'fluent_members_rest_forbidden',
            'message' => $message,
            'data'    => { 'status' => rest_authorization_required_code() }
        },
        rest_authorization_required_code()   // 401 or 403 depending on WP auth state
    )
```

---

## Response shape when access is denied

```json
{
  "code": "fluent_members_rest_forbidden",
  "message": "You do not have permission to view this content.",
  "data": {
    "status": 401
  }
}
```

HTTP status code: `rest_authorization_required_code()` — returns 401 for unauthenticated users, can return 403 for authenticated users without permission.

---

## Filter: `fluent_members/rest_forbidden_message`

Customize the error message returned by the REST API for blocked content.

```php
add_filter('fluent_members/rest_forbidden_message', function($message, $post, $request) {
    return 'Members only content. Please subscribe.';
}, 10, 3);
```

Parameters: `$message` (string), `$post` (WP_Post), `$request` (WP_REST_Request)

---

## What IS and IS NOT protected

**IS protected**: Any public post type with posts assigned to an Access Group — the `rest_prepare_{$postType}` filter fires for these.

**IS NOT protected**: Custom REST API endpoints (e.g. `/wp-json/your-plugin/v1/custom`) — these are not covered automatically. To protect custom endpoints, call `AccessHelper::hasAccess()` from your own controller before returning the response.

**IS NOT protected**: Private/non-public post types — the loop only registers filters for `get_post_types(['public' => true])`.

---

## Admin bypass

`AccessHelper::isAdmin()` returns true → response is always returned unchanged. Admins see protected content through the API.

---

## Doc notes

The REST API protection is automatic once a post is assigned to an Access Group. No configuration required. Mention this in `guide/access-groups/protected-content.md` as a side effect of assigning content to groups.
