---
title: "Guided Setup and Quick Start"
description: "Follow the five steps of the Fluent Members guided setup, then finish the rest from the Launch checklist on your Dashboard."
---

# Guided Setup and Quick Start

The **guided setup** gets your first membership selling in about two minutes: it picks how you get paid, creates a membership, protects content and builds your pricing and account pages. It opens by itself the first time you open **FluentMembers** on a new install. Nothing you pick is permanent, and you can skip any step.

The header shows **Step 1 of 5** and a progress bar. Steps 2 to 4 have **Back** and a skip link at the bottom, and the header has an **I'll do this later** button that closes the setup. If you leave and come back, the setup resumes at the step you stopped on.

## Step 1: Welcome

The first screen reads **Let's get your first membership selling**.

- **Found on your site:** lists what the setup detected. FluentCart shows **Will use** (or **Needs an update**), FluentCommunity shows **Ready**, and any membership plugin with data to move, such as Paid Memberships Pro, MemberPress or Kadence Memberships, shows its counts and an **Import** button. **Import** closes the setup and opens [Migration](/docs/settings/migration/).
- **What are you building?** Pick one of **Online courses**, **Community**, **Premium articles**, **Paid newsletter**, **Coaching** or **Downloads**. The setup uses it to suggest a name, a price and content to protect. You can pick none.

![Screenshot of the Welcome step with the Found on your site list and the six site type tiles](/images/getting-started/quick-start/guided-welcome.webp)

Click **Start**.

## Step 2: Get paid

**How will people pay you?** shows your options:

- **FluentCart** (recommended): free, built for selling memberships, courses and downloads. If FluentCart is not installed or active, the button reads **Install FluentCart and continue** or **Activate FluentCart and continue**, and the setup does it for you. If FluentCart needs an update, update it from the Plugins screen first.
- **WooCommerce** (Pro): sell through your WooCommerce store. It only shows when WooCommerce is active.
- **Built-in checkout** (Pro): Stripe and PayPal without a store. You connect them later in **Settings → Payment Settings**.
- **Free memberships only:** no payments for now. You can add paid prices later.

You do not need to connect Stripe or PayPal here. The Launch checklist reminds you, and test purchases work before that. Choose an option and click **Continue**, or click **Skip**.

![Screenshot of the Get paid step with FluentCart, Built-in checkout and Free memberships only](/images/getting-started/quick-start/guided-get-paid.webp)

> [!Note]
> Options marked **Pro** are locked until Fluent Members Pro is active. See [Activate Pro](/docs/getting-started/installation-pro).

## Step 3: Your first membership

**Your first membership** is a form with a live preview of your pricing page beside it.

- **Membership name:** the name members see. The setup fills in a suggestion for your site type, and you can change it.
- **How do members pay?** Choose **Free**, **One-time**, **Monthly** or **Yearly**. With WooCommerce you choose **Free** or **Paid**, and the price comes from the WooCommerce product.
- **Price:** the amount, in your store's currency. It shows for paid memberships without an existing product.
- **Also add a free tier:** creates a second membership called **Free** that people can join at no cost. It is not needed when the membership is already free.
- **Pick an existing product:** with FluentCart or WooCommerce, sell the membership through a product you already have instead of creating one. A product that already sells another membership cannot be picked.

With FluentCart, the setup creates a FluentCart product for the membership. Descriptions and feature lists can be edited later on the level.

![Screenshot of the Your first membership step with the form on the left and the pricing page preview on the right](/images/getting-started/quick-start/guided-first-membership.webp)

Click **Create membership** (it reads **Save membership** if you come back to edit it), or click **Skip**.

## Step 4: Content

**What do your members get?** asks what only members can see. Everything else stays public.

- Under **Members only**, click a suggestion to turn it on, for example **All posts**, **All pages**, a category, or **All digital products** (FluentCart). With FluentCommunity active, **Spaces & courses** lets you pick spaces and courses.
- Under **Protected content**, add more content yourself, and under **Exceptions** leave items out.

A note on the screen explains what visitors see: visitors who aren't members see your default message with a join button and a login link. You can drip lessons, share content across memberships or change the message later on the membership's **Content Access** tab.

Click **Protect N items**, or **Skip, I'll protect content later**. If you skipped the membership step, this screen asks you to add a membership first.

<!-- TODO(screenshot): quick-start-4
  screen: Guided setup, step 4 Content
  state: one suggestion turned on
  data: membership named after the site type suggestion
  highlight: the Members only suggestions and the Protect items button
  view: admin
  alt: Screenshot of the Content step with the Members only suggestions
-->

## Step 5: You are live

The last screen reads **Your membership is ready to sell** (or **Setup is done**). It shows the pages the setup made for you, each with **Copy link** and **View**:

- **Pricing page**
- **Member account**, your Member Portal
- **Checkout Page**, only for the built-in checkout
- **Direct checkout link**, when the membership has one

A **Test mode · no real charges yet** badge appears while payments are still in test mode. Under **Try it before your members do**, click **Preview** to open a protected page and see what a visitor sees. Use a private window.

The Launch checklist sits beside these links. Click **See the membership details** to open the level, or **Go to dashboard**.

<!-- TODO(screenshot): quick-start-5
  screen: Guided setup, step 5 live screen
  state: setup finished with FluentCart
  data: pricing page and member account created
  highlight: the Made for you links and the Launch checklist panel
  view: admin
  alt: Screenshot of the final setup step with the page links and the Launch checklist
-->

## Finish with the Launch checklist

After the setup, the **Launch checklist** stays on your **Dashboard** until every item is done. It shows a count such as `3 of 7 done`. Each item checks your real data, so it ticks itself when you finish it.

| Item | Ticks when | What the button does |
|---|---|---|
| **Create a membership** | A level exists | **Open** shows your levels |
| **Protect content** | Any content is protected | **Open** shows the level's **Content Access** tab |
| **Publish a pricing page** | A pricing page is set | **View** opens it, or opens **Settings** if there is none |
| **Make a test purchase** | A test payment or test order exists | **Start** opens the checkout link |
| **Connect Stripe or PayPal** | A gateway is connected and live | **Connect** opens the payments settings in FluentCart, or [Payment Settings](/docs/settings/payment-settings/) for the built-in checkout |
| **Switch FluentCart to live mode** or **Switch payments to live mode** | Payments are live | **Go live** opens the mode setting |
| **Check your welcome email** | You open it from the checklist | **Edit** opens the **Welcome Email** |
| **Get your first member** | A real (non-test) member joins | None. It ticks itself. |

The payments row changes with how you sell. With WooCommerce it reads **Set up WooCommerce payments**, and with free memberships only it reads **Payments** and counts as done.

Click **Skip** on an item to set it aside. A skipped item stays in the list without its buttons. Click the **×** to hide the whole checklist.

![Screenshot of the Dashboard Launch checklist card with its items](/images/getting-started/quick-start/launch-checklist.webp)

To test the payment path, read [Test mode and live mode](/docs/getting-started/test-and-live-mode).

## Run the setup again

Go to **Fluent Members → Settings → General Settings**, find **Setup wizard** and click **Run setup again**. Confirm **Run setup**. Your memberships, prices and content stay as they are.

## Test as a visitor

Administrators skip all protection, so your own account always sees everything. Open a protected page in a private window while logged out. You should see your message and a join button, and your pricing page should show your membership.
