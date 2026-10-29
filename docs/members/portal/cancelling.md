# Cancelling a Membership 

FluentMember allows your users to easily cancel their own active subscriptions directly from the frontend Member Portal. This gives your members full control over their accounts and reduces the number of support tickets you receive.

## How Members Access the Portal

Members must be logged into your WordPress site to manage their account. If a logged-out visitor tries to view the page, they will see a sign-in prompt instead.

Members can reach their portal through:

* **Site Navigation:** A custom link you place in your header or footer menu.
* **Direct URL:** The specific webpage where you placed the `[fluent_member_portal]` shortcode.
* **Email Links:** Direct links automatically included in FluentMember notification emails.

## How to Cancel a Membership

When a member is ready to cancel, the process is quick and completely self-serve.

1. The member opens the portal and views their list of memberships.
2. They click the **Manage** button next to the specific plan they want to cancel (this button is only available for Active or Trial plans).

![Member portal: membership list](/images/members/cancel-memberships/manage-1.webp)

3. On the Membership Details screen, they click the **three-dot menu** icon located at the top right of the profile card.
4. They click **Cancel Membership** from the dropdown menu.
5. A confirmation pop-up will appear to verify their choice.

![Cancel membership confirmation](/images/members/cancel-memberships/cancel-memberships-2.webp)

6. The member clicks **Confirm Cancellation** to finish the process, and the page updates automatically.

## What Happens After Cancellation

As soon as the member confirms their cancellation, FluentMember runs a few automated tasks in the background:

* **Status Update:** The membership row immediately changes to "Cancelled" on both the frontend portal and your backend admin dashboard.
* **Provider Sync:** If the membership uses Native Payment (Stripe), the plugin tells Stripe to stop future recurring charges.
* **Corporate Cascade:** If the cancelled plan is a parent Corporate Membership, all invited team members (child seats) will also have their access cancelled automatically.

## Immediate vs. End of Period Modes

You can configure exactly how access is handled after a cancellation is requested.

* **Immediate:** The membership is cancelled, and the user loses access to all protected content right away.
* **End of period:** The status changes to cancelled immediately, but the user keeps their access to the protected content until their current billing cycle reaches its renewal date.

>[!Note]
> Once a membership is cancelled, the user cannot undo it from their portal. If they want to rejoin, they must purchase a brand new plan from your pricing page. On the admin side, the "Cancel" and "Suspend" actions will disappear for this user, but Pro users will still see the "Refund" option if a past transaction needs to be reversed.
