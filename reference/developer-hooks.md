# Developer Hooks

The action and filter hooks Fluent Members emits. Use them to integrate with FluentCRM, build custom email notifications, sync membership events to your CRM, or react to changes in your own code.

**Here's what you'll learn:**

- The membership lifecycle actions (the most-used set).
- Subscription, order, and transaction events (Pro).
- Portal-side and admin-side filters.
- The integration registry filters.
- Email pipeline filters.
- Naming conventions.

**Before you start:** basic PHP and WordPress action/filter knowledge. All hooks are namespaced `fluent_members/...` (forward slash, current) or `fluent-members/...` (hyphen, legacy).

## Membership Lifecycle Actions

These are the stable event surface for integrations. CRM tools (FluentCRM), analytics, and audit logs subscribe to these.

| Hook | Fires when | Args |
|---|---|---|
| `fluent_members/membership_level_assigned` | A membership record is created or a level is (re)assigned, paywall purchase, manual add, native Stripe or PayPal checkout, corporate join, or migration import. | `$membership, $userId` |
| `fluent_members/membership_status_updated` | A membership's status changes for any reason, including cancellation. | `$membership, $userId, $newStatus, $oldStatus` |
| `fluent_members/membership_upgraded` | An admin or member changes an existing membership to a different level. | `$oldMembership, $userId, $newMembership` |
| `fluent_members/membership_suspended` | An admin suspends a membership. | `$membership, $userId` |
| `fluent_members/membership_expired` | The hourly cron (free), or a Pro payment-sync pass, flips an `active`/`trial` row to `expired`. | `$membership, $userId` |
| `fluent_members/membership_level_removed` | A membership record is fully removed (not just status-changed). | `$membership, $userId` |

There's no dedicated "cancelled" action. Cancellation goes through `membership_status_updated` with `$newStatus === 'cancelled'`.

### Example: Log Every New Membership to a Custom Audit Table

```php
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    error_log(sprintf(
        '[FM] User #%d granted membership #%d (Level %s) at %s',
        $userId,
        $membership->id,
        $membership->membership_level_id,
        $membership->created_at
    ));
}, 10, 2);
```

::: tip Catching every transition in one place
If you want a single hook that fires on any status change (cancel, expire, suspend, upgrade, or anything else), use `fluent_members/membership_status_updated` and branch on `$newStatus`.
:::

## Subscription, Order & Transaction Events (Pro)

These fire from the Pro plugin's billing lifecycle, regardless of gateway (Stripe or PayPal).

| Hook | Fires when | Args |
|---|---|---|
| `fluent_members/membership_renewed` | A recurring or WooCommerce-subscription renewal payment succeeds. | `$membership, $userId` |
| `fluent_members/native_membership_created` | A native Stripe or PayPal checkout creates a new membership. | `$membership, ...` |
| `fluent_members/after_order_created` | A new order record is written. | `$order, ...` |
| `fluent_members/after_transaction_processed` | A transaction (charge, renewal, or refund) finishes processing. | `$transaction, ...` |
| `fluent_members/after_subscription_processed` | A subscription record is created or updated from a checkout or webhook. | `$subscription, ...` |

---

## Refund Dispatch

| Hook | Purpose |
|---|---|
| `fluent_members/refund_payment_{gateway_key}` | Per-gateway refund dispatcher, for example `fluent_members/refund_payment_stripe` or `fluent_members/refund_payment_paypal`. The gateway's refund method binds here. |

### Example: Notify Slack When a Refund Is Dispatched

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
There is no single "refund completed" action that fires for every gateway. To react to any refund regardless of gateway, watch for Transaction rows whose `status` flips to `refunded` (via `fluent_members/after_transaction_processed`), or subscribe to `fluent_members/membership_status_updated` if the admin also changes the membership status while refunding.
:::

## Form-Paywall Events

FluentCart, Fluent Forms, WooCommerce, and Paymattic each emit a set of `fluent_members/{src}_*` actions covering payment status changes and subscription lifecycle events. Replace `{src}` with `fc` for FluentCart, `ff` for Fluent Forms, `woocommerce` for WooCommerce, or `paymattic` for Paymattic. Each integration emits its own granular set (skipped, started, processed, refunded, activated, canceled, renewed); the common ones are:

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
| `fluent_members/admin_cancel_membership` | Intercept an admin-triggered cancellation before Fluent Members' default handling runs. |

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

## Admin UI Filters

| Filter | Lets you |
|---|---|
| `fluent_members/top_menu_items` | Add, remove, or reorder items in the Fluent Members top navigation bar (Dashboard, Levels, Access Groups, Members, Orders, Settings). |
| `fluent_members/admin_vars` | Modify the data localized to the admin app's JavaScript, including the current user, feature-detection flags (`has_stripe`, `has_paypal`, `has_fluentcart`, and so on), and onboarding state. |

### Example: Add a Custom Item to the Top Navigation

```php
add_filter('fluent_members/top_menu_items', function ($items) {
    $items[] = [
        'key'       => 'my_reports',
        'label'     => __('Reports', 'my-plugin'),
        'permalink' => admin_url('admin.php?page=fluent-members#/reports'),
    ];
    return $items;
});
```

## Access and Restriction Filters

| Filter | Lets you |
|---|---|
| `fluent_members/rest_forbidden_message` | Customize the message returned when REST content is hidden. |
| `fluent_members/expiry_batch_size` | Tune the hourly expiry cron's batch size (default 100). |
| `fluent_members/woocommerce_bypass_restriction` | Bypass WooCommerce restrictions for specific products (Pro). |

### Example: Raise the Expiry Batch Size for a High-Volume Site

```php
add_filter('fluent_members/expiry_batch_size', fn () => 500);
```

---

## Integration Registry

| Filter | Purpose |
|---|---|
| `fluent_members/get_integrations` | Register an integration with the Access Group picker. |
| `fluent_members/search_integration_content_{key}` | Run content search for an integration, for example `fluent_members/search_integration_content_woocommerce`. |
| `fluent_members/build_integration_selected_options_{key}` | Render selected options for an integration. |
| `fluent_members/payment_methods` | Register a payment method with the checkout system. |

## Email Pipeline Filters

| Filter | Purpose |
|---|---|
| `fluent_members/email_notification_shortcode_groups` | Extend the merge-tag picker shown in the email editor. |
| `fluent_members/prepare_email_template_data` | Manipulate the template data before an email renders (Pro block editor restores the body here). |
| `fluent_members/parse_email_block_content` | Custom block-content parsing for the Pro block editor. |
| `fluent_members/render_block_email_template` | Override how a Pro block email template renders to HTML. |

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

| Filter | Purpose |
|---|---|
| `fluent_members/process_subscription` | Intercept the subscription create/update payload before it's saved. |
| `fluent_members/stripe_request_args` | Modify the full request array before any Stripe API call. |
| `fluent_members/stripe_request_headers` | Modify the headers sent on a Stripe API call. |
| `fluent_members/stripe_request_body` | Modify the request body sent on a Stripe API call. |
| `fluent_members/stripe_webhook_secret` | Override the webhook signing secret Fluent Members verifies incoming webhooks against. |

## Migration Filters and Actions

For PMPro, MemberPress, and Kadence Memberships migrations. Replace `{source}` with `pmpro`, `memberpress`, or `kadence`.

| Hook | Purpose |
|---|---|
| `fluent_members/migration/{source}/import_order` | Intercepts the order-import step for a migration source. |
| `fluent_members/migration/{source}/import_subscription` | Intercepts the subscription-import step, including transferring a live PayPal REST PPCP subscription (Pro, v1.1.0). |
| `fluent_members/migration/{source}/import_transaction` | Intercepts the transaction-import step for a migration source. |
| `fluent_members/migration/{source}/check_paypal_configured` | Bool filter the migration UI uses to show or hide the PayPal import option. |
| `fluent_members/migration/kadence/check_stripe_configured` | Bool filter used by the Kadence migration UI to show Stripe-related options. |
| `fluent_members/migration/kadence/import_payment` | Intercepts the payment-import step specific to the Kadence migration. |
| `fluent_members/migration/{source}/reset_state` | Fires when a migration's state is reset. Available for PMPro, MemberPress, and Kadence; WP-CLI / debug-mode only. |
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
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    $level = FluentMembers\App\Models\MembershipLevel::find($membership->membership_level_id);
    $user  = get_user_by('ID', $userId);

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
