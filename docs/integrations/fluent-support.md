---
title: "Fluent Support"
description: "See a customer's membership levels and statuses next to their Fluent Support ticket."
---

# Fluent Support

The **Fluent Support** integration shows a customer's memberships next to their ticket, so your agents can see what the customer has without switching screens. It works on the free plan.

You need Fluent Support active on your site. There is nothing to set up.

## What your agents see

When an agent opens a ticket, the customer's side panel includes a **Membership Levels** widget. It lists each of the customer's memberships with the level name and its status, newest first. Every membership is listed, including expired and cancelled ones.

<!-- TODO(screenshot): fluent-support-1
  screen: Fluent Support → Tickets → open a ticket from a member
  state: customer panel with the Membership Levels widget, cropped to the widget only
  data: a ticket from a customer linked to a WordPress user with a membership
  highlight: -
  view: admin
  alt: Screenshot of the Membership Levels widget on a Fluent Support ticket
  reason: none of the 736 tickets comes from a customer linked to a member, and jane.docs has no Fluent Support record; needs a ticket from a test member, which would add site data
-->

## When the widget does not appear

The widget appears only when both of these are true:

- The ticket's customer is linked to a WordPress user. A customer who only has an email address gets no widget, even if a member has the same address.
- That user has at least one membership.

The widget is for reference only. To change a membership, open the member in [**Fluent Members → Members**](/docs/members/).
