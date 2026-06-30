# Access Groups Overview

An **Access Group** acts as a secure container for your content protection rules in Fluent Members. It lets you easily define which pages, posts, or custom content are restricted, and controls which Membership Levels act as the keys to unlock them.

## Understanding the Access Groups List

To see all your created groups, navigate to **Fluent Members → Access Groups** in your WordPress dashboard.

- **List View:** Each row displays the group's ID, Title, Description, and Status (Active or Inactive).
- **Filters and Search:** Use the **All**, **Active**, and **Inactive** tabs at the top to filter your view, or click the search icon to find a group quickly.
- **Create New:** Click the **+ Add New Access Group** button in the top right corner to start a new rule set.

![Access Groups list view](/images/access-groups/overview/access-group.webp)

## Configuring an Access Group

When you create or edit an Access Group, the page is divided into four sections:

1. **Basic Information:** Enter the group's title, write a short internal description, and set the status to Active.
2. **Protected Content:** Use the *Apply Restriction To* dropdown to choose what content to lock. You can restrict all posts, specific pages, categories, or even your entire website.
3. **Unauthorized Access:** Decide what non-members will experience if they try to view the protected content. Options include a redirect, a custom message, a partial content preview, a login popup, or simply hiding the content.
4. **Active Levels:** Select the specific Membership Levels that will grant users access to this group's content.

![Access Group edit page](/images/access-groups/overview/access-group-edit-full-2.webp)

## Recommended Setup Order

Follow these steps when creating a new group to ensure your content is fully protected:

1. **Create the Group** with a clear title and set its status to Active.
2. **Select your Protected Content.** To protect all future posts automatically, choose *All Posts* rather than picking individual items.
3. **Choose your Unauthorized Access action.**
4. **Select the Active Levels** that should unlock this group.
5. Click the single **Save** button in the top-right corner to apply all your settings at once.

## Important Notes

::: warning Things to keep in mind
- **Two-Way Linking:** You can attach a Level to an Access Group from the Group's settings, or from the Level's settings. Both approaches do the exact same thing — use whichever is easier. See [Attaching Access Groups](/guide/levels/attaching-access-groups) for the Level-side flow.
- **Content Drip Scheduling:** If you want to release content on a schedule, configure this inside the Membership Level settings, not the Access Group. See [Content Drip](/guide/levels/content-drip).
- **The Save Button:** There is no save button for each individual section. The main **Save** button only appears in the top-right corner after you have made changes to the page.
- **Access Requirements:** For a user to view protected content, they must hold the correct Membership Level and their account status must be Active or Trial.
:::


