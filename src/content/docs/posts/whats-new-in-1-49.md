---
categories:
  - Announcements
  - Releases
date: "2026-11-11"
description: Web pages open in Assets, safely, Markdown and pages switch between Preview and Source, a page can become a drive, and your AI can draw a page of charts, maps and tables and save it to Assets.
title: "Nomad 1.49: web pages in Assets, and pages your AI draws"
---

Everything below is in [Nomad 1.49](https://github.com/knownasilya/nomad/releases/tag/v1.49.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Your AI draws pages

Ask your AI for a page, like "make me a page of how the garden did this season", and it saves one to [Assets](/posts/whats-new-in-1-47/): the same charts, maps, tables and stats it shows in the AI Sidebar, in one `.html` file. The page works in light and dark, and everything it needs is inside the file, so it opens the same on any of your devices. Only a map fetches its tiles.

![Garden this season.html open in Assets, in light and dark: Harvest so far 38 kg, Beds planted 9 of 12, Rain this month 64 mm, and a Weekly harvest bar chart of tomatoes and beans](/posts/whats-new-in-1-49/ai-page.webp)

## Web pages open in Assets

An `.html` file in Assets is now a **Web page** and opens as one, with its own styles and scripts. It runs in a sandbox: it can't reach the internet, keep anything in storage, send a form, open a window or move you to another site. A map on the page can still load its tiles. The same goes for the phone.

![Party checklist.html open in Assets, in light and dark, its script running with network and storage blocked](/posts/whats-new-in-1-49/web-page.webp)

On your computer, **Make a drive from this page** turns a page into a drive of its own, with the page as its home page, ready to share.

## Preview and Source

Markdown files and web pages have a **Preview / Source** switch, so you can read the page or the text behind it. On the phone it's the eye and code button.

![Apple cake.md in Assets, showing its Markdown source with line numbers, in light and dark](/posts/whats-new-in-1-49/source.webp)

## Fixes

- **A picture in a folder fills the phone's viewer again.** Pictures with a folder or a tag showed at about half size.
- **A Persona logs in right after Nomad starts.** When its profile drive took a while to open, Nomad said the device didn't have it yet and didn't check again. Now it waits for the drive and checks once it opens.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
