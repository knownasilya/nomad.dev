---
categories:
  - Announcements
  - Releases
date: "2026-11-02"
description: Pinned tiles and New tab stay in view while your tabs scroll, every icon button says what it does, and Nomad now runs on Electron 45.
title: "Nomad 1.38: a sidebar that keeps its pins, and buttons that explain themselves"
---

Everything below is in [Nomad 1.38](https://github.com/knownasilya/nomad/releases/tag/v1.38.0). Your app updates itself, or you can download it from the release page.

## Pinned tiles stay put

In the sidebar layout, your pinned tiles and the **New tab** button used to scroll away with a long list of tabs. Now they stay at the top, and only the tabs scroll under them. A thin line under New tab shows when the list is scrolled. If you pin a lot of pages, the tiles scroll on their own, so your tabs always keep room.

![The sidebar before and after: with many tabs scrolled, the pinned tiles and New tab now stay at the top](/posts/whats-new-in-1-38/sidebar-scroll.webp)

## Every icon button says what it does

Hover any button that shows only an icon, and it tells you what it does. 36 buttons and icons on desktop had no label before, among them the find bar, reload, share, the browser and pane menus, and My Library's "more" buttons. The stop button used to say "Refresh"; it now says "Stop loading". Screen readers get the same labels.

On the phone, touch and hold an icon button to see its name.

## Electron 45

Nomad now runs on Electron 45, up from 42, which brings a newer Chromium and its security fixes.

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
