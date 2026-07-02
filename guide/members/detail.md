# Member Detail

The **Member Detail** page gives you a complete overview of a specific user on your site. Here, you can view their account information, track their plans, and manage their membership statuses all from a single, easy-to-use screen.

## Viewing User Information

To find a specific user's account details, follow these steps:

 - In your WordPress dashboard, navigate to **Fluent Members → Members**.  
 - **Click** anywhere on a user's row to open their profile.

 ![Member](/images/members/members-details/members-1.webp)

 - At the top of the page, you will see their **Avatar**, **Display Name**, and **Email Address**.
 - You will also see their **Registration Date** (when they created their WordPress account) and their current WordPress **Role** (like Administrator or Subscriber) displayed as a badge on the right.

## Understanding the Memberships Table

The Memberships table displays all memberships assigned to the user. If the user has multiple memberships, each one appears in a separate row.

 * **Plan & Level:** The name of the specific pricing plan and the overall Membership Level they belong to.
 * **Provider:** How the user acquired the membership (e.g., Manual, native payment, FluentForms, WooCommerce).
 * **Start Date & Created:** When the membership officially began and when the record was generated.
 * **Expires:** The date the membership access ends. This will show "N/A" or remain blank for lifetime, expired, or cancelled plans.
 * **Amount:** The total price the user paid at checkout.
 * **Status:** A colored badge indicating if the plan is currently Active, Trial, Pending, Cancelled, Expired, or Suspended.

>[Tip]
>To give the user a brand new [membership manually](./adding-manually), simply click the dark **+ Add Membership** button at the top right of the table.

![Membership Table](/images/members/members-details/membership-table-2.webp)


## Using Row Actions

Each membership row has an action menu at the end of the row. The available actions depend on the current status of that membership:

 * **Suspend:** Temporarily revokes the user's access without [cancelling](./suspending-and-cancelling) their recurring billing. (Only available if the status is Active or Trial).
 * **Cancel:** Instantly ends the membership and removes their access to protected content. (Available for Active, Trial, or Pending statuses).
 * **Refund (Pro only):** Opens the refund window to return the user's money. (Only available if a linked payment transaction exists). See [Refunds](/guide/transactions/refunds).


> [!Note]
> The action menu is "status-aware." This means it only shows actions that make sense for the current status. If you are looking for the "Cancel" button but cannot find it, check the status badge—the user might already be marked as "Expired" or "Cancelled."
