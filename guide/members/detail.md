# Member Detail

The page you land on when you click a row in [Members](./). It shows everything about one specific person, their account info and every membership they hold.
**Here's what you'll learn:**
- The two cards on this page (user header + Memberships table).
- Every column in the Memberships table.
- The row actions you can take on a single membership.

**Before we start:** Open the [Members](./) screen and click any row.

---

## The two cards

### The user header

The top card shows the WordPress account behind the membership:

- **Avatar**
- **Display name**
- **Email**
- **Registration Date** (when the WordPress user was created)
- **Role badge** (Subscriber, Administrator, etc.)

Click the avatar/name area to jump to the user's standard WordPress profile.

![Member detail, user header](/screenshots/member-detail-header.webp)

### The Memberships table

Underneath, every membership this user holds. One row per membership, a user can have many.

| Column        | What it shows |
|---------------|----------------|
| **Plan & Level** | Plan title (top) and Level name (bottom). |
| **Provider**     | Where the membership came from: `default` (Native Payment), `FluentForms`, `FluentCart`, `WooCommerce`, etc. |
| **Start Date**   | When the membership row was created. |
| **Expires**      | The expiry date, `Lifetime`, or `N/A` for cancelled/expired rows. |
| **Amount**       | Initial charge amount (blank when not tracked). |
| **Created**      | Same as Start Date in most cases. |
| **Status**       | Coloured pill: `Active`, `Trial`, `Pending`, `Cancelled`, `Expired`, `Suspended`. |

The **+ Add Membership** button at the top-right of the card opens the [Adding a Membership Manually](./adding-manually) modal.

---

## Row actions

Each membership row has a kebab (⋮) at the end. Clicking it opens a small menu:

| Action            | Visible when… | What happens |
|-------------------|---------------|---------------|
| **Suspend**       | Status is `Active` or `Trial` | Revokes access without ending billing. See [Suspending & Cancelling](./suspending-and-cancelling). |
| **Cancel**        | Status is `Active`, `Trial`, or `Pending` | Ends the membership; access revoked. |
| **Refund** *(Pro)* | A linked transaction exists | Opens the Refund modal, see [Refunds](/guide/transactions/refunds). |

![Memberships table with row action menu open (Suspend / Cancel)](/screenshots/member-detail-row-actions.webp)

::: warning Status-aware actions
The menu only shows actions that make sense for the current row. You won't see Suspend on a Cancelled row, or Cancel on an Expired one. If the action you expect is missing, check the row's status.
:::

---

## A real example: Sara handles a refund request

A member emails: *"Please cancel my Pro Yoga subscription and refund this month's charge."*

Sara:

1. Opens **Members**, searches their email.
2. Clicks the row → lands on this Detail page.
3. On the membership row (currently `Active`), clicks the kebab → **Cancel**. Status flips to `Cancelled`; if Pro Stripe is connected, the recurring charge stops too.
4. Clicks the kebab again on the same row → **Refund** (Pro only). A modal opens with the original transaction amount pre-filled. She confirms.
5. The member receives a refund email; their access is gone.

Two clicks, one screen. Done.

---

## Things that trip people up

| What you're seeing | What's probably going on | Quickest fix |
|---|---|---|
| Memberships table is empty even after a known purchase | The buyer hasn't logged in yet, so no WP user → no membership row. | Wait for them to confirm their account, or grant manually. |
| Status shows Pending for hours | Provider webhook hasn't fired (e.g. Stripe webhook URL is wrong, or FluentCart event was missed). | Check the provider's logs; see [Troubleshooting](/reference/troubleshooting). |
| Refund action doesn't appear | Either the plugin is free (no refunds without Pro) or no charge was recorded for this row. | Install Pro; check Transactions for a linked charge. |
| Member has multiple rows for the same Level | Could be one paid purchase + one manual grant. | Cancel the duplicate row. |

---

## What's next?

- **→ [Adding a Membership Manually](./adding-manually)**: comp an admin or comp someone for support.
- **→ [Suspending & Cancelling](./suspending-and-cancelling)**: what these actions do in depth.

**Recommended reading:**
- [Membership Statuses](/reference/membership-statuses): the canonical status vocabulary.
- [🔒 Pro · Refunds](/guide/transactions/refunds): the refund flow.
