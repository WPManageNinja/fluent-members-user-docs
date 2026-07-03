# Member Portal Setup

The Member Portal is a page on your WordPress site where logged-in members can view their active memberships and manage them cancelling, renewing, or updating a payment method without contacting you. The entire portal is powered by a single shortcode.

## The Shortcode

Place the following shortcode on any WordPress page or post:

```text
[fluent_member_portal]
```

When a logged-in member visits the page, the plugin renders their membership panel automatically. Visitors who are not logged in see a sign-in prompt. The shortcode takes no attributes.

## Option A: Let Fluent Members Create the Page

The fastest way to set up the portal:

1. Go to **Fluent Members → Settings → General Settings**.
2. Find the **Member Portal Page** field and click the **Generate Portal Page** button next to it.
3. The plugin creates a new WordPress page with the shortcode already inserted, publishes it, and saves the page ID in Settings automatically.
4. The dropdown updates to show the new page. Use the **Edit** link to rename it, or **Preview** to see it on the front end.

![General Settings — Generate Portal Page](/images/members/portal-setup/generate-portal-page-1.webp)

## Option B: Create the Page Manually

If you want to use an existing page:

1. Open the page in the WordPress editor.
2. Add a **Shortcode** block and type `[fluent_member_portal]`, or paste it directly in the Classic Editor.
3. Publish the page.
4. Go to **Fluent Members → Settings → General Settings → Member Portal Page** and select your page from the dropdown so the plugin knows where to send member links.

>[!Note]
> Use the portal shortcode on only one page. If you add it to multiple pages, the portal will appear on all of them, but emails and admin links will always direct users to the portal page selected in Settings.

## Linking Members to the Portal

Once the page exists, give members a way to reach it:

- **Site navigation**: Add the portal page to your primary menu (**Appearance → Menus**). Common labels: *My Account* or *My Membership*.
- **Welcome email**: Include the portal URL in your Welcome Email template. See [Email Notifications](/guide/settings/email-configuration/email-notifications).
- **Theme account widget**: If your theme has a user-menu widget, point it at the portal page.

## What Members See

When a member visits the portal they see a card for each membership they hold. What is available on each card depends on their plan and whether Pro is installed:

- **Cancel button** — always available; lets the member end their own membership
- **Update Payment Method** *(Pro)* — change the stored Stripe card
- **Renew** *(Pro)* — manually retry a failed subscription payment
- **Team panel** *(Pro, Corporate plans)* — invite or remove seat holders

Members with no membership see an empty state directing them to your pricing page. Logged-out visitors see a sign-in prompt.

![Member Page](/images/members/portal-setup/memeber-dashboard-2.webp)
