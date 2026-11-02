---
categories:
  - Announcements
  - Releases
date: "2026-11-02"
description: Drag a tab into a split view with another tab, see and mute the tabs playing sound, and find new tabs at the top of the sidebar.
title: "Nomad 1.37: split view with any tab, and tabs that show their sound"
---

Everything below is in [Nomad 1.37](https://github.com/knownasilya/nomad/releases/tag/v1.37.0), on desktop. Your app updates itself, or you can download it from the release page.

## Put two tabs side by side

A tab could already split in two, but only with a copy of its own page. Now any two open tabs can share a split view. Drag a tab onto the page you're reading, and Nomad shades the half the tab will take: left, right, above or below. Let go and the two pages sit side by side, still running, with nothing reloaded.

![Dragging the "Lisbon weather" tab onto a page, with the right half shaded where it will open](/posts/whats-new-in-1-37/drag-onto-page.webp)

You can also drop a tab onto another tab in the tab strip or the sidebar. Drop it near the tab's edge to move it as before, or on the rest of the tab to split them. The pane menu at the bottom of the page has **Split With**, which lists your other open tabs. A tab holding a split shows a columns icon, and **Move Pane → To a New Tab** takes a page back out.

![A docs page and a weather page side by side in one tab](/posts/whats-new-in-1-37/split-view.webp)

## See which tab is playing sound

A tab playing a video or sound now shows a speaker, in the tab strip and in the sidebar. Click the speaker to mute that tab, and click again to unmute. A muted tab shows a crossed-out speaker. In a split view, the tab counts the sound from both pages.

![The tab strip with a playing tab, a muted tab and a pinned tab playing music](/posts/whats-new-in-1-37/tab-audio.webp)

## New tabs at the top of the sidebar

In the sidebar layout, the **New tab** button now sits at the top of your tabs, under your pinned tiles, and a new tab opens there. The list reads newest first. **New Tab in Group** adds the tab at the top of the group. A link you open from a page still opens next to it, and the top-bar layout still adds new tabs at the end.

![The sidebar before and after: New tab moves from the bottom of the list to the top](/posts/whats-new-in-1-37/new-tabs-on-top.webp)

## Everything else

The Spaces menu and other popups now close when you click outside them. My Library's tabs are named after the page you have open, such as "Jobs" or the Persona you're editing. The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
