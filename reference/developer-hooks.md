# Developer Hooks

The action and filter hooks Fluent Members emits. Use them to integrate with FluentCRM, build custom email notifications, sync membership events to your CRM, or react to changes in your own code.
If you're following along, meet **Ravi**, the senior developer on Sara's team who hooks into these events. Ravi's examples are concrete.

**Here's what you'll learn:**
- The lifecycle actions (the most-used set).
- Stripe / payment events.
- Portal-side filters.
- The integration registry filters.
- Email pipeline filters.
- Naming conventions.

**Before we start:** Basic PHP and WordPress action/filter knowledge. All hooks are namespaced, `fluent_members/...` (modern) or `fluent-members/...` (legacy).

---

## Lifecycle actions, the stable contract

These five actions are the *stable* event surface for integrations. CRM tools (FluentCRM), analytics, and audit logs subscribe to these.

| Hook                                              | Fires when                                                      | Args                       |
|---------------------------------------------------|------------------------------------------------------------------|-----------------------------|
| `fluent_members/membership_level_assigned`        | A user gains a Level (paywall purchase, manual add, native Stripe checkout, corporate join). | `$membership, $userId` |
| `fluent_members/membership_level_removed`         | An admin removes a Level from a user.                            | `$membership, $userId`       |
| `fluent_members/membership_expired`               | The hourly cron flips an `active`/`trial` row to `expired`.      | `$membership, $userId`       |
| `fluent_members/membership_cancelled`             | A member or admin cancels, or Stripe sends `customer.subscription.deleted`. | `$membership, $userId` |
| `fluent_members/membership_suspended`             | An admin suspends a membership.                                  | `$membership, $userId`       |
| `fluent_members/membership_renewed`               | A subscription renewal succeeds (Stripe `invoice.paid` or paywall renewal). | `$membership, $userId` |

### Ravi's example, log every assignment to a custom audit table

```php
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    error_log(sprintf(
        '[FM] %s granted membership #%d (Level %s) at %s',
        get_userdata($userId)->user_email,
        $membership->id,
        $membership->membership_level_id,
        $membership->created_at
    ));
}, 10, 2);
```

---

## Stripe / payment events

These fire from the Pro plugin only.

| Hook                                                          | Purpose                                          |
|----------------------------------------------------------------|---------------------------------------------------|
| `fluent_members/register_payment_methods`                     | Gateways self-register on this action.            |
| `fluent_members/after_subscription_processed`                 | After a subscription row is inserted/updated.     |
| `fluent_members/before_render_payment_method_{slug}`          | Per-gateway settings page render hook.            |
| `fluent_members/paywall_added`                                | A Level → product mapping was added.              |
| `fluent_members/paywall_removed`                              | A mapping was removed.                            |
| `fluent_members/refund_payment_{gateway_key}`                 | Per-gateway refund dispatcher (e.g. `fluent_members/refund_payment_stripe`). The gateway's `refundPayment` method binds here. **There is no global "refund completed" action in 1.0.** To detect every refund, watch for new Transaction rows whose `type='refund'`, or subscribe to `fluent_members/membership_cancelled` when admin ticked "Also cancel membership" on the Refund modal. |

### Ravi's example, react when a Stripe refund is dispatched

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
If you need to react to *every* refund regardless of gateway, write a small handler that watches the Transaction table for new rows with `type='refund'`. The plugin doesn't fan out one universal action.
:::

---

## Form-paywall events

FluentCart, Fluent Forms, and Paymattic each emit a long set of `do_action('fluent_members/{src}_*')` actions covering payment-status changes, payment-processed, refunded, subscription-activated/cancelled/renewed.

Common ones (rename `{src}` to `fc` for FluentCart, `ff` for Fluent Forms, `paymattic` for Paymattic):

| Hook                                              | Fires on                                          |
|---------------------------------------------------|---------------------------------------------------|
| `fluent_members/{src}_payment_processed`         | A successful payment was processed.               |
| `fluent_members/{src}_payment_refunded`          | A refund landed via the host plugin.              |
| `fluent_members/{src}_subscription_activated`    | A recurring subscription was activated.           |
| `fluent_members/{src}_subscription_canceled`     | A subscription was cancelled.                     |
| `fluent_members/{src}_subscription_renewed`      | A renewal payment succeeded.                      |

---

## Portal / member-side filters

| Filter                                                 | Lets you                                              |
|--------------------------------------------------------|--------------------------------------------------------|
| `fluent_members/portal_memberships`                    | Rewrite the list returned by `GET /member-portal/`.    |
| `fluent_members/portal_membership_detail`              | Rewrite a single membership's detail.                  |
| `fluent_members/portal_cancel_membership`              | Intercept the cancel (free, local path).               |
| `fluent_members/portal_provider_cancel_membership`     | Intercept cancel at provider level (Pro Stripe).       |
| `fluent_members/portal_app_data`                       | Inject feature flags / data into the Vue app.          |
| `fluent_members/portal_assets_enqueued`                | Enqueue extra JS/CSS when the portal renders.          |

### Ravi's example, add a custom panel to the member portal

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

---

## Admin-side filters

| Filter                                                 | Lets you                                              |
|--------------------------------------------------------|--------------------------------------------------------|
| `fluent_members/admin_vars`                            | Extend `window.fluentMembersAdmin`.                    |
| `fluent_members/top_menu_items`                        | Add or remove items from the admin SPA's top menu.     |
| `fluent_members/admin_member_detail`                   | Add fields to a Member Detail response.                |
| `fluent_members/admin_member_membership_detail`        | Add fields to a single membership's detail.            |
| `fluent_members/admin_member_details_response`         | Wrap the final Member Detail response.                 |
| `fluent_members/admin_cancel_membership`               | Intercept an admin-side cancel (Pro routes through Stripe). |

---

## Access / restriction filters

| Filter                                                 | Lets you                                              |
|--------------------------------------------------------|--------------------------------------------------------|
| `fluent_members/expiry_batch_size`                     | Tune the hourly expiry cron batch size (default 100, max 1000). |
| `fluent_members/rest_forbidden_message`                | Message returned when REST content is hidden.          |
| `fluent_members/woocommerce_bypass_restriction`        | Bypass WC restrictions for specific products (Pro).    |

### Ravi's example, raise the expiry batch size for a high-volume site

```php
add_filter('fluent_members/expiry_batch_size', fn () => 500);
```

---

## Integration registry

| Filter                                                            | Purpose                                       |
|-------------------------------------------------------------------|------------------------------------------------|
| `fluent_members/get_integrations`                                 | Register an integration with the Access Group picker. |
| `fluent_members/search_integration_content_{key}`                 | Run content search for an integration.        |
| `fluent_members/build_integration_selected_options_{key}`         | Render selected options.                       |
| `fluent_members/payment_methods`                                  | Register a payment method.                     |

---

## Email pipeline filters

| Filter                                                          | Purpose                                    |
|------------------------------------------------------------------|--------------------------------------------|
| `fluent_members/default_notifications`                          | Add custom notification types (subject, body, recipient, event). |
| `fluent_members/email_notification_shortcode_groups`            | Extend the merge-tag picker.               |
| `fluent_members/prepare_email_template_data`                    | Manipulate the template data shipped to the email. |
| `fluent_members/parse_email_block_content`                      | Custom block-content parsing (Pro block editor). |

---

## Stripe-specific filters (Pro)

| Filter                                                          | Default              |
|------------------------------------------------------------------|----------------------|
| `fluent_members/stripe/setup_intent_rate_limit_max_attempts`    | 5 (per member per hour) |
| `fluent_members/stripe/setup_intent_rate_limit_ttl`             | 3600 (1 hour, in seconds) |
| `fluent_members/process_subscription`                           | Intercept subscription create/update payload. |
| `fluent_members/stripe/cancellation_mode`                       | `immediate` or `end_of_period` (set the global cancellation mode). |

---

## Migration filters / actions

For PMPro / MemberPress / RCP migrations:

| Hook | Purpose |
|---|---|
| `fluent_members/migration_started`              | Migration wizard kicked off. |
| `fluent_members/migration_step_completed`       | A step finished. |
| `fluent_members/migration_completed`            | The full migration finished. |
| `fluent_members/migration/memberpress/reset_state`, `fluent_members/migration/pmpro/reset_state`, `fluent_members/migration/rcp/reset_state` | Reset per-source state. |

---

## Naming conventions

- **New code uses `fluent_members/`**: forward slash. This is the stable contract.
- **Legacy code uses `fluent-members/`**: hyphen. Kept for backwards-compatibility.
- **Per-integration sub-namespaces use `fluent_members/{integration}_*`**.

If you're writing new hook listeners, target the forward-slash form, it's what we recommend going forward.

---

## A real example: Ravi adds a Slack notification on signup

The whole thing:

```php
// In your theme's functions.php or a small custom plugin
add_action('fluent_members/membership_level_assigned', function ($membership, $userId) {
    $user = get_userdata($userId);
    $level = MembershipLevel::find($membership->membership_level_id);

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

Ravi commits this; from now on every new member announces themselves in #signups.

---

## What's next?

- **→ [Email Notifications](/guide/settings/email-configuration/email-notifications)**: register custom notifications via the `default_notifications` filter.
- **→ [Stripe Setup](/guide/settings/payment-settings/stripe-setup)**: Stripe filters in context.

**Recommended reading:**
- [Glossary](/guide/getting-started/glossary): vocabulary.
- [Troubleshooting](/reference/troubleshooting): common issues.
