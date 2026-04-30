# Mailing Settings

Tell Fluent Members who your outgoing emails come from. One-time setup that applies to every notification the plugin sends.

**Here's what you'll learn:**
- What each mailing field does
- How to set up deliverability correctly (From email, Reply-To)
- How to add a header logo and footer
- How to hide the "Powered by" branding
- Testing and troubleshooting

**Before we start:** This page alone won't enable emails — individual emails are turned on in [Email Notifications](./email-notifications.md). Mailing is the *global* setup; Notifications is the *per-email* content.

---

## Open the Mailing settings

Go to **Fluent Members → Settings → Mailing**.

![Mailing settings screen](/images/settings/mailing-settings.png)

---

## Step 1 — Set From Name and From Email

These appear in the recipient's inbox. Get this right or your emails land in spam.

| Field | What to enter |
|---|---|
| **From Name** | Your brand or your own name. Example: *Sara Yoga* or *BlueWave Agency*. |
| **From Email** | An email address on your domain. Example: `hello@yoursite.com`. Avoid Gmail/Outlook addresses here — many inbox providers block them. |

::: warning Deliverability matters
Using a From address from a domain you don't own (e.g. `hello@gmail.com`) will send most emails to spam. If you don't have a domain-based email yet, set one up now — it's worth 10 minutes.
:::

---

## Step 2 — Set Reply-To (optional, recommended)

| Field | What to enter |
|---|---|
| **Reply-To Name** | Where replies should be directed. Often *Support* or a person. |
| **Reply-To Email** | An inbox you actually check. `support@yoursite.com` is a good choice. |

If you leave these blank, replies go to the From email.

---

## Step 3 — Add a header logo

| Field | What to enter |
|---|---|
| **Email Header Logo** | A public URL to your logo image (max width ~200px, PNG or JPG). |

The logo appears at the top of every email, centred. Upload the logo to your Media Library and paste the URL, or use any public image URL.

Leave blank to skip the logo header.

---

## Step 4 — Customise the email footer

| Field | What to enter |
|---|---|
| **Email Footer** | HTML or plain text that appears at the bottom of every email. |

You can use these merge tags:
- `{{site_name_with_url}}` — your site name wrapped in a link to your site
- `{{site_name}}` — just the name
- `{{site_url}}` — just the URL

Example footer:

```html
<p style="font-size:12px;color:#666;text-align:center;">
  Sent by {{site_name_with_url}} · <a href="/privacy">Privacy</a>
</p>
```

---

## Step 5 — Powered by line

By default, every email ends with a small *"Powered by FluentMembers"* line. You can hide it:

- **Disable Powered By Line** → Yes (hides it)

Most site owners leave it on — it's unobtrusive and supports the plugin's developers.

---

## Saving

Click **Save Changes**. A green toast confirms the settings are stored.

---

## Testing your setup

Before going live:
1. Go to [Email Notifications](./email-notifications.md), enable the Welcome Email, and customise it if you want.
2. [Manually add a member](../members/adding-a-member-manually.md) using your own email address.
3. Check your inbox. Verify:
   - Sender name matches From Name
   - Sender address matches From Email
   - Logo displays correctly
   - Footer renders as expected

If the email lands in spam, your From domain likely needs SPF/DKIM records — your hosting provider or email service can help with this.

---

## A real example — Sara's mailing setup

Sara configures:
- **From Name:** Sara Yoga
- **From Email:** `hello@sarayoga.com`
- **Reply-To Name:** Sara
- **Reply-To Email:** `sara@sarayoga.com` (her personal inbox)
- **Email Header Logo:** `https://sarayoga.com/wp-content/uploads/logo.png`
- **Email Footer:**
  ```html
  <p style="font-size:12px;color:#888;text-align:center;">
    Sara Yoga · {{site_url}}<br/>
    <a href="{{site_url}}/unsubscribe">Unsubscribe</a>
  </p>
  ```
- **Disable Powered By:** No (leaves the small credit)

Every email Fluent Members sends now feels like it came from her.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Emails landing in spam | From address is a free Gmail/Outlook inbox, or domain lacks SPF/DKIM | Use a domain-based From; set SPF/DKIM |
| Logo doesn't show in emails | URL isn't public, or image is too large | Upload to your Media Library, use that URL |
| Footer text doesn't render merge tags | Check spelling — `{{site_name}}`, exact braces | Copy from this page |
| Reply-To not working | Your mail plugin might override it | Check your mailer plugin's settings |

---

## What's next?

**→ [Email Notifications](./email-notifications.md)** — customise the actual email content and enable notifications.

**Related reading:**
- [Email Merge Tags](../../reference/email-merge-tags.md) — every variable you can use
