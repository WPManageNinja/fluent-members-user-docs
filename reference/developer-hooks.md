# Developer Hooks

The action and filter hooks Fluent Members emits. Use them to integrate with FluentCRM, build custom email notifications, sync membership events to your CRM, or react to changes in your own code.

**Here's what you'll learn:**

- The member lifecycle actions (the most-used set).
- Subscription and Stripe / payment events (Pro).
- Portal-side filters.
- The integration registry filters.
- Email pipeline filters.
- Naming conventions.

**Before you start:** basic PHP and WordPress action/filter knowledge. All hooks are namespaced `fluent_members/...` (forward slash, current) or `fluent-members/...` (hyphen, legacy).

## Member Lifecycle Actions

These are the stable event surface for integrations. CRM tools (FluentCRM), analytics, and audit logs subscribe to these.

| Hook | Fires when | Args |
|---|---|---|
| `fluent_members/member_enrolled` | A new membership record is created (paywall purchase, manual add, native Stripe or PayPal checkout, corporate join). | `$membership, $user` |
| `fluent_members/member_status_changed` | A membership's status changes for any reason. | `$membership, $oldStatus, $newStatus, $user` |
| `fluent_members/member_cancelled` | A member or admin cancels, or a provider webhook reports the subscription ended. | `$membership, $user` |
| `fluent_members/member_expired` | The hourly cron flips an `active`/`trial` row to `expired`. | `$membership, $user` |
| `fluent_members/member_suspended` | An admin suspends a membership. | `$membership, $user` |

### Example: Log Every Enrollment to a Custom Audit Table

```php
add_action('fluent_members/member_enrolled', function ($membership, $user) {
    error_log(sprintf(
        '[FM] %s granted membership #%d (Level %s) at %s',
        $user->user_email,
        $membership->id,
        $membership->membership_level_id,
        $membership->created_at
    ));
}, 10, 2);
```

::: tip Catching every transition in one place
If you want a single hook that fires on any status change (not just cancel/expire/suspend individually), use `fluent_members/member_status_changed` and branch on `$newStatus`.
:::

## Subscription Events (Pro)

These fire from the Pro plugin's subscription lifecycle, regardless of gateway (Stripe or PayPal).

| Hook | Fires when |
|---|---|
| `fluent_members/subscription_created` | A new subscription record is created. |
| `fluent_members/subscription_renewed` | A renewal payment succeeds. |
| `fluent_members/subscription_payment_failed` | A renewal payment fails. |
| `fluent_members/subscription_cancelled` | A subscription is cancelled. |

## Stripe Webhook Event (Pro)

| Hook | Fires when | Args |
|---|---|---|
| `fluent_members/stripe_webhook_received` | Any Stripe webhook event is received, before it's routed to a specific handler. | `$event` (Stripe Event object) |

---

## Refund Dispatch

| Hook | Purpose |
|---|---|
| `fluent_members/refund_payment_{gateway_key}` | Per-gateway refund dispatcher, for example `fluent_members/refund_payment_stripe`. The gateway's refund method binds here. |

### Example: Notify Slack When a Stripe Refund Is Dispatched

```php
add_action('fluent_members/refund_payment_stripe', function ($transaction, $refundData) {
    wp_remote_post('https://hooks.slack.com/services/...', [
        'body' => json_encode([
            'text' => sprintf('Refunding $%s for member #%d', $refundData['amount'] ?? 0, $transaction->user_id)
        ])
    ]);
}, 10, 2);
```

::: warning No global refund event
There is no single "refund completed" action that fires for every gateway. To react to any refund regardless of gateway, watch for Transaction rows whose `status` flips to `refunded`, or subscribe to `fluent_members/member_cancelled` when the admin ticks "Also cancel membership" on the Refund modal.
:::

## Form-Paywall Events

FluentCart, Fluent Forms, and Paymattic each emit a set of `fluent_members/{src}_*` actions covering payment status changes and subscription lifecycle events. Replace `{src}` with `fc` for FluentCart, `ff` for Fluent Forms, or `paymattic` for Paymattic.

| Hook | Fires on |
|---|---|
| `fluent_members/{src}_payment_processed` | A successful payment was processed. |
| `fluent_members/{src}_payment_refunded` | A refund landed via the host plugin. |
| `fluent_members/{src}_subscription_activated` | A recurring subscription was activated. |
| `fluent_members/{src}_subscription_canceled` | A subscription was cancelled. |
| `fluent_members/{src}_subscription_renewed` | A renewal payment succeeded. |


## Portal and Member-Side Filters

| Filter | Lets you |
|---|---|
| `fluent_members/portal_memberships` | Rewrite the list returned to the Member Portal. |
| `fluent_members/portal_membership_detail` | Rewrite a single membership's detail in the portal. |
| `fluent_members/portal_cancel_membership` | Intercept a self-cancel request (free, local path). |
| `fluent_members/portal_provider_cancel_membership` | Intercept a self-cancel request at the provider level (Pro). |
| `fluent_members/portal_app_data` | Inject feature flags or data into the portal's front-end app. |

### Example: Add a Custom Panel to the Member Portal

```php
add_filter('fluent_members/portal_app_data', function ($data) {
    $data['custom_panel'] = [
        'title'   => 'My Bonus Content',
        'enabled' => true,
        'url'     => '/bonus',
    ];
    return $data;
});
```

## Access and Restriction Filters

| Filter | Lets you |
|---|---|
| `fluent_members/has_access` | Override the final access-check result for a user/post. |
| `fluent_members/cached_access_groups` | Modify a user's resolved Access Group IDs before caching. |
| `fluent_members/rest_forbidden_message` | Customize the message returned when REST content is hidden. |
| `fluent_members/expiry_batch_size` | Tune the hourly expiry cron's batch size (default 100). |
| `fluent_members/woocommerce_bypass_restriction` | Bypass WooCommerce restrictions for specific products (Pro). |

### Example: Let a Custom Role Always Bypass Restrictions

```php
add_filter('fluent_members/has_access', function ($hasAccess, $userId, $postId, $postType) {
    if (current_user_can('my_custom_role')) {
        return true;
    }
    return $hasAccess;
}, 10, 4);
```

### Example: Raise the Expiry Batch Size for a High-Volume Site

```php
add_filter('fluent_members/expiry_batch_size', fn () => 500);
```

---

## Integration Registry

| Filter | Purpose |
|---|---|
| `fluent_members/get_integrations` | Register an integration with the Access Group picker. |
| `fluent_members/search_integration_content_{key}` | Run content search for an integration. |
| `fluent_members/build_integration_selected_options_{key}` | Render selected options for an integration. |
| `fluent_members/payment_methods` | Register a payment method with the checkout system. |

## Shortcode and Checkout Filters

| Filter | Lets you |
|---|---|
| `fluent_members/level_providers` | Modify the available payment providers for a level's pricing card. |
| `fluent_members/checkout_redirect_url` | Override the URL a member is redirected to after checkout. |

## Email Pipeline Filters

| Filter | Purpose |
|---|---|
| `fluent_members/default_notifications` | Add a custom notification type (subject, body, recipient, triggering event). |
| `fluent_members/email_notification_shortcode_groups` | Extend the merge-tag picker shown in the email editor. |
| `fluent_members/prepare_email_template_data` | Manipulate the template data before an email renders (Pro block editor restores the body here). |
| `fluent_members/parse_email_block_content` | Custom block-content parsing for the Pro block editor. |

### Example: Register a Custom Merge Tag Group

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

See [Email Merge Tags](/reference/email-merge-tags) for the full built-in tag list.

## Stripe-Specific Filters (Pro)

| Filter | Default |
|---|---|
| `fluent_members/stripe/setup_intent_rate_limit_max_attempts` | 5 (per member per hour) |
| `fluent_members/stripe/setup_intent_rate_limit_ttl` | 3600 (1 hour, in seconds) |
| `fluent_members/process_subscription` | Intercept the subscription create/update payload. |
| `fluent_members/stripe/cancellation_mode` | `immediate` or `end_of_period` (sets the global cancellation mode). |

## Migration Filters and Actions

For PMPro, MemberPress, and Kadence Memberships migrations. Replace `{source}` with `pmpro`, `memberpress`, or `kadence`.

| Hook | Purpose |
|---|---|
| `fluent_members/migration/{source}/import_subscription` | Intercepts the subscription-import step to transfer a live PayPal REST PPCP subscription (Pro, v1.1.0). |
| `fluent_members/migration/{source}/check_paypal_configured` | Bool filter the migration UI uses to show or hide the PayPal import option. |
| `fluent_members/migration/kadence/check_stripe_configured` | Bool filter used by the Kadence migration UI to show Stripe-related options. |
| `fluent_members/migration/kadence/reset_state` | Fires when the Kadence migration state is reset. Kadence is the only source with a reset endpoint, and it's WP-CLI / debug-mode only. |
| `fluent_members/paypal_ipn_continuation_sources` | Registers a migration source so Fluent Members takes over legacy PayPal IPN routing once the source plugin is deactivated. |

See [Migration: Overview](/guide/settings/migration/) for the wizard flow these hooks plug into.

## Naming Conventions

- **New code uses `fluent_members/`**: forward slash. This is the stable contract.
- **Legacy code uses `fluent-members/`**: hyphen. Kept for backwards compatibility.
- **Per-integration sub-namespaces use `fluent_members/{integration}_*`**.

If you're writing new hook listeners, target the forward-slash form; it's what we recommend going forward.

## A Full Example: Slack Notification on Signup

```php
// In your theme's functions.php or a small custom plugin
add_action('fluent_members/member_enrolled', function ($membership, $user) {
    $level = FluentMembers\App\Models\MembershipLevel::find($membership->membership_level_id);

    wp_remote_post('https://hooks.slack.com/services/T00/B00/XXX', [
        'body' => json_encode([
            'text' => sprintf(
                ':tada: New member: %s joined %s',
                $user->display_name,
                $level->title
            )
        ]),
        'headers' => ['Content-Type' => 'application/json'],
    ]);
}, 10, 2);
```

From now on, every new member announces themselves in your Slack channel.

