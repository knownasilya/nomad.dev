---
categories:
  - Announcements
  - Releases
date: "2026-11-01"
description: Notes get topics. Your AI sorts them for you, you can filter by them, and the canvas groups notes around them, on desktop and the phone.
title: "Nomad 1.32: topics for your notes"
---

Everything below is in [Nomad 1.32](https://github.com/knownasilya/nomad/releases/tag/v1.32.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Topics on notes

A note can now have topics, like the topics [Reader](/posts/whats-new-in-1-30/#reader-saves-pages-and-reads-them-clean) sorts articles into. In `nomad://notes`, a topic bar sits above each note. Type to add a topic, click × to remove one, or press **Suggest** to have your AI pick some. Topics show on each note in the list, and the chips above the list filter it to one topic.

![A note with the topics Garden and Shopping, and topic chips above the list of notes](/posts/whats-new-in-1-32/note-topics.webp)

You don't have to sort anything by hand. Once a note has settled (a dozen words or more, and two minutes since you last edited it), your AI files it under one to three topics in the background. It runs on your own computer's AI. To turn it off, open the AI page's Setup (`nomad://ai/setup`). **Suggest** still works when it's off.

Topics are part of the note, so they sync to your other devices, and adding one never creates a conflict copy.

## Topics on the canvas

The Notes canvas draws each topic as a hub, with its notes around it on dashed lines. Click a hub to list its notes.

![The Notes canvas, with topic hubs such as Garden, Work and Shopping and their notes around them](/posts/whats-new-in-1-32/topic-canvas.webp)

## On the phone

The phone's Notes has the same topic chips and the same topics on each row. In the editor, a topic row opens a sheet where you can change them. The phone's canvas groups notes around topics too.

![The phone's Notes list filtered to the Work topic](/posts/whats-new-in-1-32/phone-topics.webp)

## Your AI knows them too

When your AI lists or reads your notes, it sees their topics, and it can list the notes in one topic. When it writes a note, it can give the note topics.

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
