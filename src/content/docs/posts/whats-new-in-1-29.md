---
categories:
  - Announcements
  - Releases
date: "2026-10-31"
description: Pinned pages that sync across your devices, an AI Sidebar you can interrupt, page clicks you approve once, and a phone browser with one bar on top.
title: "Nomad 1.29: pinned tiles, Send now, and approving the AI's plan"
---

Nomad 1.28 and 1.29 came out on the same day as [1.27](/posts/whats-new-in-1-27/), so this post covers both. Everything below is in [Nomad 1.29](https://github.com/knownasilya/nomad/releases/tag/v1.29.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Pinned pages, on every device

Pinned pages used to live in one window on one computer. Now each Space has one set of pins, and they're the same on your computers and your phone. Pin a page on the phone and it shows up on desktop, and the other way around. In a shared Space, everyone in it sees the same pins.

The sidebar draws pins as a grid of icon tiles above your tabs. Closing a pinned page keeps its tile, so it's one click away. Drag tiles to reorder them, or drop a tab on the grid to pin it.

![The sidebar before and after, with pinned pages as a grid of icon tiles above the tabs](/posts/whats-new-in-1-29/pinned-tiles.webp)

With tabs on top, pins sit at the start of the tab bar, in pin order, including the ones you've closed.

![Pinned pages at the start of the top tab bar, in light and dark](/posts/whats-new-in-1-29/pinned-top-bar.webp)

## Send now

In 1.27 you could [steer the AI](/posts/whats-new-in-1-27/#steer-the-ai-while-it-works) by sending a message while it works, and it would read the message at its next step. Sometimes the next step is too late, for example when it has just started writing a long answer in the wrong language. A queued message now has **Send now**. The assistant stops what it's doing, keeps what it wrote so far, and reads your message right away.

![A queued message with Send now, then Sending now, then the assistant switching to Python](/posts/whats-new-in-1-29/send-now.webp)

Send now works in the AI Sidebar and in the phone's AI panel.

## Fewer prompts when the AI uses the page

When the AI Sidebar [uses the page](/posts/whats-new-in-1-27/#the-ai-sidebar-can-use-the-page), a click that buys, sends, posts or deletes asks you first. That's the right default, but it meant one prompt per button when you asked it to clear out twenty drafts.

- **Allow similar clicks.** The prompt has a new choice: also allow buttons like this one on this site for the rest of the chat. "Similar" means the same site, the same kind of control and the same name apart from numbers, so allowing "Delete draft 3" also allows "Delete draft 4", but never "Delete account".
- **Approve a plan once.** Before a run of such clicks, the assistant can show you its plan instead: the goal, and each click it will make with a note on why. Say yes once, and it can make those clicks, and only those, for the rest of that turn.

## Recent sites on the phone

Typing in the phone's address bar no longer opens a dropdown over the page. While you type, a clock button sits next to Clear. Tap it for a card of recent sites, filtered by what you typed. Your names come first, then the sites and drives you've visited in this Space, newest first.

![The phone's address bar before, while typing, and with the recent sites card open](/posts/whats-new-in-1-29/recent-sites.webp)

## One bar on the phone

1.28 moved the phone to a single bar at the top. Pages now run all the way to the bottom of the screen, so a site's own bottom bar sits where it should instead of floating above a gap. The top bar takes the site's theme color, and you can touch and hold the tab count to open a new tab.

![A site's bottom bar before and after, in light and dark](/posts/whats-new-in-1-29/phone-bottom-bar.webp)

The phone can also write to Spaces that came over from desktop. Before, they opened read-only.

## Everything else

The full list of changes, including the smaller fixes, is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
