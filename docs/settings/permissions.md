---
title: "Permissions"
description: "Control which WordPress users can add, change or remove access restrictions on posts, pages and blocks."
---

# Permissions

**Permissions** controls who can add, change and remove access restrictions on posts, pages and blocks. Use it when editors or authors work on your content and you want to decide whether they can protect it, or change protection that is already there.

## Open Permissions

Click the **Settings** gear in the top-right corner of any Fluent Members screen, then click **Permissions**.

![Screenshot of the Permissions settings with the Content Restrictions default, the Managers table, and an arrow pointing to Add Manager](/images/settings/permissions/permissions-overview.webp)

Administrators can always manage every restriction, so these settings don't apply to them.

> [!Note]
> These permissions cover restrictions in the WordPress editor, on content the user can already edit. They don't give access to the Fluent Members admin screens, which stay administrator-only.

## Default for other users who can edit posts

This setting applies to everyone who is not an administrator and is not listed as a manager:

- **Can add new restrictions** (default): The user can add restrictions to content that has none. They cannot change or remove restrictions already saved on it.
- **Cannot change restrictions:** The user cannot add, change or remove restrictions.

Click **Save Settings** in the top-right corner to apply your choice.

## Add a manager

A manager is a user with a specific role here, which replaces the default above.

1. Click **Add Manager**.
2. In the **Add Role** dialog, type under **Select User** and pick the user. Administrators can't be selected, because they already have every permission.
3. Under **Select Role**, pick a role.
4. Click **Attach Role**.

![Screenshot of the Add Role dialog with the Select User and Select Role fields and the Attach Role button](/images/settings/permissions/permissions-add-role-dialog.webp)

Two roles are available:

| Role | What the user can do |
|---|---|
| **Restriction Manager** | Add, change and remove access restrictions on content they can edit. |
| **Restriction Author** | Add restrictions to content, but not change or remove saved restrictions. |

## Manage your managers

The **Managers** table lists each manager with their role. Use the **All**, **Manager** and **Author** tabs to filter it, or the search icon to find someone.

Open the three-dot menu on a row to change it:

- **Edit:** Opens the **Edit Role** dialog, where you choose a different role.
- **Remove:** Removes the manager. The user falls back to the default permission.

Deleting a WordPress user also removes their manager role.
