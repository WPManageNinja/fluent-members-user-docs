---
title: "Developer Hooks"
description: "A curated list of the Fluent Members actions and filters site owners use most, with their arguments."
---

# Developer Hooks

**Developer hooks** let your own code react to membership events and change how Fluent Members behaves. Use them to notify another system when someone joins, or to adjust a limit. This page lists the hooks most useful to site owners. For the full list, see the [Dev Docs](https://developers.fluentmembers.com/).

All hooks on this page start with `fluent_members/`. Hooks marked (Pro) only fire when Fluent Members Pro is active. Put your code in a small custom plugin or your child theme's `functions.php`.

## Membership Actions

| Action | Fires when | Arguments |
|---|---|---|
| `fluent_members/membership_level_assigned` | A member gets a membership, or regains access they already had | `$membership, $userId, $context` |
| `fluent_members/membership_renewed` | A renewal payment succeeds | `$membership, $userId` |
| `fluent_members/membership_status_updated` | A membership status changes | `$membership, $userId, $newStatus, $oldStatus` |
| `fluent_members/membership_suspended` | A membership is suspended, by an admin or after a failed payment | `$membership, $userId` |
| `fluent_members/membership_expiring` | The daily check finds a membership close to its expiry date | `$membership, $userId, $days` |
| `fluent_members/membership_expired` | A membership expires | `$membership, $userId` |
| `fluent_members/membership_cancelled` | A cancellation is announced, including one scheduled for later | `$membership, $userId, $oldStatus` |
| `fluent_members/membership_cancellation_scheduled` | A cancellation is set to take effect at the expiry date | `$membership, $userId` |
| `fluent_members/membership_cancellation_withdrawn` | A scheduled cancellation is undone | `$membership, $userId` |
| `fluent_members/membership_level_removed` | A membership is cancelled and the member loses the level | `$membership, $userId` |
| `fluent_members/membership_upgraded` | A member moves to another level and the old membership becomes `upgraded` | `$oldMembership, $userId, $newMembership` |
| `fluent_members/membership_plan_changed` | A plan change finishes, including any seats moved | `$oldMembership, $newMembership, $movedSeatIds` |
| `fluent_members/membership_upgrade_completed` (Pro) | A native Stripe or PayPal upgrade completes | `$membership, $oldMembership, $subscription` |

`$context` is not always passed. It is `restored` when a member regains access, for example after **Reactivate**, and `plan_changed` when a seat moves during a plan change. Accept two arguments if you do not need it, as the example below does.

> [!Note]
> `fluent_members/membership_status_updated` does not fire on every path. When a Stripe or PayPal subscription ends and expires its membership, only `fluent_members/membership_expired` is guaranteed. Listen to both if you need every expiry.

### Example: Post New Members to Slack

```php
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    $level = \FluentMembers\App\Models\MembershipLevel::find($membership->membership_level_id);
    $user  = get_user_by('ID', $userId);

    wp_remote_post('https://hooks.slack.com/services/T00/B00/XXX', [
        'headers' => ['Content-Type' => 'application/json'],
        'body'    => wp_json_encode([
            'text' => sprintf('New member: %s joined %s', $user->display_name, $level->title),
        ]),
    ]);
}, 10, 2);
```

## Native Payment Actions (Pro)

These fire for native Stripe and PayPal payments.

| Action | Fires when | Arguments |
|---|---|---|
| `fluent_members/native_membership_created` | A native checkout creates a membership | `$membership, $order, $subscription` |
| `fluent_members/native_subscription_synced` | A native subscription is synced to an existing membership | `$membership, $order, $subscription` |
| `fluent_members/after_order_created` | An order is saved | `$order, $pricing, $orderData` |
| `fluent_members/after_transaction_processed` | A transaction is saved | `$transaction, $order, $subscription, $transactionData` |
| `fluent_members/after_subscription_processed` | A subscription is created or updated | `$subscription, $order, $pricing, $subscriptionData` |
| `fluent_members/native_payment_refunded` | A refund is confirmed | `$membership, $refundTransaction, $amount, $currency` |

`$subscription` is `null` for one-time payments on `fluent_members/native_membership_created`.

## Paywall Actions

Use these to watch purchases made through a connected plugin, or to log why a purchase did not grant access.

| Action | Fires when | Arguments |
|---|---|---|
| `fluent_members/paywall_added` | A paywall is attached to a level | `$level, $paywall` |
| `fluent_members/paywall_removed` | A paywall is removed from a level | `$level, $paywallId, $requestData` |
| `fluent_members/membership_not_stored` | A paid purchase could not create a membership | `$provider, $sourceId, $levelId, $reason` |
| `fluent_members/paywall_event_failed` | A paywall event failed to process | `$provider, $sourceId, $event, $message` |
| `fluent_members/ff_payment_processed` | A Fluent Forms payment grants access | `$submission, $levelIds` |
| `fluent_members/ff_payment_refunded` | A Fluent Forms payment is refunded | `$refund, $transaction, $submission` |
| `fluent_members/ff_subscription_renewed` | A Fluent Forms subscription renews | `$membership, $subscription` |
| `fluent_members/ff_subscription_canceled` | A Fluent Forms subscription is cancelled | `$subscription, $submission` |
| `fluent_members/paymattic_payment_processed` | A Paymattic payment grants access | `$submission, $levelIds` |
| `fluent_members/paymattic_payment_refunded` | A Paymattic payment is refunded | `$refund, $formId, $charge` |
| `fluent_members/paymattic_subscription_renewed` | A Paymattic subscription renews | `$membership, $subscription` |
| `fluent_members/paymattic_subscription_canceled` | A Paymattic subscription is cancelled | `$subscription, $submission` |
| `fluent_members/fluentcart_payment_skipped` | A FluentCart order did not grant access | `$reason, $data` |
| `fluent_members/woocommerce_payment_skipped` (Pro) | A WooCommerce order did not grant access | `$reason, $order` |

`$reason` on `fluent_members/membership_not_stored` is one of `not_prepared`, `source_already_granted` or `storage_failed`.

## Member Portal Filters

| Filter | Changes | Arguments |
|---|---|---|
| `fluent_members/portal_memberships` | The list of memberships shown in the portal | `$memberships, $user` |
| `fluent_members/portal_membership_detail` | The data for one membership | `$membershipData, $membership, $user` |
| `fluent_members/portal_stat_cards` | The stat cards at the top of the portal | `$cards, $user` |
| `fluent_members/portal_app_data` | The data passed to the portal app | `$portalAppData, $handle` |
| `fluent_members/portal_cancel_membership` | How a member's cancel request is handled | `null, $membership, $request` |
| `fluent_members/admin_cancel_membership` | How an admin's cancel request is handled | `null, $membership, $request` |

The two cancel filters start with `null`. Return `true` to mark the cancellation as handled, or a `WP_Error` to refuse it with a message. Leave `null` to let Fluent Members handle it.

## Access Filters

| Filter | Changes | Arguments |
|---|---|---|
| `fluent_members/shortcode_user_can_access` | Who can see `[fluent_members]` content. Return `true` or `false` to decide, or `null` to keep the normal check. | `null, $userId, $levelIds` |
| `fluent_members/shortcode_restricted_html` | The HTML shown to people without access | `$html, $config` |
| `fluent_members/rest_forbidden_message` | The message in a blocked REST API response | `$message, $post, $request` |
| `fluent_members/hide_from_lists_post_types` | The post types that can be hidden from listings | `$types` |
| `fluent_members/woocommerce_bypass_restriction` (Pro) | Whether a WooCommerce product skips restriction | `false, $productId, $context` |

## Limit and Schedule Filters

| Filter | Default | Notes |
|---|---|---|
| `fluent_members/expiry_batch_size` | `100` | Memberships expired per hourly run, from 1 to 1000 |
| `fluent_members/expiring_batch_size` | `100` | Memberships checked per daily run for the expiring notice, from 1 to 1000 |
| `fluent_members/expiring_notice_days` | Your **Membership Expiring** setting | Days before expiry, from 1 to 90 |
| `fluent_members/membership_levels_render_limit` | `20` | The most levels `[fluent_membership_levels]` shows |

### Example: Expire More Memberships per Run

```php
add_filter('fluent_members/expiry_batch_size', function () {
    return 500;
});
```

## Admin and Email Filters

| Filter | Changes | Arguments |
|---|---|---|
| `fluent_members/top_menu_items` | The items in the top navigation of the Fluent Members app | `$menuItems` |
| `fluent_members/admin_vars` | The data passed to the admin app | `$defaultVars` |
| `fluent_members/email_notification_shortcode_groups` | The groups in the email smartcode picker | `$groups` |
| `fluent_members/email_editor_smartcode_groups` (Pro) | The groups in the custom email editor picker | `$groups` |

> [!Note]
> The two picker filters only change what the picker lists. They do not fill in a new code, so a code you add yourself appears in the email exactly as typed. See [Email Smartcodes](/reference/email-smartcodes) for the codes that work.

### Example: Add an Item to the Top Navigation

```php
add_filter('fluent_members/top_menu_items', function ($items) {
    $items[] = [
        'key'       => 'my_reports',
        'label'     => __('Reports', 'my-plugin'),
        'permalink' => admin_url('admin.php?page=my-reports'),
    ];

    return $items;
});
```

## Scheduled Tasks

Fluent Members uses three WordPress cron events:

| Event | Runs | Does |
|---|---|---|
| `fluent_members_check_expired_memberships` | Hourly | Expires memberships past their expiry date |
| `fluent_members_check_expiring_memberships` | Daily | Finds memberships close to expiry and sends the notice |
| `fluent_members_daily_cleanup` | Daily | Removes old email notice records, then fires `fluent_members/daily_cleanup` |
