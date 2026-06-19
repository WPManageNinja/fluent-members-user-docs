# Email Notifications

The list of every email notification Fluent Members can send. Toggle them on, edit the subject and body, and use the merge tags to personalise.

::: info Part of Chain 2: Buy & onboard · step 4 of 6
**Previously:** [Transactions List](/guide/transactions/)
**Next:** [Members List](/guide/members/)

**Also part of:** Chain 11: Custom email automation (step 1 of 2)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- Which notifications ship in 1.0 (spoiler: one).
- How to toggle a notification on/off.
- How to edit the subject and body.
- Where the merge tags come from.

**Before we start:** Click the gear icon → **Email Configuration → Email Notifications** in the left rail. The Mailing Settings ([previous page](./mailing-settings)) should be set up first.

---

## What ships out of the box

A single notification: **Welcome Email**. Sent to the member whenever the `fluent_members/membership_level_assigned` event fires — that covers initial paywall purchases, manual admin grants, native Stripe checkouts, corporate join acceptances, **and** admin re-activations from Suspended status.

::: warning Welcome Email re-fires on re-activation from Suspended
If you Suspend a member and later set their status back to Active, the Welcome Email fires again — because re-activation is implemented as a fresh `membership_level_assigned` event under the hood. To avoid surprising re-sends, either temporarily disable the Welcome Email before re-activating, or use a custom notification keyed on `start_date` to detect "this is a fresh grant" vs "this is a reactivation."
:::

| Event              | Receiver | Default subject              |
|--------------------|----------|------------------------------|
| `membership_level_assigned` | Member  | *"Welcome, {{user_name}}!"* |

That's the entirety of the ships-by-default email vocabulary in 1.0. Future versions will add more (renewal reminders, payment-failed alerts, expiration notices, etc.).

![Email Notifications table with Welcome Email row](/screenshots/settings-email-notifications.webp)

::: tip In plain language
There's only one out-of-the-box email today. For everything else, "your renewal failed", "you're being suspended", "your team invite was accepted", use [FluentCRM](https://fluentcrm.com) subscribing to Fluent Members' lifecycle hooks, or build a custom notification via [Developer Hooks](/reference/developer-hooks).
:::

---

## Toggling a notification

The list shows three columns: **Event** / **Receiver** / **Enable**, plus a pencil icon for editing.

- **Enable** column has a toggle. Tick to enable; untick to disable.
- A disabled notification never fires, regardless of the underlying event.

By default, Welcome Email is enabled. Disabling it means new members get *no* welcome email, they just gain access silently.

::: warning Test before launch
A common mistake: customise the subject/body, click Save, never actually trigger a test. Grant yourself a test membership ([Adding a Membership Manually](../../members/adding-manually)) to confirm the email arrives looking the way you want.
:::

---

## Editing a notification

Click the pencil icon on the right of a row. An editor panel opens with two fields:

- **Subject**: the email subject line.
- **Email Body**: the email body content. Rich-text editor with media + shortcode insert.

Both support merge tags (`{{user_name}}`, `{{site_name}}`, etc.), see [Email Merge Tags](/reference/email-merge-tags) for the full list.

Save closes the panel and stores the change. The next time the event fires, the new content is used.

---

## The merge tags available in the Welcome Email

These all work in both Subject and Body of the Welcome Email:

| Tag                      | Replaced with                  |
|--------------------------|---------------------------------|
| `{{user_name}}`          | The new member's display name. |
| `{{user_email}}`         | Their email address.            |
| `{{membership_level}}`   | The title of the Level granted.|
| `{{start_date}}`         | When the membership started.    |
| `{{expires_at}}`         | When it expires, or "Never" for Lifetime. |
| `{{site_name}}`          | Your site title.                |
| `{{site_url}}`           | Your home URL.                  |

Full list with examples in [Email Merge Tags](/reference/email-merge-tags).

::: warning Body merge tags vs footer smartcodes
The Email Body uses *merge tags*, `{{user_name}}` and friends, which only work in subject and body. The [footer](./mailing-settings) uses a smaller set of *smartcodes*, `{{site_name_with_url}}` etc., that only work in the footer. Different scopes; pay attention to which you're typing where.
:::

---

## A real example: Sara's Welcome Email

Sara wants her welcome warm and useful:

**Subject:**
```text
Welcome to Pro Yoga, {{user_name}}!
```

**Body:**
```text
Hi {{user_name}},

Thanks for joining {{membership_level}}! Your membership is active starting {{start_date}}.

Here's how to get started:
1. Bookmark your member portal: {{site_url}}/my-account
2. Browse the lesson library
3. Join the monthly live call (link in your portal)

If you have any questions, reply to this email.

Sara
```

She enables the notification, saves, and runs a test grant on her staff account to verify formatting.

---

## Can I add more notification types?

In 1.0, the admin UI only exposes the single `user_welcome` notification. For more types you have two paths:

### Option A, FluentCRM (no code)

FluentCRM is Fluent Members' first-class CRM integration. It listens to lifecycle hooks (`membership_cancelled`, `membership_expired`, `membership_renewed`, etc.) and lets you build email sequences around them. No code, more types, full template editor.

### Option B, Developer hooks (code)

If you maintain the site yourself or have a developer, you can register additional notifications via filters:

```php
add_filter('fluent_members/default_notifications', function ($notifications) {
    $notifications['my_renewal_reminder'] = [
        'event'    => 'membership_level_assigned',
        'recipient'=> 'member',
        'title'    => 'Renewal Reminder',
        'defaults' => [
            'active'  => 'no',
            'subject' => 'Your {{membership_level}} renews in 3 days',
            'email_body' => '...',
        ],
    ];
    return $notifications;
});
```

See [Developer Hooks](/reference/developer-hooks) for the full action/filter list.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Welcome Email never arrives | Notification disabled, or Mailing From email rejected by recipient. | Toggle on; check From email; check spam. |
| Merge tag shows as literal `{{user_name}}` | The tag was typed in the footer (which uses smartcodes only). | Move it to subject or body. |
| Edit panel won't save | Body HTML uses disallowed tags. | Switch to Code view; remove disallowed tags. |
| Emails are missing the logo / footer | Mailing Settings not configured yet. | See [Mailing Settings](./mailing-settings). |

---

## What's next?

- **→ [Mailing Settings](./mailing-settings)**: the surrounding context.
- **→ [Email Merge Tags](/reference/email-merge-tags)**: the full vocabulary.

**Recommended reading:**
- [Developer Hooks](/reference/developer-hooks): register custom notifications.
- [Member Detail](../../members/detail): the Add Membership flow that triggers Welcome Email.
