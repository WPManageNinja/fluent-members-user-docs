# Protected Content: Restriction Types

The **Protected Content** feature allows you to choose which content will be protected by an **Access Group**. Here, you can select the type of content to restrict, specify the items you want to protect, and exclude any items that should remain accessible. This section is located in the left column of the **Access Group** edit page, just below Basic Information.

## The Apply Restriction To Field

The **Apply Restriction To** field is a multi-select dropdown. You can choose one type or combine multiple types in a single Access Group. Each selected type appears as a removable tag inside the field.

Available restriction types:

| Type | What it protects |
|---|---|
| **All Posts** | Every WordPress post (default post type) — including future posts |
| **All Pages** | Every WordPress page — including future pages |
| **All Categories Archive** | Category archive listing pages (`/category/name/`) |
| **All Tags Archive** | Tag archive listing pages (`/tag/name/`) |
| **Specific Post/Page/CPT/Taxonomy Etc.** | A handpicked list of posts, pages, custom post types, or taxonomy terms |
| **Specific Products/Categories/Brands Etc.** | Specific FluentCart or WooCommerce products, categories, or brands |
| **All Products** | Every product across active commerce integrations (FluentCart, WooCommerce) |
| **Entire Website** | Locks the entire site — only members with an active Level can access any page |

::: tip Combine types when needed
Because this is a multi-select, you can protect different content types with a single group. For example, select both **Specific Products/Categories/Brands Etc.** and **All Products** to cover both a handpicked list and all future products at the same time.
:::

![Protected Content section](/images/access-groups/protected-content/protected-content-1.webp)

## Include Content

When you select a type that requires specific items (such as *Specific Post/Page/CPT/Taxonomy Etc.* or *Specific Products/Categories/Brands Etc.*), an **Include Content** search field appears below the dropdown.

- Type at least one character to search for content by title.
- Results appear grouped by type (Posts, Pages, Products, Categories, etc.).
- Click an item to add it to the rule.
- Only the items you add here will be protected — new content is **not** added automatically.

::: tip Use post-type rules for automatic coverage
If you want all future posts in a category or custom post type to be protected automatically without adding them one by one, select a broader type like **All Posts** instead of picking individual items.
:::

## Exclude Content

The **Exclude Content** search field lets you carve out exceptions from a broader rule.

- Type a keyword to search for items to exclude.
- Any item you add here will remain **publicly visible**, even if it would otherwise be covered by your restriction type.
- Use this when you want to protect most content in a category but leave a few items free to preview.

## Important Notes

::: warning Things to keep in mind
- **Administrators are not affected by content restrictions:** To test protected content, use an incognito window or log out of your admin account.
- **Specific restriction types require manual updates**: If you use Specific Posts, Pages, Custom Post Types, or Taxonomies, you must manually add new content to the Include Content list.
- **Some restriction options depend on active integrations**: Options like Products, Categories, or Brands are available only when the required plugin (such as FluentCart or WooCommerce with Fluent Members Pro) is installed and activated.

:::


