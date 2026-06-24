# Mailing Settings

The global "From" + footer + logo for every email Fluent Members sends. Set these once and your transactional emails look on-brand instead of like a default WordPress notification.

::: info Part of Chain 1: First-time site setup · step 3 of 10
**Previously:** [General Settings](/guide/settings/general)
**Next:** [Stripe Setup](/guide/settings/payment-settings/stripe-setup)

See the full chain in the [Chain Map](/reference/chain-map).
:::

**Here's what you'll learn:**
- Every field on the **Default From Settings** card.
- The three site-token smartcodes you can use in the email footer.
- The footer toggle ("Powered by FluentMembers").
- Where the logo shows up.

**Before we start:** Click the gear icon → **Email Configuration → Mailing Settings** in the left rail.

---

## The fields

![Mailing Settings full layout](/screenshots/settings-mailing.webp)

### From Name

The sender display name as it appears in the recipient's inbox. Defaults to your site title. Type whatever fits, your brand name, your own name, *"Sara's Yoga School"*.

### From Email Address

The sender email address. WordPress's default is `wordpress@yoursite.com`, which many email providers (Gmail, Outlook) reject as spam-like. **Replace it with a real mailbox** on your domain, `hello@yoursite.com`, `support@yoursite.com`, etc.

::: warning Match SPF/DKIM
The from-address you choose must be authorised to send from your domain. Set up SPF and DKIM records (most transactional-email plugins like FluentSMTP do this for you). Without them, your emails land in spam.
:::

### Reply to Name

The display name shown when a recipient hits Reply. Optional. If empty, the From Name is used.

### Reply to Email

The address replies actually go to. Optional. If empty, replies go to the From Email Address.

Useful when:
- You send *from* `noreply@yoursite.com` but want replies routed to `support@yoursite.com`.
- You want replies to skip a shared inbox and go straight to one person.

### Email Footer

A rich-text editor for the footer block that appears at the bottom of every email. Toolbar includes:

- **Add media**: insert images.
- **Shortcode**: insert a known shortcode.
- **Visual / Code**: switch between WYSIWYG and raw HTML.

The footer's *Available Smartcodes* (shown below the editor) are:

| Smartcode | Replaced with |
|-----------|----------------|
| `{{site_name_with_url}}` | Your site name linked to the home URL. |
| `{{site_name}}`          | Your site name (text only). |
| `{{site_url}}`           | The home URL (text only). |

::: tip In plain language
The footer is the "from us" block at the bottom, your company name, a copyright, a small disclaimer. The smartcodes let you write it once and it stays right even if you rename the site.
:::

### Logo for Email Header

PNG or JPEG. The image is shown at the top of every email above the body content. Upload via the **Upload** button; remove with **Remove**.

Typical size: 600px wide max (emails render in narrow widths). Keep it under 100kb to avoid load delays in slow inboxes.

### Enable powered by FluentMembers in the email footer

A checkbox at the bottom. When ticked, a small *"Powered by FluentMembers"* line appears at the very bottom of every email.

Untick if you don't want it. There's no licensing requirement, it's optional credit.

---

## Save Settings

The **Save Settings** button is in the top-right of the page. It saves all fields together.

---

## A real example: Sara's Mailing Settings

For *Sara's Yoga School*:

| Field | Sara's value |
|---|---|
| From Name | *"Sara's Yoga School"* |
| From Email Address | `hello@sarasyoga.com` |
| Reply to Name | *(empty)* |
| Reply to Email | `support@sarasyoga.com` |
| Email Footer | A short HTML block: site name link, postal address, small disclaimer. Uses `{{site_name_with_url}}` and `{{site_url}}`. |
| Logo for Email Header | Her 600 × 200px transparent PNG. |
| Enable powered by FluentMembers | Unchecked (she wants white-label). |

Every email she sends now feels like *Sara's Yoga School* rather than *WordPress at yoursite.com*.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Emails arrive in spam | From Email Address doesn't match your domain's SPF. | Use an address on your domain; configure SPF/DKIM via FluentSMTP or similar. |
| Smartcodes show as literal `{{site_name}}` | You used them in the body of an email notification instead of the footer. | The body uses different merge tags, see [Email Merge Tags](/reference/email-merge-tags). |
| Logo doesn't appear | Image URL is HTTP on an HTTPS site. | Re-upload via the media library. |
| Reply-To ignored | Some email clients strip Reply-To when forwarding. | This is a recipient-side issue, not Fluent Members. |

---

## What's next?

- **→ [Email Notifications](./email-notifications)**: the body content of each notification.

**Recommended reading:**
- [Email Merge Tags](/reference/email-merge-tags): the body-side smartcodes.
- [Troubleshooting → Email not delivered](/reference/troubleshooting): when emails go missing.
