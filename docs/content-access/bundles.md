---
title: "Bundles"
description: "Create a Bundle, a set of protected content you can give to several Membership Levels at once, and edit it from any level that uses it."
---

# Bundles

A **Bundle** is a set of content you can give to several Membership Levels at once. Use one when the same posts, pages or courses should unlock for more than one level, so you edit them in one place.

Bundles have no screen of their own. You create, add and edit them from a level's **Content Access** tab.

## Create a bundle from a level

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Content Access** tab.
2. Under **Also gets access from**, click **+ Add bundle**, then **Create a new bundle**.
3. In the **New content bundle** drawer, enter a **Bundle name**, such as `Bonus Library`.
4. Click **Add content**, pick what the bundle should open, and confirm. [Add content](/docs/levels/content-access) works the same way as on a level.
5. Click **Create bundle**.

![Screenshot of the New content bundle drawer with a name and two content rows](/images/content-access/bundles/bundles-new-drawer.webp)

The new bundle is added to the level you started from. The footer of the drawer says so: **The new bundle is added to (level).**

> [!Note]
> Save or cancel any pending changes on the tab first. If the save bar is showing, Fluent Members asks you to **Save or cancel your changes first.**

## Save a level's content as a bundle

If a level already holds content you want to reuse, turn it into a bundle instead of re-adding it.

1. On the **Content Access** tab, click the three-dot menu in the **Content** card and choose **Save as a bundle**.
2. Enter a **Bundle name**. It starts with the level's title.
3. Click **Save bundle**.

The level's content rules, its left-out items and its custom visitor message move into the new bundle, and the bundle is added to the level. Members keep the same access. A level with no content of its own can't be saved as a bundle.

## Add an existing bundle to another level

1. Open the other level and go to its **Content Access** tab.
2. Under **Bundles**, click **+ Add bundle**.
3. Search, then click a bundle. Each result shows its number of items and **Used by (n) memberships** or **Not used yet**.
4. Click **Save**.

Click **×** on a bundle chip to remove it from the level. The bundle stays on your site and keeps working for other levels.

## Edit a bundle

Click a bundle's name under **Bundles** to open its drawer. It has these parts:

| Part | Notes |
|---|---|
| **Bundle name** | Required. |
| **Content in this bundle** | The rules for everything the bundle opens. Add, edit or remove rows, leave items out, and set a release schedule per row. A schedule counts from when the member first got the membership that includes the bundle. |
| **Message for visitors without access** | Shows **Site default**, **Redirect** or **Custom Message**. Click **Customize for this bundle** to set your own. See [What blocked visitors see](/docs/content-access/unauthorized-access). |
| **Memberships using this bundle** | Shown when more than one level uses the bundle. Lists each level and its number of members. |

When more than one level uses a bundle, the drawer warns **Shared by (n) memberships. Changes here apply to all of them as soon as you save.** The footer tells you what saving updates, for example **Saving updates (level).**

Click **Save bundle** to apply your changes. A drawer with unsaved changes asks **Close without saving?** before it closes.

## Give one level its own copy

To change the content for one level only, open the bundle from that level and click **Make a copy for (level)**. Confirm **Copy rules**. The bundle's rules are copied into the level's own content, and the bundle is removed from that level. Other levels keep using the bundle.

## What visitors see

A bundle can carry its own message for visitors without access. A visitor blocked by that bundle sees its redirect or custom message. A bundle on **Site default** uses the message from [Restricted content](/docs/content-access/restricted-content). If more than one level or bundle protects the same item, a customized message takes priority over the site default.
