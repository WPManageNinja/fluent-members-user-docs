# Email Notifications

Turn on and customise the emails Fluent Members sends to members and admins — welcome, renewal reminders, and more.

In the current version of Fluent Members, one notification ships out of the box: the **Welcome Email**. You can customise its subject, body, and recipient.

**Here's what you'll learn:**
- What the Welcome Email does
- How to enable and customise it
- Which merge tags you can use in subject and body
- How the default template looks
- How to fall back to the default body if you mess up a custom one

**Before we start:** You should have the [Mailing settings](./mailing.md) configured first — otherwise your From name/address aren't set.

---

## Open the Email Notifications screen

Go to **Fluent Members → Settings → Email Notifications**.

![Email Notifications settings](/images/settings/email-notifications.png)

---

## The Welcome Email

This is the one notification Fluent Members ships with. It's sent automatically when a member is assigned a Membership Level — whether through a purchase or manually via the admin.

### Step 1 — Enable it

Toggle **Welcome Email** to **Yes**. Save.

### Step 2 — Customise the subject

The default subject is:

```
```

Change it to whatever fits your brand. For Sara, that might be:

```
```

### Step 3 — Customise the body

The body is a full rich-text editor. The default template — a friendly welcome with a table of membership details — renders automatically if you leave the body blank.

If you want full control over the body, type in the editor. Your custom body replaces the default.

::: tip Fall back to default
If you type a custom body and later want the default back, simply clear the body field completely and save. Fluent Members detects an empty body and reverts to the default template.
:::

### Step 4 — Save

Click **Save Changes**. A green toast confirms.

---

## Default template — what it looks like

If you leave the body blank, the default Welcome email renders like this:

> **Hello {{user_name}},**
>
> Welcome! Your membership has been successfully activated. Here are your membership details:
>
> | Membership Level | {{membership_level}} |
> |---|---|
> | Start Date | {{start_date}} |
> | Expires | {{expires_at}} |
>
> Thank you for joining!

Wrapped inside your configured Mailing template (header logo + footer).

---

## Merge tags you can use

All of these work in both the subject and the body:

| Tag | Resolves to |
|---|---|
| `{{user_name}}` | The member's display name |
| `{{user_email}}` | The member's email address |
| `{{membership_level}}` | The name of the Level they joined |
| `{{start_date}}` | Their membership start date (formatted per your site's date format) |
| `{{expires_at}}` | Their expiry date (or "Never" if lifetime) |
| `{{site_name}}` | Your site's name |
| `{{site_url}}` | Your site's URL |

For the full list and examples, see [Email Merge Tags](../../reference/email-merge-tags.md).

---

## When the Welcome Email fires

Fluent Members hooks into the `fluent_members/membership_level_assigned` action. This fires:
- On a successful purchase from any payment provider
- On manual admin assignment via **Members → Add Member**
- On a corporate sub-member accepting an invitation

So whether someone buys, is invited, or is added by hand, they get the same Welcome Email.

---

## Can I add custom emails for other events?

Out of the box, only the Welcome Email is a configurable notification. But Fluent Members fires hook actions for other events:

- `fluent_members/membership_level_removed`
- `fluent_members/membership_expired`
- `fluent_members/membership_suspended`

To send custom emails for these, use the [FluentCRM integration](../integrations/fluent-crm.md) — those events are exposed as triggers in FluentCRM automations.

---

## A real example — Sara's Welcome Email

**Subject:** `Welcome to the mat, {{user_name}} 🧘`

**Body (HTML):**
```html
<p>Hi {{user_name}},</p>

<p>I'm so glad you're here. You've just joined my {{membership_level}} on {{start_date}}.</p>

<p>Here's what to do next:</p>
<ol>
  <li>Start with <a href="https://sarayoga.com/first-lesson">Lesson 1: Foundations</a>.</li>
  <li>Join our private community at <a href="https://sarayoga.com/community">sarayoga.com/community</a>.</li>
  <li>Save this email — it has your membership details.</li>
</ol>

<p>Your membership runs until {{expires_at}}. If you have any questions, just reply to this email.</p>

<p>See you on the mat,<br/>Sara</p>
```

This single email sets the tone for the whole membership — friendly, personal, with a clear "what to do now" list.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Email isn't arriving | Welcome Email is disabled, or From Email is in spam | Enable it; check deliverability in [Mailing](./mailing.md) |
| Merge tags show literally (like `{{user_name}}`) | Typo in the tag — braces or spelling off | Copy from [Email Merge Tags](../../reference/email-merge-tags.md) |
| Custom body is blank in sent email | You saved with an empty body | Either type a body or leave blank to use default |
| Email looks plain / unstyled | Your email client strips CSS; test in multiple clients | Use inline styles or rely on the default template |

---

## What's next?

**→ [Partial Content Defaults](./partial-content-defaults.md)** — for the teaser-paywall pattern.

**Related reading:**
- [Mailing](./mailing.md) — From name/email setup
- [Email Merge Tags](../../reference/email-merge-tags.md) — every variable
- [FluentCRM](../integrations/fluent-crm.md) — trigger emails on other events
