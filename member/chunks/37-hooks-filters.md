---
chunk: 37
category: Developer Reference
subcategory: Hooks & Filters
query-triggers: [hooks, filters, actions, WordPress hooks, do_action, apply_filters, developer hooks, custom hooks, extend plugin, add_filter, add_action, developer reference]
related-chunks: [35, 36]
source-files: [fluent-members/app/Services/MembershipService.php, fluent-members/app/Hooks/Handlers/MembershipCronHandler.php, fluent-members/app/Http/Controllers/MembershipLevelController.php, fluent-members-pro/app/Hooks/actions.php]
doc-files: [reference/developer-hooks.md]
---

# Developer Hooks & Filters

The previous version of this chunk listed hook names (`fluent_members/member_enrolled`, `member_status_changed`, `subscription_created`, `has_access`, `checkout_redirect_url`, etc.) that do **not** exist anywhere in the actual codebase. Everything below was found by grepping `do_action('fluent_members/` and `apply_filters('fluent_members/` across both plugins — treat this list as ground truth, the old one as fully obsolete.

---

## Membership lifecycle actions

| Hook | Fired by / when |
|---|---|
| `fluent_members/membership_level_assigned` | A `MembershipUser` record is created (manual add, paywall purchase, native checkout, migration) |
| `fluent_members/membership_status_updated` | Status changed via `MembershipUserController@updateStatus` (generic transitions not covered by a dedicated hook below) |
| `fluent_members/membership_suspended` | Admin suspends a membership |
| `fluent_members/membership_expired` | Cron finds an expired membership and flips it to `expired` |
| `fluent_members/membership_expiring` | Cron finds a membership approaching `expires_at` (advance-warning pass, separate from the expiry pass) |
| `fluent_members/membership_renewed` | A lapsed (`expired`) membership is restored to `active` by a provider's renewal handler (e.g. WooCommerce Subscriptions renewal) |
| `fluent_members/membership_upgraded` | An old membership is superseded by a new one on the same level (status set to `upgraded`) |
| `fluent_members/membership_upgrade_completed` | A Pro subscription upgrade flow finishes |
| `fluent_members/membership_level_removed` | A membership record is removed |
| `fluent_members/level_duplicated` | `MembershipLevelController@duplicate` finishes cloning a level |
| `fluent_members/paywall_added` / `fluent_members/paywall_removed` | A paywall (product/form) is linked/unlinked from a level |

## Billing / native payment actions (Pro)

| Hook | Fired by / when |
|---|---|
| `fluent_members/after_order_created` | A `MembershipOrder` row is created |
| `fluent_members/after_subscription_processed` | A `MembershipSubscription` row is created/updated from a payment event |
| `fluent_members/after_transaction_processed` | A `MembershipTransaction` row is created |
| `fluent_members/native_membership_created` | A native (Stripe/PayPal) checkout creates the `MembershipUser` |
| `fluent_members/native_subscription_synced` | A native subscription's local record is synced from the provider |

## Provider-specific payment-lifecycle actions

Fluent Forms and Paymattic checkouts fire their own detailed lifecycle hooks (useful for custom automations tied to a specific paywall provider):

- `fluent_members/ff_payment_processed`, `ff_payment_skipped`, `ff_payment_status_change`, `ff_payment_refunded`, `ff_refund_started`, `ff_subscription_processed`, `ff_subscription_activated`, `ff_subscription_renewed`, `ff_subscription_renewal_started`, `ff_subscription_renewal_skipped`, `ff_subscription_canceled`, `ff_subscription_cancellation_started`
- `fluent_members/paymattic_payment_processed`, `paymattic_payment_success`, `paymattic_payment_skipped`, `paymattic_payment_refunded`, `paymattic_payment_refunded_via_status_change`, `paymattic_refund_started`, `paymattic_subscription_renewed`, `paymattic_subscription_canceled`, `paymattic_subscription_cancellation_started`

## Editor / misc actions

| Hook | Fired by / when |
|---|---|
| `fluent_members/block_editor_head` | Pro's block email editor page head render |
| `fluent_members/new_block_editor_footer` | Pro's block email editor page footer render |
| `fluent_members/portal_assets_enqueued` | Member Portal page assets enqueued |
| `fluent_members/register_payment_methods` | Payment method registry building (hook a custom payment method in) |
| `fluent_members/rendering_admin_app` | Admin app shell about to render |

---

## Key filters

### Access control & content

| Filter | Returns | Description |
|---|---|---|
| `fluent_members/get_integrations` | array | Register an integration's restriction types (used by the WooCommerce/FluentCart connectors to add their scope types — see chunk 04) |
| `fluent_members/content_option_prefix_bucket_map` | array | Extend the option-value-prefix → storage-bucket map for a custom restriction content type |
| `fluent_members/shortcode_user_can_access` | bool | Override whether the current user can see `[fluent_membership_level]` shortcode-gated content |
| `fluent_members/shortcode_restricted_html` | string | Override the HTML shown when a shortcode is restricted |

### Admin / member data

| Filter | Returns | Description |
|---|---|---|
| `fluent_members/admin_vars` | array | Extend the admin app's bootstrap vars (e.g. WooCommerce integration pushes `features.has_woocommerce` here) |
| `fluent_members/admin_member_detail` / `admin_member_details_response` / `admin_member_membership_detail` | array | Shape the admin Member Detail screen's data |
| `fluent_members/admin_cancel_membership` | bool\|array\|WP_Error\|null | Let an integration take over admin-initiated cancellation instead of the default `MembershipService::cancelMembership()` |

### Member Portal

| Filter | Returns | Description |
|---|---|---|
| `fluent_members/portal_app_data` | array | Extend the portal's bootstrap data |
| `fluent_members/portal_memberships` / `portal_membership_detail` | array | Shape what the portal's list/detail endpoints return |
| `fluent_members/portal_cancel_membership` / `portal_provider_cancel_membership` | mixed | Hook a provider-specific cancellation into the portal's self-cancel flow |

### Email

| Filter | Returns | Description |
|---|---|---|
| `fluent_members/email_notification_shortcode_groups` | array | Add custom merge tag groups to the (free) email editor's merge-tag picker |
| `fluent_members/email_editor_smartcode_groups` | array | Same idea, for the Pro block editor's smartcode picker |
| `fluent_members/prepare_email_template_data` | array | Restore fields the free save handler strips before persisting (Pro uses this to keep block content) |
| `fluent_members/parse_email_block_content` | string | Render block content to HTML (Pro block editor) |
| `fluent_members/render_block_email_template` | string | Wrap rendered block HTML with the mailing header/footer |

### Payments (Pro — Stripe/PayPal internals, mostly not needed for typical customization)

`fluent_members/stripe_request_args`, `stripe_request_body`, `stripe_request_headers`, `stripe_webhook_secret`, `stripe_lock_ttl`, `stripe_connect_base`, `stripe_connect_callback_param`, `paypal_partner_id`, `paypal_partner_client_id`, `paypal_partner_bn_code`, `paypal_bn_code`, `paypal_connect_broker_url`, `paypal_lock_ttl`, `paypal_disable_webhook_verification`, `paypal_ipn_continuation_sources`, `process_subscription`, `process_transaction`, `create_order`, `native_pricing_providers`, `payment_methods`, `subscription_upgrade_targets`.

---

## Usage examples

### Register a custom restriction type

```php
add_filter('fluent_members/get_integrations', function ($integrations) {
    $integrations['my_plugin'] = [
        'restriction_types' => [
            ['value' => 'my_plugin_all_items', 'label' => 'All My Items', 'category' => 'My Plugin'],
        ],
    ];
    return $integrations;
});
```

### Add a custom merge tag

```php
add_filter('fluent_members/email_notification_shortcode_groups', function ($groups) {
    $groups[] = [
        'title'      => 'Order Data',
        'shortcodes' => [
            ['key' => '{{order_total}}', 'title' => 'Last Order Total'],
        ],
    ];
    return $groups;
});
```

### React to a membership being assigned

```php
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    // $membership is a MembershipUser model instance
}, 10, 2);
```

---

## Cron jobs (`app/Hooks/Handlers/MembershipCronHandler.php`)

| Cron hook | Schedule | What it does |
|---|---|---|
| `fluent_members_check_expired_memberships` | Hourly | Finds active/trial memberships past `expires_at`, sets `expired`, fires `fluent_members/membership_expired` |
| `fluent_members_check_expiring_memberships` | Daily | Finds memberships approaching `expires_at` (an advance-warning pass), fires `fluent_members/membership_expiring` — this second cron job did not exist in the previous version of this chunk |

---

## Doc file

`reference/developer-hooks.md`
