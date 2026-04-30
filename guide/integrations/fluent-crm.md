# FluentCRM Integration

Hook membership events into FluentCRM automations. Send welcome sequences, winbacks, renewal reminders — fully automated.

**Here's what you'll learn:**
- What triggers Fluent Members exposes to FluentCRM
- How to build an automation using each trigger
- How to use membership data inside email templates
- Real use cases

**Before we start:** FluentCRM (free or pro) must be installed and active. The integration lights up automatically when both plugins are running.

---

## What the integration gives you

Four triggers are exposed to FluentCRM automations:

| Trigger | Fires when |
|---|---|
| **Membership Level Assigned** | A user is granted a Membership Level (purchase, manual, invitation acceptance) |
| **Membership Level Removed** | A Level is removed from a user |
| **Membership Expired** | A membership's end date passes (cron-driven) |
| **Membership Suspended** | A membership is suspended by an admin |

Plus, inside any FluentCRM automation, you can filter contacts by their Fluent Members level — for example, "send this email to everyone on the Pro Plan."

---

## Step 1 — Build a Welcome Series automation

The classic use case. When someone joins, they enter a 5-email educational sequence.

1. Go to **FluentCRM → Automations → New Automation**.
2. Pick the trigger: **Fluent Members → Membership Level Assigned**.
3. Configure the trigger:
   - Specify which Level (e.g. *Pro Plan*)
   - Or leave blank to trigger on any Level
4. Add action steps: email, delay, branch, tag, etc.

![FluentCRM trigger setup](/images/integrations/fluentcrm-trigger.png)

Example flow:
```
Trigger: Membership Level Assigned (Pro Plan)
  ↓
Email 1: Welcome + Lesson 1 link
  ↓
Wait 2 days
  ↓
Email 2: How to get the most out of your membership
  ↓
Wait 3 days
  ↓
Email 3: Featured lessons
  ↓
Wait 7 days
  ↓
Email 4: Upgrade options
```

---

## Step 2 — Build a Winback automation

When someone's membership expires, try to bring them back.

1. Trigger: **Fluent Members → Membership Expired**.
2. Actions:
   - Wait 1 day
   - Send "sorry to see you go" email
   - Wait 7 days
   - Send discount offer
   - Wait 14 days
   - Send final reminder

---

## Step 3 — Suspension handling

When an admin suspends a member (often for payment issues):

1. Trigger: **Fluent Members → Membership Suspended**.
2. Send an email: *"We couldn't process your payment. Update your card to continue."*
3. Link to the payment provider's card-update page.

This reduces support tickets dramatically.

---

## Step 4 — Using member data in emails

FluentCRM contacts linked to Fluent Members users expose:
- Member name, email
- Current membership level
- Membership status
- Start and expiry dates

Use merge tags inside FluentCRM email templates to personalise the content. The exact tags depend on your FluentCRM version — see FluentCRM's merge tag reference.

---

## Advanced — conditional branches

Combine Fluent Members triggers with FluentCRM's conditional step to build smart flows:

```
Trigger: Membership Level Assigned
  ↓
Condition: Is this their first membership?
  ├── Yes → Welcome sequence
  └── No (upgrade) → Upgrade celebration email
```

---

## A real example — Jordan's newsletter flow

Jordan runs an automation:
- **Trigger:** Membership Level Assigned (Premium Newsletter)
- **Step 1:** Send Welcome email with his 3 most popular back-issues.
- **Step 2 (wait 3 days):** Send a "Here's what you get as a member" tour.
- **Step 3 (wait 7 days):** Send a "Feedback wanted" email.

For Membership Expired:
- **Step 1 (wait 1 day):** "Sorry to see you go — what could we do better?" (with reply-to survey)
- **Step 2 (wait 14 days):** Winback discount offer.

Jordan spent 30 minutes setting these up, and they now run forever.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Triggers not appearing in FluentCRM | FluentCRM isn't active, or version is too old | Install / update FluentCRM |
| Automation doesn't fire on purchase | Triggers only fire on fresh assignments, not re-activations | Test with a new member |
| Email personalisation shows merge tags literally | Wrong tag syntax for your FluentCRM version | Copy from FluentCRM's merge tag reference |
| Multiple emails sent to same member | Your automation triggers on *any* Level; add a filter for specific Level | Edit trigger configuration |

---

## What's next?

**→ [FluentSupport](./fluent-support.md)** — show membership info in your support tickets.

**Related reading:**
- [Membership Statuses](../../reference/membership-statuses.md) — which events you can trigger on
- [Email Notifications](../settings/email-notifications.md) — the built-in Welcome Email (complementary, not replacement)
