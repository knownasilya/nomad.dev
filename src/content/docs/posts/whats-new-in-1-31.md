---
categories:
  - Announcements
  - Releases
date: "2026-10-31"
description: Write skills that teach your AI how you want a kind of task done, and sign in with Google on the phone without leaving Nomad.
title: "Nomad 1.31: skills for your AI"
---

Everything below is in [Nomad 1.31](https://github.com/knownasilya/nomad/releases/tag/v1.31.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Skills

The [AI page](/posts/whats-new-in-1-30/#a-page-for-the-ai-chats-and-memory) has a new section, **Skills**. A skill is a set of instructions for one kind of task: how you want your weekly report written, or how to turn a recipe page into a Note. A memory is a short fact the AI keeps in mind all the time. A skill is longer, and the AI only reads it when you ask for that kind of task.

![nomad://ai/skills, listing three skills, two of them on](/posts/whats-new-in-1-31/skills-list.webp)

Each skill has a name, a line that says when to use it, and its instructions. Every chat in the AI Sidebar, on your phone and in Jobs lists the skills that are on, by name and that line. When what you ask matches one, the assistant opens it and follows it.

![Adding a skill: a name, when to use it, and the instructions](/posts/whats-new-in-1-31/skills-new.webp)

- **Turn them on and off.** A skill that's off isn't listed and the assistant can't find it.
- **Bring them in from other assistants.** Import a `SKILL.md`, the format other AI assistants use, or export a skill as one.
- **They're yours.** Skills sync to your linked devices like memories. Only you can change them: the AI can draft one for you, but you add it on the AI page. A page's own `nomad.ai.chat()` never sees them.

## Signing in on the phone

On Android, a site's "Sign in with Google" button used to open Chrome, and the page that started it never heard back. Sign-in popups now open over the tab inside Nomad and hand the result back to the page. A link that opens a new window opens a new tab instead of another app, and a link to an RSS or Atom feed goes to Reader, which offers to subscribe.

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
