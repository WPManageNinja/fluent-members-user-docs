# Email Merge Tags

Merge tags are `{{user_name}}`-style placeholders. Use them in the **Subject** field and the **Body** of any email notification. The plugin replaces them at send time with values from the recipient and the membership.

## The seven tags

| Tag                     | Replaced with                                              | Example output            |
|-------------------------|------------------------------------------------------------|---------------------------|
| <code v-pre>{{user_name}}</code>        | The recipient's WordPress display name                     | `Sara Patel`              |
| <code v-pre>{{user_email}}</code>       | The recipient's WordPress email address                    | `sara@example.com`        |
| <code v-pre>{{membership_level}}</code> | The title of the level that was granted                    | `Pro Yoga`                |
| <code v-pre>{{start_date}}</code>       | When this membership started (formatted with site **Date Format**) | `Jun 17, 2026`    |
| <code v-pre>{{expires_at}}</code>       | When it expires; empty/lifetime falls back to `Never`      | `Jul 17, 2026`            |
| <code v-pre>{{site_name}}</code>        | Your site's title                                          | `Sara's Yoga`             |
| <code v-pre>{{site_url}}</code>         | Your site's URL                                            | `https://sarasyoga.com`   |

That's the complete list. Anything else you've seen in third-party docs is *not* shipped in Fluent Members 1.0.0.

## Fallbacks with the Pipe

You can give a tag a fallback when the value is empty. The fallback text comes after a `|`:

<code v-pre>{{expires_at|Never}}</code>

If `expires_at` is null (a lifetime membership), the email shows the word `Never`. If `expires_at` has a value, the fallback is ignored.

This works for any tag, but it's most useful on `expires_at` and `start_date`.

## Where Merge Tags Work

| Location                      | Tags work? |
|-------------------------------|:----------:|
| Email Subject                 | ✅          |
| Email Body                    | ✅          |
| Email Footer (mailing settings) | partial (see below) |
| Page content / shortcodes     | ❌          |

The **email footer** field (Settings → Mailing) has its own limited set: only `{{site_name}}`, `{{site_url}}`, and `{{site_name_with_url}}` work there. The full merge-tag parser does NOT run on the footer.

## Inserting Tags in the Editor

In **Settings → Email Notifications**, the editor sidebar groups tags by source so you can click to insert:

- **User**, `{{user_name}}`, `{{user_email}}`
- **Membership**, `{{membership_level}}`, `{{start_date}}`, `{{expires_at}}`
- **Site**, `{{site_name}}`, `{{site_url}}`

Pro's Block Email Editor exposes the same sidebar in the iframe.

## What about HTML Escaping?

The parser HTML-escapes string values by default, so a member named `<script>` becomes `&lt;script&gt;` and won't break your template. Trust the parser; you don't need to wrap tags in any escape helper.

## Custom Merge Tags (developers)

Add your own tag groups with `apply_filters('fluent_members/email_notification_shortcode_groups', $groups)`. The same groups populate the picker in both the free HTML editor and Pro's Block Email Editor. To customise how Pro's block editor parses your custom tag inside a block, hook `fluent_members/parse_email_block_content`. See [Developer Reference → Hooks](/reference/developer-hooks).


