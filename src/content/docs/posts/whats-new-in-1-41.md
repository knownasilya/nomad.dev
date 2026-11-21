---
categories:
  - Announcements
  - Releases
date: "2026-11-04"
description: Notes now edit live. Your AI types its changes into an open note with its own cursor, and your computers edit the same note together as you type.
title: "Nomad 1.41: live editing in Notes"
---

Everything below is in [Nomad 1.41](https://github.com/knownasilya/nomad/releases/tag/v1.41.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Watch your AI write in a note

When you ask your AI to change a note you have open, it no longer swaps the whole note out from under you. It types its changes in, a few characters at a time, at its own violet **AI** cursor, and the top of the note says **AI is editing…** while it works. You can keep writing somewhere else in the note while it does.

![A note with the AI's violet cursor adding a line, another device's cursor on another line, and "AI is editing…" at the top](/posts/whats-new-in-1-41/ai-editing.webp)

The AI works out its changes from the text it read, so it only touches the lines it meant to change. If you changed those same lines in the meantime, it saves its version as a conflict copy instead, as before, so nothing you wrote is lost.

## Edit the same note on two devices

A note open on more than one of your devices is now one live note. What you type on one shows up on the other as you type it, with a cursor for each device, labelled with its name. The connection goes straight between your own devices, and each one proves it belongs to your Vault before it can join.

The phone's Notes doesn't join live editing yet. Changes you make there still sync the way they always have, and an open note on your computer picks them up.

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
