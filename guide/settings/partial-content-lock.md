# Partial Content Lock

Partial Content Lock controls the soft-paywall overlay that appears when an Access Group's [Unauthorized Access](/guide/access-groups/unauthorized-access) action is set to **Display partial preview**. Visitors see the first few words of protected content, then hit a blurred overlay with a call-to-action button. Set the defaults here once — individual blocks or posts can override them in the Gutenberg editor when needed.

## Access Partial Content Lock

Click the **Settings** gear icon in the top-right corner of any FluentMember screen, then select **Partial Content Lock** from the left-hand menu.

![Partial Content Lock settings card](/images/settings/partial-content/settings-partial-content-lock-1.webp)

## Configuring Partial Content Lock

At the top of the card is a master toggle **Partial Content Blur Settings**. Switch it on to enable the feature globally.

The following fields control the appearance and behaviour of the overlay:

- **Preview Length**: The number of words shown before the blur kicks in. Minimum is 10; a value of 50–100 words works well for most content.
- **Overlay Color**: Background color of the gradient that fades into the overlay (default `#FFFFFF`).
- **Overlay Opacity**: How opaque the overlay appears (0–100%). Higher values create a harder paywall; lower values let more content show through.
- **Overlay Message**: The headline text shown on the overlay (e.g. *"This content is for members only."*).
- **Message Color**: The text color for the overlay message (default `#333333`).
- **Button Text**: Label for the call-to-action button (e.g. *"Get Access"*).
- **Button URL**: Where the button links to. Set this to your pricing or sign-up page.
- **Button Color**: Background color of the CTA button (default `#0073AA`).
- **Button Text Color**: The button text color of the CTA button (default `#FFFFFF`).
- **Button Size**: You can choose button size **Small, Medium, or Large**.

 After that, click the **Save Settings** button when done.

![Partial Content Lock fields configured](/images/settings/partial-content/settings-partial-content-lock-2.webp)

## Global Defaults and Per-Block Overrides

The values set here are global defaults. Individual Gutenberg blocks can override the Preview Length, Overlay Message, Button Text, and Button URL from the block's Inspector panel — any field left blank in the block inherits from this page.

::: tip
These settings only take effect when an Access Group's Unauthorized Access action is set to **Display partial preview**. For Redirect, Custom Message, or other actions, this configuration has no effect. See [Unauthorized Access](/guide/access-groups/unauthorized-access) for the full options.
:::
