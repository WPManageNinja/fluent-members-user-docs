---
title: "LMS Courses"
description: "Enroll members in LearnDash, LifterLMS, Tutor LMS, LearnPress, Sensei LMS and MasterStudy LMS courses when they join a level, and unenroll them when they leave."
---

# LMS Courses

The **LMS** integration enrolls members in courses when their membership starts and unenrolls them when it ends. It works with LearnDash, LifterLMS, Tutor LMS, LearnPress, Sensei LMS and MasterStudy LMS, on the free plan. Use it to sell course access as a membership.

Your learning plugin still controls lessons, progress and certificates. Fluent Members only enrolls and unenrolls members. You need at least one of these plugins active on your site.

## Link courses to a level

Follow these steps to enroll a level's members in courses:

1. Go to **Fluent Members → Membership Levels** and open the level.
2. Open the **Content Access** tab. In the **Also gets access from** card, find the **Courses** row and click **Manage**. The row shows only while a supported learning plugin is active.
3. In the **Course enrollment** drawer, click **Add courses**.
4. Search for courses from any of your learning plugins, pick the ones you want, then click **Save**.
5. Click **Done**, then click **Save** in the bar at the bottom of the tab.

Each course shows the name of its learning plugin. A course that already belongs to another level shows **Also in** followed by that level's name.

<!-- TODO(screenshot): lms-courses-1
  screen: Fluent Members → Membership Levels → a level → Content Access → Course enrollment drawer
  state: drawer open with two courses linked, each tagged Enroll on join
  data: two courses from the active learning plugin linked to DOCTEST Plus
  highlight: Add courses
  view: admin
  alt: Screenshot of the Course enrollment drawer with two linked courses
-->

New members are enrolled from the moment they join. Current members are not enrolled until you click **Enroll now** on the course, which appears when some members are missing. Members who are already enrolled another way are left as they are.

## Open courses and members-only courses

A course tagged **Open to everyone** can be taken by anyone, because its settings in the learning plugin leave it open. Enrolling members in it does not lock it. To make a course members only, do one of these:

- Set the course to closed or paid in your learning plugin.
- Add the course under **Content** on the same **Content Access** tab, so only members can open it. See [Content Access](/docs/levels/content-access).

## Lessons, topics and quizzes

When a course is protected under **Content**, its steps are protected with it. That covers the lessons, topics, quizzes, assignments and exams that belong to the course, for whichever types your learning plugin has. Items you leave out of the rule stay open. Fluent Members refreshes the list of steps when you save the level and when you activate a learning plugin.

## Choose what happens when a membership ends

Under **When a membership ends**, pick one option for all the level's courses:

- **Unenroll** (default): Members are unenrolled from these courses when their membership ends.
- **Keep enrolled**: Members stay enrolled, and you unenroll them in your learning plugin yourself.

Courses members bought, were added to by hand, or also get from another active membership are never removed. Course progress is always kept.

A cancellation set to take effect at the end of the paid period changes nothing until that date, because the member keeps access until then.

## Remove a course from a level

Click the **×** on a saved course. A window asks what to do with current members:

- **Keep current members enrolled**: They stay enrolled. Only the link to this level is removed.
- **Unenroll** followed by the number of members enrolled by FluentMembers: Those members are unenrolled. Members who bought the course, were added by hand or have another membership with this course stay, and their progress is kept.

If no members were enrolled by Fluent Members, the window says nobody is removed.
