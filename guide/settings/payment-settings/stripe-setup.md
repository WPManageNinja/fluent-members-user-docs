# Stripe Setup

::: info Part of Chain 1: First-time site setup · step 4 of 10
**Previously:** [Mailing Settings](/guide/settings/email-configuration/mailing-settings)
**Next:** [Levels Overview](/guide/levels/)

**Also part of:** Chain 7: Recurring renewal (Pro) (step 2 of 4) · Chain 8: Failed renewal & recovery (step 1 of 4) · Chain 10: Migration (step 2 of 6)

See the full chain in the [Chain Map](/reference/chain-map).
:::

::: warning Requires Fluent Members Pro
Native Stripe integration ships with Pro only. Without Pro you can still process Stripe payments through FluentCart / Fluent Forms / Paymattic via [Paywalls](../../levels/pricing-paywalls).
:::

The Stripe configuration screen. Connect once, configure the webhook once, and Fluent Members can take payments, handle subscriptions, and process refunds for you.

**Here's what you'll learn:**
- How to connect Stripe (OAuth or manual keys).
- Test Mode vs Live Mode and when to use each.
- The exact webhook URL to paste into Stripe and the 8 events to subscribe to.
- How to disconnect if needed.

**Before we start:** Open **Fluent Members → Settings → Payment Settings → Stripe → Manage**. You need a Stripe account.

---

## Step 1: Toggle the master switch

At the top of the page is **Stripe Payment Settings** with a toggle. Switch it on. A note appears: *"Configure your Stripe payment settings for membership subscriptions."*

![Stripe Settings full page](/screenshots/settings-stripe.webp)

---

## Step 2: Pick a Payment Mode

Below the toggle, **Payment Mode** is a radio with two options:

| Mode | Use it for |
|---|---|
| **Test Mode** | Development, staging, testing the checkout flow with Stripe's test cards. No real money moves. |
| **Live Mode** | Production. Real cards charged for real money. |

Each mode is configured independently, you can have test-mode keys saved and live-mode keys saved separately, switching between them with this radio.

::: warning Switching modes mid-traffic
If you switch from Live to Test, any subscription in flight will fail to renew (the webhook will arrive on the wrong-mode endpoint). Only switch when no live transactions are in flight, or do it on a staging copy.
:::

---

## Step 3: Connect with Stripe

Below the mode radio is a **Connect with Stripe** card. It opens an OAuth flow that redirects you to Stripe to authorise the connection.

When you complete OAuth, the right column updates to *"Your Stripe Account is Up & Running 🎉"* with your business name and a **Disconnect Stripe** button (red, on the right).

::: tip In plain language
OAuth is the simplest way to connect, Stripe sends back the right keys and Fluent Members stores them encrypted. The alternative (manual keys) is for unusual setups where OAuth doesn't work, most users won't need it.
:::

---

## Step 4: Configure the Stripe Webhook

The **Stripe Webhook** block is the longest part of the page, but it's what makes the system reliable. Without it, payment confirmations, renewals, and refunds won't sync back into Fluent Members.

### The webhook URL

The page displays the exact URL to paste into Stripe:

```
https://your-site.com/?fluent_members_payment_listener=1&payment_method=stripe
```

Copy this URL, it's specific to your site.

### Add the webhook in Stripe

Sign in to your Stripe Dashboard:

1. **Developers → Webhooks → Add endpoint**.
2. **Endpoint URL**: paste the URL from above.
3. **Description**: *"Fluent Members payment listener"* (or whatever you like).
4. **Events to send**: tick exactly these 8:

   | Event | Why it matters |
   |---|---|
   | `payment_intent.succeeded`     | Initial payment confirmation. |
   | `payment_intent.payment_failed`| Failed initial payments. |
   | `charge.refunded`              | Full refunds processed. |
   | `charge.refund.updated`        | Partial / state-change refunds. |
   | `invoice.paid`                 | Recurring renewals succeeded. |
   | `invoice.payment_failed`       | Renewal failures (triggers dunning). |
   | `customer.subscription.updated`| Status / mode changes (active, past_due, canceled). |
   | `customer.subscription.deleted`| Subscription fully ended. |

5. Save the endpoint.

### Paste the signing secret back

After saving, Stripe shows a **Signing secret** for the endpoint (`whsec_...`). Copy it. Back in Fluent Members → Stripe Settings, paste it into the **Webhook Signing Secret** field. Save.

::: warning Use the matching mode's secret
Test-mode webhooks have a test signing secret; live-mode webhooks have a live signing secret. Confirm you're saving the right one for the Payment Mode currently selected.
:::

---

## Step 5: Test the connection

Best practice: in Test Mode, create a Pricing Plan with a small amount, paste your test page on a staging site, and run a checkout with one of [Stripe's test cards](https://stripe.com/docs/testing) (e.g. `4242 4242 4242 4242`).

What should happen:

1. Checkout completes.
2. `payment_intent.succeeded` arrives at the webhook URL.
3. Fluent Members → Transactions shows a new `succeeded` row.
4. Fluent Members → Members shows the new active membership.

If any step fails, see [Troubleshooting → Stripe webhook 401/400](/reference/troubleshooting).

---

## What each event does

| Event | What Fluent Members does |
|---|---|
| `payment_intent.succeeded` | Marks the matching order as `completed`; grants the Level. |
| `payment_intent.payment_failed` | Marks the order `failed`; no grant. |
| `charge.refunded` | Creates a `refund` transaction; flips the original to `refunded`. |
| `charge.refund.updated` | Syncs partial / state changes. |
| `invoice.paid` | Records a `renewal` transaction; extends `expires_at`. |
| `invoice.payment_failed` | Records a failed renewal; the cron / portal triggers dunning. |
| `customer.subscription.updated` | Syncs subscription status (active, past_due, canceled). |
| `customer.subscription.deleted` | Cancels the local subscription; cascades to children for corporate. |

---

## Disconnecting Stripe

In the right column of the connected state, **Disconnect Stripe** (red). Clicking it:

1. Severs the OAuth link to your Stripe account.
2. Stops Fluent Members from making API calls in Stripe's name.
3. Existing subscriptions in Stripe keep running, but Fluent Members can no longer manage them. New checkouts that try to use Stripe will fail.

::: warning Don't disconnect with live subscriptions running
Disconnecting strands your existing subscriptions: Stripe keeps charging, but Fluent Members can't sync the events back. Cancel all subscriptions first, or migrate them to a paywall before disconnecting.
:::

---

## A real example: Sara goes live

Sara built her site in Test Mode for a week, ran 12 test purchases, refunded a few, confirmed everything synced. She's ready to go live.

1. Stripe Dashboard → switch to Live data → **Developers → Webhooks → Add endpoint** with her live URL and the same 8 events.
2. Copy the live signing secret.
3. Fluent Members → Stripe Settings → switch **Payment Mode** to Live.
4. Paste the live publishable key, secret key, and webhook secret.
5. Save.

Her existing test subscriptions don't carry over, Test and Live are separate worlds in Stripe. She runs one tiny live charge to herself ($1) to confirm the end-to-end flow, then announces the launch.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Webhook URL pasted but Stripe says "Test failed" | Site behind HTTP Basic Auth or a firewall blocking POST. | Whitelist Stripe's IPs or remove auth. |
| Charges land but no Transaction row appears | Wrong-mode signing secret. | Match secret to current Payment Mode. |
| OAuth redirect loops | Cookies blocked, or your Stripe account is restricted. | Use a fresh browser; check Stripe Dashboard for restrictions. |
| Switched to Live but old test subscriptions still try to renew in the live webhook | The webhook for test mode is still pointed at the same URL. | Two webhooks in Stripe (one test, one live) is fine, same URL, mode is in the secret. |

---

## What's next?

- **→ [Pricing, Native Payment](../../levels/pricing-native)**: create your first Native Payment Pricing Plan.
- **→ [Migration, Stripe Import](../migration/)** *(if importing from PMPro/MemberPress/RCP with Stripe history)*.

**Recommended reading:**
- [Refunds](/guide/transactions/refunds): once Stripe is connected, you can refund here too.
- [Subscription Cancellation Modes](/guide/transactions/cancellation-modes): Immediate vs End of period.
- [Troubleshooting](/reference/troubleshooting): common Stripe issues.
