---
categories:
  - Announcements
  - Releases
date: "2026-11-13"
description: The AI chat keeps every step your AI took with its answer, says how long it thought, and lets you retry. Tables and checklists show up on the phone, and tools work again in the installed app.
title: "Nomad 1.51: see each step your AI took"
---

Everything below is in [Nomad 1.51](https://github.com/knownasilya/nomad/releases/tag/v1.51.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Every step stays with the answer

When your AI searches your Notes, reads a page or writes a file, the AI Sidebar now keeps those steps with its answer. They show while it works. When it's done, they fold into a line like **Used 3 tools**, which also says if one of them failed, and you can open it to see each step. The steps are saved with the chat. They're still there when you reopen the chat, read it on the phone, or watch a Job's chat.

![The AI Sidebar in light and dark: Thought for 3s, then Used 3 tools opened to Searching your Notes for "Lisbon", Reading "Lisbon trip, May" and Writing the note "Lisbon restaurants", above the answer with Copy and Regenerate](/posts/whats-new-in-1-51/tool-steps.webp)

## How long it thought

While the model thinks, the chat says **Thinking…** and shows its thoughts as they come. When it's done, they fold into **Thought for 4s**. A softly shining line takes the place of the old spinner, and it stays still if you've turned on Reduce motion. On your computer, the sidebar follows a long answer only while you're at the bottom. Scroll up to read, and a button takes you back down.

![The phone's AI panel in light and dark, reading Thinking… with the AI's thoughts as it plans to search the Lisbon notes](/posts/whats-new-in-1-51/phone-thinking.webp)

## Regenerate, and try again

The latest answer has **Regenerate**. If a turn fails, the error has **Retry**, and the send button turns into **Try again**.

![A failed turn in the AI Sidebar, in light and dark: Used 2 tools, 1 failed, the error, Copy and Retry, and the send button as Try again](/posts/whats-new-in-1-51/retry.webp)

## Tables and checklists on the phone

The phone's AI panel now draws tables, checklists and lists inside lists, like the computer does. Before, it showed a table as rows of `|` characters.

![The phone's AI panel in light and dark: a table of three trains to Porto, a packing list with ticked boxes and nested points, a numbered list, a quote and a code line](/posts/whats-new-in-1-51/phone-markdown.webp)

## Fixes

- **Tools work again in the installed app.** Since 1.50, every time your AI tried to run a tool in the installed app, it stopped with "execute process exited (1)". That hit the AI Sidebar, Jobs and the phone's AI. Running Nomad from source worked fine.
- **Restart to update brings Nomad back on the Mac.** Sometimes Nomad closed its windows and never reopened or installed the update.
- **A new menu bar icon on the Mac.** It's the N logo now, and it matches light and dark menu bars.
- **PDFs, videos and web pages open in the phone's Assets.** On Android they showed up blank. Patches 1.50.1 to 1.50.4 fixed this.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
