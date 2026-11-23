---
title: "Level Integrations"
description: "Manage the integration feeds that run an action in another plugin when someone joins, renews or loses a level."
---

# Level Integrations

**Level Integrations** run an action in another plugin when a membership on a level starts, renews or ends. Each action is a **feed** that you set up on the level.

The **Integrations** tab appears only when an add-on or plugin has registered a level integration. If you don't see it, no integration is available on your site, and nothing is missing from your level.

Two common jobs no longer use this tab:

- **FluentCommunity spaces and courses:** Add them on the level's [Content Access](/docs/levels/content-access) tab. See [FluentCommunity](/docs/integrations/fluent-community).
- **FluentCRM tags and automations:** Use the level's [Automations](/docs/levels/automations) tab and [FluentCRM](/docs/integrations/fluentcrm).

## Add a feed

1. Go to **Fluent Members → Membership Levels**, open the level and click the **Integrations** tab.
2. Click **Add Integration** and choose the integration from the list. The button is unavailable when none can be added.
3. Turn on **Enable This Integration** ("Enable this feed for the selected membership level."), then fill in the fields. The fields come from the integration itself, so they differ for each one.
4. Click **Create** followed by the integration's name and **Feed**. When you edit an existing feed, the button starts with **Update** instead.

<!-- TODO(screenshot): levels-integrations-1
  screen: A level's Integrations tab with a feed editor open
  state: Enable This Integration on, integration fields filled in, Create Feed button visible
  data: a registered integration feed
  highlight: the Enable This Integration switch and the Create Feed button
  view: admin
  alt: Screenshot of an integration feed editor with Enable This Integration turned on
-->

## Manage feeds

The **Level Integrations** list shows each feed's **Status**, **Integration**, **Title** and **Triggers**.

- Use the **Status** switch to turn a feed on or off.
- Click a feed's title to edit it, or use **Edit** in its three-dot menu.
- Choose **Delete** in the menu to remove it. The confirmation reads "Delete this integration feed? It stops running for this level, and its settings cannot be recovered."

A feed whose integration is no longer available is greyed out and can't be edited or switched on.

Deleting a level also removes its integration feeds.
