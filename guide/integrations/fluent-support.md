# FluentSupport Integration

Show each customer's active memberships inside their FluentSupport ticket sidebar — so your team sees the full context without switching tabs.

**Here's what you'll learn:**
- What the integration adds to FluentSupport tickets
- How to enable it (hint: you don't — it's automatic)
- What data is shown and how
- Customisation options

**Before we start:** FluentSupport must be installed and active. The integration appears automatically.

---

## What you'll see in tickets

When an agent opens a ticket, the customer's sidebar gets a new **Membership Levels** widget. It lists every membership the customer holds, with:

- Level title
- Status badge (`active`, `trial`, `suspended`, `cancelled`, `upgraded`, `expired`)

Each status has its own colour:
- **Active** — green
- **Trial** — (shares active styling)
- **Suspended** — red
- **Cancelled** — orange
- **Upgraded** — blue
- **Expired** — grey

![Membership widget in FluentSupport](/images/integrations/fluent-support-widget.png)

---

## How it decides what to show

The widget uses the **customer's WordPress user ID** (pulled from the ticket's customer field) and queries Fluent Members for all memberships linked to that user, regardless of status. The most recent records come first.

If the customer isn't linked to a WordPress user (which can happen with guest tickets), the widget doesn't appear.

---

## Zero configuration

There are no settings to tweak. Install FluentSupport, install Fluent Members, keep both active — the widget appears.

---

## Why this matters

The #1 support ticket category for membership sites is *"What plan am I on?"* or *"Why can't I access X?"*. With the widget, your agents:

- Know the plan before reading the ticket
- Can spot suspended memberships instantly (payment issue → fix the card)
- Can correlate tickets with recent upgrades/downgrades
- Can identify comped/free members quickly

Support resolution times drop noticeably.

---

## A real example — a paid community

An agent opens a ticket titled "I can't see the new videos."

Without the integration, the agent would:
1. Copy the customer's email
2. Switch to Fluent Members → Members
3. Search for the user
4. Confirm their level
5. Come back to the ticket

With the integration, the agent sees:
> **Membership Levels:** Pro Plan — Suspended

— instantly. The fix ("Please update your card") takes 30 seconds instead of 5 minutes.

---

## Customisation

The widget uses a WordPress filter (`fluent_support/customer_extra_widgets`) to inject the HTML. If you need to:
- Change the styling — override the widget's inline CSS with your own
- Filter which memberships show — unhook the default callback and add your own

For developers: the integration source is at `app/Modules/Integrations/FluentSupport/Bootstrap.php`.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Widget not appearing on tickets | FluentSupport isn't active, or the customer isn't linked to a user | Activate FluentSupport; ensure ticket has a user |
| Widget shows for some tickets but not others | Guest tickets (no user) skip the widget by design | Ask guest to create an account to link the ticket |
| Status badge colour is wrong | Theme / browser CSS override | Inspect with devtools |

---

## What's next?

Back to [Integrations overview](./index.md).

**Related reading:**
- [Member Statuses](../../reference/membership-statuses.md) — what each badge means
- [FluentCRM](./fluent-crm.md) — complementary automation integration
