---
chunk: 37
category: Developer Reference
subcategory: Hooks & Filters
query-triggers: [hooks, filters, actions, WordPress hooks, do_action, apply_filters, developer hooks, custom hooks, extend plugin, add_filter, add_action, developer reference]
related-chunks: [35, 36]
source-files: [fluent-members/app/Hooks/Handlers/AccessHandler.php, fluent-members/app/Http/Controllers/EmailNotificationController.php, fluent-members-pro/app/Http/Controllers/EmailNotificationProController.php]
doc-files: [reference/developer-hooks.md]
---

# Developer Hooks & Filters

## WordPress actions fired by Fluent Members

### Member lifecycle

| Hook | When | Parameters |
|---|---|---|
| `fluent_members/member_enrolled` | New membership created (any status) | `$membership` (MembershipUser), `$user` (WP_User) |
| `fluent_members/member_status_changed` | Membership status updated | `$membership`, `$oldStatus` (string), `$newStatus` (string), `$user` |
| `fluent_members/member_cancelled` | Membership cancelled | `$membership`, `$user` |
| `fluent_members/member_expired` | Membership expires (cron) | `$membership`, `$user` |
| `fluent_members/member_suspended` | Membership suspended | `$membership`, `$user` |

### Subscription lifecycle (Pro)

| Hook | When | Parameters |
|---|---|---|
| `fluent_members/subscription_created` | New subscription record created | `$subscription` (MembershipSubscription) |
| `fluent_members/subscription_cancelled` | Subscription cancelled | `$subscription` |
| `fluent_members/subscription_renewed` | Subscription renewed (payment succeeded) | `$subscription` |
| `fluent_members/subscription_payment_failed` | Subscription payment failed | `$subscription` |

### Stripe Webhook (Pro)

| Hook | When | Parameters |
|---|---|---|
| `fluent_members/stripe_webhook_received` | Any Stripe webhook event received | `$event` (Stripe Event object) |

---

## WordPress filters provided by Fluent Members

### Content protection

| Filter | Returns | Parameters | Description |
|---|---|---|---|
| `fluent_members/rest_forbidden_message` | string | `$message`, `$post`, `$request` | Customize REST API 403/401 message |

### Email notifications

| Filter | Returns | Parameters | Description |
|---|---|---|---|
| `fluent_members/email_notification_shortcode_groups` | array | `$groups` | Add custom merge tag groups to the email editor picker |
| `fluent_members/prepare_email_template_data` | array | `$settingsWithoutTemplate`, `$fullSettings` | Pro: restore block email body before saving |

### Access control

| Filter | Returns | Parameters | Description |
|---|---|---|---|
| `fluent_members/has_access` | bool | `$hasAccess`, `$userId`, `$postId`, `$postType` | Override access check result |
| `fluent_members/cached_access_groups` | array | `$accessGroups`, `$userId` | Modify user's resolved access group IDs |

### Shortcode / checkout

| Filter | Returns | Parameters | Description |
|---|---|---|---|
| `fluent_members/level_providers` | array | `$providers`, `$levelId` | Modify available providers for a level's pricing card |
| `fluent_members/checkout_redirect_url` | string | `$url`, `$levelId`, `$priceId` | Override the URL a member is redirected to after checkout |

---

## Usage examples

### Custom merge tag in emails

```php
add_filter('fluent_members/email_notification_shortcode_groups', function($groups) {
    $groups[] = [
        'title'      => 'Order Data',
        'shortcodes' => [
            ['key' => '{{order_total}}', 'title' => 'Last Order Total'],
        ],
    ];
    return $groups;
});
```

### Override REST forbidden message

```php
add_filter('fluent_members/rest_forbidden_message', function($msg, $post, $request) {
    return 'Members only. <a href="/pricing">See plans</a>';
}, 10, 3);
```

### Custom access override

```php
add_filter('fluent_members/has_access', function($hasAccess, $userId, $postId, $postType) {
    // Let admins of a custom role always bypass
    if (current_user_can('my_custom_role')) return true;
    return $hasAccess;
}, 10, 4);
```

---

## Cron jobs

| Cron hook | Schedule | What it does |
|---|---|---|
| `fluent_members_check_expired_memberships` | Hourly | Finds MembershipUsers where `expires_at` < now AND `status` = `active`/`trial`; sets to `expired`; fires `fluent_members/member_expired` action |

---

## Doc file

`reference/developer-hooks.md`
