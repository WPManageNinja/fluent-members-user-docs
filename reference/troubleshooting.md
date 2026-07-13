# Troubleshooting

A focused list of the issues real users hit and the quickest way to resolve them.

## I can still see the protected content as admin

That's by design. Administrators bypass content restrictions so they can edit. Always test in a **private / incognito browser window** (or log out completely) to see what a non-member sees.

## The Member Portal page shows raw shortcode text

That means the shortcode didn't process, usually a theme or page builder issue.

1. Make sure the page is using the WordPress editor (Block or Classic), not a builder that swallows shortcodes.
2. Put `[fluent_member_portal]` inside a **Shortcode block** (Block Editor) or a plain paragraph (Classic Editor).
3. If you use Elementor / Bricks, choose the "Shortcode" widget, not the text widget.

## My email notification isn't arriving

Walk this list top to bottom.

1. **Is the notification enabled?** Settings → Email Notifications → toggle **Welcome Email** on.
2. **Is the From email address valid?** Settings → Email Configuration → Mailing Settings. WordPress's default is `wordpress@yoursite.com`. Many email providers reject that. Change it to a real mailbox on your domain.
3. **Is your site sending mail at all?** Install a transactional mailer (FluentSMTP, Mailgun, SendGrid). WordPress's PHP `mail()` is unreliable and silently fails on many hosts.
4. **Preview the template.** Settings → Email Notifications → open the notification → **Preview** to confirm the template itself renders correctly, ruling out a broken merge tag or template edit.
5. **Spam folder.** Especially with a `wordpress@` From address.

## Stripe webhook is showing 401 or 400 in the Stripe dashboard

The webhook URL must be reachable from Stripe's IPs and your signing secret must match.

1. **Confirm the URL**, copy it from Settings → Payment Settings → Stripe → **Manage** (the displayed URL contains `?fluent_members_payment_listener=1&payment_method=stripe`). Paste exactly that into Stripe → Developers → Webhooks → endpoint.
2. **Confirm the signing secret**, Stripe generates one when you create the endpoint. Paste it back into the Stripe settings screen in Fluent Members.
3. **Test mode vs Live mode**, the webhook secret in your Stripe settings must match the **mode** (test or live) you're operating in.
4. **Firewall / caching plugins**, some block POST to root URLs. Whitelist `?fluent_members_payment_listener=1&payment_method=stripe`.

## PayPal subscriptions aren't renewing or cancelling automatically

Almost always a webhook configuration mismatch, since PayPal webhooks are set up manually in the PayPal Developer Dashboard rather than automatically.

1. **Confirm the URL**, copy it from Settings → Payment Settings → PayPal → **Manage** (it contains `?fluent_members_payment_listener=1&payment_method=paypal`). It must match exactly what's pasted into PayPal's **Apps & Credentials → your app → Add Webhook**.
2. **Confirm the events are selected**, the webhook needs all 9 events listed in [PayPal Webhook Events Reference](/guide/settings/payment-settings/paypal-setup#webhook-events-reference). Missing an event means that specific transition (for example, cancellation) never reaches Fluent Members.
3. **Sandbox vs Live**, PayPal keeps sandbox and live webhooks completely separate. Confirm you registered the webhook on the same tab (Sandbox or Live) that matches the Payment Mode selected in Fluent Members.
4. **Reconnect if the account changed**, if you disconnected and reconnected a different PayPal account, the app credentials changed too. You'll need to add the webhook again under the new app.

## Expired memberships don't auto-cancel

Expiry runs hourly via the WordPress cron hook `fluent_members_check_expired_memberships`. If cron isn't firing, expiry stalls.

1. **WP-Cron status**, visit **Tools → Site Health → Info → WordPress Cron**. If "WP Cron is disabled" appears, configure a real system cron to hit `wp-cron.php` every few minutes.
2. **Define `DISABLE_WP_CRON` carefully**, when you switch to system cron, the hook still fires; just not via web hits.
3. **Batch size**, the cron processes up to 100 rows per run by default. If you have tens of thousands of expired rows queued, give it a few hours, or raise the batch via `add_filter('fluent_members/expiry_batch_size', fn () => 500);`.

## REST API is leaking restricted content to my headless front-end

The REST filter only runs when a public-typed post is queried through `rest_prepare_{$postType}`. Custom REST endpoints (e.g. `/wp-json/your-plugin/v1/posts`) are NOT covered automatically.

Either route through `WP_REST_Posts_Controller`, or call `AccessHandler::protectRestContent()` from your own controller before returning the response.

## Cancellation in the portal doesn't cancel the Stripe subscription

Three things to check.

1. **Is the plugin Pro and is Stripe configured?** Only Pro routes the cancel through Stripe.
2. **Was the subscription created by Fluent Members?** The local subscription row needs a non-empty `provider_subscription_id`. If you imported old data without the Stripe-import bridge, that field is empty and the plugin has nothing to cancel.
3. **Cancellation mode**, if your default is **End of period**, Stripe is told `cancel_at_period_end=true`. The subscription stays `active` in Stripe (and the local row stays `active`) until the next renewal date, then Stripe sends `customer.subscription.deleted` and the plugin flips the status.

See [Subscription Cancellation Modes](/guide/transactions/cancellation-modes).

## Partial Content Preview overlay sits behind the content

A theme or page builder is overriding the z-index.

1. Open browser DevTools, inspect the `.fmem_partial-content-overlay` div.
2. Look at the `z-index` on parents. If a theme sets `position: relative` + `z-index: 1` on the article, the overlay needs to be inside a higher-z context.
3. Add a small custom CSS override: `.fmem_partial-content-overlay { z-index: 99 !important; }` in **Appearance → Customize → Additional CSS**.

## Migration wizard says 0 to import but I have data in the source plugin

The detector reads directly from the source plugin's database tables. If the wizard says 0:

1. Confirm the source plugin (Paid Memberships Pro, MemberPress, or Kadence Memberships) is **active**, not just installed. An inactive plugin's tables aren't detected.
2. Confirm the source plugin's tables still exist and have rows (for example, `wp_pmpro_memberships_users` for PMPro, `wp_mepr_members` for MemberPress).
3. For **Kadence Memberships**, remember the internal migration `provider` value stays `rcp`, a holdover from the source plugin's earlier name, Restrict Content Pro. If you're inspecting the database directly, filter on `provider = 'rcp'`.
4. On Kadence migrations only, you can reset and re-run the analysis: **Reset Migration State** clears a half-finished run that might be hiding remaining rows. This option isn't available for PMPro or MemberPress migrations.

## Corporate parent can't invite, `Seats are full`

The Level's `max_members` is reached. Either:

- Have the parent **remove** an existing sub-member to free a seat, **or**
- Bump the Level's `max_members` in **Levels → edit**. Existing children are not affected; the parent simply gets more headroom.

## Block Email Editor iframe is blank or shows admin chrome

A conflicting plugin is loading scripts inside the editor frame.

1. Try the editor in an incognito window after temporarily deactivating page builders / aggressive optimisers (Jetpack, LiteSpeed, WP Rocket).
2. If the issue clears, add the offending plugin's slug to the allow-list via `add_filter('fluent_members/asset_listed_slugs', fn ($slugs) => array_merge($slugs, ['offending-slug']))`.

## Pro buttons (Refund, Update Payment Method) don't appear

Two things to verify.

1. The Pro plugin is active. Look for `Fluent Members Pro` in Plugins.
2. A native payment gateway is configured. Settings → Payment Settings → Stripe (or PayPal) must say **Active**. Without at least one connected, refund and billing-management UI stays hidden. **Update Payment Method** specifically only appears for Stripe-billed subscriptions.

## Theme conflicts, the front-end looks broken

Always test in a default theme (Twenty Twenty-Five) with all other plugins deactivated. If the issue clears, reactivate plugins one at a time to find the conflict.


**What's Next?**
- [FAQ](/guide/help-support/faq): quick yes/no answers.

