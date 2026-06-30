# Corporate Memberships (Pro)

A **Corporate Membership** lets a single buyer (the **parent** account) purchase a membership plan and invite teammates or colleagues to share the access. Each invited team member gets their own WordPress login, so you can manage group access under one billing account.

> [!Note]
> Corporate memberships need **Fluent Members Pro**. Seat invites, the **Team Members** panel in the Member Portal, and status cascading to sub-members are Pro features.


## Step 1: Create a Corporate Level

1. Go to **Fluent Members → Levels**.
2. Click **+ Add New Level** in the top right.
3. Enter a **Title** for your plan (for example, `Agency Plan` or `Team Access`).
4. Under **Type**, select **Corporate**.
5. Click **Create**.

> [!Note]
> You choose **Individual** or **Corporate** when the level is created. To switch types, delete the level and create a new one.

![Add Membership Level modal with Corporate selected](/images/levels/corporate-memberships/add-membership-level-modal.webp)

## Step 2: Set the Seat Limit

1. Open your new corporate level and stay on the **Edit Level** tab.
2. Find the **Maximum Member** field.
3. Enter the total number of seats allowed. For example, `5` means 1 parent account plus 4 invited teammates.
4. Click **Save** when you are done.

Leave **Maximum Member** empty for unlimited seats the parent can invite as many people as they want.

![Edit Level, Corporate, with Maximum Member field](/images/levels/corporate-memberships/edit-level-corporate-2.webp)

## Step 3: Set Pricing and Access Groups

A corporate level needs the same setup as an individual plan:

1. Open the **Pricing** tab and add a [Pricing Plan](/guide/levels/pricing-native). The parent pays this single price for the entire team.
2. Open the **Access Group** tab and [attach the groups](/guide/levels/attaching-access-groups) this level unlocks. Whatever the parent can access, every invited teammate can access too.

## Step 4: How the Parent Invites Teammates

After the parent purchases the corporate level, they manage the team from the front-end **Member Portal**:

1. The parent logs in and visits the **Member Portal** page.
2. They see a **Team Members** panel next to their membership details.
3. The parent clicks **Send Invitation** and enters the teammate's email address.
4. **Fluent Members** sends an invitation email with a join link.
5. The teammate clicks the link, logs in (or registers), and gains access to the protected content.

See [Portal: Corporate Seat Invites (Pro)](/guide/members/portal/corporate-seat-invites) for the full invitation flow.

## Step 5: Remove a Team Member

If a teammate leaves, the parent can free up a seat from the **Team Members** panel:

1. The parent opens the **Member Portal**.
2. They find the user in **Team Members**, click the **three-dot icon**, and select **Cancel**.
3. The teammate immediately loses access to the restricted content. Their WordPress account stays on the site.

Corporate memberships work well for B2B plans, agency packages, and family tiers. Letting the buyer manage invitations saves admin time while the team shares one billing account.
