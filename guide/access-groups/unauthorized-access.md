# Unauthorized Access

The **Unauthorized Access** card decides what a non-member sees when they visit protected content. Pick the right action and your site can send them to a pricing page, show them a message, or give them a small preview instead. This card sits in the right column of the **Access Group** edit page.

## Step 1: Open the Unauthorized Access Card

Go to **Fluent Members → Access Groups**, open the group you want to configure, and look in the right column for the **Unauthorized Access** card. Click the **Action for Unauthorized Users** dropdown to choose an action.

![Unauthorized Access card set to Redirect to a specific URL](/images/access-groups/unauthorized-access/redirect-to-specific-url-1.webp)

## Step 2: Choose an Action

| Action | What a non-member sees | Extra fields |
|---|---|---|
| **Redirect to a specific URL** | Sent to a page you choose, like a checkout or pricing page. | **Redirect URL** *(required)* |
| **Display a custom message** | The protected content is replaced with a message you write. | **Custom Message** *(required)*, **Button Text**, **Button URL** |
| **Display partial preview** | The first few words show, then the rest blurs out. | Configured globally in [Partial Content Lock](/guide/settings/partial-content-lock); per-Group overrides available. |

### Redirect to a specific URL

Type the exact web address into the **Redirect URL** field — a relative path (`/pricing`) or a full URL both work. Save with it empty and you'll see *"Please enter redirect URL."*

### Display a custom message

Type the text non-members should see into the **Custom Message** field. Save with it empty and you'll see *"Please enter a custom message."*

Two optional fields sit below it:

| Field | What it does |
|---|---|
| **Button Text** | Label for a button under the message, e.g. `View Plans`. |
| **Button URL** | Where that button links to, e.g. `/membership-plans`. |

Fill in both to show a button under the message; leave either blank and no button appears.

![Unauthorized Access card set to Display a custom message, with Button Text and Button URL fields](/images/access-groups/unauthorized-access/display-a-custom-message-2.webp)

### Display partial preview

No extra fields on this card. Preview length, overlay colour, and button text are all set globally in [Settings → Partial Content Lock](/guide/settings/partial-content-lock); per-Group overrides can also be set in the Gutenberg block editor.

## Step 3: Save Your Changes

Click **Save** in the top-right corner of the page. Your Unauthorized Access setting is not applied until you save the access group.

## Important Notes

> [!Note]
> **Content Drip overrides this card**: if the content hasn't unlocked yet, the member sees a countdown notice instead of your configured action, and is never redirected. See [Content Drip](/guide/levels/content-drip).



