# Quick Start - Build Your Membership Site

Follow Sara's story to set up a working membership site from scratch, Levels, Access Groups, protection, and a member portal.

We'll follow **Sara**, a yoga instructor who wants to:
- Keep her intro videos free for everyone
- Lock her full course library behind a **Pro** plan ($19/month)
- Let Pro members log in and see their membership details

By the end of this guide, Sara's site will have protected content, a pricing page, and a working member portal. Yours will too.

**Here's what you'll build:**

- One Access Group called *Pro Content*
- One Membership Level called *Pro Plan*
- A page with the membership pricing shortcode
- A member portal page

**Before we start:** Fluent Members can collect payments three ways, through a payment plugin like [FluentCart](./levels/pricing-paywalls), through [WooCommerce](./levels/pricing-paywalls) *(Pro)*, or via the built-in [Stripe checkout](./transactions/) *(Pro)* and Paypal. For this Quick Start, we'll keep it simple and assume you have FluentCart installed, but the steps work the same way regardless. If you have nothing installed yet, you can still follow along. You just won't process real payments at the end.


## Step 1: Create an Access Group

The first thing we'll build is the **Access Group**. This is where we define *which content* is protected.

Think of an Access Group as a padlocked folder. Anything you put inside it is off-limits to non-members until they unlock it with the right Membership Level.

Here's how Sara does it:

1. In your WordPress sidebar, open **Fluent Members → Access Groups**. You'll see an empty list on a fresh install. That's expected.
2. Click **Add New Group**. A creation panel opens on the right side of the screen.
3. Fill in:
   - **Title**: Type `Pro Content`
   - **Description**: Optional. Sara types: *"All premium yoga lessons and live class recordings."*
   - **Status**: Leave it as **Active**
4. Click **Create**.
   *The group is saved and appears in the list. We'll add the restriction rules in Step 3, once we have a Level to connect it to.*


::: tip 
You've created your first Access Group. It doesn't protect anything yet, that's Step 3. But the group is ready.
:::

---

## Step 2: Create a Membership Level

Now let's create the plan Sara will sell. A [Membership Level](./levels/) is the product the thing a visitor buys. When they buy it, they get access to the Access Groups attached to it.

1. In your sidebar, go to **Fluent Members → Levels**.
2. Click **Add New Level**.
3. Fill in:
   - **Title**: Type `Pro Plan`
   - **Type**: Leave as **Individual** (one person, one membership)
   - **Description**: Sara types: *"Full access to all yoga lessons and live class recordings."*
   - **Access Groups**: In the dropdown, select **Pro Content** (the group we just created)
   - **Status**: Leave as **Active**
4. Click **Create**.
   *The level is saved. You'll see it appear in the Levels list.*

::: info What about pricing?
Pricing lives inside each **Pricing Plan** attached to your Level. You can configure plans that point at FluentCart products, WooCommerce products *(Pro)*, Fluent Forms, Paymattic forms, or native Stripe checkout *(Pro)*. We'll add a plan in the next step. For now, the Level is created.
:::

---

## Step 3: Protect your Content

This is where it gets real. We're now going to tell the *Pro Content* Access Group which pages or posts it should protect.

1. Go back to **Fluent Members → Access Groups**.
2. Click the **Pro Content** group to open it.
3. Find the **Content Restriction Rules** section and click **Add Rule**. A new row appears with two dropdowns.
4. In the first dropdown, choose the type of content to restrict. Sara picks **Posts** (her lesson posts).
5. The second field lets her optionally pick specific posts. If she leaves it empty, all posts will be restricted.

   Sara actually wants to restrict a custom post type called **Lessons**. She picks that instead of "Posts".

6. Under **Action for Unauthorized Users**, choose what non-members see. Sara picks **Display a custom message** and types: *"This lesson is for Pro members only. Join today to get instant access."*
7. Click **Save Changes**.

The access group now protects all content of the type(s) you selected.

Go open one of the protected pages in a **new incognito window** (where you're not logged in). You should see Sara's custom message instead of the content. That means it's working.

::: tip Test in Incognito
Admins always bypass content restrictions that's intentional. To see what a real visitor sees, always test in a private/incognito browser window where you're not logged in to WordPress.
:::

---

## Step 4: Create a Pricing Page

Sara needs a page where visitors can see the Pro Plan price and click to buy. Fluent Members handles this with a shortcode.

First, you'll need a product in your payment provider (FluentCart or WooCommerce) connected to the Pro Plan Level. Set that up in your payment plugin, then come back here.

1. In your WordPress sidebar, go to **Pages → Add New**.
2. Give the page a title Sara uses: **Become a Pro Member**.
3. In the content area, add a new block and choose **Shortcode**.
4. Type (or paste) this shortcode, replacing `X` with the ID of your Pro Plan Level:

   ```
   [fluent_membership_level id="X"]
   ```

   ::: tip Finding your Level ID
   Go to **Fluent Members → Levels**. The ID column shows the number for each level. Sara's Pro Plan might be ID 1.
   :::

5. Publish the page.

When you visit the page as a logged-out visitor, you'll see a pricing card with a **Subscribe Now** button. That button links to your payment provider's checkout.

---

## Step 5: Set up the Member Portal

The [Member Portal](./members/portal/setup) is the page your members visit to view and manage their memberships. Let's create it.

1. Go to **Pages → Add New**.
2. Title the page **My Membership** (or whatever you prefer).
3. Add a **Shortcode** block and paste:

   ```
   [fluent_member_portal]
   ```

4. Publish the page.

That's it. When a logged-in member visits this page, they'll see their active memberships, subscription details, and a cancel button. Non-logged-in visitors will see a prompt to log in.

::: info What Members See
After logging in, members see their membership name, start date, expiry date, and status. Corporate members also see a team-management panel where they can invite colleagues.
:::

---

## Step 6: Test 

Let's check that everything works end-to-end.

1. **Test as a non-member:** Open an incognito window and go to one of Sara's protected lesson pages. You should see her restriction message, not the content.
2. **Test the pricing page:** Visit the pricing page you created. The Pro Plan card should be visible with a Subscribe button.
3. **Test the portal as a member:** If you have a test account with an active membership, log in and visit the Member Portal page. Your membership details should appear.

If all three work, Sara's membership site is live.

---

## What's next?

You've built a working membership site. Here's what to explore next, in the order most people find useful:

**Go deeper on the features you just used:**
- [Access Groups in detail](./access-groups/): Restriction rule types, content dripping, partial previews
- [Membership Levels in detail](./levels/): Corporate plans, multiple access groups, status management
- [Member Portal setup](./members/portal/setup): Customising the portal, corporate team management

**Set up payments properly:**
- [FluentCart integration](./levels/pricing-paywalls)
- [WooCommerce integration](./levels/pricing-paywalls)

**Polish the member experience:**
- [Welcome email](./settings/email-configuration/email-notifications): Send an automatic welcome message when someone joins
- [Login Popup](./settings/login-popup.md): Instead of redirecting non-members, show a login popup
- [Partial Content Preview](./access-groups/protected-content): Show a teaser of protected content instead of a hard block
